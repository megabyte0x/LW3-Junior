// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MegabytePunks is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string _baseTokenURI;

    uint256 public _price = 0.01 ether;

    bool public _paused;

    uint256 public maxTokenIds = 10;

    uint256 public tokenIds;

    modifier whenNotPaused() {
        require(!_paused, "Sale is paused");
        _;
    }

    constructor(string memory baseTokenURI) ERC721("MegabytePunks", "MBP") {
        _baseTokenURI = baseTokenURI;
    }

    function mint() public payable whenNotPaused {
        require(tokenIds < maxTokenIds, "Max NFTs minted");
        require(msg.value >= _price, "Amount insufficient");

        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();

        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }

    function withdraw() public payable onlyOwner {
        uint256 _amount = address(this).balance;

        require(_amount > 0, "Amount is 0");
        address _owner = owner();

        (bool sent, ) = _owner.call{value: _amount}("");
        require(sent, "Error in Withdrawal");
    }

    receive() external payable {}

    fallback() external payable {}
}
