import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Web3 from 'web3';
import DecenteeArtifact from './abis/Decentee.json'
import { Modal, Popover } from 'react-bootstrap';



  //UI DECLARATIONS

  //✅ == Worked on /optimized
  // ⭕ == is working but can be optimized 
  //❌ == is commeted out , needs to worked on... probably
  //==============================================================================================================================

  // ✅uiSpnLoad:null,
  //⭕ uiSpnAddSchedule: null,
  // ⭕uiConContract:null,
  // ⭕uiSpnContractAction: null,
  // ✅uiLblContractAddress:null,
  // ✅uiLblFreelancerAddress:null,
  // ✅uiTxtContractAddress:null,
  // ✅ uiLblClientAddress: null,
  // ✅uiLblProjectState:null,
  // ✅scheduleModal: null,
  // ❌uiTxtShortCode: null,
  // ❌uiTxtScheduleDescription: null,
  // ❌uiTxtScheduleValue: null,
  // ⭕uiTblScheduleTable: null,
  // ⭕uiTblScheduleTableBody: null,
  // ❌uiBtnDeploy: null,
  // ❌uiBtnDeployPopover: null,
  // ✅uiLblTotalEth: null,
  // ✅uiLblDisbursedEth: null,
  // ❌uiBtnAcceptProject: null,===========>  MISSING FROM THE CODE
  // ❌uiBtnAddSchedule: null,===========>  MISSING FROM THE CODE
  // ❌uiBtnEndProject: null,===========>  MISSING FROM THE CODE

//==============================================================================================================================
  
  const Mentor = ({ account, decentee }) => {
    const [contractAddresss, setContractAddresss ] = useState("");
    const [mentorAddress, setMentorAddress ] = useState("")
    const [projectState, setProjectState] = useState(null)
    const [scheduleModal, setScheduleModal] = useState(null)

    const [shortCode, setShortCode] = useState("")
    const [modalDescription, setModalDescription] = useState("")
    const [ethValue, setEthValue] = useState("")

    const [uiLblTotalEth, setUiLblTotalEth ] = useState(null)
    const [uiLblDisbursedEth, setUiLblDisbursedEth ] = useState(null)

    const [uiLblClientAddress, set] = useState(null)

    var decenteeContractStatus = null;


   // const [popoverOpen, setPopoverOpen] = useState(false);

    //console.log("contract", contractAddresss)
    
    // const toggle = () => setPopoverOpen(!popoverOpen);

//==============================================================================================================================
const getContractAddress = (e) => {
  
  setContractAddresss(e.target.value)

}

//==============================================================================================================================
    
const onShortcode = (e) => {
  
  setShortCode(e.target.value)

}

//==============================================================================================================================
    
const onDescription = (e) => {
  
  setModalDescription(e.target.value)

}

//==============================================================================================================================
    
const onValue = (e) => {
  
  setEthValue(e.target.value)

}

//==============================================================================================================================

const btnGo = () => {
   // this.uiBtnDeployPopover.hide();

  //  this.uiTxtContractAddress = document.getElementById("txt-contract-address").value;
    if (contractAddresss == ""){
        deployFreelancer();
        
      }
      else {
        retrieveFreelancer(contractAddresss);  
      }
    }


//==============================================================================================================================
  
  const utilProjectStatus = function(statusCode) {
    //initiated, accepted, closed
    //console.log(statusCode);
    var uiLblProjectState = document.getElementById("lbl-project-status");
    switch(statusCode){
      case 0:
        uiLblProjectState.classList.add('bg-primary');
        setProjectState("Initiated");
        break;
      case 1:
        uiLblProjectState.classList.add('bg-success');
        setProjectState("Accepted");
        break;
      case 2:
        uiLblProjectState.classList.add('bg-warning');
        setProjectState("Closed");
        break;
    }
  }

//==============================================================================================================================
  
  const utilGetEthValue = async () => {
    let totalRow;
    let totalDisbursed=0;
    let totalValue = 0;

    await decentee.methods.totalSchedules().call().then((result) => {

      console.log("eth value", result)

      totalRow = result;
    });

    for (let i=0; i<= totalRow-1; i++){
      await decentee.methods.scheduleRegister(i).call().then((result)=>{
        totalValue += result["value"]/1000000000000000000;
        if (result["scheduleState"] == 4){
          totalDisbursed += result["value"]/1000000000000000000;
        }
      });
    }

    setUiLblTotalEth(Math.round(totalValue*100)/100);
    setUiLblDisbursedEth(Math.round(totalDisbursed*100)/100);
  }

//==============================================================================================================================

  const utilRefreshScheduleTable = async () => {
    console.log("freelancer table refresh");
    var uiTblScheduleTable = document.getElementById("tbl-schedule-table"); 
        uiTblScheduleTable.classList.remove('d-none');  

    while (uiTblScheduleTable.rows[1]){
      uiTblScheduleTable.deleteRow(1);
    }

    let totalRow;

    await decentee.methods.totalSchedules().call().then((result) => {
      totalRow = result;
    });

    for (let i=0; i<= totalRow-1; i++){
      await decentee.methods.scheduleRegister(i).call().then((result)=>{
        utilAddScheduleToTable(result["shortCode"], result["description"], result["value"], result["scheduleState"], "mentor", i);
      });
    }

    //update the ETH Value boxes
    await utilGetEthValue();
    utilToggerActionBtns("mentor");
  }
  
//==============================================================================================================================
//hooks for diplaying  contract adress, instructor adress, client wallet, and the state of the project. 
// Clients Wallet remains Blank until you get a client 


const utilRefreshHeader = async (ContractAddress) => {
  const web3 = window.web3;
  var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, ContractAddress);
  var uiConContract = document.getElementById("con-contract");
 
  uiConContract.classList.remove('d-none');
  setContractAddresss(ContractAddress);
  console.log("207",freelancerContract.methods)
  

 // this.uiLblClientAddress = document.getElementById("lbl-client-address");

    uiConContract.classList.remove('d-none');

    setContractAddresss(ContractAddress);

    //console.log("207",freelancerContract.methods)

    await freelancerContract.methods.decenteeAddress().call().then((result) =>{
      setMentorAddress(result);
    });


  await freelancerContract.methods.clientAddress().call().then((result) =>{
    setuiLblClientAddress(result);
  });


    await freelancerContract.methods.projectState().call().then((result) =>{
        decenteeContractStatus = result;
        utilProjectStatus(parseInt(result));
    });



}

