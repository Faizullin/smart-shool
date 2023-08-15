import{r as ln,j as re,F as ki,b as Qc}from"./index-4a460146.js";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Ds=function(r,e){return(Ds=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(r,e)};function ye(r,e){function t(){this.constructor=r}Ds(r,e),r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}function X(r,e,t,n){return new(t||(t=Promise))(function(o,a){function i(c){try{u(n.next(c))}catch(l){a(l)}}function s(c){try{u(n.throw(c))}catch(l){a(l)}}function u(c){c.done?o(c.value):new t(function(l){l(c.value)}).then(i,s)}u((n=n.apply(r,e||[])).next())})}function Y(r,e){var t,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(u){return function(c){return function(l){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,n&&(o=2&l[0]?n.return:l[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,l[1])).done)return o;switch(n=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,n=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!o||l[1]>o[0]&&l[1]<o[3])){i.label=l[1];break}if(l[0]===6&&i.label<o[1]){i.label=o[1],o=l;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(l);break}o[2]&&i.ops.pop(),i.trys.pop();continue}l=e.call(r,i)}catch(h){l=[6,h],n=0}finally{t=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([u,c])}}}var Zc=function(){function r(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.populateURLFlags()}return r.prototype.setPlatform=function(e,t){this.platform!=null&&console.warn("Platform "+this.platformName+" has already been set. Overwriting the platform with "+t+"."),this.platformName=e,this.platform=t},r.prototype.registerFlag=function(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},this.urlFlags[e]!=null){var o=this.urlFlags[e];console.warn("Setting feature override from URL "+e+": "+o+"."),this.set(e,o)}},r.prototype.get=function(e){return e in this.flags?this.flags[e]:(this.flags[e]=this.evaluateFlag(e),this.flags[e])},r.prototype.getNumber=function(e){return this.get(e)},r.prototype.getBool=function(e){return this.get(e)},r.prototype.getFlags=function(){return this.flags},Object.defineProperty(r.prototype,"features",{get:function(){return this.flags},enumerable:!0,configurable:!0}),r.prototype.set=function(e,t){if(this.flagRegistry[e]==null)throw new Error("Cannot set flag "+e+" as it has not been registered.");this.flags[e]=t,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(t)},r.prototype.evaluateFlag=function(e){if(this.flagRegistry[e]==null)throw new Error("Cannot evaluate flag '"+e+"': no evaluation function found.");return this.flagRegistry[e].evaluationFn()},r.prototype.setFlags=function(e){this.flags=Object.assign({},e)},r.prototype.reset=function(){this.flags={},this.urlFlags={},this.populateURLFlags()},r.prototype.populateURLFlags=function(){var e=this;if(this.global!==void 0&&this.global.location!==void 0&&this.global.location.search!==void 0){var t,n,o=(t=this.global.location.search,n={},t.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,function(a){for(var i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];return tl(n,i[0],i[1]),i.join("=")}),n);"tfjsflags"in o&&o.tfjsflags.split(",").forEach(function(a){var i=a.split(":"),s=i[0],u=i[1];e.urlFlags[s]=function(c,l){if((l=l.toLowerCase())==="true"||l==="false")return l==="true";if(""+ +l===l)return+l;throw new Error("Could not parse value flag value "+l+" for flag "+c+".")}(s,u)})}},r}();function tl(r,e,t){r[decodeURIComponent(e)]=decodeURIComponent(t||"")}function M(){return As}var As=null,Br=new Map,na=new Map;function Ts(r,e){var t=Fs(r,e);return Br.get(t)}function el(r){return na.get(r)}function Si(r){for(var e=Br.entries(),t=[];;){var n=e.next(),o=n.done,a=n.value;if(o)break;var i=a[0],s=a[1];i.split("_")[0]===r&&t.push(s)}return t}function Ns(r){var e=r.kernelName,t=r.backendName,n=Fs(e,t);if(Br.has(n))throw new Error("The kernel '"+e+"' for backend '"+t+"' is already registered");Br.set(n,r)}function nl(r){var e=r.kernelName;na.has(e)&&console.warn("Overriding the gradient for '"+e+"'"),na.set(e,r)}function Fs(r,e){return e+"_"+r}function ra(r,e,t){return Math.max(r,Math.min(e,t))}function Ps(r){return r%2==0?r:r+1}function rl(r){for(var e=0,t=0;t<r.length;t++)e+=r[t];return e}function E(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function yt(r,e,t){t===void 0&&(t=""),E(Wt(r,e),function(){return t+" Shapes "+r+" and "+e+" must match"})}function Xn(r){E(r!=null,function(){return"The input to the tensor constructor must be a non-null value."})}function Hn(r,e,t){if(e===void 0&&(e=[]),t===void 0&&(t=!1),e==null&&(e=[]),Array.isArray(r)||De(r)&&!t)for(var n=0;n<r.length;++n)Hn(r[n],e,t);else e.push(r);return e}function $(r){if(r.length===0)return 1;for(var e=r[0],t=1;t<r.length;t++)e*=r[t];return e}function Wt(r,e){if(r===e)return!0;if(r==null||e==null||r.length!==e.length)return!1;for(var t=0;t<r.length;t++)if(r[t]!==e[t])return!1;return!0}function Dt(r){return r%1==0}function ol(r){if(Math.tanh!=null)return Math.tanh(r);if(r===1/0)return 1;if(r===-1/0)return-1;var e=Math.exp(2*r);return(e-1)/(e+1)}function oa(r){var e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}function On(r,e){return e<=r.length?r:r+" ".repeat(e-r.length)}function Di(r,e,t){return e===void 0&&(e=function(n){return 0}),new Promise(function(n,o){var a=0,i=function(){if(r())n();else{a++;var s=e(a);t!=null&&a>=t?o():setTimeout(i,s)}};i()})}function al(r,e){for(var t=1,n=-1,o=0;o<r.length;++o)if(r[o]>=0)t*=r[o];else if(r[o]===-1){if(n!==-1)throw Error("Shapes can only have 1 implicit size. Found -1 at dim "+n+" and dim "+o);n=o}else if(r[o]<0)throw Error("Shapes can not be < 0. Found "+r[o]+" at dim "+o);if(n===-1){if(e>0&&e!==t)throw Error("Size("+e+") must match the product of shape "+r);return r}if(t===0)throw Error("Cannot infer the missing size in ["+r+"] when there are 0 elements");if(e%t!=0)throw Error("The implicit shape can't be a fractional number. Got "+e+" / "+t);var a=r.slice();return a[n]=e/t,a}function Bt(r,e){var t=e.length;return E((r=r==null?e.map(function(n,o){return o}):[].concat(r)).every(function(n){return n>=-t&&n<t}),function(){return"All values in axis param must be in range [-"+t+", "+t+") but got axis "+r}),E(r.every(function(n){return Dt(n)}),function(){return"All values in axis param must be integers but got axis "+r}),r.map(function(n){return n<0?t+n:n})}function dn(r,e){for(var t=[],n=[],o=e!=null&&Array.isArray(e)&&e.length===0,a=e==null||o?null:Bt(e,r).sort(),i=0,s=0;s<r.length;++s){if(a!=null){if(a[i]===s&&r[s]!==1)throw new Error("Can't squeeze axis "+s+" since its dim '"+r[s]+"' is not 1");(a[i]==null||a[i]>s)&&r[s]===1&&(t.push(r[s]),n.push(s)),a[i]<=s&&i++}r[s]!==1&&(t.push(r[s]),n.push(s))}return{newShape:t,keptDims:n}}function rr(r,e){var t=null;if(r==null||r==="float32")t=new Float32Array(e);else if(r==="int32")t=new Int32Array(e);else{if(r!=="bool")throw new Error("Unknown data type "+r);t=new Uint8Array(e)}return t}function Lr(r,e){var t=null;if(r==null||r==="float32")t=new Float32Array(e);else if(r==="int32")t=new Int32Array(e);else if(r==="bool")t=new Uint8Array(e);else{if(r!=="string")throw new Error("Unknown data type "+r);t=new Array(e)}return t}function il(r,e){for(var t=0;t<r.length;t++){var n=r[t];if(isNaN(n)||!isFinite(n))throw Error("A tensor of type "+e+" being uploaded contains "+n+".")}}function sl(r){return r==="bool"||r==="complex64"||r==="float32"||r==="int32"||r==="string"}function ul(r,e){return e!=="complex64"&&(e!=="float32"||r==="complex64")&&(e!=="int32"||r==="float32"||r==="complex64")&&(e!=="bool"||r!=="bool")}function De(r){return r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array}function Ms(r){if(r==="float32"||r==="int32")return 4;if(r==="complex64")return 8;if(r==="bool")return 1;throw new Error("Unknown dtype "+r)}function cl(r){if(r==null)return 0;var e=0;return r.forEach(function(t){return e+=t.length}),e}function Ra(r){return typeof r=="string"||r instanceof String}function ll(r){return typeof r=="boolean"}function hl(r){return typeof r=="number"}function fr(r){return Array.isArray(r)?fr(r[0]):r instanceof Float32Array?"float32":r instanceof Int32Array||r instanceof Uint8Array?"int32":hl(r)?"float32":Ra(r)?"string":ll(r)?"bool":"float32"}function aa(r){return!!(r&&r.constructor&&r.call&&r.apply)}function ia(r,e){for(var t=e;t<r;++t)if(r%t==0)return t;return r}function Ae(r){var e=r.length;if(e<2)return[];var t=new Array(e-1);t[e-2]=r[e-1];for(var n=e-3;n>=0;--n)t[n]=t[n+1]*r[n+1];return t}function Os(r,e,t){if(e==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(r)&&(r=Hn(r)),t&&il(r,e),function(a,i){return a instanceof Float32Array&&i==="float32"||a instanceof Int32Array&&i==="int32"||a instanceof Uint8Array&&i==="bool"}(r,e))return r;if(e==null||e==="float32"||e==="complex64")return new Float32Array(r);if(e==="int32")return new Int32Array(r);if(e==="bool"){for(var n=new Uint8Array(r.length),o=0;o<n.length;++o)Math.round(r[o])!==0&&(n[o]=1);return n}throw new Error("Unknown data type "+e)}function Ai(r,e){if(r.length===0)return e[0];var t=r.reduce(function(n,o){return n*o});if(t===0)return[];if(t!==e.length)throw new Error("["+r+"] does not match the input size.");return function n(o,a,i){var s=new Array;if(a.length===1)for(var u=a[0],c=0;c<u;c++)s[c]=i[o+c];else{u=a[0];var l=a.slice(1),h=l.reduce(function(f,p){return f*p});for(c=0;c<u;c++)s[c]=n(o+c*h,l,i)}return s}(0,r,e)}function Bs(r,e){for(var t=pr(r,e),n=0;n<t.length;n++)t[n]=1;return t}function pr(r,e){if(e==null||e==="float32"||e==="complex64")return new Float32Array(r);if(e==="int32")return new Int32Array(r);if(e==="bool")return new Uint8Array(r);throw new Error("Unknown data type "+e)}function Re(){return M().platform.now()}function Ls(r){r.forEach(function(e){E(Number.isInteger(e)&&e>=0,function(){return"Tensor must have a shape comprised of positive integers but got shape ["+r+"]."})})}function fl(r,e){return e===void 0&&(e="utf-8"),e=e||"utf-8",M().platform.encode(r,e)}function Wr(r,e){return e===void 0&&(e="utf-8"),e=e||"utf-8",M().platform.decode(r,e)}function Ti(r,e,t){if(e===0)return 0;if(e===1)return r[0];for(var n=r[r.length-1],o=0;o<r.length-1;++o)n+=t[o]*r[o];return n}function pl(r,e,t){if(e===0)return[];if(e===1)return[r];for(var n=new Array(e),o=0;o<n.length-1;++o)n[o]=Math.floor(r/t[o]),r-=n[o]*t[o];return n[n.length-1]=r,n}var dl=function(){function r(e,t){this.backendTimer=e,this.logger=t,t==null&&(this.logger=new vl)}return r.prototype.profileKernel=function(e,t,n){var o,a=this,i=this.backendTimer.time(function(){o=n()});return o.forEach(function(s){s.data().then(function(u){(function(c,l,h){if(l!=="float32")return!1;for(var f=0;f<c.length;f++){var p=c[f];if(isNaN(p)||!isFinite(p))return console.warn("Found "+p+" in the result of '"+h+"'"),!0}})(u,s.dtype,e),i.then(function(c){var l="";c.getExtraProfileInfo!=null&&(l=c.getExtraProfileInfo()),a.logger.logKernelProfile(e,s,u,c.kernelMs,t,l)})})}),o},r}(),vl=function(){function r(){}return r.prototype.logKernelProfile=function(e,t,n,o,a,i){var s=typeof o=="number"?On(o+"ms",9):o.error,u=On(e,25),c=t.rank,l=t.size,h=On(t.shape.toString(),14),f="";for(var p in a){var d=a[p].shape||t.shape,m=d.length;f+=p+": "+m+"D "+(m>0?d:"")+" "}console.log("%c"+u+"	%c"+s+"	%c"+c+"D "+h+"	%c"+l+"	%c"+f+"	%c"+i,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")},r}(),Ni=20,$n=3,Do=7;function ml(r,e,t,n){var o=Ae(e),a=function(c,l,h,f){var p=$(l),d=f[f.length-1],m=new Array(d).fill(0),v=l.length,g=h==="complex64"?Qn(c):c;if(v>1)for(var x=0;x<p/d;x++)for(var b=x*d,y=0;y<d;y++)m[y]=Math.max(m[y],Jn(g[b+y],0,h).length);return m}(r,e,t,o),i=e.length,s=function c(l,h,f,p,d,m){m===void 0&&(m=!0);var v=f==="complex64"?2:1,g=h[0],x=h.length;if(x===0)return f==="complex64"?[Jn(Qn(l)[0],0,f)]:f==="bool"?[Ws(l[0])]:[l[0].toString()];if(x===1){if(g>Ni){var b=$n*v,y=Array.from(l.slice(0,b)),w=Array.from(l.slice((g-$n)*v,g*v));return f==="complex64"&&(y=Qn(y),w=Qn(w)),["["+y.map(function(B,z){return Jn(B,d[z],f)}).join(", ")+", ..., "+w.map(function(B,z){return Jn(B,d[g-$n+z],f)}).join(", ")+"]"]}return["["+(f==="complex64"?Qn(l):Array.from(l)).map(function(B,z){return Jn(B,d[z],f)}).join(", ")+"]"]}var C=h.slice(1),k=p.slice(1),S=p[0]*v,R=[];if(g>Ni){for(var I=0;I<$n;I++){var N=(A=I*S)+S;R.push.apply(R,c(l.slice(A,N),C,f,k,d,!1))}for(R.push("..."),I=g-$n;I<g;I++)N=(A=I*S)+S,R.push.apply(R,c(l.slice(A,N),C,f,k,d,I===g-1))}else for(I=0;I<g;I++){var A;N=(A=I*S)+S,R.push.apply(R,c(l.slice(A,N),C,f,k,d,I===g-1))}var L=x===2?",":"";for(R[0]="["+R[0]+L,I=1;I<R.length-1;I++)R[I]=" "+R[I]+L;var O=`,
`;for(I=2;I<x;I++)O+=`
`;return R[R.length-1]=" "+R[R.length-1]+"]"+(m?"":O),R}(r,e,t,o,a),u=["Tensor"];return n&&(u.push("  dtype: "+t),u.push("  rank: "+i),u.push("  shape: ["+e+"]"),u.push("  values:")),u.push(s.map(function(c){return"    "+c}).join(`
`)),u.join(`
`)}function Jn(r,e,t){return On(Array.isArray(r)?parseFloat(r[0].toFixed(Do))+" + "+parseFloat(r[1].toFixed(Do))+"j":Ra(r)?"'"+r+"'":t==="bool"?Ws(r):parseFloat(r.toFixed(Do)).toString(),e)}function Ws(r){return r===0?"false":"true"}function Qn(r){for(var e=[],t=0;t<r.length;t+=2)e.push([r[t],r[t+1]]);return e}var or=function(){function r(e,t,n){var o=this;if(this.dtype=t,this.shape=e.slice(),this.size=$(e),n!=null){var a=n.length;E(a===this.size,function(){return"Length of values '"+a+"' does not match the size inferred by the shape '"+o.size+"'."})}if(t==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||Lr(t,this.size),this.strides=Ae(e)}return r.prototype.set=function(e){for(var t=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];n.length===0&&(n=[0]),E(n.length===this.rank,function(){return"The number of provided coordinates ("+n.length+") must match the rank ("+t.rank+")"});var a=this.locToIndex(n);this.values[a]=e},r.prototype.get=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];e.length===0&&(e=[0]);for(var n=0,o=0,a=e;o<a.length;o++){var i=a[o];if(i<0||i>=this.shape[n]){var s="Requested out of range element at "+e+".   Buffer shape="+this.shape;throw new Error(s)}n++}for(var u=e[e.length-1],c=0;c<e.length-1;++c)u+=this.strides[c]*e[c];return this.values[u]},r.prototype.locToIndex=function(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];for(var t=e[e.length-1],n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t},r.prototype.indexToLoc=function(e){if(this.rank===0)return[];if(this.rank===1)return[e];for(var t=new Array(this.shape.length),n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t},Object.defineProperty(r.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),r.prototype.toTensor=function(){return Ie().makeTensor(this.values,this.shape,this.dtype)},r}(),Ie=null,P=null,Us=null,Et=function(){function r(e,t,n,o){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=$(e),this.strides=Ae(e),this.dataId=n,this.id=o,this.rankType=this.rank<5?this.rank.toString():"higher"}return r.prototype.flatten=function(){return this.throwIfDisposed(),this.as1D()},r.prototype.asScalar=function(){return this.throwIfDisposed(),E(this.size===1,function(){return"The array must have only 1 element."}),this.reshape([])},r.prototype.as1D=function(){return this.throwIfDisposed(),this.reshape([this.size])},r.prototype.as2D=function(e,t){return this.throwIfDisposed(),this.reshape([e,t])},r.prototype.as3D=function(e,t,n){return this.throwIfDisposed(),this.reshape([e,t,n])},r.prototype.as4D=function(e,t,n,o){return this.throwIfDisposed(),this.reshape([e,t,n,o])},r.prototype.as5D=function(e,t,n,o,a){return this.throwIfDisposed(),this.reshape([e,t,n,o,a])},r.prototype.asType=function(e){return this.throwIfDisposed(),P.cast(this,e)},Object.defineProperty(r.prototype,"rank",{get:function(){return this.shape.length},enumerable:!0,configurable:!0}),r.prototype.buffer=function(){return X(this,void 0,void 0,function(){var e;return Y(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,P.buffer(this.shape,this.dtype,e)]}})})},r.prototype.bufferSync=function(){return P.buffer(this.shape,this.dtype,this.dataSync())},r.prototype.array=function(){return X(this,void 0,void 0,function(){var e;return Y(this,function(t){switch(t.label){case 0:return[4,this.data()];case 1:return e=t.sent(),[2,Ai(this.shape,e)]}})})},r.prototype.arraySync=function(){return Ai(this.shape,this.dataSync())},r.prototype.data=function(){return X(this,void 0,void 0,function(){var e,t;return Y(this,function(n){switch(n.label){case 0:return this.throwIfDisposed(),e=Ie().read(this.dataId),this.dtype!=="string"?[3,2]:[4,e];case 1:t=n.sent();try{return[2,t.map(function(o){return Wr(o)})]}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}n.label=2;case 2:return[2,e]}})})},r.prototype.dataSync=function(){this.throwIfDisposed();var e=Ie().readSync(this.dataId);if(this.dtype==="string")try{return e.map(function(t){return Wr(t)})}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e},r.prototype.bytes=function(){return X(this,void 0,void 0,function(){var e;return Y(this,function(t){switch(t.label){case 0:return this.throwIfDisposed(),[4,Ie().read(this.dataId)];case 1:return e=t.sent(),this.dtype==="string"?[2,e]:[2,new Uint8Array(e.buffer)]}})})},r.prototype.dispose=function(){this.isDisposed||(Ie().disposeTensor(this),this.isDisposedInternal=!0)},Object.defineProperty(r.prototype,"isDisposed",{get:function(){return this.isDisposedInternal},enumerable:!0,configurable:!0}),r.prototype.throwIfDisposed=function(){if(this.isDisposed)throw new Error("Tensor is disposed.")},r.prototype.toFloat=function(){return this.asType("float32")},r.prototype.toInt=function(){return this.asType("int32")},r.prototype.toBool=function(){return this.asType("bool")},r.prototype.print=function(e){return e===void 0&&(e=!1),P.print(this,e)},r.prototype.reshape=function(e){return this.throwIfDisposed(),P.reshape(this,e)},r.prototype.reshapeAs=function(e){return this.throwIfDisposed(),this.reshape(e.shape)},r.prototype.expandDims=function(e){return e===void 0&&(e=0),P.expandDims(this,e)},r.prototype.cumsum=function(e,t,n){return e===void 0&&(e=0),t===void 0&&(t=!1),n===void 0&&(n=!1),P.cumsum(this,e,t,n)},r.prototype.squeeze=function(e){return this.throwIfDisposed(),P.squeeze(this,e)},r.prototype.clone=function(){return this.throwIfDisposed(),P.clone(this)},r.prototype.oneHot=function(e,t,n){return this.throwIfDisposed(),P.oneHot(this,e,t,n)},r.prototype.toString=function(e){return e===void 0&&(e=!1),ml(this.dataSync(),this.shape,this.dtype,e)},r.prototype.tile=function(e){return this.throwIfDisposed(),P.tile(this,e)},r.prototype.gather=function(e,t){return t===void 0&&(t=0),this.throwIfDisposed(),P.gather(this,e,t)},r.prototype.matMul=function(e,t,n){return t===void 0&&(t=!1),n===void 0&&(n=!1),this.throwIfDisposed(),P.matMul(this,e,t,n)},r.prototype.dot=function(e){return this.throwIfDisposed(),P.dot(this,e)},r.prototype.norm=function(e,t,n){return e===void 0&&(e="euclidean"),t===void 0&&(t=null),n===void 0&&(n=!1),this.throwIfDisposed(),P.norm(this,e,t,n)},r.prototype.slice=function(e,t){return this.throwIfDisposed(),P.slice(this,e,t)},r.prototype.reverse=function(e){return this.throwIfDisposed(),P.reverse(this,e)},r.prototype.concat=function(e,t){return t===void 0&&(t=0),this.throwIfDisposed(),e instanceof r&&(e=[e]),P.concat([this].concat(e),t)},r.prototype.split=function(e,t){return t===void 0&&(t=0),this.throwIfDisposed(),P.split(this,e,t)},r.prototype.stack=function(e,t){return t===void 0&&(t=0),P.stack([this,e],t)},r.prototype.unstack=function(e){return e===void 0&&(e=0),P.unstack(this,e)},r.prototype.pad=function(e,t){return t===void 0&&(t=0),P.pad(this,e,t)},r.prototype.batchNormalization=function(e,t,n,o,a){return n===void 0&&(n=.001),Us("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon"),this.batchNorm(e,t,a,o,n)},r.prototype.batchNorm=function(e,t,n,o,a){return a===void 0&&(a=.001),this.throwIfDisposed(),P.batchNorm(this,e,t,n,o,a)},r.prototype.all=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.all(this,e,t)},r.prototype.any=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.any(this,e,t)},r.prototype.logSumExp=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.logSumExp(this,e,t)},r.prototype.sum=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.sum(this,e,t)},r.prototype.prod=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.prod(this,e,t)},r.prototype.mean=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.mean(this,e,t)},r.prototype.min=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.min(this,e,t)},r.prototype.max=function(e,t){return e===void 0&&(e=null),t===void 0&&(t=!1),this.throwIfDisposed(),P.max(this,e,t)},r.prototype.argMin=function(e){return e===void 0&&(e=null),this.throwIfDisposed(),P.argMin(this,e)},r.prototype.argMax=function(e){return e===void 0&&(e=null),this.throwIfDisposed(),P.argMax(this,e)},r.prototype.cast=function(e){return this.throwIfDisposed(),P.cast(this,e)},r.prototype.add=function(e){return this.throwIfDisposed(),P.add(this,e)},r.prototype.addStrict=function(e){return this.throwIfDisposed(),P.addStrict(this,e)},r.prototype.atan2=function(e){return this.throwIfDisposed(),P.atan2(this,e)},r.prototype.sub=function(e){return this.throwIfDisposed(),P.sub(this,e)},r.prototype.subStrict=function(e){return this.throwIfDisposed(),P.subStrict(this,e)},r.prototype.pow=function(e){return this.throwIfDisposed(),P.pow(this,e)},r.prototype.powStrict=function(e){return this.throwIfDisposed(),P.powStrict(this,e)},r.prototype.mul=function(e){return this.throwIfDisposed(),P.mul(this,e)},r.prototype.mulStrict=function(e){return this.throwIfDisposed(),P.mulStrict(this,e)},r.prototype.div=function(e){return this.throwIfDisposed(),P.div(this,e)},r.prototype.divNoNan=function(e){return this.throwIfDisposed(),P.divNoNan(this,e)},r.prototype.floorDiv=function(e){return this.throwIfDisposed(),P.floorDiv(this,e)},r.prototype.divStrict=function(e){return this.throwIfDisposed(),P.divStrict(this,e)},r.prototype.minimum=function(e){return this.throwIfDisposed(),P.minimum(this,e)},r.prototype.minimumStrict=function(e){return this.throwIfDisposed(),P.minimumStrict(this,e)},r.prototype.maximum=function(e){return this.throwIfDisposed(),P.maximum(this,e)},r.prototype.maximumStrict=function(e){return this.throwIfDisposed(),P.maximumStrict(this,e)},r.prototype.mod=function(e){return this.throwIfDisposed(),P.mod(this,e)},r.prototype.modStrict=function(e){return this.throwIfDisposed(),P.modStrict(this,e)},r.prototype.squaredDifferenceStrict=function(e){return this.throwIfDisposed(),P.squaredDifferenceStrict(this,e)},r.prototype.transpose=function(e){return this.throwIfDisposed(),P.transpose(this,e)},r.prototype.notEqual=function(e){return this.throwIfDisposed(),P.notEqual(this,e)},r.prototype.notEqualStrict=function(e){return this.throwIfDisposed(),P.notEqualStrict(this,e)},r.prototype.less=function(e){return this.throwIfDisposed(),P.less(this,e)},r.prototype.lessStrict=function(e){return this.throwIfDisposed(),P.lessStrict(this,e)},r.prototype.equal=function(e){return this.throwIfDisposed(),P.equal(this,e)},r.prototype.equalStrict=function(e){return this.throwIfDisposed(),P.equalStrict(this,e)},r.prototype.lessEqual=function(e){return this.throwIfDisposed(),P.lessEqual(this,e)},r.prototype.lessEqualStrict=function(e){return this.throwIfDisposed(),P.lessEqualStrict(this,e)},r.prototype.greater=function(e){return this.throwIfDisposed(),P.greater(this,e)},r.prototype.greaterStrict=function(e){return this.throwIfDisposed(),P.greaterStrict(this,e)},r.prototype.greaterEqual=function(e){return this.throwIfDisposed(),P.greaterEqual(this,e)},r.prototype.greaterEqualStrict=function(e){return this.throwIfDisposed(),P.greaterEqualStrict(this,e)},r.prototype.logicalAnd=function(e){return this.throwIfDisposed(),P.logicalAnd(this,e)},r.prototype.logicalOr=function(e){return this.throwIfDisposed(),P.logicalOr(this,e)},r.prototype.logicalNot=function(){return this.throwIfDisposed(),P.logicalNot(this)},r.prototype.logicalXor=function(e){return this.throwIfDisposed(),P.logicalXor(this,e)},r.prototype.where=function(e,t){return this.throwIfDisposed(),P.where(e,this,t)},r.prototype.neg=function(){return this.throwIfDisposed(),P.neg(this)},r.prototype.ceil=function(){return this.throwIfDisposed(),P.ceil(this)},r.prototype.floor=function(){return this.throwIfDisposed(),P.floor(this)},r.prototype.sign=function(){return this.throwIfDisposed(),P.sign(this)},r.prototype.isNaN=function(){return this.throwIfDisposed(),P.isNaN(this)},r.prototype.isInf=function(){return this.throwIfDisposed(),P.isInf(this)},r.prototype.isFinite=function(){return this.throwIfDisposed(),P.isFinite(this)},r.prototype.exp=function(){return this.throwIfDisposed(),P.exp(this)},r.prototype.expm1=function(){return this.throwIfDisposed(),P.expm1(this)},r.prototype.log=function(){return this.throwIfDisposed(),P.log(this)},r.prototype.log1p=function(){return this.throwIfDisposed(),P.log1p(this)},r.prototype.sqrt=function(){return this.throwIfDisposed(),P.sqrt(this)},r.prototype.rsqrt=function(){return this.throwIfDisposed(),P.rsqrt(this)},r.prototype.square=function(){return this.throwIfDisposed(),P.square(this)},r.prototype.reciprocal=function(){return this.throwIfDisposed(),P.reciprocal(this)},r.prototype.abs=function(){return this.throwIfDisposed(),P.abs(this)},r.prototype.clipByValue=function(e,t){return this.throwIfDisposed(),P.clipByValue(this,e,t)},r.prototype.relu=function(){return this.throwIfDisposed(),P.relu(this)},r.prototype.relu6=function(){return this.throwIfDisposed(),P.relu6(this)},r.prototype.elu=function(){return this.throwIfDisposed(),P.elu(this)},r.prototype.selu=function(){return this.throwIfDisposed(),P.selu(this)},r.prototype.leakyRelu=function(e){return e===void 0&&(e=.2),this.throwIfDisposed(),P.leakyRelu(this,e)},r.prototype.prelu=function(e){return this.throwIfDisposed(),P.prelu(this,e)},r.prototype.sigmoid=function(){return this.throwIfDisposed(),P.sigmoid(this)},r.prototype.logSigmoid=function(){return this.throwIfDisposed(),P.logSigmoid(this)},r.prototype.softplus=function(){return this.throwIfDisposed(),P.softplus(this)},r.prototype.zerosLike=function(){return this.throwIfDisposed(),P.zerosLike(this)},r.prototype.onesLike=function(){return this.throwIfDisposed(),P.onesLike(this)},r.prototype.sin=function(){return this.throwIfDisposed(),P.sin(this)},r.prototype.cos=function(){return this.throwIfDisposed(),P.cos(this)},r.prototype.tan=function(){return this.throwIfDisposed(),P.tan(this)},r.prototype.asin=function(){return this.throwIfDisposed(),P.asin(this)},r.prototype.acos=function(){return this.throwIfDisposed(),P.acos(this)},r.prototype.atan=function(){return this.throwIfDisposed(),P.atan(this)},r.prototype.sinh=function(){return this.throwIfDisposed(),P.sinh(this)},r.prototype.cosh=function(){return this.throwIfDisposed(),P.cosh(this)},r.prototype.tanh=function(){return this.throwIfDisposed(),P.tanh(this)},r.prototype.asinh=function(){return this.throwIfDisposed(),P.asinh(this)},r.prototype.acosh=function(){return this.throwIfDisposed(),P.acosh(this)},r.prototype.atanh=function(){return this.throwIfDisposed(),P.atanh(this)},r.prototype.erf=function(){return this.throwIfDisposed(),P.erf(this)},r.prototype.round=function(){return this.throwIfDisposed(),P.round(this)},r.prototype.step=function(e){return e===void 0&&(e=0),this.throwIfDisposed(),P.step(this,e)},r.prototype.softmax=function(e){return e===void 0&&(e=-1),this.throwIfDisposed(),P.softmax(this,e)},r.prototype.logSoftmax=function(e){return e===void 0&&(e=-1),this.throwIfDisposed(),P.logSoftmax(this,e)},r.prototype.resizeBilinear=function(e,t){return t===void 0&&(t=!1),this.throwIfDisposed(),P.image.resizeBilinear(this,e,t)},r.prototype.resizeNearestNeighbor=function(e,t){return t===void 0&&(t=!1),this.throwIfDisposed(),P.image.resizeNearestNeighbor(this,e,t)},r.prototype.conv1d=function(e,t,n,o,a,i){return o===void 0&&(o="NWC"),a===void 0&&(a=1),this.throwIfDisposed(),P.conv1d(this,e,t,n,o,a,i)},r.prototype.conv2d=function(e,t,n,o,a,i){return o===void 0&&(o="NHWC"),a===void 0&&(a=[1,1]),this.throwIfDisposed(),P.conv2d(this,e,t,n,o,a,i)},r.prototype.conv2dTranspose=function(e,t,n,o,a){return this.throwIfDisposed(),P.conv2dTranspose(this,e,t,n,o,a)},r.prototype.depthwiseConv2D=function(e,t,n,o,a,i){return o===void 0&&(o="NHWC"),a===void 0&&(a=[1,1]),this.throwIfDisposed(),P.depthwiseConv2d(this,e,t,n,o,a,i)},r.prototype.separableConv2d=function(e,t,n,o,a,i){return a===void 0&&(a=[1,1]),i===void 0&&(i="NHWC"),this.throwIfDisposed(),P.separableConv2d(this,e,t,n,o,a,i)},r.prototype.avgPool=function(e,t,n,o){return this.throwIfDisposed(),P.avgPool(this,e,t,n,o)},r.prototype.maxPool=function(e,t,n,o){return this.throwIfDisposed(),P.maxPool(this,e,t,n,o)},r.prototype.localResponseNormalization=function(e,t,n,o){return e===void 0&&(e=5),t===void 0&&(t=1),n===void 0&&(n=1),o===void 0&&(o=.5),P.localResponseNormalization(this,e,t,n,o)},r.prototype.pool=function(e,t,n,o,a){return this.throwIfDisposed(),P.pool(this,e,t,n,o,a)},r.prototype.variable=function(e,t,n){return e===void 0&&(e=!0),this.throwIfDisposed(),Ie().makeVariable(this,e,t,n)},r.prototype.unsortedSegmentSum=function(e,t){return this.throwIfDisposed(),P.unsortedSegmentSum(this,e,t)},r.prototype.batchToSpaceND=function(e,t){return this.throwIfDisposed(),P.batchToSpaceND(this,e,t)},r.prototype.spaceToBatchND=function(e,t){return this.throwIfDisposed(),P.spaceToBatchND(this,e,t)},r.prototype.topk=function(e,t){return e===void 0&&(e=1),t===void 0&&(t=!0),this.throwIfDisposed(),P.topk(this,e,t)},r.prototype.stridedSlice=function(e,t,n,o,a,i,s,u){return o===void 0&&(o=0),a===void 0&&(a=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),this.throwIfDisposed(),P.stridedSlice(this,e,t,n,o,a,i,s,u)},r.prototype.depthToSpace=function(e,t){return this.throwIfDisposed(),P.depthToSpace(this,e,t)},r.prototype.fft=function(){return this.throwIfDisposed(),P.spectral.fft(this)},r.prototype.ifft=function(){return this.throwIfDisposed(),P.spectral.ifft(this)},r.prototype.rfft=function(){return this.throwIfDisposed(),P.spectral.rfft(this)},r.prototype.irfft=function(){return this.throwIfDisposed(),P.spectral.irfft(this)},r}();Object.defineProperty(Et,Symbol.hasInstance,{value:function(r){return!!r&&r.dataId!=null&&r.shape!=null&&r.dtype!=null}});var Fi,sa,ua,ca,la,qn=function(r){function e(t,n,o,a){var i=r.call(this,t.shape,t.dtype,t.dataId,a)||this;return i.trainable=n,i.name=o,i}return ye(e,r),e.prototype.assign=function(t){if(t.dtype!==this.dtype)throw new Error("dtype of the new value ("+t.dtype+") and previous value ("+this.dtype+") must match");if(!Wt(t.shape,this.shape))throw new Error("shape of the new value ("+t.shape+") and previous value ("+this.shape+") must match");Ie().disposeTensor(this),this.dataId=t.dataId,Ie().incRef(this,null)},e.prototype.dispose=function(){Ie().disposeVariable(this),this.isDisposedInternal=!0},e}(Et);Object.defineProperty(qn,Symbol.hasInstance,{value:function(r){return r instanceof Et&&r.assign!=null&&r.assign instanceof Function}}),function(r){r.R0="R0",r.R1="R1",r.R2="R2",r.R3="R3",r.R4="R4",r.R5="R5",r.R6="R6"}(Fi||(Fi={})),function(r){r.float32="float32",r.int32="int32",r.bool="int32",r.complex64="complex64"}(sa||(sa={})),function(r){r.float32="float32",r.int32="int32",r.bool="bool",r.complex64="complex64"}(ua||(ua={})),function(r){r.float32="float32",r.int32="float32",r.bool="float32",r.complex64="complex64"}(ca||(ca={})),function(r){r.float32="complex64",r.int32="complex64",r.bool="complex64",r.complex64="complex64"}(la||(la={}));var gl={float32:ca,int32:sa,bool:ua,complex64:la};function Vt(r,e){if(r==="string"||e==="string"){if(r==="string"&&e==="string")return"string";throw new Error("Can not upcast "+r+" with "+e)}return gl[r][e]}function Ao(r){return Vt(r,"int32")}function It(r,e){if(r.dtype===e.dtype)return[r,e];var t=Vt(r.dtype,e.dtype);return[r.cast(t),e.cast(t)]}function yl(r,e){E(r.dtype===e.dtype,function(){return"The dtypes of the first("+r.dtype+") and second("+e.dtype+") input must match"})}function zs(r){var e=[];return function t(n,o,a){if(n!=null){if(n instanceof Et)return void o.push(n);if(i=n,!(!Array.isArray(i)&&typeof i!="object")){var i,s=n;for(var u in s){var c=s[u];a.has(c)||(a.add(c),t(c,o,a))}}}}(r,e,new Set),e}var To,Pi=function(){function r(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null}}return r.prototype.dispose=function(){for(var e in this.registeredVariables)this.registeredVariables[e].dispose()},r}(),xl=function(){function r(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Pi}return r.prototype.ready=function(){return X(this,void 0,void 0,function(){var e,t,n;return Y(this,function(o){switch(o.label){case 0:if(this.pendingBackendInit!=null)return[2,this.pendingBackendInit.then(function(){})];if(this.backendInstance!=null)return[2];e=this.getSortedBackends(),t=0,o.label=1;case 1:return t<e.length?(n=e[t],[4,this.initializeBackend(n).success]):[3,5];case 2:return o.sent()?[4,this.setBackend(n)]:[3,4];case 3:return o.sent(),[2];case 4:return t++,[3,1];case 5:throw new Error("Could not initialize any backends, all backend initializations failed.")}})})},Object.defineProperty(r.prototype,"backend",{get:function(){if(this.pendingBackendInit!=null)throw new Error("Backend '"+this.backendName+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");if(this.backendInstance==null){var e=this.initializeBackendsAndReturnBest(),t=e.name;if(e.asyncInit)throw new Error("The highest priority backend '"+t+"' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods");this.setBackend(t)}return this.backendInstance},enumerable:!0,configurable:!0}),r.prototype.backendNames=function(){return Object.keys(this.registryFactory)},r.prototype.findBackend=function(e){return!(e in this.registry)&&(!(e in this.registryFactory)||this.initializeBackend(e).asyncInit)?null:this.registry[e]},r.prototype.findBackendFactory=function(e){return e in this.registryFactory?this.registryFactory[e].factory:null},r.prototype.registerBackend=function(e,t,n){return n===void 0&&(n=1),e in this.registryFactory?(console.warn(e+" backend was already registered. Reusing existing backend factory."),!1):(this.registryFactory[e]={factory:t,priority:n},!0)},r.prototype.setBackend=function(e){return X(this,void 0,void 0,function(){var t,n,o;return Y(this,function(a){switch(a.label){case 0:if(this.registryFactory[e]==null)throw new Error("Backend name '"+e+"' not found in registry");return this.backendName=e,this.registry[e]!=null?[3,4]:(this.backendInstance=null,t=this.initializeBackend(e),n=t.success,t.asyncInit?[4,n]:[3,2]);case 1:return o=a.sent(),[3,3];case 2:o=n,a.label=3;case 3:if(!o)return[2,!1];a.label=4;case 4:return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new dl(this.backendInstance),[2,!0]}})})},r.prototype.setupRegisteredKernels=function(){var e=this;Si(this.backendName).forEach(function(t){t.setupFunc!=null&&t.setupFunc(e.backendInstance)})},r.prototype.disposeRegisteredKernels=function(e){var t=this;Si(e).forEach(function(n){n.disposeFunc!=null&&n.disposeFunc(t.registry[e])})},r.prototype.initializeBackend=function(e){var t=this,n=this.registryFactory[e];if(n==null)throw new Error("Cannot initialize backend "+e+", no registration found.");try{var o=n.factory();if(Promise.resolve(o)===o){var a=++this.pendingBackendInitId,i=o.then(function(s){return!(a<t.pendingBackendInitId)&&(t.registry[e]=s,t.pendingBackendInit=null,!0)}).catch(function(s){return!(a<t.pendingBackendInitId)&&(t.pendingBackendInit=null,console.warn("Initialization of backend "+e+" failed"),console.warn(s.stack||s.message),!1)});return this.pendingBackendInit=i,{success:i,asyncInit:!0}}return this.registry[e]=o,{success:!0,asyncInit:!1}}catch(s){return console.warn("Initialization of backend "+e+" failed"),console.warn(s.stack||s.message),{success:!1,asyncInit:!1}}},r.prototype.removeBackend=function(e){if(!(e in this.registryFactory))throw new Error(e+" backend not found in registry");this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)},r.prototype.getSortedBackends=function(){var e=this;if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort(function(t,n){return e.registryFactory[n].priority-e.registryFactory[t].priority})},r.prototype.initializeBackendsAndReturnBest=function(){for(var e=this.getSortedBackends(),t=0;t<e.length;t++){var n=e[t],o=this.initializeBackend(n),a=o.success,i=o.asyncInit;if(i||a)return{name:n,asyncInit:i}}throw new Error("Could not initialize any backends, all backend initializations failed.")},r.prototype.moveData=function(e,t){var n=this.state.tensorInfo.get(t),o=n.backend,a=this.readSync(t);o.disposeData(t),n.backend=e,e.move(t,a,n.shape,n.dtype),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++},r.prototype.tidy=function(e,t){var n,o=this,a=null;if(t==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");t=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof t!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");a=e}return this.scopedRun(function(){return o.startScope(a)},function(){return o.endScope(n)},function(){return(n=t())instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n})},r.prototype.scopedRun=function(e,t,n){e();try{var o=n();return t(),o}catch(a){throw t(),a}},r.prototype.nextTensorId=function(){return r.nextTensorId++},r.prototype.nextVariableId=function(){return r.nextVariableId++},r.prototype.clone=function(e){var t=this.makeTensorFromDataId(e.dataId,e.shape,e.dtype),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],function(o){return{x:function(){return o.toFloat()}}},[]),t},r.prototype.runKernel=function(e,t,n,o,a){return this.runKernelFunc(null,t,null,e,n,o,a)},r.prototype.shouldCheckForMemLeaks=function(){return this.ENV.getBool("IS_TEST")},r.prototype.checkKernelForMemLeak=function(e,t,n){var o=this.backend.numDataIds(),a=0;n.forEach(function(u){a+=u.dtype==="complex64"?3:1});var i=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],s=o-t-a-i;if(s>0)throw new Error("Backend '"+this.backendName+"' has an internal memory leak ("+s+" data ids) after running '"+e+"'")},r.prototype.runKernelFunc=function(e,t,n,o,a,i,s){var u,c=this;i===void 0&&(i=[]),s===void 0&&(s=[]);var l=[],h=this.isTapeOn();o==null&&(o=this.state.activeScope!=null?this.state.activeScope.name:"");var f,p=function(x){h&&(l=x.map(function(b){return c.keep(c.clone(b))}))},d=this.state.numBytes,m=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);var v,g=Ts(o,this.backendName);return f=g!=null?function(){var x=c.backend.numDataIds();v=g.kernelFunc({inputs:t,attrs:a,backend:c.backend});var b=Array.isArray(v)?v:[v];c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(o,x,b);var y=b.map(function(C){var k=C.dataId,S=C.shape,R=C.dtype;return c.makeTensorFromDataId(k,S,R)}),w=y.filter(function(C,k){return s[k]});return p((i||[]).slice().concat(w)),y}:function(){var x=c.backend.numDataIds();v=c.tidy(function(){return e(c.backend,p)});var b=Array.isArray(v)?v:[v];return c.shouldCheckForMemLeaks()&&c.checkKernelForMemLeak(o,x,b),b},this.scopedRun(function(){return c.state.kernelDepth++},function(){return c.state.kernelDepth--},function(){u=c.ENV.getBool("DEBUG")?c.profiler.profileKernel(o,t,function(){return f()}):f()}),h&&this.addTapeNode(o,t,u,n,l),this.state.profiling&&this.state.activeProfile.kernels.push({name:o,bytesAdded:this.state.numBytes-d,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-m,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(t).map(function(x){return t[x].shape}),outputShapes:u.map(function(x){return x.shape})}),Array.isArray(v)?u:u[0]},r.prototype.makeTensor=function(e,t,n,o){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",o=o||this.backend;var a=e;n==="string"&&Ra(e[0])&&(a=e.map(function(l){return fl(l)}));var i=o.write(a,t,n),s=new Et(t,n,i,this.nextTensorId());if(this.incRef(s,o),n==="string"){var u=this.state.tensorInfo.get(i),c=cl(a);this.state.numBytes+=c-u.bytes,u.bytes=c}return s},r.prototype.makeTensorFromDataId=function(e,t,n,o){var a=new Et(t,n=n||"float32",e,this.nextTensorId());return this.incRef(a,o),a},r.prototype.makeVariable=function(e,t,n,o){t===void 0&&(t=!0),n=n||this.nextVariableId().toString(),o!=null&&o!==e.dtype&&(e=e.asType(o));var a=new qn(e,t,n,this.nextTensorId());if(this.state.registeredVariables[a.name]!=null)throw new Error("Variable with name "+a.name+" was already registered");return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a},r.prototype.incRef=function(e,t){var n=this.state.tensorInfo.has(e.dataId)?this.state.tensorInfo.get(e.dataId).refCount:0;if(this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++,n===0){this.state.numDataBuffers++;var o=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(o=e.size*Ms(e.dtype)),this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:o,refCount:0}),this.state.numBytes+=o}this.state.tensorInfo.get(e.dataId).refCount++,e instanceof qn||this.track(e)},r.prototype.disposeTensor=function(e){if(this.state.tensorInfo.has(e.dataId)){this.state.numTensors--,e.dtype==="string"&&this.state.numStringTensors--;var t=this.state.tensorInfo.get(e.dataId);t.refCount<=1?(e.dtype!=="complex64"&&(this.state.numBytes-=t.bytes),this.state.numDataBuffers--,t.backend.disposeData(e.dataId),this.state.tensorInfo.delete(e.dataId)):this.state.tensorInfo.get(e.dataId).refCount--}},r.prototype.disposeVariables=function(){for(var e in this.state.registeredVariables){var t=this.state.registeredVariables[e];this.disposeVariable(t)}},r.prototype.disposeVariable=function(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]},r.prototype.memory=function(){var e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e},r.prototype.profile=function(e){return X(this,void 0,void 0,function(){var t,n;return Y(this,function(o){return this.state.profiling=!0,t=this.state.numBytes,n=this.state.numTensors,this.state.activeProfile.kernels=[],this.state.activeProfile.result=e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max.apply(Math,this.state.activeProfile.kernels.map(function(a){return a.totalBytesSnapshot})),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n,[2,this.state.activeProfile]})})},r.prototype.isTapeOn=function(){return this.state.gradientDepth>0&&this.state.kernelDepth===0},r.prototype.addTapeNode=function(e,t,n,o,a){var i=this,s={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:a},u=el(e);u!=null&&(o=u.gradFunc),o!=null&&(s.gradient=function(c){return c=c.map(function(l,h){if(l==null){var f=n[h],p=pr(f.size,f.dtype);return i.makeTensor(p,f.shape,f.dtype)}return l}),o(c.length>1?c:c[0],a)}),this.state.activeTape.push(s)},r.prototype.keep=function(e){return e.kept=!0,e},r.prototype.startTape=function(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++},r.prototype.endTape=function(){this.state.gradientDepth--},r.prototype.startScope=function(e){var t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t},r.prototype.endScope=function(e){for(var t=this,n=zs(e),o=new Set(n.map(function(u){return u.id})),a=0;a<this.state.activeScope.track.length;a++){var i=this.state.activeScope.track[a];i.kept||o.has(i.id)||i.dispose()}var s=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(function(u){u.kept||u.scopeId!==s.id||t.track(u)})},r.prototype.gradients=function(e,t,n,o){var a=this;if(o===void 0&&(o=!1),E(t.length>0,function(){return"gradients() received an empty list of xs."}),n!=null&&n.dtype!=="float32")throw new Error("dy must have 'float32' dtype, but has '"+n.dtype+"'");var i=this.scopedRun(function(){return a.startTape()},function(){return a.endTape()},function(){return a.tidy("forward",e)});E(i instanceof Et,function(){return"The result y returned by f() must be a tensor."});var s=function(u,c,l){for(var h={},f={},p=0;p<c.length;p++)h[c[p].id]=!0;for(p=0;p<u.length;p++){var d=(C=u[p]).inputs;for(var m in d){for(var v=d[m],g=!1,x=0;x<c.length;x++)if(h[v.id]){C.outputs.forEach(function(I){return h[I.id]=!0}),g=!0,f[C.id]=!0;break}if(g)break}}var b={};b[l.id]=!0;var y={};for(p=u.length-1;p>=0;p--)for(d=(C=u[p]).inputs,x=0;x<C.outputs.length;x++)if(b[C.outputs[x].id]){for(var m in d)b[d[m].id]=!0,y[C.id]=!0;break}var w=[];for(p=0;p<u.length;p++){var C;if(f[(C=u[p]).id]&&y[C.id]){var k={};for(var m in C.inputs){var S=C.inputs[m];h[S.id]&&(k[m]=S)}var R=Object.assign({},C);R.inputs=k,R.outputs=C.outputs,w.push(R)}}return w}(this.state.activeTape,t,i);if(!o&&s.length===0&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",function(){var u,c,l={};l[i.id]=n??(u=i.shape,c=Bs($(u),"float32"),T.makeTensor(c,u,"float32")),function(f,p,d){for(var m=function(g){var x=p[g],b=[];if(x.outputs.forEach(function(k){var S=f[k.id];S!=null?b.push(S):b.push(null)}),x.gradient==null)throw new Error("Cannot compute gradient: gradient function not found for "+x.kernelName+".");var y=x.gradient(b),w=function(k){if(!(k in y))throw new Error("Cannot backprop through input "+k+". Available gradients found: "+Object.keys(y)+".");var S=d(function(){return y[k]()});if(S.dtype!=="float32")throw new Error("Error in gradient for op "+x.kernelName+". The gradient of input "+k+" must have 'float32' dtype, but has '"+S.dtype+"'");var R=x.inputs[k];if(!Wt(S.shape,R.shape))throw new Error("Error in gradient for op "+x.kernelName+". The gradient of input '"+k+"' has shape '"+S.shape+"', which does not match the shape of the input '"+R.shape+"'");if(f[R.id]==null)f[R.id]=S;else{var I=f[R.id];f[R.id]=I.add(S),I.dispose()}};for(var C in x.inputs)w(C)},v=p.length-1;v>=0;v--)m(v)}(l,s,function(f){return a.tidy(f)});var h=t.map(function(f){return l[f.id]});return a.state.gradientDepth===0&&(a.state.activeTape.forEach(function(f){for(var p=0,d=f.saved;p<d.length;p++)d[p].dispose()}),a.state.activeTape=null),{value:i,grads:h}})},r.prototype.customGrad=function(e){var t=this;return E(aa(e),function(){return"The f passed in customGrad(f) must be a function."}),function(){for(var n,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];E(o.every(function(s){return s instanceof Et}),function(){return"The args passed in customGrad(f)(x1, x2,...) must all be tensors"});var i={};return o.forEach(function(s,u){i[u]=s}),t.runKernelFunc(function(s,u){return E((n=e.apply(void 0,o.concat([u]))).value instanceof Et,function(){return"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"}),E(aa(n.gradFunc),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."}),n.value},i,function(s,u){var c=n.gradFunc(s,u),l=Array.isArray(c)?c:[c];E(l.length===o.length,function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."}),E(l.every(function(f){return f instanceof Et}),function(){return"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."});var h={};return l.forEach(function(f,p){h[p]=function(){return f}}),h})}},r.prototype.readSync=function(e){return this.state.tensorInfo.get(e).backend.readSync(e)},r.prototype.read=function(e){return this.state.tensorInfo.get(e).backend.read(e)},r.prototype.time=function(e){return X(this,void 0,void 0,function(){var t,n;return Y(this,function(o){switch(o.label){case 0:return t=Re(),[4,this.backend.time(e)];case 1:return(n=o.sent()).wallMs=Re()-t,[2,n]}})})},r.prototype.track=function(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e},Object.defineProperty(r.prototype,"registeredVariables",{get:function(){return this.state.registeredVariables},enumerable:!0,configurable:!0}),r.prototype.reset=function(){for(var e in this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Pi,this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null},r.nextTensorId=0,r.nextVariableId=0,r}(),T=function(){var r=function(){if(To==null){var t=void 0;if(typeof window<"u")t=window;else if(typeof global<"u")t=global;else if(typeof process<"u")t=process;else{if(typeof self>"u")throw new Error("Could not find a global object");t=self}To=t}return To}();if(r._tfengine==null){var e=new Zc(r);r._tfengine=new xl(e)}return function(t){As=t}(r._tfengine.ENV),Ie=function(){return r._tfengine},r._tfengine}();function Vs(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var Ue=M();Ue.registerFlag("DEBUG",function(){return!1},function(r){r&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")}),Ue.registerFlag("IS_BROWSER",function(){return Vs()}),Ue.registerFlag("IS_NODE",function(){return typeof process<"u"&&process.versions!==void 0&&process.versions.node!==void 0}),Ue.registerFlag("IS_CHROME",function(){return typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)}),Ue.registerFlag("PROD",function(){return!1}),Ue.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",function(){return Ue.getBool("DEBUG")}),Ue.registerFlag("DEPRECATION_WARNINGS_ENABLED",function(){return!0}),Ue.registerFlag("IS_TEST",function(){return!1});var ar,ie,ae,fn={},No={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function bl(r,e){fn[r]=e}function Pe(r){r in fn||(fn[r]=function(t){if(t!==1&&t!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");var n=function(o){if(typeof OffscreenCanvas<"u"&&o===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}(t);return n.addEventListener("webglcontextlost",function(o){o.preventDefault(),delete fn[t]},!1),t===1?n.getContext("webgl",No)||n.getContext("experimental-webgl",No):n.getContext("webgl2",No)}(r));var e=fn[r];return e.isContextLost()?(delete fn[r],Pe(r)):(e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.DITHER),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SAMPLE_COVERAGE),e.enable(e.SCISSOR_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),fn[r])}function io(r,e){return[e,r]}function tr(r){var e=$(r);return oa(Math.ceil(e/4))}function dr(r,e){return[Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(r/2))]}function Ia(r,e){var t,n,o,a,i,s,u,c,l,h=r;return M().getNumber("WEBGL_VERSION")===2?(t=h.R32F,n=h.R16F,o=h.RGBA16F,a=h.RGBA32F,i=h.RED,s=4,u=1,c=h.HALF_FLOAT,l=h.FLOAT):(t=r.RGBA,n=r.RGBA,o=r.RGBA,a=h.RGBA,i=r.RGBA,s=4,u=4,c=e!=null?e.HALF_FLOAT_OES:null,l=r.FLOAT),{internalFormatFloat:t,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:o,internalFormatPackedFloat:a,textureFormatFloat:i,downloadTextureFormat:r.RGBA,downloadUnpackNumChannels:s,defaultNumChannels:u,textureTypeHalfFloat:c,textureTypeFloat:l}}function J(r,e,t){var n=t();return e&&function(o){var a=o.getError();if(a!==o.NO_ERROR)throw new Error("WebGL Error: "+El(o,a))}(r),n}(function(r){r[r.DENSE=0]="DENSE",r[r.SHARED_BATCH=1]="SHARED_BATCH"})(ar||(ar={})),function(r){r[r.RENDER=0]="RENDER",r[r.UPLOAD=1]="UPLOAD",r[r.PIXELS=2]="PIXELS",r[r.DOWNLOAD=3]="DOWNLOAD"}(ie||(ie={})),function(r){r[r.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",r[r.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",r[r.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",r[r.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",r[r.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"}(ae||(ae={}));var wl=596e-10,Cl=65504;function _l(r){return!!(M().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||r===0||wl<Math.abs(r)&&Math.abs(r)<Cl)}function El(r,e){switch(e){case r.NO_ERROR:return"NO_ERROR";case r.INVALID_ENUM:return"INVALID_ENUM";case r.INVALID_VALUE:return"INVALID_VALUE";case r.INVALID_OPERATION:return"INVALID_OPERATION";case r.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case r.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case r.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return"Unknown error code "+e}}function Cr(r,e,t){return He(r,e,function(){return r.getExtension(t)},'Extension "'+t+'" not supported on this browser.')}function Rl(r,e,t){var n=He(r,e,function(){return r.createShader(r.VERTEX_SHADER)},"Unable to create vertex WebGLShader.");if(J(r,e,function(){return r.shaderSource(n,t)}),J(r,e,function(){return r.compileShader(n)}),r.getShaderParameter(n,r.COMPILE_STATUS)===!1)throw console.log(r.getShaderInfoLog(n)),new Error("Failed to compile vertex shader.");return n}function Il(r,e,t){var n=He(r,e,function(){return r.createShader(r.FRAGMENT_SHADER)},"Unable to create fragment WebGLShader.");if(J(r,e,function(){return r.shaderSource(n,t)}),J(r,e,function(){return r.compileShader(n)}),r.getShaderParameter(n,r.COMPILE_STATUS)===!1)throw function(o,a){var i=kl.exec(a);if(i==null)return console.log("Couldn't parse line number in error: "+a),void console.log(o);for(var s=+i[1],u=o.split(`
`),c=u.length.toString().length+2,l=u.map(function(v,g){return On((g+1).toString(),c)+v}),h=0,f=0;f<l.length;f++)h=Math.max(l[f].length,h);var p=l.slice(0,s-1),d=l.slice(s-1,s),m=l.slice(s);console.log(p.join(`
`)),console.log(a.split(`
`)[0]),console.log("%c "+On(d[0],h),"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(m.join(`
`))}(t,r.getShaderInfoLog(n)),new Error("Failed to compile fragment shader.");return n}var Fo,Po,kl=/ERROR: [0-9]+:([0-9]+):/g;function Sl(r,e){return He(r,e,function(){return r.createProgram()},"Unable to create WebGLProgram.")}function Dl(r,e,t){if(J(r,e,function(){return r.linkProgram(t)}),r.getProgramParameter(t,r.LINK_STATUS)===!1)throw console.log(r.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}function Mo(r,e,t){if(J(r,e,function(){return r.validateProgram(t)}),r.getProgramParameter(t,r.VALIDATE_STATUS)===!1)throw console.log(r.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function Al(r,e,t){var n=He(r,e,function(){return r.createBuffer()},"Unable to create WebGLBuffer");return J(r,e,function(){return r.bindBuffer(r.ARRAY_BUFFER,n)}),J(r,e,function(){return r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW)}),n}function Tl(r,e,t){var n=He(r,e,function(){return r.createBuffer()},"Unable to create WebGLBuffer");return J(r,e,function(){return r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n)}),J(r,e,function(){return r.bufferData(r.ELEMENT_ARRAY_BUFFER,t,r.STATIC_DRAW)}),n}function Nl(r,e){return He(r,e,function(){return r.createTexture()},"Unable to create WebGLTexture.")}function Fl(r,e){var t=M().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(r<=0||e<=0){var n="["+r+"x"+e+"]";throw new Error("Requested texture size "+n+" is invalid.")}if(r>t||e>t)throw n="["+r+"x"+e+"]",new Error("Requested texture size "+n+" greater than WebGL maximum on this browser / GPU "+("["+t+"x"+t+"]")+".")}function Pl(r,e){return He(r,e,function(){return r.createFramebuffer()},"Unable to create WebGLFramebuffer.")}function Mi(r,e,t,n,o,a,i,s){var u=r.getAttribLocation(t,n);return u!==-1&&(J(r,e,function(){return r.bindBuffer(r.ARRAY_BUFFER,o)}),J(r,e,function(){return r.vertexAttribPointer(u,a,r.FLOAT,!1,i,s)}),J(r,e,function(){return r.enableVertexAttribArray(u)}),!0)}function Ml(r,e,t,n){Ul(r,n),J(r,e,function(){return r.activeTexture(r.TEXTURE0+n)}),J(r,e,function(){return r.bindTexture(r.TEXTURE_2D,t)})}function Ol(r,e,t,n){return He(r,e,function(){return r.getUniformLocation(t,n)},'uniform "'+n+'" not present in program.')}function Bl(r,e,t){return r.getUniformLocation(e,t)}function Ll(r,e,t,n,o,a){J(r,e,function(){return Ml(r,e,n,a)}),J(r,e,function(){return r.uniform1i(o,a)})}function Oo(r,e,t,n){J(r,e,function(){return r.bindFramebuffer(r.FRAMEBUFFER,n)}),J(r,e,function(){return r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0)})}function Oi(r,e,t){J(r,e,function(){return r.bindFramebuffer(r.FRAMEBUFFER,t)}),J(r,e,function(){return r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0)})}function _r(r){var e=r.checkFramebufferStatus(r.FRAMEBUFFER);if(e!==r.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+Wl(r,e))}function Wl(r,e){switch(e){case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case r.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return"unknown error "+e}}function He(r,e,t,n){var o=J(r,e,function(){return t()});if(o==null)throw new Error(n);return o}function Ul(r,e){var t=r.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,n=e+r.TEXTURE0;if(n<r.TEXTURE0||n>t)throw new Error("textureUnit must be in "+("[gl.TEXTURE0, gl.TEXTURE"+t+"]")+".")}function Ur(r,e){return e===void 0&&(e=2),$(r.slice(0,r.length-e))}function zr(r){if(r.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[r.length>1?r[r.length-2]:1,r[r.length-1]]}function Bo(r){var e=[1,1,1];return r.length===0||r.length===1&&r[0]===1||(e=[Ur(r)].concat(zr(r))),e}function zl(r,e){var t;e===void 0&&(e=!1);var n=M().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(e&&(n*=2,(r=r.map(function(c,l){return l>=r.length-2?Ps(r[l]):r[l]})).length===1&&(r=[2,r[0]])),r.length!==2){var o=dn(r);r=o.newShape}var a=$(r);if(r.length<=1&&a<=n)return[1,a];if(r.length===2&&r[0]<=n&&r[1]<=n)return r;if(r.length===3&&r[0]*r[1]<=n&&r[2]<=n)return[r[0]*r[1],r[2]];if(r.length===3&&r[0]<=n&&r[1]*r[2]<=n)return[r[0],r[1]*r[2]];if(r.length===4&&r[0]*r[1]*r[2]<=n&&r[3]<=n)return[r[0]*r[1]*r[2],r[3]];if(r.length===4&&r[0]<=n&&r[1]*r[2]*r[3]<=n)return[r[0],r[1]*r[2]*r[3]];if(e){var i=Ur(r),s=2,u=2;return r.length&&(s=(t=zr(r))[0],u=t[1]),oa(a=i*(s/2)*(u/2)).map(function(c){return 2*c})}return oa(a)}function Er(r){return r%2==0}function Rr(r,e){if(Wt(r=r.slice(-2),e=e.slice(-2))||!r.length||!e.length||r[0]===0||r[1]===0||e[0]===0||e[1]===0)return!0;if(r.length!==e.length){var t=r.slice(-1)[0],n=e.slice(-1)[0];if(t===n||Er(t)&&Er(n)&&(r[0]===1||e[0]===1))return!0}return r[1]===e[1]&&Er(r[0])&&Er(e[0])}function Vl(r){if(Fo==null){var e=Pe(r);Fo=e.getParameter(e.MAX_TEXTURE_SIZE)}return Fo}function Gl(r){if(Po==null){var e=Pe(r);Po=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Po)}function Hl(r){if(r===0)return 0;var e=Pe(r);return pe(e,"EXT_disjoint_timer_query_webgl2")&&r===2?2:pe(e,"EXT_disjoint_timer_query")?1:0}function pe(r,e){return r.getExtension(e)!=null}function Bi(r){try{if(Pe(r)!=null)return!0}catch{return!1}return!1}function ql(r){if(r===0)return!1;var e=Pe(r);if(r===1){if(!pe(e,"OES_texture_float"))return!1}else if(!pe(e,"EXT_color_buffer_float"))return!1;return ha(e)}function jl(r){if(r===0)return!1;var e=Pe(r);if(r!==1){if(pe(e,"EXT_color_buffer_float"))return ha(e);if(pe(e,"EXT_color_buffer_half_float")){var t=e.getExtension("EXT_color_buffer_half_float");return function(n,o){var a=Ia(n,o),i=n.createTexture();n.bindTexture(n.TEXTURE_2D,i),n.texImage2D(n.TEXTURE_2D,0,a.internalFormatHalfFloat,1,1,0,a.textureFormatFloat,a.textureTypeHalfFloat,null);var s=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,s),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,i,0);var u=n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE;return n.bindTexture(n.TEXTURE_2D,null),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteTexture(i),n.deleteFramebuffer(s),u}(e,t)}return!1}return!!pe(e,"OES_texture_float")&&!!pe(e,"WEBGL_color_buffer_float")&&ha(e)}function ha(r){var e=Ia(r),t=r.createTexture();r.bindTexture(r.TEXTURE_2D,t),r.texImage2D(r.TEXTURE_2D,0,e.internalFormatFloat,1,1,0,e.textureFormatFloat,e.textureTypeFloat,null);var n=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,n),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0);var o=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(t),r.deleteFramebuffer(n),o}function Kl(r){return r===2&&Pe(r).fenceSync!=null}var nt=M();function Gs(r){M().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(r+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function K(r,e){return T.tidy(r,e)}function Zt(r){zs(r).forEach(function(e){return e.dispose()})}function Xl(r){return T.keep(r)}function Vr(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];M().getBool("IS_TEST")||console.warn.apply(console,r)}function sn(r,e){var t=r;if(De(r))return e==="string"?[]:[r.length];if(!Array.isArray(r))return[];for(var n=[];Array.isArray(t)||De(t)&&e!=="string";)n.push(t.length),t=t[0];return Array.isArray(r)&&M().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&function o(a,i,s){if(s=s||[],!Array.isArray(a)&&!De(a))return void E(i.length===0,function(){return"Element arr["+s.join("][")+"] is a primitive, but should be an array/TypedArray of "+i[0]+" elements"});E(i.length>0,function(){return"Element arr["+s.join("][")+"] should be a primitive, but is an array of "+a.length+" elements"}),E(a.length===i[0],function(){return"Element arr["+s.join("][")+"] should have "+i[0]+" elements, but has "+a.length+" elements"});for(var u=i.slice(1),c=0;c<a.length;++c)o(a[c],u,s.concat(c))}(r,n,[]),n}function Li(r,e,t,n){if(r!=null&&(r!=="numeric"&&r!==e||r==="numeric"&&e==="string"))throw new Error("Argument '"+t+"' passed to '"+n+"' must be "+r+" tensor, but got "+e+" tensor")}function _(r,e,t,n){if(n===void 0&&(n="numeric"),r instanceof Et)return Li(n,r.dtype,e,t),r;var o=fr(r);if(o!=="string"&&["bool","int32","float32"].indexOf(n)>=0&&(o=n),Li(n,o,e,t),r==null||!De(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string"){var a=r==null?"null":r.constructor.name;throw new Error("Argument '"+e+"' passed to '"+t+"' must be a Tensor or TensorLike, but got '"+a+"'")}var i=sn(r,o);De(r)||Array.isArray(r)||(r=[r]);var s=o!=="string"?Os(r,o,M().getBool("DEBUG")):Hn(r,[],!0);return T.makeTensor(s,i,o)}function Gr(r,e,t,n){if(n===void 0&&(n="numeric"),!Array.isArray(r))throw new Error("Argument "+e+" passed to "+t+" must be a `Tensor[]` or `TensorLike[]`");return r.map(function(o,a){return _(o,e+"["+a+"]",t)},n)}function Hs(r,e){for(var t=0;t<r.length;++t)if(r[r.length-t-1]!==e-1-t)return!1;return!0}function Yl(r,e,t){for(var n=r.length+e.length,o=[],a=0,i=0,s=0;s<n;s++)t.indexOf(s)===-1?o.push(r[a++]):o.push(e[i++]);return o}function Ht(r,e){for(var t=[],n=r.length,o=0;o<n;o++)e.indexOf(o)===-1&&t.push(r[o]);return[t,e.map(function(a){return r[a]})]}function te(r,e){return Yl(r,e.map(function(t){return 1}),e)}function oe(r,e,t){E(Hs(e,t),function(){return r+" supports only inner-most axes for now. Got axes "+e+" and rank-"+t+" input."})}function Me(r,e){if(Hs(r,e))return null;for(var t=[],n=0;n<e;++n)r.indexOf(n)===-1&&t.push(n);return r.forEach(function(o){return t.push(o)}),t}function ka(r){return r.map(function(e,t){return[t,e]}).sort(function(e,t){return e[1]-t[1]}).map(function(e){return e[0]})}function Oe(r,e){for(var t=[],n=e-r;n<e;++n)t.push(n);return t}function $l(r,e){var t=r[0].length;r.forEach(function(o,a){E(o.length===t,function(){return"Error in concat"+t+"D: rank of tensors["+a+"] must be the same as the rank of the rest ("+t+")"})}),E(e>=0&&e<t,function(){return"Error in concat"+t+"D: axis must be between 0 and "+(t-1)+"."});var n=r[0];r.forEach(function(o,a){for(var i=0;i<t;i++)E(i===e||o[i]===n[i],function(){return"Error in concat"+t+"D: Shape of tensors["+a+"] ("+o+") does not match the shape of the rest ("+n+") along the non-concatenated axis "+a+"."})})}function jn(r,e){for(var t=r[0].slice(),n=1;n<r.length;n++)t[e]+=r[n][e];return t}function D(r){var e=Object.keys(r);if(e.length!==1)throw new Error("Please provide an object with a single key (operation name) mapping to a function. Got an object with "+e.length+" keys.");var t=e[0],n=r[t];t.endsWith("_")&&(t=t.substring(0,t.length-1));var o=function(){for(var a=[],i=0;i<arguments.length;i++)a[i]=arguments[i];T.startScope(t);try{var s=n.apply(void 0,a);return s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),T.endScope(s),s}catch(u){throw T.endScope(null),u}};return Object.defineProperty(o,"name",{value:t,configurable:!0}),o}nt.registerFlag("HAS_WEBGL",function(){return nt.getNumber("WEBGL_VERSION")>0}),nt.registerFlag("WEBGL_VERSION",function(){return Bi(2)?2:Bi(1)?1:0}),nt.registerFlag("WEBGL_BUFFER_SUPPORTED",function(){return nt.get("WEBGL_VERSION")===2}),nt.registerFlag("WEBGL_CPU_FORWARD",function(){return!0}),nt.registerFlag("WEBGL_FORCE_F16_TEXTURES",function(){return!1}),nt.registerFlag("WEBGL_PACK",function(){return nt.getBool("HAS_WEBGL")}),nt.registerFlag("WEBGL_PACK_NORMALIZATION",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_PACK_CLIP",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_PACK_DEPTHWISECONV",function(){return!1}),nt.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_PACK_REDUCE",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_LAZILY_UNPACK",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_CONV_IM2COL",function(){return nt.getBool("WEBGL_PACK")}),nt.registerFlag("WEBGL_MAX_TEXTURE_SIZE",function(){return Vl(nt.getNumber("WEBGL_VERSION"))}),nt.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",function(){return Gl(nt.getNumber("WEBGL_VERSION"))}),nt.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",function(){var r=nt.getNumber("WEBGL_VERSION");return r===0?0:Hl(r)}),nt.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",function(){return nt.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&(r=navigator.userAgent||navigator.vendor||window.opera,!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4))));var r}),nt.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",function(){return ql(nt.getNumber("WEBGL_VERSION"))}),nt.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",function(){return!nt.getBool("WEBGL_FORCE_F16_TEXTURES")&&nt.getBool("WEBGL_RENDER_FLOAT32_CAPABLE")}),nt.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",function(){return jl(nt.getNumber("WEBGL_VERSION"))}),nt.registerFlag("WEBGL_FENCE_API_ENABLED",function(){return Kl(nt.getNumber("WEBGL_VERSION"))}),nt.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",function(){return nt.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0}),Us=Gs;var zt=D({complex_:function(r,e){var t=_(r,"real","complex"),n=_(e,"imag","complex");return yt(t.shape,n.shape,"real and imag shapes, "+t.shape+" and "+n.shape+", must match in call to tf.complex()."),T.runKernelFunc(function(o){return o.complex(t,n)},{$real:t,$imag:n})}}),fe=D({real_:function(r){var e=_(r,"input","real");return T.runKernelFunc(function(t){return t.real(e)},{$input:e})}}),ke=D({imag_:function(r){var e=_(r,"input","imag");return T.runKernelFunc(function(t){return t.imag(e)},{$input:e})}});function Gt(r,e,t){return un(r,e,sn(r,t),t)}function un(r,e,t,n){if(n==null&&(n=fr(r)),n==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!De(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(e!=null){Ls(e);var o=$(e),a=$(t);E(o===a,function(){return"Based on the provided shape, ["+e+"], the tensor should have "+o+" values but has "+a});for(var i=0;i<t.length;++i){var s=t[i],u=i!==t.length-1||s!==$(e.slice(i));E(t[i]===e[i]||!u,function(){return"Error creating a new Tensor. Inferred shape ("+t+") does not match the provided shape ("+e+"). "})}}return De(r)||Array.isArray(r)||(r=[r]),e=e||t,r=n!=="string"?Os(r,n,M().getBool("DEBUG")):Hn(r,[],!0),T.makeTensor(r,e,n)}function q(r,e){if((De(r)&&e!=="string"||Array.isArray(r))&&e!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(e==="string"&&De(r)&&!(r instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return un(r,[],[],e)}function Tt(r,e){Xn(r);var t=sn(r,e);if(t.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return un(r,null,t,e)}function nn(r,e,t){if(Xn(r),e!=null&&e.length!==2)throw new Error("tensor2d() requires shape to have two numbers");var n=sn(r,t);if(n.length!==2&&n.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return un(r,e,n,t)}function Sa(r,e,t){if(Xn(r),e!=null&&e.length!==3)throw new Error("tensor3d() requires shape to have three numbers");var n=sn(r,t);if(n.length!==3&&n.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return un(r,e,n,t)}function Jt(r,e,t){if(Xn(r),e!=null&&e.length!==4)throw new Error("tensor4d() requires shape to have four numbers");var n=sn(r,t);if(n.length!==4&&n.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return un(r,e,n,t)}function Jl(r,e,t){if(Xn(r),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");var n=sn(r,t);if(n.length!==5&&n.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return un(r,e,n,t)}function Ql(r,e,t){if(Xn(r),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");var n=sn(r,t);if(n.length!==6&&n.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(n.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return un(r,e=e||n,n,t)}function Zl(r,e,t,n){return e===void 0&&(e=!0),T.makeVariable(r,e,t,n)}function Yn(r,e){if(e===void 0&&(e="float32"),e==="complex64"){var t=Yn(r,"float32"),n=wt(r,"float32");return zt(t,n)}var o=Bs($(r),e);return T.makeTensor(o,r,e)}function wt(r,e){if(e===void 0&&(e="float32"),e==="complex64"){var t=wt(r,"float32"),n=wt(r,"float32");return zt(t,n)}var o=pr($(r),e);return T.makeTensor(o,r,e)}function Te(r,e,t){return T.runKernelFunc(function(n){return n.fill(r,e,t)},{})}function th(r,e,t){if(t<=0)throw new Error("The number of values should be positive.");return T.runKernelFunc(function(n){return n.linspace(r,e,t)},{})}function Hr(r,e,t,n){if(t===void 0&&(t=1),n===void 0&&(n="float32"),t===0)throw new Error("Cannot have a step of zero");if(r===e||r<e&&t<0||e<r&&t>1)return wt([0],n);var o=pr(Math.abs(Math.ceil((e-r)/t)),n);e<r&&t===1&&(t=-1),o[0]=r;for(var a=1;a<o.length;a++)o[a]=o[a-1]+t;return Tt(o,n)}var qs=D({onesLike_:function(r){var e=_(r,"x","onesLike");if(e.dtype==="complex64"){var t=qs(fe(e)),n=vt(ke(e));return zt(t,n)}return T.runKernelFunc(function(o){return o.onesLike(e)},{$x:e},function(o,a){return{$x:function(){return vt(o)}}})}}),vt=D({zerosLike_:function(r){var e=_(r,"x","zerosLike");return T.runKernelFunc(function(t){return t.zerosLike(e)},{$x:e},function(t,n){return{$x:function(){return vt(t)}}})}}),Ft=D({concat_:function(r,e){e===void 0&&(e=0),E(r.length>=1,function(){return"Pass at least one tensor to concat"});var t=Gr(r,"tensors","concat");t[0].dtype==="complex64"&&t.forEach(function(s){if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype `+s.dtype+". ")}),e=Bt(e,t[0].shape)[0];var n=jn(t.map(function(s){return s.shape}),e);if($(n)===0)return Gt([],n);if((t=t.filter(function(s){return s.size>0})).length===1)return t[0];var o=t.map(function(s){return s.shape});$l(o,e);var a=t,i={axis:e};return T.runKernelFunc(function(s){return s.concat(t,e)},a,function(s){var u=o.map(function(c){return c[e]});return Da(s,u,e).map(function(c){return function(){return c}})},"Concat",i)}}),eh=D({concat1d_:function(r){return Ft(r,0)}}),nh=D({concat2d_:function(r,e){return Ft(r,e)}}),rh=D({concat3d_:function(r,e){return Ft(r,e)}}),oh=D({concat4d_:function(r,e){return Ft(r,e)}}),Da=D({split_:function(r,e,t){t===void 0&&(t=0);var n,o=_(r,"x","split");return t=Bt(t,o.shape)[0],typeof e=="number"?(E(o.shape[t]%e==0,function(){return"Number of splits must evenly divide the axis."}),n=new Array(e).fill(o.shape[t]/e)):(E(o.shape[t]===e.reduce(function(a,i){return a+i}),function(){return"The sum of sizes must match the size of the axis dimension."}),n=e),T.runKernelFunc(function(a){return a.split(o,n,t)},{$x:o},function(a){return{$x:function(){return Ft(a,t)}}})}});function bn(r,e){return r(e={exports:{}},e.exports),e.exports}var ah=bn(function(r){(function(e,t,n){function o(s){var u,c=this,l=(u=4022871197,function(h){h=h.toString();for(var f=0;f<h.length;f++){var p=.02519603282416938*(u+=h.charCodeAt(f));p-=u=p>>>0,u=(p*=u)>>>0,u+=4294967296*(p-=u)}return 23283064365386963e-26*(u>>>0)});c.next=function(){var h=2091639*c.s0+23283064365386963e-26*c.c;return c.s0=c.s1,c.s1=c.s2,c.s2=h-(c.c=0|h)},c.c=1,c.s0=l(" "),c.s1=l(" "),c.s2=l(" "),c.s0-=l(s),c.s0<0&&(c.s0+=1),c.s1-=l(s),c.s1<0&&(c.s1+=1),c.s2-=l(s),c.s2<0&&(c.s2+=1),l=null}function a(s,u){return u.c=s.c,u.s0=s.s0,u.s1=s.s1,u.s2=s.s2,u}function i(s,u){var c=new o(s),l=u&&u.state,h=c.next;return h.int32=function(){return 4294967296*c.next()|0},h.double=function(){return h()+11102230246251565e-32*(2097152*h()|0)},h.quick=h,l&&(typeof l=="object"&&a(l,c),h.state=function(){return a(c,{})}),h}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.alea=i})(0,r,!1)}),ih=bn(function(r){(function(e,t,n){function o(s){var u=this,c="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var h=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^h^h>>>8},s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),u.next()}function a(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u}function i(s,u){var c=new o(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&a(l,c),h.state=function(){return a(c,{})}),h}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xor128=i})(0,r,!1)}),sh=bn(function(r){(function(e,t,n){function o(s){var u=this,c="";u.next=function(){var h=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^h^h<<1)|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,s===(0|s)?u.x=s:c+=s;for(var l=0;l<c.length+64;l++)u.x^=0|c.charCodeAt(l),l==c.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function a(s,u){return u.x=s.x,u.y=s.y,u.z=s.z,u.w=s.w,u.v=s.v,u.d=s.d,u}function i(s,u){var c=new o(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&a(l,c),h.state=function(){return a(c,{})}),h}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xorwow=i})(0,r,!1)}),uh=bn(function(r){(function(e,t,n){function o(s){var u=this;u.next=function(){var c,l,h=u.x,f=u.i;return c=h[f],l=(c^=c>>>7)^c<<24,l^=(c=h[f+1&7])^c>>>10,l^=(c=h[f+3&7])^c>>>3,l^=(c=h[f+4&7])^c<<7,c=h[f+7&7],l^=(c^=c<<13)^c<<9,h[f]=l,u.i=f+1&7,l},function(c,l){var h,f=[];if(l===(0|l))f[0]=l;else for(l=""+l,h=0;h<l.length;++h)f[7&h]=f[7&h]<<15^l.charCodeAt(h)+f[h+1&7]<<13;for(;f.length<8;)f.push(0);for(h=0;h<8&&f[h]===0;++h);for(h==8?f[7]=-1:f[h],c.x=f,c.i=0,h=256;h>0;--h)c.next()}(u,s)}function a(s,u){return u.x=s.x.slice(),u.i=s.i,u}function i(s,u){s==null&&(s=+new Date);var c=new o(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(l.x&&a(l,c),h.state=function(){return a(c,{})}),h}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xorshift7=i})(0,r,!1)}),ch=bn(function(r){(function(e,t,n){function o(s){var u=this;u.next=function(){var c,l,h=u.w,f=u.X,p=u.i;return u.w=h=h+1640531527|0,l=f[p+34&127],c=f[p=p+1&127],l^=l<<13,c^=c<<17,l^=l>>>15,c^=c>>>12,l=f[p]=l^c,u.i=p,l+(h^h>>>16)|0},function(c,l){var h,f,p,d,m,v=[],g=128;for(l===(0|l)?(f=l,l=null):(l+="\0",f=0,g=Math.max(g,l.length)),p=0,d=-32;d<g;++d)l&&(f^=l.charCodeAt((d+32)%l.length)),d===0&&(m=f),f^=f<<10,f^=f>>>15,f^=f<<4,f^=f>>>13,d>=0&&(m=m+1640531527|0,p=(h=v[127&d]^=f+m)==0?p+1:0);for(p>=128&&(v[127&(l&&l.length||0)]=-1),p=127,d=512;d>0;--d)f=v[p+34&127],h=v[p=p+1&127],f^=f<<13,h^=h<<17,f^=f>>>15,h^=h>>>12,v[p]=f^h;c.w=m,c.X=v,c.i=p}(u,s)}function a(s,u){return u.i=s.i,u.w=s.w,u.X=s.X.slice(),u}function i(s,u){s==null&&(s=+new Date);var c=new o(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(l.X&&a(l,c),h.state=function(){return a(c,{})}),h}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.xor4096=i})(0,r,!1)}),lh=bn(function(r){(function(e,t,n){function o(s){var u=this,c="";u.next=function(){var h=u.b,f=u.c,p=u.d,d=u.a;return h=h<<25^h>>>7^f,f=f-p|0,p=p<<24^p>>>8^d,d=d-h|0,u.b=h=h<<20^h>>>12^f,u.c=f=f-p|0,u.d=p<<16^f>>>16^d,u.a=d-h|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,s===Math.floor(s)?(u.a=s/4294967296|0,u.b=0|s):c+=s;for(var l=0;l<c.length+20;l++)u.b^=0|c.charCodeAt(l),u.next()}function a(s,u){return u.a=s.a,u.b=s.b,u.c=s.c,u.d=s.d,u}function i(s,u){var c=new o(s),l=u&&u.state,h=function(){return(c.next()>>>0)/4294967296};return h.double=function(){do var f=((c.next()>>>11)+(c.next()>>>0)/4294967296)/2097152;while(f===0);return f},h.int32=c.next,h.quick=h,l&&(typeof l=="object"&&a(l,c),h.state=function(){return a(c,{})}),h}t&&t.exports?t.exports=i:n&&n.amd?n(function(){return i}):this.tychei=i})(0,r,!1)}),pn=bn(function(r){(function(e,t){var n,o=this,a=256,i=6,s="random",u=t.pow(a,i),c=t.pow(2,52),l=2*c,h=a-1;function f(g,x,b){var y=[],w=m(function S(R,I){var N,A=[],L=typeof R;if(I&&L=="object")for(N in R)try{A.push(S(R[N],I-1))}catch{}return A.length?A:L=="string"?R:R+"\0"}((x=x==1?{entropy:!0}:x||{}).entropy?[g,v(e)]:g??function(){try{var S;return n&&(S=n.randomBytes)?S=S(a):(S=new Uint8Array(a),(o.crypto||o.msCrypto).getRandomValues(S)),v(S)}catch{var R=o.navigator,I=R&&R.plugins;return[+new Date,o,I,o.screen,v(e)]}}(),3),y),C=new p(y),k=function(){for(var S=C.g(i),R=u,I=0;S<c;)S=(S+I)*a,R*=a,I=C.g(1);for(;S>=l;)S/=2,R/=2,I>>>=1;return(S+I)/R};return k.int32=function(){return 0|C.g(4)},k.quick=function(){return C.g(4)/4294967296},k.double=k,m(v(C.S),e),(x.pass||b||function(S,R,I,N){return N&&(N.S&&d(N,C),S.state=function(){return d(C,{})}),I?(t[s]=S,R):S})(k,w,"global"in x?x.global:this==t,x.state)}function p(g){var x,b=g.length,y=this,w=0,C=y.i=y.j=0,k=y.S=[];for(b||(g=[b++]);w<a;)k[w]=w++;for(w=0;w<a;w++)k[w]=k[C=h&C+g[w%b]+(x=k[w])],k[C]=x;(y.g=function(S){for(var R,I=0,N=y.i,A=y.j,L=y.S;S--;)R=L[N=h&N+1],I=I*a+L[h&(L[N]=L[A=h&A+R])+(L[A]=R)];return y.i=N,y.j=A,I})(a)}function d(g,x){return x.i=g.i,x.j=g.j,x.S=g.S.slice(),x}function m(g,x){for(var b,y=g+"",w=0;w<y.length;)x[h&w]=h&(b^=19*x[h&w])+y.charCodeAt(w++);return v(x)}function v(g){return String.fromCharCode.apply(0,g)}if(t["seed"+s]=f,m(t.random(),e),r.exports){r.exports=f;try{n=require("crypto")}catch{}}})([],Math)});pn.alea=ah,pn.xor128=ih,pn.xorwow=sh,pn.xorshift7=uh,pn.xor4096=ch,pn.tychei=lh;var so=pn.alea,Aa=function(){function r(e,t,n,o,a){this.mean=e,this.stdDev=t,this.dtype=n,this.nextVal=NaN,this.truncated=o,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);var i=a||Math.random();this.random=so(i.toString())}return r.prototype.nextValue=function(){if(!isNaN(this.nextVal)){var e=this.nextVal;return this.nextVal=NaN,e}for(var t,n,o=!1;!o;){var a=void 0,i=void 0,s=void 0;do s=(a=2*this.random()-1)*a+(i=2*this.random()-1)*i;while(s>=1||s===0);var u=Math.sqrt(-2*Math.log(s)/s);t=this.mean+this.stdDev*a*u,n=this.mean+this.stdDev*i*u,this.truncated&&!this.isValidTruncated(t)||(o=!0)}return this.truncated&&!this.isValidTruncated(n)||(this.nextVal=this.convertValue(n)),this.convertValue(t)},r.prototype.convertValue=function(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)},r.prototype.isValidTruncated=function(e){return e<=this.upper&&e>=this.lower},r}(),hh=function(){function r(e,t,n,o){this.alpha=e,this.beta=1/t,this.dtype=n;var a=o||Math.random();this.randu=so(a.toString()),this.randn=new Aa(0,1,n,!1,this.randu()),this.d=e<1?e+2/3:e-1/3,this.c=1/Math.sqrt(9*this.d)}return r.prototype.nextValue=function(){for(var e,t,n,o,a,i;;){do o=this.randn.nextValue(),i=1+this.c*o;while(i<=0);if(i*=i*i,t=1-.331*(e=o*o)*e,n=.5*e+this.d*(1-i+Math.log(i)),(a=this.randu())<t||Math.log(a)<n)break}return i=1/this.beta*this.d*i,this.alpha<1&&(i*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(i)},r.prototype.convertValue=function(e){return this.dtype==="float32"?e:Math.round(e)},r}(),fh=function(){function r(e,t,n,o){var a=this;if(e===void 0&&(e=0),t===void 0&&(t=1),this.canReturnFloat=function(){return a.dtype==null||a.dtype==="float32"},this.min=e,this.range=t-e,this.dtype=n,o==null&&(o=Math.random()),typeof o=="number"&&(o=o.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error("The difference between "+e+" - "+t+" <= 1 and dtype is not float");this.random=so(o)}return r.prototype.convertValue=function(e){return this.canReturnFloat()?e:Math.round(e)},r.prototype.nextValue=function(){return this.convertValue(this.min+this.range*this.random())},r}();function ot(r,e,t){return e===void 0&&(e="float32"),e=e||"float32",Ls(r),new or(r,e,t)}function ph(r,e){e===void 0&&(e=!1),console.log(r.toString(e))}var js=D({batchToSpaceND_:function(r,e,t){var n=_(r,"x","batchToSpaceND"),o=e.reduce(function(a,i){return a*i});return E(n.rank>=1+e.length,function(){return"input rank is "+n.rank+" but should be > than blockShape.length "+e.length}),E(t.length===e.length,function(){return"crops.length is "+t.length+" but should be equal to blockShape.length  "+e.length}),E(n.shape[0]%o==0,function(){return"input tensor batch is "+n.shape[0]+" but is not divisible by the product of the elements of blockShape "+e.join(" * ")+" === "+o}),T.runKernelFunc(function(a){return a.batchToSpaceND(n,e,t)},{$x:n},function(a){return{$x:function(){return a.spaceToBatchND(e,t)}}})}}),dh=D({broadcastTo_:function(r,e){var t=_(r,"broadcastTo","x"),n=t.shape;if(e.some(function(u){return!(u>0)||u%1!=0}))throw new Error("broadcastTo(): Invalid broadcast shape ["+e+"].");if(e.length<t.rank)throw new Error("broadcastTo(): shape.length="+e.length+" < input.rank="+t.rank+".");if(e.length>t.rank){for(var o=t.shape.slice();o.length<e.length;)o.unshift(1);t=t.reshape(o)}for(var a=Array.from(e),i=e.length-1;i>=0;i--)if(t.shape[i]===e[i])a[i]=1;else if(t.shape[i]!==1)throw new Error("broadcastTo(): ["+n+"] cannot be broadcast to ["+e+"].");var s=a.map(function(u,c){return u>1?c:-1}).filter(function(u){return u>=0});return s.length===0?t.clone():T.runKernelFunc(function(u){return u.tile(t,a)},{input:t},function(u){return{input:function(){return u.sum(s,!0)}}})}}),vh=D({cast_:function(r,e){var t=_(r,"x","cast");if(!sl(e))throw new Error("Failed to cast to unknown dtype "+e);if(e==="string"&&t.dtype!=="string"||e!=="string"&&t.dtype==="string")throw new Error("Only strings can be casted to strings");var n={dtype:e};return T.runKernelFunc(function(o){return o.cast(t,e)},{x:t},function(o){return{x:function(){return o.clone()}}},"Cast",n)}}),mh=D({clone_:function(r){var e=_(r,"x","clone",null);return T.runKernelFunc(function(){return T.makeTensorFromDataId(e.dataId,e.shape,e.dtype)},{$x:e},function(t){return{$x:function(){return t.toFloat()}}})}}),gh=D({cumsum_:function(r,e,t,n){e===void 0&&(e=0),t===void 0&&(t=!1),n===void 0&&(n=!1);var o=_(r,"x","cumsum"),a=Me([e|=0],o.rank),i=o;a!=null&&(i=o.transpose(a));var s=Oe(1,o.rank)[0],u=T.runKernelFunc(function(c){return c.cumsum(i,s,t,n)},{permutedX:i},function(c){return{permutedX:function(){return c.cumsum(e,t,!n)}}});return a!=null&&(u=u.transpose(a)),u}}),yh=D({depthToSpace_:function(r,e,t){t===void 0&&(t="NHWC");var n=_(r,"x","depthToSpace"),o=t==="NHWC"?n.shape[1]:n.shape[2],a=t==="NHWC"?n.shape[2]:n.shape[3],i=t==="NHWC"?n.shape[3]:n.shape[1];return E(o*e>=0,function(){return`Negative dimension size caused by overflow when multiplying
      `+o+" and "+e+`  for depthToSpace with input shape
      `+n.shape}),E(a*e>=0,function(){return`Negative dimension size caused by overflow when multiplying
      `+a+" and "+e+` for depthToSpace with input shape
          `+n.shape}),E(i%(e*e)==0,function(){return"Dimension size must be evenly divisible by "+e*e+" but is "+i+" for depthToSpace with input shape "+n.shape}),T.runKernelFunc(function(s){return s.depthToSpace(n,e,t)},{$x:n})}}),he=D({expandDims_:function(r,e){e===void 0&&(e=0);var t=_(r,"x","expandDims",null);E(e<=t.rank,function(){return"Axis must be <= rank of the tensor"});var n=t.shape.slice();return e<0&&(E(-(t.rank+1)<=e,function(){return"Axis must be in the interval ["+-(t.rank+1)+", "+t.rank+"]"}),e=t.rank+e+1),n.splice(e,0,1),me(t,n)}}),Ks=D({eye_:function(r,e,t,n){n===void 0&&(n="float32"),e==null&&(e=r);for(var o=ot([r,e],n),a=r<=e?r:e,i=0;i<a;++i)o.set(1,i,i);var s=o.toTensor().as2D(r,e);if(t==null)return s;if(t.length===1)return Bn(he(s,0),[t[0],1,1]);if(t.length===2)return Bn(he(he(s,0),0),[t[0],t[1],1,1]);if(t.length===3)return Bn(he(he(he(s,0),0),0),[t[0],t[1],t[2],1,1]);throw new Error("eye() currently supports only 1D and 2D batchShapes, but received "+t.length+"D.")}}),xh=D({multinomial_:function(r,e,t,n){n===void 0&&(n=!1);var o=_(r,"logits","multinomial"),a=o.size,i=o.rank;if(a<2)throw new Error("Error in multinomial: you need at least 2 outcomes, but got "+a+".");if(i>2)throw new Error("Rank of probabilities must be 1 or 2, but is "+i);t=t||Math.random();var s=i===1?o.as2D(1,-1):o,u=T.runKernelFunc(function(c){return c.multinomial(s,n,e,t)},{logits2D:s});return i===1?u.as1D():u}}),fa=D({oneHot_:function(r,e,t,n){if(t===void 0&&(t=1),n===void 0&&(n=0),e<2)throw new Error("Error in oneHot: depth must be >=2, but it is "+e);var o=_(r,"indices","oneHot","int32"),a=o.shape.concat([e]);return o=o.flatten(),T.runKernelFunc(function(i){return i.oneHot(o,e,t,n)},{$indices:o},function(i){return{$indices:function(){return wt(o.shape,"float32")}}}).reshape(a)}}),wn=D({pad_:function(r,e,t){t===void 0&&(t=0);var n=_(r,"x","pad");if(n.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");var o={paddings:e,constantValue:t};return T.runKernelFunc(function(a){return a.pad(n,e,t)},{x:n},function(a){var i=e.map(function(s){return s[0]});return{x:function(){return a.slice(i,n.shape)}}},"PadV2",o)}}),bh=D({pad1d_:function(r,e,t){return t===void 0&&(t=0),E(e.length===2,function(){return"Invalid number of paddings. Must be length of 2."}),wn(r,[e],t)}}),wh=D({pad2d_:function(r,e,t){return t===void 0&&(t=0),E(e.length===2&&e[0].length===2&&e[1].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),wn(r,e,t)}}),Ch=D({pad3d_:function(r,e,t){return t===void 0&&(t=0),E(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),wn(r,e,t)}}),_h=D({pad4d_:function(r,e,t){return t===void 0&&(t=0),E(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,function(){return"Invalid number of paddings. Must be length of 2 each."}),wn(r,e,t)}}),Eh=D({rand_:function(r,e,t){var n=$(r),o=null;if(t==null||t==="float32")o=new Float32Array(n);else if(t==="int32")o=new Int32Array(n);else{if(t!=="bool")throw new Error("Unknown data type "+t);o=new Uint8Array(n)}for(var a=0;a<n;a++)o[a]=e();return T.makeTensor(o,r,t)}}),Rh=D({randomNormal_:function(r,e,t,n,o){if(e===void 0&&(e=0),t===void 0&&(t=1),n!=null&&n==="bool")throw new Error("Unsupported data type "+n);for(var a=new Aa(e,t,n,!1,o),i=ot(r,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),Ih=D({randomGamma_:function(r,e,t,n,o){if(t===void 0&&(t=1),n===void 0&&(n="float32"),t==null&&(t=1),n==null&&(n="float32"),n!=="float32"&&n!=="int32")throw new Error("Unsupported data type "+n);for(var a=new hh(e,t,n,o),i=ot(r,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),Xs=D({randomUniform_:function(r,e,t,n,o){e===void 0&&(e=0),t===void 0&&(t=1),n===void 0&&(n="float32");for(var a=ot(r,n),i=new fh(e,t,null,o),s=0;s<a.values.length;s++)a.values[s]=i.nextValue();return a.toTensor()}}),me=D({reshape_:function(r,e){var t=_(r,"x","reshape",null);e=al(e,t.size),E(t.size===$(e),function(){return"new shape and old shape must have the same number of elements."});var n={shape:e};return T.runKernelFunc(function(o){return o.reshape(t,e)},{x:t},function(o){return{x:function(){return o.reshape(t.shape)}}},"Reshape",n)}}),Ys=D({spaceToBatchND_:function(r,e,t){var n=_(r,"x","spaceToBatchND");return E(n.rank>=1+e.length,function(){return"input rank "+n.rank+" should be > than [blockShape] "+e.length}),E(t.length===e.length,function(){return"paddings.shape[0] "+t.length+" must be equal to [blockShape] "+e.length}),E(n.shape.reduce(function(o,a,i){return i>0&&i<=e.length?o&&(a+t[i-1][0]+t[i-1][1])%e[i-1]==0:o},!0),function(){return"input spatial dimensions "+n.shape.slice(1)+" with paddings "+t.toString()+" must be divisible by blockShapes "+e.toString()}),T.runKernelFunc(function(o){return o.spaceToBatchND(n,e,t)},{$x:n},function(o){return{$x:function(){return o.batchToSpaceND(e,t)}}})}}),$s=D({squeeze_:function(r,e){var t=_(r,"x","squeeze");return me(t,dn(t.shape,e).newShape)}}),ce=D({stack_:function(r,e){e===void 0&&(e=0);var t=Gr(r,"tensors","stack");if(E(t.length>=1,function(){return"Pass at least one tensor to tf.stack"}),t.length===1)return t[0].expandDims(e);var n=t[0].rank,o=t[0].shape,a=t[0].dtype;E(e<=n,function(){return"Axis must be <= rank of the tensor"}),t.forEach(function(s){yt(o,s.shape,"All tensors passed to stack must have matching shapes")}),t.forEach(function(s){E(a===s.dtype,function(){return"All tensors passed to stack must have matching dtypes"})});var i=t.map(function(s){return s.expandDims(e)});return Ft(i,e)}}),Bn=D({tile_:function(r,e){var t=_(r,"x","tile",null);E(t.rank===e.length,function(){return"Error in transpose: rank of input "+t.rank+" must match length of reps "+e+"."});var n=[t],o={reps:e};return T.runKernelFunc(function(a,i){var s=a.tile(t,e);return i([t]),s},{x:t},function(a,i){var s=i[0];return{x:function(){var u=vt(s);if(s.rank===1)for(var c=0;c<e[0];++c)u=u.add(a.slice([c*s.shape[0]],[s.shape[0]]));else if(s.rank===2)for(c=0;c<e[0];++c)for(var l=0;l<e[1];++l)u=u.add(a.slice([c*s.shape[0],l*s.shape[1]],[s.shape[0],s.shape[1]]));else if(s.rank===3)for(c=0;c<e[0];++c)for(l=0;l<e[1];++l)for(var h=0;h<e[2];++h)u=u.add(a.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2]],[s.shape[0],s.shape[1],s.shape[2]]));else{if(s.rank!==4)throw new Error("Gradient for tile operation is not implemented for rank-"+s.rank+" tensors yet.");for(c=0;c<e[0];++c)for(l=0;l<e[1];++l)for(h=0;h<e[2];++h)for(var f=0;f<e[3];++f)u=u.add(a.slice([c*s.shape[0],l*s.shape[1],h*s.shape[2],f*s.shape[3]],[s.shape[0],s.shape[1],s.shape[2],s.shape[3]]))}return u}}},"Tile",o,n)}}),kh=D({truncatedNormal_:function(r,e,t,n,o){if(e===void 0&&(e=0),t===void 0&&(t=1),n!=null&&n==="bool")throw new Error("Unsupported data type "+n);for(var a=new Aa(e,t,n,!0,o),i=ot(r,n),s=0;s<i.values.length;s++)i.values[s]=a.nextValue();return i.toTensor()}}),Pt=D({unstack_:function(r,e){e===void 0&&(e=0),e=e||0;var t=_(r,"x","unstack");E(e>=-t.shape.length&&e<t.shape.length,function(){return"Axis = "+e+" is not in [-"+t.shape.length+", "+t.shape.length+")"}),e<0&&(e+=t.shape.length);var n={axis:e};return T.runKernelFunc(function(o){return o.unstack(t,e)},{x:t},function(o){return{x:function(){return ce(o,e)}}},"Unpack",n)}}),Sh=function(r,e){return X(this,void 0,void 0,function(){var t,n,o,a,i,s,u,c,l,h;return Y(this,function(f){switch(f.label){case 0:return t=_(r,"x","setdiff1d"),n=_(e,"y","setdiff1d"),E(t.dtype===n.dtype,function(){return"x and y should have the same dtype, but got x ("+t.dtype+") and y ("+n.dtype+")."}),E(t.rank===1,function(){return"x should be 1D tensor, but got x ("+t.shape+")."}),E(n.rank===1,function(){return"y should be 1D tensor, but got y ("+n.shape+")."}),[4,t.data()];case 1:return o=f.sent(),[4,n.data()];case 2:for(a=f.sent(),i=new Set(a),s=0,l=0;l<o.length;l++)i.has(o[l])||s++;for(u=new or([s],t.dtype),c=new or([s],"int32"),l=0,h=0;l<o.length;l++)i.has(o[l])||(u.values[h]=o[l],c.values[h]=l,h++);return[2,[u.toTensor(),c.toTensor()]]}})})};function qr(r,e,t,n){n===void 0&&(n=!0);var o=[];if(n)(o=o.concat(e.slice(0))).push(r[0]/t),o=o.concat(r.slice(1));else{o=o.concat(r[0]);for(var a=e.length,i=0;i<a;++i)o=o.concat([r[i+1]/e[i],e[i]]);o=o.concat(r.slice(a+1))}return o}function jr(r,e,t){t===void 0&&(t=!0);var n=[];if(t){n.push(e);for(var o=e+1;o<r;++o)o<=2*e?(n.push(o),n.push(o-(e+1))):n.push(o)}else{var a=[],i=[];for(o=1;o<r;++o)o>=2*e+1||o%2==1?i.push(o):a.push(o);n.push.apply(n,a),n.push(0),n.push.apply(n,i)}return n}function Kr(r,e,t,n){n===void 0&&(n=!0);var o=[];n?o.push(r[0]/t):o.push(r[0]*t);for(var a=1;a<r.length;++a)a<=e.length?n?o.push(e[a-1]*r[a]):o.push(r[a]/e[a-1]):o.push(r[a]);return o}function Js(r,e){for(var t=[0],n=0;n<e;++n)t.push(r[n][0]);return t}function Qs(r,e,t){for(var n=r.slice(0,1),o=0;o<t;++o)n.push(r[o+1]-e[o][0]-e[o][1]);return n}function Zs(r,e){if(r.rank<1)throw new Error("tf.gatherND() expects the input to be rank 1 or higher, but the rank was "+r.rank+".");if(e.rank<1)throw new Error("tf.gatherND() expects the indices to be rank 1 or higher, but the rank was "+e.rank+".");if(e.dtype!=="int32")throw new Error("tf.gatherND() expects the indices to be int32 type, but the dtype was "+e.dtype+".");if(e.shape[e.rank-1]>r.rank)throw new Error("index innermost dimension length must be <= tensor rank; saw: "+e.shape[e.rank-1]+" vs. "+r.rank);if(r.size===0)throw new Error("Requested more than 0 entries, but input is empty. Input shape: "+r.shape+".");for(var t=e.shape,n=t[t.length-1],o=1,a=0;a<t.length-1;++a)o*=t[a];var i=r.shape,s=t.slice();s.pop();var u=1;for(a=n;a<r.rank;++a)u*=i[a],s.push(i[a]);var c=Ae(r.shape).map(function(l){return l/u}).concat([1]).slice(0,n);return[s,o,u,c]}var tu=30;function Lo(r){return r<=tu?r:ia(r,Math.floor(Math.sqrt(r)))}function Dh(r,e,t){var n=e.rank>1?e.shape[e.rank-1]:1,o=e.rank>1?e.rank-1:1,a="Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: "+t.shape+", indices.shape: "+e.shape+", shape: "+r+", sliceDim: "+n+", and batchDim: "+o+".";if(t.rank<o)throw new Error(a+" update.rank < "+o+". ");if(r.length<n+(t.rank-o))throw new Error(a+" Output shape length < "+(n+(t.rank-o)));if(t.rank!==o+r.length-n)throw new Error(a+" update.rank != "+(o+r.length-n));for(var i=0;i<o;++i)if(t.shape[i]!==e.shape[i])throw new Error(a+" updates.shape["+i+"] ("+t.shape[i]+") != indices.shape["+i+"] ("+e.shape[i]+").");for(i=0;i<t.rank-o;++i)if(t.shape[i+o]!==r[i+n])throw new Error(a+" updates.shape["+(i+o)+"] ("+t.shape[i+o]+") != shape["+(i+o)+"] ("+r[i+o]+")")}function Ah(r,e,t){if(e.rank<1)throw new Error("tf.scatterND() expects the indices to be rank 1 or higher, but the rank was "+e.rank+".");if(r.rank<1)throw new Error("tf.scatterND() expects the updates to be rank 1 or higher, but the rank was "+r.rank+".");if(e.dtype!=="int32")throw new Error("The dtype of 'indices' should be int32, but got dtype: "+e.dtype);if(t.length<1)throw new Error("Output rank must be greater or equal to 1, but got shape: "+t);if(t.length===0){if(e.size===0)throw new Error("Indices specified for empty output. indices shape: "+e.shape);if(r.size===0)throw new Error("Updates specified for empty output. updates shape: "+r.shape)}Dh(t,e,r)}function Xr(r,e,t){for(var n=e.shape.length,o=n>1?e.shape[n-1]:1,a=t.length,i=1,s=o;s<a;++s)i*=t[s];var u=o<1?1:o;return{sliceRank:o,numUpdates:$(e.shape)/u,sliceSize:i,strides:Ae(t.slice(0,o)).concat([1]),outputSize:$(t)}}function Th(r,e,t){E(r.rank===e.length,function(){return"Error in slice"+r.rank+"D: Length of begin "+e+" must match the rank of the array ("+r.rank+")."}),E(r.rank===t.length,function(){return"Error in slice"+r.rank+"D: Length of size "+t+" must match the rank of the array ("+r.rank+")."});for(var n=function(a){E(e[a]+t[a]<=r.shape[a],function(){return"Error in slice"+r.rank+"D: begin["+a+"] + size["+a+"] ("+(e[a]+t[a])+") would overflow input.shape["+a+"] ("+r.shape[a]+")"})},o=0;o<r.rank;++o)n(o)}function Wi(r){for(var e=[],t=0;r>0;)1&r&&e.push(t),r/=2,t++;return e}function Ta(r,e,t){for(var n=[],o=0;o<r.length;o++)n[o]=Math.ceil((e[o]-r[o])/t[o]);return n}function Nh(r,e,t,n,o){var a=e[o],i=t[o]||1;(r&1<<o||a==null)&&(a=i>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);var s=n[o];return a<0&&(a+=s),a=ra(0,a,s-1)}function Fh(r,e,t,n,o){var a=e[o],i=t[o]||1;(r&1<<o||a==null)&&(a=i>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);var s=n[o];return a<0&&(a+=s),a=i>0?ra(0,a,s):ra(-1,a,s-1)}function eu(r,e,t){for(var n=t.length,o=0;o<t.length;o++)if(t[o]>1){n=o;break}for(o=n+1;o<t.length;o++)if(e[o]>0||t[o]!==r[o])return!1;return!0}function nu(r,e){for(var t=r.length>0?r[r.length-1]:1,n=0;n<r.length-1;n++)t+=r[n]*e[n];return t}function Ph(r,e){E(aa(r),function(){return"The f passed in variableGrads(f) must be a function"}),E(e==null||Array.isArray(e)&&e.every(function(l){return l instanceof qn}),function(){return"The varList passed in variableGrads(f, varList) must be an array of variables"});var t=e!=null;if(!t)for(var n in e=[],T.registeredVariables)e.push(T.registeredVariables[n]);var o=t?e.filter(function(l){return!l.trainable}):null,a=e.length;E((e=e.filter(function(l){return l.trainable})).length>0,function(){return"variableGrads() expects at least one of the input variables to be trainable, but none of the "+a+" variables is trainable."});var i=T.gradients(r,e,null,!0),s=i.value,u=i.grads;E(u.some(function(l){return l!=null}),function(){return"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."}),E(s.rank===0,function(){return"The f passed in variableGrads(f) must return a scalar, but it returned a rank-"+s.rank+" tensor"});var c={};return e.forEach(function(l,h){u[h]!=null&&(c[l.name]=u[h])}),o!=null&&o.forEach(function(l){return c[l.name]=null}),{value:s,grads:c}}function uo(r){return T.customGrad(r)}var qe=D({softmax_:function(r,e){e===void 0&&(e=-1);var t=_(r,"logits","softmax","float32");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank "+t.rank+" and dim was "+e);return T.runKernelFunc(function(n,o){var a=n.softmax(t,e);return o([a]),a},{logits:t},function(n,o){var a=o[0],i=n.mul(a);return{logits:function(){return i.sub(i.sum([e],!0).mul(a))}}},"Softmax",{dim:e},[],[!0])}}),Mh=D({logSoftmax_:function(r,e){e===void 0&&(e=-1);var t=_(r,"logits","logSoftmax");if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error("Log Softmax along a non-last dimension is not yet supported. Logits was rank "+t.rank+" and axis was "+e);return uo(function(n,o){var a=n.max(e,!0),i=n.sub(a),s=i.toFloat().sub(i.exp().sum(e,!0).log());return o([s]),{value:s,gradFunc:function(u,c){var l=c[0].exp();return u.sub(u.sum(e,!0).mul(l))}}})(t)}}),ru=function(){function r(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}return r.prototype.get=function(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)},r.prototype.set=function(e,t){this.dataIdsCount++,this.data.set(e,t)},r.prototype.has=function(e){return this.data.has(e)},r.prototype.delete=function(e){return this.dataIdsCount--,this.data.delete(e)},r.prototype.numDataIds=function(){return this.dataIdsCount},r}(),ou=function(){function r(){}return r.prototype.time=function(e){return F("time")},r.prototype.read=function(e){return F("read")},r.prototype.readSync=function(e){return F("readSync")},r.prototype.numDataIds=function(){return F("numDataIds")},r.prototype.disposeData=function(e){return F("disposeData")},r.prototype.write=function(e,t,n){return F("write")},r.prototype.move=function(e,t,n,o){return F("move")},r.prototype.memory=function(){return F("memory")},r.prototype.floatPrecision=function(){return F("floatPrecision")},r.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},r.prototype.batchMatMul=function(e,t,n,o){return F("batchMatMul")},r.prototype.fusedBatchMatMul=function(e){return e.a,e.b,e.transposeA,e.transposeB,e.bias,e.activation,e.preluActivationWeights,F("fusedBatchMatMul")},r.prototype.slice=function(e,t,n){return F("slice")},r.prototype.stridedSlice=function(e,t,n,o){return F("stridedSlice")},r.prototype.unstack=function(e,t){return F("unstack")},r.prototype.reverse=function(e,t){return F("reverse")},r.prototype.concat=function(e,t){return F("concat")},r.prototype.neg=function(e){return F("neg")},r.prototype.add=function(e,t){return F("add")},r.prototype.addN=function(e){return F("addN")},r.prototype.subtract=function(e,t){return F("subtract")},r.prototype.multiply=function(e,t){return F("multiply")},r.prototype.realDivide=function(e,t){return F("realDivide")},r.prototype.floorDiv=function(e,t){return F("floorDiv")},r.prototype.sum=function(e,t){return F("sum")},r.prototype.prod=function(e,t){return F("prod")},r.prototype.unsortedSegmentSum=function(e,t,n){return F("unsortedSegmentSum")},r.prototype.argMin=function(e,t){return F("argMin")},r.prototype.argMax=function(e,t){return F("argMax")},r.prototype.equal=function(e,t){return F("equal")},r.prototype.notEqual=function(e,t){return F("notEqual")},r.prototype.less=function(e,t){return F("less")},r.prototype.lessEqual=function(e,t){return F("lessEqual")},r.prototype.greater=function(e,t){return F("greater")},r.prototype.greaterEqual=function(e,t){return F("greaterEqual")},r.prototype.logicalNot=function(e){return F("logicalNot")},r.prototype.logicalAnd=function(e,t){return F("logicalAnd")},r.prototype.logicalOr=function(e,t){return F("logicalOr")},r.prototype.where=function(e){return F("where")},r.prototype.select=function(e,t,n){return F("select")},r.prototype.topk=function(e,t,n){return F("topk")},r.prototype.min=function(e,t){return F("min")},r.prototype.minimum=function(e,t){return F("minimum")},r.prototype.mod=function(e,t){return F("mod")},r.prototype.max=function(e,t){return F("max")},r.prototype.maximum=function(e,t){return F("maximum")},r.prototype.all=function(e,t){return F("all")},r.prototype.any=function(e,t){return F("any")},r.prototype.squaredDifference=function(e,t){return F("squaredDifference")},r.prototype.ceil=function(e){return F("ceil")},r.prototype.floor=function(e){return F("floor")},r.prototype.round=function(e){return F("round")},r.prototype.sign=function(e){return F("sign")},r.prototype.isNaN=function(e){return F("isNaN")},r.prototype.isInf=function(e){return F("isInf")},r.prototype.isFinite=function(e){return F("isFinite")},r.prototype.pow=function(e,t){return F("pow")},r.prototype.exp=function(e){return F("exp")},r.prototype.expm1=function(e){return F("expm1")},r.prototype.softmax=function(e,t){return F("softmax")},r.prototype.log=function(e){return F("log")},r.prototype.log1p=function(e){return F("log1p")},r.prototype.sqrt=function(e){return F("sqrt")},r.prototype.rsqrt=function(e){return F("rsqrt")},r.prototype.square=function(e){return F("square")},r.prototype.reciprocal=function(e){return F("reciprocal")},r.prototype.relu=function(e){return F("relu")},r.prototype.relu6=function(e){return F("relu6")},r.prototype.prelu=function(e,t){return F("prelu")},r.prototype.elu=function(e){return F("elu")},r.prototype.eluDer=function(e,t){return F("eluDer")},r.prototype.selu=function(e){return F("selu")},r.prototype.int=function(e){return F("int")},r.prototype.clip=function(e,t,n){return F("clip")},r.prototype.abs=function(e){return F("abs")},r.prototype.complexAbs=function(e){return F("complexAbs")},r.prototype.sigmoid=function(e){return F("sigmoid")},r.prototype.softplus=function(e){return F("softplus")},r.prototype.sin=function(e){return F("sin")},r.prototype.cos=function(e){return F("cos")},r.prototype.tan=function(e){return F("tan")},r.prototype.asin=function(e){return F("asin")},r.prototype.acos=function(e){return F("acos")},r.prototype.atan=function(e){return F("atan")},r.prototype.atan2=function(e,t){return F("atan2")},r.prototype.sinh=function(e){return F("sinh")},r.prototype.cosh=function(e){return F("cosh")},r.prototype.tanh=function(e){return F("tanh")},r.prototype.asinh=function(e){return F("asinh")},r.prototype.acosh=function(e){return F("acosh")},r.prototype.atanh=function(e){return F("atanh")},r.prototype.erf=function(e){return F("erf")},r.prototype.step=function(e,t){return F("step")},r.prototype.fusedConv2d=function(e){return e.input,e.filter,e.convInfo,e.bias,e.activation,e.preluActivationWeights,F("fusedConv2d")},r.prototype.conv2d=function(e,t,n){return F("conv2d")},r.prototype.conv2dDerInput=function(e,t,n){return F("conv2dDerInput")},r.prototype.conv2dDerFilter=function(e,t,n){return F("conv2dDerFilter")},r.prototype.fusedDepthwiseConv2D=function(e){return e.input,e.filter,e.convInfo,e.bias,e.activation,e.preluActivationWeights,F("fusedDepthwiseConv2D")},r.prototype.depthwiseConv2D=function(e,t,n){return F("depthwiseConv2D")},r.prototype.depthwiseConv2DDerInput=function(e,t,n){return F("depthwiseConv2DDerInput")},r.prototype.depthwiseConv2DDerFilter=function(e,t,n){return F("depthwiseConv2DDerFilter")},r.prototype.conv3d=function(e,t,n){return F("conv3d")},r.prototype.conv3dDerInput=function(e,t,n){return F("conv3dDerInput")},r.prototype.conv3dDerFilter=function(e,t,n){return F("conv3dDerFilter")},r.prototype.maxPool=function(e,t){return F("maxPool")},r.prototype.maxPoolBackprop=function(e,t,n,o){return F("maxPoolBackprop")},r.prototype.avgPool=function(e,t){return F("avgPool")},r.prototype.avgPoolBackprop=function(e,t,n){return F("avgPoolBackprop")},r.prototype.avgPool3d=function(e,t){return F("avgPool3d")},r.prototype.avgPool3dBackprop=function(e,t,n){return F("avgPool3dBackprop")},r.prototype.maxPool3d=function(e,t){return F("maxPool3d")},r.prototype.maxPool3dBackprop=function(e,t,n,o){return F("maxPool3dBackprop")},r.prototype.reshape=function(e,t){return F("reshape")},r.prototype.cast=function(e,t){return F("cast")},r.prototype.tile=function(e,t){return F("tile")},r.prototype.pad=function(e,t,n){return F("pad")},r.prototype.transpose=function(e,t){return F("transpose")},r.prototype.gather=function(e,t,n){return F("gather")},r.prototype.gatherND=function(e,t){return F("gatherND")},r.prototype.scatterND=function(e,t,n){return F("scatterND")},r.prototype.batchToSpaceND=function(e,t,n){return F("batchToSpaceND")},r.prototype.spaceToBatchND=function(e,t,n){return F("spaceToBatchND")},r.prototype.resizeBilinear=function(e,t,n,o){return F("resizeBilinear")},r.prototype.resizeBilinearBackprop=function(e,t,n){return F("resizeBilinearBackprop")},r.prototype.resizeNearestNeighbor=function(e,t,n,o){return F("resizeNearestNeighbor")},r.prototype.resizeNearestNeighborBackprop=function(e,t,n){return F("resizeNearestNeighborBackprop")},r.prototype.batchNormalization=function(e,t,n,o,a,i){return F("batchNormalization")},r.prototype.localResponseNormalization4D=function(e,t,n,o,a){return F("localResponseNormalization4D")},r.prototype.LRNGrad=function(e,t,n,o,a,i,s){return F("LRNGrad")},r.prototype.multinomial=function(e,t,n,o){return F("multinomial")},r.prototype.oneHot=function(e,t,n,o){return F("oneHot")},r.prototype.cumsum=function(e,t,n,o){return F("cumsum")},r.prototype.nonMaxSuppression=function(e,t,n,o,a){return F("nonMaxSuppression")},r.prototype.fft=function(e){return F("fft")},r.prototype.ifft=function(e){return F("ifft")},r.prototype.complex=function(e,t){return F("complex")},r.prototype.real=function(e){return F("real")},r.prototype.imag=function(e){return F("imag")},r.prototype.cropAndResize=function(e,t,n,o,a,i){return F("cropAndResize")},r.prototype.depthToSpace=function(e,t,n){return F("depthToSpace")},r.prototype.split=function(e,t,n){return F("split")},r.prototype.sparseToDense=function(e,t,n,o){return F("sparseToDense")},r.prototype.diag=function(e){return F("diag")},r.prototype.fill=function(e,t,n){return F("fill")},r.prototype.onesLike=function(e){return F("onesLike")},r.prototype.zerosLike=function(e){return F("zerosLike")},r.prototype.linspace=function(e,t,n){return F("linspace")},r.prototype.dispose=function(){return F("dispose")},r}();function F(r){throw new Error("'"+r+"' not yet implemented or not found in the registry. Did you forget to import the kernel?")}function Ze(r,e){for(var t=r.length,n=[],o=0;o<t;o++){var a=t-1-o,i=r[a]||1;(e[e.length-1-o]||1)>1&&i===1&&n.unshift(a)}return n}function Mt(r,e){for(var t=[],n=0;n<e.length;n++){var o=r[r.length-n-1],a=e.length-n-1,i=e[a];(o==null||o===1&&i>1)&&t.unshift(a)}return t}function lt(r,e){for(var t=[],n=Math.max(r.length,e.length),o=0;o<n;o++){var a=r[r.length-o-1];a==null&&(a=1);var i=e[e.length-o-1];if(i==null&&(i=1),a===1)t.unshift(i);else if(i===1)t.unshift(a);else{if(a!==i)throw Error("Operands could not be broadcast together with shapes "+r+" and "+e+".");t.unshift(a)}}return t}function ir(r,e,t,n,o,a,i){i===void 0&&(i="channelsLast");var s,u=Jr(e),c=u[0],l=u[1];if(i==="channelsLast")s=[c,l,r[3],r[3]];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);s=[c,l,r[1],r[1]]}return Cn(r,s,t,n,o,a,!1,i)}function Yr(r,e,t,n,o,a,i){i===void 0&&(i="NDHWC");var s,u,c=pa(e),l=c[0],h=c[1],f=c[2];if(i==="NDHWC")u="channelsLast",s=[l,h,f,r[4],r[4]];else{if(i!=="NCDHW")throw new Error("Unknown dataFormat "+i);u="channelsFirst",s=[l,h,f,r[1],r[1]]}return $r(r,s,t,n,o,!1,u,a)}function Cn(r,e,t,n,o,a,i,s){i===void 0&&(i=!1),s===void 0&&(s="channelsLast");var u=[-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],f=u[3];if(s==="channelsLast")c=r[0],l=r[1],h=r[2],f=r[3];else{if(s!=="channelsFirst")throw new Error("Unknown dataFormat "+s);c=r[0],f=r[1],l=r[2],h=r[3]}var p,d=e[0],m=e[1],v=e[3],g=Jr(t),x=g[0],b=g[1],y=Jr(n),w=y[0],C=y[1],k=Ln(d,w),S=Ln(m,C),R=function(O,B,z,U,W,G,H,j){var tt,et,it;if(typeof O=="number"){tt={top:O,bottom:O,left:O,right:O,type:O===0?"VALID":"NUMBER"};var st=function(ft,xt,mt,kt,Ct){kt==null&&(kt=au(ft,xt,mt));var _t=ft[0],be=ft[1],we=er((_t-xt+2*kt)/mt+1,Ct);E(Dt(we),function(){return"The output # of rows ("+we+") must be an integer. Change the stride and/or zero pad parameters"});var ne=er((be-xt+2*kt)/mt+1,Ct);return E(Dt(ne),function(){return"The output # of columns ("+ne+") must be an integer. Change the stride and/or zero pad parameters"}),[we,ne]}([B,z],G,U,O,j);et=st[0],it=st[1]}else if(O==="same"){et=Math.ceil(B/U),it=Math.ceil(z/W);var ct=Math.max(0,(et-1)*U+G-B),pt=Math.max(0,(it-1)*W+H-z),ht=Math.floor(ct/2),dt=ct-ht,At=Math.floor(pt/2);tt={top:ht,bottom:dt,left:At,right:pt-At,type:"SAME"}}else{if(O!=="valid")throw Error("Unknown padding parameter: "+O);tt={top:0,bottom:0,left:0,right:0,type:"VALID"},et=Math.ceil((B-G+1)/U),it=Math.ceil((z-H+1)/W)}return{padInfo:tt,outHeight:et,outWidth:it}}(o,l,h,x,b,k,S,a),I=R.padInfo,N=R.outHeight,A=R.outWidth,L=i?v*f:v;return s==="channelsFirst"?p=[c,L,N,A]:s==="channelsLast"&&(p=[c,N,A,L]),{batchSize:c,dataFormat:s,inHeight:l,inWidth:h,inChannels:f,outHeight:N,outWidth:A,outChannels:L,padInfo:I,strideHeight:x,strideWidth:b,filterHeight:d,filterWidth:m,effectiveFilterHeight:k,effectiveFilterWidth:S,dilationHeight:w,dilationWidth:C,inShape:r,outShape:p,filterShape:e}}function $r(r,e,t,n,o,a,i,s){a===void 0&&(a=!1),i===void 0&&(i="channelsLast");var u=[-1,-1,-1,-1,-1],c=u[0],l=u[1],h=u[2],f=u[3],p=u[4];if(i==="channelsLast")c=r[0],l=r[1],h=r[2],f=r[3],p=r[4];else{if(i!=="channelsFirst")throw new Error("Unknown dataFormat "+i);c=r[0],p=r[1],l=r[2],h=r[3],f=r[4]}var d,m=e[0],v=e[1],g=e[2],x=e[4],b=pa(t),y=b[0],w=b[1],C=b[2],k=pa(n),S=k[0],R=k[1],I=k[2],N=Ln(m,S),A=Ln(v,R),L=Ln(g,I),O=function(H,j,tt,et,it,st,ct,pt,ht,dt,At){var ft,xt,mt,kt;if(typeof H=="number"){ft={top:H,bottom:H,left:H,right:H,front:H,back:H,type:H===0?"VALID":"NUMBER"};var Ct=function(In,We,Eo,kn,Ce,Ro){Ce==null&&(Ce=au(In,We,kn));var Yc=In[0],$c=In[1],Jc=In[2],Io=er((Yc-We+2*Ce)/kn+1,Ro);E(Dt(Io),function(){return"The output # of depths ("+Io+") must be an integer. Change the stride and/or zero pad parameters"});var ko=er(($c-We+2*Ce)/kn+1,Ro);E(Dt(ko),function(){return"The output # of rows ("+ko+") must be an integer. Change the stride and/or zero pad parameters"});var So=er((Jc-We+2*Ce)/kn+1,Ro);return E(Dt(So),function(){return"The output # of columns ("+So+") must be an integer. Change the stride and/or zero pad parameters"}),[Io,ko,So,Eo]}([j,tt,et,1],pt,1,it,H,At);xt=Ct[0],mt=Ct[1],kt=Ct[2]}else if(H==="same"){xt=Math.ceil(j/it),mt=Math.ceil(tt/st),kt=Math.ceil(et/ct);var _t=(xt-1)*it+pt-j,be=(mt-1)*st+ht-tt,we=(kt-1)*ct+dt-et,ne=Math.floor(_t/2),Rn=_t-ne,Be=Math.floor(be/2),$e=be-Be,Le=Math.floor(we/2);ft={top:Be,bottom:$e,left:Le,right:we-Le,front:ne,back:Rn,type:"SAME"}}else{if(H!=="valid")throw Error("Unknown padding parameter: "+H);ft={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},xt=Math.ceil((j-pt+1)/it),mt=Math.ceil((tt-ht+1)/st),kt=Math.ceil((et-dt+1)/ct)}return{padInfo:ft,outDepth:xt,outHeight:mt,outWidth:kt}}(o,l,h,f,y,w,C,N,A,L,s),B=O.padInfo,z=O.outDepth,U=O.outHeight,W=O.outWidth,G=a?x*p:x;return i==="channelsFirst"?d=[c,G,z,U,W]:i==="channelsLast"&&(d=[c,z,U,W,G]),{batchSize:c,dataFormat:i,inDepth:l,inHeight:h,inWidth:f,inChannels:p,outDepth:z,outHeight:U,outWidth:W,outChannels:G,padInfo:B,strideDepth:y,strideHeight:w,strideWidth:C,filterDepth:m,filterHeight:v,filterWidth:g,effectiveFilterDepth:N,effectiveFilterHeight:A,effectiveFilterWidth:L,dilationDepth:S,dilationHeight:R,dilationWidth:I,inShape:r,outShape:d,filterShape:e}}function au(r,e,t,n){n===void 0&&(n=1);var o=Ln(e,n);return Math.floor((r[0]*(t-1)-t+o)/2)}function Jr(r){return typeof r=="number"?[r,r,r]:r.length===2?[r[0],r[1],1]:r}function pa(r){return typeof r=="number"?[r,r,r]:r}function Ln(r,e){return e<=1?r:r+(r-1)*(e-1)}function er(r,e){if(!e)return r;switch(e){case"round":return Math.round(r);case"ceil":return Math.ceil(r);case"floor":return Math.floor(r);default:throw new Error("Unknown roundingMode "+e)}}function Kn(r){var e=Jr(r),t=e[0],n=e[1],o=e[2];return t===1&&n===1&&o===1}function ee(r,e){return Kn(r)||Kn(e)}function Na(r){if(r==="NHWC")return"channelsLast";if(r==="NCHW")return"channelsFirst";throw new Error("Unknown dataFormat "+r)}function iu(r,e,t){if(e==="complex64"){if(r.dtype==="complex64")return r.clone();var n=wt(r.shape),o=r.toFloat(),a=t.complex(o,n);return n.dispose(),o.dispose(),a}if(!ul(r.dtype,e))return T.makeTensorFromDataId(r.dataId,r.shape,e);if(r.dtype==="complex64"){var i=t.real(r);return a=i.cast(e),i.dispose(),a}if(e==="int32")return t.int(r);if(e==="bool"){var s=q(0,r.dtype);return a=t.notEqual(r,s),s.dispose(),a}throw new Error("Error in Cast: failed to cast "+r.dtype+" to "+e)}function da(r,e){return T.makeTensorFromDataId(r.dataId,e,r.dtype)}function su(r,e,t){var n=(e-r)/(t-1),o=pr(t,"float32");o[0]=r;for(var a=1;a<o.length;a++)o[a]=o[a-1]+n;return Tt(o,"float32")}function va(r,e){if(r.length!==e.length)throw new Error("Cannot merge real and imag arrays of different lengths. real:"+r.length+", imag: "+e.length+".");for(var t=new Float32Array(2*r.length),n=0;n<t.length;n+=2)t[n]=r[n/2],t[n+1]=e[n/2];return t}function Ui(r,e){return{real:r[2*e],imag:r[2*e+1]}}function Oh(r,e,t,n){r[2*n]=e,r[2*n+1]=t}function Bh(r,e,t){var n=(t?2:-2)*Math.PI*(r/e);return{real:Math.cos(n),imag:Math.sin(n)}}function Lh(r,e,t){var n=function(a,i,s){return function(u,c,l){for(var h=0,f=u.length,p=0,d=!1;h<f;){var m=l(c,u[p=h+(f-h>>>1)]);m>0?h=p+1:(f=p,d=!m)}return d?h:-h-1}(a,i,s||Wh)}(r,e,t),o=n<0?-(n+1):n;r.splice(o,0,e)}function Wh(r,e){return r>e?1:r<e?-1:0}function Fa(r,e,t,n,o){return uu(r,e,t,n,o,0).selectedIndices}function Pa(r,e,t,n,o,a){var i=uu(r,e,t,n,o,a);return i.numValidOutputs.dispose(),{selectedIndices:i.selectedIndices,selectedScores:i.selectedScores}}function uu(r,e,t,n,o,a,i,s){s===void 0&&(s=!1);for(var u=Array.from(e).map(function(y,w){return{score:y,boxIndex:w,suppressBeginIndex:0}}).filter(function(y){return y.score>o}).sort(zi),c=a>0?-.5/a:0,l=[],h=[];l.length<t&&u.length>0;){var f=u.pop(),p=f.score,d=f.boxIndex,m=f.suppressBeginIndex;if(p<o)break;for(var v=!1,g=l.length-1;g>=m;--g){var x=Uh(r,d,l[g]);if(x>=n){v=!0;break}if(f.score=f.score*zh(n,c,x),f.score<=o)break}f.suppressBeginIndex=l.length,v||(f.score===p?(l.push(d),h.push(f.score)):f.score>o&&Lh(u,f,zi))}var b=l.length;return s&&(l.fill(0,b),h.fill(0,b)),{selectedIndices:Tt(l,"int32"),selectedScores:Tt(h,"float32"),numValidOutputs:q(b,"int32")}}function Uh(r,e,t){var n=r.subarray(4*e,4*e+4),o=r.subarray(4*t,4*t+4),a=Math.min(n[0],n[2]),i=Math.min(n[1],n[3]),s=Math.max(n[0],n[2]),u=Math.max(n[1],n[3]),c=Math.min(o[0],o[2]),l=Math.min(o[1],o[3]),h=Math.max(o[0],o[2]),f=Math.max(o[1],o[3]),p=(s-a)*(u-i),d=(h-c)*(f-l);if(p<=0||d<=0)return 0;var m=Math.max(a,c),v=Math.max(i,l),g=Math.min(s,h),x=Math.min(u,f),b=Math.max(g-m,0)*Math.max(x-v,0);return b/(p+d-b)}function zh(r,e,t){var n=Math.exp(e*t*t);return t<=r?n:0}function zi(r,e){return r.score-e.score||r.score===e.score&&e.boxIndex-r.boxIndex}function cu(r,e,t){var n=new Array(r.rank).fill(0),o=r.shape.slice();return e.map(function(a){o[t]=a;var i=r.slice(n,o);return n[t]+=a,i})}function lu(r,e){for(var t=new Array(r.rank),n=0;n<t.length;n++)t[n]=r.shape[n]*e[n];var o=ot(t,r.dtype);for(n=0;n<o.values.length;++n){for(var a=o.indexToLoc(n),i=new Array(r.rank),s=0;s<i.length;s++)i[s]=a[s]%r.shape[s];var u=r.locToIndex(i);o.values[n]=r.values[u]}return o.toTensor()}function hu(r,e,t,n,o){for(var a=e[e.length-1],i=[r.length/a,a],s=i[0],u=i[1],c=rr(t,s*n),l=rr("int32",s*n),h=0;h<s;h++){for(var f=h*u,p=r.subarray(f,f+u),d=[],m=0;m<p.length;m++)d.push({value:p[m],index:m});d.sort(function(y,w){return w.value-y.value});var v=h*n,g=c.subarray(v,v+n),x=l.subarray(v,v+n);for(m=0;m<n;m++)g[m]=d[m].value,x[m]=d[m].index}var b=e.slice();return b[b.length-1]=n,[Gt(c,b,t),Gt(l,b,"int32")]}function Ma(r,e){for(var t=[],n=0;n<e.length;n++)e[n]&&t.push(n);var o=ot(r,"int32"),a=ot([t.length,r.length],"int32");for(n=0;n<t.length;n++){var i=o.indexToLoc(t[n]),s=n*r.length;a.values.set(i,s)}return a.toTensor()}var Vh=function(r,e){this.outputShape=[],this.outputShape=r,this.variableNames=e.map(function(o,a){return"T"+a});var t=[];this.variableNames.forEach(function(o){t.push("float v"+o+" = get"+o+"AtOutCoords();")});var n=this.variableNames.map(function(o){return"v"+o}).join(" + ");this.userCode=`
      void main() {
        `+t.join(`
        `)+`

        float result = `+n+`;
        setOutput(result);
      }
    `},Gh=function(r,e){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.variableNames=e.map(function(o,a){return"T"+a});var t=[];this.variableNames.forEach(function(o){t.push("vec4 v"+o+" = get"+o+"AtOutCoords();")});var n=this.variableNames.map(function(o){return"v"+o}).join(" + ");this.userCode=`
      void main() {
        `+t.join(`
        `)+`

        vec4 result = `+n+`;
        setOutput(result);
      }
    `},Hh=function(r,e,t){this.variableNames=["A"];var n=r.windowSize,o=r.batchSize,a=r.inSize,i=Math.ceil(a/n);t||this.variableNames.push("bestIndicesA"),this.outputShape=[o,i];var s=e==="max"?">":"<",u=t?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+n+`;

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < `+n+`; i++) {
          int inIdx = `+u+`;
          float candidate = getA(batch, inIdx);
          if (candidate `+s+` bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `};function fu(r,e){return["x","y","z","w","u","v"].slice(0,e).map(function(t){return r+"."+t})}function Qt(r,e){return e===1?[r]:fu(r,e)}function jt(){var r,e,t,n,o,a,i,s,u,c;return M().getNumber("WEBGL_VERSION")===2?(r="#version 300 es",e="in",t="out",n="in",o="texture",a="outputColor",i="out vec4 outputColor;",s=`
      bool isnan_custom(float val) {
        return (val > 0.0 || val < 0.0) ? false : val != 0.0;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `,u="",c=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(r="",e="attribute",t="varying",n="varying",o="texture2D",a="gl_FragColor",i="",s=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,u=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,c=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:r,attribute:e,varyingVs:t,varyingFs:n,texture2D:o,output:a,defineOutput:i,defineSpecialNaN:s,defineSpecialInf:u,defineRound:c}}function vn(r,e,t){t===void 0&&(t="index");var n=Ae(e);return n.map(function(o,a){return"int "+r[a]+" = "+t+" / "+o+"; "+(a===n.length-1?"int "+r[a+1]+" = "+t+" - "+r[a]+" * "+o:"index -= "+r[a]+" * "+o)+";"}).join("")}function Oa(r){var e=Ae(r).map(function(t){return t.toString()});return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * `+e[0]+" + coords.y * "+e[1]+` + coords.z;
  }
`}var pu=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;function qh(r,e,t,n){var o=[];r.forEach(function(p){var d=$(p.shapeInfo.logicalShape);p.shapeInfo.isUniform?o.push("uniform float "+p.name+(d>1?"["+d+"]":"")+";"):(o.push("uniform sampler2D "+p.name+";"),o.push("uniform int offset"+p.name+";"))});var a,i,s=o.join(`
`),u=r.map(function(p){return function(d,m,v){v===void 0&&(v=!1);var g="";g+=v?du(d):Nn(d);var x=d.shapeInfo.logicalShape,b=m.logicalShape;return x.length<=b.length&&(g+=v?function(y,w){var C,k=y.name,S=k.charAt(0).toUpperCase()+k.slice(1),R="get"+S+"AtOutCoords",I=y.shapeInfo.logicalShape.length,N=w.logicalShape.length,A=Ze(y.shapeInfo.logicalShape,w.logicalShape),L=bt(N),O=N-I,B=["x","y","z","w","u","v"];C=I===0?"":N<2&&A.length>=1?"coords = 0;":A.map(function(tt){return"coords."+B[tt+O]+" = 0;"}).join(`
`);var z="";z=N<2&&I>0?"coords":y.shapeInfo.logicalShape.map(function(tt,et){return"coords."+B[et+O]}).join(", ");var U="return outputValue;",W=$(y.shapeInfo.logicalShape)===1,G=$(w.logicalShape)===1;if(I!==1||W||G){if(W&&!G)U=N===1?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(A.length){var H=I-2,j=I-1;A.indexOf(H)>-1&&A.indexOf(j)>-1?U="return vec4(outputValue.x);":A.indexOf(H)>-1?U="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":A.indexOf(j)>-1&&(U="return vec4(outputValue.xx, outputValue.zz);")}}else U=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 `+R+`() {
      `+L+` coords = getOutputCoords();
      `+C+`
      vec4 outputValue = get`+S+"("+z+`);
      `+U+`
    }
  `}(d,m):function(y,w){var C=y.name,k=C.charAt(0).toUpperCase()+C.slice(1),S="get"+k+"AtOutCoords",R=w.texShape,I=y.shapeInfo.texShape,N=y.shapeInfo.logicalShape.length,A=w.logicalShape.length;if(!y.shapeInfo.isUniform&&N===A&&y.shapeInfo.flatOffset==null&&Wt(I,R))return`
      float `+S+`() {
        return sampleTexture(`+C+`, resultUV);
      }
    `;var L,O=bt(A),B=Ze(y.shapeInfo.logicalShape,w.logicalShape),z=A-N,U=["x","y","z","w","u","v"];L=N===0?"":A<2&&B.length>=1?"coords = 0;":B.map(function(G){return"coords."+U[G+z]+" = 0;"}).join(`
`);var W="";return W=A<2&&N>0?"coords":y.shapeInfo.logicalShape.map(function(G,H){return"coords."+U[H+z]}).join(", "),`
    float `+S+`() {
      `+O+` coords = getOutputCoords();
      `+L+`
      return get`+k+"("+W+`);
    }
  `}(d,m)),g}(p,e,n)}).join(`
`),c=e.texShape,l=jt(),h=function(p){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return `+p.texture2D+`(textureSampler, uv).r;
    }
  `}(l),f=function(p){return p.version+`
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    `+p.varyingFs+` vec2 resultUV;
    `+p.defineOutput+`
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    `+p.defineSpecialNaN+`
    `+p.defineSpecialInf+`
    `+p.defineRound+`

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    `+jh+`
    `+Kh+`
    `+Xh+`
  `}(l);return e.isPacked?(a=function(p,d){switch(p.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return function(y,w){var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];return C[0]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * `+C[1]+`.0);
      }
    `:C[1]===1?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * `+C[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));
      return 2 * (resTexRC.x * `+C[1]+` + resTexRC.y);
    }
  `}(0,d);case 2:return function(y,w){var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)];if(Wt(y,w))return`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(`+C[0]+", "+C[1]+`));
      }
    `;var k=Math.ceil(y[1]/2);return`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));

      int index = resTexRC.x * `+C[1]+` + resTexRC.y;
      int r = 2 * (index / `+k+`);
      int c = imod(index, `+k+`) * 2;

      return ivec2(r, c);
    }
  `}(p,d);case 3:return m=p,v=d,g=[Math.ceil(v[0]/2),Math.ceil(v[1]/2)],x=Math.ceil(m[2]/2),b=x*Math.ceil(m[1]/2),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+g[0]+", "+g[1]+`));
      int index = resTexRC.x * `+g[1]+` + resTexRC.y;

      int b = index / `+b+`;
      index -= b * `+b+`;

      int r = 2 * (index / `+x+`);
      int c = imod(index, `+x+`) * 2;

      return ivec3(b, r, c);
    }
  `;default:return function(y,w){for(var C=[Math.ceil(w[0]/2),Math.ceil(w[1]/2)],k=Math.ceil(y[y.length-1]/2),S=k*Math.ceil(y[y.length-2]/2),R=S,I="",N="b, r, c",A=2;A<y.length-1;A++)R*=y[y.length-A-1],I=`
      int b`+A+" = index / "+R+`;
      index -= b`+A+" * "+R+`;
    `+I,N="b"+A+", "+N;return`
    ivec`+y.length+` getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+C[0]+", "+C[1]+`));
      int index = resTexRC.x * `+C[1]+` + resTexRC.y;

      `+I+`

      int b = index / `+S+`;
      index -= b * `+S+`;

      int r = 2 * (index / `+k+`);
      int c = imod(index, `+k+`) * 2;

      return ivec`+y.length+"("+N+`);
    }
  `}(p,d)}var m,v,g,x,b}(e.logicalShape,c),i=function(p){return`
    void setOutput(vec4 val) {
      `+p.output+` = val;
    }
  `}(l)):(a=function(p,d){switch(p.length){case 0:return`
    int getOutputCoords() {
      return 0;
    }
  `;case 1:return function(g,x){return x[0]===1?`
      int getOutputCoords() {
        return int(resultUV.x * `+x[1]+`.0);
      }
    `:x[1]===1?`
      int getOutputCoords() {
        return int(resultUV.y * `+x[0]+`.0);
      }
    `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+x[0]+", "+x[1]+`));
      return resTexRC.x * `+x[1]+` + resTexRC.y;
    }
  `}(0,d);case 2:return function(g,x){return Wt(g,x)?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(`+x[0]+", "+x[1]+`));
      }
    `:g[1]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+x[0]+", "+x[1]+`));
        int index = resTexRC.x * `+x[1]+` + resTexRC.y;
        return ivec2(index, 0);
      }
    `:g[0]===1?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(`+x[0]+", "+x[1]+`));
        int index = resTexRC.x * `+x[1]+` + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+x[0]+", "+x[1]+`));
      int index = resTexRC.x * `+x[1]+` + resTexRC.y;
      int r = index / `+g[1]+`;
      int c = index - r * `+g[1]+`;
      return ivec2(r, c);
    }
  `}(p,d);case 3:return m=d,v=vn(["r","c","d"],p),`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(`+m[0]+", "+m[1]+`));
      int index = resTexRC.x * `+m[1]+` + resTexRC.y;
      `+v+`
      return ivec3(r, c, d);
    }
  `;case 4:return function(g,x){var b=vn(["r","c","d","d2"],g);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+x[0]+", "+x[1]+`));
      int index = resTexRC.x * `+x[1]+` + resTexRC.y;
      `+b+`
      return ivec4(r, c, d, d2);
    }
  `}(p,d);case 5:return function(g,x){var b=vn(["r","c","d","d2","d3"],g);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(`+x[0]+`,
                             `+x[1]+`));

      int index = resTexRC.x * `+x[1]+` + resTexRC.y;

      `+b+`

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}(p,d);case 6:return function(g,x){var b=vn(["r","c","d","d2","d3","d4"],g);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(`+x[0]+", "+x[1]+`));
      int index = resTexRC.x * `+x[1]+` + resTexRC.y;

      `+b+`

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}(p,d);default:throw new Error(p.length+"-D output sampling is not yet supported")}var m,v}(e.logicalShape,c),i=function(p){return`
    void setOutput(float val) {
      `+p.output+` = vec4(val, 0, 0, 0);
    }
  `}(l)),n&&(f+=Yh),[f,h,i,s,a,u,t].join(`
`)}function Nn(r){var e=r.shapeInfo.logicalShape;switch(e.length){case 0:return function(t){var n=t.name,o="get"+n.charAt(0).toUpperCase()+n.slice(1);if(t.shapeInfo.isUniform)return"float "+o+"() {return "+n+";}";var a=t.shapeInfo.texShape,i=a[0],s=a[1];if(i===1&&s===1)return`
      float `+o+`() {
        return sampleTexture(`+n+`, halfCR);
      }
    `;var u=t.shapeInfo.texShape,c=u[0],l=u[1],h=hn(n);return`
    float `+o+`() {
      vec2 uv = uvFromFlat(`+c+", "+l+", "+h+`);
      return sampleTexture(`+n+`, uv);
    }
  `}(r);case 1:return function(t){var n=t.name,o="get"+n.charAt(0).toUpperCase()+n.slice(1);if(t.shapeInfo.isUniform)return`
      float `+o+`(int index) {
        `+Sn(t)+`
      }
    `;var a=t.shapeInfo.texShape,i=a[0],s=a[1];if(s===1&&i===1)return`
      float `+o+`(int index) {
        return sampleTexture(`+n+`, halfCR);
      }
    `;var u=hn(n);return s===1?`
      float `+o+`(int index) {
        vec2 uv = vec2(0.5, (float(index + `+u+") + 0.5) / "+i+`.0);
        return sampleTexture(`+n+`, uv);
      }
    `:i===1?`
      float `+o+`(int index) {
        vec2 uv = vec2((float(index + `+u+") + 0.5) / "+s+`.0, 0.5);
        return sampleTexture(`+n+`, uv);
      }
    `:`
    float `+o+`(int index) {
      vec2 uv = uvFromFlat(`+i+", "+s+", index + "+u+`);
      return sampleTexture(`+n+`, uv);
    }
  `}(r);case 2:return function(t){var n=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=t.shapeInfo.texShape;if(i!=null&&Wt(n,i)){var s=i[0],u=i[1];return`
    float `+a+`(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(`+u+".0, "+s+`.0);
      return sampleTexture(`+o+`, uv);
    }
  `}var c=dn(n),l=c.newShape,h=c.keptDims,f=l;if(f.length<n.length){var p=Fn(t,f);return`
      `+Nn(p)+`
      float `+a+`(int row, int col) {
        return `+a+"("+Pn(["row","col"],h)+`);
      }
    `}if(t.shapeInfo.isUniform)return`
      float `+a+`(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(`+n[1]+`, 1)));
        `+Sn(t)+`
      }
    `;var d=i[0],m=i[1],v=hn(o);return m===1?`
    float `+a+`(int row, int col) {
      float index = dot(vec3(row, col, `+v+"), vec3("+n[1]+`, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / `+d+`.0);
      return sampleTexture(`+o+`, uv);
    }
  `:d===1?`
    float `+a+`(int row, int col) {
      float index = dot(vec3(row, col, `+v+"), vec3("+n[1]+`, 1, 1));
      vec2 uv = vec2((index + 0.5) / `+m+`.0, 0.5);
      return sampleTexture(`+o+`, uv);
    }
  `:`
  float `+a+`(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * `+n[1]+" + col + "+v+`;
    vec2 uv = uvFromFlat(`+d+", "+m+`, index);
    return sampleTexture(`+o+`, uv);
  }
`}(r);case 3:return function(t){var n=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=n[1]*n[2],s=n[2],u=dn(n),c=u.newShape,l=u.keptDims,h=c;if(h.length<n.length){var f=Fn(t,h);return`
        `+Nn(f)+`
        float `+a+`(int row, int col, int depth) {
          return `+a+"("+Pn(["row","col","depth"],l)+`);
        }
      `}if(t.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(`+i+", "+s+`, 1)));
        `+Sn(t)+`
      }
    `;var p=t.shapeInfo.texShape,d=p[0],m=p[1],v=t.shapeInfo.flatOffset;if(m===i&&v==null)return`
        float `+a+`(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(`+s+`, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(`+m+".0, "+d+`.0);
          return sampleTexture(`+o+`, uv);
        }
      `;if(m===s&&v==null)return`
    float `+a+`(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(`+n[1]+`, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+m+".0, "+d+`.0);
      return sampleTexture(`+o+`, uv);
    }
  `;var g=hn(o);return`
      float `+a+`(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * `+i+" + col * "+s+" + depth + "+g+`;
        vec2 uv = uvFromFlat(`+d+", "+m+`, index);
        return sampleTexture(`+o+`, uv);
      }
  `}(r);case 4:return function(t){var n=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=n[3],s=n[2]*i,u=n[1]*s,c=dn(n),l=c.newShape,h=c.keptDims;if(l.length<n.length){var f=Fn(t,l);return`
      `+Nn(f)+`
      float `+a+`(int row, int col, int depth, int depth2) {
        return `+a+"("+Pn(["row","col","depth","depth2"],h)+`);
      }
    `}if(t.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(`+u+", "+s+", "+i+`, 1)));
        `+Sn(t)+`
      }
    `;var p=t.shapeInfo.flatOffset,d=t.shapeInfo.texShape,m=d[0],v=d[1];if(v===u&&p==null)return`
      float `+a+`(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(`+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+v+".0, "+m+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;if(v===i&&p==null)return`
      float `+a+`(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(`+n[1]*n[2]+", "+n[2]+`, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+v+".0, "+m+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;var g=hn(o);return`
    float `+a+`(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+u+" + col * "+s+` +
          depth * `+i+` + depth2;
      vec2 uv = uvFromFlat(`+m+", "+v+", index + "+g+`);
      return sampleTexture(`+o+`, uv);
    }
  `}(r);case 5:return function(t){var n=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=n[4],s=n[3]*i,u=n[2]*s,c=n[1]*u,l=dn(n),h=l.newShape,f=l.keptDims;if(h.length<n.length){var p=Fn(t,h);return`
      `+Nn(p)+`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        return `+a+"("+Pn(["row","col","depth","depth2","depth3"],f)+`);
      }
    `}if(t.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(`+c+", "+u+", "+s+", "+i+`)) +
          depth3;
        `+Sn(t)+`
      }
    `;var d=t.shapeInfo.flatOffset,m=t.shapeInfo.texShape,v=m[0],g=m[1];if(g===c&&d==null)return`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(`+u+", "+s+", "+i+`, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+g+".0, "+v+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;if(g===i&&d==null)return`
      float `+a+`(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(`+n[1]*n[2]*n[3]+`,
               `+n[2]*n[3]+", "+n[3]+`, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+g+".0, "+v+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;var x=hn(o);return`
    float `+a+`(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+c+" + col * "+u+" + depth * "+s+` +
          depth2 * `+i+" + depth3 + "+x+`;
      vec2 uv = uvFromFlat(`+v+", "+g+`, index);
      return sampleTexture(`+o+`, uv);
    }
  `}(r);case 6:return function(t){var n=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),i=dn(n),s=i.newShape,u=i.keptDims;if(s.length<n.length){var c=Fn(t,s);return`
      `+Nn(c)+`
      float `+a+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return `+a+"("+Pn(["row","col","depth","depth2","depth3","depth4"],u)+`);
      }
    `}var l=n[5],h=n[4]*l,f=n[3]*h,p=n[2]*f,d=n[1]*p;if(t.shapeInfo.isUniform)return`
      float `+a+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(`+d+", "+p+", "+f+", "+h+`)) +
          dot(
            vec2(depth3, depth4),
            vec2(`+l+`, 1)));
        `+Sn(t)+`
      }
    `;var m=t.shapeInfo.flatOffset,v=t.shapeInfo.texShape,g=v[0],x=v[1];if(x===d&&m==null)return`
      float `+a+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(`+p+", "+f+", "+h+", "+l+`)) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(`+x+".0, "+g+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;if(x===l&&m==null)return`
      float `+a+`(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(`+n[1]*n[2]*n[3]*n[4]+`,
               `+n[2]*n[3]*n[4]+`,
               `+n[3]*n[4]+`,
               `+n[4]+`)) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(`+x+".0, "+g+`.0);
        return sampleTexture(`+o+`, uv);
      }
    `;var b=hn(o);return`
    float `+a+`(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * `+d+" + col * "+p+" + depth * "+f+` +
          depth2 * `+h+" + depth3 * "+l+" + depth4 + "+b+`;
      vec2 uv = uvFromFlat(`+g+", "+x+`, index);
      return sampleTexture(`+o+`, uv);
    }
  `}(r);default:throw new Error(e.length+"-D input sampling is not yet supported")}}function du(r){var e,t,n;switch(r.shapeInfo.logicalShape.length){case 0:return e=r.name,t="get"+e.charAt(0).toUpperCase()+e.slice(1),n=jt(),`
    vec4 `+t+`() {
      return `+n.texture2D+"("+e+`, halfCR);
    }
  `;case 1:return function(o){var a=o.name,i="get"+a.charAt(0).toUpperCase()+a.slice(1),s=o.shapeInfo.texShape,u=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],c=jt();return`
    vec4 `+i+`(int index) {
      vec2 uv = packedUVfrom1D(
        `+u[0]+", "+u[1]+`, index);
      return `+c.texture2D+"("+a+`, uv);
    }
  `}(r);case 2:return function(o){var a=o.shapeInfo.logicalShape,i=o.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=o.shapeInfo.texShape,c=u[0],l=u[1],h=jt();if(u!=null&&Wt(a,u))return`
      vec4 `+s+`(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(`+l+".0, "+c+`.0);

        return `+h.texture2D+"("+i+`, uv);
      }
    `;var f=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)],p=Math.ceil(a[1]/2);return`
    vec4 `+s+`(int row, int col) {
      vec2 uv = packedUVfrom2D(`+p+", "+f[0]+", "+f[1]+`, row, col);
      return `+h.texture2D+"("+i+`, uv);
    }
  `}(r);case 3:return function(o){var a=o.shapeInfo.logicalShape,i=o.name,s="get"+i.charAt(0).toUpperCase()+i.slice(1),u=o.shapeInfo.texShape,c=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];if(a[0]===1){var l=a.slice(1),h=Fn(o,l);return`
        `+du(h)+`
        vec4 `+s+`(int b, int row, int col) {
          return `+s+"("+Pn(["b","row","col"],[1,2])+`);
        }
      `}var f=c[0],p=c[1],d=Math.ceil(a[2]/2),m=d*Math.ceil(a[1]/2),v=jt();return`
    vec4 `+s+`(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        `+f+", "+p+", "+m+", "+d+`, b, row, col);
      return `+v.texture2D+"("+i+`, uv);
    }
  `}(r);default:return function(o){for(var a=o.shapeInfo.logicalShape,i=a.length,s=o.name,u="get"+s.charAt(0).toUpperCase()+s.slice(1),c=o.shapeInfo.texShape,l=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)],h=l[0],f=l[1],p=Math.ceil(a[i-1]/2),d=p*Math.ceil(a[i-2]/2),m="int b, int row, int col",v="b * "+d+" + (row / 2) * "+p+" + (col / 2)",g=2;g<i-1;g++)m="int b"+g+", "+m,d*=a[i-g-1],v="b"+g+" * "+d+" + "+v;var x=jt();return`
    vec4 `+u+"("+m+`) {
      int index = `+v+`;
      int texR = index / `+f+`;
      int texC = index - texR * `+f+`;
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+f+", "+h+`);
      return `+x.texture2D+"("+s+`, uv);
    }
  `}(r)}}var jh=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Kh=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Xh=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,Yh=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function hn(r){return"offset"+r}function Sn(r){var e=r.name,t=$(r.shapeInfo.logicalShape);return t<2?"return "+e+";":`
    for (int i = 0; i < `+t+`; i++) {
      if (i == index) {
        return `+e+`[i];
      }
    }
  `}function bt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error("GPU for rank "+r+" is not yet supported")}function Fn(r,e){var t=JSON.parse(JSON.stringify(r));return t.shapeInfo.logicalShape=e,t}function Pn(r,e){return e.map(function(t){return r[t]}).join(", ")}var $h=function(r,e,t,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,E(r.length>2,function(){return"Packed arg"+(t.charAt(0).toUpperCase()+t.slice(1))+" supports only inputs with rank above 2."});var o=r[r.length-1],a=Math.ceil(o/e);this.outputShape=r.slice(0,-1),a>1&&this.outputShape.push(a),n||this.variableNames.push("bestIndicesA");var i,s,u=this.outputShape,c=u.length,l=bt(c),h=Qt("coords",c);if(a===1){var f=bt(s=c+1);i=`
        `+f+" sourceLocR = "+f+"("+h.join()+`, 0);
        ++`+h[c-1]+`;
        `+f+" sourceLocG = "+f+"("+h.join()+`, 0);
        ++`+h[c-2]+`;
        `+f+" sourceLocA = "+f+"("+h.join()+`, 0);
        --`+h[c-1]+`;
        `+f+" sourceLocB = "+f+"("+h.join()+`, 0);
        --`+h[c-2]+";"}else s=c,i=`
        `+l+` sourceLocR = coords;
        ++`+h[c-1]+`;
        `+l+` sourceLocG = coords;
        ++`+h[c-2]+`;
        `+l+` sourceLocA = coords;
        --`+h[c-1]+`;
        `+l+` sourceLocB = coords;
        --`+h[c-2]+";";var p=["x","y","z","w","u","v"].slice(0,s),d="."+p[s-1],m=p.map(function(S){return"int "+S}),v=Qt("sourceLocR",s-1).concat("inIdx.r"),g=Qt("sourceLocG",s-1).concat("inIdx.g"),x=Qt("sourceLocB",s-1).concat("inIdx.b"),b=Qt("sourceLocA",s-1).concat("inIdx.a"),y=t==="max"?"greaterThan":"lessThan",w=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(`+v.join()+`),
                             getBestIndicesAChannel(`+g.join()+`),
                             getBestIndicesAChannel(`+x.join()+`),
                             getBestIndicesAChannel(`+b.join()+")));",C=`vec4(
            getAChannel(`+v.join()+`),
            hasNextCol ? getAChannel(`+g.join()+`) : 0.,
            hasNextRow ? getAChannel(`+x.join()+`) : 0.,
            hasNextRow && hasNextCol ? getAChannel(`+b.join()+") : 0.)",k=n?"":`
      float getBestIndicesAChannel(`+m.join()+`) {
        return getChannel(getBestIndicesA(`+p.join()+`),
                                          vec2(`+p.slice(-2).join()+`));
      }`;this.userCode=`
      float getAChannel(`+m.join()+`) {
        return getChannel(getA(`+p.join()+`),
                               vec2(`+p.slice(-2).join()+`));
      }
      `+k+`
      void main() {
        `+l+` coords = getOutputCoords();
        bool hasNextCol = `+h[c-1]+" < "+(u[c-1]-1)+`;
        bool hasNextRow = `+h[c-2]+" < "+(u[c-2]-1)+`;
        `+i+`
        ivec4 srcIdx = ivec4(sourceLocR`+d+", sourceLocG"+d+`,
          sourceLocB`+d+", sourceLocA"+d+") * "+e+`;
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = `+C+`;

        for (int i = 0; i < `+e+`; i++) {
          inIdx = srcIdx;
          `+w+`
          vec4 candidate = `+C+`;
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(`+y+`(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `},Jh=function(r){this.variableNames=["dy"],this.outputShape=r.inShape;var e=r.filterHeight,t=r.filterWidth,n=r.strideHeight,o=r.strideWidth,a=r.dilationHeight,i=r.dilationWidth,s=r.effectiveFilterHeight,u=r.effectiveFilterWidth,c=s-1-r.padInfo.top,l=u-1-r.padInfo.left,h=1/(e*t);this.userCode=`
      const ivec2 pads = ivec2(`+c+", "+l+`);
      const float avgMultiplier = float(`+h+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+s+`;
            wR += `+a+`) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+u+`;
            wC+= `+i+`) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `},Qh=function(r){this.variableNames=["dy"],this.outputShape=r.inShape;var e=r.filterDepth,t=r.filterHeight,n=r.filterWidth,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.effectiveFilterDepth,h=r.effectiveFilterHeight,f=r.effectiveFilterWidth,p=l-1-r.padInfo.front,d=h-1-r.padInfo.top,m=f-1-r.padInfo.left,v=1/(e*t*n);this.userCode=`
      const ivec3 pads = ivec3(`+p+", "+d+", "+m+`);
      const float avgMultiplier = float(`+v+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          float dyD = float(dyDCorner + wD) / `+o+`.0;

          if (dyD < 0.0 || dyD >= `+r.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+h+`;
              wR += `+u+`) {
            float dyR = float(dyRCorner + wR) / `+a+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+f+`;
                wC += `+c+`) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `},Zh=function(r,e,t,n,o,a){this.outputShape=[],this.variableNames=["x","mean","variance"],lt(r,e),lt(r,t);var i="0.0";n!=null&&(lt(r,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="1.0";o!=null&&(lt(r,o),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=r,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = `+i+`;
        float scale = `+s+`;
        float inv = scale * inversesqrt(variance + float(`+a+`));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `},tf=function(r,e,t,n,o,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],lt(r,e),lt(r,t);var i="vec4(0.0)";n!=null&&(lt(r,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");var s="vec4(1.0)";o!=null&&(lt(r,o),this.variableNames.push("scale"),s="getScaleAtOutCoords()"),this.outputShape=r,this.userCode=`
      void main() {
        vec4 offset = `+i+`;
        vec4 scale = `+s+`;

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(`+a+`));

        setOutput((x - mean) * inv + offset);
      }
    `},ef="return areal * breal - aimag * bimag;",nf="return areal * bimag + aimag * breal;",Vi=function(r,e,t){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=lt(e,t),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        `+r+`
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `},Wo="return a + b;",Uo="return a - b;",Gi="return a * b;",vu="return (a < 0.) ? b * a : a;",St=function(r,e,t){this.variableNames=["A","B"],this.outputShape=lt(e,t),this.userCode=`
      float binaryOperation(float a, float b) {
        `+r+`
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `},mu=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`,ze=function(r,e,t,n){n===void 0&&(n=!1),this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=lt(e,t);var o=this.outputShape.length,a="";if(n)if(o===0||$(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          `+bt(o)+` coords = getOutputCoords();
        `,o===1)a+=`
            result.y = (coords + 1) >= `+this.outputShape[0]+` ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{var i=Qt("coords",o);a+=`
            bool nextRowOutOfBounds =
              (`+i[o-2]+" + 1) >= "+this.outputShape[o-2]+`;
            bool nextColOutOfBounds =
              (`+i[o-1]+" + 1) >= "+this.outputShape[o-1]+`;
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        `+r+`
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        `+a+`

        setOutput(result);
      }
    `},rf=function(){function r(e){this.variableNames=["A"],this.outputShape=e,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}return r.prototype.getCustomSetupFunc=function(e,t){var n=this;return function(o,a){n.minLoc==null&&(n.minLoc=o.getUniformLocationNoThrow(a,"minVal"),n.maxLoc=o.getUniformLocationNoThrow(a,"maxVal")),o.gl.uniform1f(n.minLoc,e),o.gl.uniform1f(n.maxLoc,t)}},r}(),of=function(){function r(e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.userCode=`
      uniform float minVal;
      uniform float maxVal;

      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}return r.prototype.getCustomSetupFunc=function(e,t){var n=this;return function(o,a){n.minLoc==null&&(n.minLoc=o.getUniformLocationNoThrow(a,"minVal"),n.maxLoc=o.getUniformLocationNoThrow(a,"maxVal")),o.gl.uniform1f(n.minLoc,e),o.gl.uniform1f(n.maxLoc,t)}},r}(),af=function(r){this.variableNames=["real","imag"],this.outputShape=r,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `},sf=function(r){this.outputShape=[],this.outputShape=jn(r,1),this.variableNames=r.map(function(s,u){return"T"+u});var e=new Array(r.length-1);e[0]=r[0][1];for(var t=1;t<e.length;t++)e[t]=e[t-1]+r[t][1];var n=["if (yC < "+e[0]+") setOutput(getT0(yR, yC));"];for(t=1;t<e.length;t++){var o=e[t-1];n.push("else if (yC < "+e[t]+") setOutput(getT"+t+"(yR, yC-"+o+"));")}var a=e.length,i=e[e.length-1];n.push("else setOutput(getT"+a+"(yR, yC-"+i+"));"),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        `+n.join(`
        `)+`
      }
    `},uf=function(r,e){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=jn(r,e);var t=this.outputShape,n=t.length,o=bt(n),a=Qt("coords",n),i=["x","y","z","w","u","v"].slice(0,n);this.variableNames=r.map(function(v,g){return"T"+g});var s=new Array(r.length-1);s[0]=r[0][e];for(var u=1;u<s.length;u++)s[u]=s[u-1]+r[u][e];var c=i[e],l=i.slice(-2),h=i.join(),f="if ("+c+" < "+s[0]+`) {
        return getChannel(
            getT0(`+h+"), vec2("+l.join()+`));
        }`;for(u=1;u<s.length;u++){var p=s[u-1];f+=`
        if (`+c+" < "+s[u]+"  && "+c+" >= "+s[u-1]+`) {
          return getChannel(
            getT`+u+"("+Ir(i,c,p)+`),
            vec2(`+Ir(l,c,p)+`));
        }`}var d=s.length,m=s[s.length-1];f+=`
        return getChannel(
          getT`+d+"("+Ir(i,c,m)+`),
          vec2(`+Ir(l,c,m)+"));",this.userCode=`
      float getValue(`+i.map(function(v){return"int "+v})+`) {
        `+f+`
      }

      void main() {
        `+o+` coords = getOutputCoords();
        vec4 result = vec4(getValue(`+a+`), 0., 0., 0.);

        `+a[n-1]+" = "+a[n-1]+` + 1;
        if (`+a[n-1]+" < "+t[n-1]+`) {
          result.g = getValue(`+a+`);
        }

        `+a[n-2]+" = "+a[n-2]+` + 1;
        if (`+a[n-2]+" < "+t[n-2]+`) {
          result.a = getValue(`+a+`);
        }

        `+a[n-1]+" = "+a[n-1]+` - 1;
        if (`+a[n-2]+" < "+t[n-2]+` &&
            `+a[n-1]+" < "+t[n-1]+`) {
          result.b = getValue(`+a+`);
        }
        setOutput(result);
      }
    `};function Ir(r,e,t){var n=r.indexOf(e);return r.map(function(o,a){return a===n?o+" - "+t:o}).join()}var cf=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var e=r.strideHeight,t=r.strideWidth,n=r.padInfo.top,o=r.padInfo.left,a=r.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yR = 0; yR < `+r.outHeight+`; yR++) {
            int xR = wR + yR * `+e+" - "+n+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+r.outWidth+`; yC++) {
              int xC = wC + yC * `+t+" - "+o+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              if (`+a+`) {
                float dyValue = getDy(b, yR, yC, d2);
                float xValue = getX(b, xR, xC, d1);
                dotProd += (xValue * dyValue);
              } else {
                float dyValue = getDy(b, d2, yR, yC);
                float xValue = getX(b, d1, xR, xC);
                dotProd += (xValue * dyValue);
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},lf=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var e=r.filterHeight,t=r.filterWidth,n=r.strideHeight,o=r.strideWidth,a=r.dataFormat==="channelsLast",i=e-1-r.padInfo.top,s=t-1-r.padInfo.left,u=a?1:2,c=a?2:3,l=a?3:1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[`+l+`];

        ivec2 dyCorner = ivec2(coords[`+u+"], coords["+c+`]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+e+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+e+` - 1 - wR;

          for (int wC = 0; wC < `+t+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+t+` - 1 - wC;

            for (int d2 = 0; d2 < `+r.outChannels+`; d2++) {

              if (`+a+`) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `},hf=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var e=r.strideDepth,t=r.strideHeight,n=r.strideWidth,o=r.padInfo.front,a=r.padInfo.top,i=r.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yF = 0; yF < `+r.outDepth+`; yF++) {
            int xF = wF + yF * `+e+" - "+o+`;

            if (xF < 0 || xF >= `+r.inDepth+`) {
              continue;
            }

            for (int yR = 0; yR < `+r.outHeight+`; yR++) {
              int xR = wR + yR * `+t+" - "+a+`;

              if (xR < 0 || xR >= `+r.inHeight+`) {
                continue;
              }

              for (int yC = 0; yC < `+r.outWidth+`; yC++) {
                int xC = wC + yC * `+n+" - "+i+`;

                if (xC < 0 || xC >= `+r.inWidth+`) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},ff=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var e=r.filterDepth,t=r.filterHeight,n=r.filterWidth,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=e-1-r.padInfo.front,u=t-1-r.padInfo.top,c=n-1-r.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(`+s+", "+u+", "+c+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < `+e+`; wF++) {
          float dyF = float(dyFCorner + wF) / `+o+`.0;

          if (dyF < 0.0 || dyF >= `+r.outDepth+`.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = `+e+` - 1 - wF;

          for (int wR = 0; wR < `+t+`; wR++) {
            float dyR = float(dyRCorner + wR) / `+a+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = `+t+` - 1 - wR;

            for (int wC = 0; wC < `+n+`; wC++) {
              float dyC = float(dyCCorner + wC) / `+i+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = `+n+` - 1 - wC;

              for (int d2 = 0; d2 < `+r.outChannels+`; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},pf=function(r){this.variableNames=["x","dy"],this.outputShape=r.filterShape;var e=r.strideHeight,t=r.strideWidth,n=r.padInfo.top,o=r.padInfo.left,a=r.outChannels/r.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * `+a+` + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < `+r.batchSize+`; b++) {
          for (int yR = 0; yR < `+r.outHeight+`; yR++) {
            int xR = wR + yR * `+e+" - "+n+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int yC = 0; yC < `+r.outWidth+`; yC++) {
              int xC = wC + yC * `+t+" - "+o+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `},df=function(r){this.variableNames=["dy","W"],this.outputShape=r.inShape;var e=r.filterHeight,t=r.filterWidth,n=r.strideHeight,o=r.strideWidth,a=e-1-r.padInfo.top,i=t-1-r.padInfo.left,s=r.outChannels/r.inChannels;this.userCode=`
      const ivec2 pads = ivec2(`+a+", "+i+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < `+e+`; wR++) {
          float dyR = float(dyRCorner + wR) / `+n+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = `+e+` - 1 - wR;

          for (int wC = 0; wC < `+t+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+o+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = `+t+` - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < `+s+`; dm++) {
              int d2 = d1 * `+s+` + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `},Hi=function(r,e,t,n){e===void 0&&(e=!1),t===void 0&&(t=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.outputShape=r.outShape;var o=r.padInfo.top,a=r.padInfo.left,i=r.strideHeight,s=r.strideWidth,u=r.dilationHeight,c=r.dilationWidth,l=r.filterHeight,h=r.filterWidth,f=4*Math.floor(r.inChannels/4),p=r.inChannels%4,d=r.dataFormat==="channelsLast",m=d?1:2,v=d?2:3,g=d?3:1,x="",b="";t&&(x=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+t+`
        }`:`
          float activation(float x) {
            `+t+`
          }
        `,b="result = activation(result);");var y=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+x+`

      const ivec2 strides = ivec2(`+i+", "+s+`);
      const ivec2 pads = ivec2(`+o+", "+a+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[`+g+`];

        ivec2 xRCCorner =
            ivec2(coords[`+m+"], coords["+v+`]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+l+`; wR++) {
          int xR = xRCorner + wR * `+u+`;

          if (xR < 0 || xR >= `+r.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+h+`; wC++) {
            int xC = xCCorner + wC * `+c+`;

            if (xC < 0 || xC >= `+r.inWidth+`) {
              continue;
            }

            for (int d1 = 0; d1 < `+f+`; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (`+d+`) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (`+(p===1)+`) {

              if (`+d+`) {
                dotProd +=
                    getX(batch, xR, xC, `+f+`) *
                    getW(wR, wC, `+f+`, d2);
              } else {
                dotProd +=
                    getX(batch, `+f+`, xR, xC) *
                    getW(wR, wC, `+f+`, d2);
              }

            } else if (`+(p===2)+`) {
              vec2 wValues = vec2(
                getW(wR, wC, `+f+`, d2),
                getW(wR, wC, `+f+` + 1, d2)
              );

              if (`+d+`) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, `+f+`),
                  getX(batch, xR, xC, `+f+` + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, `+f+`, xR, xC),
                  getX(batch, `+f+` + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (`+(p===3)+`) {
              vec3 wValues = vec3(
                getW(wR, wC, `+f+`, d2),
                getW(wR, wC, `+f+` + 1, d2),
                getW(wR, wC, `+f+` + 2, d2)
              );

              if (`+d+`) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, `+f+`),
                  getX(batch, xR, xC, `+f+` + 1),
                  getX(batch, xR, xC, `+f+` + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, `+f+`, xR, xC),
                  getX(batch, `+f+` + 1, xR, xC),
                  getX(batch, `+f+` + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        `+y+`
        `+b+`
        setOutput(result);
      }
    `},vf=function(r){this.variableNames=["x","W"],this.outputShape=r.outShape;var e=r.padInfo.front,t=r.padInfo.top,n=r.padInfo.left,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.filterDepth,h=r.filterHeight,f=r.filterWidth,p=4*Math.floor(r.inChannels/4),d=r.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(`+o+", "+a+", "+i+`);
      const ivec3 pads = ivec3(`+e+", "+t+", "+n+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < `+l+`; wF++) {
          int xF = xFCorner + wF * `+s+`;

          if (xF < 0 || xF >= `+r.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`; wR++) {
            int xR = xRCorner + wR * `+u+`;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+f+`; wC++) {
              int xC = xCCorner + wC * `+c+`;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              for (int d1 = 0; d1 < `+p+`; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (`+(d===1)+`) {
                dotProd +=
                  getX(batch, xF, xR, xC, `+p+`) *
                  getW(wF, wR, wC, `+p+`, d2);
              } else if (`+(d===2)+`) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, `+p+`),
                  getX(batch, xF, xR, xC, `+p+` + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, `+p+`, d2),
                  getW(wF, wR, wC, `+p+` + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (`+(d===3)+`) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, `+p+`),
                  getX(batch, xF, xR, xC, `+p+` + 1),
                  getX(batch, xF, xR, xC, `+p+` + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, `+p+`, d2),
                  getW(wF, wR, wC, `+p+` + 1, d2),
                  getW(wF, wR, wC, `+p+` + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `},qi=function(r,e,t,n){e===void 0&&(e=!1),t===void 0&&(t=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.outputShape=r.outShape;var o=r.inHeight,a=r.inWidth,i=r.padInfo.top,s=r.padInfo.left,u=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,h=r.dilationWidth,f=r.filterHeight,p=r.filterWidth,d=r.outChannels/r.inChannels,m="",v="";t&&(m=n?`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          `+t+`
        }`:`
          float activation(float x) {
            `+t+`
          }
        `,v="result = activation(result);");var g=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+m+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / `+d+`;
        int q = d2 - d1 * `+d+`;

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < `+f+`; wR++) {
          int xR = xRCorner + wR * `+l+`;

          if (xR < 0 || xR >= `+o+`) {
            continue;
          }

          for (int wC = 0; wC < `+p+`; wC++) {
            int xC = xCCorner + wC * `+h+`;

            if (xC < 0 || xC >= `+a+`) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        `+g+`
        `+v+`
        setOutput(result);
      }
    `},ji=function(r,e,t,n){e===void 0&&(e=!1),t===void 0&&(t=null),n===void 0&&(n=!1),this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r.outShape;for(var o=r.inHeight,a=r.inWidth,i=r.padInfo.top,s=r.padInfo.left,u=r.strideHeight,c=r.strideWidth,l=r.dilationHeight,h=r.dilationWidth,f=r.filterHeight,p=r.filterWidth,d=p,m="int xR; int xC; int xCOffset;",v=0;v<f;v++)for(var g=0;g<p;g++)m+=`
          vec4 xTexelR`+v+"C"+2*g+` = vec4(0.);
          vec4 wR`+v+"C"+g+` = vec4(0.);
          vec4 xR`+v+"C"+g+" = vec4(0.);";for(v=0;v<f;v++)for(var x=0;x<d;x++){if(m+=`
          xR = xRCorner + `+v*l+`;
          xC = xCCorner + `+(g=2*x)*h+`;
        `,c===1){if(g<p&&(m+=s%2==1?`
                xCOffset = xC + 1;
                if(xR >= 0 && xR < `+o+" && xCOffset >= 0 && xCOffset < "+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+a+`) {
                    xTexelR`+v+"C"+g+`.zw = vec2(0.);
                  }
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + 1 - 2;
                if(xR >= 0 && xR < `+o+" && xCOffset >= 0 && xCOffset < "+a+`) {
                  vec4 previous = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if(xCOffset + 1 >= `+a+`) {
                    previous.zw = vec2(0.);
                  }

                  xR`+v+"C"+g+" = vec4(previous.zw, xTexelR"+v+"C"+g+`.xy);
                } else {
                  xR`+v+"C"+g+" = vec4(0, 0, xTexelR"+v+"C"+g+`.xy);
                }
              `:`
                if(xR >= 0 && xR < `+o+" && xC >= 0 && xC < "+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xR`+v+"C"+g+" = xTexelR"+v+"C"+g+`;
              `,g+1<p)){var b=s%2==0?Ps(h):h;h%2==0&&s%2==1||h%2!=0&&s%2!=1?(m+=`
                  xCOffset = xC + `+s%2+" + "+b+`;

                  if(xR >= 0 && xR < `+o+` &&
                    xCOffset >= 0 && xCOffset < `+a+`) {
                    xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }
                `,h>1&&(m+=`
                    xCOffset -= 2;
                    if(xR >= 0 && xR < `+o+` &&
                      xCOffset >= 0 && xCOffset < `+a+`) {
                      xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);
                    } else {
                      xTexelR`+v+"C"+g+` = vec4(0.);
                    }
                  `),m+=`
                  xR`+v+"C"+(g+1)+` = vec4(
                    xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.xy);
                `):m+=`
                  xCOffset = xC + `+b+`;

                  if(xR >= 0 && xR < `+o+` &&
                    xCOffset >= 0 && xCOffset < `+a+`) {
                    xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                  }

                  xR`+v+"C"+(g+1)+" = xTexelR"+v+"C"+(g+2)+`;
                `}}else g<p&&(m+=`
              if(xR >= 0 && xR < `+o+`) {
            `,s%2==1?(m+=`
                xCOffset = xC + 1 - `+c+`;
                if(xCOffset >= 0 && xCOffset < `+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                if(xC + 1 >= 0 && xC + 1 < `+a+`) {
                  xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xC + 1, d1);
                } else {
                  xTexelR`+v+"C"+(g+2)+` = vec4(0.);
                }

                xR`+v+"C"+g+` = vec4(
                  xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.zw);
              `,g+1<p&&(m+=`
                  vec4 final = vec4(0.);
                  xCOffset = xC + 1 + `+c+`;
                  if(xCOffset >= 0 && xCOffset < `+a+`) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xR`+v+"C"+(g+1)+" = vec4(xTexelR"+v+"C"+(g+2)+`.xy, final.xy);
                `)):(m+=`
                if(xC >= 0 && xC < `+a+`) {
                  xTexelR`+v+"C"+g+` = getX(batch, xR, xC, d1);
                } else {
                  xTexelR`+v+"C"+g+` = vec4(0.);
                }

                xCOffset = xC + `+c+`;
                if(xCOffset >= 0 && xCOffset < `+a+`) {
                  xTexelR`+v+"C"+(g+2)+` = getX(batch, xR, xCOffset, d1);
                } else {
                  xTexelR`+v+"C"+(g+2)+` = vec4(0.);
                }

                xR`+v+"C"+g+` = vec4(
                  xTexelR`+v+"C"+g+".xy, xTexelR"+v+"C"+(g+2)+`.xy);
              `,g+1<p&&(m+=`
                  xR`+v+"C"+(g+1)+` = vec4(
                    xTexelR`+v+"C"+g+".zw, xTexelR"+v+"C"+(g+2)+`.zw);
                `)),m+="}");g<p&&(m+=`
            vec4 wTexelR`+v+"C"+g+" = getW("+v+", "+g+`, d1, q);
            wR`+v+"C"+g+" = vec4(wTexelR"+v+"C"+g+".xz, wTexelR"+v+"C"+g+`.xz);
          `,g+1<p&&(m+=`
              vec4 wTexelR`+v+"C"+(g+1)+" = getW("+v+", "+(g+1)+`, d1, q);
              wR`+v+"C"+(g+1)+` =
                vec4(wTexelR`+v+"C"+(g+1)+".xz, wTexelR"+v+"C"+(g+1)+".xz);"))}for(v=0;v<f;v++)for(g=0;g<p;g++)m+="dotProd += xR"+v+"C"+g+" * wR"+v+"C"+g+";";var y="",w="";t&&(y=n?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+t+`
        }`:`vec4 activation(vec4 x) {
          `+t+`
        }`,w="result = activation(result);");var C=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+y+`

      const ivec2 strides = ivec2(`+u+", "+c+`);
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {

        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2;
        int q = 0;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        vec4 dotProd = vec4(0.);

        `+m+`

        vec4 result = dotProd;
        `+C+`
        `+w+`
        setOutput(result);
      }
    `},mf=function(r,e,t,n,o){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];var a=r[0],i=r[1],s=r[2],u=r[3],c=e[0],l=t[0],h=t[1];this.outputShape=[c,l,h,u];var f=n==="bilinear"?1:0,p=[i-1+".0",s-1+".0"],d=p[0],m=p[1],v=l>1?[""+(i-1)/(l-1),"(y2-y1) * height_ratio","y1*"+d+" + float(y)*(height_scale)"]:["0.0","0.0","0.5 * (y1+y2) * "+d],g=v[0],x=v[1],b=v[2],y=h>1?[""+(s-1)/(h-1),"(x2-x1) * width_ratio","x1*"+m+" + float(x)*(width_scale)"]:["0.0","0.0","0.5 * (x1+x2) * "+m],w=y[0],C=y[1],k=y[2];this.userCode=`
      const float height_ratio = float(`+g+`);
      const float width_ratio = float(`+w+`);
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= `+a+`) {
          return;
        }

        float height_scale = `+x+`;
        float width_scale = `+C+`;

        float in_y = `+b+`;
        if( in_y < 0.0 || in_y > `+d+` ) {
          setOutput(float(`+o+`));
          return;
        }
        float in_x = `+k+`;
        if( in_x < 0.0 || in_x > `+m+` ) {
          setOutput(float(`+o+`));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(`+f+` == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `},gf=function(r,e,t){this.variableNames=["x"],this.outputShape=r;var n=r.length,o=r[r.length-1],a=t?"<":">";this.userCode=`
      int getIndex(int i) {
        `+(t?"return "+o+" -i - 1;":"return i;")+`
      }

      void main() {
        `+bt(n)+` coords = getOutputCoords();
        int end = `+Ki(n,"coords")+`;
        float val = 0.0;
        for (int i = `+o+` - 1; i >= 0; i -= 1) {
          int idx = getIndex(i);
          if (idx `+a+` end) {
            continue;
          }
          if (idx == end && `+e+`) {
            continue;
          }
          `+Ki(n,"coords")+` = idx;
          val += getX(`+function(i,s){if(i===1)return""+s;if(i===2)return s+".x, "+s+".y";if(i===3)return s+".x, "+s+".y, "+s+".z";if(i===4)return s+".x, "+s+".y, "+s+".z, "+s+".w";throw Error("Cumulative sum for rank "+i+" is not yet supported")}(n,"coords")+`);
        }
        setOutput(val);
      }
    `};function Ki(r,e){if(r===1)return""+e;if(r===2)return e+".y";if(r===3)return e+".z";if(r===4)return e+".w";throw Error("Cumulative sum for rank "+r+" is not yet supported")}var yf=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=ar.DENSE;var e=tr(r),t=jt();this.outputShape=r,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+vn(["r","c","d"],r)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+e[0]+", "+e[1]+`));
        int index = 4 * (resTexRC.x * `+e[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        `+t.output+` = result;
      }
    `},xf=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=ar.DENSE;var e=tr(r),t=jt();this.outputShape=r,this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        `+vn(["r","c","d"],r)+`
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx *
          vec2(`+e[0]+", "+e[1]+`));
        int index = 4 * (resTexRC.x * `+e[1]+` + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        `+t.output+` = result;
      }
    `},bf=function(){function r(e,t,n){this.variableNames=["x"],this.outputShape=[],this.outputShape=e,this.blockSize=t,this.dataFormat=n,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = `+this.getHeightCoordString()+`;
      int w = `+this.getWidthCoordString()+`;
      int d = `+this.getDepthCoordString()+`;

      int in_h = h / `+t+`;
      int offset_h = imod(h, `+t+`);
      int in_w = w / `+t+`;
      int offset_w = imod(w, `+t+`);
      int offset_d = (offset_h * `+t+` + offset_w) *
        `+this.getOutputDepthSize()+`;
      int in_d = d + offset_d;

      float result = `+this.getInputSamplingString()+`;
      setOutput(result);
    }
  `}return r.prototype.getHeightCoordString=function(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"},r.prototype.getWidthCoordString=function(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"},r.prototype.getDepthCoordString=function(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"},r.prototype.getOutputDepthSize=function(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]},r.prototype.getInputSamplingString=function(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"},r}(),wf=function(r){this.variableNames=["X"],this.outputShape=[r,r],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `},Cf=function(r){this.variableNames=["A"],this.outTexUsage=ie.DOWNLOAD;var e=jt();this.outputShape=r,this.userCode=`
      `+pu+`

      void main() {
        float x = getAAtOutCoords();
        `+e.output+` = encode_float(x);
      }
    `},_f=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=ie.DOWNLOAD;var e=jt();this.outputShape=r,this.userCode=`
      `+pu+`

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        `+e.output+` = encode_float(x);
      }
    `},Ef=function(r,e,t){t===void 0&&(t=!1),this.variableNames=["A"];var n=jt(),o=e[0],a=e[1];this.outputShape=r;var i="result";t&&(i="floor(result * 255. + 0.5)"),this.userCode=`
      `+Oa(r)+`

      void main() {
        ivec3 coords = getOutputCoords();

        int flatIndex = getFlatIndex(coords);
        int offset = imod(flatIndex, 4);

        flatIndex = idiv(flatIndex, 4, 1.);
        
        int r = flatIndex / `+a+`;
        int c = imod(flatIndex, `+a+`);
        vec2 uv = (vec2(c, r) + halfCR) / vec2(`+a+".0, "+o+`.0);
        vec4 values = `+n.texture2D+`(A, uv);

        float result;

        if(offset == 0) {
          result = values[0];
        } else if(offset == 1) {
          result = values[1];
        } else if(offset == 2) {
          result = values[2];
        } else {
          result = values[3];
        }

        `+n.output+" = vec4("+i+`, 0., 0., 0.);
      }
    `},Rf=function(r,e,t){t===void 0&&(t=!1),this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var n=jt(),o=e[0],a=e[1];this.outputShape=r;var i="",s="result";t&&(s="floor(result * 255. + 0.5)");for(var u=0;u<=1;u++)for(var c=0;c<=1;c++){var l=2*u+c;i+=`
          localCoords = coords;
          if(localCoords[2] + `+c+" < "+r[2]+`) {
            localCoords[2] += `+c+`;
            if(localCoords[1] + `+u+" < "+r[1]+`) {
              localCoords[1] += `+u+`;

              flatIndex = getFlatIndex(localCoords);
              offset = imod(flatIndex, 4);

              flatIndex = idiv(flatIndex, 4, 1.);

              r = flatIndex / `+a+`;
              c = imod(flatIndex, `+a+`);
              uv = (vec2(c, r) + halfCR) / vec2(`+a+".0, "+o+`.0);
              values = `+n.texture2D+`(A, uv);

              if(offset == 0) {
                result[`+l+`] = values[0];
              } else if(offset == 1) {
                result[`+l+`] = values[1];
              } else if(offset == 2) {
                result[`+l+`] = values[2];
              } else {
                result[`+l+`] = values[3];
              }
            }
          }
        `}this.userCode=`
      `+Oa(r)+`

      void main() {
        ivec3 coords = getOutputCoords();

        vec4 result = vec4(0.);
        int flatIndex, r, c, offset;
        ivec3 localCoords;
        vec2 uv;
        vec4 values;

        `+i+`

        `+n.output+" = "+s+`;
      }
    `},If="return real * expR - imag * expI;",kf="return real * expI + imag * expR;",Xi=function(r,e,t){this.variableNames=["real","imag"];var n=e[1];this.outputShape=e;var o=t?"2.0 * "+Math.PI:"-2.0 * "+Math.PI,a=t?n+".0":"1.0";this.userCode=`
      const float exponentMultiplier = `+o+`;

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        `+r+`
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(`+n+`);
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < `+n+`; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / `+a+`;
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `},Sf=function(){function r(e,t){this.outputShape=[],this.variableNames=["x"],this.outputShape=e,this.userCode=`
      uniform float value;
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}return r.prototype.getCustomSetupFunc=function(e){var t=this;return function(n,o){t.valueLoc==null&&(t.valueLoc=n.getUniformLocationNoThrow(o,"value")),n.gl.uniform1f(t.valueLoc,e)}},r}(),Df=function(r,e,t){this.variableNames=["A","indices"];var n=r.slice();n[t]=e,this.outputShape=n,this.rank=n.length;var o=bt(this.rank),a=function(i,s){var u=i.length;if(u>4)throw Error("Gather for rank "+u+" is not yet supported");if(u===1)return"int(getIndices(resRC))";for(var c=["resRC.x","resRC.y","resRC.z","resRC.w"],l=[],h=0;h<i.length;h++)h===s?l.push("int(getIndices("+c[h]+"))"):l.push(""+c[h]);return l.join()}(r,t);this.userCode=`
      void main() {
        `+o+` resRC = getOutputCoords();
        setOutput(getA(`+a+`));
      }
    `},Af=function(r,e,t){this.sliceDim=r,this.strides=e,this.variableNames=["x","indices"],this.outputShape=t;var n=bt(e.length),o=bt(t.length),a=this.sliceDim>1?"strides[j]":"strides";this.userCode=`
        `+n+" strides = "+n+"("+this.strides+`);
         void main() {
          `+o+` coords = getOutputCoords();
          int flattenIndex = 0;
          for (int j = 0; j < `+this.sliceDim+`; j++) {
            int index = round(getIndices(coords[0], j));
            flattenIndex += index * `+a+`;
          }
          setOutput(getX(flattenIndex, coords[1]));
        }
      `};function Tf(r,e){var t=jt();return Rl(r,e,t.version+`
    precision highp float;
    `+t.attribute+` vec3 clipSpacePos;
    `+t.attribute+` vec2 uv;
    `+t.varyingVs+` vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`)}function Nf(r,e){return Al(r,e,new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]))}function Ff(r,e){return Tl(r,e,new Uint16Array([0,1,2,2,1,3]))}function vr(r,e,t,n,o,a,i){Fl(t,n);var s=Nl(r,e),u=r.TEXTURE_2D;return J(r,e,function(){return r.bindTexture(u,s)}),J(r,e,function(){return r.texParameteri(u,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE)}),J(r,e,function(){return r.texParameteri(u,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}),J(r,e,function(){return r.texParameteri(u,r.TEXTURE_MIN_FILTER,r.NEAREST)}),J(r,e,function(){return r.texParameteri(u,r.TEXTURE_MAG_FILTER,r.NEAREST)}),J(r,e,function(){return r.texImage2D(u,0,o,t,n,0,a,i,null)}),J(r,e,function(){return r.bindTexture(r.TEXTURE_2D,null)}),s}function Pf(r,e,t,n,o){var a=io(t,n);return vr(r,e,a[0],a[1],o.internalFormatFloat,o.textureFormatFloat,r.FLOAT)}function Mf(r,e,t,n,o){var a=io(t,n);return vr(r,e,a[0],a[1],o.internalFormatHalfFloat,o.textureFormatFloat,o.textureTypeHalfFloat)}function Of(r,e,t,n,o){var a=io(t,n);return vr(r,e,a[0],a[1],r.RGBA,r.RGBA,r.UNSIGNED_BYTE)}function Bf(r,e,t,n,o){var a=dr(t,n);return vr(r,e,a[0],a[1],o.internalFormatPackedFloat,r.RGBA,r.FLOAT)}function Lf(r,e,t,n,o){var a=dr(t,n);return vr(r,e,a[0],a[1],o.internalFormatPackedHalfFloat,r.RGBA,o.textureTypeHalfFloat)}function Wf(r,e,t,n){return J(r,e,function(){return r.bindBuffer(r.ARRAY_BUFFER,n)}),Mi(r,e,t,"clipSpacePos",n,3,20,0)&&Mi(r,e,t,"uv",n,2,20,12)}function Uf(r,e,t,n,o,a,i){var s,u,c;J(r,e,function(){return r.bindTexture(r.TEXTURE_2D,t)}),a instanceof Uint8Array?(s=new Uint8Array(n*o*4),u=r.UNSIGNED_BYTE,c=r.RGBA):(s=new Float32Array(n*o*4),u=r.FLOAT,c=i.internalFormatPackedFloat),s.set(a),J(r,e,function(){return r.texImage2D(r.TEXTURE_2D,0,c,n,o,0,r.RGBA,u,s)}),J(r,e,function(){return r.bindTexture(r.TEXTURE_2D,null)})}function zf(r,e,t,n){J(r,e,function(){return r.bindTexture(r.TEXTURE_2D,t)}),n.data instanceof Uint8Array?J(r,e,function(){return r.texImage2D(r.TEXTURE_2D,0,r.RGBA,n.width,n.height,0,r.RGBA,r.UNSIGNED_BYTE,n.data)}):J(r,e,function(){return r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,n)}),J(r,e,function(){return r.bindTexture(r.TEXTURE_2D,null)})}function Vf(r,e,t,n,o){var a=r.createBuffer();J(r,e,function(){return r.bindBuffer(r.PIXEL_PACK_BUFFER,a)});var i=16*t*n;return J(r,e,function(){return r.bufferData(r.PIXEL_PACK_BUFFER,i,r.STREAM_READ)}),J(r,e,function(){return r.readPixels(0,0,n,t,r.RGBA,r.FLOAT,0)}),J(r,e,function(){return r.bindBuffer(r.PIXEL_PACK_BUFFER,null)}),a}function Gf(r,e,t){var n=r,o=new Float32Array(t);return n.bindBuffer(n.PIXEL_PACK_BUFFER,e),n.getBufferSubData(n.PIXEL_PACK_BUFFER,0,o),n.bindBuffer(n.PIXEL_PACK_BUFFER,null),o}function Hf(r,e,t,n,o){var a=io(t,n),i=a[0],s=a[1],u=new Uint8Array(t*n*4);return J(r,e,function(){return r.readPixels(0,0,i,s,o.downloadTextureFormat,r.UNSIGNED_BYTE,u)}),new Float32Array(u.buffer)}function qf(r,e,t,n,o,a,i,s){var u=r,c=new Float32Array(function(l,h){var f=dr(l,h);return f[0]*f[1]*4}(a,i));return u.bindBuffer(u.PIXEL_PACK_BUFFER,e),u.getBufferSubData(u.PIXEL_PACK_BUFFER,0,c),u.bindBuffer(u.PIXEL_PACK_BUFFER,null),c}function jf(r,e,t,n){var o=new Float32Array(t*n*4);return J(r,e,function(){return r.readPixels(0,0,n,t,r.RGBA,r.FLOAT,o)}),o}var Kf=function(){function r(e){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];var t=M().getNumber("WEBGL_VERSION");e!=null?(this.gl=e,bl(t,e)):this.gl=Pe(t);var n="WEBGL_color_buffer_float";if(M().getNumber("WEBGL_VERSION")===1){if(this.textureFloatExtension=Cr(this.gl,this.debug,"OES_texture_float"),pe(this.gl,"OES_texture_half_float"))this.textureHalfFloatExtension=Cr(this.gl,this.debug,"OES_texture_half_float");else if(M().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(n),pe(this.gl,"EXT_color_buffer_half_float"))this.colorBufferHalfFloatExtension=Cr(this.gl,this.debug,"EXT_color_buffer_half_float");else if(M().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(n="EXT_color_buffer_float",pe(this.gl,n))this.colorBufferFloatExtension=this.gl.getExtension(n);else{if(!pe(this.gl,"EXT_color_buffer_half_float"))throw new Error("GL context does not support color renderable floats");this.colorBufferHalfFloatExtension=this.gl.getExtension("EXT_color_buffer_half_float")}this.vertexBuffer=Nf(this.gl,this.debug),this.indexBuffer=Ff(this.gl,this.debug),this.framebuffer=Pl(this.gl,this.debug),this.textureConfig=Ia(this.gl,this.textureHalfFloatExtension)}return Object.defineProperty(r.prototype,"debug",{get:function(){return M().getBool("DEBUG")},enumerable:!0,configurable:!0}),r.prototype.dispose=function(){var e=this;if(!this.disposed){this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");var t=this.gl;J(t,this.debug,function(){return t.finish()}),J(t,this.debug,function(){return t.bindFramebuffer(t.FRAMEBUFFER,null)}),J(t,this.debug,function(){return t.deleteFramebuffer(e.framebuffer)}),J(t,this.debug,function(){return t.bindBuffer(t.ARRAY_BUFFER,null)}),J(t,this.debug,function(){return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)}),J(t,this.debug,function(){return t.deleteBuffer(e.indexBuffer)}),this.disposed=!0}},r.prototype.createFloat32MatrixTexture=function(e,t){return this.throwIfDisposed(),Pf(this.gl,this.debug,e,t,this.textureConfig)},r.prototype.createFloat16MatrixTexture=function(e,t){return this.throwIfDisposed(),Mf(this.gl,this.debug,e,t,this.textureConfig)},r.prototype.createUnsignedBytesMatrixTexture=function(e,t){return this.throwIfDisposed(),Of(this.gl,this.debug,e,t,this.textureConfig)},r.prototype.uploadPixelDataToTexture=function(e,t){this.throwIfDisposed(),zf(this.gl,this.debug,e,t)},r.prototype.uploadDenseMatrixToTexture=function(e,t,n,o){this.throwIfDisposed(),Uf(this.gl,this.debug,e,t,n,o,this.textureConfig)},r.prototype.createFloat16PackedMatrixTexture=function(e,t){return this.throwIfDisposed(),Lf(this.gl,this.debug,e,t,this.textureConfig)},r.prototype.createPackedMatrixTexture=function(e,t){return this.throwIfDisposed(),Bf(this.gl,this.debug,e,t,this.textureConfig)},r.prototype.deleteMatrixTexture=function(e){var t=this;this.throwIfDisposed(),this.outputTexture===e&&(Oi(this.gl,this.debug,this.framebuffer),this.outputTexture=null),J(this.gl,this.debug,function(){return t.gl.deleteTexture(e)})},r.prototype.downloadByteEncodedFloatMatrixFromOutputTexture=function(e,t,n){var o=this;return this.downloadMatrixDriver(e,function(){return Hf(o.gl,o.debug,t,n,o.textureConfig)})},r.prototype.downloadPackedMatrixFromBuffer=function(e,t,n,o,a,i){return qf(this.gl,e,0,0,0,a,i,this.textureConfig)},r.prototype.downloadFloat32MatrixFromBuffer=function(e,t){return Gf(this.gl,e,t)},r.prototype.createBufferFromTexture=function(e,t,n){this.bindTextureToFrameBuffer(e);var o=Vf(this.gl,this.debug,t,n,this.textureConfig);return this.unbindTextureToFrameBuffer(),o},r.prototype.createAndWaitForFence=function(){var e=this.createFence(this.gl);return this.pollFence(e)},r.prototype.createFence=function(e){var t,n,o=this;if(M().getBool("WEBGL_FENCE_API_ENABLED")){var a=e,i=a.fenceSync(a.SYNC_GPU_COMMANDS_COMPLETE,0);e.flush(),n=function(){var s=a.clientWaitSync(i,0,0);return s===a.ALREADY_SIGNALED||s===a.CONDITION_SATISFIED},t=i}else M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(t=this.beginQuery(),this.endQuery(),n=function(){return o.isQueryAvailable(t,M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}):n=function(){return!0};return{query:t,isFencePassed:n}},r.prototype.downloadMatrixFromPackedTexture=function(e,t,n){var o=this;return this.downloadMatrixDriver(e,function(){return jf(o.gl,o.debug,t,n)})},r.prototype.createProgram=function(e){this.throwIfDisposed();var t=this.gl,n=Il(t,this.debug,e),o=Tf(t,this.debug),a=Sl(t,this.debug);return J(t,this.debug,function(){return t.attachShader(a,o)}),J(t,this.debug,function(){return t.attachShader(a,n)}),Dl(t,this.debug,a),this.debug&&Mo(t,this.debug,a),this.vertexAttrsAreBound||(this.setProgram(a),this.vertexAttrsAreBound=Wf(t,this.debug,this.program,this.vertexBuffer)),a},r.prototype.deleteProgram=function(e){var t=this;this.throwIfDisposed(),e===this.program&&(this.program=null),e!=null&&J(this.gl,this.debug,function(){return t.gl.deleteProgram(e)})},r.prototype.setProgram=function(e){var t=this;this.throwIfDisposed(),this.program=e,this.program!=null&&this.debug&&Mo(this.gl,this.debug,this.program),J(this.gl,this.debug,function(){return t.gl.useProgram(e)})},r.prototype.getUniformLocation=function(e,t,n){return n===void 0&&(n=!0),this.throwIfDisposed(),n?Ol(this.gl,this.debug,e,t):Bl(this.gl,e,t)},r.prototype.getAttributeLocation=function(e,t){var n=this;return this.throwIfDisposed(),J(this.gl,this.debug,function(){return n.gl.getAttribLocation(e,t)})},r.prototype.getUniformLocationNoThrow=function(e,t){return this.throwIfDisposed(),this.gl.getUniformLocation(e,t)},r.prototype.setInputMatrixTexture=function(e,t,n){this.throwIfDisposed(),this.throwIfNoProgram(),Ll(this.gl,this.debug,this.program,e,t,n)},r.prototype.setOutputMatrixTexture=function(e,t,n){this.setOutputMatrixTextureDriver(e,n,t)},r.prototype.setOutputPackedMatrixTexture=function(e,t,n){this.throwIfDisposed();var o=dr(t,n),a=o[0],i=o[1];this.setOutputMatrixTextureDriver(e,a,i)},r.prototype.setOutputMatrixWriteRegion=function(e,t,n,o){this.setOutputMatrixWriteRegionDriver(n,e,o,t)},r.prototype.setOutputPackedMatrixWriteRegion=function(e,t,n,o){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")},r.prototype.debugValidate=function(){this.program!=null&&Mo(this.gl,this.debug,this.program),_r(this.gl)},r.prototype.executeProgram=function(){this.throwIfDisposed(),this.throwIfNoProgram();var e=this.gl;this.debug&&this.debugValidate(),J(e,this.debug,function(){return e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)})},r.prototype.blockUntilAllProgramsCompleted=function(){var e=this;this.throwIfDisposed(),J(this.gl,this.debug,function(){return e.gl.finish()})},r.prototype.getQueryTimerExtension=function(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=Cr(this.gl,this.debug,M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension},r.prototype.getQueryTimerExtensionWebGL2=function(){return this.getQueryTimerExtension()},r.prototype.getQueryTimerExtensionWebGL1=function(){return this.getQueryTimerExtension()},r.prototype.beginQuery=function(){if(M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){var e=this.gl,t=this.getQueryTimerExtensionWebGL2(),n=e.createQuery();return e.beginQuery(t.TIME_ELAPSED_EXT,n),n}var o=this.getQueryTimerExtensionWebGL1(),a=o.createQueryEXT();return o.beginQueryEXT(o.TIME_ELAPSED_EXT,a),a},r.prototype.endQuery=function(){if(M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")!==2){var e=this.getQueryTimerExtensionWebGL1();e.endQueryEXT(e.TIME_ELAPSED_EXT)}else{var t=this.gl,n=this.getQueryTimerExtensionWebGL2();t.endQuery(n.TIME_ELAPSED_EXT)}},r.prototype.waitForQueryAndGetTime=function(e){return X(this,void 0,void 0,function(){var t=this;return Y(this,function(n){switch(n.label){case 0:return[4,Di(function(){return t.disposed||t.isQueryAvailable(e,M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))})];case 1:return n.sent(),[2,this.getQueryTime(e,M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))]}})})},r.prototype.getQueryTime=function(e,t){if(t===0)return null;if(t===2){var n=this.gl;return n.getQueryParameter(e,n.QUERY_RESULT)/1e6}var o=this.getQueryTimerExtensionWebGL1();return o.getQueryObjectEXT(e,o.QUERY_RESULT_EXT)/1e6},r.prototype.isQueryAvailable=function(e,t){if(t===0)return!0;if(t===2){var n=this.gl,o=this.getQueryTimerExtensionWebGL2(),a=n.getQueryParameter(e,n.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),a&&!this.disjoint}return a=(o=this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(e,o.QUERY_RESULT_AVAILABLE_EXT),this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),a&&!this.disjoint},r.prototype.pollFence=function(e){var t=this;return new Promise(function(n){t.addItemToPoll(function(){return e.isFencePassed()},function(){return n()})})},r.prototype.pollItems=function(){for(var e=function(n){for(var o=0;o<n.length&&n[o]();++o);return o-1}(this.itemsToPoll.map(function(n){return n.isDoneFn})),t=0;t<=e;++t)(0,this.itemsToPoll[t].resolveFn)();this.itemsToPoll=this.itemsToPoll.slice(e+1)},r.prototype.addItemToPoll=function(e,t){var n=this;this.itemsToPoll.push({isDoneFn:e,resolveFn:t}),this.itemsToPoll.length>1||Di(function(){return n.pollItems(),n.itemsToPoll.length===0})},r.prototype.bindTextureToFrameBuffer=function(e){this.throwIfDisposed(),Oo(this.gl,this.debug,e,this.framebuffer),this.debug&&_r(this.gl)},r.prototype.unbindTextureToFrameBuffer=function(){this.outputTexture!=null?(Oo(this.gl,this.debug,this.outputTexture,this.framebuffer),this.debug&&_r(this.gl)):Oi(this.gl,this.debug,this.framebuffer)},r.prototype.downloadMatrixDriver=function(e,t){this.bindTextureToFrameBuffer(e);var n=t();return this.unbindTextureToFrameBuffer(),n},r.prototype.setOutputMatrixTextureDriver=function(e,t,n){this.throwIfDisposed();var o=this.gl;Oo(o,this.debug,e,this.framebuffer),this.debug&&_r(o),this.outputTexture=e,J(o,this.debug,function(){return o.viewport(0,0,t,n)}),J(o,this.debug,function(){return o.scissor(0,0,t,n)})},r.prototype.setOutputMatrixWriteRegionDriver=function(e,t,n,o){var a=this;this.throwIfDisposed(),J(this.gl,this.debug,function(){return a.gl.scissor(e,t,n,o)})},r.prototype.throwIfDisposed=function(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")},r.prototype.throwIfNoProgram=function(){if(this.program==null)throw new Error("No GPU program is currently set.")},r}();function Yi(r,e){if(r.length!==e.length)throw Error("Binary was compiled with "+r.length+" inputs, but was executed with "+e.length+" inputs");r.forEach(function(t,n){var o=t.logicalShape,a=e[n],i=a.shape;if(!Wt(o,i))throw Error("Binary was compiled with different shapes than the current args. Shapes "+o+" and "+i+" must match");if(!t.isUniform||!a.isUniform){var s=t.texShape,u=a.isUniform?null:a.texData.texShape;if(!Wt(s,u))throw Error("Binary was compiled with different texture shapes than the current args. Shape "+s+" and "+u+" must match")}})}var Xf=function(r,e,t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r;for(var n=t.filterWidth,o=t.inChannels,a=t.strideWidth,i=t.strideHeight,s=t.padInfo,u=t.outWidth,c=t.dilationWidth,l=t.dilationHeight,h=t.dataFormat,f=s.left,p=s.top,d=o*n,m=jt(),v=h==="channelsLast",g=v?0:1,x=v?1:2,b="",y=0;y<=1;y++)for(var w=0;w<=1;w++)b+=`
          blockIndex = rc.y + `+w+`;
          pos = rc.x + `+y+`;

          if(blockIndex < `+r[1]+" && pos < "+r[0]+`) {
            offsetY = int(blockIndex / (`+u+")) * "+i+" - "+p+`;
            d0 = offsetY + `+l+" * (pos / "+d+`);

            if(d0 < `+e[g]+` && d0 >= 0) {

              offsetX = int(mod(float(blockIndex), `+u+".) * "+a+". - "+f+`.);
              d1 = offsetX + `+c+" * (int(mod(float(pos), "+d+".) / "+o+`.));

              if(d1 < `+e[x]+` && d1 >= 0) {

                ch = int(mod(float(pos), `+o+`.));

                if (`+v+`) {
                  innerDims = vec2(d1, ch);
                  result[`+(2*y+w)+`] = getChannel(
                    getA(d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[`+(2*y+w)+`] = getChannel(
                    getA(ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec2 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        `+b+`

        `+m.output+` = result;
      }
    `},Yf=function(r,e,t,n,o){this.variableNames=["x"],this.outputShape=[];var a,i=e,s=r[3]-1;this.outputShape=r;var u="float("+t+") + float("+n+") * sum";a=o===.5?"inversesqrt("+u+")":o===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+o+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -`+i+"; j <= "+i+`; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  `+s+`) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * `+a+`;
        setOutput(val);
      }
    `},$f=function(r,e,t,n,o){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=r,this.depth=r[3],this.depthRadius=e,this.bias=t,this.alpha=n,this.beta=o,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < `+this.depth+`; ++d) {
          int depthBegin = int(max(0.0, float(d - `+e+`)));
          int depthEnd = int(min(float(`+this.depth+`),
              float(d + `+e+` + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = `+this.depth+`;

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(`+n+") * norm + float("+t+`);

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(`+n+`)
                * float(`+o+`)
                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * `+o+`);
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `},Jf=function(r,e,t,n,o){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;var a,i=e,s=r[3]-1;this.outputShape=r;var u="float("+t+") + float("+n+") * sum";a=o===.5?"inversesqrt("+u+")":o===1?"1.0/("+u+")":"exp(log("+u+") * float(-"+o+"));",this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < `+this.outputShape[3]+`;
        bool hasNextRow = c < `+this.outputShape[2]+`;

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - `+i+`;
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - `+i+"; j <= "+i+`; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(`+s+`));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * `+a+`;
        setOutput(result);
      }
    `},Qf=function(r){this.variableNames=["dy","maxPos"],this.outputShape=r.inShape;var e=r.strideHeight,t=r.strideWidth,n=r.dilationHeight,o=r.effectiveFilterHeight,a=r.effectiveFilterWidth,i=o-1-r.padInfo.top,s=a-1-r.padInfo.left,u=o*a-1;this.userCode=`
      const ivec2 pads = ivec2(`+i+", "+s+`);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < `+o+`;
          wR += `+n+`) {
          float dyR = float(dyRCorner + wR) / `+e+`.0;

          if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < `+a+`; wC++) {
            float dyC = float(dyCCorner + wC) / `+t+`.0;

            if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = `+u+` - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * `+a+` + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `},Zf=function(r){this.variableNames=["dy","maxPos"],this.outputShape=r.inShape;var e=r.strideDepth,t=r.strideHeight,n=r.strideWidth,o=r.dilationDepth,a=r.dilationHeight,i=r.dilationWidth,s=r.effectiveFilterDepth,u=r.effectiveFilterHeight,c=r.effectiveFilterWidth,l=s-1-r.padInfo.front,h=u-1-r.padInfo.top,f=c-1-r.padInfo.left,p=s*u*c-1;this.userCode=`
      const ivec3 pads = ivec3(`+l+", "+h+", "+f+`);

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < `+s+`;
           wD += `+o+`) {
          float dyD = float(dyDCorner + wD) / `+e+`.0;

          if (dyD < 0.0 || dyD >= `+r.outDepth+`.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < `+u+`;
              wR += `+a+`) {
            float dyR = float(dyRCorner + wR) / `+t+`.0;

            if (dyR < 0.0 || dyR >= `+r.outHeight+`.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < `+c+`;
                wC += `+i+`) {
              float dyC = float(dyCCorner + wC) / `+n+`.0;

              if (dyC < 0.0 || dyC >= `+r.outWidth+`.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = `+p+` -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * `+u+" * "+c+` +
                  wR * `+c+` + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `},zo=function(r,e,t,n,o,a,i){t===void 0&&(t=!1),n===void 0&&(n=!1),o===void 0&&(o=!1),a===void 0&&(a=null),i===void 0&&(i=!1),this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e;var s=t?r[1]:r[2],u=Math.ceil(s/2),c=t?"i * 2, rc.y":"rc.y, i * 2",l=n?"rc.z, i * 2":"i * 2, rc.z",h=t?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],f=n?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],p="",d="";a&&(p=i?`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          `+a+`
        }`:`vec4 activation(vec4 x) {
          `+a+`
        }`,d="result = activation(result);");var m=o?"result += getBiasAtOutCoords();":"";o&&this.variableNames.push("bias"),i&&this.variableNames.push("preluActivationWeights"),this.userCode=`
      `+p+`

      const float sharedDimension = `+u+`.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        for (int i = 0; i < `+u+`; i++) {
          vec4 a = getMatrixA(rc.x, `+c+`);
          vec4 b = getMatrixB(rc.x, `+l+`);

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (`+h[0]+" * "+f[0]+`);
          result += (`+h[1]+" * "+f[1]+`);
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        `+m+`

        `+d+`

        setOutput(result);
      }
    `},tp=function(){function r(e,t,n){this.variableNames=["probs"],this.outputShape=[e,n],this.userCode=`
      uniform float seed;

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < `+(t-1)+`; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(`+(t-1)+`));
      }
    `}return r.prototype.getCustomSetupFunc=function(e){var t=this;return function(n,o){t.seedLoc==null&&(t.seedLoc=n.getUniformLocation(o,"seed")),n.gl.uniform1f(t.seedLoc,e)}},r}(),ep=function(r,e,t,n){this.variableNames=["indices"],this.outputShape=[r,e],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(`+n+"), float("+t+`),
                      float(index == coords.y)));
      }
    `},np=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=r;var e=r.length;if(e===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{var t=Qt("rc",e),n=bt(e),o=function(s,u,c){if(s===1)return"rc > "+u[0];for(var l="",h=s-2;h<s;h++)l+=c[h]+" >= "+u[h],h<s-1&&(l+="||");return l}(e,r,t),a=function(s,u,c,l){if(s===1)return"";var h=l.slice(-2);return`
    int r = `+h[0]+`;
    int c = `+h[1]+`;
    int rp1 = r + 1;
    int cp1 = c + 1;

    bool cEdge = cp1 >= `+u+`;
    bool rEdge = rp1 >= `+c+`;
  `}(e,r[r.length-1],r[r.length-2],t),i=function(s,u){var c=s.length,l=function(h,f){for(var p=[],d=0;d<=1;d++)for(var m=0;m<=1;m++){for(var v=(d===0?"r":"rp1")+", "+(m===0?"c":"cp1"),g=2;g<h;g++)v=f[f.length-1-g]+","+v;p.push(v)}return p}(c,u);return c===1?`getA(rc),
            rc + 1 >= `+s[0]+` ? 0. : getA(rc + 1),
            0, 0`:"getA("+l[0]+`),
          cEdge ? 0. : getA(`+l[1]+`),
          rEdge ? 0. : getA(`+l[2]+`),
          rEdge || cEdge ? 0. : getA(`+l[3]+")"}(r,t);this.userCode=`
        void main() {
          `+n+` rc = getOutputCoords();

          if(`+o+`) {
            setOutput(vec4(0));
          } else {
            `+a+`

            setOutput(vec4(`+i+`));
          }
        }
      `}},rp=function(r,e,t){this.variableNames=["x"],this.outputShape=e.map(function(u,c){return u[0]+r[c]+u[1]});var n=r.length,o=bt(n),a=e.map(function(u){return u[0]}).join(","),i=e.map(function(u,c){return u[0]+r[c]}).join(","),s=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);this.userCode=n!==1?`
      `+o+" start = "+o+"("+a+`);
      `+o+" end = "+o+"("+i+`);

      void main() {
        `+o+` outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(float(`+t+`));
        } else {
          `+o+` coords = outC - start;
          setOutput(getX(`+s+`));
        }
      }
    `:`
        int start = `+a+`;
        int end = `+i+`;

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(float(`+t+`));
          } else {
            setOutput(getX(outC - start));
          }
        }
      `},op=function(r,e,t){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.map(function(v,g){return v[0]+r[g]+v[1]});for(var n=r.length,o=bt(n),a=e.map(function(v){return v[0]}).join(","),i=e.map(function(v,g){return v[0]+r[g]}).join(","),s=Qt("rc",n),u=Qt("source",n),c=s[n-1]+" < "+this.outputShape[n-1],l=n===1?"source":"vec2("+u.slice(-2).join()+")",h=[o+" rc = outputLoc;",s[n-1]+` += 1;
       if(`+c+`) {
      `,n===1?"":`}
       rc = outputLoc;
       `+s[n-2]+` += 1;
       if(`+s[n-2]+" < "+this.outputShape[n-2]+") {",n===1?"":"  "+s[n-1]+` += 1;
         if(`+c+") {"],f=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",p="",d=0,m=n===1?2:4;d<m;d++)p+=`
        `+h[d]+`
        if (`+f+`) {
          result[`+d+"] = float("+t+`);
        } else {
          `+o+` source = rc - start;
          result[`+d+"] = getChannel(getX("+u.join()+"), "+l+`);
        }
      `;p+=n===1?"} ":"}}",this.userCode=`
      const `+o+" start = "+o+"("+a+`);
      const `+o+" end = "+o+"("+i+`);

      void main() {
        `+o+` outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        `+p+`
        setOutput(result);
      }
    `},Vo=function(r,e,t){if(this.variableNames=["x"],e==="avg"&&t)throw new Error("Cannot compute positions for average pool.");var n=r.filterWidth,o=r.strideHeight,a=r.strideWidth,i=r.dilationHeight,s=r.dilationWidth,u=r.effectiveFilterHeight,c=r.effectiveFilterWidth,l=r.padInfo.top,h=r.padInfo.left;this.outputShape=r.outShape;var f=e==="avg",p="0.0";if(f||(p="-1.0 / 1e-20"),t)this.userCode=`
        const ivec2 strides = ivec2(`+o+", "+a+`);
        const ivec2 pads = ivec2(`+l+", "+h+`);

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < `+u+`;
              wR += `+i+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+c+`;
                wC += `+s+`) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= `+r.inWidth+`) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = wR * `+c+` + wC;
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var d=e+"("+e+"("+e+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";e==="avg"&&(d="avgValue / count");var m=4*Math.floor(n/4),v=n%4,g=`
      if (`+f+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(`+o+", "+a+`);
      const ivec2 pads = ivec2(`+l+", "+h+`);
      const float initializationValue = `+p+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= `+r.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+p+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < `+u+`;
            wR += `+i+`) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= `+r.inHeight+`) {
            continue;
          }

          for (int wC = 0; wC < `+m+`; wC += 4) {
            int xC = xCCorner + wC * `+s+`;

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              getValue(batch, xR, xC + 3 * `+s+`, d)
            );

            `+g+`
          }

          int xC = xCCorner + `+m+`;
          if (`+(v===1)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(v===2)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              initializationValue,
              initializationValue
            );

            `+g+`
          } else if (`+(v===3)+`) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + `+s+`, d),
              getValue(batch, xR, xC + 2 * `+s+`, d),
              initializationValue
            );

            `+g+`
          }
        }
        setOutput(`+d+`);
      }
    `}},Go=function(r,e,t){if(this.variableNames=["x"],e==="avg"&&t)throw new Error("Cannot compute positions for average pool.");var n=r.filterWidth,o=r.strideDepth,a=r.strideHeight,i=r.strideWidth,s=r.dilationDepth,u=r.dilationHeight,c=r.dilationWidth,l=r.effectiveFilterDepth,h=r.effectiveFilterHeight,f=r.effectiveFilterWidth,p=r.padInfo.front,d=r.padInfo.top,m=r.padInfo.left;this.outputShape=r.outShape;var v=e==="avg",g="0.0";if(v||(g="-1.0 / 1e-20"),t)this.userCode=`
        const ivec3 strides =
            ivec3(`+o+", "+a+", "+i+`);
        const ivec3 pads = ivec3(`+p+", "+d+", "+m+`);

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < `+l+`;
              wD += `+s+`) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= `+r.inDepth+`) {
              continue;
            }

            for (int wR = 0; wR < `+h+`;
                wR += `+u+`) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= `+r.inHeight+`) {
                continue;
              }

              for (int wC = 0; wC < `+f+`;
                  wC += `+c+`) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= `+r.inWidth+`) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition =
                      wD * `+h+" * "+f+` +
                      wR * `+f+` + wC;;
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;else{var x=e+"("+e+"("+e+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";e==="avg"&&(x="avgValue / count");var b=4*Math.floor(n/4),y=n%4,w=`
      if (`+v+`) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = max(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(`+o+", "+a+", "+i+`);
      const ivec3 pads = ivec3(`+p+", "+d+", "+m+`);
      const float initializationValue = `+g+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= `+r.inWidth+`) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(`+g+`);
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < `+l+`;
            wD += `+s+`) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= `+r.inDepth+`) {
            continue;
          }

          for (int wR = 0; wR < `+h+`;
            wR += `+u+`) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= `+r.inHeight+`) {
              continue;
            }

            for (int wC = 0; wC < `+b+`; wC += 4) {
              int xC = xCCorner + wC * `+c+`;

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                getValue(batch, xD, xR, xC + 3 * `+c+`, ch)
              );

              `+w+`
            }

            int xC = xCCorner + `+b+`;
            if (`+(y===1)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(y===2)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                initializationValue,
                initializationValue
              );

              `+w+`
            } else if (`+(y===3)+`) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + `+c+`, ch),
                getValue(batch, xD, xR, xC + 2 * `+c+`, ch),
                initializationValue
              );

              `+w+`
            }
          }
          setOutput(`+x+`);
        }
      }
    `}},ap=function(r,e){this.variableNames=["x"];var t=r.windowSize,n=r.batchSize,o=r.inSize,a=Math.ceil(o/t);this.outputShape=[n,a];var i="0.0",s="";e==="prod"?i="1.0":e==="min"?(i="1.0 / 1e-20",s="min"):e==="max"&&(i="-1.0 / 1e-20",s="max");var u=e+"("+e+"("+e+"(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";e==="sum"?u="sumValue":e==="prod"?u="prodValue":e==="all"?u="allValue":e==="any"&&(u="anyValue");var c=4*Math.floor(t/4),l=t%4,h=`
      if (`+(e==="sum")+`) {
        sumValue += dot(values, ones);
      } else if (`+(e==="prod")+`) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = `+s+`(values, minMaxValue);
      }
    `,f="vec4";e==="all"?(i="1.0",h=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,f="bvec4"):e==="any"&&(i="0.0",h=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,f="bvec4");var p="";o%t>0&&(p=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = `+i+`;
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        `+p+`
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * `+t+`;

        vec4 minMaxValue = vec4(`+i+`);
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < `+c+`; i += 4) {
          int inIdx = inOffset + i;
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          `+h+`
        }

        int inIdx = inOffset + `+c+`;
        if (`+(l===1)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l===2)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          `+h+`
        } else if (`+(l===3)+`) {
          `+f+" values = "+f+`(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          `+h+`
        }
        setOutput(`+u+`);
      }
    `},ip=function(r,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r;for(var t="",n=0;n<4;n++){var o="thisRC = rc;";n%2==1&&(o+="thisRC.z += 1;"),n>1&&(o+="thisRC.y += 1;"),t+=`
        `+o+`
        `+(n>0?"if(thisRC.y < rows && thisRC.z < cols){":"")+`
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[`+n+`] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        `+(n>0?"}":"")+`
      `}this.userCode=`
      
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      `+vn(["r","c","d"],e)+`
      return ivec3(r, c, d);
    }
  
      `+Oa(r)+`

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = `+r[1]+`;
        int cols = `+r[2]+`;

        `+t+`

        setOutput(result);
      }
    `},sp=function(r,e,t){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e.shape;var n=e.shape,o=n[1],a=n[2],i=r.shape,s=i[1],u=i[2],c=[t&&s>1?o-1:o,t&&u>1?a-1:a],l=[t&&s>1?s-1:s,t&&u>1?u-1:u],h=c[0]/l[0],f=c[1]/l[1],p=1/h,d=1/f,m=2*Math.ceil(p)+2,v=2*Math.ceil(d)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+f+`);

        const float invHeightScale = float(`+p+`);
        const float invWidthScale = float(`+d+`);

        const int winHeight = int(`+m+`);
        const int winWidth = int(`+v+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), `+(o-1)+`.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), `+(a-1)+`.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},up=function(r,e,t,n){this.variableNames=["A"],this.outputShape=[];var o=r[0],a=r[1],i=r[2],s=r[3];this.outputShape=[o,e,t,s];var u=[n&&e>1?a-1:a,n&&t>1?i-1:i],c=[n&&e>1?e-1:e,n&&t>1?t-1:t];this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+a+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `},cp=function(r,e,t,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];var o=r[0],a=r[1],i=r[2],s=r[3];this.outputShape=[o,e,t,s];var u=[n&&e>1?a-1:a,n&&t>1?i-1:i],c=[n&&e>1?e-1:e,n&&t>1?t-1:t];this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`,
          `+u[1]/c[1]+`);
      const vec3 inputShapeRC = vec3(`+a+".0, "+i+`.0,
                                     `+i+`.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = vec3(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(sourceFracIndexRC);
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < `+(s-1)+`;
        bool hasNextRow = coords.z < `+(t-1)+`;

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `},lp=function(r,e,t){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e.shape;var n=e.shape,o=n[1],a=n[2],i=r.shape,s=i[1],u=i[2],c=[t&&s>1?o-1:o,t&&u>1?a-1:a],l=[t&&s>1?s-1:s,t&&u>1?u-1:u],h=c[0]/l[0],f=c[1]/l[1],p=1/h,d=1/f,m=2*Math.ceil(p)+2,v=2*Math.ceil(d)+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(`+h+`);
        const float widthScale = float(`+f+`);

        const float invHeightScale = float(`+p+`);
        const float invWidthScale = float(`+d+`);

        const int winHeight = int(`+m+`);
        const int winWidth = int(`+v+`);

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= `+s+`) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= `+u+`) {
              continue;
            }

            float sourceFracRow =
              float(`+c[0]+`) *
                (float(dyR) / float(`+l[0]+`));

            float sourceFracCol =
                float(`+c[1]+`) *
                  (float(dyC) / float(`+l[1]+`));

            int sourceNearestRow = int(min(
                float(int(`+o+`) - 1),
                `+t+` ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(`+a+`) - 1),
                `+t+` ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `},hp=function(r,e,t,n){this.variableNames=["A"],this.outputShape=[];var o=r[0],a=r[1],i=r[2],s=r[3];this.outputShape=[o,e,t,s];var u=[n&&e>1?a-1:a,n&&t>1?i-1:i],c=[n&&e>1?e-1:e,n&&t>1?t-1:t],l=n?"0.5":"0.0";this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          `+u[0]/c[0]+`,
          `+u[1]/c[1]+`);
      const vec2 inputShapeRC = vec2(`+a+".0, "+i+`.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + `+l+`)));

        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `},fp=function(r,e){this.variableNames=["x"];var t=r.length;if(t>4)throw new Error("WebGL backend: Reverse of rank-"+t+" tensor is not yet supported");if(this.outputShape=r,t!==1){var n=r.map(function(a,i){return function(s){return e.indexOf(s)!==-1&&r[s]!==1?r[s]+" - coords["+s+"] - 1":"coords["+s+"]"}(i)}).join(","),o=bt(t);this.userCode=`
      void main() {
        `+o+` coords = getOutputCoords();
        setOutput(getX(`+n+`));
      }
    `}else this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(`+r[0]+` - coord - 1));
        }
      `},pp=function(r,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;var t=r.length;if(t>4)throw new Error("WebGL backend: Reverse of rank-"+t+" tensor is not yet supported");this.outputShape=r;var n=Qt("rc",t),o=n[t-1]+" + 1 < "+this.outputShape[t-1],a=n[t-2]+" + 1 < "+this.outputShape[t-2],i=bt(t);function s(u){var c=r.map(function(l,h){return function(f,p){return e.indexOf(f)!==-1&&r[f]!==1?r[f]+" - "+p[f]+" - 1":""+p[f]}(h,u)});return"getChannel(getX("+c.join(",")+"), vec2("+c.slice(-2).join(",")+"))"}this.userCode=t===1?`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(`+r[0]+` - rc - 1),
            `+r[0]+` - rc - 1);
          if(`+o+`){
              result.g = getChannel(getX(`+r[0]+` - (rc  + 1) - 1),
                `+r[0]+` - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:`
        void main() {
          `+i+` rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = `+function(u){return s(u)}(n.slice())+`;
          if(`+o+`){
            result.g = `+function(u){return u[t-1]="("+u[t-1]+" + 1)",s(u)}(n.slice())+`;
          }
          if(`+a+`) {
            result.b = `+function(u){return u[t-2]="("+u[t-2]+" + 1)",s(u)}(n.slice())+`;
            if(`+o+`) {
              result.a = `+function(u){return u[t-1]="("+u[t-1]+" + 1)",u[t-2]="("+u[t-2]+" + 1)",s(u)}(n.slice())+`;
            }
          }
          setOutput(result);
        }
    `},$i=function(r,e,t,n,o,a,i){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;var s=bt(o.length),u=bt(a.length),c="";t===1?c="i":t===2&&(c="i, j");var l="getIndices("+c+")",h="";n===1?h="i":n===2&&(h="i, coords[1]");var f="getUpdates("+h+")",p=e>1?"strides[j]":"strides";this.userCode=`
        `+s+" strides = "+s+"("+o+`);

        void main() {
          `+u+` coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < `+r+`; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < `+e+`; j++) {
              int index = round(`+l+`);
              flattenedIndex += index * `+p+`;
            }
            if (flattenedIndex == coords[0]) {
              sum += `+f+`;
              found = true;
            }
          }
          setOutput(mix(getDefaultValue(), sum, float(found)));
        }
      `},dp=function(r,e){this.variableNames=["x","segmentIds"];var t=r.windowSize,n=r.batchSize,o=r.inSize,a=r.numSegments,i=a*Math.ceil(o/t);this.outputShape=[n,i];var s=4*Math.floor(t/4),u=t%4,c=`
        sumValue += dot(values, segFilter);
    `,l="";o%t>0&&(l=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return initializationValue;
        }
      `);var h="";o%t>0&&(h=`
        if (inIdx < 0 || inIdx >= `+o+`) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = 0.0;

      float getValue(int batch, int inIdx) {
        `+l+`
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        `+h+`
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          `+a+")) * float("+t+`));
        int currentSeg = int(mod(float(outIdx), float(`+a+`)));

        float sumValue = 0.0;

        for (int i = 0; i < `+s+`; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          `+c+`
        }

        int inIdx = inOffset + `+s+`;
        if (`+(u===1)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          `+c+`
        } else if (`+(u===2)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          `+c+`
        } else if (`+(u===3)+`) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          `+c+`
        }
        setOutput(sumValue);
      }
    `},vp=function(r,e,t){var n,o;if(this.variableNames=["c","a","b"],this.outputShape=e,t>4)throw Error("Where for rank "+t+" is not yet supported");if(t===1)o="resRC",n="resRC";else{for(var a=["resRC.x","resRC.y","resRC.z","resRC.w"],i=[],s=[],u=0;u<e.length;u++)s.push(""+a[u]),u<r&&i.push(""+a[u]);n=i.join(),o=s.join()}var c=bt(t);this.userCode=`
      void main() {
        `+c+` resRC = getOutputCoords();
        float cVal = getC(`+n+`);
        if (cVal >= 1.0) {
          setOutput(getA(`+o+`));
        } else {
          setOutput(getB(`+o+`));
        }
      }
    `},mp=function(){function r(e){this.variableNames=["source"],this.outputShape=e,this.rank=e.length;var t,n=bt(this.rank),o="uniform int start["+this.rank+"];",a=function(i){if(i===1)return"sourceLoc";if(i<=6)return Ho.slice(0,i).map(function(s){return"sourceLoc."+s}).join(",");throw Error("Slicing for rank "+i+" is not yet supported")}(this.rank);t=`
        `+n+` sourceLoc;
        `+n+` coords = getOutputCoords();
        `+e.map(function(i,s){return"sourceLoc."+Ho[s]+" = start["+s+"] + coords."+Ho[s]+";"}).join(`
`)+`
      `,this.userCode=`
      `+o+`
      void main() {
        `+t+`
        setOutput(getSource(`+a+`));
      }
    `}return r.prototype.getCustomSetupFunc=function(e){var t=this;if(e.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+e.length+")");return function(n,o){t.startLoc==null&&(t.startLoc=n.getUniformLocationNoThrow(o,"start"),t.startLoc==null)||n.gl.uniform1iv(t.startLoc,e)}},r}(),Ho=["x","y","z","w","u","v"],gp=function(){function r(e){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e,this.rank=e.length;var t=bt(this.rank),n=Qt("coords",this.rank),o=Qt("sourceLoc",this.rank),a=this.rank===1?"sourceLoc":"vec2("+o.slice(-2).join()+")",i="getChannel(getSource("+o.join()+"), "+a+")",s=`
      result.x = `+i+`;
      if (++`+n[this.rank-1]+" < "+e[this.rank-1]+`) {
        ++`+o[this.rank-1]+`;
        result.y = `+i+`;
        --`+o[this.rank-1]+`;
      }
    `,u=this.rank===1?"":`
      --`+n[this.rank-1]+`;
      if (++`+n[this.rank-2]+" < "+e[this.rank-2]+`) {
        ++`+o[this.rank-2]+`;
        result.z = `+i+`;
        if (++`+n[this.rank-1]+" < "+e[this.rank-1]+`) {
          ++`+o[this.rank-1]+`;
          result.w = `+i+`;
        }
      }
    `,c=this.rank<=4?`sourceLoc = coords +
            `+t+"("+e.map(function(l,h){return"start["+h+"]"}).join()+");":e.map(function(l,h){return o[h]+" = "+n[h]+" + start["+h+"];"}).join(`
`);this.userCode=`
      uniform int start[`+this.rank+`];
      void main() {
        `+t+` coords = getOutputCoords();
        `+t+` sourceLoc;
        `+c+`
        vec4 result = vec4(0.);
        `+s+`
        `+u+`
        setOutput(result);
      }
    `}return r.prototype.getCustomSetupFunc=function(e){var t=this;if(e.length!==this.rank)throw Error("The rank ("+this.rank+") of the program must match the length of start ("+e.length+")");return function(n,o){t.startLoc==null&&(t.startLoc=n.getUniformLocationNoThrow(o,"start"),t.startLoc==null)||n.gl.uniform1iv(t.startLoc,e)}},r}(),yp=function(r,e,t){this.variableNames=["x"],this.outputShape=t;var n=t.length,o=bt(t.length),a=bt(t.length),i="";if(n===1)i="coords * strides + begin";else{var s=0;i=t.map(function(u,c){return s++,t.length===1?"coords * strides["+c+"] + begin["+c+"]":"coords["+(s-1)+"] * strides["+c+"] + begin["+c+"]"}).join(",")}this.userCode=`
      `+o+" begin = "+o+"("+r+`);
      `+o+" strides = "+o+"("+e+`);

      void main() {
        `+a+` coords = getOutputCoords();
        setOutput(getX(`+i+`));
      }
    `},xp=function(){function r(e){this.gpgpu=e,this.numUsedTextures=0,this.numFreeTextures=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}return r.prototype.acquireTexture=function(e,t,n){var o,a=Ji(t,n),i=Qi(e,a,n);if(i in this.freeTextures||(this.freeTextures[i]=[]),i in this.usedTextures||(this.usedTextures[i]=[]),this.freeTextures[i].length>0){this.numFreeTextures--,this.numUsedTextures++,this.log();var s=this.freeTextures[i].shift();return this.usedTextures[i].push(s),s}return this.numUsedTextures++,this.log(),a===ae.PACKED_2X2_FLOAT32?o=this.gpgpu.createPackedMatrixTexture(e[0],e[1]):a===ae.PACKED_2X2_FLOAT16?o=this.gpgpu.createFloat16PackedMatrixTexture(e[0],e[1]):a===ae.UNPACKED_FLOAT32?o=this.gpgpu.createFloat32MatrixTexture(e[0],e[1]):a===ae.UNPACKED_FLOAT16?o=this.gpgpu.createFloat16MatrixTexture(e[0],e[1]):a===ae.PACKED_4X1_UNSIGNED_BYTE&&(o=this.gpgpu.createUnsignedBytesMatrixTexture(e[0],e[1])),this.usedTextures[i].push(o),o},r.prototype.releaseTexture=function(e,t,n,o){if(this.freeTextures!=null){var a=Qi(t,Ji(n,o),o);a in this.freeTextures||(this.freeTextures[a]=[]),this.freeTextures[a].push(e),this.numFreeTextures++,this.numUsedTextures--;var i=this.usedTextures[a],s=i.indexOf(e);if(s<0)throw new Error("Cannot release a texture that was never provided by this texture manager");i.splice(s,1),this.log()}},r.prototype.log=function(){if(this.logEnabled){var e=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",this.numFreeTextures+" / "+this.numUsedTextures,"("+e+")")}},r.prototype.getNumUsedTextures=function(){return this.numUsedTextures},r.prototype.getNumFreeTextures=function(){return this.numFreeTextures},r.prototype.dispose=function(){var e=this;if(this.freeTextures!=null){for(var t in this.freeTextures)this.freeTextures[t].forEach(function(n){e.gpgpu.deleteMatrixTexture(n)});for(var t in this.usedTextures)this.usedTextures[t].forEach(function(o){e.gpgpu.deleteMatrixTexture(o)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0}},r}();function Ji(r,e){if(r===ie.UPLOAD)return ae.PACKED_2X2_FLOAT32;if(r===ie.RENDER||r==null)return function(t){return M().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?t?ae.PACKED_2X2_FLOAT32:ae.UNPACKED_FLOAT32:t?ae.PACKED_2X2_FLOAT16:ae.UNPACKED_FLOAT16}(e);if(r===ie.DOWNLOAD||r===ie.PIXELS)return ae.PACKED_4X1_UNSIGNED_BYTE;throw new Error("Unknown logical texture type "+r)}function Qi(r,e,t){return r[0]+"_"+r[1]+"_"+e+"_"+t}var bp=function(r,e){this.variableNames=["A"];for(var t=new Array(r.length),n=0;n<t.length;n++)t[n]=r[n]*e[n];this.outputShape=t,this.rank=t.length;var o=bt(this.rank),a=function(i){var s=i.length;if(s>5)throw Error("Tile for rank "+s+" is not yet supported");if(s===1)return"imod(resRC, "+i[0]+")";for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],c=[],l=0;l<i.length;l++)c.push("imod("+u[l]+", "+i[l]+")");return c.join()}(r);this.userCode=`
      void main() {
        `+o+` resRC = getOutputCoords();
        setOutput(getA(`+a+`));
      }
    `},wp=function(r,e){this.variableNames=["A"];for(var t=new Array(r.length),n=0;n<t.length;n++)t[n]=r[e[n]];this.outputShape=t,this.rank=t.length;var o=bt(this.rank),a=function(i){var s=i.length;if(s>6)throw Error("Transpose for rank "+s+" is not yet supported");for(var u=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],c=new Array(s),l=0;l<i.length;l++)c[i[l]]=u[l];return c.join()}(e);this.userCode=`
    void main() {
      `+o+` resRC = getOutputCoords();
      setOutput(getA(`+a+`));
    }
    `},Cp=function(r,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;for(var t=new Array(r.length),n=0;n<t.length;n++)t[n]=r[e[n]];if(this.outputShape=t,this.rank=t.length,this.rank>6)throw Error("Packed transpose for rank "+this.rank+" is not yet supported.");var o=bt(this.rank),a=fu("rc",this.rank),i=new Array(this.rank);for(n=0;n<e.length;n++)i[e[n]]=a[n];var s="vec2("+i.slice(-2).join()+")",u="++"+a[this.rank-1]+" < "+t[this.rank-1],c="getChannel(getA("+i.join()+"), "+s+")";this.userCode=`
    void main() {
      `+o+` rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = `+c+`;
      if(`+u+`) {
        result[1] = `+c+`;
      }
      --`+a[this.rank-1]+`;
      if(++`+a[this.rank-2]+" < "+t[this.rank-2]+`) {
        result[2] = `+c+`;
        if(`+u+`) {
          result[3] = `+c+`;
        }
      }
      setOutput(result);
    }
    `},Ba=1.7580993408473768,La=1.0507009873554805,at=function(r,e){this.variableNames=["A"],this.outputShape=r,this.userCode=`
      float unaryOperation(float x) {
        `+e+`
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `},xe="if (isnan(x)) return x;",_p="return x;",Zi="return abs(x);",gu=xe+`
  return (x < 0.0) ? 0.0 : x;
`,yu=xe+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,xu="return (x >= 0.0) ? x : (exp(x) - 1.0);",Ep=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = `+Ba+`;
  float scale = `+La+`;
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,ts="return -x;",es="return ceil(x);",ns="return floor(x);",rs="return exp(x);",os="return exp(x) - 1.0;",Rp=xe+`
  return sin(x);
`,Ip=xe+`
  return cos(x);
`,kp=xe+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,Sp=xe+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,Dp=xe+`
  return atan(x);
`,Ap=xe+"return log(x + sqrt(x * x + 1.0));",Tp=xe+`
  if (x < 1.0) return NAN;
  return log(x + sqrt(x * x - 1.0));`,Np=xe+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
  return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,kr="return x;",Fp="return x;",bu=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,wu=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Cu=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,Zn=function(r,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=r,this.userCode=`
      vec4 unaryOperation(vec4 x) {
        `+e+`
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `},Pp=function(r){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=r;var e=r.length,t=Qt("rc",e),n=bt(e),o=function(s,u){if(s===1)return"rc";for(var c="",l=0;l<s;l++)c+=u[l],l<s-1&&(c+=",");return c}(e,t),a=t.slice(-2),i=e<=1?"rc":"vec2("+a.join(",")+")";this.userCode=`
      void main() {
        `+n+` rc = getOutputCoords();
        vec4 packedInput = getA(`+o+`);

        setOutput(getChannel(packedInput, `+i+`));
      }
    `},Sr={};function Dr(r,e){if(e===void 0&&(e=!1),r==="linear")return e?Fp:_p;if(r==="relu")return e?bu:gu;if(r==="elu")return e?Cu:xu;if(r==="relu6")return e?wu:yu;if(r==="prelu")return e?mu:vu;throw new Error("Activation "+r+" has not been implemented for the WebGL backend.")}var Mp=600,Op=function(r){function e(t){var n,o=r.call(this)||this;if(o.pendingRead=new WeakMap,o.pendingDisposal=new WeakSet,o.dataRefCount=new WeakMap,o.numBytesInGPU=0,o.uploadWaitMs=0,o.downloadWaitMs=0,o.warnedAboutMemory=!1,o.pendingDeletes=0,o.disposed=!1,!M().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");if(t==null){var a=Pe(M().getNumber("WEBGL_VERSION"));o.binaryCache=((n=M().getNumber("WEBGL_VERSION"))in Sr||(Sr[n]={}),Sr[n]),o.gpgpu=new Kf(a),o.canvas=a.canvas,o.gpgpuCreatedLocally=!0}else o.gpgpu=t,o.binaryCache={},o.gpgpuCreatedLocally=!1,o.canvas=t.gl.canvas;return o.textureManager=new xp(o.gpgpu),o.numMBBeforeWarning=M().global.screen==null?1024:M().global.screen.height*M().global.screen.width*window.devicePixelRatio*Mp/1024/1024,o.texData=new ru(o,T),o}return ye(e,r),e.prototype.numDataIds=function(){return this.texData.numDataIds()+(this.cpuBackend?this.cpuBackend.numDataIds():0)-this.pendingDeletes},e.prototype.write=function(t,n,o){if(M().getBool("DEBUG")&&this.checkNumericalProblems(t),o==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");var a={};return this.texData.set(a,{shape:n,dtype:o,values:t,usage:ie.UPLOAD}),a},e.prototype.move=function(t,n,o,a){if(M().getBool("DEBUG")&&this.checkNumericalProblems(n),a==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(t,{shape:o,dtype:a,values:n,usage:ie.UPLOAD})},e.prototype.readSync=function(t){var n=this.texData.get(t),o=n.values,a=n.dtype,i=n.complexTensors,s=n.slice,u=n.shape,c=n.isPacked;if(s!=null){var l=void 0;l=c?new Zn(u,kr):new at(u,kr);var h=this.runWebGLProgram(l,[{dataId:t,shape:u,dtype:a}],a),f=this.readSync(h.dataId);return this.disposeData(h.dataId),f}if(o!=null)return this.convertAndCacheOnCPU(t);if(a==="string")return o;var p,d,m=this.activeTimers!=null;return m&&(p=Re()),a==="complex64"?d=va(i.real.dataSync(),i.imag.dataSync()):d=this.getValuesFromTexture(t),m&&(this.downloadWaitMs+=Re()-p),this.convertAndCacheOnCPU(t,d)},e.prototype.read=function(t){return X(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,h,f,p,d,m,v,g,x,b,y,w,C,k,S;return Y(this,function(R){switch(R.label){case 0:if(this.pendingRead.has(t))return n=this.pendingRead.get(t),[2,new Promise(function(I){return n.push(I)})];if(o=this.texData.get(t),a=o.values,i=o.shape,s=o.slice,u=o.dtype,c=o.complexTensors,l=o.isPacked,s!=null)return h=void 0,h=l?new Zn(i,kr):new at(i,kr),f=this.runWebGLProgram(h,[{dataId:t,shape:i,dtype:u}],u),p=this.read(f.dataId),this.disposeData(f.dataId),[2,p];if(a!=null)return[2,this.convertAndCacheOnCPU(t)];if(!M().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&M().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");return d=null,u!=="complex64"&&M().get("WEBGL_BUFFER_SUPPORTED")&&(m=this.decode(t),v=this.texData.get(m.dataId),d=(S=this.gpgpu).createBufferFromTexture.apply(S,[v.texture].concat(tr(i)))),this.pendingRead.set(t,[]),u==="complex64"?[3,2]:[4,this.gpgpu.createAndWaitForFence()];case 1:R.sent(),R.label=2;case 2:return u!=="complex64"?[3,4]:[4,Promise.all([c.real.data(),c.imag.data()])];case 3:return x=R.sent(),b=x[0],y=x[1],g=va(b,y),[3,5];case 4:d==null?g=this.getValuesFromTexture(t):(w=$(i),g=this.gpgpu.downloadFloat32MatrixFromBuffer(d,w)),R.label=5;case 5:return m!=null&&this.disposeData(m.dataId),C=this.convertAndCacheOnCPU(t,g),k=this.pendingRead.get(t),this.pendingRead.delete(t),k.forEach(function(I){return I(C)}),this.pendingDisposal.has(t)&&(this.pendingDisposal.delete(t),this.disposeData(t),this.pendingDeletes--),[2,C]}})})},e.prototype.checkNumericalProblems=function(t){if(t!=null)for(var n=0;n<t.length;n++){var o=t[n];if(!_l(o))throw M().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error("The value "+o+" cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'"):Error("The value "+o+" cannot be represented on this device.")}},e.prototype.getValuesFromTexture=function(t){var n,o=this.texData.get(t),a=o.shape,i=o.dtype,s=o.isPacked,u=$(a);if(M().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){var c=this.decode(t),l=this.texData.get(c.dataId),h=(n=this.gpgpu).downloadMatrixFromPackedTexture.apply(n,[l.texture].concat(tr(a))).subarray(0,u);return this.disposeData(c.dataId),h}var f=M().getBool("WEBGL_PACK")&&s===!0,p=f?Bo(a):a,d=f?new _f(p):new Cf(p),m=this.runWebGLProgram(d,[{shape:p,dtype:i,dataId:t}],"float32"),v=this.texData.get(m.dataId),g=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(v.texture,v.texShape[0],v.texShape[1]).subarray(0,u);return this.disposeData(m.dataId),g},e.prototype.time=function(t){return X(this,void 0,void 0,function(){var n,o,a,i,s,u,c;return Y(this,function(l){switch(l.label){case 0:return n=this.activeTimers,o=[],a=!1,this.programTimersStack==null?(this.programTimersStack=o,a=!0):this.activeTimers.push(o),this.activeTimers=o,t(),i=Hn(this.activeTimers.map(function(h){return h.query})).filter(function(h){return h!=null}),s=Hn(this.activeTimers.map(function(h){return h.name})).filter(function(h){return h!=null}),this.activeTimers=n,a&&(this.programTimersStack=null),u={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null},M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[4,Promise.all(i)]:[3,2];case 1:return c=l.sent(),u.kernelMs=rl(c),u.getExtraProfileInfo=function(){return c.map(function(h,f){return{name:s[f],ms:h}}).map(function(h){return h.name+": "+h.ms}).join(", ")},[3,3];case 2:u.kernelMs={error:"WebGL query timers are not supported in this environment."},l.label=3;case 3:return this.uploadWaitMs=0,this.downloadWaitMs=0,[2,u]}})})},e.prototype.memory=function(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU}},e.prototype.startTimer=function(){return M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:Re(),endMs:null}},e.prototype.endTimer=function(t){return M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),t):(t.endMs=Re(),t)},e.prototype.getQueryTime=function(t){return X(this,void 0,void 0,function(){var n;return Y(this,function(o){return M().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?[2,this.gpgpu.waitForQueryAndGetTime(t)]:[2,(n=t).endMs-n.startMs]})})},e.prototype.disposeData=function(t){if(!this.pendingDisposal.has(t)){if(this.pendingRead.has(t))return this.pendingDisposal.add(t),void this.pendingDeletes++;if(this.texData.has(t)){this.releaseGPUData(t);var n=this.texData.get(t).complexTensors;n!=null&&(n.real.dispose(),n.imag.dispose()),this.texData.delete(t)}}},e.prototype.releaseGPUData=function(t){var n=this.texData.get(t),o=n.texture,a=n.dtype,i=n.texShape,s=n.usage,u=n.isPacked,c=n.slice,l=c&&c.origDataId||t,h=this.dataRefCount.get(l);h>1?this.dataRefCount.set(l,h-1):(this.dataRefCount.delete(l),o!=null&&(this.numBytesInGPU-=this.computeBytes(i,a),this.textureManager.releaseTexture(o,i,s,u)));var f=this.texData.get(t);f.texture=null,f.texShape=null,f.isPacked=!1,f.slice=null},e.prototype.getTexture=function(t){return this.uploadToGPU(t),this.texData.get(t).texture},e.prototype.getDataInfo=function(t){return this.texData.get(t)},e.prototype.getCPUBackend=function(){return M().getBool("WEBGL_CPU_FORWARD")?(this.cpuBackend==null&&(this.cpuBackend=T.findBackend("cpu")),this.cpuBackend):null},e.prototype.shouldExecuteOnCPU=function(t,n){var o=this;return n===void 0&&(n=128),this.getCPUBackend()!=null&&t.every(function(a){return o.texData.get(a.dataId).texture==null&&a.size<n})},e.prototype.getGPGPUContext=function(){return this.gpgpu},e.prototype.complex=function(t,n){var o=this.makeOutput(t.shape,"complex64");return this.texData.get(o.dataId).complexTensors={real:T.keep(t.clone()),imag:T.keep(n.clone())},o},e.prototype.real=function(t){return this.texData.get(t.dataId).complexTensors.real.clone()},e.prototype.imag=function(t){return this.texData.get(t.dataId).complexTensors.imag.clone()},e.prototype.slice=function(t,n,o){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.slice(t,n,o);if($(o)===0)return Gt([],o,t.dtype);var a=this.texData.get(t.dataId).isPacked,i=eu(t.shape,n,o);if(a||!i){var s=M().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new gp(o):new mp(o),u=s.getCustomSetupFunc(n);return this.compileAndRun(s,[t],null,u)}return this.uploadToGPU(t.dataId),this.shallowSlice(t,n,o)},e.prototype.shallowSlice=function(t,n,o){var a=this.texData.get(t.dataId),i=this.makeOutput(o,t.dtype),s=this.texData.get(i.dataId);Object.assign(s,a),s.shape=o,s.dtype=t.dtype;var u=nu(n,t.strides);a.slice&&(u+=a.slice.flatOffset),s.slice={flatOffset:u,origDataId:a.slice&&a.slice.origDataId||t.dataId};var c=this.dataRefCount.get(s.slice.origDataId)||1;return this.dataRefCount.set(s.slice.origDataId,c+1),i},e.prototype.stridedSlice=function(t,n,o,a){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.stridedSlice(t,n,o,a);var i=Ta(n,o,a);if(i.some(function(u){return u===0}))return Gt([],i);var s=new yp(n,a,i);return this.compileAndRun(s,[t])},e.prototype.reverse=function(t,n){var o=M().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new pp(t.shape,n):new fp(t.shape,n);return this.compileAndRun(o,[t])},e.prototype.concat=function(t,n){if(t[0].dtype==="complex64"){var o=t.map(function(p){return fe(p)}),a=t.map(function(p){return ke(p)});return zt(this.concat(o,n),this.concat(a,n))}if(this.shouldExecuteOnCPU(t))return this.cpuBackend.concat(t,n);if(t.length===1)return t[0];if(t.length>M().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER")){var i=Math.floor(t.length/2),s=this.concat(t.slice(0,i),n),u=this.concat(t.slice(i),n);return this.concat([s,u],n)}if(M().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&t[0].rank>1){var c=new uf(t.map(function(p){return p.shape}),n);return this.compileAndRun(c,t)}var l=jn(t.map(function(p){return p.shape}),n),h=t.map(function(p){return p.as2D(-1,$(p.shape.slice(n)))}),f=new sf(h.map(function(p){return p.shape}));return this.compileAndRun(f,h).reshape(l)},e.prototype.neg=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.neg(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,ts,t.dtype);var n=new at(t.shape,ts);return this.compileAndRun(n,[t])},e.prototype.batchMatMul=function(t,n,o,a){var i=o?t.shape[2]:t.shape[1],s=a?n.shape[1]:n.shape[2],u=o?t.shape[1]:t.shape[2],c=t.shape[0];if((i===1||s===1)&&u>1e3){o&&(t=t.transpose([0,2,1])),a&&(n=n.transpose([0,2,1]));var l=s===1?t:t.as3D(c,u,1),h=s===1?2:1,f=s===1?n.as3D(c,1,u):n;return this.multiply(l,f).sum(h,!0)}var p=Vt(t.dtype,n.dtype),d=new zo(t.shape,[c,i,s],o,a);return this.compileAndRun(d,[t,n],p)},e.prototype.fusedBatchMatMul=function(t){var n=t.a,o=t.b,a=t.transposeA,i=t.transposeB,s=t.bias,u=t.activation,c=t.preluActivationWeights,l=a?n.shape[2]:n.shape[1],h=i?o.shape[1]:o.shape[2],f=n.shape[0],p=Vt(n.dtype,o.dtype),d=s!=null,m=c!=null,v=u?Dr(u,!0):null,g=new zo(n.shape,[f,l,h],a,i,d,v,m),x=[n,o];return s&&x.push(s),c&&x.push(c),this.compileAndRun(g,x,p)},e.prototype.multiply=function(t,n){if(t.dtype==="complex64"){var o=this.texData.get(t.dataId),a=this.texData.get(n.dataId),i=new Vi(ef,t.shape,n.shape),s=new Vi(nf,t.shape,n.shape),u=[this.makeComplexComponentTensorInfo(t,o.complexTensors.real),this.makeComplexComponentTensorInfo(t,o.complexTensors.imag),this.makeComplexComponentTensorInfo(n,a.complexTensors.real),this.makeComplexComponentTensorInfo(n,a.complexTensors.imag)],c=this.compileAndRun(i,u),l=this.compileAndRun(s,u),h=this.complex(c,l);return c.dispose(),l.dispose(),h}if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.multiply(t,n);if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,Gi,t.dtype);var f=new St(Gi,t.shape,n.shape);return this.compileAndRun(f,[t,n],t.dtype)},e.prototype.batchNormalization=function(t,n,o,a,i,s){var u=[t,n,o],c=null;s!=null&&(c=s.shape,u.push(s));var l=null;if(i!=null&&(l=i.shape,u.push(i)),M().getBool("WEBGL_PACK_NORMALIZATION")){var h=new tf(t.shape,n.shape,o.shape,c,l,a);return this.compileAndRun(h,u)}var f=new Zh(t.shape,n.shape,o.shape,c,l,a);return this.compileAndRun(f,u)},e.prototype.localResponseNormalization4D=function(t,n,o,a,i){var s=M().getBool("WEBGL_PACK_NORMALIZATION")?new Jf(t.shape,n,o,a,i):new Yf(t.shape,n,o,a,i);return this.compileAndRun(s,[t])},e.prototype.LRNGrad=function(t,n,o,a,i,s,u){var c=new $f(n.shape,a,i,s,u);return this.compileAndRun(c,[n,o,t])},e.prototype.tile=function(t,n){if(t.dtype==="string"){var o=this.readSync(t.dataId).map(function(i){return Wr(i)});return lu(ot(t.shape,t.dtype,o),n)}var a=new bp(t.shape,n);return this.compileAndRun(a,[t])},e.prototype.pad=function(t,n,o){var a=M().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new op(t.shape,n,o):new rp(t.shape,n,o);return this.compileAndRun(a,[t])},e.prototype.transpose=function(t,n){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.transpose(t,n);var o=M().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Cp(t.shape,n):new wp(t.shape,n);return this.compileAndRun(o,[t])},e.prototype.gather=function(t,n,o){if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.gather(t,n,o);var a=new Df(t.shape,n.size,o);return this.compileAndRun(a,[t,n])},e.prototype.batchToSpaceND=function(t,n,o){E(t.rank<=4,function(){return"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet"});var a=n.reduce(function(h,f){return h*f}),i=qr(t.shape,n,a),s=jr(i.length,n.length),u=Kr(t.shape,n,a),c=Js(o,n.length),l=Qs(u,o,n.length);return t.reshape(i).transpose(s).reshape(u).slice(c,l)},e.prototype.spaceToBatchND=function(t,n,o){E(t.rank<=4,function(){return"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet"});var a=n.reduce(function(f,p){return f*p}),i=[[0,0]];i.push.apply(i,o);for(var s=1+n.length;s<t.shape.length;++s)i.push([0,0]);var u=t.pad(i),c=qr(u.shape,n,a,!1),l=jr(c.length,n.length,!1),h=Kr(u.shape,n,a,!1);return u.reshape(c).transpose(l).reshape(h)},e.prototype.reduce=function(t,n,o){var a=t.shape[0],i=t.shape[1],s=Lo(i),u=new ap({windowSize:s,inSize:i,batchSize:a},n),c=this.compileAndRun(u,[t],o);return c.shape[1]===1?c:this.reduce(c,n,o)},e.prototype.argReduce=function(t,n,o){o===void 0&&(o=null);var a=t.shape[0],i=t.shape[1];o!=null&&(a=o.shape[0],i=o.shape[1]);var s=Lo(i),u=new Hh({windowSize:s,inSize:i,batchSize:a},n,o==null),c=[t];o!=null&&c.push(o);var l=this.compileAndRun(u,c,"int32");return l.shape[1]===1?l:this.argReduce(t,n,l)},e.prototype.argReducePacked=function(t,n,o){o===void 0&&(o=null);var a=o!=null?o.shape:t.shape,i=Lo(a[a.length-1]),s=new $h(a,i,n,o==null),u=o==null?[t]:[t,o],c=this.compileAndRun(s,u,"int32");return c.rank===t.rank?this.argReducePacked(t,n,c):c},e.prototype.sum=function(t,n){oe("sum",n,t.rank);var o=Ht(t.shape,n),a=o[0],i=$(o[1]),s=t.as2D(-1,i),u=Ao(t.dtype);return this.reduce(s,"sum",u).reshape(a)},e.prototype.prod=function(t,n){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.prod(t,n);var o=Ht(t.shape,n),a=o[0],i=$(o[1]),s=t.as2D(-1,i),u=Ao(t.dtype);return this.reduce(s,"prod",u).reshape(a)},e.prototype.unsortedSegmentSum=function(t,n,o){var a=0,i=Me([a],t.rank),s=t;i!=null&&(s=t.transpose(i),a=Oe(1,t.rank)[0]);var u=function(p,d,m){for(var v=[],g=p.length,x=0;x<g;x++)x!==d?v.push(p[x]):v.push(m);return v}(s.shape,a,o),c=$([s.shape[a]]),l=s.as2D(-1,c),h=Ao(t.dtype),f=this.segOpCompute(l,"unsortedSegmentSum",n,h,o).reshape(u);return i!=null&&(f=f.transpose(ka(i))),f},e.prototype.segOpCompute=function(t,n,o,a,i){var s=t.shape[0],u=t.shape[1],c=function(f,p){var d,m=!1;for(f<=tu?(d=f,m=!0):d=ia(f,Math.floor(Math.sqrt(f)));!m;)d>p||d===f?m=!0:d=ia(f,d+1);return d}(u,i),l=new dp({windowSize:c,inSize:u,batchSize:s,numSegments:i}),h=this.compileAndRun(l,[t,o],a);return h.shape[1]===i?h:(o=Hr(0,i).tile([u/c]),this.segOpCompute(h,n,o,a,i))},e.prototype.argMinMaxReduce=function(t,n,o){var a=[n];if(oe("arg"+o.charAt(0).toUpperCase()+o.slice(1),a,t.rank),!M().getBool("WEBGL_PACK_REDUCE")||t.rank<=2){var i=Ht(t.shape,a),s=i[0],u=$(i[1]),c=t.as2D(-1,u);return this.argReduce(c,o).reshape(s)}return this.argReducePacked(t,o)},e.prototype.argMin=function(t,n){return this.argMinMaxReduce(t,n,"min")},e.prototype.argMax=function(t,n){return this.argMinMaxReduce(t,n,"max")},e.prototype.cumsum=function(t,n,o,a){if(n!==t.rank-1)throw new Error("WebGL cumsum shader expects an inner-most axis="+(t.rank-1)+" but got axis="+n);var i=new gf(t.shape,o,a);return this.compileAndRun(i,[t])},e.prototype.equal=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(equal(a, b));
`,"bool");var o=new St("return float(a == b);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.notEqual=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(notEqual(a, b));
`,"bool");var o=new St("return float(a != b);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.less=function(t,n){if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.less(t,n);if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(lessThan(a, b));
`,"bool");var o=new St("return float(a < b);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.lessEqual=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(lessThanEqual(a, b));
`,"bool");var o=new St("return float(a <= b);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.greater=function(t,n){if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.greater(t,n);if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(greaterThan(a, b));
`,"bool");var o=new St("return float(a > b);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.greaterEqual=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(greaterThanEqual(a, b));
`,"bool");var o=new St("return float(a >= b);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.logicalNot=function(t){var n=new at(t.shape,"return float(!(x >= 1.0));");return this.compileAndRun(n,[t])},e.prototype.logicalAnd=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,"bool");var o=new St("return float(a >= 1.0 && b >= 1.0);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.logicalOr=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,"bool");var o=new St("return float(a >= 1.0 || b >= 1.0);",t.shape,n.shape);return this.compileAndRun(o,[t,n],"bool")},e.prototype.select=function(t,n,o){var a=new vp(t.rank,n.shape,n.rank);return this.compileAndRun(a,[t,n,o],Vt(n.dtype,o.dtype))},e.prototype.where=function(t){Vr("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");var n=t.dataSync();return Ma(t.shape,n)},e.prototype.topk=function(t,n,o){return hu(t.dataSync(),t.shape,t.dtype,n)},e.prototype.min=function(t,n){oe("min",n,t.rank);var o=Ht(t.shape,n),a=o[0],i=$(o[1]),s=t.as2D(-1,i);return this.reduce(s,"min",s.dtype).reshape(a)},e.prototype.minimum=function(t,n){if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.minimum(t,n);var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(`
  vec4 result = vec4(min(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,t.shape,n.shape):new St(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return min(a, b);
`,t.shape,n.shape);return this.compileAndRun(o,[t,n])},e.prototype.mod=function(t,n){var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(`
  vec4 result = mod(a, b);
  vec4 isNaN = vec4(equal(b, vec4(0.0)));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,t.shape,n.shape):new St(`if (b == 0.0) return NAN;
  return mod(a, b);`,t.shape,n.shape);return this.compileAndRun(o,[t,n])},e.prototype.max=function(t,n){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.max(t,n);oe("max",n,t.rank);var o=Ht(t.shape,n),a=o[0],i=$(o[1]),s=t.as2D(-1,i);return this.reduce(s,"max",s.dtype).reshape(a)},e.prototype.maximum=function(t,n){if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.maximum(t,n);var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(`
  vec4 result = vec4(max(a, b));
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,t.shape,n.shape):new St(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return max(a, b);
`,t.shape,n.shape);return this.compileAndRun(o,[t,n])},e.prototype.all=function(t,n){oe("all",n,t.rank);var o=Ht(t.shape,n),a=o[0],i=$(o[1]),s=t.as2D(-1,i);return this.reduce(s,"all",s.dtype).reshape(a)},e.prototype.any=function(t,n){oe("any",n,t.rank);var o=Ht(t.shape,n),a=o[0],i=$(o[1]),s=t.as2D(-1,i);return this.reduce(s,"any",s.dtype).reshape(a)},e.prototype.realDivide=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,"float32",!0);var o=new St(`
if (a == b) {
  return 1.0;
};
return a / b;`,t.shape,n.shape);return this.compileAndRun(o,[t,n],"float32")},e.prototype.floorDiv=function(t,n){if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,"int32");var o=new St(`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,t.shape,n.shape);return this.compileAndRun(o,[t,n],"int32")},e.prototype.add=function(t,n){if(t.dtype==="complex64"&&n.dtype==="complex64")return this.complexSeparableBinaryOp(t,n,Wo);if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.add(t,n);var o=Vt(t.dtype,n.dtype);if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,Wo,o);var a=new St(Wo,t.shape,n.shape);return this.compileAndRun(a,[t,n],o)},e.prototype.packedUnaryOp=function(t,n,o){var a=new Zn(t.shape,n);return this.compileAndRun(a,[t],o)},e.prototype.packedBinaryOp=function(t,n,o,a,i){i===void 0&&(i=!1);var s=new ze(o,t.shape,n.shape,i);return this.compileAndRun(s,[t,n],a)},e.prototype.complexSeparableBinaryOp=function(t,n,o){var a=this,i=this.texData.get(t.dataId),s=this.texData.get(n.dataId),u=[[i.complexTensors.real,s.complexTensors.real],[i.complexTensors.imag,s.complexTensors.imag]].map(function(f){var p=f[0],d=f[1],m=a.makeComplexComponentTensorInfo(t,p),v=a.makeComplexComponentTensorInfo(n,d),g=new St(o,t.shape,n.shape);return a.compileAndRun(g,[m,v],Vt(p.dtype,d.dtype))}),c=u[0],l=u[1],h=this.complex(c,l);return c.dispose(),l.dispose(),h},e.prototype.makeComplexComponentTensorInfo=function(t,n){return{dataId:n.dataId,dtype:n.dtype,shape:t.shape}},e.prototype.addN=function(t){if(t.length===1)return t[0];if(t.length>M().get("WEBGL_MAX_TEXTURES_IN_SHADER")){var n=Math.floor(t.length/2),o=this.addN(t.slice(0,n)),a=this.addN(t.slice(n));return this.addN([o,a])}var i=t.map(function(c){return c.dtype}).reduce(function(c,l){return Vt(c,l)}),s=t.map(function(c){return c.shape}),u=M().getBool("WEBGL_PACK")?new Gh(t[0].shape,s):new Vh(t[0].shape,s);return this.compileAndRun(u,t,i)},e.prototype.subtract=function(t,n){if(t.dtype==="complex64"&&n.dtype==="complex64")return this.complexSeparableBinaryOp(t,n,Uo);if(this.shouldExecuteOnCPU([t,n]))return this.cpuBackend.subtract(t,n);var o=Vt(t.dtype,n.dtype);if(M().getBool("WEBGL_PACK_BINARY_OPERATIONS"))return this.packedBinaryOp(t,n,Uo,t.dtype);var a=new St(Uo,t.shape,n.shape);return this.compileAndRun(a,[t,n],o)},e.prototype.pow=function(t,n){var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,t.shape,n.shape):new St(`
if(a < 0.0 && floor(b) < b){
  return NAN;
}
if (b == 0.0) {
  return 1.0;
}
return (round(mod(b, 2.0)) != 1) ?
    pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,t.shape,n.shape),a=Vt(t.dtype,n.dtype);return this.compileAndRun(o,[t,n],a)},e.prototype.ceil=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.ceil(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,es,t.dtype);var n=new at(t.shape,es);return this.compileAndRun(n,[t])},e.prototype.floor=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.floor(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,ns,t.dtype);var n=new at(t.shape,ns);return this.compileAndRun(n,[t])},e.prototype.sign=function(t){var n=new at(t.shape,`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`);return this.compileAndRun(n,[t])},e.prototype.isNaN=function(t){var n=new at(t.shape,"return float(isnan(x));");return this.compileAndRun(n,[t],"bool")},e.prototype.isInf=function(t){var n=new at(t.shape,"return float(isinf(x));");return this.compileAndRun(n,[t],"bool")},e.prototype.isFinite=function(t){var n=new at(t.shape,"return float(!isnan(x) && !isinf(x));");return this.compileAndRun(n,[t],"bool")},e.prototype.round=function(t){var n=new at(t.shape,`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`);return this.compileAndRun(n,[t])},e.prototype.exp=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.exp(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,rs,t.dtype);var n=new at(t.shape,rs);return this.compileAndRun(n,[t])},e.prototype.expm1=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.expm1(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,os,t.dtype);var n=new at(t.shape,os);return this.compileAndRun(n,[t])},e.prototype.softmax=function(t,n){var o=Bt([n],t.shape),a=this.max(t,o),i=te(a.shape,o),s=this.subtract(t,a.reshape(i)),u=this.exp(s),c=this.sum(u,o).reshape(i);return this.realDivide(u,c)},e.prototype.log=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.log(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,`
  vec4 result = log(x);
  vec4 isNaN = vec4(lessThan(x, vec4(0.0)));
  result.r = isNaN.r == 1.0 ? NAN : result.r;
  result.g = isNaN.g == 1.0 ? NAN : result.g;
  result.b = isNaN.b == 1.0 ? NAN : result.b;
  result.a = isNaN.a == 1.0 ? NAN : result.a;

  return result;
`,t.dtype);var n=new at(t.shape,`if (x < 0.0) return NAN;
  return log(x);`);return this.compileAndRun(n,[t])},e.prototype.log1p=function(t){var n=new at(t.shape,"return log(1.0 + x);");return this.compileAndRun(n,[t])},e.prototype.sqrt=function(t){var n=new at(t.shape,"return sqrt(x);");return this.compileAndRun(n,[t])},e.prototype.rsqrt=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.rsqrt(t);var n=new at(t.shape,"return inversesqrt(x);");return this.compileAndRun(n,[t])},e.prototype.reciprocal=function(t){var n=new at(t.shape,"return 1.0 / x;");return this.compileAndRun(n,[t])},e.prototype.relu=function(t){var n;return n=M().getBool("WEBGL_PACK")?new Zn(t.shape,bu):new at(t.shape,gu),this.compileAndRun(n,[t])},e.prototype.relu6=function(t){var n;return n=M().getBool("WEBGL_PACK")?new Zn(t.shape,wu):new at(t.shape,yu),this.compileAndRun(n,[t])},e.prototype.prelu=function(t,n){var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(mu,t.shape,n.shape):new St(vu,t.shape,n.shape);return this.compileAndRun(o,[t,n])},e.prototype.elu=function(t){if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,Cu,t.dtype);var n=new at(t.shape,xu);return this.compileAndRun(n,[t])},e.prototype.eluDer=function(t,n){var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,t.shape,n.shape):new St("return (b >= 1.0) ? a : a * (b + 1.0);",t.shape,n.shape);return this.compileAndRun(o,[t,n])},e.prototype.selu=function(t){var n=new at(t.shape,Ep);return this.compileAndRun(n,[t])},e.prototype.int=function(t){var n=new at(t.shape,"return float(int(x));");return this.compileAndRun(n,[t],"int32")},e.prototype.clip=function(t,n,o){var a,i=(a=M().getBool("WEBGL_PACK_CLIP")?new of(t.shape):new rf(t.shape)).getCustomSetupFunc(n,o);return this.compileAndRun(a,[t],null,i)},e.prototype.abs=function(t){if(this.shouldExecuteOnCPU([t]))return this.cpuBackend.abs(t);if(M().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,Zi,t.dtype);var n=new at(t.shape,Zi);return this.compileAndRun(n,[t])},e.prototype.complexAbs=function(t){var n=this.texData.get(t.dataId),o=new af(t.shape),a=[this.makeComplexComponentTensorInfo(t,n.complexTensors.real),this.makeComplexComponentTensorInfo(t,n.complexTensors.imag)];return this.compileAndRun(o,a)},e.prototype.sigmoid=function(t){var n=new at(t.shape,"return 1.0 / (1.0 + exp(-1.0 * x));");return this.compileAndRun(n,[t])},e.prototype.softplus=function(t){var n=new at(t.shape,`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`);return this.compileAndRun(n,[t])},e.prototype.sin=function(t){var n=new at(t.shape,Rp);return this.compileAndRun(n,[t])},e.prototype.cos=function(t){var n=new at(t.shape,Ip);return this.compileAndRun(n,[t])},e.prototype.tan=function(t){var n=new at(t.shape,"return tan(x);");return this.compileAndRun(n,[t])},e.prototype.asin=function(t){var n=new at(t.shape,kp);return this.compileAndRun(n,[t])},e.prototype.acos=function(t){var n=new at(t.shape,Sp);return this.compileAndRun(n,[t])},e.prototype.atan=function(t){var n=new at(t.shape,Dp);return this.compileAndRun(n,[t])},e.prototype.atan2=function(t,n){var o=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze(`
  vec4 result = atan(a, b);
  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));
  
  result.r = isNaN.r > 0. ? NAN : result.r;
  result.g = isNaN.g > 0. ? NAN : result.g;
  result.b = isNaN.b > 0. ? NAN : result.b;
  result.a = isNaN.a > 0. ? NAN : result.a;

  return result;
`,t.shape,n.shape):new St(`
  if (isnan(a)) return a;
  if (isnan(b)) return b;

  return atan(a, b);
`,t.shape,n.shape);return this.compileAndRun(o,[t,n])},e.prototype.sinh=function(t){var n=new at(t.shape,`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`);return this.compileAndRun(n,[t])},e.prototype.cosh=function(t){var n=new at(t.shape,`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`);return this.compileAndRun(n,[t])},e.prototype.tanh=function(t){var n=new at(t.shape,`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`);return this.compileAndRun(n,[t])},e.prototype.asinh=function(t){var n=new at(t.shape,Ap);return this.compileAndRun(n,[t])},e.prototype.acosh=function(t){var n=new at(t.shape,Tp);return this.compileAndRun(n,[t])},e.prototype.atanh=function(t){var n=new at(t.shape,Np);return this.compileAndRun(n,[t])},e.prototype.erf=function(t){var n=new at(t.shape,`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = 0.3275911;
  float a1 = 0.254829592;
  float a2 = -0.284496736;
  float a3 = 1.421413741;
  float a4 = -1.453152027;
  float a5 = 1.061405429;

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`);return this.compileAndRun(n,[t])},e.prototype.step=function(t,n){var o=new at(t.shape,function(a){return a===void 0&&(a=0),xe+`
    return x > 0.0 ? 1.0 : float(`+a+`);
  `}(n));return this.compileAndRun(o,[t])},e.prototype.conv2dByMatMul=function(t,n,o,a,i,s){var u=t.shape,c=this.texData.get(t.dataId),l=o.inChannels,h=u[0]*u[1]*u[2],f=o.outChannels,p=o.dataFormat==="channelsLast",d=(h===1||f===1)&&l>1e3,m=u[2]%2!=0&&!!c.isPacked;if(d||!M().getBool("WEBGL_LAZILY_UNPACK")||!M().getBool("WEBGL_PACK_BINARY_OPERATIONS")||!m){var v=p?u[0]*u[1]*u[2]:u[0]*u[2]*u[3],g=this.reshape(t,[1,v,o.inChannels]),x=this.reshape(n,[1,o.inChannels,o.outChannels]);return this.reshape(this.fusedBatchMatMul({a:g,b:x,transposeA:!1,transposeB:!1,bias:a,activation:i,preluActivationWeights:s}),o.outShape)}var b=p?u[0]*u[1]*(u[2]+1):u[0]*u[2]*(u[3]+1),y={dataId:t.dataId,shape:[1,b,o.inChannels],dtype:t.dtype},w=c.shape;c.shape=c.shape.slice(),c.shape[c.shape.length-2]++,E(Rr(c.shape,y.shape),function(){return"packed reshape "+c.shape+" to "+y.shape+" isn't free"});var C=this.reshape(n,[1,o.inChannels,o.outChannels]),k=this.fusedBatchMatMul({a:y,b:C,transposeA:!1,transposeB:!1,bias:a,activation:i,preluActivationWeights:s}),S=this.texData.get(k.dataId);return E(S.isPacked,function(){return"batchMatMul result is expected to be packed"}),c.shape=w,S.shape=o.outShape,T.makeTensorFromDataId(k.dataId,o.outShape,k.dtype)},e.prototype.conv2dWithIm2Row=function(t,n,o,a,i,s){var u=o.filterWidth,c=o.filterHeight,l=o.inChannels,h=o.outWidth,f=o.outHeight,p=o.dataFormat==="channelsLast",d=u*c*l,m=f*h,v=[d,m],g=t.squeeze([0]),x=n.reshape([1,d,-1]),b=new Xf(v,g.shape,o),y=this.compileAndRun(b,[g]).reshape([1,v[0],v[1]]),w=a!=null,C=s!=null,k=i?Dr(i,!0):null,S=new zo(y.shape,[1,m,o.outChannels],!0,!1,w,k,C),R=[y,x];a&&R.push(a),C&&R.push(s);var I=this.compileAndRun(S,R);return p?I.reshape([1,f,h,o.outChannels]):I.reshape([1,o.outChannels,f,h])},e.prototype.fusedConv2d=function(t){var n=t.input,o=t.filter,a=t.convInfo,i=t.bias,s=t.activation,u=t.preluActivationWeights;if(a.filterHeight===1&&a.filterWidth===1&&a.dilationHeight===1&&a.dilationWidth===1&&a.strideHeight===1&&a.strideWidth===1&&(a.padInfo.type==="SAME"||a.padInfo.type==="VALID"))return this.conv2dByMatMul(n,o,a,i,s,u);if(M().getBool("WEBGL_CONV_IM2COL")&&n.shape[0]===1)return this.conv2dWithIm2Row(n,o,a,i,s,u);var c=i!=null,l=u!=null,h=s?Dr(s,!1):null,f=new Hi(a,c,h,l),p=[n,o];return i&&p.push(i),u&&p.push(u),this.compileAndRun(f,p)},e.prototype.conv2d=function(t,n,o){if(o.filterHeight===1&&o.filterWidth===1&&o.dilationHeight===1&&o.dilationWidth===1&&o.strideHeight===1&&o.strideWidth===1&&(o.padInfo.type==="SAME"||o.padInfo.type==="VALID"))return this.conv2dByMatMul(t,n,o);if(M().getBool("WEBGL_CONV_IM2COL")&&t.shape[0]===1)return this.conv2dWithIm2Row(t,n,o);var a=new Hi(o);return this.compileAndRun(a,[t,n])},e.prototype.conv2dDerInput=function(t,n,o){var a=new lf(o);return this.compileAndRun(a,[t,n])},e.prototype.conv2dDerFilter=function(t,n,o){var a=new cf(o);return this.compileAndRun(a,[t,n])},e.prototype.fusedDepthwiseConv2D=function(t){var n,o=t.input,a=t.filter,i=t.convInfo,s=t.bias,u=t.activation,c=t.preluActivationWeights,l=M().getBool("WEBGL_PACK_DEPTHWISECONV")&&i.strideWidth<=2&&i.outChannels/i.inChannels==1,h=u?Dr(u,l):null,f=[o,a],p=s!=null,d=c!=null;return p&&f.push(s),d&&f.push(c),l?(n=new ji(i,p,h,d),this.compileAndRun(n,f)):(n=new qi(i,p,h,d),this.compileAndRun(n,f))},e.prototype.depthwiseConv2D=function(t,n,o){var a;return M().getBool("WEBGL_PACK_DEPTHWISECONV")&&o.strideWidth<=2&&o.outChannels/o.inChannels==1?(a=new ji(o),this.compileAndRun(a,[t,n])):(a=new qi(o),this.compileAndRun(a,[t,n]))},e.prototype.depthwiseConv2DDerInput=function(t,n,o){var a=new df(o);return this.compileAndRun(a,[t,n])},e.prototype.depthwiseConv2DDerFilter=function(t,n,o){var a=new pf(o);return this.compileAndRun(a,[t,n])},e.prototype.conv3d=function(t,n,o){var a=new vf(o);return this.compileAndRun(a,[t,n])},e.prototype.conv3dDerInput=function(t,n,o){var a=new ff(o);return this.compileAndRun(a,[t,n])},e.prototype.conv3dDerFilter=function(t,n,o){var a=new hf(o);return this.compileAndRun(a,[t,n])},e.prototype.maxPool=function(t,n){var o=new Vo(n,"max",!1);return this.compileAndRun(o,[t])},e.prototype.avgPool=function(t,n){var o=new Vo(n,"avg",!1);return this.compileAndRun(o,[t],"float32")},e.prototype.maxPoolBackprop=function(t,n,o,a){var i=new Vo(a,"max",!0),s=this.compileAndRun(i,[n]),u=new Qf(a),c=this.compileAndRun(u,[t,s],n.dtype);return s.dispose(),c},e.prototype.avgPoolBackprop=function(t,n,o){var a=new Jh(o);return this.compileAndRun(a,[t],n.dtype)},e.prototype.cast=function(t,n){return iu(t,n,this)},e.prototype.unstack=function(t,n){for(var o=t.shape[n],a=new Array(t.rank-1),i=0,s=0;s<t.rank;s++)s!==n&&(a[i++]=t.shape[s]);var u=new Array(t.rank).fill(0),c=t.shape.slice();c[n]=1;var l=new Array(o);for(s=0;s<l.length;s++)u[n]=s,l[s]=this.slice(t,u,c).reshape(a);return l},e.prototype.avgPool3d=function(t,n){var o=new Go(n,"avg",!1);return this.compileAndRun(o,[t],"float32")},e.prototype.avgPool3dBackprop=function(t,n,o){var a=new Qh(o);return this.compileAndRun(a,[t],n.dtype)},e.prototype.maxPool3d=function(t,n){var o=new Go(n,"max",!1);return this.compileAndRun(o,[t],"float32")},e.prototype.maxPool3dBackprop=function(t,n,o,a){var i=new Go(a,"max",!0),s=this.compileAndRun(i,[n]),u=new Zf(a),c=this.compileAndRun(u,[t,s],n.dtype);return s.dispose(),c},e.prototype.reshape=function(t,n){var o=this.texData.get(t.dataId);if(o.isPacked&&!Rr(t.shape,n)&&(o.texture===null||!Rr(o.shape,n))){var a=this.packedReshape(t,n);return T.makeTensorFromDataId(a.dataId,a.shape,a.dtype)}return da(t,n)},e.prototype.resizeBilinear=function(t,n,o,a){var i=M().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new cp(t.shape,n,o,a):new up(t.shape,n,o,a);return this.compileAndRun(i,[t],"float32")},e.prototype.resizeBilinearBackprop=function(t,n,o){var a=new sp(t,n,o);return this.compileAndRun(a,[t])},e.prototype.resizeNearestNeighbor=function(t,n,o,a){var i=new hp(t.shape,n,o,a);return this.compileAndRun(i,[t])},e.prototype.resizeNearestNeighborBackprop=function(t,n,o){var a=new lp(t,n,o);return this.compileAndRun(a,[t])},e.prototype.multinomial=function(t,n,o,a){var i=n?t:qe(t),s=i.shape[0],u=i.shape[1],c=new tp(s,u,o),l=c.getCustomSetupFunc(a);return this.compileAndRun(c,[i],"int32",l)},e.prototype.oneHot=function(t,n,o,a){var i=new ep(t.size,n,o,a);return this.compileAndRun(i,[t])},e.prototype.diag=function(t){var n=new wf(t.size);return this.compileAndRun(n,[t])},e.prototype.nonMaxSuppression=function(t,n,o,a,i){return Vr("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead"),Fa(t.dataSync(),n.dataSync(),o,a,i)},e.prototype.cropAndResize=function(t,n,o,a,i,s){var u=new mf(t.shape,n.shape,a,i,s);return this.compileAndRun(u,[t,n,o],"float32")},e.prototype.depthToSpace=function(t,n,o){E(n>1,function(){return"blockSize should be > 1 for depthToSpace, but was: "+n});var a=t.shape[0],i=o==="NHWC"?t.shape[1]:t.shape[2],s=o==="NHWC"?t.shape[2]:t.shape[3],u=o==="NHWC"?t.shape[3]:t.shape[1],c=i*n,l=s*n,h=u/(n*n),f=new bf(o==="NHWC"?[a,c,l,h]:[a,h,c,l],n,o);return this.compileAndRun(f,[t])},e.prototype.split=function(t,n,o){return cu(t,n,o)},e.prototype.scatterND=function(t,n,o){var a=Xr(0,t,o),i=a.sliceRank,s=a.numUpdates,u=a.sliceSize,c=a.strides,l=a.outputSize,h=[l/u,u],f=t.reshape([s,i]),p=n.reshape([s,u]);if(l===0)return da(Gt([]),o);var d=q(0),m=new $i(s,i,f.rank,p.rank,c,h);return this.compileAndRun(m,[p,f,d]).reshape(o)},e.prototype.sparseToDense=function(t,n,o,a){var i=Xr(0,t,o),s=i.sliceRank,u=i.numUpdates,c=i.strides,l=i.outputSize,h=new $i(u,s,t.rank,n.rank,c,[l,1]);return this.compileAndRun(h,[n,t,a]).reshape(o)},e.prototype.fft=function(t){return this.fftImpl(t,!1)},e.prototype.ifft=function(t){return this.fftImpl(t,!0)},e.prototype.fftImpl=function(t,n){var o=this.texData.get(t.dataId),a=new Xi(If,t.shape,n),i=new Xi(kf,t.shape,n),s=[this.makeComplexComponentTensorInfo(t,o.complexTensors.real),this.makeComplexComponentTensorInfo(t,o.complexTensors.imag)],u=this.compileAndRun(a,s),c=this.compileAndRun(i,s),l=this.complex(u,c).as2D(t.shape[0],t.shape[1]);return u.dispose(),c.dispose(),l},e.prototype.gatherND=function(t,n){var o=n.shape,a=o[o.length-1],i=Zs(t,n),s=i[0],u=i[1],c=i[2],l=i[3],h=n.reshape([u,a]),f=t.reshape([t.size/c,c]),p=new Af(a,l,[u,c]);return this.compileAndRun(p,[f,h]).reshape(s)},e.prototype.fill=function(t,n,o){if((o=o||fr(n))==="string"){var a=Lr(o,$(t));return a.fill(n),T.makeTensor(a,t,o,this)}var i=new Sf(t,n),s=i.getCustomSetupFunc(n);return this.compileAndRun(i,[],o,s)},e.prototype.onesLike=function(t){if(t.dtype==="string")throw new Error("onesLike is not supported under string dtype");return this.fill(t.shape,1,t.dtype)},e.prototype.zerosLike=function(t){return this.fill(t.shape,t.dtype==="string"?"":0,t.dtype)},e.prototype.linspace=function(t,n,o){return su(t,n,o)},e.prototype.makeTensorInfo=function(t,n){var o=this.write(null,t,n);return this.texData.get(o).usage=null,{dataId:o,shape:t,dtype:n}},e.prototype.makeOutput=function(t,n){var o=this.makeTensorInfo(t,n).dataId;return T.makeTensorFromDataId(o,t,n,this)},e.prototype.unpackTensor=function(t){var n=new Pp(t.shape);return this.runWebGLProgram(n,[t],t.dtype)},e.prototype.packTensor=function(t){var n=new np(t.shape);return this.runWebGLProgram(n,[t],t.dtype,null,!0)},e.prototype.packedReshape=function(t,n){var o=[Ur(t.shape)].concat(zr(t.shape)),a={dtype:t.dtype,shape:o,dataId:t.dataId},i=[Ur(n)].concat(zr(n)),s=new ip(i,o),u=this.runWebGLProgram(s,[a],t.dtype,null,!0);return{dataId:u.dataId,shape:n,dtype:u.dtype}},e.prototype.decode=function(t){var n,o=this.texData.get(t),a=o.isPacked,i=o.shape,s=o.dtype,u=Bo(i);return n=a?new xf(u):new yf(u),{dtype:s,shape:i,dataId:this.runWebGLProgram(n,[{shape:u,dtype:s,dataId:t}],s,null,!0).dataId}},e.prototype.runWebGLProgram=function(t,n,o,a,i){var s=this;i===void 0&&(i=!1);var u=this.makeTensorInfo(t.outputShape,o),c=this.texData.get(u.dataId);if(t.packedOutput&&(c.isPacked=!0),t.outPackingScheme===ar.DENSE){var l=tr(t.outputShape);c.texShape=l.map(function(b){return 2*b})}if(t.outTexUsage!=null&&(c.usage=t.outTexUsage),$(u.shape)===0)return c.values=rr(u.dtype,0),u;var h=[],f=n.map(function(b){if(b.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");var y=s.texData.get(b.dataId);if(y.texture==null){if(!t.packedInputs&&$(b.shape)<=M().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:b.shape,texData:null,isUniform:!0,uniformValues:y.values};t.packedInputs&&(y.isPacked=!0,y.shape=b.shape)}else if(!!y.isPacked!=!!t.packedInputs)b=y.isPacked?s.unpackTensor(b):s.packTensor(b),h.push(b),y=s.texData.get(b.dataId);else if(y.isPacked&&!Rr(y.shape,b.shape)){var w=b,C=b.shape;b.shape=y.shape,b=s.packedReshape(b,C),h.push(b),y=s.texData.get(b.dataId),w.shape=C}return s.uploadToGPU(b.dataId),{shape:b.shape,texData:y,isUniform:!1}});this.uploadToGPU(u.dataId);var p,d={shape:u.shape,texData:c,isUniform:!1},m=function(b,y,w){var C="";y.concat(w).forEach(function(R){var I=R.texData!=null&&R.texData.slice!=null&&R.texData.slice.flatOffset>0,N=R.isUniform?"uniform":R.texData.texShape;C+=R.shape+"_"+N+"_"+I});var k=b.userCode,S=b.constructor.name;return S+="_"+C+"_"+k}(t,f,d),v=this.getAndSaveBinary(m,function(){return function(b,y,w,C){var k=y.userCode,S=w.map(function(W,G){var H={logicalShape:W.shape,texShape:W.isUniform?null:W.texData.texShape,isUniform:W.isUniform,isPacked:!W.isUniform&&W.texData.isPacked,flatOffset:null};return W.texData!=null&&W.texData.slice!=null&&W.texData.slice.flatOffset>0&&(H.flatOffset=W.texData.slice.flatOffset),{name:y.variableNames[G],shapeInfo:H}}),R=S.map(function(W){return W.shapeInfo}),I={logicalShape:C.shape,texShape:C.texData.texShape,isUniform:!1,isPacked:C.texData.isPacked,flatOffset:null},N=qh(S,I,k,y.packedInputs),A=b.createProgram(N),L=null,O=b.getUniformLocation(A,"NAN",!1);M().getNumber("WEBGL_VERSION")===1&&(L=b.getUniformLocation(A,"INFINITY",!1));for(var B={},z=0;z<y.variableNames.length;z++){var U=y.variableNames[z];B[U]=b.getUniformLocation(A,U,!1),B["offset"+U]=b.getUniformLocation(A,"offset"+U,!1)}return{program:y,source:N,webGLProgram:A,uniformLocations:B,inShapeInfos:R,outShapeInfo:I,infLoc:L,nanLoc:O}}(s.gpgpu,t,f,d)}),g=this.activeTimers!=null;if(g&&(p=this.startTimer()),function(b,y,w,C,k){Yi(y.inShapeInfos,w),Yi([y.outShapeInfo],[C]);var S=C.texData.texture,R=C.texData.texShape;C.texData.isPacked?b.setOutputPackedMatrixTexture(S,R[0],R[1]):b.setOutputMatrixTexture(S,R[0],R[1]),b.setProgram(y.webGLProgram),M().getNumber("WEBGL_VERSION")===1&&y.infLoc!==null&&b.gl.uniform1f(y.infLoc,1/0),y.nanLoc!==null&&b.gl.uniform1f(y.nanLoc,NaN),w.forEach(function(I,N){var A=y.program.variableNames[N],L=y.uniformLocations[A],O=y.uniformLocations["offset"+A];if(L!=null)if(I.isUniform)if($(I.shape)<2)b.gl.uniform1f(L,I.uniformValues[0]);else{var B=I.uniformValues;B instanceof Float32Array||(B=new Float32Array(B)),b.gl.uniform1fv(L,B)}else I.texData.slice!=null&&O!=null&&b.gl.uniform1i(O,I.texData.slice.flatOffset),b.setInputMatrixTexture(I.texData.texture,L,N)}),k!=null&&k(b,y.webGLProgram),b.executeProgram()}(this.gpgpu,v,f,d,a),h.forEach(function(b){return s.disposeData(b.dataId)}),g&&(p=this.endTimer(p),this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime(p)})),!M().getBool("WEBGL_LAZILY_UNPACK")&&c.isPacked&&i===!1){var x=this.unpackTensor(u);return this.disposeData(u.dataId),x}return u},e.prototype.compileAndRun=function(t,n,o,a,i){i===void 0&&(i=!1),o=o||n[0].dtype;var s=this.runWebGLProgram(t,n,o,a,i);return T.makeTensorFromDataId(s.dataId,s.shape,s.dtype)},e.prototype.getAndSaveBinary=function(t,n){return t in this.binaryCache||(this.binaryCache[t]=n()),this.binaryCache[t]},e.prototype.getTextureManager=function(){return this.textureManager},e.prototype.dispose=function(){var t=this;this.disposed||(M().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(function(n){t.gpgpu.deleteProgram(t.binaryCache[n].webGLProgram),delete t.binaryCache[n]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)},e.prototype.floatPrecision=function(){var t=this;return this.floatPrecisionValue==null&&(this.floatPrecisionValue=K(function(){if(!M().get("WEBGL_RENDER_FLOAT32_ENABLED")){var n=M().getBool("DEBUG");M().set("DEBUG",!1);var o=t.abs(q(1e-8)).dataSync()[0];if(M().set("DEBUG",n),o>0)return 32}return 16})),this.floatPrecisionValue},e.prototype.epsilon=function(){return this.floatPrecision()===32?1e-7:1e-4},e.prototype.uploadToGPU=function(t){var n,o=this.texData.get(t),a=o.shape,i=o.dtype,s=o.values,u=o.texture,c=o.usage,l=o.isPacked;if(u==null){var h,f=this.activeTimers!=null;f&&(h=Re());var p=o.texShape;if(p==null&&(p=zl(a,l),o.texShape=p),s!=null){var d=Bo(a),m=void 0,v=p[1],g=p[0],x=s instanceof Uint8Array;l?(v=(n=dr(p[0],p[1]))[0],g=n[1],m=new Rf(d,[g,v],x)):m=new Ef(d,[g,v],x);var b=this.makeTensorInfo([g,v],i);this.texData.get(b.dataId).usage=x?ie.PIXELS:ie.UPLOAD,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),v,g,s);var y=this.runWebGLProgram(m,[b],i,null,!0),w=this.texData.get(y.dataId);o.texture=w.texture,o.texShape=w.texShape,o.isPacked=w.isPacked,o.usage=w.usage,this.disposeData(b.dataId),this.texData.delete(y.dataId),o.values=null,f&&(this.uploadWaitMs+=Re()-h)}else{var C=this.acquireTexture(p,c,i,l);o.texture=C}}},e.prototype.convertAndCacheOnCPU=function(t,n){var o=this.texData.get(t),a=o.dtype;return this.releaseGPUData(t),n!=null&&(o.values=function(i,s){if(s==="float32"||s==="complex64")return i;if(s==="int32"||s==="bool"){for(var u=s==="int32"?new Int32Array(i.length):new Uint8Array(i.length),c=0;c<u.length;++c)u[c]=Math.round(i[c]);return u}throw new Error("Unknown dtype "+s)}(n,a)),o.values},e.prototype.acquireTexture=function(t,n,o,a){if(this.numBytesInGPU+=this.computeBytes(t,o),!this.warnedAboutMemory&&this.numBytesInGPU>1024*this.numMBBeforeWarning*1024){var i=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn("High memory usage in GPU: "+i+" MB, most likely due to a memory leak")}return this.textureManager.acquireTexture(t,n,a)},e.prototype.computeBytes=function(t,n){return t[0]*t[1]*Ms(n)},e}(ou);Vs()&&T.registerBackend("webgl",function(){return new Op},2);var Bp=D({square_:function(r){var e=_(r,"x","square"),t=[e];return T.runKernelFunc(function(n,o){return o([e]),n.square(e)},{x:e},null,"Square",{},t,[])}}),sr="SquaredDifference",_u=D({squaredDifference_:function(r,e){var t,n=_(r,"a","squaredDifference"),o=_(e,"b","squaredDifference");t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape);var a={a:n,b:o},i=[n,o];return T.runKernelFunc(function(s,u){var c=s.squaredDifference(n,o);return u([n,o]),c},a,function(s,u){var c=u[0],l=u[1],h=q(2);return{a:function(){return s.mul(c.sub(l).mul(h))},b:function(){return s.mul(l.sub(c).mul(h))}}},sr,{},i,[])}}),Lp=D({abs_:function(r){var e=_(r,"x","abs");return e.dtype==="complex64"?T.runKernelFunc(function(t){return t.complexAbs(e)},{$x:e}):T.runKernelFunc(function(t,n){var o=t.abs(e);return n([e]),o},{x:e},function(t,n){var o=n[0];return{x:function(){return t.mul(o.toFloat().step(-1))}}},"Abs")}}),Wp=D({acos_:function(r){var e=_(r,"x","acos");return T.runKernelFunc(function(t,n){var o=t.acos(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.divStrict(q(1).sub(o.toFloat().square()).sqrt()).neg()}}})}}),Up=D({acosh_:function(r){var e=_(r,"x","acosh");return T.runKernelFunc(function(t,n){var o=t.acosh(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.divStrict(o.toFloat().square().sub(1).sqrt())}}})}}),zp=D({asin_:function(r){var e=_(r,"x","asin");return T.runKernelFunc(function(t,n){var o=t.asin(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.divStrict(q(1).sub(o.toFloat().square()).sqrt())}}})}}),Vp=D({asinh_:function(r){var e=_(r,"x","asinh");return T.runKernelFunc(function(t,n){var o=t.asinh(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.divStrict(q(1).add(o.toFloat().square()).sqrt())}}})}}),Gp=D({atan_:function(r){var e=_(r,"x","atan");return T.runKernelFunc(function(t,n){var o=t.atan(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.div(o.toFloat().square().add(1))}}})}}),Hp=D({atanh_:function(r){var e=_(r,"x","atanh");return T.runKernelFunc(function(t,n){var o=t.atanh(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.div(q(1).sub(o.toFloat().square()))}}})}}),qp=D({ceil_:function(r){var e=_(r,"x","ceil");return T.runKernelFunc(function(t){return t.ceil(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),Wa=D({clipByValue_:function(r,e,t){var n=_(r,"x","clipByValue");E(e<=t,function(){return"Error in clip: min ("+e+") must be less than or equal to max ("+t+")."});var o=[n],a={min:e,max:t};return T.runKernelFunc(function(i,s){var u=i.clip(n,e,t);return s([n]),u},{x:n},function(i,s){var u=s[0];return{x:function(){return i.where(u.greaterEqual(e).logicalAnd(u.lessEqual(t)),vt(i))}}},"ClipByValue",a,o)}}),jp=D({cos_:function(r){var e=_(r,"x","cos"),t=[e];return T.runKernelFunc(function(n,o){var a=n.cos(e);return o([e]),a},{x:e},function(n,o){var a=o[0];return{x:function(){return a.toFloat().sin().neg().mul(n)}}},"Cos",{},t)}}),Kp=D({cosh_:function(r){var e=_(r,"x","cosh");return T.runKernelFunc(function(t,n){var o=t.cosh(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return o.toFloat().sinh().mulStrict(t)}}})}}),Xp=D({erf_:function(r){var e=_(r,"x","erf");return E(e.dtype==="int32"||e.dtype==="float32",function(){return"Input dtype must be `int32` or `float32`."}),e.dtype==="int32"&&(e=e.toFloat()),T.runKernelFunc(function(t,n){var o=t.erf(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.mul(o.square().neg().exp().mul(2/Math.sqrt(Math.PI)))}}})}}),ma=D({exp_:function(r){var e=_(r,"x","exp");return T.runKernelFunc(function(t,n){var o=t.exp(e);return n([o]),o},{x:e},function(t,n){return{x:function(){return t.mulStrict(n[0])}}},"Exp",{},[],[!0])}}),Yp=D({expm1_:function(r){var e=_(r,"x","expm1");return T.runKernelFunc(function(t,n){var o=t.expm1(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.mul(o.exp())}}})}}),$p=D({floor_:function(r){var e=_(r,"x","floor");return T.runKernelFunc(function(t){return t.floor(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),Jp=D({log_:function(r){var e=_(r,"x","log"),t=[e];return T.runKernelFunc(function(n,o){var a=n.log(e);return o([e]),a},{x:e},function(n,o){var a=o[0];return{x:function(){return n.div(a.toFloat())}}},"Log",{},t)}}),Qp=D({log1p_:function(r){var e=_(r,"x","log1p");return T.runKernelFunc(function(t,n){var o=t.log1p(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.div(o.add(1))}}})}}),Zp=D({logSigmoid_:function(r){var e=_(r,"x","logSigmoid");return T.runKernelFunc(function(t,n){var o=t.softplus(e.neg()).neg();return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.mul(o.neg().sigmoid())}}})}}),Qr=D({neg_:function(r){var e=_(r,"x","neg"),t=[e];return T.runKernelFunc(function(n){return n.neg(e)},{x:e},function(n){return{x:function(){return n.neg()}}},"Neg",{},t)}}),td=D({reciprocal_:function(r){var e=_(r,"x","reciprocal");return T.runKernelFunc(function(t,n){var o=t.reciprocal(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.div(o.square().neg())}}})}}),ed=D({round_:function(r){var e=_(r,"x","round");return T.runKernelFunc(function(t){return t.round(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),Eu=D({rsqrt_:function(r){var e=_(r,"x","rsqrt"),t=[e];return T.runKernelFunc(function(n,o){var a=n.rsqrt(e);return o([e]),a},{x:e},function(n,o){var a=o[0];return{x:function(){return n.div(a.pow(1.5).mul(2)).neg()}}},"Rsqrt",{},t)}}),Ru=D({sigmoid_:function(r){var e=_(r,"x","sigmoid");return T.runKernelFunc(function(t,n){var o=t.sigmoid(e);return n([o]),o},{x:e},function(t,n){var o=n[0];return{x:function(){return t.mul(o.mul(q(1).sub(o)))}}},"Sigmoid")}}),nd=D({sign_:function(r){var e=_(r,"x","sign");return T.runKernelFunc(function(t){return t.sign(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),rd=D({isNaN_:function(r){var e=_(r,"x","isNaN");return T.runKernelFunc(function(t){return t.isNaN(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),od=D({isInf_:function(r){var e=_(r,"x","isInf");return T.runKernelFunc(function(t){return t.isInf(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),ad=D({isFinite_:function(r){var e=_(r,"x","isFinite");return T.runKernelFunc(function(t){return t.isFinite(e)},{$x:e},function(t){return{$x:function(){return vt(t)}}})}}),id=D({sin_:function(r){var e=_(r,"x","sin"),t=[e];return T.runKernelFunc(function(n,o){var a=n.sin(e);return o([e]),a},{x:e},function(n,o){var a=o[0];return{x:function(){return a.toFloat().cos().mul(n)}}},"Sin",{},t)}}),sd=D({sinh_:function(r){var e=_(r,"x","sinh");return T.runKernelFunc(function(t,n){var o=t.sinh(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return o.toFloat().cosh().mulStrict(t)}}})}}),ud=D({softplus_:function(r){var e=_(r,"x","softplus");return T.runKernelFunc(function(t,n){var o=t.softplus(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.mul(o.sigmoid())}}})}}),cd=D({sqrt_:function(r){var e=_(r,"x","sqrt");return T.runKernelFunc(function(t,n){var o=t.sqrt(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.div(o.toFloat().sqrt().mul(2))}}})}}),ld=D({step_:function(r,e){e===void 0&&(e=0);var t=_(r,"x","step");return T.runKernelFunc(function(n){return n.step(t,e)},{$x:t},function(n){return{$x:function(){return vt(n)}}})}}),hd=D({tan_:function(r){var e=_(r,"x","tan");return T.runKernelFunc(function(t,n){var o=t.tan(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return t.div(o.cos().square())}}})}}),fd=D({tanh_:function(r){var e=_(r,"x","tanh");return T.runKernelFunc(function(t,n){var o=t.tanh(e);return n([o]),o},{x:e},function(t,n){var o=n[0];return{x:function(){return q(1).sub(o.square()).mulStrict(t)}}},"Tanh",{},null,[!0])}});function Iu(r,e,t,n,o,a){var i,s,u=_(r,"x","batchNorm"),c=_(e,"mean","batchNorm"),l=_(t,"variance","batchNorm");return o!=null&&(i=_(o,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),E(u.rank===2,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."}),E(c.rank===2||c.rank===1,function(){return"Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank "+c.rank+"."}),E(l.rank===2||l.rank===1,function(){return"Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank "+l.rank+"."}),i!=null&&E(i.rank===2||i.rank===1,function(){return"Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank "+i.rank+"."}),s!=null&&E(s.rank===2||s.rank===1,function(){return"Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank "+s.rank+"."}),mr(u,c,l,s,i,a)}function ku(r,e,t,n,o,a){var i,s,u=_(r,"x","batchNorm"),c=_(e,"mean","batchNorm"),l=_(t,"variance","batchNorm");return o!=null&&(i=_(o,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),E(u.rank===3,function(){return"Error in batchNorm3D: x must be rank 3 but got rank "+u.rank+"."}),E(c.rank===3||c.rank===1,function(){return"Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank "+c.rank+"."}),E(l.rank===3||l.rank===1,function(){return"Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank "+l.rank+"."}),i!=null&&E(i.rank===3||i.rank===1,function(){return"Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank "+i.rank+"."}),s!=null&&E(s.rank===3||s.rank===1,function(){return"Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank "+s.rank+"."}),mr(u,c,l,s,i,a)}function Su(r,e,t,n,o,a){var i,s,u=_(r,"x","batchNorm"),c=_(e,"mean","batchNorm"),l=_(t,"variance","batchNorm");return o!=null&&(i=_(o,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),E(u.rank===4,function(){return"Error in batchNorm4D: x must be rank 4 but got rank "+u.rank+"."}),E(c.rank===4||c.rank===1,function(){return"Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank "+c.rank+"."}),E(l.rank===4||l.rank===1,function(){return"Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank "+l.rank+"."}),i!=null&&E(i.rank===4||i.rank===1,function(){return"Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank "+i.rank+"."}),s!=null&&E(s.rank===4||s.rank===1,function(){return"Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank "+s.rank+"."}),mr(u,c,l,s,i,a)}function mr(r,e,t,n,o,a){a==null&&(a=.001);var i,s,u,c=_(r,"x","batchNorm"),l=_(e,"mean","batchNorm"),h=_(t,"variance","batchNorm");o!=null&&(i=_(o,"scale","batchNorm")),n!=null&&(s=_(n,"offset","batchNorm")),E(l.rank===h.rank,function(){return"Batch normalization gradient requires mean and variance to have equal ranks."}),E(s==null||l.rank===s.rank,function(){return"Batch normalization gradient requires mean and offset to have equal ranks."}),E(i==null||l.rank===i.rank,function(){return"Batch normalization gradient requires mean and scale to have equal ranks."}),u=c.rank===0||c.rank===1?c.as4D(1,1,1,c.size):c.rank===2?c.as4D(1,1,c.shape[0],c.shape[1]):c.rank===3?c.as4D(1,c.shape[0],c.shape[1],c.shape[2]):c;var f=[c,l,h,i];return T.runKernelFunc(function(p,d){var m=p.batchNormalization(u,Ar(l),Ar(h),a,Ar(i),Ar(s));return d([c,l,h,i]),m},{x:c,mean:l,variance:h,scale:i,offset:s},function(p,d){var m=d,v=m[0],g=m[1],x=m[2],b=m[3],y=b??q(1),w=Mt(g.shape,u.shape),C=[];if(g.rank===1){for(var k=0;k<u.shape.length-1;++k)C.push(u.shape[k]);C.push(1)}var S=v.sub(g),R=p.mul(y),I=Eu(x.add(q(a))),N=I.mul(I).mul(I).mul(q(-.5));return{x:function(){return g.rank===1?p.mul(Bn(I.as4D(1,1,1,g.shape[0]),C)).mul(y).reshape(v.shape):p.mul(I).mul(y).reshape(v.shape)},mean:function(){var A=I.mul(q(-1)).mul(R);return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)},variance:function(){var A=N.mul(S).mul(R);return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)},scale:function(){var A=S.mul(I),L=p.mul(A);return g.rank===1&&(L=L.sum(w)),L.reshape(g.shape)},offset:function(){var A=p;return g.rank===1&&(A=A.sum(w)),A.reshape(g.shape)}}},"BatchNormalization",{varianceEpsilon:a},f).reshape(c.shape)}function Ar(r){return r==null?null:r.rank===0?r.as1D():r.rank===1?r:r.rank===2?r.as4D(1,1,r.shape[0],r.shape[1]):r.rank===3?r.as4D(1,r.shape[0],r.shape[1],r.shape[2]):r}function co(){Gs("tf.batchNormalization() is going away. Use tf.batchNorm() instead, and note the positional argument change of scale, offset, and varianceEpsilon")}var pd=D({batchNormalization2d_:function(r,e,t,n,o,a){return n===void 0&&(n=.001),co(),Iu(r,e,t,a,o,n)}}),dd=D({batchNormalization3d_:function(r,e,t,n,o,a){return n===void 0&&(n=.001),co(),ku(r,e,t,a,o,n)}}),vd=D({batchNormalization4d_:function(r,e,t,n,o,a){return n===void 0&&(n=.001),co(),Su(r,e,t,a,o,n)}}),md=D({batchNormalization_:function(r,e,t,n,o,a){return n===void 0&&(n=.001),co(),mr(r,e,t,a,o,n)}}),Du=D({batchNorm_:mr}),gd=D({batchNorm2d_:Iu}),yd=D({batchNorm3d_:ku}),xd=D({batchNorm4d_:Su}),lo=D({logicalAnd_:function(r,e){var t=_(r,"a","logicalAnd","bool"),n=_(e,"b","logicalAnd","bool");return lt(t.shape,n.shape),T.runKernelFunc(function(o){return o.logicalAnd(t,n)},{a:t,b:n},null,"LogicalAnd")}}),bd=D({logicalNot_:function(r){var e=_(r,"x","logicalNot","bool");return T.runKernelFunc(function(t){return t.logicalNot(e)},{$x:e})}}),Au=D({logicalOr_:function(r,e){var t=_(r,"a","logicalOr","bool"),n=_(e,"b","logicalOr","bool");return lt(t.shape,n.shape),T.runKernelFunc(function(o){return o.logicalOr(t,n)},{$a:t,$b:n})}}),wd=D({logicalXor_:function(r,e){var t=_(r,"a","logicalXor","bool"),n=_(e,"b","logicalXor","bool");return lt(t.shape,n.shape),Au(r,e).logicalAnd(lo(r,e).logicalNot())}}),xn=D({where_:function(r,e,t){var n=_(e,"a","where"),o=_(t,"b","where"),a=_(r,"condition","where","bool");return yt(n.shape,o.shape,"Error in where: "),a.rank===1?E(a.shape[0]===n.shape[0],function(){return"The first dimension of `a` must match the size of `condition`."}):yt(a.shape,o.shape,"Error in where: "),T.runKernelFunc(function(i,s){var u=i.select(a,n,o);return s([a]),u},{$condition:a,$a:n,$b:o},function(i,s){var u=s[0];return{$condition:function(){return vt(u).toFloat()},$a:function(){return i.mul(u.cast(i.dtype))},$b:function(){return i.mul(u.logicalNot().cast(i.dtype))}}})}}),Tu=function(r){return X(this,void 0,void 0,function(){var e,t,n;return Y(this,function(o){switch(o.label){case 0:return[4,(e=_(r,"condition","whereAsync","bool")).data()];case 1:return t=o.sent(),n=Ma(e.shape,t),r!==e&&e.dispose(),[2,n]}})})},ut=D({add_:function(r,e){var t,n=_(r,"a","add"),o=_(e,"b","add");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i){return i.add(n,o)},{a:n,b:o},function(i){return{a:function(){var s=i,u=Mt(n.shape,a);return u.length>0&&(s=s.sum(u)),s.reshape(n.shape)},b:function(){var s=i,u=Mt(o.shape,a);return u.length>0&&(s=s.sum(u)),s.reshape(o.shape)}}},"Add")}}),Cd=D({addN_:function(r){E(Array.isArray(r),function(){return"The argument passed to tf.addN() must be a list of tensors"}),E(r.length>=1,function(){return"Must pass at least one tensor to tf.addN(), but got "+r.length});var e=r.map(function(o,a){return _(o,"tensors"+a,"addN")}),t=e[0];e.forEach(function(o){if(o.dtype!==t.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(function(o){if(!Wt(o.shape,t.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});var n=e;return T.runKernelFunc(function(o){return o.addN(e)},n,function(o){var a={};return e.forEach(function(i,s){a[s]=function(){return o.clone()}}),a},"AddN")}}),_d=D({addStrict_:function(r,e){var t=_(r,"a","addStrict"),n=_(e,"b","addStrict");return yt(t.shape,n.shape,"Error in addStrict: "),t.add(n)}}),Ed=D({atan2_:function(r,e){var t,n=_(r,"a","atan2"),o=_(e,"b","atan2");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i,s){var u=i.atan2(n,o);return s([n,o]),u},{$a:n,$b:o},function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=ut(u.square(),c.square()),h=i.mul(c.div(l)),f=Mt(u.shape,a);return f.length>0&&(h=h.sum(f)),h.reshape(u.shape)},$b:function(){var l=ut(u.square(),c.square()),h=Qr(i.mul(u.div(l))),f=Mt(c.shape,a);return f.length>0&&(h=h.sum(f)),h.reshape(c.shape)}}})}}),ve=D({div_:function(r,e){var t,n=_(r,"a","div"),o=_(e,"b","div");if(t=It(n,o),n=t[0],o=t[1],n.dtype==="int32"&&o.dtype==="int32")return Nu(n,o);var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i,s){var u=i.realDivide(n,o);return s([n,o]),u},{a:n,b:o},function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),h=Mt(u.shape,a);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=Mt(c.shape,a);h.length>0&&(l=l.sum(h).reshape(c.shape));var f=c.square();return l.div(f.toFloat()).neg()}}},"Div")}}),Rd=D({divNoNan_:function(r,e){var t,n=_(r,"a","div"),o=_(e,"b","div");n=(t=It(n,o))[0],o=t[1];var a=ve(n,o),i=vt(a),s=o.equal(i);return xn(s,i,a)}}),Id=D({divStrict_:function(r,e){var t=_(r,"a","div"),n=_(e,"b","div");return yt(t.shape,n.shape,"Error in divideStrict: "),t.div(n)}}),Nu=D({floorDiv_:function(r,e){var t,n=_(r,"a","floorDiv"),o=_(e,"b","floorDiv");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i,s){var u=i.floorDiv(n,o);return s([n,o]),u},{a:n,b:o},function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.div(c.toFloat()),h=Mt(u.shape,a);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=Mt(c.shape,a);h.length>0&&(l=l.sum(h).reshape(c.shape));var f=c.square();return l.div(f.toFloat()).neg()}}},"FloorDiv")}}),Ua=D({maximum_:function(r,e){var t,n=_(r,"a","maximum"),o=_(e,"b","maximum");return t=It(n,o),n=t[0],o=t[1],n.dtype==="bool"&&(n=n.toInt(),o=o.toInt()),lt(n.shape,o.shape),T.runKernelFunc(function(a,i){var s=a.maximum(n,o);return i([n,o]),s},{a:n,b:o},function(a,i){var s=i[0],u=i[1];return{a:function(){return a.mul(s.greaterEqual(u).toFloat())},b:function(){return a.mul(s.less(u).toFloat())}}},"Maximum")}}),kd=D({maximumStrict_:function(r,e){var t=_(r,"a","maximumStrict"),n=_(e,"b","maximumStrict");return yt(t.shape,n.shape,"Error in maximumStrict: "),t.maximum(n)}}),Fu=D({minimum_:function(r,e){var t,n=_(r,"a","minimum"),o=_(e,"b","minimum");return t=It(n,o),n=t[0],o=t[1],n.dtype==="bool"&&(n=n.toInt(),o=o.toInt()),lt(n.shape,o.shape),T.runKernelFunc(function(a,i){var s=a.minimum(n,o);return i([n,o]),s},{a:n,b:o},function(a,i){var s=i[0],u=i[1];return{a:function(){return a.mul(s.lessEqual(u).toFloat())},b:function(){return a.mul(s.greater(u).toFloat())}}},"Minimum")}}),Sd=D({minimumStrict_:function(r,e){var t=_(r,"a","minimumStrict"),n=_(e,"b","minimumStrict");return yt(t.shape,n.shape,"Error in minimumStrict: "),t.minimum(n)}}),Dd=D({mod_:function(r,e){var t,n=_(r,"a","mod"),o=_(e,"b","mod");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i,s){var u=i.mod(n,o);return s([n,o]),u},{$a:n,$b:o},function(i,s){var u=s[0],c=s[1];return{$a:function(){var l=Mt(u.shape,a);return l.length>0?i.sum(l).reshape(u.shape):i},$b:function(){var l=i.mul(u.div(c).floor().neg()),h=Mt(c.shape,a);return h.length>0?l.sum(h).reshape(c.shape):l}}})}}),Ad=D({modStrict_:function(r,e){var t=_(r,"a","modStrict"),n=_(e,"b","modStrict");return yt(t.shape,n.shape,"Error in modStrict: "),t.mod(n)}}),Xt=D({mul_:function(r,e){var t,n=_(r,"a","mul"),o=_(e,"b","mul");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i,s){var u=i.multiply(n,o);return s([n,o]),u},{a:n,b:o},function(i,s){var u=s[0],c=s[1];return{a:function(){var l=i.mul(c.toFloat()),h=Mt(u.shape,a);return h.length>0?l.sum(h).reshape(u.shape):l},b:function(){var l=i.mul(u.toFloat()),h=Mt(c.shape,a);return h.length>0?l.sum(h).reshape(c.shape):l}}},"Mul")}}),Td=D({mulStrict_:function(r,e){var t=_(r,"a","mul"),n=_(e,"b","mul");return yt(t.shape,n.shape,"Error in multiplyStrict: "),t.mul(n)}}),Zr=D({pow_:function(r,e){var t,n=_(r,"base","pow"),o=_(e,"exp","pow");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape),i=[n,o];return T.runKernelFunc(function(s,u){var c=s.pow(n,o);return u([n,o,c]),c},{a:n,b:o},function(s,u){var c=u[0],l=u[1],h=u[2];return{a:function(){var f=l.toFloat(),p=s.mul(f.mul(c.pow(f.sub(q(1))))),d=Mt(c.shape,a);return d.length>0&&(p=p.sum(d)),p.reshape(c.shape)},b:function(){var f=c.greater(0),p=c.log().where(f,vt(c)),d=s.mul(h.mul(p)),m=Mt(l.shape,a);return m.length>0&&(d=d.sum(m)),d.reshape(l.shape)}}},"Pow",{},i,[!0])}}),Nd=D({powStrict_:function(r,e){return yt(r.shape,e.shape,"Error in powStrict: "),r.pow(e)}}),Fd=D({squaredDifferenceStrict_:function(r,e){var t=_(r,"a","squaredDifferenceStrict"),n=_(e,"b","squaredDifferenceStrict");return yt(t.shape,n.shape,"Error in squaredDifferenceStrict: "),t.squaredDifference(n)}}),Ot=D({sub_:function(r,e){var t,n=_(r,"a","sub"),o=_(e,"b","sub");t=It(n,o),n=t[0],o=t[1];var a=lt(n.shape,o.shape);return T.runKernelFunc(function(i){return i.subtract(n,o)},{a:n,b:o},function(i){return{a:function(){var s=i,u=Mt(n.shape,a);return u.length>0&&(s=s.sum(u)),s.reshape(n.shape)},b:function(){var s=i,u=Mt(o.shape,a);return u.length>0&&(s=s.sum(u)),s.neg().reshape(o.shape)}}},"Sub")}}),Pd=D({subStrict_:function(r,e){var t=_(r,"a","subStrict"),n=_(e,"b","subStrict");return yt(t.shape,n.shape,"Error in subStrict: "),t.sub(n)}}),Pu=D({equal_:function(r,e){var t,n=_(r,"a","equal"),o=_(e,"b","equal");return t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape),T.runKernelFunc(function(a){return a.equal(n,o)},{$a:n,$b:o})}}),Md=D({equalStrict_:function(r,e){var t=_(r,"a","equalStrict"),n=_(e,"b","equalStrict");return yt(t.shape,n.shape,"Error in equalStrict: "),t.equal(n)}}),Od=D({greater_:function(r,e){var t,n=_(r,"a","greater"),o=_(e,"b","greater");return t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape),T.runKernelFunc(function(a){return a.greater(n,o)},{a:n,b:o},null,"Greater")}}),Mu=D({greaterEqual_:function(r,e){var t,n=_(r,"a","greaterEqual"),o=_(e,"b","greaterEqual");return t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape),T.runKernelFunc(function(a,i){var s=a.greaterEqual(n,o);return i([n,o]),s},{a:n,b:o},function(a,i){var s=i[0],u=i[1];return{a:function(){return vt(s)},b:function(){return vt(u)}}},"GreaterEqual")}}),Bd=D({greaterEqualStrict_:function(r,e){var t=_(r,"a","greaterEqualStrict"),n=_(e,"b","greaterEqualStrict");return yt(t.shape,n.shape,"Error in greaterEqualStrict: "),t.greaterEqual(n)}}),Ld=D({greaterStrict_:function(r,e){var t=_(r,"a","greaterStrict"),n=_(e,"b","greaterStrict");return yt(t.shape,n.shape,"Error in greaterStrict: "),t.greater(n)}}),Wd=D({less_:function(r,e){var t,n=_(r,"a","less"),o=_(e,"b","less");return t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape),T.runKernelFunc(function(a){return a.less(n,o)},{a:n,b:o},null,"Less")}}),Ud=D({lessEqual_:function(r,e){var t,n=_(r,"a","lessEqual"),o=_(e,"b","lessEqual");return t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape),T.runKernelFunc(function(a,i){var s=a.lessEqual(n,o);return i([n,o]),s},{a:n,b:o},null,"LessEqual")}}),zd=D({lessEqualStrict_:function(r,e){var t=_(r,"a","lessEqualStrict"),n=_(e,"b","lessEqualStrict");return yt(t.shape,n.shape,"Error in lessEqualStrict: "),t.lessEqual(n)}}),Vd=D({lessStrict_:function(r,e){var t=_(r,"a","lessStrict"),n=_(e,"b","lessStrict");return yt(t.shape,n.shape,"Error in lessStrict: "),t.less(n)}}),Gd=D({notEqual_:function(r,e){var t,n=_(r,"a","notEqual"),o=_(e,"b","notEqual");return t=It(n,o),n=t[0],o=t[1],lt(n.shape,o.shape),T.runKernelFunc(function(a){return a.notEqual(n,o)},{a:n,b:o},null,"NotEqual")}}),Hd=D({notEqualStrict_:function(r,e){var t=_(r,"a","notEqualStrict"),n=_(e,"b","notEqualStrict");return yt(t.shape,n.shape,"Error in notEqualStrict: "),t.notEqual(n)}});function as(r,e){for(var t=[],n=r;n<e;++n)t.push(n);return t}function is(r){for(var e=[],t=0;t<r.length;++t)for(var n=0;n<r[t].length;++n)e.push(r[t][n]);return e}var za=D({gather_:function(r,e,t){t===void 0&&(t=0);var n=_(r,"x","gather"),o=_(e,"indices","gather","int32");t=Bt(t,n.shape)[0];var a=function(i,s,u){for(var c=i.shape[u],l=[],h=1,f=1,p=0;p<u;p++)l.push(i.shape[p]),h*=i.shape[p];for(p=0;p<s.rank;p++)l.push(s.shape[p]);for(p=u+1;p<i.rank;p++)l.push(i.shape[p]),f*=i.shape[p];return{batchSize:h,sliceSize:f,dimSize:c,outputShape:l}}(n,o,t);return T.runKernelFunc(function(i,s){var u=i.gather(n,o.flatten(),t);return s([o]),u},{x:n,indices:o},function(i,s){var u=s[0];return{x:function(){var c=n.shape,l=u.size,h=c.slice(0,t),f=h.length,p=c.slice(t,c.length).slice(1),d=p.length,m=as(0,f),v=as(f+1,f+1+d),g=is([h,[l],p]),x=i.reshape(g),b=u.reshape([l]),y=is([[f],m,v]),w=x.transpose(y),C=Ou(w,b,n.shape[t]),k=ka(y);return C=C.transpose(k)},indices:function(){return u}}},"Gather",{axis:t}).reshape(a.outputShape)}}),Ou=D({unsortedSegmentSum_:function(r,e,t){var n=_(r,"x","unsortedSegmentSum"),o=_(e,"segmentIds","unsortedSegmentSum","int32");return E(Dt(t),function(){return"numSegments must be of dtype int"}),T.runKernelFunc(function(a,i){var s=a.unsortedSegmentSum(n,o,t);return i([o]),s},{$x:n},function(a,i){var s=i[0];return{$x:function(){return function(u,c){for(var l=Ua(c,vt(c)),h=za(u,l),f=Mu(c,q(0,"int32")),p=h.rank-f.rank,d=0;d<p;++d)f=he(f,d+1);f=lo(f,Yn(h.shape,"bool"));var m=vt(h);return xn(f,h,m)}(a,s)}}})}}),qd=function(r,e,t){return X(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,h,f,p,d,m;return Y(this,function(v){switch(v.label){case 0:for(n=_(r,"tensor","boolMask"),o=_(e,"mask","boolMask","bool"),a=t??0,i=o.rank,s=n.shape,E(i>0,function(){return"mask cannot be scalar"}),yt(s.slice(a,a+i),o.shape,"mask's shape must match the first K dimensions of tensor's shape,"),u=1,c=a;c<a+i;c++)u*=s[c];return l=s.slice(0,a).concat([u],s.slice(a+i)),h=n.reshape(l),f=o.reshape([-1]),[4,Tu(f)];case 1:return p=v.sent(),d=p.squeeze([1]),m=za(h,d,a),r!==n&&n.dispose(),e!==o&&o.dispose(),d.dispose(),h.dispose(),f.dispose(),p.dispose(),[2,m]}})})};function Bu(r,e,t,n,o,a,i){a===void 0&&(a="NHWC"),E(r.length===e.rank,function(){return"Length of inShape ("+r.length+") and rank of dy ("+e.rank+") must match"});var s=r,u=e,c=!1;e.rank===3&&(c=!0,u=e.as4D(1,e.shape[0],e.shape[1],e.shape[2]),s=[1,r[0],r[1],r[2]]),E(s.length===4,function(){return"Error in conv2dDerInput: inShape must be length 4, but got length "+s.length+"."}),E(u.rank===4,function(){return"Error in conv2dDerInput: dy must be rank 4, but got rank "+u.rank}),E(t.rank===4,function(){return"Error in conv2dDerInput: filter must be rank 4, but got rank "+t.rank});var l=a==="NHWC"?s[3]:s[1],h=a==="NHWC"?u.shape[3]:u.shape[1];E(l===t.shape[2],function(){return"Error in conv2dDerInput: depth of input ("+l+") must match input depth for filter "+t.shape[2]+"."}),E(h===t.shape[3],function(){return"Error in conv2dDerInput: depth of output ("+h+") must match output depth for filter "+t.shape[3]+"."}),i!=null&&E(Dt(o),function(){return"Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var f=Na(a),p=Cn(s,t.shape,n,1,o,i,!1,f),d=T.runKernelFunc(function(m,v){var g=m.conv2dDerInput(u,t,p);return v([t,u]),g},{dy4D:u,filter:t},function(m,v){var g=v[0],x=v[1];return{dy4D:function(){return de(m,g,n,o,a,1,i)},filter:function(){return Va(m,x,g.shape,n,o,a,i)}}});return c?d.as3D(d.shape[1],d.shape[2],d.shape[3]):d}function qo(r){var e=function(a){return typeof a=="number"?[a,a,a]:a.length===2?[a[0],a[1],1]:a}(r),t=e[0],n=e[1],o=e[2];return t===1&&n===1&&o===1}function Lu(r,e,t,n,o){E(r.length===e.rank,function(){return"Length of inShape ("+r.length+") and rank of dy ("+e.rank+") must match"});var a=r,i=e,s=!1;e.rank===4&&(s=!0,i=e.as5D(1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]),a=[1,r[0],r[1],r[2],r[3]]);var u=a[4],c=i.shape[4];E(a.length===5,function(){return"Error in conv3dDerInput: inShape must be length 5, but got length "+a.length+"."}),E(i.rank===5,function(){return"Error in conv3dDerInput: dy must be rank 5, but got rank "+i.rank}),E(t.rank===5,function(){return"Error in conv3dDerInput: filter must be rank 5, but got rank "+t.rank}),E(u===t.shape[3],function(){return"Error in conv3dDerInput: depth of input ("+u+") must match input depth for filter "+t.shape[3]+"."}),E(c===t.shape[4],function(){return"Error in conv3dDerInput: depth of output ("+c+") must match output depth for filter "+t.shape[4]+"."});var l=$r(a,t.shape,n,1,o),h=T.runKernelFunc(function(f){return f.conv3dDerInput(i,t,l)},{dy5D:i});return s?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}var jd=D({conv1d_:function(r,e,t,n,o,a,i){o===void 0&&(o="NWC"),a===void 0&&(a=1);var s=_(r,"x","conv1d"),u=_(e,"filter","conv1d"),c=s,l=!1;s.rank===2&&(l=!0,c=s.as3D(1,s.shape[0],s.shape[1])),E(c.rank===3,function(){return"Error in conv1d: input must be rank 3, but got rank "+c.rank+"."}),E(u.rank===3,function(){return"Error in conv1d: filter must be rank 3, but got rank "+u.rank+"."}),i!=null&&E(Dt(n),function(){return"Error in conv1d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."}),E(c.shape[2]===u.shape[1],function(){return"Error in conv1d: depth of input ("+c.shape[2]+") must match input depth for filter "+u.shape[1]+"."}),E(ee(t,a),function(){return"Error in conv1D: Either stride or dilation must be 1. Got stride "+t+" and dilation '"+a+"'"}),E(o==="NWC",function(){return"Error in conv1d: got dataFormat of "+o+" but only NWC is currently supported."});var h=u.as4D(1,u.shape[0],u.shape[1],u.shape[2]),f=c.as4D(c.shape[0],1,c.shape[1],c.shape[2]),p=de(f,h,[1,t],n,"NHWC",[1,a],i);return l?p.as2D(p.shape[2],p.shape[3]):p.as3D(p.shape[0],p.shape[2],p.shape[3])}}),de=D({conv2d_:function(r,e,t,n,o,a,i){o===void 0&&(o="NHWC"),a===void 0&&(a=[1,1]);var s=_(r,"x","conv2d"),u=_(e,"filter","conv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),E(c.rank===4,function(){return"Error in conv2d: input must be rank 4, but got rank "+c.rank+"."}),E(u.rank===4,function(){return"Error in conv2d: filter must be rank 4, but got rank "+u.rank+"."}),i!=null&&E(Dt(n),function(){return"Error in conv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."});var h=o==="NHWC"?c.shape[3]:c.shape[1];E(h===u.shape[2],function(){return"Error in conv2d: depth of input ("+h+") must match input depth for filter "+u.shape[2]+"."}),E(ee(t,a),function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+a+"'"});var f=Na(o),p=Cn(c.shape,u.shape,t,a,n,i,!1,f),d=[u,c],m=T.runKernelFunc(function(v,g){var x=v.conv2d(c,u,p);return g([u,c]),x},{x:c,filter:u},function(v,g){var x=g,b=x[0],y=x[1];return E(Kn(a),function(){return"Error in gradient of conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+a+"'"}),{x:function(){return Wu(y.shape,v,b,t,n,o)},filter:function(){return Va(y,v,b.shape,t,n,o)}}},"Conv2D",p,d);return l?m.as3D(m.shape[1],m.shape[2],m.shape[3]):m}}),Kd=D({conv3d_:function(r,e,t,n,o,a){o===void 0&&(o="NDHWC"),a===void 0&&(a=[1,1,1]);var i=_(r,"x","conv3d"),s=_(e,"filter","conv3d"),u=i,c=!1;i.rank===4&&(c=!0,u=i.as5D(1,i.shape[0],i.shape[1],i.shape[2],i.shape[3])),E(u.rank===5,function(){return"Error in conv3d: input must be rank 5, but got rank "+u.rank+"."}),E(s.rank===5,function(){return"Error in conv3d: filter must be rank 5, but got rank "+s.rank+"."}),E(u.shape[4]===s.shape[3],function(){return"Error in conv3d: depth of input ("+u.shape[4]+") must match input depth for filter "+s.shape[3]+"."}),E(function(f,p){return qo(f)||qo(p)}(t,a),function(){return"Error in conv3D: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+a+"'"}),E(o==="NDHWC",function(){return"Error in conv3d: got dataFormat of "+o+" but only NDHWC is currently supported."});var l=$r(u.shape,s.shape,t,a,n),h=T.runKernelFunc(function(f,p){var d=f.conv3d(u,s,l);return p([u,s]),d},{x:u,$filter:s},function(f,p){E(qo(a),function(){return"Error in gradient of conv3D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+a+"'"});var d=p[0],m=p[1];return{x:function(){return Lu(d.shape,f,m,t,n)},$filter:function(){return function(v,g,x,b,y){var w=v;v.rank===4&&(w=v.as5D(1,v.shape[0],v.shape[1],v.shape[2],v.shape[3]));var C=g;C.rank===4&&(C=g.as5D(1,g.shape[0],g.shape[1],g.shape[2],g.shape[3])),E(w.rank===5,function(){return"Error in conv3dDerFilter: input must be rank 5, but got shape "+w.shape+"."}),E(C.rank===5,function(){return"Error in conv3dDerFilter: dy must be rank 5, but got shape "+C.shape+"."}),E(x.length===5,function(){return"Error in conv3dDerFilter: filterShape must be length 5, but got "+x+"."}),E(w.shape[4]===x[3],function(){return"Error in conv3dDerFilter: depth of input "+w.shape[4]+") must match input depth in filter ("+x[3]+"."}),E(C.shape[4]===x[4],function(){return"Error in conv3dDerFilter: depth of dy ("+C.shape[4]+") must match output depth for filter ("+x[4]+")."});var k=$r(w.shape,x,b,1,y);return T.runKernelFunc(function(S){return S.conv3dDerFilter(w,C,k)},{x5D:w,dy5D:C})}(d,f,m.shape,t,n)}}});return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),Va=D({conv2dDerFilter_:function(r,e,t,n,o,a,i){a===void 0&&(a="NHWC");var s=r;r.rank===3&&(s=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var u=e;u.rank===3&&(u=e.as4D(1,e.shape[0],e.shape[1],e.shape[2])),E(s.rank===4,function(){return"Error in conv2dDerFilter: input must be rank 4, but got shape "+s.shape+"."}),E(u.rank===4,function(){return"Error in conv2dDerFilter: dy must be rank 4, but got shape "+u.shape+"."}),E(t.length===4,function(){return"Error in conv2dDerFilter: filterShape must be length 4, but got "+t+"."});var c=a==="NHWC"?s.shape[3]:s.shape[1],l=a==="NHWC"?u.shape[3]:u.shape[1];E(c===t[2],function(){return"Error in conv2dDerFilter: depth of input "+c+") must match input depth in filter ("+t[2]+"."}),E(l===t[3],function(){return"Error in conv2dDerFilter: depth of dy ("+l+") must match output depth for filter ("+t[3]+")."}),i!=null&&E(Dt(o),function(){return"Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+o+"."});var h=Na(a),f=Cn(s.shape,t,n,1,o,i,!1,h);return T.runKernelFunc(function(p){return p.conv2dDerFilter(s,u,f)},{x4D:s,dy4D:u})}}),Wu=D({conv2dDerInput_:Bu}),ho=D({depthwiseConv2d_:function(r,e,t,n,o,a,i){a===void 0&&(a=[1,1]);var s=_(r,"x","depthwiseConv2d"),u=_(e,"filter","depthwiseConv2d"),c=s,l=!1;s.rank===3&&(l=!0,c=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),E(c.rank===4,function(){return"Error in depthwiseConv2d: input must be rank 4, but got rank "+c.rank+"."}),E(u.rank===4,function(){return"Error in depthwiseConv2d: filter must be rank 4, but got rank "+u.rank+"."}),E(c.shape[3]===u.shape[2],function(){return"Error in depthwiseConv2d: number of input channels ("+c.shape[3]+") must match the inChannels dimension in filter "+u.shape[2]+"."}),a==null&&(a=[1,1]),E(ee(t,a),function(){return"Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+a+"'"}),i!=null&&E(Dt(n),function(){return"Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode "+i+" but got pad "+n+"."});var h=Cn(c.shape,u.shape,t,a,n,i,!0),f=[c,u],p=T.runKernelFunc(function(d,m){var v=d.depthwiseConv2D(c,u,h);return m([c,u]),v},{x:c,filter:u},function(d,m){E(Kn(a),function(){return"Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+a+"'"});var v=m[0],g=m[1];return{x:function(){return Uu(v.shape,d,g,h)},filter:function(){return zu(v,d,g.shape,h)}}},"DepthwiseConv2dNative",h,f);return l?p.as3D(p.shape[1],p.shape[2],p.shape[3]):p}}),Uu=D({depthwiseConv2dDerInput_:function(r,e,t,n){var o=e,a=!1;e.rank===3&&(a=!0,o=e.as4D(1,e.shape[0],e.shape[1],e.shape[2]));var i=T.runKernelFunc(function(s){return s.depthwiseConv2DDerInput(o,t,n)},{dy4D:o});return a?i.as3D(i.shape[1],i.shape[2],i.shape[3]):i}}),zu=D({depthwiseConv2dDerFilter_:function(r,e,t,n){var o=r;r.rank===3&&(o=r.as4D(1,r.shape[0],r.shape[1],r.shape[2]));var a=e;return a.rank===3&&(a=e.as4D(1,e.shape[0],e.shape[1],e.shape[2])),T.runKernelFunc(function(i){return i.depthwiseConv2DDerFilter(o,a,n)},{x4D:o,dy4D:a})}}),Ga=D({separableConv2d_:function(r,e,t,n,o,a,i){a===void 0&&(a=[1,1]),i===void 0&&(i="NHWC");var s=_(r,"x","separableConv2d"),u=_(e,"depthwiseFilter","separableConv2d"),c=_(t,"pointwiseFilter","separableConv2d"),l=s,h=!1;if(s.rank===3&&(h=!0,l=s.as4D(1,s.shape[0],s.shape[1],s.shape[2])),i==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");E(l.rank===4,function(){return"Error in separableConv2d: input must be rank 4, but got rank "+l.rank+"."}),E(u.rank===4,function(){return"Error in separableConv2d: depthwise filter must be rank 4, but got rank "+u.rank+"."}),E(c.rank===4,function(){return"Error in separableConv2d: pointwise filter must be rank 4, but got rank "+u.rank+"."}),E(c.shape[0]===1,function(){return"Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got "+c.shape[0]+"."}),E(c.shape[1]===1,function(){return"Error in separableConv2d: the second dimension of pointwise filter must be 1, but got "+c.shape[1]+"."});var f=u.shape[2],p=u.shape[3];E(c.shape[2]===f*p,function(){return"Error in separableConv2d: the third dimension of pointwise filter must be "+f*p+", but got "+c.shape[2]+"."});var d=ho(l,u,n,o,i,a),m=de(d,c,1,"valid",i);return h?m.as3D(m.shape[1],m.shape[2],m.shape[3]):m}}),Xd=D({conv2dTranspose_:function(r,e,t,n,o,a){return Bu(t,_(r,"x","conv2dTranspose"),_(e,"filter","conv2dTranspose"),n,o,"NHWC",a)}}),Yd=D({conv3dTranspose_:function(r,e,t,n,o){return Lu(t,_(r,"x","conv3dTranspose"),_(e,"filter","conv3dTranspose"),n,o)}}),fo=D({matMul_:function(r,e,t,n){var o;t===void 0&&(t=!1),n===void 0&&(n=!1);var a=_(r,"a","matMul"),i=_(e,"b","matMul");o=It(a,i),a=o[0],i=o[1];var s=t?a.shape[a.rank-2]:a.shape[a.rank-1],u=n?i.shape[i.rank-1]:i.shape[i.rank-2],c=t?a.shape[a.rank-1]:a.shape[a.rank-2],l=n?i.shape[i.rank-2]:i.shape[i.rank-1],h=a.shape.slice(0,-2),f=i.shape.slice(0,-2),p=$(h),d=$(f);E(a.rank>=2&&i.rank>=2&&a.rank===i.rank,function(){return"Error in matMul: inputs must have the same rank of at least 2, got ranks "+a.rank+" and "+i.rank+"."}),E(Wt(h,f),function(){return"Error in matMul: outer dimensions ("+h+") and ("+f+") of Tensors with shapes "+a.shape+" and "+i.shape+" must match."}),E(s===u,function(){return"Error in matMul: inner shapes ("+s+") and ("+u+") of Tensors with shapes "+a.shape+" and "+i.shape+" and transposeA="+t+" and transposeB="+n+" must match."});var m=a.shape.slice(0,-2).concat([c,l]),v=t?a.as3D(p,s,c):a.as3D(p,c,s),g=n?i.as3D(d,l,u):i.as3D(d,u,l),x={transposeA:t,transposeB:n};return T.runKernelFunc(function(b,y){var w=b.batchMatMul(v,g,t,n);return y([v,g]),w},{a:v,b:g},function(b,y){var w=y,C=w[0],k=w[1];return t||n?!t&&n?{a:function(){return b.matMul(k,!1,!1)},b:function(){return b.matMul(C,!0,!1)}}:t&&!n?{a:function(){return k.matMul(b,!1,!0)},b:function(){return C.matMul(b,!1,!1)}}:{a:function(){return k.matMul(b,!0,!0)},b:function(){return b.matMul(C,!0,!0)}}:{a:function(){return b.matMul(k,!1,!0)},b:function(){return C.matMul(b,!0,!1)}}},"BatchMatMul",x).reshape(m)}}),$d=D({dot_:function(r,e){var t=_(r,"t1","dot"),n=_(e,"t2","dot");E(!(t.rank!==1&&t.rank!==2||n.rank!==1&&n.rank!==2),function(){return"Error in dot: inputs must all be rank 1 or 2, but got ranks "+t.rank+" and "+n.rank+"."});var o=t.rank===1?t.size:t.shape[1],a=n.rank===1?n.size:n.shape[0];return E(o===a,function(){return"Error in dot: inner dimensions of inputs must match, but got "+o+" and "+a+"."}),t.rank===1&&n.rank===1?t.as2D(1,-1).matMul(n.as2D(-1,1)).asScalar():t.rank===1&&n.rank===2?t.as2D(1,-1).matMul(n.as2D(n.shape[0],n.shape[1])).as1D():t.rank===2&&n.rank===1?t.matMul(n.as2D(-1,1)).as1D():t.matMul(n.as2D(n.shape[0],n.shape[1]))}}),Jd=D({outerProduct_:function(r,e){var t=_(r,"v1","outerProduct"),n=_(e,"v2","outerProduct");return E(t.rank===1&&n.rank===1,function(){return"Error in outerProduct: inputs must be rank 1, but got ranks "+t.rank+" and "+n.rank+"."}),t.as2D(-1,1).matMul(n.as2D(1,-1))}}),gr=D({reverse_:function(r,e){var t=_(r,"x","reverse");if(t.rank===0)return t.clone();var n=Bt(e,t.shape);return T.runKernelFunc(function(o){return o.reverse(t,n)},{$x:t},function(o){return{$x:function(){return o.reverse(n)}}}).reshapeAs(t)}}),Qd=D({reverse1d_:function(r){var e=_(r,"x","reverse");return E(e.rank===1,function(){return"Error in reverse1D: x must be rank 1 but got rank "+e.rank+"."}),gr(e,0)}}),Zd=D({reverse2d_:function(r,e){var t=_(r,"x","reverse");return E(t.rank===2,function(){return"Error in reverse2D: x must be rank 2 but got rank "+t.rank+"."}),gr(t,e)}}),tv=D({reverse3d_:function(r,e){var t=_(r,"x","reverse");return E(t.rank===3,function(){return"Error in reverse3D: x must be rank 3 but got rank "+t.rank+"."}),gr(t,e)}}),ev=D({reverse4d_:function(r,e){var t=_(r,"x","reverse");return E(t.rank===4,function(){return"Error in reverse4D: x must be rank 4 but got rank "+t.rank+"."}),gr(t,e)}});function Vu(r,e,t,n,o,a){var i=_(r,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),n==null&&(n=[1,1]),E(s.rank===4,function(){return"Error in maxPool: input must be rank 4 but got rank "+s.rank+"."}),E(ee(t,n),function(){return"Error in maxPool: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+n+"'"}),a!=null&&E(Dt(o),function(){return"Error in maxPool: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var c=ir(s.shape,e,t,n,o,a);if(c.filterWidth===1&&c.filterHeight===1&&Wt(c.inShape,c.outShape))return i.clone();var l=[s],h=T.runKernelFunc(function(f,p){var d=f.maxPool(s,c);return p([s,d]),d},{x:s},function(f,p){var d=p[0],m=p[1];return{x:function(){return function(v,g,x,b,y,w,C,k){var S=_(v,"dy","maxPoolBackprop"),R=_(g,"input","maxPoolBackprop"),I=_(x,"output","maxPoolBackprop");E(R.rank===S.rank,function(){return"Rank of input ("+R.rank+") does not match rank of dy ("+S.rank+")"}),w==null&&(w=[1,1]),E(ee(y,w),function(){return"Error in maxPoolBackProp: Either strides or dilations must be 1. Got strides "+y+" and dilations '"+w+"'"}),E(S.rank===4,function(){return"Error in maxPoolBackprop: dy must be rank 4 but got rank "+S.rank+"."}),E(R.rank===4,function(){return"Error in maxPoolBackprop: input must be rank 4 but got rank "+R.rank+"."}),k!=null&&E(Dt(C),function(){return"Error in maxPoolBackprop: pad must be an integer when using, dimRoundingMode "+k+" but got pad "+C+"."});var N=ir(R.shape,b,y,w,C,k);return T.runKernelFunc(function(A){return A.maxPoolBackprop(S,R,I,N)},{$dy:S,$input:R})}(f,d,m,e,t,n,o)}}},"MaxPool",c,l);return u?h.as3D(h.shape[1],h.shape[2],h.shape[3]):h}function Gu(r,e,t,n,o,a){var i=_(r,"x","avgPool","float32");n==null&&(n=[1,1]),E(ee(t,n),function(){return"Error in avgPool: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+n+"'"});var s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),E(s.rank===4,function(){return"Error in avgPool: x must be rank 4 but got rank "+s.rank+"."}),a!=null&&E(Dt(o),function(){return"Error in avgPool: pad must be an integer when using, dimRoundingMode "+a+" but got pad "+o+"."});var c=ir(s.shape,e,t,n,o,a);if(c.filterWidth===1&&c.filterHeight===1&&Wt(c.inShape,c.outShape))return i.clone();var l=T.runKernelFunc(function(h){return h.avgPool(s,c)},{x:s},function(h){return{x:function(){return function(f,p,d,m,v,g){var x=_(f,"dy","avgPoolBackprop"),b=_(p,"input","avgPoolBackprop");E(b.rank===x.rank,function(){return"Rank of input ("+b.rank+") does not match rank of dy ("+x.rank+")"}),v==null&&(v=[1,1]),E(ee(m,v),function(){return"Error in avgPoolBackprop: Either strides or dilations must be 1. Got strides "+m+" and dilations '"+v+"'"});var y=b,w=x,C=!1;b.rank===3&&(C=!0,y=b.as4D(1,b.shape[0],b.shape[1],b.shape[2]),w=x.as4D(1,x.shape[0],x.shape[1],x.shape[2])),E(w.rank===4,function(){return"Error in avgPoolBackprop: dy must be rank 4 but got rank "+w.rank+"."}),E(y.rank===4,function(){return"Error in avgPoolBackprop: input must be rank 4 but got rank "+y.rank+"."});var k=ir(y.shape,d,m,v,g),S=T.runKernelFunc(function(R){return R.avgPoolBackprop(w,y,k)},{dy4D:w,input4D:y});return C?S.as3D(S.shape[1],S.shape[2],S.shape[3]):S}(h,s,e,t,n,o)}}},"AvgPool",c);return l=l.cast(i.dtype),u?l.as3D(l.shape[1],l.shape[2],l.shape[3]):l}var Lt=D({maxPool_:function(r,e,t,n,o){return Vu(r,e,t,1,n,o)}}),yr=D({avgPool_:function(r,e,t,n,o){return Gu(r,e,t,1,n,o)}}),nv=D({pool_:function(r,e,t,n,o,a){o==null&&(o=[1,1]),a==null&&(a=1),n===0&&(n="valid");var i=_(r,"x","maxPool"),s=i,u=!1;i.rank===3&&(u=!0,s=i.as4D(1,i.shape[0],i.shape[1],i.shape[2])),E(ee(a,o),function(){return"Error in pool: Either strides or dilations must be 1. Got strides "+a+" and dilations '"+o+"'"});var c,l=ir(s.shape,e,a,o,n),h=[l.dilationHeight,l.dilationWidth];c=n==="same"?function(y,w){var C=y.map(function(R,I){return R+(R-1)*(w[I]-1)}).map(function(R){return R-1}),k=C.map(function(R){return Math.floor(R/2)}),S=C.map(function(R,I){return R-k[I]});return C.map(function(R,I){return[k[I],S[I]]})}([l.filterHeight,l.filterWidth],h):[[0,0],[0,0]];var f=h[0]===1&&h[1]===1,p=function(y,w,C){var k=C.map(function(O){return O[0]}),S=C.map(function(O){return O[1]}),R=y.concat(k,S),I=w.map(function(O,B){return(O-R[B]%O)%O}),N=S.map(function(O,B){return O+I[B]}),A=w.map(function(O,B){return[k[B],N[B]]}),L=w.map(function(O,B){return[0,I[B]]});return[A,L]}([l.inHeight,l.inWidth],h,c),d=p[0],m=p[1],v=f?n:"valid",g=f?s:Ys(s,h,d),x=(t==="avg"?function(){return Gu(g,e,a,1,v)}:function(){return Vu(g,e,a,1,v)})(),b=f?x:js(x,h,m);return u?b.as3D(b.shape[1],b.shape[2],b.shape[3]):b}}),rv=D({maxPool3d_:function(r,e,t,n,o,a,i){a===void 0&&(a="NDHWC");var s=_(r,"x","maxPool3d"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),E(u.rank===5,function(){return"Error in maxPool3d: x must be rank 5 but got rank "+u.rank+"."}),E(a==="NDHWC",function(){return"Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of "+a}),E(ee(t,i),function(){return"Error in maxPool3d: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+i+"'"}),o!=null&&E(Dt(n),function(){return"Error in maxPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+n+"."});var l=Yr(u.shape,e,t,i,n,o,a),h=T.runKernelFunc(function(f,p){var d=f.maxPool3d(u,l);return p([u,d]),d},{x:u},function(f,p){var d=p[0],m=p[1];return{x:function(){return function(v,g,x,b,y,w,C,k){var S=_(v,"dy","maxPool3dBackprop"),R=_(g,"input","maxPool3dBackprop"),I=_(x,"output","maxPool3dBackprop"),N=S,A=R,L=I,O=!1;R.rank===4&&(O=!0,N=S.as5D(1,S.shape[0],S.shape[1],S.shape[2],S.shape[3]),A=R.as5D(1,R.shape[0],R.shape[1],R.shape[2],R.shape[3]),L=I.as5D(1,I.shape[0],I.shape[1],I.shape[2],I.shape[3])),E(N.rank===5,function(){return"Error in maxPool3dBackprop: dy must be rank 5 but got rank "+N.rank+"."}),E(A.rank===5,function(){return"Error in maxPool3dBackprop: input must be rank 5 but got rank "+A.rank+"."}),E(L.rank===5,function(){return"Error in maxPool3dBackprop: output must be rank 5 but got rank "+L.rank+"."}),w==null&&(w=[1,1,1]),E(ee(y,w),function(){return"Error in maxPool3dBackprop: Either strides or dilations must be 1. Got strides "+y+" and dilations '"+w+"'"}),k!=null&&E(Dt(C),function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+k+" but got pad "+C+"."});var B=Yr(A.shape,b,y,w,C,k),z=T.runKernelFunc(function(U){return U.maxPool3dBackprop(N,A,L,B)},{dy5D:N,input5D:A});return O?z.as4D(z.shape[1],z.shape[2],z.shape[3],z.shape[4]):z}(f,d,m,e,t,i,n,o)}}});return c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),ov=D({avgPool3d_:function(r,e,t,n,o,a,i){a===void 0&&(a="NDHWC");var s=_(r,"x","avgPool3d","float32"),u=s,c=!1;s.rank===4&&(c=!0,u=s.as5D(1,s.shape[0],s.shape[1],s.shape[2],s.shape[3])),i==null&&(i=[1,1,1]),E(u.rank===5,function(){return"Error in avgPool3d: x must be rank 5 but got rank "+u.rank+"."}),E(a==="NDHWC",function(){return"Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of "+a}),E(ee(t,i),function(){return"Error in avgPool3d: Either strides or dilations must be 1. Got strides "+t+" and dilations '"+i+"'"}),o!=null&&E(Dt(n),function(){return"Error in avgPool3d: pad must be an integer when using, dimRoundingMode "+o+" but got pad "+n+"."});var l=Yr(u.shape,e,t,i,n,o,a),h=T.runKernelFunc(function(f){return f.avgPool3d(u,l)},{x:u},function(f){return{x:function(){return function(p,d,m,v,g,x,b){var y=_(p,"dy","avgPool3dBackprop"),w=_(d,"input","avgPool3dBackprop"),C=y,k=w,S=!1;w.rank===4&&(S=!0,C=y.as5D(1,y.shape[0],y.shape[1],y.shape[2],y.shape[3]),k=w.as5D(1,w.shape[0],w.shape[1],w.shape[2],w.shape[3])),E(C.rank===5,function(){return"Error in avgPool3dBackprop: dy must be rank 5 but got rank "+C.rank+"."}),E(k.rank===5,function(){return"Error in avgPool3dBackprop: input must be rank 5 but got rank "+k.rank+"."}),g==null&&(g=[1,1,1]),E(ee(v,g),function(){return"Error in avgPool3dBackprop: Either strides or dilations must be 1. Got strides "+v+" and dilations '"+g+"'"}),b!=null&&E(Dt(x),function(){return"Error in maxPool3dBackprop: pad must be an integer when using, dimRoundingMode "+b+" but got pad "+x+"."});var R=Yr(k.shape,m,v,g,x,b),I=T.runKernelFunc(function(N){return N.avgPool3dBackprop(C,k,R)},{dy5D:C,input5D:k});return S?I.as4D(I.shape[1],I.shape[2],I.shape[3],I.shape[4]):I}(f,u,e,t,i,n,o)}}});return h=h.cast(u.dtype),c?h.as4D(h.shape[1],h.shape[2],h.shape[3],h.shape[4]):h}}),Ne=D({slice_:function(r,e,t){var n,o,a=_(r,"x","slice");if(a.rank===0)throw new Error("Slicing scalar is not possible");(n=typeof e=="number"?[e].concat(new Array(a.rank-1).fill(0)):e.length<a.rank?e.concat(new Array(a.rank-e.length).fill(0)):e.slice()).forEach(function(u){E(u!==-1,function(){return"slice() does not support negative begin indexing."})}),o=(o=t==null?new Array(a.rank).fill(-1):typeof t=="number"?[t].concat(new Array(a.rank-1).fill(-1)):t.length<a.rank?t.concat(new Array(a.rank-t.length).fill(-1)):t).map(function(u,c){return u>=0?u:(E(u===-1,function(){return"Negative size values should be exactly -1 but got "+u+" for the slice() size at index "+c+"."}),a.shape[c]-n[c])}),Th(a,n,o);var i=a.shape,s={begin:n,size:o};return T.runKernelFunc(function(u){return u.slice(a,n,o)},{x:a},function(u){for(var c=[],l=0;l<u.rank;l++)c.push([n[l],i[l]-n[l]-o[l]]);return{x:function(){return u.pad(c)}}},"Slice",s)}}),av=D({slice1d_:function(r,e,t){var n=_(r,"x","slice1d");return E(n.rank===1,function(){return"slice1d expects a rank-1 tensor, but got a rank-"+n.rank+" tensor"}),Ne(n,[e],[t])}}),iv=D({slice2d_:function(r,e,t){var n=_(r,"x","slice2d");return E(n.rank===2,function(){return"slice2d expects a rank-2 tensor, but got a rank-"+n.rank+" tensor"}),Ne(n,e,t)}}),Hu=D({slice3d_:function(r,e,t){var n=_(r,"x","slice3d");return E(n.rank===3,function(){return"slice3d expects a rank-3 tensor, but got a rank-"+n.rank+" tensor"}),Ne(n,e,t)}}),sv=D({slice4d_:function(r,e,t){var n=_(r,"x","slice4d");return E(n.rank===4,function(){return"slice4d expects a rank-4 tensor, but got a rank-"+n.rank+" tensor"}),Ne(n,e,t)}});function qu(r,e,t,n,o){return e.rank<t.rank&&(e=e.reshape(te(e.shape,n))),r.rank<t.rank&&(r=r.reshape(te(r.shape,n))),{x:function(){var a=r.mul(t.equal(e).cast(r.dtype));return o==null?a:a.transpose(o)}}}var uv=D({all_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","all","bool"),o=Bt(e,n.shape),a=o,i=Me(a,n.rank);i!=null&&(n=n.transpose(i),a=Oe(a.length,n.rank));var s=T.runKernelFunc(function(c){return c.all(n,a)},{$x:n});if(t){var u=te(s.shape,o);return s.reshape(u)}return s}}),cv=D({any_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","any","bool"),o=Bt(e,n.shape),a=o,i=Me(a,n.rank);i!=null&&(n=n.transpose(i),a=Oe(a.length,n.rank));var s=T.runKernelFunc(function(c){return c.any(n,a)},{$x:n});if(t){var u=te(s.shape,o);return s.reshape(u)}return s}}),lv=D({argMax_:function(r,e){e===void 0&&(e=0);var t=_(r,"x","argMax");e==null&&(e=0);var n=Bt(e,t.shape),o=Me(n,t.rank);o!=null&&(t=t.transpose(o),n=Oe(n.length,t.rank));var a={axis:n[0]},i=[t];return T.runKernelFunc(function(s,u){var c=s.argMax(t,n[0]);return u([t]),c},{x:t},function(s,u){var c=u[0];return{x:function(){return vt(c)}}},"ArgMax",a,i)}}),hv=D({argMin_:function(r,e){e===void 0&&(e=0);var t=_(r,"x","argMin");e==null&&(e=0);var n=Bt(e,t.shape),o=Me(n,t.rank);return o!=null&&(t=t.transpose(o),n=Oe(n.length,t.rank)),T.runKernelFunc(function(a,i){var s=a.argMin(t,n[0]);return i([t]),s},{$x:t},function(a,i){var s=i[0];return{$x:function(){return vt(s)}}})}}),fv=D({logSumExp_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","logSumExp"),o=Bt(e,n.shape),a=n.max(o,!0),i=n.sub(a).exp().sum(o).log(),s=a.reshape(i.shape).add(i);if(t){var u=te(s.shape,o);return s.reshape(u)}return s}}),po=D({max_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","max"),o=n,a=Bt(e,n.shape),i=a,s=Me(i,n.rank);s!=null&&(n=n.transpose(s),i=Oe(i.length,n.rank));var u=[n],c=T.runKernelFunc(function(h,f){var p=h.max(n,i);return f([o,p]),p},{x:n},function(h,f){return qu(h,f[1],f[0],a,s)},"Max",{axes:i},u,[!0]);if(t){var l=te(c.shape,a);c=c.reshape(l)}return c}}),pv=D({mean_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","mean"),o=Bt(e,n.shape),a=$(Ht(n.shape,o)[1]);return uo(function(i){var s=q(a);return{value:(s.dtype===i.dtype?i:i.cast(s.dtype)).div(s).sum(e,t),gradFunc:function(u){var c=i.shape.slice();return o.forEach(function(l){c[l]=1}),u.reshape(c).mul(Yn(i.shape,"float32")).div(a)}}})(n)}}),dv=D({min_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","min"),o=n,a=Bt(e,n.shape),i=a,s=Me(i,n.rank);s!=null&&(n=n.transpose(s),i=Oe(i.length,n.rank));var u=[n],c=T.runKernelFunc(function(h,f){var p=h.min(n,i);return f([o,p]),p},{x:n},function(h,f){return qu(h,f[1],f[0],a,s)},"Min",{axes:i},u,[!0]);if(t){var l=te(c.shape,a);c=c.reshape(l)}return c}}),vv=D({moments_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=Bt(e,(r=_(r,"x","moments")).shape),o=r.mean(n,t),a=o.shape;t||(a=te(o.shape,n));var i=r.toFloat().sub(o.reshape(a)).square();return{mean:o,variance:i.mean(n,t)}}}),ju=D({sum_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","sum");n.dtype==="bool"&&(n=n.toInt());var o=Bt(e,n.shape);return uo(function(a){var i=Me(o,a.rank),s=o,u=a;i!=null&&(u=a.transpose(i),s=Oe(s.length,a.rank));var c=function(p){var d=a.shape.slice();return o.forEach(function(m){d[m]=1}),p.reshape(d).mul(Yn(a.shape,"float32"))},l={axes:s},h=T.runKernelFunc(function(p){return p.sum(u,s)},{x:u},function(p){return{x:function(){return c(p)}}},"Sum",l);if(t){var f=te(h.shape,o);h=h.reshape(f)}return{value:h,gradFunc:c}})(n)}}),mv=D({prod_:function(r,e,t){e===void 0&&(e=null),t===void 0&&(t=!1);var n=_(r,"x","prod");n.dtype==="bool"&&(n=n.toInt());var o=Bt(e,n.shape),a=Me(o,n.rank),i=o,s=n;a!=null&&(s=n.transpose(a),i=Oe(i.length,n.rank));var u=T.runKernelFunc(function(l){return l.prod(s,i)},{permutedX:s});if(t){var c=te(u.shape,o);u=u.reshape(c)}return u}}),Ku=D({elu_:function(r){var e=_(r,"x","elu");return T.runKernelFunc(function(t,n){var o=t.elu(e);return n([o]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){return T.runKernelFunc(function(a){return a.eluDer(t,o)},{dy:t,y:o})}}})}}),gv=D({leakyRelu_:function(r,e){e===void 0&&(e=.2);var t=_(r,"x","leakyRelu");return Ua(q(e).mul(t),t)}}),Xu=D({prelu_:function(r,e){var t=_(r,"x","prelu"),n=_(e,"alpha","prelu");return T.runKernelFunc(function(o,a){var i=o.prelu(t,n);return a([t,n]),i},{x:t,alpha:n},function(o,a){var i=a[0],s=a[1],u=i.greater(0);return{x:function(){return xn(u,o,o.mul(s))},alpha:function(){var c=xn(u,vt(o),o.mul(i)),l=Mt(s.shape,o.shape);return l.length>0&&(c=c.sum(l)),c.reshape(s.shape)}}},"Prelu")}}),Rt=D({relu_:function(r){var e=_(r,"x","relu");return e.dtype==="bool"?e.toInt():T.runKernelFunc(function(t,n){var o=t.relu(e);return n([e]),o},{x:e},function(t,n){var o=n[0];return{x:function(){return t.mulStrict(o.step().toFloat())}}},"Relu")}}),Yu=D({relu6_:function(r){var e=_(r,"x","relu6");return e.dtype==="bool"?e.toInt():T.runKernelFunc(function(t,n){var o=t.relu6(e);return n([e]),o},{x:e},function(t,n){var o=n[0],a=o.lessEqual(6).mul(o.step());return{x:function(){return t.mulStrict(a.toFloat())}}},"Relu6")}}),yv=D({selu_:function(r){var e=_(r,"x","selu");return T.runKernelFunc(function(t,n){var o=t.selu(e);return n([e]),o},{$x:e},function(t,n){var o=n[0];return{$x:function(){var a=o.greater(q(0)),i=q(Ba),s=q(La),u=t.mul(s),c=t.mul(i).mul(o.toFloat().exp());return xn(a,u,c)}}})}}),an=D({transpose_:function(r,e){var t=_(r,"x","transpose");if(e==null&&(e=t.shape.map(function(o,a){return a}).reverse()),E(t.rank===e.length,function(){return"Error in transpose: rank of input "+t.rank+" must match length of perm "+e+"."}),e.forEach(function(o){E(o>=0&&o<t.rank,function(){return"All entries in 'perm' must be between 0 and "+(t.rank-1)+" but got "+e})}),t.rank<=1)return t.clone();var n={perm:e};return T.runKernelFunc(function(o){return o.transpose(t,e)},{x:t},function(o){var a=ka(e);return{x:function(){return o.transpose(a)}}},"Transpose",n)}}),xv=D({localResponseNormalization_:function(r,e,t,n,o){e===void 0&&(e=5),t===void 0&&(t=1),n===void 0&&(n=1),o===void 0&&(o=.5);var a=_(r,"x","localResponseNormalization");E(a.rank===4||a.rank===3,function(){return`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank `+a.rank+"."}),E(Dt(e),function(){return"Error in localResponseNormalization: depthRadius must be an integer but got depthRadius "+e+"."});var i=a,s=!1;a.rank===3&&(s=!0,i=a.as4D(1,a.shape[0],a.shape[1],a.shape[2]));var u=T.runKernelFunc(function(c,l){var h=c.localResponseNormalization4D(i,e,t,n,o);return l([i,h]),h},{x4D:i},function(c,l){var h=l[0],f=l[1];return{x4D:function(){return T.runKernelFunc(function(p){return p.LRNGrad(c,h,f,e,t,n,o)},{})}}});return s?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),$u=D({norm_:function(r,e,t,n){e===void 0&&(e="euclidean"),t===void 0&&(t=null),n===void 0&&(n=!1);var o=function s(u,c,l){if(l===void 0&&(l=null),u.rank===0)return u.abs();if(u.rank!==1&&l===null)return s(u.reshape([-1]),c,l);if(u.rank===1||typeof l=="number"||Array.isArray(l)&&l.length===1){if(c===1)return u.abs().sum(l);if(c===1/0)return u.abs().max(l);if(c===-1/0)return u.abs().min(l);if(c==="euclidean"||c===2)return u.abs().pow(q(2,"int32")).sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}if(Array.isArray(l)&&l.length===2){if(c===1)return u.abs().sum(l[0]).max(l[1]-1);if(c===1/0)return u.abs().sum(l[1]).max(l[0]);if(c===-1/0)return u.abs().sum(l[1]).min(l[0]);if(c==="fro"||c==="euclidean")return u.square().sum(l).sqrt();throw new Error("Error in norm: invalid ord value: "+c)}throw new Error("Error in norm: invalid axis: "+l)}(r=_(r,"x","norm"),e,t),a=o.shape;if(n){var i=Bt(t,r.shape);a=te(o.shape,i)}return o.reshape(a)}}),bv=D({basicLSTMCell_:function(r,e,t,n,o,a){var i=_(r,"forgetBias","basicLSTMCell"),s=_(e,"lstmKernel","basicLSTMCell"),u=_(t,"lstmBias","basicLSTMCell"),c=_(n,"data","basicLSTMCell"),l=_(o,"c","basicLSTMCell"),h=_(a,"h","basicLSTMCell"),f=c.concat(h,1).matMul(s).add(u),p=f.shape[0],d=f.shape[1]/4,m=[p,d],v=f.slice([0,0],m),g=f.slice([0,d],m),x=f.slice([0,2*d],m),b=f.slice([0,3*d],m),y=v.sigmoid().mulStrict(g.tanh()).addStrict(l.mulStrict(i.add(x).sigmoid())),w=y.tanh().mulStrict(b.sigmoid());return[y,w]}}),wv=D({multiRNNCell_:function(r,e,t,n){for(var o=_(e,"data","multiRNNCell"),a=Gr(t,"c","multiRNNCell"),i=Gr(n,"h","multiRNNCell"),s=o,u=[],c=0;c<r.length;c++){var l=r[c](s,a[c],i[c]);u.push(l[0]),u.push(l[1]),s=l[1]}var h=[],f=[];for(c=0;c<u.length;c+=2)h.push(u[c]),f.push(u[c+1]);return[h,f]}}),Cv=D({movingAverage_:function(r,e,t,n,o){o===void 0&&(o=!0);var a=_(r,"v","movingAverage"),i=_(e,"x","movingAverage"),s=_(t,"decay","movingAverage");yl(a,i),E(Wt(a.shape,i.shape),function(){return"Shape mismatch in v and x"});var u=q(1),c=u.sub(s),l=i.sub(a).mul(c);if(o){E(n!=null,function(){return"When using zeroDebias: true, step is required."});var h=_(n,"step","movingAverage");l=l.div(u.sub(Zr(s,h)))}return a.add(l)}}),_v=D({stridedSlice_:function(r,e,t,n,o,a,i,s,u){if(o===void 0&&(o=0),a===void 0&&(a=0),i===void 0&&(i=0),s===void 0&&(s=0),u===void 0&&(u=0),n==null&&(n=new Array(e.length)),i!==0)throw new Error("ellipsis mask is not yet supported");var c=_(r,"x","stridedSlice"),l=Wi(s),h=c.shape.slice();l.forEach(function(v){e[v]=0,t[v]=1,h.splice(v,0,1)}),c=c.reshape(h);for(var f=0;f<c.rank;f++)e[f]=Nh(o,e,n,c.shape,f),t[f]=Fh(a,t,n,c.shape,f),n[f]=n[f]||1;var p=Wi(u);p.forEach(function(v){t[v]=e[v]+1,n[v]=1});var d=Ta(e,t,n),m=d.filter(function(v,g){return p.indexOf(g)===-1});return n.every(function(v){return v===1})?Ne(c,e,d).reshape(m):T.runKernelFunc(function(v){return v.stridedSlice(c,e,t,n)},{$x:c}).reshape(m)}}),Ev=D({topk_:function(r,e,t){e===void 0&&(e=1),t===void 0&&(t=!0);var n=_(r,"x","topk");if(n.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");var o=n.shape[n.shape.length-1];if(e>o)throw new Error("'k' passed to topk() must be <= the last dimension ("+o+") but got "+e);var a=T.runKernelFunc(function(i){return i.topk(n,e,t)},{$x:n});return{values:a[0],indices:a[1]}}}),Rv=D({scatterND_:function(r,e,t){var n=_(r,"indices","scatterND","int32"),o=_(e,"updates","scatterND");return Ah(o,n,t),T.runKernelFunc(function(a){return a.scatterND(n,o,t)},{indices:n,updates:o},null,"ScatterNd",{shape:t})}}),Ha=D({fft_:function(r){E(r.dtype==="complex64",function(){return"The dtype for tf.spectral.fft() must be complex64 but got "+r.dtype+"."});var e=r.shape[r.shape.length-1],t=r.size/e,n=r.as2D(t,e);return T.runKernelFunc(function(o){return o.fft(n)},{input:r}).reshape(r.shape)}}),to=D({ifft_:function(r){E(r.dtype==="complex64",function(){return"The dtype for tf.spectral.ifft() must be complex64 but got "+r.dtype+"."});var e=r.shape[r.shape.length-1],t=r.size/e,n=r.as2D(t,e);return T.runKernelFunc(function(o){return o.ifft(n)},{input:r}).reshape(r.shape)}}),qa=D({rfft_:function(r,e){E(r.dtype==="float32",function(){return"The dtype for rfft() must be real value but got "+r.dtype});var t,n=r.shape[r.shape.length-1],o=r.size/n;if(e!=null&&e<n){var a=r.shape.map(function(g){return 0}),i=r.shape.map(function(g){return g});i[r.shape.length-1]=e,t=r.slice(a,i),n=e}else if(e!=null&&e>n){var s=r.shape.map(function(g){return g});s[r.shape.length-1]=e-n,t=r.concat(wt(s),r.shape.length-1),n=e}else t=r;var u=t.zerosLike(),c=zt(t,u).as2D(o,n),l=Ha(c),h=Math.floor(n/2)+1,f=fe(l),p=ke(l),d=f.split([h,n-h],f.shape.length-1),m=p.split([h,n-h],p.shape.length-1),v=t.shape.slice();return v[t.shape.length-1]=h,zt(d[0],m[0]).reshape(v)}}),Ju=D({irfft_:function(r){var e=r.shape[r.shape.length-1],t=r.size/e;if(e<=2){var n=r.as2D(t,e),o=to(n);return fe(o)}var a=[t,2*(e-1)],i=fe(r).as2D(t,e),s=ke(r).as2D(t,e),u=i.slice([0,1],[t,e-2]).reverse(1),c=s.slice([0,1],[t,e-2]).reverse(1).mul(q(-1)),l=i.concat(u,1),h=s.concat(c,1);return n=zt(l,h).as2D(a[0],a[1]),o=to(n),fe(o)}}),Iv=Object.freeze({fft:Ha,ifft:to,rfft:qa,irfft:Ju}),kv=D({sparseToDense_:function(r,e,t,n){n===void 0&&(n=0);var o=_(r,"sparseIndices","sparseToDense","int32"),a=_(e,"sparseValues","sparseToDense"),i=_(n,"defaultValue","sparseToDense",a.dtype);return function(s,u,c,l){if(s.dtype!=="int32")throw new Error("tf.sparseToDense() expects the indices to be int32 type, but the dtype was "+s.dtype+".");if(s.rank>2)throw new Error("sparseIndices should be a scalar, vector, or matrix, but got shape "+s.shape+".");var h=s.rank>0?s.shape[0]:1,f=s.rank>1?s.shape[1]:1;if(c.length!==f)throw new Error("outputShape has incorrect number of elements:, "+c.length+", should be: "+f+".");var p=u.size;if(u.rank!==0&&(u.rank!==1||p!==h))throw new Error("sparseValues has incorrect shape "+u.shape+", should be [] or ["+h+"]");if(u.dtype!==l.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}(o,a,t,i),T.runKernelFunc(function(s){return s.sparseToDense(o,a,t,i)},{$sparseIndices:o,$sparseValues:a,$defaultValue:i})}}),Sv=D({gatherND_:function(r,e){var t=_(e,"indices","gatherND","int32"),n=_(r,"x","gatherND");return T.runKernelFunc(function(o){return o.gatherND(n,t)},{x:n,indices:t},null,"GatherNd")}}),Dv=D({diag_:function(r){var e=_(r,"x","diag").flatten(),t=r.shape.concat(r.shape);return T.runKernelFunc(function(n){return n.diag(e)},{$x:e}).reshape(t)}}),Av=D({dropout_:function(r,e,t,n){var o=_(r,"x","dropout");if(E(o.dtype==="float32",function(){return"x has to be a floating point tensor since it's going to be scaled, but got a "+o.dtype+" tensor instead."}),E(e>=0&&e<1,function(){return"rate must be a float in the range [0, 1), but got "+e+"."}),e===0)return r instanceof Et?o.clone():o;var a=function(u,c){if(c==null)return u.shape.slice();if(Wt(u.shape,c))return c;if(u.shape.length===c.length){for(var l=[],h=0;h<u.shape.length;h++)c[h]==null&&u.shape[h]!=null?l.push(u.shape[h]):l.push(c[h]);return l}return c}(o,t),i=1-e,s=Xs(a,0,1,"float32",n).add(i).floor().div(i);return o.mul(s)}});function Qu(r,e,t){for(var n=1-r%2,o=new Float32Array(r),a=0;a<r;++a){var i=2*Math.PI*a/(r+n-1);o[a]=e-t*Math.cos(i)}return Tt(o,"float32")}var ja=D({hannWindow_:function(r){return Qu(r,.5,.5)}}),Zu=D({hammingWindow_:function(r){return Qu(r,.54,.46)}}),Ka=D({frame_:function(r,e,t,n,o){n===void 0&&(n=!1),o===void 0&&(o=0);for(var a=0,i=[];a+e<=r.size;)i.push(Ne(r,a,e)),a+=t;if(n)for(;a<r.size;){var s=a+e-r.size,u=Ft([Ne(r,a,e-s),Te([s],o)]);i.push(u),a+=t}return i.length===0?nn([],[0,e]):Ft(i).as2D(i.length,e)}}),tc=D({stft_:function(r,e,t,n,o){var a;o===void 0&&(o=ja),n==null&&(a=e,n=Math.floor(Math.pow(2,Math.ceil(Math.log(a)/Math.log(2)))));for(var i=Ka(r,e,t),s=Xt(i,o(e)),u=[],c=0;c<i.shape[0];c++)u.push(qa(s.slice([c,0],[1,e]),n));return Ft(u)}}),Tv=Object.freeze({hannWindow:ja,hammingWindow:Zu,frame:Ka,stft:tc}),Kt,Nv=function(r,e,t){return t===void 0&&(t=1),X(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,h,f,p,d,m,v;return Y(this,function(g){switch(g.label){case 0:return n=_(r,"predictions","inTopK"),o=_(e,"targets","inTopK"),E(n.rank>1,function(){return"inTopK() expects the predictions to be of rank 2 or higher, but got "+n.rank}),E(n.rank-1===o.rank,function(){return"predictions rank should be 1 larger than targets rank, but got predictions rank "+n.rank+" and targets rank "+o.rank}),yt(n.shape.slice(0,n.shape.length-1),o.shape,"predictions's shape should be align with the targets' shape, except the last dimension."),a=n.shape[n.shape.length-1],E(t>0&&t<=a,function(){return"'k' passed to inTopK() must be > 0 && <= the predictions last dimension ("+a+"), but got "+t}),[4,n.data()];case 1:return i=g.sent(),[4,o.data()];case 2:for(s=g.sent(),u=[i.length/a,a],l=u[1],h=rr("bool",c=u[0]),f=0;f<c;f++){for(p=f*l,d=i.subarray(p,p+l),m=[],v=0;v<d.length;v++)m.push({value:d[v],index:v});for(m.sort(function(x,b){return b.value-x.value}),h[f]=0,v=0;v<t;v++)if(m[v].index===s[f]){h[f]=1;break}}return r!==n&&n.dispose(),e!==o&&o.dispose(),[2,Gt(h,o.shape,"bool")]}})})};(function(r){r[r.NONE=0]="NONE",r[r.MEAN=1]="MEAN",r[r.SUM=2]="SUM",r[r.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(Kt||(Kt={}));var Fv=D({absoluteDifference_:function(r,e,t,n){n===void 0&&(n=Kt.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"labels","absoluteDifference"),a=_(e,"predictions","absoluteDifference"),i=null;t!=null&&(i=_(t,"weights","absoluteDifference")),yt(o.shape,a.shape,"Error in absoluteDifference: ");var s=o.sub(a).abs();return je(s,i,n)}}),je=D({computeWeightedLoss_:function(r,e,t){t===void 0&&(t=Kt.SUM_BY_NONZERO_WEIGHTS);var n=_(r,"losses","computeWeightedLoss"),o=null;e!=null&&(o=_(e,"weights","computeWeightedLoss"));var a=o==null?n:n.mul(o);if(t===Kt.NONE)return a;if(t===Kt.SUM)return a.sum();if(t===Kt.MEAN){if(o==null)return a.mean();var i=n.size/o.size,s=a.sum().div(o.sum());return i>1?s.div(q(i)):s}if(t===Kt.SUM_BY_NONZERO_WEIGHTS){if(o==null)return a.sum().div(q(n.size));var u=o.mul(Yn(n.shape)).notEqual(q(0)).sum().toFloat();return a.sum().div(u)}throw Error("Unknown reduction: "+t)}}),Pv=D({cosineDistance_:function(r,e,t,n,o){o===void 0&&(o=Kt.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"labels","cosineDistance"),i=_(e,"predictions","cosineDistance"),s=null;n!=null&&(s=_(n,"weights","cosineDistance")),yt(a.shape,i.shape,"Error in cosineDistance: ");var u=q(1).sub(a.mul(i).sum(t,!0));return je(u,s,o)}}),Mv=D({hingeLoss_:function(r,e,t,n){n===void 0&&(n=Kt.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"labels","hingeLoss"),a=_(e,"predictions","hingeLoss"),i=null;t!=null&&(i=_(t,"weights","hingeLoss")),yt(o.shape,a.shape,"Error in hingeLoss: ");var s=q(1);o=q(2).mul(o).sub(s);var u=s.sub(o.mul(a)).relu();return je(u,i,n)}}),Ov=D({huberLoss_:function(r,e,t,n,o){n===void 0&&(n=1),o===void 0&&(o=Kt.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"labels","huberLoss"),i=_(e,"predictions","huberLoss"),s=null;t!=null&&(s=_(t,"weights","huberLoss")),yt(a.shape,i.shape,"Error in huberLoss: ");var u=q(n),c=i.sub(a).abs(),l=Fu(c,u),h=c.sub(l),f=q(.5).mul(l.square()).add(u.mul(h));return je(f,s,o)}}),Bv=D({logLoss_:function(r,e,t,n,o){n===void 0&&(n=1e-7),o===void 0&&(o=Kt.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"labels","logLoss"),i=_(e,"predictions","logLoss"),s=null;t!=null&&(s=_(t,"weights","logLoss")),yt(a.shape,i.shape,"Error in logLoss: ");var u=q(1),c=q(n),l=a.mul(i.add(c).log()).neg().sub(u.sub(a).mul(u.sub(i).add(c).log()));return je(l,s,o)}}),Lv=D({meanSquaredError_:function(r,e,t,n){n===void 0&&(n=Kt.SUM_BY_NONZERO_WEIGHTS);var o=_(r,"labels","meanSquaredError"),a=_(e,"predictions","meanSquaredError"),i=null;t!=null&&(i=_(t,"weights","meanSquaredError")),yt(o.shape,a.shape,"Error in meanSquaredError: ");var s=o.squaredDifference(a);return je(s,i,n)}}),Wv=D({sigmoidCrossEntropy_:function(r,e,t,n,o){n===void 0&&(n=0),o===void 0&&(o=Kt.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"multiClassLabels","sigmoidCrossEntropy"),i=_(e,"logits","sigmoidCrossEntropy"),s=null;if(t!=null&&(s=_(t,"weights","sigmoidCrossEntropy")),yt(a.shape,i.shape,"Error in sigmoidCrossEntropy: "),n>0){var u=q(n),c=q(1),l=q(.5);a=a.mul(c.sub(u)).add(l.mul(u))}var h=function(f,p){var d=_(f,"labels","sigmoidCrossEntropyWithLogits"),m=_(p,"logits","sigmoidCrossEntropyWithLogits");yt(d.shape,m.shape,"Error in sigmoidCrossEntropyWithLogits: ");var v=m.relu(),g=m.mul(d),x=m.abs().neg().exp().log1p();return v.sub(g).add(x)}(a,i);return je(h,s,o)}}),Uv=D({softmaxCrossEntropy_:function(r,e,t,n,o){n===void 0&&(n=0),o===void 0&&(o=Kt.SUM_BY_NONZERO_WEIGHTS);var a=_(r,"onehotLabels","softmaxCrossEntropy"),i=_(e,"logits","softmaxCrossEntropy"),s=null;if(t!=null&&(s=_(t,"weights","softmaxCrossEntropy")),yt(a.shape,i.shape,"Error in softmaxCrossEntropy: "),n>0){var u=q(n),c=q(1),l=q(a.shape[1]);a=a.mul(c.sub(u)).add(u.div(l))}var h=function(f,p,d){if(d===void 0&&(d=-1),d===-1&&(d=p.rank-1),d!==p.rank-1)throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank "+p.rank+" and dim was "+d);return uo(function(m,v,g){var x=v.logSumExp([d],!0),b=v.toFloat().sub(x);return g([m,b]),{value:b.mul(m).neg().sum([d]),gradFunc:function(y,w){var C=w[0],k=w[1],S=te(y.shape,[d]);return[y.reshape(S).mul(C.toFloat().sub(k.exp())),y.reshape(S).mul(k.exp().sub(C.toFloat()))]}}})(f,p)}(a,i);return je(h,s,o)}}),zv=Object.freeze({get Reduction(){return Kt},absoluteDifference:Fv,computeWeightedLoss:je,cosineDistance:Pv,hingeLoss:Mv,huberLoss:Ov,logLoss:Bv,meanSquaredError:Lv,sigmoidCrossEntropy:Wv,softmaxCrossEntropy:Uv});function ss(r,e){return e===void 0&&(e=!1),T.tidy(function(){if(r.shape.length!==2)throw new Error("qr2d() requires a 2D Tensor, but got a "+r.shape.length+"D Tensor.");for(var t=r.shape[0],n=r.shape[1],o=Ks(t),a=r.clone(),i=nn([[1]],[1,1]),s=i.clone(),u=t>=n?n:t,c=function(h){var f,p=a,d=s,m=o;f=T.tidy(function(){var v=a.slice([h,h],[t-h,1]),g=v.norm(),x=a.slice([h,h],[1,1]),b=nn([[-1]]).where(x.greater(0),nn([[1]])),y=x.sub(b.mul(g)),w=v.div(y);s=w.shape[0]===1?i.clone():i.concat(w.slice([1,0],[w.shape[0]-1,w.shape[1]]),0);var C=b.matMul(y).div(g).neg(),k=a.slice([h,0],[t-h,n]),S=C.mul(s);if(h===0)a=k.sub(S.matMul(s.transpose().matMul(k)));else{var R=k.sub(S.matMul(s.transpose().matMul(k)));a=a.slice([0,0],[h,n]).concat(R,0)}var I=o.slice([0,h],[t,o.shape[1]-h]);if(h===0)o=I.sub(I.matMul(s).matMul(S.transpose()));else{var N=I.sub(I.matMul(s).matMul(S.transpose()));o=o.slice([0,0],[t,h]).concat(N,1)}return[s,a,o]}),s=f[0],a=f[1],o=f[2],Zt([p,d,m])},l=0;l<u;++l)c(l);return!e&&t>n&&(o=o.slice([0,0],[t,n]),a=a.slice([0,0],[n,n])),[o,a]})}var Vv=D({bandPart_:function(r,e,t){if(e%1!=0)throw new Error("bandPart(): numLower must be an integer, got "+e+".");if(t%1!=0)throw new Error("bandPart(): numUpper must be an integer, got "+t+".");var n=_(r,"a","bandPart");if(n.rank<2)throw new Error("bandPart(): Rank must be at least 2, got "+n.rank+".");var o=n.shape,a=n.shape.slice(-2),i=a[0],s=a[1];if(!(e<=i))throw new Error("bandPart(): numLower ("+e+") must not be greater than the number of rows ("+i+").");if(!(t<=s))throw new Error("bandPart(): numUpper ("+t+") must not be greater than the number of columns ("+s+").");e<0&&(e=i),t<0&&(t=s);var u=Hr(0,i,1,"int32").reshape([-1,1]),c=Hr(0,s,1,"int32"),l=Ot(u,c),h=lo(l.lessEqual(q(+e,"int32")),l.greaterEqual(q(-t,"int32"))),f=wt([i,s],n.dtype);return ce(Pt(n.reshape([-1,i,s])).map(function(p){return xn(h,p,f)})).reshape(o)}}),Gv=D({gramSchmidt_:function(r){var e;if(Array.isArray(r)){e=!1,E(r!=null&&r.length>0,function(){return"Gram-Schmidt process: input must not be null, undefined, or empty"});for(var t=r[0].shape[0],n=function(u){E(r[u].shape[0]===t,function(){return"Gram-Schmidt: Non-unique lengths found in the input vectors: ("+r[u].shape[0]+" vs. "+t+")"})},o=1;o<r.length;++o)n(o)}else e=!0,r=Da(r,r.shape[0],0).map(function(u){return $s(u,[0])});E(r.length<=r[0].shape[0],function(){return"Gram-Schmidt: Number of vectors ("+r.length+") exceeds number of dimensions ("+r[0].shape[0]+")."});var a=[],i=r,s=function(u){a.push(T.tidy(function(){var c=i[u];if(u>0)for(var l=0;l<u;++l){var h=ju(a[l].mulStrict(c)).mul(a[l]);c=c.sub(h)}return c.div($u(c,"euclidean"))}))};for(o=0;o<r.length;++o)s(o);return e?ce(a,0):a}}),Hv=D({qr_:function(r,e){if(e===void 0&&(e=!1),r.rank<2)throw new Error("qr() requires input tensor to have a rank >= 2, but got rank "+r.rank);if(r.rank===2)return ss(r,e);var t=r.shape.slice(0,r.shape.length-2).reduce(function(i,s){return i*s}),n=Pt(r.reshape([t,r.shape[r.shape.length-2],r.shape[r.shape.length-1]]),0),o=[],a=[];return n.forEach(function(i){var s=ss(i,e),u=s[0],c=s[1];o.push(u),a.push(c)}),[ce(o,0).reshape(r.shape),ce(a,0).reshape(r.shape)]}}),qv=Object.freeze({bandPart:Vv,gramSchmidt:Gv,qr:Hv});function vo(r,e,t,n,o,a){n==null&&(n=.5),o==null&&(o=Number.NEGATIVE_INFINITY),a==null&&(a=0);var i=r.shape[0];return t=Math.min(t,i),E(0<=n&&n<=1,function(){return"iouThreshold must be in [0, 1], but was '"+n+"'"}),E(r.rank===2,function(){return"boxes must be a 2D tensor, but was of rank '"+r.rank+"'"}),E(r.shape[1]===4,function(){return"boxes must have 4 columns, but 2nd dimension was "+r.shape[1]}),E(e.rank===1,function(){return"scores must be a 1D tensor"}),E(e.shape[0]===i,function(){return"scores has incompatible shape with boxes. Expected "+i+", but was "+e.shape[0]}),E(0<=a&&a<=1,function(){return"softNmsSigma must be in [0, 1], but was '"+a+"'"}),{maxOutputSize:t,iouThreshold:n,scoreThreshold:o,softNmsSigma:a}}var jv=D({resizeBilinear_:function(r,e,t){t===void 0&&(t=!1);var n=_(r,"images","resizeBilinear");E(n.rank===3||n.rank===4,function(){return"Error in resizeBilinear: x must be rank 3 or 4, but got rank "+n.rank+"."}),E(e.length===2,function(){return"Error in resizeBilinear: new shape must 2D, but got shape "+e+"."});var o=n,a=!1;n.rank===3&&(a=!0,o=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var i=e[0],s=e[1],u=T.runKernelFunc(function(c,l){return l([o]),c.resizeBilinear(o,i,s,t)},{x:o},function(c,l){return{x:function(){return T.runKernelFunc(function(h){return h.resizeBilinearBackprop(c,l[0],t)},{})}}},"ResizeBilinear",{alignCorners:t,newHeight:i,newWidth:s});return a?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Kv=D({resizeNearestNeighbor_:function(r,e,t){t===void 0&&(t=!1);var n=_(r,"images","resizeNearestNeighbor");E(n.rank===3||n.rank===4,function(){return"Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank "+n.rank+"."}),E(e.length===2,function(){return"Error in resizeNearestNeighbor: new shape must 2D, but got shape "+e+"."}),E(n.dtype==="float32"||n.dtype==="int32",function(){return"`images` must have `int32` or `float32` as dtype"});var o=n,a=!1;n.rank===3&&(a=!0,o=n.as4D(1,n.shape[0],n.shape[1],n.shape[2]));var i=e[0],s=e[1],u=T.runKernelFunc(function(c,l){return l([o]),c.resizeNearestNeighbor(o,i,s,t)},{batchImages:o},function(c,l){return{batchImages:function(){return T.runKernelFunc(function(h){return h.resizeNearestNeighborBackprop(c,l[0],t)},{})}}});return a?u.as3D(u.shape[1],u.shape[2],u.shape[3]):u}}),Xv=D({nonMaxSuppression_:function(r,e,t,n,o){n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY);var a=_(r,"boxes","nonMaxSuppression"),i=_(e,"scores","nonMaxSuppression"),s=vo(a,i,t,n,o);t=s.maxOutputSize,n=s.iouThreshold,o=s.scoreThreshold;var u={maxOutputSize:t,iouThreshold:n,scoreThreshold:o};return T.runKernelFunc(function(c){return c.nonMaxSuppression(a,i,t,n,o)},{boxes:a,scores:i},null,"NonMaxSuppressionV3",u)}}),Yv=function(r,e,t,n,o){return n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),X(this,void 0,void 0,function(){var a,i,s,u,c,l,h;return Y(this,function(f){switch(f.label){case 0:return a=_(r,"boxes","nonMaxSuppressionAsync"),i=_(e,"scores","nonMaxSuppressionAsync"),s=vo(a,i,t,n,o),t=s.maxOutputSize,n=s.iouThreshold,o=s.scoreThreshold,[4,Promise.all([a.data(),i.data()])];case 1:return u=f.sent(),c=u[0],l=u[1],h=Fa(c,l,t,n,o),a!==r&&a.dispose(),i!==e&&i.dispose(),[2,h]}})})},$v=D({nonMaxSuppressionWithScore_:function(r,e,t,n,o,a){n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),a===void 0&&(a=0);var i=_(r,"boxes","nonMaxSuppression"),s=_(e,"scores","nonMaxSuppression"),u=vo(i,s,t,n,o,a),c={maxOutputSize:t=u.maxOutputSize,iouThreshold:n=u.iouThreshold,scoreThreshold:o=u.scoreThreshold,softNmsSigma:a=u.softNmsSigma},l=T.runKernel("NonMaxSuppressionV5",{boxes:i,scores:s},c);return{selectedIndices:l[0],selectedScores:l[1]}}}),Jv=function(r,e,t,n,o,a){return n===void 0&&(n=.5),o===void 0&&(o=Number.NEGATIVE_INFINITY),a===void 0&&(a=0),X(this,void 0,void 0,function(){var i,s,u,c,l,h,f;return Y(this,function(p){switch(p.label){case 0:return i=_(r,"boxes","nonMaxSuppressionAsync"),s=_(e,"scores","nonMaxSuppressionAsync"),u=vo(i,s,t,n,o,a),t=u.maxOutputSize,n=u.iouThreshold,o=u.scoreThreshold,a=u.softNmsSigma,[4,Promise.all([i.data(),s.data()])];case 1:return c=p.sent(),l=c[0],h=c[1],f=Pa(l,h,t,n,o,a),i!==r&&i.dispose(),s!==e&&s.dispose(),[2,f]}})})},Qv=D({cropAndResize_:function(r,e,t,n,o,a){var i=_(r,"image","cropAndResize"),s=_(e,"boxes","cropAndResize","float32"),u=_(t,"boxInd","cropAndResize","int32");o=o||"bilinear",a=a||0;var c=s.shape[0];return E(i.rank===4,function(){return"Error in cropAndResize: image must be rank 4,but got rank "+i.rank+"."}),E(s.rank===2&&s.shape[1]===4,function(){return"Error in cropAndResize: boxes must be have size ["+c+",4] but had shape "+s.shape+"."}),E(u.rank===1&&u.shape[0]===c,function(){return"Error in cropAndResize: boxInd must be have size ["+c+"] but had shape "+s.shape+"."}),E(n.length===2,function(){return"Error in cropAndResize: cropSize must be of length 2, but got length "+n.length+"."}),E(n[0]>=1&&n[1]>=1,function(){return"cropSize must be atleast [1,1], but was "+n}),E(o==="bilinear"||o==="nearest",function(){return"method must be bilinear or nearest, but was "+o}),T.runKernelFunc(function(l,h){return l.cropAndResize(i,s,u,n,o,a)},{images:i,boxes:s,boxInd:u},null,"CropAndResize",{method:o,extrapolationValue:a,cropSize:n})}}),Xa=Object.freeze({resizeBilinear:jv,resizeNearestNeighbor:Kv,nonMaxSuppression:Xv,nonMaxSuppressionAsync:Yv,nonMaxSuppressionWithScore:$v,nonMaxSuppressionWithScoreAsync:Jv,cropAndResize:Qv}),Ya=function(r,e){return!(r>0)||e==="linear"},$a=function(r,e,t){if(t==null||t==="linear")return r;if(t==="relu")return r.mul(e.step());throw new Error("Gradient for activation "+t+" has not been implemented yet.")},Ja=function(r,e){var t=e,n=Mt(r.shape,e.shape);return n.length>0&&(t=t.sum(n)),t.reshape(r.shape)},Qa=function(r,e,t){if(e==="linear")return r;if(e==="relu")return Rt(r);if(e==="elu")return Ku(r);if(e==="relu6")return Yu(r);if(e==="prelu")return Xu(r,t);throw new Error("Unknown fused activation "+e+".")},Zv=D({fusedMatMul_:function(r){var e,t=r.a,n=r.b,o=r.transposeA,a=o!==void 0&&o,i=r.transposeB,s=i!==void 0&&i,u=r.bias,c=r.activation,l=c===void 0?"linear":c,h=r.preluActivationWeights;if(Ya(T.state.gradientDepth,l)===!1){var f=fo(t,n,a,s);return u!=null&&(f=ut(f,u)),Qa(f,l,h)}var p=_(t,"a","fused matMul"),d=_(n,"b","fused matMul");e=It(p,d),p=e[0],d=e[1];var m=a?p.shape[p.rank-2]:p.shape[p.rank-1],v=s?d.shape[d.rank-1]:d.shape[d.rank-2],g=a?p.shape[p.rank-1]:p.shape[p.rank-2],x=s?d.shape[d.rank-2]:d.shape[d.rank-1],b=p.shape.slice(0,-2),y=d.shape.slice(0,-2),w=$(b),C=$(y);E(p.rank>=2&&d.rank>=2&&p.rank===d.rank,function(){return"Error in fused matMul: inputs must have the same rank of at least 2, got ranks "+p.rank+" and "+d.rank+"."}),E(Wt(b,y),function(){return"Error in fused matMul: outer dimensions ("+b+") and ("+y+") of Tensors with shapes "+p.shape+" and "+d.shape+" must match."}),E(m===v,function(){return"Error in fused matMul: inner shapes ("+m+") and ("+v+") of Tensors with shapes "+p.shape+" and "+d.shape+" and transposeA="+a+" and transposeB="+s+" must match."});var k,S,R=p.shape.slice(0,-2).concat([g,x]),I=a?p.as3D(w,m,g):p.as3D(w,g,m),N=s?d.as3D(C,x,v):d.as3D(C,v,x);u!=null&&lt(R,(k=It(k=_(u,"bias","fused matMul"),p)[0]).shape),h!=null&&(S=_(h,"prelu weights","fused matMul"));var A={a:I,b:N};u!=null&&(A.bias=k),h!=null&&(A.preluActivationWeights=S);var L=[I,N];return T.runKernelFunc(function(O,B){var z=O.fusedBatchMatMul({a:I,b:N,transposeA:a,transposeB:s,bias:k,activation:l,preluActivationWeights:S});return B([I,N,z]),z},A,function(O,B){var z=B[0],U=B[1],W=B[2],G=$a(O,W,l),H={};return u!=null&&(H={bias:function(){return Ja(k,G)}}),Object.assign(a||s?!a&&s?{a:function(){return G.matMul(U,!1,!1)},b:function(){return G.matMul(z,!0,!1)}}:a&&!s?{a:function(){return U.matMul(G,!1,!0)},b:function(){return z.matMul(G,!1,!1)}}:{a:function(){return U.matMul(G,!0,!0)},b:function(){return G.matMul(z,!0,!0)}}:{a:function(){return G.matMul(U,!1,!0)},b:function(){return z.matMul(G,!0,!1)}},H)},"_FusedMatMul",{transposeA:a,transposeB:s,activation:l},L,[!0]).reshape(R)}}),tm=D({fusedConv2d_:function(r){var e=r.x,t=r.filter,n=r.strides,o=r.pad,a=r.dataFormat,i=a===void 0?"NHWC":a,s=r.dilations,u=s===void 0?[1,1]:s,c=r.dimRoundingMode,l=r.bias,h=r.activation,f=h===void 0?"linear":h,p=r.preluActivationWeights;if(f=f||"linear",Ya(T.state.gradientDepth,f)===!1){var d=de(e,t,n,o,i,u,c);return l!=null&&(d=ut(d,l)),Qa(d,f,p)}var m=_(e,"x","conv2d"),v=_(t,"filter","conv2d"),g=m,x=!1;m.rank===3&&(x=!0,g=m.as4D(1,m.shape[0],m.shape[1],m.shape[2])),E(g.rank===4,function(){return"Error in fused conv2d: input must be rank 4, but got rank "+g.rank+"."}),E(v.rank===4,function(){return"Error in fused conv2d: filter must be rank 4, but got rank "+v.rank+"."}),c!=null&&E(Dt(o),function(){return"Error in fused conv2d: pad must be an integer when using, dimRoundingMode "+c+" but got pad "+o+"."}),E(g.shape[3]===v.shape[2],function(){return"Error in conv2d: depth of input ("+g.shape[3]+") must match input depth for filter "+v.shape[2]+"."}),E(ee(n,u),function(){return"Error in conv2D: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+u+"'"}),E(i==="NHWC",function(){return"Error in conv2d: got dataFormat of "+i+" but only NHWC is currently supported."});var b,y,w=Cn(g.shape,v.shape,n,u,o,c);l!=null&&(b=It(b=_(l,"bias","fused conv2d"),m)[0],lt(w.outShape,b.shape)),p!=null&&(y=_(p,"prelu weights","fused conv2d"));var C={x:g,filter:v};l!=null&&(C.bias=b),p!=null&&(C.preluActivationWeights=y);var k=[v,g],S=T.runKernelFunc(function(R,I){var N=R.fusedConv2d({input:g,filter:v,convInfo:w,bias:b,activation:f,preluActivationWeights:y});return I([v,g,N]),N},C,function(R,I){var N=I,A=N[0],L=N[1],O=N[2],B=$a(R,O,f);E(Kn(u),function(){return"Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '"+u+"'"});var z={};return l!=null&&(z={bias:function(){return Ja(b,B)}}),Object.assign({x:function(){return Wu(L.shape,B,A,n,o)},filter:function(){return Va(L,B,A.shape,n,o)}},z)},"FusedConv2D",{convInfo:w,activation:f},k,[!0]);return x?S.as3D(S.shape[1],S.shape[2],S.shape[3]):S}}),em=D({fusedDepthwiseConv2d_:function(r){var e=r.x,t=r.filter,n=r.strides,o=r.pad,a=r.dataFormat,i=a===void 0?"NHWC":a,s=r.dilations,u=s===void 0?[1,1]:s,c=r.dimRoundingMode,l=r.bias,h=r.activation,f=h===void 0?"linear":h,p=r.preluActivationWeights;if(Ya(T.state.gradientDepth,f)===!1){var d=ho(e,t,n,o,i,u,c);return l!=null&&(d=ut(d,l)),Qa(d,f,p)}var m=_(e,"x","depthwiseConv2d"),v=_(t,"filter","depthwiseConv2d"),g=m,x=!1;m.rank===3&&(x=!0,g=m.as4D(1,m.shape[0],m.shape[1],m.shape[2])),E(g.rank===4,function(){return"Error in fused depthwiseConv2d: input must be rank 4, but got rank "+g.rank+"."}),E(v.rank===4,function(){return"Error in fused depthwiseConv2d: filter must be rank 4, but got rank "+v.rank+"."}),E(g.shape[3]===v.shape[2],function(){return"Error in fused depthwiseConv2d: number of input channels ("+g.shape[3]+") must match the inChannels dimension in filter "+v.shape[2]+"."}),u==null&&(u=[1,1]),E(ee(n,u),function(){return"Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides "+n+" and dilations '"+u+"'"}),c!=null&&E(Dt(o),function(){return"Error in fused depthwiseConv2d: pad must be an integer when using dimRoundingMode "+c+" but got pad "+o+"."});var b,y,w=Cn(g.shape,v.shape,n,u,o,c,!0);l!=null&&(b=It(b=_(l,"bias","fused conv2d"),m)[0],lt(w.outShape,b.shape)),p!=null&&(y=_(p,"prelu weights","fused depthwiseConv2d"));var C={x:g,filter:v};l!=null&&(C.bias=b),p!=null&&(C.preluActivationWeights=y);var k=[v,g],S=T.runKernelFunc(function(R,I){var N=R.fusedDepthwiseConv2D({input:g,filter:v,convInfo:w,bias:b,activation:f,preluActivationWeights:y});return I([v,g,N]),N},C,function(R,I){E(Kn(u),function(){return"Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '"+u+"'"});var N=I[0],A=I[1],L=I[2],O=$a(R,L,f),B={};return l!=null&&(B={bias:function(){return Ja(b,O)}}),Object.assign({x:function(){return Uu(A.shape,O,N,w)},filter:function(){return zu(A,O,N.shape,w)}},B)},"FusedDepthwiseConv2D",{convInfo:w,activation:f},k,[!0]);return x?S.as3D(S.shape[1],S.shape[2],S.shape[3]):S}}),nm=Object.freeze({matMul:Zv,conv2d:tm,depthwiseConv2d:em}),rm=Object.freeze({image:Xa,linalg:qv,losses:zv,spectral:Iv,fused:nm,signal:Tv,square:Bp,squaredDifference:_u,conv1d:jd,conv2d:de,conv3d:Kd,depthwiseConv2d:ho,separableConv2d:Ga,conv2dTranspose:Xd,conv3dTranspose:Yd,op:D,batchNormalization2d:pd,batchNormalization3d:dd,batchNormalization4d:vd,batchNormalization:md,batchNorm:Du,batchNorm2d:gd,batchNorm3d:yd,batchNorm4d:xd,booleanMaskAsync:qd,complex:zt,real:fe,imag:ke,concat:Ft,concat1d:eh,concat2d:nh,concat3d:rh,concat4d:oh,split:Da,matMul:fo,dot:$d,outerProduct:Jd,reverse:gr,reverse1d:Qd,reverse2d:Zd,reverse3d:tv,reverse4d:ev,maxPool:Lt,avgPool:yr,pool:nv,maxPool3d:rv,avgPool3d:ov,slice:Ne,slice1d:av,slice2d:iv,slice3d:Hu,slice4d:sv,abs:Lp,acos:Wp,acosh:Up,asin:zp,asinh:Vp,atan:Gp,atanh:Hp,ceil:qp,clipByValue:Wa,cos:jp,cosh:Kp,erf:Xp,exp:ma,expm1:Yp,floor:$p,log:Jp,log1p:Qp,logSigmoid:Zp,neg:Qr,reciprocal:td,round:ed,rsqrt:Eu,sigmoid:Ru,sign:nd,isNaN:rd,isInf:od,isFinite:ad,sin:id,sinh:sd,softplus:ud,sqrt:cd,step:ld,tan:hd,tanh:fd,all:uv,any:cv,argMax:lv,argMin:hv,logSumExp:fv,max:po,mean:pv,min:dv,moments:vv,sum:ju,prod:mv,equal:Pu,equalStrict:Md,greater:Od,greaterEqual:Mu,greaterEqualStrict:Bd,greaterStrict:Ld,less:Wd,lessEqual:Ud,lessEqualStrict:zd,lessStrict:Vd,notEqual:Gd,notEqualStrict:Hd,add:ut,addN:Cd,addStrict:_d,atan2:Ed,div:ve,divNoNan:Rd,divStrict:Id,floorDiv:Nu,maximum:Ua,maximumStrict:kd,minimum:Fu,minimumStrict:Sd,mod:Dd,modStrict:Ad,mul:Xt,mulStrict:Td,pow:Zr,powStrict:Nd,squaredDifferenceStrict:Fd,sub:Ot,subStrict:Pd,elu:Ku,leakyRelu:gv,prelu:Xu,relu:Rt,relu6:Yu,selu:yv,logicalAnd:lo,logicalNot:bd,logicalOr:Au,logicalXor:wd,where:xn,whereAsync:Tu,buffer:ot,print:ph,batchToSpaceND:js,broadcastTo:dh,cast:vh,clone:mh,cumsum:gh,depthToSpace:yh,expandDims:he,eye:Ks,multinomial:xh,oneHot:fa,pad:wn,pad1d:bh,pad2d:wh,pad3d:Ch,pad4d:_h,rand:Eh,randomNormal:Rh,randomGamma:Ih,randomUniform:Xs,reshape:me,spaceToBatchND:Ys,squeeze:$s,stack:ce,tile:Bn,truncatedNormal:kh,unstack:Pt,setdiff1dAsync:Sh,fill:Te,linspace:th,ones:Yn,range:Hr,scalar:q,tensor:Gt,tensor1d:Tt,tensor2d:nn,tensor3d:Sa,tensor4d:Jt,tensor5d:Jl,tensor6d:Ql,variable:Zl,zeros:wt,onesLike:qs,zerosLike:vt,transpose:an,softmax:qe,logSoftmax:Mh,localResponseNormalization:xv,norm:$u,gather:za,unsortedSegmentSum:Ou,basicLSTMCell:bv,multiRNNCell:wv,movingAverage:Cv,stridedSlice:_v,topk:Ev,scatterND:Rv,fft:Ha,ifft:to,rfft:qa,irfft:Ju,sparseToDense:kv,gatherND:Sv,diag:Dv,dropout:Av,hannWindow:ja,hammingWindow:Zu,frame:Ka,stft:tc,inTopKAsync:Nv});function V(r,e){Array.isArray(r)||(r=[r]),r.forEach(function(t){t!=null&&E(t.dtype!=="complex64",function(){return e+" does not support complex64 tensors."})})}function jo(r,e,t,n){if(t==="linear")return r.linear(e);if(t==="relu")return r.relu(e);if(t==="elu")return r.elu(e);if(t==="relu6")return r.relu6(e);if(t==="prelu")return r.prelu(e,n);throw new Error("Activation "+t+" has not been implemented for the CPU backend.")}var om=function(r){function e(){var t=r.call(this)||this;return t.blockSize=48,t.firstUse=!0,t.data=new ru(t,T),t}return ye(e,r),e.prototype.write=function(t,n,o){this.firstUse&&(this.firstUse=!1,M().get("IS_NODE")&&Vr(`
============================
Hi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.
============================`));var a={};return this.data.set(a,{values:t,dtype:o}),a},e.prototype.move=function(t,n,o,a){this.data.set(t,{values:n,dtype:a})},e.prototype.numDataIds=function(){return this.data.numDataIds()},e.prototype.read=function(t){return X(this,void 0,void 0,function(){return Y(this,function(n){return[2,this.readSync(t)]})})},e.prototype.readSync=function(t){var n=this.data.get(t),o=n.dtype,a=n.complexTensors;return o==="complex64"?va(this.readSync(a.real.dataId),this.readSync(a.imag.dataId)):this.data.get(t).values},e.prototype.bufferSync=function(t){var n=this.readSync(t.dataId),o=n;if(t.dtype==="string")try{o=n.map(function(a){return Wr(a)})}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return ot(t.shape,t.dtype,o)},e.prototype.makeOutput=function(t,n,o){var a=this.write(t,n,o);return T.makeTensorFromDataId(a,n,o,this)},e.prototype.disposeData=function(t){if(this.data.has(t)){var n=this.data.get(t).complexTensors;n!=null&&(n.real.dispose(),n.imag.dispose()),this.data.delete(t)}},e.prototype.time=function(t){return X(this,void 0,void 0,function(){var n;return Y(this,function(o){return n=Re(),t(),[2,{kernelMs:Re()-n}]})})},e.prototype.memory=function(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}},e.prototype.complex=function(t,n){var o=this.makeOutput(null,t.shape,"complex64");return this.data.get(o.dataId).complexTensors={real:T.keep(t.clone()),imag:T.keep(n.clone())},o},e.prototype.real=function(t){return this.data.get(t.dataId).complexTensors.real.clone()},e.prototype.imag=function(t){return this.data.get(t.dataId).complexTensors.imag.clone()},e.prototype.slice=function(t,n,o){if(V(t,"slice"),eu(t.shape,n,o)){var a=nu(n,t.strides),i=$(o);return Gt(this.readSync(t.dataId).subarray(a,a+i),o,t.dtype)}for(var s=ot(o,t.dtype),u=this.bufferSync(t),c=0;c<s.size;++c){var l=s.indexToLoc(c).map(function(h,f){return h+n[f]});s.values[c]=u.get.apply(u,l)}return s.toTensor()},e.prototype.stridedSlice=function(t,n,o,a){V(t,"stridedSlice");var i=Ta(n,o,a);if(i.some(function(p){return p===0}))return Gt([],i);for(var s=ot(i,t.dtype),u=this.bufferSync(t),c=0;c<s.size;c++){for(var l=s.indexToLoc(c),h=new Array(l.length),f=0;f<h.length;f++)h[f]=l[f]*a[f]+n[f];s.set.apply(s,[u.get.apply(u,h)].concat(l))}return s.toTensor()},e.prototype.diag=function(t){for(var n=this.readSync(t.dataId),o=ot([t.size,t.size],t.dtype),a=o.values,i=0;i<n.length;i++)a[i*t.size+i]=n[i];return o.toTensor()},e.prototype.unstack=function(t,n){for(var o=t.shape[n],a=new Array(t.rank-1),i=0,s=0;s<t.rank;s++)s!==n&&(a[i++]=t.shape[s]);var u=new Array(t.rank).fill(0),c=t.shape.slice();c[n]=1;var l=new Array(o);for(s=0;s<l.length;s++)u[n]=s,l[s]=this.slice(t,u,c).reshape(a);return l},e.prototype.reverse=function(t,n){V(t,"reverse");for(var o=ot(t.shape,t.dtype),a=this.bufferSync(t),i=function(u){var c=o.indexToLoc(u),l=c.slice();n.forEach(function(h){return l[h]=t.shape[h]-1-l[h]}),o.set.apply(o,[a.get.apply(a,l)].concat(c))},s=0;s<o.size;s++)i(s);return o.toTensor()},e.prototype.concat=function(t,n){var o=this;if(t[0].dtype==="complex64"){var a=t.map(function(p){return fe(p)}),i=t.map(function(p){return ke(p)});return zt(this.concat(a,n),this.concat(i,n))}var s=t.map(function(p){var d=$(p.shape.slice(n));return p.as2D(-1,d)}),u=jn(s.map(function(p){return p.shape}),1),c=ot(u,t[0].dtype).values;if(s[0].shape[0]===1){var l=0;s.forEach(function(p){c.set(o.readSync(p.dataId),l),l+=p.size})}else{var h=0;s.forEach(function(p){for(var d=o.readSync(p.dataId),m=0,v=0;v<p.shape[0];++v)for(var g=v*u[1]+h,x=0;x<p.shape[1];++x)c[g+x]=d[m++];h+=p.shape[1]})}var f=jn(t.map(function(p){return p.shape}),n);return Gt(c,f,t[0].dtype)},e.prototype.neg=function(t){return V(t,"neg"),this.multiply(q(-1),t)},e.prototype.add=function(t,n){return t.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(t.cast("complex64"),n.cast("complex64"),function(o,a,i,s){return{real:o+i,imag:a+s}}):this.broadcastedBinaryOp(t,n,Vt(t.dtype,n.dtype),function(o,a){return o+a})},e.prototype.addN=function(t){var n=this;V(t,"addN");for(var o=t.map(function(l){return n.readSync(l.dataId)}),a=ot(t[0].shape,t[0].dtype),i=a.values,s=0;s<t.length;s++)for(var u=o[s],c=0;c<i.length;c++)i[c]+=u[c];return a.toTensor()},e.prototype.softmax=function(t,n){var o=Bt([n],t.shape),a=this.max(t,o),i=te(a.shape,o),s=this.subtract(t,a.reshape(i)),u=this.exp(s),c=this.sum(u,o).reshape(i);return this.realDivide(u,c)},e.prototype.subtract=function(t,n){return t.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(t.cast("complex64"),n.cast("complex64"),function(o,a,i,s){return{real:o-i,imag:a-s}}):this.broadcastedBinaryOp(t,n,Vt(t.dtype,n.dtype),function(o,a){return o-a})},e.prototype.pow=function(t,n){return V([t,n],"pow"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){return Math.pow(o,a)})},e.prototype.batchMatMul=function(t,n,o,a){V([t,n],"matMul");for(var i=o?t.shape[1]:t.shape[2],s=o?t.shape[2]:t.shape[1],u=a?n.shape[1]:n.shape[2],c=t.shape[0],l=this.readSync(t.dataId),h=this.readSync(n.dataId),f=o?[t.strides[0],1,t.strides[1]]:[t.strides[0],t.strides[1],1],p=f[0],d=f[1],m=f[2],v=a?[1,n.strides[1],n.strides[0]]:[n.strides[1],1,n.strides[0]],g=v[0],x=v[1],b=v[2],y=s*u,w=ot([c,s,u],t.dtype),C=w.values,k=this.blockSize,S=0;S<c;S++)for(var R=0;R<s;R+=k)for(var I=0;I<u;I+=k)for(var N=0;N<i;N+=k)for(var A=Math.min(R+k,s),L=Math.min(I+k,u),O=Math.min(N+k,i),B=R;B<A;B++)for(var z=I;z<L;z++){for(var U=0,W=N;W<O;W++)U+=l[S*p+B*d+W*m]*h[W*g+z*x+S*b];C[S*y+(B*u+z)]+=U}return w.toTensor()},e.prototype.fusedBatchMatMul=function(t){var n=t.a,o=t.b,a=t.transposeA,i=t.transposeB,s=t.bias,u=t.activation,c=t.preluActivationWeights,l=this.batchMatMul(n,o,a,i);return s&&(l=this.add(l,s)),u&&(l=jo(this,l,u,c)),l},e.prototype.multiply=function(t,n){return t.dtype==="complex64"||n.dtype==="complex64"?this.broadcastedBinaryComplexOp(t.cast("complex64"),n.cast("complex64"),function(o,a,i,s){return{real:o*i-a*s,imag:o*s+a*i}}):this.broadcastedBinaryOp(t,n,Vt(t.dtype,n.dtype),function(o,a){return o*a})},e.prototype.realDivide=function(t,n){return V([t,n],"realDivide"),this.broadcastedBinaryOp(t,n,"float32",function(o,a){return o/a})},e.prototype.floorDiv=function(t,n){return V([t,n],"floorDiv"),this.broadcastedBinaryOp(t,n,"int32",function(o,a){return Math.floor(o/a)})},e.prototype.sum=function(t,n){V(t,"sum"),oe("sum",n,t.rank);for(var o=Ht(t.shape,n),a=o[0],i=o[1],s=wt(a,Vt(t.dtype,"int32")),u=$(i),c=this.readSync(s.dataId),l=this.readSync(t.dataId),h=0;h<c.length;++h){for(var f=h*u,p=0,d=0;d<u;++d)p+=l[f+d];c[h]=p}return s},e.prototype.prod=function(t,n){V(t,"sum");for(var o=Ht(t.shape,n),a=o[0],i=o[1],s=wt(a,Vt(t.dtype,"int32")),u=$(i),c=this.readSync(s.dataId),l=this.readSync(t.dataId),h=0;h<c.length;++h){for(var f=h*u,p=1,d=0;d<u;++d)p*=l[f+d];c[h]=p}return s},e.prototype.unsortedSegmentSum=function(t,n,o){V(t,"unsortedSegmentSum");for(var a=[],i=t.rank-n.rank,s=0;s<i;++s)n=n.expandDims(s+1);for(s=0;s<o;++s){var u=q(s,"int32"),c=Pu(u,n).asType("float32").mul(t).sum(0);a.push(c)}return ce(a)},e.prototype.argMin=function(t,n){V(t,"argMin");var o=[n];oe("argMin",o,t.rank);for(var a=Ht(t.shape,o),i=a[0],s=a[1],u=wt(i,"int32"),c=$(s),l=this.readSync(u.dataId),h=this.readSync(t.dataId),f=0;f<l.length;++f){for(var p=f*c,d=h[p],m=0,v=0;v<c;++v){var g=h[p+v];g<d&&(d=g,m=v)}l[f]=m}return u},e.prototype.argMax=function(t,n){V(t,"argMax");var o=[n];oe("argMax",o,t.rank);for(var a=Ht(t.shape,o),i=a[0],s=a[1],u=wt(i,"int32"),c=$(s),l=this.readSync(u.dataId),h=this.readSync(t.dataId),f=0;f<l.length;++f){for(var p=f*c,d=h[p],m=0,v=0;v<c;++v){var g=h[p+v];g>d&&(d=g,m=v)}l[f]=m}return u},e.prototype.cumsum=function(t,n,o,a){if(V(t,"cumsum"),n!==t.rank-1)throw new Error("backend.cumsum in CPU expects an inner-most axis="+(t.rank-1)+" but got axis="+n);for(var i=Vt(t.dtype,"int32"),s=wt(t.shape,i),u=this.readSync(s.dataId),c=this.readSync(t.dataId),l=t.shape[t.rank-1],h=a?function(v,g){return v+l-g-1}:function(v,g){return v+g},f=0;f<c.length;f+=l)for(var p=0;p<l;p++){var d=h(f,p);if(p===0)u[d]=o?0:c[d];else{var m=h(f,p-1);u[d]=o?c[m]+u[m]:c[d]+u[m]}}return s},e.prototype.equal=function(t,n){return V([t,n],"equal"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o===a?1:0})},e.prototype.notEqual=function(t,n){return V([t,n],"notEqual"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o!==a?1:0})},e.prototype.less=function(t,n){return V([t,n],"less"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o<a?1:0})},e.prototype.lessEqual=function(t,n){return V([t,n],"lessEqual"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o<=a?1:0})},e.prototype.greater=function(t,n){return V([t,n],"greater"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o>a?1:0})},e.prototype.greaterEqual=function(t,n){return V([t,n],"greaterEqual"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o>=a?1:0})},e.prototype.logicalNot=function(t){V(t,"logicalNot");for(var n=this.readSync(t.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)o[a]=n[a]?0:1;return this.makeOutput(o,t.shape,"bool")},e.prototype.logicalAnd=function(t,n){return V([t,n],"logicalAnd"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o&&a})},e.prototype.logicalOr=function(t,n){return V([t,n],"logicalOr"),this.broadcastedBinaryOp(t,n,"bool",function(o,a){return o||a})},e.prototype.select=function(t,n,o){V([t,n,o],"select");for(var a=this.readSync(t.dataId),i=this.readSync(n.dataId),s=this.readSync(o.dataId),u=wt(n.shape,Vt(n.dtype,o.dtype)),c=this.readSync(u.dataId),l=0,h=t.rank===0||t.rank>1||n.rank===1?1:$(n.shape.slice(1)),f=0;f<a.length;f++)for(var p=0;p<h;p++)a[f]===1?c[l++]=i[f]:c[l++]=s[f];return u},e.prototype.where=function(t){V([t],"where");var n=this.readSync(t.dataId);return Ma(t.shape,n)},e.prototype.topk=function(t,n,o){return V(t,"topk"),hu(this.readSync(t.dataId),t.shape,t.dtype,n)},e.prototype.min=function(t,n){V(t,"min"),oe("min",n,t.rank);for(var o=Ht(t.shape,n),a=o[0],i=o[1],s=wt(a,t.dtype),u=$(i),c=this.readSync(s.dataId),l=this.readSync(t.dataId),h=0;h<c.length;++h){for(var f=h*u,p=l[f],d=0;d<u;++d){var m=l[f+d];m<p&&(p=m)}c[h]=p}return s},e.prototype.minimum=function(t,n){return V([t,n],"minimum"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){return Math.min(o,a)})},e.prototype.mod=function(t,n){return V([t,n],"mod"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){var i=o%a;return o<0&&a<0||o>=0&&a>=0?i:(i+a)%a})},e.prototype.max=function(t,n){V(t,"max"),oe("max",n,t.rank);for(var o=Ht(t.shape,n),a=o[0],i=o[1],s=wt(a,t.dtype),u=$(i),c=this.readSync(s.dataId),l=this.readSync(t.dataId),h=0;h<c.length;++h){for(var f=h*u,p=l[f],d=0;d<u;++d){var m=l[f+d];m>p&&(p=m)}c[h]=p}return s},e.prototype.maximum=function(t,n){return V([t,n],"maximum"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){return Math.max(o,a)})},e.prototype.all=function(t,n){V(t,"all"),oe("all",n,t.rank);for(var o=Ht(t.shape,n),a=o[0],i=o[1],s=wt(a,t.dtype),u=$(i),c=this.readSync(s.dataId),l=this.readSync(t.dataId),h=0;h<c.length;++h){for(var f=h*u,p=l[f],d=0;d<u;++d){var m=l[f+d];p=p&&m}c[h]=p}return s},e.prototype.any=function(t,n){V(t,"any"),oe("any",n,t.rank);for(var o=Ht(t.shape,n),a=o[0],i=o[1],s=wt(a,t.dtype),u=$(i),c=this.readSync(s.dataId),l=this.readSync(t.dataId),h=0;h<c.length;++h){for(var f=h*u,p=l[f],d=0;d<u;++d){var m=l[f+d];p=p||m}c[h]=p}return s},e.prototype.squaredDifference=function(t,n){return V([t,n],"squaredDifference"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){var i=o-a;return i*i})},e.prototype.ceil=function(t){V(t,"ceil");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.ceil(n[a]);return this.makeOutput(o,t.shape,"float32")},e.prototype.floor=function(t){V(t,"floor");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.floor(n[a]);return this.makeOutput(o,t.shape,"float32")},e.prototype.sign=function(t){V(t,"x");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)n[a]<0?o[a]=-1:n[a]>0?o[a]=1:o[a]=0;return this.makeOutput(o,t.shape,"float32")},e.prototype.isNaN=function(t){V(t,"x");for(var n=this.readSync(t.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)Number.isNaN(n[a])&&(o[a]=1);return this.makeOutput(o,t.shape,"bool")},e.prototype.isInf=function(t){V(t,"x");for(var n=this.readSync(t.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)Math.abs(n[a])===1/0&&(o[a]=1);return this.makeOutput(o,t.shape,"bool")},e.prototype.isFinite=function(t){V(t,"x");for(var n=this.readSync(t.dataId),o=new Uint8Array(n.length),a=0;a<n.length;++a)Number.isFinite(n[a])&&(o[a]=1);return this.makeOutput(o,t.shape,"bool")},e.prototype.round=function(t){V(t,"round");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=Math.floor(n[a]);n[a]-i<.5?o[a]=Math.floor(n[a]):n[a]-i>.5?o[a]=Math.ceil(n[a]):o[a]=i%2==0?i:i+1}return this.makeOutput(o,t.shape,"float32")},e.prototype.exp=function(t){V(t,"exp");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.exp(n[a]);return this.makeOutput(o,t.shape,"float32")},e.prototype.expm1=function(t){V(t,"expm1");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=Math.expm1(n[a]);return this.makeOutput(o,t.shape,"float32")},e.prototype.log=function(t){V(t,"log");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=Math.log(i)}return this.makeOutput(o,t.shape,"float32")},e.prototype.log1p=function(t){V(t,"log1p");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=Math.log1p(i)}return this.makeOutput(o,t.shape,"float32")},e.prototype.sqrt=function(t){V(t,"sqrt");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=Math.sqrt(i)}return this.makeOutput(o,t.shape,"float32")},e.prototype.rsqrt=function(t){V(t,"rsqrt");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a){var i=n[a];o[a]=1/Math.sqrt(i)}return this.makeOutput(o,t.shape,"float32")},e.prototype.reciprocal=function(t){V(t,"reciprocal");for(var n=this.readSync(t.dataId),o=new Float32Array(n.length),a=0;a<n.length;++a)o[a]=1/n[a];return this.makeOutput(o,t.shape,"float32")},e.prototype.linear=function(t){return t},e.prototype.relu=function(t){V(t,"relu");for(var n=wt(t.shape,t.dtype),o=this.readSync(n.dataId),a=this.readSync(t.dataId),i=0;i<a.length;++i)o[i]=Math.max(0,a[i]);return n},e.prototype.relu6=function(t){V(t,"relu");for(var n=wt(t.shape,t.dtype),o=this.readSync(n.dataId),a=this.readSync(t.dataId),i=0;i<a.length;++i)o[i]=Math.min(Math.max(0,a[i]),6);return n},e.prototype.prelu=function(t,n){return V([t,n],"prelu"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){return o<0?a*o:o})},e.prototype.elu=function(t){V(t,"elu");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a){var i=o[a];n[a]=i>=0?i:Math.exp(i)-1}return this.makeOutput(n,t.shape,"float32")},e.prototype.eluDer=function(t,n){V([t,n],"eluDer");for(var o=new Float32Array(n.size),a=this.readSync(n.dataId),i=this.readSync(t.dataId),s=0;s<a.length;++s){var u=a[s];o[s]=u>=1?i[s]:i[s]*(u+1)}return this.makeOutput(o,n.shape,"float32")},e.prototype.selu=function(t){V(t,"selu");for(var n=Ba,o=La,a=new Float32Array(t.size),i=this.readSync(t.dataId),s=0;s<i.length;++s){var u=i[s];a[s]=u>=0?o*u:n*(Math.exp(u)-1)}return this.makeOutput(a,t.shape,"float32")},e.prototype.clip=function(t,n,o){V(t,"clip");for(var a=new Float32Array(t.size),i=this.readSync(t.dataId),s=0;s<i.length;++s){var u=i[s];a[s]=u>o?o:u<n?n:u}return this.makeOutput(a,t.shape,"float32")},e.prototype.abs=function(t){for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.abs(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.complexAbs=function(t){for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<t.size;++a){var i=o[2*a],s=o[2*a+1];n[a]=Math.hypot(i,s)}return this.makeOutput(n,t.shape,"float32")},e.prototype.int=function(t){V(t,"int");for(var n=new Int32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=o[a];return this.makeOutput(n,t.shape,"int32")},e.prototype.sigmoid=function(t){V(t,"sigmoid");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=1/(1+Math.exp(-o[a]));return this.makeOutput(n,t.shape,"float32")},e.prototype.softplus=function(t){V(t,"softplus");for(var n=Math.log(11920928955078125e-23)+2,o=new Float32Array(t.size),a=this.readSync(t.dataId),i=0;i<a.length;++i){var s=a[i]>-n,u=a[i]<n,c=Math.exp(a[i]),l=void 0;l=u?c:s?a[i]:Math.log(1+c),o[i]=l}return this.makeOutput(o,t.shape,"float32")},e.prototype.sin=function(t){V(t,"sin");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.sin(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.cos=function(t){V(t,"cos");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.cos(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.tan=function(t){V(t,"tan");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.tan(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.asin=function(t){V(t,"asin");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.asin(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.acos=function(t){V(t,"acos");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.acos(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.atan=function(t){V(t,"atan");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.atan(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.atan2=function(t,n){return V([t,n],"atan2"),this.broadcastedBinaryOp(t,n,t.dtype,function(o,a){return Math.atan2(o,a)})},e.prototype.sinh=function(t){V(t,"sinh");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.sinh(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.cosh=function(t){V(t,"cosh");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.cosh(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.tanh=function(t){V(t,"tanh");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=ol(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.asinh=function(t){V(t,"asinh");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.asinh(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.acosh=function(t){V(t,"acosh");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.acosh(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.atanh=function(t){V(t,"atanh");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a)n[a]=Math.atanh(o[a]);return this.makeOutput(n,t.shape,"float32")},e.prototype.erf=function(t){V(t,"erf");for(var n=new Float32Array(t.size),o=this.readSync(t.dataId),a=0;a<o.length;++a){var i=Math.sign(o[a]),s=Math.abs(o[a]),u=1/(1+.3275911*s);n[a]=i*(1-((((1.061405429*u-1.453152027)*u+1.421413741)*u-.284496736)*u+.254829592)*u*Math.exp(-s*s))}return this.makeOutput(n,t.shape,"float32")},e.prototype.step=function(t,n){n===void 0&&(n=0),V(t,"step");for(var o=new Float32Array(t.size),a=this.readSync(t.dataId),i=0;i<a.length;++i){var s=a[i];isNaN(s)?o[i]=NaN:o[i]=s>0?1:n}return this.makeOutput(o,t.shape,"float32")},e.prototype.fusedConv2d=function(t){var n=t.input,o=t.filter,a=t.convInfo,i=t.bias,s=t.activation,u=t.preluActivationWeights,c=this.conv2d(n,o,a);return i&&(c=this.add(c,i)),s&&(c=jo(this,c,s,u)),c},e.prototype.conv2d=function(t,n,o){V([t,n],"conv2d");for(var a=o.filterHeight,i=o.filterWidth,s=o.dilationHeight,u=o.dilationWidth,c=o.padInfo.left,l=o.padInfo.top,h=o.dataFormat==="channelsLast",f=ot(o.outShape,t.dtype),p=t.strides[0],d=h?t.strides[1]:t.strides[2],m=h?t.strides[2]:1,v=h?1:t.strides[1],g=f.strides[0],x=h?f.strides[1]:f.strides[2],b=h?f.strides[2]:1,y=h?1:f.strides[1],w=this.readSync(t.dataId),C=this.readSync(n.dataId),k=f.values,S=0;S<o.batchSize;++S)for(var R=S*p,I=S*g,N=0;N<o.outHeight;++N)for(var A=I+N*x,L=N*o.strideHeight-l,O=0;O<a;O++){var B=L+O*s;if(!(B<0||B>=o.inHeight))for(var z=O*n.strides[0],U=R+B*d,W=0;W<o.outWidth;++W)for(var G=A+W*b,H=W*o.strideWidth-c,j=0;j<i;j++){var tt=H+j*u;if(!(tt<0||tt>=o.inWidth))for(var et=U+tt*m,it=z+j*n.strides[1],st=0;st<o.inChannels;++st){for(var ct=w[et+st*v],pt=0;pt<o.outChannels;++pt)k[G+pt*y]+=ct*C[it+pt];it+=o.outChannels}}}return f.toTensor()},e.prototype.conv3d=function(t,n,o){for(var a=o.filterDepth,i=o.filterHeight,s=o.filterWidth,u=o.dilationDepth,c=o.dilationHeight,l=o.dilationWidth,h=o.padInfo.front,f=o.padInfo.left,p=o.padInfo.top,d=ot(o.outShape,t.dtype),m=this.readSync(t.dataId),v=this.readSync(n.dataId),g=d.values,x=0;x<o.batchSize;++x)for(var b=x*t.strides[0],y=x*d.strides[0],w=0;w<o.outDepth;++w)for(var C=y+w*d.strides[1],k=w*o.strideDepth-h,S=0;S<a;S++){var R=k+S*u;if(!(R<0||R>=o.inDepth))for(var I=S*n.strides[0],N=b+R*t.strides[1],A=0;A<o.outHeight;++A)for(var L=C+A*d.strides[2],O=A*o.strideHeight-p,B=0;B<i;B++){var z=O+B*c;if(!(z<0||z>=o.inHeight))for(var U=I+B*n.strides[1],W=N+z*t.strides[2],G=0;G<o.outWidth;++G)for(var H=L+G*o.outChannels,j=G*o.strideWidth-f,tt=0;tt<s;tt++){var et=j+tt*l;if(!(et<0||et>=o.inWidth))for(var it=U+tt*n.strides[2],st=W+et*o.inChannels,ct=it,pt=0;pt<o.inChannels;++pt){for(var ht=m[st+pt],dt=0;dt<o.outChannels;++dt)g[H+dt]+=ht*v[ct+dt];ct+=o.outChannels}}}}return d.toTensor()},e.prototype.conv2dDerInput=function(t,n,o){V([t,n],"conv2dDerInput");for(var a=ot(o.inShape,"float32"),i=a.values,s=this.readSync(t.dataId),u=this.readSync(n.dataId),c=n.strides,l=c[0],h=c[1],f=c[2],p=o.batchSize,d=o.filterHeight,m=o.filterWidth,v=o.inChannels,g=o.inHeight,x=o.inWidth,b=o.outChannels,y=o.outHeight,w=o.outWidth,C=o.strideHeight,k=o.strideWidth,S=o.dataFormat,R=d-1-o.padInfo.top,I=m-1-o.padInfo.left,N=S==="channelsLast",A=a.strides[0],L=N?a.strides[1]:a.strides[2],O=N?a.strides[2]:1,B=N?1:a.strides[1],z=t.strides[0],U=N?t.strides[1]:t.strides[2],W=N?t.strides[2]:1,G=N?1:t.strides[1],H=0;H<p;++H)for(var j=0;j<v;++j)for(var tt=0;tt<g;++tt)for(var et=tt-R,it=Math.max(0,Math.ceil(et/C)),st=Math.min(y,(d+et)/C),ct=0;ct<x;++ct){for(var pt=ct-I,ht=Math.max(0,Math.ceil(pt/k)),dt=Math.min(w,(m+pt)/k),At=0,ft=it;ft<st;++ft)for(var xt=ft*C-et,mt=ht;mt<dt;++mt)for(var kt=z*H+U*ft+W*mt,Ct=l*(d-1-xt)+h*(m-1-(mt*k-pt))+f*j,_t=0;_t<b;++_t)At+=s[kt+G*_t]*u[Ct+_t];i[A*H+L*tt+O*ct+B*j]=At}return a.toTensor()},e.prototype.conv3dDerInput=function(t,n,o){for(var a=ot(o.inShape,"float32"),i=a.values,s=a.strides,u=s[0],c=s[1],l=s[2],h=s[3],f=this.readSync(t.dataId),p=t.strides,d=p[0],m=p[1],v=p[2],g=p[3],x=this.readSync(n.dataId),b=n.strides,y=b[0],w=b[1],C=b[2],k=b[3],S=o.batchSize,R=o.filterDepth,I=o.filterHeight,N=o.filterWidth,A=o.inChannels,L=o.inDepth,O=o.inHeight,B=o.inWidth,z=o.outChannels,U=o.outDepth,W=o.outHeight,G=o.outWidth,H=o.strideDepth,j=o.strideHeight,tt=o.strideWidth,et=R-1-o.padInfo.front,it=I-1-o.padInfo.top,st=N-1-o.padInfo.left,ct=0;ct<S;++ct)for(var pt=0;pt<A;++pt)for(var ht=0;ht<L;++ht)for(var dt=ht-et,At=Math.max(0,Math.ceil(dt/H)),ft=Math.min(U,(R+dt)/H),xt=0;xt<O;++xt)for(var mt=xt-it,kt=Math.max(0,Math.ceil(mt/j)),Ct=Math.min(W,(I+mt)/j),_t=0;_t<B;++_t){for(var be=_t-st,we=Math.max(0,Math.ceil(be/tt)),ne=Math.min(G,(N+be)/tt),Rn=0,Be=At;Be<ft;++Be)for(var $e=Be*H-dt,Le=kt;Le<Ct;++Le)for(var In=Le*j-mt,We=we;We<ne;++We)for(var Eo=d*ct+m*Be+v*Le+g*We,kn=y*(R-1-$e)+w*(I-1-In)+C*(N-1-(We*tt-be))+k*pt,Ce=0;Ce<z;++Ce)Rn+=f[Eo+Ce]*x[kn+Ce];i[u*ct+c*ht+l*xt+h*_t+pt]=Rn}return a.toTensor()},e.prototype.conv2dDerFilter=function(t,n,o){V([t,n],"conv2dDerFilter");for(var a=o.strideHeight,i=o.strideWidth,s=o.filterHeight,u=o.filterWidth,c=o.dataFormat==="channelsLast",l=ot(o.filterShape,"float32"),h=o.padInfo.left,f=o.padInfo.top,p=this.bufferSync(t),d=this.bufferSync(n),m=0;m<s;++m)for(var v=Math.max(0,Math.ceil((f-m)/a)),g=Math.min(o.outHeight,(o.inHeight+f-m)/a),x=0;x<u;++x)for(var b=Math.max(0,Math.ceil((h-x)/i)),y=Math.min(o.outWidth,(o.inWidth+h-x)/i),w=0;w<o.inChannels;++w)for(var C=0;C<o.outChannels;++C){for(var k=0,S=0;S<o.batchSize;++S)for(var R=v;R<g;++R)for(var I=m+R*a-f,N=b;N<y;++N){var A=x+N*i-h;k+=c?p.get(S,I,A,w)*d.get(S,R,N,C):p.get(S,w,I,A)*d.get(S,C,R,N)}l.set(k,m,x,w,C)}return l.toTensor()},e.prototype.conv3dDerFilter=function(t,n,o){for(var a=o.strideDepth,i=o.strideHeight,s=o.strideWidth,u=o.filterDepth,c=o.filterHeight,l=o.filterWidth,h=ot(o.filterShape,"float32"),f=h.values,p=h.strides,d=p[0],m=p[1],v=p[2],g=p[3],x=this.readSync(n.dataId),b=n.strides,y=b[0],w=b[1],C=b[2],k=b[3],S=this.readSync(t.dataId),R=t.strides,I=R[0],N=R[1],A=R[2],L=R[3],O=o.padInfo.front,B=o.padInfo.left,z=o.padInfo.top,U=0;U<u;++U)for(var W=Math.max(0,Math.ceil((O-U)/a)),G=Math.min(o.outDepth,(o.inDepth+O-U)/a),H=U*d,j=0;j<c;++j)for(var tt=Math.max(0,Math.ceil((z-j)/i)),et=Math.min(o.outHeight,(o.inHeight+z-j)/i),it=j*m+H,st=0;st<l;++st)for(var ct=Math.max(0,Math.ceil((B-st)/s)),pt=Math.min(o.outWidth,(o.inWidth+B-st)/s),ht=st*v+it,dt=0;dt<o.inChannels;++dt)for(var At=dt*g+ht,ft=0;ft<o.outChannels;++ft){for(var xt=0,mt=0;mt<o.batchSize;++mt)for(var kt=mt*I,Ct=mt*y,_t=W;_t<G;++_t)for(var be=(U+_t*a-O)*N+kt,we=_t*w+Ct,ne=tt;ne<et;++ne)for(var Rn=(j+ne*i-z)*A+be,Be=ne*C+we,$e=ct;$e<pt;++$e){var Le=$e*k+Be;xt+=S[(st+$e*s-B)*L+Rn+dt]*x[Le+ft]}f[At+ft]=xt}return h.toTensor()},e.prototype.fusedDepthwiseConv2D=function(t){var n=t.input,o=t.filter,a=t.convInfo,i=t.bias,s=t.activation,u=t.preluActivationWeights,c=this.depthwiseConv2D(n,o,a);return i&&(c=this.add(c,i)),s&&(c=jo(this,c,s,u)),c},e.prototype.depthwiseConv2D=function(t,n,o){V([t,n],"depthwiseConv2D");for(var a=o.filterHeight,i=o.filterWidth,s=o.dilationHeight,u=o.dilationWidth,c=o.padInfo.left,l=o.padInfo.top,h=o.outChannels/o.inChannels,f=ot(o.outShape,t.dtype),p=this.readSync(t.dataId),d=this.readSync(n.dataId),m=f.values,v=0;v<o.batchSize;++v)for(var g=v*t.strides[0],x=v*f.strides[0],b=0;b<o.outHeight;++b)for(var y=x+b*f.strides[1],w=b*o.strideHeight-c,C=0;C<a;++C){var k=w+C*s;if(!(k<0||k>=o.inHeight))for(var S=C*n.strides[0],R=g+k*t.strides[1],I=0;I<o.outWidth;++I)for(var N=y+I*f.strides[2],A=I*o.strideWidth-l,L=0;L<i;++L){var O=A+L*u;if(!(O<0||O>=o.inWidth))for(var B=S+L*n.strides[1],z=R+O*o.inChannels,U=N,W=B,G=0;G<o.inChannels;++G){for(var H=p[z+G],j=0;j<h;++j)m[U+j]+=H*d[W+j];U+=h,W+=h}}}return f.toTensor()},e.prototype.depthwiseConv2DDerInput=function(t,n,o){V([t,n],"depthwiseConv2DDerInput");for(var a=ot(o.inShape,"float32"),i=a.values,s=a.strides,u=s[0],c=s[1],l=s[2],h=this.readSync(t.dataId),f=t.strides,p=f[0],d=f[1],m=f[2],v=this.readSync(n.dataId),g=n.strides,x=g[0],b=g[1],y=g[2],w=o.batchSize,C=o.filterHeight,k=o.filterWidth,S=o.inChannels,R=o.inHeight,I=o.inWidth,N=o.outChannels,A=o.outHeight,L=o.outWidth,O=o.strideHeight,B=o.strideWidth,z=C-1-o.padInfo.top,U=k-1-o.padInfo.left,W=N/S,G=0;G<w;++G)for(var H=0;H<S;++H)for(var j=0;j<R;++j)for(var tt=j-z,et=Math.max(0,Math.ceil(tt/O)),it=Math.min(A,(C+tt)/O),st=0;st<I;++st){for(var ct=st-U,pt=Math.max(0,Math.ceil(ct/B)),ht=Math.min(L,(k+ct)/B),dt=0,At=et;At<it;++At)for(var ft=At*O-tt,xt=pt;xt<ht;++xt)for(var mt=p*G+d*At+m*xt,kt=x*(C-1-ft)+b*(k-1-(xt*B-ct))+y*H,Ct=0;Ct<W;++Ct)dt+=h[mt+(H*W+Ct)]*v[kt+Ct];i[u*G+c*j+l*st+H]=dt}return a.toTensor()},e.prototype.depthwiseConv2DDerFilter=function(t,n,o){V([t,n],"depthwiseConv2DDerFilter");for(var a=o.strideHeight,i=o.strideWidth,s=o.filterHeight,u=o.filterWidth,c=ot(o.filterShape,"float32"),l=o.padInfo.left,h=o.padInfo.top,f=o.outChannels/o.inChannels,p=this.bufferSync(t),d=this.bufferSync(n),m=0;m<s;++m)for(var v=Math.max(0,Math.ceil((h-m)/a)),g=Math.min(o.outHeight,(o.inHeight+h-m)/a),x=0;x<u;++x)for(var b=Math.max(0,Math.ceil((l-x)/i)),y=Math.min(o.outWidth,(o.inWidth+l-x)/i),w=0;w<o.outChannels;++w){for(var C=Math.trunc(w/f),k=w%f,S=0,R=0;R<o.batchSize;++R)for(var I=v;I<g;++I)for(var N=m+I*a-h,A=b;A<y;++A){var L=x+A*i-l;S+=p.get(R,N,L,C)*d.get(R,I,A,w)}c.set(S,m,x,C,k)}return c.toTensor()},e.prototype.tile=function(t,n){return V(t,"tile"),lu(this.bufferSync(t),n)},e.prototype.pad=function(t,n,o){V(t,"pad");var a=n.map(function(f,p){return f[0]+t.shape[p]+f[1]}),i=n.map(function(f){return f[0]}),s=this.bufferSync(t),u=ot(a,t.dtype);o!==0&&u.values.fill(o);for(var c=0;c<t.size;c++){var l=s.indexToLoc(c),h=l.map(function(f,p){return f+i[p]});u.set.apply(u,[s.get.apply(s,l)].concat(h))}return u.toTensor()},e.prototype.transpose=function(t,n){V(t,"transpose");for(var o=new Array(t.rank),a=0;a<o.length;a++)o[a]=t.shape[n[a]];var i=this.readSync(t.dataId),s=ot(o,t.dtype),u=this.bufferSync(t);for(a=0;a<t.size;++a){for(var c=u.indexToLoc(a),l=new Array(c.length),h=0;h<l.length;h++)l[h]=c[n[h]];var f=s.locToIndex(l);s.values[f]=i[a]}return s.toTensor()},e.prototype.gather=function(t,n,o){V([t,n],"gather");var a=t.shape.slice(),i=this.readSync(n.dataId);a[o]=i.length;for(var s=ot(a,t.dtype),u=this.bufferSync(t),c=0;c<s.size;++c){var l=s.indexToLoc(c),h=l.slice();h[o]=i[l[o]];var f=u.locToIndex(h);s.values[c]=u.values[f]}return s.toTensor()},e.prototype.batchToSpaceND=function(t,n,o){V([t],"batchToSpaceND");var a=n.reduce(function(h,f){return h*f}),i=qr(t.shape,n,a),s=jr(i.length,n.length),u=Kr(t.shape,n,a),c=Js(o,n.length),l=Qs(u,o,n.length);return t.reshape(i).transpose(s).reshape(u).slice(c,l)},e.prototype.spaceToBatchND=function(t,n,o){V([t],"spaceToBatchND");var a=n.reduce(function(f,p){return f*p}),i=[[0,0]];i.push.apply(i,o);for(var s=1+n.length;s<t.shape.length;++s)i.push([0,0]);var u=t.pad(i),c=qr(u.shape,n,a,!1),l=jr(c.length,n.length,!1),h=Kr(u.shape,n,a,!1);return u.reshape(c).transpose(l).reshape(h)},e.prototype.pool=function(t,n,o){V(t,"pool");for(var a=n.strideHeight,i=n.strideWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,h=n.padInfo.top,f=n.padInfo.left,p=o==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,d=this.readSync(t.dataId),m=ot(n.outShape,t.dtype),v=m.values,g=n.outShape[1]*n.outShape[2]*n.outShape[3],x=n.outShape[2]*n.outShape[3],b=n.outShape[3],y=0;y<n.batchSize;++y)for(var w=y*g,C=y*t.strides[0],k=0;k<n.inChannels;++k)for(var S=0;S<n.outHeight;++S)for(var R=S*a-h,I=Math.max(0,R),N=Math.min(n.inHeight,c+R),A=w+S*x,L=0;L<n.outWidth;++L){for(var O=L*i-f,B=Math.max(0,O),z=Math.min(n.inWidth,l+O),U=p,W=0,G=0,H=I;H<N;H+=s){for(var j=C+H*t.strides[1],tt=B;tt<z;tt+=u){var et=d[j+tt*t.strides[2]+k];o==="max"&&et>U?U=et:o==="avg"&&(W+=et,G++)}if(isNaN(U))break}v[A+L*b+k]=o==="avg"?W/G:U}return m.toTensor()},e.prototype.maxPool=function(t,n){return this.pool(t,n,"max")},e.prototype.maxPoolPositions=function(t,n){for(var o=ot(n.outShape,"int32"),a=n.strideHeight,i=n.strideWidth,s=n.dilationHeight,u=n.dilationWidth,c=n.effectiveFilterHeight,l=n.effectiveFilterWidth,h=n.padInfo.top,f=n.padInfo.left,p=this.bufferSync(t),d=0;d<n.batchSize;++d)for(var m=0;m<n.inChannels;++m)for(var v=0;v<n.outHeight;++v){for(var g=v*a-h,x=g;x<0;)x+=s;for(var b=Math.min(n.inHeight,c+g),y=0;y<n.outWidth;++y){for(var w=y*i-f,C=w;C<0;)C+=u;for(var k=Math.min(n.inWidth,l+w),S=Number.NEGATIVE_INFINITY,R=-1,I=x;I<b;I+=s)for(var N=I-g,A=C;A<k;A+=u){var L=A-w,O=p.get(d,I,A,m);O>S&&(S=O,R=N*l+L)}o.set(R,d,v,y,m)}}return o.toTensor()},e.prototype.maxPoolBackprop=function(t,n,o,a){V([n,o],"maxPoolBackprop");for(var i=this.maxPoolPositions(n,a),s=a.strideHeight,u=a.strideWidth,c=a.dilationHeight,l=a.dilationWidth,h=a.effectiveFilterHeight,f=a.effectiveFilterWidth,p=f-1-a.padInfo.left,d=h-1-a.padInfo.top,m=ot(n.shape,"float32"),v=this.bufferSync(i),g=this.bufferSync(t),x=0;x<a.batchSize;++x)for(var b=0;b<a.inChannels;++b)for(var y=0;y<a.inHeight;++y)for(var w=0;w<a.inWidth;++w){for(var C=y-d,k=w-p,S=0,R=0;R<h;R+=c){var I=(C+R)/s;if(!(I<0||I>=a.outHeight||Math.floor(I)!==I))for(var N=0;N<f;N+=l){var A=(k+N)/u;if(!(A<0||A>=a.outWidth||Math.floor(A)!==A)){var L=h*f-1-v.get(x,I,A,b)===R*f+N?1:0;L!==0&&(S+=g.get(x,I,A,b)*L)}}}m.set(S,x,y,w,b)}return m.toTensor()},e.prototype.avgPoolBackprop=function(t,n,o){V([t,n],"avgPoolBackprop");for(var a=o.strideHeight,i=o.strideWidth,s=o.filterHeight,u=o.filterWidth,c=o.dilationHeight,l=o.dilationWidth,h=o.effectiveFilterHeight,f=o.effectiveFilterWidth,p=f-1-o.padInfo.left,d=h-1-o.padInfo.top,m=ot(n.shape,"float32"),v=1/(s*u),g=this.bufferSync(t),x=0;x<o.batchSize;++x)for(var b=0;b<o.inChannels;++b)for(var y=0;y<o.inHeight;++y)for(var w=0;w<o.inWidth;++w){for(var C=y-d,k=w-p,S=0,R=0;R<h;R+=c){var I=(C+R)/a;if(!(I<0||I>=o.outHeight||Math.floor(I)!==I))for(var N=0;N<f;N+=l){var A=(k+N)/i;A<0||A>=o.outWidth||Math.floor(A)!==A||(S+=g.get(x,I,A,b))}}m.set(S*v,x,y,w,b)}return m.toTensor()},e.prototype.pool3d=function(t,n,o){V(t,"pool3d");for(var a=n.strideDepth,i=n.strideHeight,s=n.strideWidth,u=n.dilationDepth,c=n.dilationHeight,l=n.dilationWidth,h=n.effectiveFilterDepth,f=n.effectiveFilterHeight,p=n.effectiveFilterWidth,d=n.padInfo.front,m=n.padInfo.top,v=n.padInfo.left,g=o==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,x=this.readSync(t.dataId),b=ot(n.outShape,t.dtype),y=b.values,w=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],C=n.outShape[2]*n.outShape[3]*n.outShape[4],k=n.outShape[3]*n.outShape[4],S=n.outShape[4],R=0;R<n.batchSize;++R)for(var I=R*w,N=R*t.strides[0],A=0;A<n.inChannels;++A)for(var L=0;L<n.outDepth;++L){for(var O=L*a-d,B=O;B<0;)B+=u;for(var z=Math.min(n.inDepth,h+O),U=I+L*C,W=0;W<n.outHeight;++W){for(var G=W*i-m,H=G;H<0;)H+=c;for(var j=Math.min(n.inHeight,f+G),tt=U+W*k,et=0;et<n.outWidth;++et){for(var it=et*s-v,st=it;st<0;)st+=l;for(var ct=Math.min(n.inWidth,p+it),pt=tt+et*S,ht=g,dt=0,At=0,ft=B;ft<z;ft+=u){for(var xt=N+ft*t.strides[1],mt=H;mt<j;mt+=c){for(var kt=xt+mt*t.strides[2],Ct=st;Ct<ct;Ct+=l){var _t=x[kt+Ct*t.strides[3]+A];if(o==="max"&&_t>ht?ht=_t:o==="avg"&&(dt+=_t,At++),isNaN(ht))break}if(isNaN(ht))break}if(isNaN(ht))break}y[pt+A]=o==="avg"?dt/At:ht}}}return b.toTensor()},e.prototype.avgPool3d=function(t,n){return V(t,"avgPool3d"),this.pool3d(t,n,"avg").toFloat()},e.prototype.avgPool3dBackprop=function(t,n,o){V([t,n],"avgPool3dBackprop");for(var a=o.strideDepth,i=o.strideHeight,s=o.strideWidth,u=o.filterDepth,c=o.filterHeight,l=o.filterWidth,h=o.dilationDepth,f=o.dilationHeight,p=o.dilationWidth,d=o.effectiveFilterDepth,m=o.effectiveFilterHeight,v=o.effectiveFilterWidth,g=d-1-o.padInfo.front,x=v-1-o.padInfo.left,b=m-1-o.padInfo.top,y=ot(n.shape,"float32"),w=1/(u*c*l),C=this.bufferSync(t),k=0;k<o.batchSize;++k)for(var S=0;S<o.inChannels;++S)for(var R=0;R<o.inDepth;++R)for(var I=0;I<o.inHeight;++I)for(var N=0;N<o.inWidth;++N){for(var A=R-g,L=I-b,O=N-x,B=0,z=0;z<d;z+=h){var U=(A+z)/a;if(!(U<0||U>=o.outDepth||Math.floor(U)!==U))for(var W=0;W<m;W+=f){var G=(L+W)/i;if(!(G<0||G>=o.outHeight||Math.floor(G)!==G))for(var H=0;H<v;H+=p){var j=(O+H)/s;j<0||j>=o.outWidth||Math.floor(j)!==j||(B+=C.get(k,U,G,j,S))}}}y.set(B*w,k,R,I,N,S)}return y.toTensor()},e.prototype.maxPool3d=function(t,n){return V(t,"maxPool3d"),this.pool3d(t,n,"max").toFloat()},e.prototype.maxPool3dPositions=function(t,n){for(var o=ot(n.outShape,"int32"),a=n.strideDepth,i=n.strideHeight,s=n.strideWidth,u=n.dilationDepth,c=n.dilationHeight,l=n.dilationWidth,h=n.effectiveFilterDepth,f=n.effectiveFilterHeight,p=n.effectiveFilterWidth,d=n.padInfo.front,m=n.padInfo.top,v=n.padInfo.left,g=this.bufferSync(t),x=0;x<n.batchSize;++x)for(var b=0;b<n.inChannels;++b)for(var y=0;y<n.outDepth;++y){for(var w=y*a-d,C=w;C<0;)C+=u;for(var k=Math.min(n.inDepth,h+w),S=0;S<n.outHeight;++S){for(var R=S*i-m,I=R;I<0;)I+=c;for(var N=Math.min(n.inHeight,f+R),A=0;A<n.outWidth;++A){for(var L=A*s-v,O=L;O<0;)O+=l;for(var B=Math.min(n.inWidth,p+L),z=Number.NEGATIVE_INFINITY,U=-1,W=C;W<k;W+=u)for(var G=W-w,H=I;H<N;H+=c)for(var j=H-R,tt=O;tt<B;tt+=l){var et=tt-L,it=g.get(x,W,H,tt,b);it>=z&&(z=it,U=G*f*p+j*f+et)}o.set(U,x,y,S,A,b)}}}return o.toTensor()},e.prototype.maxPool3dBackprop=function(t,n,o,a){V([n,o],"maxPool3dBackprop");for(var i=this.maxPool3dPositions(n,a),s=a.strideDepth,u=a.strideHeight,c=a.strideWidth,l=a.dilationDepth,h=a.dilationHeight,f=a.dilationWidth,p=a.effectiveFilterDepth,d=a.effectiveFilterHeight,m=a.effectiveFilterWidth,v=p-1-a.padInfo.front,g=m-1-a.padInfo.left,x=d-1-a.padInfo.top,b=ot(n.shape,"float32"),y=this.bufferSync(i),w=this.bufferSync(t),C=0;C<a.batchSize;++C)for(var k=0;k<a.inChannels;++k)for(var S=0;S<a.inDepth;++S)for(var R=0;R<a.inHeight;++R)for(var I=0;I<a.inWidth;++I){for(var N=S-v,A=R-x,L=I-g,O=0,B=0;B<p;B+=l){var z=(N+B)/s;if(!(z<0||z>=a.outDepth||Math.floor(z)!==z))for(var U=0;U<d;U+=h){var W=(A+U)/u;if(!(W<0||W>=a.outHeight||Math.floor(W)!==W))for(var G=0;G<m;G+=f){var H=(L+G)/c;if(!(H<0||H>=a.outWidth||Math.floor(H)!==H)){var j=p*d*m-1-y.get(C,z,W,H,k)===B*d*m+U*m+G?1:0;j!==0&&(O+=w.get(C,z,W,H,k)*j)}}}}b.set(O,C,S,R,I,k)}return b.toTensor()},e.prototype.cast=function(t,n){return iu(t,n,this)},e.prototype.reshape=function(t,n){return da(t,n)},e.prototype.avgPool=function(t,n){return V(t,"avgPool"),this.pool(t,n,"avg").toFloat()},e.prototype.resizeBilinear=function(t,n,o,a){V(t,"resizeBilinear");for(var i=t.shape,s=i[0],u=i[1],c=i[2],l=i[3],h=this.readSync(t.dataId),f=new Float32Array($([s,n,o,l])),p=[a&&n>1?u-1:u,a&&o>1?c-1:c],d=[a&&n>1?n-1:n,a&&o>1?o-1:o],m=0,v=p[0]/d[0],g=p[1]/d[1],x=0;x<s;x++)for(var b=0;b<n;b++)for(var y=v*b,w=Math.floor(y),C=y-w,k=Math.min(u-1,Math.ceil(y)),S=x*t.strides[0]+w*t.strides[1],R=x*t.strides[0]+k*t.strides[1],I=0;I<o;I++)for(var N=g*I,A=Math.floor(N),L=N-A,O=Math.min(c-1,Math.ceil(N)),B=S+A*t.strides[2],z=R+A*t.strides[2],U=S+O*t.strides[2],W=R+O*t.strides[2],G=0;G<l;G++){var H=h[B+G],j=h[z+G],tt=H+(h[U+G]-H)*L,et=tt+(j+(h[W+G]-j)*L-tt)*C;f[m++]=et}return Gt(f,[s,n,o,l])},e.prototype.resizeBilinearBackprop=function(t,n,o){V([t,n],"resizeBilinearBackprop");for(var a=n.shape,i=a[0],s=a[1],u=a[2],c=a[3],l=t.shape,h=l[1],f=l[2],p=new Float32Array(i*s*u*c),d=[o&&h>1?s-1:s,o&&f>1?u-1:u],m=[o&&h>1?h-1:h,o&&f>1?f-1:f],v=d[0]/m[0],g=d[1]/m[1],x=this.readSync(t.dataId),b=0,y=0;y<i;y++)for(var w=y*n.strides[0],C=0;C<h;C++)for(var k=C*v,S=Math.floor(k),R=Math.min(Math.ceil(k),s-1),I=w+S*n.strides[1],N=w+R*n.strides[1],A=k-S,L=1-A,O=0;O<f;O++)for(var B=O*g,z=Math.floor(B),U=Math.min(Math.ceil(B),u-1),W=B-z,G=1-W,H=I+z*n.strides[2],j=I+U*n.strides[2],tt=N+z*n.strides[2],et=N+U*n.strides[2],it=L*G,st=L*W,ct=A*G,pt=A*W,ht=0;ht<c;ht++){var dt=x[b++];p[H+ht]+=dt*it,p[j+ht]+=dt*st,p[tt+ht]+=dt*ct,p[et+ht]+=dt*pt}return Jt(p,[i,u,s,c],n.dtype)},e.prototype.resizeNearestNeighbor=function(t,n,o,a){V(t,"resizeNearestNeighbor");for(var i=t.shape,s=i[0],u=i[1],c=i[2],l=i[3],h=this.readSync(t.dataId),f=new Float32Array(s*n*o*l),p=[a&&n>1?u-1:u,a&&o>1?c-1:c],d=[a&&n>1?n-1:n,a&&o>1?o-1:o],m=p[0]/d[0],v=p[1]/d[1],g=0,x=0;x<s;x++)for(var b=x*t.strides[0],y=0;y<n;y++)for(var w=m*y,C=b+Math.min(u-1,a?Math.round(w):Math.floor(w))*t.strides[1],k=0;k<o;k++)for(var S=v*k,R=C+Math.min(c-1,a?Math.round(S):Math.floor(S))*t.strides[2],I=0;I<l;I++){var N=h[R+I];f[g++]=N}return Gt(f,[s,n,o,l],t.dtype)},e.prototype.resizeNearestNeighborBackprop=function(t,n,o){V([t,n],"resizeNearestNeighborBackprop");for(var a=n.shape,i=a[0],s=a[1],u=a[2],c=a[3],l=t.shape,h=l[1],f=l[2],p=new Float32Array(i*s*u*c),d=this.readSync(t.dataId),m=[o&&h>1?s-1:s,o&&f>1?u-1:u],v=[o&&h>1?h-1:h,o&&f>1?f-1:f],g=m[0]/v[0],x=m[1]/v[1],b=1/g,y=1/x,w=2*Math.ceil(b)+2,C=2*Math.ceil(y)+2,k=0;k<i;k++)for(var S=k*n.strides[0],R=0;R<s;R++)for(var I=S+R*n.strides[1],N=Math.floor(R*b),A=Math.floor(N-w/2),L=0;L<u;L++)for(var O=I+L*n.strides[2],B=Math.floor(L*y),z=Math.floor(B-C/2),U=0;U<c;U++){for(var W=0,G=0;G<w;G++){var H=G+A;if(!(H<0||H>=h)){var j=S+H*t.strides[1],tt=H*g;if(R===Math.min(s-1,o?Math.round(tt):Math.floor(tt)))for(var et=0;et<C;et++){var it=et+z;if(!(it<0||it>=f)){var st=j+it*t.strides[2],ct=it*x;L===Math.min(u-1,o?Math.round(ct):Math.floor(ct))&&(W+=d[st+U])}}}}p[O+U]=W}return Jt(p,n.shape,n.dtype)},e.prototype.batchNormalization=function(t,n,o,a,i,s){V([t,n,o,i,s],"batchNorm");for(var u=this.readSync(t.dataId),c=this.readSync(n.dataId),l=this.readSync(o.dataId),h=i?this.readSync(i.dataId):new Float32Array([1]),f=s?this.readSync(s.dataId):new Float32Array([0]),p=new Float32Array(u.length),d=f.length,m=h.length,v=l.length,g=c.length,x=0,b=0,y=0,w=0,C=0;C<u.length;++C)p[C]=f[x++]+(u[C]-c[b++])*h[y++]/Math.sqrt(l[w++]+a),x>=d&&(x=0),b>=g&&(b=0),y>=m&&(y=0),w>=v&&(w=0);return Jt(p,t.shape)},e.prototype.localResponseNormalization4D=function(t,n,o,a,i){V(t,"localResponseNormalization4D");var s=t.shape[3],u=s-1,c=this.readSync(t.dataId),l=t.size,h=new Float32Array(l);function f(v){for(var g=v%s,x=v-g+Math.max(0,g-n),b=v-g+Math.min(g+n,u),y=0;x<=b;x++){var w=c[x];y+=w*w}return y}for(var p=0;p<l;p++){var d=f(p),m=c[p]*Math.pow(o+a*d,-i);h[p]=m}return Jt(h,t.shape)},e.prototype.LRNGrad=function(t,n,o,a,i,s,u){V(t,"LRNGrad");for(var c=t.shape[3],l=this.readSync(t.dataId),h=this.readSync(n.dataId),f=this.readSync(o.dataId),p=new Float32Array(t.size),d=t.size,m=0;m<d;m++){for(var v=m%c,g=m-v+Math.max(0,v-a),x=m-v+Math.min(c,v+a+1),b=0,y=g;y<x;y++)b+=Math.pow(h[y],2);for(b=s*b+i,y=g;y<x;y++){var w=-2*s*u*h[y]*f[m]/b;m===y&&(w+=Math.pow(b,-u)),w*=l[m],p[y]+=w}}return Jt(p,t.shape)},e.prototype.multinomial=function(t,n,o,a){V(t,"multinomial");for(var i=n?t:qe(t),s=i.shape[0],u=i.shape[1],c=wt([s,o],"int32"),l=this.readSync(c.dataId),h=this.readSync(i.dataId),f=0;f<s;++f){var p=f*u,d=new Float32Array(u-1);d[0]=h[p];for(var m=1;m<d.length;++m)d[m]=d[m-1]+h[p+m];for(var v=so(a.toString()),g=f*o,x=0;x<o;++x){var b=v();l[g+x]=d.length;for(var y=0;y<d.length;y++)if(b<d[y]){l[g+x]=y;break}}}return c},e.prototype.oneHot=function(t,n,o,a){V(t,"oneHot");var i=new Float32Array(t.size*n);i.fill(a);for(var s=this.readSync(t.dataId),u=0;u<t.size;++u)s[u]>=0&&s[u]<n&&(i[u*n+s[u]]=o);return nn(i,[t.size,n],"int32")},e.prototype.nonMaxSuppression=function(t,n,o,a,i){return V(t,"nonMaxSuppression"),Fa(this.readSync(t.dataId),this.readSync(n.dataId),o,a,i)},e.prototype.fft=function(t){return this.fftBatch(t,!1)},e.prototype.ifft=function(t){return this.fftBatch(t,!0)},e.prototype.fftBatch=function(t,n){for(var o=t.shape[0],a=t.shape[1],i=ot(t.shape,"float32"),s=ot(t.shape,"float32"),u=fe(t).as2D(o,a),c=ke(t).as2D(o,a),l=0;l<o;l++)for(var h=u.slice([l,0],[1,a]),f=c.slice([l,0],[1,a]),p=zt(h,f),d=this.readSync(this.fftImpl(p,n).dataId),m=0;m<a;m++){var v=Ui(d,m);i.values[l*a+m]=v.real,s.values[l*a+m]=v.imag}return zt(i.toTensor(),s.toTensor()).as2D(o,a)},e.prototype.fftImpl=function(t,n){var o=t.as1D(),a=o.size;if(this.isExponentOf2(a)){var i=this.fftRadix2(o,a,n).as2D(t.shape[0],t.shape[1]);return n&&(i=zt(fe(i).div(q(a)),ke(i).div(q(a)))),i}var s=this.readSync(t.dataId),u=function(c){for(var l=new Float32Array(c.length/2),h=new Float32Array(c.length/2),f=0;f<c.length;f+=2)l[f/2]=c[f],h[f/2]=c[f+1];return{real:l,imag:h}}(this.fourierTransformByMatmul(s,a,n));return zt(u.real,u.imag).as2D(t.shape[0],t.shape[1])},e.prototype.isExponentOf2=function(t){return(t&t-1)==0},e.prototype.fftRadix2=function(t,n,o){if(n===1)return t;var a=this.readSync(t.dataId),i=n/2,s=function(g){for(var x=Math.ceil(g.length/4),b=new Float32Array(x),y=new Float32Array(x),w=0;w<g.length;w+=4)b[Math.floor(w/4)]=g[w],y[Math.floor(w/4)]=g[w+1];return{real:b,imag:y}}(a),u=zt(s.real,s.imag).as1D(),c=function(g){for(var x=Math.floor(g.length/4),b=new Float32Array(x),y=new Float32Array(x),w=2;w<g.length;w+=4)b[Math.floor(w/4)]=g[w],y[Math.floor(w/4)]=g[w+1];return{real:b,imag:y}}(a),l=zt(c.real,c.imag).as1D();u=this.fftRadix2(u,i,o),l=this.fftRadix2(l,i,o);var h=function(g,x){for(var b=new Float32Array(g/2),y=new Float32Array(g/2),w=0;w<Math.ceil(g/2);w++){var C=(x?2:-2)*Math.PI*(w/g);b[w]=Math.cos(C),y[w]=Math.sin(C)}return{real:b,imag:y}}(n,o),f=zt(h.real,h.imag).mul(l),p=u.add(f),d=u.sub(f),m=fe(p).concat(fe(d)),v=ke(p).concat(ke(d));return zt(m,v).as1D()},e.prototype.fourierTransformByMatmul=function(t,n,o){for(var a=new Float32Array(2*n),i=0;i<n;i++){for(var s=0,u=0,c=0;c<n;c++){var l=Bh(i*c,n,o),h=Ui(t,c);s+=h.real*l.real-h.imag*l.imag,u+=h.real*l.imag+h.imag*l.real}o&&(s/=n,u/=n),Oh(a,s,u,i)}return a},e.prototype.depthToSpace=function(t,n,o){E(o==="NHWC",function(){return"Only NHWC dataFormat supported on CPU for depthToSpace. Got "+o}),E(n>1,function(){return"blockSize should be > 1 for depthToSpace, but was: "+n});for(var a=t.shape[0],i=t.shape[1],s=t.shape[2],u=t.shape[3],c=i*n,l=s*n,h=u/(n*n),f=this.readSync(t.dataId),p=new Float32Array(a*c*l*h),d=0,m=0;m<a;++m)for(var v=0;v<c;++v)for(var g=Math.floor(v/n),x=v%n,b=0;b<l;++b)for(var y=Math.floor(b/n),w=(x*n+b%n)*h,C=0;C<h;++C){var k=C+w+u*(y+s*(g+i*m));p[d++]=f[k]}return Jt(p,[a,c,l,h])},e.prototype.broadcastedBinaryOp=function(t,n,o,a){var i=lt(t.shape,n.shape),s=ot(i,o),u=this.readSync(t.dataId),c=this.readSync(n.dataId),l=Ze(t.shape,i),h=Ze(n.shape,i),f=s.values;if(l.length+h.length===0)for(var p=0;p<f.length;++p)f[p]=a(u[p%u.length],c[p%c.length]);else{var d=this.bufferSync(t),m=this.bufferSync(n),v=function(g){var x=s.indexToLoc(g),b=x.slice(-t.rank);l.forEach(function(k){return b[k]=0});var y=d.locToIndex(b),w=x.slice(-n.rank);h.forEach(function(k){return w[k]=0});var C=m.locToIndex(w);f[g]=a(u[y],c[C])};for(p=0;p<f.length;++p)v(p)}return s.toTensor()},e.prototype.broadcastedBinaryComplexOp=function(t,n,o){var a=lt(t.shape,n.shape),i=ot(a,"float32"),s=ot(a,"float32"),u=this.readSync(t.dataId),c=this.readSync(n.dataId),l=Ze(t.shape,a),h=Ze(n.shape,a),f=i.values,p=s.values;if(l.length+h.length===0)for(var d=0;d<f.length;d++){var m=d%u.length,v=d%c.length,g=o(u[2*m],u[2*m+1],c[2*v],c[2*v+1]);f[d]=g.real,p[d]=g.imag}else{var x=this.bufferSync(this.data.get(t.dataId).complexTensors.real),b=this.bufferSync(this.data.get(n.dataId).complexTensors.real),y=function(w){var C=i.indexToLoc(w),k=C.slice(-t.rank);l.forEach(function(A){return k[A]=0});var S=x.locToIndex(k),R=C.slice(-n.rank);h.forEach(function(A){return R[A]=0});var I=b.locToIndex(R),N=o(u[2*S],u[2*S+1],c[2*I],c[2*I+1]);f[w]=N.real,p[w]=N.imag};for(d=0;d<f.length;d++)y(d)}return this.complex(i.toTensor(),s.toTensor())},e.prototype.split=function(t,n,o){return cu(t,n,o)},e.prototype.dispose=function(){},e.prototype.floatPrecision=function(){return 32},e.prototype.epsilon=function(){return 1e-7},e.prototype.cropAndResize=function(t,n,o,a,i,s){for(var u=t.shape,c=u[0],l=u[1],h=u[2],f=u[3],p=n.shape[0],d=a[0],m=a[1],v=ot([p,d,m,f],"float32"),g=this.readSync(n.dataId),x=this.readSync(o.dataId),b=this.readSync(t.dataId),y=t.strides,w=v.strides,C=0;C<p;C++){var k=4*C,S=g[k],R=g[k+1],I=g[k+2],N=g[k+3],A=x[C];if(!(A>=c))for(var L=d>1?(I-S)*(l-1)/(d-1):0,O=m>1?(N-R)*(h-1)/(m-1):0,B=0;B<d;B++){var z=d>1?S*(l-1)+B*L:.5*(S+I)*(l-1);if(z<0||z>l-1)for(var U=0;U<m;U++)for(var W=0;W<f;W++){var G=W+U*w[2]+B*w[1]+C*w[0];v.values[G]=s}else if(i==="bilinear"){var H=Math.floor(z),j=Math.ceil(z),tt=z-H;for(U=0;U<m;U++)if((ft=m>1?R*(h-1)+U*O:.5*(R+N)*(h-1))<0||ft>h-1)for(W=0;W<f;W++)G=W+U*w[2]+B*w[1]+C*w[0],v.values[G]=s;else{var et=Math.floor(ft),it=Math.ceil(ft),st=ft-et;for(W=0;W<f;W++){var ct=b[G=W+et*y[2]+H*y[1]+A*y[0]],pt=b[G=W+it*y[2]+H*y[1]+A*y[0]],ht=b[G=W+et*y[2]+j*y[1]+A*y[0]],dt=ct+(pt-ct)*st,At=ht+(b[G=W+it*y[2]+j*y[1]+A*y[0]]-ht)*st;G=W+U*w[2]+B*w[1]+C*w[0],v.values[G]=dt+(At-dt)*tt}}}else for(U=0;U<m;++U){var ft;if((ft=m>1?R*(h-1)+U*O:.5*(R+N)*(h-1))<0||ft>h-1)for(W=0;W<f;W++)G=W+U*w[2]+B*w[1]+C*w[0],v.values[G]=s;else{var xt=Math.round(ft),mt=Math.round(z);for(W=0;W<f;W++){var kt=W+xt*y[2]+mt*y[1]+A*y[0],Ct=W+U*w[2]+B*w[1]+C*w[0];v.values[Ct]=b[kt]}}}}}return v.toTensor()},e.prototype.sparseToDense=function(t,n,o,a){var i=Xr(0,t,o),s=i.sliceRank,u=i.numUpdates,c=i.sliceSize,l=i.strides,h=i.outputSize;return this.scatter(t,n,o,h,c,u,s,l,a,!1)},e.prototype.gatherND=function(t,n){var o=n.shape,a=o[o.length-1],i=Zs(t,n),s=i[0],u=i[1],c=i[2],l=i[3];if(u===0)return Gt([],s,t.dtype);for(var h=new or([u,c],t.dtype),f=this.readSync(n.dataId),p=this.readSync(t.dataId),d=0;d<u;d++){for(var m=[],v=0,g=0;g<a;g++){var x=f[d*a+g];v+=x*l[g],m.push(x)}if(v<0||v>=t.size/c)throw new Error("Invalid indices: "+m+" does not index into "+t.shape);for(var b=0;b<c;b++)h.values[d*c+b]=p[v*c+b]}return h.toTensor().reshape(s)},e.prototype.scatterND=function(t,n,o){var a=Xr(0,t,o),i=a.sliceRank,s=a.numUpdates,u=a.sliceSize,c=a.strides,l=a.outputSize,h=q(0);return this.scatter(t,n,o,l,u,s,i,c,h,!0)},e.prototype.fill=function(t,n,o){var a=Lr(o=o||fr(n),$(t));return a.fill(n),T.makeTensor(a,t,o,this)},e.prototype.onesLike=function(t){if(t.dtype==="string")throw new Error("onesLike is not supported for string tensors");return this.fill(t.shape,1,t.dtype)},e.prototype.zerosLike=function(t){var n=Lr(t.dtype,$(t.shape));return this.makeOutput(n,t.shape,t.dtype)},e.prototype.linspace=function(t,n,o){return su(t,n,o)},e.prototype.scatter=function(t,n,o,a,i,s,u,c,l,h){var f=[a/i,i],p=this.readSync(t.dataId),d=this.readSync(n.dataId);if(a===0)return Gt([],o,n.dtype);var m=new or(f,n.dtype);m.values.fill(this.readSync(l.dataId)[0]);for(var v=0;v<s;v++){for(var g=[],x=0,b=0;b<u;b++){var y=p[v*u+b];g.push(y),x+=y*c[b]}if(x<0||x>=a/i)throw new Error("Invalid indices: "+g+" does not index into "+o);for(var w=0;w<i;w++)h?m.values[x*i+w]+=d[v*i+w]:m.values[x*i+w]=n.rank===0?d[0]:d[v*i+w]}return m.toTensor().reshape(o)},e}(ou);T.registerBackend("cpu",function(){return new om},1);for(var Ko=0,us=[{kernelName:"NonMaxSuppressionV5",backendName:"cpu",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=r.attrs,o=e,a=o.boxes,i=o.scores,s=n,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,f=t;V(a,"NonMaxSuppressionWithScore");var p=Pa(f.data.get(a.dataId).values,f.data.get(i.dataId).values,u,c,l,h);return[p.selectedIndices,p.selectedScores]}},{kernelName:"Square",backendName:"cpu",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=e.x,o=t;V(n,"square");for(var a=o.data.get(n.dataId).values,i=new Float32Array(a.length),s=0;s<a.length;++s){var u=a[s];i[s]=u*u}return{dataId:o.write(i,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}},{kernelName:sr,backendName:"cpu",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=e,o=n.a,a=n.b,i=t;V([o,a],sr);var s=i.data.get(o.dataId).values,u=i.data.get(a.dataId).values,c=function(f,p,d,m,v,g){var x=lt(f,p),b=x.length,y=Ae(x),w=rr(v,$(x)),C=f.length,k=p.length,S=Ae(f),R=Ae(p),I=Ze(f,x),N=Ze(p,x);if(I.length+N.length===0)for(var A=0;A<w.length;++A)w[A]=g(d[A%d.length],m[A%m.length]);else{var L=function(O){var B=pl(O,b,y),z=B.slice(-C);I.forEach(function(H){return z[H]=0});var U=Ti(z,C,S),W=B.slice(-k);N.forEach(function(H){return W[H]=0});var G=Ti(W,k,R);w[O]=g(d[U],m[G])};for(A=0;A<w.length;++A)L(A)}return[w,x]}(o.shape,a.shape,s,u,o.dtype,function(f,p){var d=f-p;return d*d}),l=c[0],h=c[1];return{dataId:i.write(l,h,o.dtype),shape:h,dtype:o.dtype}}}];Ko<us.length;Ko++)Ns(us[Ko]);var Dn,am=function(r){this.variableNames=["A"];var e=jt(),t=r[0],n=r[1];this.outputShape=r,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(`+n+".0, "+t+`.0);

        vec4 values = `+e.texture2D+`(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `},im=function(r){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;var e=jt(),t=r[0],n=r[1];this.outputShape=r,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(`+n+".0, "+t+`.0);
            vec4 values = `+e.texture2D+`(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        `+e.output+` = result;
      }
    `};for(var Xo=0,cs=[{kernelName:"FromPixels",backendName:"webgl",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=r.attrs,o=e.pixels,a=n.numChannels,i=typeof HTMLVideoElement<"u"&&o instanceof HTMLVideoElement,s=typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement,u=i?[o.videoWidth,o.videoHeight]:[o.width,o.height],c=u[0],l=u[1],h=[l,c],f=[l,c,a];(s||i)&&(Dn==null&&(Dn=document.createElement("canvas").getContext("2d")),Dn.canvas.width=c,Dn.canvas.height=l,Dn.drawImage(o,0,0,c,l),o=Dn.canvas);var p=t.makeTensorInfo(h,"int32");t.texData.get(p.dataId).usage=ie.PIXELS,t.gpgpu.uploadPixelDataToTexture(t.getTexture(p.dataId),o);var d=M().getBool("WEBGL_PACK")?new im(f):new am(f),m=t.runWebGLProgram(d,[p],"int32");return t.disposeData(p.dataId),m}},{kernelName:"NonMaxSuppressionV5",backendName:"webgl",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=r.attrs;Vr("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");var o=e,a=o.boxes,i=o.scores,s=n,u=s.maxOutputSize,c=s.iouThreshold,l=s.scoreThreshold,h=s.softNmsSigma,f=t,p=Pa(f.readSync(a.dataId),f.readSync(i.dataId),u,c,l,h);return[p.selectedIndices,p.selectedScores]}},{kernelName:"Square",backendName:"webgl",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=e.x,o=t,a=new at(n.shape,"return x * x;");return o.runWebGLProgram(a,[n],n.dtype)}},{kernelName:sr,backendName:"webgl",kernelFunc:function(r){var e=r.inputs,t=r.backend,n=e,o=n.a,a=n.b,i=t,s=M().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new ze("return (a - b) * (a - b);",o.shape,a.shape):new St("return (a - b) * (a - b);",o.shape,a.shape);return i.compileAndRun(s,[o,a])}}];Xo<cs.length;Xo++)Ns(cs[Xo]);for(var Yo=0,ls=[{kernelName:"Square",gradFunc:function(r,e){var t=e[0];return{x:function(){return r.mul(t.toFloat().mul(2))}}}},{kernelName:sr,gradFunc:function(r,e){var t=e[0],n=e[1],o=q(2);return{a:function(){return Xt(r,Xt(o,Ot(t,n)))},b:function(){return Xt(r,Xt(o,Ot(n,t)))}}}}];Yo<ls.length;Yo++)nl(ls[Yo]);var sm=function(){function r(){}return r.prototype.fetch=function(e,t){return fetch(e,t)},r.prototype.now=function(){return performance.now()},r.prototype.encode=function(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error("Browser's encoder only supports utf-8, but got "+t);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)},r.prototype.decode=function(e,t){return new TextDecoder(t).decode(e)},r}();M().get("IS_BROWSER")&&M().setPlatform("browser",new sm);var $o,um=function(){return require("node-fetch")},cm=function(){function r(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}return r.prototype.fetch=function(e,t){return M().global.fetch!=null?M().global.fetch(e,t):($o==null&&($o=um()),$o(e,t))},r.prototype.now=function(){var e=process.hrtime();return 1e3*e[0]+e[1]/1e6},r.prototype.encode=function(e,t){if(t!=="utf-8"&&t!=="utf8")throw new Error("Node built-in encoder only supports utf-8, but got "+t);return this.textEncoder.encode(e)},r.prototype.decode=function(e,t){return e.length===0?"":new this.util.TextDecoder(t).decode(e)},r}();M().get("IS_NODE")&&M().setPlatform("node",new cm);var ga={float32:4,int32:4,uint16:2,uint8:1,bool:1},eo=4;function ec(r,e){for(var t={},n=0,o=function(s){var u=s.name,c=s.dtype,l=s.shape,h=$(l),f=void 0;if("quantization"in s){var p=s.quantization;if(p.dtype!=="uint8"&&p.dtype!=="uint16")throw new Error("Weight "+s.name+" has unknown quantization dtype "+p.dtype+". Supported quantization dtypes are: 'uint8' and 'uint16'.");var d=ga[p.dtype],m=r.slice(n,n+h*d),v=p.dtype==="uint8"?new Uint8Array(m):new Uint16Array(m);if(c==="float32")f=Float32Array.from(v,function(C){return C*p.scale+p.min});else{if(c!=="int32")throw new Error("Unsupported dtype in weight '"+u+"': "+c);f=Int32Array.from(v,function(C){return Math.round(C*p.scale+p.min)})}n+=h*d}else if(c==="string"){var g=$(s.shape);f=[];for(var x=0;x<g;x++){var b=new Uint32Array(r.slice(n,n+eo))[0];n+=eo;var y=new Uint8Array(r.slice(n,n+b));f.push(y),n+=b}}else{var w=ga[c];if(m=r.slice(n,n+h*w),c==="float32")f=new Float32Array(m);else if(c==="int32")f=new Int32Array(m);else{if(c!=="bool")throw new Error("Unsupported dtype in weight '"+u+"': "+c);f=new Uint8Array(m)}n+=h*w}t[u]=Gt(f,l,c)},a=0,i=e;a<i.length;a++)o(i[a]);return t}function lm(r){if(r===null)throw new Error("Invalid input value: "+JSON.stringify(r));var e=0,t=[];r.forEach(function(a){if(e+=a.byteLength,t.push(a.byteLength===a.buffer.byteLength?a:new a.constructor(a)),!(a instanceof Float32Array||a instanceof Int32Array||a instanceof Uint8Array))throw new Error("Unsupported TypedArray subtype: "+a.constructor.name)});var n=new Uint8Array(e),o=0;return t.forEach(function(a){n.set(new Uint8Array(a.buffer),o),o+=a.byteLength}),n.buffer}var ya=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function hs(r){return ya?Buffer.byteLength(r):new Blob([r]).size}function Za(r){var e=0;r.forEach(function(o){e+=o.byteLength});var t=new Uint8Array(e),n=0;return r.forEach(function(o){t.set(new Uint8Array(o),n),n+=o.byteLength}),t.buffer}function fs(r){for(r=r.trim();r.endsWith("/");)r=r.slice(0,r.length-1);var e=r.split("/");return e[e.length-1]}function xr(r){if(r.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:r.modelTopology==null?0:hs(JSON.stringify(r.modelTopology)),weightSpecsBytes:r.weightSpecs==null?0:hs(JSON.stringify(r.weightSpecs)),weightDataBytes:r.weightData==null?0:r.weightData.byteLength}}var se=function(){function r(){this.saveRouters=[],this.loadRouters=[]}return r.getInstance=function(){return r.instance==null&&(r.instance=new r),r.instance},r.registerSaveRouter=function(e){r.getInstance().saveRouters.push(e)},r.registerLoadRouter=function(e){r.getInstance().loadRouters.push(e)},r.getSaveHandlers=function(e){return r.getHandlers(e,"save")},r.getLoadHandlers=function(e,t){return r.getHandlers(e,"load",t)},r.getHandlers=function(e,t,n){var o=[];return(t==="load"?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach(function(a){var i=a(e,n);i!==null&&o.push(i)}),o},r}(),Wn="://",rn=function(){function r(){this.managers={}}return r.getInstance=function(){return r.instance==null&&(r.instance=new r),r.instance},r.registerManager=function(e,t){E(e!=null,function(){return"scheme must not be undefined or null."}),e.endsWith(Wn)&&(e=e.slice(0,e.indexOf(Wn))),E(e.length>0,function(){return"scheme must not be an empty string."});var n=r.getInstance();E(n.managers[e]==null,function(){return"A model store manager is already registered for scheme '"+e+"'."}),n.managers[e]=t},r.getManager=function(e){var t=this.getInstance().managers[e];if(t==null)throw new Error("Cannot find model manager for scheme '"+e+"'");return t},r.getSchemes=function(){return Object.keys(this.getInstance().managers)},r}();function Or(r){if(r.indexOf(Wn)===-1)throw new Error("The url string provided does not contain a scheme. Supported schemes are: "+rn.getSchemes().join(","));return{scheme:r.split(Wn)[0],path:r.split(Wn)[1]}}function ps(r,e,t){return t===void 0&&(t=!1),X(this,void 0,void 0,function(){var n,o,a,i,s,u,c,l,h;return Y(this,function(f){switch(f.label){case 0:return E(r!==e,function(){return"Old path and new path are the same: '"+r+"'"}),E((n=se.getLoadHandlers(r)).length>0,function(){return"Copying failed because no load handler is found for source URL "+r+"."}),E(n.length<2,function(){return"Copying failed because more than one ("+n.length+") load handlers for source URL "+r+"."}),o=n[0],E((a=se.getSaveHandlers(e)).length>0,function(){return"Copying failed because no save handler is found for destination URL "+e+"."}),E(a.length<2,function(){return"Copying failed because more than one ("+n.length+") save handlers for destination URL "+e+"."}),i=a[0],s=Or(r).scheme,u=Or(r).path,c=s===Or(r).scheme,[4,o.load()];case 1:return l=f.sent(),t&&c?[4,rn.getManager(s).removeModel(u)]:[3,3];case 2:f.sent(),f.label=3;case 3:return[4,i.save(l)];case 4:return h=f.sent(),!t||c?[3,6]:[4,rn.getManager(s).removeModel(u)];case 5:f.sent(),f.label=6;case 6:return[2,h.modelArtifactsInfo]}})})}var mn="models_store",tn="model_info_store";function nc(){if(!M().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");var r=window||self,e=r.indexedDB||r.mozIndexedDB||r.webkitIndexedDB||r.msIndexedDB||r.shimIndexedDB;if(e==null)throw new Error("The current browser does not appear to support IndexedDB.");return e}function xa(r){var e=r.result;e.createObjectStore(mn,{keyPath:"modelPath"}),e.createObjectStore(tn,{keyPath:"modelPath"})}var Un=function(){function r(e){if(this.indexedDB=nc(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}return r.prototype.save=function(e){return X(this,void 0,void 0,function(){return Y(this,function(t){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return[2,this.databaseAction(this.modelPath,e)]})})},r.prototype.load=function(){return X(this,void 0,void 0,function(){return Y(this,function(e){return[2,this.databaseAction(this.modelPath)]})})},r.prototype.databaseAction=function(e,t){var n=this;return new Promise(function(o,a){var i=n.indexedDB.open("tensorflowjs",1);i.onupgradeneeded=function(){return xa(i)},i.onsuccess=function(){var s=i.result;if(t==null){var u=s.transaction(mn,"readonly"),c=u.objectStore(mn).get(n.modelPath);c.onsuccess=function(){if(c.result==null)return s.close(),a(new Error("Cannot find model with path '"+n.modelPath+"' in IndexedDB."));o(c.result.modelArtifacts)},c.onerror=function(m){return s.close(),a(c.error)},u.oncomplete=function(){return s.close()}}else{var l,h=xr(t),f=s.transaction(tn,"readwrite"),p=f.objectStore(tn),d=p.put({modelPath:n.modelPath,modelArtifactsInfo:h});d.onsuccess=function(){var m=(l=s.transaction(mn,"readwrite")).objectStore(mn).put({modelPath:n.modelPath,modelArtifacts:t,modelArtifactsInfo:h});m.onsuccess=function(){return o({modelArtifactsInfo:h})},m.onerror=function(v){var g=(p=f.objectStore(tn)).delete(n.modelPath);g.onsuccess=function(){return s.close(),a(m.error)},g.onerror=function(x){return s.close(),a(m.error)}}},d.onerror=function(m){return s.close(),a(d.error)},f.oncomplete=function(){l==null?s.close():l.oncomplete=function(){return s.close()}}}},i.onerror=function(s){return a(i.error)}})},r.URL_SCHEME="indexeddb://",r}(),ds=function(r){return M().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Un.URL_SCHEME)?(e=r.slice(Un.URL_SCHEME.length),new Un(e)):null;var e};se.registerSaveRouter(ds),se.registerLoadRouter(ds);var hm=function(){function r(){this.indexedDB=nc()}return r.prototype.listModels=function(){return X(this,void 0,void 0,function(){var e=this;return Y(this,function(t){return[2,new Promise(function(n,o){var a=e.indexedDB.open("tensorflowjs",1);a.onupgradeneeded=function(){return xa(a)},a.onsuccess=function(){var i=a.result,s=i.transaction(tn,"readonly"),u=s.objectStore(tn).getAll();u.onsuccess=function(){for(var c={},l=0,h=u.result;l<h.length;l++){var f=h[l];c[f.modelPath]=f.modelArtifactsInfo}n(c)},u.onerror=function(c){return i.close(),o(u.error)},s.oncomplete=function(){return i.close()}},a.onerror=function(i){return o(a.error)}})]})})},r.prototype.removeModel=function(e){return X(this,void 0,void 0,function(){var t=this;return Y(this,function(n){var o;return e=(o=e).startsWith(Un.URL_SCHEME)?o.slice(Un.URL_SCHEME.length):o,[2,new Promise(function(a,i){var s=t.indexedDB.open("tensorflowjs",1);s.onupgradeneeded=function(){return xa(s)},s.onsuccess=function(){var u,c=s.result,l=c.transaction(tn,"readwrite"),h=l.objectStore(tn),f=h.get(e);f.onsuccess=function(){if(f.result==null)return c.close(),i(new Error("Cannot find model with path '"+e+"' in IndexedDB."));var p=h.delete(e),d=function(){var m=(u=c.transaction(mn,"readwrite")).objectStore(mn).delete(e);m.onsuccess=function(){return a(f.result.modelArtifactsInfo)},m.onerror=function(v){return i(f.error)}};p.onsuccess=d,p.onerror=function(m){return d(),c.close(),i(f.error)}},f.onerror=function(p){return c.close(),i(f.error)},l.oncomplete=function(){u==null?c.close():u.oncomplete=function(){return c.close()}}},s.onerror=function(u){return i(s.error)}})]})})},r}();if(M().getBool("IS_BROWSER"))try{rn.registerManager(Un.URL_SCHEME,new hm)}catch{}var Ve="/",Mn="tensorflowjs_models",rc="info",fm="model_topology",pm="weight_specs",dm="weight_data",vm="model_metadata";function oc(r){return{info:[Mn,r,rc].join(Ve),topology:[Mn,r,fm].join(Ve),weightSpecs:[Mn,r,pm].join(Ve),weightData:[Mn,r,dm].join(Ve),modelMetadata:[Mn,r,vm].join(Ve)}}function mm(r){var e=r.split(Ve);if(e.length<3)throw new Error("Invalid key format: "+r);return e.slice(1,e.length-1).join(Ve)}var zn=function(){function r(e){if(!M().getBool("IS_BROWSER")||typeof window>"u"||window.localStorage===void 0)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=oc(this.modelPath)}return r.prototype.save=function(e){return X(this,void 0,void 0,function(){var t,n,o;return Y(this,function(a){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");t=JSON.stringify(e.modelTopology),n=JSON.stringify(e.weightSpecs),o=xr(e);try{return this.LS.setItem(this.keys.info,JSON.stringify(o)),this.LS.setItem(this.keys.topology,t),this.LS.setItem(this.keys.weightSpecs,n),this.LS.setItem(this.keys.weightData,function(i){if(ya)return Buffer.from(i).toString("base64");for(var s=new Uint8Array(i),u="",c=0,l=s.length;c<l;c++)u+=String.fromCharCode(s[c]);return btoa(u)}(e.weightData)),this.LS.setItem(this.keys.modelMetadata,JSON.stringify({format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,userDefinedMetadata:e.userDefinedMetadata})),[2,{modelArtifactsInfo:o}]}catch{throw this.LS.removeItem(this.keys.info),this.LS.removeItem(this.keys.topology),this.LS.removeItem(this.keys.weightSpecs),this.LS.removeItem(this.keys.weightData),this.LS.removeItem(this.keys.modelMetadata),new Error("Failed to save model '"+this.modelPath+"' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes="+o.modelTopologyBytes+", weightSpecsBytes="+o.weightSpecsBytes+", weightDataBytes="+o.weightDataBytes+".")}return[2]})})},r.prototype.load=function(){return X(this,void 0,void 0,function(){var e,t,n,o,a,i,s;return Y(this,function(u){if((e=JSON.parse(this.LS.getItem(this.keys.info)))==null)throw new Error("In local storage, there is no model with name '"+this.modelPath+"'");if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");if(t={},(n=JSON.parse(this.LS.getItem(this.keys.topology)))==null)throw new Error("In local storage, the topology of model '"+this.modelPath+"' is missing.");if(t.modelTopology=n,(o=JSON.parse(this.LS.getItem(this.keys.weightSpecs)))==null)throw new Error("In local storage, the weight specs of model '"+this.modelPath+"' are missing.");if(t.weightSpecs=o,(a=this.LS.getItem(this.keys.modelMetadata))!=null&&(i=JSON.parse(a),t.format=i.format,t.generatedBy=i.generatedBy,t.convertedBy=i.convertedBy,t.userDefinedMetadata=i.userDefinedMetadata),(s=this.LS.getItem(this.keys.weightData))==null)throw new Error("In local storage, the binary weight values of model '"+this.modelPath+"' are missing.");return t.weightData=function(c){if(ya){var l=Buffer.from(c,"base64");return l.buffer.slice(l.byteOffset,l.byteOffset+l.byteLength)}for(var h=atob(c),f=new Uint8Array(h.length),p=0;p<h.length;++p)f.set([h.charCodeAt(p)],p);return f.buffer}(s),[2,t]})})},r.URL_SCHEME="localstorage://",r}(),vs=function(r){return M().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(zn.URL_SCHEME)?(e=r.slice(zn.URL_SCHEME.length),new zn(e)):null;var e};se.registerSaveRouter(vs),se.registerLoadRouter(vs);var gm=function(){function r(){E(M().getBool("IS_BROWSER"),function(){return"Current environment is not a web browser"}),E(typeof window>"u"||window.localStorage!==void 0,function(){return"Current browser does not appear to support localStorage"}),this.LS=window.localStorage}return r.prototype.listModels=function(){return X(this,void 0,void 0,function(){var e,t,n,o,a,i;return Y(this,function(s){for(e={},t=Mn+Ve,n=Ve+rc,o=0;o<this.LS.length;++o)(a=this.LS.key(o)).startsWith(t)&&a.endsWith(n)&&(i=mm(a),e[i]=JSON.parse(this.LS.getItem(a)));return[2,e]})})},r.prototype.removeModel=function(e){return X(this,void 0,void 0,function(){var t,n;return Y(this,function(o){var a;if(e=(a=e).startsWith(zn.URL_SCHEME)?a.slice(zn.URL_SCHEME.length):a,t=oc(e),this.LS.getItem(t.info)==null)throw new Error("Cannot find model at path '"+e+"'");return n=JSON.parse(this.LS.getItem(t.info)),this.LS.removeItem(t.info),this.LS.removeItem(t.topology),this.LS.removeItem(t.weightSpecs),this.LS.removeItem(t.weightData),[2,n]})})},r}();if(M().getBool("IS_BROWSER"))try{rn.registerManager(zn.URL_SCHEME,new gm)}catch{}var ym="model",xm=".json",bm=".weights.bin";function ms(r){return new Promise(function(e){return setTimeout(e)}).then(r)}var Jo=function(){function r(e){if(!M().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(r.URL_SCHEME)&&(e=e.slice(r.URL_SCHEME.length)),e!=null&&e.length!==0||(e=ym),this.modelTopologyFileName=e+xm,this.weightDataFileName=e+bm}return r.prototype.save=function(e){return X(this,void 0,void 0,function(){var t,n,o,a,i,s;return Y(this,function(u){switch(u.label){case 0:if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");if(t=window.URL.createObjectURL(new Blob([e.weightData],{type:"application/octet-stream"})),!(e.modelTopology instanceof ArrayBuffer))return[3,1];throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");case 1:return n=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],o={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:n},a=window.URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"})),(i=this.jsonAnchor==null?document.createElement("a"):this.jsonAnchor).download=this.modelTopologyFileName,i.href=a,[4,ms(function(){return i.dispatchEvent(new MouseEvent("click"))})];case 2:return u.sent(),e.weightData==null?[3,4]:((s=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor).download=this.weightDataFileName,s.href=t,[4,ms(function(){return s.dispatchEvent(new MouseEvent("click"))})]);case 3:u.sent(),u.label=4;case 4:return[2,{modelArtifactsInfo:xr(e)}]}})})},r.URL_SCHEME="downloads://",r}(),wm=function(){function r(e){if(e==null||e.length<1)throw new Error("When calling browserFiles, at least 1 file is required, but received "+e);this.files=e}return r.prototype.load=function(){return X(this,void 0,void 0,function(){var e,t,n=this;return Y(this,function(o){return e=this.files[0],t=this.files.slice(1),[2,new Promise(function(a,i){var s=new FileReader;s.onload=function(u){var c=JSON.parse(u.target.result),l=c.modelTopology;if(l!=null){t.length===0&&a({modelTopology:l});var h=c.weightsManifest;if(h!=null){var f;try{f=n.checkManifestAndWeightFiles(h,t)}catch(v){return void i(v)}var p=[],d=[],m=[];h.forEach(function(v){v.paths.forEach(function(g){d.push(g),m.push(null)}),p.push.apply(p,v.weights)}),h.forEach(function(v){v.paths.forEach(function(g){var x=new FileReader;x.onload=function(b){var y=b.target.result,w=d.indexOf(g);m[w]=y,m.indexOf(null)===-1&&a({modelTopology:l,weightSpecs:p,weightData:Za(m),format:c.format,generatedBy:c.generatedBy,convertedBy:c.convertedBy,userDefinedMetadata:c.userDefinedMetadata})},x.onerror=function(b){return i("Failed to weights data from file of path '"+g+"'.")},x.readAsArrayBuffer(f[g])})})}else i(new Error("weightManifest field is missing from file "+e.name))}else i(new Error("modelTopology field is missing from file "+e.name))},s.onerror=function(u){return i("Failed to read model topology and weights manifest JSON from file '"+e.name+"'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")},s.readAsText(e)})]})})},r.prototype.checkManifestAndWeightFiles=function(e,t){for(var n=[],o=t.map(function(u){return fs(u.name)}),a={},i=0,s=e;i<s.length;i++)s[i].paths.forEach(function(u){var c=fs(u);if(n.indexOf(c)!==-1)throw new Error("Duplicate file basename found in weights manifest: '"+c+"'");if(n.push(c),o.indexOf(c)===-1)throw new Error("Weight file with basename '"+c+"' is not provided.");a[u]=t[o.indexOf(c)]});if(n.length!==t.length)throw new Error("Mismatch in the number of files in weights manifest ("+n.length+") and the number of weight files provided ("+t.length+").");return a},r}();function gs(r,e,t,n){(function(a){E(a!=null&&Array.isArray(a)&&a.length>0,function(){return"promises must be a none empty array"})})(r),function(a,i){E(a>=0&&a<=1,function(){return"Progress fraction must be in range [0, 1], but got startFraction "+a}),E(i>=0&&i<=1,function(){return"Progress fraction must be in range [0, 1], but got endFraction "+i}),E(i>=a,function(){return"startFraction must be no more than endFraction, but got startFraction "+a+" and endFraction "+i})}(t=t??0,n=n??1);var o=0;return Promise.all(r.map(function(a){return a.then(function(i){var s=t+ ++o/r.length*(n-t);return e(s),i}),a}))}function ac(r,e){return X(this,void 0,void 0,function(){var t,n,o,a,i,s,u,c,l;return Y(this,function(h){switch(h.label){case 0:return e==null&&(e={}),t=e.fetchFunc==null?M().platform.fetch:e.fetchFunc,n=r.map(function(f){return t(f,e.requestInit,{isBinary:!0})}),o=0,a=.5,e.onProgress!=null?[3,2]:[4,Promise.all(n)];case 1:return i=h.sent(),[3,4];case 2:return[4,gs(n,e.onProgress,o,a)];case 3:i=h.sent(),h.label=4;case 4:return s=i.map(function(f){return f.arrayBuffer()}),u=.5,c=1,e.onProgress!=null?[3,6]:[4,Promise.all(s)];case 5:return l=h.sent(),[3,8];case 6:return[4,gs(s,e.onProgress,u,c)];case 7:l=h.sent(),h.label=8;case 8:return[2,l]}})})}function ys(r){var e=this;return function(t,n,o){return n===void 0&&(n=""),X(e,void 0,void 0,function(){var a,i,s,u,c,l,h,f,p,d;return Y(this,function(m){switch(m.label){case 0:if(a=t.map(function(){return!1}),i={},s=o!=null?o.map(function(){return!1}):[],u=[],t.forEach(function(v,g){var x=0;v.weights.forEach(function(b){var y="quantization"in b?b.quantization.dtype:b.dtype,w=ga[y]*$(b.shape),C=function(){a[g]=!0,i[g]==null&&(i[g]=[]),i[g].push({manifestEntry:b,groupOffset:x,sizeBytes:w})};o!=null?o.forEach(function(k,S){k===b.name&&(C(),s[S]=!0)}):C(),u.push(b.name),x+=w})}),!s.every(function(v){return v}))throw c=o.filter(function(v,g){return!s[g]}),new Error("Could not find weights in manifest with names: "+c.join(", ")+`. 
Manifest JSON has weights with names: `+u.join(", ")+".");return l=a.reduce(function(v,g,x){return g&&v.push(x),v},[]),h=[],l.forEach(function(v){t[v].paths.forEach(function(g){var x=n+(n.endsWith("/")?"":"/")+g;h.push(x)})}),[4,r(h)];case 1:return f=m.sent(),p={},d=0,l.forEach(function(v){for(var g=t[v].paths.length,x=0,b=0;b<g;b++)x+=f[d+b].byteLength;for(var y=new ArrayBuffer(x),w=new Uint8Array(y),C=0,k=0;k<g;k++){var S=new Uint8Array(f[d+k]);w.set(S,C),C+=S.byteLength}i[v].forEach(function(R){var I=ec(y.slice(R.groupOffset,R.groupOffset+R.sizeBytes),[R.manifestEntry]);for(var N in I)p[N]=I[N]}),d+=g}),[2,p]}})})}}se.registerSaveRouter(function(r){return M().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Jo.URL_SCHEME)?function(e){return e===void 0&&(e="model"),new Jo(e)}(r.slice(Jo.URL_SCHEME.length)):null});var ic=function(){function r(e,t){if(this.DEFAULT_METHOD="POST",t==null&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.onProgress=t.onProgress,t.fetchFunc!=null?(E(typeof t.fetchFunc=="function",function(){return"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"}),this.fetch=t.fetchFunc):this.fetch=M().platform.fetch,E(e!=null&&e.length>0,function(){return"URL path for http must not be null, undefined or empty."}),Array.isArray(e)&&E(e.length===2,function(){return"URL paths for http must have a length of 2, (actual length is "+e.length+")."}),this.path=e,t.requestInit!=null&&t.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{}}return r.prototype.save=function(e){return X(this,void 0,void 0,function(){var t,n,o,a;return Y(this,function(i){switch(i.label){case 0:if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");return(t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit)).body=new FormData,n=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],o={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,userDefinedMetadata:e.userDefinedMetadata,weightsManifest:n},t.body.append("model.json",new Blob([JSON.stringify(o)],{type:"application/json"}),"model.json"),e.weightData!=null&&t.body.append("model.weights.bin",new Blob([e.weightData],{type:"application/octet-stream"}),"model.weights.bin"),[4,this.fetch(this.path,t)];case 1:if((a=i.sent()).ok)return[2,{modelArtifactsInfo:xr(e),responses:[a]}];throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status "+a.status+".")}})})},r.prototype.load=function(){return X(this,void 0,void 0,function(){var e,t,n,o,a,i,s,u,c,l,h,f;return Y(this,function(p){switch(p.label){case 0:return[4,this.fetch(this.path,this.requestInit)];case 1:if(!(e=p.sent()).ok)throw new Error("Request to "+this.path+" failed with status code "+e.status+". Please verify this URL points to the model JSON of the model to load.");p.label=2;case 2:return p.trys.push([2,4,,5]),[4,e.json()];case 3:return t=p.sent(),[3,5];case 4:throw p.sent(),n="Failed to parse model JSON of response from "+this.path+".",this.path.endsWith(".pb")?n+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":n+=" Please make sure the server is serving valid JSON for this request.",new Error(n);case 5:if(o=t.modelTopology,a=t.weightsManifest,i=t.generatedBy,s=t.convertedBy,u=t.format,c=t.userDefinedMetadata,o==null&&a==null)throw new Error("The JSON from HTTP path "+this.path+" contains neither model topology or manifest for weights.");return a==null?[3,7]:[4,this.loadWeights(a)];case 6:f=p.sent(),l=f[0],h=f[1],p.label=7;case 7:return[2,{modelTopology:o,weightSpecs:l,weightData:h,userDefinedMetadata:c,generatedBy:i,convertedBy:s,format:u}]}})})},r.prototype.loadWeights=function(e){return X(this,void 0,void 0,function(){var t,n,o,a,i,s,u,c,l,h,f;return Y(this,function(p){switch(p.label){case 0:for(t=Array.isArray(this.path)?this.path[1]:this.path,n=function(d){var m=d.lastIndexOf("/"),v=d.lastIndexOf("?"),g=d.substring(0,m),x=v>m?d.substring(v):"";return[g+"/",x]}(t),o=n[0],a=n[1],i=this.weightPathPrefix||o,s=[],u=0,c=e;u<c.length;u++)l=c[u],s.push.apply(s,l.weights);return h=[],e.forEach(function(d){d.paths.forEach(function(m){h.push(i+m+a)})}),[4,ac(h,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress})];case 1:return f=p.sent(),[2,[s,Za(f)]]}})})},r.URL_SCHEME_REGEX=/^https?:\/\//,r}();function ba(r){return r.match(ic.URL_SCHEME_REGEX)!=null}var xs=function(r,e){return typeof fetch>"u"?null:(Array.isArray(r)?r.every(function(t){return ba(t)}):ba(r))?wa(r,{onProgress:e}):null};function wa(r,e){return new ic(r,e)}se.registerSaveRouter(xs),se.registerLoadRouter(xs);var Qo=function(){function r(e){this.modelArtifacts=e}return r.prototype.load=function(){return X(this,void 0,void 0,function(){return Y(this,function(e){return[2,this.modelArtifacts]})})},r}(),Cm=function(){function r(e){this.saveHandler=e}return r.prototype.save=function(e){return X(this,void 0,void 0,function(){return Y(this,function(t){return[2,this.saveHandler(e)]})})},r}(),sc=Object.freeze({browserFiles:function(r){return new wm(r)},browserHTTPRequest:function(r,e){return wa(r,e)},concatenateArrayBuffers:Za,decodeWeights:ec,encodeWeights:function(r,e){return X(this,void 0,void 0,function(){var t,n,o,a,i,s=this;return Y(this,function(u){switch(u.label){case 0:for(t=[],n=[],o=Array.isArray(r)?r.map(function(c){return c.name}):Object.keys(r),a=function(c){var l=o[c],h=Array.isArray(r)?r[c].tensor:r[l];if(h.dtype!=="float32"&&h.dtype!=="int32"&&h.dtype!=="bool"&&h.dtype!=="string")throw new Error("Unsupported dtype in weight '"+l+"': "+h.dtype);var f={name:l,shape:h.shape,dtype:h.dtype};if(h.dtype==="string"){var p=new Promise(function(d){return X(s,void 0,void 0,function(){var m,v,g,x,b,y,w;return Y(this,function(C){switch(C.label){case 0:return[4,h.bytes()];case 1:for(m=C.sent(),v=m.reduce(function(k,S){return k+S.length},0)+eo*m.length,g=new Uint8Array(v),x=0,b=0;b<m.length;b++)y=m[b],w=new Uint8Array(new Uint32Array([y.length]).buffer),g.set(w,x),x+=eo,g.set(y,x),x+=y.length;return d(g),[2]}})})});n.push(p)}else n.push(h.data());e!=null&&(f.group=e),t.push(f)},i=0;i<o.length;++i)a(i);return[4,Promise.all(n)];case 1:return[2,{data:lm(u.sent()),specs:t}]}})})},fromMemory:function(r,e,t,n){return arguments.length===1?r.modelTopology!=null||r.weightSpecs!=null?new Qo(r):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Qo({modelTopology:r})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Qo({modelTopology:r,weightSpecs:e,weightData:t,trainingConfig:n}))},getLoadHandlers:function(r,e){return se.getLoadHandlers(r,e)},getModelArtifactsInfoForJSON:xr,getSaveHandlers:function(r){return se.getSaveHandlers(r)},http:wa,isHTTPScheme:ba,loadWeights:function(r,e,t,n){return e===void 0&&(e=""),X(this,void 0,void 0,function(){return Y(this,function(o){return[2,ys(function(a){return ac(a,{requestInit:n})})(r,e,t)]})})},registerLoadRouter:function(r){return se.registerLoadRouter(r)},registerSaveRouter:function(r){return se.registerSaveRouter(r)},weightsLoaderFactory:ys,withSaveHandler:function(r){return new Cm(r)},copyModel:function(r,e){return X(this,void 0,void 0,function(){return Y(this,function(t){return[2,ps(r,e,!1)]})})},listModels:function(){return X(this,void 0,void 0,function(){var r,e,t,n,o,a,i;return Y(this,function(s){switch(s.label){case 0:r=rn.getSchemes(),e={},t=0,n=r,s.label=1;case 1:return t<n.length?(o=n[t],[4,rn.getManager(o).listModels()]):[3,4];case 2:for(i in a=s.sent())e[o+Wn+i]=a[i];s.label=3;case 3:return t++,[3,1];case 4:return[2,e]}})})},moveModel:function(r,e){return X(this,void 0,void 0,function(){return Y(this,function(t){return[2,ps(r,e,!0)]})})},removeModel:function(r){return X(this,void 0,void 0,function(){var e;return Y(this,function(t){return e=Or(r),[2,rn.getManager(e.scheme).removeModel(e.path)]})})}}),An;D({confusionMatrix_:function(r,e,t){var n=_(r,"labels","confusionMatrix"),o=_(e,"predictions","confusionMatrix");E(t==null||t>0&&Number.isInteger(t),function(){return"If provided, numClasses must be a positive integer, but got "+t}),E(n.rank===1,function(){return"Expected the rank of labels to be 1, but got "+n.rank}),E(o.rank===1,function(){return"Expected the rank of predictions to be 1, but got "+o.rank}),E(n.shape[0]===o.shape[0],function(){return"Mismatch in the number of examples: "+n.shape[0]+" vs. "+o.shape[0]+". Labels and predictions should have the same number of elements."}),E(t>0&&Number.isInteger(t),function(){return"numClasses is required to be a positive integer, but got "+t});var a=fa(n.asType("int32"),t),i=fa(o.asType("int32"),t);return a.transpose().matMul(i).asType("int32")}});var _m=D({fromPixels_:function(r,e){if(e===void 0&&(e=3),e>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(r==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");var t=!1,n=!1,o=!1,a=!1,i=!1;if(r.data instanceof Uint8Array)t=!0;else if(typeof ImageData<"u"&&r instanceof ImageData)n=!0;else if(typeof HTMLVideoElement<"u"&&r instanceof HTMLVideoElement)o=!0;else if(typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement)a=!0;else{if(r.getContext==null)throw new Error("pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was "+r.constructor.name);i=!0}if(o&&o&&r.readyState<2)throw new Error("The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.");if(Ts("FromPixels",T.backendName)!=null)return T.runKernel("FromPixels",{pixels:r},{numChannels:e});var s,u,c=o?[r.videoWidth,r.videoHeight]:[r.width,r.height],l=c[0],h=c[1];if(i?s=r.getContext("2d").getImageData(0,0,l,h).data:n||t?s=r.data:(a||o)&&(An==null&&(An=document.createElement("canvas").getContext("2d")),An.canvas.width=l,An.canvas.height=h,An.drawImage(r,0,0,l,h),s=An.getImageData(0,0,l,h).data),e===4)u=new Int32Array(s);else{var f=l*h;u=new Int32Array(f*e);for(var p=0;p<f;p++)for(var d=0;d<e;++d)u[p*e+d]=s[4*p+d]}return Sa(u,[h,l,e],"int32")}}),ti=Object.freeze({toPixels:function(r,e){return X(this,void 0,void 0,function(){var t,n,o,a,i,s,u,c,l,h,f,p,d,m,v,g,x,b,y,w,C,k,S;return Y(this,function(R){switch(R.label){case 0:if(t=_(r,"img","toPixels"),r instanceof Et||(t=t.toInt()),t.rank!==2&&t.rank!==3)throw new Error("toPixels only supports rank 2 or 3 tensors, got rank "+t.rank+".");if(n=t.shape.slice(0,2),o=n[0],a=n[1],(i=t.rank===2?1:t.shape[2])>4||i===2)throw new Error("toPixels only supports depth of size 1, 3 or 4 but got "+i);return[4,t.data()];case 1:return s=R.sent(),u=t.min(),c=t.max(),[4,Promise.all([u.data(),c.data()])];case 2:if(l=R.sent(),h=l[0],f=l[1],p=h[0],d=f[0],u.dispose(),c.dispose(),t.dtype==="float32"){if(p<0||d>1)throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range ["+p+" - "+d+"].")}else{if(t.dtype!=="int32")throw new Error("Unsupported type for toPixels: "+t.dtype+". Please use float32 or int32 tensors.");if(p<0||d>255)throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range ["+p+" - "+d+"].")}for(m=t.dtype==="float32"?255:1,v=new Uint8ClampedArray(a*o*4),g=0;g<o*a;++g)x=void 0,b=void 0,y=void 0,w=void 0,i===1?(x=s[g]*m,b=s[g]*m,y=s[g]*m,w=255):i===3?(x=s[3*g]*m,b=s[3*g+1]*m,y=s[3*g+2]*m,w=255):i===4&&(x=s[4*g]*m,b=s[4*g+1]*m,y=s[4*g+2]*m,w=s[4*g+3]*m),v[(C=4*g)+0]=Math.round(x),v[C+1]=Math.round(b),v[C+2]=Math.round(y),v[C+3]=Math.round(w);return e!=null&&(e.width=a,e.height=o,k=e.getContext("2d"),S=new ImageData(v,a,o),k.putImageData(S,0,0)),t!==r&&t.dispose(),[2,v]}})})},fromPixels:_m}),Em=function(){function r(){}return r.prototype.getClassName=function(){return this.constructor.className},r.fromConfig=function(e,t){return new e(t)},r}(),Rm=function(){function r(){this.classNameMap={}}return r.getMap=function(){return r.instance==null&&(r.instance=new r),r.instance},r.register=function(e){r.getMap().classNameMap[e.className]=[e,e.fromConfig]},r}();function _n(r){E(r.className!=null,function(){return"Class being registered does not have the static className property defined."}),E(typeof r.className=="string",function(){return"className is required to be a string, but got type "+typeof r.className}),E(r.className.length>0,function(){return"Class being registered has an empty-string as its className, which is disallowed."}),Rm.register(r)}var En=function(r){function e(){return r!==null&&r.apply(this,arguments)||this}return ye(e,r),e.prototype.minimize=function(t,n,o){n===void 0&&(n=!1);var a=this.computeGradients(t,o),i=a.value,s=a.grads;if(o!=null){var u=o.map(function(c){return{name:c.name,tensor:s[c.name]}});this.applyGradients(u)}else this.applyGradients(s);return Zt(s),n?i:(i.dispose(),null)},Object.defineProperty(e.prototype,"iterations",{get:function(){return this.iterations_==null&&(this.iterations_=0),this.iterations_},enumerable:!0,configurable:!0}),e.prototype.incrementIterations=function(){this.iterations_=this.iterations+1},e.prototype.computeGradients=function(t,n){return Ph(t,n)},e.prototype.dispose=function(){this.iterations_!=null&&Zt(this.iterations_)},e.prototype.saveIterations=function(){return X(this,void 0,void 0,function(){return Y(this,function(t){return this.iterations_==null&&(this.iterations_=0),[2,{name:"iter",tensor:q(this.iterations_,"int32")}]})})},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){return Y(this,function(t){throw new Error("getWeights() is not implemented for this optimizer yet.")})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){return Y(this,function(n){throw new Error("setWeights() is not implemented for this optimizer class "+this.getClassName())})})},e.prototype.extractIterations=function(t){return X(this,void 0,void 0,function(){var n;return Y(this,function(o){switch(o.label){case 0:return n=this,[4,t[0].tensor.data()];case 1:return n.iterations_=o.sent()[0],[2,t.slice(1)]}})})},e}(Em);Object.defineProperty(En,Symbol.hasInstance,{value:function(r){return r.minimize!=null&&r.computeGradients!=null&&r.applyGradients!=null}});var Im=function(r){function e(t,n,o){o===void 0&&(o=null);var a=r.call(this)||this;return a.learningRate=t,a.rho=n,a.epsilon=o,a.accumulatedGrads=[],a.accumulatedUpdates=[],o==null&&(a.epsilon=T.backend.epsilon()),a}return ye(e,r),e.prototype.applyGradients=function(t){var n=this;(Array.isArray(t)?t.map(function(o){return o.name}):Object.keys(t)).forEach(function(o,a){var i=T.registeredVariables[o];n.accumulatedGrads[a]==null&&(n.accumulatedGrads[a]={originalName:o+"/accum_grad",variable:K(function(){return vt(i).variable(!1)})}),n.accumulatedUpdates[a]==null&&(n.accumulatedUpdates[a]={originalName:o+"/accum_var",variable:K(function(){return vt(i).variable(!1)})});var s=Array.isArray(t)?t[a].tensor:t[o];if(s!=null){var u=n.accumulatedGrads[a].variable,c=n.accumulatedUpdates[a].variable;K(function(){var l=u.mul(n.rho).add(s.square().mul(1-n.rho)),h=c.add(n.epsilon).sqrt().div(u.add(n.epsilon).sqrt()).mul(s),f=c.mul(n.rho).add(h.square().mul(1-n.rho));u.assign(l),c.assign(f);var p=h.mul(-n.learningRate).add(i);i.assign(p)})}}),this.incrementIterations()},e.prototype.dispose=function(){this.accumulatedUpdates!=null&&(Zt(this.accumulatedGrads.map(function(t){return t.variable})),Zt(this.accumulatedUpdates.map(function(t){return t.variable})))},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){var t;return Y(this,function(n){switch(n.label){case 0:return t=this.accumulatedGrads.concat(this.accumulatedUpdates),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(t.map(function(o){return{name:o.originalName,tensor:o.variable}}))]}})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){var n;return Y(this,function(o){switch(o.label){case 0:return[4,this.extractIterations(t)];case 1:return t=o.sent(),n=t.length/2,this.accumulatedGrads=t.slice(0,n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),this.accumulatedUpdates=t.slice(n,2*n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),[2]}})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}},e.fromConfig=function(t,n){return new t(n.learningRate,n.rho,n.epsilon)},e.className="Adadelta",e}(En);_n(Im);var km=function(r){function e(t,n){n===void 0&&(n=.1);var o=r.call(this)||this;return o.learningRate=t,o.initialAccumulatorValue=n,o.accumulatedGrads=[],o}return ye(e,r),e.prototype.applyGradients=function(t){var n=this;(Array.isArray(t)?t.map(function(o){return o.name}):Object.keys(t)).forEach(function(o,a){var i=T.registeredVariables[o];n.accumulatedGrads[a]==null&&(n.accumulatedGrads[a]={originalName:o+"/accumulator",variable:K(function(){return Te(i.shape,n.initialAccumulatorValue).variable(!1)})});var s=Array.isArray(t)?t[a].tensor:t[o];if(s!=null){var u=n.accumulatedGrads[a].variable;K(function(){var c=u.add(s.square());u.assign(c);var l=s.div(c.add(T.backend.epsilon()).sqrt()).mul(-n.learningRate).add(i);i.assign(l)})}}),this.incrementIterations()},e.prototype.dispose=function(){this.accumulatedGrads!=null&&Zt(this.accumulatedGrads.map(function(t){return t.variable}))},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){return Y(this,function(t){switch(t.label){case 0:return[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(this.accumulatedGrads.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){return Y(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(t)];case 1:return t=n.sent(),this.accumulatedGrads=t.map(function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}),[2]}})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}},e.fromConfig=function(t,n){return new t(n.learningRate,n.initialAccumulatorValue)},e.className="Adagrad",e}(En);_n(km);var Sm=function(r){function e(t,n,o,a){a===void 0&&(a=null);var i=r.call(this)||this;return i.learningRate=t,i.beta1=n,i.beta2=o,i.epsilon=a,i.accumulatedFirstMoment=[],i.accumulatedSecondMoment=[],K(function(){i.accBeta1=q(n).variable(),i.accBeta2=q(o).variable()}),a==null&&(i.epsilon=T.backend.epsilon()),i}return ye(e,r),e.prototype.applyGradients=function(t){var n=this,o=Array.isArray(t)?t.map(function(a){return a.name}):Object.keys(t);K(function(){var a=Ot(1,n.accBeta1),i=Ot(1,n.accBeta2);o.forEach(function(s,u){var c=T.registeredVariables[s];n.accumulatedFirstMoment[u]==null&&(n.accumulatedFirstMoment[u]={originalName:s+"/m",variable:K(function(){return vt(c).variable(!1)})}),n.accumulatedSecondMoment[u]==null&&(n.accumulatedSecondMoment[u]={originalName:s+"/v",variable:K(function(){return vt(c).variable(!1)})});var l=Array.isArray(t)?t[u].tensor:t[s];if(l!=null){var h=n.accumulatedFirstMoment[u].variable,f=n.accumulatedSecondMoment[u].variable,p=h.mul(n.beta1).add(l.mul(1-n.beta1)),d=f.mul(n.beta2).add(l.square().mul(1-n.beta2)),m=p.div(a),v=d.div(i);h.assign(p),f.assign(d);var g=m.div(v.sqrt().add(n.epsilon)).mul(-n.learningRate).add(c);c.assign(g)}}),n.accBeta1.assign(n.accBeta1.mul(n.beta1)),n.accBeta2.assign(n.accBeta2.mul(n.beta2))}),this.incrementIterations()},e.prototype.dispose=function(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Zt(this.accumulatedFirstMoment.map(function(t){return t.variable})),this.accumulatedSecondMoment!=null&&Zt(this.accumulatedSecondMoment.map(function(t){return t.variable}))},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){var t;return Y(this,function(n){switch(n.label){case 0:return t=this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(t.map(function(o){return{name:o.originalName,tensor:o.variable}}))]}})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){var n,o=this;return Y(this,function(a){switch(a.label){case 0:return[4,this.extractIterations(t)];case 1:return t=a.sent(),K(function(){o.accBeta1.assign(Zr(o.beta1,o.iterations_+1)),o.accBeta2.assign(Zr(o.beta2,o.iterations_+1))}),n=t.length/2,this.accumulatedFirstMoment=t.slice(0,n).map(function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}}),this.accumulatedSecondMoment=t.slice(n,2*n).map(function(i){return{originalName:i.name,variable:i.tensor.variable(!1)}}),[2]}})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}},e.fromConfig=function(t,n){return new t(n.learningRate,n.beta1,n.beta2,n.epsilon)},e.className="Adam",e}(En);_n(Sm);var Dm=function(r){function e(t,n,o,a,i){a===void 0&&(a=null),i===void 0&&(i=0);var s=r.call(this)||this;return s.learningRate=t,s.beta1=n,s.beta2=o,s.epsilon=a,s.decay=i,s.accumulatedFirstMoment=[],s.accumulatedWeightedInfNorm=[],K(function(){s.iteration=q(0).variable(),s.accBeta1=q(n).variable()}),a==null&&(s.epsilon=T.backend.epsilon()),s}return ye(e,r),e.prototype.applyGradients=function(t){var n=this,o=Array.isArray(t)?t.map(function(a){return a.name}):Object.keys(t);K(function(){var a=Ot(1,n.accBeta1),i=ve(-n.learningRate,n.iteration.mul(n.decay).add(1));o.forEach(function(s,u){var c=T.registeredVariables[s];n.accumulatedFirstMoment[u]==null&&(n.accumulatedFirstMoment[u]={originalName:s+"/m",variable:vt(c).variable(!1)}),n.accumulatedWeightedInfNorm[u]==null&&(n.accumulatedWeightedInfNorm[u]={originalName:s+"/v",variable:vt(c).variable(!1)});var l=Array.isArray(t)?t[u].tensor:t[s];if(l!=null){var h=n.accumulatedFirstMoment[u].variable,f=n.accumulatedWeightedInfNorm[u].variable,p=h.mul(n.beta1).add(l.mul(1-n.beta1)),d=f.mul(n.beta2),m=l.abs(),v=d.maximum(m);h.assign(p),f.assign(v);var g=i.div(a).mul(p.div(v.add(n.epsilon))).add(c);c.assign(g)}}),n.iteration.assign(n.iteration.add(1)),n.accBeta1.assign(n.accBeta1.mul(n.beta1))}),this.incrementIterations()},e.prototype.dispose=function(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Zt(this.accumulatedFirstMoment.map(function(t){return t.variable})),this.accumulatedWeightedInfNorm!=null&&Zt(this.accumulatedWeightedInfNorm.map(function(t){return t.variable}))},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){return Y(this,function(t){throw new Error("getWeights() is not implemented for Adamax yet.")})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){return Y(this,function(n){throw new Error("setWeights() is not implemented for Adamax yet.")})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}},e.fromConfig=function(t,n){return new t(n.learningRate,n.beta1,n.beta2,n.epsilon,n.decay)},e.className="Adamax",e}(En);_n(Dm);var uc=function(r){function e(t){var n=r.call(this)||this;return n.learningRate=t,n.setLearningRate(t),n}return ye(e,r),e.prototype.applyGradients=function(t){var n=this;(Array.isArray(t)?t.map(function(o){return o.name}):Object.keys(t)).forEach(function(o,a){var i=Array.isArray(t)?t[a].tensor:t[o];if(i!=null){var s=T.registeredVariables[o];K(function(){var u=n.c.mul(i).add(s);s.assign(u)})}}),this.incrementIterations()},e.prototype.setLearningRate=function(t){this.learningRate=t,this.c!=null&&this.c.dispose(),this.c=Xl(q(-t))},e.prototype.dispose=function(){this.c.dispose()},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){return Y(this,function(t){switch(t.label){case 0:return[4,this.saveIterations()];case 1:return[2,[t.sent()]]}})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){return Y(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(t)];case 1:if((t=n.sent()).length!==0)throw new Error("SGD optimizer does not have settable weights.");return[2]}})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate}},e.fromConfig=function(t,n){return new t(n.learningRate)},e.className="SGD",e}(En);_n(uc);var Am=function(r){function e(t,n,o){o===void 0&&(o=!1);var a=r.call(this,t)||this;return a.learningRate=t,a.momentum=n,a.useNesterov=o,a.accumulations=[],a.m=q(a.momentum),a}return ye(e,r),e.prototype.applyGradients=function(t){var n=this;(Array.isArray(t)?t.map(function(o){return o.name}):Object.keys(t)).forEach(function(o,a){var i=T.registeredVariables[o];n.accumulations[a]==null&&(n.accumulations[a]={originalName:o+"/momentum",variable:K(function(){return vt(i).variable(!1)})});var s=n.accumulations[a].variable,u=Array.isArray(t)?t[a].tensor:t[o];u!=null&&K(function(){var c,l=n.m.mul(s).add(u);c=n.useNesterov?n.c.mul(u.add(l.mul(n.m))).add(i):n.c.mul(l).add(i),s.assign(l),i.assign(c)})}),this.incrementIterations()},e.prototype.dispose=function(){this.m.dispose(),this.accumulations!=null&&Zt(this.accumulations.map(function(t){return t.variable}))},e.prototype.setMomentum=function(t){this.momentum=t},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){return Y(this,function(t){switch(t.label){case 0:return[4,this.saveIterations()];case 1:return[2,[t.sent()].concat(this.accumulations.map(function(n){return{name:n.originalName,tensor:n.variable}}))]}})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){return Y(this,function(n){switch(n.label){case 0:return[4,this.extractIterations(t)];case 1:return t=n.sent(),this.accumulations=t.map(function(o){return{originalName:o.name,variable:o.tensor.variable(!1)}}),[2]}})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}},e.fromConfig=function(t,n){return new t(n.learningRate,n.momentum,n.useNesterov)},e.className="Momentum",e}(uc);_n(Am);var Tm=function(r){function e(t,n,o,a,i){n===void 0&&(n=.9),o===void 0&&(o=0),a===void 0&&(a=null),i===void 0&&(i=!1);var s=r.call(this)||this;if(s.learningRate=t,s.decay=n,s.momentum=o,s.epsilon=a,s.accumulatedMeanSquares=[],s.accumulatedMoments=[],s.accumulatedMeanGrads=[],s.centered=i,a==null&&(s.epsilon=T.backend.epsilon()),t==null)throw new Error("learningRate for RMSPropOptimizer must be defined.");return s}return ye(e,r),e.prototype.applyGradients=function(t){var n=this;(Array.isArray(t)?t.map(function(o){return o.name}):Object.keys(t)).forEach(function(o,a){var i=T.registeredVariables[o];n.accumulatedMeanSquares[a]==null&&(n.accumulatedMeanSquares[a]={originalName:o+"/rms",variable:K(function(){return vt(i).variable(!1)})}),n.accumulatedMoments[a]==null&&(n.accumulatedMoments[a]={originalName:o+"/momentum",variable:K(function(){return vt(i).variable(!1)})}),n.accumulatedMeanGrads[a]==null&&n.centered&&(n.accumulatedMeanGrads[a]={originalName:o+"/mg",variable:K(function(){return vt(i).variable(!1)})});var s=Array.isArray(t)?t[a].tensor:t[o];if(s!=null){var u=n.accumulatedMeanSquares[a].variable,c=n.accumulatedMoments[a].variable;K(function(){var l=u.mul(n.decay).add(s.square().mul(1-n.decay));if(n.centered){var h=n.accumulatedMeanGrads[a].variable,f=h.mul(n.decay).add(s.mul(1-n.decay)),p=c.mul(n.momentum).add(s.mul(n.learningRate).div(l.sub(f.square().add(n.epsilon)).sqrt()));u.assign(l),h.assign(f),c.assign(p);var d=i.sub(p);i.assign(d)}else{var m=u.mul(n.decay).add(s.square().mul(1-n.decay));p=c.mul(n.momentum).add(s.mul(n.learningRate).div(m.add(n.epsilon).sqrt())),u.assign(m),c.assign(p),d=i.sub(p),i.assign(d)}})}}),this.incrementIterations()},e.prototype.dispose=function(){this.accumulatedMeanSquares!=null&&Zt(this.accumulatedMeanSquares.map(function(t){return t.variable})),this.accumulatedMeanGrads!=null&&this.centered&&Zt(this.accumulatedMeanGrads.map(function(t){return t.variable})),this.accumulatedMoments!=null&&Zt(this.accumulatedMoments.map(function(t){return t.variable}))},e.prototype.getWeights=function(){return X(this,void 0,void 0,function(){var t;return Y(this,function(n){switch(n.label){case 0:return t=this.accumulatedMeanSquares.concat(this.accumulatedMoments),this.centered&&t.push.apply(t,this.accumulatedMeanGrads),[4,this.saveIterations()];case 1:return[2,[n.sent()].concat(t.map(function(o){return{name:o.originalName,tensor:o.variable}}))]}})})},e.prototype.setWeights=function(t){return X(this,void 0,void 0,function(){var n;return Y(this,function(o){switch(o.label){case 0:return[4,this.extractIterations(t)];case 1:return t=o.sent(),n=this.centered?t.length/3:t.length/2,this.accumulatedMeanSquares=t.slice(0,n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),this.accumulatedMoments=t.slice(n,2*n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}}),this.centered&&(this.accumulatedMeanGrads=t.slice(2*n,3*n).map(function(a){return{originalName:a.name,variable:a.tensor.variable(!1)}})),[2]}})})},e.prototype.getConfig=function(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}},e.fromConfig=function(t,n){return new t(n.learningRate,n.decay,n.momentum,n.epsilon,n.centered)},e.className="RMSProp",e}(En);_n(Tm);Et.prototype.squaredDifference=function(r){return _u(this,r)},P=rm;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var Ca=function(r,e){return Ca=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])},Ca(r,e)};function rt(r,e){Ca(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var qt=function(){return qt=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},qt.apply(this,arguments)};function Q(r,e,t,n){function o(a){return a instanceof t?a:new t(function(i){i(a)})}return new(t||(t=Promise))(function(a,i){function s(l){try{c(n.next(l))}catch(h){i(h)}}function u(l){try{c(n.throw(l))}catch(h){i(h)}}function c(l){l.done?a(l.value):o(l.value).then(s,u)}c((n=n.apply(r,e||[])).next())})}function Z(r,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,o,a,i;return i={next:s(0),throw:s(1),return:s(2)},typeof Symbol=="function"&&(i[Symbol.iterator]=function(){return this}),i;function s(c){return function(l){return u([c,l])}}function u(c){if(n)throw new TypeError("Generator is already executing.");for(;t;)try{if(n=1,o&&(a=c[0]&2?o.return:c[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,c[1])).done)return a;switch(o=0,a&&(c=[c[0]&2,a.value]),c[0]){case 0:case 1:a=c;break;case 4:return t.label++,{value:c[1],done:!1};case 5:t.label++,o=c[1],c=[0];continue;case 7:c=t.ops.pop(),t.trys.pop();continue;default:if(a=t.trys,!(a=a.length>0&&a[a.length-1])&&(c[0]===6||c[0]===2)){t=0;continue}if(c[0]===3&&(!a||c[1]>a[0]&&c[1]<a[3])){t.label=c[1];break}if(c[0]===6&&t.label<a[1]){t.label=a[1],a=c;break}if(a&&t.label<a[2]){t.label=a[2],t.ops.push(c);break}a[2]&&t.ops.pop(),t.trys.pop();continue}c=e.call(r,t)}catch(l){c=[6,l],o=0}finally{n=a=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}function nr(){for(var r=0,e=0,t=arguments.length;e<t;e++)r+=arguments[e].length;for(var n=Array(r),o=0,e=0;e<t;e++)for(var a=arguments[e],i=0,s=a.length;i<s;i++,o++)n[o]=a[i];return n}var gn=function(){function r(e,t){if(!yn(e)||!yn(t))throw new Error("Dimensions.constructor - expected width and height to be valid numbers, instead have "+JSON.stringify({width:e,height:t}));this._width=e,this._height=t}return Object.defineProperty(r.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),r.prototype.reverse=function(){return new r(1/this.width,1/this.height)},r}();function mo(r,e){return r instanceof Et&&r.shape.length===e}function Nm(r){return mo(r,2)}function go(r){return mo(r,3)}function on(r){return mo(r,4)}function Fm(r){return r%1!==0}function bs(r){return r%2===0}function cc(r,e){e===void 0&&(e=2);var t=Math.pow(10,e);return Math.floor(r*t)/t}function ws(r){return r&&r.width&&r.height}function Pm(r,e){var t=r.width,n=r.height,o=e/Math.max(n,t);return new gn(Math.round(t*o),Math.round(n*o))}function ei(r){return r.reduce(function(e,t){return e.add(t)},new gt(0,0)).div(new gt(r.length,r.length))}function ur(r,e,t){return Array(r).fill(0).map(function(n,o){return e+o*t})}function yn(r){return!!r&&r!==1/0&&r!==-1/0&&!isNaN(r)||r===0}function Cs(r){return yn(r)&&0<=r&&r<=1}var gt=function(){function r(e,t){this._x=e,this._y=t}return Object.defineProperty(r.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),r.prototype.add=function(e){return new r(this.x+e.x,this.y+e.y)},r.prototype.sub=function(e){return new r(this.x-e.x,this.y-e.y)},r.prototype.mul=function(e){return new r(this.x*e.x,this.y*e.y)},r.prototype.div=function(e){return new r(this.x/e.x,this.y/e.y)},r.prototype.abs=function(){return new r(Math.abs(this.x),Math.abs(this.y))},r.prototype.magnitude=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))},r.prototype.floor=function(){return new r(Math.floor(this.x),Math.floor(this.y))},r}(),Fe=function(){function r(e,t){t===void 0&&(t=!0);var n=e||{},o=[n.left,n.top,n.right,n.bottom].every(yn),a=[n.x,n.y,n.width,n.height].every(yn);if(!a&&!o)throw new Error("Box.constructor - expected box to be IBoundingBox | IRect, instead have "+JSON.stringify(n));var i=a?[n.x,n.y,n.width,n.height]:[n.left,n.top,n.right-n.left,n.bottom-n.top],s=i[0],u=i[1],c=i[2],l=i[3];r.assertIsValidBox({x:s,y:u,width:c,height:l},"Box.constructor",t),this._x=s,this._y=u,this._width=c,this._height=l}return r.isRect=function(e){return!!e&&[e.x,e.y,e.width,e.height].every(yn)},r.assertIsValidBox=function(e,t,n){if(n===void 0&&(n=!1),!r.isRect(e))throw new Error(t+" - invalid box: "+JSON.stringify(e)+", expected object with properties x, y, width, height");if(!n&&(e.width<0||e.height<0))throw new Error(t+" - width ("+e.width+") and height ("+e.height+") must be positive numbers")},Object.defineProperty(r.prototype,"x",{get:function(){return this._x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"y",{get:function(){return this._y},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"width",{get:function(){return this._width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"height",{get:function(){return this._height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"left",{get:function(){return this.x},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"top",{get:function(){return this.y},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"right",{get:function(){return this.x+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottom",{get:function(){return this.y+this.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"area",{get:function(){return this.width*this.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"topLeft",{get:function(){return new gt(this.left,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"topRight",{get:function(){return new gt(this.right,this.top)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottomLeft",{get:function(){return new gt(this.left,this.bottom)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"bottomRight",{get:function(){return new gt(this.right,this.bottom)},enumerable:!0,configurable:!0}),r.prototype.round=function(){var e=[this.x,this.y,this.width,this.height].map(function(i){return Math.round(i)}),t=e[0],n=e[1],o=e[2],a=e[3];return new r({x:t,y:n,width:o,height:a})},r.prototype.floor=function(){var e=[this.x,this.y,this.width,this.height].map(function(i){return Math.floor(i)}),t=e[0],n=e[1],o=e[2],a=e[3];return new r({x:t,y:n,width:o,height:a})},r.prototype.toSquare=function(){var e=this,t=e.x,n=e.y,o=e.width,a=e.height,i=Math.abs(o-a);return o<a&&(t-=i/2,o+=i),a<o&&(n-=i/2,a+=i),new r({x:t,y:n,width:o,height:a})},r.prototype.rescale=function(e){var t=ws(e)?e.width:e,n=ws(e)?e.height:e;return new r({x:this.x*t,y:this.y*n,width:this.width*t,height:this.height*n})},r.prototype.pad=function(e,t){var n=[this.x-e/2,this.y-t/2,this.width+e,this.height+t],o=n[0],a=n[1],i=n[2],s=n[3];return new r({x:o,y:a,width:i,height:s})},r.prototype.clipAtImageBorders=function(e,t){var n=this,o=n.x,a=n.y,i=n.right,s=n.bottom,u=Math.max(o,0),c=Math.max(a,0),l=i-u,h=s-c,f=Math.min(l,e-u),p=Math.min(h,t-c);return new r({x:u,y:c,width:f,height:p}).floor()},r.prototype.shift=function(e,t){var n=this,o=n.width,a=n.height,i=this.x+e,s=this.y+t;return new r({x:i,y:s,width:o,height:a})},r.prototype.padAtBorders=function(e,t){var n=this.width+1,o=this.height+1,a=1,i=1,s=n,u=o,c=this.left,l=this.top,h=this.right,f=this.bottom;return h>t&&(s=-h+t+n,h=t),f>e&&(u=-f+e+o,f=e),c<1&&(u=2-c,c=1),l<1&&(u=2-l,l=1),{dy:i,edy:u,dx:a,edx:s,y:l,ey:f,x:c,ex:h,w:n,h:o}},r.prototype.calibrate=function(e){return new r({left:this.left+e.left*this.width,top:this.top+e.top*this.height,right:this.right+e.right*this.width,bottom:this.bottom+e.bottom*this.height}).toSquare().round()},r}(),yo=function(r){rt(e,r);function e(t,n,o,a,i){return i===void 0&&(i=!1),r.call(this,{left:t,top:n,right:o,bottom:a},i)||this}return e}(Fe),lc=function(){function r(e,t,n,o,a){this._imageDims=new gn(a.width,a.height),this._score=e,this._classScore=t,this._className=n,this._box=new Fe(o).rescale(this._imageDims)}return Object.defineProperty(r.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"className",{get:function(){return this._className},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"box",{get:function(){return this._box},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageDims",{get:function(){return this._imageDims},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageWidth",{get:function(){return this.imageDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageHeight",{get:function(){return this.imageDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"relativeBox",{get:function(){return new Fe(this._box).rescale(this.imageDims.reverse())},enumerable:!0,configurable:!0}),r.prototype.forSize=function(e,t){return new r(this.score,this.classScore,this.className,this.relativeBox,{width:e,height:t})},r}(),le=function(r){rt(e,r);function e(t,n,o){return r.call(this,t,t,"",n,o)||this}return e.prototype.forSize=function(t,n){var o=r.prototype.forSize.call(this,t,n),a=o.score,i=o.relativeBox,s=o.imageDims;return new e(a,i,s)},e}(lc);function Mm(r,e,t){t===void 0&&(t=!0);var n=Math.max(0,Math.min(r.right,e.right)-Math.max(r.left,e.left)),o=Math.max(0,Math.min(r.bottom,e.bottom)-Math.max(r.top,e.top)),a=n*o;return t?a/(r.area+e.area-a):a/Math.min(r.area,e.area)}function Om(r){var e=r.map(function(s){return s.x}),t=r.map(function(s){return s.y}),n=e.reduce(function(s,u){return u<s?u:s},1/0),o=t.reduce(function(s,u){return u<s?u:s},1/0),a=e.reduce(function(s,u){return s<u?u:s},0),i=t.reduce(function(s,u){return s<u?u:s},0);return new yo(n,o,a,i)}function cr(r,e,t,n){n===void 0&&(n=!0);for(var o=e.map(function(s,u){return{score:s,boxIndex:u}}).sort(function(s,u){return s.score-u.score}).map(function(s){return s.boxIndex}),a=[],i=function(){var s=o.pop();a.push(s);for(var u=o,c=[],l=0;l<u.length;l++){var h=u[l],f=r[s],p=r[h];c.push(Mm(f,p,n))}o=o.filter(function(d,m){return c[m]<=t})};o.length>0;)i();return a}function br(r,e){return K(function(){var t=e[0],n=e[1],o=e[2],a=Te(nr(r.shape.slice(0,3),[1]),t),i=Te(nr(r.shape.slice(0,3),[1]),n),s=Te(nr(r.shape.slice(0,3),[1]),o),u=Ft([a,i,s],3);return Ot(r,u)})}function Bm(r,e){return e===void 0&&(e=!1),K(function(){var t=r.shape.slice(1),n=t[0],o=t[1];if(n===o)return r;var a=Math.abs(n-o),i=Math.round(a*(e?.5:1)),s=n>o?2:1,u=function(p){var d=r.shape.slice();return d[s]=p,Te(d,0)},c=u(i),l=a-c.shape[s],h=e&&l?u(l):null,f=[h,r,c].filter(function(p){return!!p}).map(function(p){return p.toFloat()});return Ft(f,s)})}function Zo(r){return 1/(1+Math.exp(-r))}var ni=function(r){rt(e,r);function e(t,n,o,a,i){return i===void 0&&(i=!1),r.call(this,{x:t,y:n,width:o,height:a},i)||this}return e}(Fe),Lm=.5,Wm=.43,Um=.45,lr=function(){function r(e,t,n){n===void 0&&(n=new gt(0,0));var o=t.width,a=t.height;this._imgDims=new gn(o,a),this._shift=n,this._positions=e.map(function(i){return i.mul(new gt(o,a)).add(n)})}return Object.defineProperty(r.prototype,"shift",{get:function(){return new gt(this._shift.x,this._shift.y)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageWidth",{get:function(){return this._imgDims.width},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"imageHeight",{get:function(){return this._imgDims.height},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"positions",{get:function(){return this._positions},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"relativePositions",{get:function(){var e=this;return this._positions.map(function(t){return t.sub(e._shift).div(new gt(e.imageWidth,e.imageHeight))})},enumerable:!0,configurable:!0}),r.prototype.forSize=function(e,t){return new this.constructor(this.relativePositions,{width:e,height:t})},r.prototype.shiftBy=function(e,t){return new this.constructor(this.relativePositions,this._imgDims,new gt(e,t))},r.prototype.shiftByPoint=function(e){return this.shiftBy(e.x,e.y)},r.prototype.align=function(e,t){if(t===void 0&&(t={}),e){var n=e instanceof le?e.box.floor():new Fe(e);return this.shiftBy(n.x,n.y).align(null,t)}var o=Object.assign({},{useDlibAlignment:!1,minBoxPadding:.2},t),a=o.useDlibAlignment,i=o.minBoxPadding;return a?this.alignDlib():this.alignMinBbox(i)},r.prototype.alignDlib=function(){var e=this.getRefPointsForAlignment(),t=e[0],n=e[1],o=e[2],a=function(h){return o.sub(h).magnitude()},i=(a(t)+a(n))/2,s=Math.floor(i/Um),u=ei(e),c=Math.floor(Math.max(0,u.x-Lm*s)),l=Math.floor(Math.max(0,u.y-Wm*s));return new ni(c,l,Math.min(s,this.imageWidth+c),Math.min(s,this.imageHeight+l))},r.prototype.alignMinBbox=function(e){var t=Om(this.positions);return t.pad(t.width*e,t.height*e)},r.prototype.getRefPointsForAlignment=function(){throw new Error("getRefPointsForAlignment not implemented by base class")},r}(),zm=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.getRefPointsForAlignment=function(){var t=this.positions;return[t[0],t[1],ei([t[3],t[4]])]},e}(lr),Vm=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.getJawOutline=function(){return this.positions.slice(0,17)},e.prototype.getLeftEyeBrow=function(){return this.positions.slice(17,22)},e.prototype.getRightEyeBrow=function(){return this.positions.slice(22,27)},e.prototype.getNose=function(){return this.positions.slice(27,36)},e.prototype.getLeftEye=function(){return this.positions.slice(36,42)},e.prototype.getRightEye=function(){return this.positions.slice(42,48)},e.prototype.getMouth=function(){return this.positions.slice(48,68)},e.prototype.getRefPointsForAlignment=function(){return[this.getLeftEye(),this.getRightEye(),this.getMouth()].map(ei)},e}(lr),_s=function(){function r(e,t){this._label=e,this._distance=t}return Object.defineProperty(r.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"distance",{get:function(){return this._distance},enumerable:!0,configurable:!0}),r.prototype.toString=function(e){return e===void 0&&(e=!0),""+this.label+(e?" ("+cc(this.distance)+")":"")},r}(),Es=function(r){rt(e,r);function e(t,n){var o=r.call(this,t)||this;return o._label=n,o}return e.assertIsValidLabeledBox=function(t,n){if(Fe.assertIsValidBox(t,n),!yn(t.label))throw new Error(n+" - expected property label ("+t.label+") to be a number")},Object.defineProperty(e.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),e}(Fe),Tr=function(){function r(e,t){if(typeof e!="string")throw new Error("LabeledFaceDescriptors - constructor expected label to be a string");if(!Array.isArray(t)||t.some(function(n){return!(n instanceof Float32Array)}))throw new Error("LabeledFaceDescriptors - constructor expected descriptors to be an array of Float32Array");this._label=e,this._descriptors=t}return Object.defineProperty(r.prototype,"label",{get:function(){return this._label},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"descriptors",{get:function(){return this._descriptors},enumerable:!0,configurable:!0}),r.prototype.toJSON=function(){return{label:this.label,descriptors:this.descriptors.map(function(e){return Array.from(e)})}},r.fromJSON=function(e){var t=e.descriptors.map(function(n){return new Float32Array(n)});return new r(e.label,t)},r}();(function(r){rt(e,r);function e(t,n,o,a){var i=r.call(this,t,n)||this;return i._score=o,i._classScore=a,i}return e.assertIsValidPredictedBox=function(t,n){if(Es.assertIsValidLabeledBox(t,n),!Cs(t.score)||!Cs(t.classScore))throw new Error(n+" - expected properties score ("+t.score+") and ("+t.classScore+") to be a number between [0, 1]")},Object.defineProperty(e.prototype,"score",{get:function(){return this._score},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"classScore",{get:function(){return this._classScore},enumerable:!0,configurable:!0}),e})(Es);function no(r){return r.detection instanceof le}function hr(r,e){var t={detection:e};return Object.assign({},r,t)}function hc(){var r=window.fetch||function(){throw new Error("fetch - missing fetch implementation for browser environment")},e=function(){throw new Error("readFile - filesystem not available for browser environment")};return{Canvas:HTMLCanvasElement,CanvasRenderingContext2D,Image:HTMLImageElement,ImageData,Video:HTMLVideoElement,createCanvasElement:function(){return document.createElement("canvas")},createImageElement:function(){return document.createElement("img")},fetch:r,readFile:e}}function fc(r){var e="";if(!r)try{r=require("fs")}catch(n){e=n.toString()}var t=r?function(n){return new Promise(function(o,a){r.readFile(n,function(i,s){return i?a(i):o(s)})})}:function(){throw new Error("readFile - failed to require fs in nodejs environment with error: "+e)};return{readFile:t}}function pc(){var r=global.Canvas||global.HTMLCanvasElement,e=global.Image||global.HTMLImageElement,t=function(){if(r)return new r;throw new Error("createCanvasElement - missing Canvas implementation for nodejs environment")},n=function(){if(e)return new e;throw new Error("createImageElement - missing Image implementation for nodejs environment")},o=global.fetch||function(){throw new Error("fetch - missing fetch implementation for nodejs environment")},a=fc();return qt({Canvas:r||function(){function i(){}return i}(),CanvasRenderingContext2D:global.CanvasRenderingContext2D||function(){function i(){}return i}(),Image:e||function(){function i(){}return i}(),ImageData:global.ImageData||function(){function i(){}return i}(),Video:global.HTMLVideoElement||function(){function i(){}return i}(),createCanvasElement:t,createImageElement:n,fetch:o},a)}function dc(){return typeof window=="object"&&typeof document<"u"&&typeof HTMLImageElement<"u"&&typeof HTMLCanvasElement<"u"&&typeof HTMLVideoElement<"u"&&typeof ImageData<"u"&&typeof CanvasRenderingContext2D<"u"}function vc(){return typeof global=="object"&&typeof require=="function"&&typeof module<"u"&&typeof process<"u"&&!!process.version}var Nt;function Gm(){if(!Nt)throw new Error("getEnv - environment is not defined, check isNodejs() and isBrowser()");return Nt}function _a(r){Nt=r}function ri(){dc()&&_a(hc()),vc()&&_a(pc())}function Hm(r){if(Nt||ri(),!Nt)throw new Error("monkeyPatch - environment is not defined, check isNodejs() and isBrowser()");var e=r.Canvas,t=e===void 0?Nt.Canvas:e,n=r.Image,o=n===void 0?Nt.Image:n;Nt.Canvas=t,Nt.Image=o,Nt.createCanvasElement=r.createCanvasElement||function(){return new t},Nt.createImageElement=r.createImageElement||function(){return new o},Nt.ImageData=r.ImageData||Nt.ImageData,Nt.Video=r.Video||Nt.Video,Nt.fetch=r.fetch||Nt.fetch,Nt.readFile=r.readFile||Nt.readFile}var $t={getEnv:Gm,setEnv:_a,initialize:ri,createBrowserEnv:hc,createFileSystem:fc,createNodejsEnv:pc,monkeyPatch:Hm,isBrowser:dc,isNodejs:vc};ri();function oi(r){return!$t.isNodejs()&&typeof r=="string"?document.getElementById(r):r}function Ge(r){var e=$t.getEnv(),t=e.Canvas,n=e.CanvasRenderingContext2D;if(r instanceof n)return r;var o=oi(r);if(!(o instanceof t))throw new Error("resolveContext2d - expected canvas to be of instance of Canvas");var a=o.getContext("2d");if(!a)throw new Error("resolveContext2d - canvas 2d context is null");return a}var en;(function(r){r.TOP_LEFT="TOP_LEFT",r.TOP_RIGHT="TOP_RIGHT",r.BOTTOM_LEFT="BOTTOM_LEFT",r.BOTTOM_RIGHT="BOTTOM_RIGHT"})(en||(en={}));var mc=function(){function r(e){e===void 0&&(e={});var t=e.anchorPosition,n=e.backgroundColor,o=e.fontColor,a=e.fontSize,i=e.fontStyle,s=e.padding;this.anchorPosition=t||en.TOP_LEFT,this.backgroundColor=n||"rgba(0, 0, 0, 0.5)",this.fontColor=o||"rgba(255, 255, 255, 1)",this.fontSize=a||14,this.fontStyle=i||"Georgia",this.padding=s||4}return r}(),qm=function(){function r(e,t,n){n===void 0&&(n={}),this.text=typeof e=="string"?[e]:e instanceof r?e.text:e,this.anchor=t,this.options=new mc(n)}return r.prototype.measureWidth=function(e){var t=this.options.padding;return this.text.map(function(n){return e.measureText(n).width}).reduce(function(n,o){return n<o?o:n},0)+2*t},r.prototype.measureHeight=function(){var e=this.options,t=e.fontSize,n=e.padding;return this.text.length*t+2*n},r.prototype.getUpperLeft=function(e,t){var n=this.options.anchorPosition,o=n===en.BOTTOM_RIGHT||n===en.TOP_RIGHT,a=n===en.BOTTOM_LEFT||n===en.BOTTOM_RIGHT,i=this.measureWidth(e),s=this.measureHeight(),u=o?this.anchor.x-i:this.anchor.x,c=a?this.anchor.y-s:this.anchor.y;if(t){var l=t.width,h=t.height,f=Math.max(Math.min(u,l-i),0),p=Math.max(Math.min(c,h-s),0);return{x:f,y:p}}return{x:u,y:c}},r.prototype.draw=function(e){var t=oi(e),n=Ge(t),o=this.options,a=o.backgroundColor,i=o.fontColor,s=o.fontSize,u=o.fontStyle,c=o.padding;n.font=s+"px "+u;var l=this.measureWidth(n),h=this.measureHeight();n.fillStyle=a;var f=this.getUpperLeft(n,t);n.fillRect(f.x,f.y,l,h),n.fillStyle=i,this.text.forEach(function(p,d){var m=c+f.x,v=c+f.y+(d+1)*s;n.fillText(p,m,v)})},r}(),jm=function(){function r(e){e===void 0&&(e={});var t=e.boxColor,n=e.lineWidth,o=e.label,a=e.drawLabelOptions;this.boxColor=t||"rgba(0, 0, 255, 1)",this.lineWidth=n||2,this.label=o;var i={anchorPosition:en.BOTTOM_LEFT,backgroundColor:this.boxColor};this.drawLabelOptions=new mc(Object.assign({},i,a))}return r}(),Km=function(){function r(e,t){t===void 0&&(t={}),this.box=new Fe(e),this.options=new jm(t)}return r.prototype.draw=function(e){var t=Ge(e),n=this.options,o=n.boxColor,a=n.lineWidth,i=this.box,s=i.x,u=i.y,c=i.width,l=i.height;t.strokeStyle=o,t.lineWidth=a,t.strokeRect(s,u,c,l);var h=this.options.label;h&&new qm([h],{x:s-a/2,y:u},this.options.drawLabelOptions).draw(e)},r}();function Xm(r,e){var t=Array.isArray(e)?e:[e];t.forEach(function(n){var o=n instanceof le?n.score:no(n)?n.detection.score:void 0,a=n instanceof le?n.box:no(n)?n.detection.box:new Fe(n),i=o?""+cc(o):void 0;new Km(a,{label:i}).draw(r)})}function gc(r){var e=$t.getEnv(),t=e.Image,n=e.Video;return r instanceof t&&r.complete||r instanceof n&&r.readyState>=3}function Ym(r){return new Promise(function(e,t){if(r instanceof $t.getEnv().Canvas||gc(r))return e();function n(a){a.currentTarget&&(a.currentTarget.removeEventListener("load",n),a.currentTarget.removeEventListener("error",o),e(a))}function o(a){a.currentTarget&&(a.currentTarget.removeEventListener("load",n),a.currentTarget.removeEventListener("error",o),t(a))}r.addEventListener("load",n),r.addEventListener("error",o)})}function ai(r){var e=$t.getEnv(),t=e.Image,n=e.Video;return r instanceof t?new gn(r.naturalWidth,r.naturalHeight):r instanceof n?new gn(r.videoWidth,r.videoHeight):new gn(r.width,r.height)}function xo(r){var e=r.width,t=r.height,n=$t.getEnv().createCanvasElement,o=n();return o.width=e,o.height=t,o}function Vn(r,e){var t=$t.getEnv().ImageData;if(!(r instanceof t)&&!gc(r))throw new Error("createCanvasFromMedia - media has not finished loading yet");var n=e||ai(r),o=n.width,a=n.height,i=xo({width:o,height:a});return r instanceof t?Ge(i).putImageData(r,0,0):Ge(i).drawImage(r,0,0,o,a),i}function $m(r,e){return Q(this,void 0,void 0,function(){var t,n,o,a,i,s;return Z(this,function(u){switch(u.label){case 0:return t=e||$t.getEnv().createCanvasElement(),n=r.shape.slice(on(r)?1:0),o=n[0],a=n[1],i=n[2],s=K(function(){return r.as3D(o,a,i).toInt()}),[4,ti.toPixels(s,t)];case 1:return u.sent(),s.dispose(),[2,t]}})})}function Rs(r){var e=$t.getEnv(),t=e.Image,n=e.Canvas,o=e.Video;return r instanceof t||r instanceof n||r instanceof o}function Jm(r,e,t){t===void 0&&(t=!1);var n=$t.getEnv(),o=n.Image,a=n.Canvas;if(!(r instanceof o||r instanceof a))throw new Error("imageToSquare - expected arg0 to be HTMLImageElement | HTMLCanvasElement");var i=ai(r),s=e/Math.max(i.height,i.width),u=s*i.width,c=s*i.height,l=xo({width:e,height:e}),h=r instanceof a?r:Vn(r),f=Math.abs(u-c)/2,p=t&&u<c?f:0,d=t&&c<u?f:0;return Ge(l).drawImage(h,p,d,u,c),l}var ro=function(){function r(e,t){var n=this;if(t===void 0&&(t=!1),this._imageTensors=[],this._canvases=[],this._treatAsBatchInput=!1,this._inputDimensions=[],!Array.isArray(e))throw new Error("NetInput.constructor - expected inputs to be an Array of TResolvedNetInput or to be instanceof tf.Tensor4D, instead have "+e);this._treatAsBatchInput=t,this._batchSize=e.length,e.forEach(function(o,a){if(go(o)){n._imageTensors[a]=o,n._inputDimensions[a]=o.shape;return}if(on(o)){var i=o.shape[0];if(i!==1)throw new Error("NetInput - tf.Tensor4D with batchSize "+i+" passed, but not supported in input array");n._imageTensors[a]=o,n._inputDimensions[a]=o.shape.slice(1);return}var s=o instanceof $t.getEnv().Canvas?o:Vn(o);n._canvases[a]=s,n._inputDimensions[a]=[s.height,s.width,3]})}return Object.defineProperty(r.prototype,"imageTensors",{get:function(){return this._imageTensors},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"canvases",{get:function(){return this._canvases},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isBatchInput",{get:function(){return this.batchSize>1||this._treatAsBatchInput},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"batchSize",{get:function(){return this._batchSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputDimensions",{get:function(){return this._inputDimensions},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"reshapedInputDimensions",{get:function(){var e=this;return ur(this.batchSize,0,1).map(function(t,n){return e.getReshapedInputDimensions(n)})},enumerable:!0,configurable:!0}),r.prototype.getInput=function(e){return this.canvases[e]||this.imageTensors[e]},r.prototype.getInputDimensions=function(e){return this._inputDimensions[e]},r.prototype.getInputHeight=function(e){return this._inputDimensions[e][0]},r.prototype.getInputWidth=function(e){return this._inputDimensions[e][1]},r.prototype.getReshapedInputDimensions=function(e){if(typeof this.inputSize!="number")throw new Error("getReshapedInputDimensions - inputSize not set, toBatchTensor has not been called yet");var t=this.getInputWidth(e),n=this.getInputHeight(e);return Pm({width:t,height:n},this.inputSize)},r.prototype.toBatchTensor=function(e,t){var n=this;return t===void 0&&(t=!0),this._inputSize=e,K(function(){var o=ur(n.batchSize,0,1).map(function(i){var s=n.getInput(i);if(s instanceof Et){var u=on(s)?s:s.expandDims();return u=Bm(u,t),(u.shape[1]!==e||u.shape[2]!==e)&&(u=Xa.resizeBilinear(u,[e,e])),u.as3D(e,e,3)}if(s instanceof $t.getEnv().Canvas)return ti.fromPixels(Jm(s,e,t));throw new Error("toBatchTensor - at batchIdx "+i+", expected input to be instanceof tf.Tensor or instanceof HTMLCanvasElement, instead have "+s)}),a=ce(o.map(function(i){return i.toFloat()})).as4D(n.batchSize,e,e,3);return a})},r}();function Ut(r){return Q(this,void 0,void 0,function(){var e,t,n;return Z(this,function(o){switch(o.label){case 0:if(r instanceof ro)return[2,r];if(e=Array.isArray(r)?r:[r],!e.length)throw new Error("toNetInput - empty array passed as input");return t=function(a){return Array.isArray(r)?" at input index "+a+":":""},n=e.map(oi),n.forEach(function(a,i){if(!Rs(a)&&!go(a)&&!on(a))throw typeof e[i]=="string"?new Error("toNetInput -"+t(i)+" string passed, but could not resolve HTMLElement for element id "+e[i]):new Error("toNetInput -"+t(i)+" expected media to be of type HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | tf.Tensor3D, or to be an element id");if(on(a)){var s=a.shape[0];if(s!==1)throw new Error("toNetInput -"+t(i)+" tf.Tensor4D with batchSize "+s+" passed, but not supported in input array")}}),[4,Promise.all(n.map(function(a){return Rs(a)&&Ym(a)}))];case 1:return o.sent(),[2,new ro(n,Array.isArray(r))]}})})}function ii(r,e){return Q(this,void 0,void 0,function(){var t,n,o,a,i,s,u;return Z(this,function(c){switch(c.label){case 0:return t=$t.getEnv().Canvas,n=r,r instanceof t?[3,5]:[4,Ut(r)];case 1:if(o=c.sent(),o.batchSize>1)throw new Error("extractFaces - batchSize > 1 not supported");return a=o.getInput(0),a instanceof t?(i=a,[3,4]):[3,2];case 2:return[4,$m(a)];case 3:i=c.sent(),c.label=4;case 4:n=i,c.label=5;case 5:return s=Ge(n),u=e.map(function(l){return l instanceof le?l.forSize(n.width,n.height).box.floor():l}).map(function(l){return l.clipAtImageBorders(n.width,n.height)}),[2,u.map(function(l){var h=l.x,f=l.y,p=l.width,d=l.height,m=xo({width:p,height:d});return Ge(m).putImageData(s.getImageData(h,f,p,d),0,0),m})]}})})}function si(r,e){return Q(this,void 0,void 0,function(){return Z(this,function(t){if(!go(r)&&!on(r))throw new Error("extractFaceTensors - expected image tensor to be 3D or 4D");if(on(r)&&r.shape[0]>1)throw new Error("extractFaceTensors - batchSize > 1 not supported");return[2,K(function(){var n=r.shape.slice(on(r)?1:0),o=n[0],a=n[1],i=n[2],s=e.map(function(c){return c instanceof le?c.forSize(a,o).box:c}).map(function(c){return c.clipAtImageBorders(a,o)}),u=s.map(function(c){var l=c.x,h=c.y,f=c.width,p=c.height;return Hu(r.as3D(o,a,i),[h,l,0],[p,f,i])});return u})]})})}function Qm(r,e){return Q(this,void 0,void 0,function(){var t,n;return Z(this,function(o){switch(o.label){case 0:return t=$t.getEnv().fetch,[4,t(r,e)];case 1:if(n=o.sent(),!(n.status<400))throw new Error("failed to fetch: ("+n.status+") "+n.statusText+", from url: "+n.url);return[2,n]}})})}function Zm(r){return Q(this,void 0,void 0,function(){return Z(this,function(e){switch(e.label){case 0:return[4,Qm(r)];case 1:return[2,e.sent().json()]}})})}function yc(r,e){var t=e+"-weights_manifest.json";if(!r)return{modelBaseUri:"",manifestUri:t};if(r==="/")return{modelBaseUri:"/",manifestUri:"/"+t};var n=r.startsWith("http://")?"http://":r.startsWith("https://")?"https://":"";r=r.replace(n,"");var o=r.split("/").filter(function(s){return s}),a=r.endsWith(".json")?o[o.length-1]:t,i=n+(r.endsWith(".json")?o.slice(0,o.length-1):o).join("/");return i=r.startsWith("/")?"/"+i:i,{modelBaseUri:i,manifestUri:i==="/"?"/"+a:i+"/"+a}}function tg(r,e){return Q(this,void 0,void 0,function(){var t,n,o,a;return Z(this,function(i){switch(i.label){case 0:return t=yc(r,e),n=t.manifestUri,o=t.modelBaseUri,[4,Zm(n)];case 1:return a=i.sent(),[2,sc.loadWeights(a,o)]}})})}function eg(r,e,t){t===void 0&&(t=!1);var n=t?ai(e):e,o=n.width,a=n.height;return r.width=o,r.height=a,{width:o,height:a}}var Ke=function(){function r(e){this._name=e,this._params=void 0,this._paramMappings=[]}return Object.defineProperty(r.prototype,"params",{get:function(){return this._params},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"paramMappings",{get:function(){return this._paramMappings},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"isLoaded",{get:function(){return!!this.params},enumerable:!0,configurable:!0}),r.prototype.getParamFromPath=function(e){var t=this.traversePropertyPath(e),n=t.obj,o=t.objProp;return n[o]},r.prototype.reassignParamFromPath=function(e,t){var n=this.traversePropertyPath(e),o=n.obj,a=n.objProp;o[a].dispose(),o[a]=t},r.prototype.getParamList=function(){var e=this;return this._paramMappings.map(function(t){var n=t.paramPath;return{path:n,tensor:e.getParamFromPath(n)}})},r.prototype.getTrainableParams=function(){return this.getParamList().filter(function(e){return e.tensor instanceof qn})},r.prototype.getFrozenParams=function(){return this.getParamList().filter(function(e){return!(e.tensor instanceof qn)})},r.prototype.variable=function(){var e=this;this.getFrozenParams().forEach(function(t){var n=t.path,o=t.tensor;e.reassignParamFromPath(n,o.variable())})},r.prototype.freeze=function(){var e=this;this.getTrainableParams().forEach(function(t){var n=t.path,o=t.tensor,a=Gt(o.dataSync());o.dispose(),e.reassignParamFromPath(n,a)})},r.prototype.dispose=function(e){e===void 0&&(e=!0),this.getParamList().forEach(function(t){if(e&&t.tensor.isDisposed)throw new Error("param tensor has already been disposed for path "+t.path);t.tensor.dispose()}),this._params=void 0},r.prototype.serializeParams=function(){return new Float32Array(this.getParamList().map(function(e){var t=e.tensor;return Array.from(t.dataSync())}).reduce(function(e,t){return e.concat(t)}))},r.prototype.load=function(e){return Q(this,void 0,void 0,function(){return Z(this,function(t){switch(t.label){case 0:return e instanceof Float32Array?(this.extractWeights(e),[2]):[4,this.loadFromUri(e)];case 1:return t.sent(),[2]}})})},r.prototype.loadFromUri=function(e){return Q(this,void 0,void 0,function(){var t;return Z(this,function(n){switch(n.label){case 0:if(e&&typeof e!="string")throw new Error(this._name+".loadFromUri - expected model uri");return[4,tg(e,this.getDefaultModelName())];case 1:return t=n.sent(),this.loadFromWeightMap(t),[2]}})})},r.prototype.loadFromDisk=function(e){return Q(this,void 0,void 0,function(){var t,n,o,a,i,s,u,c,l,h;return Z(this,function(f){switch(f.label){case 0:if(e&&typeof e!="string")throw new Error(this._name+".loadFromDisk - expected model file path");return t=$t.getEnv().readFile,n=yc(e,this.getDefaultModelName()),o=n.manifestUri,a=n.modelBaseUri,i=function(p){return Promise.all(p.map(function(d){return t(d).then(function(m){return m.buffer})}))},s=sc.weightsLoaderFactory(i),l=(c=JSON).parse,[4,t(o)];case 1:return u=l.apply(c,[f.sent().toString()]),[4,s(u,a)];case 2:return h=f.sent(),this.loadFromWeightMap(h),[2]}})})},r.prototype.loadFromWeightMap=function(e){var t=this.extractParamsFromWeigthMap(e),n=t.paramMappings,o=t.params;this._paramMappings=n,this._params=o},r.prototype.extractWeights=function(e){var t=this.extractParams(e),n=t.paramMappings,o=t.params;this._paramMappings=n,this._params=o},r.prototype.traversePropertyPath=function(e){if(!this.params)throw new Error("traversePropertyPath - model has no loaded params");var t=e.split("/").reduce(function(a,i){if(!a.nextObj.hasOwnProperty(i))throw new Error("traversePropertyPath - object does not have property "+i+", for path "+e);return{obj:a.nextObj,objProp:i,nextObj:a.nextObj[i]}},{nextObj:this.params}),n=t.obj,o=t.objProp;if(!n||!o||!(n[o]instanceof Et))throw new Error("traversePropertyPath - parameter is not a tensor, for path "+e);return{obj:n,objProp:o}},r}();function ue(r,e,t){return K(function(){var n=Ga(r,e.depthwise_filter,e.pointwise_filter,t,"same");return n=ut(n,e.bias),n})}function ta(r,e,t){return t===void 0&&(t=!1),K(function(){var n=Rt(t?ut(de(r,e.conv0.filters,[2,2],"same"),e.conv0.bias):ue(r,e.conv0,[2,2])),o=ue(n,e.conv1,[1,1]),a=Rt(ut(n,o)),i=ue(a,e.conv2,[1,1]);return Rt(ut(n,ut(o,i)))})}function Nr(r,e,t,n){return t===void 0&&(t=!1),n===void 0&&(n=!0),K(function(){var o=Rt(t?ut(de(r,e.conv0.filters,n?[2,2]:[1,1],"same"),e.conv0.bias):ue(r,e.conv0,n?[2,2]:[1,1])),a=ue(o,e.conv1,[1,1]),i=Rt(ut(o,a)),s=ue(i,e.conv2,[1,1]),u=Rt(ut(o,ut(a,s))),c=ue(u,e.conv3,[1,1]);return Rt(ut(o,ut(a,ut(s,c))))})}function ge(r,e,t,n){return t===void 0&&(t="same"),n===void 0&&(n=!1),K(function(){var o=ut(de(r,e.filters,[1,1],t),e.bias);return n?Rt(o):o})}function Xe(r,e){Object.keys(r).forEach(function(t){e.some(function(n){return n.originalPath===t})||r[t].dispose()})}function bo(r,e){return function(t,n,o,a){var i=Jt(r(t*n*o*o),[o,o,t,n]),s=Tt(r(n));return e.push({paramPath:a+"/filters"},{paramPath:a+"/bias"}),{filters:i,bias:s}}}function ui(r,e){return function(t,n,o){var a=nn(r(t*n),[t,n]),i=Tt(r(n));return e.push({paramPath:o+"/weights"},{paramPath:o+"/bias"}),{weights:a,bias:i}}}var xc=function(){function r(e,t,n){this.depthwise_filter=e,this.pointwise_filter=t,this.bias=n}return r}();function ci(r,e){return function(t,n,o){var a=Jt(r(9*t),[3,3,t,1]),i=Jt(r(t*n),[1,1,t,n]),s=Tt(r(n));return e.push({paramPath:o+"/depthwise_filter"},{paramPath:o+"/pointwise_filter"},{paramPath:o+"/bias"}),new xc(a,i,s)}}function li(r){return function(e){var t=r(e+"/depthwise_filter",4),n=r(e+"/pointwise_filter",4),o=r(e+"/bias",1);return new xc(t,n,o)}}function cn(r,e){return function(t,n,o){var a=r[t];if(!mo(a,n))throw new Error("expected weightMap["+t+"] to be a Tensor"+n+"D, instead have "+a);return e.push({originalPath:t,paramPath:o||t}),a}}function Ye(r){var e=r;function t(o){var a=e.slice(0,o);return e=e.slice(o),a}function n(){return e}return{extractWeights:t,getRemainingWeights:n}}function bc(r,e){var t=bo(r,e),n=ci(r,e);function o(i,s,u,c){c===void 0&&(c=!1);var l=c?t(i,s,3,u+"/conv0"):n(i,s,u+"/conv0"),h=n(s,s,u+"/conv1"),f=n(s,s,u+"/conv2");return{conv0:l,conv1:h,conv2:f}}function a(i,s,u,c){c===void 0&&(c=!1);var l=o(i,s,u,c),h=l.conv0,f=l.conv1,p=l.conv2,d=n(s,s,u+"/conv3");return{conv0:h,conv1:f,conv2:p,conv3:d}}return{extractDenseBlock3Params:o,extractDenseBlock4Params:a}}function ng(r){var e=[],t=Ye(r),n=t.extractWeights,o=t.getRemainingWeights,a=bc(n,e).extractDenseBlock4Params,i=a(3,32,"dense0",!0),s=a(32,64,"dense1"),u=a(64,128,"dense2"),c=a(128,256,"dense3");if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:e,params:{dense0:i,dense1:s,dense2:u,dense3:c}}}function wc(r){return function(e){var t=r(e+"/filters",4),n=r(e+"/bias",1);return{filters:t,bias:n}}}function Cc(r,e){var t=cn(r,e),n=wc(t),o=li(t);function a(s,u){u===void 0&&(u=!1);var c=u?n(s+"/conv0"):o(s+"/conv0"),l=o(s+"/conv1"),h=o(s+"/conv2");return{conv0:c,conv1:l,conv2:h}}function i(s,u){u===void 0&&(u=!1);var c=u?n(s+"/conv0"):o(s+"/conv0"),l=o(s+"/conv1"),h=o(s+"/conv2"),f=o(s+"/conv3");return{conv0:c,conv1:l,conv2:h,conv3:f}}return{extractDenseBlock3Params:a,extractDenseBlock4Params:i}}function rg(r){var e=[],t=Cc(r,e).extractDenseBlock4Params,n={dense0:t("dense0",!0),dense1:t("dense1"),dense2:t("dense2"),dense3:t("dense3")};return Xe(r,e),{params:n,paramMappings:e}}var _c=function(r){rt(e,r);function e(){return r.call(this,"FaceFeatureExtractor")||this}return e.prototype.forwardInput=function(t){var n=this.params;if(!n)throw new Error("FaceFeatureExtractor - load model before inference");return K(function(){var o=t.toBatchTensor(112,!0),a=[122.782,117.001,104.298],i=br(o,a).div(q(255)),s=Nr(i,n.dense0,!0);return s=Nr(s,n.dense1),s=Nr(s,n.dense2),s=Nr(s,n.dense3),s=yr(s,[7,7],[2,2],"valid"),s})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.getDefaultModelName=function(){return"face_feature_extractor_model"},e.prototype.extractParamsFromWeigthMap=function(t){return rg(t)},e.prototype.extractParams=function(t){return ng(t)},e}(Ke);function Se(r,e){return K(function(){return ut(fo(r,e.weights),e.bias)})}function og(r,e,t){var n=[],o=Ye(r),a=o.extractWeights,i=o.getRemainingWeights,s=ui(a,n),u=s(e,t,"fc");if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{paramMappings:n,params:{fc:u}}}function ag(r){var e=[],t=cn(r,e);function n(a){var i=t(a+"/weights",2),s=t(a+"/bias",1);return{weights:i,bias:s}}var o={fc:n("fc")};return Xe(r,e),{params:o,paramMappings:e}}function Ec(r){var e={},t={};return Object.keys(r).forEach(function(n){var o=n.startsWith("fc")?t:e;o[n]=r[n]}),{featureExtractorMap:e,classifierMap:t}}var Rc=function(r){rt(e,r);function e(t,n){var o=r.call(this,t)||this;return o._faceFeatureExtractor=n,o}return Object.defineProperty(e.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),e.prototype.runNet=function(t){var n=this,o=this.params;if(!o)throw new Error(this._name+" - load model before inference");return K(function(){var a=t instanceof ro?n.faceFeatureExtractor.forwardInput(t):t;return Se(a.as2D(a.shape[0],-1),o.fc)})},e.prototype.dispose=function(t){t===void 0&&(t=!0),this.faceFeatureExtractor.dispose(t),r.prototype.dispose.call(this,t)},e.prototype.loadClassifierParams=function(t){var n=this.extractClassifierParams(t),o=n.params,a=n.paramMappings;this._params=o,this._paramMappings=a},e.prototype.extractClassifierParams=function(t){return og(t,this.getClassifierChannelsIn(),this.getClassifierChannelsOut())},e.prototype.extractParamsFromWeigthMap=function(t){var n=Ec(t),o=n.featureExtractorMap,a=n.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(o),ag(a)},e.prototype.extractParams=function(t){var n=this.getClassifierChannelsIn(),o=this.getClassifierChannelsOut(),a=o*n+o,i=t.slice(0,t.length-a),s=t.slice(t.length-a);return this.faceFeatureExtractor.extractWeights(i),this.extractClassifierParams(s)},e}(Ke),Is=["neutral","happy","sad","angry","fearful","disgusted","surprised"],ig=function(){function r(e){var t=this;if(e.length!==7)throw new Error("FaceExpressions.constructor - expected probabilities.length to be 7, have: "+e.length);Is.forEach(function(n,o){t[n]=e[o]})}return r.prototype.asSortedArray=function(){var e=this;return Is.map(function(t){return{expression:t,probability:e[t]}}).sort(function(t,n){return n.probability-t.probability})},r}(),sg=function(r){rt(e,r);function e(t){return t===void 0&&(t=new _c),r.call(this,"FaceExpressionNet",t)||this}return e.prototype.forwardInput=function(t){var n=this;return K(function(){return qe(n.runNet(t))})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.predictExpressions=function(t){return Q(this,void 0,void 0,function(){var n,o,a,i,s=this;return Z(this,function(u){switch(u.label){case 0:return[4,Ut(t)];case 1:return n=u.sent(),[4,this.forwardInput(n)];case 2:return o=u.sent(),[4,Promise.all(Pt(o).map(function(c){return Q(s,void 0,void 0,function(){var l;return Z(this,function(h){switch(h.label){case 0:return[4,c.data()];case 1:return l=h.sent(),c.dispose(),[2,l]}})})}))];case 3:return a=u.sent(),o.dispose(),i=a.map(function(c){return new ig(c)}),[2,n.isBatchInput?i:i[0]]}})})},e.prototype.getDefaultModelName=function(){return"face_expression_model"},e.prototype.getClassifierChannelsIn=function(){return 256},e.prototype.getClassifierChannelsOut=function(){return 7},e}(Rc);function Ic(r,e){var t={expressions:e};return Object.assign({},r,t)}function kc(r){return no(r)&&r.landmarks instanceof lr&&r.unshiftedLandmarks instanceof lr&&r.alignedRect instanceof le}function wo(r,e){var t=r.detection.box,n=e.shiftBy(t.x,t.y),o=n.align(),a=r.detection.imageDims,i=new le(r.detection.score,o.rescale(a.reverse()),a),s={landmarks:n,unshiftedLandmarks:e,alignedRect:i};return Object.assign({},r,s)}function ug(r,e){var t=bo(r,e),n=ci(r,e);function o(i,s,u){var c=n(i,s,u+"/separable_conv0"),l=n(s,s,u+"/separable_conv1"),h=t(i,s,1,u+"/expansion_conv");return{separable_conv0:c,separable_conv1:l,expansion_conv:h}}function a(i,s){var u=n(i,i,s+"/separable_conv0"),c=n(i,i,s+"/separable_conv1"),l=n(i,i,s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:t,extractSeparableConvParams:n,extractReductionBlockParams:o,extractMainBlockParams:a}}function cg(r,e){var t=[],n=Ye(r),o=n.extractWeights,a=n.getRemainingWeights,i=ug(o,t),s=i.extractConvParams,u=i.extractSeparableConvParams,c=i.extractReductionBlockParams,l=i.extractMainBlockParams,h=s(3,32,3,"entry_flow/conv_in"),f=c(32,64,"entry_flow/reduction_block_0"),p=c(64,128,"entry_flow/reduction_block_1"),d={conv_in:h,reduction_block_0:f,reduction_block_1:p},m={};ur(e,0,1).forEach(function(b){m["main_block_"+b]=l(128,"middle_flow/main_block_"+b)});var v=c(128,256,"exit_flow/reduction_block"),g=u(256,512,"exit_flow/separable_conv"),x={reduction_block:v,separable_conv:g};if(a().length!==0)throw new Error("weights remaing after extract: "+a().length);return{paramMappings:t,params:{entry_flow:d,middle_flow:m,exit_flow:x}}}function lg(r,e){var t=cn(r,e),n=wc(t),o=li(t);function a(s){var u=o(s+"/separable_conv0"),c=o(s+"/separable_conv1"),l=n(s+"/expansion_conv");return{separable_conv0:u,separable_conv1:c,expansion_conv:l}}function i(s){var u=o(s+"/separable_conv0"),c=o(s+"/separable_conv1"),l=o(s+"/separable_conv2");return{separable_conv0:u,separable_conv1:c,separable_conv2:l}}return{extractConvParams:n,extractSeparableConvParams:o,extractReductionBlockParams:a,extractMainBlockParams:i}}function hg(r,e){var t=[],n=lg(r,t),o=n.extractConvParams,a=n.extractSeparableConvParams,i=n.extractReductionBlockParams,s=n.extractMainBlockParams,u=o("entry_flow/conv_in"),c=i("entry_flow/reduction_block_0"),l=i("entry_flow/reduction_block_1"),h={conv_in:u,reduction_block_0:c,reduction_block_1:l},f={};ur(e,0,1).forEach(function(v){f["main_block_"+v]=s("middle_flow/main_block_"+v)});var p=i("exit_flow/reduction_block"),d=a("exit_flow/separable_conv"),m={reduction_block:p,separable_conv:d};return Xe(r,t),{params:{entry_flow:h,middle_flow:f,exit_flow:m},paramMappings:t}}function Sc(r,e,t){return ut(de(r,e.filters,t,"same"),e.bias)}function ea(r,e,t){t===void 0&&(t=!0);var n=t?Rt(r):r;return n=ue(n,e.separable_conv0,[1,1]),n=ue(Rt(n),e.separable_conv1,[1,1]),n=Lt(n,[3,3],[2,2],"same"),n=ut(n,Sc(r,e.expansion_conv,[2,2])),n}function fg(r,e){var t=ue(Rt(r),e.separable_conv0,[1,1]);return t=ue(Rt(t),e.separable_conv1,[1,1]),t=ue(Rt(t),e.separable_conv2,[1,1]),t=ut(t,r),t}var pg=function(r){rt(e,r);function e(t){var n=r.call(this,"TinyXception")||this;return n._numMainBlocks=t,n}return e.prototype.forwardInput=function(t){var n=this,o=this.params;if(!o)throw new Error("TinyXception - load model before inference");return K(function(){var a=t.toBatchTensor(112,!0),i=[122.782,117.001,104.298],s=br(a,i).div(q(256)),u=Rt(Sc(s,o.entry_flow.conv_in,[2,2]));return u=ea(u,o.entry_flow.reduction_block_0,!1),u=ea(u,o.entry_flow.reduction_block_1),ur(n._numMainBlocks,0,1).forEach(function(c){u=fg(u,o.middle_flow["main_block_"+c])}),u=ea(u,o.exit_flow.reduction_block),u=Rt(ue(u,o.exit_flow.separable_conv,[1,1])),u})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.getDefaultModelName=function(){return"tiny_xception_model"},e.prototype.extractParamsFromWeigthMap=function(t){return hg(t,this._numMainBlocks)},e.prototype.extractParams=function(t){return cg(t,this._numMainBlocks)},e}(Ke);function dg(r){var e=[],t=Ye(r),n=t.extractWeights,o=t.getRemainingWeights,a=ui(n,e),i=a(512,1,"fc/age"),s=a(512,2,"fc/gender");if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:e,params:{fc:{age:i,gender:s}}}}function vg(r){var e=[],t=cn(r,e);function n(a){var i=t(a+"/weights",2),s=t(a+"/bias",1);return{weights:i,bias:s}}var o={fc:{age:n("fc/age"),gender:n("fc/gender")}};return Xe(r,e),{params:o,paramMappings:e}}var oo;(function(r){r.FEMALE="female",r.MALE="male"})(oo||(oo={}));var mg=function(r){rt(e,r);function e(t){t===void 0&&(t=new pg(2));var n=r.call(this,"AgeGenderNet")||this;return n._faceFeatureExtractor=t,n}return Object.defineProperty(e.prototype,"faceFeatureExtractor",{get:function(){return this._faceFeatureExtractor},enumerable:!0,configurable:!0}),e.prototype.runNet=function(t){var n=this,o=this.params;if(!o)throw new Error(this._name+" - load model before inference");return K(function(){var a=t instanceof ro?n.faceFeatureExtractor.forwardInput(t):t,i=yr(a,[7,7],[2,2],"valid").as2D(a.shape[0],-1),s=Se(i,o.fc.age).as1D(),u=Se(i,o.fc.gender);return{age:s,gender:u}})},e.prototype.forwardInput=function(t){var n=this;return K(function(){var o=n.runNet(t),a=o.age,i=o.gender;return{age:a,gender:qe(i)}})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.predictAgeAndGender=function(t){return Q(this,void 0,void 0,function(){var n,o,a,i,s,u,c=this;return Z(this,function(l){switch(l.label){case 0:return[4,Ut(t)];case 1:return n=l.sent(),[4,this.forwardInput(n)];case 2:return o=l.sent(),a=Pt(o.age),i=Pt(o.gender),s=a.map(function(h,f){return{ageTensor:h,genderTensor:i[f]}}),[4,Promise.all(s.map(function(h){var f=h.ageTensor,p=h.genderTensor;return Q(c,void 0,void 0,function(){var d,m,v,g,x;return Z(this,function(b){switch(b.label){case 0:return[4,f.data()];case 1:return d=b.sent()[0],[4,p.data()];case 2:return m=b.sent()[0],v=m>.5,g=v?oo.MALE:oo.FEMALE,x=v?m:1-m,f.dispose(),p.dispose(),[2,{age:d,gender:g,genderProbability:x}]}})})}))];case 3:return u=l.sent(),o.age.dispose(),o.gender.dispose(),[2,n.isBatchInput?u:u[0]]}})})},e.prototype.getDefaultModelName=function(){return"age_gender_model"},e.prototype.dispose=function(t){t===void 0&&(t=!0),this.faceFeatureExtractor.dispose(t),r.prototype.dispose.call(this,t)},e.prototype.loadClassifierParams=function(t){var n=this.extractClassifierParams(t),o=n.params,a=n.paramMappings;this._params=o,this._paramMappings=a},e.prototype.extractClassifierParams=function(t){return dg(t)},e.prototype.extractParamsFromWeigthMap=function(t){var n=Ec(t),o=n.featureExtractorMap,a=n.classifierMap;return this.faceFeatureExtractor.loadFromWeightMap(o),vg(a)},e.prototype.extractParams=function(t){var n=1539,o=t.slice(0,t.length-n),a=t.slice(t.length-n);return this.faceFeatureExtractor.extractWeights(o),this.extractClassifierParams(a)},e}(Ke),Dc=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.postProcess=function(t,n,o){var a=o.map(function(s){var u=s.width,c=s.height,l=n/Math.max(c,u);return{width:u*l,height:c*l}}),i=a.length;return K(function(){var s=function(f,p){return ce([Te([68],f),Te([68],p)],1).as2D(1,136).as1D()},u=function(f,p){var d=a[f],m=d.width,v=d.height;return p(m,v)?Math.abs(m-v)/2:0},c=function(f){return u(f,function(p,d){return p<d})},l=function(f){return u(f,function(p,d){return d<p})},h=t.mul(Te([i,136],n)).sub(ce(Array.from(Array(i),function(f,p){return s(c(p),l(p))}))).div(ce(Array.from(Array(i),function(f,p){return s(a[p].width,a[p].height)})));return h})},e.prototype.forwardInput=function(t){var n=this;return K(function(){var o=n.runNet(t);return n.postProcess(o,t.inputSize,t.inputDimensions.map(function(a){var i=a[0],s=a[1];return{height:i,width:s}}))})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.detectLandmarks=function(t){return Q(this,void 0,void 0,function(){var n,o,a,i=this;return Z(this,function(s){switch(s.label){case 0:return[4,Ut(t)];case 1:return n=s.sent(),o=K(function(){return Pt(i.forwardInput(n))}),[4,Promise.all(o.map(function(u,c){return Q(i,void 0,void 0,function(){var l,h,f,p,d;return Z(this,function(m){switch(m.label){case 0:return f=(h=Array).from,[4,u.data()];case 1:return l=f.apply(h,[m.sent()]),p=l.filter(function(v,g){return bs(g)}),d=l.filter(function(v,g){return!bs(g)}),[2,new Vm(Array(68).fill(0).map(function(v,g){return new gt(p[g],d[g])}),{height:n.getInputHeight(c),width:n.getInputWidth(c)})]}})})}))];case 2:return a=s.sent(),o.forEach(function(u){return u.dispose()}),[2,n.isBatchInput?a:a[0]]}})})},e.prototype.getClassifierChannelsOut=function(){return 136},e}(Rc),Ac=function(r){rt(e,r);function e(t){return t===void 0&&(t=new _c),r.call(this,"FaceLandmark68Net",t)||this}return e.prototype.getDefaultModelName=function(){return"face_landmark_68_model"},e.prototype.getClassifierChannelsIn=function(){return 256},e}(Dc);function gg(r){var e=[],t=Cc(r,e).extractDenseBlock3Params,n={dense0:t("dense0",!0),dense1:t("dense1"),dense2:t("dense2")};return Xe(r,e),{params:n,paramMappings:e}}function yg(r){var e=[],t=Ye(r),n=t.extractWeights,o=t.getRemainingWeights,a=bc(n,e).extractDenseBlock3Params,i=a(3,32,"dense0",!0),s=a(32,64,"dense1"),u=a(64,128,"dense2");if(o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{paramMappings:e,params:{dense0:i,dense1:s,dense2:u}}}var xg=function(r){rt(e,r);function e(){return r.call(this,"TinyFaceFeatureExtractor")||this}return e.prototype.forwardInput=function(t){var n=this.params;if(!n)throw new Error("TinyFaceFeatureExtractor - load model before inference");return K(function(){var o=t.toBatchTensor(112,!0),a=[122.782,117.001,104.298],i=br(o,a).div(q(255)),s=ta(i,n.dense0,!0);return s=ta(s,n.dense1),s=ta(s,n.dense2),s=yr(s,[14,14],[2,2],"valid"),s})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.getDefaultModelName=function(){return"face_feature_extractor_tiny_model"},e.prototype.extractParamsFromWeigthMap=function(t){return gg(t)},e.prototype.extractParams=function(t){return yg(t)},e}(Ke),bg=function(r){rt(e,r);function e(t){return t===void 0&&(t=new xg),r.call(this,"FaceLandmark68TinyNet",t)||this}return e.prototype.getDefaultModelName=function(){return"face_landmark_68_tiny_model"},e.prototype.getClassifierChannelsIn=function(){return 128},e}(Dc);(function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e})(Ac);function wg(r,e){return ut(Xt(r,e.weights),e.biases)}function hi(r,e,t,n,o){o===void 0&&(o="same");var a=e.conv,i=a.filters,s=a.bias,u=de(r,i,t,o);return u=ut(u,s),u=wg(u,e.scale),n?Rt(u):u}function Cg(r,e){return hi(r,e,[1,1],!0)}function Tc(r,e){return hi(r,e,[1,1],!1)}function Nc(r,e){return hi(r,e,[2,2],!0,"valid")}function _g(r,e){function t(s,u,c){var l=r(s),h=l.length/(u*c*c);if(Fm(h))throw new Error("depth has to be an integer: "+h+", weights.length: "+l.length+", numFilters: "+u+", filterSize: "+c);return K(function(){return an(Jt(l,[u,h,c,c]),[2,3,1,0])})}function n(s,u,c,l){var h=t(s,u,c),f=Tt(r(u));return e.push({paramPath:l+"/filters"},{paramPath:l+"/bias"}),{filters:h,bias:f}}function o(s,u){var c=Tt(r(s)),l=Tt(r(s));return e.push({paramPath:u+"/weights"},{paramPath:u+"/biases"}),{weights:c,biases:l}}function a(s,u,c,l){var h=n(s,u,c,l+"/conv"),f=o(u,l+"/scale");return{conv:h,scale:f}}function i(s,u,c,l,h){h===void 0&&(h=!1);var f=a((h?.5:1)*s,u,c,l+"/conv1"),p=a(s,u,c,l+"/conv2");return{conv1:f,conv2:p}}return{extractConvLayerParams:a,extractResidualLayerParams:i}}function Eg(r){var e=Ye(r),t=e.extractWeights,n=e.getRemainingWeights,o=[],a=_g(t,o),i=a.extractConvLayerParams,s=a.extractResidualLayerParams,u=i(4704,32,7,"conv32_down"),c=s(9216,32,3,"conv32_1"),l=s(9216,32,3,"conv32_2"),h=s(9216,32,3,"conv32_3"),f=s(36864,64,3,"conv64_down",!0),p=s(36864,64,3,"conv64_1"),d=s(36864,64,3,"conv64_2"),m=s(36864,64,3,"conv64_3"),v=s(147456,128,3,"conv128_down",!0),g=s(147456,128,3,"conv128_1"),x=s(147456,128,3,"conv128_2"),b=s(589824,256,3,"conv256_down",!0),y=s(589824,256,3,"conv256_1"),w=s(589824,256,3,"conv256_2"),C=s(589824,256,3,"conv256_down_out"),k=K(function(){return an(nn(t(256*128),[128,256]),[1,0])});if(o.push({paramPath:"fc"}),n().length!==0)throw new Error("weights remaing after extract: "+n().length);var S={conv32_down:u,conv32_1:c,conv32_2:l,conv32_3:h,conv64_down:f,conv64_1:p,conv64_2:d,conv64_3:m,conv128_down:v,conv128_1:g,conv128_2:x,conv256_down:b,conv256_1:y,conv256_2:w,conv256_down_out:C,fc:k};return{params:S,paramMappings:o}}function Rg(r,e){var t=cn(r,e);function n(i){var s=t(i+"/scale/weights",1),u=t(i+"/scale/biases",1);return{weights:s,biases:u}}function o(i){var s=t(i+"/conv/filters",4),u=t(i+"/conv/bias",1),c=n(i);return{conv:{filters:s,bias:u},scale:c}}function a(i){return{conv1:o(i+"/conv1"),conv2:o(i+"/conv2")}}return{extractConvLayerParams:o,extractResidualLayerParams:a}}function Ig(r){var e=[],t=Rg(r,e),n=t.extractConvLayerParams,o=t.extractResidualLayerParams,a=n("conv32_down"),i=o("conv32_1"),s=o("conv32_2"),u=o("conv32_3"),c=o("conv64_down"),l=o("conv64_1"),h=o("conv64_2"),f=o("conv64_3"),p=o("conv128_down"),d=o("conv128_1"),m=o("conv128_2"),v=o("conv256_down"),g=o("conv256_1"),x=o("conv256_2"),b=o("conv256_down_out"),y=r.fc;if(e.push({originalPath:"fc",paramPath:"fc"}),!Nm(y))throw new Error("expected weightMap[fc] to be a Tensor2D, instead have "+y);var w={conv32_down:a,conv32_1:i,conv32_2:s,conv32_3:u,conv64_down:c,conv64_1:l,conv64_2:h,conv64_3:f,conv128_down:p,conv128_1:d,conv128_2:m,conv256_down:v,conv256_1:g,conv256_2:x,conv256_down_out:b,fc:y};return Xe(r,e),{params:w,paramMappings:e}}function _e(r,e){var t=Cg(r,e.conv1);return t=Tc(t,e.conv2),t=ut(t,r),t=Rt(t),t}function Fr(r,e){var t=Nc(r,e.conv1);t=Tc(t,e.conv2);var n=yr(r,2,2,"valid"),o=wt(n.shape),a=n.shape[3]!==t.shape[3],i=n.shape[1]!==t.shape[1]||n.shape[2]!==t.shape[2];if(i){var s=nr(t.shape);s[1]=1;var u=wt(s);t=Ft([t,u],1);var c=nr(t.shape);c[2]=1;var l=wt(c);t=Ft([t,l],2)}return n=a?Ft([n,o],3):n,t=ut(n,t),t=Rt(t),t}var kg=function(r){rt(e,r);function e(){return r.call(this,"FaceRecognitionNet")||this}return e.prototype.forwardInput=function(t){var n=this.params;if(!n)throw new Error("FaceRecognitionNet - load model before inference");return K(function(){var o=t.toBatchTensor(150,!0).toFloat(),a=[122.782,117.001,104.298],i=br(o,a).div(q(256)),s=Nc(i,n.conv32_down);s=Lt(s,3,2,"valid"),s=_e(s,n.conv32_1),s=_e(s,n.conv32_2),s=_e(s,n.conv32_3),s=Fr(s,n.conv64_down),s=_e(s,n.conv64_1),s=_e(s,n.conv64_2),s=_e(s,n.conv64_3),s=Fr(s,n.conv128_down),s=_e(s,n.conv128_1),s=_e(s,n.conv128_2),s=Fr(s,n.conv256_down),s=_e(s,n.conv256_1),s=_e(s,n.conv256_2),s=Fr(s,n.conv256_down_out);var u=s.mean([1,2]),c=fo(u,n.fc);return c})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.computeFaceDescriptor=function(t){return Q(this,void 0,void 0,function(){var n,o,a,i=this;return Z(this,function(s){switch(s.label){case 0:return[4,Ut(t)];case 1:return n=s.sent(),o=K(function(){return Pt(i.forwardInput(n))}),[4,Promise.all(o.map(function(u){return u.data()}))];case 2:return a=s.sent(),o.forEach(function(u){return u.dispose()}),[2,n.isBatchInput?a:a[0]]}})})},e.prototype.getDefaultModelName=function(){return"face_recognition_model"},e.prototype.extractParamsFromWeigthMap=function(t){return Ig(t)},e.prototype.extractParams=function(t){return Eg(t)},e}(Ke);function Fc(r,e){var t={descriptor:e};return Object.assign({},r,t)}function Pc(r,e){var t={age:e};return Object.assign({},r,t)}function Mc(r,e,t){var n={gender:e,genderProbability:t};return Object.assign({},r,n)}var Oc=function(){function r(e){var t=e===void 0?{}:e,n=t.minFaceSize,o=t.scaleFactor,a=t.maxNumScales,i=t.scoreThresholds,s=t.scaleSteps;if(this._name="MtcnnOptions",this._minFaceSize=n||20,this._scaleFactor=o||.709,this._maxNumScales=a||10,this._scoreThresholds=i||[.6,.7,.7],this._scaleSteps=s,typeof this._minFaceSize!="number"||this._minFaceSize<0)throw new Error(this._name+" - expected minFaceSize to be a number > 0");if(typeof this._scaleFactor!="number"||this._scaleFactor<=0||this._scaleFactor>=1)throw new Error(this._name+" - expected scaleFactor to be a number between 0 and 1");if(typeof this._maxNumScales!="number"||this._maxNumScales<0)throw new Error(this._name+" - expected maxNumScales to be a number > 0");if(!Array.isArray(this._scoreThresholds)||this._scoreThresholds.length!==3||this._scoreThresholds.some(function(u){return typeof u!="number"}))throw new Error(this._name+" - expected scoreThresholds to be an array of numbers of length 3");if(this._scaleSteps&&(!Array.isArray(this._scaleSteps)||this._scaleSteps.some(function(u){return typeof u!="number"})))throw new Error(this._name+" - expected scaleSteps to be an array of numbers")}return Object.defineProperty(r.prototype,"minFaceSize",{get:function(){return this._minFaceSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scaleFactor",{get:function(){return this._scaleFactor},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxNumScales",{get:function(){return this._maxNumScales},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scoreThresholds",{get:function(){return this._scoreThresholds},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scaleSteps",{get:function(){return this._scaleSteps},enumerable:!0,configurable:!0}),r}();function Sg(r,e){function t(u,c){var l=Jt(r(9*u),[3,3,u,1]),h=Tt(r(u)),f=Tt(r(u)),p=Tt(r(u)),d=Tt(r(u));return e.push({paramPath:c+"/filters"},{paramPath:c+"/batch_norm_scale"},{paramPath:c+"/batch_norm_offset"},{paramPath:c+"/batch_norm_mean"},{paramPath:c+"/batch_norm_variance"}),{filters:l,batch_norm_scale:h,batch_norm_offset:f,batch_norm_mean:p,batch_norm_variance:d}}function n(u,c,l,h,f){var p=Jt(r(u*c*l*l),[l,l,u,c]),d=Tt(r(c));return e.push({paramPath:h+"/filters"},{paramPath:h+"/"+(f?"batch_norm_offset":"bias")}),{filters:p,bias:d}}function o(u,c,l,h){var f=n(u,c,l,h,!0),p=f.filters,d=f.bias;return{filters:p,batch_norm_offset:d}}function a(u,c,l){var h=t(u,l+"/depthwise_conv"),f=o(u,c,1,l+"/pointwise_conv");return{depthwise_conv:h,pointwise_conv:f}}function i(){var u=o(3,32,3,"mobilenetv1/conv_0"),c=a(32,64,"mobilenetv1/conv_1"),l=a(64,128,"mobilenetv1/conv_2"),h=a(128,128,"mobilenetv1/conv_3"),f=a(128,256,"mobilenetv1/conv_4"),p=a(256,256,"mobilenetv1/conv_5"),d=a(256,512,"mobilenetv1/conv_6"),m=a(512,512,"mobilenetv1/conv_7"),v=a(512,512,"mobilenetv1/conv_8"),g=a(512,512,"mobilenetv1/conv_9"),x=a(512,512,"mobilenetv1/conv_10"),b=a(512,512,"mobilenetv1/conv_11"),y=a(512,1024,"mobilenetv1/conv_12"),w=a(1024,1024,"mobilenetv1/conv_13");return{conv_0:u,conv_1:c,conv_2:l,conv_3:h,conv_4:f,conv_5:p,conv_6:d,conv_7:m,conv_8:v,conv_9:g,conv_10:x,conv_11:b,conv_12:y,conv_13:w}}function s(){var u=o(1024,256,1,"prediction_layer/conv_0"),c=o(256,512,3,"prediction_layer/conv_1"),l=o(512,128,1,"prediction_layer/conv_2"),h=o(128,256,3,"prediction_layer/conv_3"),f=o(256,128,1,"prediction_layer/conv_4"),p=o(128,256,3,"prediction_layer/conv_5"),d=o(256,64,1,"prediction_layer/conv_6"),m=o(64,128,3,"prediction_layer/conv_7"),v=n(512,12,1,"prediction_layer/box_predictor_0/box_encoding_predictor"),g=n(512,9,1,"prediction_layer/box_predictor_0/class_predictor"),x=n(1024,24,1,"prediction_layer/box_predictor_1/box_encoding_predictor"),b=n(1024,18,1,"prediction_layer/box_predictor_1/class_predictor"),y=n(512,24,1,"prediction_layer/box_predictor_2/box_encoding_predictor"),w=n(512,18,1,"prediction_layer/box_predictor_2/class_predictor"),C=n(256,24,1,"prediction_layer/box_predictor_3/box_encoding_predictor"),k=n(256,18,1,"prediction_layer/box_predictor_3/class_predictor"),S=n(256,24,1,"prediction_layer/box_predictor_4/box_encoding_predictor"),R=n(256,18,1,"prediction_layer/box_predictor_4/class_predictor"),I=n(128,24,1,"prediction_layer/box_predictor_5/box_encoding_predictor"),N=n(128,18,1,"prediction_layer/box_predictor_5/class_predictor"),A={box_encoding_predictor:v,class_predictor:g},L={box_encoding_predictor:x,class_predictor:b},O={box_encoding_predictor:y,class_predictor:w},B={box_encoding_predictor:C,class_predictor:k},z={box_encoding_predictor:S,class_predictor:R},U={box_encoding_predictor:I,class_predictor:N};return{conv_0:u,conv_1:c,conv_2:l,conv_3:h,conv_4:f,conv_5:p,conv_6:d,conv_7:m,box_predictor_0:A,box_predictor_1:L,box_predictor_2:O,box_predictor_3:B,box_predictor_4:z,box_predictor_5:U}}return{extractMobilenetV1Params:i,extractPredictionLayerParams:s}}function Dg(r){var e=[],t=Ye(r),n=t.extractWeights,o=t.getRemainingWeights,a=Sg(n,e),i=a.extractMobilenetV1Params,s=a.extractPredictionLayerParams,u=i(),c=s(),l=Sa(n(5118*4),[1,5118,4]),h={extra_dim:l};if(e.push({paramPath:"output_layer/extra_dim"}),o().length!==0)throw new Error("weights remaing after extract: "+o().length);return{params:{mobilenetv1:u,prediction_layer:c,output_layer:h},paramMappings:e}}function Ag(r,e){var t=cn(r,e);function n(c,l,h){var f=t(c+"/Conv2d_"+l+"_pointwise/weights",4,h+"/filters"),p=t(c+"/Conv2d_"+l+"_pointwise/convolution_bn_offset",1,h+"/batch_norm_offset");return{filters:f,batch_norm_offset:p}}function o(c){var l="mobilenetv1/conv_"+c,h="MobilenetV1/Conv2d_"+c+"_depthwise",f=l+"/depthwise_conv",p=l+"/pointwise_conv",d=t(h+"/depthwise_weights",4,f+"/filters"),m=t(h+"/BatchNorm/gamma",1,f+"/batch_norm_scale"),v=t(h+"/BatchNorm/beta",1,f+"/batch_norm_offset"),g=t(h+"/BatchNorm/moving_mean",1,f+"/batch_norm_mean"),x=t(h+"/BatchNorm/moving_variance",1,f+"/batch_norm_variance");return{depthwise_conv:{filters:d,batch_norm_scale:m,batch_norm_offset:v,batch_norm_mean:g,batch_norm_variance:x},pointwise_conv:n("MobilenetV1",c,p)}}function a(){return{conv_0:n("MobilenetV1",0,"mobilenetv1/conv_0"),conv_1:o(1),conv_2:o(2),conv_3:o(3),conv_4:o(4),conv_5:o(5),conv_6:o(6),conv_7:o(7),conv_8:o(8),conv_9:o(9),conv_10:o(10),conv_11:o(11),conv_12:o(12),conv_13:o(13)}}function i(c,l){var h=t(c+"/weights",4,l+"/filters"),f=t(c+"/biases",1,l+"/bias");return{filters:h,bias:f}}function s(c){var l=i("Prediction/BoxPredictor_"+c+"/BoxEncodingPredictor","prediction_layer/box_predictor_"+c+"/box_encoding_predictor"),h=i("Prediction/BoxPredictor_"+c+"/ClassPredictor","prediction_layer/box_predictor_"+c+"/class_predictor");return{box_encoding_predictor:l,class_predictor:h}}function u(){return{conv_0:n("Prediction",0,"prediction_layer/conv_0"),conv_1:n("Prediction",1,"prediction_layer/conv_1"),conv_2:n("Prediction",2,"prediction_layer/conv_2"),conv_3:n("Prediction",3,"prediction_layer/conv_3"),conv_4:n("Prediction",4,"prediction_layer/conv_4"),conv_5:n("Prediction",5,"prediction_layer/conv_5"),conv_6:n("Prediction",6,"prediction_layer/conv_6"),conv_7:n("Prediction",7,"prediction_layer/conv_7"),box_predictor_0:s(0),box_predictor_1:s(1),box_predictor_2:s(2),box_predictor_3:s(3),box_predictor_4:s(4),box_predictor_5:s(5)}}return{extractMobilenetV1Params:a,extractPredictionLayerParams:u}}function Tg(r){var e=[],t=Ag(r,e),n=t.extractMobilenetV1Params,o=t.extractPredictionLayerParams,a=r["Output/extra_dim"];if(e.push({originalPath:"Output/extra_dim",paramPath:"output_layer/extra_dim"}),!go(a))throw new Error("expected weightMap['Output/extra_dim'] to be a Tensor3D, instead have "+a);var i={mobilenetv1:n(),prediction_layer:o(),output_layer:{extra_dim:a}};return Xe(r,e),{params:i,paramMappings:e}}function Ee(r,e,t){return K(function(){var n=de(r,e.filters,t,"same");return n=ut(n,e.batch_norm_offset),Wa(n,0,6)})}var Ng=.0010000000474974513;function Fg(r,e,t){return K(function(){var n=ho(r,e.filters,t,"same");return n=Du(n,e.batch_norm_mean,e.batch_norm_variance,e.batch_norm_offset,e.batch_norm_scale,Ng),Wa(n,0,6)})}function Pg(r){return[2,4,6,12].some(function(e){return e===r})?[2,2]:[1,1]}function Mg(r,e){return K(function(){var t=null,n=Ee(r,e.conv_0,[2,2]),o=[e.conv_1,e.conv_2,e.conv_3,e.conv_4,e.conv_5,e.conv_6,e.conv_7,e.conv_8,e.conv_9,e.conv_10,e.conv_11,e.conv_12,e.conv_13];if(o.forEach(function(a,i){var s=i+1,u=Pg(s);n=Fg(n,a.depthwise_conv,u),n=Ee(n,a.pointwise_conv,[1,1]),s===11&&(t=n)}),t===null)throw new Error("mobileNetV1 - output of conv layer 11 is null");return{out:n,conv11:t}})}function Og(r,e,t,n,o){var a=r.shape[0],i=Math.min(t,a),s=e.map(function(l,h){return{score:l,boxIndex:h}}).filter(function(l){return l.score>o}).sort(function(l,h){return h.score-l.score}),u=function(l){return l<=n?1:0},c=[];return s.forEach(function(l){if(!(c.length>=i)){for(var h=l.score,f=c.length-1;f>=0;--f){var p=Bg(r,l.boxIndex,c[f]);if(p!==0&&(l.score*=u(p),l.score<=o))break}h===l.score&&c.push(l.boxIndex)}}),c}function Bg(r,e,t){var n=r.arraySync(),o=Math.min(n[e][0],n[e][2]),a=Math.min(n[e][1],n[e][3]),i=Math.max(n[e][0],n[e][2]),s=Math.max(n[e][1],n[e][3]),u=Math.min(n[t][0],n[t][2]),c=Math.min(n[t][1],n[t][3]),l=Math.max(n[t][0],n[t][2]),h=Math.max(n[t][1],n[t][3]),f=(i-o)*(s-a),p=(l-u)*(h-c);if(f<=0||p<=0)return 0;var d=Math.max(o,u),m=Math.max(a,c),v=Math.min(i,l),g=Math.min(s,h),x=Math.max(v-d,0)*Math.max(g-m,0);return x/(f+p-x)}function Lg(r){var e=Pt(an(r,[1,0])),t=[Ot(e[2],e[0]),Ot(e[3],e[1])],n=[ut(e[0],ve(t[0],q(2))),ut(e[1],ve(t[1],q(2)))];return{sizes:t,centers:n}}function Wg(r,e){var t=Lg(r),n=t.sizes,o=t.centers,a=Pt(an(e,[1,0])),i=ve(Xt(ma(ve(a[2],q(5))),n[0]),q(2)),s=ut(Xt(ve(a[0],q(10)),n[0]),o[0]),u=ve(Xt(ma(ve(a[3],q(5))),n[1]),q(2)),c=ut(Xt(ve(a[1],q(10)),n[1]),o[1]);return an(ce([Ot(s,i),Ot(c,u),ut(s,i),ut(c,u)]),[1,0])}function Ug(r,e,t){return K(function(){var n=r.shape[0],o=Wg(me(Bn(t.extra_dim,[n,1,1]),[-1,4]),me(r,[-1,4]));o=me(o,[n,o.shape[0]/n,4]);var a=Ru(Ne(e,[0,0,1],[-1,-1,-1])),i=Ne(a,[0,0,0],[-1,-1,1]);i=me(i,[n,i.shape[1]]);var s=Pt(o),u=Pt(i);return{boxes:s,scores:u}})}function Tn(r,e){return K(function(){var t=r.shape[0],n=me(ge(r,e.box_encoding_predictor),[t,-1,1,4]),o=me(ge(r,e.class_predictor),[t,-1,3]);return{boxPredictionEncoding:n,classPrediction:o}})}function zg(r,e,t){return K(function(){var n=Ee(r,t.conv_0,[1,1]),o=Ee(n,t.conv_1,[2,2]),a=Ee(o,t.conv_2,[1,1]),i=Ee(a,t.conv_3,[2,2]),s=Ee(i,t.conv_4,[1,1]),u=Ee(s,t.conv_5,[2,2]),c=Ee(u,t.conv_6,[1,1]),l=Ee(c,t.conv_7,[2,2]),h=Tn(e,t.box_predictor_0),f=Tn(r,t.box_predictor_1),p=Tn(o,t.box_predictor_2),d=Tn(i,t.box_predictor_3),m=Tn(u,t.box_predictor_4),v=Tn(l,t.box_predictor_5),g=Ft([h.boxPredictionEncoding,f.boxPredictionEncoding,p.boxPredictionEncoding,d.boxPredictionEncoding,m.boxPredictionEncoding,v.boxPredictionEncoding],1),x=Ft([h.classPrediction,f.classPrediction,p.classPrediction,d.classPrediction,m.classPrediction,v.classPrediction],1);return{boxPredictions:g,classPredictions:x}})}var Co=function(){function r(e){var t=e===void 0?{}:e,n=t.minConfidence,o=t.maxResults;if(this._name="SsdMobilenetv1Options",this._minConfidence=n||.5,this._maxResults=o||100,typeof this._minConfidence!="number"||this._minConfidence<=0||this._minConfidence>=1)throw new Error(this._name+" - expected minConfidence to be a number between 0 and 1");if(typeof this._maxResults!="number")throw new Error(this._name+" - expected maxResults to be a number")}return Object.defineProperty(r.prototype,"minConfidence",{get:function(){return this._minConfidence},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maxResults",{get:function(){return this._maxResults},enumerable:!0,configurable:!0}),r}(),Bc=function(r){rt(e,r);function e(){return r.call(this,"SsdMobilenetv1")||this}return e.prototype.forwardInput=function(t){var n=this.params;if(!n)throw new Error("SsdMobilenetv1 - load model before inference");return K(function(){var o=t.toBatchTensor(512,!1).toFloat(),a=Ot(Xt(o,q(.007843137718737125)),q(1)),i=Mg(a,n.mobilenetv1),s=zg(i.out,i.conv11,n.prediction_layer),u=s.boxPredictions,c=s.classPredictions;return Ug(u,c,n.output_layer)})},e.prototype.forward=function(t){return Q(this,void 0,void 0,function(){var n;return Z(this,function(o){switch(o.label){case 0:return n=this.forwardInput,[4,Ut(t)];case 1:return[2,n.apply(this,[o.sent()])]}})})},e.prototype.locateFaces=function(t,n){return n===void 0&&(n={}),Q(this,void 0,void 0,function(){var o,a,i,s,u,c,l,h,f,p,d,m,v,g,x,b,y,w,C,k,S;return Z(this,function(R){switch(R.label){case 0:return o=new Co(n),a=o.maxResults,i=o.minConfidence,[4,Ut(t)];case 1:for(s=R.sent(),u=this.forwardInput(s),c=u.boxes,l=u.scores,h=c[0],f=l[0],p=1;p<c.length;p++)c[p].dispose(),l[p].dispose();return v=(m=Array).from,[4,f.data()];case 2:return d=v.apply(m,[R.sent()]),g=.5,x=Og(h,d,a,g,i),b=s.getReshapedInputDimensions(0),y=s.inputSize,w=y/b.width,C=y/b.height,k=h.arraySync(),S=x.map(function(I){var N=[Math.max(0,k[I][0]),Math.min(1,k[I][2])].map(function(U){return U*C}),A=N[0],L=N[1],O=[Math.max(0,k[I][1]),Math.min(1,k[I][3])].map(function(U){return U*w}),B=O[0],z=O[1];return new le(d[I],new ni(B,A,z-B,L-A),{height:s.getInputHeight(0),width:s.getInputWidth(0)})}),h.dispose(),f.dispose(),[2,S]}})})},e.prototype.getDefaultModelName=function(){return"ssd_mobilenetv1_model"},e.prototype.extractParamsFromWeigthMap=function(t){return Tg(t)},e.prototype.extractParams=function(t){return Dg(t)},e}(Ke);(function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e})(Bc);var Vg=.4,Gg=[new gt(.738768,.874946),new gt(2.42204,2.65704),new gt(4.30971,7.04493),new gt(10.246,4.59428),new gt(12.6868,11.8741)],Hg=[new gt(1.603231,2.094468),new gt(6.041143,7.080126),new gt(2.882459,3.518061),new gt(4.266906,5.178857),new gt(9.041765,10.66308)],qg=[117.001,114.697,97.404],jg="tiny_yolov2_model",Kg="tiny_yolov2_separable_conv_model",Pr=function(r){return typeof r=="number"};function Xg(r){if(!r)throw new Error("invalid config: "+r);if(typeof r.withSeparableConvs!="boolean")throw new Error("config.withSeparableConvs has to be a boolean, have: "+r.withSeparableConvs);if(!Pr(r.iouThreshold)||r.iouThreshold<0||r.iouThreshold>1)throw new Error("config.iouThreshold has to be a number between [0, 1], have: "+r.iouThreshold);if(!Array.isArray(r.classes)||!r.classes.length||!r.classes.every(function(e){return typeof e=="string"}))throw new Error("config.classes has to be an array class names: string[], have: "+JSON.stringify(r.classes));if(!Array.isArray(r.anchors)||!r.anchors.length||!r.anchors.map(function(e){return e||{}}).every(function(e){return Pr(e.x)&&Pr(e.y)}))throw new Error("config.anchors has to be an array of { x: number, y: number }, have: "+JSON.stringify(r.anchors));if(r.meanRgb&&(!Array.isArray(r.meanRgb)||r.meanRgb.length!==3||!r.meanRgb.every(Pr)))throw new Error("config.meanRgb has to be an array of shape [number, number, number], have: "+JSON.stringify(r.meanRgb))}function fi(r){return K(function(){var e=Xt(r,q(.10000000149011612));return ut(Rt(Ot(r,e)),e)})}function Je(r,e){return K(function(){var t=wn(r,[[0,0],[1,1],[1,1],[0,0]]);return t=de(t,e.conv.filters,[1,1],"valid"),t=Ot(t,e.bn.sub),t=Xt(t,e.bn.truediv),t=ut(t,e.conv.bias),fi(t)})}function Qe(r,e){return K(function(){var t=wn(r,[[0,0],[1,1],[1,1],[0,0]]);return t=Ga(t,e.depthwise_filter,e.pointwise_filter,[1,1],"valid"),t=ut(t,e.bias),fi(t)})}function Yg(r,e){var t=bo(r,e);function n(i,s){var u=Tt(r(i)),c=Tt(r(i));return e.push({paramPath:s+"/sub"},{paramPath:s+"/truediv"}),{sub:u,truediv:c}}function o(i,s,u){var c=t(i,s,3,u+"/conv"),l=n(s,u+"/bn");return{conv:c,bn:l}}var a=ci(r,e);return{extractConvParams:t,extractConvWithBatchNormParams:o,extractSeparableConvParams:a}}function $g(r,e,t,n){var o=Ye(r),a=o.extractWeights,i=o.getRemainingWeights,s=[],u=Yg(a,s),c=u.extractConvParams,l=u.extractConvWithBatchNormParams,h=u.extractSeparableConvParams,f;if(e.withSeparableConvs){var p=n[0],d=n[1],m=n[2],v=n[3],g=n[4],x=n[5],b=n[6],y=n[7],w=n[8],C=e.isFirstLayerConv2d?c(p,d,3,"conv0"):h(p,d,"conv0"),k=h(d,m,"conv1"),S=h(m,v,"conv2"),R=h(v,g,"conv3"),I=h(g,x,"conv4"),N=h(x,b,"conv5"),A=y?h(b,y,"conv6"):void 0,L=w?h(y,w,"conv7"):void 0,O=c(w||y||b,5*t,1,"conv8");f={conv0:C,conv1:k,conv2:S,conv3:R,conv4:I,conv5:N,conv6:A,conv7:L,conv8:O}}else{var p=n[0],d=n[1],m=n[2],v=n[3],g=n[4],x=n[5],b=n[6],y=n[7],w=n[8],C=l(p,d,"conv0"),k=l(d,m,"conv1"),S=l(m,v,"conv2"),R=l(v,g,"conv3"),I=l(g,x,"conv4"),N=l(x,b,"conv5"),A=l(b,y,"conv6"),L=l(y,w,"conv7"),O=c(w,5*t,1,"conv8");f={conv0:C,conv1:k,conv2:S,conv3:R,conv4:I,conv5:N,conv6:A,conv7:L,conv8:O}}if(i().length!==0)throw new Error("weights remaing after extract: "+i().length);return{params:f,paramMappings:s}}function Jg(r,e){var t=cn(r,e);function n(s){var u=t(s+"/sub",1),c=t(s+"/truediv",1);return{sub:u,truediv:c}}function o(s){var u=t(s+"/filters",4),c=t(s+"/bias",1);return{filters:u,bias:c}}function a(s){var u=o(s+"/conv"),c=n(s+"/bn");return{conv:u,bn:c}}var i=li(t);return{extractConvParams:o,extractConvWithBatchNormParams:a,extractSeparableConvParams:i}}function Qg(r,e){var t=[],n=Jg(r,t),o=n.extractConvParams,a=n.extractConvWithBatchNormParams,i=n.extractSeparableConvParams,s;if(e.withSeparableConvs){var u=e.filterSizes&&e.filterSizes.length||9;s={conv0:e.isFirstLayerConv2d?o("conv0"):i("conv0"),conv1:i("conv1"),conv2:i("conv2"),conv3:i("conv3"),conv4:i("conv4"),conv5:i("conv5"),conv6:u>7?i("conv6"):void 0,conv7:u>8?i("conv7"):void 0,conv8:o("conv8")}}else s={conv0:a("conv0"),conv1:a("conv1"),conv2:a("conv2"),conv3:a("conv3"),conv4:a("conv4"),conv5:a("conv5"),conv6:a("conv6"),conv7:a("conv7"),conv8:o("conv8")};return Xe(r,t),{params:s,paramMappings:t}}var ks;(function(r){r[r.XS=224]="XS",r[r.SM=320]="SM",r[r.MD=416]="MD",r[r.LG=608]="LG"})(ks||(ks={}));var pi=function(){function r(e){var t=e===void 0?{}:e,n=t.inputSize,o=t.scoreThreshold;if(this._name="TinyYolov2Options",this._inputSize=n||416,this._scoreThreshold=o||.5,typeof this._inputSize!="number"||this._inputSize%32!==0)throw new Error(this._name+" - expected inputSize to be a number divisible by 32");if(typeof this._scoreThreshold!="number"||this._scoreThreshold<=0||this._scoreThreshold>=1)throw new Error(this._name+" - expected scoreThreshold to be a number between 0 and 1")}return Object.defineProperty(r.prototype,"inputSize",{get:function(){return this._inputSize},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"scoreThreshold",{get:function(){return this._scoreThreshold},enumerable:!0,configurable:!0}),r}(),Lc=function(r){rt(e,r);function e(t){var n=r.call(this,"TinyYolov2")||this;return Xg(t),n._config=t,n}return Object.defineProperty(e.prototype,"config",{get:function(){return this._config},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"withClassScores",{get:function(){return this.config.withClassScores||this.config.classes.length>1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"boxEncodingSize",{get:function(){return 5+(this.withClassScores?this.config.classes.length:0)},enumerable:!0,configurable:!0}),e.prototype.runTinyYolov2=function(t,n){var o=Je(t,n.conv0);return o=Lt(o,[2,2],[2,2],"same"),o=Je(o,n.conv1),o=Lt(o,[2,2],[2,2],"same"),o=Je(o,n.conv2),o=Lt(o,[2,2],[2,2],"same"),o=Je(o,n.conv3),o=Lt(o,[2,2],[2,2],"same"),o=Je(o,n.conv4),o=Lt(o,[2,2],[2,2],"same"),o=Je(o,n.conv5),o=Lt(o,[2,2],[1,1],"same"),o=Je(o,n.conv6),o=Je(o,n.conv7),ge(o,n.conv8,"valid",!1)},e.prototype.runMobilenet=function(t,n){var o=this.config.isFirstLayerConv2d?fi(ge(t,n.conv0,"valid",!1)):Qe(t,n.conv0);return o=Lt(o,[2,2],[2,2],"same"),o=Qe(o,n.conv1),o=Lt(o,[2,2],[2,2],"same"),o=Qe(o,n.conv2),o=Lt(o,[2,2],[2,2],"same"),o=Qe(o,n.conv3),o=Lt(o,[2,2],[2,2],"same"),o=Qe(o,n.conv4),o=Lt(o,[2,2],[2,2],"same"),o=Qe(o,n.conv5),o=Lt(o,[2,2],[1,1],"same"),o=n.conv6?Qe(o,n.conv6):o,o=n.conv7?Qe(o,n.conv7):o,ge(o,n.conv8,"valid",!1)},e.prototype.forwardInput=function(t,n){var o=this,a=this.params;if(!a)throw new Error("TinyYolov2 - load model before inference");return K(function(){var i=t.toBatchTensor(n,!1).toFloat();return i=o.config.meanRgb?br(i,o.config.meanRgb):i,i=i.div(q(256)),o.config.withSeparableConvs?o.runMobilenet(i,a):o.runTinyYolov2(i,a)})},e.prototype.forward=function(t,n){return Q(this,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return o=this.forwardInput,[4,Ut(t)];case 1:return[4,o.apply(this,[a.sent(),n])];case 2:return[2,a.sent()]}})})},e.prototype.detect=function(t,n){return n===void 0&&(n={}),Q(this,void 0,void 0,function(){var o,a,i,s,u,c,l,h,f,p,d,m,v,g,x=this;return Z(this,function(b){switch(b.label){case 0:return o=new pi(n),a=o.inputSize,i=o.scoreThreshold,[4,Ut(t)];case 1:return s=b.sent(),[4,this.forwardInput(s,a)];case 2:return u=b.sent(),c=K(function(){return Pt(u)[0].expandDims()}),l={width:s.getInputWidth(0),height:s.getInputHeight(0)},[4,this.extractBoxes(c,s.getReshapedInputDimensions(0),i)];case 3:return h=b.sent(),u.dispose(),c.dispose(),f=h.map(function(y){return y.box}),p=h.map(function(y){return y.score}),d=h.map(function(y){return y.classScore}),m=h.map(function(y){return x.config.classes[y.label]}),v=cr(f.map(function(y){return y.rescale(a)}),p,this.config.iouThreshold,!0),g=v.map(function(y){return new lc(p[y],d[y],m[y],f[y],l)}),[2,g]}})})},e.prototype.getDefaultModelName=function(){return""},e.prototype.extractParamsFromWeigthMap=function(t){return Qg(t,this.config)},e.prototype.extractParams=function(t){var n=this.config.filterSizes||e.DEFAULT_FILTER_SIZES,o=n?n.length:void 0;if(o!==7&&o!==8&&o!==9)throw new Error("TinyYolov2 - expected 7 | 8 | 9 convolutional filters, but found "+o+" filterSizes in config");return $g(t,this.config,this.boxEncodingSize,n)},e.prototype.extractBoxes=function(t,n,o){return Q(this,void 0,void 0,function(){var a,i,s,u,c,l,h,f,p,d,m,v,g,x,b,y,w,C,k,S,R,I,N,A,L,O,B,z,U,W=this;return Z(this,function(G){switch(G.label){case 0:return a=n.width,i=n.height,s=Math.max(a,i),u=s/a,c=s/i,l=t.shape[1],h=this.config.anchors.length,f=K(function(){var H=t.reshape([l,l,h,W.boxEncodingSize]),j=H.slice([0,0,0,0],[l,l,h,4]),tt=H.slice([0,0,0,4],[l,l,h,1]),et=W.withClassScores?qe(H.slice([0,0,0,5],[l,l,h,W.config.classes.length]),3):q(0);return[j,tt,et]}),p=f[0],d=f[1],m=f[2],v=[],[4,d.array()];case 1:return g=G.sent(),[4,p.array()];case 2:x=G.sent(),b=0,G.label=3;case 3:if(!(b<l))return[3,12];y=0,G.label=4;case 4:if(!(y<l))return[3,11];w=0,G.label=5;case 5:return w<h?(C=Zo(g[b][y][w][0]),!o||C>o?(k=(y+Zo(x[b][y][w][0]))/l*u,S=(b+Zo(x[b][y][w][1]))/l*c,R=Math.exp(x[b][y][w][2])*this.config.anchors[w].x/l*u,I=Math.exp(x[b][y][w][3])*this.config.anchors[w].y/l*c,N=k-R/2,A=S-I/2,L={row:b,col:y,anchor:w},this.withClassScores?[4,this.extractPredictedClass(m,L)]:[3,7]):[3,9]):[3,10];case 6:return U=G.sent(),[3,8];case 7:U={classScore:1,label:0},G.label=8;case 8:O=U,B=O.classScore,z=O.label,v.push(qt({box:new yo(N,A,N+R,A+I),score:C,classScore:C*B,label:z},L)),G.label=9;case 9:return w++,[3,5];case 10:return y++,[3,4];case 11:return b++,[3,3];case 12:return p.dispose(),d.dispose(),m.dispose(),[2,v]}})})},e.prototype.extractPredictedClass=function(t,n){return Q(this,void 0,void 0,function(){var o,a,i,s;return Z(this,function(u){switch(u.label){case 0:return o=n.row,a=n.col,i=n.anchor,[4,t.array()];case 1:return s=u.sent(),[2,Array(this.config.classes.length).fill(0).map(function(c,l){return s[o][a][i][l]}).map(function(c,l){return{classScore:c,label:l}}).reduce(function(c,l){return c.classScore>l.classScore?c:l})]}})})},e.DEFAULT_FILTER_SIZES=[3,16,32,64,128,256,512,1024,1024],e}(Ke),Zg=function(r){rt(e,r);function e(t){t===void 0&&(t=!0);var n=this,o=Object.assign({},{withSeparableConvs:t,iouThreshold:Vg,classes:["face"]},t?{anchors:Hg,meanRgb:qg}:{anchors:Gg,withClassScores:!0});return n=r.call(this,o)||this,n}return Object.defineProperty(e.prototype,"withSeparableConvs",{get:function(){return this.config.withSeparableConvs},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),e.prototype.locateFaces=function(t,n){return Q(this,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return[4,this.detect(t,n)];case 1:return o=a.sent(),[2,o.map(function(i){return new le(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},e.prototype.getDefaultModelName=function(){return this.withSeparableConvs?Kg:jg},e.prototype.extractParamsFromWeigthMap=function(t){return r.prototype.extractParamsFromWeigthMap.call(this,t)},e}(Lc),Wc=function(r){rt(e,r);function e(){var t=r!==null&&r.apply(this,arguments)||this;return t._name="TinyFaceDetectorOptions",t}return e}(pi),wr=function(){function r(){}return r.prototype.then=function(e){return Q(this,void 0,void 0,function(){var t;return Z(this,function(n){switch(n.label){case 0:return t=e,[4,this.run()];case 1:return[2,t.apply(void 0,[n.sent()])]}})})},r.prototype.run=function(){return Q(this,void 0,void 0,function(){return Z(this,function(e){throw new Error("ComposableTask - run is not implemented")})})},r}();function _o(r,e,t,n,o){return o===void 0&&(o=function(a){var i=a.alignedRect;return i}),Q(this,void 0,void 0,function(){var a,i,s,u,c;return Z(this,function(l){switch(l.label){case 0:return a=r.map(function(h){return kc(h)?o(h):h.detection}),s=n,s?[3,5]:e instanceof Et?[4,si(e,a)]:[3,2];case 1:return u=l.sent(),[3,4];case 2:return[4,ii(e,a)];case 3:u=l.sent(),l.label=4;case 4:s=u,l.label=5;case 5:return i=s,[4,t(i)];case 6:return c=l.sent(),i.forEach(function(h){return h instanceof Et&&h.dispose()}),[2,c]}})})}function di(r,e,t,n,o){return Q(this,void 0,void 0,function(){var a=this;return Z(this,function(i){return[2,_o([r],e,function(s){return Q(a,void 0,void 0,function(){return Z(this,function(u){return[2,t(s[0])]})})},n,o)]})})}function t0(r){return K(function(){return ce(Pt(r,3).reverse(),3)})}var Mr=2,ao=12;function e0(r,e){var t=bo(r,e),n=ui(r,e);function o(c,l){var h=Tt(r(c));return e.push({paramPath:l}),h}function a(c,l,h){h===void 0&&(h=!1);var f=t(c[0],c[1],3,l+"/conv1"),p=o(c[1],l+"/prelu1_alpha"),d=t(c[1],c[2],3,l+"/conv2"),m=o(c[2],l+"/prelu2_alpha"),v=t(c[2],c[3],h?2:3,l+"/conv3"),g=o(c[3],l+"/prelu3_alpha");return{conv1:f,prelu1_alpha:p,conv2:d,prelu2_alpha:m,conv3:v,prelu3_alpha:g}}function i(){var c=a([3,10,16,32],"pnet"),l=t(32,2,1,"pnet/conv4_1"),h=t(32,4,1,"pnet/conv4_2");return qt(qt({},c),{conv4_1:l,conv4_2:h})}function s(){var c=a([3,28,48,64],"rnet",!0),l=n(576,128,"rnet/fc1"),h=o(128,"rnet/prelu4_alpha"),f=n(128,2,"rnet/fc2_1"),p=n(128,4,"rnet/fc2_2");return qt(qt({},c),{fc1:l,prelu4_alpha:h,fc2_1:f,fc2_2:p})}function u(){var c=a([3,32,64,64],"onet"),l=t(64,128,2,"onet/conv4"),h=o(128,"onet/prelu4_alpha"),f=n(1152,256,"onet/fc1"),p=o(256,"onet/prelu5_alpha"),d=n(256,2,"onet/fc2_1"),m=n(256,4,"onet/fc2_2"),v=n(256,10,"onet/fc2_3");return qt(qt({},c),{conv4:l,prelu4_alpha:h,fc1:f,prelu5_alpha:p,fc2_1:d,fc2_2:m,fc2_3:v})}return{extractPNetParams:i,extractRNetParams:s,extractONetParams:u}}function n0(r){var e=Ye(r),t=e.extractWeights,n=e.getRemainingWeights,o=[],a=e0(t,o),i=a.extractPNetParams,s=a.extractRNetParams,u=a.extractONetParams,c=i(),l=s(),h=u();if(n().length!==0)throw new Error("weights remaing after extract: "+n().length);return{params:{pnet:c,rnet:l,onet:h},paramMappings:o}}function r0(r,e){var t=cn(r,e);function n(l){var h=t(l+"/weights",4,l+"/filters"),f=t(l+"/bias",1);return{filters:h,bias:f}}function o(l){var h=t(l+"/weights",2),f=t(l+"/bias",1);return{weights:h,bias:f}}function a(l){return t(l,1)}function i(l){var h=n(l+"/conv1"),f=a(l+"/prelu1_alpha"),p=n(l+"/conv2"),d=a(l+"/prelu2_alpha"),m=n(l+"/conv3"),v=a(l+"/prelu3_alpha");return{conv1:h,prelu1_alpha:f,conv2:p,prelu2_alpha:d,conv3:m,prelu3_alpha:v}}function s(){var l=i("pnet"),h=n("pnet/conv4_1"),f=n("pnet/conv4_2");return qt(qt({},l),{conv4_1:h,conv4_2:f})}function u(){var l=i("rnet"),h=o("rnet/fc1"),f=a("rnet/prelu4_alpha"),p=o("rnet/fc2_1"),d=o("rnet/fc2_2");return qt(qt({},l),{fc1:h,prelu4_alpha:f,fc2_1:p,fc2_2:d})}function c(){var l=i("onet"),h=n("onet/conv4"),f=a("onet/prelu4_alpha"),p=o("onet/fc1"),d=a("onet/prelu5_alpha"),m=o("onet/fc2_1"),v=o("onet/fc2_2"),g=o("onet/fc2_3");return qt(qt({},l),{conv4:h,prelu4_alpha:f,fc1:p,prelu5_alpha:d,fc2_1:m,fc2_2:v,fc2_3:g})}return{extractPNetParams:s,extractRNetParams:u,extractONetParams:c}}function o0(r){var e=[],t=r0(r,e),n=t.extractPNetParams,o=t.extractRNetParams,a=t.extractONetParams,i=n(),s=o(),u=a();return Xe(r,e),{params:{pnet:i,rnet:s,onet:u},paramMappings:e}}function Ea(r,e){var t=e[0],n=e[1];return{height:Math.floor(t*r),width:Math.floor(n*r)}}function a0(r,e,t){for(var n=t[0],o=t[1],a=ao/r,i=[],s=Math.min(n,o)*a,u=0;s>=12;)i.push(a*Math.pow(e,u)),s=s*e,u+=1;return i}var vi=function(r){rt(e,r);function e(t,n,o,a){return r.call(this,{left:t,top:n,right:o,bottom:a},!0)||this}return e}(Fe);function Uc(r){return K(function(){return Xt(Ot(r,q(127.5)),q(.0078125))})}function Gn(r,e){return K(function(){return ut(Rt(r),Xt(e,Qr(Rt(Qr(r)))))})}function mi(r,e,t){return t===void 0&&(t=!1),K(function(){var n=ge(r,e.conv1,"valid");return n=Gn(n,e.prelu1_alpha),n=Lt(n,t?[2,2]:[3,3],[2,2],"same"),n=ge(n,e.conv2,"valid"),n=Gn(n,e.prelu2_alpha),n=t?n:Lt(n,[3,3],[2,2],"valid"),n=ge(n,e.conv3,"valid"),n=Gn(n,e.prelu3_alpha),n})}function i0(r,e){return K(function(){var t=mi(r,e,!0),n=ge(t,e.conv4_1,"valid"),o=he(po(n,3),3),a=qe(Ot(n,o),3),i=ge(t,e.conv4_2,"valid");return{prob:a,regions:i}})}function s0(r,e){return K(function(){var t=Ea(e,r.shape.slice(1)),n=t.height,o=t.width,a=Xa.resizeBilinear(r,[n,o]),i=Uc(a);return an(i,[0,2,1,3])})}function u0(r,e,t,n){for(var o=[],a=r.arraySync(),i=0;i<r.shape[0];i++)for(var s=0;s<r.shape[1];s++)a[i][s]>=n&&o.push(new gt(s,i));var u=o.map(function(c){var l=new yo(Math.round((c.y*Mr+1)/t),Math.round((c.x*Mr+1)/t),Math.round((c.y*Mr+ao)/t),Math.round((c.x*Mr+ao)/t)),h=a[c.y][c.x],f=e.arraySync(),p=new vi(f[c.y][c.x][0],f[c.y][c.x][1],f[c.y][c.x][2],f[c.y][c.x][3]);return{cell:l,score:h,region:p}});return u}function c0(r,e,t,n,o){o.stage1=[];var a=e.map(function(f){return K(function(){var p={scale:f},d=s0(r,f),m=Date.now(),v=i0(d,n),g=v.prob,x=v.regions;p.pnet=Date.now()-m;var b=Pt(Pt(g,3)[1])[0],y=Pt(x)[0];return{scoresTensor:b,regionsTensor:y,scale:f,statsForScale:p}})}),i=a.map(function(f){var p=f.scoresTensor,d=f.regionsTensor,m=f.scale,v=f.statsForScale,g=u0(p,d,m,t);if(p.dispose(),d.dispose(),!g.length)return o.stage1.push(v),[];var x=Date.now(),b=cr(g.map(function(y){return y.cell}),g.map(function(y){return y.score}),.5);return v.nms=Date.now()-x,v.numBoxes=b.length,o.stage1.push(v),b.map(function(y){return g[y]})}),s=i.reduce(function(f,p){return f.concat(p)},[]),u=[],c=[];if(s.length>0){var l=Date.now(),h=cr(s.map(function(f){return f.cell}),s.map(function(f){return f.score}),.7);o.stage1_nms=Date.now()-l,c=h.map(function(f){return s[f].score}),u=h.map(function(f){return s[f]}).map(function(f){var p=f.cell,d=f.region;return new yo(p.left+d.left*p.width,p.top+d.top*p.height,p.right+d.right*p.width,p.bottom+d.bottom*p.height).toSquare().round()})}return{boxes:u,scores:c}}function zc(r,e,t){var n=t.width,o=t.height;return Q(this,void 0,void 0,function(){var a,i,s,u=this;return Z(this,function(c){switch(c.label){case 0:return a=Ge(r),[4,Promise.all(e.map(function(l){return Q(u,void 0,void 0,function(){var h,f,p,d,m,v,g,x;return Z(this,function(b){return h=l.padAtBorders(r.height,r.width),f=h.y,p=h.ey,d=h.x,m=h.ex,v=d-1,g=f-1,x=a.getImageData(v,g,m-v,p-g),[2,$t.isNodejs()?Vn(x):createImageBitmap(x)]})})}))];case 1:return i=c.sent(),s=[],i.forEach(function(l){var h=xo({width:n,height:o}),f=Ge(h);f.drawImage(l,0,0,n,o);for(var p=f.getImageData(0,0,n,o).data,d=[],m=0;m<p.length;m+=4)d.push(p[m+2]),d.push(p[m+1]),d.push(p[m]);s.push(d)}),[2,s.map(function(l){var h=K(function(){var f=an(Jt(l,[1,n,o,3]),[0,2,1,3]).toFloat();return Uc(f)});return h})]}})})}function l0(r,e){return K(function(){var t=mi(r,e),n=me(t,[t.shape[0],e.fc1.weights.shape[0]]),o=Se(n,e.fc1),a=Gn(o,e.prelu4_alpha),i=Se(a,e.fc2_1),s=he(po(i,1),1),u=qe(Ot(i,s),1),c=Se(a,e.fc2_2),l=Pt(u,1)[1];return{scores:l,regions:c}})}function h0(r,e,t,n,o){return Q(this,void 0,void 0,function(){var a,i,s,u,c,l,h,f,p,d,m,v,g,x;return Z(this,function(b){switch(b.label){case 0:return a=Date.now(),[4,zc(r,e,{width:24,height:24})];case 1:return i=b.sent(),o.stage2_extractImagePatches=Date.now()-a,a=Date.now(),s=i.map(function(y){var w=l0(y,n);return y.dispose(),w}),o.stage2_rnet=Date.now()-a,u=s.length>1?Ft(s.map(function(y){return y.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[b.sent()]),u.dispose(),f=c.map(function(y,w){return{score:y,idx:w}}).filter(function(y){return y.score>t}).map(function(y){var w=y.idx;return w}),p=f.map(function(y){return e[y]}),d=f.map(function(y){return c[y]}),m=[],v=[],p.length>0&&(a=Date.now(),g=cr(p,d,.7),o.stage2_nms=Date.now()-a,x=g.map(function(y){var w=s[f[y]].regions.arraySync();return new vi(w[0][0],w[0][1],w[0][2],w[0][3])}),v=g.map(function(y){return d[y]}),m=g.map(function(y,w){return p[y].calibrate(x[w])})),s.forEach(function(y){y.regions.dispose(),y.scores.dispose()}),[2,{boxes:m,scores:v}]}})})}function f0(r,e){return K(function(){var t=mi(r,e);t=Lt(t,[2,2],[2,2],"same"),t=ge(t,e.conv4,"valid"),t=Gn(t,e.prelu4_alpha);var n=me(t,[t.shape[0],e.fc1.weights.shape[0]]),o=Se(n,e.fc1),a=Gn(o,e.prelu5_alpha),i=Se(a,e.fc2_1),s=he(po(i,1),1),u=qe(Ot(i,s),1),c=Se(a,e.fc2_2),l=Se(a,e.fc2_3),h=Pt(u,1)[1];return{scores:h,regions:c,points:l}})}function p0(r,e,t,n,o){return Q(this,void 0,void 0,function(){var a,i,s,u,c,l,h,f,p,d,m,v,g,x,b;return Z(this,function(y){switch(y.label){case 0:return a=Date.now(),[4,zc(r,e,{width:48,height:48})];case 1:return i=y.sent(),o.stage3_extractImagePatches=Date.now()-a,a=Date.now(),s=i.map(function(w){var C=f0(w,n);return w.dispose(),C}),o.stage3_onet=Date.now()-a,u=s.length>1?Ft(s.map(function(w){return w.scores})):s[0].scores,h=(l=Array).from,[4,u.data()];case 2:return c=h.apply(l,[y.sent()]),u.dispose(),f=c.map(function(w,C){return{score:w,idx:C}}).filter(function(w){return w.score>t}).map(function(w){var C=w.idx;return C}),p=f.map(function(w){var C=s[w].regions.arraySync();return new vi(C[0][0],C[0][1],C[0][2],C[0][3])}),d=f.map(function(w,C){return e[w].calibrate(p[C])}),m=f.map(function(w){return c[w]}),v=[],g=[],x=[],d.length>0&&(a=Date.now(),b=cr(d,m,.7,!1),o.stage3_nms=Date.now()-a,v=b.map(function(w){return d[w]}),g=b.map(function(w){return m[w]}),x=b.map(function(w,C){return Array(5).fill(0).map(function(k,S){var R=s[w].points.arraySync();return new gt(R[0][S]*(v[C].width+1)+v[C].left,R[0][S+5]*(v[C].height+1)+v[C].top)})})),s.forEach(function(w){w.regions.dispose(),w.scores.dispose(),w.points.dispose()}),[2,{boxes:v,scores:g,points:x}]}})})}var d0=function(r){rt(e,r);function e(){return r.call(this,"Mtcnn")||this}return e.prototype.load=function(t){return Q(this,void 0,void 0,function(){return Z(this,function(n){return console.warn("mtcnn is deprecated and will be removed soon"),[2,r.prototype.load.call(this,t)]})})},e.prototype.loadFromDisk=function(t){return Q(this,void 0,void 0,function(){return Z(this,function(n){return console.warn("mtcnn is deprecated and will be removed soon"),[2,r.prototype.loadFromDisk.call(this,t)]})})},e.prototype.forwardInput=function(t,n){return n===void 0&&(n={}),Q(this,void 0,void 0,function(){var o,a,i,s,u,c,l,h,f,p,d,m,v,g,x,b,y,w,C,k,S;return Z(this,function(R){switch(R.label){case 0:if(o=this.params,!o)throw new Error("Mtcnn - load model before inference");if(a=t.canvases[0],!a)throw new Error("Mtcnn - inputCanvas is not defined, note that passing tensors into Mtcnn.forwardInput is not supported yet.");return i={},s=Date.now(),u=K(function(){return t0(he(ti.fromPixels(a)).toFloat())}),c=function(I){return u.dispose(),i.total=Date.now()-s,I},l=u.shape.slice(1),h=l[0],f=l[1],p=new Oc(n),d=p.minFaceSize,m=p.scaleFactor,v=p.maxNumScales,g=p.scoreThresholds,x=p.scaleSteps,b=(x||a0(d,m,[h,f])).filter(function(I){var N=Ea(I,[h,f]);return Math.min(N.width,N.height)>ao}).slice(0,v),i.scales=b,i.pyramid=b.map(function(I){return Ea(I,[h,f])}),y=Date.now(),[4,c0(u,b,g[0],o.pnet,i)];case 1:return w=R.sent(),i.total_stage1=Date.now()-y,w.boxes.length?(i.stage2_numInputBoxes=w.boxes.length,y=Date.now(),[4,h0(a,w.boxes,g[1],o.rnet,i)]):[2,c({results:[],stats:i})];case 2:return C=R.sent(),i.total_stage2=Date.now()-y,C.boxes.length?(i.stage3_numInputBoxes=C.boxes.length,y=Date.now(),[4,p0(a,C.boxes,g[2],o.onet,i)]):[2,c({results:[],stats:i})];case 3:return k=R.sent(),i.total_stage3=Date.now()-y,S=k.boxes.map(function(I,N){return wo(hr({},new le(k.scores[N],new ni(I.left/f,I.top/h,I.width/f,I.height/h),{height:h,width:f})),new zm(k.points[N].map(function(A){return A.sub(new gt(I.left,I.top)).div(new gt(I.width,I.height))}),{width:I.width,height:I.height}))}),[2,c({results:S,stats:i})]}})})},e.prototype.forward=function(t,n){return n===void 0&&(n={}),Q(this,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return o=this.forwardInput,[4,Ut(t)];case 1:return[4,o.apply(this,[a.sent(),n])];case 2:return[2,a.sent().results]}})})},e.prototype.forwardWithStats=function(t,n){return n===void 0&&(n={}),Q(this,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return o=this.forwardInput,[4,Ut(t)];case 1:return[2,o.apply(this,[a.sent(),n])]}})})},e.prototype.getDefaultModelName=function(){return"mtcnn_model"},e.prototype.extractParamsFromWeigthMap=function(t){return o0(t)},e.prototype.extractParams=function(t){return n0(t)},e}(Ke),v0=.4,m0=[new gt(1.603231,2.094468),new gt(6.041143,7.080126),new gt(2.882459,3.518061),new gt(4.266906,5.178857),new gt(9.041765,10.66308)],g0=[117.001,114.697,97.404],y0=function(r){rt(e,r);function e(){var t=this,n={withSeparableConvs:!0,iouThreshold:v0,classes:["face"],anchors:m0,meanRgb:g0,isFirstLayerConv2d:!0,filterSizes:[3,16,32,64,128,256,512]};return t=r.call(this,n)||this,t}return Object.defineProperty(e.prototype,"anchors",{get:function(){return this.config.anchors},enumerable:!0,configurable:!0}),e.prototype.locateFaces=function(t,n){return Q(this,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return[4,this.detect(t,n)];case 1:return o=a.sent(),[2,o.map(function(i){return new le(i.score,i.relativeBox,{width:i.imageWidth,height:i.imageHeight})})]}})})},e.prototype.getDefaultModelName=function(){return"tiny_face_detector_model"},e.prototype.extractParamsFromWeigthMap=function(t){return r.prototype.extractParamsFromWeigthMap.call(this,t)},e}(Lc),Yt={ssdMobilenetv1:new Bc,tinyFaceDetector:new y0,tinyYolov2:new Zg,mtcnn:new d0,faceLandmark68Net:new Ac,faceLandmark68TinyNet:new bg,faceRecognitionNet:new kg,faceExpressionNet:new sg,ageGenderNet:new mg},Vc=function(r){rt(e,r);function e(t,n,o){var a=r.call(this)||this;return a.parentTask=t,a.input=n,a.extractedFaces=o,a}return e}(wr),gi=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n,o=this;return Z(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return t=a.sent(),[4,_o(t,this.input,function(i){return Q(o,void 0,void 0,function(){return Z(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return Yt.faceExpressionNet.predictExpressions(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return n=a.sent(),[2,t.map(function(i,s){return Ic(i,n[s])})]}})})},e.prototype.withAgeAndGender=function(){return new wi(this,this.input)},e}(Vc),yi=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n;return Z(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return t=o.sent(),t?[4,di(t,this.input,function(a){return Yt.faceExpressionNet.predictExpressions(a)},this.extractedFaces)]:[2];case 2:return n=o.sent(),[2,Ic(t,n)]}})})},e.prototype.withAgeAndGender=function(){return new Ci(this,this.input)},e}(Vc),xi=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.withAgeAndGender=function(){return new _i(this,this.input)},e.prototype.withFaceDescriptors=function(){return new Ri(this,this.input)},e}(gi),bi=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.withAgeAndGender=function(){return new Ei(this,this.input)},e.prototype.withFaceDescriptor=function(){return new Ii(this,this.input)},e}(yi),Gc=function(r){rt(e,r);function e(t,n,o){var a=r.call(this)||this;return a.parentTask=t,a.input=n,a.extractedFaces=o,a}return e}(wr),wi=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n,o=this;return Z(this,function(a){switch(a.label){case 0:return[4,this.parentTask];case 1:return t=a.sent(),[4,_o(t,this.input,function(i){return Q(o,void 0,void 0,function(){return Z(this,function(s){switch(s.label){case 0:return[4,Promise.all(i.map(function(u){return Yt.ageGenderNet.predictAgeAndGender(u)}))];case 1:return[2,s.sent()]}})})},this.extractedFaces)];case 2:return n=a.sent(),[2,t.map(function(i,s){var u=n[s],c=u.age,l=u.gender,h=u.genderProbability;return Pc(Mc(i,l,h),c)})]}})})},e.prototype.withFaceExpressions=function(){return new gi(this,this.input)},e}(Gc),Ci=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n,o,a,i;return Z(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return t=s.sent(),t?[4,di(t,this.input,function(u){return Yt.ageGenderNet.predictAgeAndGender(u)},this.extractedFaces)]:[2];case 2:return n=s.sent(),o=n.age,a=n.gender,i=n.genderProbability,[2,Pc(Mc(t,a,i),o)]}})})},e.prototype.withFaceExpressions=function(){return new yi(this,this.input)},e}(Gc),_i=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.withFaceExpressions=function(){return new xi(this,this.input)},e.prototype.withFaceDescriptors=function(){return new Ri(this,this.input)},e}(wi),Ei=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.withFaceExpressions=function(){return new bi(this,this.input)},e.prototype.withFaceDescriptor=function(){return new Ii(this,this.input)},e}(Ci),Hc=function(r){rt(e,r);function e(t,n){var o=r.call(this)||this;return o.parentTask=t,o.input=n,o}return e}(wr),Ri=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n;return Z(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return t=o.sent(),[4,_o(t,this.input,function(a){return Promise.all(a.map(function(i){return Yt.faceRecognitionNet.computeFaceDescriptor(i)}))},null,function(a){return a.landmarks.align(null,{useDlibAlignment:!0})})];case 2:return n=o.sent(),[2,n.map(function(a,i){return Fc(t[i],a)})]}})})},e.prototype.withFaceExpressions=function(){return new xi(this,this.input)},e.prototype.withAgeAndGender=function(){return new _i(this,this.input)},e}(Hc),Ii=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n;return Z(this,function(o){switch(o.label){case 0:return[4,this.parentTask];case 1:return t=o.sent(),t?[4,di(t,this.input,function(a){return Yt.faceRecognitionNet.computeFaceDescriptor(a)},null,function(a){return a.landmarks.align(null,{useDlibAlignment:!0})})]:[2];case 2:return n=o.sent(),[2,Fc(t,n)]}})})},e.prototype.withFaceExpressions=function(){return new bi(this,this.input)},e.prototype.withAgeAndGender=function(){return new Ei(this,this.input)},e}(Hc),qc=function(r){rt(e,r);function e(t,n,o){var a=r.call(this)||this;return a.parentTask=t,a.input=n,a.useTinyLandmarkNet=o,a}return Object.defineProperty(e.prototype,"landmarkNet",{get:function(){return this.useTinyLandmarkNet?Yt.faceLandmark68TinyNet:Yt.faceLandmark68Net},enumerable:!0,configurable:!0}),e}(wr),x0=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n,o,a,i,s=this;return Z(this,function(u){switch(u.label){case 0:return[4,this.parentTask];case 1:return t=u.sent(),n=t.map(function(c){return c.detection}),this.input instanceof Et?[4,si(this.input,n)]:[3,3];case 2:return a=u.sent(),[3,5];case 3:return[4,ii(this.input,n)];case 4:a=u.sent(),u.label=5;case 5:return o=a,[4,Promise.all(o.map(function(c){return s.landmarkNet.detectLandmarks(c)}))];case 6:return i=u.sent(),o.forEach(function(c){return c instanceof Et&&c.dispose()}),[2,t.map(function(c,l){return wo(c,i[l])})]}})})},e.prototype.withFaceExpressions=function(){return new xi(this,this.input)},e.prototype.withAgeAndGender=function(){return new _i(this,this.input)},e.prototype.withFaceDescriptors=function(){return new Ri(this,this.input)},e}(qc),b0=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n,o,a,i;return Z(this,function(s){switch(s.label){case 0:return[4,this.parentTask];case 1:return t=s.sent(),t?(n=t.detection,this.input instanceof Et?[4,si(this.input,[n])]:[3,3]):[2];case 2:return a=s.sent(),[3,5];case 3:return[4,ii(this.input,[n])];case 4:a=s.sent(),s.label=5;case 5:return o=a,[4,this.landmarkNet.detectLandmarks(o[0])];case 6:return i=s.sent(),o.forEach(function(u){return u instanceof Et&&u.dispose()}),[2,wo(t,i)]}})})},e.prototype.withFaceExpressions=function(){return new bi(this,this.input)},e.prototype.withAgeAndGender=function(){return new Ei(this,this.input)},e.prototype.withFaceDescriptor=function(){return new Ii(this,this.input)},e}(qc),jc=function(r){rt(e,r);function e(t,n){n===void 0&&(n=new Co);var o=r.call(this)||this;return o.input=t,o.options=n,o}return e}(wr),Kc=function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n,o,a;return Z(this,function(i){switch(i.label){case 0:return t=this,n=t.input,o=t.options,o instanceof Oc?[4,Yt.mtcnn.forward(n,o)]:[3,2];case 1:return[2,i.sent().map(function(s){return s.detection})];case 2:if(a=o instanceof Wc?function(s){return Yt.tinyFaceDetector.locateFaces(s,o)}:o instanceof Co?function(s){return Yt.ssdMobilenetv1.locateFaces(s,o)}:o instanceof pi?function(s){return Yt.tinyYolov2.locateFaces(s,o)}:null,!a)throw new Error("detectFaces - expected options to be instance of TinyFaceDetectorOptions | SsdMobilenetv1Options | MtcnnOptions | TinyYolov2Options");return[2,a(n)]}})})},e.prototype.runAndExtendWithFaceDetections=function(){var t=this;return new Promise(function(n){return Q(t,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return[4,this.run()];case 1:return o=a.sent(),[2,n(o.map(function(i){return hr({},i)}))]}})})})},e.prototype.withFaceLandmarks=function(t){return t===void 0&&(t=!1),new x0(this.runAndExtendWithFaceDetections(),this.input,t)},e.prototype.withFaceExpressions=function(){return new gi(this.runAndExtendWithFaceDetections(),this.input)},e.prototype.withAgeAndGender=function(){return new wi(this.runAndExtendWithFaceDetections(),this.input)},e}(jc);(function(r){rt(e,r);function e(){return r!==null&&r.apply(this,arguments)||this}return e.prototype.run=function(){return Q(this,void 0,void 0,function(){var t,n;return Z(this,function(o){switch(o.label){case 0:return[4,new Kc(this.input,this.options)];case 1:return t=o.sent(),n=t[0],t.forEach(function(a){a.score>n.score&&(n=a)}),[2,n]}})})},e.prototype.runAndExtendWithFaceDetection=function(){var t=this;return new Promise(function(n){return Q(t,void 0,void 0,function(){var o;return Z(this,function(a){switch(a.label){case 0:return[4,this.run()];case 1:return o=a.sent(),[2,n(o?hr({},o):void 0)]}})})})},e.prototype.withFaceLandmarks=function(t){return t===void 0&&(t=!1),new b0(this.runAndExtendWithFaceDetection(),this.input,t)},e.prototype.withFaceExpressions=function(){return new yi(this.runAndExtendWithFaceDetection(),this.input)},e.prototype.withAgeAndGender=function(){return new Ci(this.runAndExtendWithFaceDetection(),this.input)},e})(jc);function w0(r,e){return e===void 0&&(e=new Co),new Kc(r,e)}function C0(r,e){if(r.length!==e.length)throw new Error("euclideanDistance: arr1.length !== arr2.length");var t=Array.from(r),n=Array.from(e);return Math.sqrt(t.map(function(o,a){return o-n[a]}).reduce(function(o,a){return o+Math.pow(a,2)},0))}(function(){function r(e,t){t===void 0&&(t=.6),this._distanceThreshold=t;var n=Array.isArray(e)?e:[e];if(!n.length)throw new Error("FaceRecognizer.constructor - expected atleast one input");var o=1,a=function(){return"person "+o++};this._labeledDescriptors=n.map(function(i){if(i instanceof Tr)return i;if(i instanceof Float32Array)return new Tr(a(),[i]);if(i.descriptor&&i.descriptor instanceof Float32Array)return new Tr(a(),[i.descriptor]);throw new Error("FaceRecognizer.constructor - expected inputs to be of type LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array | Array<LabeledFaceDescriptors | WithFaceDescriptor<any> | Float32Array>")})}return Object.defineProperty(r.prototype,"labeledDescriptors",{get:function(){return this._labeledDescriptors},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"distanceThreshold",{get:function(){return this._distanceThreshold},enumerable:!0,configurable:!0}),r.prototype.computeMeanDistance=function(e,t){return t.map(function(n){return C0(n,e)}).reduce(function(n,o){return n+o},0)/(t.length||1)},r.prototype.matchDescriptor=function(e){var t=this;return this.labeledDescriptors.map(function(n){var o=n.descriptors,a=n.label;return new _s(a,t.computeMeanDistance(e,o))}).reduce(function(n,o){return n.distance<o.distance?n:o})},r.prototype.findBestMatch=function(e){var t=this.matchDescriptor(e);return t.distance<this.distanceThreshold?t:new _s("unknown",t.distance)},r.prototype.toJSON=function(){return{distanceThreshold:this.distanceThreshold,labeledDescriptors:this.labeledDescriptors.map(function(e){return e.toJSON()})}},r.fromJSON=function(e){var t=e.labeledDescriptors.map(function(n){return Tr.fromJSON(n)});return new r(t,e.distanceThreshold)},r})();function Xc(r,e){var t=new gn(e.width,e.height),n=t.width,o=t.height;if(n<=0||o<=0)throw new Error("resizeResults - invalid dimensions: "+JSON.stringify({width:n,height:o}));if(Array.isArray(r))return r.map(function(s){return Xc(s,{width:n,height:o})});if(kc(r)){var a=r.detection.forSize(n,o),i=r.unshiftedLandmarks.forSize(a.box.width,a.box.height);return wo(hr(r,a),i)}return no(r)?hr(r,r.detection.forSize(n,o)):r instanceof lr||r instanceof le?r.forSize(n,o):r}function Ss(r,e){const t=r.split(","),n=t[0].match(/:(.*?);/)[1],o=atob(t[1]);let a=o.length;const i=new Uint8Array(a);for(;a--;)i[a]=o.charCodeAt(a);return new File([i],e,{type:n})}function E0({detectLimit:r,onDetect:e,onFullDetect:t,onCountChange:n}){const[o,a]=ln.useState(!1),[i,s]=ln.useState(!1),[u,c]=ln.useState(null),l=ln.useRef(0),h=ln.useRef(),f=480,p=640,d=ln.useRef();ln.useEffect(()=>{(async()=>{const y="//models";Promise.all([Yt.tinyFaceDetector.loadFromUri(y),Yt.faceLandmark68Net.loadFromUri(y),Yt.faceRecognitionNet.loadFromUri(y),Yt.faceExpressionNet.loadFromUri(y)]).then(()=>{a(!0)})})()},[]);const m=()=>{s(!0),navigator.mediaDevices.getUserMedia({video:{width:300}}).then(b=>{let y=h.current;y&&(y.srcObject=b,y.play())}).catch(b=>{console.error("error:",b)})},v=b=>{if(b.length===1){if(l.current+1>r){const y=h.current,C=Vn(y).toDataURL("image/jpeg"),k=Ss(C,"image.jpg");c(k),x(),t!==void 0&&t(k)}if(e!==void 0){const y=h.current,C=Vn(y).toDataURL("image/jpeg"),k=Ss(C,"image.jpg");c(k),e(k)}l.current=l.current+1,n!==void 0&&n(l.current)}else l.current!==0&&(l.current=0,n!==void 0&&n(l.current))},g=()=>{setInterval(async()=>{if(d&&d.current){d.current.innerHTML=Vn(h.current);const b={width:p,height:f};eg(d.current,b);const y=await w0(h.current,new Wc).withFaceLandmarks().withFaceExpressions();v(y);const w=Xc(y,b);d&&d.current&&d.current.getContext("2d").clearRect(0,0,p,f),d&&d.current&&Xm(d.current,w)}},300)},x=()=>{h.current.pause(),h.current.srcObject.getTracks()[0].stop(),s(!1)};return re.jsxs("div",{className:"py-12",children:[re.jsx("div",{className:"flex justify-center",children:i&&o?re.jsx("button",{onClick:x,style:{cursor:"pointer",backgroundColor:"green",color:"white",padding:"15px",fontSize:"25px",border:"none",borderRadius:"10px"},children:re.jsx(ki,{id:"app.face_id.close.label"})}):re.jsx("button",{onClick:m,style:{cursor:"pointer",backgroundColor:"green",color:"white",padding:"15px",fontSize:"25px",border:"none",borderRadius:"10px"},children:re.jsx(ki,{id:"app.face_id.open.label"})})}),i?o?re.jsx("div",{children:re.jsxs("div",{style:{display:"flex",justifyContent:"center",padding:"10px"},children:[re.jsx("video",{ref:h,height:f,width:p,onPlay:g,style:{borderRadius:"10px"}}),re.jsx("canvas",{ref:d,style:{position:"absolute"}})]})}):re.jsx(Qc,{}):re.jsx(re.Fragment,{})]})}export{E0 as F};
