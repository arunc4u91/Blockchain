[
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "_distributor_product_info",
				"type": "bytes32"
			},
			{
				"name": "_distributor_product_price",
				"type": "uint256"
			},
			{
				"name": "_d_in",
				"type": "uint8"
			}
		],
		"name": "enterDistributorDetails",
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
				"name": "_retailer_product_info",
				"type": "bytes32"
			},
			{
				"name": "_retailer_product_price",
				"type": "uint256"
			},
			{
				"name": "_r_in",
				"type": "uint8"
			}
		],
		"name": "enterRetailerDetails",
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
		"name": "paymentByDistributor",
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
		"name": "paymentByRetailer",
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
				"name": "_producer_product_quantity",
				"type": "uint256"
			},
			{
				"name": "_producer_product_price",
				"type": "uint256"
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
				"name": "Amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "Distributor_address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Product_Name",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "PAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "DAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "Producer_Address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Detail",
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
				"name": "ADDRESS",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "INFO",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "VALUE",
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
				"name": "Retailer_address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Product_Name",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "DAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "RAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "Distributor_Address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "Detail",
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
		"constant": true,
		"inputs": [
			{
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "getProductInfoByDistributor1",
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
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "getProductInfoByDistributor2",
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
		"inputs": [
			{
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "getProductInfoByRetailer1",
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
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "getProductInfoByRetailer2",
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
	}
]
