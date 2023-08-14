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

const colorPicker = document.getElementById('colorPicker');
const selectedColor = document.getElementById('selectedColor');

currentColor = '#000000'; // 초기 선택된 색상 설정

$(colorPicker).spectrum({
  color: currentColor,
  showInput: true,
  showInitial: true,
  showPalette: true,
  showSelectionPalette: true,
  showAlpha: false,
  maxPaletteSize: 10,
  preferredFormat: "hex",
  palette: [
    // 기존 colors 배열을 Spectrum 팔레트 형식으로 변경할 수 있습니다.
    // 예: ["#000000", "#800000", "#008000", ...]
  ],
  change: function (color) {
    currentColor = color.toHexString(); // 사용자가 선택한 색상으로 설정
    selectedColor.style.backgroundColor = currentColor;
  },
});


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
