import React, { useEffect } from "react";
import { Tabs } from "antd";
import AdminBookingpage from "./AdminBookingpage";
import AdminCarpage from "./AdminCarpage";
import AdminMemberpage from "./AdminMemberpage";
import AdminAddCarpage from "./AdminAddCarpage";

function Adminpage() {
  const member = JSON.parse(localStorage.getItem("currentMember"));

  useEffect(() => {
    if (!member || member.isAdmin === false) {
      window.location.href = "/home";
    }
  }, [member]);
  

  return (
    <div className="m-5 mt-5 box">
      <h2 className="text-center">Admin Panel</h2>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Reservations",
            key: "1",
            children: <AdminBookingpage></AdminBookingpage>,
          },
          {
            label: "Cars",
            key: "2",
            children: <AdminCarpage></AdminCarpage>,
          },
          {
            label: "Add Cars",
            key: "3",
            children: <AdminAddCarpage></AdminAddCarpage>,
          },
          {
            label: "Members",
            key: "4",
            children: <AdminMemberpage></AdminMemberpage>,
          },
        ]}
      />
    </div>
  );
}
export default Adminpage;
