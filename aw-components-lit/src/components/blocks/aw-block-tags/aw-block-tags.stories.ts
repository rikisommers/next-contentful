import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-block-tags';
import type { AwBlockTags, Tag } from './aw-block-tags';

const meta: Meta<AwBlockTags> = {
  title: 'Components/Blocks/BlockTags',
  component: 'aw-block-tags',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible tags block component for displaying and managing collections of tags with filtering capabilities.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled', 'pill', 'minimal'],
      description: 'Default variant for all tags'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Default size for all tags'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Default color for all tags'
    },
    enable_selection: {
      control: 'boolean',
      description: 'Enable tag selection'
    },
    multiselect: {
      control: 'boolean',
      description: 'Allow multiple tag selection'
    },
    animated_indicator: {
      control: 'boolean',
      description: 'Enable animated selection indicator'
    },
    max_visible: {
      control: 'number',
      description: 'Maximum number of tags to display (0 = no limit)'
    },
    more_text: {
      control: 'text',
      description: 'Text to show when tags are truncated'
    },
    custom_class: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<AwBlockTags>;

const basicTags: Tag[] = [
  { label: 'JavaScript', clickable: true },
  { label: 'TypeScript', clickable: true },
  { label: 'React', clickable: true },
  { label: 'Vue', clickable: true },
  { label: 'Angular', clickable: true },
  { label: 'Svelte', clickable: true }
];

const tagsWithCounts: Tag[] = [
  { label: 'Frontend', count: 45, clickable: true },
  { label: 'Backend', count: 32, clickable: true },
  { label: 'DevOps', count: 18, clickable: true },
  { label: 'Mobile', count: 24, clickable: true },
  { label: 'AI/ML', count: 12, clickable: true },
  { label: 'Design', count: 38, clickable: true }
];

const coloredTags: Tag[] = [
  { label: 'Critical', color: 'danger', clickable: true },
  { label: 'Important', color: 'warning', clickable: true },
  { label: 'Completed', color: 'success', clickable: true },
  { label: 'In Progress', color: 'info', clickable: true },
  { label: 'On Hold', color: 'secondary', clickable: true },
  { label: 'New', color: 'primary', clickable: true }
];

const mixedTags: Tag[] = [
  { label: 'HTML', icon: '🏷️', color: 'primary', variant: 'filled', clickable: true },
  { label: 'CSS', icon: '🎨', color: 'info', variant: 'outlined', clickable: true },
  { label: 'JavaScript', icon: '⚡', color: 'warning', variant: 'pill', clickable: true },
  { label: 'Python', icon: '🐍', color: 'success', variant: 'filled', clickable: true },
  { label: 'Archived', color: 'secondary', variant: 'minimal', disabled: true },
  { label: 'Removable', color: 'danger', removable: true, clickable: true }
];

const categoryTags: Tag[] = [
  { id: 'frontend', label: 'Frontend', count: 45, color: 'primary', clickable: true },
  { id: 'backend', label: 'Backend', count: 32, color: 'info', clickable: true },
  { id: 'devops', label: 'DevOps', count: 18, color: 'success', clickable: true },
  { id: 'mobile', label: 'Mobile', count: 24, color: 'warning', clickable: true },
  { id: 'design', label: 'UI/UX Design', count: 38, color: 'secondary', clickable: true },
  { id: 'database', label: 'Database', count: 29, color: 'danger', clickable: true }
];

export const Default: Story = {
  args: {
    tags: basicTags,
    variant: 'default',
    size: 'md',
    color: 'neutral',
    enable_selection: false,
    multiselect: true,
    animated_indicator: true,
    max_visible: 0,
    more_text: '+{count} more'
  }
};

export const WithCounts: Story = {
  args: {
    tags: tagsWithCounts,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true
  }
};

export const ColoredTags: Story = {
  args: {
    tags: coloredTags,
    variant: 'filled',
    size: 'md',
    enable_selection: true,
    multiselect: true
  }
};

export const MixedVariants: Story = {
  args: {
    tags: mixedTags,
    size: 'md',
    enable_selection: true,
    multiselect: true
  }
};

export const SingleSelection: Story = {
  args: {
    tags: categoryTags,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: false,
    selected: ['frontend']
  }
};

export const MultiSelection: Story = {
  args: {
    tags: categoryTags,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true,
    selected: ['frontend', 'backend', 'mobile']
  }
};

export const PillVariant: Story = {
  args: {
    tags: basicTags,
    variant: 'pill',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true
  }
};

export const MinimalVariant: Story = {
  args: {
    tags: basicTags,
    variant: 'minimal',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true
  }
};

export const WithMaxVisible: Story = {
  args: {
    tags: [...basicTags, ...tagsWithCounts, ...coloredTags].map(tag => ({
      ...tag,
      clickable: true
    })),
    variant: 'outlined',
    size: 'md',
    color: 'neutral',
    enable_selection: true,
    multiselect: true,
    max_visible: 6,
    more_text: '+{count} more tags'
  }
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Extra Small (xs)</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="outlined"
          size="xs"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Small (sm)</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="outlined"
          size="sm"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Medium (md) - Default</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="outlined"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Large (lg)</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="outlined"
          size="lg"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Default</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="default"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Outlined</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="outlined"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Filled</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="filled"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Pill</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="pill"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Minimal</h4>
        <aw-block-tags
          .tags=${basicTags.slice(0, 4)}
          variant="minimal"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
    </div>
  `
};

export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Primary</h4>
        <aw-block-tags
          .tags=${[{ label: 'Primary', clickable: true }]}
          variant="filled"
          size="md"
          color="primary">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Secondary</h4>
        <aw-block-tags
          .tags=${[{ label: 'Secondary', clickable: true }]}
          variant="filled"
          size="md"
          color="secondary">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Success</h4>
        <aw-block-tags
          .tags=${[{ label: 'Success', clickable: true }]}
          variant="filled"
          size="md"
          color="success">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Warning</h4>
        <aw-block-tags
          .tags=${[{ label: 'Warning', clickable: true }]}
          variant="filled"
          size="md"
          color="warning">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Danger</h4>
        <aw-block-tags
          .tags=${[{ label: 'Danger', clickable: true }]}
          variant="filled"
          size="md"
          color="danger">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Info</h4>
        <aw-block-tags
          .tags=${[{ label: 'Info', clickable: true }]}
          variant="filled"
          size="md"
          color="info">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Neutral</h4>
        <aw-block-tags
          .tags=${[{ label: 'Neutral', clickable: true }]}
          variant="filled"
          size="md"
          color="neutral">
        </aw-block-tags>
      </div>
    </div>
  `
};

export const Interactive: Story = {
  args: {
    tags: categoryTags,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true,
    animated_indicator: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on tags to see selection behavior and interaction events in the Actions panel.'
      }
    }
  }
};