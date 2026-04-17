export const navItems = [
  ["Проблема", "problem"],
  ["Смысл", "meaning"],
  ["Сценарии", "scenarios"],
  ["Путь пользователя", "ux-flow"],
  ["Архитектуры", "architectures"],
  ["Депозит", "deposit-tech"],
  ["Вывод", "withdraw-tech"],
  ["Контракты", "contracts"],
  ["Код", "code"],
  ["Путь DSF", "recommended"],
  ["Стратегия", "strategic"],
  ["Риски", "risks"],
  ["Матрица", "matrix"],
  ["Симулятор", "simulator"],
  ["Вопросы", "faq"]
];

export const heroStats = [
  { label: "Окна кошелька", value: "2 -> 1", detail: "депозит и вывод можно свести к одному шагу подписи" },
  { label: "Кто платит комиссию", value: "Спонсор", detail: "казна протокола, сервис-отправитель, партнерская кампания или спонсор комиссий" },
  { label: "Главная цель", value: "Выпуск и сжигание LP", detail: "без требования держать ETH в самый неудобный момент" }
];

export const problemComparison = {
  deposit: {
    standard: [
      "Подключить кошелек",
      "Убедиться, что есть ETH на комиссию",
      "Разрешить списание стейблкоина",
      "Подтвердить транзакцию депозита",
      "Подождать подтверждения сети",
      "Получить токены DSF LP"
    ],
    gasless: [
      "Подключить кошелек",
      "Подписать разрешение или намерение на депозит",
      "Сервис-отправитель отправляет спонсируемую транзакцию",
      "Хранилище получает стейблкоины",
      "Протокол выпускает токены DSF LP"
    ]
  },
  withdraw: {
    standard: [
      "Открыть вывод",
      "Убедиться, что есть ETH на комиссию",
      "Подтвердить транзакцию вывода",
      "Сжечь или погасить LP-токены",
      "Подождать подтверждения сети",
      "Получить стейблкоины"
    ],
    gasless: [
      "Открыть вывод",
      "Подписать намерение на вывод",
      "Сервис-отправитель отправляет спонсируемую транзакцию",
      "Исполняющий контракт проверяет подпись",
      "DSF сжигает LP-токены и возвращает стейблкоины"
    ]
  }
};

export const meaningCards = [
  {
    title: "Пользователь не платит gas напрямую",
    body: "Пользователь DSF подписывает намерение, а gas оплачивает relayer, treasury протокола, paymaster или бюджет кампании."
  },
  {
    title: "Approve можно убрать из видимого UX",
    body: "Депозит стейблкоинов может использовать permit-подписи или Permit2, чтобы убрать отдельную approve-транзакцию."
  },
  {
    title: "Подпись заменяет отправку raw-транзакции",
    body: "Для пользователя UX превращается в: Подписать -> Подтвердить намерение -> Готово, а on-chain исполнение берет на себя протокол или инфраструктура."
  },
  {
    title: "Gasless — это экономическая абстракция, а не бесплатное исполнение",
    body: "Кто-то все равно финансирует gas budget, поэтому продукт должен определить лимиты, целевых пользователей и правила sponsorship."
  }
];

