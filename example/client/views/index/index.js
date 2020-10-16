import './index.scss'
import { getInfo } from './common/test'

let info = document.createElement('div')
info.innerText = '热更新测试1' + getInfo()

document.body.appendChild(info)


if (module.hot) {
    module.hot.accept()
}