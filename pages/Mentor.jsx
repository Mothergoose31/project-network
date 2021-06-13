import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Head from 'next/head'
import Web3 from 'web3';
import DecenteeArtifact from './abis/Decentee.json'
import { Modal, Popover } from 'react-bootstrap';




const Mentor = ({ account, decentee }) => {
    
  
    const [contractAddresss, setContractAddresss ] = useState("");
    const [mentorContractAddress, setMentorContractAddress ] = useState("")
    const [projectState, setProjectState] = useState(null)

    //console.log("contract", contractAddresss)
    
   

    
//==============================================================================================================================



    // useEffect(() => {
      
    //     loadWeb3();
    //     loadBlockchainData(); 
      
    //     },[] )
      

    
//==============================================================================================================================


  // const loadWeb3 = async () => {

  //   if(window.ethereum) {
  //     window.web3 = new Web3(window.ethereum)
  //     await window.ethereum.enable()
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider)
  //   } else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMaask!')
  //   }
  // }

//==============================================================================================================================

  // const loadBlockchainData = async () => {
    
  //   const web3 = window.web3;

  //   // Load account
  //   const accounts = await web3.eth.getAccounts();

  //   // set account number in state
  //   setAccount(accounts[0])

  //   // Get network id below
  //   const networkId = await web3.eth.net.getId();

  //   console.log(networkId)

  //   // get network data based off network id
  //   const networkData = Decentee.networks[networkId]



  //   //If we get back network data base from network id
  //   if(networkData) {

  //     const decentee = new web3.eth.Contract(Decentee.abi, networkData.address)
  //     setDecentee(decentee)

   
     
  //     setLoading(false)
      
  //   } else {
  //   window.alert('Decentragam contract not deployed to dectectd network')
  //   }

  // }


//==============================================================================================================================


    const getContractAddress = (e) => {

       
        setMentorContractAddress(e.target.value)
    }

//==============================================================================================================================


const btnGo = () => {
   // this.uiBtnDeployPopover.hide();

  //  this.uiTxtContractAddress = document.getElementById("txt-contract-address").value;
    if (contractAddresss == ""){
        deployFreelancer();
    }
    else {
       // this.retrieveFreelancer(this.uiTxtContractAddress);  
    }
  }






 const utilProjectStatus = function(statusCode) {
    //initiated, accepted, closed
    console.log(statusCode);
    this.uiLblProjectState = document.getElementById("lbl-project-status");
    switch(statusCode){
      case 0:
        this.uiLblProjectState.classList.add('bg-primary');
        this.uiLblProjectState.textContent = "Initiated";
        break;
      case 1:
        this.uiLblProjectState.classList.add('bg-success');
        this.uiLblProjectState.textContent = "Accepted";
        break;
      case 2:
        this.uiLblProjectState.classList.add('bg-warning');
        this.uiLblProjectState.textContent = "Closed";
        break;
    }
  }

  //==============================================================================================================================
  
  const deployFreelancer = function() {
    const web3 = window.web3;

    
    var freelancerContract = decentee;
    
    
   // console.log(freelancerContract)

    // console.log("freelance",freelancerContract)
    // this.uiSpnLoad = document.getElementById("spn-load");
    // this.uiConContract = document.getElementById("con-contract");
    var uiLblContractAddress = contractAddresss
    var uiLblFreelancerAddress = mentorContractAddress


    
    // this.uiSpnLoad.classNameList.remove('d-none');
    freelancerContract.deploy({
      data: DecenteeArtifact.bytecode,
      arguments: []
    }).send({
      from: account, 
    }, (error, transactionHash) => {})
    .on('error', (error) => { 
      console.log("error", account);            
    })
    .on('receipt', (receipt) => {
      console.log("DONE " + receipt.contractAddress); // contains the new contract address
      setContractAddresss(receipt.contractAddress)
      
      
      // this.uiSpnLoad.classList.add('d-none');
      // this.uiConContract.classList.remove('d-none');
      
      
      var freelanceContractAddress = receipt.contractAddress;
      
      uiLblContractAddress = receipt.contractAddress;
      
      var newFreelancerContract = new web3.eth.Contract( DecenteeArtifact.abi, freelanceContractAddress);

      console.log(newFreelancerContract)

      newFreelancerContract.methods.decenteeAddress().call().then((result) =>{
        console.log(result)
        uiLblFreelancerAddress = result;
      });
      
      newFreelancerContract.methods.projectState().call().then((result) =>{
        // this.utilProjectStatus(0);
      });
      
      //update the ETH Value boxes
      //this.utilGetEthValue();
      //this.utilToggerActionBtns("freelancer");
    })
    
  }