export const dsfScenarios = [
  {
    id: "deposit",
    title: "Gasless депозит",
    hook: "Депозит USDC / USDT / DAI и минт DSF LP без обязательного ETH у пользователя.",
    signs: "Permit или deposit intent с asset, amount, receiver, minLpOut, nonce, deadline.",
    contract: "Executor / forwarder забирает токены, маршрутизирует депозит в vault и минтит LP.",
    gas: "Relayer, sponsor treasury, paymaster.",
    risks: "Replay, устаревший minLpOut, слишком широкая permit-область, abuse спонсирования.",
    ux: "Высокий эффект",
    backend: "Средняя",
    contracts: "Средняя"
  },
  {
    id: "withdraw",
    title: "Gasless вывод",
    hook: "Redeem DSF LP в стейблкоины даже если у пользователя уже нет ETH.",
    signs: "Withdraw intent с shares, tokenOut, receiver, minAmountOut, nonce, deadline.",
    contract: "Executor проверяет подпись, сжигает LP, получает активы из vault и переводит их пользователю.",
    gas: "Relayer or sponsor policy.",
    risks: "Replay, stale quote, некорректный minOut, доверенная поверхность executor.",
    ux: "Очень высокий эффект",
    backend: "Средняя",
    contracts: "Средняя-высокая"
  },
  {
    id: "first",
    title: "Спонсируемый первый депозит",
    hook: "Спонсировать только первый депозит, чтобы усилить рост и контролировать расход бюджета.",
    signs: "Та же структура, что и deposit intent, но backend дополнительно проверяет eligibility.",
    contract: "Можно переиспользовать deposit executor, а логику sponsorship оставить off-chain.",
    gas: "Protocol treasury / partner campaign.",
    risks: "Sybil abuse, выжигание бюджета, ложные решения по eligibility.",
    ux: "Фокус на рост",
    backend: "Низкая-средняя",
    contracts: "Низкая"
  },
  {
    id: "ops",
    title: "Спонсируемый claim / reinvest / rebalance",
    hook: "Операционные действия тоже можно спонсировать для отдельных пользователей или управляемых позиций.",
    signs: "Action-specific intent с жестко ограниченными параметрами.",
    contract: "Executor вызывает whitelisted-методы управления DSF.",
    gas: "Campaign or protocol ops budget.",
    risks: "Слишком широкая область подписи, случайные strategy-вызовы, abuse-векторы.",
    ux: "Контекстный",
    backend: "Средняя",
    contracts: "Средняя"
  }
];

export const architectureOptions = [
  {
    id: "relayer",
    name: "Вариант A",
    title: "Классический relayer + meta-transactions",
    fit: "Быстрый путь для контролируемых DSF deposit / withdraw flows.",
    flow: [
      "Пользователь подписывает typed data для депозита или вывода.",
      "Relayer проверяет sponsor policy.",
      "Executor contract валидирует signature, nonce и deadline.",
      "DSF core выполняет mint / burn."
    ],
    pros: [
      "Понятный DSF-specific контроль над маршрутами deposit и withdraw.",
      "Хороший UX без обязательной миграции на smart accounts.",
      "Легко спонсировать только выбранные flows."
    ],
    cons: [
      "Нужна кастомная verification-логика и replay protection.",
      "Relayer становится реальной infra-зависимостью.",
      "Нужны аккуратно ограниченные message types."
    ],
    dsfFit: "Очень сильный MVP fit"
  },
  {
    id: "erc2771",
    name: "Вариант B",
    title: "ERC-2771 Trusted Forwarder",
    fit: "Стандартный meta-tx путь, если DSF-контракты могут доверять forwarder.",
    flow: [
      "Пользователь подписывает meta-tx request.",
      "Trusted forwarder проверяет запрос и дописывает sender data.",
      "Recipient contract восстанавливает _msgSender().",
      "Логика deposit или withdraw исполняется через forwarded call."
    ],
    pros: [
      "Стандартизованная модель trusted forwarder.",
      "Переиспользуемая forwarding-инфраструктура.",
      "Хорошо подходит для обертки конкретных методов DSF."
    ],
    cons: [
      "Recipient-контракты должны корректно обрабатывать _msgSender.",
      "Ошибки в access control становятся опасными.",
      "Допущение доверия к forwarder явно встроено в архитектуру."
    ],
    dsfFit: "Сильный fit, если контракты можно менять"
  },
  {
    id: "erc4337",
    name: "Вариант C",
    title: "ERC-4337 + Paymaster",
    fit: "Лучший долгосрочный UX, если DSF хочет smart account onboarding.",
    flow: [
      "Пользователь подписывает UserOperation через smart account.",
      "Bundler отправляет bundle в EntryPoint.",
      "Paymaster решает, спонсировать gas или нет.",
      "Smart account исполняет DSF deposit или withdraw."
    ],
    pros: [
      "Очень сильный one-click wallet experience.",
      "Гибкая sponsorship-модель.",
      "Хороший future-proof путь для mobile и массового onboarding."
    ],
    cons: [
      "Более высокая infra и product complexity.",
      "Требует внедрения smart account flow.",
      "Для узкого DSF MVP может быть избыточным."
    ],
    dsfFit: "Лучший долгосрочно, но не самый быстрый MVP"
  },
  {
    id: "permit2",
    name: "Вариант D",
    title: "Permit / Permit2 + relayed action",
    fit: "Сильное улучшение deposit UX для stablecoin flows.",
    flow: [
      "Пользователь подписывает permit или Permit2 approval.",
      "Relayer вызывает deposit router с permit payload.",
      "Router тратит stablecoins и вносит их в DSF.",
      "Vault минтит LP на receiver."
    ],
    pros: [
      "Убирает видимый approve friction.",
      "Особенно хорошо работает для deposit UX.",
      "Легко сочетается со sponsored first deposit."
    ],
    cons: [
      "Сам по себе не решает все withdraw flows.",
      "Поддержка зависит от токенов; может потребоваться Permit2.",
      "Для полного gasless все равно нужен relayed execution path."
    ],
    dsfFit: "Лучший первый UX-выигрыш для депозитов"
  },
  {
    id: "custom",
    name: "Вариант E",
    title: "Кастомные signed deposit / withdraw intents",
    fit: "Максимальный DSF-specific контроль над LP mint / burn workflows.",
    flow: [
      "Пользователь подписывает DSF intent с точными бизнес-параметрами.",
      "Backend валидирует sponsor limits и policy.",
      "Executor проверяет signature и маршрутизирует действие.",
      "Vault выполняет mint или burn для выбранного receiver."
    ],
    pros: [
      "Точная адаптация под DSF LP business logic.",
      "Сильный контроль бюджета и правил кампаний.",
      "Подходит и для deposit, и для withdraw."
    ],
    cons: [
      "Наибольшая кастомная ответственность за безопасность.",
      "Требует явной cancellation / nonce management логики.",
      "Более широкая audit surface."
    ],
    dsfFit: "Отлично подходит для DSF-specific gasless слоя"
  }
];

