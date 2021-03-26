// json파일로 부터 item정보 받아오기
function loadItems() {
  return fetch("data/data.json") // fetch함수로 해당 경로의 데이터를 받아온다
    .then((response) => response.json()) // 받아온 데이터를 json형식으로 변롼
    .then((json) => json.items); // json파일 내부에 있는 items를 반환
}

function displayItems(items) {
  const container = document.querySelector(".items"); // document(HTML 파일 전체를 의미) querySelector를 사용하여 HTML파일의 items 클래스를 js로 가져옴
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); // innerHTML를 이용하여 container의 모든 HTML요소를 가져옴
}

function createHTMLString(item) {
  return `
      <li class="item">
          <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
          <span class="item__description">${item.gender}, ${item.size}</span>
      </li>
      `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// 메인
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
