import { Heading, Select, InputField } from "@myorg/ui";
import type { ApplicantDetails } from "../types";

interface ApplicantDetailsStepProps {
  applicantDetails: ApplicantDetails;
  onDetailsChange: (details: ApplicantDetails) => void;
}

export function ApplicantDetailsStep({
  applicantDetails,
  onDetailsChange
}: ApplicantDetailsStepProps) {
  const handleChange = (field: keyof ApplicantDetails, value: string) => {
    onDetailsChange({
      ...applicantDetails,
      [field]: value
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <Heading level={2} size="md" className="mb-1">Applicant Details</Heading>
        <p className="text-gray-600 text-sm">Please provide us your details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Select 
          id="category"
          label="Category"
          value={applicantDetails.category}
          onChange={(value) => handleChange('category', value)}
          options={[
            { value: 'officer-of-the-dept', label: 'Officer of the Department' },
            { value: 'government-sector', label: 'Government Sector' },
            { value: 'pensioner', label: 'Pensioner' }
          ]}
          placeholder="Select category"
          required={true}
        />

        <InputField 
          id="eppOrPensionNo"
          label="EPF/Pension No."
          type="text"
          value={applicantDetails.eppOrPensionNo}
          onChange={(e) => handleChange('eppOrPensionNo', e.target.value)}
          placeholder="Enter your EPF/Pension No."
          required={true}
        />

        <InputField 
          id="name"
          label="Name"
          type="text"
          value={applicantDetails.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your name"
          required={true}
        />

        <InputField 
          id="contactNo"
          label="Contact No"
          type="tel"
          value={applicantDetails.contactNo}
          onChange={(e) => handleChange('contactNo', e.target.value)}
          placeholder="Enter your contact no."
          required={true}
        />

        <div className="md:col-span-2">
          <InputField 
            id="email"
            label="Email (Optional)"
            type="email"
            value={applicantDetails.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            required={false}
          />
        </div>
      </div>
    </div>
  );
}
