import React from 'react'


import { utilToggerAllButtonOnOff } from "./components/Global-Functions.js"

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
        // Note from Joseph
        // Mentee and Mentor page share the div withe the id container-fluid py-2 d-none
        // later on this can be simplified, for now Im just writing out the page.

        <body>
            <div className="p-1 mb-1 bg-dark bg-gradient text-white rounded-3">
                <div className="container-fluid py-3">
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
        </body>
    )
}

export default Mentee