export const flowModes = {
  deposit: {
    standard: {
      steps: [
        "Подключить кошелек",
        "Проверить баланс ETH",
        "Сделать approve стейблкоина",
        "Подтвердить deposit tx",
        "Дождаться подтверждения",
        "Получить LP-токены"
      ],
      eth: true,
      popups: 2,
      signed: "approve + tx",
      gas: "Кошелек пользователя",
      dropoff: "Высокая",
      score: 42
    },
    gasless: {
      steps: [
        "Подключить кошелек",
        "Подписать permit / deposit intent",
        "Relayer отправляет tx",
        "Протокол исполняет депозит",
        "Получить LP-токены"
      ],
      eth: false,
      popups: 1,
      signed: "permit или typed deposit intent",
      gas: "Протокол / relayer / paymaster",
      dropoff: "Ниже",
      score: 88
    }
  },
  withdraw: {
    standard: {
      steps: [
        "Открыть withdraw",
        "Проверить баланс ETH",
        "Подтвердить withdrawal tx",
        "Сжечь LP",
        "Получить стейблкоины"
      ],
      eth: true,
      popups: 1,
      signed: "withdraw tx",
      gas: "Кошелек пользователя",
      dropoff: "Средняя-высокая",
      score: 51
    },
    gasless: {
      steps: [
        "Подписать withdrawal intent",
        "Relayer отправляет tx",
        "Протокол проверяет подпись",
        "Сжигает LP / redeem активов",
        "Получить стейблкоины"
      ],
      eth: false,
      popups: 1,
      signed: "typed withdraw intent",
      gas: "Спонсор / relayer / paymaster",
      dropoff: "Ниже",
      score: 84
    }
  }
};

