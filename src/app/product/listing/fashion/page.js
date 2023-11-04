import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function FashionAllProducts() {
  const getAllProducts = await productByCategory("fashion");
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
