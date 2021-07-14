

export const test = async () => {
   alert("yeet")
  }




  export const retrieveFreelancer = (contractAddress, who = "mentor") => {

   try {
     utilRefreshHeader(contractAddress);
     if (who === "mentor") {
       utilRefreshScheduleTable(contractAddress);
     }
     else {
       utilRefreshScheduleTableClient();
     }
     //this.uiBtnDeployPopover.hide();
   } catch (error) {
     console.log(error)
     //this.uiBtnDeployPopover.show();
   }
 }
  


 export const utilRefreshHeader = async (contractAddress) => {
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
