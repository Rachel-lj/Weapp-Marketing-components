import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Navigator } from '@tarojs/components';
import './index.less';

export default class Index extends Component {
  state = {
    components: [
      {
        title: '营销组件',
        children: [
          {
            id: 'big-wheel',
            url: '/pages/bigWheel/bigWheel',
            name: '大转盘动画',
            show: true
          },
          {
            id: 'packet-rain',
            url: '/pages/packetRain/packetRain',
            name: '红包雨动画',
            show: true
          },
          {
            id: 'grid-card',
            url: '/pages/gridCard1/gridCard',
            name: '翻翻看',
            show: true
          },
          {
            id: 'slot-machine',
            url: '/pages/slotMachine1/slotMachine',
            name: '老虎机动画',
            show: true
          },
          {
            id: 'golden-egg',
            url: '/pages/goldenEgg/goldenEgg',
            name: '砸金蛋',
            show: true
          },
          {
            id: 'scratch-card',
            url: '/pages/scratchCard/scratchCard',
            name: '刮刮卡',
            show: true
          },
          {
            id: 'shake',
            url: '/pages/shake/shake',
            name: '摇一摇',
            show: true
          }
        ]
      }
    ]
  };
  config = {
    navigationBarTitleText: '首页'
  };

  render() {
    const { components } = this.state;
    return (
      <View className="indexView">
        <View className="kind-list">
          {components.map((item, index) => {
            return (
              <View key="index">
                <View className="title">{item.title}</View>
                {item.children.map((item, index) => {
                  return (
                    <View key="index" className="kind-list-item">
                      {item.show && (
                        <View id={item.id} className="kind-list-item-hd">
                          <Navigator
                            url={item.url}
                            className="navigator"
                            hoverClass="none"
                          >
                            <View className="kind-list-text">{item.name}</View>
                          </Navigator>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
