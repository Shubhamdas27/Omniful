import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, File, Image, Video, FileText, AlertCircle } from 'lucide-react';
import Button from './Button';

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  onFilesChange: (files: FileWithPreview[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSize?: number; // in MB
  multiple?: boolean;
  className?: string;
  placeholder?: string;
}

export function FileUpload({
  onFilesChange,
  acceptedTypes = ['*'],
  maxFiles = 5,
  maxSize = 10,
  multiple = true,
  className = '',
  placeholder = 'Drag & drop files here or click to browse'
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const generateFileId = () => Math.random().toString(36).substr(2, 9);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-8 h-8 text-blue-500" />;
    if (type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />;
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB`;
    }
    
    if (acceptedTypes.length > 0 && !acceptedTypes.includes('*')) {
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type.toLowerCase());
        if (type.includes('/')) return file.type.match(new RegExp(type.replace('*', '.*')));
        return false;
      });
      
      if (!isAccepted) {
        return `File type not accepted. Allowed: ${acceptedTypes.join(', ')}`;
      }
    }
    
    return null;
  };

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: FileWithPreview[] = [];
    
    Array.from(fileList).forEach(file => {
      const error = validateFile(file);
      const fileId = generateFileId();
      
      const fileWithPreview: FileWithPreview = {
        ...file,
        id: fileId,
        error: error || undefined
      };

      // Create preview for images
      if (file.type.startsWith('image/') && !error) {
        const reader = new FileReader();
        reader.onload = () => {
          fileWithPreview.preview = reader.result as string;
          setFiles(prev => prev.map(f => f.id === fileId ? fileWithPreview : f));
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(fileWithPreview);
    });

    if (!multiple) {
      setFiles(newFiles.slice(0, 1));
    } else {
      setFiles(prev => {
        const combined = [...prev, ...newFiles];
        return combined.slice(0, maxFiles);
      });
    }
  }, [multiple, maxFiles]);

  // Simulate upload progress
  useEffect(() => {
    const newFiles = files.filter(f => !f.error && uploadProgress[f.id] === undefined);
    
    newFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
      }, 100);
    });
  }, [files.length]);

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = ''; // Reset input
    }
  }, [processFiles]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-colors duration-200 backdrop-blur-sm
          ${isDragActive 
            ? 'border-blue-400 bg-blue-50/10 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
        `}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={handleFileInput}
          accept={acceptedTypes.join(',')}
          className="hidden"
          aria-label="File upload"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {placeholder}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Max {maxFiles} files, up to {maxSize}MB each
            </p>
            {acceptedTypes.length > 0 && !acceptedTypes.includes('*') && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Accepts: {acceptedTypes.join(', ')}
              </p>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {isDragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl flex items-center justify-center"
            >
              <div className="text-blue-600 dark:text-blue-400 font-semibold">
                Drop files here
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {/* File Icon/Preview */}
                <div className="flex-shrink-0">
                  {file.preview ? (
                    <img 
                      src={file.preview} 
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    getFileIcon(file.type)
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                  
                  {file.error ? (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <p className="text-xs text-red-500">{file.error}</p>
                    </div>
                  ) : (
                    uploadProgress[file.id] !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadProgress[file.id] || 0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress[file.id] || 0}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
