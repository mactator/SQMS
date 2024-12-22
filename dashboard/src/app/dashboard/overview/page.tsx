"use client";

import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Cpu, BarChart, Clock } from "lucide-react";

const DashboardOverview = () => {
  const [queueLength, setQueueLength] = useState<number>(0);
  const [averageWaitTime, setAverageWaitTime] = useState<number>(0);
  const [averageServiceTime, setAverageServiceTime] = useState<number>(0);
  const [ticketServed, setTicketServed] = useState<number[]>([]);
  const [counterData, setCounterData] = useState<Record<string, number>>({});

  useEffect(() => {
    // Mock SSE or API integration to fetch real-time data
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_STREAM_SERVICE}/stream/`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Real-time data received:", data);

        // Update metrics based on received data
        setQueueLength(data.queueLength || 0);
        setAverageWaitTime(data.averageWaitTime || 0);
        setAverageServiceTime(data.averageServiceTime || 0);
        setCounterData(data.counters || {});
        setTicketServed(data.ticketServed || []);
      } catch (error) {
        console.error("Error processing real-time data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

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
            <p className="text-xl font-bold">
              {averageWaitTime.toFixed(2)} mins
            </p>
            <p>Average Wait Time</p>
          </div>
        </div>

        {/* Average Service Time */}
        <div className="p-4 bg-gray-100 shadow rounded flex items-center">
          <Cpu className="w-12 h-12 text-red-500 mr-4" />
          <div>
            <p className="text-xl font-bold">
              {averageServiceTime.toFixed(2)} mins
            </p>
            <p>Average Service Time</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">
        {/* Line Chart: Tickets Served */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Tickets Served Over Time</h2>
          <Line
            data={{
              labels: ticketServed.map((_, index) => `T${index + 1}`),
              datasets: [
                {
                  label: "Tickets Served",
                  data: ticketServed,
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        {/* Bar Chart: Counters Performance */}
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Counters Performance</h2>
          <Bar
            data={{
              labels: Object.keys(counterData),
              datasets: [
                {
                  label: "Tickets Processed",
                  data: Object.values(counterData),
                  backgroundColor: "rgba(153, 102, 255, 0.6)",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="mt-8 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Counter Utilization</h2>
        <Pie
          data={{
            labels: Object.keys(counterData),
            datasets: [
              {
                label: "Counter Utilization",
                data: Object.values(counterData),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
