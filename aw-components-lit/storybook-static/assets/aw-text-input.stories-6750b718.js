import{i as G,a as H,x as s}from"./lit-element-b4b0194a.js";import{n as i,t as J}from"./property-64877f55.js";import{r as Q}from"./state-66c4e041.js";import{e as X}from"./class-map-1caf54e8.js";import"./directive-12249aa5.js";var Y=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,r=(e,a,n,x)=>{for(var l=x>1?void 0:x?Z(a,n):a,h=e.length-1,w;h>=0;h--)(w=e[h])&&(l=(x?w(a,n,l):w(l))||l);return x&&l&&Y(a,n,l),l};let t=class extends H{constructor(){super(...arguments),this.label_text="",this.input_value="",this.placeholder="",this.input_type="text",this.size="md",this.disabled=!1,this.required=!1,this.readonly=!1,this.has_error=!1,this.error_message="",this.input_name="",this.input_id="",this.aria_describedby="",this.role="",this.aria_invalid=!1,this._internalValue="",this.handleInput=e=>{const a=e.target;this._internalValue=a.value;const n=new CustomEvent("aw-text-input-input",{detail:{value:a.value,originalEvent:e,name:this.input_name},bubbles:!0,composed:!0});this.dispatchEvent(n)},this.handleChange=e=>{const a=e.target,n=new CustomEvent("aw-text-input-change",{detail:{value:a.value,originalEvent:e,name:this.input_name},bubbles:!0,composed:!0});this.dispatchEvent(n)},this.handleFocus=e=>{const a=new CustomEvent("aw-text-input-focus",{detail:{originalEvent:e,name:this.input_name},bubbles:!0,composed:!0});this.dispatchEvent(a)},this.handleBlur=e=>{const a=new CustomEvent("aw-text-input-blur",{detail:{originalEvent:e,name:this.input_name},bubbles:!0,composed:!0});this.dispatchEvent(a)}}connectedCallback(){super.connectedCallback(),this._internalValue=this.input_value}updated(e){e.has("input_value")&&(this._internalValue=this.input_value)}render(){const e=this.input_id||`aw-text-input-${Math.random().toString(36).substr(2,9)}`,a=`${e}-error`,n=this.has_error||this.aria_invalid;return s`
      <div
        class=${X({"aw-text-input":!0,[`aw-text-input--size-${this.size}`]:!0,"aw-text-input--state-error":n})}
      >
        <div class="aw-text-input__wrapper">
          ${this.label_text?s`
            <label for=${e} class="aw-text-input__label">
              ${this.label_text}
              ${this.required?s`<span aria-hidden="true">*</span>`:""}
            </label>
          `:""}
          <input
            id=${e}
            name=${this.input_name}
            type=${this.input_type}
            class="aw-text-input__field"
            .value=${this._internalValue}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            aria-invalid=${n?"true":"false"}
            aria-describedby=${this.aria_describedby||(n&&this.error_message?a:"")}
            role=${this.role||""}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
        </div>
        ${n&&this.error_message?s`
          <div id=${a} class="aw-text-input__error" role="alert" aria-live="polite">
            ${this.error_message}
          </div>
        `:""}
      </div>
    `}};t.styles=G`
    :host {
      display: block;
    }

    /* ITCSS - Components: Block - aw-text-input */
    .aw-text-input {
      display: flex;
      flex-direction: column;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-text-input__wrapper {
      display: flex;
      gap: var(--aw-spacing-sm, 0.5rem);
      justify-content: space-between;
      align-items: center;
    }

    .aw-text-input__label {
      flex-grow: 1;
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-neutral-700, #374151);
      font-weight: var(--aw-font-weight-medium, 500);
    }

    .aw-text-input__field {
      padding: var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-sm, 0.25rem);
      border: 1px solid var(--aw-color-neutral-300, #d1d5db);
      font-family: var(--aw-font-family-sans, system-ui, -apple-system, sans-serif);
      font-size: var(--aw-font-size-sm, 0.875rem);
      color: var(--aw-color-neutral-900, #111827);
      background-color: var(--aw-color-neutral-white, #ffffff);
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      outline: none;
    }

    .aw-text-input__field:focus {
      border-color: var(--aw-color-primary-500, #3b82f6);
      box-shadow: 0 0 0 1px var(--aw-color-primary-500, #3b82f6);
    }

    .aw-text-input__field:disabled {
      background-color: var(--aw-color-neutral-100, #f3f4f6);
      color: var(--aw-color-neutral-500, #6b7280);
      cursor: not-allowed;
    }

    .aw-text-input__field:invalid {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-text-input--size-sm .aw-text-input__field {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
    }

    .aw-text-input--size-md .aw-text-input__field {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
    }

    .aw-text-input--size-lg .aw-text-input__field {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-base, 1rem);
    }

    /* ITCSS - State: Error state modifier */
    .aw-text-input--state-error .aw-text-input__field {
      border-color: var(--aw-color-danger-500, #ef4444);
    }

    .aw-text-input--state-error .aw-text-input__field:focus {
      border-color: var(--aw-color-danger-500, #ef4444);
      box-shadow: 0 0 0 1px var(--aw-color-danger-500, #ef4444);
    }

    /* Error message */
    .aw-text-input__error {
      font-size: var(--aw-font-size-xs, 0.75rem);
      color: var(--aw-color-danger-600, #dc2626);
      margin-top: var(--aw-spacing-xs, 0.25rem);
    }
  `;r([i()],t.prototype,"label_text",2);r([i()],t.prototype,"input_value",2);r([i()],t.prototype,"placeholder",2);r([i()],t.prototype,"input_type",2);r([i()],t.prototype,"size",2);r([i({type:Boolean})],t.prototype,"disabled",2);r([i({type:Boolean})],t.prototype,"required",2);r([i({type:Boolean})],t.prototype,"readonly",2);r([i({type:Boolean})],t.prototype,"has_error",2);r([i()],t.prototype,"error_message",2);r([i()],t.prototype,"input_name",2);r([i()],t.prototype,"input_id",2);r([i()],t.prototype,"aria_describedby",2);r([i()],t.prototype,"role",2);r([i({type:Boolean})],t.prototype,"aria_invalid",2);r([Q()],t.prototype,"_internalValue",2);t=r([J("aw-text-input")],t);const ne={title:"Components/Atoms/TextInput",component:"aw-text-input",parameters:{layout:"padded",docs:{description:{component:`
A versatile text input component with full accessibility support.

## Features
- Multiple input types (text, email, password, url, tel, search)
- Size variants (sm, md, lg)  
- Form validation with error states
- Required field indicators
- ARIA support for screen readers
- Live error announcements
- Proper label association

## Accessibility
- WCAG 2.1 AA compliant
- Screen reader optimized
- Keyboard navigation support
- Error state announcements
- Proper focus management

## Usage
\`\`\`html
<aw-text-input 
  label_text="Email Address"
  input_type="email" 
  required="true"
  placeholder="Enter your email">
</aw-text-input>
\`\`\`
        `}}},argTypes:{label_text:{control:"text",description:"Input label text",table:{type:{summary:"string"},defaultValue:{summary:""}}},input_value:{control:"text",description:"Input value",table:{type:{summary:"string"},defaultValue:{summary:""}}},placeholder:{control:"text",description:"Input placeholder text",table:{type:{summary:"string"},defaultValue:{summary:""}}},input_type:{control:"select",options:["text","email","password","url","tel","search"],description:"Input type",table:{type:{summary:"text | email | password | url | tel | search"},defaultValue:{summary:"text"}}},size:{control:"select",options:["sm","md","lg"],description:"Input size variant",table:{type:{summary:"sm | md | lg"},defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Input disabled state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Input required state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readonly:{control:"boolean",description:"Input readonly state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},has_error:{control:"boolean",description:"Error state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},error_message:{control:"text",description:"Error message",table:{type:{summary:"string"},defaultValue:{summary:""}}},aria_describedby:{control:"text",description:"Accessible description for screen readers",table:{type:{summary:"string"},defaultValue:{summary:""}}},aria_invalid:{control:"boolean",description:"ARIA invalid state for form validation",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}},args:{label_text:"Label",input_value:"",placeholder:"",input_type:"text",size:"md",disabled:!1,required:!1,readonly:!1,has_error:!1,error_message:"",aria_describedby:"",aria_invalid:!1}},o={render:e=>s`
    <aw-text-input 
      label_text=${e.label_text}
      input_value=${e.input_value}
      placeholder=${e.placeholder}
      input_type=${e.input_type}
      size=${e.size}
      ?disabled=${e.disabled}
      ?required=${e.required}
      ?readonly=${e.readonly}
      ?has_error=${e.has_error}
      error_message=${e.error_message}
      aria_describedby=${e.aria_describedby}
      ?aria_invalid=${e.aria_invalid}
      @aw-text-input-input=${a=>{console.log("Input changed:",a.detail)}}>
    </aw-text-input>
  `},p={render:()=>s`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <aw-text-input label_text="Text Input" input_type="text" placeholder="Enter text"></aw-text-input>
      <aw-text-input label_text="Email" input_type="email" placeholder="email@example.com"></aw-text-input>
      <aw-text-input label_text="Password" input_type="password" placeholder="Enter password"></aw-text-input>
      <aw-text-input label_text="URL" input_type="url" placeholder="https://example.com"></aw-text-input>
      <aw-text-input label_text="Phone" input_type="tel" placeholder="+1 (555) 123-4567"></aw-text-input>
      <aw-text-input label_text="Search" input_type="search" placeholder="Search..."></aw-text-input>
    </div>
  `,parameters:{docs:{description:{story:"Text input supports multiple HTML5 input types with appropriate validation."}}}},d={render:()=>s`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <aw-text-input label_text="Small Input" size="sm" placeholder="Small size"></aw-text-input>
      <aw-text-input label_text="Medium Input" size="md" placeholder="Medium size"></aw-text-input>
      <aw-text-input label_text="Large Input" size="lg" placeholder="Large size"></aw-text-input>
    </div>
  `,parameters:{docs:{description:{story:"Text input supports three different sizes: small, medium, and large."}}}},u={render:()=>s`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
      <div>
        <h3>Valid State</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email" 
          input_value="user@example.com"
          required>
        </aw-text-input>
      </div>
      
      <div>
        <h3>Required Field</h3>
        <aw-text-input 
          label_text="Full Name" 
          required
          placeholder="Enter your full name">
        </aw-text-input>
      </div>
      
      <div>
        <h3>Error State</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email" 
          input_value="invalid-email"
          has_error
          error_message="Please enter a valid email address"
          required>
        </aw-text-input>
      </div>
      
      <div>
        <h3>Disabled State</h3>
        <aw-text-input 
          label_text="Readonly Field" 
          input_value="Cannot be edited"
          disabled>
        </aw-text-input>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Text input supports validation states with live error announcements for screen readers."}}}},m={render:()=>s`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <div>
        <h3>ARIA Described By</h3>
        <aw-text-input 
          label_text="Password" 
          input_type="password"
          aria_describedby="password-help"
          placeholder="Enter password">
        </aw-text-input>
        <p id="password-help" style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Must be at least 8 characters with uppercase, lowercase, and numbers.
        </p>
      </div>

      <div>
        <h3>Error State with Live Announcements</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email"
          has_error
          aria_invalid="true"
          error_message="This email address is already registered"
          placeholder="Enter your email">
        </aw-text-input>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Error messages are announced to screen readers with role="alert"
        </p>
      </div>

      <div>
        <h3>Required Field Indicators</h3>
        <aw-text-input 
          label_text="Full Name" 
          required
          placeholder="Enter your full name">
        </aw-text-input>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Required fields show asterisk (*) with aria-hidden="true"
        </p>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <aw-text-input label_text="First Field" placeholder="Tab to navigate"></aw-text-input>
          <aw-text-input label_text="Second Field" placeholder="Focus indicators visible"></aw-text-input>
          <aw-text-input label_text="Third Field" placeholder="Screen reader friendly"></aw-text-input>
        </div>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Use Tab to navigate between fields. Focus indicators are clearly visible.
        </p>
      </div>
    </div>
  `,parameters:{docs:{description:{story:`
This story demonstrates the accessibility features of the text input component:

- **ARIA Described By**: Link help text to inputs for screen reader context
- **Live Error Announcements**: Errors are announced immediately with role="alert"
- **Required Field Indicators**: Visual asterisks with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Form Association**: Proper label-input relationship for screen readers
- **Validation States**: ARIA invalid attributes for form validation

All inputs meet WCAG 2.1 AA guidelines for accessibility.
        `}}}},c={render:()=>s`
    <form style="max-width: 500px; display: flex; flex-direction: column; gap: 1rem;">
      <h3>Contact Form</h3>
      
      <aw-text-input 
        label_text="Full Name" 
        input_name="name"
        required
        placeholder="Enter your full name">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Email Address" 
        input_type="email"
        input_name="email"
        required
        placeholder="your@email.com">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Phone Number" 
        input_type="tel"
        input_name="phone"
        placeholder="+1 (555) 123-4567">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Company Website" 
        input_type="url"
        input_name="website"
        placeholder="https://your-company.com">
      </aw-text-input>
      
      <button type="submit" style="margin-top: 1rem; padding: 0.75rem 1rem; background: #2563eb; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
        Submit Form
      </button>
    </form>
  `,parameters:{docs:{description:{story:"A complete form example showing how text inputs work together in a real-world scenario."}}}};var y,b,_,v,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => html\`
    <aw-text-input 
      label_text=\${args.label_text}
      input_value=\${args.input_value}
      placeholder=\${args.placeholder}
      input_type=\${args.input_type}
      size=\${args.size}
      ?disabled=\${args.disabled}
      ?required=\${args.required}
      ?readonly=\${args.readonly}
      ?has_error=\${args.has_error}
      error_message=\${args.error_message}
      aria_describedby=\${args.aria_describedby}
      ?aria_invalid=\${args.aria_invalid}
      @aw-text-input-input=\${(e: CustomEvent) => {
    console.log('Input changed:', e.detail);
  }}>
    </aw-text-input>
  \`
}`,...(_=(b=o.parameters)==null?void 0:b.docs)==null?void 0:_.source},description:{story:"Default text input with standard settings",...(f=(v=o.parameters)==null?void 0:v.docs)==null?void 0:f.description}}};var g,E,A,z,$;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <aw-text-input label_text="Text Input" input_type="text" placeholder="Enter text"></aw-text-input>
      <aw-text-input label_text="Email" input_type="email" placeholder="email@example.com"></aw-text-input>
      <aw-text-input label_text="Password" input_type="password" placeholder="Enter password"></aw-text-input>
      <aw-text-input label_text="URL" input_type="url" placeholder="https://example.com"></aw-text-input>
      <aw-text-input label_text="Phone" input_type="tel" placeholder="+1 (555) 123-4567"></aw-text-input>
      <aw-text-input label_text="Search" input_type="search" placeholder="Search..."></aw-text-input>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Text input supports multiple HTML5 input types with appropriate validation.'
      }
    }
  }
}`,...(A=(E=p.parameters)==null?void 0:E.docs)==null?void 0:A.source},description:{story:"Examples of different input types",...($=(z=p.parameters)==null?void 0:z.docs)==null?void 0:$.description}}};var S,I,F,q,T;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <aw-text-input label_text="Small Input" size="sm" placeholder="Small size"></aw-text-input>
      <aw-text-input label_text="Medium Input" size="md" placeholder="Medium size"></aw-text-input>
      <aw-text-input label_text="Large Input" size="lg" placeholder="Large size"></aw-text-input>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Text input supports three different sizes: small, medium, and large.'
      }
    }
  }
}`,...(F=(I=d.parameters)==null?void 0:I.docs)==null?void 0:F.source},description:{story:"Examples of different sizes",...(T=(q=d.parameters)==null?void 0:q.docs)==null?void 0:T.description}}};var V,C,R,P,L;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
      <div>
        <h3>Valid State</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email" 
          input_value="user@example.com"
          required>
        </aw-text-input>
      </div>
      
      <div>
        <h3>Required Field</h3>
        <aw-text-input 
          label_text="Full Name" 
          required
          placeholder="Enter your full name">
        </aw-text-input>
      </div>
      
      <div>
        <h3>Error State</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email" 
          input_value="invalid-email"
          has_error
          error_message="Please enter a valid email address"
          required>
        </aw-text-input>
      </div>
      
      <div>
        <h3>Disabled State</h3>
        <aw-text-input 
          label_text="Readonly Field" 
          input_value="Cannot be edited"
          disabled>
        </aw-text-input>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Text input supports validation states with live error announcements for screen readers.'
      }
    }
  }
}`,...(R=(C=u.parameters)==null?void 0:C.docs)==null?void 0:R.source},description:{story:"Form validation and error states",...(L=(P=u.parameters)==null?void 0:P.docs)==null?void 0:L.description}}};var k,B,N,D,M;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <div>
        <h3>ARIA Described By</h3>
        <aw-text-input 
          label_text="Password" 
          input_type="password"
          aria_describedby="password-help"
          placeholder="Enter password">
        </aw-text-input>
        <p id="password-help" style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Must be at least 8 characters with uppercase, lowercase, and numbers.
        </p>
      </div>

      <div>
        <h3>Error State with Live Announcements</h3>
        <aw-text-input 
          label_text="Email Address" 
          input_type="email"
          has_error
          aria_invalid="true"
          error_message="This email address is already registered"
          placeholder="Enter your email">
        </aw-text-input>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Error messages are announced to screen readers with role="alert"
        </p>
      </div>

      <div>
        <h3>Required Field Indicators</h3>
        <aw-text-input 
          label_text="Full Name" 
          required
          placeholder="Enter your full name">
        </aw-text-input>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Required fields show asterisk (*) with aria-hidden="true"
        </p>
      </div>

      <div>
        <h3>Keyboard Navigation</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <aw-text-input label_text="First Field" placeholder="Tab to navigate"></aw-text-input>
          <aw-text-input label_text="Second Field" placeholder="Focus indicators visible"></aw-text-input>
          <aw-text-input label_text="Third Field" placeholder="Screen reader friendly"></aw-text-input>
        </div>
        <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem;">
          Use Tab to navigate between fields. Focus indicators are clearly visible.
        </p>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: \`
This story demonstrates the accessibility features of the text input component:

- **ARIA Described By**: Link help text to inputs for screen reader context
- **Live Error Announcements**: Errors are announced immediately with role="alert"
- **Required Field Indicators**: Visual asterisks with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Form Association**: Proper label-input relationship for screen readers
- **Validation States**: ARIA invalid attributes for form validation

All inputs meet WCAG 2.1 AA guidelines for accessibility.
        \`
      }
    }
  }
}`,...(N=(B=m.parameters)==null?void 0:B.docs)==null?void 0:N.source},description:{story:"Accessibility features demonstration",...(M=(D=m.parameters)==null?void 0:D.docs)==null?void 0:M.description}}};var K,O,U,W,j;c.parameters={...c.parameters,docs:{...(K=c.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => html\`
    <form style="max-width: 500px; display: flex; flex-direction: column; gap: 1rem;">
      <h3>Contact Form</h3>
      
      <aw-text-input 
        label_text="Full Name" 
        input_name="name"
        required
        placeholder="Enter your full name">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Email Address" 
        input_type="email"
        input_name="email"
        required
        placeholder="your@email.com">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Phone Number" 
        input_type="tel"
        input_name="phone"
        placeholder="+1 (555) 123-4567">
      </aw-text-input>
      
      <aw-text-input 
        label_text="Company Website" 
        input_type="url"
        input_name="website"
        placeholder="https://your-company.com">
      </aw-text-input>
      
      <button type="submit" style="margin-top: 1rem; padding: 0.75rem 1rem; background: #2563eb; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
        Submit Form
      </button>
    </form>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'A complete form example showing how text inputs work together in a real-world scenario.'
      }
    }
  }
}`,...(U=(O=c.parameters)==null?void 0:O.docs)==null?void 0:U.source},description:{story:"Real-world form example",...(j=(W=c.parameters)==null?void 0:W.docs)==null?void 0:j.description}}};const se=["Default","InputTypes","Sizes","Validation","Accessibility","FormExample"];export{m as Accessibility,o as Default,c as FormExample,p as InputTypes,d as Sizes,u as Validation,se as __namedExportsOrder,ne as default};
