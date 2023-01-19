const {ethers} = require("hardhat");
//InuaSautiContract 0xF17153bedBe9D979485c16BaC1adDc5d60b84622
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