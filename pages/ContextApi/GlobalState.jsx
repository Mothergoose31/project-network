import React, { useState, createContext, useEffect, useContext } from 'react';
import DecenteeArtifact from '../abis/Decentee.json'


const GlobalContext = createContext()


const GlobalProvider = ({ children, decentee, account }) => {

    const [contractAddresss, setContractAddresss] = useState("");

    const [newDecenteeContract, setnewDecenteeContract] = useState('new');
    const [mentorAddress, setMentorAddress] = useState("M")
    const [projectState, setProjectState] = useState(null)
    const [scheduleModal, setScheduleModal] = useState(null)

    const [shortCode, setShortCode] = useState("")
    const [modalDescription, setModalDescription] = useState("")
    const [ethValue, setEthValue] = useState("")

    const [uiLblTotalEth, setUiLblTotalEth] = useState(null)
    const [uiLblDisbursedEth, setUiLblDisbursedEth] = useState(null)

    const [uiLblClientAddress, setUiLblClientAddress] = useState(null)

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
    if (contractAddresss == "") {
      deployFreelancer();

    }
    else {
      retrieveFreelancer(contractAddresss);
    }
  }


  //==============================================================================================================================

  const utilProjectStatus = function (statusCode) {
    //initiated, accepted, closed
    //console.log(statusCode);
    var uiLblProjectState = document.getElementById("lbl-project-status");
    switch (statusCode) {
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

  //==============================================================================================================================

  const utilRefreshScheduleTable = async (contractAddress) => {
    console.log("freelancer table refresh");
    var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);
    var uiTblScheduleTable = document.getElementById("tbl-schedule-table");
    uiTblScheduleTable.classList.remove('d-none');

    while (uiTblScheduleTable.rows[1]) {
      uiTblScheduleTable.deleteRow(1);
    }

    let totalRow;

    await freelancerContract.methods.totalSchedules().call().then((result) => {
      console.log("183 ", result)
      totalRow = result;
    });

    for (let i = 0; i <= totalRow - 1; i++) {
      await freelancerContract.methods.scheduleRegister(i).call().then((result) => {
        utilAddScheduleToTable(result["shortCode"], result["description"], result["value"], result["scheduleState"], "mentor", i);
      });
    }

    //update the ETH Value boxes
    await utilGetEthValue(contractAddresss);
    utilToggerActionBtns("mentor");
  }

  //==============================================================================================================================
  //hooks for diplaying  contract adress, instructor adress, client wallet, and the state of the project. 
  // Clients Wallet remains Blank until you get a client 


  const utilRefreshHeader = async (contractAddress) => {
    const web3 = window.web3;
    var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddress);
    var uiConContract = document.getElementById("con-contract");

    uiConContract.classList.remove('d-none');
    setContractAddresss(contractAddress);
    console.log("207", freelancerContract.methods)


    // this.uiLblClientAddress = document.getElementById("lbl-client-address");

    uiConContract.classList.remove('d-none');

    setContractAddresss(contractAddress);

    //console.log("207",freelancerContract.methods)

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

  //==============================================================================================================================

    const retrieveFreelancer = (contractAddress, who = "mentor") => {

    try {
      utilRefreshHeader(contractAddress);
      if (who === "mentor") {
        utilRefreshScheduleTable(contractAddress);
      }
      else {
        //this.utilRefreshScheduleTableClient();
      }
      //this.uiBtnDeployPopover.hide();
    } catch (error) {
      console.log(error)
      //this.uiBtnDeployPopover.show();
    }
  }

  //==============================================================================================================================

  const deployFreelancer = function () {
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
    }, (error, transactionHash) => { })
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

        var newDecenteeContract = new web3.eth.Contract(DecenteeArtifact.abi, decenteeContractAddress);
        setnewDecenteeContract(new web3.eth.Contract(DecenteeArtifact.abi, decenteeContractAddress))

        //console.log( newDecenteeContract)

        newDecenteeContract.methods.decenteeAddress().call().then((result) => {
          setMentorAddress(result)
          //  console.log(result)
          uiLblFreelancerAddress = result;
        });

        newDecenteeContract.methods.projectState().call().then((result) => {
          utilProjectStatus(0);
        });

        //update the ETH Value boxes
        utilGetEthValue(decenteeContractAddress);
        // utilToggerActionBtns("mentor");
      })

  }

  //==============================================================================================================================
  // not sure if this function should be here
  // might have to be moved to the  Global-functions page
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
  
  //==============================================================================================================================
  
  const btnEndProject = async () => {
    var uiSpnContractAction = document.getElementById("spn-contract-action");
    uiSpnContractAction.classList.remove('d-none');
    //utilToggerAllButtonOnOff(0);
    decentee.methods.endProject().send({ from: account })
      .on('error', function (error, receipt) {
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

  //=============================================================================================================================


  const btnRefresh = async (who) => {
    console.log("---" + contractAddresss);
    if (contractAddresss == null)
      getContractAddress()
    // this.freelanceContractAddress = document.getElementById("txt-contract-address").value;

    await utilRefreshHeader(contractAddresss);

    if (who == "mentor") {
      await utilRefreshScheduleTable();
    }
    else {
      //await this.utilRefreshScheduleTableClient();
    }
  }

  //==============================================================================================================================

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


  //==============================================================================================================================

  const btnAddSchedule = async () => {
    const web3 = window.web3;
   
    var freelancerContract = new web3.eth.Contract(DecenteeArtifact.abi, contractAddresss);
    if (document.getElementById("Schedule-Form").checkValidity()) {
      // var uiTxtShortCode = document.getElementById("txt-short-code").value;

      // var uiTxtScheduleDescription = document.getElementById("txt-schedule-description").value;

      // var uiTxtScheduleValue = document.getElementById("txt-schedule-value")

      //var freelancerContract = decentee;

      var uiSpnAddSchedule = document.getElementById("spn-add-schedule");
      uiSpnAddSchedule.classList.remove('d-none');
      // this.utilToggerAllButtonOnOff(0);
      //console.log(freelancerContract.methods)

      freelancerContract.methods.addSchedule(shortCode, modalDescription, web3.utils.toWei(ethValue, 'ether')).send({ from: account })
        .on('error', function (error, receipt) {

          console.log("test ", error);

          uiSpnAddSchedule.classList.add('d-none');

          // var scheduleModal = Modal.getInstance(document.getElementById('scheduleModal'));
          //     scheduleModal.hide();
          // utilToggerAllButtonOnOff(1);
        })
        .then((result) => {
          console.log("try to do this");
          var uiTblScheduleTable = document.getElementById("tbl-schedule-table");
          uiTblScheduleTable.classList.remove('d-none');
          uiSpnAddSchedule.classList.add('d-none');
          // var scheduleModal = Modal.getInstance(document.getElementById('scheduleModal'));

          utilAddScheduleToTable(shortCode, modalDescription, web3.utils.toWei(ethValue, 'ether'), 0);
          utilGetEthValue(contractAddresss);
          //  scheduleModal.hide();
          // this.utilToggerAllButtonOnOff(1);
        });

    }
    else {
      console.log("nope");
    }
  }



//==============================================================================================================================


    return (
        <GlobalContext.Provider value={{ 
            contractAddresss, mentorAddress, uiLblTotalEth, uiLblDisbursedEth, 
            retrieveFreelancer, projectState, btnEndProject, btnRefresh, btnAddSchedule, getContractAddress,
            onShortcode, onDescription, onValue, deployFreelancer, btnGo
            
            }}>

            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalProvider, GlobalContext }