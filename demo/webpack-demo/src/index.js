import './index.css';
import picture from '../images/picture.jpg';
import printMe from './print.js';
import {cube} from './math.js';

function component() {
  var element = document.createElement('div');

  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');

  var myPicture = new Image();
  myPicture.src = picture;
  element.appendChild(myPicture);


  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}