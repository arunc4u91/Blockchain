import '../stylesheets/app.css';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS } from 'crypto-js';
import './browser-solc.js';

var accounts;
var foodSafeContract;
var foodSafeCode;

window.App = {
  start: function () {
    var self = this;
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      
      web3.eth.defaultAccount = web3.eth.accounts[0];

      BrowserSolc.loadVersion('soljson-v0.4.17+commit.bdeb9e52.js', function (compiler) {
        
        foodSafeContract = web3.eth.contract([
          {
            "constant": true,
            "inputs": [
              {
                "name": "productId",
                "type": "uint256"
              },
              {
                "name": "_quantity",
                "type": "uint256"
              }
            ],
            "name": "purchase",
            "outputs": [
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "uint256"
              },
              {
                "name": "",
                "type": "uint256"
              },
              {
                "name": "",
                "type": "uint256"
              },
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "productCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getProductCount",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
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
                "name": "productIdn",
                "type": "uint256"
              }
            ],
            "name": "getProduct",
            "outputs": [
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "string"
              },
              {
                "name": "",
                "type": "uint256"
              },
              {
                "name": "",
                "type": "uint256"
              },
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_name",
                "type": "string"
              },
              {
                "name": "_location",
                "type": "string"
              }
            ],
            "name": "addDetails",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "productId",
                "type": "uint256"
              },
              {
                "name": "productName",
                "type": "string"
              },
              {
                "name": "productDetails",
                "type": "string"
              },
              {
                "name": "farm",
                "type": "string"
              },
              {
                "name": "location",
                "type": "string"
              },
              {
                "name": "price",
                "type": "uint256"
              },
              {
                "name": "quantity",
                "type": "uint256"
              }
            ],
            "name": "addNewProduct",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]);
        foodSafeCode = contract.bytecode;
      });
    });
  },

  
  addNewProduct: function () {
    document.getElementById('message').innerText = 'adding new product...';

    var productId = document.getElementById('productId').value;
    var productName = document.getElementById('productName').value;
    var productDetails = document.getElementById('productDetails').value;
    //var passPhrase = document.getElementById('passPhrase').value;
    var farm = document.getElementById('farm').value;
    var location = document.getElementById('location').value;
    var price = document.getElementById('price').value;
    var mfg = document.getElementById('mfg').value;
    var quantity = document.getElementById('quantity').value;
    
    //var encryptedSecret = CryptoJS.AES.encrypt(secret, passPhrase).toString();

    
    var deployedFoodSafe = foodSafeContract.at('0x8dec819833fa24ba2dd937d319c5e81e40fabde4');

    deployedFoodSafe.addNewProduct(productId, productName, productDetails, farm, location, price, quantity,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      document.getElementById('message').innerText = 'New product is added';
    });
  },

  getProduct: function () {
    document.getElementById('message').innerText = 'getting product details...';

    //var passPhrase = document.getElementById('passPhrase').value;

    var deployedFoodSafe = foodSafeContract.at('0x8dec819833fa24ba2dd937d319c5e81e40fabde4');

    document.getElementById('message').innerText = 'getting product count...';

    deployedFoodSafe.getProductCount.call(function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount.toNumber() - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No location found.';
        return;
      }
      var pid=document.getElementById('productId').value;
      
      deployedFoodSafe.getProduct.call(pid,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        
        console.log(returnValues);
        
      
        document.getElementById('productName').value = returnValues[0];
       // document.getElementById('secret').value = CryptoJS.AES.decrypt(returnValues[4], passPhrase).toString();
        document.getElementById('productDetails').value = returnValues[1];
        document.getElementById('farm').value = returnValues[2];
        document.getElementById('location').value = returnValues[3];
        document.getElementById('price').value = returnValues[4];
        document.getElementById('quantity').value = returnValues[5];
        document.getElementById('mfg').value = Date();
        
        var text;
        var gmo = document.getElementById('productDetails').value;
        switch(gmo) {
          case "genetically modified corn":
          text = "Contains genetically modified corn. GMO product";
          break;
          case "genetically modified soy":
          text = "Contains genetically modified soy. GMO product";
          break;
          case "genetically modified canola":
          text = "Contains genetically modified canola. GMO product";
          break;
          case "genetically modified sugar":
          text = "Contains genetically modified content. GMO product";
          break;
          default:
          text = "Non-GMO product";
        }
        document.getElementById('certificate').innerHTML = text;
      });
    });
  },
getProductCount:function(){
  var deployedFoodSafe = foodSafeContract.at('0x8dec819833fa24ba2dd937d319c5e81e40fabde4');
  deployedFoodSafe.productCount(function(error,count){
    if(error){
      console.error(error);
      document.getElemementById('message').innerText = error;
      return;
    }
    var index = count.toNumber() - 1;
    document.getElementById('count').value = count;
  });
},
addDetails: function(){
  var distributorName = document.getElementById('distributorName').value;
  var distributorLoc = document.getElementById('distributorLoc').value;

  var deployedFoodSafe = foodSafeContract.at('0x8dec819833fa24ba2dd937d319c5e81e40fabde4');
  deployedFoodSafe.addDetails(name, location, function(error){
    if(error) {
      console.error(error);
      document.getElementById('message').innerText = error;
      return;
    }
    document.getElementById('message').innerText = 'Distributor details added';
  });
},

purchase: function() {
  var productId = document.getElementById('_productId').value;
  var _quantity = document.getElementById('_quantity').value;

  var deployedFoodSafe = foodSafeContract.at('0x8dec819833fa24ba2dd937d319c5e81e40fabde4');

  deployedFoodSafe.purchase.call(productId, _quantity, function(error, farmer,name,pdt,quan,per,rate) {
    if(error) {
      console.log(error);
      return;
    }
   
  quan = document.getElementById('_quantity').value;
  per=farmer[4] ;
  
   console.log(name);
   
  document.getElementById('pdt').value = farmer[2]; 
  document.getElementById('quan').value = quan;
  document.getElementById('rate').value = per;
  document.getElementById('farmer').value = farmer[0];
//  document.getElementById('rate').value = distributor[1];
  });
}

};

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  App.start();
});