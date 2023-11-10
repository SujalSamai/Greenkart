export const navOptions = [
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingKitchen",
    label: "Home & Kitchen",
    path: "/product/listing/kitchen",
  },
  {
    id: "listingContainers",
    label: "Containers",
    path: "/product/listing/containers",
  },
  {
    id: "listingBags",
    label: "Bags",
    path: "/product/listing/bags",
  },
  {
    id: "listingFashion",
    label: "Fashion",
    path: "/product/listing/fashion",
  },
  {
    id: "listingCosmetics",
    label: "Cosmetics",
    path: "/product/listing/cosmetics",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "Customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "brand",
    type: "text",
    placeholder: "Enter Brand Name",
    label: "Brand Name",
    componentType: "input",
  },
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Product Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "kitchen",
        label: "Home & Kitchen",
      },
      {
        id: "containers",
        label: "Containers",
      },
      {
        id: "bags",
        label: "Bags",
      },
      {
        id: "fashion",
        label: "Fashion",
      },
      {
        id: "cosmetics",
        label: "Cosmetics",
      },
      {
        id: "all",
        label: "All",
      },
    ],
  },
  {
    id: "manufactured",
    type: "text",
    placeholder:
      "Manufactured using (For eg. HANDCRAFTED fabric and is made from waste plastic outside with cotton canvas fabric handles)",
    label: "Product Details",
    componentType: "input",
  },
  {
    id: "color",
    type: "text",
    placeholder: "Enter Color of the product",
    label: "Product color",
    componentType: "input",
  },
  {
    id: "dimensions",
    type: "text",
    placeholder:
      "Enter Dimension of the product (l x b x h) (For eg.  11.5” x 15” x 5.5”)",
    label: "Dimension",
    componentType: "input",
  },
  {
    id: "availability",
    type: "text",
    placeholder: "Enter Availabilty (For eg. In stock or Only 2 left!)",
    label: "Available Items",
    componentType: "input",
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Estimated Shipping Time (For eg. 2 days)",
    label: "Shipping Time",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop (in Percentage)",
    componentType: "input",
  },
];

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "greenkart-3e1e1.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const firebaseStroageURL = process.env.FIREBASE_STORAGE_URL;

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
];
