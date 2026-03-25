import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, Building2, Globe, Mail, Phone, User, Check, X, Camera, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const CompanyRegistration = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    size: '',
    location: '',
    description: '',
    founded_year: '',
    linkedin_url: '',
    twitter_url: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: formData,
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Real Estate', 'Media',
    'Transportation', 'Energy', 'Agriculture', 'Government'
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' },
    { value: 'startup', label: 'Startup' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setLogoFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setValidationErrors({});
    
    try {
      const formDataWithLogo = new FormData();
      Object.keys(data).forEach(key => {
        formDataWithLogo.append(key, data[key]);
      });
      
      if (logoFile) {
        formDataWithLogo.append('logo', logoFile);
      }
      
      await api.post('/companies/register/', formDataWithLogo, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      // Success - redirect to dashboard
      window.location.href = '/company/dashboard/';
    } catch (err) {
      setValidationErrors(err.response?.data || { general: 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Company Profile
            </h2>
            <p className="text-gray-600">
              Register your company to start recruiting talented candidates
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-1 rounded-full ${step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <span className={`ml-2 text-sm font-medium ${step <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step === 1 && 'Company Info'}
                    {step === 2 && 'Company Details'}
                    {step === 3 && 'Review & Submit'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="Enter your company name"
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    {...register('industry')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {validationErrors.industry && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    {...register('website')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="https://yourcompany.com"
                  />
                  {validationErrors.website && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.website}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size *
                  </label>
                  <select
                    {...register('size')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                  >
                    <option value="">Select Size</option>
                    {companySizes.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                  {validationErrors.size && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.size}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    {...register('location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="City, State, Country"
                  />
                  {validationErrors.location && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Additional Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="Tell candidates about your company culture, values, and mission..."
                  />
                  {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Founded Year
                  </label>
                  <input
                    {...register('founded_year')}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="2020"
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                  {validationErrors.founded_year && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.founded_year}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    {...register('linkedin_url')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                  {validationErrors.linkedin_url && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.linkedin_url}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter URL
                  </label>
                  <input
                    {...register('twitter_url')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="https://twitter.com/yourcompany"
                  />
                  {validationErrors.twitter_url && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.twitter_url}</p>
                  )}
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Logo
                  </label>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <input {...getInputProps()} className="hidden" />
                    <div className="space-y-1 text-center">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Company logo preview"
                          className="mx-auto h-24 w-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            Click or drag logo here
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {validationErrors.logo && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.logo}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Review & Submit
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Review Company Information
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Company Name:</span>
                      <span className="text-gray-900">{formData.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Industry:</span>
                      <span className="text-gray-900">{formData.industry}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Size:</span>
                      <span className="text-gray-900">
                        {companySizes.find(s => s.value === formData.size)?.label || formData.size}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Website:</span>
                      <span className="text-gray-900">{formData.website || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span className="text-gray-900">{formData.location}</span>
                    </div>
                  </div>

                  {logoPreview && (
                    <div className="mt-4">
                      <span className="font-medium text-gray-700">Logo:</span>
                      <img
                        src={logoPreview}
                        alt="Company logo"
                        className="mt-2 h-20 w-20 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;
