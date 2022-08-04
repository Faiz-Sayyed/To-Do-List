import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Contract, providers } from 'ethers'
import { ethers } from "ethers";
import { useRef, useEffect, useState } from 'react'
import { LIST_CONTRACT_ADDRESS, abi } from '../constants/index.js'
import Navbar from './components/Navbar.js'
import ListArea from './components/ListArea.js'
import TotTasks from './components/TotTasks.js'
import LoadingScreen from './components/LoadingScreen.js'


export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [currentAccount, setCurrentAccount] = useState();
  const [loading, setLoading] = useState(false);

  // Connecting Wallet
  //-----------------------------------------------------------------------------------------------
  useEffect(() => {
    //executing the checking at the time of load

    async function checkingWallet() {
      // this will be run automatically at the time of page load
      // authorization process // checking login
      try {
        // before auth please check if wallet is present or not
        const { ethereum } = window;

        if (!ethereum) {
          alert("Please Install Metamask🙏");
        } else {
          console.log("Metamask Detected");
        }

        //if already logged in then set the account
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log(`Your authorize account is ${account}`);
          setCurrentAccount(account);

          // get the list of the user after the account is connected
          getTasks();
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkingWallet();
  }, [currentAccount]);

  // If you are not already loged in then use a connect wallet button
  async function connectWallet() {
    const { ethereum } = window;
    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } else {
      alert("Please Install Metamask🙏");
    }
  }

  function runConnectWallet() {
    connectWallet();
  }

  // Get the List of the connected user
  //-----------------------------------------------------------------------------------------------
  async function getTasks() {
    try {

      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(LIST_CONTRACT_ADDRESS, abi, provider);

        setLoading(true);
        let usersTask = await contract.getTasks();
        let cleanedTasks = [];
        usersTask.map((idx) => {
          if (idx.title !== '') {
            cleanedTasks.push(idx);
          }
        })

        setTasks(cleanedTasks);
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  // Function to add tasks
  //-----------------------------------------------------------------------------------------------
  async function addTask(name, deadline) {

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(LIST_CONTRACT_ADDRESS, abi, signer);

        setLoading(true);
        const txn = await contract.addTask(name, deadline);
        await txn.wait();
        getTasks();
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  // Function to delete tasks
  //-----------------------------------------------------------------------------------------------
  async function deleteTask(idx) {

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(LIST_CONTRACT_ADDRESS, abi, signer);

        setLoading(true);
        const txn = await contract.removeTask(idx);
        await txn.wait();
        getTasks();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className={styles.body}>
      <div className={styles.loading}>
        {
          (loading === true) ? (
            <LoadingScreen />
          ) : (
            <>
            </>
          )
        }
      </div>
      <Navbar currentAccount={currentAccount} runConnectWallet={runConnectWallet} />
      <ListArea tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
      <TotTasks tasks={tasks} />
    </div>
  )
}
