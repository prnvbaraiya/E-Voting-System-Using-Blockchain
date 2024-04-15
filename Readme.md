# E-Voting System using Blockchain

This project is a web application that allows users to vote for their preferred candidates in an election. The project uses MongoDB for database management and has three collections for candidates, elections, and users.

## Installation and Setup🔧

### MongoDB🍃

To create the required database collections, refer to the `/server/Models` files after entering the URL in `/server/.env` line 2.

### Ganache⛓️

For free ethereum, install Ganache and add `/smart_contract/truffle-config.js` to your account to receive ten free accounts with 100 ETH.

### Metamask 🦊

Add the Metamask Chrome extension for transactions.

### Contract Compilation 💻

To compile the contract, open the command prompt and navigate to the `smart_contract` directory using the command `cd smart_contract`. Then, run the command `npm install -g truffle`(if truffle already not installed), `truffle compile` and `truffle migrate`. Finally, follow the steps after compilation by copying and pasting the address and `transaction.json`.

After installing Ganache, compile the contract in `/smart_contract` using Truffle. Then, add the transaction address in `Client/utils/Constant.js`. Also, copy `/smart_contract/build/contracts/Transaction.json` and paste it in `Client/utils/Transaction.json` for ABI value.

### Running the Web Application🌐

Follow the steps below to run the web application:

1.  Go to the `Client` folder and install all node modules using `npm install` then run the command `npm run start`.
2.  Go to the `server` folder and install all node modules using `npm install` then run the command `nodemon main`.
3.  Wait a few minutes for the site to start.
