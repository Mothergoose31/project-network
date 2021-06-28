import React, { useState, useEffect } from 'react';
import '../styles/globals.css'
import Head from "next/head";
import Web3 from 'web3';
import Decentee from './abis/Decentee.json'
import Navbar from './components/Navbar'
import styles from ".././styles/Navbar.module.css"
import { GlobalProvider } from './ContextApi/GlobalState'

// @dev 
//about the _app.js page
// Next uses an implicit App component as
// a wrapper over each page view that is used to initialize pages. 
// By creating your own file in the root pages directory called _app.js, you can
// override the default App functionality and add your own,  By controlling your 
// own _app wrapper,you can Keep state when navigating pages, set up global styling, custom site-wide layouts like  navbarstyling 

function MyApp({ Component, pageProps }) {


  const [account, setAccount] = useState('');
  const [decentee, setDecentee] = useState(null);
  const [loading, setLoading] = useState(true);




  useEffect(() => {

    loadWeb3();
    loadBlockchainData();

  }, [])

  //==============================================================================================================================
  const loadWeb3 = async () => {

    if (window.ethereum) {
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
    if (networkData) {

      const decentee = new web3.eth.Contract(Decentee.abi, networkData.address)
      setDecentee(decentee)



      setLoading(false)

    } else {
      window.alert('Decentragam contract not deployed to dectectd network')
    }

  }


  return (
    // Global Provider is a wrapper that gives global state to every page and component inside the next js app from ContextApi.jsx
    <GlobalProvider>

      <Navbar account={account} className={styles.navbar} />
      <br />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"></script>
      </Head>
      <Component {...pageProps}
        decentee={decentee}
        account={account}
        loading={loading}
      />

    </GlobalProvider>
  )


}

export default MyApp
