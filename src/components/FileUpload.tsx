
import React, { useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  bucket: 'songs' | 'images';
  onUpload: (url: string) => void;
  accept: string;
  label: string;
  currentFile?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  bucket, 
  onUpload, 
  accept, 
  label, 
  currentFile 
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUpload(publicUrl);
      toast({ title: `${label} uploaded successfully!` });
    } catch (error: any) {
      toast({ 
        title: `Error uploading ${label.toLowerCase()}`, 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const removeFile = () => {
    onUpload('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      
      {currentFile ? (
        <div className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-600 rounded-md">
          <File className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-300 flex-1">File uploaded</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={removeFile}
            className="text-red-400 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-green-500 bg-green-500/10' 
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-400 mb-2">
            Drag and drop your {label.toLowerCase()} here, or click to browse
          </p>
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            id={`file-upload-${bucket}`}
            disabled={uploading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => document.getElementById(`file-upload-${bucket}`)?.click()}
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