//==============================================================================================================================





const retrieveFreelancer = (ContractAddress, who="mentor") => {

    try {
          utilRefreshHeader(ContractAddress);
        if (who === "mentor"){
          utilRefreshScheduleTable();
        }
        else{
          //this.utilRefreshScheduleTableClient();
        }
        //this.uiBtnDeployPopover.hide();
    } catch (error) {
      console.log(error)
      //this.uiBtnDeployPopover.show();
    }
  }

//==============================================================================================================================
  
  const deployFreelancer = function() {
    const web3 = window.web3;

    
   // var freelancerContract = decentee;
    var uiSpnLoad = document.getElementById("spn-load");
    var uiConContract = document.getElementById("con-contract");
    var uiLblContractAddress = contractAddresss
    var uiLblFreelancerAddress = mentorAddress


    
    uiSpnLoad.classList.remove('d-none');

    decentee.deploy({
      data: DecenteeArtifact.bytecode,
      arguments: []
    }).send({
      from: account, 
    }, (error, transactionHash) => {})
    .on('error', (error) => { 
      console.log("error", account);            
    })
    .on('receipt', (receipt) => {
      //console.log("DONE " + receipt.contractAddress); // contains the new contract address
      setContractAddresss(receipt.contractAddress)
      
      
      uiSpnLoad.classList.add('d-none');
      uiConContract.classList.remove('d-none');
      
      
      var decenteeContractAddress = receipt.contractAddress;
      
      uiLblContractAddress = receipt.contractAddress;
      
      var newDecenteeContract = new web3.eth.Contract( DecenteeArtifact.abi, decenteeContractAddress);

      //console.log( newDecenteeContract)

      newDecenteeContract.methods.decenteeAddress().call().then((result) =>{
        setMentorAddress(result)
      //  console.log(result)
        uiLblFreelancerAddress = result;
      });
      
      newDecenteeContract.methods.projectState().call().then((result) =>{
        utilProjectStatus(0);
      });
      
      //update the ETH Value boxes
        utilGetEthValue();
        utilToggerActionBtns("mentor");
    })
    
  }

//==============================================================================================================================

const utilToggerActionBtns = async (who) => {
  if (who == "mentor"){
    var uiBtnAddSchedule = document.getElementById("btn-Add-Schedule");
    var uiBtnEndProject = document.getElementById("btn-End-Project");

    await decentee.methods.projectState().call().then((result) =>{

      console.log("326",result)

      if (result == 0){
        uiBtnAddSchedule.disabled = false;
        uiBtnEndProject.disabled = true;
      }
      else if (result == 1){
        // this.uiLblTotalEth = document.getElementById("lbl-total-eth");
        // this.uiLblDisbursedEth = document.getElementById("lbl-disbursed-eth");
        console.log("T:" + this.uiLblTotalEth.innerHTML);
        console.log("D:"+ this.uiLblDisbursedEth.innerHTML);
        if (uiLblTotalEth == uiLblDisbursedEth){
          uiBtnAddSchedule.disabled = true;
          uiBtnEndProject.disabled = false;
        }
        else{
          uiBtnAddSchedule.disabled = true;
          uiBtnEndProject.disabled = true;
        }
      }
      else if (result == 2){
        uiBtnAddSchedule.disabled = true;
        uiBtnEndProject.disabled = true;
      }
    });
  }
}


