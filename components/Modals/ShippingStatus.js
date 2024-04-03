import GlobalState from "@/context/GlobalStates";
import React, { useContext, useState } from "react";

function ShippingStatus({ order, open, setOpen }) {
  const { refreshOrders } = useContext(GlobalState);
  const [orderProp, setOrderProp] = useState(order);

  const handleUpdate = async () => {
    const response = await fetch("/api/orders/updateShipping", {
      method: "POST",
      body: JSON.stringify({
        id: order._id,
        status: orderProp.shippingStatus.status,
        details: orderProp.shippingStatus.details,
      }),
    });

    let { success, message } = await response.json();
    if (success) {
      refreshOrders();
      setOpen(false);
    } else {
      alert(message);
    }
  };

  const returnFormattedDate = () => {
    let date = new Date(order.shippingStatus.date).toDateString();
    let date2 = new Date(order.shippingStatus.date).toLocaleTimeString();
    console.log(date, date2);
    return date + " " + date2;
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 h-full w-full z-20 bg-black/50 flex items-center justify-center">
          <div className="w-[500px] bg-white p-7">
            <h1 className="text-xl font-semibold">Shipping status</h1>
            <p className="text-sm mt-2 text-neutral-500">
              Last updated: {returnFormattedDate()}
            </p>
            <div className="space-y-2 mt-7  opacity-60">
              <p>Shipping number</p>
              <input
                type="text"
                value={order.shippingNumber}
                readOnly
                className="h-12 rounded border border-neutral-500 outline-none px-4 w-full"
                name=""
                id=""
              />
            </div>
            <div className="space-y-2 mt-4">
              <p>Shipping status</p>
              <input
                type="text"
                onChange={(e) => {
                  setOrderProp({
                    ...orderProp,
                    shippingStatus: {
                      ...orderProp.shippingStatus,
                      status: e.target.value,
                    },
                  });
                }}
                value={orderProp.shippingStatus.status}
                className="h-12 rounded border border-neutral-500 outline-none px-4 w-full"
                name=""
                id=""
              />
            </div>
            <div className="space-y-2 mt-4">
              <p>Shipping status</p>
              <textarea
                value={orderProp.shippingStatus.details}
                onChange={(e) =>
                  setOrderProp({
                    ...orderProp,
                    shippingStatus: {
                      ...orderProp.shippingStatus,
                      details: e.target.value,
                    },
                  })
                }
                className="h-32 rounded border border-neutral-500 outline-none p-4 w-full resize-none"
                id=""
              ></textarea>
            </div>
            <div className="flex items-center justify-end mt-5 space-x-5">
              <button
                onClick={() => setOpen(false)}
                className="h-12 px-5 bg-neutral-100 text-neutral-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate()}
                className="h-12 px-10 text-white bg-[#023E8A] rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShippingStatus;
