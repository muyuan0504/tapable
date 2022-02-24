/*
 * @Date: 2022-02-24 15:04:02
 * @LastEditors: jimouspeng
 * @Description: AsyncParallelBailHook
 * 当第一个插件注册的钩子执行结束后，会进行bail(熔断), 然后会调用最终的回调，无论其他插件是否执行完
 * @LastEditTime: 2022-02-24 15:14:19
 * @FilePath: \tapable\06asyncparallelbailhook.js
 */

const { AsyncParallelBailHook } = require('tapable')

/** 不传参数 */
const hook = new AsyncParallelBailHook()

// 异步钩子注册方式： tapAsync,  tapPromise(return a promise)

hook.tapAsync('a', (callback) => {
    setTimeout(() => {
        console.log('a-----1')
        callback('a') // 最新执行，会调用callBack，后续插件不会调用
    }, 1000)
})

hook.tapAsync('b', (callback) => {
    setTimeout(() => {
        console.log('b-----2')
        callback('b')
    }, 2000)
})

hook.tapAsync('c', (callback) => {
    setTimeout(() => {
        console.log('c-----3')
        callback('c')
    }, 3000)
})

hook.callAsync((res) => {
    console.log('执行完毕~~~', res)
})
