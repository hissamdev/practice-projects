"use client";

import { Products } from "../types/productTypes";
import { useCartStore } from "./zustand/cart-store";

export default function Cart() {
    return (
        <div className="w-120 h-80">
            <div></div>
        </div>
    );
}

type ButtonProps = {
    product: Products[0];
};
export function AddToCart({ product }: ButtonProps) {
    const addItem = useCartStore((state) => state.addItem);

    return <button onClick={() => addItem(product)}>Add to Cart</button>;
}
