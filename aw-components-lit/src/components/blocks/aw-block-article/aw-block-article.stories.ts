import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-block-article';
import type { AwBlockArticle } from './aw-block-article';

const meta: Meta<AwBlockArticle> = {
  title: 'Blocks/aw-block-article',
  component: 'aw-block-article',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A single article block component for displaying article content with optional images and rich text.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Article title',
    },
    content: {
      control: 'text',
      description: 'Plain text content',
    },
    rich_content: {
      control: 'text',
      description: 'Rich text content (HTML)',
    },
    images: {
      control: 'object',
      description: 'Array of image objects',
    },
    text_align: {
      control: { type: 'select' },
      options: ['center', 'left', 'split'],
      description: 'Text alignment',
    },
    text_indent: {
      control: 'boolean',
      description: 'Whether to indent the first paragraph',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Article size variant',
    },
    custom_class: {
      control: 'text',
      description: 'Custom CSS class for styling',
    },
    article_id: {
      control: 'text',
      description: 'Article ID for anchor links',
    },
  },
  args: {
    title: 'Introduction to Modern Web Development',
    content: 'Modern web development has evolved significantly over the past decade. With the introduction of new frameworks, tools, and methodologies, developers now have more powerful ways to create engaging and performant web applications.',
    rich_content: '',
    images: [],
    text_align: 'center',
    text_indent: false,
    size: 'md',
    custom_class: '',
    article_id: '',
  },
};

export default meta;
type Story = StoryObj<AwBlockArticle>;

export const Default: Story = {};

export const WithTextIndent: Story = {
  args: {
    text_indent: true,
    content: 'This paragraph demonstrates the text indent feature. The first line of this paragraph is indented, which is a common typographic style used in traditional publishing and can add visual interest to your content.',
  },
};

export const LeftAligned: Story = {
  args: {
    text_align: 'left',
    title: 'Left-Aligned Article',
    content: 'This article is left-aligned, which can be useful for certain design layouts where you want the content to flow naturally from the left edge.',
  },
};

export const SplitLayout: Story = {
  args: {
    text_align: 'split',
    title: 'Split Layout Article',
    content: 'This demonstrates the split layout option, which displays content in a two-column format. This can be effective for comparing information or creating a magazine-style layout.',
  },
};

export const WithRichContent: Story = {
  args: {
    title: 'Article with Rich Content',
    content: '',
    rich_content: `
      <h3>Rich Text Formatting</h3>
      <p>This article demonstrates <strong>rich text content</strong> with various formatting options:</p>
      <ul>
        <li><em>Italic text</em> for emphasis</li>
        <li><strong>Bold text</strong> for importance</li>
        <li><code>Inline code</code> snippets</li>
        <li><a href="#">Links</a> to other resources</li>
      </ul>
      <blockquote>
        "This is a blockquote that highlights important information or quotes from other sources."
      </blockquote>
      <p>You can also include more complex HTML structures and maintain proper semantic markup for accessibility.</p>
    `,
  },
};

export const WithImages: Story = {
  args: {
    title: 'Article with Images',
    content: 'This article includes a gallery of images that demonstrate the image handling capabilities of the component.',
    images: [
      {
        title: 'Sample Image 1',
        url: 'https://picsum.photos/800/400?random=1',
        alt: 'A beautiful landscape',
        width: 800,
        height: 400,
      },
      {
        title: 'Sample Image 2',
        url: 'https://picsum.photos/800/400?random=2',
        alt: 'An urban cityscape',
        width: 800,
        height: 400,
      },
    ],
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    title: 'Large Article',
    content: 'This article uses the large size variant, which increases the overall text size for better readability or when you want to emphasize the content.',
    text_indent: true,
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    title: 'Small Article',
    content: 'This article uses the small size variant, which reduces the text size for secondary content or when space is limited.',
  },
};

export const FullExample: Story = {
  args: {
    title: 'Complete Article Example',
    content: '',
    rich_content: `
      <p>This comprehensive example showcases all the features of the article block component in a real-world context.</p>
      <h3>Key Features</h3>
      <p>The article block component provides:</p>
      <ul>
        <li>Flexible text alignment options</li>
        <li>Rich text content support</li>
        <li>Image gallery integration</li>
        <li>Multiple size variants</li>
        <li>Responsive design</li>
      </ul>
      <h3>Best Practices</h3>
      <p>When using this component, consider:</p>
      <ol>
        <li>Keep content scannable with proper headings</li>
        <li>Use images to support your narrative</li>
        <li>Choose appropriate text alignment for your layout</li>
        <li>Ensure accessibility with proper alt text</li>
      </ol>
      <blockquote>
        "Good design is obvious. Great design is transparent." - Joe Sparano
      </blockquote>
    `,
    images: [
      {
        title: 'Design Process',
        url: 'https://picsum.photos/800/500?random=3',
        alt: 'Design process illustration',
        width: 800,
        height: 500,
      },
    ],
    text_indent: true,
    size: 'lg',
  },
};

export const WithCustomSlots: Story = {
  args: {
    title: '',
    content: '',
    rich_content: '',
  },
  render: (args) => html`
    <aw-block-article
      .text_align=${args.text_align}
      .text_indent=${args.text_indent}
      .size=${args.size}
      .custom_class=${args.custom_class}
      .article_id=${args.article_id}
    >
      <div slot="title">
        <span style="color: var(--aw-color-primary, #007bff);">Custom Title</span>
        <small style="color: var(--aw-color-text-light, #666); margin-left: 0.5rem;">with subtitle</small>
      </div>
      <div slot="content">
        <p>This content is provided via slots, allowing for complete customization of the article content.</p>
        <p>You can include any HTML structure here, including other components or complex layouts.</p>
      </div>
      <div slot="images">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 2rem;">
          <img src="https://picsum.photos/300/200?random=4" alt="Custom image 1" style="border-radius: 8px;" />
          <img src="https://picsum.photos/300/200?random=5" alt="Custom image 2" style="border-radius: 8px;" />
          <img src="https://picsum.photos/300/200?random=6" alt="Custom image 3" style="border-radius: 8px;" />
        </div>
      </div>
    </aw-block-article>
  `,
};

export const MinimalContent: Story = {
  args: {
    title: 'Minimal Article',
    content: '',
    rich_content: '',
    images: [],
  },
};

export const OnlyRichContent: Story = {
  args: {
    title: '',
    content: '',
    rich_content: `
      <h2>Standalone Rich Content</h2>
      <p>Sometimes you only need rich content without a separate title or plain text content.</p>
      <p>This example shows how the component handles rich content as the primary content source.</p>
    `,
  },
};