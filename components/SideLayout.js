import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function SideLayout({ children }) {
  const router = useRouter();
  return (
    <div className="min-h-screen fixed inset-0 h-full w-full overflow-hidden flex">
      <div className="h-screen w-[450px] overflow-auto bg-white px-[50px] py-[70px] relative">
        <h1 className="text-2xl font-semibold text-[#023E8A]">VIAS Cabinet</h1>
        <p className="text-[#777777] tracking-[1.28px] text-sm mt-10">
          GENERAL
        </p>
        <ul className="mt-7 space-y-2">
          <Link className="block" href={"/inventory"}>
            <li
              style={{
                background: router.pathname === "/inventory" && "#023E8A",
                color: router.pathname === "/inventory" ? "white" : "black",
              }}
              className="flex items-center space-x-4  px-4 py-3 rounded-lg text-sm"
            >
              <span
                style={{
                  color: router.pathname === "/inventory" ? "" : "black",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 22q-.825 0-1.413-.588T3 20V8.725q-.45-.275-.725-.713T2 7V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v3q0 .575-.275 1.012T21 8.725V20q0 .825-.588 1.413T19 22H5ZM4 7h16V4H4v3Zm5 7h6v-2H9v2Z"
                  />
                </svg>
              </span>
              <span className="">Inventory</span>
            </li>
          </Link>
          <Link className="block" href={"/orders"}>
            <li
              style={{
                background: router.pathname === "/orders" && "#023E8A",
                color: router.pathname === "/orders" ? "white" : "black",
              }}
              className="flex items-center space-x-4  px-4 py-3 rounded-lg text-sm"
            >
              <span
                style={{
                  color: router.pathname === "/orders" ? "" : "black",
                }}
              >
                <Icon height={24} icon="icon-park-solid:transaction-order" />
              </span>
              <span className="">Orders</span>
            </li>
          </Link>
          <li className="flex items-center space-x-4 bg-[#023E8A]/0 text-black px-4 py-3 rounded-lg text-sm">
            <span className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.33 20H14.12C13.6968 19.958 13.2979 19.7822 12.9814 19.498C12.6649 19.2139 12.4472 18.8363 12.36 18.42L9.68 6L6.92 12.4C6.84193 12.5789 6.71323 12.731 6.54975 12.8376C6.38627 12.9442 6.19517 13.0007 6 13H3C2.73478 13 2.48043 12.8946 2.29289 12.7071C2.10536 12.5196 2 12.2652 2 12C2 11.7348 2.10536 11.4804 2.29289 11.2929C2.48043 11.1054 2.73478 11 3 11H5.34L7.85 5.21C8.01896 4.82146 8.30695 4.49662 8.67244 4.28231C9.03793 4.068 9.46203 3.97529 9.88361 4.01756C10.3052 4.05983 10.7024 4.23489 11.0181 4.51749C11.3338 4.8001 11.5515 5.17565 11.64 5.59L14.32 18L17.08 11.62C17.155 11.4374 17.2824 11.2811 17.4461 11.1707C17.6099 11.0604 17.8026 11.001 18 11H21C21.2652 11 21.5196 11.1054 21.7071 11.2929C21.8946 11.4804 22 11.7348 22 12C22 12.2652 21.8946 12.5196 21.7071 12.7071C21.5196 12.8946 21.2652 13 21 13H18.66L16.15 18.79C15.9967 19.1465 15.7431 19.4507 15.4199 19.6656C15.0967 19.8804 14.718 19.9966 14.33 20Z"
                  fill="#1B1B1B"
                />
              </svg>
            </span>
            <span className="">Sales</span>
          </li>
          <Link href={"/customers"}>
            <li
              style={{
                background: router.pathname === "/customers" && "#023E8A",
                color: router.pathname === "/customers" ? "white" : "black",
              }}
              className="flex items-center space-x-4  px-4 py-3 rounded-lg text-sm"
            >
              <span>
                <Icon height={24} icon="clarity:users-solid" />
              </span>
              <span className="">Customers</span>
            </li>
          </Link>
          <Link href={"/door-colors"}>
            <li
              style={{
                background: router.pathname === "/door-colors" && "#023E8A",
                color: router.pathname === "/door-colors" ? "white" : "black",
              }}
              className="flex items-center space-x-4  px-4 py-3 rounded-lg text-sm"
            >
              <span>
                <Icon height={24} icon="ph:door-open-light" />
              </span>
              <span className="">Doors</span>
            </li>
          </Link>
          <li className="flex items-center space-x-4 bg-[#023E8A]/0 text-black px-4 py-3 rounded-lg text-sm">
            <span className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.33 20H14.12C13.6968 19.958 13.2979 19.7822 12.9814 19.498C12.6649 19.2139 12.4472 18.8363 12.36 18.42L9.68 6L6.92 12.4C6.84193 12.5789 6.71323 12.731 6.54975 12.8376C6.38627 12.9442 6.19517 13.0007 6 13H3C2.73478 13 2.48043 12.8946 2.29289 12.7071C2.10536 12.5196 2 12.2652 2 12C2 11.7348 2.10536 11.4804 2.29289 11.2929C2.48043 11.1054 2.73478 11 3 11H5.34L7.85 5.21C8.01896 4.82146 8.30695 4.49662 8.67244 4.28231C9.03793 4.068 9.46203 3.97529 9.88361 4.01756C10.3052 4.05983 10.7024 4.23489 11.0181 4.51749C11.3338 4.8001 11.5515 5.17565 11.64 5.59L14.32 18L17.08 11.62C17.155 11.4374 17.2824 11.2811 17.4461 11.1707C17.6099 11.0604 17.8026 11.001 18 11H21C21.2652 11 21.5196 11.1054 21.7071 11.2929C21.8946 11.4804 22 11.7348 22 12C22 12.2652 21.8946 12.5196 21.7071 12.7071C21.5196 12.8946 21.2652 13 21 13H18.66L16.15 18.79C15.9967 19.1465 15.7431 19.4507 15.4199 19.6656C15.0967 19.8804 14.718 19.9966 14.33 20Z"
                  fill="#1B1B1B"
                />
              </svg>
            </span>
            <span className="">Blogs</span>
          </li>
        </ul>
        <div className="absolute bottom-0 inset-x-0 w-full py-10 border-t">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center space-x-2 text-[#FF5858] font-medium"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M9.22351 21.6667H4.89018C4.31554 21.6667 3.76444 21.4384 3.35811 21.0321C2.95178 20.6257 2.72351 20.0746 2.72351 19.5V6.50001C2.72351 5.92537 2.95178 5.37427 3.35811 4.96795C3.76444 4.56162 4.31554 4.33334 4.89018 4.33334H9.22351V6.50001H4.89018V19.5H9.22351V21.6667Z"
                  fill="#FF5858"
                />
                <path
                  d="M14.9955 18.8338L16.5338 17.3084L12.2872 13.026H22.1932C22.4805 13.026 22.7561 12.9119 22.9592 12.7087C23.1624 12.5056 23.2765 12.23 23.2765 11.9427C23.2765 11.6554 23.1624 11.3798 22.9592 11.1767C22.7561 10.9735 22.4805 10.8594 22.1932 10.8594H12.2677L16.5793 6.58344L15.054 5.0451L8.13043 11.9102L14.9955 18.8338Z"
                  fill="#FF5858"
                />
              </svg>
            </span>
            <span>Log out</span>
          </button>
          <p className="text-center text-xs text-[#A3A3A3] mt-8">
            VIAS Cabinet v1.0
          </p>
        </div>
      </div>
      <div className="h-screen w-full overflow-auto bg-[#F8F8F8]">
        {children}
      </div>
    </div>
  );
}

export default SideLayout;
