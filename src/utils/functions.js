export const randomValuesGenerator = (
  start = 1,
  end,
  step = 1,
  outputCount
) => {
  const _inRangeNumbers = inRangeNumbers(start, end, step);
  const range = end - start;

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(_inRangeNumbers[random]);
    _inRangeNumbers[random] = _inRangeNumbers[range - i];
  }

  return result;
};

export const randomNumberGenarator = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const sortArrayBasedOnObjProperty = (list, property, reverse = 0) => {
  let matchingVal = 1;
  if (reverse) matchingVal = -1;
  return list.sort((a, b) =>
    a[property] > b[property]
      ? -matchingVal
      : a[property] === b[property]
      ? matchingVal
      : matchingVal
  );
};

export const inRangeNumbers = (start, end, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};

export const doesAllKeysHaveValue = (obj) => {
  let allValuesExist = true;
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key]) && !obj[key].length) {
      allValuesExist = false;
    } else if (typeof obj[key] === "object") {
      allValuesExist = doesAllKeysHaveValue(obj[key]);
    } else if (!obj[key]) {
      allValuesExist = false;
    }
  });
  return allValuesExist;
};

export const CamelCaseToString = (str) => {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function (x) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
    })
    .join(" ");
};
