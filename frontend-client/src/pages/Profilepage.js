import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import MyBookingpage from "./MyBookingpage";

function Profilepage() {
  const member = JSON.parse(localStorage.getItem("currentMember"));

  useEffect(() => {
    if (!member) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-5 mt-5">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Member Profile",
            key: "2",
            children: [
              <p key="name">
                <b>Name:</b> {member.data.name}
              </p>,
              <p key="email">
                <b>Email:</b> {member.data.email}
              </p>,
              <p key="isadmin">
                <b>isAdmin:</b> {member.data.isAdmin ? "Yes" : "No"}
              </p>,
            ],
          },
          {
            label: "Reservations",
            key: "1",
            children: <MyBookingpage></MyBookingpage>,
          },
        ]}
      />
    </div>
  );
}

export default Profilepage;