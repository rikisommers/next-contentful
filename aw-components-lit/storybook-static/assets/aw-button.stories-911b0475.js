import{i as U,a as q,x as i}from"./lit-element-b4b0194a.js";import{n,t as G}from"./property-64877f55.js";import{e as J}from"./class-map-1caf54e8.js";import"./directive-12249aa5.js";var Q=Object.defineProperty,Y=Object.getOwnPropertyDescriptor,r=(t,e,m,p)=>{for(var o=p>1?void 0:p?Y(e,m):e,w=t.length-1,v;w>=0;w--)(v=t[w])&&(o=(p?v(e,m,o):v(o))||o);return p&&o&&Q(e,m,o),o};let a=class extends q{constructor(){super(...arguments),this.label_text="Button",this.aria_label="",this.aria_controls="",this.aria_expanded=null,this.size="md",this.variant="primary",this.disabled=!1,this.button_type="button",this.handleClick=t=>{if(!this.disabled){const e=new CustomEvent("aw-button-click",{detail:{originalEvent:t,buttonLabel:this.label_text},bubbles:!0,composed:!0});this.dispatchEvent(e)}}}render(){return i`
      <button
        type=${this.button_type}
        class=${J({"aw-button":!0,[`aw-button--size-${this.size}`]:!0,[`aw-button--variant-${this.variant}`]:!0,"aw-button--state-disabled":this.disabled})}
        ?disabled=${this.disabled}
        aria-label=${this.aria_label||this.label_text}
        aria-controls=${this.aria_controls||""}
        aria-expanded=${this.aria_expanded}
        @click=${this.handleClick}
      >
        ${this.label_text}
      </button>
    `}};a.styles=U`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-button */
    .aw-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--aw-border-radius-md, 0.375rem);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-weight: var(--aw-font-weight-medium, 500);
      cursor: pointer;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      text-decoration: none;
      outline: none;
    }

    /* ITCSS - Components: Pseudo-elements - focus state */
    .aw-button:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-button--size-xs {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-xs, 1rem);
    }

    .aw-button--size-sm {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: var(--aw-line-height-sm, 1.25rem);
    }

    .aw-button--size-md {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
      line-height: var(--aw-line-height-base, 1.5rem);
    }

    .aw-button--size-lg {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-lg, 1.125rem);
      line-height: var(--aw-line-height-lg, 1.75rem);
    }

    .aw-button--size-xl {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-2xl, 1.5rem);
      font-size: var(--aw-font-size-xl, 1.25rem);
      line-height: var(--aw-line-height-xl, 1.75rem);
    }

    /* ITCSS - Components: Variant modifiers with BEM */
    .aw-button--variant-primary {
      background-color: var(--aw-color-primary-600, #2563eb);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-primary:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-button--variant-primary:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-800, #1e40af);
    }

    .aw-button--variant-secondary {
      background-color: var(--aw-color-neutral-200, #e5e5e5);
      color: var(--aw-color-neutral-800, #262626);
    }

    .aw-button--variant-secondary:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-neutral-300, #d4d4d4);
    }

    .aw-button--variant-secondary:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-neutral-400, #a3a3a3);
    }

    .aw-button--variant-tertiary {
      background-color: transparent;
      color: var(--aw-color-primary-600, #2563eb);
      border: 1px solid var(--aw-color-primary-600, #2563eb);
    }

    .aw-button--variant-tertiary:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-50, #eff6ff);
    }

    .aw-button--variant-tertiary:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-primary-100, #dbeafe);
    }

    .aw-button--variant-danger {
      background-color: var(--aw-color-danger-600, #dc2626);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-danger:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-danger-700, #b91c1c);
    }

    .aw-button--variant-danger:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-danger-800, #991b1b);
    }

    .aw-button--variant-warning {
      background-color: var(--aw-color-warning-600, #d97706);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-warning:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-warning-700, #b45309);
    }

    .aw-button--variant-warning:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-warning-800, #92400e);
    }

    .aw-button--variant-success {
      background-color: var(--aw-color-success-600, #059669);
      color: var(--aw-color-neutral-white, #ffffff);
    }

    .aw-button--variant-success:hover:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-success-700, #047857);
    }

    .aw-button--variant-success:active:not(.aw-button--state-disabled) {
      background-color: var(--aw-color-success-800, #065f46);
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-button--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }
  `;r([n()],a.prototype,"label_text",2);r([n()],a.prototype,"aria_label",2);r([n()],a.prototype,"aria_controls",2);r([n({type:Boolean})],a.prototype,"aria_expanded",2);r([n()],a.prototype,"size",2);r([n()],a.prototype,"variant",2);r([n({type:Boolean})],a.prototype,"disabled",2);r([n()],a.prototype,"button_type",2);a=r([G("aw-button")],a);const rt={title:"Components/Atoms/Button",component:"aw-button",parameters:{layout:"centered",docs:{description:{component:`
A versatile button component with multiple variants and sizes.

## Features
- Multiple size options (xs, sm, md, lg, xl)
- Various color variants (primary, secondary, tertiary, danger, warning, success)  
- Disabled state support
- Custom click event handling
- Accessibility compliant

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-button label_text="Click me" variant="primary" size="md"></aw-button>
\`\`\`
        `}}},argTypes:{label_text:{control:"text",description:"The text content displayed in the button",table:{type:{summary:"string"},defaultValue:{summary:"Button"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Controls the button size using predefined size tokens",table:{type:{summary:"xs | sm | md | lg | xl"},defaultValue:{summary:"md"}}},variant:{control:"select",options:["primary","secondary","tertiary","danger","warning","success"],description:"Controls the button appearance using predefined color variants",table:{type:{summary:"primary | secondary | tertiary | danger | warning | success"},defaultValue:{summary:"primary"}}},disabled:{control:"boolean",description:"Whether the button is disabled and cannot be interacted with",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},button_type:{control:"select",options:["button","submit","reset"],description:"The HTML button type attribute",table:{type:{summary:"button | submit | reset"},defaultValue:{summary:"button"}}},aria_label:{control:"text",description:"Accessible label for screen readers when button text is not descriptive enough",table:{type:{summary:"string"},defaultValue:{summary:""}}},aria_controls:{control:"text",description:"Describes the element controlled by this button for screen readers",table:{type:{summary:"string"},defaultValue:{summary:""}}},aria_expanded:{control:"boolean",description:"Indicates if the button controls an expanded element",table:{type:{summary:"boolean | null"},defaultValue:{summary:"null"}}}},args:{label_text:"Button",size:"md",variant:"primary",disabled:!1,button_type:"button",aria_label:"",aria_controls:"",aria_expanded:null}},s={render:t=>i`
    <aw-button 
      label_text=${t.label_text}
      size=${t.size}
      variant=${t.variant}
      ?disabled=${t.disabled}
      button_type=${t.button_type}
      aria_label=${t.aria_label}
      aria_controls=${t.aria_controls}
      aria_expanded=${t.aria_expanded}
      @aw-button-click=${e=>{console.log("Button clicked:",e.detail)}}>
    </aw-button>
  `},l={render:()=>i`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <aw-button label_text="XS" size="xs"></aw-button>
      <aw-button label_text="Small" size="sm"></aw-button>
      <aw-button label_text="Medium" size="md"></aw-button>
      <aw-button label_text="Large" size="lg"></aw-button>
      <aw-button label_text="XL" size="xl"></aw-button>
    </div>
  `,parameters:{docs:{description:{story:"Button component supports 5 different sizes from extra small to extra large."}}}},d={render:()=>i`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <aw-button label_text="Primary" variant="primary"></aw-button>
      <aw-button label_text="Secondary" variant="secondary"></aw-button>
      <aw-button label_text="Tertiary" variant="tertiary"></aw-button>
      <aw-button label_text="Danger" variant="danger"></aw-button>
      <aw-button label_text="Warning" variant="warning"></aw-button>
      <aw-button label_text="Success" variant="success"></aw-button>
    </div>
  `,parameters:{docs:{description:{story:"Button component supports 6 different color variants for various use cases."}}}},u={render:()=>i`
    <div style="display: flex; gap: 1rem;">
      <aw-button label_text="Disabled Primary" variant="primary" disabled></aw-button>
      <aw-button label_text="Disabled Secondary" variant="secondary" disabled></aw-button>
      <aw-button label_text="Disabled Danger" variant="danger" disabled></aw-button>
    </div>
  `,parameters:{docs:{description:{story:"Disabled buttons are not interactive and have reduced opacity."}}}},b={render:()=>i`
    <form style="display: flex; gap: 1rem;">
      <aw-button label_text="Regular Button" button_type="button"></aw-button>
      <aw-button label_text="Submit Form" button_type="submit" variant="primary"></aw-button>
      <aw-button label_text="Reset Form" button_type="reset" variant="secondary"></aw-button>
    </form>
  `,parameters:{docs:{description:{story:"Button component supports different HTML button types for form interactions."}}}},c={render:()=>i`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>ARIA Labels for Context</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <aw-button 
            label_text="×" 
            aria_label="Close dialog"
            variant="tertiary"
            size="sm">
          </aw-button>
          <aw-button 
            label_text="🔍" 
            aria_label="Search products"
            variant="secondary">
          </aw-button>
          <aw-button 
            label_text="⚙️" 
            aria_label="Open settings menu"
            variant="tertiary">
          </aw-button>
        </div>
      </div>

      <div>
        <h3>Menu Control Button</h3>
        <aw-button 
          label_text="Options Menu"
          aria_controls="options-menu"
          aria_expanded="false"
          variant="secondary"
          @aw-button-click=${()=>{const t=document.querySelector('aw-button[aria_controls="options-menu"]'),e=(t==null?void 0:t.getAttribute("aria_expanded"))==="true";t==null||t.setAttribute("aria_expanded",(!e).toString())}}>
        </aw-button>
        <div id="options-menu" style="margin-top: 0.5rem; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
          <p>Menu content would appear here</p>
        </div>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.875rem;">
          Use Tab to navigate, Enter/Space to activate, and focus indicators are visible.
        </p>
        <div style="display: flex; gap: 1rem;">
          <aw-button label_text="First" variant="primary"></aw-button>
          <aw-button label_text="Second" variant="secondary"></aw-button>
          <aw-button label_text="Third" variant="tertiary"></aw-button>
          <aw-button label_text="Fourth" disabled variant="primary"></aw-button>
        </div>
      </div>
    </div>
  `,parameters:{docs:{description:{story:`
This story demonstrates the accessibility features of the button component:

- **ARIA Labels**: Provide descriptive labels for screen readers when button text isn't sufficient
- **ARIA Controls**: Link buttons to elements they control (like menus or dialogs)  
- **ARIA Expanded**: Indicate the state of collapsible content
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper semantic markup and ARIA attributes

All buttons meet WCAG 2.1 AA guidelines for accessibility.
        `}}}};var y,f,g,x,_;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => html\`
    <aw-button 
      label_text=\${args.label_text}
      size=\${args.size}
      variant=\${args.variant}
      ?disabled=\${args.disabled}
      button_type=\${args.button_type}
      aria_label=\${args.aria_label}
      aria_controls=\${args.aria_controls}
      aria_expanded=\${args.aria_expanded}
      @aw-button-click=\${(e: CustomEvent) => {
    console.log('Button clicked:', e.detail);
  }}>
    </aw-button>
  \`
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source},description:{story:"The default button with standard settings",...(_=(x=s.parameters)==null?void 0:x.docs)==null?void 0:_.description}}};var h,z,S,A,k;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <aw-button label_text="XS" size="xs"></aw-button>
      <aw-button label_text="Small" size="sm"></aw-button>
      <aw-button label_text="Medium" size="md"></aw-button>
      <aw-button label_text="Large" size="lg"></aw-button>
      <aw-button label_text="XL" size="xl"></aw-button>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button component supports 5 different sizes from extra small to extra large.'
      }
    }
  }
}`,...(S=(z=l.parameters)==null?void 0:z.docs)==null?void 0:S.source},description:{story:"Examples of all available button sizes",...(k=(A=l.parameters)==null?void 0:A.docs)==null?void 0:k.description}}};var $,C,B,T,D;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <aw-button label_text="Primary" variant="primary"></aw-button>
      <aw-button label_text="Secondary" variant="secondary"></aw-button>
      <aw-button label_text="Tertiary" variant="tertiary"></aw-button>
      <aw-button label_text="Danger" variant="danger"></aw-button>
      <aw-button label_text="Warning" variant="warning"></aw-button>
      <aw-button label_text="Success" variant="success"></aw-button>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button component supports 6 different color variants for various use cases.'
      }
    }
  }
}`,...(B=(C=d.parameters)==null?void 0:C.docs)==null?void 0:B.source},description:{story:"Examples of all available button variants",...(D=(T=d.parameters)==null?void 0:T.docs)==null?void 0:D.description}}};var I,E,R,L,M;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem;">
      <aw-button label_text="Disabled Primary" variant="primary" disabled></aw-button>
      <aw-button label_text="Disabled Secondary" variant="secondary" disabled></aw-button>
      <aw-button label_text="Disabled Danger" variant="danger" disabled></aw-button>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons are not interactive and have reduced opacity.'
      }
    }
  }
}`,...(R=(E=u.parameters)==null?void 0:E.docs)==null?void 0:R.source},description:{story:"Examples of disabled buttons",...(M=(L=u.parameters)==null?void 0:L.docs)==null?void 0:M.description}}};var P,V,F,O,W;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => html\`
    <form style="display: flex; gap: 1rem;">
      <aw-button label_text="Regular Button" button_type="button"></aw-button>
      <aw-button label_text="Submit Form" button_type="submit" variant="primary"></aw-button>
      <aw-button label_text="Reset Form" button_type="reset" variant="secondary"></aw-button>
    </form>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button component supports different HTML button types for form interactions.'
      }
    }
  }
}`,...(F=(V=b.parameters)==null?void 0:V.docs)==null?void 0:F.source},description:{story:"Examples of different button types for forms",...(W=(O=b.parameters)==null?void 0:O.docs)==null?void 0:W.description}}};var H,K,N,X,j;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>ARIA Labels for Context</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <aw-button 
            label_text="×" 
            aria_label="Close dialog"
            variant="tertiary"
            size="sm">
          </aw-button>
          <aw-button 
            label_text="🔍" 
            aria_label="Search products"
            variant="secondary">
          </aw-button>
          <aw-button 
            label_text="⚙️" 
            aria_label="Open settings menu"
            variant="tertiary">
          </aw-button>
        </div>
      </div>

      <div>
        <h3>Menu Control Button</h3>
        <aw-button 
          label_text="Options Menu"
          aria_controls="options-menu"
          aria_expanded="false"
          variant="secondary"
          @aw-button-click=\${() => {
    const button = document.querySelector('aw-button[aria_controls="options-menu"]');
    const expanded = button?.getAttribute('aria_expanded') === 'true';
    button?.setAttribute('aria_expanded', (!expanded).toString());
  }}>
        </aw-button>
        <div id="options-menu" style="margin-top: 0.5rem; padding: 1rem; border: 1px solid #ccc; border-radius: 4px;">
          <p>Menu content would appear here</p>
        </div>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.875rem;">
          Use Tab to navigate, Enter/Space to activate, and focus indicators are visible.
        </p>
        <div style="display: flex; gap: 1rem;">
          <aw-button label_text="First" variant="primary"></aw-button>
          <aw-button label_text="Second" variant="secondary"></aw-button>
          <aw-button label_text="Third" variant="tertiary"></aw-button>
          <aw-button label_text="Fourth" disabled variant="primary"></aw-button>
        </div>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: \`
This story demonstrates the accessibility features of the button component:

- **ARIA Labels**: Provide descriptive labels for screen readers when button text isn't sufficient
- **ARIA Controls**: Link buttons to elements they control (like menus or dialogs)  
- **ARIA Expanded**: Indicate the state of collapsible content
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader Support**: Proper semantic markup and ARIA attributes

All buttons meet WCAG 2.1 AA guidelines for accessibility.
        \`
      }
    }
  }
}`,...(N=(K=c.parameters)==null?void 0:K.docs)==null?void 0:N.source},description:{story:"Examples demonstrating accessibility features",...(j=(X=c.parameters)==null?void 0:X.docs)==null?void 0:j.description}}};const nt=["Default","Sizes","Variants","Disabled","ButtonTypes","Accessibility"];export{c as Accessibility,b as ButtonTypes,s as Default,u as Disabled,l as Sizes,d as Variants,nt as __namedExportsOrder,rt as default};
