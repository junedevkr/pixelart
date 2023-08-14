const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
let gridSize;
resizeCanvas();

function resizeCanvas() {
  gridSize = parseInt(document.getElementById('canvasSize').value);
  canvas.width = gridSize * 30;
  canvas.height = gridSize * 30;
  drawGrid();
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      ctx.strokeRect(x * 30, y * 30, 30, 30);
    }
  }
}

const colorPalette = document.getElementById('colorPalette');
const selectedColor = document.getElementById('selectedColor');

const colors = [
    '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', '#008080', '#c0c0c0',
    '#808080', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff',
    // 기타 240개의 색상 코드
    '#800000', '#8b0000', '#a52a2a', '#b22222', '#dc143c', '#ff0000', '#ff6347', '#ff7f50', 
    '#cd853f', '#d2691e', '#ee82ee', '#f4a460', '#adff2f', '#32cd32', '#90ee90', '#00ee76', 
    '#3cb371', '#8fbc8f', '#228b22', '#2e8b57', '#7fff00', '#98fb98', '#9acd32', '#32cd32', 
    '#66cdaa', '#3cb371', '#7cfc00', '#01796f', '#00ff00', '#7fffd4', '#40e0d0', '#2e8b57', 
    '#00ced1', '#8a2be2', '#4b0082', '#0000ff', '#835071', '#4682b4', '#4169e1', '#387398', 
    '#2f4f4f', '#00ffff', '#00eeee', '#1e90ff', '#00bfff', '#afeeee', '#00688b', '#00ced1', 
    '#483d8b', '#5f9ea0', '#8b8970', '#00bcd4', '#20b2aa', '#696969', '#808080', '#778899', 
    '#dcdcdc', '#708090', '#c0c0c0', '#ffffff', '#68a0e0', '#ff00ff', '#ff1493', '#ffb6c1', 
    '#ff69b4', '#dc143c', '#ffb6c1', '#ff69b4', '#dc143c', '#db7093', '#c71585', '#d25172', 
    '#800080', '#9932cc', '#d8bfd8', '#dda0dd', '#ee82ee', '#da70d6', '#ff00ff', '#ba55d3', 
    '#c71585', '#9400d3', '#8b008b', '#9370db', '#8a2be2', '#483d8b', '#4f3f84', '#7b68ee', 
    '#7f00ff', '#6a5acd', '#00008b', '#778899', '#708090', '#191970', '#641b51', '#104d6e', 
    '#4682b4', '#5f9ea0', '#8fbc8f', '#6495ed', '#6a5acd', '#4169e1', '#ffffff', '#f0e567', 
    '#800080', '#ee82ee', '#ff69b4', '#ff69b4', '#e22582', '#ad2d12', '#5e370e', '#5d4466', 
    '#6633cc', '#694bbc', '#5433bb', '#4249ff', '#4f5d6f', '#45f49f', '#49a37c', '#13926a', 
    '#55a9bc', '#97729b', '#614040', '#2e2cff', '#1e76ff', '#4a99ba', '#ff0000', '#660000', 
    '#fd529b', '#80003a', '#6e7a7f', '#ee709a', '#8e0b0b', '#350350', '#3e1c69', '#e0126f', 
    '#a16974', '#ba8162', '#f75c5c', '#980d0d', '#e37a99', '#6760a6', '#455430', '#be9a9b', 
    '#4d1a22', '#8374f5', '#111111', '#222222', '#333333', '#444444', '#555555', '#666666', 
    '#777777', '#888888', '#999999', '#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd', '#eeeeee'
  ];
  

let currentColor = '#000000';

colors.forEach(color => {
  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box');
  colorBox.style.backgroundColor = color;
  colorBox.addEventListener('click', () => {
    currentColor = color;
    selectedColor.style.backgroundColor = currentColor;
  });
  colorPalette.appendChild(colorBox);
});

selectedColor.style.backgroundColor = currentColor;


function downloadPng() {
  const link = document.createElement('a');
  link.download = 'pixelart.png';
  link.href = canvas.toDataURL();
  link.click();
}
    
// 이전 코드 이후 추가
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

let isMouseDown = false;

function onMouseDown(event) {
  isMouseDown = true;
  paint(event);
}

function onMouseMove(event) {
  if (isMouseDown) {
    paint(event);
  }
}

function onMouseUp() {
  isMouseDown = false;
}

function paint(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / 30);
  const y = Math.floor((event.clientY - rect.top) / 30);

  ctx.fillStyle = currentColor;
  ctx.fillRect(x * 30, y * 30, 30, 30);
  
    // 원래 테두리를 다시 그리는 코드 추가
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.strokeRect(x * 30, y * 30, 30, 30);
}

// 전체 지우는 코드 추가
document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
}
