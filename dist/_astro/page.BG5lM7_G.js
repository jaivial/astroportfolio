const d=new Set,c=new WeakSet;let f,h,l=!1;function m(e){l||(l=!0,f??=!1,h??="hover",g(),p(),w(),S())}function g(){for(const e of["touchstart","mousedown"])document.body.addEventListener(e,(e=>{i(e.target,"tap")&&s(e.target.href,{with:"fetch",ignoreSlowConnection:!0})}),{passive:!0})}function p(){let e;function t(t){const n=t.target.href;e&&clearTimeout(e),e=setTimeout((()=>{s(n,{with:"fetch"})}),80)}function n(){e&&(clearTimeout(e),e=0)}document.body.addEventListener("focusin",(e=>{i(e.target,"hover")&&t(e)}),{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),u((()=>{for(const e of document.getElementsByTagName("a"))c.has(e)||i(e,"hover")&&(c.add(e),e.addEventListener("mouseenter",t,{passive:!0}),e.addEventListener("mouseleave",n,{passive:!0}))}))}function w(){let e;u((()=>{for(const t of document.getElementsByTagName("a"))c.has(t)||i(t,"viewport")&&(c.add(t),e??=y(),e.observe(t))}))}function y(){const e=new WeakMap;return new IntersectionObserver(((t,n)=>{for(const o of t){const t=o.target,a=e.get(t);o.isIntersecting?(a&&clearTimeout(a),e.set(t,setTimeout((()=>{n.unobserve(t),e.delete(t),s(t.href,{with:"link"})}),300))):a&&(clearTimeout(a),e.delete(t))}}))}function S(){u((()=>{for(const e of document.getElementsByTagName("a"))i(e,"load")&&s(e.href,{with:"link"})}))}function s(e,t){if(L(e,t?.ignoreSlowConnection??!1))if(d.add(e),"link"===(t?.with??"link")){const t=document.createElement("link");t.rel="prefetch",t.setAttribute("href",e),document.head.append(t)}else fetch(e).catch((t=>{console.log(`[astro] Failed to prefetch ${e}`),console.error(t)}))}function L(e,t){if(!navigator.onLine||!t&&v())return!1;try{const t=new URL(e,location.href);return location.origin===t.origin&&(location.pathname!==t.pathname||location.search!==t.search)&&!d.has(e)}catch{}return!1}function i(e,t){if("A"!==e?.tagName)return!1;const n=e.dataset.astroPrefetch;return"false"!==n&&(!("tap"!==t||null==n&&!f||!v())||(null==n&&f||""===n?t===h:n===t))}function v(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function u(e){e();let t=!1;document.addEventListener("astro:page-load",(()=>{t?e():t=!0}))}m();