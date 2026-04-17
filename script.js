const patternData = {
  meta: {
    title: "Meta-transactions: базовый gasless-подход",
    text:
      "Пользователь подписывает сообщение с параметрами действия. Relayer берет это сообщение, формирует обычную on-chain транзакцию, платит gas и вызывает контракт от своего адреса.",
    bullets: [
      "Контракт должен понимать, кто исходный пользователь, а не только relayer.",
      "Нужны nonce, deadline и проверка подписи.",
      "Хорошо подходит для controlled flows: claim, mint, invite, onboarding."
    ]
  },
  erc2771: {
    title: "ERC-2771: standard trusted forwarder",
    text:
      "Forwarder становится стандартизованной точкой входа. Контракт-получатель доверяет только определенному forwarder'у и умеет достать реального отправителя из конца calldata.",
    bullets: [
      "У target contract появляется поддержка trusted forwarder.",
      "Можно строить переиспользуемую relayer-инфраструктуру.",
      "Критично не забыть про `_msgSender()` и replay protection."
    ]
  },
  aa: {
    title: "ERC-4337: account abstraction",
    text:
      "Здесь пользователь работает уже не только как EOA. Он создает `UserOperation`, bundler доставляет ее в `EntryPoint`, а `paymaster` при необходимости спонсирует gas.",
    bullets: [
      "Smart account сам валидирует подпись и логику авторизации.",
      "Paymaster позволяет гибко оплачивать gas по бизнес-правилам.",
      "Это более мощная архитектура для долгоживущего продукта, чем простой relayer."
    ]
  }
};

const flowData = [
  {
    label: "UI: пользовательский триггер",
    title: "Пользователь нажимает кнопку действия",
    text:
      "Интерфейс собирает параметры операции и подготавливает не обычную raw transaction, а signable intent. Это важный UX-сдвиг: сначала согласие, потом доставка в сеть.",
    note: "UX слой"
  },
  {
    label: "Wallet signature",
    title: "Кошелек подписывает структурированные данные",
    text:
      "Чаще всего используется EIP-712, потому что он делает подпись читаемой и формально привязывает ее к domain: `chainId`, `verifyingContract`, `name`, `version`.",
    note: "Без прямой оплаты gas"
  },
  {
    label: "Relayer policy",
    title: "Backend принимает решение о sponsorship",
    text:
      "На этом этапе обычно стоят product rules: кто имеет право на бесплатную операцию, сколько раз, на какие методы, до какого лимита и не выглядит ли запрос как abuse.",
    note: "Anti-spam и budget control"
  },
  {
    label: "On-chain validation",
    title: "Forwarder или smart account проверяет подпись и nonce",
    text:
      "Если подпись не соответствует payload, nonce уже использован или истек deadline, вызов должен быть отвергнут. Именно здесь закрепляется доверие всей схемы.",
    note: "Безопасность"
  },
  {
    label: "Execution and gas payment",
    title: "Sponsor платит gas, а контракт исполняет бизнес-логику",
    text:
      "С точки зрения сети это обычное выполнение EVM. Разница в том, что экономический плательщик и логический инициатор действия больше не обязаны совпадать.",
    note: "Relayer / Paymaster"
  }
];

const compareData = {
  before: [
    {
      title: "Первый экран",
      text: "Пользователь видит требование купить ETH еще до первого ценного действия.",
      bullets: [
        "Высокий friction на onboarding.",
        "Сильный drop-off у новичков."
      ]
    },
    {
      title: "Подтверждение",
      text: "Интерфейс просит отправить transaction, не объясняя стоимость, назначение и почему нужен gas.",
      bullets: [
        "Путается подпись, approve и реальная tx.",
        "Пользователь боится подтверждать."
      ]
    }
  ],
  after: [
    {
      title: "Первый экран",
      text: "Пользователь сразу совершает полезное действие: claim access, mint pass, create wallet, first swap.",
      bullets: [
        "ETH на старте не обязателен.",
        "Видимая ценность приходит раньше."
      ]
    },
    {
      title: "Подтверждение",
      text: "UI честно пишет: вы подписываете разрешение, сеть оплатит протокол в рамках бесплатного лимита.",
      bullets: [
        "Понятно, что именно подписывается.",
        "Ограничения sponsorship сформулированы заранее."
      ]
    }
  ]
};

const patternCards = document.querySelectorAll(".pattern-card");
const patternDetail = document.getElementById("pattern-detail");
const flowButtons = document.querySelectorAll(".flow-step");
const flowVisual = document.getElementById("flow-visual");
const compareTabs = document.querySelectorAll(".compare-tab");
const compareContent = document.getElementById("compare-content");

function renderPattern(key) {
  const item = patternData[key];
  patternDetail.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.text}</p>
    <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
  `;
}

function renderFlow(index) {
  const item = flowData[index];
  flowVisual.innerHTML = `
    <article class="flow-screen">
      <span class="flow-callout">${item.label}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <ul>
        <li><strong>Фокус:</strong> ${item.note}</li>
      </ul>
    </article>
  `;
}

function renderCompare(key) {
  compareContent.innerHTML = compareData[key]
    .map(
      (item) => `
        <article class="compare-box">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
          <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

patternCards.forEach((card) => {
  card.addEventListener("click", () => {
    patternCards.forEach((node) => node.classList.remove("active"));
    card.classList.add("active");
    renderPattern(card.dataset.pattern);
  });
});

flowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    flowButtons.forEach((node) => node.classList.remove("active"));
    button.classList.add("active");
    renderFlow(Number(button.dataset.step));
  });
});

compareTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    compareTabs.forEach((node) => node.classList.remove("active"));
    tab.classList.add("active");
    renderCompare(tab.dataset.tab);
  });
});

renderPattern("meta");
renderFlow(0);
renderCompare("before");
