"use client";

import React, { createContext, useContext } from "react";

// Define the shape of your metrics
export type QueueMetrics = {
  queueLength: number;
  averageWaitTime: number;
  averageServiceTime: number;
};

// Create the context with default values
const QueueMetricsContext = createContext<QueueMetrics>({
  queueLength: 0,
  averageWaitTime: 0,
  averageServiceTime: 0,
});

type QueueMetricsProviderProps = {
  children: React.ReactNode;
  metrics: QueueMetrics;
};

// Provider component that supplies metrics via React Context
export default function QueueMetricsProvider({
  children,
  metrics,
}: QueueMetricsProviderProps) {
  return (
    <QueueMetricsContext.Provider value={metrics}>
      {children}
    </QueueMetricsContext.Provider>
  );
}

// Optional custom hook to consume the context
export function useQueueMetrics() {
  return useContext(QueueMetricsContext);
}
