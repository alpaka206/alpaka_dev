export class SelectorRenderer {
  constructor(selectorInstance) {
    this.selectorInstance = selectorInstance;
    this.radius = selectorInstance.radius;
    this.itemHeight = selectorInstance.itemHeight;
    this.itemAngle = selectorInstance.itemAngle;
    this.quarterCount = selectorInstance.quarterCount;
    this.type = selectorInstance.type;
  }

  create(source) {
    if (!source.length) {
      return;
    }

    let template = `
      <div class="select-wrap">
        <ul class="select-options" style="transform: translate3d(0, 0, ${-this
          .radius}px) rotateX(0deg);">
          {{circleListHTML}}
        </ul>
        <div class="highlight">
          <ul class="highlight-list">
            {{highListHTML}}
          </ul>
        </div>
      </div>
    `;

    if (this.selectorInstance.options.type === "infinite") {
      let concatSource = [].concat(source);
      while (concatSource.length < this.selectorInstance.halfCount) {
        concatSource = concatSource.concat(source);
      }
      source = concatSource;
    }
    this.selectorInstance.source = source;
    let sourceLength = source.length;

    let circleListHTML = "";
    for (let i = 0; i < source.length; i++) {
      circleListHTML += `<li class="select-option"
                    style="
                      top: ${this.itemHeight * -0.5}px;
                      height: ${this.itemHeight}px;
                      line-height: ${this.itemHeight}px;
                      transform: rotateX(${
                        -this.itemAngle * i
                      }deg) translate3d(0, 0, ${this.radius}px);
                    "
                    data-index="${i}"
                    >${source[i].text}</li>`;
    }

    let highListHTML = "";
    for (let i = 0; i < source.length; i++) {
      highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                        ${source[i].text}
                      </li>`;
    }

    if (this.type === "infinite") {
      for (let i = 0; i < this.quarterCount; i++) {
        circleListHTML =
          `<li class="select-option"
                      style="
                        top: ${this.itemHeight * -0.5}px;
                        height: ${this.itemHeight}px;
                        line-height: ${this.itemHeight}px;
                        transform: rotateX(${
                          this.itemAngle * (i + 1)
                        }deg) translate3d(0, 0, ${this.radius}px);
                      "
                      data-index="${-i - 1}"
                      >${source[sourceLength - i - 1].text}</li>` +
          circleListHTML;
        circleListHTML += `<li class="select-option"
                      style="
                        top: ${this.itemHeight * -0.5}px;
                        height: ${this.itemHeight}px;
                        line-height: ${this.itemHeight}px;
                        transform: rotateX(${
                          -this.itemAngle * (i + sourceLength)
                        }deg) translate3d(0, 0, ${this.radius}px);
                      "
                      data-index="${i + sourceLength}"
                      >${source[i].text}</li>`;
      }

      highListHTML =
        `<li class="highlight-item" style="height: ${this.itemHeight}px;">
                          ${source[sourceLength - 1].text}
                      </li>` + highListHTML;
      highListHTML += `<li class="highlight-item" style="height: ${this.itemHeight}px;">${source[0].text}</li>`;
    }

    this.selectorInstance.elems.el.innerHTML = template
      .replace("{{circleListHTML}}", circleListHTML)
      .replace("{{highListHTML}}", highListHTML);

    this.selectorInstance.elems.circleList =
      this.selectorInstance.elems.el.querySelector(".select-options");
    this.selectorInstance.elems.circleItems =
      this.selectorInstance.elems.el.querySelectorAll(".select-option");
    this.selectorInstance.elems.highlight =
      this.selectorInstance.elems.el.querySelector(".highlight");
    this.selectorInstance.elems.highlightList =
      this.selectorInstance.elems.el.querySelector(".highlight-list");
    this.selectorInstance.elems.highlightitems =
      this.selectorInstance.elems.el.querySelectorAll(".highlight-item");

    if (this.type === "infinite") {
      this.selectorInstance.elems.highlightList.style.top =
        -this.itemHeight + "px";
    }

    this.selectorInstance.elems.highlight.style.height = this.itemHeight + "px";
    this.selectorInstance.elems.highlight.style.lineHeight =
      this.itemHeight + "px";
  }

  updateOptions(scroll) {
    this.selectorInstance.elems.circleList.style.transform = `translate3d(0, 0, ${-this
      .radius}px) rotateX(${this.itemAngle * scroll}deg)`;
    this.selectorInstance.elems.highlightList.style.transform = `translate3d(0, ${
      -scroll * this.itemHeight
    }px, 0)`;

    [...this.selectorInstance.elems.circleItems].forEach((itemElem) => {
      if (Math.abs(itemElem.dataset.index - scroll) > this.quarterCount) {
        itemElem.style.visibility = "hidden";
      } else {
        itemElem.style.visibility = "visible";
      }
    });
  }
}
