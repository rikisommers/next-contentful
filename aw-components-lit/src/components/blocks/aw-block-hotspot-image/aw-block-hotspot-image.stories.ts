import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './aw-block-hotspot-image.ts';

/**
 * Interactive Image with Hotspots - A comprehensive component for creating interactive images with clickable hotspot markers that display tooltips, content, or navigate to URLs.
 */
const meta: Meta = {
  title: 'Components/Blocks/Hotspot Image',
  component: 'aw-block-hotspot-image',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The **Hotspot Image** component creates interactive images with clickable markers (hotspots) that can display tooltips, additional content, or navigate to external URLs.

## Features
- **Multiple Trigger Types**: Click, hover, or focus activation
- **Flexible Positioning**: Top, bottom, left, right, center tooltip positions  
- **Various Marker Styles**: Dot, pulse, glow, or custom markers with icons
- **Keyboard Navigation**: Full accessibility with arrow keys and Enter/Space
- **Responsive Design**: Mobile-optimized with fixed tooltip positioning
- **Custom Events**: Emits events for hotspot interactions and tooltip toggles
- **Error Handling**: Loading states and error recovery for images
- **Performance**: Lazy loading and efficient rendering
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes

## Usage
\`\`\`html
<aw-block-hotspot-image
  image-url="path/to/image.jpg"
  image-alt="Interactive product showcase"
  title="Product Features"
  description="Explore the key features of our product"
  default-trigger="click"
  default-style="dot">
</aw-block-hotspot-image>
\`\`\`

## Hotspot Data Structure
\`\`\`javascript
const hotspots = [
  {
    id: 'feature-1',
    x: 25, // Percentage from left
    y: 30, // Percentage from top
    title: 'Feature Title',
    content: 'Detailed description',
    url: 'https://example.com',
    position: 'top',
    trigger: 'click',
    style: 'dot'
  }
];
\`\`\`
        `
      }
    }
  },
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL of the main image'
    },
    imageAlt: {
      control: 'text', 
      description: 'Alt text for the image'
    },
    title: {
      control: 'text',
      description: 'Main title displayed above the image'
    },
    description: {
      control: 'text',
      description: 'Description text displayed below the title'
    },
    defaultTrigger: {
      control: 'select',
      options: ['click', 'hover', 'focus'],
      description: 'Default trigger behavior for hotspots'
    },
    defaultStyle: {
      control: 'select', 
      options: ['dot', 'pulse', 'glow', 'custom'],
      description: 'Default visual style for hotspot markers'
    },
    defaultPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'center'],
      description: 'Default tooltip position relative to hotspot'
    },
    showAnimations: {
      control: 'boolean',
      description: 'Enable hotspot animations and transitions'
    },
    keyboardNavigation: {
      control: 'boolean', 
      description: 'Enable keyboard navigation support'
    },
    autoCloseDelay: {
      control: 'number',
      description: 'Auto-close delay for tooltips in milliseconds (0 to disable)'
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive scaling and mobile optimizations'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all hotspot interactions'
    }
  },
  args: {
    imageUrl: '',
    imageAlt: '',
    title: '',
    description: '', 
    defaultTrigger: 'click',
    defaultStyle: 'dot',
    defaultPosition: 'top',
    showAnimations: true,
    keyboardNavigation: true,
    autoCloseDelay: 0,
    responsive: true,
    disabled: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default hotspot image with interactive markers demonstrating basic functionality
 */
export const Default: Story = {
  render: (args) => {
    const cleanArgs = {
      imageUrl: String(args.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'),
      imageAlt: String(args.imageAlt || 'Modern office workspace'),
      title: String(args.title || 'Interactive Workspace Tour'),
      description: String(args.description || 'Click on the hotspots to explore different areas of our modern office space'),
      defaultTrigger: String(args.defaultTrigger || 'click'),
      defaultStyle: String(args.defaultStyle || 'dot'),
      defaultPosition: String(args.defaultPosition || 'top'),
      showAnimations: Boolean(args.showAnimations),
      keyboardNavigation: Boolean(args.keyboardNavigation),
      autoCloseDelay: Number(args.autoCloseDelay || 0),
      responsive: Boolean(args.responsive),
      disabled: Boolean(args.disabled)
    };

    const sampleHotspots = [
      {
        id: 'desk-area',
        x: 35,
        y: 60,
        title: 'Ergonomic Workspace',
        content: 'Height-adjustable desks with dual monitor setups and ergonomic chairs for maximum productivity.',
        position: 'top',
        style: 'dot'
      },
      {
        id: 'meeting-room',
        x: 75,
        y: 40, 
        title: 'Collaboration Zone',
        content: 'Modern meeting rooms equipped with video conferencing and interactive whiteboards.',
        url: 'https://example.com/meeting-rooms',
        position: 'left',
        style: 'pulse'
      },
      {
        id: 'break-area',
        x: 15,
        y: 25,
        title: 'Relaxation Space',
        content: 'Comfortable break area with premium coffee station and natural lighting.',
        position: 'right',
        style: 'glow'
      }
    ];

    return html`
      <aw-block-hotspot-image
        image-url=${cleanArgs.imageUrl}
        image-alt=${cleanArgs.imageAlt}
        title=${cleanArgs.title}
        description=${cleanArgs.description}
        default-trigger=${cleanArgs.defaultTrigger}
        default-style=${cleanArgs.defaultStyle}
        default-position=${cleanArgs.defaultPosition}
        ?show-animations=${cleanArgs.showAnimations}
        ?keyboard-navigation=${cleanArgs.keyboardNavigation}
        auto-close-delay=${cleanArgs.autoCloseDelay}
        ?responsive=${cleanArgs.responsive}
        ?disabled=${cleanArgs.disabled}
        .hotspots=${sampleHotspots}
        @aw-hotspot-click=${(e: CustomEvent) => {
          console.log('Hotspot clicked:', e.detail);
        }}
        @aw-tooltip-toggle=${(e: CustomEvent) => {
          console.log('Tooltip toggled:', e.detail);
        }}>
      </aw-block-hotspot-image>
    `;
  }
};

/**
 * Product showcase with different hotspot styles and hover triggers
 */
export const ProductShowcase: Story = {
  render: () => {
    const productHotspots = [
      {
        id: 'camera',
        x: 25,
        y: 35,
        title: 'Triple Camera System',
        content: '48MP main camera with ultra-wide and telephoto lenses for professional photography.',
        position: 'right',
        trigger: 'hover',
        style: 'pulse',
        icon: '📸'
      },
      {
        id: 'display',
        x: 50,
        y: 20,
        title: 'ProMotion Display',
        content: '6.7" Super Retina XDR display with 120Hz refresh rate and HDR10 support.',
        position: 'bottom',
        trigger: 'hover',
        style: 'glow'
      },
      {
        id: 'charging',
        x: 75,
        y: 70,
        title: 'MagSafe Charging',
        content: 'Wireless charging up to 15W with magnetic alignment for perfect placement.',
        url: 'https://example.com/charging',
        position: 'left',
        trigger: 'hover',
        style: 'dot'
      },
      {
        id: 'chip',
        x: 50,
        y: 55,
        title: 'A17 Pro Chip',
        content: 'Most advanced smartphone chip with 6-core GPU and dedicated Neural Engine.',
        position: 'top',
        trigger: 'hover',
        style: 'pulse'
      }
    ];

    return html`
      <aw-block-hotspot-image
        image-url="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=800&fit=crop"
        image-alt="Premium smartphone product showcase"
        title="iPhone Pro Features"
        description="Hover over the hotspots to discover the advanced features of our latest smartphone"
        default-trigger="hover"
        default-style="pulse"
        default-position="top"
        auto-close-delay="3000"
        .hotspots=${productHotspots}>
      </aw-block-hotspot-image>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Product showcase with hover triggers and auto-closing tooltips after 3 seconds. Features different hotspot styles including icons.'
      }
    }
  }
};

/**
 * Architecture diagram with focus-triggered educational hotspots
 */
export const EducationalDiagram: Story = {
  render: () => {
    const architectureHotspots = [
      {
        id: 'frontend',
        x: 20,
        y: 30,
        title: 'Frontend Layer',
        content: 'React-based user interface with responsive design and modern UX patterns.',
        position: 'right',
        trigger: 'focus',
        style: 'dot'
      },
      {
        id: 'api-gateway',
        x: 50,
        y: 25,
        title: 'API Gateway',
        content: 'Centralized entry point handling authentication, rate limiting, and request routing.',
        position: 'bottom',
        trigger: 'focus',
        style: 'glow'
      },
      {
        id: 'microservices',
        x: 50,
        y: 55,
        title: 'Microservices',
        content: 'Distributed architecture with independent services for scalability and maintainability.',
        position: 'top',
        trigger: 'focus', 
        style: 'pulse'
      },
      {
        id: 'database',
        x: 80,
        y: 70,
        title: 'Database Layer',
        content: 'PostgreSQL with Redis caching for high-performance data access.',
        url: 'https://example.com/database-architecture',
        position: 'left',
        trigger: 'focus',
        style: 'dot'
      }
    ];

    return html`
      <aw-block-hotspot-image
        image-url="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop"
        image-alt="System architecture diagram"
        title="Application Architecture"
        description="Tab through the components to learn about our system architecture (focus-triggered hotspots)"
        default-trigger="focus"
        default-style="glow"
        keyboard-navigation="true"
        .hotspots=${architectureHotspots}>
      </aw-block-hotspot-image>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Educational diagram with focus-triggered hotspots, perfect for accessibility and keyboard navigation. Users can tab through hotspots to learn about system components.'
      }
    }
  }
};

