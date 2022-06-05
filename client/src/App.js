import React, {useState, useEffect} from 'react';
import Web3 from "web3";
// import { NFTStorage } from "./abi/abi";
import NFTStorage from "./abi/nft.json";

const contractAddress = "0x87d0F96425F2fAf71aBd547aEEbe5b49eD2b619f";

function App() {
  let selectedAccount;
  const [account, setAccount] = useState('');
  const [allTokens, setAllTokens] = useState('');
  const [myMintToken, setMyMintToken] = useState('');
  const [countMint, setCountMint] = useState('');
  
  // Initialized web3 provider
  const web3 = new Web3(
    Web3.givenProvider || 'https://ropsten.infura.io/v3/97bf9cb44b8b4854bc33c4d0dd2cec70'
  );

  const storageNFT = new web3.eth.Contract(NFTStorage.abi, contractAddress);

  let provider = window.ethereum;

  if (typeof provider !== 'undefined') {
    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0];
        setAccount(selectedAccount)
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];

      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  // getBalance from wallet
  web3.eth.getBalance("0x73e0d15F2924d372e827EF2809A9F75509c59CA3", function (err, result) {
    if (err) {
      console.log(err)
    } else {
      console.log(web3.utils.fromWei(result, "ether") + " ETH")
    }
  })


  const getAllTokens = async () => {
    const allTokens = await storageNFT.methods.getSellingNFTMount().call();
    setAllTokens(allTokens);
    console.log(allTokens)
  }

  const getMyMintTokens = async () => {
    const myMintTokens = await storageNFT.methods.nftList(account).call();
    setMyMintToken(myMintTokens);
    console.log(myMintTokens)
  }

  const updateMintCount = (event) => {
    setCountMint(event.target.value)
    console.log(countMint)
  }
  
  const mint = async () => {
    try {
      await storageNFT.methods.mint(countMint).send({
        from: account,
        value: countMint
      })
    } catch (error) {
      console.log(error)
    }
  }

  console.log(allTokens)
  useEffect(() => {
    getAllTokens()
    
  }, [account, storageNFT])

return (
  <div className="App">
    <div>
      <h1> Infura App with web3</h1>
      <h2> Connect with : {account}</h2>
      <h2> Mint : {allTokens}</h2>
      <h2> My mint token : {myMintToken}</h2>
      <input placeholder="How mint ?" onChange={updateMintCount} />
      <button onClick={mint}>Mint</button>
    </div>
  </div >
);
}

export default App;
