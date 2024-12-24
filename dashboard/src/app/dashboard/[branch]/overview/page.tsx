"use client";

import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Cpu, BarChart, Clock } from "lucide-react";
import { useQueueMetrics } from "../provider";

export default function DashboardOverview() {
  // 1. Get metrics from context
  const { queueLength, averageWaitTime, averageServiceTime } = useQueueMetrics();

  // 2. Build chart data and options
  const labels = ["Queue Length", "Avg. Wait Time", "Avg. Service Time"];
  const values = [queueLength, averageWaitTime, averageServiceTime];

  // Common dataset
  const dataset = {
    labels,
    datasets: [
      {
        label: "Metrics",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",  // For queue length
          "rgba(54, 162, 235, 0.6)",  // For avg wait time
          "rgba(75, 192, 192, 0.6)",  // For avg service time
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // For the line chart, you typically have multiple points in time.
  // Here, we'll just show one data point for each metric, 
  // but it won't look very "line-like". It's purely for demonstration.
  const lineData = {
    labels, 
    datasets: [
      {
        label: "Metrics",
        data: values,
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // 3. Render the dashboard
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Queue Length */}
        <div className="p-4 bg-gray-100 shadow rounded flex items-center">
          <BarChart className="w-12 h-12 text-blue-500 mr-4" />
          <div>
            <p className="text-xl font-bold">{queueLength}</p>
            <p>Queue Length</p>
          </div>
        </div>

        {/* Average Wait Time */}
        <div className="p-4 bg-gray-100 shadow rounded flex items-center">
          <Clock className="w-12 h-12 text-green-500 mr-4" />
          <div>
            <p className="text-xl font-bold">{averageWaitTime.toFixed(2)} mins</p>
            <p>Average Wait Time</p>
          </div>
        </div>

        {/* Average Service Time */}
        <div className="p-4 bg-gray-100 shadow rounded flex items-center">
          <Cpu className="w-12 h-12 text-red-500 mr-4" />
          <div>
            <p className="text-xl font-bold">{averageServiceTime.toFixed(2)} mins</p>
            <p>Average Service Time</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Bar Chart</h2>
          <Bar
            data={dataset}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Pie Chart</h2>
          <Pie
            data={dataset}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
              },
            }}
          />
        </div>

        {/* Line Chart */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Line Chart</h2>
          <Line
            data={lineData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
