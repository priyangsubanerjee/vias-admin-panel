import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6ECF3]">
      <div>
        <h1 className="text-lg font-bold text-[28px] text-[#023E8A] text-center">
          VIAS Cabinet Admin Dashboard
        </h1>
        <div className="border border-[#B0B0B0] rounded-[16px] mt-10 w-[500px] p-8">
          <h1 className="text-xl font-bold">Sign in</h1>
          <form action="" className="mt-6">
            <div>
              <label className="text-sm" htmlFor="">
                Email address
              </label>
              <input
                type="email"
                className="h-14 w-full mt-2 bg-white rounded-lg border border-[#BEBEBE] px-6"
              />
            </div>
            <div className="mt-3">
              <label className="text-sm" htmlFor="">
                Password
              </label>
              <input
                type="password"
                className="h-14 w-full mt-2 bg-white rounded-lg border border-[#BEBEBE] px-6"
              />
            </div>
            <div className="mt-10">
              <button className="bg-[#023E8A] w-full h-12 rounded-md text-white">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
