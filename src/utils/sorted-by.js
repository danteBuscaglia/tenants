export const sortByString = (field, list) => {
  return list.sort(function (a, b) {
    if (a[field] > b[field]) {
      return 1;
    }
    if (b[field] > a[field]) {
      return -1;
    }
    return 0;
  });
}

export const sortByDate = (date, list) => {
  return list.sort(function (a, b) {
    if (new Date(a[date]).getTime() > new Date(b[date]).getTime()) {
      return 1;
    }
    if (new Date(b[date]).getTime() > new Date(a[date]).getTime()) {
      return -1;
    }
    return 0;
  });
}