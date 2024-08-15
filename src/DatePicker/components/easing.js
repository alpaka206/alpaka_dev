//애니메이션의 속도를 제어
export const easing = {
  easeOutCubic: function (pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeOutQuart: function (pos) {
    return -(Math.pow(pos - 1, 4) - 1);
  },
};
