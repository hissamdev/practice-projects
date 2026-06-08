import { Products } from "@/src/types/productTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartProduct = Products[0] & {
    qty: number;
};

type CartStore = {
    items: CartProduct[];
    addItem: (product: Products[0]) => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const cartProducts = get().items;
                const exists = cartProducts.find((i) => i.id === product.id);
                if (exists) {
                    set({
                        items: cartProducts.map((item) =>
                            item.id === product.id
                                ? { ...item, qty: (item.qty += 1) }
                                : item,
                        ),
                    });
                } else {
                    set({
                        items: [...cartProducts, { ...product, qty: 1 }],
                    });
                }
            },
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
