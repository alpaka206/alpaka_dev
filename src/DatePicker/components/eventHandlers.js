export function handleTouchStart(selectorInstance, e, touchData) {
  selectorInstance.elems.el.addEventListener(
    "touchmove",
    selectorInstance.events.touchmove
  );
  document.addEventListener("mousemove", selectorInstance.events.touchmove);
  let eventY = e.clientY || e.touches[0].clientY;
  touchData.startY = eventY;
  touchData.yArr = [[eventY, new Date().getTime()]];
  touchData.touchScroll = selectorInstance.scroll;
  selectorInstance._stop();
}

export function handleTouchMove(selectorInstance, e, touchData) {
  let eventY = e.clientY || e.touches[0].clientY;
  touchData.yArr.push([eventY, new Date().getTime()]);
  if (touchData.length > 5) {
    touchData.unshift();
  }

  let scrollAdd = (touchData.startY - eventY) / selectorInstance.itemHeight;
  let moveToScroll = scrollAdd + selectorInstance.scroll;

  if (selectorInstance.type === "normal") {
    if (moveToScroll < 0) {
      moveToScroll *= 0.3;
    } else if (moveToScroll > selectorInstance.source.length) {
      moveToScroll =
        selectorInstance.source.length +
        (moveToScroll - selectorInstance.source.length) * 0.3;
    }
  } else {
    moveToScroll = selectorInstance._normalizeScroll(moveToScroll);
  }

  touchData.touchScroll = selectorInstance._moveTo(moveToScroll);
}

export function handleTouchEnd(selectorInstance, e, touchData) {
  selectorInstance.elems.el.removeEventListener(
    "touchmove",
    selectorInstance.events.touchmove
  );
  document.removeEventListener("mousemove", selectorInstance.events.touchmove);

  let v;
  if (touchData.yArr.length === 1) {
    v = 0;
  } else {
    let startTime = touchData.yArr[touchData.yArr.length - 2][1];
    let endTime = touchData.yArr[touchData.yArr.length - 1][1];
    let startY = touchData.yArr[touchData.yArr.length - 2][0];
    let endY = touchData.yArr[touchData.yArr.length - 1][0];

    v =
      (((startY - endY) / selectorInstance.itemHeight) * 1000) /
      (endTime - startTime);
    let sign = v > 0 ? 1 : -1;
    v = Math.abs(v) > 30 ? 30 * sign : v;
  }

  selectorInstance.scroll = touchData.touchScroll;
  selectorInstance._animateMoveByInitV(v);
}
