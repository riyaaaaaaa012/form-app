import React, { useState } from "react";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import "./Form.css";

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    dateOfBirth: "",
    dobType: "AD",
    gender: "",
    nationality: "",
    citizenshipNumber: "",
    citizenshipIssueDate: "",
    citizenshipIssueDistrict: "",
    beneficiaryIdNo: "",
    panNumber: "",
    identificationNo: "",
    identificationAddress: "",

    // Step 2: Address
    currentWardNo: "",
    currentMunicipality: "",
    currentDistrict: "",
    currentProvince: "",
    currentCountry: "",
    permanentWardNo: "",
    permanentMunicipality: "",
    permanentDistrict: "",
    permanentProvince: "",
    permanentCountry: "",
    contactNumber: "",
    emailAddress: "",

    // Step 3: Family Information
    fatherName: "",
    motherName: "",
    grandfatherName: "",
    spouseName: "",
    childrenNames: "",

    // Step 4: Bank Detail
    accountType: "",
    accountNumber: "",
    bankName: "",
    bankAddress: "",

    //step 5:Occupation and Financial Details
    occupationType: "",
    businessType: "",
    organizationName: "",
    organizationAddress: "",
    designation: "",
    employeeId: "",
    annualIncome: "",

    //step 6: Guardian Information(if minor)
    guardinanName: "",
    relationship: "",
    guardianAddress: "", ///it is same as address -- step 2
    mobileNumber: "",
    email: "",
    panNumberGuardian: "",
    birthRegistrationNumber: "",
    issueDate: "",
    issueAuthority: "",
    guardianSignature: "",

    //step 7 : Investment Disclosure
    //checkbox field
    details: "",

    //step 8: legal Consent
    //checkbox

    //step 9 : location
    //

    errors: {},
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateStep = (step) => {
    return true;
    const errors = {};
    setFormData((prevState) => ({ ...prevState, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setFormData((prevState) => ({ ...prevState, errors: {} }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateStep(3)) {
      console.log("Final Form Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  const renderStep1 = () => (
    <div className="form-section">
      <h2 className="section-title">Personal Information</h2>

      <div className="form-field">
        <label className="form-label">
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.fullName && (
          <p className="error-message">{formData.errors.fullName}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Date of Birth <span className="required">*</span>
        </label>
        <div className="dob-wrapper">
          <select
            name="dobType"
            value={formData.dobType}
            onChange={handleChange}
            className="dob-select"
          >
            <option value="AD">AD</option>
            <option value="BS">BS</option>
          </select>

          {formData.dobType === "AD" ? (
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="dob-input"
            />
          ) : (
            <NepaliDatePicker
              inputClassName="dob-input"
              value={formData.dateOfBirth}
              onChange={(value) => handleDateChange("dateOfBirth", value)}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          )}
        </div>
        {formData.errors.dateOfBirth && (
          <p className="error-message">{formData.errors.dateOfBirth}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Gender <span className="required">*</span>
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {formData.errors.gender && (
          <p className="error-message">{formData.errors.gender}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Nationality <span className="required">*</span>
        </label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.nationality && (
          <p className="error-message">{formData.errors.nationality}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Citizenship Number <span className="required">*</span>
        </label>
        <input
          type="text"
          name="citizenshipNumber"
          value={formData.citizenshipNumber}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.citizenshipNumber && (
          <p className="error-message">{formData.errors.citizenshipNumber}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Citizenship Issue Date <span className="required">*</span>
        </label>
        <div className="dob-wrapper">
          <select
            name="dobType"
            value={formData.dobType}
            onChange={handleChange}
            className="dob-select"
          >
            <option value="AD">AD</option>
            <option value="BS">BS</option>
          </select>
          {formData.dobType === "AD" ? (
            <input
              type="date"
              name="citizenshipIssueDate"
              value={formData.citizenshipIssueDate}
              onChange={handleChange}
              className="form-input"
            />
          ) : (
            <NepaliDatePicker
              inputClassName="form-input"
              value={formData.citizenshipIssueDate}
              onChange={(value) =>
                handleDateChange("citizenshipIssueDate", value)
              }
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          )}
        </div>
        {formData.errors.citizenshipIssueDate && (
          <p className="error-message">
            {formData.errors.citizenshipIssueDate}
          </p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Citizenship Issue District <span className="required">*</span>
        </label>
        <input
          type="text"
          name="citizenshipIssueDistrict"
          value={formData.citizenshipIssueDistrict}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.citizenshipIssueDistrict && (
          <p className="error-message">
            {formData.errors.citizenshipIssueDistrict}
          </p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">Beneficiary ID No.</label>
        <input
          type="text"
          name="beneficiaryIdNo"
          value={formData.beneficiaryIdNo}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label className="form-label">PAN Number</label>
        <input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label className="form-label">
          Identification No. (In case of NRN)
        </label>
        <input
          type="text"
          name="identificationNo"
          value={formData.identificationNo}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label className="form-label">
          Identification Address (In case of NRN)
        </label>
        <input
          type="text"
          name="identificationAddress"
          value={formData.identificationAddress}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="form-section">
      <h2 className="section-title">Address Information</h2>

      <h3 className="subsection-title">Current Address</h3>

      <div className="grid-2-cols">
        <div className="form-field">
          <label className="form-label">
            Ward No. <span className="required">*</span>
          </label>
          <input
            type="text"
            name="currentWardNo"
            value={formData.currentWardNo}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.currentWardNo && (
            <p className="error-message">{formData.errors.currentWardNo}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Municipality <span className="required">*</span>
          </label>
          <input
            type="text"
            name="currentMunicipality"
            value={formData.currentMunicipality}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.currentMunicipality && (
            <p className="error-message">
              {formData.errors.currentMunicipality}
            </p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            District <span className="required">*</span>
          </label>
          <input
            type="text"
            name="currentDistrict"
            value={formData.currentDistrict}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.currentDistrict && (
            <p className="error-message">{formData.errors.currentDistrict}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Province <span className="required">*</span>
          </label>
          <input
            type="text"
            name="currentProvince"
            value={formData.currentProvince}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.currentProvince && (
            <p className="error-message">{formData.errors.currentProvince}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Country <span className="required">*</span>
          </label>
          <input
            type="text"
            name="currentCountry"
            value={formData.currentCountry}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.currentCountry && (
            <p className="error-message">{formData.errors.currentCountry}</p>
          )}
        </div>
      </div>

      <h3 className="subsection-title">Permanent Address</h3>

      <div className="grid-2-cols">
        <div className="form-field">
          <label className="form-label">
            Ward No. <span className="required">*</span>
          </label>
          <input
            type="text"
            name="permanentWardNo"
            value={formData.permanentWardNo}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.permanentWardNo && (
            <p className="error-message">{formData.errors.permanentWardNo}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Municipality <span className="required">*</span>
          </label>
          <input
            type="text"
            name="permanentMunicipality"
            value={formData.permanentMunicipality}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.permanentMunicipality && (
            <p className="error-message">
              {formData.errors.permanentMunicipality}
            </p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            District <span className="required">*</span>
          </label>
          <input
            type="text"
            name="permanentDistrict"
            value={formData.permanentDistrict}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.permanentDistrict && (
            <p className="error-message">{formData.errors.permanentDistrict}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Province <span className="required">*</span>
          </label>
          <input
            type="text"
            name="permanentProvince"
            value={formData.permanentProvince}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.permanentProvince && (
            <p className="error-message">{formData.errors.permanentProvince}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            Country <span className="required">*</span>
          </label>
          <input
            type="text"
            name="permanentCountry"
            value={formData.permanentCountry}
            onChange={handleChange}
            className="form-input"
          />
          {formData.errors.permanentCountry && (
            <p className="error-message">{formData.errors.permanentCountry}</p>
          )}
        </div>
      </div>

      <h3 className="subsection-title">Contact Information</h3>

      <div className="form-field">
        <label className="form-label">
          Contact Number <span className="required">*</span>
        </label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.contactNumber && (
          <p className="error-message">{formData.errors.contactNumber}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Email Address <span className="required">*</span>
        </label>
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.emailAddress && (
          <p className="error-message">{formData.errors.emailAddress}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="form-section">
      <h2 className="section-title">Family Information</h2>

      <div className="form-field">
        <label className="form-label">
          Father's Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.fatherName && (
          <p className="error-message">{formData.errors.fatherName}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Mother's Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.motherName && (
          <p className="error-message">{formData.errors.motherName}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">
          Grandfather's Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="grandfatherName"
          value={formData.grandfatherName}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.grandfatherName && (
          <p className="error-message">{formData.errors.grandfatherName}</p>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">Spouse's Name</label>
        <input
          type="text"
          name="spouseName"
          value={formData.spouseName}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-field">
        <label className="form-label">Children's Names</label>
        <textarea
          name="childrenNames"
          value={formData.childrenNames}
          onChange={handleChange}
          className="form-textarea"
          rows="3"
          placeholder="Enter children's names (separated by commas)"
        />
      </div>
    </div>
  );
  const renderStep4 = () => (
    <div className="form-section">
      <h2 className="section-title">Bank Detail</h2>

      <div className="form-field">
        <label className="form-label">
          Account Type <span className="required">*</span>
        </label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="savings"
              name="accountType"
              value="Savings"
              checked={formData.accountType === "Savings"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="savings" className="radio-label">
              Savings Account
            </label>
          </div>

          <div className="radio-item">
            <input
              type="radio"
              id="current"
              name="accountType"
              value="Current"
              checked={formData.accountType === "Current"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="current" className="radio-label">
              Current Account
            </label>
          </div>

          <div className="radio-item">
            <input
              type="radio"
              id="business"
              name="accountType"
              value="Business"
              checked={formData.accountType === "Business"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="business" className="radio-label">
              Business Account
            </label>
          </div>
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">
          Account Number <span className="required">*</span>
        </label>
        <input
          type="text"
          name="bankAccount"
          value={formData.bankAccount}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.bankAccount && (
          <p className="error-message">{formData.errors.bankAccount}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Bank Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.bankName && (
          <p className="error-message">{formData.errors.bankName}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Bank Address <span className="required">*</span>
        </label>
        <input
          type="text"
          name="bankAddress"
          value={formData.bankAddress}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.bankAddress && (
          <p className="error-message">{formData.errors.bankAddress}</p>
        )}
      </div>
    </div>
  );
  const renderStep5 = () => (
    <div className="form-section">
      <h2 className="section-title">Occupation & Finance Detail</h2>

      <div className="form-field">
        <label className="form-label">
          Occupation Type <span className="required">*</span>
        </label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="government"
              name="occupationType"
              value="government"
              checked={formData.occupationType === "government"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="government" className="radio-label">
              Government
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="private"
              name="occupationType"
              value="private"
              checked={formData.occupationType === "private"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="private" className="radio-label">
              Private
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="business"
              name="occupationType"
              value="business"
              checked={formData.occupationType === "business"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="business" className="radio-label">
              Business
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="agriculture"
              name="occupationType"
              value="agirculture"
              checked={formData.occupationType === "agriculture"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="agriculture" className="radio-label">
              Agriculture
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="ingo/ngo"
              name="occupationType"
              value="ingo/ngo"
              checked={formData.occupationType === "ingo/ngo"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="ingo/ngo" className="radio-label">
              Ingo/Ngo
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="student"
              name="occupationType"
              value="student"
              checked={formData.occupationType === "student"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="student" className="radio-label">
              Student
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="retired"
              name="occupationType"
              value="retired"
              checked={formData.occupationType === "retired"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="retired" className="radio-label">
              Retired
            </label>
          </div>
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">
          Business Type <span className="required">*</span>
        </label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="manufacturing"
              name="businessType"
              value="manufacturing"
              checked={formData.businessType === "manufacturing"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="manufacturing" className="radio-label">
              Manufacturing
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="service-oriented"
              name="businessType"
              value="service-oriented"
              checked={formData.businessType === "service-oriented"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="service-oriented" className="radio-label">
              Service Oriented
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="other"
              name="businessType"
              value="other"
              checked={formData.businessType === "other"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="other" className="radio-label">
              Other
            </label>
          </div>
        </div>
      </div>
      <div className="form-field">
        <label className="form-label">
          Organization Name <span className="required">*</span>
        </label>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.organizationName && (
          <p className="error-message">{formData.errors.organizationName}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Organization Address <span className="required">*</span>
        </label>
        <input
          type="text"
          name="organizationAddress"
          value={formData.organizationAddress}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.organizationAddress && (
          <p className="error-message">{formData.errors.organizationAddress}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Designation <span className="required">*</span>
        </label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.designation && (
          <p className="error-message">{formData.errors.designation}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Employee ID <span className="required">*</span>
        </label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="form-input"
        />
        {formData.errors.employeeId && (
          <p className="error-message">{formData.errors.employeeId}</p>
        )}
      </div>
      <div className="form-field">
        <label className="form-label">
          Annual Income <span className="required">*</span>
        </label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="inc-lt-1lakh"
              name="annualIncome"
              value="<1 lakh"
              checked={formData.annualIncome === "<1 lakh"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="inc-lt-1lakh" className="radio-label">
              &lt;1 lakh
            </label>
          </div>

          <div className="radio-item">
            <input
              type="radio"
              id="inc-1-5lakhs"
              name="annualIncome"
              value="1–5 lakhs"
              checked={formData.annualIncome === "1–5 lakhs"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="inc-1-5lakhs" className="radio-label">
              1–5 lakhs
            </label>
          </div>

          <div className="radio-item">
            <input
              type="radio"
              id="inc-5-10lakhs"
              name="annualIncome"
              value="5–10 lakhs"
              checked={formData.annualIncome === "5–10 lakhs"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="inc-5-10lakhs" className="radio-label">
              5–10 lakhs
            </label>
          </div>

          <div className="radio-item">
            <input
              type="radio"
              id="inc-gt-10lakhs"
              name="annualIncome"
              value=">10 lakhs"
              checked={formData.annualIncome === ">10 lakhs"}
              onChange={handleChange}
              className="radio-input"
            />
            <label htmlFor="inc-gt-10lakhs" className="radio-label">
              &gt;10 lakhs
            </label>
          </div>
        </div>
        {formData.errors.annualIncome && (
          <p className="error-message">{formData.errors.annualIncome}</p>
        )}
      </div>
    </div>
  );
  const renderStep6 = () => (
    <div className="form-section">
      <h2 className="section-title">Guardian Information (if minor)</h2>
      <p>Step 6 content coming soon...</p>
    </div>
  );

  const renderStep7 = () => (
    <div className="form-section">
      <h2 className="section-title">Investment Disclosure</h2>
      <p>Step 7 content coming soon...</p>
    </div>
  );
  return (
    <div className="form-container">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-wrapper">
          <div
            className={`progress-step ${
              currentStep >= 1 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 1 ? "active" : "inactive"
              }`}
            >
              1
            </div>
            <p className="progress-label">Personal Info</p>
          </div>
          <div
            className={`progress-line ${
              currentStep >= 2 ? "active" : "inactive"
            }`}
          ></div>
          <div
            className={`progress-step ${
              currentStep >= 2 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 2 ? "active" : "inactive"
              }`}
            >
              2
            </div>
            <p className="progress-label">Address</p>
          </div>
          <div
            className={`progress-line ${
              currentStep >= 3 ? "active" : "inactive"
            }`}
          ></div>
          <div
            className={`progress-step ${
              currentStep >= 3 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 3 ? "active" : "inactive"
              }`}
            >
              3
            </div>
            <p className="progress-label">Family Info</p>
          </div>
          <div
            className={`progress-line ${
              currentStep >= 4 ? "active" : "inactive"
            }`}
          ></div>
          <div
            className={`progress-step ${
              currentStep >= 4 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 4 ? "active" : "inactive"
              }`}
            >
              4
            </div>
            <p className="progress-label">Bank Account Detail</p>
          </div>
          <div
            className={`progress-line ${
              currentStep >= 5 ? "active" : "inactive"
            }`}
          ></div>
          <div
            className={`progress-step ${
              currentStep >= 5 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 5 ? "active" : "inactive"
              }`}
            >
              5
            </div>
            <p className="progress-label">Occupation & Finance Detail</p>
          </div>
          <div
            className={`progress-line ${
              currentStep >= 6 ? "active" : "inactive"
            }`}
          ></div>
          <div
            className={`progress-step ${
              currentStep >= 6 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 6 ? "active" : "inactive"
              }`}
            >
              6
            </div>
            <p className="progress-label">Guardian Information</p>
          </div>
          <div
            className={`progress-line ${
              currentStep >= 7 ? "active" : "inactive"
            }`}
          ></div>
          <div
            className={`progress-step ${
              currentStep >= 7 ? "active" : "inactive"
            }`}
          >
            <div
              className={`progress-circle ${
                currentStep >= 7 ? "active" : "inactive"
              }`}
            >
              7
            </div>
            <p className="progress-label">Investment Disclosure</p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="form-card">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
        {currentStep === 7 && renderStep7()}

        {/* Navigation Buttons */}
        <div className="button-container">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="btn btn-previous"
            >
              Previous
            </button>
          )}

          {currentStep < 7 ? (
            <button type="button" onClick={handleNext} className="btn btn-next">
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
