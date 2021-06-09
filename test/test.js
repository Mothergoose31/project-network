const { assert } = require('chai')

const Decentee = artifacts.require('./Decentee.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentee', ([deployer, author, tipper]) => {
  let decentee

  before(async () => {
    decentee = await  Decentee.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await decentee.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentee.name()
      assert.equal(name, 'Decentee')
    })
  })




  // describe('images', async () => {
  //   let result, imageCount
  //   const hash = 'abc123'

  //   before(async () => {
  //         result = await decentragram.uploadImage(hash, 'Image description', { from: author })
  //         imageCount = await decentragram.imageCount()
  //       })

  //   it('creates images', async() => {
  //     // Success
  //     assert.equal(imageCount, 1)
  //     const event = result.logs[0].args
  //     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
  //     assert.equal(event.hash, hash, 'Hash is correct')
  //     assert.equal(event.description, 'Image description', 'description is correct')
  //     assert.equal(event.tipAmount, '0', 'tip amount is correct')
  //     assert.equal(event.author, author, 'author is correct')
      
  //     // FAILURE: Image must have hash
  //     await decentragram.uploadImage('', 'Image description', { from: author }).should.be.rejected;
      
  //     // FAILURE: Image must have description
  //     await decentragram.uploadImage('Image hash', '', { from: author }).should.be.rejected;
     
  //   })

  //   it('list images', async() => {
  //     const image = await decentragram.images(imageCount)
  //     assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
  //     assert.equal(image.hash, hash, 'Hash is correct')
  //     assert.equal(image.description, 'Image description', 'description is correct')
  //     assert.equal(image.tipAmount, '0', 'tip amount is correct')
  //     assert.equal(image.author, author, 'author is correct')

  //   })


    

  //   it('allows users to tip images', async () => {
  //         // Track the author balance before purchase
  //         let oldAuthorBalance
  //         oldAuthorBalance = await web3.eth.getBalance(author)
  //         oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)
      
  //         result = await decentragram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })
      
  //         // SUCCESS
  //         const event = result.logs[0].args
  //         assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
  //         assert.equal(event.hash, hash, 'Hash is correct')
  //         assert.equal(event.description, 'Image description', 'description is correct')
  //         assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
  //         assert.equal(event.author, author, 'author is correct')
      
  //         // Check that author received funds
  //         let newAuthorBalance
  //         newAuthorBalance = await web3.eth.getBalance(author)
  //         newAuthorBalance = new web3.utils.BN(newAuthorBalance)
      
  //         let tipImageOwner
  //         tipImageOwner = web3.utils.toWei('1', 'Ether')
  //         tipImageOwner = new web3.utils.BN(tipImageOwner)
      
  //         const expectedBalance = oldAuthorBalance.add(tipImageOwner)
      
  //         assert.equal(newAuthorBalance.toString(), expectedBalance.toString())
      
  //         // FAILURE: Tries to tip a image that does not exist
  //         await decentragram.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
  //       })
    

  // })









})







// const freelancer = artifacts.require("freelancer");

// module.exports = async function(deployer, network, accounts) {

//     let programmerWallet;
//     let clientWallet;
//     //get address for programmer and client wallet
//     await web3.eth.getAccounts().then(function(result){
//         programmerWallet = result[0];
//         clientWallet = result[1];
//     });
    
//     //deploy freelancer contract
//     await deployer.deploy(freelancer, {from: programmerWallet}).then(()=> {
//         console.log("Freelance Contract:" + freelancer.address);
//       }
//     );
    
