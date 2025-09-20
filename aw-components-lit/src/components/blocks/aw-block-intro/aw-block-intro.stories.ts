import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-block-intro';
import type { AwBlockIntro } from './aw-block-intro';

const meta: Meta<AwBlockIntro> = {
  title: 'Blocks/aw-block-intro',
  component: 'aw-block-intro',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An introduction block component for displaying project overviews, details, and metadata.',
      },
    },
  },
  argTypes: {
    overview: {
      control: 'text',
      description: 'Overview text content',
    },
    duration: {
      control: 'text',
      description: 'Project duration information',
    },
    client: {
      control: 'text',
      description: 'Client name',
    },
    role: {
      control: 'text',
      description: 'Role description',
    },
    primary_page_header: {
      control: 'boolean',
      description: 'Whether this is a primary page header (full height)',
    },
    height: {
      control: { type: 'select' },
      options: ['full', 'third', 'auto'],
      description: 'Height variant',
    },
    layout: {
      control: { type: 'select' },
      options: ['default', 'compact', 'minimal'],
      description: 'Layout variant',
    },
    custom_class: {
      control: 'text',
      description: 'Custom CSS class for styling',
    },
  },
  args: {
    overview: 'This project showcases modern web development practices using cutting-edge technologies and design patterns. We focused on creating a seamless user experience while maintaining high performance standards.',
    duration: '6 months',
    client: 'Acme Corporation',
    role: 'Lead Frontend Developer',
    primary_page_header: false,
    height: 'auto',
    layout: 'default',
    custom_class: '',
  },
};

export default meta;
type Story = StoryObj<AwBlockIntro>;

export const Default: Story = {};

export const PrimaryPageHeader: Story = {
  args: {
    primary_page_header: true,
    overview: 'Welcome to our flagship project - a comprehensive digital transformation initiative that revolutionizes how users interact with our platform.',
    duration: '12 months',
    client: 'Fortune 500 Company',
    role: 'Technical Lead & Architect',
  },
};

export const CompactLayout: Story = {
  args: {
    layout: 'compact',
    overview: 'A streamlined approach to modern web development with focus on performance and accessibility.',
    duration: '3 months',
    client: 'Startup Inc.',
    role: 'Full Stack Developer',
  },
};

export const MinimalLayout: Story = {
  args: {
    layout: 'minimal',
    overview: 'Clean, minimal design implementation.',
    duration: '1 month',
    client: 'Design Agency',
    role: 'Frontend Developer',
  },
};

export const ThirdHeight: Story = {
  args: {
    height: 'third',
    overview: 'A medium-sized introduction section for sub-pages and secondary content areas.',
    duration: '4 months',
    client: 'Tech Company',
    role: 'Senior Developer',
  },
};

export const WithCustomSlots: Story = {
  args: {
    overview: '', // Will be overridden by slot
    duration: '', // Will be overridden by slot
    client: '',
    role: '',
  },
  render: (args) => html`
    <aw-block-intro
      .primary_page_header=${args.primary_page_header}
      .height=${args.height}
      .layout=${args.layout}
      .custom_class=${args.custom_class}
    >
      <div slot="overview">
        <strong>Custom Overview Content:</strong> This is a custom overview using slot content. 
        You can include <em>HTML markup</em>, links, and other rich content here.
      </div>
      <div slot="details">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <span style="color: var(--aw-color-text-light, #666); font-style: italic; margin-right: 0.5rem;">Project Type</span>
            <span>Web Application</span>
          </div>
          <div>
            <span style="color: var(--aw-color-text-light, #666); font-style: italic; margin-right: 0.5rem;">Technologies</span>
            <span>React, TypeScript, Node.js</span>
          </div>
          <div>
            <span style="color: var(--aw-color-text-light, #666); font-style: italic; margin-right: 0.5rem;">Team Size</span>
            <span>5 developers</span>
          </div>
        </div>
      </div>
    </aw-block-intro>
  `,
};

export const NoOverview: Story = {
  args: {
    overview: '',
    duration: '2 months',
    client: 'Local Business',
    role: 'Consultant',
  },
};

export const MinimalData: Story = {
  args: {
    overview: 'Simple project overview.',
    duration: '',
    client: '',
    role: 'Developer',
  },
};

export const WithCustomClass: Story = {
  args: {
    custom_class: 'custom-intro-styling',
    overview: 'This intro block has custom styling applied via the custom_class property.',
    duration: '5 months',
    client: 'Custom Client',
    role: 'Custom Role',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom CSS class for additional styling.',
      },
    },
  },
};