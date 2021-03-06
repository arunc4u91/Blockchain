pragma solidity ^0.4.18;

contract Verifier{
    
    enum roles {Producer, Distributor, Retailer, none}
    uint count;
    
    struct entityDetail
    {
        bytes32 name;
        bytes32 email;
        bytes32 password;
        bytes32 warehouse;
        bytes32 entity_type;
        bytes32 entity_info;
        address public_address;
        roles roles_assigned;
        uint amount_assigned;
    }
    
    mapping(address => entityDetail) entityDB;
    uint[] count_info;
    address[] addr_info;
    roles[] roles_assigned_info;
    bytes32[] name_info;
    
    address public chair_person;
  
    
    event LogEntityInfoSet(string printInfo, bytes32 Name, bytes32 Email, 
    bytes32 Warehouse, bytes32 Entity_type, bytes32 Entity_info, roles Role, 
    uint amount);
    
    event LogRoleSet(uint Count,address Address, bytes32 Name, roles Role, string sent);
    
    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }
    
    constructor() public {
        chair_person = msg.sender;
        count = 0;
        entityDB[chair_person].amount_assigned = 1000;
    }
    
    function setEntityInfo(bytes32 _name, bytes32 _email, bytes32 _password, 
    bytes32 _warehouse, bytes32 _entity_type, bytes32 _entity_info) public returns
    (bool)
    {
        entityDB[msg.sender].name = _name;
        entityDB[msg.sender].email = _email;
        entityDB[msg.sender].password = _password;
        entityDB[msg.sender].warehouse = _warehouse;
        entityDB[msg.sender].entity_type = _entity_type;
        entityDB[msg.sender].entity_info = _entity_info;
        entityDB[msg.sender].public_address = msg.sender;
        entityDB[msg.sender].roles_assigned = roles.none;
        entityDB[msg.sender].amount_assigned = 0;
        
        count_info.push(count);
        addr_info.push(msg.sender) ;
        roles_assigned_info.push(roles.none);
        name_info.push(_name);
        
        count ++;
        
        emit LogEntityInfoSet("Entered Details", _name, _email, _warehouse, 
        _entity_type, _entity_info, roles.none, 0);
        
        return true;
    }
    
    function getEntityInfo() public constant returns(uint[],address[],roles[],bytes32[])
    {
        return(count_info,addr_info,roles_assigned_info,name_info);
    }
    
    function setRole(uint _count,address _addr, roles _role, uint _amt)
    onlyBy(chair_person)
    public returns(bool)
    {   
        
        assert(entityDB[chair_person].amount_assigned >= _amt);
        
        entityDB[_addr].roles_assigned = _role;
        entityDB[_addr].amount_assigned += _amt;
        entityDB[chair_person].amount_assigned -= _amt;
    
        roles_assigned_info[_count] = _role;
        
        emit LogRoleSet(_count, _addr, entityDB[_addr].name, _role, "verified");
        
        return true;
        
    }
    
    function getRole(address _addr) public constant returns
    (roles, bytes32, uint)
    {
        assert(chair_person == msg.sender);
        
        return (entityDB[_addr].roles_assigned, entityDB[_addr].name, 
        entityDB[_addr].amount_assigned);
    }
    
}

