import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components';
import './packetRain.less';

export default class PacketRain extends Component {
  state = {};
  config = {
    navigationBarTitleText: '红包雨'
  };

  render() {
    return <View className="indexView"></View>;
  }
}
