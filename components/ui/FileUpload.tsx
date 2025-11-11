'use client';

import { useRef, useState } from 'react';
import { validateFiles } from '@/lib/validation';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export function FileUpload({ files, onChange, error }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string>('');

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const fileArray = Array.from(selectedFiles);
    const validation = validateFiles(fileArray);

    if (!validation.isValid) {
      setLocalError(validation.error || 'Błąd walidacji plików');
      return;
    }

    setLocalError('');
    onChange(fileArray);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const displayError = error || localError;

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        className={`relative rounded-lg border-2 border-dashed transition-all duration-300 ${
          dragActive
            ? 'border-accent-orange bg-accent-orange/10'
            : displayError
              ? 'border-red-500 bg-red-500/5'
              : 'border-steel-gray bg-primary-medGray/30 hover:border-metallic-silver'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="p-6 text-center">
          {/* Upload Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-steel-gray/30">
            <svg
              className="h-6 w-6 text-metallic-silver"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          {/* Instructions */}
          <p className="mb-2 text-sm text-text-lightGray">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-medium text-accent-orange hover:underline"
            >
              Kliknij, aby wybrać pliki
            </button>
            {' '}lub przeciągnij i upuść
          </p>
          <p className="text-xs text-steel-gray">
            JPG, PNG lub PDF (maksymalnie 3 pliki, 5MB każdy)
          </p>
        </div>
      </div>

      {/* Error Message */}
      {displayError && (
        <p className="text-sm text-red-500">{displayError}</p>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-steel-gray/30 bg-primary-medGray/50 p-3"
            >
              <div className="flex items-center gap-3">
                {/* File Icon */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-steel-gray/30">
                  {file.type.startsWith('image/') ? (
                    <svg
                      className="h-5 w-5 text-metallic-silver"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-metallic-silver"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>

                {/* File Info */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-steel-gray">{formatFileSize(file.size)}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="flex-shrink-0 rounded-full p-1 text-steel-gray transition-colors duration-200 hover:bg-red-500/20 hover:text-red-500"
                aria-label="Usuń plik"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
