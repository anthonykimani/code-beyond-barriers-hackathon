const {ethers} = require("hardhat");

async function main(){
  //get the contract
  const inuasautiContract =  await ethers.getContractFactory("InuaSauti");

  //deploy the contract
  const inuasautiContractDeploy = await inuasautiContract.deploy();


  //await deployment
  await inuasautiContractDeploy.deployed();

  //console.log the address
  console.log("InuaSautiContract", inuasautiContractDeploy.address);
}
main().then(()=>
process.exit(0))
.catch((error)=>{
  console.log(error);
  process.exit(1);
})