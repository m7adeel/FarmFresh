import { CartItem } from '@/types'
import { create } from 'zustand'

export interface CartStore {
    cart: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (item: CartItem) => void;
    emptyCart: () => void;
}

const dummyData: CartItem[] = [
    {
        id: '1',
        name: 'Fresh Organic Strawberries',
        price: 4.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=2940&auto=format&fit=crop',
        vendor: 'Berry Good Farm',
        market: 'Downtown Farmers Market',
        itemId: 'i-1'
    },
    {
        id: '2',
        name: 'Artisanal Sourdough Bread',
        price: 6.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2940&auto=format&fit=crop',
        vendor: 'Crusty Corner Bakery',
        market: 'Downtown Farmers Market',
        itemId: 'i-2'
    },
    {
        id: '3',
        name: 'Farm Fresh Eggs (Dozen)',
        price: 5.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1569288052389-dac9b0ac9efd?q=80&w=2940&auto=format&fit=crop',
        vendor: 'Happy Hens Farm',
        market: 'Downtown Farmers Market',
        itemId: 'i-3'
    },
]

const useCartStore = create<CartStore>((set) => ({
    cart: [...dummyData],
    addItemToCart: (item: CartItem) => {
        set((state: { cart: CartItem[] }) => {
            const existingItemIndex = state.cart.findIndex(
                (cartItem: CartItem) => cartItem.itemId === item.itemId
            );

            if (existingItemIndex === -1) {
                // Item doesn't exist, add it to cart
                return {
                    cart: [...state.cart, {
                        ...item,
                        quantity: 1
                    }]
                };
            } else {
                // Item exists, update its quantity
                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
                return {
                    cart: updatedCart
                };
            }
        });
    },
    removeItemFromCart: (item: CartItem) => {
        set((state: { cart: CartItem[] }) => {
            const existingItemIndex = state.cart.findIndex(
                (cartItem: CartItem) => cartItem.itemId === item.itemId
            );


            if (existingItemIndex === -1) {
                return { cart: [...state.cart] }
            } else {
                // Item exists, update its quantity
                let updatedCart = [...state.cart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity - 1
                };

                updatedCart = updatedCart.filter((item: CartItem) => item.quantity > 0)

                return {
                    cart: updatedCart
                };
            }
        });
    },
    emptyCart: () => set({ cart: [] }),
}))

export default useCartStore;