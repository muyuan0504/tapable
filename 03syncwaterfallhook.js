/*
 * @Date: 2022-02-24 13:03:02
 * @LastEditors: jimouspeng
 * @Description: SyncWaterfallHook, 它的每一步都依赖上一步的执行结果，也就是上一步return的值就是下一步的参数
 * @LastEditTime: 2022-02-24 13:07:56
 * @FilePath: \tapable\syncwaterfallhook.js
 */

const { SyncWaterfallHook } = require('tapable')

const hook = new SyncWaterfallHook(['name', 'age'])

hook.tap('plugin1', (number, name) => {
    console.log('plugin1', number, name)
    number++
    return number
})

hook.tap('plugin2', (number, name) => {
    console.log('plugin2', number, name)
    return ++number
})

hook.tap('plugin3', (number, name) => {
    console.log('plugin3', number, name)
})

hook.call(1, 'jimous')
