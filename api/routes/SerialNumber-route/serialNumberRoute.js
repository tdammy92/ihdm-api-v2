const express = require("express");
const serialNumberRouter = express.Router();

const verifyToken = require('../../middleware/verify');


const { getAllserialNumber,generateSerialNumber,deleteSerialNumber} = require('../../controllers')


    //get all student route
    serialNumberRouter.get("/",verifyToken,getAllserialNumber);


//resgister student route
// serialNumberRouter.post("/",verifyToken,uploadImage, studentRegistration);
serialNumberRouter.post("/generate",verifyToken ,generateSerialNumber);



//delete serialNumber route by id route
serialNumberRouter.delete("/:id",verifyToken, deleteSerialNumber);

module.exports = serialNumberRouter;