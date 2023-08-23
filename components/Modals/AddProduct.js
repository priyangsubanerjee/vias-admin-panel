/* eslint-disable @next/next/no-img-element */
import React from "react";

function AddProduct({ open, setOpen }) {
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
                  name=""
                  placeholder="Add a product description"
                  className="p-7 w-full h-full resize-none bg-transparent border-none"
                  id=""
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
                <button className="mr-6 text-sm px-6 h-12 bg-[#023E8A] text-[#fff] font-normal">
                  Upload files
                </button>
              </div>
            </div>
            <div className="mt-8 h-[1px] bg-[#777777]"></div>
            <div className="mt-7">
              <h1 className="text-[#1B1B1B] font-semibold text-[18px]">
                Collection
              </h1>
              <div className="whitespace-nowrap overflow-x-auto">
                <table className="w-fit lg:w-full text-left mt-6 lg:mt-10">
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
