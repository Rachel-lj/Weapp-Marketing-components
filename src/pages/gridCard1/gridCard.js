import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './gridCard.less';
const local_img_base =
  'https://xinya-shop.oss-cn-hangzhou.aliyuncs.com/images/static/';
const iconCardBack = `${local_img_base}cardBack@2x.png`;
const iconCardFront = `${local_img_base}cardFront@2x.png`;
const iconGridCardBgBottom = `${local_img_base}gridCardBgBottom@2x.png`;
const iconGridCardBgHead = `${local_img_base}gridCardBgHead@2x.png`;
const iconPrizeHistory = `${local_img_base}prizeHistory@2x.png`;
const iconRedPacket = `${local_img_base}redPacket@2x.png`;
const iconCardTitle = `${local_img_base}cardTitle.png`;

export default class GridCard extends Component {
  state = {
    card: [
      {
        id: 1,
        prizeName: '1',
        img: iconCardFront,
        status: 0, //   :0 反面 , 1 正面
      },
      {
        id: 2,
        prizeName: '2',
        img: iconCardFront,
        status: 0,
      },
      {
        id: 3,
        prizeName: '3',
        img: iconCardFront,
        status: 0,
      },
      {
        id: 4,
        prizeName: '4',
        img: iconCardFront,
        status: 0,
      },
      {
        id: 5,
        prizeName: '5',
        img: iconCardFront,
        status: 0,
      },
      {
        id: 6,
        prizeName: '6',
        img: iconCardFront,
        status: 0,
      },
    ],
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
    ],
    ready: false, // 是否点击开始抽奖
  };
  config = {
    navigationBarTitleText: '翻翻看',
  };
  componentDidShow() {
    const { card } = this.state;

    this.runAsync(10).then(() => {
      // 洗牌动画
      for (let i = 1; i < 7; i++) {
        this.runAsync(i * 20)
          .then(() => {
            card[i - 1].isMove = true;
            this.setState({
              card,
            });
            console.log('card1111111', i);
            return this.runAsync(i * 20 + 1000);
          })
          .then(() => {
            card[i - 1].isMove = false;
            this.setState({
              card,
            });
            console.log('card2222222222', i);
            return this.runAsync(1200);
          });
      }
    });
  }
  // 延迟返回 promise 方法  time:延迟时间
  runAsync = (time) => {
    return new Promise(function (resolve, reject) {
      const timer = setTimeout(function () {
        resolve();
        clearTimeout(timer);
      }, time);
    });
  };

  // 子组件触发，点击打开单个卡片奖品
  openCard = (e) => {
    console.log('e1111-', e);
    console.log('ready---', this.state.ready);
    const { item, index } = e.currentTarget.dataset;
    const { card } = this.state;
    // 动画没有结束，或已经点开
    // if (!this.state.ready || item.status == 1) {
    //   return;
    // }
    // 改变卡片翻转状态 status :0 反面 , 1 正面
    card.map((cardItem, cardIndex) => {
      if (cardIndex == index) {
        cardItem.status = 1;
      }
      return cardItem;
    });
    this.setState({
      card: card,
    });
    // Taro.showToast({
    //   title: `你点击了第${index + 1}个`,
    //   icon: 'none'
    // });
    console.log('this.state', this.state);
  };
  render() {
    const { card, prize } = this.state;
    const rule =
      '1.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n2.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n3.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n4.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n5.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n6.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。\n7.这里是抽奖规则说明，内容全部展示，内容文案通过后台编辑配置。';
    let Rule = rule.replace(/\\n/g, '\n');
    return (
      <View className="container">
        <View className="iconGroup">
          <Image
            src={iconGridCardBgHead}
            className="iconGridCardBgHead"
          ></Image>
          <Image src={iconPrizeHistory} className="iconPrizeHistory"></Image>
        </View>
        {/* 卡片部分 */}
        <View className="cardBorderView">
          <View className="cardTitleView">
            <Image src={iconCardTitle} className="iconCardTitle"></Image>
            <View className="txt">随手一翻 大奖到家</View>
          </View>
          <View className="redPacketView">
            <Image src={iconRedPacket} className="iconRedPacket"></Image>
            <View className="txt">
              今日翻牌次数：<Text className="txt1">3</Text>次
            </View>
          </View>
          <View className="cardView">
            {card.map((item, index) => {
              return (
                <View key={item.id}>
                  <View
                    data-index={index}
                    data-item={item}
                    onClick={this.openCard}
                    className={
                      'project item' +
                      index +
                      ' ' +
                      (item.isMove ? 'ani' : '') +
                      ' ' +
                      (item.status == 1 ? 'flip' : '')
                    }
                  >
                    <Image className="front" src={iconCardBack}></Image>
                    <View className="back">
                      <Image src={item.img} className="iconBack"></Image>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 奖品展示 */}
        <View className="prizeBorderView">
          <View className="prizeTitleView">
            <Image src={iconCardTitle} className="iconCardTitle"></Image>
            <View className="txt">奖品展示</View>
          </View>
          <View className="prizeView">
            {prize.map((item, index) => {
              return (
                <View className="prizeItemView" key={item.id}>
                  <Text className="txt1">{item.name}</Text>
                  <Text className="txt1">{item.content}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {/* 游戏规则 */}
        <View className="ruleBorderView">
          <View className="ruleTitleView">
            <Image src={iconCardTitle} className="iconCardTitle"></Image>
            <View className="txt">游戏规则</View>
          </View>
          <View className="ruleView">{Rule}</View>

          <Image
            src={iconGridCardBgBottom}
            className="iconGridCardBgBottom"
          ></Image>
        </View>
        {/* 底部图片 */}
      </View>
    );
  }
}
