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
}
