const {ethers} = require("hardhat");
//InuaSautiContract 0xF17153bedBe9D979485c16BaC1adDc5d60b84622
//2. InuaSautiContract 0x93fe8f7A78A5D00296445d273d211583f8320523
//3  InuaSautiContract 0x907B764d5a46e9135099346382d609af0DF2dE1b
//4. InuaSautiContract 0xa0a020EA660E67DeEc5614ebB3fBCdF8De4330dB
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