/**
 * Real estate floor plan with custom styled hotspots
 */
export const FloorPlan: Story = {
  render: () => {
    const floorPlanHotspots = [
      {
        id: 'living-room',
        x: 40,
        y: 45,
        title: 'Living Room',
        content: 'Spacious open-plan living area with floor-to-ceiling windows and modern fireplace.',
        position: 'top',
        style: 'custom',
        customClass: 'room-hotspot',
        icon: '🛋️'
      },
      {
        id: 'kitchen',
        x: 20,
        y: 60,
        title: 'Gourmet Kitchen',
        content: 'Chef-inspired kitchen with granite countertops, stainless steel appliances, and large island.',
        position: 'right',
        style: 'custom',
        customClass: 'room-hotspot', 
        icon: '🍳'
      },
      {
        id: 'master-bedroom',
        x: 75,
        y: 25,
        title: 'Master Suite',
        content: 'Luxurious master bedroom with walk-in closet and en-suite bathroom.',
        position: 'bottom',
        style: 'custom',
        customClass: 'room-hotspot',
        icon: '🛏️'
      },
      {
        id: 'home-office',
        x: 25,
        y: 25,
        title: 'Home Office',
        content: 'Dedicated workspace with built-in shelving and garden views.',
        url: 'https://example.com/virtual-tour',
        position: 'bottom',
        style: 'custom',
        customClass: 'room-hotspot',
        icon: '💻'
      }
    ];

    return html`
      <style>
        .room-hotspot .hotspot-image__marker-icon {
          width: 32px;
          height: 32px;
          font-size: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .room-hotspot:hover .hotspot-image__marker-icon {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }
      </style>
      
      <aw-block-hotspot-image
        image-url="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
        image-alt="Luxury home floor plan"
        title="Luxury Home Floor Plan"
        description="Click on the room icons to explore different areas of this beautiful home"
        default-trigger="click"
        default-style="custom"
        show-animations="true"
        .hotspots=${floorPlanHotspots}>
      </aw-block-hotspot-image>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Real estate floor plan with custom-styled hotspot markers using icons and gradient backgrounds. Demonstrates custom CSS classes and icon integration.'
      }
    }
  }
};

/**
 * Medical diagram with center-positioned tooltips for detailed explanations
 */
export const MedicalDiagram: Story = {
  render: () => {
    const anatomyHotspots = [
      {
        id: 'heart',
        x: 35,
        y: 40,
        title: 'Cardiovascular System',
        content: 'The heart pumps blood throughout the body via a complex network of arteries and veins.',
        position: 'center',
        style: 'pulse',
        trigger: 'click'
      },
      {
        id: 'lungs',
        x: 50,
        y: 35,
        title: 'Respiratory System', 
        content: 'The lungs facilitate gas exchange, taking in oxygen and expelling carbon dioxide.',
        position: 'center',
        style: 'glow',
        trigger: 'click'
      },
      {
        id: 'brain',
        x: 45,
        y: 15,
        title: 'Nervous System',
        content: 'The brain controls all bodily functions and processes sensory information.',
        url: 'https://example.com/neuroscience',
        position: 'center',
        style: 'pulse',
        trigger: 'click'
      },
      {
        id: 'liver',
        x: 55,
        y: 50,
        title: 'Digestive System',
        content: 'The liver processes nutrients and filters toxins from the bloodstream.',
        position: 'center',
        style: 'dot',
        trigger: 'click'
      }
    ];

    return html`
      <aw-block-hotspot-image
        image-url="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop"
        image-alt="Human anatomy diagram"
        title="Human Body Systems"
        description="Explore the major body systems by clicking on the highlighted areas"
        default-trigger="click"
        default-position="center"
        auto-close-delay="5000"
        .hotspots=${anatomyHotspots}>
      </aw-block-hotspot-image>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Medical/educational diagram with center-positioned tooltips that auto-close after 5 seconds. Perfect for detailed explanations that need prominent display.'
      }
    }
  }
};

