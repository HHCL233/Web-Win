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
            contenteditable="true";
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
          line-height: 15.76px;
          min-height: 15.76px;
          padding: 10px 20px;
          background: var(--primary-color, #CCCCCC);
          color: rgb(0, 0, 0);
          border: none;
          cursor: pointer;
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
    this.shadowRoot.addEventListener('click', (e) => {
      if (e.target === this) {
        this.hide();
      }
    });
    this._transitionEndHandler = (e) => {
      if (e.target === this.shadowRoot.querySelector('.dialog-container')) {
        this._finalizeHide();
      }
    }
  }
  _finalizeHide() {
    if (!this.show) {
      const container = this.shadowRoot.querySelector('.dialog-container');
      this.style.display = 'none';
      this.style.pointerEvents = '';
      container.classList.remove('closing');
    }
  }

  hide() {
    const container = this.shadowRoot.querySelector('.dialog-container');
    
    // 先移除可能存在的旧监听器
    container.removeEventListener('transitionend', this._transitionEndHandler);
    
    // 添加新监听器
    container.addEventListener('transitionend', this._transitionEndHandler, { once: true });
    
    container.classList.add('closing');
    this.removeAttribute('show');
  }
  
  static get observedAttributes() {
    return ['show', 'title'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      if (newValue !== null) {
        this.show();
      } else {
        this.hide();
      }
    } else if (name === 'title') {
      this.shadowRoot.getElementById('title').textContent = newValue;
    }
  }
  
  connectedCallback() {
    this.updateButtons();
  }
  
  get show() {
    return this.hasAttribute('show');
  }
  
  set show(value) {
    if (value) {
      this.setAttribute('show', '');
    } else {
      this.removeAttribute('show');
    }
  }
  
  get title() {
    return this.getAttribute('title') || '';
  }
  
  set title(value) {
    this.setAttribute('title', value);
  }
  
  get content() {
    return this.shadowRoot.getElementById('content').innerHTML;
  }
  
  set content(value) {
    this.shadowRoot.getElementById('content').innerHTML = value;
  }
  
  set buttons(value) {
    this._buttons = Array.isArray(value) ? value : [];
    this.updateButtons();
  }
  
  get buttons() {
    return this._buttons;
  }
  
  updateButtons() {
    const footer = this.shadowRoot.getElementById('footer');
    footer.innerHTML = '';
    
    this._buttons.forEach(button => {
      const btn = document.createElement('button');
      btn.className = 'uwpbutton';
      btn.textContent = button.text;
      
      if (button.disabled) {
        btn.disabled = true;
      }
      
      btn.addEventListener('click', () => {
        const event = new CustomEvent('buttonclick', {
          detail: {
            index: button.index,
            text: button.text
          }
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
    this.style.display = 'flex';
    this.style.pointerEvents = 'auto';
    const container = this.shadowRoot.querySelector('.dialog-container');
    container.classList.remove('closing'); // 移除关闭类
    void this.offsetWidth; // 强制重绘
    this.setAttribute('show', '');
  }

  hide() {
    const container = this.shadowRoot.querySelector('.dialog-container');
    container.classList.add('closing'); // 添加关闭类触发缩小动画
    
    container.addEventListener('transitionend', () => {
      if (!this.show) {
        this.style.display = 'none';
        this.style.pointerEvents = 'none';
        container.classList.remove('closing'); // 清理关闭类
      }
    }, { once: true });
    
    this.removeAttribute('show');
  }
}


class UWPButton extends BaseUWPButton {}

class UWPAPPBarButton extends BaseUWPAppBarButton {}

class UWPPasswordBox extends BaseUWPPasswordBox {}

class UWPRichEditBox extends BaseUWPRichEditBox {}

class UWPDialog extends BaseUWPDialog {}

customElements.define("win-button", UWPButton);
customElements.define("win-barbutton", UWPAPPBarButton);
customElements.define("win-passwordbox", UWPPasswordBox);
customElements.define("win-richrditbox", UWPRichEditBox);
customElements.define("win-dialog", UWPDialog);

