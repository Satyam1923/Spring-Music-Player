import React from "react";
import "./Style.css";
import {
  BellSimpleRinging,
  CaretLeft,
  CaretRight,
  List,
  UserCircle,
} from "phosphor-react";
export default function Header({ settoggleSidebar }) {
  return (
    <div className="header">
      <div className="header-icons">
        <CaretLeft className="i" />
        <CaretRight className="i" />
      </div>

      <div className="header-icons">
        <UserCircle className="i" />
        <BellSimpleRinging className="i" />
        <List
          className="i hambergure"
          onClick={() => {
            settoggleSidebar((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}
