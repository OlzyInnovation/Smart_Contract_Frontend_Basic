if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is Installed');
} else {
  console.log('Install MetaMask');
  document.querySelector('.enableEthereumButton').innerHTML =
    '<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeoehlefnkodbefgpgknn" target="_blank">Install MetaMask</a>';
  document.querySelector('.intro').style.display = 'none';
}

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const sendEthButton = document.querySelector('.sendEthButton');
const showBalance = document.querySelector('.showBalance');

ethereumButton.addEventListener('click', () =>
  //Will start the MetaMask Extension
  getAccount()
);
async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
  const balance = await ethereum.request({
    method: 'eth_getbalance',
    params: [account, 'latest'],
  });
  const read = parseInt(balance) / 10 ** 18;
  console.log(read.toFixed(5));

  //   const value = 200;
  //   console.log(value);

  //Sending Ethereum to an address
  sendEthButton.addEventListener('.click', () => {
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account,
            to: '0x0' /*Where this transaction goes to*/,
            //value: web3.utils.toHex(value)
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.log(error));
  });
}
