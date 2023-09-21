"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewProduct } from "@/services/product";
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
import { useContext, useState } from "react";
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
  name: "",
  price: 0,
  description: "",
  category: "all",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  priceDrop: 0,
  imageUrl: "",
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

  const { componentLoader, setComponentLoader } = useContext(GlobalContext);

  const router = useRouter();

  async function handleAddProduct() {
    setComponentLoader({ loading: true, id: "" });
    const res = await addNewProduct(formData);
    console.log(res);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      });
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
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 text-secondary">
          <input
            accept="image/*"
            alt="product-image"
            max="1000000"
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-2 flex-col text-secondary">
            <label>Available Sizes</label>
            <TileComponent
              data={AvailableSizes}
              onClick={handleTileClick}
              selected={formData.sizes}
            />
          </div>
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
          <button
            className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
            onClick={handleAddProduct}
          >
            {componentLoader && componentLoader.loading ? (
              <ComponentLevelLoader
                text={"Adding Product"}
                color={"#ffffff"}
                loading={componentLoader && componentLoader.loading}
              />
            ) : (
              " Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
}
