# DSF Gasless LP Demo

Интерактивный обучающий demo-app на `React + Vite + Tailwind CSS + Framer Motion`, который показывает, как для DSF-подобного DeFi LP vault протокола можно реализовать:

- gasless deposits
- gasless withdrawals
- approve-less / low-friction deposit UX
- sponsored transactions
- relayer / paymaster / meta-transaction flows
- архитектурные варианты для DSF LP tokens

## Установка

```bash
npm install
```

## Локальный запуск

```bash
npm run dev
```

Откройте локальный адрес Vite, обычно `http://localhost:5173`.

## Сборка production build

```bash
npm run build
```

## Структура проекта

- [index.html](/C:/DSF_Finance/GasLess_test/index.html) — корневой HTML для Vite
- [package.json](/C:/DSF_Finance/GasLess_test/package.json) — зависимости и scripts
- [vite.config.js](/C:/DSF_Finance/GasLess_test/vite.config.js) — Vite + Tailwind plugin
- [src/main.jsx](/C:/DSF_Finance/GasLess_test/src/main.jsx) — точка входа React
- [src/App.jsx](/C:/DSF_Finance/GasLess_test/src/App.jsx) — основная страница и интерактивные секции
- [src/components.jsx](/C:/DSF_Finance/GasLess_test/src/components.jsx) — переиспользуемые UI-компоненты
- [src/data.js](/C:/DSF_Finance/GasLess_test/src/data.js) — тексты, сценарии, диаграммы, matrix, simulator config и code examples
- [src/styles.css](/C:/DSF_Finance/GasLess_test/src/styles.css) — Tailwind import и базовые theme-правила

## Где редактировать тексты

Большая часть текстов вынесена в [src/data.js](/C:/DSF_Finance/GasLess_test/src/data.js).

Основные блоки:

- `heroStats`
- `meaningCards`
- `dsfScenarios`
- `architectureOptions`
- `depositDeepDive`
- `withdrawDeepDive`
- `faqItems`

## Где редактировать сценарии deposit / withdraw

Смотрите:

- `problemComparison`
- `flowModes`
- `dsfScenarios`
- `depositDeepDive`
- `withdrawDeepDive`
- `simulatorResults`

Все они находятся в [src/data.js](/C:/DSF_Finance/GasLess_test/src/data.js).

## Где редактировать диаграммы

Смотрите массивы:

- `contractDiagram`
- `aaDiagram`

Они находятся в [src/data.js](/C:/DSF_Finance/GasLess_test/src/data.js).

## Где редактировать примеры кода

Смотрите массив `codeExamples` в [src/data.js](/C:/DSF_Finance/GasLess_test/src/data.js).

## Как расширять симулятор новыми DSF use cases

1. Добавьте новые значения в `simulatorConfig`.
2. Добавьте конкретные преднастроенные результаты в `simulatorResults`.
3. При необходимости скорректируйте fallback-логику в [src/App.jsx](/C:/DSF_Finance/GasLess_test/src/App.jsx).

Ключ симулятора строится в формате:

```txt
action|asset|architecture|sponsor|userType
```

Пример:

```txt
deposit|USDC|permit + relayer|protocol pays|new user
```

## Что уже встроено в demo-app

- premium dark DeFi UI
- sticky navigation
- comparison blocks for standard vs gasless UX
- DSF-specific scenario cards
- architecture explorer
- interactive UX flow switcher
- deposit / withdraw technical deep dives
- contract architecture diagrams
- mini code examples
- recommended path for DSF
- risk section
- decision matrix
- gasless simulator
- FAQ

## Наиболее реалистичный DSF MVP

Если нужен самый практичный старт:

- `Permit2 + relayer + custom executor` для deposit
- `sponsored first deposit` для onboarding
- `signed withdraw intent + relayed execution` для выхода без ETH у пользователя

Это дает самый быстрый UX-эффект без обязательного немедленного перехода на полный `ERC-4337` стек.
