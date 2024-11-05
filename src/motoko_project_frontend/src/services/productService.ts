import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as shoppingCartIdlFactory } from '../../../declarations/motoko_project_backend/motoko_project_backend.did';
import { Principal } from '@dfinity/principal';
import { Messages } from '../constants/responseMessages'; // Sabitleri içe aktarın

// Canister ID'nizi buraya yazın
const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const agent = new HttpAgent();
const shoppingCartActor = Actor.createActor(shoppingCartIdlFactory, {
    agent,
    canisterId,
});

// Product tipinin tanımı
export type Product = {
    description: string;
    id: number;
    inStock: boolean;
    name: string;
    price: number;
};

// Ürün eklemek için bir fonksiyon
export const addProduct = async (name: string, price: number, description: string): Promise<number> => {
    try {
        const productId: number = await shoppingCartActor.addProduct(name, price, description) as number;
        return productId; 
    } catch (error: unknown) { 
        if (error instanceof Error) {
            throw new Error(Messages.ERROR_ADDING_PRODUCT(error.message));
        } else {
            throw new Error(Messages.UNKNOWN_ERROR_ADDING_PRODUCT(error));
        }
    }
};

// Tüm ürünleri almak için bir fonksiyon
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const products: Product[] = await shoppingCartActor.getallProducts() as Product[];
        return products;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(Messages.ERROR_FETCHING_PRODUCTS(error.message));
        } else {
            throw new Error(Messages.UNKNOWN_ERROR_FETCHING_PRODUCTS(error));
        }
    }
};

// Ürün almak için bir fonksiyon
export const getProduct = async (id: number): Promise<Product | null> => {
    try {
        const product: Product | null = await shoppingCartActor.getProduct(id) as Product | null;
        return product;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(Messages.ERROR_FETCHING_PRODUCT(error.message));
        } else {
            throw new Error(Messages.UNKNOWN_ERROR_FETCHING_PRODUCT(error));
        }
    }
};

// Stok durumu güncelleme fonksiyonu
export const updateStockStatus = async (id: number, inStock: boolean): Promise<boolean> => {
    try {
        const success: boolean = await shoppingCartActor.updateStockStatus(id, inStock) as boolean;
        return success;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(Messages.ERROR_UPDATING_STOCK(error.message));
        } else {
            throw new Error(Messages.UNKNOWN_ERROR_UPDATING_STOCK(error));
        }
    }
};