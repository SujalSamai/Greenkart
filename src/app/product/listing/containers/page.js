import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function ContainerAllProducts() {
  const getAllProducts = await productByCategory("containers");
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
