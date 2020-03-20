function component() {
   const element = document.createElement('div');
   element.innerHTML = "This text was injected by ./src/someotherstuff/index.js";
   return element;
 }
 
 window.addEventListener('load', function() {
   document.body.appendChild(component());
 })