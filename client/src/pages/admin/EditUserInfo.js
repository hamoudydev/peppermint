import React, { useState, useEffect } from "react";
import { Space, Table, Button, Popconfirm  } from "antd";

import { baseUrl } from "../../utils";
import ResetPassword from "../../component/admin/ResetPassword";
import EditInfo from "../../component/admin/EditInfo";

const EditUserInfo = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await fetch(`${baseUrl}/api/v1/auth/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUsers(res.users);
        }
      });
  };

  const deleteClient = async (client) => {
    const id = client._id;
    console.log(id)
    try {
      await fetch(`${baseUrl}/api/v1/auth/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button>
              <EditInfo user={record}/>
          </Button>
          <Popconfirm title="Are you sure you want to delete?"
          onConfirm={() => deleteClient(record)}>
            <Button>Delete</Button>
          </Popconfirm>
          <ResetPassword />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default EditUserInfo;