//==============================================================================================================================


const btnEndProject = async () => {
  var uiSpnContractAction  = document.getElementById("spn-contract-action");
      uiSpnContractAction.classList.remove('d-none');
  //utilToggerAllButtonOnOff(0);
  decentee.methods.endProject().send({from: account})
  .on('error', function(error, receipt) { 
      uiSpnContractAction.classList.add('d-none');
      //utilToggerAllButtonOnOff(1);
  })
  .then((result) => {
    utilRefreshHeader(contractAddresss);
    utilRefreshScheduleTable();
    uiSpnContractAction.classList.add('d-none');
    //utilToggerAllButtonOnOff(1);
  });
}

//==============================================================================================================================







const btnRefresh = async (who) => {
  console.log("---" + contractAddresss);
  if (contractAddresss == null)
      getContractAddress()
   // this.freelanceContractAddress = document.getElementById("txt-contract-address").value;

  await utilRefreshHeader(contractAddresss);
  
  if (who == "mentor"){
    await utilRefreshScheduleTable();
  }
  else {
    //await this.utilRefreshScheduleTableClient();
  }
}

//==============================================================================================================================

// const utilToggerAllButtonOnOff = function(state){
//   if (state == 0){
//     let buttons = document.getElementsByTagName("button");
//     let i;
//     for (i = 0; i < buttons.length; i++) {
//       buttons[i].classList.add("disabled");
//       console.log(buttons[i]);
//     }
//   }
//   else if (state == 1){
//     let buttons = document.getElementsByTagName("button");
//     let i;
//     for (i = 0; i < buttons.length; i++) {
//       buttons[i].classList.remove("disabled");
//       console.log(buttons[i]);
//     }
//   }
// }

//==============================================================================================================================

const utilScheduleState = (stateCode) => {
  //planned, funded, started, approved, released
  switch(stateCode){
    case 0:
      return "<span class='badge bg-primary'>Planned</span>";
    case 1:
      return "<span class='badge bg-success'>Funded</span>";
    case 2:
      return "<span class='badge bg-warning'>Started</span>";
    case 3:
      return "<span class='badge bg-info'>Approved</span>";
    case 4:       
      return "<span class='badge bg-dark'>Released</span>";
  }
}

//==============================================================================================================================
// @dev TODO  optimize this  


const utilAddScheduleToTable = (shortcode, description, value, state, action, scheduleID = 0) => {

  let tr;
  let td; 

  var uiTblScheduleTableBody = document.getElementById("schedule-table-body");    
  tr = document.createElement("tr");
  td = document.createElement("td");
  td.innerHTML = shortcode;
  tr.appendChild(td);
  uiTblScheduleTableBody.appendChild(tr);

  td = document.createElement("td");
  td.innerHTML = description;
  tr.classList.add("table-active");
  tr.appendChild(td);
  uiTblScheduleTableBody.appendChild(tr);

  td = document.createElement("td");
  td.innerHTML = value/1000000000000000000;
  td.classList.add('text-end');
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerHTML = utilScheduleState(parseInt(state));
  tr.appendChild(td);

  td = document.createElement("td");
  //let client fund this if (a) it's the client (b) schedule is not funded (c) project is accepted
  if (action === "client" && state == 0 && decenteeContractStatus == 1){
    td.innerHTML = '<button type="button" onclick="App.btnFundSchedule('+ value/1000000000000000000 + ',' + scheduleID + ')" class="btn btn-primary btn-sm">Fund</button>';
    td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-'+ scheduleID + '"></span>';
  }
  else if (action === "mentor" && state == 1 && decenteeContractStatus == 1){
    td.innerHTML = '<button type="button" onclick="App.btnStartSchedule(' + scheduleID + ')" class="btn btn-success btn-sm">Start Work</button>';
    td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-'+ scheduleID + '"></span>';
  }
  else if (action === "client" && state == 2 && decenteeContractStatus == 1){
    td.innerHTML = '<button type="button" onclick="App.btnApproveSchedule(' + scheduleID + ')" class="btn btn-warning btn-sm">Approve</button>';
    td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-'+ scheduleID + '"></span>';
  }
  else if (action === "mentor" && state == 3 && decenteeContractStatus == 1){
    td.innerHTML = '<button type="button" onclick="App.btnReleaseFunds(' + scheduleID + ')" class="btn btn-info btn-sm">Release Funds</button>';
    td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-'+ scheduleID + '"></span>';
  }

  tr.appendChild(td);

  uiTblScheduleTableBody.appendChild(tr);
}


