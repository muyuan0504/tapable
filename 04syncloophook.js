/*
 * @Date: 2022-02-24 13:08:55
 * @LastEditors: jimouspeng
 * @Description: SyncLoopHook-同步循环钩子 如果返回一个非undefined。就会一直执行这个插件的回调函数，直到它返回undefined
 * @LastEditTime: 2022-02-24 13:14:21
 * @FilePath: \tapable\04syncloophook.js
 */

const { SyncLoopHook } = require('tapable')

const hook = new SyncLoopHook(['number', 'name'])

let index = 3

hook.tap('plugin1', (number, name) => {
    console.log('plugin1', number, name)
    index--
    if (index > 0) {
        // 这里当index < 0的时候，才调用plugin2
        return index
    }
})

hook.tap('plugin2', (number, name) => {
    console.log('plugin2', number, name)
})

hook.tap('plugin3', (number, name) => {
    console.log('plugin3', number, name)
})

hook.call(4, 'jimous')
