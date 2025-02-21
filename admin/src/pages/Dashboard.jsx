import React, { useEffect, useState } from "react";
import { ShoppingCart, Users, Package, CheckCircle, BarChart } from "lucide-react";
import Widget from "../components/Widget";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { backendUrl } from "../App";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([])
  const [products, setProducts] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchAllUsers = async() => {
    try {
      const response = await axios.get(backendUrl + '/api/user/allusers');
      setUsers(response.data.users.slice(0, 5));
      setTotalUsers(response.data.users.length);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  }

  const fetchAllProducts = async() => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      if(response.data.success) {
        setProducts(response.data.products)
        setTotalProducts(response.data.products.length);
      }
    } catch (error) {
      console.log(error); 
    }
  }

  const fetchAllOrders = async() => {
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {});
      setOrders(response.data.orders.slice(0, 5));
      setAllOrders(response.data.orders)
    } catch (error) {
      console.error("error in fetching orders:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    fetchAllUsers();
    fetchAllOrders();
    fetchAllProducts();
  }, []);

  // console.log(users);
  // console.log(orders);
  console.log(allOrders);

  const prepareChartData = () => {
    const today = new Date();
    const dates = [];
    const orderCounts = new Array(30).fill(0);
  
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).replace(' ', '-');
      dates.push(dateString);
    }
  
    allOrders.forEach(order => {
      const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).replace(' ', '-');
      const index = dates.indexOf(orderDate);
      if (index !== -1) {
        orderCounts[index]++;
      }
    });
  
    return {
      labels: dates,
      datasets: [
        {
          label: "Number of Orders",
          data: orderCounts,
          backgroundColor: '#8C1018',
        },
      ],
    };
  };
  

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Orders in the Last 30 Days',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Orders',
        },
        beginAtZero: true,
      },
    },
  }
  

  const doughnutOptions = { responsive: true, maintainAspectRatio: true, cutout: "70%" };

  const newCustomersData = {
    labels: ["New", "Returning"],
    datasets: [
      {
        data: [5, 9], // Example data
        backgroundColor: ["#4CAF50", "#FF6384"],
        hoverBackgroundColor: ["#45a049", "#FF4365"],
      },
    ],
  };

  const totalCustomersData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [12, 1], // Example data
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#2a90d7", "#FFB733"],
      },
    ],
  };

  const salesLast30DaysData = {
    labels: ["This Month", "Previous Months"],
    datasets: [
      {
        data: [8000, 7200], // Example data
        backgroundColor: ["#FF9800", "#9C27B0"],
        hoverBackgroundColor: ["#FB8C00", "#7B1FA2"],
      },
    ],
  };

  const totalSalesData = {
    labels: ["Completed Sales", "Refunds"],
    datasets: [
      {
        data: [15000, 200], // Example data
        backgroundColor: ["#009688", "#E91E63"],
        hoverBackgroundColor: ["#00897B", "#D81B60"],
      },
    ],
  };

  return (
    <div className="container mx-auto md:p-6">
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Widget title="Orders Pending" value={125} icon={ShoppingCart} bgColor="from-blue-400 to-blue-600" link="/list" />
        <Widget title="Orders Processing" value={85} icon={Package} bgColor="from-yellow-400 to-yellow-600" link="/list" />
        <Widget title="Orders Completed" value={320} icon={CheckCircle} bgColor="from-green-400 to-green-600" link="/list" />
        <Widget title="Total Users" value={totalUsers} icon={Users} bgColor="from-indigo-400 to-indigo-600" link="/users" />
        <Widget title="Total Products" value={totalProducts} icon={Package} bgColor="from-purple-400 to-purple-600" link="/list" />
        <Widget title="Total Sales" value="$15,200" icon={BarChart} bgColor="from-pink-400 to-pink-600" link="/list" />
      </div>

      {/* Doughnut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white h-85 p-4 rounded-lg shadow-lg">
          <h3 className="text-center font-semibold mb-4">New Customers</h3>
          <Doughnut data={newCustomersData} options={doughnutOptions} />
        </div>
        <div className="bg-white h-85 p-4 rounded-lg shadow-lg">
          <h3 className="text-center font-semibold mb-4">Total Customers</h3>
          <Doughnut data={totalCustomersData} options={doughnutOptions} />
        </div>
        <div className="bg-white h-85 p-4 rounded-lg shadow-lg">
          <h3 className="text-center font-semibold mb-4">Sales Last 30 Days</h3>
          <Doughnut data={salesLast30DaysData} options={doughnutOptions} />
        </div>
        <div className="bg-white h-85 p-4 rounded-lg shadow-lg">
          <h3 className="text-center font-semibold mb-4">Total Sales</h3>
          <Doughnut data={totalSalesData} options={doughnutOptions} />
        </div>
      </div>

      {/* orders and user table  */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* orders table */}
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto"> {/* Makes table scrollable on small screens */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left whitespace-nowrap">Order ID</th>
                  <th className="p-2 text-left whitespace-nowrap">Date</th>
                  <th className="p-2 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">
                      <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline">
                        See Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Users Table */}
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          <div className="overflow-x-auto">  {/* Add this div for responsiveness */}
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left whitespace-nowrap">Email</th>
                  <th className="p-2 text-left whitespace-nowrap">Joined</th>
                  <th className="p-2 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">
                      <Link to={`/user/${user._id}`} className="text-blue-600 hover:underline">
                        See Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* total sales in last 30 days */}
      <div className="bg-white p-4 rounded-lg shadow-lg mt-8">
        <h3 className="text-lg font-semibold mb-4">Orders in the Last 30 Days</h3>
        <Bar data={prepareChartData()} options={chartOptions} />
      </div>

    </div>
  );
};

export default Dashboard;
