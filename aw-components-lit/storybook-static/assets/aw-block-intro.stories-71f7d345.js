import{i as q,a as G,x as n}from"./lit-element-b4b0194a.js";import{n as r,t as J}from"./property-64877f55.js";var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,o=(t,a,w,s)=>{for(var i=s>1?void 0:s?Q(a,w):a,y=t.length-1,f;y>=0;y--)(f=t[y])&&(i=(s?f(a,w,i):f(i))||i);return s&&i&&K(a,w,i),i};let e=class extends G{constructor(){super(...arguments),this.overview="",this.duration="",this.client="",this.role="",this.primary_page_header=!1,this.height="auto",this.layout="default",this.custom_class=""}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent("awIntroReady",{detail:{overview:this.overview,duration:this.duration,client:this.client,role:this.role},bubbles:!0,composed:!0}))}_getHeightClass(){return this.primary_page_header?"intro-block--full":`intro-block--${this.height}`}_getLayoutClass(){return`intro-content--${this.layout}`}render(){const t=["intro-block",this._getHeightClass(),this.custom_class].filter(Boolean).join(" "),a=["intro-content",this._getLayoutClass()].filter(Boolean).join(" ");return n`
      <div class=${t}>
        <div class=${a}>
          ${this.overview?n`
            <div class="overview-section">
              <div>
                <span class="overview-label">Overview</span>
              </div>
              <div class="overview-text">
                <slot name="overview">${this.overview}</slot>
              </div>
            </div>
          `:""}

          <div class="details-section">
            <slot name="details">
              ${this.duration?n`
                <div class="detail-item">
                  <span class="detail-label">Duration</span>
                  <span class="detail-value">${this.duration}</span>
                </div>
              `:""}

              ${this.client?n`
                <div class="detail-item">
                  <span class="detail-label">Client</span>
                  <span class="detail-value">${this.client}</span>
                </div>
              `:""}

              ${this.role?n`
                <div class="detail-item">
                  <span class="detail-label">Role</span>
                  <span class="detail-value">${this.role}</span>
                </div>
              `:""}
            </slot>
          </div>
        </div>
      </div>
    `}};e.styles=q`
    :host {
      --aw-intro-bg: var(--aw-color-background, #fff);
      --aw-intro-text: var(--aw-color-text, #333);
      --aw-intro-text-muted: var(--aw-color-text-light, #666);
      --aw-intro-spacing: var(--aw-spacing-lg, 2rem);
      --aw-intro-gap: var(--aw-spacing-md, 1rem);
      --aw-intro-border-radius: var(--aw-border-radius-md, 8px);
      
      display: block;
      width: 100%;
    }

    .intro-block {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      padding: 0 var(--aw-intro-spacing);
      background-color: var(--aw-intro-bg);
      color: var(--aw-intro-text);
    }

    .intro-block--full {
      min-height: 100vh;
    }

    .intro-block--third {
      min-height: 33vh;
    }

    .intro-block--auto {
      min-height: auto;
    }

    .intro-content {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--aw-intro-gap);
      padding: 2.5rem 0;
    }

    .intro-content--compact {
      padding: 1.5rem 0;
      gap: calc(var(--aw-intro-gap) * 0.75);
    }

    .intro-content--minimal {
      padding: 1rem 0;
      gap: calc(var(--aw-intro-gap) * 0.5);
    }

    .overview-section {
      display: flex;
      flex-direction: column;
      grid-column: span 10;
      gap: var(--aw-intro-gap);
      align-self: flex-start;
      border-radius: var(--aw-intro-border-radius);
    }

    .overview-label {
      color: var(--aw-intro-text-muted);
      font-style: italic;
      margin-right: var(--aw-intro-gap);
    }

    .overview-text {
      color: var(--aw-intro-text);
      line-height: 1.6;
      margin: 0;
    }

    .details-section {
      display: flex;
      flex-direction: column;
      grid-column: span 10;
      gap: calc(var(--aw-intro-gap) * 2);
      font-size: 0.875rem;
    }

    .detail-item {
      display: flex;
      align-items: flex-start;
      color: var(--aw-intro-text);
    }

    .detail-label {
      margin-right: 0.5rem;
      color: var(--aw-intro-text-muted);
      font-style: italic;
      flex-shrink: 0;
    }

    .detail-value {
      color: var(--aw-intro-text);
    }

    /* Responsive Design */
    @media (min-width: 768px) {
      .overview-section {
        grid-column: span 7;
      }

      .details-section {
        grid-column: span 4;
      }
    }

    @media (min-width: 1024px) {
      .overview-section {
        grid-column: span 8;
      }

      .details-section {
        grid-column: span 3;
      }
    }

    /* Layout Variants */
    .intro-content--compact .overview-section {
      grid-column: span 12;
    }

    .intro-content--compact .details-section {
      grid-column: span 12;
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--aw-intro-gap);
    }

    .intro-content--compact .detail-item {
      flex-direction: column;
      min-width: 150px;
    }

    .intro-content--minimal .overview-section,
    .intro-content--minimal .details-section {
      grid-column: span 12;
    }

    .intro-content--minimal .details-section {
      flex-direction: row;
      flex-wrap: wrap;
      gap: calc(var(--aw-intro-gap) * 1.5);
    }

    /* Animation */
    .intro-block {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Focus and interaction states */
    .intro-block:focus-within {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .overview-label,
      .detail-label {
        color: var(--aw-intro-text);
        font-weight: bold;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .intro-block {
        animation: none;
        opacity: 1;
      }
    }
  `;o([r({type:String})],e.prototype,"overview",2);o([r({type:String})],e.prototype,"duration",2);o([r({type:String})],e.prototype,"client",2);o([r({type:String})],e.prototype,"role",2);o([r({type:Boolean})],e.prototype,"primary_page_header",2);o([r({type:String})],e.prototype,"height",2);o([r({type:String})],e.prototype,"layout",2);o([r({type:String})],e.prototype,"custom_class",2);e=o([J("aw-block-intro")],e);const ee={title:"Blocks/aw-block-intro",component:"aw-block-intro",parameters:{layout:"fullscreen",docs:{description:{component:"An introduction block component for displaying project overviews, details, and metadata."}}},argTypes:{overview:{control:"text",description:"Overview text content"},duration:{control:"text",description:"Project duration information"},client:{control:"text",description:"Client name"},role:{control:"text",description:"Role description"},primary_page_header:{control:"boolean",description:"Whether this is a primary page header (full height)"},height:{control:{type:"select"},options:["full","third","auto"],description:"Height variant"},layout:{control:{type:"select"},options:["default","compact","minimal"],description:"Layout variant"},custom_class:{control:"text",description:"Custom CSS class for styling"}},args:{overview:"This project showcases modern web development practices using cutting-edge technologies and design patterns. We focused on creating a seamless user experience while maintaining high performance standards.",duration:"6 months",client:"Acme Corporation",role:"Lead Frontend Developer",primary_page_header:!1,height:"auto",layout:"default",custom_class:""}},l={},c={args:{primary_page_header:!0,overview:"Welcome to our flagship project - a comprehensive digital transformation initiative that revolutionizes how users interact with our platform.",duration:"12 months",client:"Fortune 500 Company",role:"Technical Lead & Architect"}},p={args:{layout:"compact",overview:"A streamlined approach to modern web development with focus on performance and accessibility.",duration:"3 months",client:"Startup Inc.",role:"Full Stack Developer"}},d={args:{layout:"minimal",overview:"Clean, minimal design implementation.",duration:"1 month",client:"Design Agency",role:"Frontend Developer"}},m={args:{height:"third",overview:"A medium-sized introduction section for sub-pages and secondary content areas.",duration:"4 months",client:"Tech Company",role:"Senior Developer"}},u={args:{overview:"",duration:"",client:"",role:""},render:t=>n`
    <aw-block-intro
      .primary_page_header=${t.primary_page_header}
      .height=${t.height}
      .layout=${t.layout}
      .custom_class=${t.custom_class}
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
  `},v={args:{overview:"",duration:"2 months",client:"Local Business",role:"Consultant"}},g={args:{overview:"Simple project overview.",duration:"",client:"",role:"Developer"}},h={args:{custom_class:"custom-intro-styling",overview:"This intro block has custom styling applied via the custom_class property.",duration:"5 months",client:"Custom Client",role:"Custom Role"},parameters:{docs:{description:{story:"Example with custom CSS class for additional styling."}}}};var b,x,_;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(_=(x=l.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var C,S,k;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    primary_page_header: true,
    overview: 'Welcome to our flagship project - a comprehensive digital transformation initiative that revolutionizes how users interact with our platform.',
    duration: '12 months',
    client: 'Fortune 500 Company',
    role: 'Technical Lead & Architect'
  }
}`,...(k=(S=c.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var T,$,D;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    layout: 'compact',
    overview: 'A streamlined approach to modern web development with focus on performance and accessibility.',
    duration: '3 months',
    client: 'Startup Inc.',
    role: 'Full Stack Developer'
  }
}`,...(D=($=p.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var j,L,A;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    layout: 'minimal',
    overview: 'Clean, minimal design implementation.',
    duration: '1 month',
    client: 'Design Agency',
    role: 'Frontend Developer'
  }
}`,...(A=(L=d.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var W,O,P;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    height: 'third',
    overview: 'A medium-sized introduction section for sub-pages and secondary content areas.',
    duration: '4 months',
    client: 'Tech Company',
    role: 'Senior Developer'
  }
}`,...(P=(O=m.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var H,R,F;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    overview: '',
    // Will be overridden by slot
    duration: '',
    // Will be overridden by slot
    client: '',
    role: ''
  },
  render: args => html\`
    <aw-block-intro
      .primary_page_header=\${args.primary_page_header}
      .height=\${args.height}
      .layout=\${args.layout}
      .custom_class=\${args.custom_class}
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
  \`
}`,...(F=(R=u.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var z,B,I;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    overview: '',
    duration: '2 months',
    client: 'Local Business',
    role: 'Consultant'
  }
}`,...(I=(B=v.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var M,E,N;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    overview: 'Simple project overview.',
    duration: '',
    client: '',
    role: 'Developer'
  }
}`,...(N=(E=g.parameters)==null?void 0:E.docs)==null?void 0:N.source}}};var Y,U,V;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    custom_class: 'custom-intro-styling',
    overview: 'This intro block has custom styling applied via the custom_class property.',
    duration: '5 months',
    client: 'Custom Client',
    role: 'Custom Role'
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom CSS class for additional styling.'
      }
    }
  }
}`,...(V=(U=h.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};const te=["Default","PrimaryPageHeader","CompactLayout","MinimalLayout","ThirdHeight","WithCustomSlots","NoOverview","MinimalData","WithCustomClass"];export{p as CompactLayout,l as Default,g as MinimalData,d as MinimalLayout,v as NoOverview,c as PrimaryPageHeader,m as ThirdHeight,h as WithCustomClass,u as WithCustomSlots,te as __namedExportsOrder,ee as default};
