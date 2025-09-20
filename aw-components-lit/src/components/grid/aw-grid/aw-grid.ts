import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'fit-content';
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type GridAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline';
export type GridJustify = 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
export type GridFlow = 'row' | 'column' | 'row-dense' | 'column-dense';

/**
 * A flexible CSS Grid layout component with responsive breakpoints,
 * customizable gaps, alignment, and auto-fit capabilities.
 *
 * @slot default - Grid items content
 * 
 * @cssproperty --aw-grid-gap - Grid gap size
 * @cssproperty --aw-grid-min-width - Minimum item width for auto-fit
 * @cssproperty --aw-grid-max-width - Maximum item width for auto-fit
 */
@customElement('aw-grid')
export class AwGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .aw-grid {
      display: grid;
      width: 100%;
    }

    .aw-grid--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .aw-grid--full-height {
      min-height: 100vh;
    }

    /* Mobile responsive columns */
    @media (max-width: 767px) {
      .aw-grid--mobile-1 { grid-template-columns: repeat(1, 1fr) !important; }
      .aw-grid--mobile-2 { grid-template-columns: repeat(2, 1fr) !important; }
      .aw-grid--mobile-3 { grid-template-columns: repeat(3, 1fr) !important; }
      .aw-grid--mobile-4 { grid-template-columns: repeat(4, 1fr) !important; }
      .aw-grid--mobile-5 { grid-template-columns: repeat(5, 1fr) !important; }
      .aw-grid--mobile-6 { grid-template-columns: repeat(6, 1fr) !important; }
      .aw-grid--mobile-7 { grid-template-columns: repeat(7, 1fr) !important; }
      .aw-grid--mobile-8 { grid-template-columns: repeat(8, 1fr) !important; }
      .aw-grid--mobile-9 { grid-template-columns: repeat(9, 1fr) !important; }
      .aw-grid--mobile-10 { grid-template-columns: repeat(10, 1fr) !important; }
      .aw-grid--mobile-11 { grid-template-columns: repeat(11, 1fr) !important; }
      .aw-grid--mobile-12 { grid-template-columns: repeat(12, 1fr) !important; }
    }

    /* Tablet responsive columns */
    @media (min-width: 768px) and (max-width: 1023px) {
      .aw-grid--tablet-1 { grid-template-columns: repeat(1, 1fr) !important; }
      .aw-grid--tablet-2 { grid-template-columns: repeat(2, 1fr) !important; }
      .aw-grid--tablet-3 { grid-template-columns: repeat(3, 1fr) !important; }
      .aw-grid--tablet-4 { grid-template-columns: repeat(4, 1fr) !important; }
      .aw-grid--tablet-5 { grid-template-columns: repeat(5, 1fr) !important; }
      .aw-grid--tablet-6 { grid-template-columns: repeat(6, 1fr) !important; }
      .aw-grid--tablet-7 { grid-template-columns: repeat(7, 1fr) !important; }
      .aw-grid--tablet-8 { grid-template-columns: repeat(8, 1fr) !important; }
      .aw-grid--tablet-9 { grid-template-columns: repeat(9, 1fr) !important; }
      .aw-grid--tablet-10 { grid-template-columns: repeat(10, 1fr) !important; }
      .aw-grid--tablet-11 { grid-template-columns: repeat(11, 1fr) !important; }
      .aw-grid--tablet-12 { grid-template-columns: repeat(12, 1fr) !important; }
    }
  `;

  /**
   * Number of columns
   */
  @property({ type: String })
  columns: GridColumns = 'auto';

  /**
   * Number of columns on mobile
   */
  @property({ type: String, attribute: 'columns-mobile' })
  columnsMobile: GridColumns = 1;

  /**
   * Number of columns on tablet
   */
  @property({ type: String, attribute: 'columns-tablet' })
  columnsTablet: GridColumns = 2;

  /**
   * Number of columns on desktop
   */
  @property({ type: String, attribute: 'columns-desktop' })
  columnsDesktop: GridColumns = 'auto';

  /**
   * Grid gap size
   */
  @property({ type: String })
  gap: GridGap = 'md';

  /**
   * Row gap (if different from gap)
   */
  @property({ type: String, attribute: 'row-gap' })
  rowGap: GridGap | '' = '';

  /**
   * Column gap (if different from gap)
   */
  @property({ type: String, attribute: 'column-gap' })
  columnGap: GridGap | '' = '';

  /**
   * Grid items alignment
   */
  @property({ type: String, attribute: 'align-items' })
  alignItems: GridAlign = 'stretch';

  /**
   * Grid content justification
   */
  @property({ type: String, attribute: 'justify-content' })
  justifyContent: GridJustify = 'start';

  /**
   * Grid auto flow
   */
  @property({ type: String, attribute: 'grid-flow' })
  gridFlow: GridFlow = 'row';

  /**
   * Minimum item width (for auto-fit)
   */
  @property({ type: String, attribute: 'min-item-width' })
  minItemWidth = '250px';

  /**
   * Maximum item width (for auto-fit)
   */
  @property({ type: String, attribute: 'max-item-width' })
  maxItemWidth = '1fr';

  /**
   * Enable auto-fit columns
   */
  @property({ type: Boolean, attribute: 'auto-fit' })
  autoFit = false;

  /**
   * Enable auto-fill columns
   */
  @property({ type: Boolean, attribute: 'auto-fill' })
  autoFill = false;

  /**
   * Grid template areas (CSS grid-template-areas)
   */
  @property({ type: String, attribute: 'template-areas' })
  templateAreas = '';

  /**
   * Custom grid template columns
   */
  @property({ type: String, attribute: 'template-columns' })
  templateColumns = '';

  /**
   * Custom grid template rows
   */
  @property({ type: String, attribute: 'template-rows' })
  templateRows = '';

  /**
   * Dense packing mode
   */
  @property({ type: Boolean })
  dense = false;

  /**
   * Full height grid
   */
  @property({ type: Boolean, attribute: 'full-height' })
  fullHeight = false;

  /**
   * Custom CSS class
   */
  @property({ type: String, attribute: 'css-class' })
  cssClass = '';

  /**
   * Disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  private getColumnValue(columns: GridColumns): string {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    
    switch (columns) {
      case 'auto':
        return this.autoFit 
          ? `repeat(auto-fit, minmax(${this.minItemWidth}, ${this.maxItemWidth}))`
          : this.autoFill
          ? `repeat(auto-fill, minmax(${this.minItemWidth}, ${this.maxItemWidth}))`
          : 'none';
      case 'fit-content':
        return `repeat(auto-fit, minmax(${this.minItemWidth}, max-content))`;
      default:
        return 'none';
    }
  }

  private getGapValue(gap: GridGap): string {
    switch (gap) {
      case 'none': return '0';
      case 'xs': return '0.25rem';
      case 'sm': return '0.5rem';
      case 'md': return '1rem';
      case 'lg': return '1.5rem';
      case 'xl': return '2rem';
      case '2xl': return '3rem';
      default: return '1rem';
    }
  }

  private getGridStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Grid template columns
    if (this.templateColumns) {
      styles['grid-template-columns'] = this.templateColumns;
    } else {
      const desktopColumns = this.columnsDesktop !== 'auto' ? this.columnsDesktop : this.columns;
      styles['grid-template-columns'] = this.getColumnValue(desktopColumns);
    }

    // Grid template rows
    if (this.templateRows) {
      styles['grid-template-rows'] = this.templateRows;
    }

    // Grid template areas
    if (this.templateAreas) {
      styles['grid-template-areas'] = this.templateAreas;
    }

    // Grid auto flow
    let flow = this.gridFlow;
    if (this.dense && !flow.includes('dense')) {
      flow = `${flow} dense` as GridFlow;
    }
    styles['grid-auto-flow'] = flow;

    // Gaps
    const mainGap = this.getGapValue(this.gap);
    const rowGapValue = this.rowGap ? this.getGapValue(this.rowGap) : mainGap;
    const columnGapValue = this.columnGap ? this.getGapValue(this.columnGap) : mainGap;
    
    styles['row-gap'] = rowGapValue;
    styles['column-gap'] = columnGapValue;

    // Alignment
    styles['align-items'] = this.alignItems;
    styles['justify-content'] = this.justifyContent;

    // Height
    if (this.fullHeight) {
      styles['min-height'] = '100vh';
    }

    return styles;
  }

  private getResponsiveClasses(): { [key: string]: boolean } {
    const classes: { [key: string]: boolean } = {};

    // Mobile columns
    if (typeof this.columnsMobile === 'number') {
      classes[`aw-grid--mobile-${this.columnsMobile}`] = true;
    }

    // Tablet columns
    if (typeof this.columnsTablet === 'number') {
      classes[`aw-grid--tablet-${this.columnsTablet}`] = true;
    }

    return classes;
  }

  render() {
    const classes = {
      'aw-grid': true,
      [`aw-grid--gap-${this.gap}`]: true,
      [`aw-grid--align-${this.alignItems}`]: true,
      [`aw-grid--justify-${this.justifyContent}`]: true,
      [`aw-grid--flow-${this.gridFlow}`]: true,
      'aw-grid--auto-fit': this.autoFit,
      'aw-grid--auto-fill': this.autoFill,
      'aw-grid--dense': this.dense,
      'aw-grid--full-height': this.fullHeight,
      'aw-grid--disabled': this.disabled,
      ...this.getResponsiveClasses(),
      ...(this.cssClass ? { [this.cssClass]: true } : {})
    };

    return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(this.getGridStyles())}
        role="grid"
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aw-grid': AwGrid;
  }
}