export const depositDeepDive = [
  {
    title: "Вариант 1: подпись разрешения + депозит",
    bullets: [
      "Пользователь подписывает разрешение на использование стейблкоина через permit или Permit2.",
      "Пользователь подписывает намерение на депозит или объединенный запрос.",
      "Сервис-отправитель вызывает отдельный контракт-исполнитель DSF.",
      "Контракт использует данные подписи, переводит актив, вносит его в хранилище и выпускает LP-токены.",
      "Комиссию за выполнение оплачивает спонсор."
    ]
  },
  {
    title: "Вариант 2: мета-транзакция на депозит",
    bullets: [
      "Пользователь подписывает структурированный запрос на депозит: токен, сумма, получатель, минимально допустимое число LP-токенов, nonce, срок действия и сеть.",
      "Сервис-отправитель отправляет подписанный запрос в сеть.",
      "Промежуточный или исполняющий контракт проверяет подпись и защиту от повторного использования.",
      "Депозит исполняется, а LP-токены выпускаются на адрес получателя."
    ]
  }
];

export const withdrawDeepDive = [
  {
    title: "Что должно входить в подпись на вывод",
    bullets: [
      "количество долей или LP-токенов",
      "какой актив должен прийти на выходе",
      "минимально допустимая сумма к получению",
      "адрес получателя",
      "одноразовый номер запроса",
      "срок действия подписи",
      "идентификатор сети"
    ]
  },
  {
    title: "Почему вывод часто даже важнее депозита",
    bullets: [
      "У пользователя может уже не остаться ETH, когда он хочет выйти из позиции.",
      "Вывод без комиссии со стороны пользователя снижает число проблем в стрессовые моменты рынка.",
      "Если протокол позволяет выйти без необходимости срочно пополнять кошелек ETH, это сильно повышает доверие."
    ]
  }
];

export const signatureFields = [
  "адрес пользователя",
  "актив или число долей",
  "сумма",
  "минимально допустимый результат",
  "получатель",
  "одноразовый номер запроса",
  "срок действия",
  "идентификатор сети",
  "адрес контракта и домен подписи",
  "тип действия"
];

export const contractDiagram = [
  "Пользователь подписывает действие",
  "Интерфейс собирает и отправляет запрос",
  "Сервис-отправитель проверяет правила спонсирования",
  "Исполняющий контракт DSF",
  "Хранилище DSF и контракт LP-токенов",
  "Расчеты в стейблкоинах и стратегиях"
];

export const aaDiagram = [
  "Умный кошелек пользователя",
  "Пакет команды пользователя",
  "Сервис упаковки операций",
  "Входной контракт",
  "Спонсор комиссий",
  "Вызов депозита или вывода DSF"
];

