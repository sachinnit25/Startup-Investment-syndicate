# Startup Investment Syndicate
> A privacy-preserving startup investment syndicate on the Midnight network.

## Live Demo
https://startup-investment-syndicate.vercel.app

## Contract Address
| Network  | Address                          |
|----------|----------------------------------|
| Preprod  | 52d14a9f3588ceb1c8934b8e6ee2f5de829b74ae5db7b507c65f6b4494a4d042  |

## What This Does
The Startup Investment Syndicate is a decentralized application (dApp) that allows investors to pool capital towards a startup's funding goal without revealing their identity or their specific investment amount. Investors connect their Lace wallet, generate a local zero-knowledge proof of their investment, and submit it on-chain. The smart contract tallies the total funds and openly reveals when the funding goal has been met, but keeps individual commitments completely private.

## Privacy Model
- What is PUBLIC: The total committed capital, the number of investors, the fundraising goal, and whether the goal has been reached.
- What is PRIVATE: The investor's identity (secret key) and the exact investment amount they committed.
- What the user PROVES without revealing: The user proves they possess a valid investor identity and that their investment amount is a valid, non-zero number, without ever revealing who they are or how much they invested.

## Privacy Claim
An on-chain observer sees that a transaction occurred, the total number of investors, and the aggregate capital raised. They CANNOT see the individual identities of the investors or the specific amounts they contributed.

## Tech Stack
Midnight network, Compact, Midnight.js SDK, React/Vite, Lace wallet

## Prerequisites
- Lace wallet installed (and configured for Midnight Preprod)
- Node.js v22

## Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/Startup-Investment-syndicate.git
cd Startup-Investment-syndicate

# 2. Install dependencies
npm install

# 3. Start the local frontend
npm run dev
```

Open your browser to `http://localhost:3000` to interact with the dApp.

## Demo Video
https://youtu.be/1uyMOp2bNT4
