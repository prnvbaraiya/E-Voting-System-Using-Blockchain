// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction{
    uint256 transactionCounter;

    event Transfer(address from,address receiver,uint amount,string message,uint timestamp,string keyword);

    struct TransactionStruct {
        address from;
        address receiver;
        uint amount;
        string message;
        uint timestamp;
        string keyword;
    }

    TransactionStruct[] transactions;

    function addToBlockchain(address payable receiver,uint amount,string memory message,string memory keyword) public {
        transactionCounter+=1;
        transactions.push(TransactionStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));

        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }

    function getAllTransaction() public view returns (TransactionStruct[] memory){

    }

    function getTransactionCount() public view returns (uint256){

    }

}