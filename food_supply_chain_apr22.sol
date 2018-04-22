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
    
    function getEntityInfo()
    public constant returns(uint[],address[],roles[],bytes32[])
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
