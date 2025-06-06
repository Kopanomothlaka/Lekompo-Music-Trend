
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';
import { Switch } from '@/components/ui/switch';

interface VideoFormProps {
  onClose: () => void;
  editData?: any;
}

const VideoForm: React.FC<VideoFormProps> = ({ onClose, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    channel: '',
    video_url: '',
    thumbnail_url: '',
    duration: '',
    upload_date: '',
    views: '0',
    likes: '0',
    featured: false
  });

  const [youtubePreview, setYoutubePreview] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Populate form data when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        channel: editData.channel || '',
        video_url: editData.video_url || '',
        thumbnail_url: editData.thumbnail_url || '',
        duration: editData.duration || '',
        upload_date: editData.upload_date || '',
        views: editData.views || '0',
        likes: editData.likes || '0',
        featured: editData.featured || false
      });
      
      if (editData.video_url) {
        updateYoutubePreview(editData.video_url);
      }
    }
  }, [editData]);

  const saveVideo = useMutation({
    mutationFn: async (data: any) => {
      if (editData) {
        const { error } = await supabase
          .from('videos')
          .update(data)
          .eq('id', editData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('videos').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast({ title: `Video ${editData ? 'updated' : 'added'} successfully!` });
      onClose();
    },
    onError: (error) => {
      toast({ 
        title: `Error ${editData ? 'updating' : 'adding'} video`, 
        description: error.message, 
        variant: "destructive" 
      });
    }
  });

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) 
      ? match[2] 
      : null;
  };

  // Update YouTube preview when URL changes
  const updateYoutubePreview = (url: string) => {
    const videoId = getYoutubeVideoId(url);
    setYoutubePreview(videoId);
    
    // If we have a valid YouTube URL but no thumbnail, try to set the thumbnail
    if (videoId && !formData.thumbnail_url) {
      setFormData({ 
        ...formData, 
        video_url: url,
        thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      });
    } else {
      setFormData({ ...formData, video_url: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveVideo.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div>
        <Label htmlFor="video-title">Title *</Label>
        <Input
          id="video-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="channel">Channel</Label>
          <Input
            id="channel"
            value={formData.channel}
            onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="video-duration">Duration</Label>
          <Input
            id="video-duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="5:30"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="video_url">YouTube Video URL *</Label>
        <Input
          id="video_url"
          value={formData.video_url}
          onChange={(e) => updateYoutubePreview(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          required
        />
        
        {youtubePreview && (
          <div className="mt-2 rounded border border-gray-700 p-2">
            <p className="text-xs text-gray-400 mb-2">YouTube Video Preview:</p>
            <div className="aspect-video w-full max-w-[300px]">
              <iframe 
                width="100%" 
                height="100%"
                src={`https://www.youtube.com/embed/${youtubePreview}`}
                title="YouTube Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-sm"
              ></iframe>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="upload_date">Upload Date</Label>
          <Input
            id="upload_date"
            value={formData.upload_date}
            onChange={(e) => setFormData({ ...formData, upload_date: e.target.value })}
            placeholder="May 15, 2024"
          />
        </div>
        
        <div>
          <Label htmlFor="views">Views</Label>
          <Input
            id="views"
            value={formData.views}
            onChange={(e) => setFormData({ ...formData, views: e.target.value })}
            placeholder="1.2K"
          />
        </div>
        
        <div>
          <Label htmlFor="likes">Likes</Label>
          <Input
            id="likes"
            value={formData.likes}
            onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
            placeholder="250"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Label htmlFor="featured">Featured Video</Label>
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
      </div>
      
      <FileUpload
        bucket="images"
        accept="image/*"
        label="Video Thumbnail"
        currentFile={formData.thumbnail_url}
        onUpload={(url) => setFormData({ ...formData, thumbnail_url: url })}
      />
      
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={saveVideo.isPending}>
          {saveVideo.isPending ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Video' : 'Add Video')}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;
