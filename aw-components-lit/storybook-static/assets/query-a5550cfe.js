/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=(n,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(n,r,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function a(n,r){return(e,l,c)=>{const i=u=>{var o;return((o=u.renderRoot)==null?void 0:o.querySelector(n))??null};if(r){const{get:u,set:o}=typeof l=="object"?e:c??(()=>{const t=Symbol();return{get(){return this[t]},set(h){this[t]=h}}})();return s(e,l,{get(){let t=u.call(this);return t===void 0&&(t=i(this),(t!==null||this.hasUpdated)&&o.call(this,t)),t}})}return s(e,l,{get(){return i(this)}})}}export{a as e};
