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

        
        

    });
    // it("it should be able to send cusd", async function(){
    //     const cUsdTokenAddress ="0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
    //     const allowedAmount = 5000000000000000000;//utils.parseEther("5");
    //    const app = await  cUsdTokenAddress.approve(inuasautiContract.address,allowedAmount);
    //    expect(app).to.equal(true);

    // });
    it("should increase the number of approve votes", async function(){
        const decision = true;
        const index = 0;
        await inuasautiContract.voteForInformationShared(decision,index);
        const votes = await inuasautiContract.votes(0);
        expect(votes.approveVotes).to.equal(1);
        expect(votes.declineVotes).to.equal(0);
        

    })
    
});

