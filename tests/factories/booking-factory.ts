import { prisma } from "@/config";
import {faker} from "@faker-js/faker";

export async function createBookingReponseWithRoom(){
    return {
        id: faker.datatype.number(),
        Room: {
            id:faker.datatype.number(),
            name: faker.address.cityPrefix(),
            capacity: faker.datatype.number(),
            hotelId:faker.datatype.number(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}

export async function createBooking(roomId: number, userId: number){
    return await prisma.booking.create({
        data: {
            userId, roomId
        }}
    )
}