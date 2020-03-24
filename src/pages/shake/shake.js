import Taro, { Component } from '@tarojs/taro';
import { View, Audio } from '@tarojs/components';
import ShakeAction from '@/components/shakeAction';
import './shake.less';

export default class Shake extends Component {
  state = {};
  config = {
    navigationBarTitleText: '摇一摇'
  };
  componentDidShow() {
    this.shake = new ShakeAction(this, {
      shakeThreshold: 100, // 阈值
      callback: () => {
        Taro.showModal({
          title: '提示',
          content: '恭喜您，中奖了',
          showCancel: false,
          success: res => {
            if (res.confirm) {
              this.shake.isStart = true;
              console.log('用户点击确定');
            } else if (res.cancel) {
              console.log('用户点击取消');
              this.shake.isStart = true;
            }
          }
        });
      }
    });
  }
  componentDidHide() {
    Taro.stopAccelerometer();
  }
  render() {
    const { anim } = this.state;
    return (
      <View className="index">
        <View className="index-hd">
          <View className="index-desc">
            以下是小程序摇一摇组件，组件样式仅供参考，开发者可根据自身需求自定义组件样式，具体属性参数详见开发文档。
          </View>
        </View>
        <View>
          <Audio
            src="https://yun.pfan123.com/shake_sound.mp3"
            id="shakeAudio"
          ></Audio>
          <View className={'shake_box ' + (anim ? 'anim' : '')}>
            <View className="shake_box_top"></View>
            <View className="shake_box_bottom"></View>
          </View>
        </View>
      </View>
    );
  }
}
