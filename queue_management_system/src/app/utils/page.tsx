"use client";
import TicketComponent from "@/components/ticket";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const userTicket = useParams()["user_ticket"];
  return (
    <div className="flex justify-center items-center min-h-screen">
      <TicketComponent number={userTicket as string} />
    </div>
  );
};

export default Page;
