import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { emit } from "./tool";
import styles from "./counter.style";

@customElement("my-counter")
export default class MyCounter extends LitElement {
  static styles = styles;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min: number = -Infinity;

  @property({ type: Number })
  max: number = Infinity;

  handleIncrease() {
    this.value = Math.min(this.value + 1, this.max);
    this.requestUpdate();
    emit(this, "myChange", {
      detail: {
        value: this.value,
      },
    });
  }
  handleReduce() {
    this.value = Math.max(this.value - 1, this.min);
    this.requestUpdate();
    emit(this, "myChange", {
      detail: {
        value: this.value,
      },
    });
  }

  render() {
    return html`
      <div class="counter-container">
        <button class="button-left" @click=${this.handleReduce}>-</button>
        <p class="value-show">${this.value}</p>
        <button class="button-right" @click=${this.handleIncrease}>+</button>
      </div>
    `;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "my-counter": any;
    }
  }
}
