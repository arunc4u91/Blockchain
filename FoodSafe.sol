pragma solidity ^0.4.0;

contract ownable {
    address public owner;
    
    function ownable() internal {
        owner=msg.sender;
    }
    
    modifier onlyOwner {
        require (msg.sender == owner);
        _;
    }
}

contract FoodSafe is ownable {
    
    struct product {
        uint productId;
        string productName;
        string productDetails;
        uint previousProductId;
        string farm;
        string location;
        uint price;
        uint quantity;
        uint mfg;
        uint timestamp;
       
    }
    
    mapping(uint =>product) Product;
    uint public productCount = 0;
   
    function addNewProduct(uint productId, string productName, string productDetails, string farm, string location, uint price, uint quantity) public onlyOwner{
        
        product newProduct = Product[productId];
    
        newProduct.productName = productName;
        newProduct.productDetails = productDetails;
        newProduct.farm = farm;
        newProduct.location = location;
        newProduct.price = price;
        newProduct.quantity = quantity;

        if (productCount > 0) {
      newProduct.previousProductId = Product[productCount - 1].productId;
    }

    Product[productCount] = newProduct;
        productCount++;
    }
    
   function getProductCount() public view returns(uint) {
       return productCount;
    }
    
    function getProduct(uint productIdn) public view returns(string, string, string, string, uint, uint, uint) {
        return (Product[productIdn].productName, Product[productIdn].productDetails, Product[productIdn].farm, Product[productIdn].location, Product[productIdn].price,Product[productIdn].quantity, Product[productIdn].timestamp);
    }
}

contract Distributor is FoodSafe {
    
        string name;
        string location; 
    
    function addDetails(string _name, string _location) public {
        name = _name;
        location = _location;
    }
    
    function purchase (uint productId, uint _quantity) public view returns(string, string, string, uint, uint, uint, uint) {
        product memory prod = Product[productId];
        require(prod.quantity > _quantity); 
        prod.quantity -= _quantity;
        uint price = prod.price*_quantity;
        return (prod.farm,name,prod.productName, _quantity,prod.price, price, prod.timestamp);
    }
    
}



