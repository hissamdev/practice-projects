import Image from "next/image";

type Products = [
    {
        heading: string;
        description: string;
        price: number;
        content: string;
        url: string;
        featured_product: boolean;
        best_seller: boolean;
    },
];

export default async function Home() {
    const res = await fetch("http://localhost:4000/api/products");
    if (!res.ok) {
        console.error("Failed", res.status, res.statusText);
    }
    const products: Products = await res.json();

    return (
        <section>
            <main>
                <div className="container mx-auto h-screen">
                    <div className="flex gap-5">
                        {products.map((product) => (
                            <div key={product.heading}>
                                <div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    );
}
