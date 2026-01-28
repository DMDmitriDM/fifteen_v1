// create-elements.js

export default function createElements() {
  // container
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);

  // box
  const box = document.createElement('div');
  box.classList.add('box');
  container.append(box);

  // box_target-div
  const boxTargetDiv = document.createElement('div');
  boxTargetDiv.classList.add('box_target-div');
  box.append(boxTargetDiv);

  // box_target-div-cell count 16
  for (let i = 0; i < 16; i++) {
    const boxTargetDivCell = document.createElement('div');
    boxTargetDivCell.classList.add('box_target-div-cell');
    boxTargetDivCell.dataset.number = String(i + 1);

    if (i !== 15) {
      boxTargetDivCell.dataset.busy = 'yes';
    } else {
      boxTargetDivCell.dataset.busy = 'not';
    }

    boxTargetDiv.append(boxTargetDivCell);
  }

  const targets = document.querySelectorAll('.box_target-div-cell');

  // box_source-div count 15 - создать элементы Sources
  for (let i = 0; i < targets.length - 1; i++) {
    const boxSourceDiv = document.createElement('div');
    boxSourceDiv.classList.add('box_source-div');
    boxSourceDiv.setAttribute('draggable', 'true');
    targets[i].append(boxSourceDiv);

    const boxSourceDivSpan = document.createElement('span');
    boxSourceDivSpan.classList.add('box_source-div-span');
    boxSourceDivSpan.textContent = '?';
    boxSourceDiv.append(boxSourceDivSpan);
  }

  // Установить номера Sources
  setSourcesNumbers();

  // btn
  const btnRotate = document.createElement('button');
  btnRotate.classList.add('btn-game', 'btn-reset');
  btnRotate.textContent = 'Начать сначала';
  btnRotate.addEventListener('click', () => {
    refresh(targets);
    setSourcesNumbers();
  });
  box.append(btnRotate);
}

// ------------------------------------- //

function refresh(targets) {
  if (targets[15].dataset.busy !== 'not') {
    let sourceChange;

    // Проверяем 15 от 0 до 14
    for (let i = 0; i < targets.length - 1; i++) {
      if (targets[i].dataset.busy === 'not') {
        sourceChange = targets[15].children[0];

        targets[15].removeChild(sourceChange);
        targets[i].appendChild(sourceChange);

        targets[15].dataset.busy = 'not';
        targets[i].dataset.busy = 'yes';

        break;
      }
    }
  }
}

// Установить номера Sources
function setSourcesNumbers() {
  // Заполнить номерами count 15
  const arrNumber = [];

  for (let i = 0; i < 15; i++) {
    arrNumber.push(i + 1);
  }

  mixArray(arrNumber);

  const sourcesSpans = document.querySelectorAll('.box_source-div-span');
  for (let i = 0; i < sourcesSpans.length; i++) {
    sourcesSpans[i].textContent = arrNumber[i];
  }
}

// Тасование
function mixArray(arr) {
  const count = arr.length;
  for (let i = 0; i < count; i++) {
    // случайный индекс от 0 до count
    const x = Math.floor(Math.random() * count);
    let temp = arr[i];
    arr[i] = arr[x];
    arr[x] = temp;
  }
}
