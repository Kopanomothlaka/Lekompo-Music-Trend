
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';

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
    upload_date: ''
  });

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
        upload_date: editData.upload_date || ''
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveVideo.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="video-title">Title *</Label>
        <Input
          id="video-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="channel">Channel</Label>
        <Input
          id="channel"
          value={formData.channel}
          onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="video_url">Video URL</Label>
        <Input
          id="video_url"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
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
      <div>
        <Label htmlFor="upload_date">Upload Date</Label>
        <Input
          id="upload_date"
          value={formData.upload_date}
          onChange={(e) => setFormData({ ...formData, upload_date: e.target.value })}
          placeholder="2024-01-15"
        />
      </div>
      
      <FileUpload
        bucket="images"
        accept="image/*"
        label="Video Thumbnail"
        currentFile={formData.thumbnail_url}
        onUpload={(url) => setFormData({ ...formData, thumbnail_url: url })}
      />
      
      <div className="flex gap-2">
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
