const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
	{
		Fname: { type: String,required:[true,"please enter first name"] },
		Lname: { type: String,required:[true,"please enter last name"],},
		phone: { type: String, },
		email:  { type: String, required: [true,"please enter a valid email"], unique: [true,"The email is already in use"], lowercase: true },
		address: { type: String },
		state: { type: String },
		stateCode: { type: String },
		AreaSpec: { type: String },
		FirstInst: { type: String },
		DateCompleted1: {  type: Date },
		SecondInst: { type: String },
		DateCompleted2:  {  type: Date },
		DiplomaC: { type: String },
		DegreeC: { type: String },
			MasterC: { type: String },
		PgdC: { type: String },
		currentRole: { type: String },
		currentOrg: { type: String },
		DateJoinedCurrent: {  type: Date },
		PastRole: { type: String },
		PastOrg: { type: String },
		DateJoinedPast: {  type: Date },
		DateLeftPast: {  type: Date },
		membershipCat: { type: String },

		serialNumber: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "serialNumber",
		},
	},
	{ timestamps: true }
);

const registerModel = mongoose.model("registers", registerSchema);

module.exports = registerModel;