//==============================================================================================================================




// const btnEndProject = async () => {
//   this.uiSpnContractAction  = document.getElementById("spn-contract-action");
//   this.uiSpnContractAction.classList.remove('d-none');
//   this.utilToggerAllButtonOnOff(0);
//   this.freelancerContract.methods.endProject().send({from: this.account})
//   .on('error', function(error, receipt) { 
//     App.uiSpnContractAction.classList.add('d-none');
//     App.utilToggerAllButtonOnOff(1);
//   })
//   .then((result) => {
//     this.utilRefreshHeader(this.freelanceContractAddress);
//     this.utilRefreshScheduleTable();
//     this.uiSpnContractAction.classList.add('d-none');
//     this.utilToggerAllButtonOnOff(1);
//   });
// }

//==============================================================================================================================






// const btnRefresh = async (who) => {
//   console.log("---" + this.freelanceContractAddress);
//   if (this.freelanceContractAddress == null)
//     this.freelanceContractAddress = document.getElementById("txt-contract-address").value;

//   await this.utilRefreshHeader(this.freelanceContractAddress);
  
//   if (who == "freelancer"){
//     await this.utilRefreshScheduleTable();
//   }
//   else {
//     await this.utilRefreshScheduleTableClient();
//   }
// }


//==============================================================================================================================






// const btnAddSchedule = async () =>{
//   if (document.getElementById("Schedule-Form").checkValidity()){
//     this.uiTxtShortCode = document.getElementById("txt-short-code").value;
//     this.uiTxtScheduleDescription = document.getElementById("txt-schedule-description").value;
//     this.uiTxtScheduleValue = document.getElementById("txt-schedule-value").value;
//     this.uiSpnAddSchedule = document.getElementById("spn-add-schedule");
//     this.uiSpnAddSchedule.classList.remove('d-none');
//     this.utilToggerAllButtonOnOff(0);
    
//     this.freelancerContract.methods.addSchedule(this.uiTxtShortCode, this.uiTxtScheduleDescription, App.web3.utils.toWei(this.uiTxtScheduleValue, 'ether')).send({from: this.account})
//     .on('error', function(error, receipt) { 
//       console.log(App.uiSpnAddSchedule);
//       App.uiSpnAddSchedule.classList.add('d-none');
//       App.scheduleModal = Modal.getInstance(document.getElementById('scheduleModal'));
//       App.scheduleModal.hide();
//       App.utilToggerAllButtonOnOff(1);
//     })
//     .then((result) =>{
//       console.log("try to do this");
//       this.uiTblScheduleTable = document.getElementById("tbl-schedule-table");
//       this.uiTblScheduleTable.classList.remove('d-none');  
//       this.uiSpnAddSchedule.classList.add('d-none');
//       this.scheduleModal = Modal.getInstance(document.getElementById('scheduleModal'));
//       this.utilAddScheduleToTable(this.uiTxtShortCode, this.uiTxtScheduleDescription, App.web3.utils.toWei(this.uiTxtScheduleValue, 'ether'), 0);
//       this.utilGetEthValue();
//       this.scheduleModal.hide();
//       this.utilToggerAllButtonOnOff(1);
//     });

//   }
//   else{
//     console.log("nope");
//   }
// }




