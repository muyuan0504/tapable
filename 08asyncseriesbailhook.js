/*
 * @Date: 2022-02-24 15:18:22
 * @LastEditors: jimouspeng
 * @Description: AsyncSeriesBailHook-串行执行，并且只要一个插件有返回值，立马调用最终的回调，并且不会继续执行后续的插件
 * @LastEditTime: 2022-02-24 15:19:33
 * @FilePath: \tapable\08asyncseriesbailhook.js
 */
const { AsyncSeriesBailHook } = require('tapable')

const hook = new AsyncSeriesBailHook()

// 异步钩子注册方式： tapAsync,  tapPromise(return a promise)

hook.tapAsync('a', (callback) => {
    setTimeout(() => {
        console.log('a-----1')
        callback(1) // callback有输出时，后续插件不调用
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
