import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from './ContextApi/GlobalState'
import DecenteeArtifact from './abis/Decentee.json'

import { utilToggerAllButtonOnOff } from "./components/Global-Functions.js"

function Mentee() {

    
    const [contractAddress, setContractAddress] = useState("");




    var decenteeContractStatus = null





//=============================================================================================================================================================================================

    const getContractAddress = (e) => {

        setContractAddress(e.target.value.trim())
    
      }




//=============================================================================================================================================================================================

      const btnGoClient = () => {
       
        //this.uiBtnDeployPopover.hide();
        
        if (contractAddress === ""){
          //this.uiBtnDeployPopover.show();
        }
        else{
             var freelanceContractAddress = contractAddress;
          var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, freelanceContractAddress);
          retrieveFreelancer(contractAddress, "client");
        }
      }




    //   btnGo: function(){
    //     this.uiBtnDeployPopover.hide();
    
    //     this.uiTxtContractAddress = document.getElementById("txt-contract-address").value;
    //     if (this.uiTxtContractAddress === ""){
    //       this.deployFreelancer();
    //     }
    //     else {
    //         this.retrieveFreelancer(this.uiTxtContractAddress);  
    //     }
    //   },



//=============================================================================================================================================================================================
      
     const retrieveFreelancer = (contractAddress, who = "client") => {

        try {
          
          utilRefreshScheduleTableClient();
       
          //this.uiBtnDeployPopover.hide();
        } catch (error) {
          console.log(error)
          //this.uiBtnDeployPopover.show();
        }
      }

//=============================================================================================================================================================================================

      const utilRefreshScheduleTableClient = async  () => {

        var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);

        console.log("Client table refresh");
        //this.utilToggerActionBtns("client");
        var uiTblScheduleTable = document.getElementById("tbl-schedule-table"); 
            uiTblScheduleTable.classList.remove('d-none');  
    
        while (uiTblScheduleTable.rows[1]){
            uiTblScheduleTable.deleteRow(1);
        }
    
        let totalRow;
    
        await freelancerContract.methods.totalSchedules().call().then((result) => {
          totalRow = result;
        });
    
        for (let i=0; i<= totalRow-1; i++){
          await freelancerContract.methods.scheduleRegister(i).call().then((result)=>{
                utilAddScheduleToTable(result["shortCode"], result["description"], result["value"], result["scheduleState"], "client", i);
          });
        }
    
        //await this.utilGetEthValue();
        //this.utilToggerActionBtns("client");
      }


