import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function BagsAllProducts() {
  const getAllProducts = await productByCategory("bags");
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
