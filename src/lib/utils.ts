import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface DownloadOptions {
  url: string;
  filename: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const downloadFile = async ({ url, filename, onSuccess, onError }: DownloadOptions) => {
  if (!url) {
    onError?.('No download URL provided');
    return;
  }
  
  try {
    // For mobile devices, use a simpler download approach
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Direct download link for mobile - faster and more reliable
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onSuccess?.();
    } else {
      // Desktop approach with blob for better file naming
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      onSuccess?.();
    }
  } catch (error) {
    console.error('Download error:', error);
    // Fallback to opening in new tab if blob approach fails
    window.open(url, '_blank');
    onError?.(error instanceof Error ? error.message : 'Download failed');
  }
};

export const sanitizeFilename = (title: string, artist: string) => {
  const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const safeArtist = artist.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `${safeTitle}_by_${safeArtist}.mp3`;
};
