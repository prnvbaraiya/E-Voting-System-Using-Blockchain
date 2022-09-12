const Transaction = artifacts.require("Transaction");

module.exports = function (deployer) {
  deployer.deploy(Transaction);
};
