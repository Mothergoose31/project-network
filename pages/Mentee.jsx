import React from 'react'

import {utilToggerAllButtonOnOff} from "./components/Global-Functions.js"

function Mentee() {

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
        <body>
            <div className="p-1 mb-1 bg-dark bg-gradient text-white rounded-3">
                <div ClassName="container-fluid py-3">
                    <h1 class="display-7 fw-bold">Client Smart Contract</h1>
                    <p class="col-md-8 fs-4">This is the client's Distributed App</p>
                    <div className="row">
                        <div className="col-8">
                            <div className="input-group input-group-lg">
                                <input type="text" class="form-control" placeholder="Enter contract address" id="txt-contract-address"></input>
                            </div>
                        </div>
                        <div className="col-4">
                        <button class="btn btn-primary btn-lg" onclick="App.btnGoClient()" 
                            type="button" id="btn-Deploy"
                            data-bs-toggle="popover" title="Error" 
                            data-bs-content="Smart Contract Not Found"
                            data-bs-trigger="manual">
                                Go
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Mentee
