const colorSection = document.getElementById('color-section');
const themeColor = document.getElementById('theme-color');
const themeType = document.getElementById('theme-type');
const colorForm = document.getElementById('color-form');
let colorArr = [];

function renderColors(arr){
  let colorsHTML = ``;
  let colorsDescHTML = ``;
  let i = 0;
  for(let color of arr){
    colorsHTML += `
      <div class="color color-${i}" data-hex="${color}"></div>
    `;
    colorsDescHTML += `
      <p class="color-desc" data-hex="${color}">${color}</p>
    `;
    i++;
  }

  let colorSectionHTML = colorsHTML + colorsDescHTML
  
  colorSection.innerHTML = colorSectionHTML;

  for(let i=0; i<5; i++){
    document.querySelector(`.color-${i}`).style.backgroundColor = colorArr[i];
  }
}

colorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(colorArr)
  let url = `https://www.thecolorapi.com/scheme?hex=${themeColor.value.slice(1)}&format=json&mode=${themeType.value}&count=5`;
  fetch(url, {method: 'GET', headers: {'Content-Type': 'application/json'}})
  .then(res => res.json())
  .then(data => {
    for(let color of data.colors){
      colorArr.push(color.hex.value)
    }
    renderColors(colorArr);
    colorArr = [];
  })
})

colorSection.addEventListener('click', (e) => {
  const target = e.target.closest('[data-hex]');
  if (!target) return;

  const hex = target.dataset.hex;

  navigator.clipboard.writeText(hex)
    .then(() => {
      const desc = target.classList.contains('color-desc')
        ? target
        : colorSection.querySelector(`.color-desc[data-hex="${hex}"]`);

      if (!desc) return;
      const original = desc.textContent;
      desc.textContent = 'Copied!';
      setTimeout(() => { desc.textContent = original; }, 1000);
    })
    .catch(err => console.error('Error: ', err));
});
