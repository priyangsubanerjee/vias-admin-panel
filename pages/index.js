import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  console.log(session);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email == "" || password == "") {
      alert("Fill the fields");
      return;
    }
    let response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response.error) {
      alert("something went wrong");
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6ECF3]">
      <div>
        <h1 className="text-lg font-bold text-[28px] text-[#023E8A] text-center">
          VIAS Cabinet Admin Dashboard
        </h1>
        <div className="border border-[#B0B0B0] rounded-[16px] mt-10 w-[500px] p-8">
          <h1 className="text-xl font-bold">Sign in</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            action=""
            className="mt-6"
          >
            <div>
              <label className="text-sm" htmlFor="">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 w-full mt-2 bg-white rounded-lg border border-[#BEBEBE] px-6"
              />
            </div>
            <div className="mt-3">
              <label className="text-sm" htmlFor="">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 w-full mt-2 bg-white rounded-lg border border-[#BEBEBE] px-6"
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-[#023E8A] w-full h-12 rounded-md text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
