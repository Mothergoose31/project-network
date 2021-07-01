import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Web3 from "web3";
import Decentee from "./abis/Decentee.json";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import SplashPage from "./components/SplashPage";

import MentorImage from "../images/Mentee.png";

const Home = ({ account, decentee, loading }) => {
  return (
    <div className={styles.container}>
      {loading ? (
        <SplashPage />
      ) : (
        <>
          <Head>
            <title>Create Next App</title>
          </Head>
          <main className={styles.main}>
            <div className={styles.Image}>
              <a href="https://nextjs.org">
                <svg
                  width="275.41368078175896"
                  height="93.43552299085779"
                  viewBox="0 0 275.41368078175896 93.43552299085779"
                  className="css-1j8o68f"
                >
                  <defs id="SvgjsDefs2126">
                    <linearGradient id="SvgjsLinearGradient2129">
                      <stop
                        id="SvgjsStop2130"
                        stop-color="#8f5e25"
                        offset="0"
                      ></stop>
                      <stop
                        id="SvgjsStop2131"
                        stop-color="#fbf4a1"
                        offset="0.5"
                      ></stop>
                      <stop
                        id="SvgjsStop2132"
                        stop-color="#8f5e25"
                        offset="1"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="SvgjsG2127"
                    featurekey="1RRcwp-0"
                    transform="matrix(4.386965906448481,0,0,4.386965906448481,-7.019146077878076,4.731075374759939)"
                    fill="url(#SvgjsLinearGradient2129)"
                  >
                    <path d="M14.34 20 l-2.66 0 l0 -9.52 l-3.72 5.08 l-3.7 -5.08 l0 9.52 l-2.66 0 l0 -14.24 l2.5 0 l3.86 5.3 l3.86 -5.3 l2.52 0 l0 14.24 z M21.28 20.22 l-0.02 0 c-0.58 0 -1.18 -0.14 -1.74 -0.4 c-0.52 -0.22 -1 -0.58 -1.44 -1.04 c-0.7 -0.76 -1.12 -1.76 -1.22 -2.8 c-0.02 -0.18 -0.04 -0.36 -0.04 -0.56 c0 -0.4 0.06 -0.82 0.16 -1.24 c0.18 -0.8 0.56 -1.54 1.1 -2.1 c0.4 -0.44 0.86 -0.78 1.44 -1.06 c0.54 -0.26 1.14 -0.38 1.76 -0.38 c0.64 0 1.22 0.12 1.76 0.38 c0.6 0.28 1.08 0.64 1.44 1.06 c0.52 0.56 0.92 1.28 1.12 2.1 c0.1 0.38 0.14 0.78 0.14 1.24 l0 0.46 l-6.72 0 l0.02 0.14 c0.26 1.24 1.2 2.14 2.24 2.14 l0.02 0 c0.58 -0.04 1.22 -0.4 1.6 -0.72 l0.22 -0.18 l1.66 1.44 l-0.3 0.26 c-0.22 0.2 -0.5 0.44 -0.8 0.6 l-0.02 0 c-0.72 0.42 -1.5 0.64 -2.38 0.66 z M21.28 12.719999999999999 c-0.78 0 -1.56 0.54 -1.98 1.38 l-0.08 0.16 l4.14 0 l-0.08 -0.16 c-0.46 -0.86 -1.22 -1.38 -2 -1.38 z M36.26 20 l-2.52 0 l0 -4.9 c0 -1.08 -0.86 -1.92 -1.94 -1.92 c-1.04 0 -1.94 0.86 -1.94 1.92 l0 4.9 l-2.5 0 l0 -9.16 l2.5 0 l0 0.66 c0.62 -0.62 1.28 -0.84 1.94 -0.84 c1.2 0 2.32 0.46 3.16 1.28 c0.84 0.86 1.3 1.98 1.3 3.16 l0 4.9 z M44.519999999999996 20 l-2.4 0 c-0.88 0 -1.7 -0.34 -2.3 -0.94 c-0.62 -0.62 -0.94 -1.42 -0.94 -2.3 l0 -3.8 l-1.28 0 l0 -2.06 l1.28 0 l0 -3.6 l2.38 0 l0 3.6 l2.66 0 l0 2.06 l-2.66 0 l0 3.76 c0 0.5 0.44 0.96 0.88 0.96 l1.74 0 z M49.74 20.22 l-0.02 0 c-0.58 0 -1.18 -0.14 -1.74 -0.4 c-0.52 -0.22 -1 -0.58 -1.44 -1.04 c-0.7 -0.76 -1.12 -1.76 -1.22 -2.8 c-0.02 -0.18 -0.04 -0.36 -0.04 -0.56 c0 -0.4 0.06 -0.82 0.16 -1.24 c0.18 -0.8 0.56 -1.54 1.1 -2.1 c0.4 -0.44 0.86 -0.78 1.44 -1.06 c0.54 -0.26 1.14 -0.38 1.76 -0.38 c0.64 0 1.22 0.12 1.76 0.38 c0.6 0.28 1.08 0.64 1.44 1.06 c0.52 0.56 0.92 1.28 1.12 2.1 c0.1 0.38 0.14 0.78 0.14 1.24 l0 0.46 l-6.72 0 l0.02 0.14 c0.26 1.24 1.2 2.14 2.24 2.14 l0.02 0 c0.58 -0.04 1.22 -0.4 1.6 -0.72 l0.22 -0.18 l1.66 1.44 l-0.3 0.26 c-0.22 0.2 -0.5 0.44 -0.8 0.6 l-0.02 0 c-0.72 0.42 -1.5 0.64 -2.38 0.66 z M49.74 12.719999999999999 c-0.78 0 -1.56 0.54 -1.98 1.38 l-0.08 0.16 l4.14 0 l-0.08 -0.16 c-0.46 -0.86 -1.22 -1.38 -2 -1.38 z M59.92 20.22 l-0.02 0 c-0.58 0 -1.18 -0.14 -1.74 -0.4 c-0.52 -0.22 -1 -0.58 -1.44 -1.04 c-0.7 -0.76 -1.12 -1.76 -1.22 -2.8 c-0.02 -0.18 -0.04 -0.36 -0.04 -0.56 c0 -0.4 0.06 -0.82 0.16 -1.24 c0.18 -0.8 0.56 -1.54 1.1 -2.1 c0.4 -0.44 0.86 -0.78 1.44 -1.06 c0.54 -0.26 1.14 -0.38 1.76 -0.38 c0.64 0 1.22 0.12 1.76 0.38 c0.6 0.28 1.08 0.64 1.44 1.06 c0.52 0.56 0.92 1.28 1.12 2.1 c0.1 0.38 0.14 0.78 0.14 1.24 l0 0.46 l-6.72 0 l0.02 0.14 c0.26 1.24 1.2 2.14 2.24 2.14 l0.02 0 c0.58 -0.04 1.22 -0.4 1.6 -0.72 l0.22 -0.18 l1.66 1.44 l-0.3 0.26 c-0.22 0.2 -0.5 0.44 -0.8 0.6 l-0.02 0 c-0.72 0.42 -1.5 0.64 -2.38 0.66 z M59.92 12.719999999999999 c-0.78 0 -1.56 0.54 -1.98 1.38 l-0.08 0.16 l4.14 0 l-0.08 -0.16 c-0.46 -0.86 -1.22 -1.38 -2 -1.38 z"></path>
                  </g>
                </svg>
              </a>
            </div>
            <div className={styles.description}>
              A Decentralized Hub for Mentors and Mentees To Connect and learn
            </div>

            <div className={styles.grid}>
              <Link href="/Mentor">
                <a className={styles.card}>
                  Mentor
                  <h2>Mentor &rarr;</h2>
                  <p>
                    Find in-depth information about Next.js features and API.
                  </p>
                </a>
              </Link>
              <Link href="/Mentee">
                <a className={styles.card}>
                  <h2>Mentee &rarr;</h2>
                  <p>
                    Learn about Next.js in an interactive course with quizzes!
                  </p>
                </a>
              </Link>
            </div>
          </main>
          <footer className={styles.footer}>
            <div className={styles.footerCopyright}>
              © 2021 Developed by Fuad Abdella, Joseph Alvarenga Beech & Ridwan
              Grimes.
              <br></br>
              Licensed & open-source under the MIT License
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Home;
