import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { format } from '../../../utils/utils';

@customElement('aw-demo-component')
export class AwDemoComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--aw-spacing-md, 1rem);
      background-color: var(--aw-color-neutral-50, #f9fafb);
      border: 1px solid var(--aw-color-neutral-200, #e5e7eb);
      border-radius: var(--aw-border-radius-md, 0.5rem);
      font-family: var(--aw-font-family-sans, system-ui, sans-serif);
    }

    /* Block: aw-demo-component - BEM methodology with ITCSS principles */
    .aw-demo-component {
      color: var(--aw-color-neutral-900, #111827);
      font-size: var(--aw-font-size-base, 1rem);
      line-height: var(--aw-line-height-base, 1.5);
    }

    /* Element: greeting text */
    .aw-demo-component__greeting {
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-color-primary-600, #2563eb);
      margin-bottom: var(--aw-spacing-xs, 0.25rem);
    }

    /* Element: name display */
    .aw-demo-component__name {
      font-size: var(--aw-font-size-lg, 1.125rem);
      color: var(--aw-color-neutral-700, #374151);
    }
  `;

  /**
   * The first name
   */
  @property() first_name!: string;

  /**
   * The middle name
   */
  @property() middle_name!: string;

  /**
   * The last name
   */
  @property() last_name!: string;

  private getText(): string {
    return format(this.first_name, this.middle_name, this.last_name);
  }

  render() {
    return html`
      <div class="aw-demo-component">
        <div class="aw-demo-component__greeting">Hello, World!</div>
        <div class="aw-demo-component__name">I'm ${this.getText()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-demo-component': AwDemoComponent;
  }
}