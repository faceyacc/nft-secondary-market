pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "./ERC1155tokenFactory.sol";




contract DEX is ERC1155Holder, ERC1155 {
    
    uint256 public fee = 2000000000000000000 wei;
    
    using SafeMath for uint256;
    // IERC1155Receiver token;
    ERC1155Factory coins;
    
    
    // Tracks liquidity of dex and individual addresses.
    uint public totalLiquidity;
    mapping (address => uint256) public liquidity;
    
    
    uint256 token_id;
    constructor(address token_addr, uint256 _token_id) ERC1155("") {
        coins = ERC1155Factory(token_addr);
        token_id = _token_id;
    }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    function init(uint256 id, uint256 amount, bytes memory data) public payable returns (uint256) {
        require(totalLiquidity==0, "DEX:init - already has liquidity"); // Dex starts empty
        totalLiquidity = address(this).balance;
        liquidity[msg.sender] = totalLiquidity;
        onERC1155Received(msg.sender, msg.sender, id, amount, data);
        return totalLiquidity;
    }
    
    function balance() public view returns(uint256) {
        return coins.balanceOf(address(this), token_id);
    }
    
    function balanceETH() public view returns(uint256) {
        return address(this).balance;
    }
    
    function getPrice(uint256 eth_amount) public view returns(uint256) {
        uint256 token_reserve = coins.balanceOf(address(this), token_id);
        return price(eth_amount, address(this).balance.sub(eth_amount), token_reserve);
    }
    
    
    // Uses ration of the input vs. outpus reserve to calculate the price. 
    // This function implements the x * y = k algorithm.
    // CAN MAKE THIS FUNCTION "view" INSTEAD OF "pure"
    function price(uint256 input_amount, uint256 input_reserve, uint256 output_reserve) public pure returns (uint256) {
        uint256 input_amount_with_fee = input_amount.mul(997);
        uint256 numerator = input_amount_with_fee.mul(output_reserve);
        uint256 denominator = input_reserve.mul(1000).add(input_amount_with_fee);
        return  numerator / denominator;
    }
    
    function innerTransfer(ERC1155Factory coin, uint256 amount) public payable  {
        
       
        // Moves amount tokens from the caller’s account to recipient.
        // require(token.transfer(msg.sender, tokens_bought));
        
        // setApprovalForAll(address operator, bool approved)
        coin.setApprovalForAll(msg.sender, true);
        
        // safeTransferFrom(from, to, id, amount, data)
        coin.safeTransferFrom(address(this), msg.sender, token_id, amount, "[]");

    }
    
    function ethToToken(uint256 eth_amount) public payable returns (uint256) {
        uint256 token_reserve = coins.balanceOf(address(this), token_id);
        uint256 tokens_bought = price(eth_amount, address(this).balance.sub(eth_amount), token_reserve);
        innerTransfer(coins, tokens_bought);
        return tokens_bought;
    }
    
    
    function depositUsingVasriable() public payable {
        require(msg.value == fee);
        fee = msg.value;
    }
    
    function getSymbol() public view returns(string memory) {
        return coins.getSymbol();
    }
    
    
    
    function tokenToEth(uint256 token_amount) public returns (uint256) {
        uint256 token_reserve = coins.balanceOf(address(this), token_id);
        uint256 eth_bought = price(token_amount, token_reserve, address(this).balance);
        (bool sent, ) = msg.sender.call{value: eth_bought}("");
        require(sent, "Failed to send user eth.");
        

         // transferFrom(sender, recipient, amount)
        // require(token.transferFrom((msg.sender), address(this), tokens));
        
        
         // setApprovalForAll(address operator, bool approved)
        coins.setApprovalForAll(msg.sender, true);
        
        // safeTransferFrom(from, to, id, amount, data)
        coins.safeTransferFrom(msg.sender, address(this), token_id, token_amount, "[]");
        

        // innerTransfer(coins, token_amount);
        return eth_bought;
    }
    
    function deposit() public payable returns (uint256) {
        uint256 eth_reserve = address(this).balance.sub(msg.value);
        uint256 token_reserve = coins.balanceOf(address(this), token_id);
        uint256 token_amount = (msg.value.mul(token_reserve) / eth_reserve).add(1);
        uint256 liquidity_minted = msg.value.mul(totalLiquidity) / eth_reserve;
        liquidity[msg.sender] = liquidity[msg.sender].add(liquidity_minted);
        totalLiquidity = totalLiquidity.add(liquidity_minted);
        

        
        // setApprovalForAll(address operator, bool approved)
        coins.setApprovalForAll(msg.sender, true);
        
        // safeTransferFrom(from, to, id, amount, data)
        coins.safeTransferFrom(msg.sender, address(this), token_id, token_amount, "[]");
        
        
        return liquidity_minted;
    }
    
    // // function withdraw(uint256 amount) public returns (uint256, uint256) {
    // //     uint256 token_reserve = token.balanceOf(address(this));
    // //     uint256 eth_amount = amount.mul(address(this).balance) / totalLiquidity;
    // //     uint256 token_amount = amount.mul(token_reserve) / totalLiquidity;
    // //     liquidity[msg.sender] = liquidity[msg.sender].sub(eth_amount);
    // //     totalLiquidity = totalLiquidity.sub(eth_amount);
    // //     (bool sent, ) = msg.sender.call{value: eth_amount}("");
    // //     require(sent, "Failed to send user eth.");
    // //     require(token.transfer(msg.sender, token_amount));
    // //     return (eth_amount, token_amount);
    // // }
    
    

    
}