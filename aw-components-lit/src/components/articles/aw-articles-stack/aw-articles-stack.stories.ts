import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-articles-stack';
import type { AwArticlesStack } from './aw-articles-stack';

const mockArticles = [
  {
    sys: { id: '1' },
    title: 'Introduction to Web Components',
    subtitle: 'Learn the fundamentals of creating reusable components',
    slug: 'intro-web-components',
    img: {
      url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop',
      alt: 'Web development workspace',
      width: 800,
      height: 600
    },
    date: '2024-01-15',
    tags: ['Web Components', 'JavaScript']
  },
  {
    sys: { id: '2' },
    title: 'Advanced Lit Framework Patterns',
    subtitle: 'Deep dive into reactive properties and lifecycle management',
    slug: 'advanced-lit-patterns',
    img: {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      alt: 'Code on screen',
      width: 800,
      height: 600
    },
    date: '2024-01-20',
    tags: ['Lit', 'TypeScript', 'Architecture']
  },
  {
    sys: { id: '3' },
    title: 'Building Design Systems',
    subtitle: 'Creating scalable and maintainable component libraries',
    slug: 'building-design-systems',
    img: {
      url: 'https://images.unsplash.com/photo-1558655146-364adaf25c15?w=800&h=600&fit=crop',
      alt: 'Design system components',
      width: 800,
      height: 600
    },
    date: '2024-01-25',
    tags: ['Design System', 'Components', 'UI/UX']
  }
];

const meta: Meta<AwArticlesStack> = {
  title: 'Components/Articles/Articles Stack',
  component: 'aw-articles-stack',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A vertical stack layout with sticky positioning and scroll-based animations. Each article item sticks to the top of the viewport with animated opacity changes.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Array of article items to display',
      control: 'object'
    },
    stickyOffset: {
      description: 'Sticky offset from top of viewport',
      control: 'text'
    },
    animationType: {
      description: 'Animation type for scroll effects',
      control: { type: 'select' },
      options: ['opacity', 'scale', 'fade']
    },
    hoverEffects: {
      description: 'Enable hover effects',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<AwArticlesStack>;

export const Default: Story = {
  args: {
    data: mockArticles,
    stickyOffset: '80px',
    animationType: 'opacity',
    hoverEffects: true
  },
  render: (args) => html`
    <div style="height: 200vh; background: linear-gradient(to bottom, #f8f9fa, #e9ecef);">
      <div style="padding: 2rem;">
        <h1 style="text-align: center; margin-bottom: 2rem;">Scroll to see the stack effect</h1>
        <aw-articles-stack
          .data=${args.data}
          sticky-offset=${args.stickyOffset}
          animation-type=${args.animationType}
          ?hover-effects=${args.hoverEffects}
        ></aw-articles-stack>
      </div>
    </div>
  `
};

export const ScaleAnimation: Story = {
  args: {
    ...Default.args,
    animationType: 'scale'
  },
  render: Default.render
};

export const NoHover: Story = {
  args: {
    ...Default.args,
    hoverEffects: false
  },
  render: Default.render
};

export const CustomOffset: Story = {
  args: {
    ...Default.args,
    stickyOffset: '120px'
  },
  render: Default.render
};