export const codeExamples = [
  {
    title: "Структура подписи для депозита",
    code: `const domain = {
  name: "DSF Gasless Executor",
  version: "1",
  chainId: 1,
  verifyingContract: executor
};

const types = {
  DepositIntent: [
    { name: "user", type: "address" },
    { name: "asset", type: "address" },
    { name: "amount", type: "uint256" },
    { name: "minLpOut", type: "uint256" },
    { name: "receiver", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
};`
  },
  {
    title: "Структура подписи для вывода",
    code: `const types = {
  WithdrawIntent: [
    { name: "user", type: "address" },
    { name: "shares", type: "uint256" },
    { name: "tokenOut", type: "address" },
    { name: "minAmountOut", type: "uint256" },
    { name: "receiver", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
};`
  },
  {
    title: "Проверка подписи и одноразового номера",
    code: `function _useIntentNonce(address user, uint256 nonce) internal {
    require(nonce == nonces[user]++, "BAD_NONCE");
}

function _verifyDeposit(
    DepositIntent calldata intent,
    bytes calldata signature
) internal view returns (address signer) {
    bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
        DEPOSIT_TYPEHASH,
        intent.user,
        intent.asset,
        intent.amount,
        intent.minLpOut,
        intent.receiver,
        intent.nonce,
        intent.deadline
    )));

    signer = ECDSA.recover(digest, signature);
    require(signer == intent.user, "BAD_SIG");
}`
  },
  {
    title: "Проверка срока действия",
    code: `require(block.timestamp <= intent.deadline, "INTENT_EXPIRED");`
  },
  {
    title: "Получатель с доверенным пересыльщиком",
    code: `function _msgSender() internal view returns (address signer) {
    if (isTrustedForwarder(msg.sender)) {
        assembly {
            signer := shr(96, calldataload(sub(calldatasize(), 20)))
        }
    } else {
        signer = msg.sender;
    }
}`
  },
  {
    title: "Условный пример: разрешение плюс депозит",
    code: `function depositWithPermit(
    DepositIntent calldata intent,
    PermitData calldata permit,
    bytes calldata signature
) external {
    require(block.timestamp <= intent.deadline, "EXPIRED");
    _useIntentNonce(intent.user, intent.nonce);
    _verifyDeposit(intent, signature);

    permit2.permit(intent.user, permit, permit.signature);
    asset.transferFrom(intent.user, address(this), intent.amount);
    uint256 shares = vault.deposit(intent.amount, intent.receiver);
    require(shares >= intent.minLpOut, "SLIPPAGE");
}`
  },
  {
    title: "Условный пример: вывод по подписи",
    code: `function withdrawBySig(
    WithdrawIntent calldata intent,
    bytes calldata signature
) external {
    require(block.timestamp <= intent.deadline, "EXPIRED");
    _useIntentNonce(intent.user, intent.nonce);
    _verifyWithdraw(intent, signature);

    uint256 amountOut = vault.redeem(intent.shares, address(this), intent.user);
    require(amountOut >= intent.minAmountOut, "SLIPPAGE");
    stablecoin.transfer(intent.receiver, amountOut);
}`
  },
  {
    title: "Идея спонсора комиссий в ERC-4337",
    code: `function validatePaymasterUserOp(
    PackedUserOperation calldata userOp,
    bytes32 userOpHash,
    uint256 maxCost
) external returns (bytes memory context, uint256 validationData) {
    require(isWhitelistedTarget(userOp.callData), "NOT_SPONSORED");
    require(withinBudget(userOp.sender, maxCost), "BUDGET");
    return ("", 0);
}`
  }
];

export const dsfRecommendations = [
  {
    phase: "Этап 1",
    title: "Самый быстрый практический путь",
    bullets: [
      "Убрать отдельное подтверждение списания для депозита стейблкоинов через Permit2 или похожую схему.",
      "Спонсировать первый депозит для онбординга и рекламных кампаний.",
      "Сделать вывод через подпись и отправку со стороны сервиса для выбранных пользователей."
    ]
  },
  {
    phase: "Этап 2",
    title: "Универсальный слой работы без комиссии со стороны пользователя",
    bullets: [
      "Добавить отдельный контракт-исполнитель для депозитов и выводов по подписи.",
      "Добавить управление одноразовыми номерами, отмену подписей и контроль бюджета спонсирования.",
      "Расширить спонсирование от точечных акций до правил всего протокола."
    ]
  },
  {
    phase: "Этап 3",
    title: "Продвинутый путь с умными кошельками",
    bullets: [
      "Добавить онбординг через умные кошельки ERC-4337.",
      "Использовать отдельный механизм спонсирования комиссий для более широких сценариев.",
      "Перейти к по-настоящему простому управлению портфелем в один клик."
    ]
  }
];

