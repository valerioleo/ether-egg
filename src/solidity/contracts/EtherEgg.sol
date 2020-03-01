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

  event EggLaid(uint256 _newEggId, address _newEggIssuer);
  event EggFound(uint256 _foundEggId, address _foundEggIssuer, address _foundEggHunter, string guess, uint256 _foundEggNumber);

  /**
  * @notice Generate an eggId from a solution
  * @param solution - the solution required to claim this Id
  */
  function generateId(string memory solution) public view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(solution, address(this))));
  // does hashing thing (including sender address & the message itself) to return Id
  }

  /**
  * @notice Check if egg is claimable
  * @param solution - the solution required to claim this Id
  */
  function isEggClaimable(string memory solution) public view returns (bool) {

    uint256 eggId = generateId(solution);

    if (_exists(eggId)) {
      address owner = ownerOf(eggId);

      return address(this) == owner;
    }
    return false;
  }

  /**
  * @notice Lay an egg with an ID
  * @param eggId - the Egg id for the egg being laid
  */
  function layEgg(uint256 eggId) public returns (bool) {
    uint256 _egg_number = allEggs.length + 1;
    eggNumber = eggNumber + 1;

    Egg memory _egg = Egg({
      id: eggId,
      bunnyAddress: msg.sender,
      eggNumber: _egg_number
    });

    eggs[eggId] = _egg;
    allEggs.push(eggId);
    bunnyEggs[msg.sender].push(_egg);

    _mint(address(this), eggId);

    emit EggLaid(eggId, msg.sender);

    return true;

  }

  /**
  * @notice Claim an egg with a guess
  * @param guess - the guess string to claim an egg
  */
  function claimEgg(string memory guess) public {
    require(isEggClaimable(guess));
    uint256 claimedEggId = generateId(guess);

    _transferFrom(address(this), msg.sender, claimedEggId);

    _setTokenURI(claimedEggId, guess);

    emit EggFound(claimedEggId, eggs[claimedEggId].bunnyAddress, msg.sender, guess, eggs[claimedEggId].eggNumber);
    eggsFound = eggsFound + 1;
  }
}
