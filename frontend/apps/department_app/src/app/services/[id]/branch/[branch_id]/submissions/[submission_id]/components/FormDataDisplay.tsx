'use client';

import { Card } from '@myorg/ui';
import { FormField } from '../types/submission-details.types';

interface FormDataDisplayProps {
  formData: Record<string, any>;
  formFields: FormField[];
  serviceName: string;
}

export function FormDataDisplay({ formData, formFields, serviceName }: FormDataDisplayProps) {
  const getFieldLabel = (key: string) => {
    const field = formFields.find(f => f.key === key);
    return field?.label || key;
  };

  const getFieldValue = (key: string, value: any) => {
    const field = formFields.find(f => f.key === key);
    
    if (value === null || value === undefined) {
      return 'N/A';
    }
    
    // For select/radio fields with options
    if (field?.options && (field.fieldType === 'select' || field.fieldType === 'radio')) {
      const option = field.options.find(opt => opt.value === value);
      return option?.label || value;
    }
    
    // For checkbox fields
    if (field?.fieldType === 'checkbox') {
      return value ? 'Yes' : 'No';
    }
    
    // For date fields
    if (field?.fieldType === 'date' && value instanceof Date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(value);
    }
    
    return value.toString();
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-text-900 mb-4">
        Form Data - {serviceName}
      </h2>
      
      <div className="space-y-6">
        {formFields.map((field) => {
          const value = formData[field.key];
          
          return (
            <div key={field.key} className="border-b border-border-200 pb-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-700 mb-1">
                    {field.label}
                    {field.required && (
                      <span className="text-error-600 ml-1">*</span>
                    )}
                  </label>
                  
                  <div className="text-text-900">
                    {field.fieldType === 'textarea' ? (
                      <p className="whitespace-pre-wrap">{getFieldValue(field.key, value)}</p>
                    ) : (
                      <p>{getFieldValue(field.key, value)}</p>
                    )}
                  </div>
                  
                  {field.validation && (
                    <div className="mt-1 text-xs text-text-500">
                      {field.validation.pattern && (
                        <span>Pattern: {field.validation.pattern}</span>
                      )}
                      {field.validation.minLength && (
                        <span>Min length: {field.validation.minLength}</span>
                      )}
                      {field.validation.maxLength && (
                        <span>Max length: {field.validation.maxLength}</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="ml-4 text-xs text-text-500">
                  {field.fieldType}
                </div>
              </div>
            </div>
          );
        })}
        
        {Object.keys(formData).some(key => !formFields.find(f => f.key === key)) && (
          <div className="mt-6 pt-4 border-t border-border-200">
            <h3 className="text-sm font-medium text-text-700 mb-3">
              Additional Data
            </h3>
            <div className="space-y-2">
              {Object.keys(formData)
                .filter(key => !formFields.find(f => f.key === key))
                .map(key => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-text-600">{key}:</span>
                    <span className="text-sm text-text-900">{formData[key]}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
