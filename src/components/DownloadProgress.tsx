
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Download, CheckCircle, XCircle } from 'lucide-react';

interface DownloadProgressProps {
  isDownloading: boolean;
  progress: number;
  filename: string;
  status: 'downloading' | 'completed' | 'error' | 'idle';
}

const DownloadProgress = ({ isDownloading, progress, filename, status }: DownloadProgressProps) => {
  if (!isDownloading && status === 'idle') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-green-500 rounded-lg p-4 shadow-lg z-50 min-w-[300px]">
      <div className="flex items-center gap-3 mb-2">
        {status === 'downloading' && <Download className="h-5 w-5 text-green-400 animate-pulse" />}
        {status === 'completed' && <CheckCircle className="h-5 w-5 text-green-400" />}
        {status === 'error' && <XCircle className="h-5 w-5 text-red-400" />}
        
        <div className="flex-1">
          <p className="text-white text-sm font-medium truncate">{filename}</p>
          <p className="text-gray-400 text-xs">
            {status === 'downloading' && `Downloading... ${Math.round(progress)}%`}
            {status === 'completed' && 'Download completed'}
            {status === 'error' && 'Download failed'}
          </p>
        </div>
      </div>
      
      {status === 'downloading' && (
        <Progress 
          value={progress} 
          className="h-2 bg-gray-700"
        />
      )}
    </div>
  );
};

export default DownloadProgress;
