/* eslint-disable @next/next/no-img-element */
import GlobalState from "@/context/GlobalStates";
import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";

function AddDoor({ addDoorOpen, setAddDoorOpen }) {
  const { doorColors, refreshDoorColors } = useContext(GlobalState);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef(null);

  const [doorProp, setDoorProp] = useState({
    selectedFile: null,
    image: "",
    color: "",
  });

  const handleSave = async () => {
    if (doorProp.color == "") {
      alert("Please enter the color name");
      return;
    }

    let tempUrl = doorProp.image;
    if (doorProp.selectedFile != null) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", doorProp.selectedFile);
      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      const { url, id } = await res.json();
      tempUrl = url;
    }

    let createDoor = await fetch("/api/door/create", {
      method: "POST",
      body: JSON.stringify({
        color: doorProp.color,
        image: tempUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let createDoorJson = await createDoor.json();

    if (createDoorJson.success) {
      setAddDoorOpen(false);
      setDoorProp({
        selectedFile: null,
        image: "",
        color: "",
      });
    }

    setLoading(false);
    refreshDoorColors();
  };

  const handleClose = () => {
    setAddDoorOpen(false);
    setDoorProp({
      selectedFile: null,
      image: "",
      color: "",
    });
  };

  const DecideDisplayImage = () => {
    if (doorProp.image == "") {
      if (doorProp.selectedFile) {
        return URL.createObjectURL(doorProp.selectedFile);
      } else {
        return "https://i.pinimg.com/736x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      }
    } else {
      return doorProp.image;
    }
  };

  return (
    <>
      {addDoorOpen && (
        <div className="fixed inset-0 h-full w-full bg-black/70 pt-10 pb-20 flex items-center justify-center overflow-auto">
          <div className="w-[500px] h-fit bg-[#D9D9D9] px-8 py-8 rounded-lg relative">
            <button
              onClick={() => {
                handleClose();
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
            <div className="flex items-center">
              <div
                onClick={() => {
                  inputRef.current.click();
                }}
                className="h-28 w-28 shrink-0 bg-white cursor-pointer rounded-md overflow-hidden"
              >
                <img
                  src={DecideDisplayImage()}
                  className="h-full w-full object-cover"
                  alt=""
                />
                <input
                  onChange={(e) => {
                    setDoorProp({
                      ...doorProp,
                      selectedFile: e.target.files[0],
                    });
                  }}
                  type="file"
                  name=""
                  ref={inputRef}
                  hidden
                  id=""
                />
              </div>
              <div className="ml-6">
                <input
                  type="text"
                  value={doorProp.color}
                  onChange={(e) => {
                    setDoorProp({
                      ...doorProp,
                      color: e.target.value,
                    });
                  }}
                  placeholder="Enter color name"
                  className="bg-transparent outline-none pb-2 border-b border-neutral-400"
                  name=""
                  id=""
                />
                <p className="text-xs leading-6 text-neutral-600 font-medium mt-3">
                  This color name will be used to identify the door color in the
                  system.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleSave()}
                className="bg-[#023E8A] text-white px-5 py-3 text-sm rounded-md"
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

export default AddDoor;
