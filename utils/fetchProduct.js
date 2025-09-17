import axios from "axios";

export async function fetchProduct(barcode) {
  try {
    const res = await axios.get(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
    );
    if (res.data?.code !== "OK" || !res.data.items?.length) return null;

    const item = res.data.items[0];
    const prices = [];

    if (item.offers && item.offers.length > 0) {
      item.offers.forEach((offer) => {
        if (offer.price) prices.push(parseFloat(offer.price));
      });
    }

    const avgPrice =
      prices.length > 0
        ? (prices.reduce((sum, p) => sum + p, 0) / prices.length).toFixed(2)
        : null;

    return {
      title: item.title || null,
      brand: item.brand || null,
      category: item.category || null,
      images: item.images || [],
      prices,
      averagePrice: avgPrice,
    };
  } catch (err) {
    console.error("UPCitemdb API error:", err.message);
    return null;
  }
}
