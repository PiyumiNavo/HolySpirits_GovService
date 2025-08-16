import apiClient from '../lib/api-client';
import type { Department } from '../types/department.types';
import type { ApiResponse } from '../types/api.types';

class DepartmentService {
  // Get all departments
  public async getDepartments(): Promise<Department[]> {
    try {
      const response = await apiClient.get<Department[]>('/departments');
      // The API returns the array directly, not wrapped in a data object
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }

  // Get a specific department by ID
  public async getDepartment(id: string): Promise<Department> {
    try {
      const response = await apiClient.get<Department>(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching department:', error);
      throw error;
    }
  }

  // Create a new department
  public async createDepartment(departmentData: Partial<Department>): Promise<Department> {
    try {
      const response = await apiClient.post<Department>('/departments', departmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  }

  // Update a department
  public async updateDepartment(id: string, departmentData: Partial<Department>): Promise<Department> {
    try {
      const response = await apiClient.put<Department>(`/departments/${id}`, departmentData);
      return response.data;
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  }

  // Delete a department
  public async deleteDepartment(id: string): Promise<void> {
    try {
      await apiClient.delete(`/departments/${id}`);
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
  }
}

// Create singleton instance
const departmentService = new DepartmentService();

export default departmentService;
