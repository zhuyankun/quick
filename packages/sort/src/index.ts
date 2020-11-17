/**
 * js-quick-sort
 * @param array
 * @param compare
 */
const quicksort = <T>(array: T[], compare?: (a: T, b: T) => number) => {
  if (!Array.isArray(array) || array.length < 1) {
    return array;
  }

  if (compare !== undefined && typeof compare !== 'function') {
    throw new TypeError('The comparison function must be either a function or undefined');
  }

  const compareFn = compare || ((a, b) => +a - +b);
  if (array.length <= 50000) {
    array.sort(compareFn);
    return array;
  }

  const swap = (a: T[], i: number, j: number) => {
    if (i === j) return;
    const temp = a[i];
    array[i] = a[j];
    a[j] = temp;
  };

  const partition = (a: T[], l: number, r: number) => {
    let index = l;
    let pivot = a[r];

    for (let i = l; i < r; i++) {
      if (compareFn(a[i], pivot) < 0) {
        swap(a, index, i);
        index++;
      }
    }
    swap(a, index, r);

    return index;
  };
  const _ = (a: T[], l: number, r: number) => {
    if (l >= r) return;

    const t = partition(a, l, r);
    _(a, l, t - 1);
    _(a, t + 1, r);
  };

  _(array, 0, array.length - 1);

  return array;
};

export default quicksort;
