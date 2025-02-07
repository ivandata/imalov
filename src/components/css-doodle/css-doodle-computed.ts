import { getRandomIntInclusive, getRandomColor } from './utils.js';

export function rhombus(): string {
  const grid = `${getRandomIntInclusive(4, 6)}x${getRandomIntInclusive(1, 3)}`;
  const rotation = getRandomIntInclusive(1, 320);

  return `
    @grid: 1 / 100vw 100%;
    background: @doodle(
      :doodle {
        @grid: 1 / 100000px;
        transform: rotate(${rotation}deg) scale(2);
      }
      background-size: 30px 30px;
      background-image: @doodle(
        @grid: ${grid} / calc(100% + 1px);
        @size: calc(100% - 100% / @I * (@i - 1));
        position: absolute;
        border: 1px solid black;
        background: @pn(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()});
      );
    );
  `;
}

export function circles(): string {
  const rotation = getRandomIntInclusive(1, 320);
  const grid = `${getRandomIntInclusive(4, 7)}x1`;

  return `
    @grid: 1 / 100%;
    background: @doodle(
      :doodle {
        @grid: 1 / 10000px;
        transform: rotate(${rotation}deg) scale(2);
      }
      background-size: 30px 30px;
      background-image: @doodle(
        @grid: ${grid} / calc(100% + 1px);
        @place-cell: center;
        @size: calc(100% - 100% / @I * (@i - 1));
        border-radius: calc(100% / @I * (@i - 1));
        border: 1px solid black;
        background: @pn(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()});
      );
    );
  `;
}

export function updateDoodle(doodle: HTMLDivElement) {
  const randomChoice = Math.random();
  doodle.update(randomChoice > 0.5 ? circles() : rhombus());
}

export function initDoodle(doodle: HTMLDivElement) {
  updateDoodle(doodle);
  updateDoodle(doodle);
}
