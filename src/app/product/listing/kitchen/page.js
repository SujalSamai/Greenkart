import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function KitchenAllProducts() {
  const getAllProducts = await productByCategory("kitchen");
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
