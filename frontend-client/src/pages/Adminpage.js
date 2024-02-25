import React from "react";
import { Tabs } from "antd";
import AdminBookingpage from "./AdminBookingpage";
import AdminCarpage from "./AdminCarpage";

function Adminpage() {
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
            children: "new car info",
          },
          {
            label: "Members",
            key: "4",
            children: "Members and Users",
          },
        ]}
      />
    </div>
    )
}
export default Adminpage