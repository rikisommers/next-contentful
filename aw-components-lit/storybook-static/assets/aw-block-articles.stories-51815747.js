import{i as ve,a as we,x as r}from"./lit-element-b4b0194a.js";import{n as s,t as xe}from"./property-64877f55.js";import{r as be}from"./state-66c4e041.js";var _e=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,i=(e,t,l,c)=>{for(var o=c>1?void 0:c?Se(t,l):t,A=e.length-1,k;A>=0;A--)(k=e[A])&&(o=(c?k(t,l,o):k(o))||o);return c&&o&&_e(t,l,o),o};let a=class extends we{constructor(){super(...arguments),this.title="",this.description="",this.articles_collection={items:[]},this.tags=[],this.layout_type="grid-primary",this.enable_filtering=!1,this.custom_class="",this.loading=!1,this._selectedTag=null,this._filteredArticles=[]}connectedCallback(){super.connectedCallback(),this._filteredArticles=this.articles_collection.items||[],this.dispatchEvent(new CustomEvent("awArticlesReady",{detail:{title:this.title,articles:this.articles_collection.items,tags:this.tags},bubbles:!0,composed:!0}))}updated(e){e.has("articles_collection")&&this._updateFilteredArticles()}_updateFilteredArticles(){const e=this.articles_collection.items||[];if(!this._selectedTag){this._filteredArticles=e;return}this._filteredArticles=e.filter(t=>t.tags&&t.tags.includes(this._selectedTag))}_handleTagClick(e){this._selectedTag=e,this._updateFilteredArticles();const t=new CustomEvent("awTagClick",{detail:{tag:e,selectedTag:this._selectedTag,filteredArticles:this._filteredArticles},bubbles:!0,composed:!0});this.dispatchEvent(t)}_handleArticleClick(e,t){const l=new CustomEvent("awArticleClick",{detail:{article:e,originalEvent:t},bubbles:!0,composed:!0});this.dispatchEvent(l)}_handleArticleKeyPress(e,t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._handleArticleClick(e,t))}_renderTags(){if(!this.enable_filtering||!this.tags.length)return"";const e=[null,...this.tags.filter(t=>t!==null)];return r`
      <nav class="articles-tags" role="tablist" aria-label="Filter articles by tag">
        ${e.map(t=>r`
          <button
            class="tag-button ${this._selectedTag===t?"tag-button--active":""}"
            @click=${()=>this._handleTagClick(t)}
            role="tab"
            aria-selected=${this._selectedTag===t}
            aria-controls="articles-content"
          >
            ${t===null?"All":t}
          </button>
        `)}
      </nav>
    `}_renderArticle(e){return r`
      <article
        class="article-item"
        tabindex="0"
        @click=${t=>this._handleArticleClick(e,t)}
        @keydown=${t=>this._handleArticleKeyPress(e,t)}
        aria-label="Article: ${e.title}"
      >
        ${e.coverImage&&(this.layout_type.includes("grid")||this.layout_type==="text-image-list"||this.layout_type==="articles-list-stack")?r`
          <img
            class="article-image"
            src=${e.coverImage.url}
            alt=${e.coverImage.alt||e.coverImage.title}
            loading="lazy"
          />
        `:""}
        
        <div class="article-content">
          <h3 class="article-title">${e.title}</h3>
          
          ${e.excerpt?r`
            <p class="article-excerpt">${e.excerpt}</p>
          `:""}
          
          ${e.date||e.author||e.readTime?r`
            <div class="article-meta">
              ${e.date?r`<span>${e.date}</span>`:""}
              ${e.author?r`<span>By ${e.author}</span>`:""}
              ${e.readTime?r`<span>${e.readTime}</span>`:""}
            </div>
          `:""}
          
          ${e.tags&&e.tags.length?r`
            <div class="article-tags">
              ${e.tags.map(t=>r`
                <span class="article-tag">${t}</span>
              `)}
            </div>
          `:""}
        </div>
      </article>
    `}render(){const e=["articles-block",this.custom_class].filter(Boolean).join(" "),t=`articles-layout--${this.layout_type}`;return this.loading?r`
        <div class=${e}>
          <div class="articles-loading">Loading articles...</div>
        </div>
      `:r`
      <div class=${e}>
        <header class="articles-header">
          <slot name="header">
            ${this.title?r`
              <h1 class="articles-title">${this.title}</h1>
            `:""}
            ${this.description?r`
              <p class="articles-description">${this.description}</p>
            `:""}
          </slot>
          
          <slot name="tags">
            ${this._renderTags()}
          </slot>
        </header>

        <div 
          class="articles-content ${t}"
          id="articles-content"
          role="tabpanel"
          aria-label="Articles list"
        >
          <slot name="articles">
            ${this._filteredArticles.length>0?this._filteredArticles.map(l=>this._renderArticle(l)):r`
                <div class="articles-empty">
                  ${this._selectedTag?`No articles found for tag "${this._selectedTag}"`:"No articles available"}
                </div>
              `}
          </slot>
        </div>
      </div>
    `}};a.styles=ve`
    :host {
      --aw-articles-text: var(--aw-color-text, #333);
      --aw-articles-text-muted: var(--aw-color-text-light, #666);
      --aw-articles-bg: var(--aw-color-background, #fff);
      --aw-articles-surface: var(--aw-color-surface, #f8f9fa);
      --aw-articles-primary: var(--aw-color-primary, #007bff);
      --aw-articles-spacing: var(--aw-spacing-lg, 2rem);
      --aw-articles-gap: var(--aw-spacing-md, 1rem);
      --aw-articles-border-radius: var(--aw-border-radius-md, 8px);
      
      display: block;
      width: 100%;
    }

    .articles-block {
      padding: 0 var(--aw-articles-spacing);
      color: var(--aw-articles-text);
    }

    .articles-header {
      margin-bottom: var(--aw-articles-gap);
    }

    .articles-title {
      font-size: 1.5rem;
      font-weight: 300;
      margin: 0 0 var(--aw-articles-gap) 0;
      color: var(--aw-articles-text-muted);
      line-height: 1.4;
      word-wrap: break-word;
      transition: color 0.3s ease;
    }

    .articles-description {
      font-size: 0.875rem;
      color: var(--aw-articles-text-muted);
      margin: 0 0 var(--aw-articles-gap) 0;
    }

    .articles-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: calc(var(--aw-articles-spacing) / 2);
      position: relative;
    }

    .tag-button {
      display: flex;
      align-items: center;
      position: relative;
      z-index: 10;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--aw-articles-border-radius);
      color: var(--aw-articles-text-muted);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tag-button:hover {
      color: var(--aw-articles-primary);
    }

    .tag-button--active {
      color: var(--aw-articles-primary);
      border-color: var(--aw-articles-primary);
    }

    .tag-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid var(--aw-articles-primary);
      border-radius: var(--aw-articles-border-radius);
      pointer-events: none;
      z-index: 1;
    }

    .articles-content {
      display: flex;
      flex-direction: column;
      gap: var(--aw-articles-gap);
      padding-bottom: 2.5rem;
      width: 100%;
    }

    /* Layout: Grid Primary */
    .articles-layout--grid-primary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--aw-articles-gap);
    }

    /* Layout: Grid Secondary */
    .articles-layout--grid-secondary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: calc(var(--aw-articles-gap) * 1.5);
    }

    /* Layout: Grid Bento */
    .articles-layout--grid-bento {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      grid-auto-rows: minmax(200px, auto);
      gap: var(--aw-articles-gap);
    }

    .articles-layout--grid-bento .article-item:nth-child(odd) {
      grid-row: span 2;
    }

    /* Layout: Text Lists */
    .articles-layout--text-list,
    .articles-layout--text-hover-list,
    .articles-layout--text-image-list {
      display: flex;
      flex-direction: column;
      gap: calc(var(--aw-articles-gap) / 2);
    }

    /* Layout: Stack */
    .articles-layout--articles-list-stack {
      display: flex;
      flex-direction: column;
      gap: var(--aw-articles-gap);
    }

    /* Article Item Styles */
    .article-item {
      background: var(--aw-articles-bg);
      border-radius: var(--aw-articles-border-radius);
      transition: all 0.3s ease;
      cursor: pointer;
      overflow: hidden;
    }

    .article-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .article-item:focus {
      outline: 2px solid var(--aw-articles-primary);
      outline-offset: 2px;
    }

    /* Grid article styles */
    .articles-layout--grid-primary .article-item,
    .articles-layout--grid-secondary .article-item,
    .articles-layout--grid-bento .article-item {
      padding: var(--aw-articles-gap);
      border: 1px solid var(--aw-color-border, #e5e5e5);
    }

    /* List article styles */
    .articles-layout--text-list .article-item,
    .articles-layout--text-hover-list .article-item,
    .articles-layout--text-image-list .article-item {
      display: flex;
      align-items: center;
      padding: var(--aw-articles-gap);
      border-bottom: 1px solid var(--aw-color-border, #e5e5e5);
      background: transparent;
    }

    .articles-layout--text-image-list .article-item {
      gap: var(--aw-articles-gap);
    }

    /* Stack article styles */
    .articles-layout--articles-list-stack .article-item {
      padding: calc(var(--aw-articles-gap) * 1.5);
      border: 1px solid var(--aw-color-border, #e5e5e5);
      background: var(--aw-articles-surface);
    }

    .article-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--aw-articles-border-radius);
      margin-bottom: var(--aw-articles-gap);
    }

    .articles-layout--text-image-list .article-image {
      width: 80px;
      height: 80px;
      margin: 0;
      flex-shrink: 0;
    }

    .article-content {
      flex: 1;
    }

    .article-title {
      font-size: 1.125rem;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
      color: var(--aw-articles-text);
      line-height: 1.4;
    }

    .articles-layout--text-list .article-title,
    .articles-layout--text-hover-list .article-title {
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .article-excerpt {
      font-size: 0.875rem;
      color: var(--aw-articles-text-muted);
      line-height: 1.5;
      margin: 0;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.75rem;
      color: var(--aw-articles-text-muted);
      margin-top: 0.5rem;
    }

    .article-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-top: 0.5rem;
    }

    .article-tag {
      padding: 0.25rem 0.5rem;
      background: var(--aw-articles-surface);
      border-radius: 12px;
      font-size: 0.75rem;
      color: var(--aw-articles-text-muted);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .articles-block {
        padding: 0 var(--aw-articles-gap);
      }

      .articles-layout--grid-primary,
      .articles-layout--grid-secondary,
      .articles-layout--grid-bento {
        grid-template-columns: 1fr;
      }

      .articles-layout--text-image-list .article-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .articles-layout--text-image-list .article-image {
        width: 100%;
        height: 150px;
        margin-bottom: var(--aw-articles-gap);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .article-item {
        transition: none;
      }

      .article-item:hover {
        transform: none;
      }
    }

    /* Loading state */
    .articles-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      color: var(--aw-articles-text-muted);
    }

    /* Empty state */
    .articles-empty {
      text-align: center;
      padding: 2rem;
      color: var(--aw-articles-text-muted);
    }
  `;i([s({type:String})],a.prototype,"title",2);i([s({type:String})],a.prototype,"description",2);i([s({type:Object})],a.prototype,"articles_collection",2);i([s({type:Array})],a.prototype,"tags",2);i([s({type:String})],a.prototype,"layout_type",2);i([s({type:Boolean})],a.prototype,"enable_filtering",2);i([s({type:String})],a.prototype,"custom_class",2);i([s({type:Boolean})],a.prototype,"loading",2);i([be()],a.prototype,"_selectedTag",2);i([be()],a.prototype,"_filteredArticles",2);a=i([xe("aw-block-articles")],a);const T=[{title:"Getting Started with Web Components",slug:"getting-started-web-components",excerpt:"Learn the fundamentals of building reusable web components with modern browser APIs.",coverImage:{url:"https://picsum.photos/400/250?random=1",title:"Web Components",alt:"Abstract representation of web components"},tags:["Web Components","JavaScript","Frontend"],date:"2024-01-15",author:"Jane Developer",readTime:"5 min read"},{title:"Advanced CSS Grid Techniques",slug:"advanced-css-grid-techniques",excerpt:"Explore advanced layout techniques using CSS Grid for complex responsive designs.",coverImage:{url:"https://picsum.photos/400/250?random=2",title:"CSS Grid",alt:"CSS Grid layout example"},tags:["CSS","Grid","Layout","Frontend"],date:"2024-01-12",author:"John Designer",readTime:"8 min read"},{title:"TypeScript Best Practices",slug:"typescript-best-practices",excerpt:"Discover best practices for writing maintainable and type-safe TypeScript code.",coverImage:{url:"https://picsum.photos/400/250?random=3",title:"TypeScript",alt:"TypeScript code editor"},tags:["TypeScript","JavaScript","Best Practices"],date:"2024-01-10",author:"Sarah Coder",readTime:"12 min read"},{title:"Building Accessible User Interfaces",slug:"building-accessible-user-interfaces",excerpt:"Learn how to create inclusive web experiences that work for everyone.",coverImage:{url:"https://picsum.photos/400/250?random=4",title:"Accessibility",alt:"Accessibility icons and symbols"},tags:["Accessibility","UX","Frontend"],date:"2024-01-08",author:"Alex UX",readTime:"10 min read"},{title:"Performance Optimization Strategies",slug:"performance-optimization-strategies",excerpt:"Optimize your web applications for speed and efficiency with these proven techniques.",coverImage:{url:"https://picsum.photos/400/250?random=5",title:"Performance",alt:"Performance optimization charts"},tags:["Performance","Optimization","Frontend"],date:"2024-01-05",author:"Mike Performance",readTime:"15 min read"},{title:"Modern JavaScript Patterns",slug:"modern-javascript-patterns",excerpt:"Explore modern JavaScript patterns and idioms for cleaner, more maintainable code.",tags:["JavaScript","Patterns","Best Practices"],date:"2024-01-03",author:"Emma JS",readTime:"7 min read"}],Ae=["JavaScript","CSS","TypeScript","Frontend","Accessibility","Performance","Web Components","Best Practices"],$e={title:"Blocks/aw-block-articles",component:"aw-block-articles",parameters:{layout:"fullscreen",docs:{description:{component:"A multiple articles block component for displaying article collections with filtering and layout variants."}}},argTypes:{title:{control:"text",description:"Block title"},description:{control:"text",description:"Block description"},articles_collection:{control:"object",description:"Articles collection data"},tags:{control:"object",description:"Available tags for filtering"},layout_type:{control:{type:"select"},options:["grid-primary","grid-secondary","grid-bento","grid-things","text-hover-list","text-image-list","text-list","articles-list-stack"],description:"Layout type for articles display"},enable_filtering:{control:"boolean",description:"Enable tag filtering"},custom_class:{control:"text",description:"Custom CSS class for styling"},loading:{control:"boolean",description:"Loading state"}},args:{title:"Recent Articles",description:"Explore our latest content and insights",articles_collection:{items:T},tags:Ae,layout_type:"grid-primary",enable_filtering:!0,custom_class:"",loading:!1}},n={},d={args:{layout_type:"grid-secondary",title:"Featured Articles",description:"Hand-picked articles from our editorial team"}},p={args:{layout_type:"grid-bento",title:"Article Showcase",description:"A creative grid layout for highlighting diverse content"}},m={args:{layout_type:"text-list",title:"Article Index",description:"A clean list view for browsing articles"}},g={args:{layout_type:"text-hover-list",title:"Interactive Articles",description:"Articles with enhanced hover interactions"}},u={args:{layout_type:"text-image-list",title:"Articles with Thumbnails",description:"Compact list view with article thumbnails"}},y={args:{layout_type:"articles-list-stack",title:"Article Stack",description:"A stacked layout for featured content"}},h={args:{enable_filtering:!1,title:"All Articles",description:"Browse all available articles without filtering"}},f={args:{loading:!0,title:"Loading Articles",description:"Please wait while we fetch the latest content"}},b={args:{articles_collection:{items:[]},title:"No Articles Found",description:"Check back later for new content"}},v={args:{title:"Simple Articles",articles_collection:{items:[{title:"Simple Article 1",slug:"simple-article-1"},{title:"Simple Article 2",slug:"simple-article-2"},{title:"Simple Article 3",slug:"simple-article-3"}]},enable_filtering:!1}},w={args:{title:"JavaScript Articles",description:"Articles focused on JavaScript development",articles_collection:{items:T.filter(e=>e.tags&&e.tags.includes("JavaScript"))},tags:["JavaScript"],enable_filtering:!0}},x={args:{title:"",description:"",articles_collection:{items:T.slice(0,3)},enable_filtering:!1},render:e=>r`
    <aw-block-articles
      .articles_collection=${e.articles_collection}
      .layout_type=${e.layout_type}
      .enable_filtering=${e.enable_filtering}
      .custom_class=${e.custom_class}
      .loading=${e.loading}
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
  `},_={args:{layout_type:"text-list",title:"Quick Read",description:"Short articles for busy readers",articles_collection:{items:[{title:"Quick Tip: CSS Variables",slug:"css-variables-tip",excerpt:"A quick guide to using CSS custom properties.",tags:["CSS","Tips"],date:"2024-01-20",readTime:"2 min read"},{title:"JavaScript Array Methods",slug:"js-array-methods",excerpt:"Essential array methods every developer should know.",tags:["JavaScript","Arrays"],date:"2024-01-19",readTime:"3 min read"},{title:"Git Best Practices",slug:"git-best-practices",excerpt:"Improve your Git workflow with these tips.",tags:["Git","Best Practices"],date:"2024-01-18",readTime:"4 min read"}]},tags:["CSS","JavaScript","Git","Tips","Best Practices"],enable_filtering:!0}},S={args:{layout_type:"text-image-list",title:"Mobile-Friendly Articles",description:"Optimized for mobile reading experience"},parameters:{viewport:{defaultViewport:"mobile1"}}};var C,$,L;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:"{}",...(L=($=n.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var P,z,B;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    layout_type: 'grid-secondary',
    title: 'Featured Articles',
    description: 'Hand-picked articles from our editorial team'
  }
}`,...(B=(z=d.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var F,J,G;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    layout_type: 'grid-bento',
    title: 'Article Showcase',
    description: 'A creative grid layout for highlighting diverse content'
  }
}`,...(G=(J=p.parameters)==null?void 0:J.docs)==null?void 0:G.source}}};var E,I,O;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    layout_type: 'text-list',
    title: 'Article Index',
    description: 'A clean list view for browsing articles'
  }
}`,...(O=(I=m.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};var M,j,D;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    layout_type: 'text-hover-list',
    title: 'Interactive Articles',
    description: 'Articles with enhanced hover interactions'
  }
}`,...(D=(j=g.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var H,W,q;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    layout_type: 'text-image-list',
    title: 'Articles with Thumbnails',
    description: 'Compact list view with article thumbnails'
  }
}`,...(q=(W=u.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var R,N,Q;y.parameters={...y.parameters,docs:{...(R=y.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    layout_type: 'articles-list-stack',
    title: 'Article Stack',
    description: 'A stacked layout for featured content'
  }
}`,...(Q=(N=y.parameters)==null?void 0:N.docs)==null?void 0:Q.source}}};var V,U,Y;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    enable_filtering: false,
    title: 'All Articles',
    description: 'Browse all available articles without filtering'
  }
}`,...(Y=(U=h.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var K,X,Z;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    loading: true,
    title: 'Loading Articles',
    description: 'Please wait while we fetch the latest content'
  }
}`,...(Z=(X=f.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,te,re;b.parameters={...b.parameters,docs:{...(ee=b.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    articles_collection: {
      items: []
    },
    title: 'No Articles Found',
    description: 'Check back later for new content'
  }
}`,...(re=(te=b.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var ae,ie,se;v.parameters={...v.parameters,docs:{...(ae=v.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    title: 'Simple Articles',
    articles_collection: {
      items: [{
        title: 'Simple Article 1',
        slug: 'simple-article-1'
      }, {
        title: 'Simple Article 2',
        slug: 'simple-article-2'
      }, {
        title: 'Simple Article 3',
        slug: 'simple-article-3'
      }]
    },
    enable_filtering: false
  }
}`,...(se=(ie=v.parameters)==null?void 0:ie.docs)==null?void 0:se.source}}};var le,oe,ce;w.parameters={...w.parameters,docs:{...(le=w.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    title: 'JavaScript Articles',
    description: 'Articles focused on JavaScript development',
    articles_collection: {
      items: sampleArticles.filter(article => article.tags && article.tags.includes('JavaScript'))
    },
    tags: ['JavaScript'],
    enable_filtering: true
  }
}`,...(ce=(oe=w.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var ne,de,pe;x.parameters={...x.parameters,docs:{...(ne=x.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    title: '',
    description: '',
    articles_collection: {
      items: sampleArticles.slice(0, 3)
    },
    enable_filtering: false
  },
  render: args => html\`
    <aw-block-articles
      .articles_collection=\${args.articles_collection}
      .layout_type=\${args.layout_type}
      .enable_filtering=\${args.enable_filtering}
      .custom_class=\${args.custom_class}
      .loading=\${args.loading}
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
  \`
}`,...(pe=(de=x.parameters)==null?void 0:de.docs)==null?void 0:pe.source}}};var me,ge,ue;_.parameters={..._.parameters,docs:{...(me=_.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    layout_type: 'text-list',
    title: 'Quick Read',
    description: 'Short articles for busy readers',
    articles_collection: {
      items: [{
        title: 'Quick Tip: CSS Variables',
        slug: 'css-variables-tip',
        excerpt: 'A quick guide to using CSS custom properties.',
        tags: ['CSS', 'Tips'],
        date: '2024-01-20',
        readTime: '2 min read'
      }, {
        title: 'JavaScript Array Methods',
        slug: 'js-array-methods',
        excerpt: 'Essential array methods every developer should know.',
        tags: ['JavaScript', 'Arrays'],
        date: '2024-01-19',
        readTime: '3 min read'
      }, {
        title: 'Git Best Practices',
        slug: 'git-best-practices',
        excerpt: 'Improve your Git workflow with these tips.',
        tags: ['Git', 'Best Practices'],
        date: '2024-01-18',
        readTime: '4 min read'
      }]
    },
    tags: ['CSS', 'JavaScript', 'Git', 'Tips', 'Best Practices'],
    enable_filtering: true
  }
}`,...(ue=(ge=_.parameters)==null?void 0:ge.docs)==null?void 0:ue.source}}};var ye,he,fe;S.parameters={...S.parameters,docs:{...(ye=S.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    layout_type: 'text-image-list',
    title: 'Mobile-Friendly Articles',
    description: 'Optimized for mobile reading experience'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(fe=(he=S.parameters)==null?void 0:he.docs)==null?void 0:fe.source}}};const Le=["Default","GridSecondary","GridBento","TextList","TextHoverList","TextImageList","ArticlesStack","WithoutFiltering","LoadingState","EmptyState","MinimalData","SingleTag","WithCustomSlots","CompactLayout","MobileOptimized"];export{y as ArticlesStack,_ as CompactLayout,n as Default,b as EmptyState,p as GridBento,d as GridSecondary,f as LoadingState,v as MinimalData,S as MobileOptimized,w as SingleTag,g as TextHoverList,u as TextImageList,m as TextList,x as WithCustomSlots,h as WithoutFiltering,Le as __namedExportsOrder,$e as default};
