import { Ticket } from "./Ticket";

export interface ITicketQueue {
  // enqueue
  enqueu(ticket: Ticket): Promise<boolean>;

  // dequeue
  dequeu(): Promise<Ticket | null>;

  // get the whole queue
  getQueue(): Promise<Ticket[]>
}
