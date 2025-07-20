import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import Button from './Button';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
  isValid?: () => boolean;
  onNext?: () => void | Promise<void>;
  onPrevious?: () => void | Promise<void>;
  isOptional?: boolean;
}

interface MultiStepFormProps {
  steps: FormStep[];
  onComplete: () => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  showStepNumbers?: boolean;
  showProgress?: boolean;
  allowSkipOptional?: boolean;
  autoSave?: boolean;
  onAutoSave?: (currentStep: number, data: any) => Promise<void>;
}

export function MultiStepForm({
  steps,
  onComplete,
  onCancel,
  className = '',
  showStepNumbers = true,
  showProgress = true,
  allowSkipOptional = true,
  autoSave = false,
  onAutoSave
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepData = steps[currentStep];

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && onAutoSave && currentStep > 0) {
      const autoSaveTimeout = setTimeout(async () => {
        try {
          setAutoSaveStatus('saving');
          await onAutoSave(currentStep, {}); // You can pass actual form data here
          setAutoSaveStatus('saved');
          setTimeout(() => setAutoSaveStatus('idle'), 2000);
        } catch (error) {
          setAutoSaveStatus('error');
          setTimeout(() => setAutoSaveStatus('idle'), 3000);
        }
      }, 2000);

      return () => clearTimeout(autoSaveTimeout);
    }
  }, [currentStep, autoSave, onAutoSave]);

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const step = steps[stepIndex];
    setErrors(prev => ({ ...prev, [stepIndex]: '' }));

    if (step.isValid) {
      const isValid = await step.isValid();
      if (!isValid) {
        setErrors(prev => ({ 
          ...prev, 
          [stepIndex]: 'Please complete all required fields before proceeding.' 
        }));
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    setIsLoading(true);

    try {
      // Validate current step
      const isValid = await validateStep(currentStep);
      if (!isValid) {
        setIsLoading(false);
        return;
      }

      // Execute step's onNext callback
      if (currentStepData.onNext) {
        await currentStepData.onNext();
      }

      // Mark step as completed
      setCompletedSteps(prev => new Set([...prev, currentStep]));

      if (isLastStep) {
        await onComplete();
      } else {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        [currentStep]: error instanceof Error ? error.message : 'An error occurred' 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = async () => {
    if (isFirstStep) return;

    setIsLoading(true);

    try {
      if (currentStepData.onPrevious) {
        await currentStepData.onPrevious();
      }
      setCurrentStep(currentStep - 1);
    } catch (error) {
      console.error('Error going to previous step:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepClick = async (stepIndex: number) => {
    if (stepIndex === currentStep) return;
    
    // Only allow going to previous steps or next step if current is completed
    if (stepIndex < currentStep || completedSteps.has(currentStep)) {
      setCurrentStep(stepIndex);
    }
  };

  const skipStep = () => {
    if (currentStepData.isOptional && allowSkipOptional) {
      if (isLastStep) {
        onComplete();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'previous';
    return 'upcoming';
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {totalSteps}
            </span>
            {autoSave && (
              <div className="flex items-center gap-2 text-xs">
                {autoSaveStatus === 'saving' && (
                  <span className="text-blue-600">Saving...</span>
                )}
                {autoSaveStatus === 'saved' && (
                  <span className="text-green-600">✓ Saved</span>
                )}
                {autoSaveStatus === 'error' && (
                  <span className="text-red-600">Save failed</span>
                )}
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Step Navigation */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={step.id}
              className="flex items-center cursor-pointer group"
              onClick={() => handleStepClick(index)}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-colors duration-200
                    ${status === 'completed' 
                      ? 'bg-green-500 text-white' 
                      : status === 'current'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }
                    ${status !== 'upcoming' ? 'group-hover:scale-110' : ''}
                  `}
                  whileHover={status !== 'upcoming' ? { scale: 1.1 } : {}}
                  whileTap={status !== 'upcoming' ? { scale: 0.95 } : {}}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5" />
                  ) : showStepNumbers ? (
                    index + 1
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-current" />
                  )}
                </motion.div>
                <span className={`
                  mt-2 text-xs text-center max-w-20 
                  ${status === 'current' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}
                `}>
                  {step.title}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div className={`
                  w-12 h-0.5 mx-4 
                  ${completedSteps.has(index) ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 min-h-[500px]">
        {/* Step Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.description && (
            <p className="text-gray-600 dark:text-gray-400">
              {currentStepData.description}
            </p>
          )}
          {currentStepData.isOptional && (
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
              Optional
            </span>
          )}
        </div>

        {/* Error Display */}
        {errors[currentStep] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-300 text-sm">
              {errors[currentStep]}
            </span>
          </motion.div>
        )}

        {/* Step Component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {currentStepData.component}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            )}
            {onCancel && isFirstStep && (
              <Button
                variant="ghost"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStepData.isOptional && allowSkipOptional && (
              <Button
                variant="ghost"
                onClick={skipStep}
                disabled={isLoading}
              >
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center gap-2 min-w-[100px]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isLastStep ? (
                'Complete'
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
