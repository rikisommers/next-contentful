import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Size } from '../../../types';

/**
 * AW Loading Spinner Component
 * 
 * A customizable loading spinner with multiple animation types, sizes, and colors.
 * Perfect for indicating loading states in forms, buttons, or page sections.
 * 
 * @element aw-loading-spinner
 * 
 * @slot default - Optional loading text
 * 
 * @csspart spinner - The spinner element
 * @csspart text - The loading text
 * 
 * @example
 * ```html
 * <aw-loading-spinner size="lg" variant="dots">Loading...</aw-loading-spinner>
 * <aw-loading-spinner size="sm" color="primary" overlay></aw-loading-spinner>
 * ```
 */
@customElement('aw-loading-spinner')
export class AwLoadingSpinner extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    :host([overlay]) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }

    /* ITCSS - Components: Block - aw-loading-spinner */
    .aw-loading-spinner {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--aw-spacing-sm, 0.5rem);
    }

    .aw-loading-spinner__spinner {
      display: inline-block;
      position: relative;
    }

    .aw-loading-spinner__text {
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      color: var(--aw-color-neutral-600, #4b5563);
      text-align: center;
    }

    /* Spinner variant - Default circular */
    .aw-loading-spinner__spinner--variant-default {
      width: 32px;
      height: 32px;
      border: 3px solid var(--aw-color-neutral-200, #e5e7eb);
      border-top-color: var(--aw-color-primary-500, #3b82f6);
      border-radius: 50%;
      animation: aw-spinner-spin 1s linear infinite;
    }

    /* Spinner variant - Dots */
    .aw-loading-spinner__spinner--variant-dots {
      width: 40px;
      height: 10px;
      position: relative;
    }

    .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner__dot {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--aw-color-primary-500, #3b82f6);
      animation: aw-spinner-dots 1.4s ease-in-out infinite;
    }

    .aw-loading-spinner__spinner--variant-dots::before {
      left: 0;
      animation-delay: -0.32s;
    }

    .aw-loading-spinner__dot {
      left: 16px;
      animation-delay: -0.16s;
    }

    .aw-loading-spinner__spinner--variant-dots::after {
      left: 32px;
    }

    /* Spinner variant - Pulse */
    .aw-loading-spinner__spinner--variant-pulse {
      width: 32px;
      height: 32px;
      background-color: var(--aw-color-primary-500, #3b82f6);
      border-radius: 50%;
      animation: aw-spinner-pulse 1.5s ease-in-out infinite;
    }

    /* Spinner variant - Bars */
    .aw-loading-spinner__spinner--variant-bars {
      width: 24px;
      height: 32px;
      position: relative;
    }

    .aw-loading-spinner__bar {
      position: absolute;
      width: 4px;
      height: 100%;
      background-color: var(--aw-color-primary-500, #3b82f6);
      animation: aw-spinner-bars 1s ease-in-out infinite;
    }

    .aw-loading-spinner__bar:nth-child(1) {
      left: 0;
      animation-delay: -0.4s;
    }

    .aw-loading-spinner__bar:nth-child(2) {
      left: 6px;
      animation-delay: -0.3s;
    }

    .aw-loading-spinner__bar:nth-child(3) {
      left: 12px;
      animation-delay: -0.2s;
    }

    .aw-loading-spinner__bar:nth-child(4) {
      left: 18px;
      animation-delay: -0.1s;
    }

    /* Size variants */
    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-default {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-dots {
      width: 24px;
      height: 6px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner--size-xs .aw-loading-spinner__dot {
      width: 4px;
      height: 4px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__dot {
      left: 10px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-dots::after {
      left: 20px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-pulse {
      width: 16px;
      height: 16px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__spinner--variant-bars {
      width: 16px;
      height: 20px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__bar {
      width: 2px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__bar:nth-child(2) {
      left: 4px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__bar:nth-child(3) {
      left: 8px;
    }

    .aw-loading-spinner--size-xs .aw-loading-spinner__bar:nth-child(4) {
      left: 12px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-default {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-dots {
      width: 32px;
      height: 8px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner--size-sm .aw-loading-spinner__dot {
      width: 6px;
      height: 6px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__dot {
      left: 13px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-dots::after {
      left: 26px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-pulse {
      width: 24px;
      height: 24px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__spinner--variant-bars {
      width: 20px;
      height: 28px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__bar {
      width: 3px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__bar:nth-child(2) {
      left: 5px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__bar:nth-child(3) {
      left: 10px;
    }

    .aw-loading-spinner--size-sm .aw-loading-spinner__bar:nth-child(4) {
      left: 15px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-default {
      width: 48px;
      height: 48px;
      border-width: 4px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-dots {
      width: 56px;
      height: 12px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner--size-lg .aw-loading-spinner__dot {
      width: 10px;
      height: 10px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__dot {
      left: 23px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-dots::after {
      left: 46px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-pulse {
      width: 48px;
      height: 48px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__spinner--variant-bars {
      width: 32px;
      height: 48px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__bar {
      width: 6px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__bar:nth-child(2) {
      left: 8px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__bar:nth-child(3) {
      left: 16px;
    }

    .aw-loading-spinner--size-lg .aw-loading-spinner__bar:nth-child(4) {
      left: 24px;
    }

    /* Color variants */
    .aw-loading-spinner--color-primary .aw-loading-spinner__spinner--variant-default {
      border-top-color: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-loading-spinner--color-primary .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner--color-primary .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner--color-primary .aw-loading-spinner__dot,
    .aw-loading-spinner--color-primary .aw-loading-spinner__spinner--variant-pulse,
    .aw-loading-spinner--color-primary .aw-loading-spinner__bar {
      background-color: var(--aw-color-primary-500, #3b82f6);
    }

    .aw-loading-spinner--color-secondary .aw-loading-spinner__spinner--variant-default {
      border-top-color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-loading-spinner--color-secondary .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner--color-secondary .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner--color-secondary .aw-loading-spinner__dot,
    .aw-loading-spinner--color-secondary .aw-loading-spinner__spinner--variant-pulse,
    .aw-loading-spinner--color-secondary .aw-loading-spinner__bar {
      background-color: var(--aw-color-neutral-500, #6b7280);
    }

    .aw-loading-spinner--color-white .aw-loading-spinner__spinner--variant-default {
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-loading-spinner--color-white .aw-loading-spinner__spinner--variant-dots::before,
    .aw-loading-spinner--color-white .aw-loading-spinner__spinner--variant-dots::after,
    .aw-loading-spinner--color-white .aw-loading-spinner__dot,
    .aw-loading-spinner--color-white .aw-loading-spinner__spinner--variant-pulse,
    .aw-loading-spinner--color-white .aw-loading-spinner__bar {
      background-color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-loading-spinner--color-white .aw-loading-spinner__text {
      color: var(--aw-color-neutral-white, #ffffff);
    }

    /* Overlay styling */
    :host([overlay]) .aw-loading-spinner {
      background-color: var(--aw-color-neutral-white, #ffffff);
      padding: var(--aw-spacing-xl, 1.5rem);
      border-radius: var(--aw-border-radius-lg, 0.5rem);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    /* Animations */
    @keyframes aw-spinner-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes aw-spinner-dots {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-spinner-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(0.5);
        opacity: 0.3;
      }
    }

    @keyframes aw-spinner-bars {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
      }
    }
  `;

  /**
   * Spinner size
   */
  @property() size: Size = 'md';

  /**
   * Spinner animation variant
   */
  @property() spinner_variant: 'default' | 'dots' | 'pulse' | 'bars' = 'default';

  /**
   * Spinner color
   */
  @property() color: 'primary' | 'secondary' | 'white' = 'primary';

  /**
   * Show as full-screen overlay
   */
  @property({ type: Boolean, reflect: true }) overlay: boolean = false;

  /**
   * Loading text
   */
  @property() loading_text: string = '';

  /**
   * Hide the spinner (useful for conditional loading states)
   */
  @property({ type: Boolean }) hidden: boolean = false;

  private renderSpinner() {
    const spinnerClasses = {
      'aw-loading-spinner__spinner': true,
      [`aw-loading-spinner__spinner--variant-${this.spinner_variant}`]: true
    };

    if (this.spinner_variant === 'dots') {
      return html`
        <div class=${classMap(spinnerClasses)} part="spinner">
          <div class="aw-loading-spinner__dot"></div>
        </div>
      `;
    }

    if (this.spinner_variant === 'bars') {
      return html`
        <div class=${classMap(spinnerClasses)} part="spinner">
          <div class="aw-loading-spinner__bar"></div>
          <div class="aw-loading-spinner__bar"></div>
          <div class="aw-loading-spinner__bar"></div>
          <div class="aw-loading-spinner__bar"></div>
        </div>
      `;
    }

    return html`<div class=${classMap(spinnerClasses)} part="spinner"></div>`;
  }

  render() {
    if (this.hidden) {
      return html``;
    }

    const hasText = this.loading_text || this.textContent?.trim();

    return html`
      <div
        class=${classMap({
          'aw-loading-spinner': true,
          [`aw-loading-spinner--size-${this.size}`]: true,
          [`aw-loading-spinner--color-${this.color}`]: true
        })}
      >
        ${this.renderSpinner()}
        
        ${hasText ? html`
          <div class="aw-loading-spinner__text" part="text">
            ${this.loading_text || html`<slot></slot>`}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-loading-spinner': AwLoadingSpinner;
  }
}