export async function getKajian() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/kajian`, {
        cache: "no-store",
    });

    const json = await res.json();
    return json.data || [];
}
