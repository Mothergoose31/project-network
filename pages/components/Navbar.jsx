import Identicon from 'identicon.js';
import Image from 'next/image'
import Link from 'next/link';


const Navbar = ({ account }) => {

  
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link href="/">
          <svg width="195" height="74.77363865822332" viewBox="0 0 195 94.77363865822332" className="css-1j8o68f">
            <defs id="SvgjsDefs1855">
                <linearGradient id="SvgjsLinearGradient1860">
                    <stop id="SvgjsStop1861" stopColor="#8f5e25" offset="0"></stop>
                    <stop id="SvgjsStop1862" stopColor="#fbf4a1" offset="0.5"></stop>
                    <stop id="SvgjsStop1863" stopColor="#8f5e25" offset="1"></stop>
                </linearGradient>
                <linearGradient id="SvgjsLinearGradient1864">
                    <stop id="SvgjsStop1865" stopColor="#8f5e25" offset="0"></stop>
                    <stop id="SvgjsStop1866" stopColor="#fbf4a1" offset="0.5"></stop>
                    <stop id="SvgjsStop1867" stopColor="#8f5e25" offset="1"></stop>
                </linearGradient>
            </defs>
            <g id="SvgjsG1856" featurekey="v37d4h-0" transform="matrix(0.6117450265846228,0,0,0.6117450265846228,22.235267202061802,16.923353232906685)" fill="url(#SvgjsLinearGradient1860)"><path xmlns="http://www.w3.org/2000/svg" d="M 70.001021,60.908126 C 68.622608,58.188108 67.145285,55.569902 65.575601,53.061639 58.094083,64.673965 45.56836,75.064135 29.698243,81.525375 l 5.309266,13.040633 C 51.421671,87.88435 63.626862,75.463114 70.001021,60.908126 Z" stroke="none" fill="url(#SvgjsLinearGradient1860)" fillOpacity="1"></path><path xmlns="http://www.w3.org/2000/svg" d="m 37.525865,76.809637 c 2.171217,-1.206804 4.270728,-2.478348 6.294108,-3.809591 C 29.857827,66.307862 16.936783,52.331384 9.3857867,33.784604 L -3.6539196,39.093492 C 4.151638,58.27083 19.793082,71.718464 37.525865,76.809637 Z"  stroke="none" fill="url(#SvgjsLinearGradient1860)" fillOpacity="1"></path><path xmlns="http://www.w3.org/2000/svg" d="M 58.448894,18.069925 53.13963,5.029296 c -18.678298,7.604542 -31.913477,22.643386 -37.293764,39.803947 1.305283,2.150557 2.682822,4.213393 4.114126,6.201433 6.947823,-13.397889 20.595079,-25.679595 38.488902,-32.964751 z" stroke="none" fill="url(#SvgjsLinearGradient1860)" fillOpacity="1"></path><path xmlns="http://www.w3.org/2000/svg" d="M 86.252811,60.179111 C 79.002346,42.370497 64.998815,29.506309 48.838299,23.681081 c -2.333081,1.368798 -4.578063,2.810777 -6.728291,4.32107 12.665286,7.216938 24.154499,20.421334 31.10217,37.486225 l 13.040633,-5.309265 z"  stroke="none" fill="url(#SvgjsLinearGradient1860)" fillOpacity="1"></path><circle xmlns="http://www.w3.org/2000/svg" cx="43.209587" cy="51.021019" r="8.1112623" fill="url(#SvgjsLinearGradient1860)" fillOpacity="1" fillRule="nonzero" stroke="none"></circle></g><g id="SvgjsG1857" featurekey="UxBHKT-0" transform="matrix(1.2434718015029205,0,0,1.2434718015029205,93.25913995224276,31.68838507192521)" fill="url(#SvgjsLinearGradient1864)"><path d="M17.79 10.04 q1.13 1.24 1.13 3.46 l0 6.5 l-3.02 0 l0 -6.5 q0 -1.18 -0.59 -1.7 t-1.55 -0.52 q-0.8 0 -1.44 0.6 t-0.66 2 l0 6.12 l-3.02 0 l0 -6.5 q0 -1.18 -0.59 -1.7 t-1.53 -0.52 q-0.86 0 -1.49 0.64 t-0.63 2.26 l-0.02 5.82 l-2.98 0 l0 -11 l2.98 0 l0 1 q0.58 -0.52 1.4 -0.86 t1.5 -0.34 q2.32 0 3.54 1.5 q0.62 -0.7 1.54 -1.1 t2 -0.4 q2.3 0 3.43 1.24 z M24.830000000000002 19.74 q-1.37 -0.54 -2.35 -1.83 t-0.98 -3.37 t0.99 -3.36 t2.37 -1.82 t2.62 -0.54 q1.44 0 2.74 0.64 t2.13 1.88 t0.87 2.94 q0 0.52 -0.02 0.9 t-0.04 0.48 l-8.68 0 q0.24 1.16 1.2 1.58 t1.8 0.42 q1.08 0 1.72 -0.39 t1.1 -0.89 l2.32 1.34 q-1.88 2.56 -5.14 2.56 q-1.28 0 -2.65 -0.54 z M25.44 12.05 q-0.78 0.61 -0.88 1.49 l5.5 0 q-0.06 -0.52 -0.4 -1 t-0.91 -0.79 t-1.29 -0.31 q-1.24 0 -2.02 0.61 z M44.85000000000001 10.02 q1.03 1.22 1.03 3.48 l0 6.5 l-3.06 0 l0 -6.5 q0 -2.22 -2.12 -2.22 q-0.82 0 -1.48 0.65 t-0.62 2.25 l0 5.82 l-2.98 0 l0 -11 l2.98 0 l0 0.98 q0.54 -0.54 1.36 -0.86 t1.58 -0.32 q2.28 0 3.31 1.22 z M52.5 16.08 q0 0.7 0.24 1.17 t1.12 0.47 q0.4 0 0.76 -0.04 l0 2.52 q-0.72 0.08 -1.34 0.08 q-1.28 0 -2.07 -0.21 t-1.23 -0.81 t-0.44 -1.72 l0 -6.1 l-1.34 0 l0 -2.62 l1.34 0 l0 -2.94 l2.96 0 l0 2.94 l2.2 0 l0 2.62 l-2.2 0 l0 4.64 z M59.81 19.74 q-1.37 -0.54 -2.35 -1.83 t-0.98 -3.37 t0.99 -3.36 t2.37 -1.82 t2.62 -0.54 q1.44 0 2.74 0.64 t2.13 1.88 t0.87 2.94 q0 0.52 -0.02 0.9 t-0.04 0.48 l-8.68 0 q0.24 1.16 1.2 1.58 t1.8 0.42 q1.08 0 1.72 -0.39 t1.1 -0.89 l2.32 1.34 q-1.88 2.56 -5.14 2.56 q-1.28 0 -2.65 -0.54 z M60.42 12.05 q-0.78 0.61 -0.88 1.49 l5.5 0 q-0.06 -0.52 -0.4 -1 t-0.91 -0.79 t-1.29 -0.31 q-1.24 0 -2.02 0.61 z M73.43 19.74 q-1.37 -0.54 -2.35 -1.83 t-0.98 -3.37 t0.99 -3.36 t2.37 -1.82 t2.62 -0.54 q1.44 0 2.74 0.64 t2.13 1.88 t0.87 2.94 q0 0.52 -0.02 0.9 t-0.04 0.48 l-8.68 0 q0.24 1.16 1.2 1.58 t1.8 0.42 q1.08 0 1.72 -0.39 t1.1 -0.89 l2.32 1.34 q-1.88 2.56 -5.14 2.56 q-1.28 0 -2.65 -0.54 z M74.04 12.05 q-0.78 0.61 -0.88 1.49 l5.5 0 q-0.06 -0.52 -0.4 -1 t-0.91 -0.79 t-1.29 -0.31 q-1.24 0 -2.02 0.61 z"></path></g>
        </svg>
        </Link>
        <ul className="navbar-nav px-3">
          <li >
            <small className="text-secondary">
              <small id="account">{account}</small>
            </small>
            {account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                alt="pic"
                src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  
}

export default Navbar;
