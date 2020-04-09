import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import * as CommonFnc from '../../utils/commonFnc';
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

const prize = [
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
];
const historyRecord = [
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
];

export default class SlotMachine extends Component {
  state = {
    spinDisabled: false,
    result: [], // 中奖池
    animationData0: {},
    animationData1: {},
    animationData2: {},
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
    const { spinDisabled, isGetPrize } = this.state;
    // 点击开始后不可点击

    if (spinDisabled) return false;
    // 随机设置奖项 数据从后台接口获取

    const result = CommonFnc.randomPrize(isGetPrize);

    console.log('随机设置奖项后的result---', result);
    this.setState({ spinDisabled: true, result: result });
    // 触发组件开始方法
    // 开始滚动
    let animation0 = Taro.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
    });
    let animation1 = Taro.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
    });
    let animation2 = Taro.createAnimation({
      transformOrigin: '50% 50%',
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
    });
    this.animation0 = animation0;
    this.animation1 = animation1;
    this.animation2 = animation2;

    // 间距143
    if (result[0] == 1) {
      animation0.translateY(1144).step();
      this.setState({
        animationData0: animation0.export(),
      });
      setTimeout(() => {
        animation0.translateY(286).step();
        this.setState({
          animationData0: animation0.export(),
        });
      }, 1000);
    } else if (result[0] == 2) {
      animation0.translateY(858).step();
      this.setState({
        animationData0: animation0.export(),
      });
      setTimeout(() => {
        animation0.translateY(0).step();
        this.setState({
          animationData0: animation0.export(),
        });
      }, 1000);
    } else if (result[0] == 3) {
      animation0.translateY(1001).step();
      this.setState({
        animationData0: animation0.export(),
      });
      setTimeout(() => {
        animation0.translateY(143).step();
        this.setState({
          animationData0: animation0.export(),
        });
      }, 1000);
    }

    if (result[1] == 1) {
      animation1.translateY(1144).step();
      this.setState({
        animationData1: animation1.export(),
      });
      setTimeout(() => {
        animation1.translateY(286).step();
        this.setState({
          animationData1: animation1.export(),
        });
      }, 1000);
    } else if (result[1] == 2) {
      animation1.translateY(858).step();
      this.setState({
        animationData1: animation1.export(),
      });
      setTimeout(() => {
        animation1.translateY(0).step();
        this.setState({
          animationData1: animation1.export(),
        });
      }, 1000);
    } else if (result[1] == 3) {
      animation1.translateY(1001).step();
      this.setState({
        animationData1: animation1.export(),
      });
      setTimeout(() => {
        animation1.translateY(143).step();
        this.setState({
          animationData1: animation1.export(),
        });
      }, 1000);
    }

    if (result[2] == 1) {
      animation2.translateY(1144).step();
      this.setState({
        animationData2: animation2.export(),
      });
      setTimeout(() => {
        animation2.translateY(286).step();
        this.setState({
          animationData2: animation2.export(),
        });
      }, 1000);
    } else if (result[2] == 2) {
      animation2.translateY(858).step();
      this.setState({
        animationData2: animation2.export(),
      });
      setTimeout(() => {
        animation2.translateY(0).step();
        this.setState({
          animationData2: animation2.export(),
        });
      }, 1000);
    } else if (result[2] == 3) {
      animation2.translateY(1001).step();
      this.setState({
        animationData2: animation2.export(),
      });
      setTimeout(() => {
        animation2.translateY(143).step();
        this.setState({
          animationData2: animation2.export(),
        });
      }, 1000);
    }

    // 结束
    this.runAsync(900).then(() => {
      // 完成
      this.doFinish();
    });
  }

  // 结束
  doFinish() {
    console.log('完成抽奖后的结果---', this.state.result);
    const { result } = this.state;
    // let isGetPrize = result.every((res) => res == result[0]);

    this.setState({
      spinDisabled: false,
      visibleModal: true,
      // isGetPrize,
    });
  }
  render() {
    const {
      isGetPrize,
      animationData0,
      animationData1,
      animationData2,
    } = this.state;
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
              <View className="reel reel0" animation={animationData0}></View>
              <View className="reel reel1" animation={animationData1}></View>
              <View className="reel reel2" animation={animationData2}></View>
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
