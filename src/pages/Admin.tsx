
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Music, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';

const Admin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('songs');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch songs
  const { data: songs = [] } = useQuery({
    queryKey: ['admin-songs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('songs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch videos
  const { data: videos = [] } = useQuery({
    queryKey: ['admin-videos'],
    queryFn: async () => {
      const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Fetch news
  const { data: news = [] } = useQuery({
    queryKey: ['admin-news'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Song form component
  const SongForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
      title: '',
      artist: '',
      release_date: '',
      genre: '',
      image_url: '',
      duration: '',
      download_url: ''
    });

    const createSong = useMutation({
      mutationFn: async (data: any) => {
        const { error } = await supabase.from('songs').insert([{
          ...data,
          genre: data.genre ? data.genre.split(',').map((g: string) => g.trim()) : []
        }]);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin-songs'] });
        toast({ title: "Song added successfully!" });
        onClose();
      },
      onError: (error) => {
        toast({ title: "Error adding song", description: error.message, variant: "destructive" });
      }
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createSong.mutate(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="artist">Artist *</Label>
          <Input
            id="artist"
            value={formData.artist}
            onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="release_date">Release Date</Label>
          <Input
            id="release_date"
            type="date"
            value={formData.release_date}
            onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="genre">Genres (comma separated)</Label>
          <Input
            id="genre"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            placeholder="Afrobeat, Pop, Hip-hop"
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="3:45"
          />
        </div>
        
        <FileUpload
          bucket="images"
          accept="image/*"
          label="Song Cover Image"
          currentFile={formData.image_url}
          onUpload={(url) => setFormData({ ...formData, image_url: url })}
        />
        
        <FileUpload
          bucket="songs"
          accept="audio/*"
          label="Audio File"
          currentFile={formData.download_url}
          onUpload={(url) => setFormData({ ...formData, download_url: url })}
        />
        
        <div className="flex gap-2">
          <Button type="submit" disabled={createSong.isPending}>
            {createSong.isPending ? 'Adding...' : 'Add Song'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  // Video form component
  const VideoForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
      title: '',
      channel: '',
      video_url: '',
      thumbnail_url: '',
      duration: '',
      upload_date: ''
    });

    const createVideo = useMutation({
      mutationFn: async (data: any) => {
        const { error } = await supabase.from('videos').insert([data]);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
        toast({ title: "Video added successfully!" });
        onClose();
      },
      onError: (error) => {
        toast({ title: "Error adding video", description: error.message, variant: "destructive" });
      }
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createVideo.mutate(formData);
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
          <Button type="submit" disabled={createVideo.isPending}>
            {createVideo.isPending ? 'Adding...' : 'Add Video'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  // News form component
  const NewsForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      image_url: '',
      read_time: ''
    });

    const createNews = useMutation({
      mutationFn: async (data: any) => {
        const { error } = await supabase.from('news').insert([data]);
        if (error) throw error;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['admin-news'] });
        toast({ title: "News article added successfully!" });
        onClose();
      },
      onError: (error) => {
        toast({ title: "Error adding news", description: error.message, variant: "destructive" });
      }
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createNews.mutate(formData);
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
          <Button type="submit" disabled={createNews.isPending}>
            {createNews.isPending ? 'Adding...' : 'Add Article'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your songs, videos, and news content</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="songs" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Songs ({songs.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos ({videos.length})
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                News ({news.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Songs Management</h2>
                <Dialog open={isDialogOpen && activeTab === 'songs'} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Song
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                      <DialogTitle>Add New Song</DialogTitle>
                    </DialogHeader>
                    <SongForm onClose={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {songs.map((song) => (
                  <Card key={song.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={song.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"}
                          alt={song.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{song.title}</h3>
                          <p className="text-gray-400">{song.artist}</p>
                          <p className="text-sm text-gray-500">{song.plays || 0} plays</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Videos Management</h2>
                <Dialog open={isDialogOpen && activeTab === 'videos'} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                      <DialogTitle>Add New Video</DialogTitle>
                    </DialogHeader>
                    <VideoForm onClose={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {videos.map((video) => (
                  <Card key={video.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={video.thumbnail_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"}
                          alt={video.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{video.title}</h3>
                          <p className="text-gray-400">{video.channel || 'No channel'}</p>
                          <p className="text-sm text-gray-500">{video.views || '0'} views</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">News Management</h2>
                <Dialog open={isDialogOpen && activeTab === 'news'} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add News
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add News Article</DialogTitle>
                    </DialogHeader>
                    <NewsForm onClose={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {news.map((article) => (
                  <Card key={article.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={article.image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"}
                          alt={article.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{article.title}</h3>
                          <p className="text-gray-400">{article.author || 'Unknown author'}</p>
                          <p className="text-sm text-gray-500">{article.category || 'Uncategorized'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
