import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Redirect() {
  const router = useRouter();
  useEffect(() => {
    if (router.query.url) {
      router.push(router.query.url);
    } else {
      router.push("/");
    }
  }, [router, router.query.url]);
  return <div>Redirecting ...</div>;
}

export default Redirect;
