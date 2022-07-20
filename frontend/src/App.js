import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from "ethers";
import { UserContext } from './UserContext';
import { WavesContext } from './WavesContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import abi from "./utils/WavePortal.json";
const WAVE_PORTAL_ADDRESS = '0x470cA8952372fBcdccdbE32618bFf890d1AA5fCB';


const initialWaves = [
  {
      id: 0,
      content: 'hello',
      fromAddress: 'greg',
      timestamp: 'December 9 at 11:43 AM',
      transaction: 'https://etherscan.io/'
  },
  {
      id: 1,
      content: 'test 2',
      fromAddress: 'megan',
      timestamp: 'December 9 at 11:43 AM',
      transaction: 'https://etherscan.io/'
  },
  {
      id: 2,
      content: 'test 2',
      fromAddress: 'megan',
      timestamp: 'December 9 at 11:43 AM',
      transaction: 'https://etherscan.io/'
  },
  {
      id: 3,
      content: 'test 2',
      fromAddress: 'megan',
      timestamp: 'December 9 at 11:43 AM',
      transaction: 'https://etherscan.io/'
  },
  {
      id: 4,
      content: 'test 2',
      fromAddress: 'megan',
      timestamp: 'December 9 at 11:43 AM',
      transaction: 'https://etherscan.io/'
  },
];

const initialUser = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(initialUser);
  const currentUserDataValue = useMemo(() => ({ currentUserData, setCurrentUserData }), [currentUserData, setCurrentUserData]);

  const [waves, setWaves] = useState([]);
  const wavesValue = useMemo(() => ({ waves, setWaves }), [waves, setWaves]);

  const contractAddress = WAVE_PORTAL_ADDRESS;
  const contractABI = abi.abi;

  // Detect change in Metamask account
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach(wave => {

          console.log('wave =', wave, '\n');

          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setWaves(wavesCleaned);
      } else {
        console.log('Ethereum object doesn\'t exist!');
      }
    } catch(error) {
      console.log(error);
    }
  };

  const wave = async (message) => {
    console.log('waving with message:', message, '\n');
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave(message);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        
        getAllWaves();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    // setCurrentAccount(true);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get Metamask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log('\nConnected...', accounts[0]);
      setCurrentAccount(accounts[0]);
      getAllWaves();
    } catch(error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('make sure you have metamask!');
      } else {
        console.log('We have the ethereum object!!!\n', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('found an authorized account:', account);
        setCurrentAccount(account);

        getAllWaves();
      } else {
        console.log('no authorized account found.');
        setCurrentAccount(null);
      }
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // console.log('currentAccount =', currentAccount);
  // console.log('waves =', waves);
  
  return (
    <UserContext.Provider value={currentUserDataValue}>
      <WavesContext.Provider value={wavesValue}>
        <div className="mainContainer">

          <Navbar 
            currentAccount={currentAccount}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
          />

          
          {!currentAccount && <Header />}

          {currentAccount && (
            <Dashboard 
              wave={wave}
            />
            )
          }

          <div className='text-center'>
            <button 
              className="waveButton inline-flex items-center px-4 py-2 mr-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={currentAccount ? disconnectWallet : connectWallet}
            >
              {currentAccount ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>

            {currentAccount && (
              <button 
                className="waveButton inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={wave}
              >
                Wave at me
              </button>
            )}

            <h3 className='wave-count'>Current wave count: {waves.length}</h3>
            <p className='faucet-link'><small>You can get Goerli eth from <a href="https://faucets.chain.link/goerli" target="_blank" className='underline'>Chainlink</a>.</small></p>
          </div>
        </div>
        </WavesContext.Provider>
    </UserContext.Provider>
  );
};

export default App;