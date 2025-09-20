import{i as K,a as J,x as o}from"./lit-element-b4b0194a.js";import{n as y,t as Q}from"./property-64877f55.js";import{r as N}from"./state-66c4e041.js";import{e as h}from"./class-map-1caf54e8.js";import"./directive-12249aa5.js";var X=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,a=(e,t,r,b)=>{for(var i=b>1?void 0:b?Z(t,r):t,w=e.length-1,m;w>=0;w--)(m=e[w])&&(i=(b?m(t,r,i):m(i))||i);return b&&i&&X(t,r,i),i};let n=class extends J{constructor(){super(...arguments),this.label_text="Button",this.button_type="default",this.sound_type="click",this.isHovered=!1,this.isExiting=!1,this.handleClick=e=>{const t=new CustomEvent("awClick",{detail:{originalEvent:e,buttonLabel:this.label_text,buttonType:this.button_type,soundType:this.sound_type},bubbles:!0,composed:!0});this.dispatchEvent(t);const r=new CustomEvent("awButtonSound",{detail:{soundType:this.sound_type},bubbles:!0,composed:!0});this.dispatchEvent(r)},this.handleMouseEnter=()=>{this.isHovered=!0,this.isExiting=!1},this.handleMouseLeave=()=>{this.isHovered=!1,this.isExiting=!0,setTimeout(()=>{this.isExiting=!1},600)}}render(){return o`
      <button
        class=${h({"aw-button-wipe":!0,[`aw-button-wipe--type-${this.button_type}`]:!0,"aw-button-wipe--state-hovered":this.isHovered,"aw-button-wipe--state-exiting":this.isExiting})}
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <span class="aw-button-wipe__label">
          ${this.label_text}
        </span>
        
        <span class=${h({"aw-button-wipe__highlight":!0,[`aw-button-wipe__highlight--type-${this.button_type}`]:!0})}></span>
      </button>
    `}};n.styles=K`
    :host {
      display: inline-block;
    }

    /* ITCSS - Components: Block - aw-button-wipe */
    .aw-button-wipe {
      position: relative;
      display: flex;
      align-items: center;
      padding: var(--aw-button-wipe-padding, 0.75rem);
      overflow: hidden;
      font-size: var(--aw-button-wipe-font-size, 0.75rem);
      text-transform: uppercase;
      border-radius: var(--aw-button-wipe-border-radius, 0.5rem);
      cursor: pointer;
      transition: transform var(--aw-button-wipe-scale-duration, 0.6s) var(--aw-button-wipe-scale-ease, cubic-bezier(0.36, 0, 0.66, -0.56));
      border: none;
      background: none;
      user-select: none;
    }

    .aw-button-wipe:focus-visible {
      outline: 2px solid var(--aw-color-primary-500, #3b82f6);
      outline-offset: 2px;
    }

    /* ITCSS - Components: Variant modifiers with BEM */
    .aw-button-wipe--type-default {
      background-color: var(--aw-button-wipe-bg-default, var(--surface-1, #f5f5f5));
      color: var(--aw-button-wipe-text-default, var(--text-color, #000000));
    }

    .aw-button-wipe--type-primary {
      background-color: var(--aw-button-wipe-bg-primary, var(--accent-pri, #3b82f6));
      color: var(--aw-button-wipe-text-primary, var(--text-color-inv, #ffffff));
    }

    .aw-button-wipe--type-secondary {
      background-color: transparent;
      border: 1px solid var(--aw-button-wipe-border-secondary, var(--accent-sec, #6b7280));
      color: var(--aw-button-wipe-text-secondary, var(--accent-sec, #6b7280));
    }

    .aw-button-wipe--type-transparent {
      background-color: transparent;
      color: var(--aw-button-wipe-text-transparent, var(--text-color, #000000));
    }

    /* ITCSS - Components: Element - button label */
    .aw-button-wipe__label {
      position: relative;
      z-index: 20;
    }

    /* ITCSS - Components: Element - wipe highlight effect */
    .aw-button-wipe__highlight {
      position: absolute;
      left: 0;
      z-index: 10;
      width: 100%;
      height: var(--aw-button-wipe-highlight-height, 2rem);
      top: var(--aw-button-wipe-highlight-top, 0.75rem);
      border-radius: 0;
      transform: translateY(100%) scale(1);
      transition: transform var(--aw-button-wipe-animation-duration, 0.6s) var(--aw-button-wipe-animation-ease, cubic-bezier(0.65, 0, 0.35, 1));
    }

    /* ITCSS - Components: Highlight color modifiers with BEM */
    .aw-button-wipe__highlight--type-default {
      background-color: var(--aw-button-wipe-highlight-default, var(--accent-pri, #3b82f6));
    }

    .aw-button-wipe__highlight--type-primary {
      background-color: var(--aw-button-wipe-highlight-primary, var(--accent-sec, #6b7280));
    }

    .aw-button-wipe__highlight--type-secondary {
      background-color: var(--aw-button-wipe-highlight-secondary, var(--accent-pri, #3b82f6));
    }

    .aw-button-wipe__highlight--type-transparent {
      background-color: var(--aw-button-wipe-highlight-transparent, var(--accent-pri, #3b82f6));
    }

    /* ITCSS - State: Hover state modifier */
    .aw-button-wipe--state-hovered .aw-button-wipe__highlight {
      transform: translateY(-10%) scale(1.8);
      border-radius: 50%;
    }

    /* ITCSS - State: Active state modifier */
    .aw-button-wipe:active {
      transform: scale(0.98);
    }

    /* ITCSS - State: Animate state for hover exit */
    .aw-button-wipe--state-exiting .aw-button-wipe__highlight {
      transform: translateY(100%) scale(1.5);
      border-radius: 0;
    }

    /* Keyframe animations for complex hover sequences */
    @keyframes aw-button-wipe-scale-sequence {
      0% { transform: scale(1); }
      25% { transform: scale(0.95); }
      75% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .aw-button-wipe--state-hovered {
      animation: aw-button-wipe-scale-sequence 0.6s var(--aw-button-wipe-scale-ease, cubic-bezier(0.36, 0, 0.66, -0.56));
    }
  `;a([y()],n.prototype,"label_text",2);a([y()],n.prototype,"button_type",2);a([y()],n.prototype,"sound_type",2);a([N()],n.prototype,"isHovered",2);a([N()],n.prototype,"isExiting",2);n=a([Q("aw-button-wipe")],n);const at={title:"Components/Base/Button Wipe",component:"aw-button-wipe",parameters:{layout:"centered",docs:{description:{component:`
A dynamic button component with wipe animation effects for enhanced visual feedback.

## Features
- Smooth wipe highlight animations on hover
- Multiple button type variants
- Sound effect integration
- Scale animations on hover and active states
- Accessibility compliant with proper event handling
- Customizable animation timing

## Usage
Import the component and use it in your HTML:
\`\`\`html
<aw-button-wipe 
  label_text="Click me" 
  button_type="primary"
  sound_type="click">
</aw-button-wipe>
\`\`\`
        `}}},argTypes:{label_text:{control:"text",description:"The button text content",table:{type:{summary:"string"},defaultValue:{summary:"Button"}}},button_type:{control:"select",options:["default","primary","secondary","transparent"],description:"Controls the button appearance variant",table:{type:{summary:"default | primary | secondary | transparent"},defaultValue:{summary:"default"}}},sound_type:{control:"select",options:["beepOn","beepOff","click","plink","drip","marimba"],description:"Sound effect to play on click",table:{type:{summary:"beepOn | beepOff | click | plink | drip | marimba"},defaultValue:{summary:"click"}}}},args:{label_text:"Button",button_type:"default",sound_type:"click"}},p={render:e=>o`
    <aw-button-wipe 
      label_text=${e.label_text}
      button_type=${e.button_type}
      sound_type=${e.sound_type}
      @awClick=${t=>{console.log("Button wipe clicked:",t.detail)}}
      @awButtonSound=${t=>{console.log("Sound event:",t.detail)}}>
    </aw-button-wipe>
  `},s={render:()=>o`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-wipe 
        label_text="Default" 
        button_type="default">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Primary" 
        button_type="primary">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Secondary" 
        button_type="secondary">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Transparent" 
        button_type="transparent">
      </aw-button-wipe>
    </div>
  `,parameters:{docs:{description:{story:"Button wipe supports multiple visual variants with unique highlight colors for each type."}}}},l={render:()=>o`
    <div style="display: flex; gap: 2rem; flex-direction: column; align-items: center;">
      <div style="text-align: center;">
        <h3>Hover over buttons to see wipe animation</h3>
        <p style="color: #666; font-size: 0.9rem;">
          Each button type has a unique wipe highlight effect
        </p>
      </div>
      
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Default Wipe" 
            button_type="default">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Blue highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Primary Wipe" 
            button_type="primary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Secondary color highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Secondary Wipe" 
            button_type="secondary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Primary color highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Transparent Wipe" 
            button_type="transparent">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Primary color highlight
          </p>
        </div>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Hover states demonstrate the unique wipe animation for each button variant. The highlight element transforms from a line to a circle on hover."}}}},u={render:()=>o`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-wipe 
        label_text="Beep On" 
        button_type="primary"
        sound_type="beepOn">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Beep Off" 
        button_type="primary"
        sound_type="beepOff">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Click" 
        button_type="primary"
        sound_type="click">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Plink" 
        button_type="primary"
        sound_type="plink">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Drip" 
        button_type="primary"
        sound_type="drip">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Marimba" 
        button_type="primary"
        sound_type="marimba">
      </aw-button-wipe>
    </div>
    
    <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
      Click buttons to trigger different sound effects (check console for sound events)
    </p>
  `,parameters:{docs:{description:{story:"Button wipe supports multiple sound effect types for audio feedback on interactions."}}}},d={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Animation Sequence</h3>
        <p style="color: #666; max-width: 500px;">
          The wipe animation consists of multiple coordinated effects:
        </p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; width: 100%; max-width: 800px;">
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Scale Animation</h4>
          <aw-button-wipe 
            label_text="Hover Me" 
            button_type="primary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Button scales on hover
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Highlight Wipe</h4>
          <aw-button-wipe 
            label_text="Watch Highlight" 
            button_type="secondary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Highlight transforms & moves
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Exit Animation</h4>
          <aw-button-wipe 
            label_text="Hover & Leave" 
            button_type="transparent">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Smooth return animation
          </p>
        </div>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"The wipe animation combines scale effects with highlight transformations for a sophisticated interaction experience."}}}},c={render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Navigation Button</h3>
        <aw-button-wipe 
          label_text="Explore Features" 
          button_type="primary"
          sound_type="click">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Call-to-Action</h3>
        <aw-button-wipe 
          label_text="Get Started" 
          button_type="secondary"
          sound_type="plink">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Subtle Action</h3>
        <aw-button-wipe 
          label_text="Learn More" 
          button_type="transparent"
          sound_type="beepOn">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Form Submit</h3>
        <aw-button-wipe 
          label_text="Submit Form" 
          button_type="default"
          sound_type="marimba">
        </aw-button-wipe>
      </div>
    </div>
  `,parameters:{docs:{description:{story:"Real-world examples demonstrating how button wipe enhances different types of user interactions."}}}};var f,g,v,_,x;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => html\`
    <aw-button-wipe 
      label_text=\${args.label_text}
      button_type=\${args.button_type}
      sound_type=\${args.sound_type}
      @awClick=\${(e: CustomEvent) => {
    console.log('Button wipe clicked:', e.detail);
  }}
      @awButtonSound=\${(e: CustomEvent) => {
    console.log('Sound event:', e.detail);
  }}>
    </aw-button-wipe>
  \`
}`,...(v=(g=p.parameters)==null?void 0:g.docs)==null?void 0:v.source},description:{story:"The default button wipe with standard settings",...(x=(_=p.parameters)==null?void 0:_.docs)==null?void 0:x.description}}};var S,k,C,E,B;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-wipe 
        label_text="Default" 
        button_type="default">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Primary" 
        button_type="primary">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Secondary" 
        button_type="secondary">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Transparent" 
        button_type="transparent">
      </aw-button-wipe>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button wipe supports multiple visual variants with unique highlight colors for each type.'
      }
    }
  }
}`,...(C=(k=s.parameters)==null?void 0:k.docs)==null?void 0:C.source},description:{story:"Examples of all button type variants",...(B=(E=s.parameters)==null?void 0:E.docs)==null?void 0:B.description}}};var T,z,H,O,$;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 2rem; flex-direction: column; align-items: center;">
      <div style="text-align: center;">
        <h3>Hover over buttons to see wipe animation</h3>
        <p style="color: #666; font-size: 0.9rem;">
          Each button type has a unique wipe highlight effect
        </p>
      </div>
      
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Default Wipe" 
            button_type="default">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Blue highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Primary Wipe" 
            button_type="primary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Secondary color highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Secondary Wipe" 
            button_type="secondary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Primary color highlight
          </p>
        </div>
        
        <div style="text-align: center;">
          <aw-button-wipe 
            label_text="Transparent Wipe" 
            button_type="transparent">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Primary color highlight
          </p>
        </div>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Hover states demonstrate the unique wipe animation for each button variant. The highlight element transforms from a line to a circle on hover.'
      }
    }
  }
}`,...(H=(z=l.parameters)==null?void 0:z.docs)==null?void 0:H.source},description:{story:"Interactive demonstration showing hover states",...($=(O=l.parameters)==null?void 0:O.docs)==null?void 0:$.description}}};var A,M,P,W,D;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <aw-button-wipe 
        label_text="Beep On" 
        button_type="primary"
        sound_type="beepOn">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Beep Off" 
        button_type="primary"
        sound_type="beepOff">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Click" 
        button_type="primary"
        sound_type="click">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Plink" 
        button_type="primary"
        sound_type="plink">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Drip" 
        button_type="primary"
        sound_type="drip">
      </aw-button-wipe>
      
      <aw-button-wipe 
        label_text="Marimba" 
        button_type="primary"
        sound_type="marimba">
      </aw-button-wipe>
    </div>
    
    <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
      Click buttons to trigger different sound effects (check console for sound events)
    </p>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Button wipe supports multiple sound effect types for audio feedback on interactions.'
      }
    }
  }
}`,...(P=(M=u.parameters)==null?void 0:M.docs)==null?void 0:P.source},description:{story:"Examples of different sound types",...(D=(W=u.parameters)==null?void 0:W.docs)==null?void 0:D.description}}};var q,I,L,F,V;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <h3>Animation Sequence</h3>
        <p style="color: #666; max-width: 500px;">
          The wipe animation consists of multiple coordinated effects:
        </p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; width: 100%; max-width: 800px;">
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Scale Animation</h4>
          <aw-button-wipe 
            label_text="Hover Me" 
            button_type="primary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Button scales on hover
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Highlight Wipe</h4>
          <aw-button-wipe 
            label_text="Watch Highlight" 
            button_type="secondary">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Highlight transforms & moves
          </p>
        </div>
        
        <div style="text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h4>Exit Animation</h4>
          <aw-button-wipe 
            label_text="Hover & Leave" 
            button_type="transparent">
          </aw-button-wipe>
          <p style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
            Smooth return animation
          </p>
        </div>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'The wipe animation combines scale effects with highlight transformations for a sophisticated interaction experience.'
      }
    }
  }
}`,...(L=(I=d.parameters)==null?void 0:I.docs)==null?void 0:L.source},description:{story:"Animation details showcase",...(V=(F=d.parameters)==null?void 0:F.docs)==null?void 0:V.description}}};var j,R,U,Y,G;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3>Navigation Button</h3>
        <aw-button-wipe 
          label_text="Explore Features" 
          button_type="primary"
          sound_type="click">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Call-to-Action</h3>
        <aw-button-wipe 
          label_text="Get Started" 
          button_type="secondary"
          sound_type="plink">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Subtle Action</h3>
        <aw-button-wipe 
          label_text="Learn More" 
          button_type="transparent"
          sound_type="beepOn">
        </aw-button-wipe>
      </div>
      
      <div>
        <h3>Form Submit</h3>
        <aw-button-wipe 
          label_text="Submit Form" 
          button_type="default"
          sound_type="marimba">
        </aw-button-wipe>
      </div>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples demonstrating how button wipe enhances different types of user interactions.'
      }
    }
  }
}`,...(U=(R=c.parameters)==null?void 0:R.docs)==null?void 0:U.source},description:{story:"Real-world usage examples",...(G=(Y=c.parameters)==null?void 0:Y.docs)==null?void 0:G.description}}};const rt=["Default","Variants","HoverStates","SoundTypes","AnimationDetails","UsageExamples"];export{d as AnimationDetails,p as Default,l as HoverStates,u as SoundTypes,c as UsageExamples,s as Variants,rt as __namedExportsOrder,at as default};
