/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import ShippingStatus from "../Modals/ShippingStatus";
import GlobalState from "@/context/GlobalStates";
import OrderSummary from "../Modals/OrderSummary";

function OrderRow({ order, setOrders }) {
  console.log(order);
  const { refreshOrders } = useContext(GlobalState);
  const returnFormattedDate = () => {
    let date = new Date(order.orderPlaceOn).toDateString();
    let date2 = new Date(order.orderPlaceOn).toLocaleTimeString();
    return date + " " + date2;
  };

  const [shippingStatusOpen, setShippingStatusOpen] = React.useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = React.useState(false);

  return (
    <>
      <tr className="border-b border-[#cdcdcd] h-12">
        <td className="font-normal px-5 h-full text-sm">
          {returnFormattedDate()}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {order.paymentSuccessfull ? "Success" : "Pending"}
        </td>
        <td className="font-normal px-5 py-4 text-sm">{order.orderNumber}</td>
        <td className="font-normal px-5 py-4 text-sm">
          {order.shippingNumber}
        </td>

        <td className="font-normal px-5 py-4 text-sm">
          <button
            onClick={() => setOrderSummaryOpen(true)}
            className="h-10 w-10 rounded bg-neutral-200 flex items-center justify-center"
          >
            <Icon height={18} icon="fluent:box-16-regular" />
          </button>
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          <button
            onClick={() => setShippingStatusOpen(true)}
            className="h-10 w-10 rounded bg-neutral-200 flex items-center justify-center"
          >
            <Icon height={18} icon="la:shipping-fast" />
          </button>
        </td>
        <td className="font-normal px-5 py-4 text-sm">${order.totalAmount}</td>
      </tr>

      <ShippingStatus
        order={order}
        setOpen={setShippingStatusOpen}
        open={shippingStatusOpen}
      />
      <OrderSummary
        order={order}
        setOpen={setOrderSummaryOpen}
        open={orderSummaryOpen}
      />
    </>
  );
}

export default OrderRow;
