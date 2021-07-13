//Contract based on https://docs.openzeppelin.com/contracts/3.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.3;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";

contract DuoNFTV2 is OwnableUpgradeable, ERC721URIStorageUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;

    function initialize(string memory name, string memory symbol) public initializer {
        // __ERC721PresetMinterPauserAutoId_init(name, symbol, baseURI);
        __ERC721_init(name, symbol);
        __ERC721URIStorage_init();
        __Ownable_init();
    }

    function mintNFT(address recipient, string memory _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    function upgradeTest() public pure returns (string memory) {
        return "Upgrade success!";
    }

    // function _baseURI() internal view virtual override (ERC721PresetMinterPauserAutoIdUpgradeable, ERC721Upgradeable) returns (string memory) {
    //     return super._baseURI();
    // }

    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) internal override (ERC721PresetMinterPauserAutoIdUpgradeable, ERC721Upgradeable) {
    //     super._beforeTokenTransfer(from, to, tokenId);
    // }

    // function _burn(uint256 tokenId) internal override (ERC721URIStorageUpgradeable, ERC721Upgradeable) {
    //     super._burn(tokenId);
    // }

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     override(ERC721Upgradeable, ERC721PresetMinterPauserAutoIdUpgradeable)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }

    // function tokenURI(uint256 tokenId) public view  override (ERC721URIStorageUpgradeable, ERC721Upgradeable) returns (string memory) {
    //     return super.tokenURI(tokenId);
    // }

}
