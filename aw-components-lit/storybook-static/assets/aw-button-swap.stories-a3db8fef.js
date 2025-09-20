import{i as et,a as at,x as w}from"./lit-element-b4b0194a.js";import{n as l,t as rt}from"./property-64877f55.js";import{r as tt}from"./state-66c4e041.js";import{e as st}from"./query-a5550cfe.js";import{e as nt}from"./class-map-1caf54e8.js";import"./directive-12249aa5.js";class ot{constructor(t){this.currentChars=[],this.isAnimating=!1,this.currentText="",this.targetText="",this.element=t}async swapText(t,r={}){if(this.isAnimating)return;const{duration:a=300,delay:o=0,ease:n="ease-out",staggerDelay:p=20}=r;if(this.isAnimating=!0,this.targetText=t,!this.currentText){this.currentText=t,this.element.textContent=t,this.isAnimating=!1;return}this.currentChars.length===0&&this.createCharacterElements(this.currentText);try{await this.animateOut(a/2,n,p),this.updateText(t),await this.animateIn(a/2,n,p),this.currentText=t}catch{this.element.textContent=t,this.currentText=t}finally{this.isAnimating=!1}}createCharacterElements(t){this.element.innerHTML="",this.currentChars=[];for(let r=0;r<t.length;r++){const a=document.createElement("span");a.textContent=t[r]===" "?" ":t[r],a.style.cssText=`
        display: inline-block;
        transition: transform 300ms ease-out, opacity 300ms ease-out;
        transform: translateY(0);
        opacity: 1;
      `,this.currentChars.push(a),this.element.appendChild(a)}}animateOut(t,r,a){return new Promise(o=>{const n=this.currentChars;n.forEach((p,d)=>{setTimeout(()=>{p.style.transition=`transform ${t}ms ${r}, opacity ${t}ms ${r}`,p.style.transform="translateY(-20px)",p.style.opacity="0",d===n.length-1&&setTimeout(()=>o(),t)},d*a)}),setTimeout(()=>o(),n.length*a+t+100)})}updateText(t){this.element.innerHTML="",this.currentChars=[];for(let r=0;r<t.length;r++){const a=document.createElement("span");a.textContent=t[r]===" "?" ":t[r],a.style.cssText=`
        display: inline-block;
        transition: transform 300ms ease-out, opacity 300ms ease-out;
        transform: translateY(20px);
        opacity: 0;
      `,this.currentChars.push(a),this.element.appendChild(a)}}animateIn(t,r,a){return new Promise(o=>{const n=this.currentChars;this.element.offsetHeight,n.forEach((p,d)=>{setTimeout(()=>{p.style.transition=`transform ${t}ms ${r}, opacity ${t}ms ${r}`,p.style.transform="translateY(0)",p.style.opacity="1",d===n.length-1&&setTimeout(()=>o(),t)},d*a)}),setTimeout(()=>o(),n.length*a+t+100)})}getState(){return{currentText:this.currentText,targetText:this.targetText,isAnimating:this.isAnimating,progress:this.isAnimating?.5:1}}destroy(){this.currentChars=[],this.element.innerHTML=this.currentText,this.isAnimating=!1}}function it(e){return new ot(e)}var pt=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,i=(e,t,r,a)=>{for(var o=a>1?void 0:a?lt(t,r):t,n=e.length-1,p;n>=0;n--)(p=e[n])&&(o=(a?p(t,r,o):p(o))||o);return a&&o&&pt(t,r,o),o};let s=class extends at{constructor(){super(...arguments),this.label="Swap Button",this.swap_text="",this.size="md",this.type="default",this.disabled=!1,this.sound="click",this.trigger="hover",this.duration=300,this.restore_delay=200,this.stagger_delay=20,this.button_type="button",this.isAnimating=!1,this.isHovered=!1,this.handleMouseEnter=async()=>{this.isHovered=!0,this.trigger==="hover"&&this.swap_text&&!this.disabled&&await this.performSwap(this.swap_text),this.dispatchEvent(new CustomEvent("awMouseEnter",{detail:{isHovered:this.isHovered,originalText:this.label},bubbles:!0,composed:!0}))},this.handleMouseLeave=async()=>{this.isHovered=!1,this.trigger==="hover"&&this.swap_text&&!this.disabled&&(this.restoreTimer&&clearTimeout(this.restoreTimer),this.restoreTimer=window.setTimeout(async()=>{await this.performSwap(this.label)},this.restore_delay)),this.dispatchEvent(new CustomEvent("awMouseLeave",{detail:{isHovered:this.isHovered,originalText:this.label},bubbles:!0,composed:!0}))},this.handleClick=async e=>{var r,a;if(this.disabled)return;if(this.playSound(),this.trigger==="click"&&this.swap_text){const n=(((r=this.textSwapAnimation)==null?void 0:r.getState().currentText)||this.label)===this.label?this.swap_text:this.label;await this.performSwap(n)}const t=new CustomEvent("awClick",{detail:{originalEvent:e,buttonLabel:this.label,currentText:((a=this.textSwapAnimation)==null?void 0:a.getState().currentText)||this.label,sound:this.sound,type:this.type},bubbles:!0,composed:!0});this.dispatchEvent(t)}}firstUpdated(){this.textElement&&(this.textSwapAnimation=it(this.textElement),this.textElement.textContent=this.label)}disconnectedCallback(){super.disconnectedCallback(),this.textSwapAnimation&&this.textSwapAnimation.destroy(),this.restoreTimer&&clearTimeout(this.restoreTimer)}async performSwap(e){if(!(!this.textSwapAnimation||this.isAnimating)){this.isAnimating=!0;try{await this.textSwapAnimation.swapText(e,{duration:this.duration,staggerDelay:this.stagger_delay,ease:"ease-out"}),this.dispatchEvent(new CustomEvent("awSwapComplete",{detail:{newText:e,previousText:this.label,duration:this.duration},bubbles:!0,composed:!0}))}catch(t){console.warn("Text swap animation failed:",t)}finally{this.isAnimating=!1}}}async swapTo(e){(this.trigger==="manual"||this.trigger==="click")&&await this.performSwap(e)}async restore(){await this.performSwap(this.label)}playSound(){this.dispatchEvent(new CustomEvent("awPlaySound",{detail:{sound:this.sound,type:"button-swap"},bubbles:!0,composed:!0}))}render(){return w`
      <button
        type=${this.button_type}
        class=${nt({"aw-button-swap":!0,[`aw-button-swap--size-${this.size}`]:!0,[`aw-button-swap--type-${this.type}`]:!0,"aw-button-swap--state-disabled":this.disabled,"aw-button-swap--state-animating":this.isAnimating})}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="aw-button-swap__overlay"></div>
        <span class="aw-button-swap__text">
          <slot>${this.label}</slot>
        </span>
      </button>
    `}};s.styles=et`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-button-swap */
    .aw-button-swap {
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
      overflow: hidden;
      position: relative;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    /* ITCSS - Components: Text content container */
    .aw-button-swap__text {
      position: relative;
      z-index: 2;
      line-height: 1;
    }

    /* ITCSS - Components: Background overlay for animations */
    .aw-button-swap__overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      transition: all var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      opacity: 0;
    }

    /* ITCSS - Components: Pseudo-elements - focus state */
    .aw-button-swap:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-button-swap--size-xs {
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-xs, 1rem);
    }

    .aw-button-swap--size-sm {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-md, 0.75rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-sm, 1.25rem);
    }

    .aw-button-swap--size-md {
      padding: var(--aw-spacing-sm, 0.5rem) var(--aw-spacing-lg, 1rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      line-height: var(--aw-line-height-base, 1.5rem);
    }

    .aw-button-swap--size-lg {
      padding: var(--aw-spacing-md, 0.75rem) var(--aw-spacing-xl, 1.25rem);
      font-size: var(--aw-font-size-sm, 0.875rem);
      line-height: var(--aw-line-height-lg, 1.75rem);
    }

    .aw-button-swap--size-xl {
      padding: var(--aw-spacing-lg, 1rem) var(--aw-spacing-2xl, 1.5rem);
      font-size: var(--aw-font-size-base, 1rem);
      line-height: var(--aw-line-height-xl, 1.75rem);
    }

    /* ITCSS - Components: Type variant modifiers with BEM */
    .aw-button-swap--type-default {
      background-color: var(--aw-color-surface-1, var(--aw-color-neutral-100, #f5f5f5));
      color: var(--aw-text-color, var(--aw-color-neutral-800, #262626));
    }

    .aw-button-swap--type-default:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-color-surface-2, var(--aw-color-neutral-200, #e5e5e5));
    }

    .aw-button-swap--type-default .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.1;
    }

    .aw-button-swap--type-primary {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      color: var(--aw-text-color-inv, var(--aw-color-neutral-white, #ffffff));
    }

    .aw-button-swap--type-primary:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-color-primary-700, #1d4ed8);
    }

    .aw-button-swap--type-primary .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
      opacity: 0.2;
    }

    .aw-button-swap--type-secondary {
      background-color: transparent;
      border: 1px solid var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
      color: var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
    }

    .aw-button-swap--type-secondary:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-accent-sec, var(--aw-color-secondary-600, #dc2626));
      color: var(--aw-text-color-inv, var(--aw-color-neutral-white, #ffffff));
    }

    .aw-button-swap--type-secondary .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.15;
    }

    .aw-button-swap--type-tertiary {
      background-color: transparent;
      color: var(--aw-text-color, var(--aw-color-neutral-800, #262626));
    }

    .aw-button-swap--type-tertiary:hover:not(.aw-button-swap--state-disabled) {
      background-color: var(--aw-color-surface-1, var(--aw-color-neutral-100, #f5f5f5));
    }

    .aw-button-swap--type-tertiary .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.08;
    }

    .aw-button-swap--type-transparent {
      background-color: transparent;
      color: var(--aw-text-color, var(--aw-color-neutral-800, #262626));
    }

    .aw-button-swap--type-transparent:hover:not(.aw-button-swap--state-disabled) {
      color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
    }

    .aw-button-swap--type-transparent .aw-button-swap__overlay:hover {
      background-color: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
      opacity: 0.05;
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-button-swap--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ITCSS - State: Animation active state */
    .aw-button-swap--state-animating {
      pointer-events: none;
    }

    /* ITCSS - State: Hover interaction states */
    .aw-button-swap:hover .aw-button-swap__overlay {
      opacity: 1;
    }
  `;i([l()],s.prototype,"label",2);i([l()],s.prototype,"swap_text",2);i([l()],s.prototype,"size",2);i([l()],s.prototype,"type",2);i([l({type:Boolean})],s.prototype,"disabled",2);i([l()],s.prototype,"sound",2);i([l()],s.prototype,"trigger",2);i([l({type:Number})],s.prototype,"duration",2);i([l({type:Number})],s.prototype,"restore_delay",2);i([l({type:Number})],s.prototype,"stagger_delay",2);i([l()],s.prototype,"button_type",2);i([tt()],s.prototype,"isAnimating",2);i([tt()],s.prototype,"isHovered",2);i([st(".aw-button-swap__text")],s.prototype,"textElement",2);s=i([rt("aw-button-swap")],s);const yt={title:"Components/Base/Button Swap",component:"aw-button-swap",parameters:{layout:"centered",docs:{description:{component:`
A sophisticated button component with text swap animations for enhanced user interactions.

## Features
- Text swap animations on hover, click, or manual trigger
- Multiple button variants and sizes
- Sound effect integration
- Configurable animation duration and stagger
- Accessibility compliant with ARIA support
- Comprehensive event handling

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-button-swap 
  label="Click me" 
  swap_text="Thanks!"
  trigger="hover"
  type="primary">
</aw-button-swap>
\`\`\`
        `}}},argTypes:{label:{control:"text",description:"The default button text content",table:{type:{summary:"string"},defaultValue:{summary:"Swap Button"}}},swap_text:{control:"text",description:"The alternate text to swap to on interaction",table:{type:{summary:"string"},defaultValue:{summary:""}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Controls the button size",table:{type:{summary:"xs | sm | md | lg | xl"},defaultValue:{summary:"md"}}},type:{control:"select",options:["default","primary","secondary","tertiary","transparent"],description:"Controls the button appearance variant",table:{type:{summary:"default | primary | secondary | tertiary | transparent"},defaultValue:{summary:"default"}}},trigger:{control:"select",options:["hover","click","manual"],description:"When the text swap animation should trigger",table:{type:{summary:"hover | click | manual"},defaultValue:{summary:"hover"}}},disabled:{control:"boolean",description:"Whether the button is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},duration:{control:{type:"range",min:100,max:1e3,step:50},description:"Animation duration in milliseconds",table:{type:{summary:"number"},defaultValue:{summary:"300"}}},stagger_delay:{control:{type:"range",min:0,max:100,step:5},description:"Character stagger delay for animation",table:{type:{summary:"number"},defaultValue:{summary:"20"}}},restore_delay:{control:{type:"range",min:0,max:1e3,step:50},description:"Delay before restoring original text (hover mode)",table:{type:{summary:"number"},defaultValue:{summary:"200"}}},sound:{control:"select",options:["beepOn","beepOff","click","plink","drip","marimba"],description:"Sound effect to play on interaction",table:{type:{summary:"beepOn | beepOff | click | plink | drip | marimba"},defaultValue:{summary:"click"}}}},args:{label:"Swap Button",swap_text:"Swapped!",size:"md",type:"default",trigger:"hover",disabled:!1,duration:300,stagger_delay:20,restore_delay:200,sound:"click"}},u={render:e=>w`
    <aw-button-swap 
      label=${e.label}
      swap_text=${e.swap_text}
      size=${e.size}
      type=${e.type}
      trigger=${e.trigger}
      ?disabled=${e.disabled}
      duration=${e.duration}
      stagger_delay=${e.stagger_delay}
      restore_delay=${e.restore_delay}
      sound=${e.sound}
      @awClick=${t=>{console.log("Button swap clicked:",t.detail)}}
      @awSwapComplete=${t=>{console.log("Swap animation complete:",t.detail)}}>
    </aw-button-swap>
  `},c={render:()=>w`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Hover Me" 
        swap_text="Hovering!" 
        trigger="hover"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Click Me" 
        swap_text="Clicked!" 
        trigger="click"
        type="secondary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Manual Control" 
        swap_text="Manually Swapped!" 
        trigger="manual"
        type="tertiary"
        id="manual-swap">
      </aw-button-swap>
    </div>
    
    <div style="margin-top: 1rem;">
      <button @click=${()=>{const e=document.getElementById("manual-swap");e==null||e.swapTo("Manual Triggered!")}}>
        Trigger Manual Swap
      </button>
      
      <button @click=${()=>{const e=document.getElementById("manual-swap");e==null||e.restore()}}>
        Restore Manual Swap
      </button>
    </div>
  `,parameters:{docs:{description:{story:"Button swap supports hover, click, and manual trigger modes for different interaction patterns."}}}},m={render:()=>w`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Default" 
        swap_text="Default Swapped!" 
        type="default">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Primary" 
        swap_text="Primary Swapped!" 
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Secondary" 
        swap_text="Secondary Swapped!" 
        type="secondary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Tertiary" 
        swap_text="Tertiary Swapped!" 
        type="tertiary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Transparent" 
        swap_text="Transparent Swapped!" 
        type="transparent">
      </aw-button-swap>
    </div>
  `,parameters:{docs:{description:{story:"Button swap supports multiple visual variants to match different design contexts."}}}},b={render:()=>w`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <aw-button-swap 
        label="XS" 
        swap_text="XS!" 
        size="xs"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Small" 
        swap_text="Small!" 
        size="sm"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Medium" 
        swap_text="Medium!" 
        size="md"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Large" 
        swap_text="Large!" 
        size="lg"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Extra Large" 
        swap_text="XL!" 
        size="xl"
        type="primary">
      </aw-button-swap>
    </div>
  `,parameters:{docs:{description:{story:"Button swap supports 5 different sizes from extra small to extra large."}}}},y={render:()=>w`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Fast (150ms)" 
        swap_text="Fast!" 
        duration="150"
        stagger_delay="10"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Normal (300ms)" 
        swap_text="Normal!" 
        duration="300"
        stagger_delay="20"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Slow (600ms)" 
        swap_text="Slow!" 
        duration="600"
        stagger_delay="40"
        type="primary">
      </aw-button-swap>
    </div>
  `,parameters:{docs:{description:{story:"Button swap animations can be customized with different durations and stagger delays."}}}},h={render:()=>w`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Disabled Default" 
        swap_text="Won't Swap" 
        type="default"
        disabled>
      </aw-button-swap>
      
      <aw-button-swap 
        label="Disabled Primary" 
        swap_text="Won't Swap" 
        type="primary"
        disabled>
      </aw-button-swap>
      
      <aw-button-swap 
        label="Disabled Secondary" 
        swap_text="Won't Swap" 
        type="secondary"
        disabled>
      </aw-button-swap>
    </div>
  `,parameters:{docs:{description:{story:"Disabled button swaps cannot be interacted with and have reduced opacity."}}}},g={render:()=>w`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Call-to-Action Button</h3>
        <aw-button-swap 
          label="Download Now" 
          swap_text="Downloading..." 
          trigger="click"
          type="primary"
          size="lg">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Navigation Button</h3>
        <aw-button-swap 
          label="Learn More" 
          swap_text="Let's Go!" 
          trigger="hover"
          type="secondary">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Confirmation Button</h3>
        <aw-button-swap 
          label="Delete Item" 
          swap_text="Are you sure?" 
          trigger="hover"
          type="tertiary"
          duration="400">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Status Toggle</h3>
        <aw-button-swap 
          label="Enable Feature" 
          swap_text="Feature Enabled!" 
          trigger="click"
          type="transparent">
        </aw-button-swap>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Real-world examples showing how button swap can enhance user interactions in different contexts."}}}};var f,v,x,_,S;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => html\`
    <aw-button-swap 
      label=\${args.label}
      swap_text=\${args.swap_text}
      size=\${args.size}
      type=\${args.type}
      trigger=\${args.trigger}
      ?disabled=\${args.disabled}
      duration=\${args.duration}
      stagger_delay=\${args.stagger_delay}
      restore_delay=\${args.restore_delay}
      sound=\${args.sound}
      @awClick=\${(e: CustomEvent) => {
    console.log('Button swap clicked:', e.detail);
  }}
      @awSwapComplete=\${(e: CustomEvent) => {
    console.log('Swap animation complete:', e.detail);
  }}>
    </aw-button-swap>
  \`
}`,...(x=(v=u.parameters)==null?void 0:v.docs)==null?void 0:x.source},description:{story:"The default button swap with hover trigger",...(S=(_=u.parameters)==null?void 0:_.docs)==null?void 0:S.description}}};var T,C,k,z,$;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Hover Me" 
        swap_text="Hovering!" 
        trigger="hover"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Click Me" 
        swap_text="Clicked!" 
        trigger="click"
        type="secondary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Manual Control" 
        swap_text="Manually Swapped!" 
        trigger="manual"
        type="tertiary"
        id="manual-swap">
      </aw-button-swap>
    </div>
    
    <div style="margin-top: 1rem;">
      <button @click=\${() => {
    const manualSwap = document.getElementById('manual-swap') as any;
    manualSwap?.swapTo('Manual Triggered!');
  }}>
        Trigger Manual Swap
      </button>
      
      <button @click=\${() => {
    const manualSwap = document.getElementById('manual-swap') as any;
    manualSwap?.restore();
  }}>
        Restore Manual Swap
      </button>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button swap supports hover, click, and manual trigger modes for different interaction patterns.'
      }
    }
  }
}`,...(k=(C=c.parameters)==null?void 0:C.docs)==null?void 0:k.source},description:{story:"Examples of different trigger modes",...($=(z=c.parameters)==null?void 0:z.docs)==null?void 0:$.description}}};var E,A,M,B,D;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Default" 
        swap_text="Default Swapped!" 
        type="default">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Primary" 
        swap_text="Primary Swapped!" 
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Secondary" 
        swap_text="Secondary Swapped!" 
        type="secondary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Tertiary" 
        swap_text="Tertiary Swapped!" 
        type="tertiary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Transparent" 
        swap_text="Transparent Swapped!" 
        type="transparent">
      </aw-button-swap>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button swap supports multiple visual variants to match different design contexts.'
      }
    }
  }
}`,...(M=(A=m.parameters)==null?void 0:A.docs)==null?void 0:M.source},description:{story:"Examples of all button variants",...(D=(B=m.parameters)==null?void 0:B.docs)==null?void 0:D.description}}};var L,I,H,P,V;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <aw-button-swap 
        label="XS" 
        swap_text="XS!" 
        size="xs"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Small" 
        swap_text="Small!" 
        size="sm"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Medium" 
        swap_text="Medium!" 
        size="md"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Large" 
        swap_text="Large!" 
        size="lg"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Extra Large" 
        swap_text="XL!" 
        size="xl"
        type="primary">
      </aw-button-swap>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button swap supports 5 different sizes from extra small to extra large.'
      }
    }
  }
}`,...(H=(I=b.parameters)==null?void 0:I.docs)==null?void 0:H.source},description:{story:"Examples of all button sizes",...(V=(P=b.parameters)==null?void 0:P.docs)==null?void 0:V.description}}};var N,O,F,W,R;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Fast (150ms)" 
        swap_text="Fast!" 
        duration="150"
        stagger_delay="10"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Normal (300ms)" 
        swap_text="Normal!" 
        duration="300"
        stagger_delay="20"
        type="primary">
      </aw-button-swap>
      
      <aw-button-swap 
        label="Slow (600ms)" 
        swap_text="Slow!" 
        duration="600"
        stagger_delay="40"
        type="primary">
      </aw-button-swap>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button swap animations can be customized with different durations and stagger delays.'
      }
    }
  }
}`,...(F=(O=y.parameters)==null?void 0:O.docs)==null?void 0:F.source},description:{story:"Examples of different animation speeds",...(R=(W=y.parameters)==null?void 0:W.docs)==null?void 0:R.description}}};var X,U,Y,j,G;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-swap 
        label="Disabled Default" 
        swap_text="Won't Swap" 
        type="default"
        disabled>
      </aw-button-swap>
      
      <aw-button-swap 
        label="Disabled Primary" 
        swap_text="Won't Swap" 
        type="primary"
        disabled>
      </aw-button-swap>
      
      <aw-button-swap 
        label="Disabled Secondary" 
        swap_text="Won't Swap" 
        type="secondary"
        disabled>
      </aw-button-swap>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Disabled button swaps cannot be interacted with and have reduced opacity.'
      }
    }
  }
}`,...(Y=(U=h.parameters)==null?void 0:U.docs)==null?void 0:Y.source},description:{story:"Disabled state examples",...(G=(j=h.parameters)==null?void 0:j.docs)==null?void 0:G.description}}};var q,J,K,Q,Z;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Call-to-Action Button</h3>
        <aw-button-swap 
          label="Download Now" 
          swap_text="Downloading..." 
          trigger="click"
          type="primary"
          size="lg">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Navigation Button</h3>
        <aw-button-swap 
          label="Learn More" 
          swap_text="Let's Go!" 
          trigger="hover"
          type="secondary">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Confirmation Button</h3>
        <aw-button-swap 
          label="Delete Item" 
          swap_text="Are you sure?" 
          trigger="hover"
          type="tertiary"
          duration="400">
        </aw-button-swap>
      </div>
      
      <div>
        <h3>Status Toggle</h3>
        <aw-button-swap 
          label="Enable Feature" 
          swap_text="Feature Enabled!" 
          trigger="click"
          type="transparent">
        </aw-button-swap>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how button swap can enhance user interactions in different contexts.'
      }
    }
  }
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source},description:{story:"Real-world usage examples",...(Z=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:Z.description}}};const ht=["Default","TriggerModes","Variants","Sizes","AnimationSpeeds","Disabled","UsageExamples"];export{y as AnimationSpeeds,u as Default,h as Disabled,b as Sizes,c as TriggerModes,g as UsageExamples,m as Variants,ht as __namedExportsOrder,yt as default};
