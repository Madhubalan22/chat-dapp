import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const ChechIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    // if (!window.ethereum) return console.log("Install MateMask");

    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });

    if (!window.ethereum) return console.log("Install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "  Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};

export const convertHexTimestampToDateTime1 = (hexTimestamp) => {
  // Convert the hex timestamp to decimal
  const unixTimestamp = parseInt(hexTimestamp, 16);

  // Create a Date object from the Unix timestamp
  const date = new Date(unixTimestamp * 1000);

  // Format the date and time as before
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export const convertHexTimestampToDateTime = (hexTimestamp) => {
  const number = parseInt(hexTimestamp, 16);

  // Create a new Date object from the number.
  const date = new Date(number);

  // Return the date.
  return date;
}

export function blockTimestampToDateTime(unixTimestamp) {
  // Convert the block timestamp to a decimal number.
  const milliseconds = unixTimestamp * 1000;

  // Create a new Date object from the milliseconds.
  const date = new Date(milliseconds);

  // Get the epoch date and time in the format YYYY-MM-DD HH:mm:ss.SSS UTC.
  const epochDateTime = date.toISOString();

  // Convert the time to IST.
  const ISTDateTime = new Date(epochDateTime);
  ISTDateTime.setHours(ISTDateTime.getHours() + 5);
  ISTDateTime.setMinutes(ISTDateTime.getMinutes() + 30);

  // Return the epoch date and time in IST.
  const result = ISTDateTime.toISOString().slice(0, 10) + " Time: " +  ISTDateTime.toISOString().slice(11, 19)
  return result
}