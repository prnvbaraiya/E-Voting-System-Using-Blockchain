// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction{
    uint256 transactionCounter;

    event Transfer(address from,address receiver,string user_id,string election_id,string candidate_id,uint timestamp);

    struct TransactionStruct {
        address from;
        address receiver;
        string user_id;
        string election_id;
        string candidate_id;
        uint timestamp;
    }

    TransactionStruct[] transactions;

    function addToBlockchain(address payable receiver,string memory user_id,string memory election_id,string memory candidate_id) public {
        transactionCounter+=1;
        transactions.push(TransactionStruct(msg.sender,receiver,user_id,election_id,candidate_id,block.timestamp));

        emit Transfer(msg.sender,receiver,user_id,election_id,candidate_id,block.timestamp);
    }

    function getAllTransaction() public view returns (TransactionStruct[] memory){
        return transactions;
    }

    function getTransactionCount() public view returns (uint256){
        return transactionCounter;
    }

}