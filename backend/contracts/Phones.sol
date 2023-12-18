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

    function createPhone(
        string memory _model_name,
        string memory _brand_name,
        uint256 _price
    ) public {
        // an owner can only create 10 phones
        require(
            ownerToPhones[msg.sender].length < 10,
            "You can only create 10 phones"
        );
        uint256 id = phones.length;
        phones.push(Phone(id, _model_name, _brand_name, _price, msg.sender));
        phoneToOwner[id] = msg.sender;
        ownerToPhones[msg.sender].push(id);
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
        if (msg.sender == _to) {
            revert("You already own this phone");
        }
        if (ownerToPhones[_to].length == 10) {
            revert("The receiver already owns 10 phones");
        }
        // change owner
        phoneToOwner[_id] = _to;
        // add phone to receiver
        ownerToPhones[_to].push(_id);
        // remove phone from sender
        for (uint256 i = 0; i < ownerToPhones[msg.sender].length; i++) {
            if (ownerToPhones[msg.sender][i] == _id) {
                delete ownerToPhones[msg.sender][i];
            }
        }
        // edit phone owner field
        phones[_id].owner = _to;
    }

    function deletePhone(uint256 _id) public {
        require(
            msg.sender == phoneToOwner[_id],
            "You are not the owner of this phone"
        );
        delete phones[_id];
        delete phoneToOwner[_id];
        // remove phone from sender
        for (uint256 i = 0; i < ownerToPhones[msg.sender].length; i++) {
            if (ownerToPhones[msg.sender][i] == _id) {
                delete ownerToPhones[msg.sender][i];
            }
        }
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
