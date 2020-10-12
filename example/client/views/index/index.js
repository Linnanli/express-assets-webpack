let info = document.createElement('div')
info.innerText = '热更新测试1'

document.body.appendChild(info)


if (module.hot) {
    module.hot.accept()
}