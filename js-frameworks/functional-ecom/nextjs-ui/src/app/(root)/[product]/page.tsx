import { AddToCart } from "@/src/components/Cart";
import { Products } from "@/src/types/productTypes";

export default async function Page({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
    const { product } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/product`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: product }),
        },
    );
    if (!res.ok) {
        return console.error(res.status, res.statusText);
    }
    const parsed = await res.json();
    const receivedProduct: Products[0] = parsed.data[0];
    const { id, heading, description, price, url, content }: Products[0] =
        parsed.data[0];

    return (
        <section>
            <main className="max-w-400 mx-auto border border-white h-190">
                <div></div>
                <div>
                    <h1>{heading}</h1>
                    <p>{description}</p>
                    <AddToCart product={receivedProduct} />
                </div>
            </main>
        </section>
    );
}
