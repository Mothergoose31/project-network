import Identicon from 'identicon.js';
import Image from 'next/image'
import Link from 'next/link';

const Navbar = ({ account }) => {

  
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <Link href="/">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" rel="noopener noreferrer">
            <Image src="/photo.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
            Decentee-Mentee
          </a>
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
