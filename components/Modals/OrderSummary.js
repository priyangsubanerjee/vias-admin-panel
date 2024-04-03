import GlobalState from "@/context/GlobalStates";
import React, { useContext, useState } from "react";
function OrderSummary({ order, open, setOpen }) {
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
    let date = new Date(order.orderPlaceOn).toDateString();
    let date2 = new Date(order.orderPlaceOn).toLocaleTimeString();
    return date + " " + date2;
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 h-full w-full z-20 bg-black/50 flex items-center justify-center">
          <div className="w-[500px] bg-white p-7 max-h-[600px] overflow-auto">
            <h1 className="text-xl font-semibold">Order summary</h1>
            <p className="text-sm mt-2 text-neutral-500">
              Placed on: {returnFormattedDate()}
            </p>
            <div className="mt-7  opacity-60">
              <p>Order items</p>
              <div className="space-y-8 mt-6">
                {order.orderedItems.map((item, index) => {
                  return (
                    <div key={index} className="flex">
                      <div>
                        <img className="h-12" src={item.image.url} alt="" />
                      </div>
                      <div className="text-sm space-y-1 ml-5">
                        <p>{item.name}</p>
                        <p>Qty:{item.quantity}</p>
                        <p>Price: ${item.price}</p>
                        <p>Discounted: ${item.discountedPrice}</p>
                        <p>Tag: {item.tag}</p>
                        <p>Color: {item?.color}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end mt-5 space-x-5">
              <button
                onClick={() => setOpen(false)}
                className="h-12 px-5 bg-neutral-100 text-neutral-700 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderSummary;
