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
    uint fixedAmount = 1 ether;

    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    using SafeMath for uint;
    uint amountToShare = 2;
    bytes32 public normalMember = keccak256("normal");
    bytes32 public verified = keccak256("verified");
    uint deadline;
    address payable public ushahidi;

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
        uint _deadline;
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
    mapping(address => bool) public inuaSautiMembers;

    constructor() {
        celoContractAdress = IERC20Token(cUsdTokenAddress);
    }

    event messageTrue(string message, string category);

    event messageFalse(string message, string category);
    event PaymentTransfered(
        address indexed sender,
        address indexed _ushahidi,
        uint256 amount
    );

    modifier checkIfMember() {
        require(
            inuaSautiMembers[msg.sender] = true,
            "Not a member of InuaSauti organisation!"
        );
        _;
    }

    function joinInuaSautiCommunity() public {
        inuaSautiMembers[msg.sender] = true;
        typeOfMemeber[msg.sender] = normalMember;
    }

    function getMessagefromUshahidiApi(
        string calldata message,
        uint messageId,
        string calldata category
    ) public {
        deadline = block.timestamp + 7 days;
        storeMessages[messageIndex] = storeMessage(
            message,
            messageId,
            category,
            Status.decline,
            deadline
        );
        messageIndex++;
    }

    function voteForInformationShared(
        bool decision,
        uint _indexId
    ) public checkIfMember {
        require(
            storeMessages[_indexId]._deadline <= block.timestamp,
            "Deadline for voting on this proposal has already passed!"
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
    function determineTheSupportOfInformation(uint _indexId) public payable {
        if (votes[_indexId].approveVotes > votes[_indexId].declineVotes) {
            storeMessages[_indexId]._status = Status.Approved;

            uint length = _storeAddressForApproved[_indexId].length;
            // Is line 137 to 146 necessary
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
            emit messageTrue(
                storeMessages[_indexId]._message,
                storeMessages[_indexId]._category
            );
        } else {
            uint length = _storeAddressForDecline[_indexId].length;

            storeMessages[_indexId]._status = Status.decline;
            for (uint i; i < length; i++) {
                requirementForVerification[
                    _storeAddressForDecline[_indexId][i].declineAddress
                ]++;
            }
            emit messageFalse(
                storeMessages[_indexId]._message,
                storeMessages[_indexId]._category
            );
        }
    }

    function determineTheTruthOfInformation(
        uint _indexId
    ) public payable returns (storeMessage memory) {
        // determineTheSupportOfInformation(_indexId);
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

    //return all information in the dao
    function getAllInformation()
        public
        view
        returns (storeMessage[] memory props)
    {
        props = new storeMessage[](messageIndex);
        for (uint256 index = 0; index < messageIndex; index++) {
            props[index] = storeMessages[index];
        }
    }

    function getApprovedVotes(uint _index) public view returns (uint) {
        return votes[_index].approveVotes;
    }

    function getdeclineVotes(uint _index) public view returns (uint) {
        return votes[_index].declineVotes;
    }

    function getInformationForOneMessage(
        uint _index
    ) public view returns (storeMessage memory) {
        return storeMessages[_index];
    }

    //set ushahidi address
    function setUshahidiAddress(address payable Ushahidi) public {
        ushahidi = Ushahidi;
    }

    //contribute to the ushahidi
    function contributeToUshadi(uint amountToContribute) external payable {
        celoContractAdress.transferFrom(
            msg.sender,
            ushahidi,
            amountToContribute
        );
        emit PaymentTransfered(msg.sender, ushahidi, amountToContribute);
    }

    function getFixedAmount() public view returns (uint) {
        return fixedAmount;
    }

    receive() external payable {}

    fallback() external payable {}
}
