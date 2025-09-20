import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-block-articles';
import type { AwBlockArticles, Article } from './aw-block-articles';

const sampleArticles: Article[] = [
  {
    title: 'Getting Started with Web Components',
    slug: 'getting-started-web-components',
    excerpt: 'Learn the fundamentals of building reusable web components with modern browser APIs.',
    coverImage: {
      url: 'https://picsum.photos/400/250?random=1',
      title: 'Web Components',
      alt: 'Abstract representation of web components'
    },
    tags: ['Web Components', 'JavaScript', 'Frontend'],
    date: '2024-01-15',
    author: 'Jane Developer',
    readTime: '5 min read'
  },
  {
    title: 'Advanced CSS Grid Techniques',
    slug: 'advanced-css-grid-techniques',
    excerpt: 'Explore advanced layout techniques using CSS Grid for complex responsive designs.',
    coverImage: {
      url: 'https://picsum.photos/400/250?random=2',
      title: 'CSS Grid',
      alt: 'CSS Grid layout example'
    },
    tags: ['CSS', 'Grid', 'Layout', 'Frontend'],
    date: '2024-01-12',
    author: 'John Designer',
    readTime: '8 min read'
  },
  {
    title: 'TypeScript Best Practices',
    slug: 'typescript-best-practices',
    excerpt: 'Discover best practices for writing maintainable and type-safe TypeScript code.',
    coverImage: {
      url: 'https://picsum.photos/400/250?random=3',
      title: 'TypeScript',
      alt: 'TypeScript code editor'
    },
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    date: '2024-01-10',
    author: 'Sarah Coder',
    readTime: '12 min read'
  },
  {
    title: 'Building Accessible User Interfaces',
    slug: 'building-accessible-user-interfaces',
    excerpt: 'Learn how to create inclusive web experiences that work for everyone.',
    coverImage: {
      url: 'https://picsum.photos/400/250?random=4',
      title: 'Accessibility',
      alt: 'Accessibility icons and symbols'
    },
    tags: ['Accessibility', 'UX', 'Frontend'],
    date: '2024-01-08',
    author: 'Alex UX',
    readTime: '10 min read'
  },
  {
    title: 'Performance Optimization Strategies',
    slug: 'performance-optimization-strategies',
    excerpt: 'Optimize your web applications for speed and efficiency with these proven techniques.',
    coverImage: {
      url: 'https://picsum.photos/400/250?random=5',
      title: 'Performance',
      alt: 'Performance optimization charts'
    },
    tags: ['Performance', 'Optimization', 'Frontend'],
    date: '2024-01-05',
    author: 'Mike Performance',
    readTime: '15 min read'
  },
  {
    title: 'Modern JavaScript Patterns',
    slug: 'modern-javascript-patterns',
    excerpt: 'Explore modern JavaScript patterns and idioms for cleaner, more maintainable code.',
    tags: ['JavaScript', 'Patterns', 'Best Practices'],
    date: '2024-01-03',
    author: 'Emma JS',
    readTime: '7 min read'
  }
];

const sampleTags = ['JavaScript', 'CSS', 'TypeScript', 'Frontend', 'Accessibility', 'Performance', 'Web Components', 'Best Practices'];

