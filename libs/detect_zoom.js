function detect_zoom(){var a=Math.max;(function(a,b,c){a[b]=c(b,a)})(window,"detectZoom",function(){var b=Math.round,c=function(){return window.devicePixelRatio||1},d=function(){return{zoom:1,devicePxPerCssPx:1}},g=function(){var a=b(100*(screen.deviceXDPI/screen.logicalXDPI))/100;return{zoom:a,devicePxPerCssPx:a*c()}},h=function(){var a=b(100*(document.documentElement.offsetHeight/window.innerHeight))/100;return{zoom:a,devicePxPerCssPx:a*c()}},j=function(){var a=90===Math.abs(window.orientation)?screen.height:screen.width,b=a/window.innerWidth;return{zoom:b,devicePxPerCssPx:b*c()}},i=function(){var c=a("min--moz-device-pixel-ratio","",0,10,20,1e-4);return c=b(100*c)/100,{zoom:c,devicePxPerCssPx:c}},k=function(){return{zoom:i().zoom,devicePxPerCssPx:c()}},m=function(){var a=window.top.outerWidth/window.top.innerWidth;return a=b(100*a)/100,{zoom:a,devicePxPerCssPx:a*c()}},a=function(b,d,e,g,h,j){function k(c,e,f){var g=(c+e)/2;return 0>=f||j>e-c?g:m("("+b+":"+g+d+")").matches?k(g,e,f-1):k(c,g,f-1)}var m,i,n,o;window.matchMedia?m=window.matchMedia:(i=document.getElementsByTagName("head")[0],n=document.createElement("style"),i.appendChild(n),o=document.createElement("div"),o.className="mediaQueryBinarySearch",o.style.display="none",document.body.appendChild(o),m=function(a){n.sheet.insertRule("@media "+a+"{.mediaQueryBinarySearch {text-decoration: underline} }",0);var b="underline"===getComputedStyle(o,null).textDecoration;return n.sheet.deleteRule(0),{matches:b}});var p=k(e,g,h);return o&&(i.removeChild(n),document.body.removeChild(o)),p},e=function(){var a=d;return isNaN(screen.logicalXDPI)||isNaN(screen.systemXDPI)?window.navigator.msMaxTouchPoints?a=h:"orientation"in window&&"string"==typeof document.body.style.webkitMarquee?a=j:"string"==typeof document.body.style.webkitMarquee?a=s:0<=navigator.userAgent.indexOf("Opera")?a=m:window.devicePixelRatio?a=k:.001<i().zoom&&(a=i):a=g,a}();return{zoom:function(){return e().zoom}}}),document.width=a(document.body.scrollWidth,document.body.offsetWidth,document.documentElement.clientWidth,document.documentElement.scrollWidth,document.documentElement.offsetWidth),document.height=a(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)}