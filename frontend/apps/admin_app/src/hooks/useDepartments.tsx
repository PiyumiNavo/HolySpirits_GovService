'use client';

import { useState, useEffect } from 'react';
import departmentService from '../services/department.service';
import type { Department } from '../types/department.types';
import type { ApiError } from '../types/api.types';

interface UseDepartmentsReturn {
  departments: Department[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createDepartment: (data: Partial<Department>) => Promise<void>;
  updateDepartment: (id: string, data: Partial<Department>) => Promise<void>;
  deleteDepartment: (id: string) => Promise<void>;
}

export function useDepartments(): UseDepartmentsReturn {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await departmentService.getDepartments();
      setDepartments(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch departments');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const createDepartment = async (data: Partial<Department>) => {
    try {
      setError(null);
      const newDepartment = await departmentService.createDepartment(data);
      setDepartments(prev => [...prev, newDepartment]);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create department');
      throw err;
    }
  };

  const updateDepartment = async (id: string, data: Partial<Department>) => {
    try {
      setError(null);
      const updatedDepartment = await departmentService.updateDepartment(id, data);
      setDepartments(prev => 
        prev.map(dept => dept._id === id ? updatedDepartment : dept)
      );
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update department');
      throw err;
    }
  };

  const deleteDepartment = async (id: string) => {
    try {
      setError(null);
      await departmentService.deleteDepartment(id);
      setDepartments(prev => prev.filter(dept => dept._id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete department');
      throw err;
    }
  };

  const refetch = async () => {
    await fetchDepartments();
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    error,
    refetch,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  };
}
