import { Products } from "../page";

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
    const receivedProduct = await res.json();
    const { heading, description, price, url, content }: Products[0] =
        receivedProduct.data[0];

    return (
        <section>
            <main className="max-w-400 mx-auto border border-white h-190">
                <div></div>
                <div>
                    <h1>{heading}</h1>
                    <p>{description}</p>
                </div>
            </main>
        </section>
    );
}
