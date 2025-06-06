
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';

interface NewsFormProps {
  onClose: () => void;
  editData?: any;
}

const NewsForm: React.FC<NewsFormProps> = ({ onClose, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image_url: '',
    read_time: ''
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Populate form data when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || '',
        excerpt: editData.excerpt || '',
        content: editData.content || '',
        author: editData.author || '',
        category: editData.category || '',
        image_url: editData.image_url || '',
        read_time: editData.read_time || ''
      });
    }
  }, [editData]);

  const saveNews = useMutation({
    mutationFn: async (data: any) => {
      if (editData) {
        const { error } = await supabase
          .from('news')
          .update(data)
          .eq('id', editData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] });
      toast({ title: `News article ${editData ? 'updated' : 'added'} successfully!` });
      onClose();
    },
    onError: (error) => {
      toast({ 
        title: `Error ${editData ? 'updating' : 'adding'} news`, 
        description: error.message, 
        variant: "destructive" 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveNews.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="news-title">Title *</Label>
        <Input
          id="news-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={2}
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="read_time">Read Time</Label>
        <Input
          id="read_time"
          value={formData.read_time}
          onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
          placeholder="5 min read"
        />
      </div>
      
      <FileUpload
        bucket="images"
        accept="image/*"
        label="Article Image"
        currentFile={formData.image_url}
        onUpload={(url) => setFormData({ ...formData, image_url: url })}
      />
      
      <div className="flex gap-2">
        <Button type="submit" disabled={saveNews.isPending}>
          {saveNews.isPending ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Article' : 'Add Article')}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
