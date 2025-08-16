//Tips:AI写的居多，反正能用就行(
class BaseUWPButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .uwpbutton {
            cursor: default;
            vertical-align:middle;
            line-height:16.67px;
            min-height:16.67px;
            padding: 10px 20px;
            background: var(--primary-color, #CCCCCC);
            color:rgb(0, 0, 0);
            border: none;
            cursor: default;
            font-size: 16px;
            filter: blur(0px);
            transition: filter 0.3s ease;
            transform: scale(1);
            transition: transform 0.3s ease;
          }
          .uwpbutton:active {
            cursor: default;
            transition: opacity 0.3s ease;
            transform: scale(0.97);
            filter: blur(0.5px);
            outline: 0px solid  #999999;
            background: var(--primary-color, #999999);
          }
          .uwpbutton:hover {
            cursor: default;
            outline: 2.75px solid  #999999;
            outline-offset: -2.75px;
          }
          
          .uwpbutton:disabled {
            transition: opacity 0s ease;
            transform: scale(1);
            filter: blur(0);
            outline: 0px solid  #7A7A7A;;
            color:rgb(145, 145, 145);
            background: #cccccc;
            cursor: not-allowed;
          }
        </style>
        <button class="uwpbutton"><slot></slot></button>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.shadowRoot.querySelector(".uwpbutton").disabled = newValue !== null;
    }
  }
}

class BaseUWPHighButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
          <style>
            .uwpbutton {
              cursor: default;
              vertical-align:middle;
              line-height:16.67px;
              min-height:16.67px;
              padding: 10px 20px;
              background: var(--primary-color, #3393DD);
              color:rgb(255, 255, 255);
              border: none;
              cursor: default;
              font-size: 16px;
              filter: blur(0px);
              transition: filter 0.3s ease;
              transform: scale(1);
              transition: transform 0.3s ease;
            }
            .uwpbutton:active {
              cursor: default;
              transition: opacity 0.3s ease;
              transform: scale(0.97);
              filter: blur(0.5px);
              outline: 0px solid  #85BEEB;
              background: var(--primary-color, #66AEE5);
            }
            .uwpbutton:hover {
              cursor: default;
              outline: 2.75px solid   #85BEEB;
              outline-offset: -2.75px;
            }
            
            .uwpbutton:disabled {
              transition: opacity 0s ease;
              transform: scale(1);
              filter: blur(0);
              outline: 0px solid  #7A7A7A;;
              color:rgb(145, 145, 145);
              background: #cccccc;
              cursor: not-allowed;
            }
          </style>
          <button class="uwpbutton"><slot></slot></button>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this.shadowRoot.querySelector(".uwpbutton").disabled = newValue !== null;
    }
  }
}

