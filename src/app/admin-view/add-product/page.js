"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAProduct } from "@/services/product";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//initializing the firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${getFile.name}-${timeStamp}-${randomString}`;
};

async function helperForUploadingImageToFirebase(file) {
  //getting the unique name for file
  const getFileName = createUniqueFileName(file);
  //creating the folder(path) in which the file will be stored
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  //uploding the file in that folder
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  brand: "",
  name: "",
  price: 0,
  description: "",
  category: "all",
  manufactured: "",
  color: "",
  dimensions: "",
  skinType: "",
  availability: "",
  deliveryInfo: "",
  onSale: "no",
  priceDrop: 0,
  imageUrl: "",
  sizes: [],
};

export default function AdminAddNewProduct() {
  const [formData, setFormData] = useState(initialFormData);
  async function handleImage(event) {
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  }

  function handleTileClick(getCurrentItem) {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      copySizes.push(getCurrentItem);
    } else {
      copySizes = copySizes.filter((item) => item.id !== getCurrentItem.id);
    }
    setFormData({
      ...formData,
      sizes: copySizes,
    });
  }

  const {
    componentLoader,
    setComponentLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    if (currentUpdatedProduct !== null) {
      setFormData(currentUpdatedProduct);
    }
  }, [currentUpdatedProduct]);

  async function handleAddProduct() {
    setComponentLoader({ loading: true, id: "" });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct(formData)
        : await addNewProduct(formData);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      setComponentLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(initialFormData);
    }
  }

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-5 lg:p-10 bg-white shadow-2xl rounded-md relative">
        <h1 className="text-3xl lg:text-5xl text-secondary font-heading font-bold">
          Add your product
        </h1>
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 text-secondary">
          <p className="font-bold">Add image of your product below:</p>
          <label
            for="images"
            className="w-full flex gap-5 flex-col justify-center items-center h-56 p-6 border-2 border-dashed border-[#555] cursor-pointer rounded-lg transition-custom"
            id="dropcontainer"
          >
            <span class="drop-title">Drop image here</span> or{" "}
            <input
              accept="image/*"
              alt="product-image"
              max="1000000"
              type="file"
              onChange={handleImage}
              className="w-[13rem] md:w-6/12 flex file:ml-2 file:bg-secondary file:text-primary file:p-2 file:rounded-lg rounded-lg border border-secondary 
              p-2 cursor-pointer file:cursor-pointer file:mr-12 file:text-sm"
              required
            />
          </label>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}
          <div className="flex gap-2 flex-col">
            <label>Available sizes (for clothing)</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          <button
            className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 text-lg text-white font-medium tracking-wide rounded-md hover:text-[#adc3b6]"
            onClick={handleAddProduct}
          >
            {componentLoader && componentLoader.loading ? (
              <ComponentLevelLoader
                text={
                  currentUpdatedProduct !== null
                    ? "Updating Info"
                    : "Adding Product"
                }
                color={"#ffffff"}
                loading={componentLoader && componentLoader.loading}
              />
            ) : currentUpdatedProduct !== null ? (
              "Update Info"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
}