//     //add design phase to freelancer contract
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.addSchedule('DSP','Design Phase', web3.utils.toWei('1.25', 'ether'), {from: programmerWallet}).then(
//               function(v) {
//                 console.log("Schedule Added:"+v.receipt.logs[0].args.shortCode);
//               }
//             )
//         }
//     );

//     //add development phase to freelancer contract
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.addSchedule('DEV','Development Phase', web3.utils.toWei('2.34', 'ether'), {from: programmerWallet}).then(
//               function(v) {
//                 console.log("Schedule Added:"+v.receipt.logs[0].args.shortCode);
//               }
//             )
//         }
//     );

//     //add UAT phase to freelancer contract
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.addSchedule('UAT','User Acceptance Testing Phase', web3.utils.toWei('3.25', 'ether'), {from: programmerWallet}).then(
//               function(v) {
//                 console.log("Schedule Added:"+v.receipt.logs[0].args.shortCode);
//               }
//             )
//         }
//     );

//     //client accept freelancer contract
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.acceptProject({from: clientWallet}).then(
//               function(v) {
//                 console.log("Contract Accepted By:"+v.receipt.logs[0].args.clientAddress);
//               }
//             )
//         }
//     );
    
//     //client funds design phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.fundTask(0, {from: clientWallet, value: web3.utils.toWei("1.25", "ether")}).then(
//               function(v) {
//                 console.log("Task Funded:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );

//     //programmer starts design phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.startTask(0, {from: programmerWallet}).then(
//               function(v) {
//                 console.log("Task Started:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );    

//     //client approves design phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.approveTask(0, {from: clientWallet}).then(
//               function(v) {
//                 console.log("Task Approved:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );

//     //programmer releases funds to himself
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.releaseFunds(0, {from: programmerWallet}).then(
//               function(v) {
//                 console.log("Funds Released:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );    

//     //client funds development phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.fundTask(1, {from: clientWallet, value: web3.utils.toWei("2.34", "ether")}).then(
//               function(v) {
//                 console.log("Task Funded:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );

//     //programmer starts development phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.startTask(1, {from: programmerWallet}).then(
//               function(v) {
//                 console.log("Task Started:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );    

//     //client approves development phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.approveTask(1, {from: clientWallet}).then(
//               function(v) {
//                 console.log("Task Approved:"+v.receipt.logs[0].args.scheduleID);
//               }
//             )
//         }
//     );

//     //programmer releases funds to himself
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.releaseFunds(1, {from: programmerWallet}).then(
//                 function(v) {
//                     console.log("Funds Released:"+v.receipt.logs[0].args.scheduleID);
//                 }
//             )
//         }
//     );  

//     //client funds UAT phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.fundTask(2, {from: clientWallet, value: web3.utils.toWei("3.25", "ether")}).then(
//                 function(v) {
//                     console.log("Task Funded:"+v.receipt.logs[0].args.scheduleID);
//                 }
//             )
//         }
//     );
    
//     //programmer starts UAT phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.startTask(2, {from: programmerWallet}).then(
//                 function(v) {
//                     console.log("Task Started:"+v.receipt.logs[0].args.scheduleID);
//                 }
//             )
//         }
//     );    
    
//     //client approves UAT phase
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.approveTask(2, {from: clientWallet}).then(
//                 function(v) {
//                     console.log("Task Approved:"+v.receipt.logs[0].args.scheduleID);
//                 }
//             )
//         }
//     );
    
//     //programmer releases funds to himself
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.releaseFunds(2, {from: programmerWallet}).then(
//                 function(v) {
//                     console.log("Funds Released:"+v.receipt.logs[0].args.scheduleID);
//                 }
//             )
//         }
//     ); 

//     //programmer ends project
//     await freelancer.deployed().then(
//         async function(contractInstance) {
//             await contractInstance.endProject({from: programmerWallet}).then(
//                 function(v) {
//                     console.log("Project Ended");
//                 }
//             )
//         }
//     ); 
// };






























// describe('images', async () => {
//   let result, imageCount
//   const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

//   before(async () => {
//     result = await decentragram.uploadImage(hash, 'Image description', { from: author })
//     imageCount = await decentragram.imageCount()
//   })

//   //check event
//   it('creates images', async () => {
//     // SUCESS
//     assert.equal(imageCount, 1)
//     const event = result.logs[0].args
//     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
//     assert.equal(event.hash, hash, 'Hash is correct')
//     assert.equal(event.description, 'Image description', 'description is correct')
//     assert.equal(event.tipAmount, '0', 'tip amount is correct')
//     assert.equal(event.author, author, 'author is correct')


//     // FAILURE: Image must have hash
//     await decentragram.uploadImage('', 'Image description', { from: author }).should.be.rejected;

//     // FAILURE: Image must have description
//     await decentragram.uploadImage('Image hash', '', { from: author }).should.be.rejected;
//   })

//   //check from Struct
//   it('lists images', async () => {
//     const image = await decentragram.images(imageCount)
//     assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
//     assert.equal(image.hash, hash, 'Hash is correct')
//     assert.equal(image.description, 'Image description', 'description is correct')
//     assert.equal(image.tipAmount, '0', 'tip amount is correct')
//     assert.equal(image.author, author, 'author is correct')
//   })

//   it('allows users to tip images', async () => {
//     // Track the author balance before purchase
//     let oldAuthorBalance
//     oldAuthorBalance = await web3.eth.getBalance(author)
//     oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

//     result = await decentragram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

//     // SUCCESS
//     const event = result.logs[0].args
//     assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
//     assert.equal(event.hash, hash, 'Hash is correct')
//     assert.equal(event.description, 'Image description', 'description is correct')
//     assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
//     assert.equal(event.author, author, 'author is correct')

//     // Check that author received funds
//     let newAuthorBalance
//     newAuthorBalance = await web3.eth.getBalance(author)
//     newAuthorBalance = new web3.utils.BN(newAuthorBalance)

//     let tipImageOwner
//     tipImageOwner = web3.utils.toWei('1', 'Ether')
//     tipImageOwner = new web3.utils.BN(tipImageOwner)

//     const expectedBalance = oldAuthorBalance.add(tipImageOwner)

//     assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

//     // FAILURE: Tries to tip a image that does not exist
//     await decentragram.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
//   })
// })