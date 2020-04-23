import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Image, Text, Audio } from '@tarojs/components';
import classNames from 'classnames';
import shakeAudio from '@/static/shake.mp3';
import './shake.scss';
const local_img_base =
  'https://xinya-shop.oss-cn-hangzhou.aliyuncs.com/images/static/';
const bg_shake = `${local_img_base}bg_shake.png`;
const hand_shake = `${local_img_base}hand_shake.png`;
const middle_bg_shake = `${local_img_base}middle_bg_shake.png`;
const note_bg_shake = `${local_img_base}note_bg_shake.png`;
const note_shake = `${local_img_base}note_shake.png`;
const iconGridPrizeModal = `${local_img_base}gridPrizeModal@2x.png`;
const iconGridPrizeHistoryModal = `${local_img_base}gridPrizeHistoryModal@2x.png`;
const historyIcon = `${local_img_base}award_history_shake.png`;
const activityDetail = {
  activity_id: '98234488882597888',
  activity_name: '摇一摇2',
  back_url: '',
  draw_info: [
    {
      draw_id: '98234489130061824',
      prize: '',
      prize_name: 0,
      prize_name_temp: '不中奖',
      prize_type: 4,
      prize_url: '',
      probability: 30.0,
      remark: 'no',
    },
    {
      draw_id: '98234489130061825',
      prize: '20积分',
      prize_name: 1,
      prize_name_temp: '一等奖',
      prize_type: 1,
      prize_url: '',
      probability: 20.0,
      remark: '20积分',
    },
    {
      draw_id: '98234489130061826',
      prize: '袜子',
      prize_name: 2,
      prize_name_temp: '二等奖',
      prize_type: 3,
      prize_url: '',
      probability: 50.0,
      remark: '袜子一双',
    },
  ],
  draw_number: 0,
  draw_type: 2,
  draw_type_name: '摇一摇',
  end_time: '2020-04-30 00:00:00',
  rule: '1.sfs\n2.sdf\n',
  shop_id: '1',
  source_type: 0,
  source_type_name: '',
  start_time: '2020-04-20 17:40:00',
  title: '摇一摇',
  user_draw_number: 79,
};
const historyData = [
  {
    award: '手机',
    award_name: '二等奖',
    exchange_status_name: '未领取',
    winning_time: '2020-04-15',
  },
  {
    award: '手机',
    award_name: '二等奖',
    exchange_status_name: '未领取',
    winning_time: '2020-04-15',
  },
  {
    award: '20积分',
    award_name: '一等奖',
    exchange_status_name: '未领取',
    winning_time: '2020-04-15',
  },
  {
    award: '手机',
    award_name: '二等奖',
    exchange_status_name: '未领取',
    winning_time: '2020-04-15',
  },
  {
    award: '20积分',
    award_name: '一等奖',
    exchange_status_name: '未领取',
    winning_time: '2020-04-15',
  },
  {
    award: '20积分',
    award_name: '一等奖',
    exchange_status_name: '未领取',
    winning_time: '2020-04-15',
  },
];
const Shake = () => {
  const [startAnimation, setAnimationState] = useState(false);
  const [showResult, setResultModalVisible] = useState(false);
  const [showResultHistory, setResultHistoryModalVisible] = useState(false);
  const [resultData, setResultData] = useState({
    isWin: false,
    prizeName: '',
    prizeType: '',
    recordId: '',
    remark: '',
  });
  const { draw_info = [], user_draw_number = 0, rule = '' } = activityDetail;
  const prizeList = draw_info
    .filter((item) => item.prize)
    .map((item = {}) => ({
      level: item.prize_name_temp,
      prize: item.prize,
      id: item.draw_id,
    }));
  let Rule = rule.replace(/\\n/g, '\n');
  let winText =
    resultData.remark.length === 0
      ? `您获得${resultData.prizeName}`
      : resultData.remark;
  let failText =
    resultData.remark.length === 0 ? '很遗憾您没有中奖' : resultData.remark;
  const audioCtx = Taro.createAudioContext('audioCtx');

  //绑定监听
  useEffect(() => {
    initShake();
  }, []);

  const initShake = () => {
    Taro.onAccelerometerChange((res) => {
      if (Math.abs(res.x) > 0.5) {
        handleStartAnimation();
      }
    });
  };

  //摇一摇动画开始&查询结果
  const handleStartAnimation = () => {
    Taro.stopAccelerometer();
    wx.offAccelerometerChange(); //Taro暂时无该api
    setAnimationState(true);
    setTimeout(() => {
      setResultModalVisible(true);
      setAnimationState(false);
      audioCtx.play();
      Taro.vibrateLong({
        success: () => console.log('success'),
        fail: () => console.log('fail'),
        complete: () => console.log('complete'),
      });
    }, 2000);
  };

  const notReceiveGift = () => {
    Taro.startAccelerometer({ interval: 'normal' });
    initShake();
    // 关闭弹窗
    setResultModalVisible(false);
  };

  // 领取奖品
  const receiveGift = (prizeType) => {
    Taro.startAccelerometer({ interval: 'normal' });
    initShake();
    // 领取完关闭弹窗
    setResultModalVisible(false);
  };

  return (
    <View className="shake_page">
      <View
        className="bg_shake"
        style={{
          backgroundImage: `url(${bg_shake})`,
        }}
      >
        <View
          className="history_icon_wrap"
          onClick={() => setResultHistoryModalVisible(true)}
        >
          <Image src={historyIcon} className="history_icon" />
        </View>
        <Image className="note_shake" src={note_shake} />
        <Text className="note_text">
          您共有{user_draw_number || 0}次抽奖机会
        </Text>
        <Image
          className={classNames(
            'hand_shake',
            startAnimation && 'shake_animation'
          )}
          src={hand_shake}
        />
      </View>
      <View
        className="middle_bg"
        style={{
          backgroundImage: `url(${middle_bg_shake})`,
        }}
      >
        <View
          className="note_bg_shake"
          style={{
            backgroundImage: `url(${note_bg_shake})`,
          }}
        >
          <Text className="note">奖品展示</Text>
        </View>
        <View className="border">
          <View className="prizeItem color_1">
            <View className="cell outline cell_1">奖项</View>
            <View className="cell outline cell_1">奖品</View>
          </View>
          {prizeList.map((item) => (
            <View key={item.id} className="prizeItem">
              <View className="cell outline">{item.level}</View>
              <View className="cell outline">{item.prize}</View>
            </View>
          ))}
        </View>
        <View
          className="note_bg_shake rule"
          style={{
            backgroundImage: `url(${note_bg_shake})`,
          }}
        >
          <Text className="note">活动规则</Text>
        </View>
        <View className="border">
          <Text className="rule_text">{Rule}</Text>
        </View>
      </View>

      {/* 中奖结果弹窗 */}
      {showResult && (
        <View className="gridCard-modal">
          <View className="gridCard-modal-mask"></View>
          <View className="gridCard-modal-content">
            <Image
              className="gridCard-modal-img"
              src={iconGridPrizeModal}
            ></Image>
            <Text className="txt1">
              {resultData.isWin ? winText : failText}
            </Text>
            {resultData.isWin && <Text className="prizeName">{prizeName}</Text>}
            {!resultData.isWin && (
              <View>
                <Text className="noPrizeName">太可惜了竟然与奖品擦肩而过</Text>
                <Text className="noPrizeName1">换个姿势吧</Text>
              </View>
            )}
            {resultData.isWin && (
              <View className="btnGroup">
                <View className="giveUpPrizeBtn" onClick={notReceiveGift}>
                  放弃奖品
                </View>
                <View
                  className="getPrizeBtn"
                  onClick={() => receiveGift(resultData.prizeType)}
                >
                  <Text>
                    {resultData.prizeType == 3
                      ? '联系客服领取奖品'
                      : '立即领取'}
                  </Text>
                </View>
              </View>
            )}
            {!resultData.isWin && (
              <View
                className="noPrizeBtn"
                onClick={() => {
                  Taro.startAccelerometer({ interval: 'normal' });
                  initShake();
                  setResultModalVisible(false);
                }}
              >
                好的
              </View>
            )}
          </View>
        </View>
      )}
      {/* 中奖历史弹窗 */}
      {showResultHistory && (
        <View className="gridCard-history-modal">
          <View className="gridCard-history-modal-mask"></View>
          <View className="gridCard-history-modal-content">
            <Image
              className="iconSlotPrizeHistoryModal"
              src={iconGridPrizeHistoryModal}
            ></Image>
            <View className="gridCard-history-modal-table">
              {historyData.map((item, index) => {
                return (
                  <View className="gridCard-history-modal-item">
                    <View className="firstView">
                      <Text className="txt1">{item.award_name}</Text>
                      <Text className="txt1">{item.award}</Text>
                    </View>
                    <View className="secondView">
                      <Text className="txt1">{item.winning_time}</Text>
                      <Text className="txt2">{item.exchange_status_name}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View
              className="okBtn"
              onClick={() => setResultHistoryModalVisible(false)}
            >
              知道了
            </View>
          </View>
        </View>
      )}
      <Audio src={shakeAudio} id="audioCtx" />
    </View>
  );
};

export default Shake;

Shake.config = {
  navigationBarTitleText: '摇一摇',
};
