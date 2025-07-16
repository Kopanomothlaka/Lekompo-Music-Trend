
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    read_time: '',
    featured: false,
    date: new Date().toISOString().split('T')[0],
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
        read_time: editData.read_time || '',
        featured: editData.featured || false,
        date: editData.date || new Date().toISOString().split('T')[0],
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
      queryClient.invalidateQueries({ queryKey: ['news-articles'] });
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

  // Predefined categories
  const categories = [
    "Artist Spotlight",
    "Behind The Scenes",
    "Concert Recap",
    "Industry News",
    "Interviews", 
    "Press Release",
    "Reviews",
    "Updates",
  ];

  // Predefined read time options
  const readTimeOptions = [
    "1 min read",
    "2 min read",
    "3 min read", 
    "5 min read",
    "10 min read",
    "15+ min read"
  ];

  return (
    <>
      <style>{`
        .ql-container {
          resize: vertical;
          min-height: 150px;
          max-height: 600px;
          overflow: auto;
        }
        .ql-editor a {
          color: #2563eb;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .ql-editor a:hover {
          color: #1d4ed8;
        }
      `}</style>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div>
        <Label htmlFor="news-title">Title *</Label>
        <Input
          id="news-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Author name"
          />
        </div>
        
        <div>
          <Label htmlFor="date">Publication Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectContent>
          </Select>
          {formData.category === 'custom' && (
            <Input
              className="mt-2"
              value={formData.category === 'custom' ? '' : formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Enter custom category"
            />
          )}
        </div>
        
        <div>
          <Label htmlFor="read_time">Read Time</Label>
          <Select 
            value={formData.read_time} 
            onValueChange={(value) => setFormData({ ...formData, read_time: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select read time" />
            </SelectTrigger>
            <SelectContent>
              {readTimeOptions.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectContent>
          </Select>
          {formData.read_time === 'custom' && (
            <Input
              className="mt-2"
              value={formData.read_time === 'custom' ? '' : formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              placeholder="Enter custom read time"
            />
          )}
        </div>
      </div>
      
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={2}
          placeholder="A brief summary of the article"
        />
      </div>
      
      <div>
        <Label htmlFor="content">Content</Label>
        <ReactQuill
          id="content"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          className="min-h-[150px] bg-white text-black rounded"
          theme="snow"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="rounded border-gray-600 text-green-500 focus:ring-green-500"
        />
        <Label htmlFor="featured" className="cursor-pointer">Mark as featured article</Label>
      </div>
      
      <FileUpload
        bucket="images"
        accept="image/*"
        label="Article Image"
        currentFile={formData.image_url}
        onUpload={(url) => setFormData({ ...formData, image_url: url })}
      />
      
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={saveNews.isPending}>
          {saveNews.isPending ? (editData ? 'Updating...' : 'Adding...') : (editData ? 'Update Article' : 'Add Article')}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
    </>
  );
};

export default NewsForm;
