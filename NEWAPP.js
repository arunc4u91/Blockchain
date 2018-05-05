//import '../stylesheets/app.css';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import { default as CryptoJS } from 'crypto-js';
import './browser-solc.js';

var accounts;
var account;
var foodSafeContract;
var foodSafeCode;
var contractAddress = '0x2b59c04db6ed9f4eb9bb554f798930cea1ce377b';
var roles = {PRODUCER: "Producer" ,DISTRIBUTOR:"Distributor", RETAILER:"Retailer",NONE:"none"};

window.App = {
  start: function () {
    var self = this;
    web3.eth.getAccounts(function (err, accs) {

      console.log(accs);
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;

      BrowserSolc.loadVersion('soljson-v0.4.17+commit.bdeb9e52.js', function (compiler) {

        foodSafeContract = web3.eth.contract([
            {
                "constant": true,
                "inputs": [],
                "name": "displayForRetailer1",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "address[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "displayForRetailer2",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "uint8[]"
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
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "_distributor_product_info",
                        "type": "bytes32"
                    },
                    {
                        "name": "_distributor_product_value",
                        "type": "uint256"
                    },
                    {
                        "name": "_d_in",
                        "type": "uint8"
                    }
                ],
                "name": "distributorProductDetails",
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
                        "type": "uint256"
                    },
                    {
                        "name": "_producer_product_name",
                        "type": "bytes32"
                    },
                    {
                        "name": "_producer_product_info",
                        "type": "bytes32"
                    },
                    {
                        "name": "_organic",
                        "type": "bytes32"
                    },
                    {
                        "name": "_producer_product_quantity",
                        "type": "uint256"
                    },
                    {
                        "name": "_producer_product_value",
                        "type": "uint256"
                    },
                    {
                        "name": "_exp_date",
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
                        "name": "_email",
                        "type": "bytes32"
                    },
                    {
                        "name": "_password",
                        "type": "bytes32"
                    }
                ],
                "name": "login",
                "outputs": [
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
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "general_public",
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
                        "type": "bytes32"
                    },
                    {
                        "name": "",
                        "type": "uint256"
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
                "inputs": [],
                "name": "dispalyForDistirbutor2",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "address[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
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
                        "name": "_count",
                        "type": "uint256"
                    },
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
                "constant": true,
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "name": "FDA",
                "outputs": [
                    {
                        "name": "",
                        "type": "bytes32"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
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
                        "type": "bytes32"
                    },
                    {
                        "name": "_email",
                        "type": "bytes32"
                    },
                    {
                        "name": "_password",
                        "type": "bytes32"
                    },
                    {
                        "name": "_warehouse",
                        "type": "bytes32"
                    },
                    {
                        "name": "_entity_type",
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
                "constant": true,
                "inputs": [],
                "name": "displayForDistributor1",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    },
                    {
                        "name": "",
                        "type": "uint8[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getEntityInfo",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256[]"
                    },
                    {
                        "name": "",
                        "type": "address[]"
                    },
                    {
                        "name": "",
                        "type": "uint8[]"
                    },
                    {
                        "name": "",
                        "type": "bytes32[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
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
                "constant": false,
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "_quantity",
                        "type": "uint256"
                    },
                    {
                        "name": "_addr",
                        "type": "address"
                    },
                    {
                        "name": "_d_in",
                        "type": "uint8"
                    }
                ],
                "name": "RetailerBuyProduct",
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
                        "type": "uint256"
                    },
                    {
                        "name": "_quantity",
                        "type": "uint256"
                    },
                    {
                        "name": "_addr",
                        "type": "address"
                    },
                    {
                        "name": "_p_in",
                        "type": "uint8"
                    }
                ],
                "name": "distributorBuyProduct",
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
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "ProductID",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Product_Name",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Producer_Address",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "Info",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Quantity",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Price",
                        "type": "uint256"
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
                        "name": "Distributor",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "ProductID",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Quantity",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Producer",
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
                        "name": "Distributor",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "ProductID",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Price",
                        "type": "uint256"
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
                        "name": "Retailer",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "ProductID",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Quantity",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Distributor",
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
                        "name": "printInfo",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "Name",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Email",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Warehouse",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Entity_type",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Entity_info",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "Role",
                        "type": "uint8"
                    },
                    {
                        "indexed": false,
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "LogEntityInfoSet",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "Count",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "Address",
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
                        "name": "sent",
                        "type": "string"
                    }
                ],
                "name": "LogRoleSet",
                "type": "event"
            }
        ]);

      });
    });
  },


  setEntityInfo: function () {
   // document.getElementById('message').innerText = 'adding entity information...';

    var _name = document.getElementById('_name').value;
    var _addr = document.getElementById('_addr').value;
    var _password = document.getElementById('_password').value;
    var _email = document.getElementById('_email').value;
    var _entity_info = document.getElementById('_entity_info').value;
    var _entity_job = document.getElementById('_entity_job').value;


    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.setEntityInfo( _name, _password,_email, _addr, _entity_info,_entity_job,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var logEntity = deployedFoodSafe.LogEntityInfoSet();
      logEntity.watch(function(error,result) {
        if(!error) {

          var str1 = web3.toAscii(result.args.Name);
          var str2 = web3.toAscii(result.args.Entity_type);

          document.getElementById('print').innerText = result.args.printInfo;
          document.getElementById('ename').innerText = str1;
          document.getElementById('etype').innerText = str2;
          document.getElementById('erole').innerText = "dac";

          console.log(result);
        }
      });
   //   document.getElementById('message').innerText = 'New entity is added';
    });
  },

  getEntityInfo: function () {
    document.getElementById('message').innerText = 'getting entity details...';

    var deployedFoodSafe = foodSafeContract.at(contractAddress);


      deployedFoodSafe.getEntityInfo.call(function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }

        var index = returnValues - 1;
        if (index < 0) {
          document.getElementById('message').innerText = 'No data found.';
          return;
        }

        console.log(returnValues);

        var test ="";
        var p_addr ="";
        var u_name =[];
        var ro =[];
         for(var i=0;i<returnValues[0].length;i++) {
          test += returnValues[0][i] + "<br>";
          u_name.push(returnValues[3][i]);
          ro.push(returnValues[2][i]);
          p_addr += returnValues[1][i] + "<br>";
         }
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
          case '3':
          var role = roles.NONE;
          break;
          default:
          break;
        }
        console.log(returnValues[0].length);
         //document.getElementById('_count1').innerHTML = test;
         document.getElementById('_addr1').innerHTML = p_addr;
        for(var j=0;j<u_name.length;j++) {
          document.getElementById('_name1').innerHTML += web3.toAscii(u_name[j]) + "<br>";
          document.getElementById('roles').innerHTML += ro[j] + "<br>";
        }

      });

  },

  login: function () {

    var _userEmail = document.getElementById('userEmail').value;
    var _userPass = document.getElementById('userPass').value;

    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.login( _userEmail,_userPass,  function (error,returnValue) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
      console.log(returnValue);
     

     document.getElementById('result').innerHTML = web3.toAscii(returnValue);
    });
  },



  setRole: function () {

    var setCount = document.getElementById('setCount').value;
    var setAddress = document.getElementById('setAddress').value;
    var setRole = document.getElementById('setRole').value;
    var setAmount = document.getElementById('setAmount').value;


    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.setRole( setCount,setAddress,setRole,setAmount,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
      var logr = deployedFoodSafe.LogRoleSet();
      logr.watch(function(error,result) {
        if(!error) {
          console.log(result);
        }
      });
    });
  },


  getRole: function () {

    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var address=document.getElementById('getAddress').value;

      deployedFoodSafe.getRole.call(address,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }

        var index = returnValues - 1;
          if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
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
  },

  producerEnterProductDetails: function () {
    document.getElementById('message').innerText = 'adding product information...';

    var _id = document.getElementById('_id').value;
    var _name = document.getElementById('_pname').value;
    var _organic = document.getElementById('_organic').value;
    var _infog = document.getElementById('_infog').value;
    var _quantity = document.getElementById('_quantity').value;
    var _price = document.getElementById('_price').value;
    var _expDate = document.getElementById('_expDate').value;
    var _cond = document.getElementById('_cond').value;

    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.producerEnterProductDetails( _id, _name, _infog, _organic,  _quantity, _price, _expDate, _cond,  function (error) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var logp = deployedFoodSafe.LogProductDetailsByProducer();
      logp.watch(function(error,resultp) {
        if(!error) {
          console.log(resultp);
        }
      });
      document.getElementById('message').innerText = 'New product is added';
    });
  },

  displayForDistributor1: function () {
    document.getElementById('message').innerText = 'getting Product details...';

    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.displayForDistributor1.call(function (error, trailCount) {
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

      var len= trailCount[0].length;
      deployedFoodSafe.displayForDistributor1.call(function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }

        console.log(returnValues);
        var prodCount = "";
        var prodID = "";
        var prodQuant = "";
        var prodPrice = "";
        var prodName = [];
        var prodOrg = [];
        var prodCond = [];
        for(var i=0;i<returnValues[0].length;i++) {
          prodCount += returnValues[0][i] + "<br>";
          prodID += returnValues[1][i] + "<br>";
          prodQuant += returnValues[2][i] + "<br>";
          prodPrice += returnValues[3][i] + "<br>";
          prodName.push(returnValues[4][i]);
          prodOrg.push(returnValues[5][i]);
          prodCond += returnValues[6][i] + "<br>";
        }

        document.getElementById('prodCount').innerHTML = prodCount;
        document.getElementById('prodID').innerHTML = prodID;
        for(var j=0;j<len;j++) {
        document.getElementById('prodName').innerHTML += web3.toAscii(prodName[j]) + "<br>";
        document.getElementById('prodOrg').innerHTML += web3.toAscii(prodOrg[j]) + "<br>";

        }
        document.getElementById('prodCond').innerHTML = prodCond + "<br>";
        document.getElementById('prodQuant').innerHTML = prodQuant;
        document.getElementById('prodPrice').innerHTML = prodPrice;




        deployedFoodSafe.dispalyForDistirbutor2.call(function (error, returnValue) {
          if (error) {
            console.error(error);
            document.getElementById('message').innerText = error;
            return;
          }

          console.log(returnValue);
          var mfg = "";
          var expDate = [];
          var pName = [];
          var pAddr = "";
          var pEntity = [];
          for(var i=0;i<returnValues[0].length;i++) {
            mfg += returnValue[0][i] + "<br>";
            expDate.push(returnValue[1][i]);
            pName.push(returnValue[2][i]);
            pAddr += returnValue[3] + "<br>";
            pEntity.push(returnValue[4][i]);
          }

          document.getElementById('mfg').innerHTML = mfg;
          document.getElementById('pAddr').innerHTML = pAddr;
          for(var j=0;j<len;j++) {
					document.getElementById('expDate').innerHTML += web3.toAscii(expDate[j] + "<br>");
          document.getElementById('pName').innerHTML += web3.toAscii(pName[j]) + "<br>";
          document.getElementById('pEntity').innerHTML += web3.toAscii(pEntity[j]) + "<br>";
          }
        });

      });
    });
  },


  distributorBuyProduct: function() {

    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var _dpid = document.getElementById('_dpid').value;
    var _damt = document.getElementById('_damt').value;
    var _daddr = document.getElementById('_daddr').value;
    var _dcond = document.getElementById('_dcond').value;

    deployedFoodSafe.distributorBuyProduct( _dpid, _damt, _daddr, _dcond, function(error) {
      if (error) {
        console.log(error);
        document.getElementById('message').innerText = error;
        return;
      }
      var logPayment = deployedFoodSafe.LogPaymentByDistributor();
      logPayment.watch(function(error,result) {
        if(!error) {
        //   document.getElementById('blockHash1').innerText = result.blockHash;
        //  // var str1 = web3.toAscii(result.args.Name);
        //  // document.getElementById('ename').innerText = str1;
        //   document.getElementById('print1').innerText = result.args.Detail;

          console.log(result);
        }
      });
      document.getElementById('message').innerText = 'Payment is done and contract transferred from producer to distributor';
    });
  },

  distributorProductDetails: function() {

    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var _dppid = document.getElementById('_dppid').value;
    var _dpinfo = document.getElementById('_dpinfo').value;
    var _dpvalue = document.getElementById('_dpvalue').value;
    var _dpcond = document.getElementById('_dpcond').value;

    deployedFoodSafe.distributorProductDetails( _dppid, _dpinfo, _dpvalue, _dpcond, function(error) {
      if (error) {
        console.log(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var logd = deployedFoodSafe.LogProductDetailsByDistributor();
      logd.watch(function(error,resultd) {
        if(!error) {

          console.log(resultd);
        }
      });
      document.getElementById('message').innerText = 'Details are entered';
    });
  },

  displayForRetailer1: function () {
    document.getElementById('message').innerText = 'getting Product details...';

    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.displayForRetailer1.call(function (error, trailCount) {
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

      var len = trailCount[0].length;
      deployedFoodSafe.displayForRetailer1.call(function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }

        console.log(returnValues);
        var dcount = "";
        var dID = "";
        var dpName = [];
        var dexp = [];
        var dName = [];
        var dpAddr = "";
        for(var i=0;i<len;i++) {
          dcount += returnValues[0][i] + "<br>";
          dID += returnValues[1][i] + "<br>";
          dpName.push(returnValues[2][i]);
          dexp.push(returnValues[3][i]);
          dName.push(returnValues[4][i]);
          dpAddr += returnValues[5][i] + "<br>";
        }

        document.getElementById('dcount').innerHTML = dcount;
        document.getElementById('dID').innerHTML = dID;
        for(var j=0;j<returnValues[0].length;j++) {
				document.getElementById('dexp').innerHTML += web3.toAscii(dexp[j]) + "<br>";
        document.getElementById('dpName').innerHTML += web3.toAscii(dpName[j]) + "<br>";
        document.getElementById('dName').innerHTML += web3.toAscii(dName[j]) + "<br>";
        document.getElementById('dpAddr').innerHTML = dpAddr;
        }
        deployedFoodSafe.displayForRetailer2.call(function (error, returnVal) {
          if (error) {
            console.error(error);
            document.getElementById('message').innerText = error;
            return;
          }
          console.log(returnVal);
          var dQuan = "";
          var dPrice = "";
          var dCond = "";
          for(var i=0;i<len;i++) {
            dQuan += returnVal[0][i] + "<br>";
            dPrice += returnVal[1][i] + "<br>";
            dCond += returnVal[2][i] + "<br>";
          }
          document.getElementById('dQuan').innerHTML = dQuan;
          document.getElementById('dPrice').innerHTML = dPrice;
          document.getElementById('dCond').innerHTML = dCond;
        });

      });
    });
  },

  RetailerBuyProduct: function() {

    var deployedFoodSafe = foodSafeContract.at(contractAddress);
    var _drpid = document.getElementById('_drpid').value;
    var _dramt = document.getElementById('_dramt').value;
    var _draddr = document.getElementById('_draddr').value;
    var _drcond = document.getElementById('_drcond').value;

    deployedFoodSafe.RetailerBuyProduct( _drpid, _dramt, _draddr, _drcond, function(error) {
      if (error) {
        console.log(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var logPayment = deployedFoodSafe.LogPaymentByRetailer();
      logPayment.watch(function(error,result) {
        if(!error) {
        //   document.getElementById('blockHash2').innerText = result.blockHash;
        //  // var str1 = web3.toAscii(result.args.Name);
        //  // document.getElementById('ename').innerText = str1;
        //   document.getElementById('print2').innerText = result.args.Detail;

          console.log(result);
        }
      });
      document.getElementById('message').innerText = 'Payment is done and contract transferred from distributed to retailer';
    });
  },


  FDA: function () {
    document.getElementById('message').innerText = 'getting Product details...';
    var _fID = document.getElementById("fID").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.FDA.call(_fID,function (error, trailCount) {
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


      deployedFoodSafe.FDA.call(_fID,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }

        console.log(returnValues);


        document.getElementById('_fname').innerHTML = web3.toAscii(returnValues[0]);
        document.getElementById('_ftime').innerHTML = returnValues[1];
        var fdname =[];
        var fdtime = "";
        var frname = [];
        var frtime = "";
        for(var i=0;i<returnValues[2].length;i++) {
          fdname.push(returnValues[2][i]);
          fdtime += returnValues[3][i] + "<br>";
          frname.push(returnValues[4][i]);
          frtime += returnValues[5][i] + "<br>";
        }

        for(var j=0;j<returnValues[2].length;j++) {
        document.getElementById('fdname').innerHTML += web3.toAscii(fdname[j]) + "<br>";
        document.getElementById('frname').innerHTML += web3.toAscii(frname[j]) + "<br>";
        document.getElementById('fdtime').innerHTML = fdtime;
        document.getElementById('frtime').innerHTML = frtime;
        }

      });
    });
  },


  general_public: function () {
    document.getElementById('message').innerText = 'getting Product details...';
    var _gID = document.getElementById("gID").value;
    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.general_public.call(_gID,function (error, trailCount) {
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

      deployedFoodSafe.general_public.call(_gID,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }

        console.log(returnValues);
				
        document.getElementById('_gname').innerHTML = web3.toAscii(returnValues[0]);
        document.getElementById('_ginfo').innerHTML = web3.toAscii(returnValues[1]);
        document.getElementById('_gpname').innerHTML = web3.toAscii(returnValues[2]);
        document.getElementById('_gpinfo').innerHTML = web3.toAscii(returnValues[3]);
				document.getElementById('_gorg').innerHTML = web3.toAscii(returnValues[4]);
			  document.getElementById('_gdate').innerHTML = returnValues[5];
        document.getElementById('_gexp').innerHTML = web3.toAscii(returnValues[6]);
      });
    });
  },

  getAmount: function () {
    var _gAddress = document.getElementById("gAddress").value;

    var deployedFoodSafe = foodSafeContract.at(contractAddress);

    deployedFoodSafe.getAmount.call(_gAddress,function (error, trailCount) {
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
			
			

        console.log(trailCount);

        document.getElementById('_amt').innerHTML = trailCount;
			
      });
  },
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});
