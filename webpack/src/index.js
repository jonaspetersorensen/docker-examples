import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['This text was injected by ', './src/index.js'], ' ');
  return element;
}

window.addEventListener('load', function() {
  document.body.appendChild(component());
})