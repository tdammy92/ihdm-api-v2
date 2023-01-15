const registerModel = require("../../Database/model/registerModel");

const serialNumberModel = require("../../Database/model/serialnumberModel");

// get all student route
async function getAllStudent(req, res) {
	console.log("this code ran");
	const query = req.query ;

let filter = {}
// const search = req.query.search ?? '' ;

if (query) {
	
	const name = Object.keys(query)[0];
	const value = Object.values(query)[0];
	


		// filter = {name:{$regex:value,$options:"i"}}

		if (name==='Fname') {
			filter = {Fname:{$regex:value,$options:"i"}}
			
		}
		if (name==='Lname') {
			filter = {Lname:{$regex:value,$options:"i"}}
			
		}
		if (name==='state') {
			filter = {state:{$regex:value,$options:"i"}}
			
		}
		
		if (name==='phone') {
			filter = {phone:{$regex:value,$options:"i"}}
			
		}
		if (name==='stateCode') {
			filter = {stateCode:{$regex:value,$options:"i"}}
			
		}
	}



	try {
		// const response = await  registerModel.find({}).populate('user');
		const response = await registerModel.find(filter).sort({'createdAt':'desc'});

		// const notes = response.map((note)=>{
		// 	return {...note,user:{password:undefined,token:undefined}}
		// })

		return res.send(response);
	
	} catch (error) {
		return res.status(500).json({
			message: "Somthing went wrong",
		});
	}
}



// get all student route
async function getRecentStudent(req, res) {

	try {
		// const response = await  registerModel.find({}).populate('user');
		const response = await registerModel.find({});

		const recent = response?.reverse().slice(0,10)

		console.log(recent.length)

		return res.send(recent);
	} catch (error) {
		return res.status(500).json({
			message: "Somthing went wrong",
		});
	}
}
//get student by Id


async function getStudentById(req,res) {
	const id = req.params.id;

	try {
		registerModel.findById(id, function (err, student) {

			if (err) {
				return res.status(400).json({
					status: "failure",
					message: "Somtheing went wrong",
				});
			}else{
				return res.send(student);
			}
		})
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failure",
			message: "Something went wrong",
		});
	}
	
}



async function studentRegistration(req, res) {
	const payload = req.body;


	try {
		const newStudent = new registerModel(payload);

		newStudent.save((err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					status: "failed",
					message: err,
			
				});
			}

			if (result) {
				serialNumberModel.updateOne(
					{ _id: result?.serialNumber },
					{ isValid: false, user: result?._id ,dateUsed:Date.now()},
					(err, temp) => {
						if (err) {
							return res.status(404).json(err);
						}else{
                            return res.status(201).json(result);
                        }

                    
					}
				);
				// return res.status(201).json(result);
			}
		});

		// .then((createdStudent) => {

		//         res.json({
		//             data: createdStudent,
		//         });
		//     })
		//     .catch((err=>{

		//         if (err.code===11000) {
		//             return res.status(400).json({
		//                 status:'failed',
		//                 message:"User already exist"
		//                })

		//         }
		//     }));
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failure",
			message: "user registration failed",
		});
	}
}



//delete student controller
async function deleteStudent(req, res) {
	const Id = req.params.id;

	registerModel.findByIdAndDelete(Id, (err, newStudent) => {
		if (err) {
			return res.status(404).json({
				message: err,
			});
		}

		return res.json({
			data: newStudent,
			message: "student deleted successfully",
		});
	});
}

module.exports = {
	getAllStudent,
	getRecentStudent,
	getStudentById,
	studentRegistration,
	deleteStudent,
};
