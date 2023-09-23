import { TicketBody } from "@/protocols";
import joi from "joi";

export const ticketsSchema = joi.object<TicketBody>({
    ticketTypeId: joi.number().required()
})