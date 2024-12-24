import { PropsWithChildren } from "react";
import QueueMetricsService from "@/redis_connect"; // or wherever you have it
import QueueMetricsProvider, { QueueMetrics } from "./provider";

type LayoutProps = PropsWithChildren & {
  params: {
    branch: string; // This matches the dynamic segment [branch]
  };
};
export const dynamic = "force-dynamic";

export default async function RootLayout({ children, params }: LayoutProps) {
  // 1. Grab the branch ID from `params`
  const { branch } = await params;

  // 2. Fetch the metrics on the server side, passing in branch
  const metrics = await getQueueMetrics(branch);

  // 3. Wrap children in the QueueMetricsProvider
  return (
    <QueueMetricsProvider metrics={metrics}>
      {children}
    </QueueMetricsProvider>
  );
}

/**
 * Helper function to fetch metrics from Redis,
 * using the specific `branchId`.
 */
async function getQueueMetrics(branchId: string): Promise<QueueMetrics> {
  const queueMetricsService = new QueueMetricsService(process.env.REDIS_URL ?? "");

  try {
    await queueMetricsService.connect();

    // Adjust the keys so they have no space between `branchId` and the suffix.
    const queueKey = `${branchId} :waiting_queue`;


    return await queueMetricsService.getQueueMetrics(queueKey);
  } catch (error) {
    console.error("Error fetching queue metrics:", error);
    // Return a fallback if something goes wrong
    return { queueLength: 0, averageServiceTime: 0, averageWaitTime: 0 };
  } finally {
    await queueMetricsService.disconnect();
  }
}