//==============================================================================================================================


const btnAddSchedule = async () =>{
  const web3 = window.web3;
  if (document.getElementById("Schedule-Form").checkValidity()){
    // var uiTxtShortCode = document.getElementById("txt-short-code").value;

    // var uiTxtScheduleDescription = document.getElementById("txt-schedule-description").value;

    // var uiTxtScheduleValue = document.getElementById("txt-schedule-value")

    var freelancerContract = decentee;
 
    var uiSpnAddSchedule = document.getElementById("spn-add-schedule");
        uiSpnAddSchedule.classList.remove('d-none');
   // this.utilToggerAllButtonOnOff(0);
   //console.log(freelancerContract.methods)

    freelancerContract.methods.addSchedule(shortCode, modalDescription, web3.utils.toWei(ethValue, 'ether')).send({from: account})
    .on('error', function(error, receipt) {

      console.log("test ", error);

      uiSpnAddSchedule.classList.add('d-none');

    // var scheduleModal = Modal.getInstance(document.getElementById('scheduleModal'));
    //     scheduleModal.hide();
      // utilToggerAllButtonOnOff(1);
    })
    .then((result) =>{
      console.log("try to do this");
      var uiTblScheduleTable = document.getElementById("tbl-schedule-table");
          uiTblScheduleTable.classList.remove('d-none');  
          uiSpnAddSchedule.classList.add('d-none');
     // var scheduleModal = Modal.getInstance(document.getElementById('scheduleModal'));

        utilAddScheduleToTable(shortCode, modalDescription, web3.utils.toWei(ethValue, 'ether'), 0);
        utilGetEthValue();
        //  scheduleModal.hide();
      // this.utilToggerAllButtonOnOff(1);
    });

  }
  else{
    console.log("nope");
  }
}

//==============================================================================================================================

  return (
        <>
        <br />
        
        <Head>
            <title>Coaching Smart Contract - For Developers that would a more expereinced dev to talk to / look at their code </title>
        </Head>

        

    <div className="p-1 mb-1 bg-light bg-gradient rounded-3">
      <div className="container-fluid py-3">
        <h1 className="display-7 fw-bold">Coaching Smart Contract</h1>
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
            <li className="list-group-item"><span className="fw-bold">Contract Address: {contractAddresss} </span><span id="lbl-contract-address"></span></li>

            <li className="list-group-item"><span className="fw-bold">Instructors Address: {mentorAddress} </span><span id="lbl-freelancer-address"></span></li>
            <li className="list-group-item"><span className="fw-bold">Client's Wallet: </span><span id="lbl-client-address" /></li>
            <li className="list-group-item"><span className="fw-bold">Project State: {projectState}</span><span className="badge" id="lbl-project-status"></span></li>
          </ul>
        </div>
        <div className="col-3">
          <div className="card">
              <div className="card-header fw-bold text-center">Total Value (ETH)</div>
              <div className="card-body">
              <p className="card-text text-center"><span className="fs-1" id="lbl-total-eth">  {uiLblTotalEth} </span></p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-header fw-bold text-center">Disbursed (ETH)</div>
            <div className="card-body">
            <p className="card-text text-center"><span className="fs-1" id="lbl-disbursed-eth"> {uiLblDisbursedEth} </span></p>
          </div>
        </div>
        </div>
      </div>

      <br />

      <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#scheduleModal" id="btn-Add-Schedule">Add Schedule</button>
      <button className="btn btn-primary btn-lg" type="button" id="btn-End-Project" onClick={btnEndProject}>End Project</button>
      <button className="btn btn-success btn-lg" type="button" id="btn-Refresh" onClick={btnRefresh}>Refresh</button>
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
           <form id="Schedule-Form" >
          <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="txt-short-code" className="col-form-label">Short Code:</label>
                <input type="text" className="form-control" placeholder="Enter short code e.g. DEV" onChange={onShortcode} id="txt-short-code" required />
              </div>
              <div className="mb-3">
                <label htmlFor="txt-schedule-description" className="col-form-label">Description:</label>
                <input type="text" className="form-control" placeholder="Enter description e.g. Development Stage" onChange={onDescription} id="txt-schedule-description" required />
              </div>
              <div className="mb-3">
                <label htmlFor="txt-schedule-value" className="col-form-label">Value</label>
                <input type="number" min="0" step="any" className="form-control" id="txt-schedule-value" onChange={onValue}  placeholder="Enter value (in ETH) to be paid when done" required />
              </div>
          </div>
        </form> 
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" id="btn-Add-Schedule" onClick={btnAddSchedule}>Go</button>
            <div className="spinner-border spinner-border-sm d-none" role="status" id="spn-add-schedule"></div>
          </div>
        </div>
      </div>
    </div>

    
 
  
  </>
    )
}

export default Mentor


