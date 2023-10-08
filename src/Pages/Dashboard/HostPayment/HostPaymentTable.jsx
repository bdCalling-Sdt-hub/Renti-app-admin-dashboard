import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const HostPaymentTable = ({
  hostPaymentDataGetByPagination,
  hostPaymentDataGetBySearch,
}) => {
  const [userInfoData, setUserInfoData] = useState([]); // Data fetched from the server
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 10;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { hostPaymentList, pagination } = useSelector(
    (state) => state.HostPaymentData
  );

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setUserInfoData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setUserInfoData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    hostPaymentDataGetByPagination(page);
    hostPaymentDataGetBySearch(page);
  };

  const data = hostPaymentList?.map((item) => {
    return {
      key: item._id,
      tripno: item.rentTripNumber,
      time: item.time,
      username: item.carOwner,
      totalamount: item.originalAmount,
      paidamount: item.paidAmount,
      status: item.status == false ? "Pending" : "Complete",
      printView: "Button",
    };
  });

  const columns = [
    {
      title: "Trip No",
      dataIndex: "tripno",
      key: "tripno",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      responsive: ["md"],
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "Total amount",
      dataIndex: "totalamount",
      key: "totalamount",
    },
    {
      title: "Paid Amount",
      dataIndex: "paidamount",
      key: "paidamount",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => showDrawer(record)} type="text">
            <Print />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <Save />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={5} strong>
                Invoice # trip no.- {userInfoData && userInfoData.tripno}
              </Title>
              <Text>
                See all information about the trip no. -{" "}
                {userInfoData && userInfoData.tripno}
              </Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
        closable={false}
        extra={
          <Space>
            <Button
              style={{
                borderRadius: "100%",
                backgroundColor: "white",
                color: "red",
                height: "50px",
                width: "50px",
                textAlign: "center",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined />
            </Button>
          </Space>
        }
      >
        {userInfoData && <DrawerPage userInfoData={userInfoData} />}
      </Drawer>
    </>
  );
};

export default HostPaymentTable;
