import{T as me,i as ce,a as ye,x as p}from"./lit-element-b4b0194a.js";import{n as s,t as ve}from"./property-64877f55.js";import{r as b}from"./state-66c4e041.js";import{e as pe}from"./query-a5550cfe.js";import{e as x}from"./class-map-1caf54e8.js";import{e as ge,i as he,t as we}from"./directive-12249aa5.js";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de="important",be=" !"+de,_=ge(class extends he{constructor(e){var t;if(super(e),e.type!==we.ATTRIBUTE||e.name!=="style"||((t=e.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{const a=e[n];return a==null?t:t+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const a of this.ft)t[a]==null&&(this.ft.delete(a),a.includes("-")?n.removeProperty(a):n[a]=null);for(const a in t){const o=t[a];if(o!=null){this.ft.add(a);const l=typeof o=="string"&&o.endsWith(be);a.includes("-")||l?n.setProperty(a,l?o.slice(0,-11):o,l?de:""):n[a]=o}}return me}});var fe=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,i=(e,t,n,a)=>{for(var o=a>1?void 0:a?xe(t,n):t,l=e.length-1,w;l>=0;l--)(w=e[l])&&(o=(a?w(t,n,o):w(o))||o);return a&&o&&fe(t,n,o),o};let r=class extends ye{constructor(){super(...arguments),this.label="",this.value=0,this.size="md",this.mode="continuous",this.sensitivity=.5,this.disabled=!1,this.keyboard_navigation=!0,this.show_value=!1,this.animation_curve="cubic-bezier(0.25, 0.46, 0.45, 0.94)",this.animation_duration=200,this.min=0,this.max=1,this.step=.1,this.snap_points=[],this.limit_angle=270,this.start_angle=-135,this.indicator_color="",this.rotationDegrees=0,this.isDragging=!1,this.isFocused=!1,this.validationError="",this.lastY=0,this.accumulatedRotation=0,this.handleMouseMove=e=>{!this.isDragging||this.disabled||(e.preventDefault(),this.updateRotation(e.clientY))},this.handleMouseUp=e=>{this.isDragging=!1,document.body.style.cursor="default",document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp),this.dispatchEvent(new CustomEvent("awDragEnd",{detail:{value:this.value,degrees:this.rotationDegrees},bubbles:!0,composed:!0}))},this.handleMouseDown=e=>{this.disabled||(e.preventDefault(),e.stopPropagation(),this.isDragging=!0,this.lastY=e.clientY,document.body.style.cursor="ns-resize",document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),this.containerElement&&this.containerElement.focus(),this.dispatchEvent(new CustomEvent("awDragStart",{detail:{value:this.value,degrees:this.rotationDegrees},bubbles:!0,composed:!0})))},this.handleKeyDown=e=>{if(!this.keyboard_navigation||this.disabled)return;const{key:t}=e;let n=0;switch(t){case"ArrowUp":case"ArrowRight":n=this.step;break;case"ArrowDown":case"ArrowLeft":n=-this.step;break;case"PageUp":n=this.step*5;break;case"PageDown":n=-this.step*5;break;case"Home":this.setValue(this.min),e.preventDefault();return;case"End":this.setValue(this.max),e.preventDefault();return}if(n!==0){e.preventDefault();const a=this.max-this.min,o=n/a;this.setValue(Math.max(0,Math.min(1,this.value+o)))}},this.handleFocus=()=>{this.isFocused=!0,this.dispatchEvent(new CustomEvent("awFocus",{detail:{value:this.value},bubbles:!0,composed:!0}))},this.handleBlur=()=>{this.isFocused=!1,this.dispatchEvent(new CustomEvent("awBlur",{detail:{value:this.value},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this.updateRotationFromValue()}disconnectedCallback(){super.disconnectedCallback(),this.animationTimeout&&clearTimeout(this.animationTimeout),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}willUpdate(e){e.has("value")&&this.updateRotationFromValue()}updateRotationFromValue(){let e=this.value*360;switch(this.mode){case"limited":e=this.value*this.limit_angle;break;case"stepped":e=this.snapToStep(this.value)*this.limit_angle;break;case"snap":e=this.snapToPoints(this.value)*360;break}if(this.rotationDegrees=this.start_angle+e,this.accumulatedRotation=this.rotationDegrees,this.validation){const t=this.validation(this.value);this.validationError=t.isValid?"":t.error||""}}getDiameter(){const e={xs:24,sm:32,md:40,lg:56,xl:72};return e[this.size]||e.md}snapToStep(e){if(this.step<=0)return e;const t=this.max-this.min,n=Math.round(t/this.step),a=Math.round(e*n)/n;return Math.max(0,Math.min(1,a))}snapToPoints(e){if(this.snap_points.length===0)return e;let t=this.snap_points[0],n=Math.abs(e-t);for(const a of this.snap_points){const o=Math.abs(e-a);o<n&&(n=o,t=a)}return t}updateRotation(e){if(this.disabled)return;const t=(this.lastY-e)*this.sensitivity;let n=this.accumulatedRotation+t,a=this.value;switch(this.mode){case"continuous":this.accumulatedRotation=n,this.rotationDegrees=n,a=(n-this.start_angle)%360/360,a<0&&(a+=1);break;case"limited":const l=Math.max(this.start_angle,Math.min(this.start_angle+this.limit_angle,n));this.accumulatedRotation=l,this.rotationDegrees=l,a=(l-this.start_angle)/this.limit_angle;break;case"stepped":const ue=(Math.max(this.start_angle,Math.min(this.start_angle+this.limit_angle,n))-this.start_angle)/this.limit_angle;a=this.snapToStep(ue),this.rotationDegrees=this.start_angle+a*this.limit_angle,this.accumulatedRotation=this.rotationDegrees;break;case"snap":const f=(n-this.start_angle)%360/360;a=this.snapToPoints(f<0?f+1:f),this.rotationDegrees=this.start_angle+a*360,this.accumulatedRotation=this.rotationDegrees;break}if(this.validation){const l=this.validation(a);if(l.isValid)this.validationError="";else if(this.validationError=l.error||"",l.clampedValue!==void 0)a=l.clampedValue;else return}const o=this.value;this.value=a,this.lastY=e,this.dispatchEvent(new CustomEvent("awChange",{detail:{value:a,previousValue:o,degrees:this.rotationDegrees,mode:this.mode,isDragging:this.isDragging},bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("awInput",{detail:{value:a,degrees:this.rotationDegrees},bubbles:!0,composed:!0}))}setValue(e){const t=Math.max(0,Math.min(1,e)),n=this.value;this.value=t,this.dispatchEvent(new CustomEvent("awChange",{detail:{value:t,previousValue:n,degrees:this.rotationDegrees},bubbles:!0,composed:!0}))}getConfig(){return{min:this.min,max:this.max,step:this.step,snapPoints:this.snap_points,limitAngle:this.limit_angle,startAngle:this.start_angle}}generateTicks(){if(this.mode==="stepped"&&this.step>0){const e=this.max-this.min,t=Math.round(e/this.step);return Array.from({length:t+1},(n,a)=>a/t)}else if(this.mode==="snap"&&this.snap_points.length>0)return this.snap_points.slice();return[]}getSizeValue(){switch(this.size){case"xs":return 20;case"sm":return 24;case"md":return 32;case"lg":return 40;case"xl":return 48;default:return 32}}render(){const e=this.getSizeValue(),t={width:`${e*2}px`,height:`${e*2}px`},n={transform:`rotate(${this.rotationDegrees}deg)`};return p`
      <div class=${x({"aw-rotary-input":!0,"aw-rotary-input--state-dragging":this.isDragging})}>
        ${this.label?p`
          <span class="aw-rotary-input__label">${this.label}</span>
        `:""}
        
        <div 
          class="aw-rotary-input__container"
          style=${_(t)}
        >
          <div class="aw-rotary-input__track"></div>
          
          <div 
            class=${x({"aw-rotary-input__knob":!0,[`aw-rotary-input__knob--size-${this.size}`]:!0})}
            style=${_(n)}
            @mousedown=${this.handleMouseDown}
          >
            <div class=${x({"aw-rotary-input__indicator":!0,[`aw-rotary-input__indicator--size-${this.size}`]:!0})}></div>
          </div>
        </div>
      </div>
    `}};r.styles=ce`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-rotary-input */
    .aw-rotary-input {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--aw-rotary-input-gap, 0.5rem);
    }

    /* ITCSS - Components: Element - label */
    .aw-rotary-input__label {
      font-size: var(--aw-rotary-input-label-font-size, 0.75rem);
      color: var(--aw-rotary-input-label-color, var(--text-color, #6b7280));
    }

    /* ITCSS - Components: Element - rotary container */
    .aw-rotary-input__container {
      position: relative;
      display: inline-block;
    }

    /* ITCSS - Components: Element - rotary track */
    .aw-rotary-input__track {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: var(--aw-rotary-input-track-bg, var(--surface1, #f5f5f5));
      border: 2px solid var(--aw-rotary-input-track-border, var(--surface3, #e5e7eb));
      pointer-events: none;
    }

    /* ITCSS - Components: Element - rotary knob */
    .aw-rotary-input__knob {
      position: absolute;
      border-radius: 50%;
      background: var(--aw-rotary-input-knob-bg, #ffffff);
      cursor: ns-resize;
      box-shadow: var(--aw-rotary-input-knob-shadow, 0 1px 3px 0 rgba(0, 0, 0, 0.1));
      user-select: none;
      z-index: 10;
      transition: box-shadow var(--aw-transition-duration-default, 0.2s) var(--aw-transition-timing-ease, ease-in-out);
      transform-origin: center center;
    }

    .aw-rotary-input__knob:hover {
      box-shadow: var(--aw-rotary-input-knob-shadow-hover, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .aw-rotary-input__knob:active {
      box-shadow: var(--aw-rotary-input-knob-shadow-active, 0 1px 2px 0 rgba(0, 0, 0, 0.1));
    }

    /* ITCSS - Components: Element - knob indicator */
    .aw-rotary-input__indicator {
      position: absolute;
      left: 50%;
      background: var(--aw-rotary-input-indicator-color, var(--text-color, #374151));
      border-radius: var(--aw-rotary-input-indicator-radius, 50%);
      pointer-events: none;
      transform: translateX(-50%);
    }

    /* ITCSS - Settings: Size CSS variables */
    :host {
      --aw-rotary-size-xs: 24px;
      --aw-rotary-size-sm: 32px;
      --aw-rotary-size-md: 40px;
      --aw-rotary-size-lg: 56px;
      --aw-rotary-size-xl: 72px;
    }

    /* ITCSS - Components: Size modifiers with BEM */
    .aw-rotary-input--size-xs {
      --aw-rotary-diameter: var(--aw-rotary-size-xs);
      --aw-rotary-knob-offset: 12%;
      --aw-rotary-indicator-width: 1px;
      --aw-rotary-indicator-height: 20%;
    }

    .aw-rotary-input--size-sm {
      --aw-rotary-diameter: var(--aw-rotary-size-sm);
      --aw-rotary-knob-offset: 15%;
      --aw-rotary-indicator-width: 2px;
      --aw-rotary-indicator-height: 18%;
    }

    .aw-rotary-input--size-md {
      --aw-rotary-diameter: var(--aw-rotary-size-md);
      --aw-rotary-knob-offset: 10%;
      --aw-rotary-indicator-width: 2px;
      --aw-rotary-indicator-height: 20%;
    }

    .aw-rotary-input--size-lg {
      --aw-rotary-diameter: var(--aw-rotary-size-lg);
      --aw-rotary-knob-offset: 8%;
      --aw-rotary-indicator-width: 3px;
      --aw-rotary-indicator-height: 22%;
    }

    .aw-rotary-input--size-xl {
      --aw-rotary-diameter: var(--aw-rotary-size-xl);
      --aw-rotary-knob-offset: 6%;
      --aw-rotary-indicator-width: 4px;
      --aw-rotary-indicator-height: 24%;
    }

    /* Updated knob sizes using CSS variables */
    .aw-rotary-input__knob {
      top: var(--aw-rotary-knob-offset);
      left: var(--aw-rotary-knob-offset);
      width: calc(100% - (var(--aw-rotary-knob-offset) * 2));
      height: calc(100% - (var(--aw-rotary-knob-offset) * 2));
    }

    .aw-rotary-input__indicator {
      width: var(--aw-rotary-indicator-width);
      height: var(--aw-rotary-indicator-height);
      top: var(--aw-rotary-knob-offset);
    }

    /* ITCSS - Components: Value display */
    .aw-rotary-input__value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: calc(var(--aw-rotary-diameter) * 0.15);
      font-weight: var(--aw-font-weight-semibold, 600);
      color: var(--aw-text-color, var(--aw-color-neutral-700, #374151));
      pointer-events: none;
      z-index: 5;
    }

    /* ITCSS - Components: Tick marks for stepped mode */
    .aw-rotary-input__ticks {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .aw-rotary-input__tick {
      position: absolute;
      background: var(--aw-color-neutral-400, #9ca3af);
      border-radius: 1px;
      transform-origin: center bottom;
    }

    /* ITCSS - State: Mode modifiers */
    .aw-rotary-input--mode-stepped .aw-rotary-input__tick {
      width: 1px;
      height: 8px;
      top: 2px;
      left: 50%;
      margin-left: -0.5px;
    }

    .aw-rotary-input--mode-snap .aw-rotary-input__tick {
      width: 2px;
      height: 10px;
      top: 1px;
      left: 50%;
      margin-left: -1px;
      background: var(--aw-accent-pri, var(--aw-color-primary-600, #2563eb));
    }

    /* ITCSS - State: Disabled state modifier */
    .aw-rotary-input--state-disabled {
      opacity: var(--aw-opacity-disabled, 0.5);
      pointer-events: none;
    }

    .aw-rotary-input--state-disabled .aw-rotary-input__knob {
      cursor: not-allowed;
    }

    /* ITCSS - State: Error state modifier */
    .aw-rotary-input--state-error {
      --aw-rotary-input-track-border: var(--aw-color-danger-500, #ef4444);
      --aw-rotary-input-indicator-color: var(--aw-color-danger-500, #ef4444);
    }

    /* ITCSS - Components: Focus ring */
    .aw-rotary-input__container:focus-within {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
      border-radius: 50%;
    }

    /* ITCSS - State: Dragging state modifier */
    .aw-rotary-input--state-dragging {
      user-select: none;
    }

    .aw-rotary-input--state-dragging .aw-rotary-input__knob {
      cursor: ns-resize;
    }
  `;i([s()],r.prototype,"label",2);i([s({type:Number})],r.prototype,"value",2);i([s()],r.prototype,"size",2);i([s()],r.prototype,"mode",2);i([s()],r.prototype,"sensitivity",2);i([s({type:Boolean})],r.prototype,"disabled",2);i([s({type:Boolean})],r.prototype,"keyboard_navigation",2);i([s({type:Boolean})],r.prototype,"show_value",2);i([s()],r.prototype,"animation_curve",2);i([s({type:Number})],r.prototype,"animation_duration",2);i([s({type:Number})],r.prototype,"min",2);i([s({type:Number})],r.prototype,"max",2);i([s({type:Number})],r.prototype,"step",2);i([s({type:Array})],r.prototype,"snap_points",2);i([s({type:Number})],r.prototype,"limit_angle",2);i([s({type:Number})],r.prototype,"start_angle",2);i([s()],r.prototype,"indicator_color",2);i([s({type:Object})],r.prototype,"formatter",2);i([s({type:Object})],r.prototype,"validation",2);i([b()],r.prototype,"rotationDegrees",2);i([b()],r.prototype,"isDragging",2);i([b()],r.prototype,"isFocused",2);i([b()],r.prototype,"validationError",2);i([pe(".aw-rotary-input__knob")],r.prototype,"knobElement",2);i([pe(".aw-rotary-input__container")],r.prototype,"containerElement",2);r=i([ve("aw-rotary-input")],r);const Me={title:"Components/Base/Rotary Input",component:"aw-rotary-input",parameters:{layout:"centered",docs:{description:{component:`
An interactive rotary input component that simulates physical knobs and dials.

## Features
- Multiple operation modes (continuous, limited, stepped, snap)
- Drag-based interaction with configurable sensitivity
- Keyboard navigation support
- Value display and formatting
- Validation and error handling
- Responsive sizing
- ARIA compliant

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-rotary-input 
  label="Volume"
  value="0.5"
  mode="limited"
  min="0"
  max="1">
</aw-rotary-input>
\`\`\`
        `}}},argTypes:{label:{control:"text",description:"Label text for the rotary input",table:{type:{summary:"string"},defaultValue:{summary:""}}},value:{control:{type:"range",min:0,max:1,step:.01},description:"Current rotation value (0-1 normalized)",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Controls the component size",table:{type:{summary:"xs | sm | md | lg | xl"},defaultValue:{summary:"md"}}},mode:{control:"select",options:["continuous","limited","stepped","snap"],description:"Rotary input operation mode",table:{type:{summary:"continuous | limited | stepped | snap"},defaultValue:{summary:"continuous"}}},sensitivity:{control:{type:"range",min:.1,max:1.2,step:.1},description:"Mouse drag sensitivity",table:{type:{summary:"number"},defaultValue:{summary:"0.5"}}},disabled:{control:"boolean",description:"Whether the component is disabled",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},keyboard_navigation:{control:"boolean",description:"Enable keyboard navigation",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},show_value:{control:"boolean",description:"Show value display in center",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},animation_curve:{control:"select",options:["linear","ease","ease-in-out","cubic-bezier(0.34, 1.56, 0.64, 1)","cubic-bezier(0.25, 0.46, 0.45, 0.94)"],description:"Animation curve for smooth transitions",table:{type:{summary:"linear | ease | ease-in-out | spring | smooth"},defaultValue:{summary:"smooth"}}},min:{control:{type:"number",min:-10,max:10,step:.1},description:"Minimum value (for limited and stepped modes)",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},max:{control:{type:"number",min:-10,max:10,step:.1},description:"Maximum value (for limited and stepped modes)",table:{type:{summary:"number"},defaultValue:{summary:"1"}}},step:{control:{type:"number",min:.01,max:1,step:.01},description:"Step size (for stepped mode)",table:{type:{summary:"number"},defaultValue:{summary:"0.1"}}},limit_angle:{control:{type:"range",min:90,max:360,step:15},description:"Maximum rotation angle in degrees (for limited mode)",table:{type:{summary:"number"},defaultValue:{summary:"270"}}},start_angle:{control:{type:"range",min:-180,max:180,step:15},description:"Starting angle offset in degrees",table:{type:{summary:"number"},defaultValue:{summary:"-135"}}}},args:{label:"Rotary Control",value:.5,size:"md",mode:"continuous",sensitivity:.5,disabled:!1,keyboard_navigation:!0,show_value:!1,animation_curve:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",min:0,max:1,step:.1,limit_angle:270,start_angle:-135}},d={render:e=>p`
    <aw-rotary-input 
      label=${e.label}
      value=${e.value}
      size=${e.size}
      mode=${e.mode}
      sensitivity=${e.sensitivity}
      ?disabled=${e.disabled}
      ?keyboard_navigation=${e.keyboard_navigation}
      ?show_value=${e.show_value}
      animation_curve=${e.animation_curve}
      min=${e.min}
      max=${e.max}
      step=${e.step}
      limit_angle=${e.limit_angle}
      start_angle=${e.start_angle}
      @awChange=${t=>{console.log("Rotary value changed:",t.detail)}}
      @awDragStart=${t=>{console.log("Drag started:",t.detail)}}
      @awDragEnd=${t=>{console.log("Drag ended:",t.detail)}}>
    </aw-rotary-input>
  `},u={render:()=>p`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Continuous"
          value="0.3"
          mode="continuous"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Unlimited rotation
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Limited"
          value="0.5"
          mode="limited"
          limit_angle="270"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          270° range limit
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Stepped"
          value="0.4"
          mode="stepped"
          step="0.2"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Discrete steps (0.2)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Snap Points"
          value="0.5"
          mode="snap"
          .snap_points=${[0,.25,.5,.75,1]}
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Snaps to specific values
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Drag each knob to experience different operation modes
    </p>
  `,parameters:{docs:{description:{story:"Rotary input supports four different operation modes: continuous rotation, limited range, stepped increments, and snap points."}}}},m={render:()=>p`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; justify-content: center;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="XS"
          value="0.3"
          size="xs"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Small"
          value="0.4"
          size="sm"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Medium"
          value="0.5"
          size="md"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Large"
          value="0.6"
          size="lg"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="XL"
          value="0.7"
          size="xl"
          mode="limited">
        </aw-rotary-input>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Rotary input supports 5 different sizes to fit various design contexts."}}}},c={render:()=>p`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Very Low"
          value="0.5"
          sensitivity="0.1"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 0.1 (precise)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Normal"
          value="0.5"
          sensitivity="0.5"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 0.5 (balanced)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Very High"
          value="0.5"
          sensitivity="1.2"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 1.2 (quick)
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Drag each knob to feel the difference in sensitivity levels
    </p>
  `,parameters:{docs:{description:{story:"Different sensitivity levels affect how much the knob rotates relative to mouse movement. Lower values provide more precise control."}}}},y={render:()=>p`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Keyboard Navigation</h3>
        <p style="color: #666; max-width: 400px;">
          Click on a rotary input below and use keyboard controls.
          Try arrow keys, Page Up/Down, Home, and End.
        </p>
      </div>
      
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
        <aw-rotary-input 
          label="Use Arrow Keys"
          value="0.5"
          mode="limited"
          size="xl"
          show_value
          keyboard_navigation>
        </aw-rotary-input>
        
        <aw-rotary-input 
          label="Stepped Control"
          value="0.6"
          mode="stepped"
          step="0.1"
          size="xl"
          show_value
          keyboard_navigation>
        </aw-rotary-input>
      </div>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
        <h4>Keyboard Controls:</h4>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
          <li><strong>Arrow Up/Right:</strong> Increase value</li>
          <li><strong>Arrow Down/Left:</strong> Decrease value</li>
          <li><strong>Page Up:</strong> Large increase</li>
          <li><strong>Page Down:</strong> Large decrease</li>
          <li><strong>Home:</strong> Go to minimum</li>
          <li><strong>End:</strong> Go to maximum</li>
        </ul>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Rotary input supports comprehensive keyboard navigation for accessibility. Focus the component and use keyboard controls."}}}},v={render:()=>p`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Volume"
          value="0.75"
          mode="limited"
          size="xl"
          show_value
          .formatter=${e=>`${Math.round(e*100)}%`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Percentage display
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Temperature"
          value="0.4"
          mode="limited"
          min="-10"
          max="40"
          size="xl"
          show_value
          .formatter=${e=>`${Math.round(-10+e*50)}°C`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Temperature range
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Frequency"
          value="0.6"
          mode="limited"
          size="xl"
          show_value
          .formatter=${e=>`${(e*20).toFixed(1)}kHz`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Frequency display
        </p>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Rotary input supports custom value formatting for different units and display formats."}}}},g={render:()=>p`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Normal State"
          value="0.6"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Interactive
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Disabled State"
          value="0.4"
          mode="limited"
          size="lg"
          show_value
          disabled>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Cannot interact
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="No Keyboard"
          value="0.7"
          mode="limited"
          size="lg"
          show_value
          keyboard_navigation="false">
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Mouse only
        </p>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Rotary input supports disabled states and can have keyboard navigation disabled while keeping mouse interaction."}}}},h={render:()=>p`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Audio Mixer Controls</h3>
        <div style="display: flex; gap: 1rem; align-items: end;">
          <aw-rotary-input 
            label="Volume"
            value="0.75"
            mode="limited"
            size="lg"
            show_value
            .formatter=${e=>`${Math.round(e*100)}%`}>
          </aw-rotary-input>
          <aw-rotary-input 
            label="Balance"
            value="0.5"
            mode="limited"
            start_angle="-90"
            limit_angle="180"
            size="lg"
            show_value
            .formatter=${e=>e<.5?`L${Math.round((.5-e)*200)}`:e>.5?`R${Math.round((e-.5)*200)}`:"C"}>
          </aw-rotary-input>
          <aw-rotary-input 
            label="Treble"
            value="0.6"
            mode="limited"
            size="lg"
            show_value
            .formatter=${e=>`${Math.round((e-.5)*20)}dB`}>
          </aw-rotary-input>
        </div>
      </div>
      
      <div>
        <h3>Motor Speed Control</h3>
        <aw-rotary-input 
          label="RPM"
          value="0.3"
          mode="stepped"
          step="0.05"
          size="xl"
          show_value
          .formatter=${e=>`${Math.round(e*3e3)} RPM`}>
        </aw-rotary-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Stepped control for precise speed settings
        </p>
      </div>
      
      <div>
        <h3>Color Picker Hue</h3>
        <aw-rotary-input 
          label="Hue"
          value="0.6"
          mode="continuous"
          size="xl"
          show_value
          .formatter=${e=>`${Math.round(e*360)}°`}>
        </aw-rotary-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Continuous rotation for hue selection
        </p>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Real-world examples showing how rotary input can be used for audio controls, motor speed, and color selection."}}}};var z,k,S,$,C;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => html\`
    <aw-rotary-input 
      label=\${args.label}
      value=\${args.value}
      size=\${args.size}
      mode=\${args.mode}
      sensitivity=\${args.sensitivity}
      ?disabled=\${args.disabled}
      ?keyboard_navigation=\${args.keyboard_navigation}
      ?show_value=\${args.show_value}
      animation_curve=\${args.animation_curve}
      min=\${args.min}
      max=\${args.max}
      step=\${args.step}
      limit_angle=\${args.limit_angle}
      start_angle=\${args.start_angle}
      @awChange=\${(e: CustomEvent) => {
    console.log('Rotary value changed:', e.detail);
  }}
      @awDragStart=\${(e: CustomEvent) => {
    console.log('Drag started:', e.detail);
  }}
      @awDragEnd=\${(e: CustomEvent) => {
    console.log('Drag ended:', e.detail);
  }}>
    </aw-rotary-input>
  \`
}`,...(S=(k=d.parameters)==null?void 0:k.docs)==null?void 0:S.source},description:{story:"The default rotary input with standard settings",...(C=($=d.parameters)==null?void 0:$.docs)==null?void 0:C.description}}};var D,M,E,R,V;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Continuous"
          value="0.3"
          mode="continuous"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Unlimited rotation
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Limited"
          value="0.5"
          mode="limited"
          limit_angle="270"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          270° range limit
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Stepped"
          value="0.4"
          mode="stepped"
          step="0.2"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Discrete steps (0.2)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Snap Points"
          value="0.5"
          mode="snap"
          .snap_points=\${[0, 0.25, 0.5, 0.75, 1]}
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Snaps to specific values
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Drag each knob to experience different operation modes
    </p>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports four different operation modes: continuous rotation, limited range, stepped increments, and snap points.'
      }
    }
  }
}`,...(E=(M=u.parameters)==null?void 0:M.docs)==null?void 0:E.source},description:{story:"Examples of different operation modes",...(V=(R=u.parameters)==null?void 0:R.docs)==null?void 0:V.description}}};var T,L,P,I,A;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; justify-content: center;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="XS"
          value="0.3"
          size="xs"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Small"
          value="0.4"
          size="sm"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Medium"
          value="0.5"
          size="md"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Large"
          value="0.6"
          size="lg"
          mode="limited">
        </aw-rotary-input>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="XL"
          value="0.7"
          size="xl"
          mode="limited">
        </aw-rotary-input>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports 5 different sizes to fit various design contexts.'
      }
    }
  }
}`,...(P=(L=m.parameters)==null?void 0:L.docs)==null?void 0:P.source},description:{story:"Examples of different component sizes",...(A=(I=m.parameters)==null?void 0:I.docs)==null?void 0:A.description}}};var U,F,N,H,B;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Very Low"
          value="0.5"
          sensitivity="0.1"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 0.1 (precise)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Normal"
          value="0.5"
          sensitivity="0.5"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 0.5 (balanced)
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Very High"
          value="0.5"
          sensitivity="1.2"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Sensitivity: 1.2 (quick)
        </p>
      </div>
    </div>
    
    <p style="margin-top: 1rem; text-align: center; color: #666;">
      Drag each knob to feel the difference in sensitivity levels
    </p>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Different sensitivity levels affect how much the knob rotates relative to mouse movement. Lower values provide more precise control.'
      }
    }
  }
}`,...(N=(F=c.parameters)==null?void 0:F.docs)==null?void 0:N.source},description:{story:"Sensitivity and interaction demonstration",...(B=(H=c.parameters)==null?void 0:H.docs)==null?void 0:B.description}}};var K,j,O,q,X;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Keyboard Navigation</h3>
        <p style="color: #666; max-width: 400px;">
          Click on a rotary input below and use keyboard controls.
          Try arrow keys, Page Up/Down, Home, and End.
        </p>
      </div>
      
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
        <aw-rotary-input 
          label="Use Arrow Keys"
          value="0.5"
          mode="limited"
          size="xl"
          show_value
          keyboard_navigation>
        </aw-rotary-input>
        
        <aw-rotary-input 
          label="Stepped Control"
          value="0.6"
          mode="stepped"
          step="0.1"
          size="xl"
          show_value
          keyboard_navigation>
        </aw-rotary-input>
      </div>
      
      <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; text-align: center;">
        <h4>Keyboard Controls:</h4>
        <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
          <li><strong>Arrow Up/Right:</strong> Increase value</li>
          <li><strong>Arrow Down/Left:</strong> Decrease value</li>
          <li><strong>Page Up:</strong> Large increase</li>
          <li><strong>Page Down:</strong> Large decrease</li>
          <li><strong>Home:</strong> Go to minimum</li>
          <li><strong>End:</strong> Go to maximum</li>
        </ul>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports comprehensive keyboard navigation for accessibility. Focus the component and use keyboard controls.'
      }
    }
  }
}`,...(O=(j=y.parameters)==null?void 0:j.docs)==null?void 0:O.source},description:{story:"Keyboard navigation demonstration",...(X=(q=y.parameters)==null?void 0:q.docs)==null?void 0:X.description}}};var Y,G,W,Z,J;v.parameters={...v.parameters,docs:{...(Y=v.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Volume"
          value="0.75"
          mode="limited"
          size="xl"
          show_value
          .formatter=\${(value: number) => \`\${Math.round(value * 100)}%\`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Percentage display
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Temperature"
          value="0.4"
          mode="limited"
          min="-10"
          max="40"
          size="xl"
          show_value
          .formatter=\${(value: number) => \`\${Math.round(-10 + value * 50)}°C\`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Temperature range
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Frequency"
          value="0.6"
          mode="limited"
          size="xl"
          show_value
          .formatter=\${(value: number) => \`\${(value * 20).toFixed(1)}kHz\`}>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Frequency display
        </p>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports custom value formatting for different units and display formats.'
      }
    }
  }
}`,...(W=(G=v.parameters)==null?void 0:G.docs)==null?void 0:W.source},description:{story:"Value display and formatting",...(J=(Z=v.parameters)==null?void 0:Z.docs)==null?void 0:J.description}}};var Q,ee,te,ae,ne;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Normal State"
          value="0.6"
          mode="limited"
          size="lg"
          show_value>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Interactive
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="Disabled State"
          value="0.4"
          mode="limited"
          size="lg"
          show_value
          disabled>
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Cannot interact
        </p>
      </div>
      
      <div style="text-align: center;">
        <aw-rotary-input 
          label="No Keyboard"
          value="0.7"
          mode="limited"
          size="lg"
          show_value
          keyboard_navigation="false">
        </aw-rotary-input>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
          Mouse only
        </p>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Rotary input supports disabled states and can have keyboard navigation disabled while keeping mouse interaction.'
      }
    }
  }
}`,...(te=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Disabled and error states",...(ne=(ae=g.parameters)==null?void 0:ae.docs)==null?void 0:ne.description}}};var re,ie,oe,se,le;h.parameters={...h.parameters,docs:{...(re=h.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Audio Mixer Controls</h3>
        <div style="display: flex; gap: 1rem; align-items: end;">
          <aw-rotary-input 
            label="Volume"
            value="0.75"
            mode="limited"
            size="lg"
            show_value
            .formatter=\${(value: number) => \`\${Math.round(value * 100)}%\`}>
          </aw-rotary-input>
          <aw-rotary-input 
            label="Balance"
            value="0.5"
            mode="limited"
            start_angle="-90"
            limit_angle="180"
            size="lg"
            show_value
            .formatter=\${(value: number) => value < 0.5 ? \`L\${Math.round((0.5 - value) * 200)}\` : value > 0.5 ? \`R\${Math.round((value - 0.5) * 200)}\` : 'C'}>
          </aw-rotary-input>
          <aw-rotary-input 
            label="Treble"
            value="0.6"
            mode="limited"
            size="lg"
            show_value
            .formatter=\${(value: number) => \`\${Math.round((value - 0.5) * 20)}dB\`}>
          </aw-rotary-input>
        </div>
      </div>
      
      <div>
        <h3>Motor Speed Control</h3>
        <aw-rotary-input 
          label="RPM"
          value="0.3"
          mode="stepped"
          step="0.05"
          size="xl"
          show_value
          .formatter=\${(value: number) => \`\${Math.round(value * 3000)} RPM\`}>
        </aw-rotary-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Stepped control for precise speed settings
        </p>
      </div>
      
      <div>
        <h3>Color Picker Hue</h3>
        <aw-rotary-input 
          label="Hue"
          value="0.6"
          mode="continuous"
          size="xl"
          show_value
          .formatter=\${(value: number) => \`\${Math.round(value * 360)}°\`}>
        </aw-rotary-input>
        <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
          Continuous rotation for hue selection
        </p>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how rotary input can be used for audio controls, motor speed, and color selection.'
      }
    }
  }
}`,...(oe=(ie=h.parameters)==null?void 0:ie.docs)==null?void 0:oe.source},description:{story:"Real-world usage examples",...(le=(se=h.parameters)==null?void 0:se.docs)==null?void 0:le.description}}};const Ee=["Default","OperationModes","Sizes","SensitivityLevels","KeyboardNavigation","ValueDisplay","States","UsageExamples"];export{d as Default,y as KeyboardNavigation,u as OperationModes,c as SensitivityLevels,m as Sizes,g as States,h as UsageExamples,v as ValueDisplay,Ee as __namedExportsOrder,Me as default};
