import{i as Vt,a as Bt,x as c}from"./lit-element-b4b0194a.js";import{n as u,t as Ht}from"./property-64877f55.js";import{e as tt}from"./class-map-1caf54e8.js";import{r as Qt}from"./state-66c4e041.js";import"./directive-12249aa5.js";function te(t,e){t.indexOf(e)===-1&&t.push(e)}const Wt=(t,e,a)=>Math.min(Math.max(a,t),e),_={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},H=t=>typeof t=="number",I=t=>Array.isArray(t)&&!H(t[0]),ee=(t,e,a)=>{const n=e-t;return((a-t)%n+n)%n+t};function ae(t,e){return I(t)?t[ee(0,t.length,e)]:t}const Gt=(t,e,a)=>-a*t+a*e+t,Lt=()=>{},T=t=>t,ct=(t,e,a)=>e-t===0?1:(a-t)/(e-t);function Nt(t,e){const a=t[t.length-1];for(let n=1;n<=e;n++){const i=ct(0,e,n);t.push(Gt(a,1,i))}}function ne(t){const e=[0];return Nt(e,t-1),e}function ie(t,e=ne(t.length),a=T){const n=t.length,i=n-e.length;return i>0&&Nt(e,i),r=>{let o=0;for(;o<n-2&&!(r<e[o+1]);o++);let s=Wt(0,1,ct(e[o],e[o+1],r));return s=ae(a,o)(s),Gt(t[o],t[o+1],s)}}const qt=t=>Array.isArray(t)&&H(t[0]),it=t=>typeof t=="object"&&!!t.createAnimation,W=t=>typeof t=="function",re=t=>typeof t=="string",B={ms:t=>t*1e3,s:t=>t/1e3},Kt=(t,e,a)=>(((1-3*a+3*e)*t+(3*a-6*e))*t+3*e)*t,oe=1e-7,se=12;function ce(t,e,a,n,i){let r,o,s=0;do o=e+(a-e)/2,r=Kt(o,n,i)-t,r>0?a=o:e=o;while(Math.abs(r)>oe&&++s<se);return o}function V(t,e,a,n){if(t===e&&a===n)return T;const i=r=>ce(r,0,1,t,a);return r=>r===0||r===1?r:Kt(i(r),e,n)}const le=(t,e="end")=>a=>{a=e==="end"?Math.min(a,.999):Math.max(a,.001);const n=a*t,i=e==="end"?Math.floor(n):Math.ceil(n);return Wt(0,1,i/t)},de={ease:V(.25,.1,.25,1),"ease-in":V(.42,0,1,1),"ease-in-out":V(.42,0,.58,1),"ease-out":V(0,0,.58,1)},he=/\((.*?)\)/;function rt(t){if(W(t))return t;if(qt(t))return V(...t);const e=de[t];if(e)return e;if(t.startsWith("steps")){const a=he.exec(t);if(a){const n=a[1].split(",");return le(parseFloat(n[0]),n[1].trim())}}return T}class ue{constructor(e,a=[0,1],{easing:n,duration:i=_.duration,delay:r=_.delay,endDelay:o=_.endDelay,repeat:s=_.repeat,offset:g,direction:m="normal",autoplay:x=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=T,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((l,$)=>{this.resolve=l,this.reject=$}),n=n||_.easing,it(n)){const l=n.createAnimation(a);n=l.easing,a=l.keyframes||a,i=l.duration||i}this.repeat=s,this.easing=I(n)?T:rt(n),this.updateDuration(i);const C=ie(a,g,I(n)?n.map(rt):T);this.tick=l=>{var $;r=r;let f=0;this.pauseTime!==void 0?f=this.pauseTime:f=(l-this.startTime)*this.rate,this.t=f,f/=1e3,f=Math.max(f-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(f=this.totalDuration);const O=f/this.duration;let N=Math.floor(O),k=O%1;!k&&O>=1&&(k=1),k===1&&N--;const q=N%2;(m==="reverse"||m==="alternate"&&q||m==="alternate-reverse"&&!q)&&(k=1-k);const P=f>=this.totalDuration?1:Math.min(k,1),D=C(this.easing(P));e(D),this.pauseTime===void 0&&(this.playState==="finished"||f>=this.totalDuration+o)?(this.playState="finished",($=this.resolve)===null||$===void 0||$.call(this,D)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},x&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class ge{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const et=new WeakMap;function Xt(t){return et.has(t)||et.set(t,{transforms:[],values:new Map}),et.get(t)}function pe(t,e){return t.has(e)||t.set(e,new ge),t.get(e)}const me=["","X","Y","Z"],fe=["translate","scale","rotate","skew"],J={x:"translateX",y:"translateY",z:"translateZ"},ht={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},_e={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:ht,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:T},skew:ht},G=new Map,lt=t=>`--motion-${t}`,Q=["x","y","z"];fe.forEach(t=>{me.forEach(e=>{Q.push(t+e),G.set(lt(t+e),_e[t])})});const ye=(t,e)=>Q.indexOf(t)-Q.indexOf(e),be=new Set(Q),Yt=t=>be.has(t),we=(t,e)=>{J[e]&&(e=J[e]);const{transforms:a}=Xt(t);te(a,e),t.style.transform=ve(a)},ve=t=>t.sort(ye).reduce(xe,"").trim(),xe=(t,e)=>`${t} ${e}(var(${lt(e)}))`,ot=t=>t.startsWith("--"),ut=new Set;function ke(t){if(!ut.has(t)){ut.add(t);try{const{syntax:e,initialValue:a}=G.has(t)?G.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:a})}catch{}}}const at=(t,e)=>document.createElement("div").animate(t,e),gt={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{at({opacity:[1]})}catch{return!1}return!0},finished:()=>!!at({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{at({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},nt={},E={};for(const t in gt)E[t]=()=>(nt[t]===void 0&&(nt[t]=gt[t]()),nt[t]);const Se=.015,Te=(t,e)=>{let a="";const n=Math.round(e/Se);for(let i=0;i<n;i++)a+=t(ct(0,n-1,i))+", ";return a.substring(0,a.length-2)},pt=(t,e)=>W(t)?E.linearEasing()?`linear(${Te(t,e)})`:_.easing:qt(t)?$e(t):t,$e=([t,e,a,n])=>`cubic-bezier(${t}, ${e}, ${a}, ${n})`;function Ae(t,e){for(let a=0;a<t.length;a++)t[a]===null&&(t[a]=a?t[a-1]:e());return t}const Ce=t=>Array.isArray(t)?t:[t];function st(t){return J[t]&&(t=J[t]),Yt(t)?lt(t):t}const Y={get:(t,e)=>{e=st(e);let a=ot(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!a&&a!==0){const n=G.get(e);n&&(a=n.initialValue)}return a},set:(t,e,a)=>{e=st(e),ot(e)?t.style.setProperty(e,a):t.style[e]=a}};function Zt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function Oe(t,e){var a;let n=(e==null?void 0:e.toDefaultUnit)||T;const i=t[t.length-1];if(re(i)){const r=((a=i.match(/(-?[\d.]+)([a-z%]*)/))===null||a===void 0?void 0:a[2])||"";r&&(n=o=>o+r)}return n}function De(){return window.__MOTION_DEV_TOOLS_RECORD}function Ee(t,e,a,n={},i){const r=De(),o=n.record!==!1&&r;let s,{duration:g=_.duration,delay:m=_.delay,endDelay:x=_.endDelay,repeat:C=_.repeat,easing:l=_.easing,persist:$=!1,direction:f,offset:O,allowWebkitAcceleration:N=!1,autoplay:k=!0}=n;const q=Xt(t),P=Yt(e);let D=E.waapi();P&&we(t,e);const b=st(e),K=pe(q.values,b),S=G.get(b);return Zt(K.animation,!(it(l)&&K.generator)&&n.record!==!1),()=>{const X=()=>{var d,z;return(z=(d=Y.get(t,b))!==null&&d!==void 0?d:S==null?void 0:S.initialValue)!==null&&z!==void 0?z:0};let h=Ae(Ce(a),X);const dt=Oe(h,S);if(it(l)){const d=l.createAnimation(h,e!=="opacity",X,b,K);l=d.easing,h=d.keyframes||h,g=d.duration||g}if(ot(b)&&(E.cssRegisterProperty()?ke(b):D=!1),P&&!E.linearEasing()&&(W(l)||I(l)&&l.some(W))&&(D=!1),D){S&&(h=h.map(A=>H(A)?S.toDefaultUnit(A):A)),h.length===1&&(!E.partialKeyframes()||o)&&h.unshift(X());const d={delay:B.ms(m),duration:B.ms(g),endDelay:B.ms(x),easing:I(l)?void 0:pt(l,g),direction:f,iterations:C+1,fill:"both"};s=t.animate({[b]:h,offset:O,easing:I(l)?l.map(A=>pt(A,g)):void 0},d),s.finished||(s.finished=new Promise((A,Jt)=>{s.onfinish=A,s.oncancel=Jt}));const z=h[h.length-1];s.finished.then(()=>{$||(Y.set(t,b,z),s.cancel())}).catch(Lt),N||(s.playbackRate=1.000001)}else if(i&&P)h=h.map(d=>typeof d=="string"?parseFloat(d):d),h.length===1&&h.unshift(parseFloat(X())),s=new i(d=>{Y.set(t,b,dt?dt(d):d)},h,Object.assign(Object.assign({},n),{duration:g,easing:l}));else{const d=h[h.length-1];Y.set(t,b,S&&H(d)?S.toDefaultUnit(d):d)}return o&&r(t,e,h,{duration:g,delay:m,easing:l,repeat:C,offset:O},"motion-one"),K.setAnimation(s),s&&!k&&s.pause(),s}}const Ie=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Pe(t,e){var a;return typeof t=="string"?e?((a=e[t])!==null&&a!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const ze=t=>t(),Fe=(t,e,a=_.duration)=>new Proxy({animations:t.map(ze).filter(Boolean),duration:a,options:e},Me),je=t=>t.animations[0],Me={get:(t,e)=>{const a=je(t);switch(e){case"duration":return t.duration;case"currentTime":return B.s((a==null?void 0:a[e])||0);case"playbackRate":case"playState":return a==null?void 0:a[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Re)).catch(Lt)),t.finished;case"stop":return()=>{t.animations.forEach(n=>Zt(n))};case"forEachNative":return n=>{t.animations.forEach(i=>n(i,t))};default:return typeof(a==null?void 0:a[e])>"u"?void 0:()=>t.animations.forEach(n=>n[e]())}},set:(t,e,a)=>{switch(e){case"currentTime":a=B.ms(a);case"playbackRate":for(let n=0;n<t.animations.length;n++)t.animations[n][e]=a;return!0}return!1}},Re=t=>t.finished;function Ue(t=.1,{start:e=0,from:a=0,easing:n}={}){return(i,r)=>{const o=H(a)?a:Ve(a,r),s=Math.abs(o-i);let g=t*s;if(n){const m=r*t;g=rt(n)(g/m)*m}return e+g}}function Ve(t,e){if(t==="first")return 0;{const a=e-1;return t==="last"?a:a/2}}function Be(t,e,a){return W(t)?t(e,a):t}function He(t){return function(a,n,i={}){a=Pe(a);const r=a.length,o=[];for(let s=0;s<r;s++){const g=a[s];for(const m in n){const x=Ie(i,m);x.delay=Be(x.delay,s,r);const C=Ee(g,m,n[m],x,t);o.push(C)}}return Fe(o,i,i.duration)}}const L=He(ue),We={FAST:.15,DEFAULT:.2,SLOW:.3,STAGGER_GAP:.03};function Ge(t,e,a={}){return L(t,e,a).finished}function Le(t,e,a={}){const{duration:n=.6,delay:i=0,staggerDelay:r=.03}=a;return L(t,e,{duration:n,delay:Ue(r,{start:i}),easing:[0,0,.2,1]}).finished}function Ne(t,e={}){const{duration:a=.6,delay:n=0}=e;return L(t,{opacity:[0,1]},{duration:a,delay:n,easing:[0,0,.2,1]}).finished}function qe(t,e={}){const{duration:a=.6,delay:n=0,distance:i="20px"}=e;return L(t,{opacity:[0,1],transform:[`translateY(${i})`,"translateY(0px)"]},{duration:a,delay:n,easing:[0,0,.2,1]}).finished}function Ke(t,e={}){const{duration:a=.3,delay:n=0,scale:i=.95}=e;return L(t,{opacity:[0,1],transform:[`scale(${i})`,"scale(1)"]},{duration:a,delay:n,easing:[0,0,.2,1]}).finished}function Xe(t,e,a={}){const{threshold:n=.4,once:i=!0}=a,r=new IntersectionObserver(o=>{o.forEach(s=>{s.isIntersecting&&(e(),i&&r.unobserve(s.target))})},{threshold:n});return r.observe(t),r}const Z={animate:Ge,stagger:Le,fadeIn:Ne,slideUp:qe,scaleIn:Ke,scrollObserver:Xe,timing:We};var Ye=Object.defineProperty,Ze=Object.getOwnPropertyDescriptor,v=(t,e,a,n)=>{for(var i=n>1?void 0:n?Ze(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(i=(n?o(e,a,i):o(i))||i);return n&&i&&Ye(e,a,i),i};let w=class extends Bt{constructor(){super(...arguments),this.animation_type="navigators",this.content="",this.highlight_style="background",this.animation_delay=0,this.text_align="center",this.animate_on_scroll=!0,this.repeat_on_scroll=!1,this._isAnimated=!1}firstUpdated(){this.animate_on_scroll?this._setupIntersectionObserver():this._triggerAnimation()}_setupIntersectionObserver(){Z.scrollObserver(this,()=>{(!this._isAnimated||this.repeat_on_scroll)&&this._triggerAnimation()},{threshold:.4,once:!this.repeat_on_scroll})}async _triggerAnimation(){var e;if(this._isAnimated&&!this.repeat_on_scroll)return;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".aw-animated-text");if(t){this._isAnimated=!0;try{switch(this.animation_type){case"navigators":await this._animateNavigators(t);break;case"linesup":await this._animateLineUp(t);break;case"charfade":await this._animateCharFade(t);break;case"none":default:break}}catch(a){console.warn("Animation failed:",a)}}}async _animateNavigators(t){const e=t.querySelectorAll(".aw-animated-text__word");e.length!==0&&await Z.stagger(e,{opacity:[0,1]},{duration:.6,delay:this.animation_delay,staggerDelay:.03})}async _animateLineUp(t){await Z.slideUp(t,{duration:.6,delay:this.animation_delay})}async _animateCharFade(t){const e=t.querySelectorAll(".aw-animated-text__char");e.length!==0&&await Z.stagger(e,{opacity:[0,1]},{duration:.4,delay:this.animation_delay,staggerDelay:.05})}_processContent(){if(!this.content)return"";let t=this.content;return t=t.replace(/!\[([^\]]*)\]\((.*?)\)/g,(e,a,n)=>`<img class="aw-animated-text__image" src="${n.startsWith("//")?`https:${n}`:n}" alt="${a}" />`),t=t.replace(/__([^_]+)__/g,(e,a)=>`<span class="aw-animated-text__highlight--${this.highlight_style}">${a}</span>`),t}_renderNavigatorContent(){return this.content.split(" ").map((e,a)=>{const n=e.match(/!\[([^\]]*)\]\((.*?)\)/);if(n){const[,r,o]=n,s=o.startsWith("//")?`https:${o}`:o;return c`
          <div class="aw-animated-text__word" key=${a}>
            <img class="aw-animated-text__image" src="${s}" alt="${r}" />
          </div>
        `}const i=e.split("__");return i.length>1?c`
          <div class="aw-animated-text__word" key=${a}>
            ${i.map((r,o)=>o%2===0?c`<span>${r}</span>`:c`<span class="aw-animated-text__highlight--${this.highlight_style}">${r}</span>`)}
          </div>
        `:c`
        <div class="aw-animated-text__word" key=${a}>
          <span>${e}</span>
        </div>
      `})}_renderCharacterContent(){return this.content.split("").map((e,a)=>c`
      <span class="aw-animated-text__char" key=${a}>
        ${e===" "?c`&nbsp;`:e}
      </span>
    `)}render(){return this.animation_type==="navigators"?c`
        <div 
          class="aw-animated-text aw-animated-text--align-${this.text_align}"
          role="text"
        >
          <div class="aw-animated-text__navigator-container">
            ${this._renderNavigatorContent()}
          </div>
        </div>
      `:this.animation_type==="charfade"?c`
        <div 
          class="aw-animated-text aw-animated-text--align-${this.text_align}"
          role="text"
        >
          ${this._renderCharacterContent()}
        </div>
      `:c`
      <div 
        class="aw-animated-text aw-animated-text--align-${this.text_align}"
        role="text"
        .innerHTML="${this._processContent()}"
      >
      </div>
    `}};w.styles=Vt`
    :host {
      display: block;
    }

    .aw-animated-text {
      font-family: var(--aw-font-family-primary, system-ui, sans-serif);
      color: var(--aw-color-text-primary, #09090b);
      line-height: var(--aw-line-height-base, 1.5);
    }

    .aw-animated-text--align-left {
      text-align: left;
      justify-content: flex-start;
    }

    .aw-animated-text--align-center {
      text-align: center;
      justify-content: center;
    }

    .aw-animated-text--align-right {
      text-align: right;
      justify-content: flex-end;
    }

    .aw-animated-text--align-justify {
      text-align: justify;
    }

    .aw-animated-text__navigator-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--aw-spacing-xs, 0.25rem);
    }

    .aw-animated-text__word {
      display: inline-block;
      position: relative;
      margin-right: var(--aw-spacing-sm, 0.5rem);
      opacity: 0;
    }

    .aw-animated-text__highlight--text {
      color: var(--aw-color-text-accent, #d946ef);
    }

    .aw-animated-text__highlight--background {
      background-color: var(--aw-color-primary-100, #fed7aa);
      padding: 0 var(--aw-spacing-xs, 0.25rem);
      border-radius: var(--aw-border-radius-sm, 0.125rem);
    }

    .aw-animated-text__highlight--highlight {
      background: linear-gradient(
        120deg,
        var(--aw-color-secondary-200, #fef08a) 0%,
        var(--aw-color-secondary-200, #fef08a) 100%
      );
      background-repeat: no-repeat;
      background-size: 100% 40%;
      background-position: 0 88%;
    }

    .aw-animated-text__highlight--underline {
      text-decoration: underline;
      text-decoration-color: var(--aw-color-primary-600, #ef7801);
      text-decoration-thickness: 2px;
      text-underline-offset: 0.2em;
    }

    .aw-animated-text__image {
      display: inline-block;
      width: auto;
      height: 1.2em;
      vertical-align: baseline;
      margin: 0 var(--aw-spacing-xs, 0.25rem);
    }

    .aw-animated-text__char {
      display: inline-block;
      opacity: 0;
    }
  `;v([u()],w.prototype,"animation_type",2);v([u()],w.prototype,"content",2);v([u()],w.prototype,"highlight_style",2);v([u({type:Number})],w.prototype,"animation_delay",2);v([u()],w.prototype,"text_align",2);v([u({type:Boolean})],w.prototype,"animate_on_scroll",2);v([u({type:Boolean})],w.prototype,"repeat_on_scroll",2);v([Qt()],w.prototype,"_isAnimated",2);w=v([Ht("aw-animated-text")],w);var Je=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,y=(t,e,a,n)=>{for(var i=n>1?void 0:n?Qe(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(i=(n?o(e,a,i):o(i))||i);return n&&i&&Je(e,a,i),i};let p=class extends Bt{constructor(){super(...arguments),this.title="",this.content="",this.tag="",this.height_style="full",this.background_type="cssgradient",this.text_position="2-2",this.subtext_position="3-2",this.text_align="center",this.title_animation="navigators",this.content_animation="linefadein"}_renderBackground(){var t;switch(this.background_type){case"none":return c`<div class="aw-hero-block__background"></div>`;case"cssgradient":return c`<div class="aw-hero-block__background aw-hero-block__background--cssgradient"></div>`;case"image":return(t=this.image)!=null&&t.url?c`
            <div 
              class="aw-hero-block__background aw-hero-block__background--image"
              style="background-image: url(${this.image.url})"
            ></div>
          `:c`<div class="aw-hero-block__background"></div>`;case"canvasGradient":return c`
          <div class="aw-hero-block__background aw-hero-block__background--canvas">
            <!-- Canvas gradient background would be implemented here -->
            <div style="background: conic-gradient(from 0deg, var(--aw-color-primary-600), var(--aw-color-secondary-600), var(--aw-color-primary-600)); width: 100%; height: 100%;"></div>
          </div>
        `;case"canvasSphere":return c`
          <div class="aw-hero-block__background aw-hero-block__background--canvas">
            <!-- Canvas sphere background would be implemented here -->
            <div style="background: radial-gradient(circle, var(--aw-color-primary-600) 0%, var(--aw-color-background-primary) 70%); width: 100%; height: 100%;"></div>
          </div>
        `;default:return c`<div class="aw-hero-block__background aw-hero-block__background--cssgradient"></div>`}}render(){const t={"aw-hero-block__content":!0,[`aw-hero-block__content--position-${this.text_position}`]:!0,[`aw-hero-block__content--align-${this.text_align}`]:!0},e={"aw-hero-block__subcontent":!0,[`aw-hero-block__content--position-${this.subtext_position}`]:!0,[`aw-hero-block__content--align-${this.text_align}`]:!0},a={"aw-hero-block":!0,[`aw-hero-block--height-${this.height_style}`]:!0};return c`
      ${this._renderBackground()}
      
      <div class=${tt(a)}>
        <!-- Main content area -->
        <div class=${tt(t)}>
          ${this.tag?c`
            <div class="aw-hero-block__tag">
              ${this.tag}
            </div>
          `:""}
          
          ${this.title?c`
            <h1 class="aw-hero-block__title">
              <aw-animated-text 
                animation_type="${this.title_animation}"
                content="${this.title}"
                text_align="${this.text_align}"
                animation_delay="0"
                highlight_style="background">
              </aw-animated-text>
            </h1>
          `:""}
        </div>

        <!-- Subcontent area -->
        ${this.content?c`
          <div class=${tt(e)}>
            <p class="aw-hero-block__text-content">
              <aw-animated-text 
                animation_type="${this.content_animation}"
                content="${this.content}"
                text_align="${this.text_align}"
                animation_delay="0.6"
                highlight_style="text">
              </aw-animated-text>
            </p>
          </div>
        `:""}
      </div>
    `}};p.styles=Vt`
    :host {
      display: block;
      position: relative;
    }

    /* ITCSS - Components: Block - aw-hero-block */
    .aw-hero-block {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      justify-content: end;
      gap: 0;
      margin: var(--aw-spacing-4xl, 2.5rem) var(--aw-spacing-4xl, 2.5rem);
      pointer-events: none;
      color: var(--aw-color-text-inverse, #fafafa);
      z-index: 50;
    }

    /* ITCSS - Components: Height modifiers */
    .aw-hero-block--height-full {
      min-height: 100vh;
    }

    .aw-hero-block--height-half {
      min-height: 50vh;
    }

    .aw-hero-block--height-auto {
      min-height: fit-content;
    }

    /* ITCSS - Components: Background container */
    .aw-hero-block__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      background-color: var(--aw-color-background-primary, #f4f4f5);
    }

    /* ITCSS - Components: Background types */
    .aw-hero-block__background--cssgradient {
      background: linear-gradient(
        135deg,
        var(--aw-color-gradient-start, #ef7801) 0%,
        var(--aw-color-gradient-stop, #f4f4f5) 100%
      );
    }

    .aw-hero-block__background--canvas {
      /* Canvas backgrounds will be handled by child elements */
    }

    .aw-hero-block__background--image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    /* ITCSS - Components: Content positioning */
    .aw-hero-block__content {
      pointer-events: auto;
      z-index: 1;
    }

    /* Grid position classes - matching source getGridPositionClass */
    .aw-hero-block__content--position-1-1 { grid-row-start: 1; grid-column-start: 1; }
    .aw-hero-block__content--position-1-2 { grid-row-start: 1; grid-column-start: 2; }
    .aw-hero-block__content--position-1-3 { grid-row-start: 1; grid-column-start: 3; }
    .aw-hero-block__content--position-1-4 { grid-row-start: 1; grid-column-start: 4; }
    .aw-hero-block__content--position-2-1 { grid-row-start: 2; grid-column-start: 1; }
    .aw-hero-block__content--position-2-2 { grid-row-start: 2; grid-column-start: 2; }
    .aw-hero-block__content--position-2-3 { grid-row-start: 2; grid-column-start: 3; }
    .aw-hero-block__content--position-2-4 { grid-row-start: 2; grid-column-start: 4; }
    .aw-hero-block__content--position-3-1 { grid-row-start: 3; grid-column-start: 1; }
    .aw-hero-block__content--position-3-2 { grid-row-start: 3; grid-column-start: 2; }
    .aw-hero-block__content--position-3-3 { grid-row-start: 3; grid-column-start: 3; }
    .aw-hero-block__content--position-3-4 { grid-row-start: 3; grid-column-start: 4; }

    /* Text alignment */
    .aw-hero-block__content--align-left { justify-self: start; text-align: left; }
    .aw-hero-block__content--align-center { justify-self: center; text-align: center; }
    .aw-hero-block__content--align-right { justify-self: end; text-align: right; }

    /* ITCSS - Components: Tag styling */
    .aw-hero-block__tag {
      display: inline-flex;
      padding: var(--aw-spacing-xs, 0.25rem) var(--aw-spacing-sm, 0.5rem);
      margin-bottom: var(--aw-spacing-3xl, 2rem);
      margin-left: var(--aw-spacing-sm, 0.5rem);
      font-size: var(--aw-font-size-xs, 0.75rem);
      font-weight: var(--aw-font-weight-medium, 500);
      text-transform: uppercase;
      border-radius: var(--aw-border-radius-full, 9999px);
      color: var(--aw-color-text-inverse, #fafafa);
      background-color: var(--aw-color-primary-600, #ef7801);
      pointer-events: auto;
    }

    /* ITCSS - Components: Title styling */
    .aw-hero-block__title {
      font-size: var(--aw-font-size-4xl, 2.25rem);
      font-weight: var(--aw-font-weight-bold, 700);
      line-height: var(--aw-line-height-lg, 1.75rem);
      color: var(--aw-color-text-inverse, #fafafa);
      text-balance: balance;
      pointer-events: auto;
      margin-bottom: var(--aw-spacing-lg, 1rem);
    }

    /* ITCSS - Components: Content styling */
    .aw-hero-block__text-content {
      font-size: var(--aw-font-size-sm, 0.875rem);
      font-weight: var(--aw-font-weight-normal, 400);
      color: var(--aw-color-text-secondary, #52525b);
      text-balance: balance;
      pointer-events: auto;
    }

    /* ITCSS - Components: Subtext positioning */
    .aw-hero-block__subcontent {
      pointer-events: auto;
      z-index: 1;
    }

    /* ITCSS - Utilities: Responsive adjustments */
    @media (max-width: 768px) {
      .aw-hero-block {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
        margin: var(--aw-spacing-2xl, 1.5rem);
        text-align: center;
      }

      .aw-hero-block__content,
      .aw-hero-block__subcontent {
        grid-column: 1;
        justify-self: center;
      }

      .aw-hero-block__title {
        font-size: var(--aw-font-size-3xl, 1.875rem);
      }
    }

    @media (min-width: 1280px) {
      .aw-hero-block__title {
        font-size: var(--aw-font-size-5xl, 3rem);
      }
    }
  `;y([u()],p.prototype,"title",2);y([u()],p.prototype,"content",2);y([u()],p.prototype,"tag",2);y([u({type:Object})],p.prototype,"image",2);y([u()],p.prototype,"height_style",2);y([u()],p.prototype,"background_type",2);y([u()],p.prototype,"text_position",2);y([u()],p.prototype,"subtext_position",2);y([u()],p.prototype,"text_align",2);y([u()],p.prototype,"title_animation",2);y([u()],p.prototype,"content_animation",2);p=y([Ht("aw-hero-block")],p);const ra={title:"Components/Organisms/Hero Block",component:"aw-hero-block",parameters:{layout:"fullscreen",docs:{description:{component:`
A versatile hero block component for creating engaging landing sections.

## Features
- Multiple background types (CSS gradients, canvas animations, images)
- Flexible text positioning in a 3x4 grid system
- Built-in animations for title and content
- Support for tags/badges
- Responsive design with mobile optimizations

## Usage
\`\`\`html
<aw-hero-block 
  title="Welcome to __Our Platform__"
  content="Discover amazing experiences"
  tag="Featured"
  background_type="cssgradient"
  height_style="full">
</aw-hero-block>
\`\`\`
        `}}},argTypes:{title:{control:"text",description:"Hero title text. Use __text__ for emphasis highlighting.",table:{type:{summary:"string"},defaultValue:{summary:""}}},content:{control:"text",description:"Hero subtitle or description text",table:{type:{summary:"string"},defaultValue:{summary:""}}},tag:{control:"text",description:"Optional tag or badge text displayed above the title",table:{type:{summary:"string"},defaultValue:{summary:""}}},background_type:{control:"select",options:["none","canvasSphere","canvasGradient","cssgradient","image"],description:"Type of background to display",table:{type:{summary:"none | canvasSphere | canvasGradient | cssgradient | image"},defaultValue:{summary:"cssgradient"}}},height_style:{control:"select",options:["full","half","auto"],description:"Controls the hero block height",table:{type:{summary:"full | half | auto"},defaultValue:{summary:"full"}}},text_position:{control:"select",options:["1-1","1-2","1-3","1-4","2-1","2-2","2-3","2-4","3-1","3-2","3-3","3-4"],description:"Position of main text in the grid system",table:{type:{summary:"Grid position (row-column format)"},defaultValue:{summary:"2-2"}}},text_align:{control:"select",options:["left","center","right"],description:"Text alignment for all text elements",table:{type:{summary:"left | center | right"},defaultValue:{summary:"center"}}}},args:{title:"Welcome to Our Platform",content:"Discover amazing experiences with cutting-edge technology",tag:"",background_type:"cssgradient",height_style:"half",text_position:"2-2",text_align:"center"}},F={render:t=>c`
    <aw-hero-block 
      title=${t.title}
      content=${t.content}
      tag=${t.tag}
      background_type=${t.background_type}
      height_style=${t.height_style}
      text_position=${t.text_position}
      text_align=${t.text_align}>
    </aw-hero-block>
  `},j={render:()=>c`
    <aw-hero-block 
      title="Research __design__ and build amazing experiences"
      content="We create digital products that make a difference"
      tag="Featured"
      background_type="cssgradient"
      height_style="half">
    </aw-hero-block>
  `,parameters:{docs:{description:{story:"Use __text__ syntax in the title to create emphasized text with special styling."}}}},M={render:()=>c`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <aw-hero-block 
        title="CSS Gradient"
        content="Beautiful gradient background"
        background_type="cssgradient"
        height_style="auto">
      </aw-hero-block>
      
      <aw-hero-block 
        title="Canvas Sphere"
        content="Dynamic sphere animation"
        background_type="canvasSphere"
        height_style="auto">
      </aw-hero-block>
    </div>
  `,parameters:{docs:{description:{story:"Hero block supports multiple background types including CSS gradients and canvas animations."}}}},R={render:()=>c`
    <div>
      <aw-hero-block 
        title="Full Height Hero"
        content="Takes up the full viewport height"
        background_type="cssgradient"
        height_style="full">
      </aw-hero-block>
    </div>
  `,parameters:{docs:{description:{story:"Hero block can be full height (100vh), half height (50vh), or auto height."}}}},U={render:()=>c`
    <aw-hero-block 
      title="Top Left Position"
      content="Text positioned in the upper left area"
      text_position="1-1"
      text_align="left"
      background_type="cssgradient"
      height_style="half">
    </aw-hero-block>
  `,parameters:{docs:{description:{story:"Text can be positioned in different areas of the hero using the grid system (1-1 through 3-4)."}}}};var mt,ft,_t,yt,bt;F.parameters={...F.parameters,docs:{...(mt=F.parameters)==null?void 0:mt.docs,source:{originalSource:`{
  render: args => html\`
    <aw-hero-block 
      title=\${args.title}
      content=\${args.content}
      tag=\${args.tag}
      background_type=\${args.background_type}
      height_style=\${args.height_style}
      text_position=\${args.text_position}
      text_align=\${args.text_align}>
    </aw-hero-block>
  \`
}`,...(_t=(ft=F.parameters)==null?void 0:ft.docs)==null?void 0:_t.source},description:{story:"Default hero block with standard settings",...(bt=(yt=F.parameters)==null?void 0:yt.docs)==null?void 0:bt.description}}};var wt,vt,xt,kt,St;j.parameters={...j.parameters,docs:{...(wt=j.parameters)==null?void 0:wt.docs,source:{originalSource:`{
  render: () => html\`
    <aw-hero-block 
      title="Research __design__ and build amazing experiences"
      content="We create digital products that make a difference"
      tag="Featured"
      background_type="cssgradient"
      height_style="half">
    </aw-hero-block>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Use __text__ syntax in the title to create emphasized text with special styling.'
      }
    }
  }
}`,...(xt=(vt=j.parameters)==null?void 0:vt.docs)==null?void 0:xt.source},description:{story:"Hero with emphasized text using markdown syntax",...(St=(kt=j.parameters)==null?void 0:kt.docs)==null?void 0:St.description}}};var Tt,$t,At,Ct,Ot;M.parameters={...M.parameters,docs:{...(Tt=M.parameters)==null?void 0:Tt.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <aw-hero-block 
        title="CSS Gradient"
        content="Beautiful gradient background"
        background_type="cssgradient"
        height_style="auto">
      </aw-hero-block>
      
      <aw-hero-block 
        title="Canvas Sphere"
        content="Dynamic sphere animation"
        background_type="canvasSphere"
        height_style="auto">
      </aw-hero-block>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Hero block supports multiple background types including CSS gradients and canvas animations.'
      }
    }
  }
}`,...(At=($t=M.parameters)==null?void 0:$t.docs)==null?void 0:At.source},description:{story:"Examples of different background types",...(Ot=(Ct=M.parameters)==null?void 0:Ct.docs)==null?void 0:Ot.description}}};var Dt,Et,It,Pt,zt;R.parameters={...R.parameters,docs:{...(Dt=R.parameters)==null?void 0:Dt.docs,source:{originalSource:`{
  render: () => html\`
    <div>
      <aw-hero-block 
        title="Full Height Hero"
        content="Takes up the full viewport height"
        background_type="cssgradient"
        height_style="full">
      </aw-hero-block>
    </div>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Hero block can be full height (100vh), half height (50vh), or auto height.'
      }
    }
  }
}`,...(It=(Et=R.parameters)==null?void 0:Et.docs)==null?void 0:It.source},description:{story:"Different height styles demonstration",...(zt=(Pt=R.parameters)==null?void 0:Pt.docs)==null?void 0:zt.description}}};var Ft,jt,Mt,Rt,Ut;U.parameters={...U.parameters,docs:{...(Ft=U.parameters)==null?void 0:Ft.docs,source:{originalSource:`{
  render: () => html\`
    <aw-hero-block 
      title="Top Left Position"
      content="Text positioned in the upper left area"
      text_position="1-1"
      text_align="left"
      background_type="cssgradient"
      height_style="half">
    </aw-hero-block>
  \`,
  parameters: {
    docs: {
      description: {
        story: 'Text can be positioned in different areas of the hero using the grid system (1-1 through 3-4).'
      }
    }
  }
}`,...(Mt=(jt=U.parameters)==null?void 0:jt.docs)==null?void 0:Mt.source},description:{story:"Text positioning examples",...(Ut=(Rt=U.parameters)==null?void 0:Rt.docs)==null?void 0:Ut.description}}};const oa=["Default","WithEmphasis","BackgroundTypes","HeightStyles","TextPositioning"];export{M as BackgroundTypes,F as Default,R as HeightStyles,U as TextPositioning,j as WithEmphasis,oa as __namedExportsOrder,ra as default};
