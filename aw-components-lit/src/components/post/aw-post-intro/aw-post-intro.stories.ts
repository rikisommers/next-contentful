import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-post-intro';
import type { AwPostIntro } from './aw-post-intro';

const meta: Meta<AwPostIntro> = {
  title: 'Components/Post/Post Intro',
  component: 'aw-post-intro',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A post introduction component with flexible grid positioning and text animations. Features responsive design, theme integration, and accessibility support.'
      }
    }
  },
  argTypes: {
    title: {
      description: 'Post title',
      control: 'text'
    },
    content: {
      description: 'Post content/description',
      control: 'text'
    },
    tag: {
      description: 'Tag text',
      control: 'text'
    },
    textAlign: {
      description: 'Text alignment',
      control: { type: 'select' },
      options: ['left', 'center', 'right']
    },
    textPosition: {
      description: 'Grid position',
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'span-2', 'span-3', 'span-4']
    },
    primaryAnimation: {
      description: 'Primary animation type (for title)',
      control: { type: 'select' },
      options: ['none', 'fadeIn', 'slideUp', 'typewriter']
    },
    secondaryAnimation: {
      description: 'Secondary animation type (for content)',
      control: { type: 'select' },
      options: ['none', 'fadeIn', 'slideUp', 'typewriter']
    },
    animationDelay: {
      description: 'Animation delay multiplier',
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 }
    },
    maxWidth: {
      description: 'Maximum width for content',
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<AwPostIntro>;

export const Default: Story = {
  args: {
    title: 'Understanding Modern Web Development',
    content: 'A comprehensive guide to building scalable and maintainable web applications using modern frameworks and best practices.',
    tag: 'Featured',
    textAlign: 'left',
    textPosition: 'span-2',
    primaryAnimation: 'fadeIn',
    secondaryAnimation: 'slideUp',
    animationDelay: 1,
    maxWidth: '65ch'
  },
  render: (args) => html`
    <div style="background: #f8f9fa; padding: 2rem; min-height: 400px;">
      <aw-post-intro
        title=${args.title}
        content=${args.content}
        tag=${args.tag}
        text-align=${args.textAlign}
        text-position=${args.textPosition}
        primary-animation=${args.primaryAnimation}
        secondary-animation=${args.secondaryAnimation}
        animation-delay=${args.animationDelay}
        max-width=${args.maxWidth}
      ></aw-post-intro>
    </div>
  `
};

export const Centered: Story = {
  args: {
    ...Default.args,
    textAlign: 'center',
    textPosition: 'span-4'
  },
  render: Default.render
};

export const TypewriterEffect: Story = {
  args: {
    ...Default.args,
    primaryAnimation: 'typewriter',
    title: 'Building the Future of Web'
  },
  render: Default.render
};

export const NoAnimation: Story = {
  args: {
    ...Default.args,
    primaryAnimation: 'none',
    secondaryAnimation: 'none'
  },
  render: Default.render
};

export const WithoutTag: Story = {
  args: {
    ...Default.args,
    tag: ''
  },
  render: Default.render
};

export const RightAligned: Story = {
  args: {
    ...Default.args,
    textAlign: 'right',
    textPosition: 'end'
  },
  render: Default.render
};

export const CustomSlots: Story = {
  args: {
    title: '',
    content: '',
    tag: ''
  },
  render: () => html`
    <div style="background: #f8f9fa; padding: 2rem; min-height: 400px;">
      <aw-post-intro text-align="center" text-position="span-4">
        <span slot="tag" style="background: linear-gradient(45deg, #667eea, #764ba2); padding: 0.5rem 1rem; border-radius: 25px; color: white; font-weight: 600;">Custom Tag</span>
        <h1 slot="title" style="background: linear-gradient(45deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 3rem;">Custom Title with Gradient</h1>
        <p slot="content" style="font-style: italic; color: #666;">This is custom content using slots for maximum flexibility.</p>
      </aw-post-intro>
    </div>
  `
};