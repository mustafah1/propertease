import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

// Define the StatBox component
const StatBox = ({ title, subtitle, icon }) => {
  return (
    <Box>
      {icon}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </Box>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [propertyStats, setPropertyStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://propertease-api.onrender.com/properties"
        );
        const data = await response.json();
        const totalTenants = data.filter(
          (property) => property.tenant_username
        ).length;
        const totalProperties = data.length;
        const outstandingMaintenanceOrders = data.filter(
          (property) => property.rental_cost
        ).length;
        setPropertyStats({
          totalTenants,
          totalProperties,
          outstandingMaintenanceOrders,
        });
      } catch (error) {
        console.log("Error fetching property stats:", error);
      }
    };

    fetchData();
  }, []);

  const propertyData = [
    { name: "Property 1", income: 1000, maintenanceCosts: 200, profit: 800 },
    { name: "Property 2", income: 1500, maintenanceCosts: 300, profit: 1200 },
    { name: "Property 3", income: 2000, maintenanceCosts: 400, profit: 1600 },
    // Add more properties as needed
  ];

  return (
    <Box>
      <Header
        title="Landlord Dashboard"
        subtitle="Welcome to this dashboard {username}"
      />

      {/* <Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Download Reports
        </Button>
      </Box> */}

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={theme.palette.primary.main}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={propertyStats?.totalTenants || "-"}
              subtitle="Total No. Tenants"
              icon={
                <PersonAddIcon
                  sx={{ color: theme.palette.grey[200], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={theme.palette.primary.main}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={propertyStats?.totalProperties || "-"}
              subtitle="Total No. Properties"
              icon={
                <PointOfSaleIcon
                  sx={{ color: theme.palette.grey[200], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={theme.palette.primary.main}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={propertyStats?.outstandingMaintenanceOrders || "-"}
              subtitle="Amount of Outstanding Maintenance Orders"
              icon={
                <PersonAddIcon
                  sx={{ color: theme.palette.grey[200], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={theme.palette.primary.main}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="1,325,134"
              subtitle="THINK OF ONE MORE"
              icon={
                <TrafficIcon
                  sx={{ color: theme.palette.grey[200], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
      </Box>

      <Box mt={8} mx={4}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={propertyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar
              dataKey="income"
              fill={theme.palette.success.main}
              name="Income"
            />
            <Bar
              dataKey="maintenanceCosts"
              fill={theme.palette.error.main}
              name="Maintenance Costs"
            />
            <Bar
              dataKey="profit"
              fill={theme.palette.grey[300]}
              name="Profit"
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
