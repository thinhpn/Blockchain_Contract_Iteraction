pragma solidity 0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ISavingAccount {
    function deposit() external payable;
    function withdraw() external payable;
}

contract Investor is Ownable{

    ISavingAccount public immutable savingAccount;

    constructor(address savingContract) {
        savingAccount = ISavingAccount(savingContract);
    }

    function depositIntoSavingAccount() external payable onlyOwner {
        savingAccount.deposit{value: msg.value}();       
        
    }

    function withdrawFromSavingAccount() external onlyOwner {
        savingAccount.withdraw();
    }

    receive() external payable {
        //payable(owner()).transfer(address(this).balance);//cannot excute because run out of gas
        //should create other functon to excute this command
    }

    function withdrawNow() external  onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
 }

