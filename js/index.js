!function(){"use strict";var t={};t.favToggles=document.querySelectorAll(".fav-toggle"),t.lazyOnlyImgs=document.querySelectorAll("img.lazy:not(.zoom)"),t.lazyZoomImgs=document.querySelectorAll("img.lazy.zoom"),t.menu=document.querySelector("nav .menu"),t.menuToggle=document.querySelector("nav .menu-toggle"),t.modal=document.querySelector(".modal"),t.modalCvs=document.querySelector(".modal-cvs"),t.products=document.querySelectorAll(".product"),t.zoomOnlyImgs=document.querySelectorAll("img.zoom:not(.lazy)");var e=void 0,o=void 0,n=function(t){var n=t.target,c=n.getAttribute("data-product-id"),r=e.indexOf(c);r>=0?(e.splice(r,1),n.classList.remove("on")):(e.push(c),n.classList.add("on")),function(){try{localStorage.setItem("favs",JSON.stringify(e))}catch(t){console.log(t)}}(),o.forEach(function(t){return a(t)})},a=function(t){e.indexOf(t.getAttribute("data-product-id"))>=0?t.classList.add("fav"):t.classList.remove("fav")},c=function(t,c){o=c||[],function(){try{e=JSON.parse(localStorage.getItem("favs"))||[]}catch(t){console.log(t),e=[]}}(),r=t,o.forEach(function(t){return a(t)}),r.forEach(function(t){e.indexOf(t.getAttribute("data-product-id"))>=0&&t.classList.add("on"),t.addEventListener("click",n)});var r},r=function(t,e){return t.forEach(function(t){return function(t,e){var o=document.createElement("img");o.setAttribute("src",t.getAttribute("data-src")),o.addEventListener("load",function(t,e,o){t.classList.add("loaded"),t.setAttribute("src",e.getAttribute("src")),t.removeAttribute("data-src"),o&&o(t)}.bind(null,t,o,e));var n=document.createElement("canvas"),a=n.getContext("2d"),c=[t.naturalWidth,t.naturalHeight];n.width=c[0],n.height=c[1],a.filter="blur(2px)",a.drawImage(t,0,0,c[0],c[1]),t.classList.contains("loaded")||t.setAttribute("src",n.toDataURL())}(t,e)})},l=!1,d=function e(){l?(document.body.classList.remove("modal-small-on"),t.menu.classList.remove("on"),t.modal.removeEventListener("click",e),l=!1):(document.body.classList.add("modal-small-on"),t.menu.classList.add("on"),t.modal.addEventListener("click",e),l=!0)},s=function(){t.menuToggle.addEventListener("click",d)};window.addEventListener("load",function(){s(),c(t.favToggles,t.products),r(t.lazyOnlyImgs)})}();