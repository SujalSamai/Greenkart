import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function CosmeticsAllProducts() {
  const getAllProducts = await productByCategory("cosmetics");
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
