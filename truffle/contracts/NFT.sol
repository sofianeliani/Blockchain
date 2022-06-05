// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract NFT {

    // state variables
    address public owner;
    mapping (address => uint) public nftList;

    // set the owner as th address that deployed the contract
    // set the initial vending machine balance to 100
    constructor() {
        owner = msg.sender;
        nftList[address(this)] = 100;
    }

    function getSellingNFTMount() public view returns (uint) {
        return nftList[address(this)];
    }

    // Let the owner restock the vending machine
    function addMount(uint amount) public {
        require(msg.sender == owner, "Only the owner can add mount");
        nftList[address(this)] += amount;
    }

    // Purchase donuts from the vending machine
    function mint(uint amount) public payable {
        require(msg.value >= amount * 2 ether, "You must have 2 eth");
        require(nftList[address(this)] >= amount, "You cant ... err");
        nftList[address(this)] -= amount;
        nftList[msg.sender] += amount;
    }
}