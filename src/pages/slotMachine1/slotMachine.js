import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './SlotMachine.less';
const local_img_base =
  'https://xinya-shop.oss-cn-hangzhou.aliyuncs.com/images/static/';
const iconSlotBg = `${local_img_base}slotBg@2x.png`;
const iconSlotBtn = `${local_img_base}slotBtn@2x.png`;
const iconPrizeBgLeft = `${local_img_base}prizeBgLeft@2x.png`;
const iconPrizeBgRight = `${local_img_base}prizeBgRight@2x.png`;
const iconPrizeBg = `${local_img_base}prizeBg@2x.png`;
const iconSlotPrizeModal = `${local_img_base}slotPrizeModal@2x.png`;
const iconSlotPrizeHistoryModal = `${local_img_base}slotPrizeHistoryModal@2x.png`;

export default class SlotMachine extends Component {
  state = {
    spinDisabled: false,
    result: [], // 中奖池
    prize: [
      {
        name: '一等奖',
        content: 'iphone1',
        id: 1,
      },
      {
        name: '二等奖',
        content: 'iphone11',
        id: 2,
      },
      {
        name: '三等奖',
        content: 'iphone12',
        id: 3,
      },
    ],
    credits: 50, //积分
    curBet: 1, // 每局消耗积分
    stripHeight: 390, // 总高度
    alignmentOffset: 62, // 结果位置偏移量
    reelSpeed1Delta: 100, // 间隔位移
    positioningTime: 200, // 停止前动画时间 200
    bounceHeight: 85, // 结束弹射动画高度
    firstReelStopTime: 667, // 第一个动画延迟停止时间 667
    secondReelStopTime: 575, // 第二个动画延迟停止时间 575
    thirdReelStopTime: 568, // 第三个动画延迟停止时间 568
    payoutStopTime: 1500, // 触发结束延迟时间
    numIconsPerReel: 3, // 每个轮子几个格子
    timer: [],
    reels: [
      // 轮子动画属性
      {
        top: -72, // 初始位置
        animation: '', // 结束滚动动画
        css: '', // 反弹动画css
      },
      {
        top: -202,
        animation: '',
        css: '',
      },
      {
        top: -338,
        animation: '',
        css: '',
      },
    ],
    historyRecord: [
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
      {
        prizeName: '三等奖',
        time: '2020-01-01 12:00:00',
        isGet: true,
        prizeDetailName: 'iphone10',
      },
    ],
    visibleModal: false,
    visibleHistoryModal: false,
    isGetPrize: false,
  };
  config = {
    navigationBarTitleText: '水果机',
  };
  // runAsync 延迟返回 promise 方法
  runAsync(time) {
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(function () {
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
      payoutStopTime, // 触发结束延迟时间
    } = this.state;
    // 点击开始后不可点击
    if (spinDisabled) return false;
    // 随机设置奖项 数据从后台接口获取
    let result = [];
    for (var i = 0; i < 3; i++) {
      result.push(Math.floor(Math.random() * 3 + 1));
    }
    console.log('随机设置奖项后的result---', result);
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
    const { stripHeight, reelSpeed1Delta, reels, timer } = this.state; //  stripHeight总高度，reelSpeed1Delta间隔位移
    const position = parseInt(-(Math.random() * stripHeight * 2));

    // console.log('开始动画---position---', position);

    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.top = position;
      }
      return item;
    });
    console.log('开始动画---reels---', reels);
    this.setState({
      reels: reels,
    });
    // 循环动画
    timer[index] = setInterval(() => {
      reels.map((item, reelsIndex) => {
        if (reelsIndex == index) {
          item.top = reels[index].top + reelSpeed1Delta;
        }
        return item;
      });
      // console.log('开始动画--循环动画--reels---', reels);
      // console.log('开始动画--循环动画--timer---', timer);
      this.setState({
        reels: reels,
      });
      if (reels[index].top > 0) {
        reels.map((item, reelsIndex) => {
          if (reelsIndex == index) {
            item.top = 2 * -stripHeight;
          }
          return item;
        });
        // console.log('开始动画--如果top大于0--reels---', reels);
        this.setState({
          reels: reels,
        });
      }
    }, 20);
  }
  // 停止动画
  stop_reel_spin(index, lottery) {
    const {
      stripHeight, // 总高度
      numIconsPerReel, // 每个轮子有几个格子
      alignmentOffset, // 结果位置偏移量
      positioningTime, // 停止前动画时间
      bounceHeight, // 结束弹射动画高度
      reels,
    } = this.state;
    const cellHeight = stripHeight / numIconsPerReel;
    // console.log('--结束动画--cellHeight--', cellHeight);
    // console.log('--结束动画--lottery--', lottery);
    const position =
      -stripHeight - (lottery - 1) * cellHeight + alignmentOffset;

    console.log('--结束动画--position--', position);

    // 清除滚动timer
    clearInterval(this.state.timer[index]);
    // 最终位置
    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.top = position - stripHeight;
      }
      return item;
    });
    // console.log('--结束动画--reels--', reels);
    this.setState({
      reels: reels,
    });

    // 到最终位置之前的动画
    var animation = Taro.createAnimation({
      transformOrigin: '50% 50%',
      duration: positioningTime,
      timingFunction: 'linear',
      delay: 0,
    });
    animation.translateY(bounceHeight).step();

    reels.map((item, reelsIndex) => {
      if (reelsIndex == index) {
        item.animation = animation.export();
      }
      return item;
    });
    this.setState({
      reels: reels,
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
        reels: reels,
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
      reels: reels,
    });
  }
  // 结束
  doFinish() {
    console.log('完成抽奖后的结果---', this.state.result);
    let isGetPrize =
      this.state.result[0] == this.state.result[1] &&
      this.state.result[0] == this.state.result[2] &&
      this.state.result[1] == this.state.result[2];

    this.setState({
      spinDisabled: false,
      visibleModal: true,
      isGetPrize,
    });
  }
  render() {
    const { prize, reels, isGetPrize, historyRecord } = this.state;
    const rule =
      '1.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n2.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n3.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n4.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n5.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n6.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n7.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。';
    // console.log('render时候的reels', reels);
    let Rule = rule.replace(/\\n/g, '\n');
    return (
      <View className="container">
        <View className="bgContainer">
          <Image src={iconSlotBg} className="bgIcon"></Image>
          {/* 水果机部分 */}
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
            </View>
            <View className="drawNumView">
              <Text className="txt1">您共有X次摇奖机会</Text>
              <Text
                className="txt2"
                onClick={() => this.setState({ visibleHistoryModal: true })}
              >
                中奖历史
              </Text>
            </View>
            {/* 点击抽奖按钮 */}
            <Image
              onClick={this.start}
              src={iconSlotBtn}
              className="btnIcon"
            ></Image>
            {/* 注意事项 */}
            <View className="attentionView">
              <Text className="txt1">— 注意事项 —</Text>
              <Text className="txt2">
                *注：积分兑换可以获取更多抽奖机会，每个季度的最后一个月（3月，6月，9月，12月）的28号清空当季获取的抽奖机会
              </Text>
            </View>
          </View>
        </View>
        {/* 奖品名单-标题 */}
        <View className="prizeTitleView">
          <Image src={iconPrizeBgLeft} className="prizeLeftIcon"></Image>
          <View className="prizeTxtView">
            <Image src={iconPrizeBg} className="prizeIcon"></Image>
            <Text className="txt1">奖品名单</Text>
          </View>
        </View>
        {/* 奖品名单-内容 */}
        <View className="prizeView">
          {prize.map((item, index) => {
            return (
              <View
                className={index == 2 ? 'prizeItemView2' : 'prizeItemView'}
                key={item.id}
              >
                <Text className="txt1">{item.name}</Text>
                <Text className="txt1">{item.content}</Text>
              </View>
            );
          })}
        </View>
        {/* 游戏规则-标题 */}
        <View className="ruleTitleView">
          <View className="ruleTxtView">
            <Image src={iconPrizeBg} className="prizeIcon"></Image>
            <Text className="txt1">游戏规则</Text>
          </View>
          <Image src={iconPrizeBgRight} className="prizeRightIcon"></Image>
        </View>
        {/* 游戏规则*/}
        <View className="ruleView">{Rule}</View>
        <View className="blockView"></View>
        {/* 中奖弹窗 */}
        {visibleModal && (
          <View className="soltMachine-modal">
                        <View className="soltMachine-modal-mask"></View>
                        
            <View className="soltMachine-modal-content">
                          
              <Image
                className="soltMachine-modal-img"
                src={iconSlotPrizeModal}
              ></Image>
              <Text className="txt1">
                {isGetPrize ? '恭喜你中奖了！' : '很遗憾没有中奖哦'}
              </Text>
              {isGetPrize && <Text className="prizeName">iphone</Text>}
              {!isGetPrize && (
                <View>
                  <Text className="noPrizeName">
                    太可惜了竟然与奖品擦肩而过
                  </Text>
                  <Text className="noPrizeName1">换个姿势吧</Text>
                </View>
              )}
              {isGetPrize && (
                <View className="btnGroup">
                  <View
                    className="giveUpPrizeBtn"
                    onClick={() => this.setState({ visibleModal: false })}
                  >
                    放弃奖品
                  </View>
                  <View
                    className="getPrizeBtn"
                    onClick={() => this.setState({ visibleModal: false })}
                  >
                    立即领取
                  </View>
                </View>
              )}
              {!isGetPrize && (
                <View
                  className="noPrizeBtn"
                  onClick={() => this.setState({ visibleModal: false })}
                >
                  好的
                </View>
              )}
            </View>
                    
          </View>
        )}
        {/* 中奖历史弹窗 */}
        {visibleHistoryModal && (
          <View className="soltMachine-history-modal">
            <View className="soltMachine-history-modal-mask"></View>
            <View className="soltMachine-history-modal-content">
              <Image
                className="iconSlotPrizeHistoryModal"
                src={iconSlotPrizeHistoryModal}
              ></Image>
              <View className="soltMachine-history-modal-table">
                {historyRecord.map((item, index) => {
                  return (
                    <View className="soltMachine-history-modal-item">
                      <View className="firstView">
                        <Text className="txt1">{item.prizeName}</Text>
                        <Text className="txt1">{item.prizeDetailName}</Text>
                      </View>
                      <View className="secondView">
                        <Text className="txt1">{item.time}</Text>
                        <Text className="txt2">
                          {item.isGet ? '已领取' : '未领取'}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View
                className="okBtn"
                onClick={() => this.setState({ visibleHistoryModal: false })}
              >
                知道了
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
