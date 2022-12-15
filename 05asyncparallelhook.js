/*
 * @Date: 2022-02-24 13:15:23
 * @LastEditors: Please set LastEditors
 * @Description: AsyncParallelHook-异步并行执行,当所有插件都执行完毕的时候,执行回调
 * @LastEditTime: 2022-12-12 14:58:07
 * @FilePath: \tapable\05asyncparallelhook.js
 */

const { AsyncParallelHook } = require('tapable');

/** 不传参数 */
const hook = new AsyncParallelHook(['name']);

// 异步钩子注册方式： tapAsync,  tapPromise(return a promise)

hook.tapAsync('a', (name, callback) => {
    console.log(name);
    setTimeout(() => {
        console.log('a-----1');
        callback();
    }, 3000);
});

hook.tapAsync('b', (name, callback) => {
    console.log(name);
    setTimeout(() => {
        console.log('b-----2');
        callback();
    }, 2000);
});

hook.tapAsync('c', (name, callback) => {
    console.log(name);
    setTimeout(() => {
        console.log('c-----3');
        callback();
    }, 1000);
});

hook.callAsync('jimous', () => {
    console.log('执行完毕~~~');
});
