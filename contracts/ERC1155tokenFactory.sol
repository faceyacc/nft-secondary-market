pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";



contract ERC1155Factory is ERC1155, ERC1155Holder  {
    string symbol;
    // uint256 public tokenInCirculation;
    constructor(string memory _symbol) ERC1155("") {
        // tokenInCirculation = 0;
        symbol = _symbol;
        
    }
    
    function getSymbol() public view returns(string memory) {
        return symbol;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    function mint(uint256 tokenId, uint256 amountOfTokens) public payable  {
        // for(uint256 i = 0; i < amount; i++) {
        //     // _mint(address account, uint256 id, uint256 amount, bytes data)
        //     _mint(msg.sender, tokenInCirculation, price, "");
        //     tokenInCirculation++;
        // }
            _mint(msg.sender, tokenId, amountOfTokens, "");
            
    }
    
    function transfer(address to, uint256 id, uint256 amount, bytes memory data) public payable  {
        
        // setApprovalForAll(address operator, bool approved)
        setApprovalForAll(to, true);
        
        // safeTransferFrom(from, to, id, amount, data)
        safeTransferFrom(msg.sender, to, id, amount, data);
        
        //onERC1155Received(operator, from, id, value, data)
        onERC1155Received(msg.sender, msg.sender, id, amount, data);

    }
    

    
    
    
    
   
}
