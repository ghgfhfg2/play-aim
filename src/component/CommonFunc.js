export function numberToKorean(number) {
  let inputNumber = number < 0 ? false : number;
  let unitWords = ["", "만", "억", "조", "경"];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = "";

  for (let i = 0; i < splitCount; i++) {
    let unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString =
      String(comma(resultArray[i])) + unitWords[i] + " " + resultString;
  }

  return resultString;
}

export function comma(num) {
  let len, point, str;
  let minus = false;
  if (num < 0) {
    minus = true;
  }
  num = num + "";
  if (minus) {
    num = num.substr(1);
  }
  point = num.length % 3;
  len = num.length;

  str = num.substring(0, point);
  while (point < len) {
    if (str != "") str += ",";
    str += num.substring(point, point + 3);
    point += 3;
  }
  if (minus) {
    str = "-" + str;
  }
  return str;
}
