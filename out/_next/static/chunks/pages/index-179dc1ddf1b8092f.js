(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(7928)}])},8418:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var i,a=(i=r(7294))&&i.__esModule?i:{default:i},u=r(6273),s=r(387),c=r(7190);var l={};function f(e,t,r,n){if(e&&u.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;l[t+"%"+r+(o?"%"+o:"")]=!0}}},7190:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,r=e.rootMargin,n=e.disabled||!u,l=i.useRef(),f=o(i.useState(!1),2),p=f[0],h=f[1],d=o(i.useState(t?t.current:null),2),v=d[0],_=d[1],m=i.useCallback((function(e){l.current&&(l.current(),l.current=void 0),n||p||e&&e.tagName&&(l.current=function(e,t,r){var n=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=c.find((function(e){return e.root===r.root&&e.margin===r.margin}));n?t=s.get(n):(t=s.get(r),c.push(r));if(t)return t;var o=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return s.set(r,t={id:r,observer:i,elements:o}),t}(r),o=n.id,i=n.observer,a=n.elements;return a.set(e,t),i.observe(e),function(){if(a.delete(e),i.unobserve(e),0===a.size){i.disconnect(),s.delete(o);var t=c.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&c.splice(t,1)}}}(e,(function(e){return e&&h(e)}),{root:v,rootMargin:r}))}),[n,v,r,p]);return i.useEffect((function(){if(!u&&!p){var e=a.requestIdleCallback((function(){return h(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[p]),i.useEffect((function(){t&&_(t.current)}),[t]),[m,p]};var i=r(7294),a=r(9311),u="undefined"!==typeof IntersectionObserver;var s=new Map,c=[]},7928:function(e,t,r){"use strict";r.r(t),r.d(t,{Home:function(){return oe},default:function(){return ie}});var n=r(4051),o=r.n(n),i=r(5893),a=r(7294),u=(r(1664),r(6697)),s=r.n(u),c=r(6486),l=r.n(c);function f(e,t,r,n,o,i,a){try{var u=e[i](a),s=u.value}catch(c){return void r(c)}u.done?t(s):Promise.resolve(s).then(n,o)}function p(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){f(i,n,o,a,u,"next",e)}function u(e){f(i,n,o,a,u,"throw",e)}a(void 0)}))}}var h={readFileText:function(e){return d.apply(this,arguments)}};function d(){return(d=p(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new Promise((function(e){var r=new FileReader;r.onload=function(t){var r=t.target.result;e(r)},r.readAsText(t)})),e.next=3,r;case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var v={processSuspensionsIni:function(e){if(!e)return null;var t=v.stripComments(e),r=v.getFrontText(t),n=v.getRearText(t),o=v.getValue(r,"TYPE"),i=v.getValue(n,"TYPE"),a={};"DWB"===o?a.front=v.getWishboneSuspension(r):"STRUT"===o&&(a.front=v.getStrutSuspension(r));"DWB"===i?a.rear=v.getWishboneSuspension(n):"STRUT"===i&&(a.rear=v.getStrutSuspension(n));return a},processTyresIni:function(e){if(!e)return null;var t=v.stripComments(e);return v.getTyres(t)},stripComments:function(e){return e.replaceAll(/\s*;.*/g,"")},getFrontText:function(e){return e.match(/\[FRONT\][\s\S]*?[\r\n][\r\n]/m)[0]},getRearText:function(e){return e.match(/\[REAR\][\s\S]*?[\r\n][\r\n]/m)[0]},getWishboneSuspension:function(e){var t=v.getValue(e,"TRACK"),r=v.getValue(e,"RIM_OFFSET")||0,n=v.getValue(e,"WBCAR_TOP_FRONT",{separator:", "}),o=v.getValue(e,"WBTYRE_TOP",{separator:", "}),i=v.getValue(e,"WBCAR_BOTTOM_FRONT",{separator:", "}),a=v.getValue(e,"WBTYRE_BOTTOM",{separator:", "});return{type:"DWB",trackWidth:t,wheelOffset:r,upperMountX:n[0],upperMountY:n[1],upperBallJointX:o[0],upperBallJointY:o[1],lowerMountX:i[0],lowerMountY:i[1],lowerBallJointX:a[0],lowerBallJointY:a[1]}},getStrutSuspension:function(e){var t=v.getValue(e,"TRACK"),r=v.getValue(e,"RIM_OFFSET")||0,n=v.getValue(e,"STRUT_CAR",{separator:", "}),o=v.getValue(e,"STRUT_TYRE",{separator:", "}),i=v.getValue(e,"WBCAR_BOTTOM_FRONT",{separator:", "}),a=v.getValue(e,"WBTYRE_BOTTOM",{separator:", "});return{type:"STRUT",trackWidth:t,wheelOffset:r,strutUpperMountX:n[0],strutUpperMountY:n[1],strutLowerMountX:o[0],strutLowerMountY:o[1],lowerMountX:i[0],lowerMountY:i[1],lowerBallJointX:a[0],lowerBallJointY:a[1]}},getTyres:function(e){var t=v.getValue(e,"WIDTH"),r=v.getValue(e,"RADIUS"),n=v.getValue(e,"RIM_RADIUS");return{tireWidth:t,tireRadius:r,rimRadius:n}},getValue:function(e,t,r){var n=e.match("".concat(t,"=.*"));if(!n)return null;n=n[0];var o=_.last(n.split("=")),i=isNaN(o)?o:+o;r&&r.separator&&(i=(i=o.split(r.separator)).map((function(e){return isNaN(e)?e:+e})));return i}};var m={convertSuspensionData:function(e,t){var r=e.type,n=e.trackWidth,o=e.wheelOffset,i=e.upperMountX,a=e.upperMountY,u=e.upperBallJointX,s=e.upperBallJointY,c=e.lowerMountX,l=e.lowerMountY,f=e.lowerBallJointX,p=e.lowerBallJointY,h=e.strutUpperMountX,d=e.strutUpperMountY,v=e.strutLowerMountX,_=e.strutLowerMountY,m=t.tireWidth,g=t.tireRadius,y=t.rimRadius,b=g+l,w=n/2-c,x=n/2-(i||h),T=(a||d)-l,O=Math.sqrt(Math.pow(i-u,2)+Math.pow(s-a,2)),D=Math.sqrt(Math.pow(c-f,2)+Math.pow(p-l,2)),k=u+o,R=Math.abs(s),j=f+o,P=Math.abs(p),S=v+o,M=180*Math.asin((d-_)/Math.sqrt(Math.pow(h-v,2)+Math.pow(d-_,2)))/Math.PI;return{type:r,rideHeight:b,frameCenterToLowerMountX:w,frameBottomToLowerMountY:0,frameCenterToUpperMountX:x,frameBottomToUpperMountY:T,upperControlArmLength:O,lowerControlArmLength:D,hubToUpperBallJointX:k,hubToUpperBallJointY:R,hubToLowerBallJointX:j,hubToLowerBallJointY:P,hubToStrutAxis:S,strutInclinationAngle:M,wheelOffset:o,tireOuterDiameter:2*g,tireWidth:m,wheelDiameter:2*y-.0254}},generateSuspension:function(e){var t=e.type,r=e.rideHeight,n=e.frameCenterToLowerMountX,o=e.frameBottomToLowerMountY,i=e.frameCenterToUpperMountX,a=e.frameBottomToUpperMountY,u=e.upperControlArmLength,s=e.lowerControlArmLength,c=e.hubToUpperBallJointX,l=e.hubToUpperBallJointY,f=e.hubToLowerBallJointX,p=e.hubToLowerBallJointY,h=e.hubToStrutAxis,d=e.strutInclinationAngle,v=e.wheelOffset,_=e.tireOuterDiameter,m=e.tireWidth,y=e.wheelDiameter;return["frame.susp_type:".concat("DWB"===t?0:1),"frame.bottom_y:".concat(g(r)),"frame.center_to_upper_mount_x:".concat(g(i)),"frame.bottom_to_upper_mount_y:".concat(g(a)),"frame.center_to_lower_mount_x:".concat(g(n)),"frame.bottom_to_lower_mount_y:".concat(g(o)),"control_arms.upper_length:".concat(g(u)),"control_arms.lower_length:".concat(g(s)),"knuckles.hub_to_upper_x:".concat(g(c)),"knuckles.hub_to_lower_x:".concat(g(f)),"knuckles.hub_to_lower_y:".concat(g(p)),"knuckles.hub_to_upper_y:".concat(g(l)),"knuckles.hub_to_strut_axis:".concat(g(h)),"knuckles.strut_incl:".concat(100*d),"steering.active:".concat(0),"steering.hub_to_outer_tie_rod_x:".concat(7620),"steering.hub_to_outer_tie_rod_y:".concat(7620),"wheels.offset:".concat(g(v)),"wheels.diameter:".concat(1500),"wheels.diameter_expl:".concat(g(y)),"tires.size_convention:1","tires.section_width:".concat(g(m)),"tires.aspect_ratio:".concat(4500),"tires.diameter_expl:".concat(g(_)),"tires.width_expl:".concat(g(m)),"tires.compression:0"].join("|")},generatePrefs:function(e){return["diag1.px_per_mm:200","diag1.front_or_rear:front","tab.active:3","units:1","show.f:1","show.ca:1","show.k:1","show.st:1","show.stl:1","show.w:1","show.t:1","show.rc:1","show.rcl:1","show.ic:1","show.icl:1","show.fvsa:0","show.tl:1","show.kpil:1","redraw_during_drag:1","chart.x_axis_center:0","chart.x_axis_window:10","chart.x_axis_num_steps:21","chart.x_axis_field:trim.body_roll_angle","chart.y_axis_fields:[FR].general.roll_center.y"].join("|")},generateVsuspUrl:function(e,t,r){var n=["0.8","project_name:AC2Vsusp","trim{body_roll_angle:0|front.left_bump:0|rear.left_bump:0|front.right_bump:0|rear.right_bump:0}"];return n.push("front{".concat(e,"}")),n.push("rear{".concat(t,"}")),n.push("pref{".concat(r,"}")),"http://vsusp.com/?tool=2d#".concat(encodeURIComponent(n.join("&")))},normalize:g};function g(e){return 1e5*e}function y(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e,t,r,n,o,i,a){try{var u=e[i](a),s=u.value}catch(c){return void r(c)}u.done?t(s):Promise.resolve(s).then(n,o)}function w(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){b(i,n,o,a,u,"next",e)}function u(e){b(i,n,o,a,u,"throw",e)}a(void 0)}))}}function x(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function T(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},D(e)}function k(e,t){return!t||"object"!==j(t)&&"function"!==typeof t?y(e):t}function R(e,t){return R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},R(e,t)}var j=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function P(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=D(e);if(t){var o=D(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return k(this,r)}}var S=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(s,e);var t,r,n,u=P(s);function s(){var e;x(this,s),O(y(e=u.apply(this,arguments)),"dropTargetRef",a.createRef()),O(y(e),"onDragEnter",(function(t){t.preventDefault(),t.stopPropagation(),e.props.onDragEnter&&e.props.onDragEnter(t)})),O(y(e),"onDragLeave",(function(t){t.preventDefault(),t.stopPropagation(),e.props.onDragLeave&&e.props.onDragLeave(t)})),O(y(e),"onDragOver",(function(t){t.preventDefault(),t.stopPropagation(),e.props.onDragOver&&e.props.onDragOver(t)}));var t=y(e);return O(y(e),"onDrop",function(){var e=w(o().mark((function e(r){var n,i,a,u,s;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.props,i=n.multiple,a=n.accept,r.preventDefault(),r.stopPropagation(),t.props.onDrop&&t.props.onDrop(r),!(u=r.dataTransfer.files)||!u.length){e.next=12;break}return i||(u=[l().first(u)]),a&&(u=l().filter(u,(function(e){return a.test(e.type)}))),e.next=10,t.readFiles(u);case 10:s=e.sent,t.props.onChange&&t.props.onChange(s);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e}return t=s,(r=[{key:"componentDidMount",value:function(){var e=this.dropTargetRef.current;e.addEventListener("dragenter",this.onDragEnter),e.addEventListener("dragleave",this.onDragLeave),e.addEventListener("dragover",this.onDragOver),e.addEventListener("drop",this.onDrop)}},{key:"componentWillUnmount",value:function(){var e=this.dropTargetRef.current;e.removeEventListener("dragenter",this.onDragEnter),e.removeEventListener("dragleave",this.onDragLeave),e.removeEventListener("dragover",this.onDragOver),e.removeEventListener("drop",this.onDrop)}},{key:"readFiles",value:function(e){return w(o().mark((function t(){var r,n,i,a,u,s,c,l;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(r=[],n=!0,i=!1,a=void 0,t.prev=2,u=e[Symbol.iterator]();!(n=(s=u.next()).done);n=!0)c=s.value,l=new Promise((function(e){var t=new File([c],c.name),r=new FileReader;r.onload=function(r){var n=r.target.result;e({file:t,base64:n})},r.readAsDataURL(t)})),r.push(l);t.next=10;break;case 6:t.prev=6,t.t0=t.catch(2),i=!0,a=t.t0;case 10:t.prev=10,t.prev=11,n||null==u.return||u.return();case 13:if(t.prev=13,!i){t.next=16;break}throw a;case 16:return t.finish(13);case 17:return t.finish(10);case 18:return t.next=20,Promise.all(r);case 20:return t.abrupt("return",t.sent);case 21:case"end":return t.stop()}}),t,null,[[2,6,10,18],[11,,13,17]])})))()}},{key:"render",value:function(){return(0,i.jsx)("div",{ref:this.dropTargetRef,children:this.props.children})}}])&&T(t.prototype,r),n&&T(t,n),s}(a.Component),M=r(163),C=r.n(M);function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function E(e,t,r,n,o,i,a){try{var u=e[i](a),s=u.value}catch(c){return void r(c)}u.done?t(s):Promise.resolve(s).then(n,o)}function B(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function I(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function A(e){return A=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},A(e)}function U(e,t){return!t||"object"!==Y(t)&&"function"!==typeof t?L(e):t}function F(e,t){return F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},F(e,t)}var Y=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function V(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=A(e);if(t){var o=A(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return U(this,r)}}var X=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(s,e);var t,r,n,u=V(s);function s(){var e;return B(this,s),N(L(e=u.apply(this,arguments)),"onChange",(function(t){e.handleChange(t),t.target.value=null})),e}return t=s,r=[{key:"handleChange",value:function(e){var t,r=this;return(t=o().mark((function t(){var n,i,a,u,s,c,l,f,p;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=[],i=!0,a=!1,u=void 0,t.prev=2,s=e.target.files[Symbol.iterator]();!(i=(c=s.next()).done);i=!0)l=c.value,f=new Promise((function(e){var t=new File([l],l.name),r=new FileReader;r.onload=function(r){var n=r.target.result;e({file:t,base64:n})},r.readAsDataURL(t)})),n.push(f);t.next=10;break;case 6:t.prev=6,t.t0=t.catch(2),a=!0,u=t.t0;case 10:t.prev=10,t.prev=11,i||null==s.return||s.return();case 13:if(t.prev=13,!a){t.next=16;break}throw u;case 16:return t.finish(13);case 17:return t.finish(10);case 18:return t.next=20,Promise.all(n);case 20:p=t.sent,r.props.onChange&&r.props.onChange(p);case 22:case"end":return t.stop()}}),t,null,[[2,6,10,18],[11,,13,17]])})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(e){E(i,n,o,a,u,"next",e)}function u(e){E(i,n,o,a,u,"throw",e)}a(void 0)}))})()}},{key:"render",value:function(){var e=this.props,t=e.multiple,r=e.accept,n=e.label;return(0,i.jsxs)(a.Fragment,{children:[(0,i.jsx)("label",{className:C().fileLabel,htmlFor:l().camelCase(n),children:this.props.children||n}),(0,i.jsx)("input",{className:C().fileInput,type:"file",id:l().camelCase(n),multiple:t,accept:r,onChange:this.onChange})]})}}],r&&I(t.prototype,r),n&&I(t,n),s}(a.Component),W=r(2974),J=r.n(W);function H(e){var t=e.fileName,r=e.isPresent;return(0,i.jsxs)("div",{className:J().file,children:[(0,i.jsx)("span",{className:r&&J().fileNamePresent,children:t}),r?(0,i.jsx)("span",{className:J().filePresent,children:"- processed \ud83d\udc4d"}):(0,i.jsx)("span",{className:J().fileNotPresent,children:"- missing"})]})}function q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function z(e,t,r,n,o,i,a){try{var u=e[i](a),s=u.value}catch(c){return void r(c)}u.done?t(s):Promise.resolve(s).then(n,o)}function Q(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){z(i,n,o,a,u,"next",e)}function u(e){z(i,n,o,a,u,"throw",e)}a(void 0)}))}}function G(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function K(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Z(e){return Z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Z(e)}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){K(e,t,r[t])}))}return e}function ee(e,t){return!t||"object"!==re(t)&&"function"!==typeof t?q(e):t}function te(e,t){return te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},te(e,t)}var re=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function ne(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Z(e);if(t){var o=Z(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return ee(this,r)}}var oe=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&te(e,t)}(u,e);var t,r,n,a=ne(u);function u(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),K(q(t=a.call(this,e)),"onDragOver",(function(){t.setState({dragging:!0}),t.onDragLeaveDebounced.cancel()})),K(q(t),"onDragLeave",(function(){t.setState({dragging:!1})})),K(q(t),"onDragLeaveDebounced",l().debounce(t.onDragLeave,10));var r=q(t);return K(q(t),"onFileSelected",function(){var e=Q(o().mark((function e(t){var n,i,a,u,s,c,f,p,h,d;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=$({},r.state,{dragging:!1,files:t,fileError:!1}),!(i=l().find(t,(function(e){return"suspensions.ini"===e.file.name})))){e.next=8;break}return e.next=5,r.getFileText(i);case 5:a=e.sent,u=v.processSuspensionsIni(a),n.suspensionsIniData=u;case 8:if(!(s=l().find(t,(function(e){return"tyres.ini"===e.file.name})))){e.next=15;break}return e.next=12,r.getFileText(s);case 12:c=e.sent,f=v.processTyresIni(c),n.tyresIniData=f;case 15:p=n.suspensionsIniData,h=n.tyresIniData,p&&h&&(d=r.createVsuspUrl(p,h),n.vsuspUrl=d,window.open(d,"_blank")),r.setState(n);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),K(q(t),"getFileText",function(){var e=Q(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,h.readFileText(t.file);case 4:return r=e.sent,e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),K(q(t),"createVsuspUrl",(function(e,t){var r=m.convertSuspensionData(e.front,t),n=m.convertSuspensionData(e.rear,t),o=m.generateSuspension(r),i=m.generateSuspension(n),a=m.generatePrefs();return m.generateVsuspUrl(o,i,a)})),t.state={dragging:!1,files:[],fileError:!1,suspensionsIniData:null,tyresIniData:null,vsuspUrl:null},t}return t=u,(r=[{key:"render",value:function(){return this.state.fileData&&this.state.fileData.file,this.state.files,(0,i.jsx)(S,{onDragOver:this.onDragOver,onDragLeave:this.onDragLeaveDebounced,onChange:this.onFileSelected,multiple:!0,children:(0,i.jsxs)("div",{className:s().mainLayout,children:[(0,i.jsxs)("div",{className:s().titleWrapper,children:[(0,i.jsx)("h1",{className:s().title,children:"Assetto Corsa\u2014VSusp converter"}),(0,i.jsxs)("p",{className:s().description,children:["Convert Assetto Corsa suspension files to VSusp geometries!",(0,i.jsx)("br",{}),"Drop your suspensions.ini and tyres.ini files here and you're good to go!",(0,i.jsx)("br",{}),"Use ",(0,i.jsx)("a",{href:"https://www.racedepartment.com/downloads/assetto-corsa-car-tuner.13946/",target:"_blank",rel:"noopener noreferrer",children:"Assetto Corsa Car Tuner"})," to create suspension files."]})]}),this.state.fileError&&(0,i.jsx)("p",{className:s().warning,children:"This file type is not supported. Please choose another file."}),(0,i.jsxs)("div",{className:s().fileDropIndicator,children:[(0,i.jsx)("span",{className:s().fileDropIndicatorText,children:"Drag & drop anywhere"}),(0,i.jsx)(H,{fileName:"suspensions.ini",isPresent:!!this.state.suspensionsIniData}),(0,i.jsx)(H,{fileName:"tyres.ini",isPresent:!!this.state.tyresIniData}),!!this.state.vsuspUrl&&(0,i.jsx)("a",{href:this.state.vsuspUrl,className:s().vsuspLink,target:"_blank",rel:"noopener noreferrer",children:"Open in Vsusp \ud83d\ude80"}),(0,i.jsx)("div",{className:s().filePickerWrapper,children:(0,i.jsx)(X,{label:"Or browse files",onChange:this.onFileSelected,multiple:!0})})]})]})})}}])&&G(t.prototype,r),n&&G(t,n),u}(a.Component),ie=oe},163:function(e){e.exports={button:"file-picker_button__ne4va","file-label":"file-picker_file-label__CUbTw",fileLabel:"file-picker_file-label__CUbTw","file-input":"file-picker_file-input__EnTpZ",fileInput:"file-picker_file-input__EnTpZ"}},2974:function(e){e.exports={file:"file-status_file__AcsLG","file-name-present":"file-status_file-name-present__dsjf5",fileNamePresent:"file-status_file-name-present__dsjf5","file-not-present":"file-status_file-not-present___L_Dk",fileNotPresent:"file-status_file-not-present___L_Dk","file-present":"file-status_file-present__FwvH1",filePresent:"file-status_file-present__FwvH1"}},6697:function(e){e.exports={"main-layout":"index_main-layout__RH0N_",mainLayout:"index_main-layout__RH0N_","title-wrapper":"index_title-wrapper__br2Y9",titleWrapper:"index_title-wrapper__br2Y9",title:"index_title__qVQRs",description:"index_description__X19U9","file-drop-indicator":"index_file-drop-indicator__7X4QN",fileDropIndicator:"index_file-drop-indicator__7X4QN","file-drop-indicator-text":"index_file-drop-indicator-text__frTgj",fileDropIndicatorText:"index_file-drop-indicator-text__frTgj","file-picker-wrapper":"index_file-picker-wrapper__40lHT",filePickerWrapper:"index_file-picker-wrapper__40lHT",warning:"index_warning__FHGfY","vsusp-link":"index_vsusp-link__Ci_yy",vsuspLink:"index_vsusp-link__Ci_yy"}},1664:function(e,t,r){r(8418)}},function(e){e.O(0,[662,774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);