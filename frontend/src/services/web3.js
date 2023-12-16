

import Swal from 'sweetalert2';
import contractABI from '../contracts/Phones.sol/Phones.json';
import { ethers } from 'ethers';

const RPC_URL = "http://localhost:8545";
const ContractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";

async function loadWeb3() {
    let web3Provider;
    // Modern dapp browsers...
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3Provider = window.ethereum;
        } catch {
            alert("User denied account access...");
            return;
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please install metamask to use this dApp!',
        })
        throw new Error("Please install metamask to use this dApp!");
    }

    const provider = new ethers.JsonRpcProvider(
        RPC_URL
    )
    const signer = await provider.getSigner(
        window.ethereum.selectedAddress
    );
    return {
        signer,
        provider,
        web3Provider
    }
}

async function getSingerContract() {
    const { abi } = contractABI;
    const { provider } = await loadWeb3();
    // load contract
    const contract = new ethers.Contract(ContractAddress, abi, provider);
    return contract;
}

async function getProviderContract() {
    const { abi } = contractABI;
    const { signer } = await loadWeb3();
    // load contract
    const contract = new ethers.Contract(ContractAddress, abi, signer);
    return contract;
}

export async function createPhone(model, brand, price) {
    const contract = await getProviderContract();
    const tx = await contract.createPhone(model, brand, price);
    await tx.wait();
    return tx.hash;
}

export async function getPhone(id) {
    const contract = await getSingerContract();
    const phone = await contract.getPhone(id);
    const [_id, model, brand, price, owner] = phone;
    const phoneObj = {
        id: _id.toString(),
        model,
        brand,
        price: price.toString(),
        owner,
    }
    return phoneObj;

}

export async function getPhonesFromOwner(address) {
    const contract = await getSingerContract();
    const phones = await contract.getPhonesFromOwner(address);
    const phonesObj = phones.map(phone => {
        console.log(phone);
        const [_id, model, brand, price, owner] = phone;
        return {
            id: _id.toString(),
            model,
            brand,
            price: price.toString(),
            owner,
        }
    })
    return phonesObj;
}

export async function getPhonesPage(page, limit) {
    const contract = await getSingerContract();
    const phones = await contract.getPhonesPage(page, limit);
    const phonesObj = phones.map(phone => {
        const [id, model, brand, price, owner] = phone;
        return {
            id: id.toString(),
            model,
            brand,
            price: price.toString(),
            owner,
        }
    })
    return phonesObj;
}

export async function transferPhone(address, id) {
    const contract = await getProviderContract();
    const tx = await contract.transferPhone(address, id);
    await tx.wait();
    return tx.hash;
}

export async function deletePhone(id) {
    const contract = await getProviderContract();
    const tx = await contract.deletePhone(id);
    await tx.wait();
    return tx.hash;
}

export async function updatePhone(id, model, brand, price) {
    const contract = await getProviderContract();
    const tx = await contract.updatePhone(id, model, brand, price);
    await tx.wait();
    return tx.hash;
}
