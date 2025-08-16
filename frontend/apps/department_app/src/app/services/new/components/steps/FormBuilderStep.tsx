import React, { useState } from "react";
import { Button, Card, InputField, Select, Checkbox, TextArea } from "@myorg/ui";
import { FormField } from "../../types/service-creation.types";

interface FormBuilderStepProps {
  formFields: FormField[];
  onUpdate: (fields: FormField[]) => void;
  error?: string;
}

const fieldTypeOptions = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number Input" },
  { value: "date", label: "Date Picker" },
  { value: "time", label: "Time Picker" },
  { value: "select", label: "Dropdown Selection" },
  { value: "radio", label: "Radio Buttons" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "textarea", label: "Text Area" },
  { value: "file", label: "File Upload" },
];

export default function FormBuilderStep({ formFields, onUpdate, error }: FormBuilderStepProps) {
  const [isAddingField, setIsAddingField] = useState(false);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [currentField, setCurrentField] = useState<Partial<FormField>>({
    fieldType: "text",
    label: "",
    key: "",
    required: false,
    options: [],
    placeholder: ""
  });

  const generateFieldKey = (label: string): string => {
    return label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  };

  const handleFieldChange = (field: string, value: any) => {
    setCurrentField(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'label' ? { key: generateFieldKey(value) } : {})
    }));
  };

  const addOption = () => {
    setCurrentField(prev => ({
      ...prev,
      options: [...(prev.options || []), { label: "", value: "" }]
    }));
  };

  const updateOption = (index: number, field: 'label' | 'value', value: string) => {
    setCurrentField(prev => ({
      ...prev,
      options: prev.options?.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      ) || []
    }));
  };

  const removeOption = (index: number) => {
    setCurrentField(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }));
  };

  const saveField = () => {
    if (!currentField.label || !currentField.fieldType) return;

    const newField: FormField = {
      id: editingFieldId || `field_${Date.now()}`,
      fieldType: currentField.fieldType as FormField['fieldType'],
      label: currentField.label,
      key: currentField.key || generateFieldKey(currentField.label),
      required: currentField.required || false,
      options: currentField.options || [],
      placeholder: currentField.placeholder
    };

    if (editingFieldId) {
      // Update existing field
      onUpdate(formFields.map(field => 
        field.id === editingFieldId ? newField : field
      ));
    } else {
      // Add new field
      onUpdate([...formFields, newField]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCurrentField({
      fieldType: "text",
      label: "",
      key: "",
      required: false,
      options: [],
      placeholder: ""
    });
    setIsAddingField(false);
    setEditingFieldId(null);
  };

  const editField = (field: FormField) => {
    setCurrentField(field);
    setEditingFieldId(field.id);
    setIsAddingField(true);
  };

  const deleteField = (fieldId: string) => {
    onUpdate(formFields.filter(field => field.id !== fieldId));
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...formFields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    onUpdate(newFields);
  };

  const requiresOptions = ['select', 'radio', 'checkbox'].includes(currentField.fieldType || '');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text-900 mb-4">Form Builder</h2>
        <p className="text-text-500 mb-6">
          Create the application form that citizens will fill out when requesting this service.
        </p>
      </div>

      {error && (
        <div className="bg-error-100 border border-error-500 p-4 rounded-md">
          <p className="text-error-500 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Builder Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-900">Form Fields</h3>
            {!isAddingField && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingField(true)}
              >
                Add Field
              </Button>
            )}
          </div>

          {/* Existing Fields */}
          <div className="space-y-3">
            {formFields.map((field, index) => (
              <Card key={field.id} padding="sm" className="border-l-4 border-l-primary-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text-900">{field.label}</h4>
                    <p className="text-sm text-text-500">
                      {fieldTypeOptions.find(opt => opt.value === field.fieldType)?.label}
                      {field.required && <span className="text-error-500 ml-1">*</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {index > 0 && (
                      <button
                        onClick={() => moveField(index, index - 1)}
                        className="text-text-500 hover:text-text-700"
                      >
                        ↑
                      </button>
                    )}
                    {index < formFields.length - 1 && (
                      <button
                        onClick={() => moveField(index, index + 1)}
                        className="text-text-500 hover:text-text-700"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      onClick={() => editField(field)}
                      className="text-primary-600 hover:text-primary-hover text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteField(field.id)}
                      className="text-error-500 hover:text-error-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add/Edit Field Form */}
          {isAddingField && (
            <Card padding="md" className="border-2 border-primary-600">
              <h4 className="font-medium text-text-900 mb-4">
                {editingFieldId ? 'Edit Field' : 'Add New Field'}
              </h4>
              
              <div className="space-y-4">
                <Select
                  id="fieldType"
                  label="Field Type"
                  value={currentField.fieldType || ""}
                  onChange={(value) => handleFieldChange('fieldType', value)}
                  options={fieldTypeOptions}
                  required
                />

                <InputField
                  id="fieldLabel"
                  label="Field Label"
                  type="text"
                  value={currentField.label || ""}
                  onChange={(e) => handleFieldChange('label', e.target.value)}
                  placeholder="Enter field label"
                  required
                />

                <InputField
                  id="fieldKey"
                  label="Field Key"
                  type="text"
                  value={currentField.key || ""}
                  onChange={(e) => handleFieldChange('key', e.target.value)}
                  placeholder="Unique identifier for this field"
                />

                <InputField
                  id="fieldPlaceholder"
                  label="Placeholder Text"
                  type="text"
                  value={currentField.placeholder || ""}
                  onChange={(e) => handleFieldChange('placeholder', e.target.value)}
                  placeholder="Enter placeholder text"
                />

                <Checkbox
                  id="fieldRequired"
                  label="Required Field"
                  checked={currentField.required || false}
                  onChange={(checked) => handleFieldChange('required', checked)}
                />

                {/* Options for select, radio, checkbox fields */}
                {requiresOptions && (
                  <div>
                    <label className="block text-sm font-medium text-text-700 mb-2">
                      Options
                    </label>
                    {currentField.options?.map((option, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <InputField
                          id={`option-label-${index}`}
                          label=""
                          type="text"
                          value={option.label}
                          onChange={(e) => updateOption(index, 'label', e.target.value)}
                          placeholder="Option label"
                        />
                        <InputField
                          id={`option-value-${index}`}
                          label=""
                          type="text"
                          value={option.value}
                          onChange={(e) => updateOption(index, 'value', e.target.value)}
                          placeholder="Option value"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                    >
                      Add Option
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={saveField}>
                    {editingFieldId ? 'Update Field' : 'Add Field'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Preview Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-900">Form Preview</h3>
          <Card padding="md" className="bg-background-50">
            <h4 className="font-medium text-text-900 mb-4">Application Form Preview</h4>
            
            {formFields.length === 0 ? (
              <p className="text-text-500 italic">No fields added yet. Add some fields to see the preview.</p>
            ) : (
              <div className="space-y-4">
                {formFields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-text-700 mb-1">
                      {field.label}
                      {field.required && <span className="text-error-500 ml-1">*</span>}
                    </label>
                    
                    {field.fieldType === 'text' && (
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-border-200 rounded-md"
                        disabled
                      />
                    )}
                    
                    {field.fieldType === 'number' && (
                      <input
                        type="number"
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-border-200 rounded-md"
                        disabled
                      />
                    )}
                    
                    {field.fieldType === 'date' && (
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-border-200 rounded-md"
                        disabled
                      />
                    )}
                    
                    {field.fieldType === 'time' && (
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-border-200 rounded-md"
                        disabled
                      />
                    )}
                    
                    {field.fieldType === 'select' && (
                      <select className="w-full px-3 py-2 border border-border-200 rounded-md" disabled>
                        <option>{field.placeholder || "Select an option"}</option>
                        {field.options?.map((option, i) => (
                          <option key={i} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    )}
                    
                    {field.fieldType === 'textarea' && (
                      <textarea
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-3 py-2 border border-border-200 rounded-md"
                        disabled
                      />
                    )}
                    
                    {field.fieldType === 'radio' && (
                      <div className="space-y-2">
                        {field.options?.map((option, i) => (
                          <label key={i} className="flex items-center">
                            <input type="radio" name={field.key} disabled className="mr-2" />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {field.fieldType === 'checkbox' && (
                      <div className="space-y-2">
                        {field.options?.map((option, i) => (
                          <label key={i} className="flex items-center">
                            <input type="checkbox" disabled className="mr-2" />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {field.fieldType === 'file' && (
                      <input
                        type="file"
                        className="w-full px-3 py-2 border border-border-200 rounded-md"
                        disabled
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
