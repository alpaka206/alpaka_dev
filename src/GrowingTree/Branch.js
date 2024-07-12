const Branch = (startX, startY, endX, endY, lineWidth) => {
  const color = "#000000";
  const frame = 10; // 가지를 100등분으로 나누기 위한 변수 frame 선언
  let cntFrame = 0; // 현재 frame

  // 가지의 길이를 frame으로 나누어 구간별 길이를 구함
  const gapX = (endX - startX) / frame;
  const gapY = (endY - startY) / frame;

  // 구간별 가지가 그려질 때 끝 좌표
  let currentX = startX;
  let currentY = startY;

  const draw = (ctx) => {
    // 가지를 다 그리면 true 리턴
    if (cntFrame === frame) return true;

    ctx.beginPath();

    currentX += gapX;
    currentY += gapY;

    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);

    ctx.lineWidth = lineWidth;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    ctx.stroke();
    ctx.closePath();

    cntFrame++;

    // 다 안그렸으면 false를 리턴
    return false;
  };

  return {
    draw,
  };
};

export default Branch;
