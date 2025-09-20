import { LitElement, html, css } from 'lit';
import { customElement, property, state, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type TabsVariant = 'default' | 'pills' | 'underline' | 'bordered';
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * @fileoverview AW Tabs Component
 * 
 * A tab interface component with multiple variants and accessibility support.
 * Supports keyboard navigation and various styling options.
 * 
 * @example
 * ```html
 * <!-- Basic tabs -->
 * <aw-tabs>
 *   <aw-tab-panel tab-title="Tab 1">
 *     <p>Content for tab 1</p>
 *   </aw-tab-panel>
 *   <aw-tab-panel tab-title="Tab 2">
 *     <p>Content for tab 2</p>
 *   </aw-tab-panel>
 * </aw-tabs>
 * 
 * <!-- Pills variant with icons -->
 * <aw-tabs variant="pills">
 *   <aw-tab-panel tab-title="Profile" tab-icon="👤">
 *     <p>Profile settings</p>
 *   </aw-tab-panel>
 *   <aw-tab-panel tab-title="Settings" tab-icon="⚙️">
 *     <p>Application settings</p>
 *   </aw-tab-panel>
 * </aw-tabs>
 * ```
 * 
 * @since 1.0.0
 */
@customElement('aw-tabs')
export class AwTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
    }

    /* ITCSS - Components: Block - tabs container */
    .aw-tabs {
      display: flex;
    }

    .aw-tabs--orientation-horizontal {
      flex-direction: column;
    }

    .aw-tabs--orientation-vertical {
      flex-direction: row;
      align-items: flex-start;
    }

    /* ITCSS - Components: Elements - tab list */
    .aw-tabs__list {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      border: none;
    }

    .aw-tabs--orientation-horizontal .aw-tabs__list {
      flex-direction: row;
      border-bottom: 1px solid var(--aw-color-neutral-200, #e5e5e5);
    }

    .aw-tabs--orientation-vertical .aw-tabs__list {
      flex-direction: column;
      border-right: 1px solid var(--aw-color-neutral-200, #e5e5e5);
      min-width: 200px;
      margin-right: var(--aw-spacing-lg, 1rem);
    }

    /* ITCSS - Components: Elements - tab button */
    .aw-tabs__tab {
      background: none;
      border: none;
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-family: inherit;
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-medium, 500);
      color: var(--aw-color-neutral-600, #6b7280);
      cursor: pointer;
      transition: all var(--aw-transition-duration-fast, 0.15s) var(--aw-transition-timing-ease, ease-in-out);
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--aw-spacing-sm, 0.5rem);
      white-space: nowrap;
    }

    .aw-tabs__tab:hover {
      color: var(--aw-color-neutral-900, #111827);
    }

    .aw-tabs__tab:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: -2px;
    }

    .aw-tabs__tab--active {
      color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-tabs__tab--disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ITCSS - Components: Tab icon */
    .aw-tabs__tab-icon {
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* ITCSS - Components: Elements - content panel */
    .aw-tabs__panels {
      flex: 1;
      padding: var(--aw-spacing-lg, 1rem);
    }

    .aw-tabs--orientation-vertical .aw-tabs__panels {
      padding-left: 0;
    }

    .aw-tabs__panel {
      display: none;
      animation: fadeIn 0.2s ease-in-out;
    }

    .aw-tabs__panel--active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ITCSS - Components: Variant modifiers - default */
    .aw-tabs--variant-default .aw-tabs__tab--active {
      border-bottom: 2px solid var(--aw-color-primary-600, #2563eb);
    }

    .aw-tabs--variant-default.aw-tabs--orientation-vertical .aw-tabs__tab--active {
      border-bottom: none;
      border-right: 2px solid var(--aw-color-primary-600, #2563eb);
    }

    /* ITCSS - Components: Variant modifiers - pills */
    .aw-tabs--variant-pills .aw-tabs__list {
      gap: var(--aw-spacing-xs, 0.25rem);
      border: none;
    }

    .aw-tabs--variant-pills .aw-tabs__tab {
      border-radius: var(--aw-border-radius-full, 9999px);
      background-color: transparent;
    }

    .aw-tabs--variant-pills .aw-tabs__tab:hover {
      background-color: var(--aw-color-neutral-100, #f5f5f5);
    }

    .aw-tabs--variant-pills .aw-tabs__tab--active {
      background-color: var(--aw-color-primary-600, #2563eb);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-tabs--variant-pills .aw-tabs__tab--active:hover {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    /* ITCSS - Components: Variant modifiers - underline */
    .aw-tabs--variant-underline .aw-tabs__list {
      border: none;
    }

    .aw-tabs--variant-underline .aw-tabs__tab {
      border-bottom: 2px solid transparent;
    }

    .aw-tabs--variant-underline .aw-tabs__tab:hover {
      border-bottom-color: var(--aw-color-neutral-300, #d1d5db);
    }

    .aw-tabs--variant-underline .aw-tabs__tab--active {
      border-bottom-color: var(--aw-color-primary-600, #2563eb);
    }

    .aw-tabs--variant-underline.aw-tabs--orientation-vertical .aw-tabs__tab {
      border-bottom: none;
      border-right: 2px solid transparent;
    }

    .aw-tabs--variant-underline.aw-tabs--orientation-vertical .aw-tabs__tab:hover {
      border-right-color: var(--aw-color-neutral-300, #d1d5db);
    }

    .aw-tabs--variant-underline.aw-tabs--orientation-vertical .aw-tabs__tab--active {
      border-right-color: var(--aw-color-primary-600, #2563eb);
    }

    /* ITCSS - Components: Variant modifiers - bordered */
    .aw-tabs--variant-bordered .aw-tabs__list {
      background-color: var(--aw-color-neutral-50, #f9fafb);
      border: 1px solid var(--aw-color-neutral-200, #e5e5e5);
      border-radius: var(--aw-border-radius-md, 0.375rem);
      padding: var(--aw-spacing-xs, 0.25rem);
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-tabs--variant-bordered .aw-tabs__tab {
      border-radius: var(--aw-border-radius-sm, 0.25rem);
    }

    .aw-tabs--variant-bordered .aw-tabs__tab:hover {
      background-color: var(--aw-color-neutral-100, #f5f5f5);
    }

    .aw-tabs--variant-bordered .aw-tabs__tab--active {
      background-color: var(--aw-color-neutral-white, #ffffff);
      box-shadow: var(--aw-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .aw-tabs--orientation-vertical {
        flex-direction: column;
      }

      .aw-tabs--orientation-vertical .aw-tabs__list {
        flex-direction: row;
        border-right: none;
        border-bottom: 1px solid var(--aw-color-neutral-200, #e5e5e5);
        min-width: auto;
        margin-right: 0;
        margin-bottom: var(--aw-spacing-lg, 1rem);
        overflow-x: auto;
      }

      .aw-tabs--orientation-vertical .aw-tabs__panels {
        padding-left: var(--aw-spacing-lg, 1rem);
      }

      .aw-tabs__tab {
        padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
        font-size: var(--aw-font-size-xs, 0.75rem);
      }
    }
  `;

  /**
   * The tabs variant for styling
   * @type {'default' | 'pills' | 'underline' | 'bordered'}
   * @default 'default'
   */
  @property() variant: TabsVariant = 'default';

  /**
   * The tabs orientation
   * @type {'horizontal' | 'vertical'}
   * @default 'horizontal'
   */
  @property() orientation: TabsOrientation = 'horizontal';

  /**
   * The currently active tab index
   * @type {number}
   * @default 0
   */
  @property({ type: Number, attribute: 'active-tab' }) activeTab: number = 0;

  /**
   * Whether tabs should be keyboard navigable
   * @type {boolean}
   * @default true
   */
  @property({ type: Boolean, attribute: 'keyboard-navigation' }) keyboardNavigation: boolean = true;

  /**
   * Internal state for tab panels
   * @private
   */
  @state() private tabPanels: AwTabPanel[] = [];

  /**
   * All tab button elements
   */
  @queryAll('.aw-tabs__tab') private tabButtons!: NodeListOf<HTMLButtonElement>;

  /**
   * Lifecycle method called after first update
   */
  firstUpdated() {
    this.updateTabPanels();
  }

  /**
   * Updates the list of tab panels
   * @private
   */
  private updateTabPanels() {
    const slot = this.shadowRoot?.querySelector('slot');
    const elements = slot?.assignedElements() || [];
    this.tabPanels = elements.filter((el): el is AwTabPanel => el.tagName === 'AW-TAB-PANEL');
    this.requestUpdate();
  }

  /**
   * Activates a tab by index
   * @public
   * @param {number} index - The tab index to activate
   */
  setActiveTab(index: number) {
    if (index >= 0 && index < this.tabPanels.length && !this.tabPanels[index].disabled) {
      const previousTab = this.activeTab;
      this.activeTab = index;
      
      this.dispatchEvent(new CustomEvent('aw-tabs-change', {
        detail: { 
          activeTab: index, 
          previousTab,
          tabPanel: this.tabPanels[index]
        },
        bubbles: true,
        composed: true,
      }));
    }
  }

  /**
   * Handles tab click
   * @private
   */
  private handleTabClick = (index: number) => {
    this.setActiveTab(index);
  };

  /**
   * Handles keyboard navigation
   * @private
   */
  private handleTabKeyDown = (event: KeyboardEvent, index: number) => {
    if (!this.keyboardNavigation) return;

    let newIndex = index;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : this.tabPanels.length - 1;
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = index < this.tabPanels.length - 1 ? index + 1 : 0;
        break;

      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        event.preventDefault();
        newIndex = this.tabPanels.length - 1;
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.setActiveTab(index);
        return;

      default:
        return;
    }

    // Find next non-disabled tab
    while (this.tabPanels[newIndex]?.disabled && newIndex !== index) {
      if (newIndex === this.tabPanels.length - 1) {
        newIndex = 0;
      } else {
        newIndex++;
      }
    }

    if (!this.tabPanels[newIndex]?.disabled) {
      this.tabButtons[newIndex]?.focus();
    }
  };

  /**
   * Handles slot changes
   * @private
   */
  private handleSlotChange = () => {
    this.updateTabPanels();
  };

  /**
   * Renders the tabs component
   * @returns {TemplateResult}
   */
  render() {
    const tabsClasses = {
      'aw-tabs': true,
      [`aw-tabs--variant-${this.variant}`]: true,
      [`aw-tabs--orientation-${this.orientation}`]: true,
    };

    return html`
      <div class=${classMap(tabsClasses)}>
        <div class="aw-tabs__list" role="tablist" aria-orientation=${this.orientation}>
          ${this.tabPanels.map((panel, index) => {
            const tabClasses = {
              'aw-tabs__tab': true,
              'aw-tabs__tab--active': index === this.activeTab,
              'aw-tabs__tab--disabled': panel.disabled,
            };

            return html`
              <button
                class=${classMap(tabClasses)}
                role="tab"
                tabindex=${index === this.activeTab ? '0' : '-1'}
                aria-selected=${index === this.activeTab}
                aria-controls="panel-${index}"
                ?disabled=${panel.disabled}
                @click=${() => this.handleTabClick(index)}
                @keydown=${(e: KeyboardEvent) => this.handleTabKeyDown(e, index)}
              >
                ${panel.tabIcon ? html`<span class="aw-tabs__tab-icon">${panel.tabIcon}</span>` : ''}
                ${panel.tabTitle}
              </button>
            `;
          })}
        </div>
        
        <div class="aw-tabs__panels">
          ${this.tabPanels.map((panel, index) => {
            const panelClasses = {
              'aw-tabs__panel': true,
              'aw-tabs__panel--active': index === this.activeTab,
            };

            return html`
              <div
                class=${classMap(panelClasses)}
                role="tabpanel"
                id="panel-${index}"
                aria-labelledby="tab-${index}"
                ?hidden=${index !== this.activeTab}
              >
                ${index === this.activeTab ? html`<slot name="panel-${index}"></slot>` : ''}
              </div>
            `;
          })}
        </div>
      </div>
      
      <slot @slotchange=${this.handleSlotChange} style="display: none;"></slot>
    `;
  }
}

/**
 * @fileoverview AW Tab Panel Component
 * 
 * Individual tab panel component to be used within aw-tabs.
 */
@customElement('aw-tab-panel')
export class AwTabPanel extends LitElement {
  /**
   * The tab title displayed in the tab button
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'tab-title' }) tabTitle: string = '';

  /**
   * Optional icon for the tab
   * @type {string}
   * @default ''
   */
  @property({ attribute: 'tab-icon' }) tabIcon: string = '';

  /**
   * Whether the tab is disabled
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean }) disabled: boolean = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-tabs': AwTabs;
    'aw-tab-panel': AwTabPanel;
  }
}