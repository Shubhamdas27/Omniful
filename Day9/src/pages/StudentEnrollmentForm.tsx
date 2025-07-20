import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, FileText, Camera } from 'lucide-react';
import { MultiStepForm, FormStep } from '../components/ui/MultiStepForm';
import { FileUpload } from '../components/ui/FileUpload';
import Input from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAutoSave, useUnsavedChangesWarning, createAutoSaveKey } from '../hooks/useAutoSave';

interface StudentFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Academic Information
  course: string;
  semester: string;
  previousEducation: string;
  
  // Documents
  documents: any[];
  
  // Guardian Information
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
}

export default function StudentEnrollmentForm() {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    course: '',
    semester: '',
    previousEducation: '',
    documents: [],
    guardianName: '',
    guardianPhone: '',
    guardianEmail: ''
  });

  // Auto-save functionality
  const autoSave = useAutoSave(formData, {
    key: createAutoSaveKey('student_enrollment', 'user123', 'form_v1'),
    debounceMs: 2000,
    onSave: async (data) => {
      console.log('Auto-saving student enrollment:', data);
      // Here you would save to your backend API
    },
    onError: (error) => {
      console.error('Auto-save failed:', error);
    }
  });

  // Warn user about unsaved changes
  useUnsavedChangesWarning(autoSave.hasUnsavedChanges());

  const updateFormData = (field: keyof StudentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePersonalInfo = () => {
    return !!(
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.dateOfBirth
    );
  };

  const validateAcademicInfo = () => {
    return !!(
      formData.course &&
      formData.semester &&
      formData.previousEducation
    );
  };

  const validateDocuments = () => {
    return formData.documents.length >= 2; // At least 2 documents required
  };

  const validateGuardianInfo = () => {
    return !!(
      formData.guardianName &&
      formData.guardianPhone &&
      formData.guardianEmail
    );
  };

  const handleFormComplete = async () => {
    try {
      console.log('Submitting student enrollment:', formData);
      // Here you would submit to your API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Clear saved data after successful submission
      autoSave.clearSaved();
      
      alert('Student enrollment completed successfully!');
    } catch (error) {
      console.error('Failed to submit enrollment:', error);
      alert('Failed to submit enrollment. Please try again.');
    }
  };

  const steps: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Please provide your basic personal details',
      isValid: validatePersonalInfo,
      component: (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Personal Details
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tell us about yourself
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth *
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )
    },
    {
      id: 'academic',
      title: 'Academic Information',
      description: 'Select your course and academic preferences',
      isValid: validateAcademicInfo,
      component: (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Academic Preferences
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your course and academic level
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => updateFormData('course', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  aria-label="Select course"
                >
                  <option value="">Select a course</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="business">Business Administration</option>
                  <option value="engineering">Engineering</option>
                  <option value="medicine">Medicine</option>
                  <option value="arts">Arts & Literature</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Semester *
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => updateFormData('semester', e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  aria-label="Select semester"
                >
                  <option value="">Select semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Previous Education *
                </label>
                <textarea
                  value={formData.previousEducation}
                  onChange={(e) => updateFormData('previousEducation', e.target.value)}
                  placeholder="Describe your previous educational background..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )
    },
    {
      id: 'documents',
      title: 'Document Upload',
      description: 'Upload required documents for verification',
      isValid: validateDocuments,
      component: (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Required Documents
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upload at least 2 documents for verification
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Academic Transcripts',
                  'ID Proof (Passport/Aadhar)',
                  'Address Proof',
                  'Passport Size Photo'
                ].map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Camera className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{doc}</span>
                    {index < 2 && <Badge variant="error" className="text-xs ml-auto">Required</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <FileUpload
              onFilesChange={(files) => updateFormData('documents', files)}
              acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']}
              maxFiles={10}
              maxSize={5}
              placeholder="Drag & drop your documents here or click to browse"
            />
          </Card>
        </motion.div>
      )
    },
    {
      id: 'guardian',
      title: 'Guardian Information',
      description: 'Provide guardian/parent contact details',
      isValid: validateGuardianInfo,
      isOptional: true,
      component: (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <User className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Guardian Details
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Emergency contact information (optional)
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Guardian Name
                </label>
                <Input
                  value={formData.guardianName}
                  onChange={(e) => updateFormData('guardianName', e.target.value)}
                  placeholder="Enter guardian's full name"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Guardian Phone
                  </label>
                  <Input
                    type="tel"
                    value={formData.guardianPhone}
                    onChange={(e) => updateFormData('guardianPhone', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Guardian Email
                  </label>
                  <Input
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => updateFormData('guardianEmail', e.target.value)}
                    placeholder="Enter email address"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Student Enrollment Form
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join College Aaja Bhai - Complete your enrollment in simple steps
        </p>
        
        {/* Auto-save status */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <Badge 
            variant={autoSave.status.status === 'saved' ? 'success' : 
                    autoSave.status.status === 'saving' ? 'info' : 
                    autoSave.status.status === 'error' ? 'error' : 'default'}
          >
            {autoSave.status.status === 'idle' ? 'Ready' : 
             autoSave.status.status === 'saving' ? 'Saving...' : 
             autoSave.status.status === 'saved' ? 'Auto-saved' : 
             'Save failed'}
          </Badge>
          {autoSave.status.lastSaved && (
            <span className="text-xs text-gray-500">
              Last saved: {autoSave.status.lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
      </motion.div>

      <MultiStepForm
        steps={steps}
        onComplete={handleFormComplete}
        showStepNumbers={true}
        showProgress={true}
        allowSkipOptional={true}
        autoSave={true}
        onAutoSave={async (currentStep, data) => {
          console.log(`Auto-saving step ${currentStep}:`, data);
        }}
      />
    </div>
  );
}
