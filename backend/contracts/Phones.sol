// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Phones {
    struct Phone {
        uint256 id;
        string model_name;
        string brand_name;
        uint256 price;
        address owner;
    }

    Phone[] public phones;
    mapping(uint256 => address) public phoneToOwner;
    mapping(address => uint256[]) public ownerToPhones;

    // Events
    event PhoneCreated(
        uint256 id,
        string model_name,
        string brand_name,
        uint256 price,
        address owner
    );
    event PhoneTransferred(uint256 id, address from, address to);
    event PhoneDeleted(uint256 id, address owner);
    event PhoneAcquired(uint256 id, address owner);
    event PhoneUpdated(
        uint256 id,
        string model_name,
        string brand_name,
        uint256 price,
        address owner
    );

    uint constant MAX_PHONES = 10;

    function createPhone(
        string memory _model_name,
        string memory _brand_name,
        uint256 _price
    ) public {
        // an owner can only create a phone if they don't already own the maximum number of phones
        require(
            ownerToPhones[msg.sender].length < MAX_PHONES,
            "You already own the maximum number of phones"
        );
        uint256 id = phones.length;
        phones.push(Phone(id, _model_name, _brand_name, _price, msg.sender));
        phoneToOwner[id] = msg.sender;
        ownerToPhones[msg.sender].push(id);

        emit PhoneCreated(id, _model_name, _brand_name, _price, msg.sender);
    }

    function getPhone(
        uint256 _id
    )
        public
        view
        returns (uint256, string memory, string memory, uint256, address)
    {
        require(_id < phones.length, "Phone with this id does not exist");
        return (
            phones[_id].id,
            phones[_id].model_name,
            phones[_id].brand_name,
            phones[_id].price,
            phones[_id].owner
        );
    }

    function getPhonesFromOwner(
        address _owner
    ) public view returns (Phone[] memory) {
        if (ownerToPhones[_owner].length == 0) {
            return new Phone[](0); // return empty array
        }
        uint256[] memory result = ownerToPhones[_owner];
        Phone[] memory phonesFromOwner = new Phone[](result.length);
        for (uint256 i = 0; i < result.length; i++) {
            phonesFromOwner[i] = phones[result[i]];
        }
        return phonesFromOwner;
    }

    function getPhonesPage(
        uint256 _page,
        uint256 _perPage
    ) public view returns (Phone[] memory) {
        if (_page == 0 || _perPage == 0) {
            return new Phone[](0); // return empty array
        }
        uint256 start = (_page - 1) * _perPage;
        uint256 end = start + _perPage;
        if (end > phones.length) {
            end = phones.length;
        }
        Phone[] memory phonesPage = new Phone[](end - start);
        for (uint256 i = start; i < end; i++) {
            phonesPage[i - start] = phones[i];
        }
        return phonesPage;
    }

    function transferPhone(address _to, uint256 _id) public {
        require(
            msg.sender == phoneToOwner[_id],
            "You are not the owner of this phone"
        );
        require(
            ownerToPhones[_to].length < MAX_PHONES,
            "You already own the maximum number of phones"
        );
        require(msg.sender != _to, "You already own this phone");

        // change owner
        phoneToOwner[_id] = _to;
        // add phone to receiver
        ownerToPhones[_to].push(_id);
        // remove phone from sender
        uint256 lastIndex = ownerToPhones[msg.sender].length - 1;
        for (uint256 i = 0; i <= lastIndex; i++) {
            if (ownerToPhones[msg.sender][i] == _id) {
                ownerToPhones[msg.sender][i] = ownerToPhones[msg.sender][
                    lastIndex
                ];
                ownerToPhones[msg.sender].pop();
                break;
            }
        }
        // edit phone owner field
        phones[_id].owner = _to;

        emit PhoneTransferred(_id, msg.sender, _to);
    }

    function deletePhone(uint256 _id) public {
        require(
            msg.sender == phoneToOwner[_id],
            "You are not the owner of this phone"
        );
        // remove phone from phoneToOwner
        delete phoneToOwner[_id];
        // remove phone from ownerToPhones
        uint256 lastIndex = ownerToPhones[msg.sender].length - 1;
        for (uint256 i = 0; i <= lastIndex; i++) {
            if (ownerToPhones[msg.sender][i] == _id) {
                ownerToPhones[msg.sender][i] = ownerToPhones[msg.sender][
                    lastIndex
                ];
                ownerToPhones[msg.sender].pop();
                break;
            }
        }
        // make the phone ownerless (set owner to 0x0)
        phones[_id].owner = address(0);

        emit PhoneDeleted(_id, msg.sender);
    }

    function getPhoneCount() public view returns (uint256) {
        return phones.length;
    }

    function acquireOwnerlessPhone(uint256 _id) public {
        require(_id < phones.length, "This phone does not exist");
        require(
            phones[_id].owner == address(0),
            "This phone already has an owner"
        );
        require(
            ownerToPhones[msg.sender].length < MAX_PHONES,
            "You already own the maximum number of phones"
        );

        phoneToOwner[_id] = msg.sender;
        ownerToPhones[msg.sender].push(_id);
        phones[_id].owner = address(msg.sender);

        emit PhoneAcquired(_id, msg.sender);
    }

    function updatePhone(
        uint256 _id,
        string memory _model_name,
        string memory _brand_name,
        uint256 _price
    ) public {
        require(
            msg.sender == phoneToOwner[_id],
            "You are not the owner of this phone"
        );
        phones[_id].model_name = _model_name;
        phones[_id].brand_name = _brand_name;
        phones[_id].price = _price;

        emit PhoneUpdated(_id, _model_name, _brand_name, _price, msg.sender);
    }
}
