const serialNumberModel = require('../../Database/model/serialnumberModel');
const genrateSerial = require('../../utils/getSerialNumber')






// get all serial number
async function getAllserialNumber(req,res) {
 
    
    try {
    
        const response = await  serialNumberModel.find({}).populate('user');
          
        return res.send(response.reverse())
        
    } catch (error) {
       return res.status(500).json({
        message:'Something went wrong'
       })
    }

    }


    //genrate serial number
    async function generateSerialNumber(req,res) {
        // const payload = await req.body;


        const newSerial = {
            
            serial: genrateSerial(),
            isValid:true,
            // dateGenerated: '',
            dateUsed:'',
            // user:{}
        }
       


        try {
            const serial = new serialNumberModel(newSerial);
    
            serial.save().then((newSerial) => {

            res.json({
                data: newSerial,
            });
        }); 
        } catch (error) {
            return res.status(500).json({
                message:error
               })
        }
    

    
       
    }



    //Delete serial number
    async function deleteSerialNumber(req,res) {
        const Id = req.params.id;
    
        serialNumberModel.findByIdAndDelete(Id, (err, serial) => {
            if (err) {
                return res.status(404).json({
                    message: err,
                });
            }
    
            return res.json({
                data: serial,
                message:'serial Deleted successfully'
            });
        });
    }




    module.exports = {
        getAllserialNumber,generateSerialNumber,deleteSerialNumber
    }