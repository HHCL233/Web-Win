class BaseUWPButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          .uwpbutton {
            vertical-align:middle;
            line-height:15.76px;
            min-height:15.76px;
            padding: 10px 20px;
            background: var(--primary-color, #CCCCCC);
            color:rgb(0, 0, 0);
            border: none;
            cursor: pointer;
            font-size: 16px;
            filter: blur(0px);
            transition: filter 0.3s ease;
            transform: scale(1);
            transition: transform 0.3s ease;
          }
          .uwpbutton:active {
            transition: opacity 0.3s ease;
            transform: scale(0.97);
            filter: blur(0.5px);
            outline: 0px solid  #999999;
            background: var(--primary-color, #999999);
          }
          .uwpbutton:hover {
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
            line-height:15px;
            min-height:15px;
            padding: 9px 10px;
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
            line-height:15px;
            min-height:15px;
            padding: 9px 10px;
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
            resize: none;
            vertical-align:middle;
            display:inline-block;
            min-width:300px;
            outline: 2.75px solid  #999999;
            outline-offset: -2.75px;
            line-height:25.76px;
            min-height:25.76px;
            padding: 5px 10px;
            background: var(--primary-color,rgb(255, 255, 255));
            color:rgb(0, 0, 0);
            border: none;
            font-size: 16px;
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
        <div class="uwprichrditbox" contenteditable="true"><br /></div>  
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
class UWPButton extends BaseUWPButton {}

class UWPAPPBarButton extends BaseUWPAppBarButton {}

class UWPPasswordBox extends BaseUWPPasswordBox {}

class UWPRichEditBox extends BaseUWPRichEditBox {}

customElements.define("win-button", UWPButton);
customElements.define("win-barbutton", UWPAPPBarButton);
customElements.define("win-passwordbox", UWPPasswordBox);
customElements.define("win-richrditbox", UWPRichEditBox);