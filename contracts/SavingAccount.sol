pragma solidity 0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";

contract SavingAccount{

    using Address for address payable;

    mapping(address => uint256) public balanceOf;

    function deposit() external payable {
        balanceOf[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balanceOf[msg.sender];

        balanceOf[msg.sender] = 0;

        //payable(msg.sender).transfer(amount);
        payable(msg.sender).sendValue(amount);
    }


}