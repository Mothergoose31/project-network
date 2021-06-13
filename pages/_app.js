import React, { useState, useEffect } from 'react';
import '../styles/globals.css'
import Head from "next/head";
import Web3 from 'web3';
import Decentee from './abis/Decentee.json'

function MyApp({ Component, pageProps }) {


  const [account, setAccount ] = useState('');
  const [decentee, setDecentee ] = useState(null);
  const [loading, setLoading ] = useState(true);




  useEffect(() => {
      
    loadWeb3();
    loadBlockchainData(); 
  
    },[] )
  
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


  return (
    <>
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
    </>
  )


}

export default MyApp
