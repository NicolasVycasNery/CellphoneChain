// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Phones {
    struct Phone {
        uint256 id;
        string model_name;
        string brand_name;
        uint256 price;
    }

    Phone[] public phones;
    mapping(uint256 => address) public phoneToOwner;
    mapping(address => uint256) public ownerPhoneCount;

    function createPhone(
        string memory _model_name,
        string memory _brand_name,
        uint256 _price
    ) public {
        // an owner can only create 10 phones
        require(
            ownerPhoneCount[msg.sender] < 10,
            "You can only create 10 phones"
        );
        uint256 id = phones.length;
        phones.push(Phone({id: id, model_name: _model_name, brand_name: _brand_name, price: _price}));
        phoneToOwner[id] = msg.sender;
        ownerPhoneCount[msg.sender]++;
    }

    function getPhone(
        uint256 _id
    ) public view returns (uint256, string memory, string memory, uint256) {
        require(
            _id < phones.length,
            "Phone with this id does not exist"
        );
        return (
            phones[_id].id,
            phones[_id].model_name,
            phones[_id].brand_name,
            phones[_id].price
        );
    }

    function getPhonesFromOwner(
        address _owner
    ) public view returns (Phone[] memory) {
        if (ownerPhoneCount[_owner] == 0) {
            return new Phone[](0);
        }
        Phone[] memory result = new Phone[](ownerPhoneCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < phones.length; i++) {
            if (phoneToOwner[i] == _owner) {
                result[counter] = phones[i];
                counter++;
            }
        }
        return result;
    }

    function transferPhone(address _to, uint256 _id) public {
        require(
            msg.sender == phoneToOwner[_id],
            "You are not the owner of this phone"
        );
        ownerPhoneCount[msg.sender]--;
        phoneToOwner[_id] = _to;
        ownerPhoneCount[_to]++;
    }

    function deletePhone(uint256 _id) public {
        require(
            msg.sender == phoneToOwner[_id],
            "You are not the owner of this phone"
        );
        delete phones[_id];
        ownerPhoneCount[msg.sender]--;
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
    }
}