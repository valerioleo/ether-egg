pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract EtherEgg is ERC721Full("EtherEgg", "EGG") {
  /**
   * @notice Egg
   *
  */
  struct Egg {
    uint256 id;
    address bunnyAddress;
    uint256 eggNumber;
  }

  // @notice All Eggs in existence
  uint256[] public allEggs;

  // @notice The total number of eggs and found eggs
  uint256 public eggNumber;
  uint256 public eggsFound;

  // @notice A mapping from egg IDs to eggs, and bunny Addresses to the eggs they have minted
  mapping (uint256 => Egg) public eggs;
  mapping (address => Egg[]) public bunnyEggs;

  event eggLaid(uint256 _newEggId, address _newEggIssuer);
  event eggFound(uint256 _foundEggId, address _foundEggIssuer, address _foundEggHunter);

  /**
  * @notice Generate an eggId from a solution
  * @param _solution - the solution required to claim this Id
  */
  function generateId(string memory _solution) public view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(_solution)));
  // does hashing thing (including sender address & the message itself) to return Id
  }

  /**
  * @notice Check if egg is claimable
  * @param _solution - the solution required to claim this Id
  */
  function isEggClaimable(string memory _solution) public view returns (bool) {

    uint256 eggId = generateId(_solution);
    address owner = ownerOf(eggId);

    return address(this) == owner;
  }

  /**
  * @notice Lay an egg with an ID
  * @param egg_id - the egg_id for the egg being laid
  */
  function layEgg(uint256 egg_id) public returns (bool) {
    uint256 _egg_number = allEggs.length + 1;
    eggNumber = eggNumber + 1;

    Egg memory _egg = Egg({
      id: egg_id,
      bunnyAddress: msg.sender,
      eggNumber: _egg_number
    });

    eggs[egg_id] = _egg;
    allEggs.push(egg_id);
    bunnyEggs[msg.sender].push(_egg);

    _mint(address(this), egg_id);

    emit eggLaid(egg_id, msg.sender);

    return true;

  }

  /**
  * @notice Claim an egg with a guess
  * @param guess - the guess string to claim an egg
  */
  function claimEgg(string memory guess) public returns (bool) {

  if (isEggClaimable(guess)) {

  uint256 claimedEggId = generateId(guess);

  safeTransferFrom(address(this), msg.sender, claimedEggId);

  _setTokenURI(claimedEggId, guess);

  emit eggFound(claimedEggId, eggs[claimedEggId].bunnyAddress, msg.sender);
  eggsFound = eggsFound + 1;

  return true;
}
  return false;
}
}
