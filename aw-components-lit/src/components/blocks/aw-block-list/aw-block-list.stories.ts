import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aw-block-list';
import type { AwBlockList, ListItem } from './aw-block-list';

const meta: Meta<AwBlockList> = {
  title: 'Components/Blocks/BlockList',
  component: 'aw-block-list',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible list block component for displaying various types of structured content.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'List title'
    },
    list_type: {
      control: 'select',
      options: ['content', 'feature', 'timeline', 'results', 'checklist', 'numbered', 'grid'],
      description: 'List type/variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'List size'
    },
    layout: {
      control: 'select',
      options: ['default', 'compact', 'spacious'],
      description: 'Layout variant'
    },
    enable_interactions: {
      control: 'boolean',
      description: 'Enable item interactions'
    },
    custom_class: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
};

export default meta;
type Story = StoryObj<AwBlockList>;

const contentItems: ListItem[] = [
  {
    title: 'Project Planning',
    content: 'Define project goals, scope, and requirements. Create detailed project timeline and allocate resources effectively.'
  },
  {
    title: 'Design Phase',
    content: 'Create wireframes, mockups, and prototypes. Gather feedback from stakeholders and iterate on designs.'
  },
  {
    title: 'Development',
    content: 'Implement the designed features using modern web technologies. Follow best practices for code quality and performance.'
  },
  {
    title: 'Testing & QA',
    content: 'Conduct thorough testing including unit tests, integration tests, and user acceptance testing.'
  }
];

const featureItems: ListItem[] = [
  {
    title: 'Fast Performance',
    content: 'Lightning-fast loading times with optimized code and efficient asset delivery.',
    icon: '⚡'
  },
  {
    title: 'Responsive Design',
    content: 'Looks great on all devices from mobile phones to desktop computers.',
    icon: '📱'
  },
  {
    title: 'Secure & Reliable',
    content: 'Enterprise-grade security with 99.9% uptime guarantee and regular backups.',
    icon: '🔒'
  },
  {
    title: 'Easy to Use',
    content: 'Intuitive user interface that requires no technical knowledge to operate.',
    icon: '👥'
  }
];

const timelineItems: ListItem[] = [
  {
    number: '2020',
    title: 'Company Founded',
    content: 'Started with a small team and a big vision to transform the industry.'
  },
  {
    number: '2021',
    title: 'First Product Launch',
    content: 'Released our flagship product to market with overwhelming positive response.'
  },
  {
    number: '2022',
    title: 'Series A Funding',
    content: 'Raised $5M in Series A funding to accelerate growth and expand the team.'
  },
  {
    number: '2023',
    title: 'International Expansion',
    content: 'Expanded operations to 15 countries across Europe and Asia.'
  },
  {
    number: '2024',
    title: 'IPO Announcement',
    content: 'Announced plans for initial public offering to fuel next phase of growth.'
  }
];

const resultsItems: ListItem[] = [
  {
    title: 'Revenue Growth',
    content: '300% increase in annual recurring revenue over the past two years.',
    number: '+300%'
  },
  {
    title: 'Customer Satisfaction',
    content: 'Maintained industry-leading customer satisfaction scores.',
    number: '4.9/5'
  },
  {
    title: 'Market Expansion',
    content: 'Successfully entered 12 new markets globally.',
    number: '12'
  },
  {
    title: 'Team Growth',
    content: 'Grew team from 10 to 150 employees across all departments.',
    number: '150'
  }
];

const checklistItems: ListItem[] = [
  {
    title: 'Define project requirements',
    content: 'Gather and document all functional and non-functional requirements.'
  },
  {
    title: 'Create project timeline',
    content: 'Establish milestones, deadlines, and dependencies.'
  },
  {
    title: 'Set up development environment',
    content: 'Configure tools, frameworks, and deployment pipelines.'
  },
  {
    title: 'Design user interface',
    content: 'Create mockups and prototypes for user testing.'
  },
  {
    title: 'Implement core features',
    content: 'Build the main functionality according to specifications.'
  },
  {
    title: 'Conduct thorough testing',
    content: 'Test all features and fix any discovered issues.'
  }
];

