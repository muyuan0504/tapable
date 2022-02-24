/*
 * @Date: 2022-02-24 12:46:36
 * @LastEditors: jimouspeng
 * @Description: SyncHook-同步钩子
 * @LastEditTime: 2022-02-24 13:01:19
 * @FilePath: \tapable\SyncHook.js
 */
const { SyncHook } = require('tapable')

// All Hook constructors take one optional argument, which is a list of argument names as strings.
// 数组的长度对应参数的个数，不可以为空字符,null之类的
const hook = new SyncHook(['jimous'])

// For sync hooks, tap is the only valid method to add a plugin

hook.tap('plugin1', (res) => {
    console.log('plugin1', res)
})

hook.tap('plugin2', (res) => {
    console.log('plugin2', res)
})

hook.tap('plugin3', (res) => {
    console.log('plugin3', res)
})

hook.call('jimous~~')

class Car {
    constructor() {
        this.startHook = new SyncHook(['tips'])
    }
    start(tips) {
        this.startHook.call(tips)
    }
}

const car = new Car()
car.startHook.tap('driver', (res) => console.log(res, '确认安全带是否系好'))
car.start('出发！') // 出发！ 确认安全带是否系好
