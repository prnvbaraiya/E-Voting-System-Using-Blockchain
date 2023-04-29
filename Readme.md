# E-Voting System using Blockchain

This project is a web application that allows users to vote for their preferred candidates in an election. The project uses MongoDB for database management and has three collections for candidates, elections, and users.

## Installation and Setup🔧

### MongoDB🍃

To create the required database collections, refer to the `/server/Models` files after entering the URL in `/server/.env` line 2.

### Third-Party Email Verification 📧

To enable automatic email sending, add third-party verification to your email and register the app to get a secret key🔑. Then, add the email and password in `/server/.env`.

For more detail: https://support.google.com/accounts/answer/185833

### Ganache⛓️

For free ethereum, install Ganache and add `/smart_contract/truffle-config.js` to your account to receive ten free accounts with 100 ETH.

### Metamask 🦊

Add the Metamask Chrome extension for transactions.

### Contract Compilation 💻

To compile the contract, open the command prompt and navigate to the `smart_contract` directory using the command `cd smart_contract`. Then, run the command `npm install -g truffle`(if truffle already not installed), `truffle compile` and `truffle migrate`. Finally, follow the steps after compilation by copying and pasting the address and `transaction.json`.

After installing Ganache, compile the contract in `/smart_contract` using Truffle. Then, add the transaction address in `Client/utils/Constant.js`. Also, copy `/smart_contract/build/contracts/Transaction.json` and paste it in `Client/utils/Transaction.json` for ABI value.

### Python Script(required for face authentication)🐍

To install the necessary packages for the Python script, use the command `pip install opencv-python, numpy, os, face_recognition`. Add photos to `/Face` with the same username in use. To add a URL for photos, go to `/server/Controller/encoded.py` line 6.

### Want to Enable/Disable Face Authentication ?🤔

Default value is false to enable/disable change `isFaceRecognitionEnable` in `Client/src/Data/Variable.jsx`.(Python Modules required)

### Running the Web Application🌐

Follow the steps below to run the web application:

1.  Go to the `Client` folder and install all node modules using `npm install` then run the command `npm run start`.
2.  Go to the `server` folder and install all node modules using `npm install` then run the command `nodemon main`.
3.  Wait a few minutes for the site to start.
