// 保存事件函数的MAP
const listenedEvents = new WeakMap();
const addOrUpdateEventListener = (node, event, listener) => {
  // 根据DOM获取事件对象
  let events = listenedEvents.get(node);
  // 如果没有则设置新的
  if (events === undefined) {
    listenedEvents.set(node, (events = new Map()));
  }
  // 根据传递进来的对象获取函数
  let handler = events.get(event);
  if (listener !== undefined) {
    // 有传递函数
    if (handler === undefined) {
      // 没有获取到函数 添加新的函数
      events.set(event, (handler = { handleEvent: listener }));
      node.addEventListener(event, handler);
    } else {
      // 更新函数
      handler.handleEvent = listener;
    }
  } else if (handler !== undefined) {
    // 删除
    events.delete(event);
    node.removeEventListener(event, handler);
  }
};
const setRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else {
    ref.current = value;
  }
};
const setProperty = (node, name, value, old, events) => {
  // 获取事件函数
  const event =
    events === null || events === undefined ? undefined : events[name];
  if (event !== undefined) {
    // 函数不一样添加监听
    if (value !== old) {
      addOrUpdateEventListener(node, event, value);
    }
  } else {
    node[name] = value;
  }
};
const conversionComponents = (React, tagName, elementClass, events) => {
  const { Component, createElement } = React;

  // 获取传递给WebComponents的Props，包括事件
  const classProps = new Set(
    Object.keys(events !== null && events !== void 0 ? events : {})
  );
  // 获取传递给WebComponents的Props，包括事件
  for (const p in elementClass.prototype) {
    if (!(p in HTMLElement.prototype)) {
      classProps.add(p);
    }
  }
  class ReactComponent extends Component {
    constructor(props) {
      super(props);
      // 保存DOM的引用
      this.DOM = null;
    }
    _updateElement(oldProps) {
      if (this.DOM === null) {
        return;
      }
      // 将新的Props值传递给自定义元素，并且设置事件的监听
      for (const prop in this.DOMProps) {
        setProperty(
          this.DOM,
          prop,
          this.props[prop],
          oldProps ? oldProps[prop] : undefined,
          events
        );
      }
    }
    componentDidMount() {
      this._updateElement();
    }
    componentDidUpdate(old) {
      this._updateElement(old);
    }
    render() {
      // 获取WebComponents组件的DOM
      const userRef = this.props.__forwardedRef;
      if (this._ref === undefined || this._userRef !== userRef) {
        this._ref = (value) => {
          if (this.DOM === null) {
            this.DOM = value;
          }
          if (userRef !== null) {
            setRef(userRef, value);
          }
          this._userRef = userRef;
        };
      }
      // 设置最新的Props
      const props = { ref: this._ref };
      this.DOMProps = {};
      for (const [k, v] of Object.entries(this.props)) {
        if (classProps.has(k)) {
          this.DOMProps[k] = v;
        }
      }
      return createElement(tagName, props);
    }
  }
  // 转发Ref
  return React.forwardRef((props, ref) =>
    createElement(
      ReactComponent,
      { ...props, __forwardedRef: ref },
      props === null || props === undefined ? undefined : props.children
    )
  );
};

export default conversionComponents;
