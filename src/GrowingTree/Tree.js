import Branch from "./Branch";

// 유틸리티 함수로 분리
const random = (min, max) => Math.random() * (max - min) + min; // 랜덤 숫자 생성 함수
const cos = (angle) => Math.cos((angle / 180) * Math.PI); // 각도를 라디안으로 변환하여 코사인 값 계산
const sin = (angle) => Math.sin((angle / 180) * Math.PI); // 각도를 라디안으로 변환하여 사인 값 계산
const depth = 11; // 나무의 깊이

const Tree = (ctx, posX, posY) => {
  const branches = Array.from({ length: depth }, () => []); // 각 깊이 레벨에 가지를 저장할 배열 초기화
  let cntDepth = 0; // 현재 깊이
  let animation = null; // 애니메이션 프레임 참조

  // 가지 생성 함수
  const createBranch = (startX, startY, angle, currentDepth) => {
    if (currentDepth === depth) return; // 최대 깊이에 도달하면 종료

    const len = currentDepth === 0 ? random(10, 13) : random(0, 11); // 가지의 길이 결정
    const endX = startX + cos(angle) * len * (depth - currentDepth); // 끝 X 좌표 계산
    const endY = startY + sin(angle) * len * (depth - currentDepth); // 끝 Y 좌표 계산

    branches[currentDepth].push(
      Branch(startX, startY, endX, endY, depth - currentDepth)
    );

    createBranch(endX, endY, angle - random(15, 23), currentDepth + 1); // 왼쪽 가지 생성
    createBranch(endX, endY, angle + random(15, 23), currentDepth + 1); // 오른쪽 가지 생성
  };

  // 가지 그리기 함수
  const draw = () => {
    if (cntDepth === depth) {
      cancelAnimationFrame(animation); // 애니메이션 종료
      return;
    }

    for (let i = cntDepth; i < branches.length; i++) {
      let pass = true;

      for (let j = 0; j < branches[i].length; j++) {
        pass = branches[i][j].draw(ctx); // 가지 그리기
      }

      if (!pass) break; // 가지가 완성되지 않으면 루프 종료
      cntDepth++;
    }

    animation = requestAnimationFrame(draw); // 다음 애니메이션 프레임 요청
  };

  createBranch(posX, posY, -90, 0); // 나무의 첫 가지 생성
  draw(); // 가지 그리기 시작
};

export default Tree;
