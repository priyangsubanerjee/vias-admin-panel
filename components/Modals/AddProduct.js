/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import Switch from "react-switch";
import { collection } from "@/db/models/admin";
import { v4 as uuidv4 } from "uuid";

function AddProduct({ open, setOpen }) {
  const imageInputRef = React.useRef();
  const descriptionRef = React.useRef();
  const fileInputRef = React.useRef();
  const [name, setName] = React.useState("");
  const [modelNumber, setModelNumber] = React.useState("");
  const [category, setCategory] = React.useState("kitchen-cabinets");
  const [videoLinkPlaceholder, setVideoLinkPlaceholder] = React.useState("");
  const [rawImages, setRawImages] = React.useState([]);
  const [videoLinks, setVideoLinks] = React.useState([]);
  const [downloadInfoFiles, setDownloadInfoFiles] = React.useState([]);
  const [collection, setCollection] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [doorStyle, setDoorStyle] = React.useState("");
  const [constructionType, setConstructionType] = React.useState("");
  const [features, setFeatures] = React.useState("");
  const [cabinetStyle, setCabinetStyle] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const namesList = ["European", "Classic", "Shaker"];
  const doorStyleList = ["Shaker", "Euro", "Classic"];
  const colorList = [
    "White",
    "Light Gray",
    "Dark Gray",
    "Blue",
    "Black",
    "Espresso",
  ];

  const tagNames = [
    "SC-B",
    "SC-W",
    "SC-T",
    "SC-TD",
    "SC-V",
    "CC-B",
    "CC-W",
    "CC-T",
    "CC-TD",
    "CC-V",
    "EUC-B",
    "EUC-W",
    "EUC-T",
    "EUC-TD",
    "EUC-V",
  ];

  // Add "#" before every element in the array
  const tagsWithHash = tagNames.map((tag) => tag);

  useEffect(() => {
    const descriptionInput = document.getElementById("description");
    descriptionInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setDescription((prev) => prev + "\n• ");
      }
    });

    // focus on description input when modal opens
    if (open) {
      descriptionRef.current.focus();
    }
  }, [open]);

  const handleSave = async () => {
    if (name == "") {
      alert("Please enter a name for the product");
      return;
    }
    if (modelNumber == "") {
      alert("Please enter / generate a model number for the product");
      return;
    }
    if (rawImages.length == 0) {
      alert("Please upload at least one image for the product");
      return;
    }
    if (color == "") {
      alert("Please enter a color for the product");
      return;
    }
    if (doorStyle == "") {
      alert("Please enter a door style for the product");
      return;
    }
    if (constructionType == "") {
      alert("Please enter a construction type for the product");
      return;
    }

    if (collection.length == 0) {
      alert("Please add at least one item to the collection");
      return;
    }

    let collectionPass = true;
    collection.forEach((item) => {
      if (item.name == "") {
        collectionPass = false;
        alert("Please enter a name for each item in the collection");
        return;
      }
      if (item.width == "") {
        collectionPass = false;
        alert("Please enter a width for each item in the collection");
        return;
      }
      if (item.price == "") {
        collectionPass = false;
        alert("Please enter a price for each item in the collection");
        return;
      }
      if (item.discountedPrice == "") {
        collectionPass = false;
        alert(
          "Please enter a discounted price for each item in the collection"
        );
        return;
      }
    });

    if (!collectionPass) return;

    setLoading(true);

    let productImages = [];

    // upload all product images to cloudinary

    for (let i = 0; i < rawImages.length; i++) {
      const formData = new FormData();
      formData.append("file", rawImages[i]);
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      const { url, id } = await res.json();
      productImages.push({ url, id });
    }

    // upload all downloadble files to cloudinary

    let downloadInformation = [];

    for (let i = 0; i < downloadInfoFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", downloadInfoFiles[i]);
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      const { url, id } = await res.json();
      downloadInformation.push({ url, id });
    }

    let collections = [...collection];

    for (let i = 0; i < collections.length; i++) {
      if (collections[i].file) {
        const formData = new FormData();
        formData.append("file", collections[i].file);
        const res = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: formData,
        });
        const { url, id } = await res.json();
        console.log("Collection file uploaded", url);
        collections[i].image = { url, id };
      } else {
        console.log("Collection file not present");
        collections[i].image = {
          url: "https://cdn-icons-png.flaticon.com/512/1160/1160358.png",
          id: "placeholder-image_zqjz3r",
        };
      }
    }

    const newProduct = {
      name,
      modelNumber,
      productImages,
      description,
      category,
      color,
      doorStyle,
      constructionType,
      features,
      cabinetStyle,
      assemblyInstructions: videoLinks,
      downloadInformation,
      collections: collections.map((item) => {
        return {
          _id: item._id,
          name: item.name,
          width: item.width,
          tag: item.tag,
          price: item.price,
          discountedPrice: item.discountedPrice,
          inStock: item.inStock,
          image: item.image,
        };
      }),
    };

    const createResponse = await fetch("/api/product/create", {
      method: "POST",
      body: JSON.stringify(newProduct),
    });

    const { success, message } = await createResponse.json();

    if (success) {
      location.reload();
    } else {
      alert(message);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 h-full w-full bg-black/70 pt-10 pb-20 flex justify-center overflow-auto">
          <div className="w-[90%] h-fit bg-[#D9D9D9] px-12 py-12 rounded-lg relative">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="absolute top-5 right-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 36 36"
              >
                <path
                  fill="currentColor"
                  d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"
                  class="clr-i-outline clr-i-outline-path-1"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
            </button>
            <div>
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Product name
              </h1>
              <div className="w-[425px] h-[55px] flex items-center bg-[#F0F0F0] border border-[#BEBEBE] rounded-lg mt-3">
                <input
                  className="w-full h-full bg-transparent px-6 outline-none border-none"
                  placeholder="Eg: Weston White Shaker"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  list="nameList"
                  type="text"
                  name=""
                  id=""
                />
                <datalist id="nameList">
                  {namesList.map((item, index) => {
                    return <option key={index} value={item} />;
                  })}
                </datalist>
              </div>
            </div>
            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Model Number
              </h1>
              <div className="w-[425px] h-[55px] flex items-center bg-[#F0F0F0] border border-[#BEBEBE] rounded-lg mt-3">
                <input
                  className="w-full h-full bg-transparent px-6 outline-none border-none"
                  placeholder="Eg: #WESTONWHITESHAKER"
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
                <button
                  onClick={() => {
                    let random = Math.random().toString(36).substring(5);
                    let name_ = name.split(" ").join("-");
                    setModelNumber(
                      `#${name_.toUpperCase()}-${random.toUpperCase()}`
                    );
                  }}
                  className="mr-6 text-[#023E8A]"
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Product category
              </h1>
              <div className="mt-7 flex items-center space-x-3 text-[13px] font-medium text-[#777]">
                <span
                  className={`${
                    category == "kitchen-cabinets" && "text-[#023E8A]"
                  }`}
                >
                  Kitchen cabinets
                </span>
                <Switch
                  checkedIcon={null}
                  uncheckedIcon={null}
                  onColor="#CCCCCC"
                  offColor="#CCCCCC"
                  onHandleColor="#023E8A"
                  offHandleColor="#023E8A"
                  checked={category == "bathroom-vanities"}
                  onChange={() =>
                    setCategory(
                      category == "kitchen-cabinets"
                        ? "bathroom-vanities"
                        : "kitchen-cabinets"
                    )
                  }
                />
                <span
                  className={`${
                    category == "bathroom-vanities" && "text-[#023E8A]"
                  }`}
                >
                  Bathroom vanities
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px] flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                    fill="#1B1B1B"
                  />
                </svg>
                <span>Upload images (.jpg , .png , heif)</span>
              </h1>
              <div className="flex items-center mt-5 space-x-5">
                <div
                  onClick={() => imageInputRef.current.click()}
                  className="h-[120px] w-[120px] bg-[#808B9A] rounded-lg flex items-center justify-center text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
                    />
                  </svg>
                  <input
                    type="file"
                    onChange={(e) => {
                      let files = e.target.files;
                      let filesArr = Array.from(files);
                      setRawImages((prev) => [...prev, ...filesArr]);
                    }}
                    name=""
                    multiple
                    id=""
                    hidden
                    ref={imageInputRef}
                  />
                </div>
                {rawImages.length > 0 &&
                  rawImages.map((image, index) => {
                    return (
                      <div
                        className="h-[120px] w-[120px] rounded-lg overflow-hidden relative"
                        key={index}
                      >
                        <button
                          onClick={() => {
                            setRawImages((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="absolute bottom-0 inset-x-0 z-10 bg-[#000]/50 text-white w-full h-8 text-xs"
                        >
                          Remove
                        </button>
                        <img
                          className="h-full w-full object-cover"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Description
              </h1>
              <div className="w-full overflow-hidden flex items-center bg-[#F0F0F0] border border-[#BEBEBE] rounded-lg mt-3">
                <textarea
                  value={description}
                  ref={descriptionRef}
                  onChange={(e) => setDescription(e.target.value)}
                  name=""
                  placeholder="Add a product description"
                  className="p-7 w-full h-full resize-none bg-transparent border-none outline-none"
                  id="description"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>

            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Assembly Instructions
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setVideoLinks((prev) => [...prev, videoLinkPlaceholder]);
                  setVideoLinkPlaceholder("");
                }}
                className="w-[425px] h-[55px] flex items-center bg-[#F0F0F0] border border-[#BEBEBE] rounded-lg mt-3"
              >
                <input
                  className="w-full h-full bg-transparent px-6 outline-none border-none"
                  placeholder="Video link"
                  value={videoLinkPlaceholder}
                  onChange={(e) => setVideoLinkPlaceholder(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
                <button type="submit" className="mr-6 text-[#023E8A]">
                  Add
                </button>
              </form>
              <div className="mt-5 space-y-3">
                {videoLinks.length > 0 &&
                  videoLinks.map((link, index) => {
                    return (
                      <div
                        className="flex items-center text-[#023E8A] w-fit"
                        key={index}
                      >
                        <iconify-icon icon="material-symbols:link"></iconify-icon>
                        <span className="ml-2">{link}</span>
                        <button
                          onClick={() => {
                            setVideoLinks((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="ml-3"
                        >
                          <Icon icon="ic:baseline-delete" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Download Information (pdf, png, jpg)
              </h1>
              <div className="mt-5 flex items-center space-x-3">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="mr-6 text-sm rounded-md px-6 h-12 bg-[#023E8A] text-[#fff] font-normal"
                >
                  <input
                    onChange={(e) => {
                      let files = e.target.files;
                      let filesArr = Array.from(files);
                      setDownloadInfoFiles((prev) => [...prev, ...filesArr]);
                    }}
                    type="file"
                    ref={fileInputRef}
                    hidden
                    name=""
                    id=""
                  />
                  Upload files
                </button>
                {downloadInfoFiles.length > 0 &&
                  downloadInfoFiles.map((file, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center text-sm px-4"
                      >
                        <span>
                          {file.name.split(".")[0] +
                            "." +
                            file.name.split(".")[1]}
                        </span>
                        <button
                          onClick={() => {
                            setDownloadInfoFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="ml-4 text-[#023E8A]"
                        >
                          <Icon height={20} icon="ic:baseline-delete" />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="mt-8 h-[1px] bg-[#777777]"></div>

            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Traits
              </h1>

              <div className="mt-10">
                <div className="flex items-center space-x-2 text-[#555555] font-medium">
                  <Icon icon="ic:twotone-color-lens" />
                  <span className="text-[16px]">Color :</span>
                </div>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-[55px] border border-[#BEBEBE] bg-white rounded-lg mt-2 px-4"
                  placeholder="Add color"
                  list="colorList"
                  name=""
                  id=""
                />
                <datalist id="colorList">
                  {colorList.map((item, index) => {
                    return <option key={index} value={item} />;
                  })}
                </datalist>
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-2 text-[#555555] font-medium">
                  <Icon icon="ic:twotone-door-front" />
                  <span className="text-[16px]">Door Style</span>
                </div>
                <input
                  type="text"
                  value={doorStyle}
                  onChange={(e) => setDoorStyle(e.target.value)}
                  className="w-full h-[55px] border border-[#BEBEBE] bg-white rounded-lg mt-2 px-4"
                  placeholder="Add door style"
                  list="doorStyleList"
                  name=""
                  id=""
                />
                <datalist id="doorStyleList">
                  {doorStyleList.map((item, index) => {
                    return <option key={index} value={item} />;
                  })}
                </datalist>
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-2 text-[#555555] font-medium">
                  <Icon icon="ion:hammer" />
                  <span className="text-[16px]">Construction Type</span>
                </div>
                <input
                  type="text"
                  value={constructionType}
                  onChange={(e) => setConstructionType(e.target.value)}
                  className="w-full h-[55px] border border-[#BEBEBE] bg-white rounded-lg mt-2 px-4"
                  placeholder="Add Construction type"
                  name=""
                  id=""
                />
              </div>

              {/* <div className="mt-6">
                <div className="flex items-center space-x-2 text-[#555555] font-medium">
                  <Icon icon="pajamas:feature-flag" />
                  <span className="text-[16px]">Features</span>
                </div>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full h-[55px] border border-[#BEBEBE] bg-white rounded-lg mt-2 px-4"
                  placeholder="Add features"
                  name=""
                  id=""
                />
              </div>

              <div className="mt-6">
                <div className="flex items-center space-x-2 text-[#555555] font-medium">
                  <Icon icon="ic:twotone-door-sliding" />
                  <span className="text-[16px]">Cabinet Style</span>
                </div>
                <input
                  type="text"
                  value={cabinetStyle}
                  onChange={(e) => setCabinetStyle(e.target.value)}
                  className="w-full h-[55px] border border-[#BEBEBE] bg-white rounded-lg mt-2 px-4"
                  placeholder="Add Cabinet Style"
                  name=""
                  id=""
                />
              </div> */}
            </div>

            <div className="mt-20">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Collection
              </h1>
              <div className="mt-6 bg-white h-12 flex items-center px-5">
                <span>
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
                      d="M15.2659 12.0275C16.3051 10.6878 16.7948 9.00252 16.6355 7.31454C16.4762 5.62656 15.6798 4.06267 14.4084 2.94103C13.1369 1.81939 11.486 1.22425 9.79129 1.27669C8.09662 1.32913 6.48559 2.02521 5.28593 3.22332C4.08522 4.42226 3.38687 6.03392 3.33318 7.72987C3.27948 9.42583 3.87449 11.0784 4.99695 12.3509C6.11941 13.6234 7.68484 14.42 9.37424 14.5784C11.0636 14.7368 12.7498 14.245 14.0893 13.2033L14.1251 13.2408L17.6601 16.7767C17.7375 16.8541 17.8294 16.9155 17.9306 16.9574C18.0318 16.9993 18.1402 17.0209 18.2497 17.0209C18.3592 17.0209 18.4676 16.9993 18.5688 16.9574C18.6699 16.9155 18.7618 16.8541 18.8393 16.7767C18.9167 16.6992 18.9781 16.6073 19.02 16.5061C19.0619 16.405 19.0835 16.2966 19.0835 16.1871C19.0835 16.0776 19.0619 15.9691 19.02 15.868C18.9781 15.7668 18.9167 15.6749 18.8393 15.5975L15.3034 12.0625C15.2913 12.0505 15.2787 12.0388 15.2659 12.0275ZM13.5359 4.40249C14.0064 4.86538 14.3806 5.41686 14.6369 6.0251C14.8932 6.63334 15.0266 7.28631 15.0293 7.94634C15.0319 8.60637 14.9039 9.2604 14.6526 9.8707C14.4012 10.481 14.0316 11.0355 13.5648 11.5022C13.0981 11.9689 12.5436 12.3386 11.9333 12.59C11.323 12.8413 10.669 12.9693 10.0089 12.9667C9.34891 12.964 8.69595 12.8306 8.08771 12.5743C7.47947 12.318 6.92799 11.9438 6.46509 11.4733C5.54003 10.5331 5.02397 9.26535 5.02934 7.94634C5.03472 6.62732 5.56107 5.36385 6.49377 4.43116C7.42646 3.49847 8.68993 2.97211 10.0089 2.96674C11.328 2.96136 12.5957 3.47742 13.5359 4.40249Z"
                      fill="#565656"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search for a colection"
                  className="w-full bg-transparent h-full ml-3 outline-none border-none"
                  name=""
                  id=""
                />
              </div>
              <div className="whitespace-nowrap overflow-x-auto">
                <table className="w-fit lg:w-full text-left mt-6 lg:mt-3">
                  <thead>
                    <tr>
                      <th className="font-semibold text-[#777] uppercase text-[10px] px-5 py-4 text-sm tracking-[1.3px]"></th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4 text-sm tracking-[1.3px]">
                        Name
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4 tracking-[1.3px]">
                        DIMENSION
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4 tracking-[1.3px]">
                        TAG
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4 tracking-[1.3px]">
                        TOTAL PRICE
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4 tracking-[1.3px]">
                        DISCOUNTED
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4  tracking-[1.3px]">
                        IN STOCK
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[12px] px-5 py-4 tracking-[1.3px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {collection.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-[#cdcdcd] bg-white"
                        >
                          <td className="font-normal px-5 py-4 text-sm">
                            <button
                              onClick={() => {
                                document
                                  .getElementById(`item-placeholder-${index}`)
                                  .click();
                              }}
                              className="text-black rounded-md h-10 w-10 flex items-center justify-center"
                            >
                              {item.file ? (
                                <img
                                  src={URL.createObjectURL(item.file)}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Icon
                                  height={20}
                                  icon="ant-design:picture-outlined"
                                />
                              )}
                            </button>
                            <input
                              type="file"
                              hidden
                              onChange={(e) => {
                                let files = e.target.files;
                                let filesArr = Array.from(files);
                                setCollection((prev) => {
                                  let newCollection = [...prev];
                                  newCollection[index].file = filesArr[0];
                                  return newCollection;
                                });
                              }}
                              id={`item-placeholder-${index}`}
                            />
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            <input
                              value={item.name}
                              className="outline-none"
                              placeholder="Eg: Base Cabinet"
                              onChange={(e) => {
                                let newCollection = [...collection];
                                newCollection[index].name = e.target.value;
                                setCollection(newCollection);
                              }}
                              type="text"
                              name=""
                            />
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            <input
                              value={item.width}
                              className="outline-none w-[100px]"
                              placeholder={`Eg: 12"`}
                              onChange={(e) => {
                                let newCollection = [...collection];
                                newCollection[index].width = e.target.value;
                                setCollection(newCollection);
                              }}
                              type="text"
                              name=""
                            />
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            <input
                              list="tagList"
                              value={item.tag}
                              className="outline-none w-[100px]"
                              placeholder="#HS-B15"
                              onChange={(e) => {
                                let newCollection = [...collection];
                                newCollection[index].tag = e.target.value;
                                setCollection(newCollection);
                              }}
                              type="text"
                              name=""
                            />
                            <datalist id="tagList">
                              {tagsWithHash.map((item, index) => {
                                return <option key={index} value={item} />;
                              })}
                            </datalist>
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            $
                            <input
                              value={item.price}
                              className="outline-none w-[100px]"
                              placeholder="100"
                              onChange={(e) => {
                                let newCollection = [...collection];
                                newCollection[index].price = e.target.value;
                                setCollection(newCollection);
                              }}
                              type="text"
                              name=""
                            />
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            $
                            <input
                              value={item.discountedPrice}
                              className="outline-none w-[100px]"
                              placeholder="100"
                              onChange={(e) => {
                                let newCollection = [...collection];
                                newCollection[index].discountedPrice =
                                  e.target.value;
                                setCollection(newCollection);
                              }}
                              type="text"
                              name=""
                            />
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            <Switch
                              onChange={() => {
                                let newCollection = [...collection];
                                newCollection[index].inStock =
                                  !newCollection[index].inStock;
                                setCollection(newCollection);
                              }}
                              checkedIcon={null}
                              uncheckedIcon={null}
                              checked={item.inStock}
                            />
                          </td>
                          <td className="font-normal px-5 py-4 text-sm">
                            <button
                              onClick={() => {
                                setCollection((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              }}
                              className="bg-[#DA3A3A] rounded-md h-10 w-10 flex items-center justify-center text-white"
                            >
                              <Icon
                                height={20}
                                icon="material-symbols:delete"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => {
                    setCollection((prev) => [
                      ...prev,
                      {
                        _id: uuidv4(),
                        file: "",
                        image: {
                          url: "",
                          id: "",
                        },
                        name: "",
                        width: "",
                        tag: "",
                        totalPrice: "",
                        discountedPrice: "",
                        inStock: true,
                      },
                    ]);
                  }}
                  className="mr-6 w-full text-sm px-6 h-12 bg-[#023E8A] text-[#fff] font-normal rounded-md"
                >
                  + Add new
                </button>
              </div>
            </div>

            <div className="mt-16 flex justify-end">
              <button
                onClick={() => handleSave()}
                className="bg-[#023E8A] text-white px-5 py-3 rounded-md"
              >
                Save product
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 h-full w-full z-30 bg-black/50 flex items-center justify-center">
          <div className="h-[120px] w-[120px] flex items-center justify-center bg-white rounded-md text-[#023E8A]">
            <Icon height={50} icon="eos-icons:loading" />
          </div>
        </div>
      )}
    </>
  );
}

export default AddProduct;
