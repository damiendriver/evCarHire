import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag } from "antd";
import Loading from "../components/Loading";
import Error from "../components/Error";

function AdminMemberpage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
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
  ];

  async function getallmembers() {
    setError("");
    setLoading(true);
    try {
      const response = (await axios.post("/api/member/getallmembers"));
      setMembers(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  }
  useEffect(() => {
    getallmembers();
  }, []);

  return (
    <div className="row">
      {loading ? (
         <Loading></Loading>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          <Table columns={columns} dataSource={members} />
        </div>
      )}
    </div>
  );
}

export default AdminMemberpage;