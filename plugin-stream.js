/** 构建工作流 */
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
} = require('tapable');

/** 会被打断的动作，需要用bailHook进行处理 */
class DayUse {
    static isPlaying = false;
    constructor(options) {
        this.options = options;
        this.hooks = {
            eat: new AsyncSeriesHook(['food']), // 异步串行
            work: new AsyncSeriesBailHook(), // 异步串行-保险
            sleep: new SyncHook(['dark']), // 睡觉不被打扰，同步处理
            read: new SyncBailHook(['book']), // 看书可能会被打断
            play: new AsyncSeriesBailHook(), // 玩游戏会被打断
        };
        this.options.plugins.length &&
            this.options.plugins.forEach((hook) => {
                hook.apply(this);
            });
    }
    oneDayBegin() {
        /** 美好的一天从干饭开始！ */
        this.hooks.eat.tapAsync('breakfast', (food, cb) => {
            console.log(this.options.wakeup, '早餐时间---', food);
            this.workPlan();
            let workTime = 6;
            const timeUse = setInterval(() => {
                if (workTime === 0) {
                    clearInterval(timeUse);
                    cb();
                }
                workTime--;
                console.log('one hour later~');
            }, 1000);
        });
        this.hooks.eat.tapAsync('lunch', (food, cb) => {
            console.log('午餐时间---', food);
            this.relaxPlan();
            let playTime = 4;
            const timeUse = setInterval(() => {
                if (playTime === 0) {
                    clearInterval(timeUse);
                    cb();
                }
                playTime--;
            }, 1000);
        });
        this.hooks.eat.tapAsync('dinner', (food, cb) => {
            console.log('晚餐时间---', food);
            cb();
        });

        this.hooks.eat.callAsync('food', (result) => {
            console.log(this.options.sleep, '关灯睡觉, 美好的一天结束了❤❤', result);
        });
    }
    /** 工作流程 */
    workPlan() {
        // four hour work
        let codingFlag = false;
        this.hooks.work.tapAsync('coding-work1', (cb) => {
            if (!codingFlag) {
                console.log('happy coding time ~~');
                codingFlag = true;
            }
            setTimeout(() => {
                console.log('coding finished ~~');
                cb();
                // cb('开始摸鱼···');
            }, 4000);
        });
        // two hour摸鱼
        this.hooks.work.tapAsync('coding-work2', (cb) => {
            console.log('进入摸鱼状态');
            cb();
        });
        this.hooks.work.callAsync(() => {
            console.log('哥哥好会写代码哦~~~');
        });
    }
    readPlan() {}
    relaxPlan() {
        console.log('开始打游戏~~');
        this.hooks.play.callAsync((result) => {
            console.log(result);
        });
    }
    start() {
        console.log('新的一天开始了');
        this.oneDayBegin();
    }
}

class playPlugin {
    constructor(options) {}
    apply(compiler) {
        compiler.hooks.play.tapAsync('lol', (cb) => {
            console.log('lol------play');
            setTimeout(() => {
                cb();
            }, 2000);
        });
        compiler.hooks.play.tapAsync('jx3', (cb) => {
            console.log('jx3------play');
            setTimeout(() => {
                cb('饭点了, 不玩了');
            }, 1000);
        });
        compiler.hooks.play.tapAsync('watchTv', (cb) => {
            console.log('Tv------play');
            cb();
        });
    }
}

const oneDay = new DayUse({
    wakeup: '06:00',
    sleep: '22:00',
    plugins: [new playPlugin()],
});

oneDay.start();
