import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Web3 from 'web3';
import Decentee from './abis/Decentee.json'
import Navbar from './components/Navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

const Home = () => {

  const [account, setAccount ] = useState('');
  const [decentee, setDecentee ] = useState(null);
  const [loading, setLoading ] = useState(true);

//==============================================================================================================================

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


//==============================================================================================================================


  return (
    
    <div className={styles.container}>

      <Navbar account={account} />

      {loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          :<>
          <Head>
            <title>Create Next App</title>
          </Head>
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Decentee!</a>
            </h1>

      

            <div className={styles.grid}>
              <Link href="/Mentor"><a className={styles.card}>Mentor
                <h2>Mentor &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
                </a>
              </Link>

              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Mentee &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>
            </div>
            
          </main>

          </>
          }



 
    </div>
  )
}


export default Home