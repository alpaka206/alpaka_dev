const Branch = (startX, startY, endX, endY, lineWidth) => {
  const color = "#000000"; // 가지의 색상
  const frame = 10; // 가지를 나누기 위한 프레임 수(숫자가 커질수록 천천히 만들어짐)
  let cntFrame = 0; // 현재 프레임

  // 구간별 가지의 길이 계산
  const gapX = (endX - startX) / frame;
  const gapY = (endY - startY) / frame;

  // 현재 구간의 끝 좌표
  let currentX = startX;
  let currentY = startY;

  const draw = (ctx) => {
    // 모든 프레임을 다 그리면 true 반환
    if (cntFrame === frame) return true;

    ctx.beginPath();

    currentX += gapX;
    currentY += gapY;

    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);

    ctx.lineWidth = lineWidth; // 가지의 두께
    ctx.strokeStyle = color; // 가지의 색상

    ctx.stroke();
    ctx.closePath();

    cntFrame++;

    // 아직 다 그리지 않았으면 false 반환
    return false;
  };

  return {
    draw,
  };
};

export default Branch;
