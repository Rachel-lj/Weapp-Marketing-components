import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './gridCard.less';

export default class GridCard extends Component {
  state = {
    card: [
      {
        id: 1,
        prizeName: '10金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0 //   :0 反面 , 1 正面
      },
      {
        id: 2,
        prizeName: '10金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 3,
        prizeName: '100金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 4,
        prizeName: '10金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 5,
        prizeName: '40金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 6,
        prizeName: '20金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 7,
        prizeName: '50金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 8,
        prizeName: '60金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      },
      {
        id: 9,
        prizeName: '10金币',
        img: 'https://imgs.solui.cn/weapp/prize.png',
        status: 0
      }
    ],

    ready: false // 是否点击开始抽奖
  };
  config = {
    navigationBarTitleText: '九宫格翻牌'
  };

  // 延迟返回 promise 方法  time:延迟时间
  runAsync = time => {
    return new Promise(function(resolve, reject) {
      const timer = setTimeout(function() {
        resolve();
        clearTimeout(timer);
      }, time);
    });
  };

  start = callback => {
    Taro.showLoading({
      mask: true
    });
    const { card } = this.state;
    console.log('点击开始抽奖时候的ready---', this.state.ready);
    if (this.state.ready) {
      Taro.hideLoading();
      Taro.showToast({
        title: `已经开启抽奖`,
        icon: 'none'
      });
      return;
    }

    this.setState({
      ready: true
    });
    this.runAsync(100)
      .then(() => {
        // 延迟100毫秒翻转第一排牌面
        for (let i = 0; i < 3; i++) {
          card[i].status = 1;
        }
        this.setState({
          card
        });
        return this.runAsync(200);
      })
      .then(() => {
        // 延迟200毫秒翻转第二排牌面
        for (let i = 3; i < 6; i++) {
          card[i].status = 1;
        }
        this.setState({
          card
        });
        return this.runAsync(200);
      })
      .then(() => {
        // 延迟200毫秒翻转第三排牌面
        for (let i = 6; i <= 8; i++) {
          card[i].status = 1;
        }
        this.setState({
          card
        });
        return this.runAsync(800);
      })
      .then(() => {
        // 将所有背面朝上
        for (let i = 0; i < 9; i++) {
          card[i].status = 0;
        }
        this.setState({
          card
        });
        return this.runAsync(1000);
      })
      .then(() => {
        // 洗牌动画
        for (let i = 0; i < 9; i++) {
          this.runAsync(i * 40)
            .then(() => {
              card[i].isMove = true;
              this.setState({
                card
              });
              return this.runAsync(i * 40 + 1200);
            })
            .then(() => {
              card[i].isMove = false;
              this.setState({
                card
              });

              return this.runAsync(1600);
            })
            .then(() => {
              // 结束后回调
              if (typeof callback === 'function') {
                callback();
              }
              Taro.hideLoading();
            });
        }
      });
  };

  // 子组件触发，点击打开单个卡片奖品
  openCard = e => {
    console.log('e1111-', e);
    console.log('ready---', this.state.ready);
    const { item, index } = e.currentTarget.dataset;
    const { card } = this.state;
    // 动画没有结束，或已经点开
    if (!this.state.ready || item.status == 1) {
      return;
    }
    // 改变卡片翻转状态 status :0 反面 , 1 正面
    card.map((cardItem, cardIndex) => {
      if (cardIndex == index) {
        cardItem.status = 1;
      }
      return cardItem;
    });
    this.setState({
      card: card
    });
    Taro.showToast({
      title: `你点击了第${index + 1}个`,
      icon: 'none'
    });
    console.log('this.state', this.state);
    // 为了防止作弊，洗牌动画并不能打乱奖品数据顺序，抽出什么奖项通过再次访问接口获得
  };
  render() {
    const { card } = this.state;
    return (
      <View className="container">
        <View className="grid-card">
          <View className="card">
            {card.map((item, index) => {
              return (
                <View key="index">
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
                    <Image
                      className="front"
                      src="https://imgs.solui.cn/weapp/card.png"
                    ></Image>
                    <View className="back">
                      <Image src={item.img}></Image>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View>
          <View className="button" onClick={this.start}>
            开始抽奖
          </View>
        </View>
      </View>
    );
  }
}
