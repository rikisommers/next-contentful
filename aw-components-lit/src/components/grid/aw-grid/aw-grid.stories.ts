import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './aw-grid.ts';

/**
 * CSS Grid Layout Component - A flexible and powerful grid system with responsive breakpoints, customizable gaps, alignment options, and auto-fit capabilities for modern layouts.
 */
const meta: Meta = {
  title: 'Components/Grid & Layout/Grid',
  component: 'aw-grid',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The **Grid** component provides a comprehensive CSS Grid implementation with responsive breakpoints, flexible column configurations, and advanced layout features.

## Features
- **Responsive Breakpoints**: Mobile, tablet, and desktop column configurations
- **Flexible Columns**: 1-12 columns, auto-fit, auto-fill, or custom templates
- **Smart Gaps**: Configurable row and column gaps with predefined sizes
- **Auto-Fit/Fill**: Automatic column sizing based on content and container
- **Template Areas**: Support for named grid areas and complex layouts
- **Alignment Control**: Full control over item and content alignment
- **Dense Packing**: Optimize space usage with dense grid flow
- **Custom Templates**: Override with custom grid-template-columns/rows
- **Accessibility**: Proper ARIA roles and semantic structure

## Usage
\`\`\`html
<!-- Basic responsive grid -->
<aw-grid columns="3" columns-mobile="1" columns-tablet="2" gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</aw-grid>

<!-- Auto-fit grid with minimum width -->
<aw-grid auto-fit min-item-width="250px" gap="md">
  <div>Flexible Item 1</div>
  <div>Flexible Item 2</div>
  <div>Flexible Item 3</div>
</aw-grid>

<!-- Template areas layout -->
<aw-grid template-areas="'header header' 'sidebar main' 'footer footer'" gap="lg">
  <div style="grid-area: header">Header</div>
  <div style="grid-area: sidebar">Sidebar</div>
  <div style="grid-area: main">Main Content</div>
  <div style="grid-area: footer">Footer</div>
</aw-grid>
\`\`\`

## Responsive Behavior
The grid automatically adapts to different screen sizes:
- **Mobile** (< 768px): Uses \`columns-mobile\` setting
- **Tablet** (768px - 1023px): Uses \`columns-tablet\` setting  
- **Desktop** (≥ 1024px): Uses \`columns\` or \`columns-desktop\` setting
        `
      }
    }
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'fit-content'],
      description: 'Number of columns or auto-sizing mode'
    },
    columnsMobile: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'],
      description: 'Number of columns on mobile devices'
    },
    columnsTablet: {
      control: 'select', 
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'],
      description: 'Number of columns on tablet devices'
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Grid gap size'
    },
    alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Grid items alignment'
    },
    justifyContent: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly'],
      description: 'Grid content justification'
    },
    gridFlow: {
      control: 'select',
      options: ['row', 'column', 'row-dense', 'column-dense'],
      description: 'Grid auto flow direction'
    },
    autoFit: {
      control: 'boolean',
      description: 'Enable auto-fit columns (responsive column count)'
    },
    autoFill: {
      control: 'boolean', 
      description: 'Enable auto-fill columns (fills available space)'
    },
    minItemWidth: {
      control: 'text',
      description: 'Minimum item width for auto-fit/fill (CSS length)'
    },
    dense: {
      control: 'boolean',
      description: 'Enable dense packing to fill gaps'
    },
    fullHeight: {
      control: 'boolean',
      description: 'Make grid full viewport height'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable grid interactions'
    }
  },
  args: {
    columns: 3,
    columnsMobile: 1,
    columnsTablet: 2,
    gap: 'md',
    alignItems: 'stretch',
    justifyContent: 'start',
    gridFlow: 'row',
    autoFit: false,
    autoFill: false,
    minItemWidth: '250px',
    dense: false,
    fullHeight: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Basic responsive grid with customizable columns per breakpoint
 */
export const Default: Story = {
  render: (args) => {
    const cleanArgs = {
      columns: args.columns || 3,
      columnsMobile: args.columnsMobile || 1,
      columnsTablet: args.columnsTablet || 2,
      gap: String(args.gap || 'md'),
      alignItems: String(args.alignItems || 'stretch'),
      justifyContent: String(args.justifyContent || 'start'),
      gridFlow: String(args.gridFlow || 'row'),
      autoFit: Boolean(args.autoFit),
      autoFill: Boolean(args.autoFill),
      minItemWidth: String(args.minItemWidth || '250px'),
      dense: Boolean(args.dense),
      fullHeight: Boolean(args.fullHeight),
      disabled: Boolean(args.disabled)
    };

    return html`
      <style>
        .demo-item {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 120px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .demo-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        .demo-item:nth-child(2n) {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .demo-item:nth-child(3n) {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
      </style>

      <aw-grid
        columns=${cleanArgs.columns}
        columns-mobile=${cleanArgs.columnsMobile}
        columns-tablet=${cleanArgs.columnsTablet}
        gap=${cleanArgs.gap}
        align-items=${cleanArgs.alignItems}
        justify-content=${cleanArgs.justifyContent}
        grid-flow=${cleanArgs.gridFlow}
        ?auto-fit=${cleanArgs.autoFit}
        ?auto-fill=${cleanArgs.autoFill}
        min-item-width=${cleanArgs.minItemWidth}
        ?dense=${cleanArgs.dense}
        ?full-height=${cleanArgs.fullHeight}
        ?disabled=${cleanArgs.disabled}>
        <div class="demo-item">Grid Item 1</div>
        <div class="demo-item">Grid Item 2</div>
        <div class="demo-item">Grid Item 3</div>
        <div class="demo-item">Grid Item 4</div>
        <div class="demo-item">Grid Item 5</div>
        <div class="demo-item">Grid Item 6</div>
      </aw-grid>
    `;
  }
};

/**
 * Auto-fit responsive grid that adapts to container width
 */
export const AutoFit: Story = {
  render: () => html`
    <style>
      .auto-item {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        font-weight: 500;
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      }
    </style>

    <div style="max-width: 1200px;">
      <h3 style="margin-bottom: 1.5rem; color: #333;">Auto-Fit Grid (Resize window to see adaptation)</h3>
      <aw-grid auto-fit min-item-width="200px" gap="lg">
        <div class="auto-item">Responsive 1</div>
        <div class="auto-item">Responsive 2</div>
        <div class="auto-item">Responsive 3</div>
        <div class="auto-item">Responsive 4</div>
        <div class="auto-item">Responsive 5</div>
        <div class="auto-item">Responsive 6</div>
        <div class="auto-item">Responsive 7</div>
        <div class="auto-item">Responsive 8</div>
      </aw-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Auto-fit grid automatically adjusts the number of columns based on available space and minimum item width. Items will wrap to new rows as needed.'
      }
    }
  }
};

/**
 * Card layout grid perfect for product displays or content cards
 */
export const CardLayout: Story = {
  render: () => html`
    <style>
      .card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
      .card-image {
        width: 100%;
        height: 200px;
        background: linear-gradient(45deg, #ff6b6b, #ffd93d);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 3rem;
      }
      .card-content {
        padding: 1.5rem;
      }
      .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #333;
      }
      .card-description {
        color: #666;
        line-height: 1.6;
        margin: 0 0 1rem 0;
      }
      .card-price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #007bff;
      }
    </style>

    <div>
      <h3 style="margin-bottom: 1.5rem; color: #333;">Product Card Grid</h3>
      <aw-grid columns="4" columns-mobile="1" columns-tablet="2" gap="xl">
        <div class="card">
          <div class="card-image">📱</div>
          <div class="card-content">
            <h4 class="card-title">Smartphone Pro</h4>
            <p class="card-description">Latest flagship device with advanced camera system</p>
            <div class="card-price">$999</div>
          </div>
        </div>
        <div class="card">
          <div class="card-image">💻</div>
          <div class="card-content">
            <h4 class="card-title">Laptop Ultra</h4>
            <p class="card-description">High-performance laptop for professionals</p>
            <div class="card-price">$1,499</div>
          </div>
        </div>
        <div class="card">
          <div class="card-image">🎧</div>
          <div class="card-content">
            <h4 class="card-title">Headphones Max</h4>
            <p class="card-description">Premium wireless headphones with noise cancellation</p>
            <div class="card-price">$549</div>
          </div>
        </div>
        <div class="card">
          <div class="card-image">⌚</div>
          <div class="card-content">
            <h4 class="card-title">Smartwatch Series</h4>
            <p class="card-description">Health tracking and smart notifications</p>
            <div class="card-price">$399</div>
          </div>
        </div>
        <div class="card">
          <div class="card-image">📷</div>
          <div class="card-content">
            <h4 class="card-title">Camera DSLR</h4>
            <p class="card-description">Professional photography equipment</p>
            <div class="card-price">$1,299</div>
          </div>
        </div>
        <div class="card">
          <div class="card-image">🖥️</div>
          <div class="card-content">
            <h4 class="card-title">Monitor 4K</h4>
            <p class="card-description">Ultra-wide 4K display for productivity</p>
            <div class="card-price">$799</div>
          </div>
        </div>
      </aw-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Product card layout with responsive grid. Shows 4 columns on desktop, 2 on tablet, and 1 on mobile with hover effects and professional styling.'
      }
    }
  }
};

