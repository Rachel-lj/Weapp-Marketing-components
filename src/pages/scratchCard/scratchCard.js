import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components';
import './scratchCard.less';

export default class ScratchCard extends Component {
  state = {};
  config = {
    navigationBarTitleText: '刮刮卡'
  };

  render() {
    return <View className="indexView"></View>;
  }
}
