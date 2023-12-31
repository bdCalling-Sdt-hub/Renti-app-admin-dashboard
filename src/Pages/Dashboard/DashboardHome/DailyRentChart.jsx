import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../../../../Config";

export default function DailyRentChart() {
  const [rentByHour, setRentByHour] = useState([]);

  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/api/rent/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setRentByHour(res.data.rentsByHour))
      .catch((err) => console.log(err));
  }, []);

  const data = rentByHour.map((rent, index) => {
    return {
      time: index + 1 + "hr",
      rent: rent,
    };
  });

  return (
    <div
      style={{
        width: "100%",
        border: "3px solid #000b90",
        borderRadius: "15px",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginTop: "10px", marginBottom: "10px", color: "#000b90" }}>
        Daily rent
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={600}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="rent" stroke="#000b90" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
