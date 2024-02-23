import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import MyBookingpage from "./MyBookingpage";

const { TabPane } = Tabs;

function Profilepage() {
  const member = JSON.parse(localStorage.getItem("currentMember"));

  useEffect(() => {
    if (!member) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-5 mt-5">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>Member Profile</h1>
          <br />
          <h2>Name: {member.data.name}</h2>
          <h2>Email: {member.data.email}</h2>
          <h2>isAdmin: {member.data.isAdmin ? "Yes" : "No"}</h2>
        </TabPane>
        <TabPane tab="Reservations" key="2">
          <MyBookingpage></MyBookingpage>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilepage;

/*
<Tabs
defaultActiveKey="1"
items={[
  {
    label: 'Tab 1',
    key: '1',
    children: 'Tab 1',
  },
  {
    label: 'Tab 2',
    key: '2',
    children: 'Tab 2',
    disabled: true,
  },
]}
/>
*/