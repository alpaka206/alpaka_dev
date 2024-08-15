import { easing } from "./easing.js";
import {
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
} from "./eventHandlers.js";
import { SelectorRenderer } from "./SelectorRenderer.js";
import { EventManager } from "./EventManager.js";
import { Animator } from "./animator.js";

export class IosSelector {
  constructor(options) {
    // 기본 설정
    let defaults = {
      el: "", // 대상 요소
      type: "infinite", // infinite: 무한 스크롤, normal: 비무한 스크롤
      count: 20, // 원형 선택기에 표시될 항목 수, 4의 배수여야 함
      sensitivity: 0.8, // 민감도
      source: [], // 항목 데이터 {value: xx, text: xx}
      value: null,
      onChange: null,
    };

    // 사용자 설정과 기본 설정을 병합
    this.options = Object.assign({}, defaults, options);
    this.options.count = this.options.count - (this.options.count % 4);
    Object.assign(this, this.options);

    // 계산된 값
    this.halfCount = this.options.count / 2;
    this.quarterCount = this.options.count / 4;
    this.a = this.options.sensitivity * 10; // 스크롤 감속도
    this.minV = Math.sqrt(1 / this.a); // 최소 초기 속도
    this.selected = this.source[0];

    this.exceedA = 10; // 초과 감속
    this.moveT = 0; // 스크롤 tick
    this.moving = false;

    this.elems = {
      el: document.querySelector(this.options.el),
      circleList: null,
      circleItems: null,
      highlight: null,
      highlightList: null,
      highListItems: null,
    };

    this.events = {
      touchstart: null,
      touchmove: null,
      touchend: null,
    };

    this.itemHeight = (this.elems.el.offsetHeight * 3) / this.options.count; // 항목 높이
    this.itemAngle = 360 / this.options.count; // 항목 간 회전 각도
    this.radius = this.itemHeight / Math.tan((this.itemAngle * Math.PI) / 180); // 원형 선택기의 반지름

    this.renderer = new SelectorRenderer(this);
    this.eventManager = new EventManager();
    this.animator = new Animator(this, easing);

    this.scroll = 0; // 스크롤 위치 (단위는 항목의 높이 또는 각도)
    this._init();
  }

  _init() {
    this.renderer.create(this.source);

    let touchData = {
      startY: 0,
      yArr: [],
    };

    for (let eventName in this.events) {
      this.events[eventName] = ((eventName) => {
        return (e) => {
          if (this.elems.el.contains(e.target) || e.target === this.elems.el) {
            e.preventDefault();
            if (this.source.length) {
              // 이벤트에 따라 적절한 함수 호출
              if (eventName === "touchstart") {
                handleTouchStart(this, e, touchData);
              } else if (eventName === "touchmove") {
                handleTouchMove(this, e, touchData);
              } else if (eventName === "touchend") {
                handleTouchEnd(this, e, touchData);
              }
            }
          }
        };
      })(eventName);
    }

    this.elems.el.addEventListener("touchstart", this.events.touchstart);
    document.addEventListener("mousedown", this.events.touchstart);
    this.elems.el.addEventListener("touchend", this.events.touchend);
    document.addEventListener("mouseup", this.events.touchend);

    if (this.source.length) {
      this.value = this.value !== null ? this.value : this.source[0].value;
      this.select(this.value);
    }
  }

  _normalizeScroll(scroll) {
    let normalizedScroll = scroll;
    while (normalizedScroll < 0) {
      normalizedScroll += this.source.length;
    }
    normalizedScroll = normalizedScroll % this.source.length;
    return normalizedScroll;
  }

  _moveTo(scroll) {
    if (this.type === "infinite") {
      scroll = this._normalizeScroll(scroll);
    }
    this.renderer.updateOptions(scroll);

    return scroll;
  }

  async _animateMoveByInitV(initV) {
    await this.animator.animateMoveByInitV(initV);
  }

  _animateToScroll(initScroll, finalScroll, t, easingName = "easeOutQuart") {
    return this.animator.animateToScroll(
      initScroll,
      finalScroll,
      t,
      easingName
    );
  }

  _stop() {
    this.moving = false;
    cancelAnimationFrame(this.moveT);
  }

  _selectByScroll(scroll) {
    scroll = this._normalizeScroll(scroll) | 0;
    if (scroll > this.source.length - 1) {
      scroll = this.source.length - 1;
      this._moveTo(scroll);
    }
    this._moveTo(scroll);
    this.scroll = scroll;
    this.selected = this.source[scroll];
    this.value = this.selected.value;
    this.onChange && this.onChange(this.selected);
  }

  updateSource(source) {
    this.renderer.create(source); // _create 대신 renderer.create 호출

    if (!this.moving) {
      this._selectByScroll(this.scroll);
    }
  }

  select(value) {
    for (let i = 0; i < this.source.length; i++) {
      if (this.source[i].value === value) {
        window.cancelAnimationFrame(this.moveT);
        let initScroll = this._normalizeScroll(this.scroll);
        let finalScroll = i;
        let t = Math.sqrt(Math.abs((finalScroll - initScroll) / this.a));
        this._animateToScroll(initScroll, finalScroll, t);
        setTimeout(() => this._selectByScroll(i));
        return;
      }
    }
    throw new Error(
      `can not select value: ${value}, ${value} match nothing in current source`
    );
  }

  destroy() {
    this._stop();
    this.eventManager.removeAllEvents(); // 모든 이벤트 제거
    this.elems.el.innerHTML = "";
    this.elems = null;
  }
}