/**
 * Template areas layout for complex page structures
 */
export const TemplateAreas: Story = {
  render: () => html`
    <style>
      .layout-area {
        padding: 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        text-align: center;
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .header-area {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        grid-area: header;
      }
      .sidebar-area {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        grid-area: sidebar;
        min-height: 200px;
      }
      .main-area {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        grid-area: main;
        min-height: 200px;
      }
      .footer-area {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        grid-area: footer;
      }
      
      @media (max-width: 768px) {
        .mobile-layout {
          grid-template-areas: 'header' 'main' 'sidebar' 'footer' !important;
          grid-template-columns: 1fr !important;
        }
      }
    </style>

    <div>
      <h3 style="margin-bottom: 1.5rem; color: #333;">Template Areas Layout</h3>
      <aw-grid 
        template-areas="'header header header' 'sidebar main main' 'footer footer footer'"
        template-columns="200px 1fr 1fr"
        gap="lg"
        css-class="mobile-layout">
        <div class="layout-area header-area">Header Section</div>
        <div class="layout-area sidebar-area">Navigation<br/>Sidebar</div>
        <div class="layout-area main-area">Main Content<br/>Area</div>
        <div class="layout-area footer-area">Footer Section</div>
      </aw-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Complex layout using CSS Grid template areas. Creates a standard web layout with header, sidebar, main content, and footer. Responsive design stacks vertically on mobile.'
      }
    }
  }
};

/**
 * Dashboard layout with different sized widgets
 */
export const Dashboard: Story = {
  render: () => html`
    <style>
      .widget {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: 1px solid #e0e0e0;
        transition: box-shadow 0.2s ease;
      }
      .widget:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
      .widget-title {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 1rem 0;
        color: #333;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .widget-content {
        color: #666;
      }
      .metric-value {
        font-size: 2rem;
        font-weight: bold;
        color: #007bff;
        margin: 0.5rem 0;
      }
      .chart-placeholder {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        height: 120px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        margin: 1rem 0;
      }
      
      .widget--large { grid-column: span 2; }
      .widget--tall { grid-row: span 2; }
      
      @media (max-width: 768px) {
        .widget--large { grid-column: span 1; }
        .widget--tall { grid-row: span 1; }
      }
    </style>

    <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px;">
      <h3 style="margin-bottom: 1.5rem; color: #333;">Analytics Dashboard</h3>
      <aw-grid columns="4" columns-mobile="1" columns-tablet="2" gap="lg">
        <div class="widget">
          <div class="widget-title">📊 Total Users</div>
          <div class="metric-value">24,596</div>
          <div class="widget-content">+12% from last month</div>
        </div>
        
        <div class="widget">
          <div class="widget-title">💰 Revenue</div>
          <div class="metric-value">$52,430</div>
          <div class="widget-content">+8.3% increase</div>
        </div>
        
        <div class="widget">
          <div class="widget-title">📈 Conversion</div>
          <div class="metric-value">3.24%</div>
          <div class="widget-content">-0.2% from yesterday</div>
        </div>
        
        <div class="widget">
          <div class="widget-title">⏱️ Avg. Session</div>
          <div class="metric-value">4:32</div>
          <div class="widget-content">+15% improvement</div>
        </div>
        
        <div class="widget widget--large">
          <div class="widget-title">📊 Traffic Overview</div>
          <div class="chart-placeholder">Chart Area - 2 columns wide</div>
          <div class="widget-content">Website traffic analysis for the past 30 days</div>
        </div>
        
        <div class="widget widget--tall">
          <div class="widget-title">🎯 Top Pages</div>
          <div class="widget-content">
            <div style="margin-bottom: 0.5rem;">1. Homepage - 45%</div>
            <div style="margin-bottom: 0.5rem;">2. Products - 23%</div>
            <div style="margin-bottom: 0.5rem;">3. About - 12%</div>
            <div style="margin-bottom: 0.5rem;">4. Contact - 8%</div>
            <div style="margin-bottom: 0.5rem;">5. Blog - 7%</div>
            <div>6. Support - 5%</div>
          </div>
        </div>
        
        <div class="widget">
          <div class="widget-title">🌍 Geographic</div>
          <div class="widget-content">
            <div>🇺🇸 USA - 42%</div>
            <div>🇬🇧 UK - 18%</div>
            <div>🇨🇦 Canada - 15%</div>
            <div>🇩🇪 Germany - 12%</div>
            <div>🇫🇷 France - 8%</div>
            <div>Others - 5%</div>
          </div>
        </div>
      </aw-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Dashboard layout with widgets of different sizes using CSS Grid span utilities. Large widgets span multiple columns/rows to create an engaging analytics interface.'
      }
    }
  }
};

