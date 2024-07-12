import Branch from "./Branch";

const Tree = (ctx, posX, posY) => {
  const branches = [];
  const depth = 11;
  let cntDepth = 0;
  let animation = null;

  // Initialize branches with empty arrays for each depth level
  for (let i = 0; i < depth; i++) {
    branches.push([]);
  }

  const random = (min, max) => Math.random() * (max - min) + min;

  const cos = (angle) => Math.cos((angle / 180) * Math.PI);
  const sin = (angle) => Math.sin((angle / 180) * Math.PI);

  const createBranch = (startX, startY, angle, currentDepth) => {
    if (currentDepth === depth) return;

    const len = currentDepth === 0 ? random(10, 13) : random(0, 11);

    const endX = startX + cos(angle) * len * (depth - currentDepth);
    const endY = startY + sin(angle) * len * (depth - currentDepth);

    branches[currentDepth].push(
      Branch(startX, startY, endX, endY, depth - currentDepth)
    );

    createBranch(endX, endY, angle - random(15, 23), currentDepth + 1);
    createBranch(endX, endY, angle + random(15, 23), currentDepth + 1);
  };

  const draw = () => {
    if (cntDepth === depth) {
      cancelAnimationFrame(animation);
      return;
    }

    for (let i = cntDepth; i < branches.length; i++) {
      let pass = true;

      for (let j = 0; j < branches[i].length; j++) {
        pass = branches[i][j].draw(ctx);
      }

      if (!pass) break;
      cntDepth++;
    }

    animation = requestAnimationFrame(draw);
  };

  createBranch(posX, posY, -90, 0);
  draw();
};

export default Tree;
