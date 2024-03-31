"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const handleLogut = () => {
    console.log("logging out!");
    Cookies.remove("token");
    router.push("/login");
  };
  useEffect(() => {
    const initialToken = Cookies.get("token");
    setToken(initialToken); // Set initial token on component mount
  }, []);

  return (
    <>
      <h1>logout</h1>
      <h2>{token}</h2>
      <button onClick={handleLogut}>exit</button>
    </>
  );
}
