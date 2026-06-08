"use client";

export default function Cart() {
    return (
        <div className="w-120 h-80">
            <div></div>
        </div>
    );
}

type ButtonProps = {
    id: string;
};
export function AddToCart({ id }: ButtonProps) {
    const handleAddCart = () => {
        console.log(id);
    };
    return <button onClick={handleAddCart}>Add to Cart</button>;
}
