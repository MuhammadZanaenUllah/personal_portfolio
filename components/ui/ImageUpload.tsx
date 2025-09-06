'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { uploadImage, deleteImage } from '@/lib/supabase'
import Button from './Button'

interface ImageUploadProps {
  value?: string
  onChange: (url: string | null) => void
  className?: string
  accept?: string
  maxSize?: number // in MB
  bucket?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  className = '',
  accept = 'image/*',
  maxSize = 5,
  bucket = 'images'
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback(async (file: File) => {
    setError(null)
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    setIsUploading(true)
    
    try {
      // Delete old image if exists
      if (value) {
        await deleteImage(value, bucket)
      }

      // Upload new image
      const imageUrl = await uploadImage(file, bucket)
      
      if (imageUrl) {
        onChange(imageUrl)
      } else {
        setError('Failed to upload image. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image. Please try again.'
      setError(`Upload failed: ${errorMessage}`)
    } finally {
      setIsUploading(false)
    }
  }, [value, onChange, maxSize, bucket])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleRemove = async () => {
    if (value) {
      setIsUploading(true)
      try {
        await deleteImage(value, bucket)
        onChange(null)
      } catch (error) {
        console.error('Delete error:', error)
        setError('Failed to delete image')
      } finally {
        setIsUploading(false)
      }
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {value ? (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={value}
              alt="Uploaded image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <Button
                variant="danger"
                size="sm"
                onClick={handleRemove}
                disabled={isUploading}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`
            relative w-full h-48 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
            ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!isUploading ? openFileDialog : undefined}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-sm text-gray-600">Uploading image...</p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  {isDragOver ? (
                    <Upload className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {isDragOver ? 'Drop image here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to {maxSize}MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
        aria-label="Upload image file"
      />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload