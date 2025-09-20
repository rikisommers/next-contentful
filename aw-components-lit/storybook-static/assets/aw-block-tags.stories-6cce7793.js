import{i as ve,a as he,x as g}from"./lit-element-b4b0194a.js";import{n as c,t as we}from"./property-64877f55.js";var fe=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,o=(e,t,a,r)=>{for(var l=r>1?void 0:r?ye(t,a):t,n=e.length-1,d;n>=0;n--)(d=e[n])&&(l=(r?d(t,a,l):d(l))||l);return r&&l&&fe(t,a,l),l};let i=class extends he{constructor(){super(...arguments),this.tags=[],this.variant="default",this.size="md",this.color="neutral",this.enable_selection=!1,this.multiselect=!0,this.selected=[],this.animated_indicator=!0,this.max_visible=0,this.more_text="+{count} more",this.custom_class="",this._selectedTagsSet=new Set}connectedCallback(){super.connectedCallback(),this._updateSelectedSet(),this.dispatchEvent(new CustomEvent("awTagsReady",{detail:{tags:this.tags,selected:this.selected},bubbles:!0,composed:!0}))}updated(e){e.has("selected")&&this._updateSelectedSet()}_updateSelectedSet(){this._selectedTagsSet=new Set(this.selected)}_handleTagClick(e,t,a){if(e.disabled||!e.clickable&&!this.enable_selection)return;const r=e.id??e.value??e.label;if(this.enable_selection){let n;if(this.multiselect){const d=new Set(this.selected);d.has(r)?d.delete(r):d.add(r),n=Array.from(d)}else n=this._selectedTagsSet.has(r)?[]:[r];this.selected=n,this._updateSelectedSet()}const l=new CustomEvent("awTagClick",{detail:{tag:e,index:t,selected:this.selected,isSelected:this._selectedTagsSet.has(r),originalEvent:a},bubbles:!0,composed:!0});this.dispatchEvent(l)}_handleTagKeyPress(e,t,a){(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),this._handleTagClick(e,t,a))}_handleTagRemove(e,t,a){if(a.stopPropagation(),e.disabled)return;const r=new CustomEvent("awTagRemove",{detail:{tag:e,index:t,originalEvent:a},bubbles:!0,composed:!0});this.dispatchEvent(r)}_renderTag(e,t){const a=e.id??e.value??e.label,r=this._selectedTagsSet.has(a),l=e.clickable!==!1&&(this.enable_selection||e.clickable===!0),n=e.variant||this.variant,d=e.size||this.size,be=e.color||this.color,pe=["tag",`tag--${n}`,`tag--${d}`,`tag--${be}`,l?"tag--clickable":"",r?"tag--selected":"",e.disabled?"tag--disabled":""].filter(Boolean).join(" ");return g`
      <span
        class=${pe}
        tabindex=${l&&!e.disabled?0:-1}
        role=${l?"button":"presentation"}
        aria-pressed=${this.enable_selection?r.toString():void 0}
        aria-disabled=${e.disabled?"true":"false"}
        aria-label=${`Tag: ${e.label}${e.count?` (${e.count})`:""}`}
        @click=${m=>this._handleTagClick(e,t,m)}
        @keydown=${m=>this._handleTagKeyPress(e,t,m)}
        data-tag-id=${a}
      >
        <slot name="tag-${t}">
          ${e.icon?g`
            <span class="tag-icon">${e.icon}</span>
          `:""}
          
          <span class="tag-label">${e.label}</span>
          
          ${e.count!==void 0?g`
            <span class="tag-count">${e.count}</span>
          `:""}
          
          ${e.removable&&!e.disabled?g`
            <button
              class="tag-remove"
              type="button"
              aria-label="Remove ${e.label}"
              @click=${m=>this._handleTagRemove(e,t,m)}
            >
              ×
            </button>
          `:""}
        </slot>
      </span>
    `}render(){const e=["tags-container",this.custom_class].filter(Boolean).join(" ");let t=this.tags,a=!1;this.max_visible>0&&this.tags.length>this.max_visible&&(t=this.tags.slice(0,this.max_visible),a=!0);const r=this.tags.length-this.max_visible;return g`
      <div class=${e} role=${this.enable_selection?"group":"presentation"}>
        <slot name="before"></slot>
        
        <slot>
          ${t.map((l,n)=>this._renderTag(l,n))}
        </slot>
        
        ${a?g`
          <span class="tag tag--neutral tag--${this.size} tag--${this.variant}">
            ${this.more_text.replace("{count}",r.toString())}
          </span>
        `:""}
        
        <slot name="after"></slot>
      </div>
    `}};i.styles=ve`
    :host {
      --aw-tags-primary: var(--aw-color-primary, #007bff);
      --aw-tags-secondary: var(--aw-color-secondary, #6c757d);
      --aw-tags-success: var(--aw-color-success, #28a745);
      --aw-tags-warning: var(--aw-color-warning, #ffc107);
      --aw-tags-danger: var(--aw-color-danger, #dc3545);
      --aw-tags-info: var(--aw-color-info, #17a2b8);
      --aw-tags-neutral: var(--aw-color-neutral, #f8f9fa);
      --aw-tags-text: var(--aw-color-text, #333);
      --aw-tags-text-light: var(--aw-color-text-light, #666);
      --aw-tags-text-inverse: var(--aw-color-text-inverse, #fff);
      --aw-tags-border: var(--aw-color-border, #e5e5e5);
      --aw-tags-radius: var(--aw-border-radius-sm, 4px);
      --aw-tags-gap: var(--aw-spacing-xs, 0.25rem);
      
      display: block;
      width: 100%;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--aw-tags-gap);
      position: relative;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-family: inherit;
      font-weight: 500;
      border-radius: var(--aw-tags-radius);
      border: 1px solid transparent;
      cursor: default;
      transition: all 0.2s ease;
      position: relative;
      text-decoration: none;
      white-space: nowrap;
      user-select: none;
    }

    .tag--clickable {
      cursor: pointer;
    }

    .tag--clickable:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tag--clickable:focus {
      outline: 2px solid var(--aw-tags-primary);
      outline-offset: 2px;
    }

    .tag--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    .tag--selected {
      position: relative;
    }

    .tag--selected::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid currentColor;
      border-radius: inherit;
      pointer-events: none;
    }

    /* Size variants */
    .tag--xs {
      padding: 0.125rem 0.375rem;
      font-size: 0.625rem;
      line-height: 1.2;
    }

    .tag--sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      line-height: 1.3;
    }

    .tag--md {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .tag--lg {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      line-height: 1.5;
    }

    /* Variant styles */
    .tag--default {
      background: transparent;
      color: var(--aw-tags-text-light);
      border-color: transparent;
    }

    .tag--outlined {
      background: transparent;
      border-color: var(--aw-tags-border);
    }

    .tag--filled {
      border-color: transparent;
    }

    .tag--pill {
      border-radius: 50px;
      border-color: transparent;
    }

    .tag--minimal {
      background: transparent;
      border: none;
      padding-left: 0;
      padding-right: 0;
    }

    /* Color variants */
    .tag--primary.tag--outlined,
    .tag--primary.tag--default {
      color: var(--aw-tags-primary);
      border-color: var(--aw-tags-primary);
    }

    .tag--primary.tag--filled,
    .tag--primary.tag--pill {
      background: var(--aw-tags-primary);
      color: var(--aw-tags-text-inverse);
    }

    .tag--secondary.tag--outlined,
    .tag--secondary.tag--default {
      color: var(--aw-tags-secondary);
      border-color: var(--aw-tags-secondary);
    }

    .tag--secondary.tag--filled,
    .tag--secondary.tag--pill {
      background: var(--aw-tags-secondary);
      color: var(--aw-tags-text-inverse);
    }

    .tag--success.tag--outlined,
    .tag--success.tag--default {
      color: var(--aw-tags-success);
      border-color: var(--aw-tags-success);
    }

    .tag--success.tag--filled,
    .tag--success.tag--pill {
      background: var(--aw-tags-success);
      color: var(--aw-tags-text-inverse);
    }

    .tag--warning.tag--outlined,
    .tag--warning.tag--default {
      color: var(--aw-tags-warning);
      border-color: var(--aw-tags-warning);
    }

    .tag--warning.tag--filled,
    .tag--warning.tag--pill {
      background: var(--aw-tags-warning);
      color: var(--aw-tags-text);
    }

    .tag--danger.tag--outlined,
    .tag--danger.tag--default {
      color: var(--aw-tags-danger);
      border-color: var(--aw-tags-danger);
    }

    .tag--danger.tag--filled,
    .tag--danger.tag--pill {
      background: var(--aw-tags-danger);
      color: var(--aw-tags-text-inverse);
    }

    .tag--info.tag--outlined,
    .tag--info.tag--default {
      color: var(--aw-tags-info);
      border-color: var(--aw-tags-info);
    }

    .tag--info.tag--filled,
    .tag--info.tag--pill {
      background: var(--aw-tags-info);
      color: var(--aw-tags-text-inverse);
    }

    .tag--neutral.tag--outlined,
    .tag--neutral.tag--default {
      color: var(--aw-tags-text);
      border-color: var(--aw-tags-border);
    }

    .tag--neutral.tag--filled,
    .tag--neutral.tag--pill {
      background: var(--aw-tags-neutral);
      color: var(--aw-tags-text);
    }

    .tag-icon {
      flex-shrink: 0;
    }

    .tag-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tag-count {
      opacity: 0.8;
      font-size: 0.85em;
    }

    .tag-count::before {
      content: '(';
    }

    .tag-count::after {
      content: ')';
    }

    .tag-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.1);
      color: inherit;
      border: none;
      cursor: pointer;
      font-size: 0.8em;
      margin-left: 0.25em;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
    }

    .tag-remove:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .tag-remove:focus {
      outline: 1px solid currentColor;
      outline-offset: 1px;
    }

    /* Selection indicator */
    .selection-indicator {
      position: absolute;
      border-radius: inherit;
      pointer-events: none;
      z-index: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid var(--aw-tags-primary);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .tags-container {
        gap: calc(var(--aw-tags-gap) * 0.75);
      }

      .tag--lg {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tag,
      .tag-remove,
      .selection-indicator {
        transition: none;
      }

      .tag--clickable:hover {
        transform: none;
      }
    }

    /* High contrast */
    @media (prefers-contrast: high) {
      .tag {
        border-width: 2px;
      }

      .tag--filled {
        border: 2px solid currentColor;
      }
    }
  `;o([c({type:Array})],i.prototype,"tags",2);o([c({type:String})],i.prototype,"variant",2);o([c({type:String})],i.prototype,"size",2);o([c({type:String})],i.prototype,"color",2);o([c({type:Boolean})],i.prototype,"enable_selection",2);o([c({type:Boolean})],i.prototype,"multiselect",2);o([c({type:Array})],i.prototype,"selected",2);o([c({type:Boolean})],i.prototype,"animated_indicator",2);o([c({type:Number})],i.prototype,"max_visible",2);o([c({type:String})],i.prototype,"more_text",2);o([c({type:String})],i.prototype,"custom_class",2);i=o([we("aw-block-tags")],i);const ze={title:"Components/Blocks/BlockTags",component:"aw-block-tags",parameters:{layout:"padded",docs:{description:{component:"A flexible tags block component for displaying and managing collections of tags with filtering capabilities."}}},argTypes:{variant:{control:"select",options:["default","outlined","filled","pill","minimal"],description:"Default variant for all tags"},size:{control:"select",options:["xs","sm","md","lg"],description:"Default size for all tags"},color:{control:"select",options:["primary","secondary","success","warning","danger","info","neutral"],description:"Default color for all tags"},enable_selection:{control:"boolean",description:"Enable tag selection"},multiselect:{control:"boolean",description:"Allow multiple tag selection"},animated_indicator:{control:"boolean",description:"Enable animated selection indicator"},max_visible:{control:"number",description:"Maximum number of tags to display (0 = no limit)"},more_text:{control:"text",description:"Text to show when tags are truncated"},custom_class:{control:"text",description:"Custom CSS class"}}},s=[{label:"JavaScript",clickable:!0},{label:"TypeScript",clickable:!0},{label:"React",clickable:!0},{label:"Vue",clickable:!0},{label:"Angular",clickable:!0},{label:"Svelte",clickable:!0}],me=[{label:"Frontend",count:45,clickable:!0},{label:"Backend",count:32,clickable:!0},{label:"DevOps",count:18,clickable:!0},{label:"Mobile",count:24,clickable:!0},{label:"AI/ML",count:12,clickable:!0},{label:"Design",count:38,clickable:!0}],ue=[{label:"Critical",color:"danger",clickable:!0},{label:"Important",color:"warning",clickable:!0},{label:"Completed",color:"success",clickable:!0},{label:"In Progress",color:"info",clickable:!0},{label:"On Hold",color:"secondary",clickable:!0},{label:"New",color:"primary",clickable:!0}],ke=[{label:"HTML",icon:"🏷️",color:"primary",variant:"filled",clickable:!0},{label:"CSS",icon:"🎨",color:"info",variant:"outlined",clickable:!0},{label:"JavaScript",icon:"⚡",color:"warning",variant:"pill",clickable:!0},{label:"Python",icon:"🐍",color:"success",variant:"filled",clickable:!0},{label:"Archived",color:"secondary",variant:"minimal",disabled:!0},{label:"Removable",color:"danger",removable:!0,clickable:!0}],$=[{id:"frontend",label:"Frontend",count:45,color:"primary",clickable:!0},{id:"backend",label:"Backend",count:32,color:"info",clickable:!0},{id:"devops",label:"DevOps",count:18,color:"success",clickable:!0},{id:"mobile",label:"Mobile",count:24,color:"warning",clickable:!0},{id:"design",label:"UI/UX Design",count:38,color:"secondary",clickable:!0},{id:"database",label:"Database",count:29,color:"danger",clickable:!0}],u={args:{tags:s,variant:"default",size:"md",color:"neutral",enable_selection:!1,multiselect:!0,animated_indicator:!0,max_visible:0,more_text:"+{count} more"}},b={args:{tags:me,variant:"outlined",size:"md",color:"primary",enable_selection:!0,multiselect:!0}},p={args:{tags:ue,variant:"filled",size:"md",enable_selection:!0,multiselect:!0}},v={args:{tags:ke,size:"md",enable_selection:!0,multiselect:!0}},h={args:{tags:$,variant:"outlined",size:"md",color:"primary",enable_selection:!0,multiselect:!1,selected:["frontend"]}},w={args:{tags:$,variant:"outlined",size:"md",color:"primary",enable_selection:!0,multiselect:!0,selected:["frontend","backend","mobile"]}},f={args:{tags:s,variant:"pill",size:"md",color:"primary",enable_selection:!0,multiselect:!0}},y={args:{tags:s,variant:"minimal",size:"md",color:"primary",enable_selection:!0,multiselect:!0}},k={args:{tags:[...s,...me,...ue].map(e=>({...e,clickable:!0})),variant:"outlined",size:"md",color:"neutral",enable_selection:!0,multiselect:!0,max_visible:6,more_text:"+{count} more tags"}},_={render:()=>g`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Extra Small (xs)</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="outlined"
          size="xs"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Small (sm)</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="outlined"
          size="sm"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Medium (md) - Default</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="outlined"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Large (lg)</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="outlined"
          size="lg"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
    </div>
  `},x={render:()=>g`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Default</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="default"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Outlined</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="outlined"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Filled</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="filled"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Pill</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="pill"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Minimal</h4>
        <aw-block-tags
          .tags=${s.slice(0,4)}
          variant="minimal"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
    </div>
  `},z={render:()=>g`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Primary</h4>
        <aw-block-tags
          .tags=${[{label:"Primary",clickable:!0}]}
          variant="filled"
          size="md"
          color="primary">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Secondary</h4>
        <aw-block-tags
          .tags=${[{label:"Secondary",clickable:!0}]}
          variant="filled"
          size="md"
          color="secondary">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Success</h4>
        <aw-block-tags
          .tags=${[{label:"Success",clickable:!0}]}
          variant="filled"
          size="md"
          color="success">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Warning</h4>
        <aw-block-tags
          .tags=${[{label:"Warning",clickable:!0}]}
          variant="filled"
          size="md"
          color="warning">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Danger</h4>
        <aw-block-tags
          .tags=${[{label:"Danger",clickable:!0}]}
          variant="filled"
          size="md"
          color="danger">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Info</h4>
        <aw-block-tags
          .tags=${[{label:"Info",clickable:!0}]}
          variant="filled"
          size="md"
          color="info">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Neutral</h4>
        <aw-block-tags
          .tags=${[{label:"Neutral",clickable:!0}]}
          variant="filled"
          size="md"
          color="neutral">
        </aw-block-tags>
      </div>
    </div>
  `},S={args:{tags:$,variant:"outlined",size:"md",color:"primary",enable_selection:!0,multiselect:!0,animated_indicator:!0},parameters:{docs:{description:{story:"Click on tags to see selection behavior and interaction events in the Actions panel."}}}};var T,C,D;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(D=(C=u.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var M,A,P;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    tags: tagsWithCounts,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true
  }
}`,...(P=(A=b.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var E,I,V;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    tags: coloredTags,
    variant: 'filled',
    size: 'md',
    enable_selection: true,
    multiselect: true
  }
}`,...(V=(I=p.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var W,B,O;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    tags: mixedTags,
    size: 'md',
    enable_selection: true,
    multiselect: true
  }
}`,...(O=(B=v.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var R,N,j;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    tags: categoryTags,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: false,
    selected: ['frontend']
  }
}`,...(j=(N=h.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var F,L,H;w.parameters={...w.parameters,docs:{...(F=w.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    tags: categoryTags,
    variant: 'outlined',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true,
    selected: ['frontend', 'backend', 'mobile']
  }
}`,...(H=(L=w.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var J,K,U;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    tags: basicTags,
    variant: 'pill',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true
  }
}`,...(U=(K=f.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var X,Y,q;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    tags: basicTags,
    variant: 'minimal',
    size: 'md',
    color: 'primary',
    enable_selection: true,
    multiselect: true
  }
}`,...(q=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var G,Q,Z;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(Z=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,ae,te;_.parameters={..._.parameters,docs:{...(ee=_.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Extra Small (xs)</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="outlined"
          size="xs"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Small (sm)</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="outlined"
          size="sm"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Medium (md) - Default</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="outlined"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Large (lg)</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="outlined"
          size="lg"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
    </div>
  \`
}`,...(te=(ae=_.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,le,ie;x.parameters={...x.parameters,docs:{...(re=x.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Default</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="default"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Outlined</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="outlined"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Filled</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="filled"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Pill</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="pill"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Minimal</h4>
        <aw-block-tags
          .tags=\${basicTags.slice(0, 4)}
          variant="minimal"
          size="md"
          color="primary"
          enable_selection="true">
        </aw-block-tags>
      </div>
    </div>
  \`
}`,...(ie=(le=x.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var se,oe,ne;z.parameters={...z.parameters,docs:{...(se=z.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Primary</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Primary',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="primary">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Secondary</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Secondary',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="secondary">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Success</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Success',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="success">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Warning</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Warning',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="warning">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Danger</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Danger',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="danger">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Info</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Info',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="info">
        </aw-block-tags>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem;">Neutral</h4>
        <aw-block-tags
          .tags=\${[{
    label: 'Neutral',
    clickable: true
  }]}
          variant="filled"
          size="md"
          color="neutral">
        </aw-block-tags>
      </div>
    </div>
  \`
}`,...(ne=(oe=z.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var ce,de,ge;S.parameters={...S.parameters,docs:{...(ce=S.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(ge=(de=S.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};const Se=["Default","WithCounts","ColoredTags","MixedVariants","SingleSelection","MultiSelection","PillVariant","MinimalVariant","WithMaxVisible","AllSizes","AllVariants","AllColors","Interactive"];export{z as AllColors,_ as AllSizes,x as AllVariants,p as ColoredTags,u as Default,S as Interactive,y as MinimalVariant,v as MixedVariants,w as MultiSelection,f as PillVariant,h as SingleSelection,b as WithCounts,k as WithMaxVisible,Se as __namedExportsOrder,ze as default};
