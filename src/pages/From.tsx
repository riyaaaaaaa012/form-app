import React, { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import SignatureCanvas from "react-signature-canvas";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import NepaliDate from "nepali-date-converter";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Form.css";

const TOTAL_STEPS = 9;

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(
    null
  );

  /* -------------------- DATE CONVERSION -------------------- */
  const adToBs = (ad: string) => {
    try {
      const [y, m, d] = ad.split("-").map(Number);
      const nep = new NepaliDate(new Date(y, m - 1, d));
      return `${nep.getYear()}-${String(nep.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(nep.getDate()).padStart(2, "0")}`;
    } catch {
      return "";
    }
  };

  const bsToAd = (bs: string) => {
    try {
      const [y, m, d] = bs.split("-").map(Number);
      const nep = new NepaliDate(y, m - 1, d);
      const ad = nep.getAD();
      return `${ad.year}-${String(ad.month).padStart(2, "0")}-${String(
        ad.date
      ).padStart(2, "0")}`;
    } catch {
      return "";
    }
  };

  /* -------------------- FORM DATA -------------------- */
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    dateOfBirthBS: "",
    gender: "",
    nationality: "",
    citizenshipNumber: "",
    citizenshipIssueDate: "",
    citizenshipIssueDateBS: "",
    citizenshipIssueDistrict: "",
    beneficiaryIdNo: "",
    panNumber: "",
    identificationNo: "",
    identificationAddress: "",

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

    fatherName: "",
    motherName: "",
    grandfatherName: "",
    spouseName: "",
    childrenNames: "",

    accountType: "",
    bankAccount: "",
    bankName: "",
    bankAddress: "",

    occupationType: "",
    businessType: "",
    organizationName: "",
    organizationAddress: "",
    designation: "",
    employeeId: "",
    annualIncome: "",

    isMinor: false,
    guardianName: "",
    relationship: "",
    guardianAddress: "",
    mobileNumber: "",
    email: "",
    panNumberGuardian: "",
    birthRegistrationNumber: "",
    issueDate: "",
    issueDateBS: "",
    issueAuthority: "",
    guardianSignature: "",

    investmentInvolved: false,
    investmentDetails: "",
    legalDeclaration: "",
    legalConsent: false,

    rightThumbprint: "",
    leftThumbprint: "",
    errors: {} as { [key: string]: string },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* -------------------- MAP -------------------- */
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([
    27.7172, 85.324,
  ]);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        setMapPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return <Marker position={mapPosition} />;
  };

  /* -------------------- SIGNATURES -------------------- */
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const rightThumb = useRef<SignatureCanvas | null>(null);
  const leftThumb = useRef<SignatureCanvas | null>(null);

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };
  const clearRightThumbprint = () => {
    rightThumb.current?.clear();
  };
  const clearLeftThumbprint = () => {
    leftThumb.current?.clear();
  };

  const saveSignature = () =>
    setFormData((p) => ({
      ...p,
      guardianSignature: sigCanvas.current?.toDataURL() ?? "",
    }));

  const saveRightThumbprint = () =>
    setFormData((p) => ({
      ...p,
      rightThumbprint: rightThumb.current?.toDataURL() ?? "",
    }));

  const saveLeftThumbprint = () =>
    setFormData((p) => ({
      ...p,
      leftThumbprint: leftThumb.current?.toDataURL() ?? "",
    }));

  /* -------------------- NAVIGATION -------------------- */
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (currentStep !== TOTAL_STEPS - 1) return;

    const payload = {
      ...formData,
      latitude: mapPosition[0],
      longitude: mapPosition[1],
    };

    try {
      await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmittedData(payload);
      setCurrentStep(TOTAL_STEPS); // Move to confirmation page
      alert("Form submitted successfully!");
    } catch {
      alert("Submission failed");
    }
  };
  /* -------------------- STEP RENDERER -------------------- */
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      case 8:
        return renderStep8(); // This is now the submission step
      case 9:
        return renderConfirmationPage();
      default:
        return null;
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

        <div className="grid-2-cols">
          <div className="date-column">
            <label className="small-label">English Date (AD)</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => {
                const v = e.target.value;
                // console.log("=== DOB AD Changed ===");
                // console.log("Input value:", v);

                setFormData((prev) => ({ ...prev, dateOfBirth: v }));

                if (v) {
                  //console.log("Calling adToBs with:", v);
                  const bs = adToBs(v);
                  // console.log("Converted BS result:", bs);
                  if (bs) {
                    setFormData((prev) => ({ ...prev, dateOfBirthBS: bs }));
                  }
                }
              }}
              className="form-input"
            />
          </div>

          <div className="date-column">
            <label className="small-label">Nepali Date (BS)</label>
            <input
              type="text"
              value={formData.dateOfBirthBS || ""}
              placeholder="YYYY-MM-DD"
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, dateOfBirthBS: value }));
                if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                  // REMOVED adbsReady check
                  const ad = bsToAd(value);
                  if (ad) setFormData((prev) => ({ ...prev, dateOfBirth: ad }));
                }
              }}
              className="form-input"
            />
          </div>
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

        <div className="grid-2-cols">
          <div className="date-column">
            <label className="small-label">English Date (AD)</label>
            <input
              type="date"
              name="citizenshipIssueDate"
              value={formData.citizenshipIssueDate}
              onChange={(e) => {
                const v = e.target.value;
                setFormData((prev) => ({ ...prev, citizenshipIssueDate: v }));
                if (v) {
                  const bs = adToBs(v);
                  if (bs)
                    setFormData((prev) => ({
                      ...prev,
                      citizenshipIssueDateBS: bs,
                    }));
                }
              }}
              className="form-input"
            />
          </div>

          <div className="date-column">
            <label className="small-label">Nepali Date (BS)</label>
            <input
              type="text"
              value={formData.citizenshipIssueDateBS || ""}
              placeholder="YYYY-MM-DD"
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  citizenshipIssueDateBS: value,
                }));
                if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                  const ad = bsToAd(value);
                  if (ad)
                    setFormData((prev) => ({
                      ...prev,
                      citizenshipIssueDate: ad,
                    }));
                }
              }}
              className="form-input"
            />
          </div>
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

  const renderStep2 = () => {
    const handleSameAsCurrentAddress = (e) => {
      if (e.target.checked) {
        setFormData((prevState) => ({
          ...prevState,
          permanentWardNo: prevState.currentWardNo,
          permanentMunicipality: prevState.currentMunicipality,
          permanentDistrict: prevState.currentDistrict,
          permanentProvince: prevState.currentProvince,
          permanentCountry: prevState.currentCountry,
        }));
      }
    };

    return (
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

        <div className="form-field" style={{ marginBottom: "1.5rem" }}>
          <label className="form-label">
            <input
              type="checkbox"
              onChange={handleSameAsCurrentAddress}
              className="checkbox-input"
            />
            Same as current address
          </label>
        </div>

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
              <p className="error-message">
                {formData.errors.permanentDistrict}
              </p>
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
              <p className="error-message">
                {formData.errors.permanentProvince}
              </p>
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
              <p className="error-message">
                {formData.errors.permanentCountry}
              </p>
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
  };
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
          rows={3}
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
              id="business"
              name="occupationType"
              value="agirculture"
              checked={formData.occupationType === "business"}
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
  const renderStep6 = () => {
    const handleIsMinorChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        isMinor: e.target.checked,
      }));
    };

    return (
      <div className="form-section">
        <h2 className="section-title">Guardian Information</h2>

        <div className="form-field" style={{ marginBottom: "1.5rem" }}>
          <label className="form-label">
            <input
              type="checkbox"
              name="isMinor"
              checked={formData.isMinor || false}
              onChange={handleIsMinorChange}
              className="checkbox-input"
            />
            Is Minor (Below 18 years)
          </label>
        </div>

        {formData.isMinor && (
          <>
            <div className="form-field">
              <label className="form-label">
                Guardian Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="form-input"
              />
              {formData.errors.guardianName && (
                <p className="error-message">{formData.errors.guardianName}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Relationship <span className="required">*</span>
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Legal Guardian">Legal Guardian</option>
                <option value="Other">Other</option>
              </select>
              {formData.errors.relationship && (
                <p className="error-message">{formData.errors.relationship}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Guardian Address <span className="required">*</span>
              </label>
              <textarea
                name="guardianAddress"
                value={formData.guardianAddress}
                onChange={handleChange}
                className="form-textarea"
                rows={3}
                placeholder="Enter guardian's full address"
              />
              {formData.errors.guardianAddress && (
                <p className="error-message">
                  {formData.errors.guardianAddress}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Mobile Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 98XXXXXXXX"
              />
              {formData.errors.mobileNumber && (
                <p className="error-message">{formData.errors.mobileNumber}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="guardian@example.com"
              />
              {formData.errors.email && (
                <p className="error-message">{formData.errors.email}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">Guardian PAN Number</label>
              <input
                type="text"
                name="panNumberGuardian"
                value={formData.panNumberGuardian}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <label className="form-label">
                Birth Registration Number <span className="required">*</span>
              </label>
              <input
                type="text"
                name="birthRegistrationNumber"
                value={formData.birthRegistrationNumber}
                onChange={handleChange}
                className="form-input"
              />
              {formData.errors.birthRegistrationNumber && (
                <p className="error-message">
                  {formData.errors.birthRegistrationNumber}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Issue Date <span className="required">*</span>
              </label>

              <div className="grid-2-cols">
                <div className="date-column">
                  <label className="small-label">English Date (AD)</label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFormData((prev) => ({ ...prev, issueDate: v }));
                      if (v) {
                        const bs = adToBs(v);
                        if (bs)
                          setFormData((prev) => ({ ...prev, issueDateBS: bs }));
                      }
                    }}
                    className="form-input"
                  />
                </div>

                <div className="date-column">
                  <label className="small-label">Nepali Date (BS)</label>
                  <input
                    type="text"
                    value={formData.issueDateBS || ""}
                    placeholder="YYYY-MM-DD"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({ ...prev, issueDateBS: value }));
                      if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                        const ad = bsToAd(value);
                        if (ad)
                          setFormData((prev) => ({ ...prev, issueDate: ad }));
                      }
                    }}
                    className="form-input"
                  />
                </div>
              </div>

              {formData.errors.issueDate && (
                <p className="error-message">{formData.errors.issueDate}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Issue Authority <span className="required">*</span>
              </label>
              <input
                type="text"
                name="issueAuthority"
                value={formData.issueAuthority}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., District Administration Office"
              />
              {formData.errors.issueAuthority && (
                <p className="error-message">
                  {formData.errors.issueAuthority}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">
                Guardian Signature <span className="required">*</span>
              </label>
              <div
                style={{
                  border: "1px solid #ccc",
                  width: "100%",
                  height: "200px",
                }}
              >
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: "signature-canvas",
                    style: { width: "100%", height: "100%" },
                  }}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="btn btn-secondary"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className="btn btn-secondary"
                  style={{ marginLeft: "10px" }}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}

        {!formData.isMinor && (
          <p style={{ color: "#666", fontStyle: "italic", marginTop: "1rem" }}>
            Guardian information is not required for adults (18+ years).
          </p>
        )}
      </div>
    );
  };
  const renderStep7 = () => {
    return (
      <div className="form-section">
        {/* Investment Disclosure Section */}
        <h2 className="section-title">Investment Disclosure</h2>
        <div className="form-field">
          <label className="form-label">
            <input
              type="checkbox"
              name="investmentInvolved"
              checked={formData.investmentInvolved || false}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  investmentInvolved: e.target.checked,
                }))
              }
              className="checkbox-input"
            />
            I am involved in other investment companies
          </label>
        </div>
        {formData.investmentInvolved && (
          <div className="form-field">
            <label className="form-label">Details (if any)</label>
            <textarea
              name="investmentDetails"
              value={formData.investmentDetails || ""}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
              placeholder="Please provide details about your investment companies"
            />
          </div>
        )}
        {/* Legal Consent Section */}
        <h2 className="section-title" style={{ marginTop: "2rem" }}>
          Legal Consent
        </h2>
        <div className="form-field">
          <label className="form-label">Declaration</label>
          <textarea
            name="legalDeclaration"
            value={formData.legalDeclaration || ""}
            onChange={handleChange}
            className="form-textarea"
            rows={5}
            placeholder="Enter your legal declaration here"
          />
        </div>
        <div className="form-field">
          <label className="form-label">
            <input
              type="checkbox"
              name="legalConsent"
              checked={formData.legalConsent || false}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  legalConsent: e.target.checked,
                }))
              }
              className="checkbox-input"
            />
            I confirm the above information is true and I accept legal
            responsibility.
          </label>
          {formData.errors.legalConsent && (
            <p className="error-message">{formData.errors.legalConsent}</p>
          )}
        </div>
        {/* Location Map Section */}
        <h2 className="section-title" style={{ marginTop: "2rem" }}>
          Location Map
        </h2>
        <div className="form-group">
          <label className="form-label">
            Click on the map to select your location
          </label>
          <div style={{ height: "400px", width: "100%", marginBottom: "1rem" }}>
            <MapContainer
              // center={[mapPosition[0], mapPosition[1]]}
              // zoom={13}
              style={{ height: "100%", width: "100%", borderRadius: "8px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationPicker />
            </MapContainer>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#eff6ff",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Selected Location:</strong>
            </p>
            <p>Latitude: {mapPosition[0].toFixed(6)}</p>
            <p>Longitude: {mapPosition[1].toFixed(6)}</p>
          </div>
        </div>
        {/* Thumbprint Section */}
        <h2 className="section-title" style={{ marginTop: "2rem" }}>
          Thumbprints
        </h2>
        <div className="grid-2-cols">
          <div className="form-field">
            <label className="form-label">
              Right Thumbprint <span className="required">*</span>
            </label>
            <div
              style={{
                border: "1px solid #ccc",
                width: "100%",
                height: "200px",
              }}
            >
              {/* <SignatureCanvas
                ref={rightThumbCanvas}
                canvasProps={{
                  className: "signature-canvas",
                  style: { width: "100%", height: "100%" },
                }}
              /> */}
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={clearRightThumbprint}
                className="btn btn-secondary"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={saveRightThumbprint}
                className="btn btn-secondary"
                style={{ marginLeft: "10px" }}
              >
                Save
              </button>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">
              Left Thumbprint <span className="required">*</span>
            </label>
            <div
              style={{
                border: "1px solid #ccc",
                width: "100%",
                height: "200px",
              }}
            >
              {/* <SignatureCanvas
                ref={leftThumbCanvas}
                canvasProps={{
                  className: "signature-canvas",
                  style: { width: "100%", height: "100%" },
                }}
              /> */}
            </div>
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={clearLeftThumbprint}
                className="btn btn-secondary"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={saveLeftThumbprint}
                className="btn btn-secondary"
                style={{ marginLeft: "10px" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <textarea
          readOnly
          rows={25}
          value={`9. सम्पत्ति शुद्धिकरण तथा आतङ्गकारी कृयाकलापमा वित्तिय निवारण सम्बन्धी थप विवरणः
१. के तपाई राजनैतिक वा उच्च पदस्थ व्यक्ति हुनुहुन्छ ? हो होईन
२. के तपाई राजनैतिक वा उच्च पदस्थ व्यक्ति संग सम्बन्धित हुनुहुन्छ ? छु छैन
सम्बन्धित राजनैतिक वा उच्च पदस्थ व्यक्तिको नाम ः तपाईसंगको सम्बन्ध
..................................................................................... ..........................................................
३. के तपाईको हिताधिकारी व्यक्ति छ ? छैन छ
हिताधिकारी व्यक्तिको नाम ः तपाईसंगको सम्बन्ध
.................................................................................... ..........................................................
४. के तपाई विगतमा कुनै सम्बद्ध कसुरमा दोषी प्रमाणित हुनुभएको छ ? छैन छ
सम्पत्ति शुद्धिकरण (मनी लाउण्डरिङ्ग) निवारण ऐन, २०६४ को दफा २ को खण्ड (श) वमोजिमका कसुरहरु छ भने कृपया उल्लेख गर्नुहोस
................................................................................................................................................................................................
४. के यस कम्पनीबाट हुने कारोबारका बास्तबिक धनि फरक ब्यक्ति हुन् ? हो होईन
धितोपत्र कारोबारको सम्बन्धमा तपशिल बमोजिमको स्वघोषणा गर्दछु ।
१. म÷हामीले धितोपत्र खरिदकालागि प्रयोग गर्ने रकम सम्पत्ती शुद्धिकरण सम्बन्धी प्रचलित कानुन विपरित आर्जन गरेको हुने छैन ।
२. धितोपत्रमा गरिएको लगानीमा निहित जोखिमको सम्बन्धमा जानकार छु ।
३. म÷हामीले खरिद गरेका धितोपत्रहरु बापतको भुक्तानी लिने दिने कार्य तोकिएको समय भित्र गर्ने छु ।
४. म÷हामील धितोपत्र सम्बन्धी तथा अन्य प्रचलित नियम कानूनहरुको पालना गर्नेछु ।
५. म÷हामी कर्जा सूचना केन्द्रको कालो सुचीमा रहेको छु ÷छैन ।
६. सम्पत्ति शुद्धिकरण (मनी लाउण्डरिङ्ग) निवारण ऐन, २०६४ र यस अन्र्तगत जारी भएका नियमावलि तथा निर्देशन आदीबाट माग भए अनुसारका सूचना,
विवरण तथा कागजातहरु कम्पनीलाई उपलब्ध गराउने छु÷छौं ।
७. कम्पनीलाई गर्नु पर्ने भुक्तानी नगरि बाँकी राखेको कारणबाट मेरो÷हाम्रो कारोवार अन्य धितोपत्र दलाल कम्पनीहरुमा समेत निलम्बन गर्न पत्राचार वा परि
पत्र गर्न मेरो÷हाम्रो मञ्जुरी छ ।
संलग्न गर्नु पर्ने कागजात
१. नेपाली नागरिकहरुको हकमा नागरिकताका प्रमाणपत्रको प्रतिलिपी ।
२. अन्य देशको नागरिकको हकमा पासपोर्टको प्रतिलिपी ।
३. नाबालकको हकमा संरक्षक तथा नाबालक दुवैको फोटो ।
४. कानूनी संरक्षक भए सो सम्बन्धी कागजात ।
५. आमा वा बाबु संरक्षक भएमा छोरा वा छोरीको जन्मदर्ता प्रमाणपत्रको प्रतिलिपि ।
६. निवेदकको हस्ताक्षर तथा औंठा छापमा संरक्षकको हस्ताक्षर तथा औंठा छाप ।
७. कुनै सस्थाको कर्मचारी रहेको हकमा कर्मचारी परिचयपत्रको प्रतिलिपि
मथि उल्लेखित विवरण सत्य तथ्य रहेको र सो विवरणमा कुनै फरक परे कानून बमोजिम सहुँला, बुझाउँला ।
I/We hereby acknowledge that the above disclosed details are true. I/We further hereby consent to bear any legal actions in case any false disclosure of information related to me/us.`}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "14px",
            lineHeight: "1.6",
            backgroundColor: "#f7f7f7",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
      </div>
    );
  };
  const renderStep8 = () => (
    <div className="form-section">
      <h2 className="section-title">Final Review & Submission</h2>
      <div className="final-review-section">
        <div className="review-header">
          <h3>Review Your Information Before Submission</h3>
          <p className="review-subtitle">
            Please review all the information you have provided. Once submitted,
            you cannot make changes to this application.
          </p>
        </div>

        <div className="review-summary">
          <div className="summary-card">
            <h4>Personal Information</h4>
            <div className="summary-item">
              <span className="summary-label">Full Name:</span>
              <span className="summary-value">
                {formData.fullName || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Date of Birth:</span>
              <span className="summary-value">
                {formData.dateOfBirth || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Gender:</span>
              <span className="summary-value">
                {formData.gender || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Citizenship Number:</span>
              <span className="summary-value">
                {formData.citizenshipNumber || "Not provided"}
              </span>
            </div>
          </div>

          <div className="summary-card">
            <h4>Contact Information</h4>
            <div className="summary-item">
              <span className="summary-label">Contact Number:</span>
              <span className="summary-value">
                {formData.contactNumber || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Email:</span>
              <span className="summary-value">
                {formData.emailAddress || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Current Address:</span>
              <span className="summary-value">
                {formData.currentWardNo
                  ? `${formData.currentWardNo}, ${formData.currentMunicipality}, ${formData.currentDistrict}`
                  : "Not provided"}
              </span>
            </div>
          </div>

          <div className="summary-card">
            <h4>Bank Details</h4>
            <div className="summary-item">
              <span className="summary-label">Account Type:</span>
              <span className="summary-value">
                {formData.accountType || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Bank Name:</span>
              <span className="summary-value">
                {formData.bankName || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Account Number:</span>
              <span className="summary-value">
                {formData.bankAccount
                  ? `****${formData.bankAccount.slice(-4)}`
                  : "Not provided"}
              </span>
            </div>
          </div>

          <div className="summary-card">
            <h4>Occupation Details</h4>
            <div className="summary-item">
              <span className="summary-label">Occupation Type:</span>
              <span className="summary-value">
                {formData.occupationType || "Not provided"}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Annual Income:</span>
              <span className="summary-value">
                {formData.annualIncome || "Not provided"}
              </span>
            </div>
            {formData.isMinor && (
              <>
                <div className="summary-item">
                  <span className="summary-label">Guardian Name:</span>
                  <span className="summary-value">
                    {formData.guardianName || "Not provided"}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Relationship:</span>
                  <span className="summary-value">
                    {formData.relationship || "Not provided"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">
            <input type="checkbox" required className="checkbox-input" />I
            confirm that all the information provided is accurate and complete
            to the best of my knowledge.
          </label>
        </div>

        <div className="form-field">
          <label className="form-label">
            <input type="checkbox" required className="checkbox-input" />I agree
            to the terms and conditions and understand that false information
            may lead to legal consequences.
          </label>
        </div>
      </div>
    </div>
  );

  const renderConfirmationPage = () => (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <div className="confirmation-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2>Application Submitted Successfully!</h2>
        <p className="confirmation-subtitle">
          Thank you for submitting your application. Your reference number is:
        </p>
        <div className="reference-number">
          REF-{Date.now().toString().slice(-8)}
        </div>
      </div>

      <div className="confirmation-details">
        <div className="details-section">
          <h3>Application Summary</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Submitted Date:</span>
              <span className="detail-value">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Submitted Time:</span>
              <span className="detail-value">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Applicant Name:</span>
              <span className="detail-value">
                {submittedData?.fullName || formData.fullName}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Application Type:</span>
              <span className="detail-value">New Registration</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>Next Steps</h3>
          <div className="next-steps">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Application Review</h4>
                <p>
                  Our team will review your application within 3-5 business
                  days.
                </p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Verification Process</h4>
                <p>We may contact you for additional verification if needed.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Approval Notification</h4>
                <p>
                  You will receive an email notification once your application
                  is approved.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h3>Important Information</h3>
          <div className="important-info">
            <div className="info-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4>Keep Your Reference Number</h4>
                <p>
                  You will need this reference number for any inquiries about
                  your application.
                </p>
              </div>
            </div>
            <div className="info-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <div>
                <h4>Check Your Email</h4>
                <p>
                  A confirmation email has been sent to{" "}
                  {formData.emailAddress || "your provided email address"}.
                </p>
              </div>
            </div>
            <div className="info-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h4>Processing Time</h4>
                <p>Application processing typically takes 5-7 business days.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-secondary"
          >
            Print Confirmation
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="btn btn-primary"
          >
            Return to Home
          </button>
          <button
            type="button"
            onClick={() => {
              // You can implement download functionality here
              const dataStr = JSON.stringify(
                submittedData || formData,
                null,
                2
              );
              const dataUri =
                "data:application/json;charset=utf-8," +
                encodeURIComponent(dataStr);
              const exportFileDefaultName = `application_${Date.now()}.json`;
              const linkElement = document.createElement("a");
              linkElement.setAttribute("href", dataUri);
              linkElement.setAttribute("download", exportFileDefaultName);
              linkElement.click();
            }}
            className="btn btn-outline"
          >
            Download Application Copy
          </button>
        </div>

        <div className="contact-support">
          <h4>Need Help?</h4>
          <p>Contact our support team:</p>
          <div className="contact-info">
            <span>📞 01-1234567</span>
            <span>✉️ support@example.com</span>
            <span>📍 Kathmandu, Nepal</span>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="form-container">
      {/* Progress Indicator - Hidden on confirmation page */}
      {currentStep !== TOTAL_STEPS && (
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
              <p className="progress-label">Legal Details</p>
            </div>
            <div
              className={`progress-line ${
                currentStep >= 8 ? "active" : "inactive"
              }`}
            ></div>
            <div
              className={`progress-step ${
                currentStep >= 8 ? "active" : "inactive"
              }`}
            >
              <div
                className={`progress-circle ${
                  currentStep >= 8 ? "active" : "inactive"
                }`}
              >
                8
              </div>
              <p className="progress-label">Review & Submit</p>
            </div>
          </div>
        </div>
      )}

      {/* Form or Confirmation Page */}
      {currentStep !== TOTAL_STEPS ? (
        <form className="form-container" onSubmit={handleSubmit}>
          {renderStep()}

          <div className="form-navigation">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="btn btn-previous"
              >
                Previous
              </button>
            )}

            {currentStep < TOTAL_STEPS - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-next"
              >
                Next
              </button>
            )}

            {currentStep === TOTAL_STEPS - 1 && (
              <button type="submit" className="btn btn-submit">
                Submit Application
              </button>
            )}
          </div>
        </form>
      ) : (
        renderConfirmationPage()
      )}
    </div>
  );
}

export default Form;
