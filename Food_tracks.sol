pragma solidity 0.4.20;

/*@@@@ Verifier @@@@*/

contract Verifier{
    
    enum roles {Producer, Distributor, Retailer, none}
    mapping(address => roles) verified_address;
    address public chair_person = msg.sender;
    
    
    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }
    
    function setRole(address addr, roles role) onlyBy(chair_person) public returns(string) {
        verified_address[addr] = role;
        return "verified";
  }

    function getRole(address addr) /*onlyBy(chair_person)*/ public constant returns(roles){
        if(chair_person == addr)
        {
        return verified_address[addr];
        }else{
            return roles.none;
        }
  }
}

/*@@@@@ PRODUCT DETAILS @@@@@@@@@*/

contract ProductDetails is Verifier{
    
    
    struct Product{
        
        string producer_name;
        string producer_Location;
        string info_organic;
        string producer_product_info;
        string producer_product_value;
        uint producer_timestamp;
        
        string distributor_name;
        string distributor_Location;
        string distributor_product_info;
        string distributor_product_value;
        uint distributor_timestamp;
        
        string retailer_name;
        string retailer_Location;
        string retailer_product_info;
        string retailer_product_value;
        uint retailer_timestamp;
    }
    
    modifier onlyProducer(address _address){
       require(verified_address[_address] == roles.Producer);
       _;
    }
    
    modifier onlyDistributor(address _address){
        require(verified_address[_address] == roles.Distributor);
        _;
    }
    
    modifier onlyRetailer(address _address){
        require(verified_address[_address] == roles.Retailer);
        _;
    }
    
    modifier onlyOwner(address _address){
        require((verified_address[_address] == roles.Producer) || 
        (verified_address[_address] == roles.Distributor) || 
        (verified_address[_address] == roles.Retailer));
        _;
    }
    
    mapping(string => Product) ProductDB;
    
   function enterProductDetails(string id, string _producer_name, string _producer_Location, 
                                string _info_organic, string _producer_product_info, 
                                string _producer_product_value) onlyProducer(msg.sender) public returns(string)
   {
        ProductDB[id].producer_name = _producer_name;
        ProductDB[id].producer_Location = _producer_Location;
        ProductDB[id].info_organic = _info_organic;
        ProductDB[id].producer_product_value = _producer_product_value;
        ProductDB[id].producer_product_info = _producer_product_info;
        ProductDB[id].producer_timestamp = now;
        return "Product detail entered by Producer";
   }
    
   function enterDistributorDetails(string id,string _distributor_name, 
                            string _distributor_Location, string _distributor_product_info, 
                            string _distributor_product_value) onlyDistributor(msg.sender) public returns (string) 
   {
       ProductDB[id].distributor_name = _distributor_name;
       ProductDB[id].distributor_Location = _distributor_Location;
       ProductDB[id].distributor_product_info = _distributor_product_info;
       ProductDB[id].distributor_product_value = _distributor_product_value;
       ProductDB[id].distributor_timestamp = now;
       return "Product detail entered by Distributor" ;
   }
   
    
    function enterRetailerDetails(string id, string _retailer_name, 
                                string _retailer_Location, string _retailer_product_info, 
                                string _retailer_product_value) onlyRetailer(msg.sender) public returns(string)
    {
        ProductDB[id].retailer_name = _retailer_name;
        ProductDB[id].retailer_Location = _retailer_Location;
        ProductDB[id].retailer_product_value = _retailer_product_value;
        ProductDB[id].retailer_product_info = _retailer_product_info;
        ProductDB[id].retailer_timestamp = now;
        return "Product detail entered by Retailer";
    }
    
    function getProducerDetails(string id, address _address) /*onlyOwner(msg.sender)*/ 
        constant public returns(string,string,string,string,string,uint)
    {
        if((verified_address[_address] == roles.Producer) || 
        (verified_address[_address] == roles.Distributor) || 
        (verified_address[_address] == roles.Retailer))
        {
        return (ProductDB[id].producer_name,ProductDB[id].producer_Location,
                ProductDB[id].info_organic,ProductDB[id].producer_product_info, 
                ProductDB[id].producer_product_value,ProductDB[id].producer_timestamp);
        }else{
            return ("","","","","",0);
        }
    }
    
    function getDistributorDetails(string id, address _address) /*onlyOwner(msg.sender)*/ 
        constant public returns(string,string,string,string,uint)
    {
        if((verified_address[_address] == roles.Producer) || 
        (verified_address[_address] == roles.Distributor) || 
        (verified_address[_address] == roles.Retailer))
        {
        return (ProductDB[id].distributor_name, ProductDB[id].distributor_Location, 
        ProductDB[id].distributor_product_info, ProductDB[id].distributor_product_value, 
        ProductDB[id].distributor_timestamp);
        }else{
            return ("","","","",0);
        }
    }
    
    function getRetailerDetails(string id,address _address) /*onlyOwner(msg.sender)*/ 
        constant public returns(string,string,string,string,uint)
    {
        if((verified_address[_address] == roles.Producer) || 
        (verified_address[_address] == roles.Distributor) || 
        (verified_address[_address] == roles.Retailer))
        {
        return (ProductDB[id].retailer_name,ProductDB[id].retailer_Location,
                ProductDB[id].retailer_product_info,ProductDB[id].retailer_product_value,
                ProductDB[id].retailer_timestamp);
        }else{
            return("","","","",0);
        }
    }
    
    function getBasicProductInfo1(string id) constant public returns (string, string, string, string, uint)
    {
        return (ProductDB[id].producer_name,ProductDB[id].producer_Location,
                ProductDB[id].info_organic,ProductDB[id].producer_product_info,
                ProductDB[id].producer_timestamp);
    }
    
    function getBasicProductInfo2(string id) constant public returns(string, string, string, string, uint)
    {
        return (ProductDB[id].retailer_name,ProductDB[id].retailer_Location,
                ProductDB[id].retailer_product_info,ProductDB[id].retailer_product_value,
                ProductDB[id].retailer_timestamp);
    }
}
