import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

// Button types based on original React component
export enum ButtonWipeType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
}

export enum ButtonWipeSound {
  ON = 'beepOn',
  OFF = 'beepOff',
  CLICK = 'click',
  PLINK = 'plink',
  DRIP = 'drip',
  MARIMBA = 'marimba',
}

@customElement('aw-button-wipe')
export class AwButtonWipe extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-button-wipe */
    .aw-button-wipe {
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--aw-button-wipe-padding, 0.75rem);
      overflow: hidden;
      font-size: var(--aw-button-wipe-font-size, 0.75rem);
      text-transform: uppercase;
      border-radius: var(--aw-button-wipe-border-radius, 0.5rem);
      cursor: pointer;
      transition: transform var(--aw-button-wipe-scale-duration, 0.6s) var(--aw-button-wipe-scale-ease, cubic-bezier(0.36, 0, 0.66, -0.56));
      border: none;
      background: none;
      user-select: none;
    }

    .aw-button-wipe:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Variant modifiers with BEM */
    .aw-button-wipe--type-default {
      background-color: var(--aw-button-wipe-bg-default, var(--surface-1, #f5f5f5));
      color: var(--aw-button-wipe-text-default, var(--text-color, #000000));
    }

    .aw-button-wipe--type-primary {
      background-color: var(--aw-button-wipe-bg-primary, var(--accent-pri, #3b82f6));
      color: var(--aw-button-wipe-text-primary, var(--text-color-inv, #ffffff));
    }

    .aw-button-wipe--type-secondary {
      background-color: transparent;
      border: 1px solid var(--aw-button-wipe-border-secondary, var(--accent-sec, #6b7280));
      color: var(--aw-button-wipe-text-secondary, var(--accent-sec, #6b7280));
    }

    .aw-button-wipe--type-transparent {
      background-color: transparent;
      color: var(--aw-button-wipe-text-transparent, var(--text-color, #000000));
    }

    /* ITCSS - Components: Element - button label */
    .aw-button-wipe__label {
      position: relative;
      z-index: 20;
    }

    /* ITCSS - Components: Element - wipe highlight effect */
    .aw-button-wipe__highlight {
      position: absolute;
      left: 0;
      z-index: 10;
      width: 100%;
      height: var(--aw-button-wipe-highlight-height, 2rem);
      top: var(--aw-button-wipe-highlight-top, 0.75rem);
      border-radius: 0;
      transform: translateY(100%) scale(1);
      transition: transform var(--aw-button-wipe-animation-duration, 0.6s) var(--aw-button-wipe-animation-ease, cubic-bezier(0.65, 0, 0.35, 1));
    }

    /* ITCSS - Components: Highlight color modifiers with BEM */
    .aw-button-wipe__highlight--type-default {
      background-color: var(--aw-button-wipe-highlight-default, var(--accent-pri, #3b82f6));
    }

    .aw-button-wipe__highlight--type-primary {
      background-color: var(--aw-button-wipe-highlight-primary, var(--accent-sec, #6b7280));
    }

    .aw-button-wipe__highlight--type-secondary {
      background-color: var(--aw-button-wipe-highlight-secondary, var(--accent-pri, #3b82f6));
    }

    .aw-button-wipe__highlight--type-transparent {
      background-color: var(--aw-button-wipe-highlight-transparent, var(--accent-pri, #3b82f6));
    }

    /* ITCSS - State: Hover state modifier */
    .aw-button-wipe--state-hovered .aw-button-wipe__highlight {
      transform: translateY(-10%) scale(1.8);
      border-radius: 50%;
    }

    /* ITCSS - State: Active state modifier */
    .aw-button-wipe:active {
      transform: scale(0.98);
    }

    /* ITCSS - State: Animate state for hover exit */
    .aw-button-wipe--state-exiting .aw-button-wipe__highlight {
      transform: translateY(100%) scale(1.5);
      border-radius: 0;
    }

    /* Keyframe animations for complex hover sequences */
    @keyframes aw-button-wipe-scale-sequence {
      0% { transform: scale(1); }
      25% { transform: scale(0.95); }
      75% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .aw-button-wipe--state-hovered {
      animation: aw-button-wipe-scale-sequence 0.6s var(--aw-button-wipe-scale-ease, cubic-bezier(0.36, 0, 0.66, -0.56));
    }
  `;

  /**
   * Button label text
   */
  @property() label_text: string = 'Button';

  /**
   * Button type variant
   */
  @property() button_type: ButtonWipeType = ButtonWipeType.DEFAULT;

  /**
   * Sound effect type
   */
  @property() sound_type: ButtonWipeSound = ButtonWipeSound.CLICK;

  /**
   * Internal hover state
   */
  @state() private isHovered: boolean = false;

  /**
   * Internal exit animation state
   */
  @state() private isExiting: boolean = false;

  private handleClick = (event: MouseEvent) => {
    // Dispatch custom event for click handling
    const customEvent = new CustomEvent('awClick', {
      detail: { 
        originalEvent: event, 
        buttonLabel: this.label_text,
        buttonType: this.button_type,
        soundType: this.sound_type
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);

    // Dispatch sound event
    const soundEvent = new CustomEvent('awButtonSound', {
      detail: { soundType: this.sound_type },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(soundEvent);
  };

  private handleMouseEnter = () => {
    this.isHovered = true;
    this.isExiting = false;
  };

  private handleMouseLeave = () => {
    this.isHovered = false;
    this.isExiting = true;
    // Reset exit state after animation
    setTimeout(() => {
      this.isExiting = false;
    }, 600);
  };

  render() {
    return html`
      <button
        class=${classMap({
          'aw-button-wipe': true,
          [`aw-button-wipe--type-${this.button_type}`]: true,
          'aw-button-wipe--state-hovered': this.isHovered,
          'aw-button-wipe--state-exiting': this.isExiting,
        })}
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <span class="aw-button-wipe__label">
          ${this.label_text}
        </span>
        
        <span class=${classMap({
          'aw-button-wipe__highlight': true,
          [`aw-button-wipe__highlight--type-${this.button_type}`]: true,
        })}></span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-button-wipe': AwButtonWipe;
  }
}