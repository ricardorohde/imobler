!function(e,t,n){function r(e,t){return typeof e===t}function i(){var e,t,n,i,o,a,s;for(var l in S)if(S.hasOwnProperty(l)){if(e=[],t=S[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)a=e[o],s=a.split("."),1===s.length?w[s[0]]=i:(!w[s[0]]||w[s[0]]instanceof Boolean||(w[s[0]]=new Boolean(w[s[0]])),w[s[0]][s[1]]=i),x.push((i?"":"no-")+s.join("-"))}}function o(e){var t=T.className,n=w._config.classPrefix||"";if(E&&(t=t.baseVal),w._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}w._config.enableClasses&&(t+=" "+n+e.join(" "+n),E?T.className.baseVal=t:T.className=t)}function a(e,t){if("object"==typeof e)for(var n in e)N(e,n)&&a(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),i=w[r[0]];if(2==r.length&&(i=i[r[1]]),"undefined"!=typeof i)return w;t="function"==typeof t?t():t,1==r.length?w[r[0]]=t:(!w[r[0]]||w[r[0]]instanceof Boolean||(w[r[0]]=new Boolean(w[r[0]])),w[r[0]][r[1]]=t),o([(t&&0!=t?"":"no-")+r.join("-")]),w._trigger(e,t)}return w}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):E?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function u(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(e,t){return e-1===t||e===t||e+1===t}function f(){var e=t.body;return e||(e=s(E?"svg":"body"),e.fake=!0),e}function c(e,n,r,i){var o,a,l,u,d="modernizr",c=s("div"),p=f();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=i?i[r]:d+(r+1),c.appendChild(l);return o=s("style"),o.type="text/css",o.id="s"+d,(p.fake?p:c).appendChild(o),p.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",u=T.style.overflow,T.style.overflow="hidden",T.appendChild(p)),a=n(c,e),p.fake?(p.parentNode.removeChild(p),T.style.overflow=u,T.offsetHeight):c.parentNode.removeChild(c),!!a}function p(e,t){return!!~(""+e).indexOf(t)}function m(t,r){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(u(t[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+u(t[i])+":"+r+")");return o=o.join(" or "),c("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function h(e,t){return function(){return e.apply(t,arguments)}}function v(e,t,n){var i;for(var o in e)if(e[o]in t)return n===!1?e[o]:(i=t[e[o]],r(i,"function")?h(i,n||t):i);return!1}function g(e,t,i,o){function a(){d&&(delete R.style,delete R.modElem)}if(o=!r(o,"undefined")&&o,!r(i,"undefined")){var u=m(e,i);if(!r(u,"undefined"))return u}for(var d,f,c,h,v,g=["modernizr","tspan"];!R.style;)d=!0,R.modElem=s(g.shift()),R.style=R.modElem.style;for(c=e.length,f=0;c>f;f++)if(h=e[f],v=R.style[h],p(h,"-")&&(h=l(h)),R.style[h]!==n){if(o||r(i,"undefined"))return a(),"pfx"!=t||h;try{R.style[h]=i}catch(e){}if(R.style[h]!=v)return a(),"pfx"!=t||h}return a(),!1}function y(e,t,n,i,o){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+j.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?g(s,t,i,o):(s=(e+" "+z.join(a+" ")+a).split(" "),v(s,t,n))}function A(e,t,r){return y(e,n,n,t,r)}var x=[],S=[],b={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){S.push({name:e,fn:t,options:n})},addAsyncTest:function(e){S.push({name:null,fn:e})}},w=function(){};w.prototype=b,w=new w,w.addTest("target",function(){var t=e.document;if(!("querySelectorAll"in t))return!1;try{return t.querySelectorAll(":target"),!0}catch(e){return!1}});var C=b._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];b._prefixes=C;var T=t.documentElement,E="svg"===T.nodeName.toLowerCase();E||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=C.elements;return"string"==typeof e?e.split(" "):e}function i(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,u(t)}function o(e){var t=w[e[S]];return t||(t={},b++,e[S]=b,w[b]=t),t}function a(e,n,r){if(n||(n=t),v)return n.createElement(e);r||(r=o(n));var i;return i=r.cache[e]?r.cache[e].cloneNode():x.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!i.canHaveChildren||A.test(e)||i.tagUrn?i:r.frag.appendChild(i)}function s(e,n){if(e||(e=t),v)return e.createDocumentFragment();n=n||o(e);for(var i=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)i.createElement(s[a]);return i}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function u(e){e||(e=t);var r=o(e);return!C.shivCSS||h||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),v||l(e,r),e}function d(e){for(var t,n=e.getElementsByTagName("*"),i=n.length,o=RegExp("^(?:"+r().join("|")+")$","i"),a=[];i--;)t=n[i],o.test(t.nodeName)&&a.push(t.applyElement(f(t)));return a}function f(e){for(var t,n=e.attributes,r=n.length,i=e.ownerDocument.createElement(E+":"+e.nodeName);r--;)t=n[r],t.specified&&i.setAttribute(t.nodeName,t.nodeValue);return i.style.cssText=e.style.cssText,i}function c(e){for(var t,n=e.split("{"),i=n.length,o=RegExp("(^|[\\s,>+~])("+r().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),a="$1"+E+"\\:$2";i--;)t=n[i]=n[i].split("}"),t[t.length-1]=t[t.length-1].replace(o,a),n[i]=t.join("}");return n.join("{")}function p(e){for(var t=e.length;t--;)e[t].removeNode()}function m(e){function t(){clearTimeout(a._removeSheetTimer),r&&r.removeNode(!0),r=null}var r,i,a=o(e),s=e.namespaces,l=e.parentWindow;return!_||e.printShived?e:("undefined"==typeof s[E]&&s.add(E),l.attachEvent("onbeforeprint",function(){t();for(var o,a,s,l=e.styleSheets,u=[],f=l.length,p=Array(f);f--;)p[f]=l[f];for(;s=p.pop();)if(!s.disabled&&T.test(s.media)){try{o=s.imports,a=o.length}catch(e){a=0}for(f=0;a>f;f++)p.push(o[f]);try{u.push(s.cssText)}catch(e){}}u=c(u.reverse().join("")),i=d(e),r=n(e,u)}),l.attachEvent("onafterprint",function(){p(i),clearTimeout(a._removeSheetTimer),a._removeSheetTimer=setTimeout(t,500)}),e.printShived=!0,e)}var h,v,g="3.7.3",y=e.html5||{},A=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,x=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,S="_html5shiv",b=0,w={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",h="hidden"in e,v=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(e){h=!0,v=!0}}();var C={elements:y.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:g,shivCSS:y.shivCSS!==!1,supportsUnknownElements:v,shivMethods:y.shivMethods!==!1,type:"default",shivDocument:u,createElement:a,createDocumentFragment:s,addElements:i};e.html5=C,u(t);var T=/^$|\b(?:all|print)\b/,E="html5shiv",_=!v&&function(){var n=t.documentElement;return!("undefined"==typeof t.namespaces||"undefined"==typeof t.parentWindow||"undefined"==typeof n.applyElement||"undefined"==typeof n.removeNode||"undefined"==typeof e.attachEvent)}();C.type+=" print",C.shivPrint=m,m(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var _="Moz O ms Webkit",z=b._config.usePrefixes?_.toLowerCase().split(" "):[];b._domPrefixes=z;var N;!function(){var e={}.hasOwnProperty;N=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),b._l={},b.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),w.hasOwnProperty(e)&&setTimeout(function(){w._trigger(e,w[e])},0)},b._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},w._q.push(function(){b.addTest=a}),w.addAsyncTest(function(){var e=new Image;e.onerror=function(){a("webpanimation",!1,{aliases:["webp-animation"]})},e.onload=function(){a("webpanimation",1==e.width,{aliases:["webp-animation"]})},e.src="data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"});var j=b._config.usePrefixes?_.split(" "):[];b._cssomPrefixes=j;var k=function(t){var r,i=C.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var a=0;i>a;a++){var s=C[a],l=s.toUpperCase()+"_"+r;if(l in o)return"@-"+s.toLowerCase()+"-"+t}return!1};b.atRule=k;var P=function(){function e(e,t){var i;return!!e&&(t&&"string"!=typeof t||(t=s(t||"div")),e="on"+e,i=e in t,!i&&r&&(t.setAttribute||(t=s("div")),t.setAttribute(e,""),i="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),i)}var r=!("onblur"in t.documentElement);return e}();b.hasEvent=P;var M=function(e,t){var n=!1,r=s("div"),i=r.style;if(e in i){var o=z.length;for(i[e]=t,n=i[e];o--&&!n;)i[e]="-"+z[o]+"-"+t,n=i[e]}return""===n&&(n=!1),n};b.prefixedCSSValue=M,w.addTest("webanimations","animate"in s("div")),w.addTest("multiplebgs",function(){var e=s("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)});var q="CSS"in e&&"supports"in e.CSS,B="supportsCSS"in e;w.addTest("supports",q||B);var F=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return c("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();b.mq=F;var D=b.testStyles=c;D("#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}",function(t){var n=t.firstChild;n.innerHTML="This is a text written in Arial",w.addTest("subpixelfont",!!e.getComputedStyle&&"44px"!==e.getComputedStyle(n,null).getPropertyValue("width"))},1,["subpixel"]),w.addTest("cssvalid",function(){return D("#modernizr input{height:0;border:0;padding:0;margin:0;width:10px} #modernizr input:valid{width:50px}",function(e){var t=s("input");return e.appendChild(t),t.clientWidth>10})}),D("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],r=t.childNodes[1],i=t.childNodes[0],o=parseInt((r.offsetWidth-r.clientWidth)/2,10),a=i.clientWidth/100,s=i.clientHeight/100,l=parseInt(50*Math.max(a,s),10),u=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);w.addTest("cssvmaxunit",d(l,u)||d(l,u-o))},3),D("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);w.addTest("cssvwunit",r==n)});var L={elem:s("modernizr")};w._q.push(function(){delete L.elem});var R={style:L.elem.style};w._q.unshift(function(){delete R.style});var U=b.testProp=function(e,t,r){return g([e],n,t,r)};w.addTest("textshadow",U("textShadow","1px 1px")),b.testAllProps=y;var W=b.prefixed=function(e,t,n){return 0===e.indexOf("@")?k(e):(-1!=e.indexOf("-")&&(e=l(e)),t?y(e,t,n):y(e,"pfx"))};b.prefixedCSS=function(e){var t=W(e);return t&&u(t)},w.addTest("requestanimationframe",!!W("requestAnimationFrame",e),{aliases:["raf"]}),b.testAllProps=A,w.addTest("cssanimations",A("animationName","a",!0)),w.addTest("csspseudoanimations",function(){var t=!1;if(!w.cssanimations||!e.getComputedStyle)return t;var n=["@",w._prefixes.join("keyframes csspseudoanimations { from { font-size: 10px; } }@").replace(/\@$/,""),'#modernizr:before { content:" "; font-size:5px;',w._prefixes.join("animation:csspseudoanimations 1ms infinite;"),"}"].join("");return w.testStyles(n,function(n){t="10px"===e.getComputedStyle(n,":before").getPropertyValue("font-size")}),t}),w.addTest("ellipsis",A("textOverflow","ellipsis")),w.addTest("cssmask",A("maskRepeat","repeat-x",!0)),w.addTest("overflowscrolling",A("overflowScrolling","touch",!0)),w.addTest("cssresize",A("resize","both",!0)),w.addTest("csstransforms3d",function(){var e=!!A("perspective","1px",!0),t=w._config.usePrefixes;if(e&&(!t||"webkitPerspective"in T.style)){var n,r="#modernizr{width:0;height:0}";w.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",D(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),w.addTest("csstransitions",A("transition","all",!0)),i(),o(x),delete b.addTest,delete b.addAsyncTest;for(var $=0;$<w._q.length;$++)w._q[$]();e.Modernizr=w}(window,document);