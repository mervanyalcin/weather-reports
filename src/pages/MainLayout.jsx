import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  return (
    <>
      <div className="mx-auto max-w-5xl mb-20 px-10 pt-4 pb-20">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
