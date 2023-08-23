import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;

const data = [
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
  {
    name: "Kate Winslate",
    email: "kate@gmail.com",
    contact: " 014845454545",
    joiningDate: "22/05/2023",
    cars: 20,
  },
];

const HostInfoTable = () => {
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "CONTACT",
      dataIndex: "contact",
      key: "contact",
      responsive: ["lg"],
    },
    {
      title: "JOINING DATE",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "CARS",
      dataIndex: "cars",
      key: "cars",
      responsive: ["md"],
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ marginRight: "10px" }}
          >
            <BsEye style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
          <Button type="text">
            <RiDeleteBin5Line style={{ fontSize: "30px", color: "#999999" }} />
          </Button>
        </div>
      ),
    },
  ];

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hostData, setHostData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostData(null);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <Title level={5} strong>
                Invoice# Trip No.{hostData?.tripNo}
              </Title>
              <Text>See all information about the trip no. 68656</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose fontSize={25} />
            </Button>
          </div>
        }
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
      >
        {hostData && <DrawerPage hostData={hostData} />}
      </Drawer>
    </div>
  );
};

export default HostInfoTable;
