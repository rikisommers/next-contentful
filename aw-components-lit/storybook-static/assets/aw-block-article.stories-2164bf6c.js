import{E as z,T as st,i as lt,a as ct,x as c}from"./lit-element-b4b0194a.js";import{n as o,t as ht}from"./property-64877f55.js";import{i as pt,t as mt,e as dt}from"./directive-12249aa5.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class k extends pt{constructor(t){if(super(t),this.it=z,t.type!==mt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===z||t==null)return this._t=void 0,this.it=t;if(t===st)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}k.directiveName="unsafeHTML",k.resultType=1;const ut=dt(k);var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,a=(e,t,n,i)=>{for(var s=i>1?void 0:i?ft(t,n):t,l=e.length-1,_;l>=0;l--)(_=e[l])&&(s=(i?_(t,n,s):_(s))||s);return i&&s&&gt(t,n,s),s};let r=class extends ct{constructor(){super(...arguments),this.title="",this.content="",this.rich_content="",this.images=[],this.text_align="center",this.text_indent=!1,this.size="md",this.custom_class="",this.article_id=""}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent("awArticleReady",{detail:{title:this.title,content:this.content,rich_content:this.rich_content,images:this.images},bubbles:!0,composed:!0}))}_handleImageClick(e,t){const n=new CustomEvent("awImageClick",{detail:{image:e,originalEvent:t},bubbles:!0,composed:!0});this.dispatchEvent(n)}_handleImageKeyPress(e,t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._handleImageClick(e,t))}render(){const e=["article-block",`article-block--${this.text_align}`,`article-block--${this.size}`,this.custom_class].filter(Boolean).join(" "),t=["article-text",this.text_indent?"article-text--indent":""].filter(Boolean).join(" "),n=["article-rich-content",this.text_indent?"article-rich-content--indent":""].filter(Boolean).join(" ");return c`
      <article 
        class=${e}
        id=${this.article_id||this.title}
      >
        <div class="article-content">
          ${this.title?c`
            <h2 class="article-title">
              <slot name="title">${this.title}</slot>
            </h2>
          `:""}

          ${this.content?c`
            <p class=${t}>
              <slot name="content">${this.content}</slot>
            </p>
          `:""}

          ${this.rich_content?c`
            <div class=${n}>
              ${ut(this.rich_content)}
            </div>
          `:""}
        </div>

        ${this.images&&this.images.length>0?c`
          <div class="article-images">
            <slot name="images">
              ${this.images.map((i,s)=>c`
                <img
                  class="article-image"
                  src=${i.url}
                  alt=${i.alt||`Cover Image for ${i.title}`}
                  width=${i.width||2e3}
                  height=${i.height||1e3}
                  tabindex="0"
                  @click=${l=>this._handleImageClick(i,l)}
                  @keydown=${l=>this._handleImageKeyPress(i,l)}
                />
              `)}
            </slot>
          </div>
        `:""}
      </article>
    `}};r.styles=lt`
    :host {
      --aw-article-text: var(--aw-color-text, #333);
      --aw-article-text-muted: var(--aw-color-text-light, #666);
      --aw-article-spacing: var(--aw-spacing-lg, 2rem);
      --aw-article-gap: var(--aw-spacing-md, 1rem);
      --aw-article-border-radius: var(--aw-border-radius-md, 8px);
      --aw-article-line-height: 1.6;
      --aw-article-max-width: 65ch;
      
      display: block;
      width: 100%;
    }

    .article-block {
      color: var(--aw-article-text);
      line-height: var(--aw-article-line-height);
    }

    .article-content {
      margin-bottom: var(--aw-article-spacing);
    }

    /* Alignment variants */
    .article-block--center {
      margin: 0 auto;
      max-width: var(--aw-article-max-width);
    }

    .article-block--left {
      max-width: var(--aw-article-max-width);
    }

    .article-block--split {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--aw-article-spacing);
      max-width: none;
    }

    .article-title {
      margin-bottom: var(--aw-article-gap);
      font-size: 0.875rem;
      font-weight: normal;
      color: var(--aw-article-text-muted);
    }

    .article-text {
      margin-bottom: calc(var(--aw-article-spacing) / 2);
      font-size: 1rem;
      line-height: var(--aw-article-line-height);
      color: var(--aw-article-text-muted);
    }

    .article-text--indent {
      text-indent: 3rem;
    }

    .article-rich-content {
      color: var(--aw-article-text);
      line-height: var(--aw-article-line-height);
    }

    .article-rich-content--indent :first-child {
      text-indent: 3rem;
    }

    /* Size variants */
    .article-block--sm {
      font-size: 0.875rem;
    }

    .article-block--sm .article-title {
      font-size: 0.75rem;
    }

    .article-block--md {
      font-size: 1rem;
    }

    .article-block--lg {
      font-size: 1.125rem;
    }

    .article-block--lg .article-title {
      font-size: 1rem;
    }

    .article-block--xl {
      font-size: 1.25rem;
    }

    .article-block--xl .article-title {
      font-size: 1.125rem;
    }

    /* Image gallery */
    .article-images {
      margin-top: var(--aw-article-spacing);
      display: flex;
      flex-direction: column;
      gap: var(--aw-article-gap);
    }

    .article-image {
      width: 100%;
      height: auto;
      border-radius: var(--aw-article-border-radius);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .article-image:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .article-image:focus {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
    }

    /* Rich text content styling */
    .article-rich-content h1,
    .article-rich-content h2,
    .article-rich-content h3,
    .article-rich-content h4,
    .article-rich-content h5,
    .article-rich-content h6 {
      color: var(--aw-article-text);
      line-height: 1.4;
      margin: 1.5em 0 0.5em 0;
    }

    .article-rich-content h1:first-child,
    .article-rich-content h2:first-child,
    .article-rich-content h3:first-child,
    .article-rich-content h4:first-child,
    .article-rich-content h5:first-child,
    .article-rich-content h6:first-child {
      margin-top: 0;
    }

    .article-rich-content p {
      margin: 0 0 1em 0;
      line-height: var(--aw-article-line-height);
    }

    .article-rich-content ul,
    .article-rich-content ol {
      margin: 1em 0;
      padding-left: 2em;
    }

    .article-rich-content li {
      margin: 0.5em 0;
    }

    .article-rich-content blockquote {
      margin: 1.5em 0;
      padding: 1em 1.5em;
      border-left: 4px solid var(--aw-color-primary, #007bff);
      background-color: var(--aw-color-surface-light, #f8f9fa);
      font-style: italic;
    }

    .article-rich-content code {
      background-color: var(--aw-color-surface-light, #f8f9fa);
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
    }

    .article-rich-content pre {
      background-color: var(--aw-color-surface-light, #f8f9fa);
      padding: 1em;
      border-radius: var(--aw-article-border-radius);
      overflow-x: auto;
      margin: 1em 0;
    }

    .article-rich-content pre code {
      background: none;
      padding: 0;
    }

    .article-rich-content a {
      color: var(--aw-color-primary, #007bff);
      text-decoration: underline;
    }

    .article-rich-content a:hover {
      text-decoration: none;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .article-block--split {
        grid-template-columns: 1fr;
        gap: var(--aw-article-gap);
      }

      .article-text--indent {
        text-indent: 1.5rem;
      }

      .article-rich-content--indent :first-child {
        text-indent: 1.5rem;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .article-title {
        color: var(--aw-article-text);
        font-weight: bold;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .article-image {
        transition: none;
      }

      .article-image:hover {
        transform: none;
      }
    }

    /* Focus management */
    .article-block:focus-within {
      outline: 2px solid var(--aw-color-primary, #007bff);
      outline-offset: 2px;
      border-radius: var(--aw-article-border-radius);
    }
  `;a([o({type:String})],r.prototype,"title",2);a([o({type:String})],r.prototype,"content",2);a([o({type:String})],r.prototype,"rich_content",2);a([o({type:Array})],r.prototype,"images",2);a([o({type:String})],r.prototype,"text_align",2);a([o({type:Boolean})],r.prototype,"text_indent",2);a([o({type:String})],r.prototype,"size",2);a([o({type:String})],r.prototype,"custom_class",2);a([o({type:String})],r.prototype,"article_id",2);r=a([ht("aw-block-article")],r);const bt={title:"Blocks/aw-block-article",component:"aw-block-article",parameters:{layout:"padded",docs:{description:{component:"A single article block component for displaying article content with optional images and rich text."}}},argTypes:{title:{control:"text",description:"Article title"},content:{control:"text",description:"Plain text content"},rich_content:{control:"text",description:"Rich text content (HTML)"},images:{control:"object",description:"Array of image objects"},text_align:{control:{type:"select"},options:["center","left","split"],description:"Text alignment"},text_indent:{control:"boolean",description:"Whether to indent the first paragraph"},size:{control:{type:"select"},options:["sm","md","lg","xl"],description:"Article size variant"},custom_class:{control:"text",description:"Custom CSS class for styling"},article_id:{control:"text",description:"Article ID for anchor links"}},args:{title:"Introduction to Modern Web Development",content:"Modern web development has evolved significantly over the past decade. With the introduction of new frameworks, tools, and methodologies, developers now have more powerful ways to create engaging and performant web applications.",rich_content:"",images:[],text_align:"center",text_indent:!1,size:"md",custom_class:"",article_id:""}},h={},p={args:{text_indent:!0,content:"This paragraph demonstrates the text indent feature. The first line of this paragraph is indented, which is a common typographic style used in traditional publishing and can add visual interest to your content."}},m={args:{text_align:"left",title:"Left-Aligned Article",content:"This article is left-aligned, which can be useful for certain design layouts where you want the content to flow naturally from the left edge."}},d={args:{text_align:"split",title:"Split Layout Article",content:"This demonstrates the split layout option, which displays content in a two-column format. This can be effective for comparing information or creating a magazine-style layout."}},u={args:{title:"Article with Rich Content",content:"",rich_content:`
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
    `}},g={args:{title:"Article with Images",content:"This article includes a gallery of images that demonstrate the image handling capabilities of the component.",images:[{title:"Sample Image 1",url:"https://picsum.photos/800/400?random=1",alt:"A beautiful landscape",width:800,height:400},{title:"Sample Image 2",url:"https://picsum.photos/800/400?random=2",alt:"An urban cityscape",width:800,height:400}]}},f={args:{size:"lg",title:"Large Article",content:"This article uses the large size variant, which increases the overall text size for better readability or when you want to emphasize the content.",text_indent:!0}},x={args:{size:"sm",title:"Small Article",content:"This article uses the small size variant, which reduces the text size for secondary content or when space is limited."}},w={args:{title:"Complete Article Example",content:"",rich_content:`
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
    `,images:[{title:"Design Process",url:"https://picsum.photos/800/500?random=3",alt:"Design process illustration",width:800,height:500}],text_indent:!0,size:"lg"}},y={args:{title:"",content:"",rich_content:""},render:e=>c`
    <aw-block-article
      .text_align=${e.text_align}
      .text_indent=${e.text_indent}
      .size=${e.size}
      .custom_class=${e.custom_class}
      .article_id=${e.article_id}
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
  `},b={args:{title:"Minimal Article",content:"",rich_content:"",images:[]}},v={args:{title:"",content:"",rich_content:`
      <h2>Standalone Rich Content</h2>
      <p>Sometimes you only need rich content without a separate title or plain text content.</p>
      <p>This example shows how the component handles rich content as the primary content source.</p>
    `}};var S,T,C;h.parameters={...h.parameters,docs:{...(S=h.parameters)==null?void 0:S.docs,source:{originalSource:"{}",...(C=(T=h.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var $,A,I;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    text_indent: true,
    content: 'This paragraph demonstrates the text indent feature. The first line of this paragraph is indented, which is a common typographic style used in traditional publishing and can add visual interest to your content.'
  }
}`,...(I=(A=p.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var L,R,E;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    text_align: 'left',
    title: 'Left-Aligned Article',
    content: 'This article is left-aligned, which can be useful for certain design layouts where you want the content to flow naturally from the left edge.'
  }
}`,...(E=(R=m.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var M,q,W;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    text_align: 'split',
    title: 'Split Layout Article',
    content: 'This demonstrates the split layout option, which displays content in a two-column format. This can be effective for comparing information or creating a magazine-style layout.'
  }
}`,...(W=(q=d.parameters)==null?void 0:q.docs)==null?void 0:W.source}}};var D,P,B;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    title: 'Article with Rich Content',
    content: '',
    rich_content: \`
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
    \`
  }
}`,...(B=(P=u.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var F,H,j;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    title: 'Article with Images',
    content: 'This article includes a gallery of images that demonstrate the image handling capabilities of the component.',
    images: [{
      title: 'Sample Image 1',
      url: 'https://picsum.photos/800/400?random=1',
      alt: 'A beautiful landscape',
      width: 800,
      height: 400
    }, {
      title: 'Sample Image 2',
      url: 'https://picsum.photos/800/400?random=2',
      alt: 'An urban cityscape',
      width: 800,
      height: 400
    }]
  }
}`,...(j=(H=g.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var O,K,Y;f.parameters={...f.parameters,docs:{...(O=f.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    title: 'Large Article',
    content: 'This article uses the large size variant, which increases the overall text size for better readability or when you want to emphasize the content.',
    text_indent: true
  }
}`,...(Y=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var G,N,U;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    size: 'sm',
    title: 'Small Article',
    content: 'This article uses the small size variant, which reduces the text size for secondary content or when space is limited.'
  }
}`,...(U=(N=x.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var J,Q,V;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    title: 'Complete Article Example',
    content: '',
    rich_content: \`
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
    \`,
    images: [{
      title: 'Design Process',
      url: 'https://picsum.photos/800/500?random=3',
      alt: 'Design process illustration',
      width: 800,
      height: 500
    }],
    text_indent: true,
    size: 'lg'
  }
}`,...(V=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var X,Z,tt;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    title: '',
    content: '',
    rich_content: ''
  },
  render: args => html\`
    <aw-block-article
      .text_align=\${args.text_align}
      .text_indent=\${args.text_indent}
      .size=\${args.size}
      .custom_class=\${args.custom_class}
      .article_id=\${args.article_id}
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
  \`
}`,...(tt=(Z=y.parameters)==null?void 0:Z.docs)==null?void 0:tt.source}}};var et,it,rt;b.parameters={...b.parameters,docs:{...(et=b.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    title: 'Minimal Article',
    content: '',
    rich_content: '',
    images: []
  }
}`,...(rt=(it=b.parameters)==null?void 0:it.docs)==null?void 0:rt.source}}};var nt,at,ot;v.parameters={...v.parameters,docs:{...(nt=v.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  args: {
    title: '',
    content: '',
    rich_content: \`
      <h2>Standalone Rich Content</h2>
      <p>Sometimes you only need rich content without a separate title or plain text content.</p>
      <p>This example shows how the component handles rich content as the primary content source.</p>
    \`
  }
}`,...(ot=(at=v.parameters)==null?void 0:at.docs)==null?void 0:ot.source}}};const vt=["Default","WithTextIndent","LeftAligned","SplitLayout","WithRichContent","WithImages","LargeSize","SmallSize","FullExample","WithCustomSlots","MinimalContent","OnlyRichContent"];export{h as Default,w as FullExample,f as LargeSize,m as LeftAligned,b as MinimalContent,v as OnlyRichContent,x as SmallSize,d as SplitLayout,y as WithCustomSlots,g as WithImages,u as WithRichContent,p as WithTextIndent,vt as __namedExportsOrder,bt as default};
