import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Web3 from 'web3';
import Decentee from './abis/Decentee.json'
import { Modal, Popover } from 'react-bootstrap';
import Navbar from "../pages/index.js";




const Mentor = () => {
    
    const [decentee, setDecentee ] = useState(null);
    const [contractAddress, setContractAddress ] = useState();
    const [mentorContractAddress, setMentorContractAddress ] = useState()
    
   

    




    
//==============================================================================================================================


  const loadWeb3 = async () => {

    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMaask!')
    }
  }

//==============================================================================================================================

  const loadBlockchainData = async () => {
    
    const web3 = window.web3;

    // Load account
    const accounts = await web3.eth.getAccounts();

    // set account number in state
    setAccount(accounts[0])

    // Get network id below
    const networkId = await web3.eth.net.getId();

    console.log(networkId)

    // get network data based off network id
    const networkData = Decentee.networks[networkId]



    //If we get back network data base from network id
    if(networkData) {

      const decentee = new web3.eth.Contract(Decentee.abi, networkData.address)
      setDecentee(decentee)

   
     
      setLoading(false)
      
    } else {
    window.alert('Decentragam contract not deployed to dectectd network')
    }

  }


//==============================================================================================================================


    const getContractAddress = (e) => {

        setContractAddress(e.target.value)
    }

//==============================================================================================================================


const btnGo = () => {
   // this.uiBtnDeployPopover.hide();

  //  this.uiTxtContractAddress = document.getElementById("txt-contract-address").value;
    if (contractAddress === ""){
        deployFreelancer();
    }
    else {
       // this.retrieveFreelancer(this.uiTxtContractAddress);  
    }
  }






//==============================================================================================================================


// const deployFreelancer = () => {
    
//     freelancerContract = new web3.eth.Contract(decentee.abi);
//     this.uiSpnLoad = document.getElementById("spn-load");
//     this.uiConContract = document.getElementById("con-contract");
//     this.uiLblContractAddress = document.getElementById("lbl-contract-address");
//     this.uiLblFreelancerAddress = document.getElementById("lbl-freelancer-address");

//     this.uiSpnLoad.classList.remove('d-none');
//     this.freelancerContract.deploy({
//       data: freelancerArtifact.bytecode,
//       arguments: []
//     }).send({
//       from: this.account, 
//     }, (error, transactionHash) => {})
//     .on('error', (error) => { 
//       console.log("error");            
//     })
//     .on('receipt', (receipt) => {
//       console.log("DONE" + receipt.contractAddress); // contains the new contract address
//       this.uiSpnLoad.classList.add('d-none');
//       this.uiConContract.classList.remove('d-none');

//       this.freelanceContractAddress = receipt.contractAddress;
//       this.uiLblContractAddress.textContent = receipt.contractAddress;

//       this.freelancerContract = new web3.eth.Contract(freelancerArtifact.abi, this.freelanceContractAddress);
//       this.freelancerContract.methods.freelancerAddress().call().then((result) =>{
//         this.uiLblFreelancerAddress.textContent = result;
//       });

//       this.freelancerContract.methods.projectState().call().then((result) =>{
//         this.utilProjectStatus(0);
//       });

