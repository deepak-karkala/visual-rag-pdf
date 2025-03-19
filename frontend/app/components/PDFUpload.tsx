'use client'

import { useState } from 'react'
import { uploadPDF } from '../lib/api'

type Props = {
  onUploadSuccess?: (documentId: string) => void
}

export default function PDFUpload({ onUploadSuccess }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleUpload = async (uploadFile: File) => {
    setIsUploading(true)
    setError(null)
    try {
      const response = await uploadPDF(uploadFile)
      setFile(uploadFile)
      onUploadSuccess?.(response.document_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload PDF')
      setFile(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find(file => file.type === 'application/pdf')
    
    if (pdfFile) {
      await handleUpload(pdfFile)
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const pdfFile = files.find(file => file.type === 'application/pdf')
    
    if (pdfFile) {
      await handleUpload(pdfFile)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Uploading...</span>
          </div>
        ) : file ? (
          <div>
            <p className="text-lg font-semibold">{file.name}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setFile(null)}
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-4">Drag and drop your PDF here, or</p>
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileInput}
              />
            </label>
            {error && (
              <p className="mt-4 text-red-500">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
