import Taro, { useEffect, useState, useRouter } from '@tarojs/taro';
import {
  View,
  Image,
  Text,
  Canvas,
  CoverImage,
  CoverView,
} from '@tarojs/components';
import classNames from 'classnames';
import './scratchers.less';
const local_img_base =
  'https://xinya-shop.oss-cn-hangzhou.aliyuncs.com/images/static/';
const bg_scratchers = `${local_img_base}bg_scratchers.png`;
const award_history = `${local_img_base}award_history_scratchers.png`;
const headerImg = `${local_img_base}banner_scratchers.png`;
const iconGridPrizeModal = `${local_img_base}gridPrizeModal@2x.png`;
const iconGridPrizeHistoryModal = `${local_img_base}gridPrizeHistoryModal@2x.png`;
const congratulation_text = `${local_img_base}congratulation_scratchers.png`;
const bg = `${local_img_base}start_scratchers_scratchers.png`;
const scratchers_scratchers = `${local_img_base}scratchers_scratchers.png`;
const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
const activityDetail = {
  activity_id: '96759449452679168',
  activity_name: '呱呱呱',
  back_url: '',
  draw_info: [
    {
      draw_id: '96759450111184896',
      prize: '',
      prize_name: 0,
      prize_name_temp: '不中奖',
      prize_type: 4,
      prize_url: '',
      probability: 30.0,
      remark: 'no',
    },
    {
      draw_id: '96759450111184897',
      prize: '10积分',
      prize_name: 1,
      prize_name_temp: '一等奖',
      prize_type: 1,
      prize_url: '/upload/2020/4/16/1587023861393322988.png',
      probability: 30.0,
      remark: 'good',
    },
    {
      draw_id: '96759450111184898',
      prize: '50元',
      prize_name: 2,
      prize_name_temp: '二等奖',
      prize_type: 3,
      prize_url: '',
      probability: 40.0,
      remark: '50元钱钱！',
    },
  ],
  draw_number: 0,
  draw_type: 1,
  draw_type_name: '刮刮卡',
  end_time: '2020-05-23 00:00:00',
  rule: '1、sdfs\n2、25523\n3、\n4、\n5、\n',
  shop_id: '1',
  source_type: 0,
  source_type_name: '',
  start_time: '2020-04-16 16:00:00',
  title: '呱呱呱呱呱呱呱',
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
const Scratchers = () => {
  let [ctxs, setCtx] = useState(null);
  const [showResult, setResultModalVisible] = useState(false);
  const [showResultHistory, setResultHistoryModalVisible] = useState(false);
  const [canDraw, setDrawStatus] = useState(true);
  const [resultData, setResultData] = useState({
    isWin: false,
    prizeName: '',
    prizeType: '',
    recordId: '',
    remark: '',
  });
  const router = useRouter();
  const { activity_id } = router.params;
  const shop_Id = Taro.getStorageSync('shop_id');
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
  let xpoingList = [];
  let ypoingList = [];

  //初始画布
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      const query = Taro.createSelectorQuery();
      query
        .select('#posterBoard')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(
            0,
            0,
            res[0].width * pixelRatio,
            res[0].height * pixelRatio
          );
          canvas.width = res[0].width * pixelRatio;
          canvas.height = res[0].height * pixelRatio;
          ctx.scale(pixelRatio, pixelRatio);
          ctx.fillStyle = '#ffffff';
          let img1 = canvas.createImage();
          img1.onload = () => {
            ctx.drawImage(img1, 0, 0, 345, 150);
            let img2 = canvas.createImage();
            img2.onload = () => {
              ctx.drawImage(img2, 77, 52, 185, 45);
            };
            img2.src = bg;
          };
          img1.src = scratchers_scratchers;
          setCtx(ctx);
        });
    } else {
      let canvas = document.getElementById('posterBoard');
      canvas.height = 150 * pixelRatio;
      canvas.width = 320 * pixelRatio;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 320 * pixelRatio, 150 * pixelRatio);
      ctx.scale(pixelRatio, pixelRatio);
      ctx.fillStyle = '#ffffff';
      const maskImg = document.createElement('img');
      // maskImg.crossOrigin = 'Anonymous';
      maskImg.src = scratchers_scratchers;
      const textImg = document.createElement('img');
      // textImg.crossOrigin = 'Anonymous';
      textImg.src = bg;
      Promise.all([
        new Promise((resolve) => {
          maskImg.onload = function () {
            resolve('loaded');
          };
        }),
        new Promise((resolve) => {
          textImg.onload = function () {
            resolve('loaded');
          };
        }),
      ]).then(() => {
        ctx.drawImage(maskImg, 0, 0, 320, 150);
        ctx.drawImage(textImg, 72, 52, 185, 45);
        setCtx(ctx);
      });
    }
  }, []);

  //h5,监听画布事件，原生canvas无touch事件接口
  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      const canvas = document.getElementById('posterBoard');
      canvas.addEventListener('touchstart', eraser_h5, false);
      canvas.addEventListener('touchmove', eraser_h5, false);
      canvas.addEventListener('touchend', touchEnd, false);
    }
    return () => {
      if (process.env.TARO_ENV === 'h5') {
        const canvas = document.getElementById('posterBoard');
        canvas.removeEventListener('touchstart', eraser_h5, false);
        canvas.removeEventListener('touchmove', eraser_h5, false);
        canvas.removeEventListener('touchend', touchEnd, false);
      }
    };
  });

  const initCanvas = () => {
    if (process.env.TARO_ENV === 'weapp') {
      const query = Taro.createSelectorQuery();
      query
        .select('#posterBoard')
        .fields({ node: true, size: true })
        .exec((res) => {
          console.log('res', res);
          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(
            0,
            0,
            res[0].width * pixelRatio,
            res[0].height * pixelRatio
          );
          canvas.width = res[0].width * pixelRatio;
          canvas.height = res[0].height * pixelRatio;
          // ctx.scale(pixelRatio, pixelRatio);
          ctx.fillStyle = '#ffffff';
          let img1 = canvas.createImage();
          img1.onload = () => {
            ctx.drawImage(img1, 0, 0, 345, 150);
            let img2 = canvas.createImage();
            img2.onload = () => {
              ctx.drawImage(img2, 77, 52, 185, 45);
            };
            img2.src = bg;
          };
          img1.src = scratchers_scratchers;
          setCtx(ctx);
        });
    } else {
      let canvas = document.getElementById('posterBoard');
      canvas.height = 150 * pixelRatio;
      canvas.width = 320 * pixelRatio;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 320 * pixelRatio, 150 * pixelRatio);
      ctx.scale(pixelRatio, pixelRatio);
      ctx.fillStyle = '#ffffff';
      const maskImg = document.createElement('img');
      // maskImg.crossOrigin = 'Anonymous';
      maskImg.src = scratchers_scratchers;
      const textImg = document.createElement('img');
      // textImg.crossOrigin = 'Anonymous';
      textImg.src = bg;
      Promise.all([
        new Promise((resolve) => {
          maskImg.onload = function () {
            resolve('loaded');
          };
        }),
        new Promise((resolve) => {
          textImg.onload = function () {
            resolve('loaded');
          };
        }),
      ]).then(() => {
        ctx.drawImage(maskImg, 0, 0, 320, 150);
        ctx.drawImage(textImg, 72, 52, 185, 45);
        setCtx(ctx);
      });
    }
  };

  const touchStart = (e) => {
    if (user_draw_number > 0) {
      if (
        e.touches[0].x < 26 ||
        e.touches[0].x > 324 ||
        e.touches[0].y < 27 ||
        e.touches[0].y > 124
      ) {
        return;
      }
      if (canDraw) {
        eraser(e, true);
      }
    } else {
      Taro.showToast({
        title: '您还没有抽奖机会哦！',
        icon: 'none',
      });
    }
  };

  const touchMove = (e) => {
    if (user_draw_number <= 0) {
      return;
    }
    //超出区域，不清除
    if (
      e.touches[0].x < 26 ||
      e.touches[0].x > 324 ||
      e.touches[0].y < 27 ||
      e.touches[0].y > 124
    ) {
      return;
    }
    if (canDraw) {
      xpoingList = [...new Set([...xpoingList, e.touches[0].x])];
      ypoingList = [...new Set([...ypoingList, e.touches[0].y])];
      eraser(e);
    }
  };

  //清除刮动的区域
  const eraser = (e, bool) => {
    if (user_draw_number <= 0) {
      return;
    }
    if (ctxs == null) {
      return;
    }
    let x = e.touches[0].x,
      y = e.touches[0].y;
    ctxs.clearRect(x - 8, y - 8, 16, 16);
  };

  const touchEnd = () => {
    if (user_draw_number <= 0 || !canDraw) {
      return;
    }
    const minX = Math.min(...xpoingList);
    const maxX = Math.max(...xpoingList);
    const minY = Math.min(...ypoingList);
    const maxY = Math.max(...ypoingList);
    console.log('min,max', xpoingList, ypoingList);
    if (maxX - minX > 50 && maxY - minY > 20 && user_draw_number > 0) {
      setDrawStatus(false);
      // dispatch({
      //   type: 'bigWheel/activityBegin',
      //   payload: { activity_Id: activity_id, shop_Id },
      //   callback: (res) => {
      //     if (res) {
      //       let target = activityDetail.draw_info.find((item) => item.draw_id == res.draw_id);
      //       // 抽奖完刷新历史记录
      //       dispatch({
      //         type: 'luckyDraw/queryHistoryList',
      //         payload: {
      //           shop_id: shop_Id,
      //           activity_Id: activity_id,
      //         },
      //       });
      //       // 抽奖完刷新抽奖次数
      //       dispatch({
      //         type: 'bigWheel/queryActivityDetail',
      //         payload: { activity_Id: activity_id, shop_Id },
      //       });
      //       setResultData({
      //         isWin: target.prize_name == 0 ? false : true,
      //         prizeName: target.prize_name_temp,
      //         prizeType: target.prize_type,
      //         recordId: res.record_id,
      //         remark: target.remark,
      //       });
      setResultModalVisible(true);
      //     } else {
      //     }
      //   },
      // });
    }
    if (maxX - minX > 120 && maxY - minY > 30 && user_draw_number > 0) {
      setTimeout(() => {
        initCanvas();
        setDrawStatus(true);
        xpoingList = [];
        ypoingList = [];
      }, 500);
    }
  };

  const eraser_h5 = (e) => {
    e.preventDefault();
    if (user_draw_number > 0) {
      if (ctxs === null || !canDraw) {
        return;
      }
      //超出区域，不清除
      if (
        e.touches[0].clientX < ctxs.canvas.offsetLeft + 18 ||
        e.touches[0].clientX > ctxs.canvas.offsetLeft + 302 ||
        e.touches[0].clientY < ctxs.canvas.offsetTop + 18 ||
        e.touches[0].clientY > ctxs.canvas.offsetTop + 134
      ) {
        return;
      }
      let x = e.touches[0].clientX - 8,
        y = e.touches[0].clientY - 8;
      xpoingList = [...new Set([...xpoingList, x - ctxs.canvas.offsetLeft])];
      ypoingList = [...new Set([...ypoingList, y - ctxs.canvas.offsetTop])];
      ctxs.clearRect(
        x - ctxs.canvas.offsetLeft,
        y - ctxs.canvas.offsetTop,
        16,
        16
      );
    } else {
      Taro.showToast({
        title: '您还没有抽奖机会哦！',
        icon: 'none',
      });
    }
  };

  const notReceiveGift = () => {
    setResultModalVisible(false);
    setDrawStatus(true);
    xpoingList = [];
    ypoingList = [];
  };

  // 领取奖品
  const receiveGift = () => {
    // 领取完关闭弹窗
    setResultModalVisible(false);
    setDrawStatus(true);
    xpoingList = [];
    ypoingList = [];
  };

  return (
    <View className="shake_page">
      <View
        className="bg_shake"
        style={{
          backgroundImage: `url(${bg_scratchers})`,
        }}
      >
        {process.env.TARO_ENV === 'weapp' ? (
          <Canvas
            onClick={(e) => e.stopPropagation()}
            className="canvas_content"
            // canvasId="posterBoard"
            id="posterBoard"
            type="2d"
            disableScroll={true}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            style={{
              height: '150Px',
              width: '345Px',
              borderRadius: '10Px',
              backgroundImage: `url(${congratulation_text})`,
            }}
          ></Canvas>
        ) : (
          <canvas
            className="canvas_content"
            disableScroll={true}
            id="posterBoard"
            style={{
              height: '150Px',
              width: '345Px',
              borderRadius: '10Px',
              backgroundImage: `url(${congratulation_text})`,
            }}
          ></canvas>
        )}

        <View className="scratchers_times">
          您还有
          <Text style={{ color: 'rgba(255,119,60,1)' }}>
            {user_draw_number || 0}
          </Text>
          次刮奖机会
        </View>

        <View className="award_history">
          <View
            className="award_history_text"
            onClick={() => setResultHistoryModalVisible(true)}
          >
            中奖历史
          </View>
          <Image className="award_history_img" src={award_history} />
        </View>

        <View
          className="prize_list_header"
          style={{
            backgroundImage: `url(${headerImg})`,
          }}
        >
          <Text className="prize_list_text">奖品名单</Text>
        </View>
        <View className="prize_list">
          {prizeList.map((item, index) => (
            <View
              key={item.id}
              className={classNames(
                'prizeItem',
                index !== prizeList.length - 1 && 'borderBottom'
              )}
            >
              <View className="level">{item.level}</View>
              <View className="prize">{item.prize}</View>
            </View>
          ))}
        </View>

        <View
          className="prize_list_header small_marginTop"
          style={{
            backgroundImage: `url(${headerImg})`,
          }}
        >
          <Text className="prize_list_text">游戏规则</Text>
        </View>
        <View className="ruleTxt">{Rule}</View>
      </View>
      {/* 中奖提示弹窗 */}

      {showResult && process.env.TARO_ENV === 'weapp' && (
        <CoverView className="gridCard-modal">
          <CoverView className="gridCard-modal-mask"></CoverView>
          <CoverView className="gridCard-modal-content">
            <CoverImage
              className="gridCard-modal-img"
              src={iconGridPrizeModal}
            ></CoverImage>
            <CoverView className="txt1">
              {resultData.isWin ? winText : failText}
            </CoverView>
            {resultData.isWin && (
              <CoverView className="prizeName">{prizeName}</CoverView>
            )}
            {!resultData.isWin && (
              <CoverView>
                <CoverView className="noPrizeName">
                  太可惜了竟然与奖品擦肩而过
                </CoverView>
                <CoverView className="noPrizeName1">换个姿势吧</CoverView>
              </CoverView>
            )}
            {resultData.isWin && (
              <CoverView className="btnGroup">
                <CoverView className="giveUpPrizeBtn" onClick={notReceiveGift}>
                  放弃奖品
                </CoverView>
                <CoverView className="getPrizeBtn" onClick={receiveGift}>
                  <CoverView>
                    {resultData.prizeType == 3
                      ? '联系客服领取奖品'
                      : '立即领取'}
                  </CoverView>
                </CoverView>
              </CoverView>
            )}
            {!resultData.isWin && (
              <CoverView
                className="noPrizeBtn"
                onClick={() => {
                  setResultModalVisible(false);
                  setDrawStatus(true);
                  xpoingList = [];
                  ypoingList = [];
                }}
              >
                好的
              </CoverView>
            )}
          </CoverView>
        </CoverView>
      )}

      {showResult && process.env.TARO_ENV === 'h5' && (
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
                <View className="getPrizeBtn" onClick={receiveGift}>
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
                  setResultModalVisible(false);
                  setDrawStatus(true);
                  xpoingList = [];
                  ypoingList = [];
                }}
              >
                好的
              </View>
            )}
          </View>
        </View>
      )}

      {/* 中奖记录弹窗 */}

      {showResultHistory && process.env.TARO_ENV === 'weapp' && (
        <CoverView className="gridCard-history-modal">
          <CoverView className="gridCard-history-modal-mask"></CoverView>
          <CoverView className="gridCard-history-modal-content">
            <CoverImage
              className="iconSlotPrizeHistoryModal"
              src={iconGridPrizeHistoryModal}
            ></CoverImage>
            <CoverView className="gridCard-history-modal-table">
              {historyData.map((item, index) => {
                return (
                  <CoverView className="gridCard-history-modal-item">
                    <CoverView className="firstView">
                      <CoverView className="txt1">{item.award_name}</CoverView>
                      <CoverView className="txt1">{item.award}</CoverView>
                    </CoverView>
                    <CoverView className="secondView">
                      <CoverView className="txt1">
                        {item.winning_time}
                      </CoverView>
                      <CoverView className="txt2">
                        {item.exchange_status_name}
                      </CoverView>
                    </CoverView>
                  </CoverView>
                );
              })}
            </CoverView>
            <CoverView
              className="okBtn"
              onClick={() => setResultHistoryModalVisible(false)}
            >
              知道了
            </CoverView>
          </CoverView>
        </CoverView>
      )}

      {showResultHistory && process.env.TARO_ENV === 'h5' && (
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
    </View>
  );
};

export default Scratchers;

Scratchers.config = {
  navigationBarTitleText: '刮刮乐',
};
