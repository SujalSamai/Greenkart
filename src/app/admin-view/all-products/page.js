import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();
  return (
    <>
      <h1 className="w-11/12 mx-auto mt-10 text-5xl text-secondary font-heading font-bold">
        Manage your Products
      </h1>
      {/* <img
        src="https://images.pexels.com/photos/12210737/pexels-photo-12210737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="md:w-10/12 mx-auto h-72 object-cover mt-5"
      ></img> */}
      <CommonListing data={allAdminProducts && allAdminProducts.data} />;
    </>
  );
}
