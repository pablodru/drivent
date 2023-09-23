import joi from "joi";

export const paymentSchemaQuery = joi.object({
    ticketTypeId: joi.number().required()
})