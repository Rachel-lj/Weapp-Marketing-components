import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './goldenEgg.less';
const local_img_base =
  'https://xinya-shop.oss-cn-hangzhou.aliyuncs.com/images/static/';
const iconGoldenEggBg1 = `${local_img_base}goldenEggBg1@2x.png`;
const iconGoldenTitle = `${local_img_base}goldenTitle@2x.png`;
const iconTitlePoint = `${local_img_base}titlePoint@2x.png`;
const iconSlotPrizeModal = `${local_img_base}slotPrizeModal@2x.png`;
const iconSlotPrizeHistoryModal = `${local_img_base}slotPrizeHistoryModal@2x.png`;
const iconEgg0 = `${local_img_base}egg0@2x.png`;
const iconEgg1 = `${local_img_base}egg1@2x.png`;
const iconEgg2 = `${local_img_base}egg2@2x.png`;
const iconEgg3 = `${local_img_base}egg3@2x.png`;
const iconEgg4 = `${local_img_base}egg4@2x.png`;

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
  {
    name: '四等奖',
    content: 'iphone12',
    id: 4,
  },
  {
    name: '五等奖',
    content: 'iphone12',
    id: 5,
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

export default class GoldenEgg extends Component {
  state = {
    spinDisabled: false,
    targetEgg: iconEgg0,
    visibleModal: false,
    visibleHistoryModal: false,
    isGetPrize: true,
    eggAction: false,
  };
  config = {
    navigationBarTitleText: '砸金蛋',
  };
  componentDidMount() {}
  // runAsync 延迟返回 promise 方法
  runAsync(time) {
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(function () {
        resolve();
        clearTimeout(timer);
      }, time);
    });
  }
  start() {
    this.setState({ eggAction: true });
    this.runAsync(1600).then(() => {
      this.setState({ visibleModal: true });
    });
  }
  render() {
    const { isGetPrize, eggAction } = this.state;
    const rule =
      '1.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n2.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n3.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n4.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n5.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n6.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n7.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。';
    // console.log('render时候的reels', reels);
    let Rule = rule.replace(/\\n/g, '\n');
    return (
      <View className="container">
        {/* 预加载图片 */}
        <Image src={iconEgg0} className="noneImg"></Image>
        <Image src={iconEgg1} className="noneImg"></Image>
        <Image src={iconEgg2} className="noneImg"></Image>
        <Image src={iconEgg3} className="noneImg"></Image>
        <Image src={iconEgg4} className="noneImg"></Image>
        <View className="topView">
          <Image src={iconGoldenEggBg1} className="iconGoldenEggBg1"></Image>
          <View
            className="historyView"
            onClick={() => this.setState({ visibleHistoryModal: true })}
          >
            中奖历史
          </View>
          <Image src={iconGoldenTitle} className="iconGoldenTitle"></Image>
          <View className="prizeNumTxt">您共有X次抽奖机会</View>
          {!eggAction && (
            <Image
              src={targetEgg}
              className="iconEggStatic"
              onClick={this.start}
            ></Image>
          )}
          {eggAction && <View className="iconEgg" onClick={this.start}></View>}
        </View>

        <View className="iconGoldenEggBg">
          {/* 奖品展示 */}
          <View className="prizeView">
            <View className="prizeTitleView">
              <Image src={iconTitlePoint} className="iconTitlePoint"></Image>
              <Text className="txt">奖品展示</Text>
            </View>
            <View className="prizeTableView">
              <View className="tr">
                <View className="th th1">奖项</View>
                <View className="th th2">奖品</View>
              </View>
              {prize.map((item) => {
                return (
                  <View className="tr">
                    <View className="td td1">{item.name}</View>
                    <View className="td td2">{item.content}</View>
                  </View>
                );
              })}
            </View>
            <View className="tipTxt">
              注：积分兑换可以获取更多抽奖机会，每个季度的最后一个月（3月、6月、9月、12月）
              的28号清空当季获取的抽奖机会
            </View>
          </View>
          {/* 抽奖规则 */}
          <View className="ruleView">
            <View className="ruleTitleView">
              <Image src={iconTitlePoint} className="iconTitlePoint"></Image>
              <Text className="txt">抽奖规则</Text>
            </View>

            <View className="ruleTxt">{Rule}</View>
          </View>
          <View className="block"></View>
        </View>
        {/* 中奖弹窗 */}
        {visibleModal && (
          <View className="goldenEgg-modal">
                        <View className="goldenEgg-modal-mask"></View>
                        
            <View className="goldenEgg-modal-content">
                          
              <Image
                className="goldenEgg-modal-img"
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
                    onClick={() =>
                      this.setState({ visibleModal: false, eggAction: false })
                    }
                  >
                    放弃奖品
                  </View>
                  <View
                    className="getPrizeBtn"
                    onClick={() =>
                      this.setState({ visibleModal: false, eggAction: false })
                    }
                  >
                    立即领取
                  </View>
                </View>
              )}
              {!isGetPrize && (
                <View
                  className="noPrizeBtn"
                  onClick={() =>
                    this.setState({ visibleModal: false, eggAction: false })
                  }
                >
                  好的
                </View>
              )}
            </View>
                    
          </View>
        )}
        {/* 中奖历史弹窗 */}
        {visibleHistoryModal && (
          <View className="goldenEgg-history-modal">
            <View className="goldenEgg-history-modal-mask"></View>
            <View className="goldenEgg-history-modal-content">
              <Image
                className="iconSlotPrizeHistoryModal"
                src={iconSlotPrizeHistoryModal}
              ></Image>
              <View className="goldenEgg-history-modal-table">
                {historyRecord.map((item, index) => {
                  return (
                    <View className="goldenEgg-history-modal-item">
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