//       //update the ETH Value boxes
//       this.utilGetEthValue();
//       this.utilToggerActionBtns("freelancer");
//     })
//   }
//==============================================================================================================================

    return (
        <>
        <Navbar/>
        <br />
        <Head>
            <title>Freelancer Smart Contract - For Freelancer</title>
        </Head>

        

    <div class="p-1 mb-1 bg-light bg-gradient rounded-3">
      <div class="container-fluid py-3">
        <h1 class="display-7 fw-bold">Freelancer Smart Contract</h1>
        <p class="col-md-8 fs-4">This is the freelancer's Distributed App</p>
        <div class="row">
          <div class="col-8">
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" placeholder="Enter contract address or leave blank to deploy a new one" onChange={getContractAddress} />
            </div>
          </div>
          <div class="col-4">
            <a tabindex="0"  class="btn btn-primary btn-lg" onclick={btnGo()} 
            type="button" id="btn-Deploy"
            data-bs-toggle="popover" title="Error" 
            data-bs-content="Smart Contract Not Found"
            data-bs-trigger="manual">
              Go
            </a>
            <div class="spinner-border spinner-border-sm d-none" role="status" id="spn-load">
              <span class="sr-only"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-2 d-none" id="con-contract">
      <div class="row">
        <div class="col-6">
          <ul class="list-group">
            <li class="list-group-item"><span class="fw-bold">Address: </span><span id="lbl-contract-address"></span></li>
            <li class="list-group-item"><span class="fw-bold">Freelancer's Wallet: </span><span id="lbl-freelancer-address"></span></li>
            <li class="list-group-item"><span class="fw-bold">Client's Wallet: </span><span id="lbl-client-address" /></li>
            <li class="list-group-item"><span class="fw-bold">Project State: </span><span class="badge" id="lbl-project-status"></span></li>
          </ul>
        </div>
        <div class="col-3">
          <div class="card">
              <div class="card-header fw-bold text-center">Total Value (ETH)</div>
              <div class="card-body">
              <p class="card-text text-center"><span class="fs-1" id="lbl-total-eth"></span></p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card">
            <div class="card-header fw-bold text-center">Disbursed (ETH)</div>
            <div class="card-body">
            <p class="card-text text-center"><span class="fs-1" id="lbl-disbursed-eth"></span></p>
          </div>
        </div>
        </div>
      </div>

      <br />

      <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#scheduleModal" id="btn-Add-Schedule">Add Schedule</button>
      <button class="btn btn-primary btn-lg" type="button" id="btn-End-Project" onclick="App.btnEndProject()">End Project</button>
      <button class="btn btn-success btn-lg" type="button" id="btn-Refresh" onclick="App.btnRefresh('freelancer')">Refresh</button>
      <div class="spinner-border spinner-border-sm d-none" role="status" id="spn-contract-action"></div>
    </div>


    <table class="table table-striped table-hover d-none" id="tbl-schedule-table">
      <thead>
        <tr>
          <th scope="col" data-field="short-code">Short Code</th>
          <th scope="col" data-field="description">Description</th>
          <th scope="col" class="text-end" data-field="value">Value (in ETH)</th>
          <th scope="col" data-field="state">State</th>
          <th scope="col" data-field="state">Action</th>
        </tr>
      </thead>
      <tbody id="schedule-table-body">

      </tbody>
    </table>

    
    <div class="modal fade" id="scheduleModal" tabindex="-1" aria-labelledby="scheduleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="scheduleModalLabel">New Schedule</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="Schedule-Form" onsubmit="return false">
          <div class="modal-body">
              <div class="mb-3">
                <label for="txt-short-code" class="col-form-label">Short Code:</label>
                <input type="text" class="form-control" placeholder="Enter short code e.g. DEV" value="UAT" id="txt-short-code" required />
              </div>
              <div class="mb-3">
                <label for="txt-schedule-description" class="col-form-label">Description:</label>
                <input type="text" class="form-control" placeholder="Enter description e.g. Development Stage" value="User Acceptance Testing" id="txt-schedule-description" required />
              </div>
              <div class="mb-3">
                <label for="txt-schedule-value" class="col-form-label">Value</label>
                <input type="number" min="0" step="any" class="form-control" id="txt-schedule-value" value="1.5" placeholder="Enter value (in ETH) to be paid when done" required />
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" id="btn-Add-Schedule" onclick="App.btnAddSchedule()">Go</button>
            <div class="spinner-border spinner-border-sm d-none" role="status" id="spn-add-schedule"></div>
          </div>
        </form>
        </div>
      </div>
    </div>

    

  
  </>
    )
}

export default Mentor

