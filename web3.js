import '../stylesheets/app.css';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS } from 'crypto-js';
import './browser-solc.js';

var accounts;
var foodSafeContract;
var foodSafeCode;
var roles = {PRODUCER: "Producer" ,DISTRIBUTOR:"Distributor", RETAILER:"Retailer"};

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
            "inputs": [],
            "name": "chair_person",
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
            "inputs": [
              {
                "name": "_addr",
                "type": "address"
              }
            ],
            "name": "getAmount",
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
                "name": "_addr",
                "type": "address"
              }
            ],
            "name": "getRole",
            "outputs": [
              {
                "name": "",
                "type": "uint8"
              },
              {
                "name": "",
                "type": "bytes32"
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
            "inputs": [
              {
                "name": "id",
                "type": "bytes32"
              }
            ],
            "name": "getProductInfoByProducer2",
            "outputs": [
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
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
            "inputs": [
              {
                "name": "id",
                "type": "bytes32"
              }
            ],
            "name": "getProductInfoByProducer1",
            "outputs": [
              {
                "name": "",
                "type": "uint8"
              },
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
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
                "name": "_address",
                "type": "address"
              }
            ],
            "name": "getEntityInfo",
            "outputs": [
              {
                "name": "",
                "type": "uint8"
              },
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
              },
              {
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "Detail",
                "type": "string"
              },
              {
                "indexed": false,
                "name": "Name",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "Public_Address",
                "type": "address"
              }
            ],
            "name": "LogEntityInfoSet",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_addr",
                "type": "address"
              },
              {
                "name": "_role",
                "type": "uint8"
              },
              {
                "name": "_amt",
                "type": "uint256"
              }
            ],
            "name": "setRole",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "string"
              }
            ],
            "name": "LogPaymentByDistributor",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "string"
              }
            ],
            "name": "LogPaymentByRetailer",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint8"
              },
              {
                "indexed": false,
                "name": "",
                "type": "string"
              }
            ],
            "name": "LogProductDetailsByDistributor",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint8"
              },
              {
                "indexed": false,
                "name": "",
                "type": "string"
              }
            ],
            "name": "LogProductDetailsByProducer",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "",
                "type": "string"
              }
            ],
            "name": "LogProductDetailsByRetailer",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "Public_Address",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "Name",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "Role",
                "type": "uint8"
              },
              {
                "indexed": false,
                "name": "Confirmation",
                "type": "string"
              }
            ],
            "name": "LogRoleSet",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "_name",
                "type": "bytes32"
              },
              {
                "name": "_addr",
                "type": "bytes32"
              },
              {
                "name": "_entity_info",
                "type": "bytes32"
              }
            ],
            "name": "setEntityInfo",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes32"
              },
              {
                "name": "_producer_product_name",
                "type": "bytes32"
              },
              {
                "name": "_info_organic",
                "type": "bytes32"
              },
              {
                "name": "_producer_product_info",
                "type": "bytes32"
              },
              {
                "name": "_producer_product_value",
                "type": "bytes32"
              },
              {
                "name": "_p_in",
                "type": "uint8"
              }
            ],
            "name": "producerEnterProductDetails",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]);
        foodSafeCode = contract.bytecode;
      });
    });
  },

  
  setEntityInfo: function () {
    document.getElementById('message').innerText = 'adding entity information...';

    var _name = document.getElementById('_name').value;
    var _addr = document.getElementById('_addr').value;
    //var passPhrase = document.getElementById('passPhrase').value;
    var _entity_info = document.getElementById('_entity_info').value;
    
    
    //var encryptedSecret = CryptoJS.AES.encrypt(secret, passPhrase).toString();

    
    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');

    deployedFoodSafe.setEntityInfo( _name, _addr, _entity_info,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
      
      var logEntity = deployedFoodSafe.LogEntityInfoSet();
      logEntity.watch(function(error,result) {
        if(!error) {
          document.getElementById('blockHash').innerText = result.blockHash;
          var str1 = web3.toAscii(result.args.Name);
          document.getElementById('ename').innerText = str1;
          document.getElementById('print').innerText = result.args.Detail;
          
          console.log(result);
        }
      });
      document.getElementById('message').innerText = 'New entity is added';
    });
  },

  getEntityInfo: function () {
    document.getElementById('message').innerText = 'getting entity details...';

    //var passPhrase = document.getElementById('passPhrase').value;

    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');
    var address=document.getElementById('_address').value;
    deployedFoodSafe.getEntityInfo.call(address,function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      
      
      deployedFoodSafe.getEntityInfo.call(address,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        
        console.log(returnValues);
        document.getElementById('roles').value =returnValues[0];
        var ro = document.getElementById('roles').value;
        switch(ro) {
          case '0':
          var role = roles.PRODUCER;
          break;
          case '1':
          var role = roles.DISTRIBUTOR;
          break;
          case '2':
          var role = roles.RETAILER;
          break;
          default:
          break;
        }
        var r1 = web3.toAscii(returnValues[1]);
        var r2 = web3.toAscii(returnValues[2]);
        var r3 = web3.toAscii(returnValues[3]);
        document.getElementById('roles').value = role;
        document.getElementById('_name1').value = r1;
        document.getElementById('_addr1').value = r2;
        document.getElementById('_entity_info1').value = r3;
        
      });
    });
  },

  setRole: function () {
    document.getElementById('message').innerText = 'setting role...';

    var setAddress = document.getElementById('setAddress').value;
    var setRole = document.getElementById('setRole').value;
    var setAmount = document.getElementById('setAmount').value;
    
    
    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');

    deployedFoodSafe.setRole( setAddress,setRole,setAmount,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      document.getElementById('message').innerText = 'Role is added';
    });
  },

  getRole: function () {
    document.getElementById('message').innerText = 'getting role...';

    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');
    var address=document.getElementById('getAddress').value;
    deployedFoodSafe.getRole.call(address,function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      
      
      deployedFoodSafe.getRole.call(address,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        
        document.getElementById('getRole').value =returnValues[0];
        var ro = document.getElementById('getRole').value;
        switch(ro) {
          case '0':
          var role = roles.PRODUCER;
          break;
          case '1':
          var role = roles.DISTRIBUTOR;
          break;
          case '2':
          var role = roles.RETAILER;
          break;
          default:
          break;
        }
        
        document.getElementById('getRole').value =role;
        var r1= web3.toAscii(returnValues[1]);
        document.getElementById('getName').value = r1;
        document.getElementById('getAmount').value = returnValues[2];
        console.log(returnValues);
      });
    });
  },
  producerEnterProductDetails: function () {
    document.getElementById('message').innerText = 'adding product information...';

    var _id = document.getElementById('_id').value;
    var _name = document.getElementById('_pname').value;
    var _organic = document.getElementById('_organic').value;
    var _infog = document.getElementById('_infog').value;
    var _value = document.getElementById('_value').value;
    var _cond = document.getElementById('_cond').value;

    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');

    deployedFoodSafe.producerEnterProductDetails( _id, _name, _organic, _infog, _value, _cond,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
      
      var logEntity = deployedFoodSafe.LogProductDetailsByProducer();
      logEntity.watch(function(error,result) {
        if(!error) {
        
          //document.getElementById('print').innerText = result.args.Detail;
          
          console.log(result);
        }
      });
      document.getElementById('message').innerText = 'New product is added';
    });
  },

  getProductInfoByProducer1: function () {
    document.getElementById('message').innerText = 'getting Product details...';

    //var passPhrase = document.getElementById('passPhrase').value;

    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');
    var _pid=document.getElementById('_pid').value;
    deployedFoodSafe.getProductInfoByProducer1.call(_pid,function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      
      
      deployedFoodSafe.getProductInfoByProducer1.call(_pid,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        
        console.log(returnValues);
        document.getElementById('_roles').value =returnValues[0];
        var ro = document.getElementById('_roles').value;
        switch(ro) {
          case '0':
          var role = roles.PRODUCER;
          break;
          case '1':
          var role = roles.DISTRIBUTOR;
          break;
          case '2':
          var role = roles.RETAILER;
          break;
          default:
          break;
        }
        var r1 = web3.toAscii(returnValues[1]);
        var r2 = web3.toAscii(returnValues[2]);
        var r3 = web3.toAscii(returnValues[3]);
        document.getElementById('_roles').value = role;
        document.getElementById('_name2').value = r1;
        document.getElementById('_addr2').value = r2;
        document.getElementById('_entity_info2').value = r3;

        deployedFoodSafe.getProductInfoByProducer2.call(_pid,function (error, returnValue) {
          if (error) {
            console.error(error);
            document.getElementById('message').innerText = error;
            return;
          }
          
          console.log(returnValue);
          
          var r4 = web3.toAscii(returnValue[0]);
          var r5 = web3.toAscii(returnValue[1]);
          var r6 = web3.toAscii(returnValue[2]);
          var r7 = web3.toAscii(returnValue[3]);
          document.getElementById('_pname1').value =r4;
          document.getElementById('_porg').value = r5;
          document.getElementById('_pinfo').value = r6;
          document.getElementById('_pvalue').value = r7;
          document.getElementById('_ptime').value = returnValue[4] ;
          
        });
        
      });
    });
  },
  
  getAmount: function() {
    document.getElementById('message').innerText = 'getting amount..';

    var deployedFoodSafe = foodSafeContract.at('0x441a8e3f4009116f1e7d16930cc3d17fe464780f');
    var _adda = document.getElementById('_adda').value;
    deployedFoodSafe.getAmount( _adda, function(error, _amt) {
      if (error) {
        console.log(error);
        document.getElementById('message').innerText = error;
        return;
      }
      console.log(_amt[0]);
      //document.getElementById(_amt).value = _amt;
    });
  },

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
