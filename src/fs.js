const fs = require('fs')
const path = require('path')
const { isFunction, isObject, isString, isUndefined } = require('./utils')

const fsStrategy = {
    'writeFileSync': [
        isString,
        isString,
        isString
    ],
    'existsSync|statSync|readdirSync|mkdirpSync|mkdirSync|rmdirSync|unlinkSync|readlinkSync': [
        isString
    ],
    'createReadStream|createWriteStream': [
        isString,
        isObject
    ],
    'readFileSync': [
        isString,
        function strOrVoid(value) {
            return isString(value) || isUndefined(value)
        }
    ],
    'stat|readdir|mkdirp|rmdir|unlink|readlink': [
        isString,
        isFunction
    ],
   'mkdir|readFile': [
       isString,
       function funcOrObject(value) {
            return isFunction(value) || isObject(value) || isString(value)
       },
       function funcOrVoid(value) {
           return isFunction(value) || isUndefined(value)
       }
   ],
   'exists': [
       isString,
       isFunction
   ],
   'writeFile': [
       isString,
       isString,
       function stringOrFunc(value) {
            return isFunction(value) || isString(value)
       },
       function funcOrVoid(value) {
           return isFunction(value) || isUndefined(value)
       }
   ]
}

function findFsStrategy(funcName) {
    for (const key in fsStrategy) {
        const names = key.split('|')
        if (!~names.indexOf(funcName)) continue
        return fsStrategy[key]
    }
    return null
}

function formatArgument(funcName, args = []) {
    const strategy = findFsStrategy(funcName)
    if (!strategy) return []
    const result = []

    let i = 0
    let j = 0
    while (args[i]) {
        const arg = args[i]
        if (strategy[j](arg)) {
            i++
            j++
            result.push(arg)
        } else {
            i++
        }
    }
    return result
}


// function isEntryFile(fileName, options) {
//     return ~fileName.indexOf(options.context)
// }

function isOutputFile(fileName, options) {
    return ~fileName.indexOf(options.output.path)
}

exports.rewriteFs = function (memoryFileSystem, options) {
    for (const key in fs) {
        if (isFunction(fs[key]) && isFunction(memoryFileSystem[key])) {
            const originalFunc = fs[key]
            // 如果是加载视图文件则调用memoryFileSystem方法
            fs[key] = function () {
                const fileName = arguments[0]
                if (isOutputFile(fileName, options)) {
                    
                    const args = formatArgument(key, Array.from(arguments))
                    return memoryFileSystem[key].apply(memoryFileSystem, args)
                } else {
                    return originalFunc.apply(fs, arguments)
                }
            }
        }
    }
}