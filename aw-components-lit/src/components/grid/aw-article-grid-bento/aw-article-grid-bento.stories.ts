import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-article-grid-bento';
import type { AwArticleGridBento } from './aw-article-grid-bento';

const mockArticles = [
  {
    sys: { id: '1' },
    title: 'Creative Portfolio',
    subtitle: 'Showcase of artistic and creative projects',
    slug: 'creative-portfolio',
    color: '#f97316',
    img: {
      url: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop',
      width: 400,
      height: 300
    },
    date: '2024-01-15',
    tags: ['Design', 'Portfolio']
  },
  {
    sys: { id: '2' },
    title: 'Tech Startup Landing',
    subtitle: 'Modern landing page for technology company',
    slug: 'tech-startup-landing',
    color: '#3b82f6',
    img: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      width: 400,
      height: 300
    },
    date: '2024-01-12',
    tags: ['Web', 'Technology']
  },
  {
    sys: { id: '3' },
    title: 'Restaurant Website',
    subtitle: 'Elegant dining experience with online reservations',
    slug: 'restaurant-website',
    color: '#dc2626',
    img: {
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      width: 400,
      height: 300
    },
    date: '2024-01-10',
    tags: ['Food', 'Business']
  },
  {
    sys: { id: '4' },
    title: 'Fitness App Interface',
    subtitle: 'Health tracking and workout planning application',
    slug: 'fitness-app-interface',
    color: '#059669',
    img: {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      width: 400,
      height: 300
    },
    date: '2024-01-08',
    tags: ['Health', 'Mobile']
  },
  {
    sys: { id: '5' },
    title: 'Financial Dashboard',
    subtitle: 'Investment tracking and portfolio management',
    slug: 'financial-dashboard',
    color: '#7c3aed',
    img: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      width: 400,
      height: 300
    },
    date: '2024-01-05',
    tags: ['Finance', 'Analytics']
  },
  {
    sys: { id: '6' },
    title: 'E-commerce Platform',
    subtitle: 'Modern shopping experience with seamless checkout',
    slug: 'ecommerce-platform',
    color: '#ea580c',
    img: {
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      width: 400,
      height: 300
    },
    date: '2024-01-03',
    tags: ['E-commerce', 'Shopping']
  }
];

const meta: Meta<AwArticleGridBento> = {
  title: 'Components/Grid/Article Grid Bento',
  component: 'aw-article-grid-bento',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dynamic bento-style grid layout with intelligent sizing and theming support. Creates visually interesting layouts with varying item sizes in a masonry-like grid.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Array of items to display in the bento grid',
      control: 'object'
    },
    cardLayout: {
      description: 'Card layout style',
      control: { type: 'select' },
      options: ['default', 'formal', 'funky', 'reone', 'monks', 'img']
    },
    pattern: {
      description: 'Bento grid pattern',
      control: { type: 'select' },
      options: ['dynamic', 'alternating', 'featured', 'uniform']
    },
    minColumnWidth: {
      description: 'Minimum column width',
      control: 'text'
    },
    gap: {
      description: 'Grid gap',
      control: 'text'
    },
    hoverEffects: {
      description: 'Show hover effects',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<AwArticleGridBento>;

export const Default: Story = {
  args: {
    data: mockArticles,
    cardLayout: 'default',
    pattern: 'dynamic',
    minColumnWidth: '250px',
    gap: '1rem',
    hoverEffects: true
  },
  render: (args) => html`
    <div style="padding: 2rem; background: #f8f9fa; min-height: 100vh;">
      <h1 style="text-align: center; margin-bottom: 2rem; color: #333;">Bento Grid Layout</h1>
      <aw-article-grid-bento
        .data=${args.data}
        card-layout=${args.cardLayout}
        pattern=${args.pattern}
        min-column-width=${args.minColumnWidth}
        gap=${args.gap}
        ?hover-effects=${args.hoverEffects}
      ></aw-article-grid-bento>
    </div>
  `
};

export const FunkyCards: Story = {
  args: {
    ...Default.args,
    cardLayout: 'funky'
  },
  render: Default.render
};

export const ImageCards: Story = {
  args: {
    ...Default.args,
    cardLayout: 'img'
  },
  render: Default.render
};

export const MonksStyle: Story = {
  args: {
    ...Default.args,
    cardLayout: 'monks'
  },
  render: Default.render
};

export const FormalStyle: Story = {
  args: {
    ...Default.args,
    cardLayout: 'formal'
  },
  render: Default.render
};

export const FeaturedPattern: Story = {
  args: {
    ...Default.args,
    pattern: 'featured',
    cardLayout: 'img'
  },
  render: Default.render
};

export const UniformPattern: Story = {
  args: {
    ...Default.args,
    pattern: 'uniform',
    cardLayout: 'default'
  },
  render: Default.render
};

export const LargeGap: Story = {
  args: {
    ...Default.args,
    gap: '2rem',
    minColumnWidth: '300px'
  },
  render: Default.render
};