/**
 * Accessibility demonstration with comprehensive ARIA support and keyboard navigation
 */
export const Accessibility: Story = {
  render: () => {
    const accessibilityHotspots = [
      {
        id: 'keyboard-nav',
        x: 25,
        y: 30,
        title: 'Keyboard Navigation',
        content: 'Use Tab to focus hotspots, Enter/Space to activate, and Escape to close tooltips.',
        position: 'right',
        style: 'dot',
        trigger: 'focus'
      },
      {
        id: 'screen-reader',
        x: 75,
        y: 40,
        title: 'Screen Reader Support', 
        content: 'All hotspots include proper ARIA labels and role attributes for assistive technology.',
        position: 'left',
        style: 'glow',
        trigger: 'focus'
      },
      {
        id: 'high-contrast',
        x: 50,
        y: 60,
        title: 'High Contrast Mode',
        content: 'Hotspot markers maintain visibility in Windows High Contrast mode.',
        position: 'top',
        style: 'pulse',
        trigger: 'focus'
      }
    ];

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3>Accessibility Features Demo</h3>
          <p>This story demonstrates full accessibility compliance:</p>
          <ul>
            <li><strong>Keyboard Navigation:</strong> Tab through hotspots, use Enter/Space to activate</li>
            <li><strong>Screen Reader Support:</strong> Complete ARIA implementation</li>
            <li><strong>Focus Management:</strong> Visible focus indicators and logical tab order</li>
            <li><strong>High Contrast:</strong> Maintains visibility in high contrast modes</li>
          </ul>
          <p><em>Try navigating with keyboard only or test with a screen reader!</em></p>
        </div>
        
        <aw-block-hotspot-image
          image-url="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
          image-alt="Accessibility features demonstration with keyboard navigation"
          title="Accessibility Compliance"
          description="Use keyboard navigation to explore accessibility features (Tab, Enter, Escape)"
          default-trigger="focus"
          keyboard-navigation="true"
          .hotspots=${accessibilityHotspots}>
        </aw-block-hotspot-image>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, Space, and Escape keys
- **ARIA Attributes**: Proper labeling with \`aria-label\`, \`aria-describedby\`, and \`role\` attributes  
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Compatible with NVDA, JAWS, VoiceOver, and other assistive technologies
- **High Contrast Mode**: Maintains visibility and usability in Windows High Contrast mode

All interactive elements meet WCAG 2.1 AA guidelines for accessibility compliance.
        `
      }
    }
  }
};