contract ProductDetails is Verifier{
    
    enum conditions{undamaged, temperature_maintained, agree_upon_amount, none}
    
    
    struct distributor{
        address distributor_public_address;
        bytes32 distributor_product_info;
        uint distributor_product_quantity;
        uint distributor_product_value;
        uint distributor_timestamp;
        conditions d;
    }
    
    struct retailer{
        address retailer_public_address;
        bytes32 retailer_product_info;
        uint retailer_product_quantity;
        uint retailer_product_value;
        uint retailer_timestamp;
        conditions r;
    }
    
    struct Product{
        
        address producer_address;
        bytes32 producer_product_name;
        bytes32 producer_product_info;
        bool organic;
        uint producer_product_quantity;
        uint producer_product_value;
        uint producer_timestamp;
        conditions p;
        
        mapping(address => distributor)distributors;
        mapping(address => retailer)retailers;
        
        
        address[] dist_addr;
        address[] ret_addr;
        bytes32[] dist_names;
        bytes32[] ret_names;
        uint[] dist_timestamp;
        uint[] ret_timestamp;
    }
    
    mapping(bytes32 => Product) ProductDB;
    
    uint prod_count;
    
    uint[] product_count;
    bytes32[] product_id;
    bytes32[] product_producer_name;
    address[] product_producer_public_addr;
    bytes32[] product_producer_entity_info;
    uint[] product_quantity;
    bytes32[] product_name;
    bool[] product_organic;
    conditions[] product_condition;
    uint[] product_price;
    
    uint dist_count;
    
    uint[] Distcount;
    bytes32[] DistProduct_id;
    bytes32[] DistProduct_name;
    bytes32[] Dist_name;
    address[] Dist_public_add;
    uint[] Dist_quantity;
    uint[] Dist_product_price;
    conditions[] Dist_condition;
    
    
    
    
    modifier onlyProducer(address _address){
       require(entityDB[_address].roles_assigned == roles.Producer);
       _;
    }
    
    modifier onlyDistributor(address _address){
        require(entityDB[_address].roles_assigned == roles.Distributor);
       _;
    }
    
    modifier onlyRetailer(address _address){
        require(entityDB[_address].roles_assigned == roles.Retailer);
       _;
    }
    
    constructor() public{
        prod_count = 0;
        dist_count = 0;
    }
    
    function producerEnterProductDetails(bytes32 id, bytes32 _producer_product_name,
    bytes32 _producer_product_info, bool _organic, uint _producer_product_quantity, 
    uint _producer_product_value, conditions _p_in)
    onlyProducer(msg.sender) public returns(bool)
    {
        ProductDB[id].producer_address = msg.sender;
        ProductDB[id].producer_product_name = _producer_product_name;
        ProductDB[id].producer_product_info = _producer_product_info;
        ProductDB[id].organic = _organic;
        ProductDB[id].producer_product_quantity = _producer_product_quantity;
        ProductDB[id].producer_product_value = _producer_product_value;
        ProductDB[id].p = _p_in;
        ProductDB[id].producer_timestamp = now;
        
        
        
        product_count.push(prod_count);
        product_id.push(id);
        product_quantity.push(_producer_product_quantity);
        product_name.push(_producer_product_name);
        product_condition.push(_p_in);
        product_price.push(_producer_product_value);
        product_producer_name.push(entityDB[msg.sender].name);
        product_producer_public_addr.push(msg.sender);
        product_producer_entity_info.push(entityDB[msg.sender].entity_info);
        
        
        
        prod_count ++;
        
        
        return true;
        
    }
    
    function displayForDistributor1() constant public returns(uint[], bytes32[], uint[],
    uint[], bytes32[], bool[], conditions[])
    {
        return(product_count, product_id, product_quantity, product_price, product_name, 
        product_organic, product_condition);
    }
    
    function dispalyForDistirbutor2() constant public returns(bytes32[], address[], 
    bytes32[])
    {
        return (product_producer_name, product_producer_public_addr, 
        product_producer_entity_info);
    }
    
    function distributorBuyProduct(bytes32 id, uint _quantity, address _addr, 
    conditions _p_in) onlyDistributor(msg.sender) public returns(bool)
    {
     require(entityDB[_addr].roles_assigned == entityDB[ProductDB[id].producer_address].roles_assigned);
     require(entityDB[msg.sender].amount_assigned >= (_quantity * ProductDB[id].producer_product_value)); 
     require(ProductDB[id].p == _p_in);
     
     entityDB[_addr].amount_assigned += _quantity * ProductDB[id].producer_product_value;
     entityDB[msg.sender].amount_assigned -= _quantity * ProductDB[id].producer_product_value;
     
     ProductDB[id].dist_addr.push(msg.sender);
     ProductDB[id].dist_timestamp.push(now);
     ProductDB[id].dist_names.push(entityDB[msg.sender].name);
     
     ProductDB[id].distributors[msg.sender].distributor_public_address = msg.sender;
     ProductDB[id].distributors[msg.sender].distributor_timestamp = now;
     ProductDB[id].distributors[msg.sender].distributor_product_quantity += _quantity;
     
     ProductDB[id].producer_product_quantity -= _quantity;
     
     Distcount.push(dist_count);
     DistProduct_id.push(id);
     DistProduct_name.push(ProductDB[id].producer_product_name);
     Dist_name.push(entityDB[msg.sender].name);
     Dist_quantity.push(_quantity);
     Dist_public_add.push(msg.sender);
     
     dist_count ++;
     
     return true;
    }
    
    function distributorProductDetails(bytes32 id, bytes32 _distributor_product_info,
    uint _distributor_product_value, conditions _d_in) onlyDistributor(msg.sender) public returns (bool)
    {
        ProductDB[id].distributors[msg.sender].distributor_product_info = 
        _distributor_product_info;
        
        ProductDB[id].distributors[msg.sender].distributor_product_value =
        _distributor_product_value;
        
        ProductDB[id].distributors[msg.sender].d = _d_in;
        
        Dist_product_price.push(_distributor_product_value);
        Dist_condition.push(_d_in);
        
        return true;
    }
    
    function displayForRetailer1() public constant returns(uint[], bytes32[], bytes32[], bytes32[],
    address[])
    {
    return( Distcount, DistProduct_id, DistProduct_name, Dist_name, Dist_public_add);
    }
    
    function displayForRetailer2() public constant returns( uint[], uint[], conditions[])
    {
    return(Dist_quantity, Dist_product_price, Dist_condition);
    }
    
    function RetailerBuyProduct(bytes32 id, uint _quantity, address _addr, 
    conditions _d_in) onlyRetailer(msg.sender) public returns(bool)
    {
      require(entityDB[_addr].roles_assigned == entityDB[ProductDB[id].distributors[_addr].distributor_public_address].roles_assigned);
     require(entityDB[msg.sender].amount_assigned >= (_quantity * ProductDB[id].distributors[_addr].distributor_product_value)); 
     require(ProductDB[id].distributors[_addr].d == _d_in);
     
     entityDB[_addr].amount_assigned += _quantity * ProductDB[id].distributors[_addr].distributor_product_value;
     entityDB[msg.sender].amount_assigned -= _quantity * ProductDB[id].distributors[_addr].distributor_product_value;
     
     ProductDB[id].ret_addr.push(msg.sender);
     ProductDB[id].ret_timestamp.push(now);
     ProductDB[id].ret_names.push(entityDB[msg.sender].name);
     
     ProductDB[id].retailers[msg.sender].retailer_public_address = msg.sender;
     ProductDB[id].retailers[msg.sender].retailer_timestamp = now;
     ProductDB[id].retailers[msg.sender].retailer_product_quantity += _quantity;
     
     ProductDB[id].distributors[_addr].distributor_product_quantity -= _quantity;
     
     return true;
    }
    
    function FDA(bytes32 id) constant public returns(bytes32, uint, bytes32[], uint[]
    , bytes32[], uint[]) 
    {
        return(entityDB[ProductDB[id].producer_address].name, ProductDB[id].producer_timestamp,
        ProductDB[id].dist_names,ProductDB[id].dist_timestamp,ProductDB[id].ret_names,
        ProductDB[id].ret_timestamp);
    }
    
    function general_public(bytes32 id) constant public returns(bytes32, bytes32
    , bytes32, bytes32, bool)
    {
        return(entityDB[ProductDB[id].producer_address].name,
                entityDB[ProductDB[id].producer_address].entity_info,
                ProductDB[id].producer_product_name,
                ProductDB[id].producer_product_info,
                ProductDB[id].organic);
    }
    
    function getAmount(address _addr) public constant returns(uint)
    {
        return (entityDB[_addr].amount_assigned);
    }
    
    
}













