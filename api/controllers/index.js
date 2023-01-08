const {Login,Register} = require('./Admin-controller/adminController');
const { getAllserialNumber,generateSerialNumber,updateSerialNumber} = require('./serialNumber-Controller/serialNumberController')

const  {
    getAllStudent,getRecentStudent,getStudentById,studentRegistration,deleteStudent
}  = require("./Register-controller/registerController");




module.exports = {
    Login,Register, getAllStudent,getStudentById,studentRegistration,deleteStudent, getAllserialNumber,generateSerialNumber,updateSerialNumber,getRecentStudent
}