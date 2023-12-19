/* eslint-disable @next/next/no-img-element */
import AddMultipleProd from "@/components/Modals/AddMultipleProd";
import AddProduct from "@/components/Modals/AddProduct";
import AddProductCollections from "@/components/Modals/AddProductCollections";
import ProductRow from "@/components/Rows/ProductRow";
import SideLayout from "@/components/SideLayout";
import GlobalState from "@/context/GlobalStates";
import connectDatabase from "@/db/connect";
import product from "@/db/models/product";
import React, { useContext } from "react";
import Papa from "papaparse";

function Inventory() {
  const { refreshProducts, products } = useContext(GlobalState);
  const [addProductOpen, setAddProductOpen] = React.useState(false);
  const [addMultiProductOpen, setAddMultiProductOpen] = React.useState(false);
  const [addProductCollectionOpen, setAddProductCollectionOpen] = React.useState(false);


  function exportToCSV(data, fileName) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExportCSV = async () => {
    const productsToExport = [];
    products.forEach((product) => {

      const newProduct = {
        Name: product.name,
        ModelNumber: product.modelNumber,
        ProductImages: product.productImages.map(item => item.url.split('/').pop()).join(','),
        Description: product.description,
        Category: product.category,
        Color: product.color,
        DoorStyle: product.doorStyle,
        ConstructionType: product.constructionType,
        Features: product.features,
        CabinetStyle: product.cabinetStyle,
        // assemblyInstructions: [],
        // downloadInformation: [],
        // collections: [],
      };

      productsToExport.push(newProduct);
    });

    await exportToCSV(productsToExport, 'product_data.csv');
  };

  return (
    <SideLayout>
      <div className="px-6 py-10">
        <h1 className="text-xl font-semibold">{products.length} Products</h1>
        <div className="flex items-center mt-5 space-x-6">
          <div className="h-12 bg-white rounded px-5 flex items-center w-full">
            <span className="shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.2658 12.0275C16.305 10.6878 16.7947 9.00252 16.6354 7.31454C16.4761 5.62656 15.6797 4.06267 14.4083 2.94103C13.1368 1.81939 11.4858 1.22425 9.79117 1.27669C8.0965 1.32913 6.48546 2.02521 5.28581 3.22332C4.0851 4.42226 3.38675 6.03392 3.33305 7.72987C3.27936 9.42583 3.87437 11.0784 4.99683 12.3509C6.11929 13.6234 7.68472 14.42 9.37412 14.5784C11.0635 14.7368 12.7497 14.245 14.0891 13.2033L14.125 13.2408L17.66 16.7767C17.7374 16.8541 17.8293 16.9155 17.9305 16.9574C18.0316 16.9993 18.1401 17.0209 18.2496 17.0209C18.3591 17.0209 18.4675 16.9993 18.5686 16.9574C18.6698 16.9155 18.7617 16.8541 18.8391 16.7767C18.9166 16.6992 18.978 16.6073 19.0199 16.5061C19.0618 16.405 19.0834 16.2966 19.0834 16.1871C19.0834 16.0776 19.0618 15.9691 19.0199 15.868C18.978 15.7668 18.9166 15.6749 18.8391 15.5975L15.3033 12.0625C15.2911 12.0505 15.2786 12.0388 15.2658 12.0275ZM13.5358 4.40249C14.0063 4.86538 14.3805 5.41686 14.6368 6.0251C14.8931 6.63334 15.0265 7.28631 15.0291 7.94634C15.0318 8.60637 14.9038 9.2604 14.6525 9.8707C14.4011 10.481 14.0314 11.0355 13.5647 11.5022C13.098 11.9689 12.5435 12.3386 11.9332 12.59C11.3229 12.8413 10.6689 12.9693 10.0088 12.9667C9.34879 12.964 8.69582 12.8306 8.08758 12.5743C7.47935 12.318 6.92787 11.9438 6.46497 11.4733C5.5399 10.5331 5.02385 9.26535 5.02922 7.94634C5.03459 6.62732 5.56095 5.36385 6.49365 4.43116C7.42634 3.49847 8.6898 2.97211 10.0088 2.96674C11.3278 2.96136 12.5955 3.47742 13.5358 4.40249Z"
                  fill="#565656"
                />
              </svg>
            </span>
            <input
              type="text"
              className="bg-transparent w-full h-full border-none outline-none ml-3 text-sm"
              placeholder="Search VIAS Cabinet"
              name=""
              id=""
            />
          </div>
          <button
            onClick={() => setAddProductOpen(true)}
            className="h-12 bg-[#133365] shrink-0 whitespace-nowrap text-sm px-5 text-white rounded"
          >
            + Add a product
          </button>
          <button
            onClick={() => setAddMultiProductOpen(true)}
            className="h-12 bg-[#133365] shrink-0 whitespace-nowrap text-sm px-5 text-white rounded"
          >
            + Add multiple product
          </button>
          <button
            onClick={() => setAddProductCollectionOpen(true)}
            className="h-12 bg-[#133365] shrink-0 whitespace-nowrap text-sm px-5 text-white rounded"
          >
            + Add product collections
          </button>
        </div>
        <div className="whitespace-nowrap overflow-x-auto ">
          <div class="w-[100%] flex items-center mt-3">
            <span class="w-full h-full bg-transparent px-6" />
            <button className="h-8 bg-[#133365] shrink-0 whitespace-nowrap text-sm px-5 text-white rounded" onClick={handleExportCSV}>Export to CSV</button>
          </div>
          <table className="w-fit lg:w-full text-left mt-6 lg:mt-10">
            <thead>
              <tr>
                <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                  Name
                </th>
                <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                  MODEL NO.
                </th>
                <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">Edit</th>
                <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return <ProductRow key={index} product={product} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AddProduct open={addProductOpen} setOpen={setAddProductOpen} />
      <AddMultipleProd open={addMultiProductOpen} setOpen={setAddMultiProductOpen} />
      <AddProductCollections open={addProductCollectionOpen} setOpen={setAddProductCollectionOpen} />
    </SideLayout>
  );
}

export default Inventory;
