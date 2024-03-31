import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Button, Space, message, Modal } from "antd";
import Loading from "../components/Loading";
import Error from "../components/Error";
import BACKEND_URL from "../utils/BaseUrl";

function AdminMemberpage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const columns = [
    { title: "Member ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },

    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <>
          {isAdmin === true ? (
            <Tag color="green">YES</Tag>
          ) : (
            <Tag color="red">NO</Tag>
          )}
        </>
      ),
    },
    {
      title: "Delete Member",
      key: "delete",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => confirmDeleteMember(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  async function getallmembers() {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/member/getallmembers`);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("Error fetching members. Please try again later.");
    }
    setLoading(false);
  }

  async function deleteMember(_id) {
    setError("");
    try {
      console.log("Deleting member with ID:", _id);
      await axios.delete(`${BACKEND_URL}/api/member/deletemember/${_id}`);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== _id)
      );
      message.success("Member deleted successfully");
    } catch (error) {
      console.error("Error deleting member:", error);
      setError("Error deleting member. Please try again later.");
    }
  }

  const confirmDeleteMember = (_id) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this member?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => deleteMember(_id),
    });
  };

  useEffect(() => {
    setLoading(true);
    getallmembers().finally(() => setLoading(false));
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={error} />
      ) : (
        <div className="col-md-12">
        <div className="table-container">
          <Table columns={columns} dataSource={members} rowKey="_id" />
        </div>
        </div>
      )}
    </div>

  );
}

export default AdminMemberpage;

