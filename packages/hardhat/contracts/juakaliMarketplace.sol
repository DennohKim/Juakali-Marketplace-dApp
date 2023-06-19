
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(address, address, uint256) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract JuakaliMarketplace {
    uint256 internal productsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
   

    struct Product {
        address payable owner;
        string product_title;
        string image_url;
        string category;
        string location;
        uint256 price;
        uint256 sold;
    }
    bool private locked = false;

    modifier nonReentrant() {
        require(!locked, "Reentrant call.");
        locked = true;
        _;
        locked = false;
    }

    uint256 constant MAX_PRICE = 100000000000000000000;

    mapping(uint256 => Product) internal products;

    mapping(address => uint256) internal productsByUser;

    uint256 internal maxProductsPerUser = 10;

    address public admin;

    event ProductCreated(address indexed owner, string product_title, string image_url, string category, string location, uint256 price);
    event ProductDeleted(uint256 indexed productId);
    event ProductSold(uint256 indexed productId);


    constructor(){
      admin = msg.sender;
    }

    function setMaxProductsPerUser(uint256 _maxProductsPerUser) public {
        require(admin == msg.sender, "Unauthorized caller");
        require(
            _maxProductsPerUser > 0,
            "Maximum products per user must be greater than 0"
        );
        maxProductsPerUser = _maxProductsPerUser;
    }

    function writeProduct(
        string memory _product_title,
        string memory _image_url,
        string memory _category,
        string memory _location,
        uint256 _price
    ) public {
        require(bytes(_product_title).length > 0, "Product title cannot be empty");
        require(bytes(_image_url).length > 0, "Image URL cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_price > 0 && _price <= MAX_PRICE, "Invalid product price");

        require(
            productsByUser[msg.sender] < maxProductsPerUser,
            "Maximum products per user reached"
        );

        uint256 _sold = 0;
        products[productsLength] = Product(
            payable(msg.sender),
            _product_title,
            _image_url,
            _category,
            _location,
            _price,
            _sold
        );

        productsLength++;
        productsByUser[msg.sender]++;

        emit ProductCreated(msg.sender, _product_title, _image_url, _category, _location, _price);

    }

    function readProduct(
        uint _index
    )
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            products[_index].owner,
            products[_index].product_title,
            products[_index].image_url,
            products[_index].category,
            products[_index].location,
            products[_index].price,
            products[_index].sold
        );
    }


	// Buys a product from the marketplace
    function buyProduct(
        // Index of the product
        uint256 _index, uint256 _quantity
    ) public payable nonReentrant(){
        // Transfers the tokens from the buyer to the seller
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                // Sender's address is the buyer
                msg.sender,
                // Receiver's address is the seller
                products[_index].owner,
                // Amount of tokens to transfer is the price of the product
                products[_index].price * _quantity
            ),
            // If transfer fails, throw an error message
            "Transfer failed."
        );
        // Increases the number of times the product has been sold
        products[_index].sold+= _quantity;
    }


    function deleteProduct(uint256 _index) public {
    require(_index < productsLength, "Invalid product index");

    address owner = products[_index].owner;
    require(owner == msg.sender, "Only the owner can delete the product");

    // Update productsByUser mapping
    productsByUser[owner]--;

    // Swap the product to delete with the last product
    products[_index] = products[productsLength - 1];
    delete products[_index];
    productsLength--;
    
    emit ProductDeleted(_index);
}


    function getProductsByUser(
        address _user
    ) public view returns (Product[] memory) {
      require(_user != address(0));

        Product[] memory ownedProducts = new Product[](productsByUser[_user]);
        uint256 j = 0;
        for (uint256 i = 0; i < productsLength; i++) {
            if (products[i].owner == _user) {
                ownedProducts[j] = products[i];
                j++;
                if(j == productsByUser[_user]) break;
            }
        }

        return ownedProducts;
    }

      function getProductsLength() public view returns (uint256) {
        return (productsLength);
    }

}


