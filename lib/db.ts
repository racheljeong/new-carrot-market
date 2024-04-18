import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();


// db.user.create({
//    data : {
//     phone :"121212",

//    }
// });


export default db;