//==============================================================================================================================







    return (
        <>
        <Navbar account={account}/>
        <br />
        <Head>
            <title>Freelancer Smart Contract - For Freelancer</title>
        </Head>

        

    <div className="p-1 mb-1 bg-light bg-gradient rounded-3">
      <div className="container-fluid py-3">
        <h1 className="display-7 fw-bold">Freelancer Smart Contract</h1>
        <p className="col-md-8 fs-4">This is the freelancer's Distributed App</p>
        <div className="row">
          <div className="col-8">
            <div className="input-group input-group-lg">
              <input type="text" className="form-control" placeholder="Enter contract address or leave blank to deploy a new one" onChange={getContractAddress} />
            </div>
          </div>
          <div className="col-4">
            <a tabIndex="0"  className="btn btn-primary btn-lg" onClick={btnGo} 
            type="button" id="btn-Deploy"
            data-bs-toggle="popover" title="Error" 
            data-bs-content="Smart Contract Not Found"
            data-bs-trigger="manual">
              Go
            </a>
            <div className="spinner-border spinner-border-sm d-none" role="status" id="spn-load">
              <span className="sr-only"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container-fluid py-2 d-none" id="con-contract">
      <div className="row">
        <div className="col-6">
          <ul className="list-group">
            <li className="list-group-item"><span className="fw-bold">Address: </span><span id="lbl-contract-address"></span></li>
            <li className="list-group-item"><span className="fw-bold">Freelancer's Wallet: </span><span id="lbl-freelancer-address"></span></li>
            <li className="list-group-item"><span className="fw-bold">Client's Wallet: </span><span id="lbl-client-address" /></li>
            <li className="list-group-item"><span className="fw-bold">Project State: </span><span className="badge" id="lbl-project-status"></span></li>
          </ul>
        </div>
        <div className="col-3">
          <div className="card">
              <div className="card-header fw-bold text-center">Total Value (ETH)</div>
              <div className="card-body">
              <p className="card-text text-center"><span className="fs-1" id="lbl-total-eth"></span></p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-header fw-bold text-center">Disbursed (ETH)</div>
            <div className="card-body">
            <p className="card-text text-center"><span className="fs-1" id="lbl-disbursed-eth"></span></p>
          </div>
        </div>
        </div>
      </div>

      <br />

      <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#scheduleModal" id="btn-Add-Schedule">Add Schedule</button>
      <button className="btn btn-primary btn-lg" type="button" id="btn-End-Project" >End Project</button>
      <button className="btn btn-success btn-lg" type="button" id="btn-Refresh">Refresh</button>
      <div className="spinner-border spinner-border-sm d-none" role="status" id="spn-contract-action"></div>
    </div>


    <table className="table table-striped table-hover d-none" id="tbl-schedule-table">
      <thead>
        <tr>
          <th scope="col" data-field="short-code">Short Code</th>
          <th scope="col" data-field="description">Description</th>
          <th scope="col" className="text-end" data-field="value">Value (in ETH)</th>
          <th scope="col" data-field="state">State</th>
          <th scope="col" data-field="state">Action</th>
        </tr>
      </thead>
      <tbody id="schedule-table-body">

      </tbody>
    </table>

    
    <div className="modal fade" id="scheduleModal" tabIndex="-1" aria-labelledby="scheduleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="scheduleModalLabel">New Schedule</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {/* <form id="Schedule-Form" >
          <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="txt-short-code" className="col-form-label">Short Code:</label>
                <input type="text" className="form-control" placeholder="Enter short code e.g. DEV" value="UAT" id="txt-short-code" required />
              </div>
              <div className="mb-3">
                <label htmlFor="txt-schedule-description" className="col-form-label">Description:</label>
                <input type="text" className="form-control" placeholder="Enter description e.g. Development Stage" value="User Acceptance Testing" id="txt-schedule-description" required />
              </div>
              <div className="mb-3">
                <label htmlFor="txt-schedule-value" className="col-form-label">Value</label>
                <input type="number" min="0" step="any" className="form-control" id="txt-schedule-value" value="1.5" placeholder="Enter value (in ETH) to be paid when done" required />
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" id="btn-Add-Schedule">Go</button>
            <div className="spinner-border spinner-border-sm d-none" role="status" id="spn-add-schedule"></div>
          </div>
        </form> */}
        </div>
      </div>
    </div>

    

  
  </>
    )
}

export default Mentor

