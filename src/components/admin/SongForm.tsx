
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';

interface SongFormProps {
  onClose: () => void;
  editData?: any;
}

const SongForm: React.FC<SongFormProps> = ({ onClose, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    release_date: '',
    genre: '',
    image_url: '',
    duration: '',
    download_url: ''
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Populate form data when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        artist: editData.artist || '',
        release_date: editData.release_date || '',
        genre: editData.genre ? editData.genre.join(', ') : '',
        image_url: editData.image_url || '',
        duration: editData.duration || '',
        download_url: editData.download_url || ''
      });
    }
  }, [editData]);

  // Check if required fields are filled
  const areRequiredFieldsFilled = formData.title.trim() !== '' && formData.artist.trim() !== '';

  const saveSong = useMutation({
    mutationFn: async (data: any) => {
      const songData = {
        ...data,
        genre: data.genre ? data.genre.split(',').map((g: string) => g.trim()) : []
      };

      if (editData) {
        const { error } = await supabase
          .from('songs')
          .update(songData)
          .eq('id', editData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('songs').insert([songData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-songs'] });
      queryClient.invalidateQueries({ queryKey: ['featured-songs'] });
      toast({ title: `Song ${editData ? 'updated' : 'added'} successfully!` });
      onClose();
    },
    onError: (error) => {
      toast({ 
        title: `Error ${editData ? 'updating' : 'adding'} song`, 
        description: error.message, 
        variant: "destructive" 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areRequiredFieldsFilled) {
      toast({ 
        title: "Missing required fields", 
        description: "Please fill in title and artist before submitting", 
        variant: "destructive" 
      });
      return;
    }
    saveSong.mutate(formData);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="artist">Artist *</Label>
            <Input
              id="artist"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              required
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="release_date">Release Date</Label>
            <Input
              id="release_date"
              type="date"
              value={formData.release_date}
              onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="3:45"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="genre">Genres (comma separated)</Label>
          <Input
            id="genre"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            placeholder="Afrobeat, Pop, Hip-hop"
            className="bg-gray-800 border-gray-600 text-white"
          />
        </div>

        {!areRequiredFieldsFilled && !editData && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-md p-3">
            <p className="text-orange-400 text-sm">
              Please fill in the title and artist fields above before uploading files.
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className={areRequiredFieldsFilled || editData ? '' : 'opacity-50 pointer-events-none'}>
            <FileUpload
              bucket="images"
              accept="image/*"
              label="Song Cover Image"
              currentFile={formData.image_url}
              onUpload={(url) => setFormData({ ...formData, image_url: url })}
            />
          </div>
          
         <div className={areRequiredFieldsFilled || editData ? '' : 'opacity-50 pointer-events-none'}>
  <FileUpload
    bucket="songs"
    accept="audio/*,audio/mp3,audio/mpeg,audio/wav,audio/aac,audio/ogg"
    label="Audio File"
    currentFile={formData.download_url}
    onUpload={(url) => setFormData({ ...formData, download_url: url })}
  />
</div>
        </div>
        
        <div className="flex gap-2 pt-4 border-t border-gray-700">
          <Button type="submit" disabled={saveSong.isPending || (!areRequiredFieldsFilled && !editData)}>
            {saveSong.isPending ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Song' : 'Add Song')}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
