import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.less';

export default class GridCardAction extends Component {
  state = {
    properties: {
      // 九宫格卡片
      card: {
        type: Array,
        value: []
      }
    },
    data: {
      move: ''
    }
  };
  config = {
    navigationBarTitleText: '九宫格翻牌'
  };

  // 点击打开单个卡片，开奖
  openCard = event => {
    const { dataset } = event.currentTarget;
    console.log('event---', event);
    // 触发父组件方法
    this.props.onOpen(dataset);
  };
  render() {
    const { card } = this.props;
    console.log('this.props--', this.props);
    return (
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
    );
  }
}
