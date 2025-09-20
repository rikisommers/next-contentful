import{i as ti,a as ni,x as l}from"./lit-element-b4b0194a.js";import{n as r,t as oi}from"./property-64877f55.js";import{r as p}from"./state-66c4e041.js";import{e as w}from"./class-map-1caf54e8.js";import"./directive-12249aa5.js";var si=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,a=(i,e,n,t)=>{for(var s=t>1?void 0:t?ai(e,n):e,h=i.length-1,f;h>=0;h--)(f=i[h])&&(s=(t?f(e,n,s):f(s))||s);return t&&s&&si(e,n,s),s};const b={"2x2":[{row:0,col:0,key:"0-0",label:"Top Left"},{row:0,col:1,key:"0-1",label:"Top Right"},{row:1,col:0,key:"1-0",label:"Bottom Left"},{row:1,col:1,key:"1-1",label:"Bottom Right"}],"3x3":[{row:0,col:0,key:"0-0",label:"Top Left"},{row:0,col:1,key:"0-1",label:"Top Center"},{row:0,col:2,key:"0-2",label:"Top Right"},{row:1,col:0,key:"1-0",label:"Middle Left"},{row:1,col:1,key:"1-1",label:"Center"},{row:1,col:2,key:"1-2",label:"Middle Right"},{row:2,col:0,key:"2-0",label:"Bottom Left"},{row:2,col:1,key:"2-1",label:"Bottom Center"},{row:2,col:2,key:"2-2",label:"Bottom Right"}],"4x4":Array.from({length:16},(i,e)=>({row:Math.floor(e/4),col:e%4,key:`${Math.floor(e/4)}-${e%4}`,label:`Position ${e+1}`})),"5x5":Array.from({length:25},(i,e)=>({row:Math.floor(e/5),col:e%5,key:`${Math.floor(e/5)}-${e%5}`,label:`Position ${e+1}`}))};b["3x3"].map(i=>i.key);let o=class extends ni{constructor(){super(...arguments),this.label="",this.value="1-1",this.size="md",this.grid_size="3x3",this.animation="spring",this.coordinate_system="zero-based",this.disabled=!1,this.keyboard_navigation=!0,this.input_id="",this.indicator_color="",this.show_labels=!1,this.animation_duration=300,this.coordinates=b["3x3"],this.selectedCoordinate=null,this.isAnimating=!1,this.validationError="",this.focusedPosition="",this.hoveredPosition="",this.handlePositionClick=(i,e)=>{if(this.disabled)return;if(this.validation){const t=this.validation(i.key);if(!t.isValid){this.validationError=t.error||"",this.dispatchEvent(new CustomEvent("awValidationError",{detail:{value:i.key,error:t.error,suggestion:t.suggestion},bubbles:!0,composed:!0}));return}}this.validationError="",this.isAnimating=!0,setTimeout(()=>{this.isAnimating=!1},this.animation_duration);const n=this.value;this.value=i.key,this.dispatchEvent(new CustomEvent("awChange",{detail:{value:i.key,previousValue:n,coordinate:i,originalEvent:e},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("awPositionSelected",{detail:{coordinate:i,animation:this.animation},bubbles:!0,composed:!0}))},this.handleKeyDown=i=>{if(!this.keyboard_navigation||this.disabled)return;const{key:e}=i,n=this.selectedCoordinate;if(!n)return;let t=null;switch(e){case"ArrowUp":t=this.coordinates.find(s=>s.col===n.col&&s.row===n.row-1)||null;break;case"ArrowDown":t=this.coordinates.find(s=>s.col===n.col&&s.row===n.row+1)||null;break;case"ArrowLeft":t=this.coordinates.find(s=>s.row===n.row&&s.col===n.col-1)||null;break;case"ArrowRight":t=this.coordinates.find(s=>s.row===n.row&&s.col===n.col+1)||null;break}t&&(i.preventDefault(),this.focusedPosition=t.key,this.handlePositionClick(t,i))},this.handlePositionMouseEnter=i=>{this.hoveredPosition=i.key,this.show_labels&&this.dispatchEvent(new CustomEvent("awPositionHover",{detail:{coordinate:i,action:"enter"},bubbles:!0,composed:!0}))},this.handlePositionMouseLeave=()=>{this.hoveredPosition="",this.show_labels&&this.dispatchEvent(new CustomEvent("awPositionHover",{detail:{coordinate:null,action:"leave"},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.processCoordinates(),this.updateSelectedCoordinate()}willUpdate(i){(i.has("grid_size")||i.has("custom_options"))&&this.processCoordinates(),(i.has("value")||i.has("coordinates"))&&this.updateSelectedCoordinate()}processCoordinates(){this.custom_options?Array.isArray(this.custom_options)?this.coordinates=this.custom_options.map((i,e)=>{const[n,t]=i.split("-").map(Number);return{row:n||Math.floor(e/3),col:t||e%3,key:i,label:`Position ${i}`}}):typeof this.custom_options=="object"&&(this.coordinates=Object.keys(this.custom_options).filter(i=>i.match(/^\d-\d$/)).map(i=>{var t;const[e,n]=i.split("-").map(Number);return{row:e,col:n,key:i,label:((t=this.custom_options)==null?void 0:t[i])||`Position ${i}`}})):this.coordinates=b[this.grid_size]||b["3x3"]}updateSelectedCoordinate(){if(this.selectedCoordinate=this.coordinates.find(i=>i.key===this.value)||null,this.validation){const i=this.validation(this.value);this.validationError=i.isValid?"":i.error||""}}setPosition(i){const e=this.coordinates.find(n=>n.key===i);e&&this.handlePositionClick(e,new MouseEvent("click"))}getCurrentPosition(){return this.selectedCoordinate}validatePosition(){return this.validation?this.validation(this.value):{isValid:!0}}generateLayoutId(){return this.input_id?`aw-position-indicator-${this.input_id}`:`aw-position-indicator-${Math.random().toString(36).substr(2,9)}`}getGridDimensions(){switch(this.grid_size){case"2x2":return{cols:2,rows:2};case"3x3":return{cols:3,rows:3};case"4x4":return{cols:4,rows:4};case"5x5":return{cols:5,rows:5};default:return{cols:3,rows:3}}}render(){const i=this.indicator_color?`--aw-position-input-indicator-color: ${this.indicator_color};`:"";return l`
      <div 
        class=${w({"aw-position-input":!0,[`aw-position-input--size-${this.size}`]:!0,"aw-position-input--state-disabled":this.disabled,"aw-position-input--state-error":!!this.validationError})}
        style=${i}
        @keydown=${this.handleKeyDown}
        tabindex=${this.keyboard_navigation&&!this.disabled?"0":"-1"}
      >
        ${this.label?l`
          <div class="aw-position-input__label">
            <slot name="label">${this.label}</slot>
          </div>
        `:""}
        
        <div class=${w({"aw-position-input__grid":!0,[`aw-position-input__grid--size-${this.grid_size}`]:!0})}>
          ${this.coordinates.map(e=>{var n,t;return l`
            <button
              type="button"
              class=${w({"aw-position-input__item":!0,"aw-position-input__item--state-selected":((n=this.selectedCoordinate)==null?void 0:n.key)===e.key})}
              ?disabled=${this.disabled}
              aria-label=${e.label||e.key}
              title=${this.show_labels&&this.hoveredPosition===e.key?e.label:""}
              @click=${s=>this.handlePositionClick(e,s)}
              @mouseenter=${()=>this.handlePositionMouseEnter(e)}
              @mouseleave=${this.handlePositionMouseLeave}
            >
              ${((t=this.selectedCoordinate)==null?void 0:t.key)===e.key?l`
                <div 
                  class=${w({"aw-position-input__indicator":!0,[`aw-position-input__indicator--animate-${this.animation}`]:this.isAnimating})}
                  style="animation-duration: ${this.animation_duration}ms;"
                ></div>
              `:""}
              
              ${this.show_labels&&this.hoveredPosition===e.key?l`
                <div class="aw-position-input__label-tooltip">
                  ${e.label}
                </div>
              `:""}
            </button>
          `})}
        </div>

        ${this.validationError?l`
          <div class="aw-position-input__error" role="alert">
            ${this.validationError}
          </div>
        `:""}
      </div>
    `}};o.styles=ti`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-position-input */
    .aw-position-input {
      display: flex;
      flex-direction: column;
      gap: var(--aw-position-input-gap, 0.5rem);
      justify-content: space-between;
      align-items: flex-start;
    }

    /* ITCSS - Components: Element - label */
    .aw-position-input__label {
      margin-bottom: var(--aw-position-input-label-margin, 0.25rem);
      font-size: var(--aw-position-input-label-font-size, 0.75rem);
      color: var(--aw-position-input-label-color, var(--text-color, #000000));
    }

    /* ITCSS - Settings: Size modifiers with BEM */
    .aw-position-input--size-xs {
      --aw-position-input-item-size: 0.75rem;
      --aw-position-input-indicator-size: 0.3rem;
    }

    .aw-position-input--size-sm {
      --aw-position-input-item-size: 1rem;
      --aw-position-input-indicator-size: 0.4rem;
    }

    .aw-position-input--size-md {
      --aw-position-input-item-size: 1.25rem;
      --aw-position-input-indicator-size: 0.5rem;
    }

    .aw-position-input--size-lg {
      --aw-position-input-item-size: 1.5rem;
      --aw-position-input-indicator-size: 0.6rem;
    }

    .aw-position-input--size-xl {
      --aw-position-input-item-size: 2rem;
      --aw-position-input-indicator-size: 0.8rem;
    }

    /* ITCSS - Components: Element - grid container */
    .aw-position-input__grid {
      display: grid;
      border: 1px solid var(--aw-position-input-border-color, var(--aw-color-neutral-300, #d1d5db));
      overflow: hidden;
      gap: 1px;
      background: var(--aw-position-input-bg, var(--aw-color-neutral-300, #d1d5db));
      border-radius: var(--aw-position-input-border-radius, 0.25rem);
    }

    /* ITCSS - Components: Grid size modifiers */
    .aw-position-input__grid--size-2x2 {
      grid-template-columns: repeat(2, var(--aw-position-input-item-size, 1.25rem));
    }

    .aw-position-input__grid--size-3x3 {
      grid-template-columns: repeat(3, var(--aw-position-input-item-size, 1.25rem));
    }

    .aw-position-input__grid--size-4x4 {
      grid-template-columns: repeat(4, var(--aw-position-input-item-size, 1.25rem));
    }

    .aw-position-input__grid--size-5x5 {
      grid-template-columns: repeat(5, var(--aw-position-input-item-size, 1.25rem));
    }

    /* ITCSS - Components: Element - grid item */
    .aw-position-input__item {
      width: var(--aw-position-input-item-size, 1rem);
      height: var(--aw-position-input-item-size, 1rem);
      background: var(--aw-position-input-item-bg, var(--surface1, #ffffff));
      border-radius: 0;
      cursor: pointer;
      position: relative;
      padding: 0;
      border: none;
      outline: none;
      transition: background-color var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
    }

    .aw-position-input__item:hover {
      background: var(--aw-position-input-item-bg-hover, var(--surface2, #f5f5f5));
    }

    .aw-position-input__item:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 1px;
    }

    /* ITCSS - State: Selected state modifier */
    .aw-position-input__item--state-selected {
      background: var(--aw-position-input-item-bg-selected, var(--surface1, #ffffff));
    }

    /* ITCSS - Components: Element - position indicator */
    .aw-position-input__indicator {
      position: absolute;
      width: var(--aw-position-input-indicator-size, 0.5rem);
      height: var(--aw-position-input-indicator-size, 0.5rem);
      background: var(--aw-position-input-indicator-color, var(--accent-pri, #3b82f6));
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--aw-position-input-spring-duration, 0.3s) var(--aw-position-input-spring-ease, cubic-bezier(0.34, 1.56, 0.64, 1));
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-position-input--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      pointer-events: none;
    }

    .aw-position-input--state-disabled .aw-position-input__item {
      cursor: not-allowed;
    }

    /* ITCSS - State: Error state modifier */
    .aw-position-input--state-error {
      --aw-position-input-border-color: var(--aw-color-danger-500, #ef4444);
      --aw-position-input-indicator-color: var(--aw-color-danger-500, #ef4444);
    }

    /* ITCSS - Animation: Different animation types */
    .aw-position-input__indicator--animate-spring {
      animation: aw-position-input-spring 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .aw-position-input__indicator--animate-smooth {
      animation: aw-position-input-smooth 0.3s ease-out;
    }

    .aw-position-input__indicator--animate-bounce {
      animation: aw-position-input-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .aw-position-input__indicator--animate-fade {
      animation: aw-position-input-fade 0.25s ease-in-out;
    }

    /* Keyframe animations for different types */
    @keyframes aw-position-input-spring {
      0% {
        transform: translate(-50%, -50%) scale(0.6);
        opacity: 0.7;
      }
      30% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 1;
      }
      60% {
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-position-input-smooth {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.8;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-position-input-bounce {
      0% {
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0.5;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.4);
        opacity: 1;
      }
      75% {
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @keyframes aw-position-input-fade {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;a([r()],o.prototype,"label",2);a([r()],o.prototype,"value",2);a([r()],o.prototype,"size",2);a([r()],o.prototype,"grid_size",2);a([r()],o.prototype,"animation",2);a([r()],o.prototype,"coordinate_system",2);a([r({type:Boolean})],o.prototype,"disabled",2);a([r({type:Boolean})],o.prototype,"keyboard_navigation",2);a([r({type:Array})],o.prototype,"custom_options",2);a([r()],o.prototype,"input_id",2);a([r()],o.prototype,"indicator_color",2);a([r({type:Boolean})],o.prototype,"show_labels",2);a([r({type:Object})],o.prototype,"validation",2);a([r({type:Number})],o.prototype,"animation_duration",2);a([p()],o.prototype,"coordinates",2);a([p()],o.prototype,"selectedCoordinate",2);a([p()],o.prototype,"isAnimating",2);a([p()],o.prototype,"validationError",2);a([p()],o.prototype,"focusedPosition",2);a([p()],o.prototype,"hoveredPosition",2);o=a([oi("aw-position-input")],o);const mi={title:"Components/Base/Position Input",component:"aw-position-input",parameters:{layout:"centered",docs:{description:{component:`
An interactive position selector component with visual grid interface and comprehensive accessibility.

## Features
- Multiple grid sizes (2x2, 3x3, 4x4, 5x5)
- Various animation types (spring, smooth, bounce, fade)
- Keyboard navigation support
- Position validation
- Custom coordinate systems
- Responsive design
- ARIA compliant

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-position-input 
  label="Select Position"
  value="1-1"
  grid_size="3x3"
  animation="spring">
</aw-position-input>
\`\`\`
        `}}},argTypes:{label:{control:"text",description:"Label text for the position input",table:{type:{summary:"string"},defaultValue:{summary:""}}},value:{control:"text",description:'Current selected position (e.g., "1-1")',table:{type:{summary:"string"},defaultValue:{summary:"1-1"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Controls the component size",table:{type:{summary:"xs | sm | md | lg | xl"},defaultValue:{summary:"md"}}},grid_size:{control:"select",options:["2x2","3x3","4x4","5x5"],description:"Grid size configuration",table:{type:{summary:"2x2 | 3x3 | 4x4 | 5x5"},defaultValue:{summary:"3x3"}}},animation:{control:"select",options:["spring","smooth","bounce","fade"],description:"Animation type for position changes",table:{type:{summary:"spring | smooth | bounce | fade"},defaultValue:{summary:"spring"}}},coordinate_system:{control:"select",options:["zero-based","one-based","named"],description:"Coordinate system to use",table:{type:{summary:"zero-based | one-based | named"},defaultValue:{summary:"zero-based"}}},disabled:{control:"boolean",description:"Whether the component is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},keyboard_navigation:{control:"boolean",description:"Enable keyboard navigation with arrow keys",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},show_labels:{control:"boolean",description:"Show position labels on hover",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},animation_duration:{control:{type:"range",min:100,max:1e3,step:50},description:"Animation duration in milliseconds",table:{type:{summary:"number"},defaultValue:{summary:"300"}}}},args:{label:"Select Position",value:"1-1",size:"md",grid_size:"3x3",animation:"spring",coordinate_system:"zero-based",disabled:!1,keyboard_navigation:!0,show_labels:!1,animation_duration:300}},d={render:i=>l`
    <aw-position-input 
      label=${i.label}
      value=${i.value}
      size=${i.size}
      grid_size=${i.grid_size}
      animation=${i.animation}
      coordinate_system=${i.coordinate_system}
      ?disabled=${i.disabled}
      ?keyboard_navigation=${i.keyboard_navigation}
      ?show_labels=${i.show_labels}
      animation_duration=${i.animation_duration}
      @awChange=${e=>{console.log("Position changed:",e.detail)}}
      @awPositionSelected=${e=>{console.log("Position selected:",e.detail)}}>
    </aw-position-input>
  `},u={render:()=>l`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="text-align: center;">
        <aw-position-input 
          label="2x2 Grid"
          value="0-0"
          grid_size="2x2"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="3x3 Grid"
          value="1-1"
          grid_size="3x3"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="4x4 Grid"
          value="1-1"
          grid_size="4x4"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="5x5 Grid"
          value="2-2"
          grid_size="5x5"
          size="lg">
        </aw-position-input>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Position input supports multiple grid sizes from 2x2 up to 5x5 for different use cases."}}}},m={render:()=>l`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-position-input 
          label="Spring Animation"
          value="1-1"
          animation="spring"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Bouncy spring effect
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Smooth Animation"
          value="1-1"
          animation="smooth"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Smooth ease-out
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Bounce Animation"
          value="1-1"
          animation="bounce"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Elastic bounce effect
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Fade Animation"
          value="1-1"
          animation="fade"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Simple fade effect
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Click different positions to see the animation effects
    </p>
  `,parameters:{docs:{description:{story:"Position input supports multiple animation types for the position indicator movement."}}}},c={render:()=>l`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <aw-position-input 
          label="XS Size"
          value="1-1"
          size="xs">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Small Size"
          value="1-1"
          size="sm">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Medium Size"
          value="1-1"
          size="md">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Large Size"
          value="1-1"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="XL Size"
          value="1-1"
          size="xl">
        </aw-position-input>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Position input supports 5 different sizes to fit various design contexts."}}}},g={render:()=>l`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Keyboard Navigation</h3>
        <p style="color: #666; max-width: 400px;">
          Click on the position input below and use arrow keys to navigate.
          Try Up, Down, Left, Right, Home, and End keys.
        </p>
      </div>
      
      <aw-position-input 
        label="Use Arrow Keys"
        value="1-1"
        grid_size="3x3"
        size="xl"
        keyboard_navigation
        show_labels>
      </aw-position-input>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
        <h4>Keyboard Controls:</h4>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
          <li><strong>Arrow Keys:</strong> Navigate positions</li>
          <li><strong>Home:</strong> Go to minimum position</li>
          <li><strong>End:</strong> Go to maximum position</li>
          <li><strong>Enter/Space:</strong> Select position</li>
        </ul>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Position input supports comprehensive keyboard navigation for accessibility. Focus the component and use arrow keys to navigate."}}}},v={render:()=>l`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Interactive Features</h3>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; width: 100%;">
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>With Labels</h4>
          <aw-position-input 
            label="Hover for Labels"
            value="1-1"
            size="lg"
            show_labels>
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Hover over positions to see labels
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Custom Animation Speed</h4>
          <aw-position-input 
            label="Fast Animation"
            value="1-1"
            size="lg"
            animation="spring"
            animation_duration="150">
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Faster animation (150ms)
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Disabled State</h4>
          <aw-position-input 
            label="Disabled Input"
            value="1-1"
            size="lg"
            disabled>
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Cannot be interacted with
          </p>
        </div>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Position input includes various interactive features like hover labels, custom animation speeds, and disabled states."}}}},y={render:()=>l`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Image Alignment Control</h3>
        <aw-position-input 
          label="Image Position"
          value="1-1"
          grid_size="3x3"
          animation="smooth"
          show_labels>
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Control where images are positioned within containers
        </p>
      </div>
      
      <div>
        <h3>Layout Grid Selector</h3>
        <aw-position-input 
          label="Grid Position"
          value="0-0"
          grid_size="4x4"
          animation="spring"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Select positions in responsive grid layouts
        </p>
      </div>
      
      <div>
        <h3>Game Board Position</h3>
        <aw-position-input 
          label="Player Position"
          value="2-2"
          grid_size="5x5"
          animation="bounce"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Select positions on game boards or tile-based interfaces
        </p>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Real-world examples showing how position input can be used for image alignment, layout selection, and game interfaces."}}}};var x,z,_,S,k;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => html\`
    <aw-position-input 
      label=\${args.label}
      value=\${args.value}
      size=\${args.size}
      grid_size=\${args.grid_size}
      animation=\${args.animation}
      coordinate_system=\${args.coordinate_system}
      ?disabled=\${args.disabled}
      ?keyboard_navigation=\${args.keyboard_navigation}
      ?show_labels=\${args.show_labels}
      animation_duration=\${args.animation_duration}
      @awChange=\${(e: CustomEvent) => {
    console.log('Position changed:', e.detail);
  }}
      @awPositionSelected=\${(e: CustomEvent) => {
    console.log('Position selected:', e.detail);
  }}>
    </aw-position-input>
  \`
}`,...(_=(z=d.parameters)==null?void 0:z.docs)==null?void 0:_.source},description:{story:"The default position input with standard settings",...(k=(S=d.parameters)==null?void 0:S.docs)==null?void 0:k.description}}};var C,$,P,E,A;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="text-align: center;">
        <aw-position-input 
          label="2x2 Grid"
          value="0-0"
          grid_size="2x2"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="3x3 Grid"
          value="1-1"
          grid_size="3x3"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="4x4 Grid"
          value="1-1"
          grid_size="4x4"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="5x5 Grid"
          value="2-2"
          grid_size="5x5"
          size="lg">
        </aw-position-input>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports multiple grid sizes from 2x2 up to 5x5 for different use cases.'
      }
    }
  }
}`,...(P=($=u.parameters)==null?void 0:$.docs)==null?void 0:P.source},description:{story:"Examples of different grid sizes",...(A=(E=u.parameters)==null?void 0:E.docs)==null?void 0:A.description}}};var I,G,T,L,D;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-position-input 
          label="Spring Animation"
          value="1-1"
          animation="spring"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Bouncy spring effect
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Smooth Animation"
          value="1-1"
          animation="smooth"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Smooth ease-out
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Bounce Animation"
          value="1-1"
          animation="bounce"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Elastic bounce effect
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Fade Animation"
          value="1-1"
          animation="fade"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Simple fade effect
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Click different positions to see the animation effects
    </p>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports multiple animation types for the position indicator movement.'
      }
    }
  }
}`,...(T=(G=m.parameters)==null?void 0:G.docs)==null?void 0:T.source},description:{story:"Examples of different animation types",...(D=(L=m.parameters)==null?void 0:L.docs)==null?void 0:D.description}}};var M,B,V,K,F;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <aw-position-input 
          label="XS Size"
          value="1-1"
          size="xs">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Small Size"
          value="1-1"
          size="sm">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Medium Size"
          value="1-1"
          size="md">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="Large Size"
          value="1-1"
          size="lg">
        </aw-position-input>
      </div>
      
      <div style="text-align: center;">
        <aw-position-input 
          label="XL Size"
          value="1-1"
          size="xl">
        </aw-position-input>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports 5 different sizes to fit various design contexts.'
      }
    }
  }
}`,...(V=(B=c.parameters)==null?void 0:B.docs)==null?void 0:V.source},description:{story:"Examples of different component sizes",...(F=(K=c.parameters)==null?void 0:K.docs)==null?void 0:F.description}}};var R,H,N,U,O;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Keyboard Navigation</h3>
        <p style="color: #666; max-width: 400px;">
          Click on the position input below and use arrow keys to navigate.
          Try Up, Down, Left, Right, Home, and End keys.
        </p>
      </div>
      
      <aw-position-input 
        label="Use Arrow Keys"
        value="1-1"
        grid_size="3x3"
        size="xl"
        keyboard_navigation
        show_labels>
      </aw-position-input>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
        <h4>Keyboard Controls:</h4>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
          <li><strong>Arrow Keys:</strong> Navigate positions</li>
          <li><strong>Home:</strong> Go to minimum position</li>
          <li><strong>End:</strong> Go to maximum position</li>
          <li><strong>Enter/Space:</strong> Select position</li>
        </ul>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Position input supports comprehensive keyboard navigation for accessibility. Focus the component and use arrow keys to navigate.'
      }
    }
  }
}`,...(N=(H=g.parameters)==null?void 0:H.docs)==null?void 0:N.source},description:{story:"Keyboard navigation demonstration",...(O=(U=g.parameters)==null?void 0:U.docs)==null?void 0:O.description}}};var j,X,W,q,J;v.parameters={...v.parameters,docs:{...(j=v.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Interactive Features</h3>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; width: 100%;">
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>With Labels</h4>
          <aw-position-input 
            label="Hover for Labels"
            value="1-1"
            size="lg"
            show_labels>
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Hover over positions to see labels
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Custom Animation Speed</h4>
          <aw-position-input 
            label="Fast Animation"
            value="1-1"
            size="lg"
            animation="spring"
            animation_duration="150">
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Faster animation (150ms)
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Disabled State</h4>
          <aw-position-input 
            label="Disabled Input"
            value="1-1"
            size="lg"
            disabled>
          </aw-position-input>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Cannot be interacted with
          </p>
        </div>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Position input includes various interactive features like hover labels, custom animation speeds, and disabled states.'
      }
    }
  }
}`,...(W=(X=v.parameters)==null?void 0:X.docs)==null?void 0:W.source},description:{story:"Interactive features showcase",...(J=(q=v.parameters)==null?void 0:q.docs)==null?void 0:J.description}}};var Q,Y,Z,ii,ei;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Image Alignment Control</h3>
        <aw-position-input 
          label="Image Position"
          value="1-1"
          grid_size="3x3"
          animation="smooth"
          show_labels>
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Control where images are positioned within containers
        </p>
      </div>
      
      <div>
        <h3>Layout Grid Selector</h3>
        <aw-position-input 
          label="Grid Position"
          value="0-0"
          grid_size="4x4"
          animation="spring"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Select positions in responsive grid layouts
        </p>
      </div>
      
      <div>
        <h3>Game Board Position</h3>
        <aw-position-input 
          label="Player Position"
          value="2-2"
          grid_size="5x5"
          animation="bounce"
          size="lg">
        </aw-position-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Select positions on game boards or tile-based interfaces
        </p>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how position input can be used for image alignment, layout selection, and game interfaces.'
      }
    }
  }
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Real-world usage examples",...(ei=(ii=y.parameters)==null?void 0:ii.docs)==null?void 0:ei.description}}};const ci=["Default","GridSizes","AnimationTypes","Sizes","KeyboardNavigation","InteractiveFeatures","UsageExamples"];export{m as AnimationTypes,d as Default,u as GridSizes,v as InteractiveFeatures,g as KeyboardNavigation,c as Sizes,y as UsageExamples,ci as __namedExportsOrder,mi as default};
