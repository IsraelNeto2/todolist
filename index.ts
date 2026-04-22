import express from "express";
import router from "./routes.ts";
import jwt from "jsonwebtoken";

const payLoad = {
    userID: "1a86256f-7172-43dd-a77e-d66c0cdaa506",
    name: "Israel Neto"
}

const secret = "3795cd90-f3a4-414d-87d7-16ab37e76751";

const options = {
    expiresIn: '1h' as const
}


const token = jwt.sign(payLoad, secret, options);


    try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
} catch (err: any) {
    console.log({error: err.message});
    
}





// console.log(token);
 
const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(router);


server.listen(3000);