const gridItems: ListItem[] = [
  {
    title: 'Analytics',
    content: 'Comprehensive data analysis and reporting tools.',
    icon: '📊',
    image: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      alt: 'Analytics dashboard'
    }
  },
  {
    title: 'Collaboration',
    content: 'Real-time team collaboration features.',
    icon: '🤝',
    image: {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      alt: 'Team collaboration'
    }
  },
  {
    title: 'Automation',
    content: 'Intelligent workflow automation capabilities.',
    icon: '🤖',
    image: {
      url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
      alt: 'Automation workflow'
    }
  },
  {
    title: 'Integration',
    content: 'Seamless integration with popular tools.',
    icon: '🔗',
    image: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
      alt: 'System integration'
    }
  }
];

export const ContentList: Story = {
  args: {
    title: 'Project Phases',
    list_type: 'content',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: contentItems }
  }
};

export const FeatureList: Story = {
  args: {
    title: 'Key Features',
    list_type: 'feature',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: featureItems }
  }
};

export const Timeline: Story = {
  args: {
    title: 'Company Timeline',
    list_type: 'timeline',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: timelineItems }
  }
};

export const Results: Story = {
  args: {
    title: 'Key Results',
    list_type: 'results',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: resultsItems }
  }
};

export const Checklist: Story = {
  args: {
    title: 'Project Checklist',
    list_type: 'checklist',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: checklistItems }
  }
};

export const NumberedList: Story = {
  args: {
    title: 'Step-by-Step Process',
    list_type: 'numbered',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: contentItems }
  }
};

export const GridList: Story = {
  args: {
    title: 'Product Features',
    list_type: 'grid',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: gridItems }
  }
};

export const SmallSize: Story = {
  args: {
    title: 'Small List',
    list_type: 'feature',
    size: 'sm',
    layout: 'compact',
    enable_interactions: true,
    items_collection: { items: featureItems.slice(0, 3) }
  }
};

export const LargeSize: Story = {
  args: {
    title: 'Large List',
    list_type: 'feature',
    size: 'lg',
    layout: 'spacious',
    enable_interactions: true,
    items_collection: { items: featureItems }
  }
};

export const WithLinks: Story = {
  args: {
    title: 'Useful Resources',
    list_type: 'content',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: [
        {
          title: 'Documentation',
          content: 'Complete guide to using our platform effectively.',
          link: {
            url: 'https://docs.example.com',
            title: 'Read Documentation',
            external: true
          }
        },
        {
          title: 'API Reference',
          content: 'Detailed API documentation for developers.',
          link: {
            url: 'https://api.example.com/docs',
            title: 'View API Docs',
            external: true
          }
        },
        {
          title: 'Support Center',
          content: 'Get help from our support team.',
          link: {
            url: '/support',
            title: 'Contact Support',
            external: false
          }
        }
      ]
    }
  }
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <aw-block-list
        title="Small Size"
        list_type="feature"
        size="sm"
        layout="compact"
        enable_interactions="true"
        .items_collection=${{ items: featureItems.slice(0, 2) }}>
      </aw-block-list>
      
      <aw-block-list
        title="Medium Size (Default)"
        list_type="feature"
        size="md"
        layout="default"
        enable_interactions="true"
        .items_collection=${{ items: featureItems.slice(0, 2) }}>
      </aw-block-list>
      
      <aw-block-list
        title="Large Size"
        list_type="feature"
        size="lg"
        layout="spacious"
        enable_interactions="true"
        .items_collection=${{ items: featureItems.slice(0, 2) }}>
      </aw-block-list>
    </div>
  `
};

export const AllLayouts: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <aw-block-list
        title="Default Layout"
        list_type="content"
        layout="default"
        enable_interactions="true"
        .items_collection=${{ items: contentItems.slice(0, 3) }}>
      </aw-block-list>
      
      <aw-block-list
        title="Compact Layout"
        list_type="content"
        layout="compact"
        enable_interactions="true"
        .items_collection=${{ items: contentItems.slice(0, 3) }}>
      </aw-block-list>
      
      <aw-block-list
        title="Spacious Layout"
        list_type="content"
        layout="spacious"
        enable_interactions="true"
        .items_collection=${{ items: contentItems.slice(0, 3) }}>
      </aw-block-list>
    </div>
  `
};

export const Interactive: Story = {
  args: {
    title: 'Interactive List',
    list_type: 'feature',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: { items: featureItems }
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on list items to see interaction events in the Actions panel.'
      }
    }
  }
};