import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Space, Table, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
import Print from "../../../icons/Print";
import Save from "../../../icons/Save";
const { Title, Text } = Typography;

const CarInfoTable = ({ carDataByPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const { cars, pagination } = useSelector((state) => state.carsData.carsData);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [carDetailsData, setCarDetailsData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setCarDetailsData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setCarDetailsData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    carDataByPagination(page);
  };

  const data = cars?.map((car) => {
    return {
      key: car._id,
      carModel: car.carModelName,
      licenseNo: car.carLicenseNumber,
      registerDate: moment(car?.createAt).format("llll"),
      owner: car.carOwner.fullName,
      status: car.tripStatus,
      printView: car,
    };
  });

  const columns = [
    {
      title: "Car Model",
      dataIndex: "carModel",
      key: "carModel",
    },
    {
      title: "License No",
      dataIndex: "licenseNo",
      key: "licenseNo",
      responsive: ["md"],
    },
    {
      title: "Register Date",
      dataIndex: "registerDate",
      key: "registerDate",
      responsive: ["lg"],
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],
    },

    {
      title: "PRINT/VIEW",
      dataIndex: "printView",
      key: "printView",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="text">
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
    <div>
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
                Car Details
              </Title>
              <Text>See all information about selected car</Text>
            </Typography>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={500}
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
        {carDetailsData && <DrawerPage carDetails={carDetailsData} />}
      </Drawer>
    </div>
  );
};
export default CarInfoTable;
