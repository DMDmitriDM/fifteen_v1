// dad.js

export default function setDaD() {
  // Elements
  const sources = document.querySelectorAll('.box_source-div');
  const targets = document.querySelectorAll('.box_target-div-cell');

  // ---
  // Перемещенные данные
  let dragged = null;

  // ---
  // Источники перемещения
  for (const source of sources) {
    source.addEventListener('dragstart', (event) => {
      event.dataTransfer.dropEffect = 'move';

      dragged = event.target;
    });
  }

  // ---
  // Целевые источники
  for (const target of targets) {
    target.addEventListener('dragover', (event) => {
      event.preventDefault();

      event.dataTransfer.dropEffect = 'move';
    });

    target.addEventListener('drop', () => {
      // event.preventDefault();

      // Проверим занята ли ячейка
      if (target.dataset.busy === 'yes') {
        // console.log(`busy: ${target.dataset.busy}, not drop`);
        return;
      }

      // Проверека что ячейки рядом и не по диагонали
      const numberTarget = Number(target.dataset.number);
      // console.log(numberTarget);

      const numberSource = Number(dragged.parentNode.dataset.number);
      // console.log(numberSource);

      if (!testCell(numberTarget, numberSource)) {
        console.log('Not near, not drop');
        return;
      }

      // console.log('Yes near, drop');

      // Меняем busy и перемещаем
      target.dataset.busy = 'yes';
      dragged.parentNode.dataset.busy = 'not';

      dragged.parentNode.removeChild(dragged);
      target.appendChild(dragged);
    });
  }

  // ---
  // Функции
  function testCell(numberTarget, numberSource) {
    const rowTarget = getRowCell(numberTarget);
    const rowSource = getRowCell(numberSource);

    if (rowTarget === rowSource) {
      const shiftCell = numberTarget - numberSource;

      // ячейки рядом в одном ряду и разница в номере 1
      if (shiftCell === 1 || shiftCell === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      const shiftCell = numberTarget - numberSource;

      // ячеки по вертикали
      // 4 - это кол-во ячеек в ряду
      if (shiftCell === 4 || shiftCell === -4) {
        return true;
      } else {
        return false;
      }
    }
  }

  function getRowCell(number) {
    if (number <= 4) {
      return 1;
    } else if (number >= 5 && number <= 8) {
      return 2;
    } else if (number >= 9 && number <= 12) {
      return 3;
    }

    return 4;
  }
}