//=============================================================================================================================================================================================


      
  const utilScheduleState = (stateCode) => {
    //planned, funded, started, approved, released
    switch (stateCode) {
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


//=============================================================================================================================================================================================

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
        td.innerHTML = value / 1000000000000000000;
        td.classList.add('text-end');
        tr.appendChild(td);
    
        td = document.createElement("td");
        td.innerHTML = utilScheduleState(parseInt(state));
        tr.appendChild(td);
    
        td = document.createElement("td");
        //let client fund this if (a) it's the client (b) schedule is not funded (c) project is accepted
        if (action === "client" && state == 0 && decenteeContractStatus == 1) {
          td.innerHTML = '<button type="button" onclick="App.btnFundSchedule(' + value / 1000000000000000000 + ',' + scheduleID + ')" class="btn btn-primary btn-sm">Fund</button>';
          td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-' + scheduleID + '"></span>';
        }
        else if (action === "mentor" && state == 1 && decenteeContractStatus == 1) {
          td.innerHTML = '<button type="button" onclick="App.btnStartSchedule(' + scheduleID + ')" class="btn btn-success btn-sm">Start Work</button>';
          td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-' + scheduleID + '"></span>';
        }
        else if (action === "client" && state == 2 && decenteeContractStatus == 1) {
          td.innerHTML = '<button type="button" onclick="App.btnApproveSchedule(' + scheduleID + ')" class="btn btn-warning btn-sm">Approve</button>';
          td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-' + scheduleID + '"></span>';
        }
        else if (action === "mentor" && state == 3 && decenteeContractStatus == 1) {
          td.innerHTML = '<button type="button" onclick="App.btnReleaseFunds(' + scheduleID + ')" class="btn btn-info btn-sm">Release Funds</button>';
          td.innerHTML += '<span class="spinner-border spinner-border-sm d-none" role="status" id="spn-schedule-action-' + scheduleID + '"></span>';
        }
    
        tr.appendChild(td);
    
        uiTblScheduleTableBody.appendChild(tr);
      }



//=============================================================================================================================================================================================

      const utilToggerActionBtns = async (who) => {
        if (who == "mentor") {
          var uiBtnAddSchedule = document.getElementById("btn-Add-Schedule");
          var uiBtnEndProject = document.getElementById("btn-End-Project");
    
          await decentee.methods.projectState().call().then((result) => {
    
            console.log("326", result)
    
            if (result == 0) {
              uiBtnAddSchedule.disabled = false;
              uiBtnEndProject.disabled = true;
            }
            else if (result == 1) {
              // this.uiLblTotalEth = document.getElementById("lbl-total-eth");
              // this.uiLblDisbursedEth = document.getElementById("lbl-disbursed-eth");
              console.log("T:" + this.uiLblTotalEth.innerHTML);
              console.log("D:" + this.uiLblDisbursedEth.innerHTML);
              if (uiLblTotalEth == uiLblDisbursedEth) {
                uiBtnAddSchedule.disabled = true;
                uiBtnEndProject.disabled = false;
              }
              else {
                uiBtnAddSchedule.disabled = true;
                uiBtnEndProject.disabled = true;
              }
            }
            else if (result == 2) {
              uiBtnAddSchedule.disabled = true;
              uiBtnEndProject.disabled = true;
            }
          });
        //  var uiBtnAcceptProject = document.getElementById("btn-Accept-Project");
        //  console.log("btn-----"+uiBtnAcceptProject);
          await decentee.methods.projectState().call().then((result) =>{
            if (result == 0){
             // uiBtnAcceptProject.disabled = false;
            }
            else if (result == 1){
              //uiBtnAcceptProject.disabled = true;  
            }
            else if (result == 2){
              //uiBtnAcceptProject.disabled = true;  
            }
          });
    
        }
      }
      

    // btnAcceptProject async function(){
    //     uiSpnContractAction = document.getElementById("spn-contract-action");
    //     uiSpnContractAction.classList.remove('d-none');
    //     utilToggerAllButtonOnOff(0);
    //     freelancerContract.methods.acceptProject().send({from: account})
    // .on('error', function(error, receipt) { 
    //   App.uiSpnContractAction.classList.add('d-none');
    //   App.utilToggerAllButtonOnOff(1);
    // })
    // .then((result) => {
    //   utilRefreshHeader(this.freelanceContractAddress);
    //   utilRefreshScheduleTableClient();
    //   uiSpnContractAction.classList.add('d-none');
    //   utilToggerAllButtonOnOff(1);
    // });

    return (
        // Note from Joseph
        // Mentee and Mentor page share the div withe the id container-fluid py-2 d-none
        // later on this can be simplified, for now Im just writing out the page.

            
        <>
           

            <div className="p-1 mb-1 bg-dark bg-gradient text-white rounded-3">
                <div className="container-fluid py-3">
                    <h1 class="display-7 fw-bold">Client Smart Contract</h1>
                    <p class="col-md-8 fs-4">This is the client's Distributed App</p>
                    <div className="row">
                        <div className="col-8">
                            <div className="input-group input-group-lg">
                                <input type="text" class="form-control" placeholder="Enter contract address" id="txt-contract-address" onChange={getContractAddress}></input>
                            </div>
                        </div>
                        <div className="col-4">
                            <button class="btn btn-primary btn-lg" onClick={btnGoClient}
                                type="button" id="btn-Deploy"
                                data-bs-toggle="popover" title="Error"
                                data-bs-content="Smart Contract Not Found"
                                data-bs-trigger="manual">
                                Go
                            </button>
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
                            <li className="list-group-item"><span className="fw-bold">Adress:</span><span id="lbl-contract-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Mentors-Wallet:</span><span id="lbl-freelancer-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Mentee's Wallet:</span><span id="lbl-client-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Project State:</span><span id="lbl-project-status"></span></li>
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
                </div>
                <div className="col-3">
                    <div className="card">
                        <div className="card-header fw-bold text-center">Disbursed (ETH)</div>
                        <div className="card-body">
                            <p className="card-text text-center"><span className="fs-1" id="lbl-disbursed-eth"></span></p>
                        </div>
                    </div>
                </div>
                <br />
                <button className="btn btn-primary btn-lg" id="btn-Accept-Project" onclick="App.btnAcceptProject()">Accept Project</button>
                <button className="btn btn-success btn-lg " id="btn-Refresh" onclick="App.btnRefresh('client')" >Refresh</button>
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
        </>

    )
}

export default Mentee
