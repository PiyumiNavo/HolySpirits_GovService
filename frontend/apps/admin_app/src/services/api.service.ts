import apiClient from '../lib/api-client';

// Example service for departments API
class DepartmentService {
  // Get all departments
  public async getDepartments() {
    return await apiClient.get('/departments');
  }

  // Get a specific department by ID
  public async getDepartment(id: string) {
    return await apiClient.get(`/departments/${id}`);
  }

  // Create a new department
  public async createDepartment(data: any) {
    return await apiClient.post('/departments', data);
  }

  // Update a department
  public async updateDepartment(id: string, data: any) {
    return await apiClient.put(`/departments/${id}`, data);
  }

  // Delete a department
  public async deleteDepartment(id: string) {
    return await apiClient.delete(`/departments/${id}`);
  }
}

// Example service for government services API
class GovServiceService {
  // Get all services
  public async getServices() {
    return await apiClient.get('/gov-services');
  }

  // Get services by department
  public async getServicesByDepartment(departmentId: string) {
    return await apiClient.get(`/gov-services?departmentId=${departmentId}`);
  }

  // Create a new service
  public async createService(data: any) {
    return await apiClient.post('/gov-services', data);
  }

  // Update a service
  public async updateService(id: string, data: any) {
    return await apiClient.put(`/gov-services/${id}`, data);
  }

  // Delete a service
  public async deleteService(id: string) {
    return await apiClient.delete(`/gov-services/${id}`);
  }
}

// Create singleton instances
export const departmentService = new DepartmentService();
export const govServiceService = new GovServiceService();

// Export individual services
export default {
  departments: departmentService,
  services: govServiceService,
};
