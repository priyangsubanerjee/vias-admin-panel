/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";

function AddProduct({ open, setOpen }) {
  const [name, setName] = React.useState("");
  const [modelNumber, setModelNumber] = React.useState("");
  const [rawImages, setRawImages] = React.useState([]);
  const [videoLinks, setVideoLinks] = React.useState([]);
  const [downloadInfoFiles, setDownloadInfoFiles] = React.useState([]);
  const [collection, setCollection] = React.useState([]);
  const [description, setDescription] = React.useState("");

  const descriptionRef = React.useRef();

  useEffect(() => {
    const descriptionInput = document.getElementById("description");
    descriptionInput?.addEventListener("keydown", (e) => {
      if (e.key === "Shift") {
        e.preventDefault();
        setDescription((prev) => prev + "• ");
      }
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

  return (
    <>
      {open && (
        <div className="fixed inset-0 h-full w-full bg-black/70 pt-10 pb-20 flex justify-center overflow-auto">
          <div className="w-[80%] h-fit bg-[#D9D9D9] px-12 py-12 rounded-lg relative">
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
                  className="w-full h-full bg-transparent px-6"
                  placeholder="Eg: Weston White Shaker"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Model Number
              </h1>
              <div className="w-[425px] h-[55px] flex items-center bg-[#F0F0F0] border border-[#BEBEBE] rounded-lg mt-3">
                <input
                  className="w-full h-full bg-transparent px-6"
                  placeholder="Eg: #WESTONWHITESHAKER"
                  type="text"
                  name=""
                  id=""
                />
                <button className="mr-6 text-[#023E8A]">Generate</button>
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
              <div className="flex items-center mt-5">
                <div className="h-[120px] w-[120px] bg-[#808B9A] rounded-lg flex items-center justify-center text-white">
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
                </div>
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
              <div className="w-[425px] h-[55px] flex items-center bg-[#F0F0F0] border border-[#BEBEBE] rounded-lg mt-3">
                <input
                  className="w-full h-full bg-transparent px-6"
                  placeholder="Video link"
                  type="text"
                  name=""
                  id=""
                />
                <button className="mr-6 text-[#023E8A]">Add</button>
              </div>
            </div>
            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Download Information (pdf, png, jpg)
              </h1>
              <div className="mt-5">
                <button className="mr-6 text-sm rounded-md px-6 h-12 bg-[#023E8A] text-[#fff] font-normal">
                  Upload files
                </button>
              </div>
            </div>
            <div className="mt-8 h-[1px] bg-[#777777]"></div>
            <div className="mt-7">
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
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]"></th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                        Name
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                        WIDTH
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                        TAG
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                        TOTAL PRICE
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]">
                        DISCOUNTED PRICE
                      </th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]"></th>
                      <th className="font-semibold text-[#777] uppercase text-[13px] px-5 py-4 text-sm tracking-[1.3px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#cdcdcd] bg-white">
                      <td className="font-normal px-5 py-4 text-sm flex items-center space-x-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M14 9a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"
                          />
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M7.268 4.658a54.647 54.647 0 0 1 9.465 0l1.51.132a3.138 3.138 0 0 1 2.831 2.66a30.604 30.604 0 0 1 0 9.1a3.138 3.138 0 0 1-2.831 2.66l-1.51.131c-3.15.274-6.316.274-9.465 0l-1.51-.131a3.138 3.138 0 0 1-2.832-2.66a30.601 30.601 0 0 1 0-9.1a3.138 3.138 0 0 1 2.831-2.66l1.51-.132Zm9.335 1.495a53.147 53.147 0 0 0-9.206 0l-1.51.131A1.638 1.638 0 0 0 4.41 7.672a29.101 29.101 0 0 0-.311 5.17L7.97 8.97a.75.75 0 0 1 1.09.032l3.672 4.13l2.53-.844a.75.75 0 0 1 .796.21l3.519 3.91a29.101 29.101 0 0 0 .014-8.736a1.638 1.638 0 0 0-1.478-1.388l-1.51-.131Zm2.017 11.435l-3.349-3.721l-2.534.844a.75.75 0 0 1-.798-.213l-3.471-3.905l-4.244 4.243c.049.498.11.996.185 1.491a1.638 1.638 0 0 0 1.478 1.389l1.51.131c3.063.266 6.143.266 9.206 0l1.51-.131c.178-.016.35-.06.507-.128Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>
                      <td className="font-normal px-5 py-4 text-sm">
                        Base cabinet
                      </td>
                      <td className="font-normal px-5 py-4 text-sm">
                        15{'"'}W
                      </td>
                      <td className="font-normal px-5 py-4 text-sm">#HS-B15</td>
                      <td className="font-normal px-5 py-4 text-sm">$45.5</td>
                      <td className="font-normal px-5 py-4 text-sm">$45.5</td>
                      <td className="font-normal px-5 py-4 text-sm">$45.5</td>
                      <td className="font-normal px-5 py-4 text-sm">$45.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-5">
                <button className="mr-6 w-full text-sm px-6 h-12 bg-[#023E8A] text-[#fff] font-normal">
                  + Add new
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProduct;
