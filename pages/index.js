import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Web3 from 'web3';
import Decentee from './abis/Decentee.json'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import SplashPage from './components/SplashPage'


const Home = ({ account, decentee, loading }) => {
  return (
    <div className={styles.container}>
 
    {loading ? <SplashPage/>
        :<>
          <Head>
            <title>Create Next App</title>
          </Head>
          <main className={styles.main}>
            <h1 className={styles.title}>
              Welcome to <a href="https://nextjs.org">Decentee!</a>
            </h1>
            <div className={styles.grid}>
            <Link href="/Mentor">
              <a className={styles.card}>
                Mentor
                <h2>Mentor &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>
            <Link href="/Mentee">
                <a className={styles.card}>
                <h2>Mentee &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
            </Link>
          </div>
          
        </main>
        </>
          }
    </div>
  )
}


export default Home