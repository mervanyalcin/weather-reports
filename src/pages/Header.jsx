import * as React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="max-w-4xl m-auto my-8 flex flex-col gap-y-6 text-center items-center ">
      <Link to={"/"}>
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          alt=""
          className="w-[400px]"
        />
      </Link>
      <p className="">
        Sadece 1 gün değil, 7 günün hava durumunu size gösteren yardımcınız
      </p>
    </div>
  );
}
export default Header;
