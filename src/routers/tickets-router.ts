import { getTicketsType } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('*', authenticateToken)
    .get('/types', getTicketsType)

export default ticketsRouter;