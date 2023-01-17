const {ethers} = require("hardhat");
const {expect} = require("chai");


describe("InuaSauti Contract",function(){
    let inuasautiContract;
    beforeEach(async function(){
        //get the contract
        const inuasautiFactory = await ethers.getContractFactory("InuaSauti");
        inuasautiContract = await inuasautiFactory.deploy();
        await inuasautiContract.deployed();
        
    });
    it("it should be able post data successful" ,async function(){
        const message = "inuasautiMessage";
        const id = 0;
        const category = "Technology";
        await inuasautiContract.getMessagefromUshahidiApi(message,id,category);
        
     
        const storedMessage = await inuasautiContract.storeMessages(0);
      expect(storedMessage._message).to.equal(message);
      expect(storedMessage._messageId).to.equal(id);
      expect(storedMessage._category).to.equal(category);
      expect(storedMessage._status).to.equal(1);

        
        

    })
})

