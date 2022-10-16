export const ObjectGroupBy = (object, group) => {
  var ans = {};
  object.forEach(function (item) {
    var list = ans[item[group]];
    list ? list.push(item) : (ans[item[group]] = [item]);
  });
  return ans;
};

export const ObjectKeyReplace = (object, data, oldColumn, newColum) => {
  Object.keys(object).forEach((key) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][oldColumn] === key) {
        var newKey = data[i][newColum];
        object[newKey] = object[key];
        delete object[key];
        break;
      }
    }
  });
  return object;
};

export const TwoArraySort = (mainArray, secondaryArray) => {
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray.length - i - 1; j++) {
      if (mainArray[j] < mainArray[j + 1]) {
        [mainArray[j], mainArray[j + 1]] = [mainArray[j + 1], mainArray[j]];
        [secondaryArray[j], secondaryArray[j + 1]] = [
          secondaryArray[j + 1],
          secondaryArray[j],
        ];
      }
    }
  }
  return [mainArray, secondaryArray];
};
