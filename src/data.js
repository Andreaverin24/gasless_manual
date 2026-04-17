export const navItems = [
  ["Проблема", "problem"],
  ["Смысл", "meaning"],
  ["Сценарии", "scenarios"],
  ["UX flow", "ux-flow"],
  ["Архитектуры", "architectures"],
  ["Депозит", "deposit-tech"],
  ["Вывод", "withdraw-tech"],
  ["Контракты", "contracts"],
  ["Код", "code"],
  ["Путь DSF", "recommended"],
  ["Риски", "risks"],
  ["Матрица", "matrix"],
  ["Симулятор", "simulator"],
  ["FAQ", "faq"]
];

export const heroStats = [
  { label: "Окна кошелька", value: "2 -> 1", detail: "депозит и вывод можно свести к одному шагу подписи" },
  { label: "Кто платит gas", value: "Спонсор", detail: "treasury протокола, relayer, партнерская кампания или paymaster" },
  { label: "Главная цель", value: "Mint / burn LP", detail: "без требования держать ETH на краю пользовательского пути" }
];

export const problemComparison = {
  deposit: {
    standard: [
      "Connect wallet",
      "Ensure ETH balance",
      "Approve stablecoin",
      "Confirm deposit transaction",
      "Wait for mining",
      "Receive DSF LP"
    ],
    gasless: [
      "Connect wallet",
      "Sign permit or deposit intent",
      "Relayer submits sponsored tx",
      "Vault receives stablecoins",
      "Protocol mints DSF LP"
    ]
  },
  withdraw: {
    standard: [
      "Open withdraw panel",
      "Ensure ETH balance",
      "Confirm withdrawal transaction",
      "Burn or redeem LP",
      "Wait for mining",
      "Receive stablecoins"
    ],
    gasless: [
      "Open withdraw panel",
      "Sign withdraw intent",
      "Relayer submits sponsored tx",
      "Executor validates signature",
      "DSF burns LP and returns stablecoins"
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
    title: "Variant 1: permit + deposit",
    bullets: [
      "User signs permit for stablecoin or Permit2 approval.",
      "User signs deposit intent or a combined request.",
      "Relayer calls DSF executor / router.",
      "Router uses permit data, transfers asset, deposits into vault, and mints LP.",
      "Sponsor pays gas."
    ]
  },
  {
    title: "Variant 2: meta-transaction deposit",
    bullets: [
      "User signs typed deposit request with token, amount, receiver, minLpOut, nonce, deadline, chainId.",
      "Relayer submits signed payload.",
      "Forwarder or executor verifies signature and replay protection.",
      "Deposit is executed and LP is minted to receiver."
    ]
  }
];

export const withdrawDeepDive = [
  {
    title: "Withdraw intent shape",
    bullets: [
      "shares or LP amount",
      "tokenOut",
      "minAmountOut",
      "receiver",
      "nonce",
      "deadline",
      "chainId"
    ]
  },
  {
    title: "Why withdraw often matters more",
    bullets: [
      "Users may have zero ETH left when exiting a position.",
      "Gasless withdraw reduces support friction during stressed market conditions.",
      "It is a strong trust signal if the protocol lets users exit without extra ETH requirements."
    ]
  }
];

export const signatureFields = [
  "user address",
  "asset or shares",
  "amount",
  "minOut / minLpOut",
  "receiver",
  "nonce",
  "deadline",
  "chainId",
  "contract address / domain",
  "action type"
];

export const contractDiagram = [
  "User signs",
  "Frontend packages intent",
  "Relayer backend checks sponsor policy",
  "DSF Executor / Forwarder / Router",
  "DSF Vault / LP Contract",
  "Stablecoins / strategy settlement"
];

export const aaDiagram = [
  "User Smart Account",
  "UserOperation",
  "Bundler",
  "EntryPoint",
  "Paymaster sponsorship",
  "DSF deposit / withdraw call"
];

export const codeExamples = [
  {
    title: "DepositIntent typed data",
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
    title: "WithdrawIntent typed data",
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
    title: "Signature verification + nonce",
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
    title: "Deadline check",
    code: `require(block.timestamp <= intent.deadline, "INTENT_EXPIRED");`
  },
  {
    title: "Trusted forwarder recipient",
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
    title: "Conceptual permit + deposit",
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
    title: "Conceptual withdrawBySig",
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
    title: "ERC-4337 paymaster idea",
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
    phase: "Phase 1",
    title: "Fastest practical path",
    bullets: [
      "Permit2 or permit-like approve-less deposit for stablecoins.",
      "Sponsored first deposit for onboarding and campaigns.",
      "Relayed withdraw for selected users or controlled cohorts."
    ]
  },
  {
    phase: "Phase 2",
    title: "General-purpose gasless DSF layer",
    bullets: [
      "Introduce DSF executor for signed deposit and withdraw intents.",
      "Add nonce management, signature cancellation, sponsor budget control.",
      "Expand sponsorship from campaigns to protocol-level policy."
    ]
  },
  {
    phase: "Phase 3",
    title: "Advanced smart wallet UX",
    bullets: [
      "Add ERC-4337 smart account onboarding.",
      "Use paymaster for broader sponsored usage.",
      "Move toward true one-click portfolio UX."
    ]
  }
];

export const riskCards = [
  "Replay attacks",
  "Nonce collisions",
  "Deadline misuse",
  "Stale signed requests",
  "Signature phishing",
  "Relayer censorship",
  "Sponsor budget draining",
  "Paymaster abuse",
  "Forwarder trust assumptions",
  "Incorrect _msgSender handling",
  "LP mint/burn accounting bugs",
  "Missing minOut / minLpOut",
  "Over-broad signature scope",
  "Missing cancel / invalidate flow"
];

export const decisionRows = [
  ["Онбординг первого депозита", "Permit2 + relayer", "Низкая", "Средняя", "Высокое", "Средняя", "Отлично"],
  ["Повторяющиеся депозиты", "Custom intent / ERC-2771", "Средняя", "Средняя", "Высокое", "Высокая", "Сильный fit"],
  ["Выводы", "Custom signed withdraw", "Средняя", "Средняя", "Очень высокое", "Высокая", "Отлично"],
  ["Мобильные пользователи", "ERC-4337 + paymaster", "Высокая", "Высокая", "Очень высокое", "Высокая", "Долгосрочно"],
  ["Партнерские кампании", "Relayer + sponsor rules", "Низкая", "Средняя", "Высокое", "Средняя", "Отлично"],
  ["Пользователи с большим чеком", "Custom intent + budget checks", "Средняя", "Средняя", "Высокое", "Высокая", "Сильный fit"],
  ["Treasury-sponsored onboarding", "Permit2 + sponsored deposit", "Низкая", "Низкая", "Высокое", "Средняя", "Отлично"],
  ["One-click UX", "ERC-4337", "Высокая", "Высокая", "Очень высокое", "Высокая", "Позже"],
  ["Полный smart wallet onboarding", "ERC-4337 + paymaster", "Высокая", "Высокая", "Очень высокое", "Высокая", "Стратегически"]
];

export const faqItems = [
  ["Можно ли сделать gasless deposit для LP-протокола?", "Да. Наиболее реалистично для DSF это permit or Permit2 + relayer + executor layer, который проводит deposit и mint LP за пользователя."],
  ["Можно ли сделать gasless withdraw без ETH у пользователя?", "Да. Пользователь подписывает withdraw intent, relayer отправляет tx, executor или vault проверяет подпись и делает redeem / burn LP."],
  ["Кто реально платит gas?", "Relayer wallet, protocol treasury, partner campaign sponsor, or paymaster deposit. Gasless only changes who pays, not whether gas exists."],
  ["Нужно ли менять core contracts?", "Не всегда. Часть MVP можно сделать через внешний executor / router layer. Но для более чистой архитектуры иногда нужны изменения в vault, LP token hooks, or forwarder support."],
  ["Permit уже решает проблему?", "Только частично. Permit removes separate approve friction, but you still need a relayed execution path if the user should avoid paying gas entirely."],
  ["Чем approve-less отличается от fully gasless?", "Approve-less removes an extra approval transaction. Fully gasless additionally means the user is not the gas payer for the actual on-chain action."],
  ["Что лучше для DSF: ERC-2771 или кастомные подписи?", "If DSF needs exact control over deposit and withdraw semantics, custom DSF intents are usually more precise. ERC-2771 is cleaner when contracts can be adapted to trust a standard forwarder."],
  ["Нужен ли ERC-4337, если нужен только gasless deposit/withdraw?", "Usually not for MVP. It is stronger as a long-term wallet and sponsorship strategy than as the first narrow implementation step."],
  ["Что лучше внедрять первым?", "Permit2-backed deposits plus sponsored first deposit and a DSF-specific relayed withdraw path."],
  ["Можно ли ограничить gasless только для first deposit?", "Да. Это один из самых реалистичных growth-first patterns because sponsor policy can remain off-chain while contracts stay mostly unchanged."],
  ["Как защитить withdraw by signature от replay?", "Include nonce, deadline, chain/domain separation, exact action type, and a cancellation or nonce invalidation strategy."]
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
