import React from "react";
import AdminInterface from "../components/AdminInterface"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  return (
    <div className="Main">
      <AdminInterface />
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default Admin;
