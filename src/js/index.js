import '../css/no_postcss/normalize.css';
import '../css/ok_postcss/style.css';
import icon from '../assets/images/face.ico';

import { enableDragDropTouch } from '@dragdroptouch/drag-drop-touch';

import createElements from './create-elements.js';
import setDaD from './dad.js';

const linkIcon = document.createElement('link');
linkIcon.rel = 'icon';
linkIcon.type = 'image/x-icon';
linkIcon.href = icon;
document.head.append(linkIcon);

enableDragDropTouch();

createElements();
setDaD();

// document.addEventListener('DOMContentLoaded', () => {
//   // createElements();
//   // setDaD();
// });
