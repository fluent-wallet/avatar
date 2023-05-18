| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-99.22%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-93.9%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-96.96%25-brightgreen.svg?style=flat) |

# @cfx-kit/wallet-avatar

![https://img.shields.io/npm/v/@cfx-kit/wallet-avatar](https://img.shields.io/npm/v/@cfx-kit/wallet-avatar)
![https://img.shields.io/github/issues-raw/ssbarbee/@cfx-kit/wallet-avatar](https://img.shields.io/github/issues-raw/ssbarbee/@cfx-kit/wallet-avatar)
![https://img.shields.io/npm/dw/@cfx-kit/wallet-avatar](https://img.shields.io/npm/dw/@cfx-kit/wallet-avatar)

🤡 A library for generate MetaMask avatars based on account address

## Overview 🧐

The `@cfx-kit/wallet-avatar` library is a collection of functions that can help you generate the same avatar as metamask. Install it and look at its definition and you'll be up and running in no time.

## Installation 📦

### npm

```npm install @cfx-kit/wallet-avatar```

### yarn

```yarn add @cfx-kit/wallet-avatar```

## Demo

For React [codesandbox/@cfx-kit/wallet-avatar](https://codesandbox.io/s/cfx-kit-wallet-avatar-demo-beqzvz?file=/src/App.js)

## Usage 📚

```tsx
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';

const img = document.createElement('img')

img.src = generateAvatarURL('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6')

document.body.appendChild(img)

```
