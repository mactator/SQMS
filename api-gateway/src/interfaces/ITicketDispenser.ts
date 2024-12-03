import { Ticket } from "./Ticket";

export interface ITicketDispenser {
  // 1- ticket interface to get next ticket
  getNextTicket(): Promise<Ticket>;
}
