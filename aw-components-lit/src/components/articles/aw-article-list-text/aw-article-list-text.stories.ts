import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-article-list-text';
import type { AwArticleListText } from './aw-article-list-text';

const mockArticles = [
  {
    sys: { id: '1' },
    title: 'The Future of Web Development',
    subtitle: 'Exploring emerging technologies and frameworks',
    excerpt: 'As we move into 2024, web development continues to evolve at a rapid pace. From new JavaScript frameworks to innovative CSS features, developers have more tools than ever to create engaging user experiences.',
    slug: 'future-web-development',
    date: '2024-01-15',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    tags: ['Web Development', 'Future Tech', 'JavaScript']
  },
  {
    sys: { id: '2' },
    title: 'Mastering CSS Grid Layouts',
    subtitle: 'Advanced techniques for modern web layouts',
    excerpt: 'CSS Grid has revolutionized how we approach web layouts. Learn advanced techniques and best practices for creating complex, responsive layouts with ease.',
    slug: 'mastering-css-grid',
    date: '2024-01-12',
    readTime: '12 min read',
    author: 'Mike Chen',
    tags: ['CSS', 'Grid', 'Responsive Design']
  },
  {
    sys: { id: '3' },
    title: 'Building Accessible Web Applications',
    subtitle: 'A comprehensive guide to web accessibility',
    excerpt: 'Web accessibility isn\'t just a nice-to-have—it\'s essential. This guide covers everything you need to know about creating inclusive web experiences.',
    slug: 'web-accessibility-guide',
    date: '2024-01-10',
    readTime: '15 min read',
    author: 'Elena Rodriguez',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design']
  }
];

const meta: Meta<AwArticleListText> = {
  title: 'Components/Articles/Article List Text',
  component: 'aw-article-list-text',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A vertical text-based article list layout. Optimized for content that should be displayed in a single column with text focus.'
      }
    }
  },
  argTypes: {
    data: {
      description: 'Array of article items to display',
      control: 'object'
    },
    spacing: {
      description: 'Spacing between articles',
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    maxWidth: {
      description: 'Maximum width of the list container',
      control: { type: 'select' },
      options: ['narrow', 'medium', 'wide']
    },
    variant: {
      description: 'Visual variant of the list',
      control: { type: 'select' },
      options: ['default', 'minimal', 'cards']
    },
    showExcerpts: {
      description: 'Show article excerpts',
      control: 'boolean'
    },
    showMeta: {
      description: 'Show article metadata',
      control: 'boolean'
    },
    showTags: {
      description: 'Show article tags',
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<AwArticleListText>;

export const Default: Story = {
  args: {
    data: mockArticles,
    spacing: 'medium',
    maxWidth: 'medium',
    variant: 'default',
    showExcerpts: true,
    showMeta: true,
    showTags: true
  }
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    showExcerpts: false
  }
};

export const Cards: Story = {
  args: {
    ...Default.args,
    variant: 'cards'
  }
};

export const Narrow: Story = {
  args: {
    ...Default.args,
    maxWidth: 'narrow',
    spacing: 'small'
  }
};

export const NoExcerpts: Story = {
  args: {
    ...Default.args,
    showExcerpts: false
  }
};

export const LargeSpacing: Story = {
  args: {
    ...Default.args,
    spacing: 'large',
    maxWidth: 'wide'
  }
};