export const strategicWalletOptions = [
  {
    title: "Если DSF остается только протоколом",
    summary: "Лучше усиливать собственный слой подписей, спонсирования и исполнения, не заставляя пользователей переходить на новый тип кошелька.",
    best: "Собственные подписи для депозита и вывода + сервис-отправитель + отдельный исполняющий контракт",
    why: [
      "Это сохраняет совместимость с обычными кошельками пользователей.",
      "Можно улучшать путь входа и выхода без полного перехода на новую модель аккаунта.",
      "Проще внедрять поэтапно и контролировать риски."
    ]
  },
  {
    title: "Если DSF создает собственное кошелек-приложение",
    summary: "Тогда ERC-4337 становится гораздо более сильным стратегическим вариантом, потому что вы контролируете не только протокол, но и сам пользовательский интерфейс кошелька.",
    best: "ERC-4337 + умный кошелек + спонсор комиссий",
    why: [
      "Можно построить действительно цельный путь: регистрация, пополнение, депозит, вывод, восстановление доступа и автоматизация.",
      "Проще скрыть сложность сети от пользователя и сделать почти банковский опыт.",
      "Можно управлять политикой оплаты комиссий, безопасностью, лимитами и сценариями массового онбординга."
    ]
  },
  {
    title: "Если MVP уже пройден и нужны стратегические решения",
    summary: "Долгосрочный выбор зависит от того, хочет ли DSF владеть только финансовым продуктом или всей пользовательской оболочкой вокруг него.",
    best: "Гибридная стратегия",
    why: [
      "Для существующих пользователей сохранить вход через обычные кошельки и подписи на действия.",
      "Для новых пользователей постепенно разворачивать собственный умный кошелек на ERC-4337.",
      "Так проект не ломает текущую воронку и одновременно строит более сильную долгосрочную платформу."
    ]
  }
];

export const riskCards = [
  "Повторное использование старой подписи",
  "Конфликт одноразовых номеров запросов",
  "Неверная работа со сроком действия",
  "Устаревшие подписанные запросы",
  "Обман пользователя через подмену подписи",
  "Отказ сервиса-отправителя проводить операцию",
  "Быстрое выгорание бюджета на комиссии",
  "Злоупотребление механизмом спонсирования",
  "Избыточное доверие к промежуточному контракту",
  "Неверное определение настоящего отправителя",
  "Ошибки в учете выпуска и сжигания LP-токенов",
  "Отсутствие защиты по минимальному результату",
  "Слишком широкая область действия подписи",
  "Отсутствие механизма отмены или блокировки подписи"
];

export const decisionRows = [
  ["Первый депозит нового пользователя", "Permit2 + сервис-отправитель", "Низкая", "Средняя", "Высокое", "Средняя", "Отлично"],
  ["Регулярные депозиты", "Собственная подпись / ERC-2771", "Средняя", "Средняя", "Высокое", "Высокая", "Сильное соответствие"],
  ["Вывод средств", "Вывод по собственной подписи", "Средняя", "Средняя", "Очень высокое", "Высокая", "Отлично"],
  ["Мобильные пользователи", "ERC-4337 + спонсор комиссий", "Высокая", "Высокая", "Очень высокое", "Высокая", "Долгосрочно"],
  ["Партнерские кампании", "Сервис-отправитель + правила спонсирования", "Низкая", "Средняя", "Высокое", "Средняя", "Отлично"],
  ["Пользователи с большим объемом", "Собственная подпись + контроль бюджета", "Средняя", "Средняя", "Высокое", "Высокая", "Сильное соответствие"],
  ["Онбординг за счет казны протокола", "Permit2 + спонсируемый депозит", "Низкая", "Низкая", "Высокое", "Средняя", "Отлично"],
  ["Управление в один клик", "ERC-4337", "Высокая", "Высокая", "Очень высокое", "Высокая", "Поздний этап"],
  ["Полный переход на умные кошельки", "ERC-4337 + спонсор комиссий", "Высокая", "Высокая", "Очень высокое", "Высокая", "Стратегически важно"]
];

