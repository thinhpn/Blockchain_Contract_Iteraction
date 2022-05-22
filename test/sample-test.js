const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Demo Contract Iteraction", function () {

  let deployer, user, attacker;
  beforeEach(async function (){
    [deployer, attacker, user] = await ethers.getSigners();   
    const SavingAccount = await ethers.getContractFactory("SavingAccount", deployer);
    this.savingAccount = await SavingAccount.deploy();

    const Investor = await ethers.getContractFactory("Investor", deployer);
    this.investor = await Investor.deploy(this.savingAccount.address);
  });

  describe("From origin contract", function () {
    it("Should be possible deposit", async function () {
      expect(await this.savingAccount.balanceOf(user.address)).to.equal(0);
      await this.savingAccount.connect(user).deposit({value: 1000});
      expect(await this.savingAccount.balanceOf(user.address)).to.equal(1000);
    });
  
    it("Should be possible withdraw", async function () {
      expect(await this.savingAccount.balanceOf(user.address)).to.equal(0);
      await this.savingAccount.connect(user).deposit({value: 1000});
      expect(await this.savingAccount.balanceOf(user.address)).to.equal(1000);
      await this.savingAccount.connect(user).withdraw();
      expect(await this.savingAccount.balanceOf(user.address)).to.equal(0);
    });
  });


  describe("From interface contract", function () {
    it("Should be possible deposit", async function () {
      expect(await this.savingAccount.balanceOf(this.investor.address)).to.equal(0);
      await this.investor.depositIntoSavingAccount({value: 1000});
      expect(await this.savingAccount.balanceOf(this.investor.address)).to.equal(1000);
    });
  
    it("Should be possible withdraw", async function () {
      expect(await this.savingAccount.balanceOf(this.investor.address)).to.equal(0);
      await this.investor.depositIntoSavingAccount({value: 1000});
      expect(await this.savingAccount.balanceOf(this.investor.address)).to.equal(1000);
      await this.investor.withdrawFromSavingAccount();
      expect(await this.savingAccount.balanceOf(this.investor.address)).to.equal(0);
    });
  });    
});
