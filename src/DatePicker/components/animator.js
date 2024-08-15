// animator.js
export class Animator {
  constructor(selector, easing) {
    this.selector = selector;
    this.easing = easing;
  }

  async animateMoveByInitV(initV) {
    let initScroll;
    let finalScroll;
    let totalScrollLen;
    let a;
    let t;

    if (this.selector.type === "normal") {
      if (
        this.selector.scroll < 0 ||
        this.selector.scroll > this.selector.source.length - 1
      ) {
        a = this.selector.exceedA;
        initScroll = this.selector.scroll;
        finalScroll =
          this.selector.scroll < 0 ? 0 : this.selector.source.length - 1;
        totalScrollLen = initScroll - finalScroll;
        t = Math.sqrt(Math.abs(totalScrollLen / a));
        initV = a * t;
        initV = this.selector.scroll > 0 ? -initV : initV;
        await this.animateToScroll(initScroll, finalScroll, t);
      } else {
        initScroll = this.selector.scroll;
        a = initV > 0 ? -this.selector.a : this.selector.a;
        t = Math.abs(initV / a);
        totalScrollLen = initV * t + (a * t * t) / 2;
        finalScroll = Math.round(this.selector.scroll + totalScrollLen);
        finalScroll = Math.max(
          0,
          Math.min(finalScroll, this.selector.source.length - 1)
        );
        totalScrollLen = finalScroll - initScroll;
        t = Math.sqrt(Math.abs(totalScrollLen / a));
        await this.animateToScroll(initScroll, finalScroll, t, "easeOutQuart");
      }
    } else {
      initScroll = this.selector.scroll;
      a = initV > 0 ? -this.selector.a : this.selector.a;
      t = Math.abs(initV / a);
      totalScrollLen = initV * t + (a * t * t) / 2;
      finalScroll = Math.round(this.selector.scroll + totalScrollLen);
      await this.animateToScroll(
        this.selector.scroll,
        finalScroll,
        t,
        "easeOutQuart"
      );
    }

    this.selector._selectByScroll(this.selector.scroll);
  }

  animateToScroll(initScroll, finalScroll, t, easingName = "easeOutQuart") {
    if (initScroll === finalScroll || t === 0) {
      this.selector._moveTo(initScroll);
      return;
    }

    let start = new Date().getTime() / 1000;
    let pass = 0;
    let totalScrollLen = finalScroll - initScroll;

    return new Promise((resolve) => {
      this.selector.moving = true;
      const tick = () => {
        pass = new Date().getTime() / 1000 - start;

        if (pass < t) {
          this.selector.scroll = this.selector._moveTo(
            initScroll + this.easing[easingName](pass / t) * totalScrollLen
          );
          this.selector.moveT = requestAnimationFrame(tick);
        } else {
          resolve();
          this.selector._stop();
          this.selector.scroll = this.selector._moveTo(
            initScroll + totalScrollLen
          );
        }
      };
      tick();
    });
  }
}
