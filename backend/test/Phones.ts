import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { Phones, Phones__factory } from "../typechain-types";

describe('Phones', () => {
    let Phones: Phones__factory;
    let phones: Phones;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
    let addrs: Signer[];

    beforeEach(async () => {
        const phonesFactory = await ethers.getContractFactory('Phones');
        phones = (await phonesFactory.deploy()) as Phones;
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });

    it('should allow to create a phone', async () => {
        // set signer to owner
        await phones.connect(owner).createPhone('iPhone', 'Apple', 1000);
        const [id, model_name, brand_name, price] = await phones.getPhone(0);
        expect(id).to.eq(0);
        expect(model_name).to.eq('iPhone');
        expect(brand_name).to.eq('Apple');
        expect(price).to.eq(1000);
    });

    it('should allow to get a phone by id', async () => {
        await phones.connect(owner).createPhone('iPhone', 'Apple', 1000);
        const [id, model_name, brand_name, price] = await phones.getPhone(0);
        expect(id).to.eq(0);
        expect(model_name).to.eq('iPhone');
        expect(brand_name).to.eq('Apple');
        expect(price).to.eq(1000);
    });

    it('should allow to transfer a phone to a new owner', async () => {
        await phones.connect(owner).createPhone('iPhone', 'Apple', 1000);
        await phones.connect(owner).transferPhone(await addr1.getAddress(), 0);
        const [id, model_name, brand_name, price, ownerAddr1] = await phones.getPhone(0);
        expect(id).to.eq(0);
        expect(model_name).to.eq('iPhone');
        expect(brand_name).to.eq('Apple');
        expect(price).to.eq(1000);
        expect(ownerAddr1).to.eq(await addr1.getAddress());
    });

    it('should allow to get a phone by id', async () => {
        await phones.connect(owner).createPhone('iPhone', 'Apple', 1000);
        const [id, model_name, brand_name, price, ownerAddr] = await phones.getPhone(0);
        expect(id).to.eq(0);
        expect(model_name).to.eq('iPhone');
        expect(brand_name).to.eq('Apple');
        expect(price).to.eq(1000);
        expect(ownerAddr).to.eq(await owner.getAddress());
    });

    it('should allow remove a phone from a owner', async () => {
        await phones.connect(owner).createPhone('iPhone', 'Apple', 1000);
        await phones.connect(owner).deletePhone(0);
        const [id, model_name, brand_name, price, zeroAddr] = await phones.getPhone(0);
        expect(id).to.eq(0);
        expect(model_name).to.eq('iPhone');
        expect(brand_name).to.eq('Apple');
        expect(price).to.eq(1000);
        expect(zeroAddr).to.eq(ethers.ZeroAddress);
    });

    it('should allow to get a ownerless phone by id', async () => {
        await phones.connect(owner).createPhone('iPhone', 'Apple', 1000);
        await phones.connect(owner).deletePhone(0);

        await phones.connect(owner).acquireOwnerlessPhone(0);
        const phonesFrowOwner = await phones.getPhonesFromOwner(await owner.getAddress());
        const [id1,
            model_name1,
            brand_name1,
            price1,
            ownerAddr
        ] = phonesFrowOwner[0]
        expect(id1).to.eq(0);
        expect(model_name1).to.eq('iPhone');
        expect(brand_name1).to.eq('Apple');
        expect(price1).to.eq(1000);
        expect(ownerAddr).to.eq(await owner.getAddress());
    });
});