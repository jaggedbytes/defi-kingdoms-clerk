# The Clerk of Serendale
Deployed on Vercel:
[https://defi-kingdoms-clerk-vercel.vercel.app/](https://defi-kingdoms-clerk-vercel.vercel.app/)

A DFK specific application that attemps to generate a transaction history report. First time developing an app that interacts with the Harmony blockchain with Next.js and Tailwind as the framework. Ethers as the library to interact with the Harmony blockchain. A form constructs a query to Harmony's Node API with a start and end date. After retreiving all transactions, the results are filtered with the date range against each transaction's timestamp.

## Prerequisites
- node v16.13.1
- npm -v 8.1.2

## Getting Started
1. Clone the repo
```
git clone https://github.com/jaggedbytes/defi-kingdoms-clerk.git
```
2. Change into cloned directory
3. Install NPM packages
```
npm install
```
4. Start the development server
```
npm run dev
```

## Roadmap
- [x] Generate transaction history of quests and quest rewards for small time frames 
- [x] New contracts can be added to https://github.com/jaggedbytes/defi-kingdoms-clerk/blob/main/resources/constants/Contracts.json
- [ ] Add transaction types to report
- [ ] Add hero sales and any gains/losses
- [ ] Quantify all gains and losses for the wallet address entered
- [ ] Build out directives to accommodate Crystalvale requests on Avalanche
- [ ] Query optimizations (need to explore pagination to split blockchain queries, perhaps axios?)
- [ ] Accommodate other currencies than USD
- [ ] Unit tests

## Acknowledgements
- Thank you to [0rtis](https://github.com/0rtis/) the ABIs!
- All image assets, lore, and styling inspiration is credited to [DeFi Kingdoms](https://defikingdoms.com/)