/*
 * @Date: 2022-02-24 15:20:55
 * @LastEditors: jimouspeng
 * @Description: AsyncSeriesWaterfallHook-串行执行，并且前一个插件的返回值，会作为后一个插件的参数
 * @LastEditTime: 2022-02-24 15:28:05
 * @FilePath: \tapable\09asyncserieswaterfallhook.js
 */

const { AsyncSeriesWaterfallHook } = require('tapable')

const hook = new AsyncSeriesWaterfallHook(['name'])

// 异步钩子注册方式： tapAsync,  tapPromise(return a promise)

hook.tapPromise('a', (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(name, 'a---')
            resolve('is')
        }, 3000)
    })
})

hook.tapPromise('b', (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(name, 'b----')
            resolve('cool')
        }, 2000)
    })
})

hook.tapPromise('c', (name) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(name, 'c----')
            resolve('jimous is cool')
        }, 1000)
    })
})

hook.promise('jimous').then((res) => {
    console.log(res, '执行完毕')
})
