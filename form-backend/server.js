const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Form Schema
const formSchema = new mongoose.Schema(
  {
    fullName: String,
    dateOfBirth: String,
    dateOfBirthBS: String,
    gender: String,
    nationality: String,
    citizenshipNumber: String,
    citizenshipIssueDate: String,
    citizenshipIssueDateBS: String,
    citizenshipIssueDistrict: String,
    beneficiaryIdNo: String,
    panNumber: String,
    identificationNo: String,
    identificationAddress: String,
    currentWardNo: String,
    currentMunicipality: String,
    currentDistrict: String,
    currentProvince: String,
    currentCountry: String,
    permanentWardNo: String,
    permanentMunicipality: String,
    permanentDistrict: String,
    permanentProvince: String,
    permanentCountry: String,
    contactNumber: String,
    emailAddress: String,
    fatherName: String,
    motherName: String,
    grandfatherName: String,
    spouseName: String,
    childrenNames: String,
    accountType: String,
    accountNumber: String,
    bankName: String,
    bankAddress: String,
    occupationType: String,
    businessType: String,
    organizationName: String,
    organizationAddress: String,
    designation: String,
    employeeId: String,
    annualIncome: String,
    guardianName: String,
    relationship: String,
    guardianAddress: String,
    mobileNumber: String,
    email: String,
    panNumberGuardian: String,
    birthRegistrationNumber: String,
    issueDate: String,
    issueDateBS: String,
    issueAuthority: String,
    guardianSignature: String,
    rightThumbprint: String,
    leftThumbprint: String,
    investmentInvolved: Boolean,
    investmentDetails: String,
    legalDeclaration: String,
    legalConsent: Boolean,
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false }
);

const Form = mongoose.model("Form", formSchema);

// Routes
app.post("/api/forms", async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.json({ success: true, id: newForm._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
