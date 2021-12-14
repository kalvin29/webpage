abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "voteForCandidate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "candidateNames",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidateList",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "totalVotesFor",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "validCandidate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "votesReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
address ='0x271f828A6604E2Fe3571F72eB824e94DAed89e38';
ethereum.request({ method: 'eth_accounts' }).then(result => myMetaMaskWallet = result);

web3js= new Web3(ethereum);
myContract = new web3js.eth.Contract(abi,address);

candidates = {'coffee': 'candidate-1', 'tea': 'candidate-2', 'milk': 'candidate-3'}

function voteForCandidate() {
  candidateName = $('#candidate').val();
  console.log(candidateName);
  myContract.methods.voteForCandidate(candidateName).send({from: myMetaMaskWallet[0]}).then(console.log);
  }

loop=()=>{
    let candidateNames = Object.keys(candidates);
    for (let name of candidateNames) {
        myContract.methods.totalVotesFor(name).call().
        then(result => {totalvotes = result;
        $(`#${candidates[name]}`).html(totalvotes);
        });
      }
    setTimeout(loop,1000);
  }
loop()