export const faqItems = [
  ["Можно ли сделать депозит без комиссии со стороны пользователя для LP-протокола?", "Да. Для DSF самый реалистичный путь на старте — подпись разрешения на списание средств, отдельный сервис-отправитель и внешний исполняющий контракт, который вносит активы и выпускает LP-токены."],
  ["Можно ли сделать вывод без ETH у пользователя?", "Да. Пользователь подписывает разрешение на вывод, сервис-отправитель посылает транзакцию, а контракт проверяет подпись и проводит погашение LP-токенов."],
  ["Кто на самом деле платит комиссию сети?", "Комиссию платит не сеть и не магия, а конкретная сторона: кошелек сервиса-отправителя, казна протокола, партнерская программа или механизм спонсирования комиссий."],
  ["Нужно ли менять основные контракты протокола?", "Не всегда. Первый вариант можно собрать через внешний исполняющий слой. Но для более чистой и надежной архитектуры иногда полезно доработать хранилище, токены LP или поддержку доверенного посредника."],
  ["Решает ли permit всю проблему?", "Нет. Permit убирает отдельный шаг подтверждения списания, но сам по себе не делает действие полностью бесплатным для пользователя. Для этого нужен еще и путь отправки транзакции за него."],
  ["Чем упрощенный депозит отличается от полностью gasless-подхода?", "Упрощенный депозит убирает лишний шаг с подтверждением списания. Полностью gasless-подход идет дальше: пользователь еще и не оплачивает комиссию сети при выполнении операции."],
  ["Что лучше для DSF: ERC-2771 или собственные подписи?", "Если DSF нужен точный контроль именно над логикой депозита и вывода, собственные подписи обычно точнее. ERC-2771 удобен, когда контракты можно безопасно адаптировать под доверенного посредника."],
  ["Нужен ли ERC-4337, если требуется только депозит и вывод без комиссии со стороны пользователя?", "Обычно нет. Для первого внедрения это слишком тяжелый путь. Он сильнее подходит как долгосрочная стратегия развития кошельков и массового входа пользователей."],
  ["Что лучше внедрять первым?", "Убрать отдельное подтверждение списания при депозите, спонсировать первый депозит и сделать вывод по подписи через отдельный исполняющий слой."],
  ["Можно ли ограничить бесплатный режим только первым депозитом?", "Да. Это один из самых реалистичных способов запуска: правила спонсирования можно держать вне блокчейна, а изменения в контрактах оставить минимальными."],
  ["Как защитить вывод по подписи от повторного использования?", "Нужно включать в подпись одноразовый номер, срок действия, привязку к сети и контракту, точный тип действия и механизм отмены или блокировки старых подписей."]
];

export const simulatorConfig = {
  actions: ["deposit", "withdraw"],
  assets: ["USDT", "USDC", "DAI", "LP"],
  architectures: ["standard", "permit + relayer", "ERC-2771", "custom intent", "ERC-4337"],
  sponsors: ["protocol pays", "relayer pays", "paymaster pays", "first tx only"],
  userTypes: ["new user", "existing LP holder", "mobile user", "power user"]
};

export const simulatorResults = {
  "deposit|USDC|permit + relayer|protocol pays|new user": {
    signs: "Permit2 approval + deposit intent",
    payer: "Treasury протокола",
    txCount: 1,
    popups: 1,
    contracts: "Executor/router + интеграция Permit2",
    backend: "Relayer + sponsor policy API",
    recommendation: "Рекомендуется",
    risks: "Permit scope, budget abuse, minLpOut",
    difficulty: "Средняя",
    score: 92
  },
  "withdraw|LP|custom intent|protocol pays|existing LP holder": {
    signs: "Withdraw intent с shares, minAmountOut, receiver, nonce, deadline",
    payer: "Treasury протокола",
    txCount: 1,
    popups: 1,
    contracts: "Withdraw executor + vault redeem hook",
    backend: "Relayer + replay / quota controls",
    recommendation: "Настоятельно рекомендуется",
    risks: "Replay, stale quote, accounting surface",
    difficulty: "Средняя-высокая",
    score: 90
  },
  "deposit|DAI|standard|relayer pays|power user": {
    signs: "Approve + deposit tx",
    payer: "Пользователь; relayer здесь почти ничего не упрощает",
    txCount: 2,
    popups: 2,
    contracts: "Без изменений",
    backend: "Не требуется",
    recommendation: "Не рекомендуется",
    risks: "Плохой UX, зависимость от ETH, пользовательский drop-off",
    difficulty: "Низкая",
    score: 36
  }
};
