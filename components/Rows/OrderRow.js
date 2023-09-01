/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import React from "react";

function OrderRow({ order }) {
  const returnFormattedDate = () => {
    let date = new Date(order.orderPlaceOn).toDateString();
    let date2 = new Date(order.orderPlaceOn).toLocaleTimeString();
    return date + " " + date2;
  };

  return (
    <>
      <tr className="border-b border-[#cdcdcd] ">
        <td className="font-normal px-5 py-4 text-sm">
          {returnFormattedDate()}
        </td>
        <td className="font-normal px-5 py-4 text-sm flex items-center space-x-4">
          {order.orderNumber}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {order.shippingNumber}
        </td>

        <td className="font-normal px-5 py-4 text-sm">
          <button className="h-10 w-10 rounded bg-neutral-200 flex items-center justify-center">
            <Icon height={18} icon="fluent:box-16-regular" />
          </button>
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          <button className="h-10 w-10 rounded bg-neutral-200 flex items-center justify-center">
            <Icon height={18} icon="la:shipping-fast" />
          </button>
        </td>

        <td className="font-normal px-5 py-4 text-sm">${order.totalAmount}</td>

        <td className="font-normal px-5 py-4 text-sm flex items-center">
          <button className="h-10 w-10 rounded bg-neutral-200 flex items-center justify-center">
            <Icon height={18} icon="fa-solid:file-invoice-dollar" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default OrderRow;