class BaseUWPSelectableList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // 定义内部按钮组件
    class UWPButton extends HTMLElement {
      static get observedAttributes() {
        return ["disabled", "selected"];
      }

      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._selected = false;
        this._updating = false;

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              margin: 4px;
            }
            
            .uwpbutton {
              cursor: default;
              display: block;
              vertical-align: middle;
              line-height: 28px;
              min-height: 28px;
              min-width: 100%;
              text-align:left;
              padding: 10px 20px;
              background: var(--primary-color, #F2F2F2);
              color: rgb(0, 0, 0);
              border: none;
              cursor: default;
              font-size: 16px;
            }
            
            .uwpbutton.selected {
              background: var(--accent-color, #91C1E5);
            }
            
            .uwpbutton:active {
              cursor: default;
              background: var(--primary-color, #C2C2C2);
            }
            
            .uwpbutton:hover:not(.selected) {
              cursor: default;
              background: var(--primary-color, #DADADA) !important ;
            }
            
            .uwpbutton.selected:hover {
              background: var(--accent-color, #61A8DF);
            }
            
            .uwpbutton:disabled {
              filter: blur(0);
              color: rgb(145, 145, 145);
              background: #cccccc;
              cursor: not-allowed;
            }
          </style>
          <button class="uwpbutton"><slot></slot></button>
        `;

        this.button = this.shadowRoot.querySelector(".uwpbutton");
      }

      connectedCallback() {
        this.button.addEventListener("click", () => {
          if (!this.disabled) {
            this.dispatchEvent(
              new CustomEvent("uwp-select", {
                bubbles: true,
                composed: true,
                detail: {
                  value: this.textContent,
                  selected: true, // 总是设置为true，因为不能取消选中
                },
              })
            );
          }
        });
      }

      set selected(value) {
        if (this._updating) return; // 防止递归
        this._updating = true;

        const newValue = Boolean(value);
        if (this._selected !== newValue) {
          this._selected = newValue;
          this.button.classList.toggle("selected", newValue);

          // 只在值变化时更新属性
          if (newValue) {
            this.setAttribute("selected", "");
          } else {
            this.removeAttribute("selected");
          }
        }

        this._updating = false;
      }

      get selected() {
        return this._selected;
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (this._updating) return;

        if (name === "selected") {
          // 只更新内部状态，不触发setter的循环
          this._selected = newValue !== null;
          this.button.classList.toggle("selected", this._selected);
        } else if (name === "disabled") {
          this.button.disabled = newValue !== null;
        }
      }

      set disabled(value) {
        if (value) {
          this.setAttribute("disabled", "");
        } else {
          this.removeAttribute("disabled");
        }
      }

      get disabled() {
        return this.hasAttribute("disabled");
      }
    }

    // 注册内部按钮组件
    if (!customElements.get("uwp-button")) {
      customElements.define("uwp-button", UWPButton);
    }

    // 列表容器的模板
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        ::slotted(uwp-button) {
          display: block;
          width: 100%;
          margin: 0px 0;
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    this.addEventListener("uwp-select", this.handleSelect.bind(this));
    // 确保至少有一个选项被选中
    this._ensureSelection();
  }

  // 确保至少有一个选项被选中
  _ensureSelection() {
    if (
      !this.querySelector("uwp-button[selected]") &&
      this.children.length > 0
    ) {
      this.children[0].selected = true;
    }
  }

  // 处理选择事件
  handleSelect(e) {
    if (e.target.selected) return;

    // 取消所有其他按钮的选中状态
    this.querySelectorAll("uwp-button").forEach((button) => {
      if (button !== e.target) {
        button.selected = false;
      }
    });

    // 直接设置内部状态避免递归
    e.target._selected = true;
    e.target.button.classList.add("selected");
    e.target.setAttribute("selected", "");

    // 触发选择变化事件
    this.dispatchEvent(
      new CustomEvent("uwp-selection-changed", {
        detail: {
          selectedValue: e.detail.value,
          selectedIndex: Array.from(this.children).indexOf(e.target),
          selectedElement: e.target,
        },
      })
    );
  }

  // 添加新按钮
  addButton(text, selected = false) {
    const button = document.createElement("uwp-button");
    button.textContent = text;
    if (selected) {
      // 取消其他按钮的选中状态
      this.querySelectorAll("uwp-button").forEach((btn) => {
        btn.selected = false;
      });
      button.selected = true;
    } else if (this.querySelectorAll("uwp-button[selected]").length === 0) {
      // 如果没有选中的按钮，则选中新添加的按钮
      button.selected = true;
    }
    this.appendChild(button);
    return button;
  }

  // 批量设置按钮
  setButtons(buttonTexts, selectedIndex = 0) {
    // 默认选中第一个
    this.innerHTML = "";
    buttonTexts.forEach((text, index) => {
      this.addButton(text, index === selectedIndex);
    });
    // 确保至少有一个选项被选中
    this._ensureSelection();
  }

  // 获取当前选中的值
  getSelectedValue() {
    const selected = this.querySelector("uwp-button[selected]");
    return selected ? selected.textContent : null;
  }

  // 获取当前选中的索引
  getSelectedIndex() {
    const selected = this.querySelector("uwp-button[selected]");
    return selected ? Array.from(this.children).indexOf(selected) : -1;
  }
}
class BaseUWPOpenList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // 定义内部按钮组件
    class UWPButton extends HTMLElement {
      static get observedAttributes() {
        return ["disabled", "selected"];
      }

      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._selected = false;
        this._updating = false;

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              margin: 4px;
            }
            
            .uwpbutton {
              cursor: default;
              display: block;
              vertical-align: middle;
              line-height: 28px;
              min-height: 28px;
              min-width: 100%;
              text-align:left;
              padding: 10px 20px;
              background: var(--primary-color, #F2F2F2);
              color: rgb(0, 0, 0);
              border: none;
              cursor: default;
              font-size: 16px;
              filter: blur(0px);
              transition: filter 0.3s ease;
              transform: scale(1);
              transition: transform 0.3s ease;
            }
            
            .uwpbutton.selected {
              background: var(--accent-color, #91C1E5);
            }
            
            .uwpbutton:active {
              cursor: default;
              background: var(--primary-color, #C2C2C2);
              transition: opacity 0.3s ease;
              transform: scale(0.97);
              filter: blur(0.5px);
            }
            
            .uwpbutton:hover:not(.selected) {
              cursor: default;
              background: var(--primary-color, #DADADA) !important ;
            }
            
            .uwpbutton.selected:hover {
              background: var(--accent-color, #61A8DF);
            }
            
            .uwpbutton:disabled {
              filter: blur(0);
              color: rgb(145, 145, 145);
              background: #cccccc;
              cursor: not-allowed;
            }
          </style>
          <button class="uwpbutton"><slot></slot></button>
        `;

        this.button = this.shadowRoot.querySelector(".uwpbutton");
      }

      connectedCallback() {
        this.button.addEventListener("click", () => {
          if (!this.disabled) {
            this.dispatchEvent(
              new CustomEvent("uwp-select", {
                bubbles: true,
                composed: true,
                detail: {
                  value: this.textContent,
                  selected: true, // 总是设置为true，因为不能取消选中
                },
              })
            );
          }
        });
      }

      set selected(value) {
        if (this._updating) return; // 防止递归
        this._updating = true;

        const newValue = Boolean(value);
        if (this._selected !== newValue) {
          this._selected = newValue;
          this.button.classList.toggle("selected", newValue);

          // 只在值变化时更新属性
          if (newValue) {
            this.setAttribute("selected", "");
          } else {
            this.removeAttribute("selected");
          }
        }

        this._updating = false;
      }

      get selected() {
        return this._selected;
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (this._updating) return;

        if (name === "selected") {
          // 只更新内部状态，不触发setter的循环
          this._selected = newValue !== null;
          this.button.classList.toggle("selected", this._selected);
        } else if (name === "disabled") {
          this.button.disabled = newValue !== null;
        }
      }

      set disabled(value) {
        if (value) {
          this.setAttribute("disabled", "");
        } else {
          this.removeAttribute("disabled");
        }
      }

      get disabled() {
        return this.hasAttribute("disabled");
      }
    }

    // 注册内部按钮组件
    if (!customElements.get("uwp-button")) {
      customElements.define("uwp-button", UWPButton);
    }

    // 列表容器的模板
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        ::slotted(uwp-button) {
          display: block;
          width: 100%;
          margin: 0px 0;
        }
      </style>
      <slot></slot>
    `;
  }

  // 添加新按钮
  addButton(text, selected = false) {
    const button = document.createElement("uwp-button");
    button.textContent = text;
  }

  // 批量设置按钮
  setButtons(buttonTexts, selectedIndex = 0) {
    // 默认选中第一个
    this.innerHTML = "";
    buttonTexts.forEach((text, index) => {
      this.addButton(text, index === selectedIndex);
    });
    // 确保至少有一个选项被选中
    this._ensureSelection();
  }

  // 获取当前选中的值
  getSelectedValue() {
    const selected = this.querySelector("uwp-button[selected]");
    return selected ? selected.textContent : null;
  }

  // 获取当前选中的索引
  getSelectedIndex() {
    const selected = this.querySelector("uwp-button[selected]");
    return selected ? Array.from(this.children).indexOf(selected) : -1;
  }
}
class BaseUWPCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._checked = false;
    this._disabled = false;

    this.shadowRoot.innerHTML = `
          <style>
              :host {
                  display: inline-flex;
                  align-items: center;
                  cursor: default;
                  user-select: none;
                  --size: 20px;
                  --border-width: 3px;
                  --accent-color:rgb(0, 0, 0);
                  --disabled-color: #E6E6E6;
                  --disabled-text-color: #A6A6A6;
              }

              :host([disabled]) {
                  cursor: default;
                  pointer-events: none;
              }

              .checkbox-container {
                  display: flex;
                  align-items: center;
              }

              .check-box {
                  width: var(--size);
                  height: var(--size);
                  border: var(--border-width) solid;
                  border-radius: var(--border-radius);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
              }

              :host(:not([disabled])) .check-box {
                  border-color: var(--accent-color);
              }

              :host([disabled]) .check-box {
                  border-color: var(--disabled-color);
                  background-color: var(--disabled-color);
              }

              :host([checked]) .check-box {
                  background-color: #0078D7;
                  border-color:#0078D7;
              }

              :host([checked][disabled]) .check-box {
                  background-color: var(--disabled-color);
              }

              .checkmark {
                  width: calc(var(--size) + 2px);
                  height: calc(var(--size) + 2px);
                  position: absolute;
              }

              :host([checked]) .checkmark {
              }

              .label {
                  font-size: 14px;
                  color: #000000;
                  margin: 6px;
              }

              :host([disabled]) .label {
                  color: var(--disabled-text-color);
              }

              :host(:not([disabled]):hover[checked]) .check-box {
                  border-color:#000000;
              }

              :host(:not([disabled]):active) .check-box {
                  background-color: #666666;
              }
          </style>
          <div class="checkbox-container">
              <div class="check-box">
                  <svg class="checkmark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.00002 16.17L4.83002 12L3.41002 13.41L9.00002 19L21 7.00003L19.59 5.59003L9.00002 16.17Z" fill="white"/>
                  </svg>
              </div>
              <span class="label"><slot></slot></span>
          </div>
      `;
  }

  connectedCallback() {
    this.addEventListener("click", this._toggleChecked);
    this._updateCheckedState();
    this._updateDisabledState();
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._toggleChecked);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") {
      this._checked = newValue !== null;
      this._updateCheckedState();
    } else if (name === "disabled") {
      this._disabled = newValue !== null;
      this._updateDisabledState();
    }
  }

  _toggleChecked() {
    if (!this._disabled) {
      this.checked = !this._checked;
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  _updateCheckedState() {
    if (this._checked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  _updateDisabledState() {
    if (this._disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    if (this._checked !== value) {
      this._checked = value;
      this._updateCheckedState();
    }
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._updateDisabledState();
    }
  }
}
class BaseUWPPasswordBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .uwppasswordbox {
            vertical-align:middle;
            display:inline-block;
            min-width:300px;
            outline: 2.75px solid  #999999;
            outline-offset: -2.75px;
            line-height:16.67px;
            min-height:16.67px;
            padding: 10px 14px;
            background: var(--primary-color,rgb(255, 255, 255));
            color:rgb(0, 0, 0);
            border: none;
            font-size: 16px;
          }
          .uwppasswordbox:focus {
            outline: 2.75px solid  #0078D4;
            outline-offset: -2.75px;
          }
          
          .uwppasswordbox:disabled {
            background-color:#CCCCCC;
            outline: 2.75px solid  #CCCCCC;
            cursor: not-allowed;
            color:#7A7A7A
          }
        </style>
        <input type="password" name="fname" class="uwppasswordbox" value="">

      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._input = this.shadowRoot.querySelector(".uwpappbutton");
  }
  static get observedAttributes() {
    return ["disabled"]; // 添加value属性监听
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this._input.disabled = newValue !== null;
    }
  }
}
class BaseUWPAppBarButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .uwpappbutton {
            vertical-align:middle;
            display:inline-block;
            min-width:300px;
            outline: 2.75px solid  #999999;
            outline-offset: -2.75px;
            line-height:16.67px;
            min-height:16.67px;
            padding: 10px 14px;
            background: var(--primary-color,rgb(255, 255, 255));
            color:rgb(0, 0, 0);
            border: none;
            font-size: 16px;
          }
          .uwpappbutton:focus {
            outline: 2.75px solid  #0078D4;
            outline-offset: -2.75px;
          }
          
          .uwpappbutton:disabled {
            background-color:#CCCCCC;
            outline: 2.75px solid  #CCCCCC;
            cursor: not-allowed;
            color:#7A7A7A
          }
        </style>
        <input type="text" name="fname" class="uwpappbutton" value="">

      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._input = this.shadowRoot.querySelector(".uwpappbutton");
  }
  connectedCallback() {
    // 获取组件标签内的文本内容
    const textContent = this.textContent.trim();
    console.log(textContent);

    // 优先使用属性值，如果没有属性值则使用标签内容
    const value = this.getAttribute("value") || textContent;

    // 设置input的value属性
    if (value) {
      this._input.value = value;
    }

    // 清空组件标签内的文本内容（可选）
    this.textContent = "";
  }

  static get observedAttributes() {
    return ["disabled", "value"]; // 添加value属性监听
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this._input.disabled = newValue !== null;
    } else if (name === "value") {
      // 当value属性变化时更新输入框
      this._input.value = newValue || "";
    }
  }

  // 添加getter和setter以便通过JavaScript属性访问
  get value() {
    return this._input.value;
  }

  set value(val) {
    this._input.value = val;
    this.setAttribute("value", val);
  }
}
class BaseUWPRichEditBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .uwprichrditbox {
            contenteditable="true";
            resize: none;
            vertical-align:middle;
            display:inline-block;
            min-width:300px;
            outline: 2.75px solid  #999999;
            outline-offset: -2.75px;
            line-height:26.67px;
            min-height:26.67px;
            padding: 5px 10px;
            background: var(--primary-color,rgb(255, 255, 255));
            color:rgb(0, 0, 0);
            border: none;
            font-size: 16px;
            vertical-align: top;
          }
          .uwprichrditbox:focus {
            outline: 2.75px solid  #0078D4;
            outline-offset: -2.75px;
          }
          
          .uwprichrditbox:disabled {
            background-color:#CCCCCC;
            outline: 2.75px solid  #CCCCCC;
            cursor: not-allowed;
            color:#7A7A7A
          }
        </style>
        <div class="uwprichrditbox" contenteditable="true"><br></div>  
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._input = this.shadowRoot.querySelector(".uwprichrditbox");
  }
  connectedCallback() {
    // 获取组件标签内的文本内容
    const textContent = this.textContent.trim();
    console.log(textContent);

    // 优先使用属性值，如果没有属性值则使用标签内容
    const value = this.getAttribute("value") || textContent;

    // 设置input的value属性
    if (value) {
      this._input.value = value;
    }

    // 清空组件标签内的文本内容（可选）
    this.textContent = "";
  }

  static get observedAttributes() {
    return ["disabled", "value"]; // 添加value属性监听
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "disabled") {
      this._input.disabled = newValue !== null;
    } else if (name === "value") {
      // 当value属性变化时更新输入框
      this._input.value = newValue || "";
    }
  }

  // 添加getter和setter以便通过JavaScript属性访问
  get value() {
    return this._input.value;
  }

  set value(val) {
    this._input.value = val;
    this.setAttribute("value", val);
  }
}
class BaseUWPDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._buttons = [];

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          visibility: hidden;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0);
          z-index: 1000;
          align-items: center;
          justify-content: center;
          transition: 
            background-color 0.3s ease,
            visibility 0s linear 0.3s;
        }
        
        :host([show]) {
          visibility: visible;
          background-color: rgba(255, 255, 255, 0.56);
          transition: background-color 0.3s ease;
        }
        
        .dialog-container {
          outline: 0.25px solid #1B86D9;
          outline-offset: -0.25px;
          background-color: white;
          min-width: 300px;
          max-width: 500px;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          transform: scale(1.055);
          opacity: 0;
          transition: 
            transform 0.3s cubic-bezier(0.25, 0.10, 0.25, 0.85),
            opacity 0.3s ease;
        }
        
        :host([show]) .dialog-container {
          transform: scale(1); /* 打开时放大到正常尺寸 */
          opacity: 1;
        }
        
        /* 关闭时的动画 - 通过JS动态添加类 */
        .dialog-container.closing {
          transform: scale(1.055);
          opacity: 0;
        }
        
        .dialog-container {
          outline: 0.25px solid #1B86D9;
          outline-offset: -0.25px;
          background-color: white;
          
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.28);
          overflow: hidden;
          transform: scale(1.055);
          opacity: 0;
          transition: 
            transform 0.3s cubic-bezier(0.25, 0.10, 0.25, 0.85),
            opacity 0.3s ease;
        }
        
        :host([show]) .dialog-container {
          transform: scale(1);
          opacity: 1;
        }
        
        .dialog-header {
          margin-left: 16px;
          margin-top: 16px;
          font-size: 25px;
          font-weight: normal;
          background-color: var(--primary-color,rgb(255, 255, 255));
          color: black;
        }
        
        .dialog-content {
          margin-left: 16px;
          margin-top: 16px;
          font-size: 16px;
          line-height: 1.5;
        }
        
        .dialog-footer {
          text-align:center;
          padding: 16px;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          background-color:rgb(255, 255, 255);
        }
        
        .uwpbutton {
          cursor: default;
          min-width: 200px;
          line-height: 16.67px;
          min-height: 16.67px;
          padding: 10px 20px;
          background: var(--primary-color, #CCCCCC);
          color: rgb(0, 0, 0);
          border: none;
          cursor: default;
          font-size: 16px;
          filter: blur(0px);
          transition: filter 0.3s ease;
          transform: scale(1);
          transition: transform 0.3s ease;
        }
        
        .uwpbutton:active {
          cursor: default;
          transition: opacity 0.3s ease;
          transform: scale(0.97);
          filter: blur(0.5px);
          outline: 0px solid #999999;
          background: var(--primary-color, #999999);
        }
        
        .uwpbutton:hover {
          cursor: default;
          outline: 2.75px solid #999999;
          outline-offset: -2.75px;
        }
        
        .uwpbutton:disabled {
          cursor: default;
          transition: opacity 0s ease;
          transform: scale(1);
          filter: blur(0);
          outline: 0px solid #7A7A7A;;
          color: rgb(145, 145, 145);
          background: #cccccc;
          cursor: not-allowed;
        }
      </style>
      <div class="dialog-container">
        <div class="dialog-header" id="title"></div>
        <div class="dialog-content" id="content"></div>
        <div class="dialog-footer" id="footer"></div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Close dialog when clicking outside
    this.shadowRoot.addEventListener("click", (e) => {
      if (e.target === this) {
        this.hide();
      }
    });
    this._transitionEndHandler = (e) => {
      if (e.target === this.shadowRoot.querySelector(".dialog-container")) {
        this._finalizeHide();
      }
    };
  }
  _finalizeHide() {
    if (!this.show) {
      const container = this.shadowRoot.querySelector(".dialog-container");
      this.style.display = "none";
      this.style.pointerEvents = "";
      container.classList.remove("closing");
    }
  }

  hide() {
    const container = this.shadowRoot.querySelector(".dialog-container");

    // 先移除可能存在的旧监听器
    container.removeEventListener("transitionend", this._transitionEndHandler);

    // 添加新监听器
    container.addEventListener("transitionend", this._transitionEndHandler, {
      once: true,
    });

    container.classList.add("closing");
    this.removeAttribute("show");
  }

  static get observedAttributes() {
    return ["show", "title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "show") {
      // 只有当值实际发生变化时才执行操作
      if (newValue !== oldValue) {
        if (newValue !== null) {
          this.show(); // 改为调用内部方法
        } else {
          this.hide(); // 改为调用内部方法
        }
      }
    } else if (name === "title") {
      this.shadowRoot.getElementById("title").textContent = newValue;
    }
  }

  connectedCallback() {
    this.updateButtons();
  }
  get _show() {
    if (this._showing) return;
    this._showing = true;

    this.style.display = "flex";
    this.style.pointerEvents = "auto";
    const container = this.shadowRoot.querySelector(".dialog-container");
    container.classList.remove("closing");
    void this.offsetWidth; // 强制重绘
  }

  // 内部方法，不触发属性变化
  get _hide() {
    if (!this._showing) return;
    this._showing = false;

    const container = this.shadowRoot.querySelector(".dialog-container");
    container.classList.add("closing");

    container.addEventListener(
      "transitionend",
      () => {
        this.style.display = "none";
        this.style.pointerEvents = "none";
        container.classList.remove("closing");
      },
      { once: true }
    );
  }
  get show() {
    return this.hasAttribute("show");
  }

  set show(value) {
    if (value) {
      this.setAttribute("show", "");
    } else {
      this.removeAttribute("show");
    }
  }

  get title() {
    return this.getAttribute("title") || "";
  }

  set title(value) {
    this.setAttribute("title", value);
  }

  get content() {
    return this.shadowRoot.getElementById("content").innerHTML;
  }

  set content(value) {
    this.shadowRoot.getElementById("content").innerHTML = value;
  }

  set buttons(value) {
    this._buttons = Array.isArray(value) ? value : [];
    this.updateButtons();
  }

  get buttons() {
    return this._buttons;
  }

  updateButtons() {
    const footer = this.shadowRoot.getElementById("footer");
    footer.innerHTML = "";

    this._buttons.forEach((button) => {
      const btn = document.createElement("button");
      btn.className = "uwpbutton";
      btn.textContent = button.text;

      if (button.disabled) {
        btn.disabled = true;
      }

      btn.addEventListener("click", () => {
        const event = new CustomEvent("buttonclick", {
          detail: {
            index: button.index,
            text: button.text,
          },
        });
        this.dispatchEvent(event);

        if (button.closeOnClick !== false) {
          this.hide();
        }
      });

      footer.appendChild(btn);
    });
  }

  show() {
    this.style.display = "flex";
    this.style.pointerEvents = "auto";
    const container = this.shadowRoot.querySelector(".dialog-container");
    container.classList.remove("closing"); // 移除关闭类
    void this.offsetWidth; // 强制重绘
    this.setAttribute("show", "");
  }

  hide() {
    const container = this.shadowRoot.querySelector(".dialog-container");
    container.classList.add("closing"); // 添加关闭类触发缩小动画

    container.addEventListener(
      "transitionend",
      () => {
        if (!this.show) {
          this.style.display = "none";
          this.style.pointerEvents = "none";
          container.classList.remove("closing"); // 清理关闭类
        }
      },
      { once: true }
    );

    this.removeAttribute("show");
  }
}
class BaseUWPTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        .tile {
            position: relative;
            overflow: hidden;
            width: 100px;
            height: 100px;
            margin: 2px;
            display: inline-block;
            vertical-align: top;
        }
        
        .tile-content {
            position: relative;
            height: 100%;
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            padding: 2.5px;
            box-sizing: border-box;
            font-weight: lighter;
        }
        
        .tile-icon-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .tile-icon {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }
        
        .tile-title {
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            margin-top: auto; 
            padding-bottom: 5px;
            margin-left: 8px;
        }
        
        .tile::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 4px solid transparent;
            pointer-events: none;
            border-image: radial-gradient(
                circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, var(--edge-brightness)) 0%,
                rgba(255, 255, 255, 0.39) 70%
            ) 1;
            opacity: 0;
        }
        
        .tile::after {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0) 60%
            );
            opacity: 0;
            pointer-events: none;
            left: calc(var(--mouse-x) - 50px);
            top: calc(var(--mouse-y) - 50px);
            transition: opacity 0.15s ease;
        }
        
        .tile:hover::before,
        .tile:hover::after {
            opacity: 1;
        }
        
        
        .medium {
            grid-row: span 1;
            grid-column: span 1;
            aspect-ratio: 1/1;
        }
        .blue { background-color: #0078D7; }
        .dark-blue { background-color: #004e8c; }

    </style>
        <div class="tile medium blue">
            <div class="tile-content">
                <div class="tile-icon-container">
                    <img src="" class="tile-icon" alt="Tile icon" draggable="false">
                </div>
                <div class="tile-title"><slot></slot></div>
            </div>
        </div>
        <script>
        document.querySelectorAll('.tile').forEach(tile => {
            tile.style.setProperty('--mouse-x', '50px');
            tile.style.setProperty('--mouse-y', '50px');
            tile.style.setProperty('--edge-brightness', '0.2');
        });
    </script>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Store reference to the icon element
    this._iconElement = this.shadowRoot.querySelector(".tile-icon");
    this.tileElement = this.shadowRoot.querySelector(".tile");
    this.tileElement.addEventListener("mousemove", this.updateGloss.bind(this));
    this.tileElement.addEventListener("mouseenter", this.initTile.bind(this));
  }
  initTile(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");
    tile.style.setProperty("--edge-brightness", "0.2");
  }

  updateGloss(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");


    const width = rect.width;
    const height = rect.height;


    const distLeft = x;
    const distRight = width - x;
    const distTop = y;
    const distBottom = height - y;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);


    const edgeBrightness = Math.min(
      0.5,
      0.3 + 0.2 * (1 - (minDist / Math.min(width, height)) * 2)
    );

    tile.style.setProperty("--edge-brightness", edgeBrightness.toString());
  }

  static get observedAttributes() {
    return ["icon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon") {
      this._updateIcon(newValue);
    }
  }

  get icon() {
    return this.getAttribute("icon");
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  _updateIcon(iconUrl) {
    if (this._iconElement && iconUrl) {
      this._iconElement.src = iconUrl;
    }
  }
}
class BaseUWPWhiteTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        .tile {
            position: relative;
            overflow: hidden;
            width: 100px;
            height: 100px;
            margin: 2px;
            display: inline-block;
            vertical-align: top;
        }
        
        .tile-content {
            position: relative;
            height: 100%;
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            padding: 2.5px;
            box-sizing: border-box;
            font-weight: lighter;
        }
        
        .tile-icon-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .tile-icon {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }
        
        .tile-title {
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            margin-top: auto; 
            padding-bottom: 5px;
            margin-left: 8px;
            Color: black;
        }
        
        .tile::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 4px solid transparent;
            pointer-events: none;
            border-image: radial-gradient(
                circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, var(--edge-brightness)) 0%,
                rgba(255, 255, 255, 0.39) 70%
            ) 1;
            opacity: 0;
        }
        
        .tile::after {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0) 60%
            );
            opacity: 0;
            pointer-events: none;
            left: calc(var(--mouse-x) - 50px);
            top: calc(var(--mouse-y) - 50px);
            transition: opacity 0.15s ease;
        }
        
        .tile:hover::before,
        .tile:hover::after {
            opacity: 1;
        }
        
        
        .medium {
            grid-row: span 1;
            grid-column: span 1;
            aspect-ratio: 1/1;
        }
        .white { background-color:rgb(255, 255, 255); }

    </style>
        <div class="tile medium white">
            <div class="tile-content">
                <div class="tile-icon-container">
                    <img src="" class="tile-icon" alt="Tile icon" draggable="false">
                </div>
                <div class="tile-title"><slot></slot></div>
            </div>
        </div>
        <script>
        document.querySelectorAll('.tile').forEach(tile => {
            tile.style.setProperty('--mouse-x', '50px');
            tile.style.setProperty('--mouse-y', '50px');
            tile.style.setProperty('--edge-brightness', '0.2');
        });
    </script>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Store reference to the icon element
    this._iconElement = this.shadowRoot.querySelector(".tile-icon");
    this.tileElement = this.shadowRoot.querySelector(".tile");
    this.tileElement.addEventListener("mousemove", this.updateGloss.bind(this));
    this.tileElement.addEventListener("mouseenter", this.initTile.bind(this));
  }
  initTile(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");
    tile.style.setProperty("--edge-brightness", "0.2");
  }

  updateGloss(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");


    const width = rect.width;
    const height = rect.height;


    const distLeft = x;
    const distRight = width - x;
    const distTop = y;
    const distBottom = height - y;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);


    const edgeBrightness = Math.min(
      0.5,
      0.3 + 0.2 * (1 - (minDist / Math.min(width, height)) * 2)
    );

    tile.style.setProperty("--edge-brightness", edgeBrightness.toString());
  }

  static get observedAttributes() {
    return ["icon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon") {
      this._updateIcon(newValue);
    }
  }

  get icon() {
    return this.getAttribute("icon");
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  _updateIcon(iconUrl) {
    if (this._iconElement && iconUrl) {
      this._iconElement.src = iconUrl;
    }
  }
}
class BaseUWPGreenTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        .tile {
            position: relative;
            overflow: hidden;
            width: 100px;
            height: 100px;
            margin: 2px;
            display: inline-block;
            vertical-align: top;
        }
        
        .tile-content {
            position: relative;
            height: 100%;
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            padding: 2.5px;
            box-sizing: border-box;
            font-weight: lighter;
        }
        
        .tile-icon-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .tile-icon {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }
        
        .tile-title {
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            margin-top: auto; 
            padding-bottom: 5px;
            margin-left: 8px;
        }
        
        .tile::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 4px solid transparent;
            pointer-events: none;
            border-image: radial-gradient(
                circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, var(--edge-brightness)) 0%,
                rgba(255, 255, 255, 0.39) 70%
            ) 1;
            opacity: 0;
        }
        
        .tile::after {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0) 60%
            );
            opacity: 0;
            pointer-events: none;
            left: calc(var(--mouse-x) - 50px);
            top: calc(var(--mouse-y) - 50px);
            transition: opacity 0.15s ease;
        }
        
        .tile:hover::before,
        .tile:hover::after {
            opacity: 1;
        }
        
        
        .medium {
            grid-row: span 1;
            grid-column: span 1;
            aspect-ratio: 1/1;
        }
        .white { background-color:#117B0F; }

    </style>
        <div class="tile medium white">
            <div class="tile-content">
                <div class="tile-icon-container">
                    <img src="" class="tile-icon" alt="Tile icon" draggable="false">
                </div>
                <div class="tile-title"><slot></slot></div>
            </div>
        </div>
        <script>
        document.querySelectorAll('.tile').forEach(tile => {
            tile.style.setProperty('--mouse-x', '50px');
            tile.style.setProperty('--mouse-y', '50px');
            tile.style.setProperty('--edge-brightness', '0.2');
        });
    </script>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Store reference to the icon element
    this._iconElement = this.shadowRoot.querySelector(".tile-icon");
    this.tileElement = this.shadowRoot.querySelector(".tile");
    this.tileElement.addEventListener("mousemove", this.updateGloss.bind(this));
    this.tileElement.addEventListener("mouseenter", this.initTile.bind(this));
  }
  initTile(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");
    tile.style.setProperty("--edge-brightness", "0.2");
  }

  updateGloss(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");


    const width = rect.width;
    const height = rect.height;


    const distLeft = x;
    const distRight = width - x;
    const distTop = y;
    const distBottom = height - y;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);


    const edgeBrightness = Math.min(
      0.5,
      0.3 + 0.2 * (1 - (minDist / Math.min(width, height)) * 2)
    );

    tile.style.setProperty("--edge-brightness", edgeBrightness.toString());
  }

  static get observedAttributes() {
    return ["icon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon") {
      this._updateIcon(newValue);
    }
  }

  get icon() {
    return this.getAttribute("icon");
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  _updateIcon(iconUrl) {
    if (this._iconElement && iconUrl) {
      this._iconElement.src = iconUrl;
    }
  }
}
class BaseUWPLargeTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
        .tile {
            position: relative;
            overflow: hidden;
            width: 204px;
            height: 204px;
            margin: 1px;
            display: inline-block;
            vertical-align: top;
        }
        
        .tile-content {
            position: relative;
            height: 100%;
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            padding: 2.5px;
            box-sizing: border-box;
            font-weight: lighter;
        }
        
        .tile-icon-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .tile-icon {
            width: 40px;
            height: 40px;
            object-fit: contain;
            user-select: none;
        }
        
        .tile-title {
            font-size: 12px;
            font-weight: 600;
            text-align: left;
            margin-top: auto; 
            padding-bottom: 5px;
            margin-left: 8px;
        }
        
        .tile::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 4px solid transparent;
            pointer-events: none;
            border-image: radial-gradient(
                circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, var(--edge-brightness)) 0%,
                rgba(255, 255, 255, 0.39) 70%
            ) 1;
            opacity: 0;
        }
        
        .tile::after {
            content: '';
            position: absolute;
            width: 150px;
            height: 150px;
            background: radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.3) 0%,
                rgba(255, 255, 255, 0) 60%
            );
            opacity: 0;
            pointer-events: none;
            left: calc(var(--mouse-x) - 50px);
            top: calc(var(--mouse-y) - 50px);
        }
        
        .tile:hover::before,
        .tile:hover::after {
            opacity: 1;
        }
      
        .large {
            grid-row: span 2;
            grid-column: span 2;
            aspect-ratio: 2/2;
        }
        
        .blue { background-color: #0078D7; }
        .dark-blue { background-color: #004e8c; }
        
        .large .tile-icon {
            width: 60px;
            height: 60px;
        }
    </style>
        <div class="tile large blue">
            <div class="tile-content">
                <div class="tile-icon-container">
                    <img src="" class="tile-icon" alt="Tile icon" draggable="false">
                </div>
                <div class="tile-title"><slot></slot></div>
            </div>
        </div>
        <script>
        document.querySelectorAll('.tile').forEach(tile => {
            tile.style.setProperty('--mouse-x', '50px');
            tile.style.setProperty('--mouse-y', '50px');
            tile.style.setProperty('--edge-brightness', '0.2');
        });
    </script>
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Store reference to the icon element
    this._iconElement = this.shadowRoot.querySelector(".tile-icon");
    this.tileElement = this.shadowRoot.querySelector(".tile");
    this.tileElement.addEventListener("mousemove", this.updateGloss.bind(this));
    this.tileElement.addEventListener("mouseenter", this.initTile.bind(this));
  }
  initTile(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");
    tile.style.setProperty("--edge-brightness", "0.2");
  }

  updateGloss(event) {
    const tile = event.currentTarget;
    const rect = tile.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    tile.style.setProperty("--mouse-x", x + "px");
    tile.style.setProperty("--mouse-y", y + "px");


    const width = rect.width;
    const height = rect.height;


    const distLeft = x;
    const distRight = width - x;
    const distTop = y;
    const distBottom = height - y;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);


    const edgeBrightness = Math.min(
      0.5,
      0.3 + 0.2 * (1 - (minDist / Math.min(width, height)) * 2)
    );

    tile.style.setProperty("--edge-brightness", edgeBrightness.toString());
  }

  static get observedAttributes() {
    return ["icon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "icon") {
      this._updateIcon(newValue);
    }
  }

  get icon() {
    return this.getAttribute("icon");
  }

  set icon(value) {
    this.setAttribute("icon", value);
  }

  _updateIcon(iconUrl) {
    if (this._iconElement && iconUrl) {
      this._iconElement.src = iconUrl;
    }
  }
}

class UWPLargeTile extends BaseUWPLargeTile {}

class UWPTile extends BaseUWPTile {}

class UWPButton extends BaseUWPButton {}

class UWPAPPBarButton extends BaseUWPAppBarButton {}

class UWPPasswordBox extends BaseUWPPasswordBox {}

class UWPRichEditBox extends BaseUWPRichEditBox {}

class UWPDialog extends BaseUWPDialog {}

class UWPSelectableList extends BaseUWPSelectableList {}

class UWPCheckbox extends BaseUWPCheckbox {}

class UWPHighButton extends BaseUWPHighButton {}

class UWPOpenList extends BaseUWPOpenList {}

class UWPWhiteTile extends BaseUWPWhiteTile {}

class UWPGreenTile extends BaseUWPGreenTile {}

customElements.define("win-button", UWPButton);
customElements.define("win-inputbox", UWPAPPBarButton);
customElements.define("win-passwordbox", UWPPasswordBox);
customElements.define("win-richrditbox", UWPRichEditBox);
customElements.define("win-dialog", UWPDialog);
customElements.define("win-list", UWPSelectableList);
customElements.define("win-checkbox", UWPCheckbox);
customElements.define("win-high-button", UWPHighButton);
customElements.define("win-open-list", UWPOpenList);
customElements.define("win-tile", UWPTile);
customElements.define("win-large-tile", UWPLargeTile);
customElements.define("win-white-tile", UWPWhiteTile);
customElements.define("win-green-tile", UWPGreenTile);

export {
  UWPButton,
  UWPAPPBarButton,
  UWPPasswordBox,
  UWPRichEditBox,
  UWPDialog,
  UWPSelectableList,
  UWPCheckbox,
  UWPHighButton,
  UWPOpenList,
  UWPTile,
  UWPLargeTile,
  UWPWhiteTile,
  UWPGreenTile
};
