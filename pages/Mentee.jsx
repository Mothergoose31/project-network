import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from './ContextApi/GlobalState'
import DecenteeArtifact from './abis/Decentee.json'



function Mentee({ decentee, account}) {

    
    const [contractAddress, setContractAddress] = useState("");
    const [uiLblClientAddress, setUiLblClientAddress] = useState(null)
    const [mentorAddress, setMentorAddress] = useState("")
    const [projectState, setProjectState] = useState(null)


    const [ethValue, setEthValue] = useState("")

    const [uiLblTotalEth, setUiLblTotalEth] = useState(null)
    const [uiLblDisbursedEth, setUiLblDisbursedEth] = useState(null)




    var decenteeContractStatus = null





//=============================================================================================================================================================================================

    const getContractAddress = (e) => {

        var length = e.target.value.trim().length

        //length == 42 ? setContractAddress(e.target.value.trim()) : console.log("need to be 42")
        
        setContractAddress(e.target.value.trim())
    
      }




//=============================================================================================================================================================================================

      const btnGoClient = () => {
       
        //this.uiBtnDeployPopover.hide();

        
        
        if (contractAddress.length === 42){
            console.log("hello")
          //this.uiBtnDeployPopover.show();
          var freelanceContractAddress = contractAddress;
          var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, freelanceContractAddress);
          retrieveFreelancer(contractAddress, "client");
          
        }
        else{
            alert("smart contract noy found!")
        }
      }



//=============================================================================================================================================================================================
      
     const retrieveFreelancer = (contractAddress, who = "client") => {



        try {
                utilRefreshHeader(contractAddress);
            if (who === "freelancer"){
              utilRefreshScheduleTable();
            }
            else{
              utilRefreshScheduleTableClient();
            }
           // this.uiBtnDeployPopover.hide();
        } catch (error) {
         // this.uiBtnDeployPopover.show();
        }

        // try {
          
        //   utilRefreshScheduleTableClient();
       
        //   //this.uiBtnDeployPopover.hide();
        // } catch (error) {
        //   console.log(error)
        //   //this.uiBtnDeployPopover.show();
        // }
      }





//=============================================================================================================================================================================================

      const utilRefreshScheduleTableClient = async  () => {

        var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);

        utilToggerActionBtns("client");
        console.log("Client table refresh");
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
    
        await utilGetEthValue(contractAddress);
        utilToggerActionBtns("client");
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



    const utilGetEthValue = async (contractAddress) => {
    var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);
    let totalRow;
    let totalDisbursed = 0;
    let totalValue = 0;

    await freelancerContract.methods.totalSchedules().call().then((result) => {

      console.log("eth value", result)

      totalRow = result;
    });

    for (let i = 0; i <= totalRow - 1; i++) {
      await freelancerContract.methods.scheduleRegister(i).call().then((result) => {
        totalValue += result["value"] / 1000000000000000000;
        if (result["scheduleState"] == 4) {
          totalDisbursed += result["value"] / 1000000000000000000;
        }
      });
    }

    setUiLblTotalEth(Math.round(totalValue * 100) / 100);
    setUiLblDisbursedEth(Math.round(totalDisbursed * 100) / 100);
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
          td.innerHTML = '<button type="button" onClick="App.btnFundSchedule(' + value / 1000000000000000000 + ',' + scheduleID + ')" class="btn btn-primary btn-sm">Fund</button>';
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
        var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);
        if (who == "mentor") {
          var uiBtnAddSchedule = document.getElementById("btn-Add-Schedule");
          var uiBtnEndProject = document.getElementById("btn-End-Project");
    
          await freelancerContract.methods.projectState().call().then((result) => {
    
           
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
        } else {
            var uiBtnAcceptProject = document.getElementById("btn-Accept-Project");
          console.log("btn-----", decentee.methods);
          await freelancerContract.methods.projectState().call().then((result) =>{
              console.log("pg state", result)
            if (result == 0){
              uiBtnAcceptProject.disabled = false;
            }
            else if (result == 1){
              uiBtnAcceptProject.disabled = true;  
            }
            else if (result == 2){
              uiBtnAcceptProject.disabled = true;  
            }
          });
    
        }
      }




//=============================================================================================================================================================================================

  const utilProjectStatus = function (statusCode) {
    //initiated, accepted, closed
    //console.log(statusCode);
    var uiLblProjectState = document.getElementById("lbl-project-status");
    switch (statusCode) {
      case 0:
        //uiLblProjectState.classList.add('bg-primary');
        setProjectState("Initiated");
        break;
      case 1:
       // uiLblProjectState.classList.add('bg-success');
        setProjectState("Accepted");
        break;
      case 2:
        //uiLblProjectState.classList.add('bg-warning');
        setProjectState("Closed");
        break;
    }
  }


//=============================================================================================================================================================================================



    const utilRefreshHeader = async (contractAddress) => {
    const web3 = window.web3;
    var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);
    var uiConContract = document.getElementById("con-contract");

    uiConContract.classList.remove('d-none');
    //setContractAddress(contractAddress);
    console.log("207", freelancerContract.methods)


    //var uiLblClientAddress = document.getElementById("lbl-client-address");

    uiConContract.classList.remove('d-none');

    setContractAddress(contractAddress);

    console.log("258",freelancerContract.methods)

    await freelancerContract.methods.decenteeAddress().call().then((result) => {
      console.log(result)
      setMentorAddress(result);
    });


    // await freelancerContract.methods.clientAddress().call().then((result) =>{
    //   setuiLblClientAddress(result);
    // });


    await freelancerContract.methods.projectState().call().then((result) => {
      decenteeContractStatus = result;
      utilProjectStatus(parseInt(result));
    });
}





