pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

contract EtherEgg is ERC721Full, ERC721Mintable {
    constructor() ERC721Full("EtherEgg", "EGG") public {
    }

    /**
     * @notice Egg
     *
    */
    struct Egg {
      uint256 id;
      address minterAddress;
      bool badgeClass;
      uint256 eggNumber;
    }

    event eggLaid(uint256 _newEggId, address _newEggIssuer);
    event eggFound(uint256 _foundEggId, address _foundEggIssuer, address _foundEggHunter);

    /**
    * @notice Generate an eggId from a seed
    * @param _solution - the solution required to claim this Id
    */
    function generateId(string memory _solution) public returns (uint256) {
      address from = msg.sender;
      
      return generatedId
    // does hashing thing (including sender address & the message itself) to return Id
    }

    /**
    * @notice Generate a badgeId from a seed
    * @param _solution - the solution required to claim this Id
    */
    function layEgg(uint256 egg_id) public returns (bool) {
    // Verify sender is a minter
    // mint an Egg to that minter
    // Emit layEgg
    }

    function claimEgg(address minter, string memory guess) public returns (bool) {
    // Verify that the guess matches a token id
    // Verify that the minter address is the egg minter
    // Verify that the egg is unclaimed
    // Transfer the egg to the sender
    // Mark the egg as claimed
    // Emit an Egg Found event
    return true;
}

    function huntEgg(address minter, string memory guess) public view returns (bool) {
    // Verify that the guess matches a token id
    return true;
    }
}
