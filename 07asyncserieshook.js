/*
 * @Date: 2022-02-24 15:14:41
 * @LastEditors: Please set LastEditors
 * @Description: AsyncSeriesHook-串行,插件一个一个的按顺序执行
 * @LastEditTime: 2022-12-12 15:57:11
 * @FilePath: \tapable\07asyncserieshook.js
 */

const { AsyncSeriesHook } = require('tapable')

const hook = new AsyncSeriesHook()

// 异步钩子注册方式： tapAsync,  tapPromise(return a promise)

hook.tapAsync('a', (callback) => {
    setTimeout(() => {
        console.log('a-----1')
        callback() // callback有输出时，后续插件不调用
    }, 3000)
})

hook.tapAsync('b', (callback) => {
    setTimeout(() => {
        console.log('b-----2')
        callback()
    }, 2000)
})

hook.tapAsync('c', (callback) => {
    setTimeout(() => {
        console.log('c-----3')
        callback()
    }, 1000)
})

hook.callAsync((res) => {
    console.log('执行完毕~~~', res)
})