//=============================================================================================================================================================================================

    const btnAcceptProject = async () => {
    var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);
    var uiSpnContractAction = document.getElementById("spn-contract-action");
        uiSpnContractAction.classList.remove('d-none');
       // utilToggerAllButtonOnOff(0);
       console.log(freelancerContract.methods)
        freelancerContract.methods.acceptProject().send({from: account})
    .on('error', function(error, receipt) { 
      uiSpnContractAction.classList.add('d-none');
     // utilToggerAllButtonOnOff(1);
    })
    .then((result) => {
        console.log("test")
      utilRefreshHeader(contractAddress);
      utilRefreshScheduleTableClient();
      uiSpnContractAction.classList.add('d-none');
     // utilToggerAllButtonOnOff(1);
    });
}




//=============================================================================================================================================================================================

const btnFundSchedule = async function(value, scheduleID){
    let scheduleAction = document.getElementById("spn-schedule-action-"+scheduleID);
    scheduleAction.classList.remove('d-none');
    //utilToggerAllButtonOnOff(0);
    await decentee.methods.fundTask(scheduleID).send({from: this.account, "value": App.web3.utils.toWei(value.toString(), 'ether')})
    .on('error', function(error, receipt) { 
      console.log("cancelled funding");
      scheduleAction.classList.add('d-none');
     // utilToggerAllButtonOnOff(1);
    })
    .then((result) => {
      btnRefresh("client"); //reconsider
      scheduleAction.classList.add('d-none');
      utilToggerAllButtonOnOff(1);
    });
  }



//=============================================================================================================================================================================================


  
  const btnRefresh = async (who) => {
    console.log("---" + contractAddress);
    if (contractAddress == null)
      getContractAddress()
    // this.freelanceContractAddress = document.getElementById("txt-contract-address").value;

    await utilRefreshHeader(contractAddress);

    if (who == "mentor") {
      await utilRefreshScheduleTable();
    }
    else {
      await utilRefreshScheduleTableClient();
    }
  }




//=============================================================================================================================================================================================
    return (
        // Note from Joseph
        // Mentee and Mentor page share the div withe the id container-fluid py-2 d-none
        // later on this can be simplified, for now Im just writing out the page.

            
        <>
           

            <div className="p-1 mb-1 bg-dark bg-gradient text-white rounded-3">
                <div className="container-fluid py-3">
                    <h1 className="display-7 fw-bold">Client Smart Contract</h1>
                    <p className="col-md-8 fs-4">This is the client's Distributed App</p>
                    <div className="row">
                        <div className="col-8">
                            <div className="input-group input-group-lg">
                                <input type="text" className="form-control" placeholder="Enter contract address" id="txt-contract-address" onChange={getContractAddress}></input>
                            </div>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary btn-lg" onClick={btnGoClient}
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
                            <li className="list-group-item"><span className="fw-bold">Adress:</span>{contractAddress}<span id="lbl-contract-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Mentors-Wallet:</span>{mentorAddress}<span id="lbl-freelancer-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Mentee's Wallet:</span><span id="lbl-client-address"></span></li>
                            <li className="list-group-item"><span className="fw-bold">Project State:</span>{projectState}<span id="lbl-project-status"></span></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header fw-bold text-center">Total Value (ETH)</div>
                            <div className="card-body">
                                <p className="card-text text-center"><span className="fs-1" id="lbl-total-eth">{uiLblTotalEth}</span></p>
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
                <button className="btn btn-primary btn-lg" id="btn-Accept-Project" onClick={btnAcceptProject}>Accept Project</button>
                <button className="btn btn-success btn-lg " id="btn-Refresh" onClick={btnRefresh} >Refresh</button>
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
        </>

    )
}

export default Mentee
