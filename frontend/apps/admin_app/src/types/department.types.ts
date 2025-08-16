// Types for department data
export interface ContactInfo {
  emails: string[];
  phones: string[];
  website: string;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  ministryName: string;
  description: string;
  address: string;
  district: string;
  province: string;
  contactInfo: ContactInfo;
  registrationNumber: string;
  type: string;
  status: string;
  logoUrl: string;
  createdBy: string;
  mainAdminUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentResponse {
  departments: Department[];
}

// For the DepartmentList component props (matching the existing UI component interface)
export interface DepartmentListItem {
  id: number; // Converting string to number for compatibility
  title: string;
  customUrl?: string;
  description?: string;
  status?: string;
  logoUrl?: string;
}
