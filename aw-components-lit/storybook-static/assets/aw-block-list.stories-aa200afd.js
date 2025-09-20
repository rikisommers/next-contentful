import{i as ut,a as pt,x as s}from"./lit-element-b4b0194a.js";import{n as c,t as dt}from"./property-64877f55.js";var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,o=(t,i,e,l)=>{for(var a=l>1?void 0:l?ft(i,e):i,z=t.length-1,S;z>=0;z--)(S=t[z])&&(a=(l?S(i,e,a):S(a))||a);return l&&a&&gt(i,e,a),a};let n=class extends pt{constructor(){super(...arguments),this.title="",this.items_collection={items:[]},this.list_type="content",this.size="md",this.layout="default",this.enable_interactions=!0,this.custom_class=""}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent("awListReady",{detail:{title:this.title,type:this.list_type,items:this.items_collection.items},bubbles:!0,composed:!0}))}_handleItemClick(t,i,e){if(!this.enable_interactions)return;const l=new CustomEvent("awListItemClick",{detail:{item:t,index:i,listType:this.list_type,originalEvent:e},bubbles:!0,composed:!0});this.dispatchEvent(l)}_handleItemKeyPress(t,i,e){this.enable_interactions&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._handleItemClick(t,i,e))}_renderListItem(t,i){return s`
      <div 
        class="list-item"
        tabindex=${this.enable_interactions?0:-1}
        @click=${e=>this._handleItemClick(t,i,e)}
        @keydown=${e=>this._handleItemKeyPress(t,i,e)}
        role=${this.enable_interactions?"button":"listitem"}
        aria-label=${t.title||`List item ${i+1}`}
      >
        <slot name="item-${i}">
          ${t.number?s`
            <span class="list-item-number">${t.number}</span>
          `:""}
          
          ${t.icon?s`
            <span class="list-item-icon">${t.icon}</span>
          `:""}
          
          ${t.image?s`
            <img 
              src=${t.image.url}
              alt=${t.image.alt||t.image.title||""}
              class="list-item-image"
              loading="lazy"
            />
          `:""}
          
          ${t.title?s`
            <h3 class="list-item-title">${t.title}</h3>
          `:""}
          
          ${t.content?s`
            <p class="list-item-content">${t.content}</p>
          `:""}
          
          ${t.meta?s`
            <div class="list-item-meta">${t.meta}</div>
          `:""}
          
          ${t.link?s`
            <a 
              href=${t.link.url}
              class="list-item-link ${t.link.external?"list-item-link--external":""}"
              target=${t.link.external?"_blank":"_self"}
              rel=${t.link.external?"noopener noreferrer":""}
              @click=${e=>e.stopPropagation()}
            >
              ${t.link.title}
            </a>
          `:""}
        </slot>
      </div>
    `}_getTextAlign(){var e;switch((e=getComputedStyle(this).getPropertyValue("--aw-body-text-align"))==null?void 0:e.trim()){case"center":return"mx-auto max-w-prose";case"left":return"max-w-prose";case"split":return"w-full grid grid-cols-2";default:return"mx-auto max-w-prose"}}render(){const t=["list-block",`list-block--${this.size}`,`list-block--${this.layout}`,this.custom_class].filter(Boolean).join(" "),i=["list-container",`list-container--${this.list_type}`].filter(Boolean).join(" "),e=this.items_collection.items||[];return e.length===0?s`
        <div class=${t}>
          ${this.title?s`
            <h2 class="list-title">
              <slot name="title">${this.title}</slot>
            </h2>
          `:""}
          <div class="list-empty">No items to display</div>
        </div>
      `:s`
      <article class=${t} id=${this.title}>
        ${this.title?s`
          <h2 class="list-title">
            <slot name="title">${this.title}</slot>
          </h2>
        `:""}
        
        <div 
          class=${i}
          role=${this.enable_interactions?"list":"presentation"}
        >
          <slot name="items">
            ${e.map((l,a)=>this._renderListItem(l,a))}
          </slot>
        </div>
      </article>
    `}};n.styles=ut`
    :host {
      --aw-list-bg: var(--aw-color-background, #fff);
      --aw-list-surface: var(--aw-color-surface, #f8f9fa);
      --aw-list-surface-alt: var(--aw-color-surface-alt, #e9ecef);
      --aw-list-text: var(--aw-color-text, #333);
      --aw-list-text-muted: var(--aw-color-text-light, #666);
      --aw-list-text-accent: var(--aw-color-primary, #007bff);
      --aw-list-border: var(--aw-color-border, #e5e5e5);
      --aw-list-radius: var(--aw-border-radius-md, 8px);
      --aw-list-spacing: var(--aw-spacing-md, 1rem);
      --aw-list-gap: var(--aw-spacing-sm, 0.75rem);
      
      display: block;
      width: 100%;
    }

    .list-block {
      color: var(--aw-list-text);
    }

    .list-title {
      margin: 0 0 var(--aw-list-spacing) 0;
      font-size: 0.875rem;
      font-weight: normal;
      color: var(--aw-list-text-muted);
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: var(--aw-list-gap);
    }

    /* List Types */

    /* Content List */
    .list-container--content {
      gap: calc(var(--aw-list-gap) / 2);
    }

    .list-container--content .list-item {
      padding: var(--aw-list-spacing);
      background: var(--aw-list-surface-alt);
      border-radius: var(--aw-list-radius);
      margin-bottom: var(--aw-list-gap);
    }

    /* Feature List */
    .list-container--feature {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--aw-list-gap);
    }

    .list-container--feature .list-item {
      padding: calc(var(--aw-list-spacing) * 1.5);
      background: var(--aw-list-surface);
      border-radius: var(--aw-list-radius);
      border: 1px solid var(--aw-list-border);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .list-container--feature .list-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Timeline List */
    .list-container--timeline {
      position: relative;
      padding-left: 4rem;
    }

    .list-container--timeline::before {
      content: '';
      position: absolute;
      left: 1.5rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--aw-list-border);
    }

    .list-container--timeline .list-item {
      position: relative;
      padding-bottom: calc(var(--aw-list-spacing) * 1.5);
      margin-bottom: var(--aw-list-spacing);
    }

    .list-container--timeline .list-item::before {
      content: '';
      position: absolute;
      left: -2.75rem;
      top: 0.25rem;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--aw-list-text-accent);
      border: 2px solid var(--aw-list-bg);
      z-index: 1;
    }

    .list-container--timeline .list-item:last-child::after {
      content: '';
      position: absolute;
      left: -2.5rem;
      bottom: 0;
      width: 2px;
      height: var(--aw-list-spacing);
      background: var(--aw-list-bg);
    }

    /* Results List */
    .list-container--results {
      padding: calc(var(--aw-list-spacing) * 1.5);
      background: var(--aw-list-surface);
      border-radius: var(--aw-list-radius);
      gap: var(--aw-list-spacing);
    }

    /* Checklist */
    .list-container--checklist .list-item {
      display: flex;
      align-items: flex-start;
      gap: var(--aw-list-gap);
      padding: calc(var(--aw-list-spacing) / 2) 0;
    }

    .list-container--checklist .list-item::before {
      content: '✓';
      color: var(--aw-color-success, #28a745);
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    /* Numbered List */
    .list-container--numbered {
      counter-reset: list-counter;
    }

    .list-container--numbered .list-item {
      counter-increment: list-counter;
      display: flex;
      align-items: flex-start;
      gap: var(--aw-list-spacing);
      padding: calc(var(--aw-list-spacing) / 2) 0;
    }

    .list-container--numbered .list-item::before {
      content: counter(list-counter);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      background: var(--aw-list-text-accent);
      color: white;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    /* Grid List */
    .list-container--grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--aw-list-spacing);
    }

    .list-container--grid .list-item {
      text-align: center;
      padding: var(--aw-list-spacing);
      background: var(--aw-list-surface);
      border-radius: var(--aw-list-radius);
      border: 1px solid var(--aw-list-border);
    }

    /* List Item Elements */
    .list-item {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .list-item:hover {
      background-color: var(--aw-list-surface);
    }

    .list-item:focus {
      outline: 2px solid var(--aw-list-text-accent);
      outline-offset: 2px;
    }

    .list-item-number {
      color: var(--aw-list-text-accent);
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: block;
    }

    .list-item-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    .list-item-image {
      width: 100%;
      max-width: 80px;
      height: 60px;
      object-fit: cover;
      border-radius: var(--aw-list-radius);
      margin-bottom: var(--aw-list-gap);
    }

    .list-container--grid .list-item-image {
      max-width: 120px;
      height: 80px;
      margin: 0 auto var(--aw-list-gap) auto;
    }

    .list-item-title {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--aw-list-text);
      line-height: 1.4;
    }

    .list-item-content {
      margin: 0;
      font-size: 0.875rem;
      color: var(--aw-list-text-muted);
      line-height: 1.5;
    }

    .list-item-meta {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: var(--aw-list-text-muted);
      font-style: italic;
    }

    .list-item-link {
      color: var(--aw-list-text-accent);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }

    .list-item-link:hover {
      text-decoration: underline;
    }

    .list-item-link--external::after {
      content: '↗';
      font-size: 0.75rem;
    }

    /* Size variants */
    .list-block--sm {
      --aw-list-spacing: 0.75rem;
      --aw-list-gap: 0.5rem;
    }

    .list-block--sm .list-title {
      font-size: 0.75rem;
    }

    .list-block--sm .list-item-title {
      font-size: 0.875rem;
    }

    .list-block--sm .list-item-content {
      font-size: 0.75rem;
    }

    .list-block--lg {
      --aw-list-spacing: 1.5rem;
      --aw-list-gap: 1rem;
    }

    .list-block--lg .list-title {
      font-size: 1rem;
    }

    .list-block--lg .list-item-title {
      font-size: 1.125rem;
    }

    .list-block--lg .list-item-content {
      font-size: 1rem;
    }

    /* Layout variants */
    .list-block--compact {
      --aw-list-spacing: 0.75rem;
      --aw-list-gap: 0.5rem;
    }

    .list-block--spacious {
      --aw-list-spacing: 2rem;
      --aw-list-gap: 1.5rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .list-container--feature,
      .list-container--grid {
        grid-template-columns: 1fr;
      }

      .list-container--timeline {
        padding-left: 2rem;
      }

      .list-container--timeline::before {
        left: 0.75rem;
      }

      .list-container--timeline .list-item::before {
        left: -1.5rem;
      }

      .list-container--timeline .list-item:last-child::after {
        left: -1.25rem;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .list-item {
        transition: none;
      }

      .list-container--feature .list-item:hover {
        transform: none;
      }
    }

    /* High contrast */
    @media (prefers-contrast: high) {
      .list-container--feature .list-item,
      .list-container--grid .list-item {
        border-width: 2px;
      }
    }
  `;o([c({type:String})],n.prototype,"title",2);o([c({type:Object})],n.prototype,"items_collection",2);o([c({type:String})],n.prototype,"list_type",2);o([c({type:String})],n.prototype,"size",2);o([c({type:String})],n.prototype,"layout",2);o([c({type:Boolean})],n.prototype,"enable_interactions",2);o([c({type:String})],n.prototype,"custom_class",2);n=o([dt("aw-block-list")],n);const kt={title:"Components/Blocks/BlockList",component:"aw-block-list",parameters:{layout:"padded",docs:{description:{component:"A flexible list block component for displaying various types of structured content."}}},argTypes:{title:{control:"text",description:"List title"},list_type:{control:"select",options:["content","feature","timeline","results","checklist","numbered","grid"],description:"List type/variant"},size:{control:"select",options:["sm","md","lg"],description:"List size"},layout:{control:"select",options:["default","compact","spacious"],description:"Layout variant"},enable_interactions:{control:"boolean",description:"Enable item interactions"},custom_class:{control:"text",description:"Custom CSS class"}}},m=[{title:"Project Planning",content:"Define project goals, scope, and requirements. Create detailed project timeline and allocate resources effectively."},{title:"Design Phase",content:"Create wireframes, mockups, and prototypes. Gather feedback from stakeholders and iterate on designs."},{title:"Development",content:"Implement the designed features using modern web technologies. Follow best practices for code quality and performance."},{title:"Testing & QA",content:"Conduct thorough testing including unit tests, integration tests, and user acceptance testing."}],r=[{title:"Fast Performance",content:"Lightning-fast loading times with optimized code and efficient asset delivery.",icon:"⚡"},{title:"Responsive Design",content:"Looks great on all devices from mobile phones to desktop computers.",icon:"📱"},{title:"Secure & Reliable",content:"Enterprise-grade security with 99.9% uptime guarantee and regular backups.",icon:"🔒"},{title:"Easy to Use",content:"Intuitive user interface that requires no technical knowledge to operate.",icon:"👥"}],bt=[{number:"2020",title:"Company Founded",content:"Started with a small team and a big vision to transform the industry."},{number:"2021",title:"First Product Launch",content:"Released our flagship product to market with overwhelming positive response."},{number:"2022",title:"Series A Funding",content:"Raised $5M in Series A funding to accelerate growth and expand the team."},{number:"2023",title:"International Expansion",content:"Expanded operations to 15 countries across Europe and Asia."},{number:"2024",title:"IPO Announcement",content:"Announced plans for initial public offering to fuel next phase of growth."}],yt=[{title:"Revenue Growth",content:"300% increase in annual recurring revenue over the past two years.",number:"+300%"},{title:"Customer Satisfaction",content:"Maintained industry-leading customer satisfaction scores.",number:"4.9/5"},{title:"Market Expansion",content:"Successfully entered 12 new markets globally.",number:"12"},{title:"Team Growth",content:"Grew team from 10 to 150 employees across all departments.",number:"150"}],ht=[{title:"Define project requirements",content:"Gather and document all functional and non-functional requirements."},{title:"Create project timeline",content:"Establish milestones, deadlines, and dependencies."},{title:"Set up development environment",content:"Configure tools, frameworks, and deployment pipelines."},{title:"Design user interface",content:"Create mockups and prototypes for user testing."},{title:"Implement core features",content:"Build the main functionality according to specifications."},{title:"Conduct thorough testing",content:"Test all features and fix any discovered issues."}],wt=[{title:"Analytics",content:"Comprehensive data analysis and reporting tools.",icon:"📊",image:{url:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",alt:"Analytics dashboard"}},{title:"Collaboration",content:"Real-time team collaboration features.",icon:"🤝",image:{url:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",alt:"Team collaboration"}},{title:"Automation",content:"Intelligent workflow automation capabilities.",icon:"🤖",image:{url:"https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop",alt:"Automation workflow"}},{title:"Integration",content:"Seamless integration with popular tools.",icon:"🔗",image:{url:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",alt:"System integration"}}],u={args:{title:"Project Phases",list_type:"content",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:m}}},p={args:{title:"Key Features",list_type:"feature",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:r}}},d={args:{title:"Company Timeline",list_type:"timeline",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:bt}}},g={args:{title:"Key Results",list_type:"results",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:yt}}},f={args:{title:"Project Checklist",list_type:"checklist",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:ht}}},b={args:{title:"Step-by-Step Process",list_type:"numbered",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:m}}},y={args:{title:"Product Features",list_type:"grid",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:wt}}},h={args:{title:"Small List",list_type:"feature",size:"sm",layout:"compact",enable_interactions:!0,items_collection:{items:r.slice(0,3)}}},w={args:{title:"Large List",list_type:"feature",size:"lg",layout:"spacious",enable_interactions:!0,items_collection:{items:r}}},_={args:{title:"Useful Resources",list_type:"content",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:[{title:"Documentation",content:"Complete guide to using our platform effectively.",link:{url:"https://docs.example.com",title:"Read Documentation",external:!0}},{title:"API Reference",content:"Detailed API documentation for developers.",link:{url:"https://api.example.com/docs",title:"View API Docs",external:!0}},{title:"Support Center",content:"Get help from our support team.",link:{url:"/support",title:"Contact Support",external:!1}}]}}},v={render:()=>s`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <aw-block-list
        title="Small Size"
        list_type="feature"
        size="sm"
        layout="compact"
        enable_interactions="true"
        .items_collection=${{items:r.slice(0,2)}}>
      </aw-block-list>
      
      <aw-block-list
        title="Medium Size (Default)"
        list_type="feature"
        size="md"
        layout="default"
        enable_interactions="true"
        .items_collection=${{items:r.slice(0,2)}}>
      </aw-block-list>
      
      <aw-block-list
        title="Large Size"
        list_type="feature"
        size="lg"
        layout="spacious"
        enable_interactions="true"
        .items_collection=${{items:r.slice(0,2)}}>
      </aw-block-list>
    </div>
  `},k={render:()=>s`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <aw-block-list
        title="Default Layout"
        list_type="content"
        layout="default"
        enable_interactions="true"
        .items_collection=${{items:m.slice(0,3)}}>
      </aw-block-list>
      
      <aw-block-list
        title="Compact Layout"
        list_type="content"
        layout="compact"
        enable_interactions="true"
        .items_collection=${{items:m.slice(0,3)}}>
      </aw-block-list>
      
      <aw-block-list
        title="Spacious Layout"
        list_type="content"
        layout="spacious"
        enable_interactions="true"
        .items_collection=${{items:m.slice(0,3)}}>
      </aw-block-list>
    </div>
  `},x={args:{title:"Interactive List",list_type:"feature",size:"md",layout:"default",enable_interactions:!0,items_collection:{items:r}},parameters:{docs:{description:{story:"Click on list items to see interaction events in the Actions panel."}}}};var $,L,I;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    title: 'Project Phases',
    list_type: 'content',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: contentItems
    }
  }
}`,...(I=(L=u.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var C,P,A;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    title: 'Key Features',
    list_type: 'feature',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: featureItems
    }
  }
}`,...(A=(P=p.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var D,R,E;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    title: 'Company Timeline',
    list_type: 'timeline',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: timelineItems
    }
  }
}`,...(E=(R=d.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var j,T,F;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: 'Key Results',
    list_type: 'results',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: resultsItems
    }
  }
}`,...(F=(T=g.parameters)==null?void 0:T.docs)==null?void 0:F.source}}};var G,B,O;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    title: 'Project Checklist',
    list_type: 'checklist',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: checklistItems
    }
  }
}`,...(O=(B=f.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var K,q,M;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    title: 'Step-by-Step Process',
    list_type: 'numbered',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: contentItems
    }
  }
}`,...(M=(q=b.parameters)==null?void 0:q.docs)==null?void 0:M.source}}};var N,U,V;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    title: 'Product Features',
    list_type: 'grid',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: gridItems
    }
  }
}`,...(V=(U=y.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var W,H,Q;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    title: 'Small List',
    list_type: 'feature',
    size: 'sm',
    layout: 'compact',
    enable_interactions: true,
    items_collection: {
      items: featureItems.slice(0, 3)
    }
  }
}`,...(Q=(H=h.parameters)==null?void 0:H.docs)==null?void 0:Q.source}}};var Y,J,X;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    title: 'Large List',
    list_type: 'feature',
    size: 'lg',
    layout: 'spacious',
    enable_interactions: true,
    items_collection: {
      items: featureItems
    }
  }
}`,...(X=(J=w.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,tt,et;_.parameters={..._.parameters,docs:{...(Z=_.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    title: 'Useful Resources',
    list_type: 'content',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: [{
        title: 'Documentation',
        content: 'Complete guide to using our platform effectively.',
        link: {
          url: 'https://docs.example.com',
          title: 'Read Documentation',
          external: true
        }
      }, {
        title: 'API Reference',
        content: 'Detailed API documentation for developers.',
        link: {
          url: 'https://api.example.com/docs',
          title: 'View API Docs',
          external: true
        }
      }, {
        title: 'Support Center',
        content: 'Get help from our support team.',
        link: {
          url: '/support',
          title: 'Contact Support',
          external: false
        }
      }]
    }
  }
}`,...(et=(tt=_.parameters)==null?void 0:tt.docs)==null?void 0:et.source}}};var it,st,nt;v.parameters={...v.parameters,docs:{...(it=v.parameters)==null?void 0:it.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <aw-block-list
        title="Small Size"
        list_type="feature"
        size="sm"
        layout="compact"
        enable_interactions="true"
        .items_collection=\${{
    items: featureItems.slice(0, 2)
  }}>
      </aw-block-list>
      
      <aw-block-list
        title="Medium Size (Default)"
        list_type="feature"
        size="md"
        layout="default"
        enable_interactions="true"
        .items_collection=\${{
    items: featureItems.slice(0, 2)
  }}>
      </aw-block-list>
      
      <aw-block-list
        title="Large Size"
        list_type="feature"
        size="lg"
        layout="spacious"
        enable_interactions="true"
        .items_collection=\${{
    items: featureItems.slice(0, 2)
  }}>
      </aw-block-list>
    </div>
  \`
}`,...(nt=(st=v.parameters)==null?void 0:st.docs)==null?void 0:nt.source}}};var at,lt,ot;k.parameters={...k.parameters,docs:{...(at=k.parameters)==null?void 0:at.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <aw-block-list
        title="Default Layout"
        list_type="content"
        layout="default"
        enable_interactions="true"
        .items_collection=\${{
    items: contentItems.slice(0, 3)
  }}>
      </aw-block-list>
      
      <aw-block-list
        title="Compact Layout"
        list_type="content"
        layout="compact"
        enable_interactions="true"
        .items_collection=\${{
    items: contentItems.slice(0, 3)
  }}>
      </aw-block-list>
      
      <aw-block-list
        title="Spacious Layout"
        list_type="content"
        layout="spacious"
        enable_interactions="true"
        .items_collection=\${{
    items: contentItems.slice(0, 3)
  }}>
      </aw-block-list>
    </div>
  \`
}`,...(ot=(lt=k.parameters)==null?void 0:lt.docs)==null?void 0:ot.source}}};var rt,ct,mt;x.parameters={...x.parameters,docs:{...(rt=x.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    title: 'Interactive List',
    list_type: 'feature',
    size: 'md',
    layout: 'default',
    enable_interactions: true,
    items_collection: {
      items: featureItems
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on list items to see interaction events in the Actions panel.'
      }
    }
  }
}`,...(mt=(ct=x.parameters)==null?void 0:ct.docs)==null?void 0:mt.source}}};const xt=["ContentList","FeatureList","Timeline","Results","Checklist","NumberedList","GridList","SmallSize","LargeSize","WithLinks","AllSizes","AllLayouts","Interactive"];export{k as AllLayouts,v as AllSizes,f as Checklist,u as ContentList,p as FeatureList,y as GridList,x as Interactive,w as LargeSize,b as NumberedList,g as Results,h as SmallSize,d as Timeline,_ as WithLinks,xt as __namedExportsOrder,kt as default};
