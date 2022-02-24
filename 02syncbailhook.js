/*
 * @Date: 2022-02-24 12:51:24
 * @LastEditors: jimouspeng
 * @Description: SyncBailHook-同步钩子，可以通过注册的钩子函数的回调return true 结束后续钩子的调用
 * @LastEditTime: 2022-02-24 13:05:25
 * @FilePath: \tapable\syncbailhook.js
 */

const { SyncBailHook } = require('tapable')

const hook = new SyncBailHook(['name', 'age'])

hook.tap('plugin1', (name, age) => {
    console.log('plugin1', name, age)
})

hook.tap('plugin2', (name, age) => {
    console.log('plugin2', name, age)
    return 'end'
})

hook.tap('plugin3', (name, age) => {
    console.log('plugin3', name, age)
})

hook.call('jimous', 27)