const meta: Meta<AwBlockArticles> = {
  title: 'Blocks/aw-block-articles',
  component: 'aw-block-articles',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A multiple articles block component for displaying article collections with filtering and layout variants.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Block title',
    },
    description: {
      control: 'text',
      description: 'Block description',
    },
    articles_collection: {
      control: 'object',
      description: 'Articles collection data',
    },
    tags: {
      control: 'object',
      description: 'Available tags for filtering',
    },
    layout_type: {
      control: { type: 'select' },
      options: [
        'grid-primary',
        'grid-secondary', 
        'grid-bento',
        'grid-things',
        'text-hover-list',
        'text-image-list',
        'text-list',
        'articles-list-stack'
      ],
      description: 'Layout type for articles display',
    },
    enable_filtering: {
      control: 'boolean',
      description: 'Enable tag filtering',
    },
    custom_class: {
      control: 'text',
      description: 'Custom CSS class for styling',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
  args: {
    title: 'Recent Articles',
    description: 'Explore our latest content and insights',
    articles_collection: { items: sampleArticles },
    tags: sampleTags,
    layout_type: 'grid-primary',
    enable_filtering: true,
    custom_class: '',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<AwBlockArticles>;

export const Default: Story = {};

export const GridSecondary: Story = {
  args: {
    layout_type: 'grid-secondary',
    title: 'Featured Articles',
    description: 'Hand-picked articles from our editorial team',
  },
};

export const GridBento: Story = {
  args: {
    layout_type: 'grid-bento',
    title: 'Article Showcase',
    description: 'A creative grid layout for highlighting diverse content',
  },
};

export const TextList: Story = {
  args: {
    layout_type: 'text-list',
    title: 'Article Index',
    description: 'A clean list view for browsing articles',
  },
};

export const TextHoverList: Story = {
  args: {
    layout_type: 'text-hover-list',
    title: 'Interactive Articles',
    description: 'Articles with enhanced hover interactions',
  },
};

export const TextImageList: Story = {
  args: {
    layout_type: 'text-image-list',
    title: 'Articles with Thumbnails',
    description: 'Compact list view with article thumbnails',
  },
};

export const ArticlesStack: Story = {
  args: {
    layout_type: 'articles-list-stack',
    title: 'Article Stack',
    description: 'A stacked layout for featured content',
  },
};

export const WithoutFiltering: Story = {
  args: {
    enable_filtering: false,
    title: 'All Articles',
    description: 'Browse all available articles without filtering',
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    title: 'Loading Articles',
    description: 'Please wait while we fetch the latest content',
  },
};

export const EmptyState: Story = {
  args: {
    articles_collection: { items: [] },
    title: 'No Articles Found',
    description: 'Check back later for new content',
  },
};

export const MinimalData: Story = {
  args: {
    title: 'Simple Articles',
    articles_collection: {
      items: [
        {
          title: 'Simple Article 1',
          slug: 'simple-article-1',
        },
        {
          title: 'Simple Article 2',
          slug: 'simple-article-2',
        },
        {
          title: 'Simple Article 3',
          slug: 'simple-article-3',
        },
      ]
    },
    enable_filtering: false,
  },
};

export const SingleTag: Story = {
  args: {
    title: 'JavaScript Articles',
    description: 'Articles focused on JavaScript development',
    articles_collection: {
      items: sampleArticles.filter(article => 
        article.tags && article.tags.includes('JavaScript')
      )
    },
    tags: ['JavaScript'],
    enable_filtering: true,
  },
};

export const WithCustomSlots: Story = {
  args: {
    title: '',
    description: '',
    articles_collection: { items: sampleArticles.slice(0, 3) },
    enable_filtering: false,
  },
  render: (args) => html`
    <aw-block-articles
      .articles_collection=${args.articles_collection}
      .layout_type=${args.layout_type}
      .enable_filtering=${args.enable_filtering}
      .custom_class=${args.custom_class}
      .loading=${args.loading}
    >
      <div slot="header">
        <h1 style="font-size: 2rem; font-weight: bold; margin: 0 0 1rem 0; color: var(--aw-color-primary, #007bff);">
          Custom Header
        </h1>
        <p style="font-size: 1.125rem; color: var(--aw-color-text-light, #666); margin: 0 0 1rem 0;">
          This is a custom header using slots. You can include any HTML content here.
        </p>
        <div style="padding: 1rem; background: var(--aw-color-surface, #f8f9fa); border-radius: 8px; margin-bottom: 1rem;">
          <strong>Featured:</strong> Special content highlighting or announcements can go here.
        </div>
      </div>
      
      <div slot="tags">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
          <button style="padding: 0.5rem 1rem; background: var(--aw-color-primary, #007bff); color: white; border: none; border-radius: 4px;">
            Custom Filter 1
          </button>
          <button style="padding: 0.5rem 1rem; background: var(--aw-color-surface, #f8f9fa); color: var(--aw-color-text, #333); border: 1px solid var(--aw-color-border, #e5e5e5); border-radius: 4px;">
            Custom Filter 2
          </button>
        </div>
      </div>
    </aw-block-articles>
  `,
};

export const CompactLayout: Story = {
  args: {
    layout_type: 'text-list',
    title: 'Quick Read',
    description: 'Short articles for busy readers',
    articles_collection: {
      items: [
        {
          title: 'Quick Tip: CSS Variables',
          slug: 'css-variables-tip',
          excerpt: 'A quick guide to using CSS custom properties.',
          tags: ['CSS', 'Tips'],
          date: '2024-01-20',
          readTime: '2 min read'
        },
        {
          title: 'JavaScript Array Methods',
          slug: 'js-array-methods',
          excerpt: 'Essential array methods every developer should know.',
          tags: ['JavaScript', 'Arrays'],
          date: '2024-01-19',
          readTime: '3 min read'
        },
        {
          title: 'Git Best Practices',
          slug: 'git-best-practices',
          excerpt: 'Improve your Git workflow with these tips.',
          tags: ['Git', 'Best Practices'],
          date: '2024-01-18',
          readTime: '4 min read'
        },
      ]
    },
    tags: ['CSS', 'JavaScript', 'Git', 'Tips', 'Best Practices'],
    enable_filtering: true,
  },
};

export const MobileOptimized: Story = {
  args: {
    layout_type: 'text-image-list',
    title: 'Mobile-Friendly Articles',
    description: 'Optimized for mobile reading experience',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};