import { User } from "firebase/auth";

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    vendor: string;
    market: string;
    itemId: string;
};

type Order = {
    id: string;
    items: CartItem[];
    total: number;
    status: string;
    deliveryDate: string;
    deliveryTime: string;
    deliveryAddress: string;
    orderedBy: User;
    vendor: string;
    market: string;
    orderStatus: string;
}

type Item = {

}

type Market = {
    
}

type Vendor = {
    id: string;
    name: string;
    
}

export { CartItem, Order }