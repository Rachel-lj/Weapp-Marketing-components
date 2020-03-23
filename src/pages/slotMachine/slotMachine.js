import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './SlotMachine.less';

export default class SlotMachine extends Component {
  state = {
    spinDisabled: false,
    result: [], // 中奖池
    credits: 50, //积分
    curBet: 1, // 每局消耗积分
    stripHeight: 720, // 总高度
    alignmentOffset: 100, // 结果位置偏移量
    reelSpeed1Delta: 100, // 间隔位移
    positioningTime: 200, // 停止前动画时间
    bounceHeight: 200, // 结束弹射动画高度
    firstReelStopTime: 667, // 第一个动画延迟停止时间
    secondReelStopTime: 575, // 第二个动画延迟停止时间
    thirdReelStopTime: 568, // 第三个动画延迟停止时间
    payoutStopTime: 1500, // 触发结束延迟时间
    numIconsPerReel: 6, // 每个轮子几个格子
    timer: [],
    reels: [
      // 轮子动画属性
      {
        top: -1345, // 初始位置
        animation: '', // 结束滚动动画
        css: '' // 反弹动画css
      },
      {
        top: -977,
        animation: '',
        css: ''
      },
      {
        top: -1101,
        animation: '',
        css: ''
      }
    ]
  };
  config = {
    navigationBarTitleText: '老虎机'
  };
  // runAsync 延迟返回 promise 方法
  runAsync(time) {
    return new Promise(function(resolve, reject) {
      const timer = setTimeout(function() {
        resolve();
        clearTimeout(timer);
      }, time);
    });
  }
  // 开始
  start() {
    const {
      spinDisabled,
      firstReelStopTime,
      secondReelStopTime,
      thirdReelStopTime,

      payoutStopTime
    } = this.state;
    // 点击开始后不可点击
    if (spinDisabled) return false;
    // 随机设置奖项 该数据应该从后台接口获取
    let result = [];
    for (var i = 0; i < 3; i++) {
      result.push(Math.floor(Math.random() * 6 + 1));
    }
    this.setState({ spinDisabled: true, result: result });
    // 触发组件开始方法
    // 开始滚动
    this.start_reel_spin(0);
    this.start_reel_spin(1);
    this.start_reel_spin(2);
    // 结束
    this.runAsync(firstReelStopTime)
      .then(() => {
        this.stop_reel_spin(0, result[0]);
        return this.runAsync(secondReelStopTime);
      })
      .then(() => {
        this.stop_reel_spin(1, result[1]);
        return this.runAsync(thirdReelStopTime);
      })
      .then(() => {
        this.stop_reel_spin(2, result[2]);
        return this.runAsync(payoutStopTime);
      })
      .then(() => {
        // 完成
        // 重置
        this.reset_reel_spin(0);
        this.reset_reel_spin(1);
        this.reset_reel_spin(2);
        this.doFinish();
      });
  }
  // 开始动画
  start_reel_spin(index) {
    const { stripHeight, reelSpeed1Delta, reels } = this.state;
    const position = parseInt(-(Math.random() * stripHeight * 2));
    console.log('start---position---', position);
    console.log('start---reels---', this.state);
    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.top = position;
      }
      return item;
    });
    this.setState({
      reels: reels
    });
    // 循环动画
    this.state.timer[index] = setInterval(() => {
      reels.map((item, reelsIndex) => {
        if (reelsIndex == index) {
          item.top = this.state.reels[index].top + reelSpeed1Delta;
        }
        return item;
      });
      this.setState({
        reels: reels
      });
      if (this.state.reels[index].top > 0) {
        reels.map((item, reelsIndex) => {
          if (reelsIndex == index) {
            item.top = 2 * -stripHeight;
          }
          return item;
        });
        this.setState({
          reels: reels
        });
      }
    }, 20);
  }
  // 停止动画
  stop_reel_spin(index, lottery) {
    const {
      stripHeight,
      numIconsPerReel,
      alignmentOffset,
      positioningTime,
      bounceHeight,
      reels
    } = this.state;
    const cellHeight = stripHeight / numIconsPerReel;
    const position =
      -stripHeight - (lottery - 1) * cellHeight + alignmentOffset;
    // 清除滚动timer
    clearInterval(this.state.timer[index]);
    console.log('end---position---', position);
    console.log('end---state---', this.state);
    // 最终位置
    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.top = position - stripHeight;
      }
      return item;
    });
    this.setState({
      reels: reels
    });

    // 到最终位置之前的动画
    var animation = Taro.createAnimation({
      transformOrigin: '50% 50%',
      duration: positioningTime,
      timingFunction: 'linear',
      delay: 0
    });
    animation.translateY(bounceHeight).step();

    console.log('end---animation---', animation.export());
    console.log('end---state---', this.state);

    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.animation = animation.export();
      }
      return item;
    });
    this.setState({
      reels: reels
    });

    // 弹射动画
    this.runAsync(positioningTime).then(() => {
      // translateY重置成0为下次做准备
      animation.translateY(0).step({ duration: 0 });
      reels.map((item, reelsIndex) => {
        if (reelsIndex == index) {
          item.animation = animation.export();
          item.css = 'bounce';
        }
        return item;
      });
      this.setState({
        reels: reels
      });
    });
  }
  // 重置动画
  reset_reel_spin(index) {
    const { reels } = this.state;
    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.css = '';
      }
      return item;
    });
    this.setState({
      reels: reels
    });
  }
  // 结束
  doFinish() {
    console.log('当前项=', this.state.result);
    Taro.showToast({
      title: '恭喜你获奖了',
      icon: 'none'
    });
    this.setState({
      spinDisabled: false
    });
  }
  render() {
    const { result, reels } = this.state;
    return (
      <View className="container">
        <View className="slot-machine-container">
          <View className="reel-container">
            {reels.map((item, index) => {
              return (
                <View
                  key="index"
                  className={'reel reel' + index + ' ' + item.css}
                  animation={item.animation}
                  style={'top:' + item.top + 'rpx;'}
                ></View>
              );
            })}
            <View className="reel-overlay"></View>
          </View>
        </View>

        <View className="btn-group">
          <View className="button" onClick={this.start}>
            开始
          </View>
        </View>
      </View>
    );
  }
}
