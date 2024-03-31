"use client";

const { redirect } = require("next/navigation");
const { useEffect, Component } = require("react");
const { sessionStatus } = require("./session");

export default function withauth(Component) {
  return function (props) {
    useEffect(() => {
      const localData = localStorage.getItem("token");
      console.log(localData);
      if (!localData) {
        alert("please login ");
        redirect("/login"); // Redirect to login page if token doesn't exist
      }
    }, []);

    return <Component {...props} />;
  };
}
