import Taro from '@tarojs/taro';

//去跳转
function gotoPage(url, params = {}, options = {}) {
  console.log('----gotoPage----start');
  let method = options.method || 'navigateTo';
  if (url && typeof url === 'string') {
    let extend = '';
    for (let key in params) {
      extend += '&' + key + '=' + params[key];
    }
    if (extend.length) {
      url += '?' + extend.substr(1, extend.length - 1);
    }
    Taro[method]({ url });
  }
}
//取得屏幕的尺寸
function getScreenSize() {
  let res = Taro.getSystemInfoSync();
  let _Size = {
    width: res.windowWidth,
    height: res.windowHeight,
  };
  return _Size;
}
//字符串转数组
function stringToArr(str) {
  if (str) {
    let arr = [];
    arr = str.split('，');
    if (arr.length === 1) {
      arr = str.split(',');
    }
    let _arr = [];
    for (let i = 0; i < arr.length; i++) {
      let _value = arr[i];
      _arr.push(_value);
    }
    return _arr;
  } else {
    return '';
  }
}
//数组转字符串
function arrToString(arr) {
  let _str = '';
  for (let i = 0; i < arr.length; i++) {
    if (i == arr.length - 1) {
      _str += arr[i];
    } else {
      _str += arr[i] + ',';
    }
  }
  return _str;
}

function randomPrize(isSurprise) {
  // 奖品候选
  const prizeCandidate = [1, 2, 3];

  if (isSurprise) {
    // 如果中奖了 [1,1,1] [2,2,2] [3,3,3]随机一个
    return new Array(3).fill(
      prizeCandidate[Math.floor(Math.random() * prizeCandidate.length)]
    );
  } else {
    // 如果没中奖, 随机生成一个结果
    const result = [
      prizeCandidate[Math.floor(Math.random() * prizeCandidate.length)],
      prizeCandidate[Math.floor(Math.random() * prizeCandidate.length)],
      prizeCandidate[Math.floor(Math.random() * prizeCandidate.length)],
    ];
    if (result.every((a) => a == result[0])) {
      // 从奖品候选中去掉都相同的奖品, 在剩余的奖品里重新抽一个
      const newPrizeCandidate = prizeCandidate.filter((a) => a != result[0]);
      result[result.length - 1] =
        newPrizeCandidate[Math.floor(Math.random() * newPrizeCandidate.length)];
    }
    return result;
  }
}
export { gotoPage, getScreenSize, stringToArr, arrToString, randomPrize };