/**
 * Gallery layout with masonry-style grid using auto-fit
 */
export const Gallery: Story = {
  render: () => html`
    <style>
      .gallery-item {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .gallery-item:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }
      .gallery-image {
        width: 100%;
        height: 200px;
        background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
      }
      .gallery-item:nth-child(3n) .gallery-image {
        height: 150px;
        background: linear-gradient(45deg, #a8edea 0%, #fed6e3 100%);
      }
      .gallery-item:nth-child(4n) .gallery-image {
        height: 250px;
        background: linear-gradient(45deg, #fbc2eb 0%, #a6c1ee 100%);
      }
      .gallery-item:nth-child(5n) .gallery-image {
        height: 180px;
        background: linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%);
      }
      .gallery-info {
        padding: 1rem;
      }
      .gallery-title {
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #333;
      }
      .gallery-description {
        color: #666;
        font-size: 0.875rem;
        line-height: 1.4;
        margin: 0;
      }
    </style>

    <div>
      <h3 style="margin-bottom: 1.5rem; color: #333;">Photo Gallery Grid</h3>
      <aw-grid auto-fit min-item-width="280px" gap="lg">
        <div class="gallery-item">
          <div class="gallery-image">🏞️</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Mountain Landscape</h4>
            <p class="gallery-description">Breathtaking view of snow-capped peaks</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🌊</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Ocean Waves</h4>
            <p class="gallery-description">Powerful waves crashing against rocks</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🌅</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Golden Sunrise</h4>
            <p class="gallery-description">Beautiful morning light over the valley</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🌲</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Forest Path</h4>
            <p class="gallery-description">Mysterious trail through ancient woods</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🏙️</div>
          <div class="gallery-info">
            <h4 class="gallery-title">City Skyline</h4>
            <p class="gallery-description">Modern architecture at dusk</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🌺</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Tropical Flowers</h4>
            <p class="gallery-description">Vibrant blooms in paradise</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🏔️</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Alpine Adventure</h4>
            <p class="gallery-description">High altitude climbing expedition</p>
          </div>
        </div>
        
        <div class="gallery-item">
          <div class="gallery-image">🌌</div>
          <div class="gallery-info">
            <h4 class="gallery-title">Starry Night</h4>
            <p class="gallery-description">Milky Way over desert landscape</p>
          </div>
        </div>
      </aw-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Gallery layout using auto-fit grid with variable height images. Perfect for photo galleries, portfolios, or content showcases where items have different sizes.'
      }
    }
  }
};

/**
 * Accessibility demonstration with proper ARIA roles and keyboard navigation
 */
export const Accessibility: Story = {
  render: () => html`
    <style>
      .accessible-item {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      .accessible-item:hover {
        border-color: #007bff;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
      }
      .accessible-item:focus {
        outline: 3px solid #007bff;
        outline-offset: 2px;
      }
      .accessible-item:focus-visible {
        outline: 3px solid #007bff;
        outline-offset: 2px;
      }
      .item-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
      .item-title {
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #333;
      }
      .item-description {
        color: #666;
        font-size: 0.875rem;
        margin: 0;
      }
    </style>

    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Accessibility Features Demo</h3>
        <p>This story demonstrates grid accessibility compliance:</p>
        <ul>
          <li><strong>Semantic Structure:</strong> Proper grid role and aria-disabled state</li>
          <li><strong>Keyboard Navigation:</strong> All interactive items are keyboard accessible</li>
          <li><strong>Focus Management:</strong> Clear focus indicators for all items</li>
          <li><strong>Screen Reader Support:</strong> Descriptive labels and roles</li>
        </ul>
        <p><em>Try navigating with Tab key and test with screen reader!</em></p>
      </div>

      <aw-grid 
        columns="3" 
        columns-mobile="1" 
        columns-tablet="2" 
        gap="lg"
        role="grid"
        aria-label="Interactive feature grid">
        <div 
          class="accessible-item" 
          tabindex="0"
          role="gridcell"
          aria-label="Keyboard Navigation feature"
          onclick="console.log('Keyboard Navigation clicked')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <div class="item-icon">⌨️</div>
          <h4 class="item-title">Keyboard Navigation</h4>
          <p class="item-description">Full keyboard support with Tab navigation</p>
        </div>
        
        <div 
          class="accessible-item" 
          tabindex="0"
          role="gridcell"
          aria-label="Screen Reader Support feature"
          onclick="console.log('Screen Reader Support clicked')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <div class="item-icon">🔊</div>
          <h4 class="item-title">Screen Reader Support</h4>
          <p class="item-description">Compatible with assistive technologies</p>
        </div>
        
        <div 
          class="accessible-item" 
          tabindex="0"
          role="gridcell"
          aria-label="Focus Management feature"
          onclick="console.log('Focus Management clicked')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <div class="item-icon">🎯</div>
          <h4 class="item-title">Focus Management</h4>
          <p class="item-description">Clear focus indicators and logical order</p>
        </div>
        
        <div 
          class="accessible-item" 
          tabindex="0"
          role="gridcell"
          aria-label="High Contrast Support feature"
          onclick="console.log('High Contrast clicked')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <div class="item-icon">🌓</div>
          <h4 class="item-title">High Contrast</h4>
          <p class="item-description">Maintains visibility in high contrast mode</p>
        </div>
        
        <div 
          class="accessible-item" 
          tabindex="0"
          role="gridcell"
          aria-label="Semantic Structure feature"
          onclick="console.log('Semantic Structure clicked')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <div class="item-icon">🏗️</div>
          <h4 class="item-title">Semantic Structure</h4>
          <p class="item-description">Proper HTML structure and ARIA roles</p>
        </div>
        
        <div 
          class="accessible-item" 
          tabindex="0"
          role="gridcell"
          aria-label="Responsive Design feature"
          onclick="console.log('Responsive Design clicked')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <div class="item-icon">📱</div>
          <h4 class="item-title">Responsive Design</h4>
          <p class="item-description">Adapts to all screen sizes and orientations</p>
        </div>
      </aw-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates comprehensive accessibility features:

- **Semantic Grid Structure**: Uses proper \`role="grid"\` and \`role="gridcell"\` attributes
- **Keyboard Navigation**: All interactive elements accessible via Tab key with Enter/Space activation
- **Focus Management**: Clear focus indicators meeting WCAG contrast requirements
- **Screen Reader Support**: Descriptive \`aria-label\` attributes for all interactive elements
- **High Contrast Mode**: Maintains usability in Windows High Contrast mode

All interactive elements meet WCAG 2.1 AA guidelines for accessibility compliance.
        `
      }
    }
  }
};