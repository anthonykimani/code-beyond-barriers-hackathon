// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

contract InuaSauti {
    IERC20Token celoContractAdress;

    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    using SafeMath for uint;
    uint amountToShare = 2;
    bytes32 public normalMember = keccak256("normal");
    bytes32 public verified = keccak256("verified");
    uint timeAllowedToVote = 7 days;
    uint time;

    enum Status {
        Approved,
        decline
    }

    struct storeAddressForApproved {
        address confirmAddress;
    }

    struct storeAddressForDecline {
        address declineAddress;
    }

    uint messageIndex = 0;
    struct storeMessage {
        string _message;
        uint _messageId;
        string _category;
        Status _status;
    }

    struct Votes {
        uint approveVotes;
        uint declineVotes;
    }

    mapping(uint => Votes) public votes;
    mapping(uint => storeMessage) public storeMessages;
    mapping(address => uint) public requirementForVerification;
    mapping(uint => storeAddressForApproved[]) public _storeAddressForApproved;
    mapping(uint => storeAddressForDecline[]) public _storeAddressForDecline;
    mapping(address => bytes32) public typeOfMemeber;

    constructor() {
        celoContractAdress = IERC20Token(cUsdTokenAddress);
    }

    function joinInuaSautiCommunity() public {
        typeOfMemeber[msg.sender] = normalMember;
    }

    function getMessagefromUshahidiApi(
        string calldata message,
        uint messageId,
        string calldata category
    ) public {
        storeMessages[messageIndex] = storeMessage(
            message,
            messageId,
            category,
            Status.decline
        );
        messageIndex++;
        time = block.timestamp;
    }

    function voteForInformationShared(bool decision, uint _indexId) public {
        require(
            (block.timestamp - time <= timeAllowedToVote),
            "can't vote to verify this information timehas already elapsed"
        );
        verifyUser(); //check if user if verify
        if (decision == true) {
            votes[_indexId].approveVotes++;
            _storeAddressForApproved[_indexId].push(
                storeAddressForApproved(msg.sender)
            );
        } else if (decision == false) {
            votes[_indexId].declineVotes++;
            _storeAddressForDecline[_indexId].push(
                storeAddressForDecline(msg.sender)
            );
        }
    }

    //todo
    function determineTheSupportOfInformation(uint _indexId) private {
        if (votes[_indexId].approveVotes > votes[_indexId].declineVotes) {
            storeMessages[_indexId]._status = Status.Approved;

            uint length = _storeAddressForApproved[_indexId].length;
            uint amount = msg.value.mul(1).div(length);
            for (uint i; i < length; i++) {
                requirementForVerification[
                    _storeAddressForApproved[_indexId][i].confirmAddress
                ]++;
                (bool success, ) = _storeAddressForApproved[_indexId][i]
                    .confirmAddress
                    .call{value: amount}("");
                require(success);
            }
        } else {
            uint length = _storeAddressForDecline[_indexId].length;

            storeMessages[_indexId]._status = Status.decline;
            for (uint i; i < length; i++) {
                requirementForVerification[
                    _storeAddressForDecline[_indexId][i].declineAddress
                ]++;
            }
        }
    }

    function determineTheTruthOfInformation(
        uint _indexId
    ) public payable returns (storeMessage memory) {
        //determineTheSupportOfInformation(_indexId);
        shareIncentive(_indexId);
        require(
            storeMessages[_indexId]._status == Status.Approved,
            "wrong information "
        );

        return storeMessages[_indexId];
    }

    function verifyUser() private {
        if (requirementForVerification[msg.sender] >= 10) {
            typeOfMemeber[msg.sender] = verified;
        }
    }

    function shareIncentive(uint _indexId) private {
        if (votes[_indexId].approveVotes > votes[_indexId].declineVotes) {
            storeMessages[_indexId]._status = Status.Approved;

            uint length = _storeAddressForApproved[_indexId].length;
            uint amount = amountToShare.mul(1).div(length);
            for (uint i; i < length; i++) {
                celoContractAdress.transferFrom(
                    cUsdTokenAddress,
                    _storeAddressForApproved[_indexId][i].confirmAddress,
                    amount
                );
                requirementForVerification[
                    _storeAddressForApproved[_indexId][i].confirmAddress
                ]++;
            }
        } else {
            uint length = _storeAddressForDecline[_indexId].length;
            uint amount = amountToShare.mul(1).div(length);

            storeMessages[_indexId]._status = Status.decline;
            for (uint i; i < length; i++) {
                celoContractAdress.transferFrom(
                    cUsdTokenAddress,
                    _storeAddressForApproved[_indexId][i].confirmAddress,
                    amount
                );
                requirementForVerification[
                    _storeAddressForApproved[_indexId][i].confirmAddress
                ]++;
            }
        }
    }

    receive() external payable {}

    fallback() external payable {}
}
