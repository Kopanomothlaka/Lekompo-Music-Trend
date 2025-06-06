import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Music, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import SongForm from '@/components/admin/SongForm';
import VideoForm from '@/components/admin/VideoForm';
import NewsForm from '@/components/admin/NewsForm';
import ContentCard from '@/components/admin/ContentCard';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const Admin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('songs');
  const [editingItem, setEditingItem] = useState<any>(null);
  const { admin, logout } = useAdminAuth();

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

  const handleEdit = (id: string, type: string) => {
    let item;
    if (type === 'songs') {
      item = songs.find(s => s.id === id);
    } else if (type === 'videos') {
      item = videos.find(v => v.id === id);
    } else if (type === 'news') {
      item = news.find(n => n.id === id);
    }
    
    if (item) {
      setEditingItem({ ...item, type });
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const getDialogTitle = () => {
    if (editingItem) {
      return `Edit ${editingItem.type.slice(0, -1).charAt(0).toUpperCase() + editingItem.type.slice(1, -1)}`;
    }
    if (activeTab === 'songs') return 'Add New Song';
    if (activeTab === 'videos') return 'Add New Video';
    if (activeTab === 'news') return 'Add News Article';
    return 'Add New';
  };

  const renderForm = () => {
    if (editingItem) {
      if (editingItem.type === 'songs') {
        return <SongForm onClose={handleCloseDialog} editData={editingItem} />;
      } else if (editingItem.type === 'videos') {
        return <VideoForm onClose={handleCloseDialog} editData={editingItem} />;
      } else if (editingItem.type === 'news') {
        return <NewsForm onClose={handleCloseDialog} editData={editingItem} />;
      }
    }
    
    if (activeTab === 'songs') {
      return <SongForm onClose={handleCloseDialog} />;
    } else if (activeTab === 'videos') {
      return <VideoForm onClose={handleCloseDialog} />;
    } else if (activeTab === 'news') {
      return <NewsForm onClose={handleCloseDialog} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-gray-400">Manage your songs, videos, and news content</p>
              </div>
              {admin && (
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Logged in as: <span className="text-green-400 font-medium">{admin.username}</span></span>
                </div>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="songs" className="flex items-center gap-2 text-xs sm:text-sm">
                <Music className="h-4 w-4" />
                <span className="hidden sm:inline">Songs</span> ({songs.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2 text-xs sm:text-sm">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Videos</span> ({videos.length})
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2 text-xs sm:text-sm">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">News</span> ({news.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Songs Management</h2>
                <Dialog open={isDialogOpen && (activeTab === 'songs' || editingItem?.type === 'songs')} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Song
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white max-w-4xl max-h-[90vh] w-[95vw] sm:w-full">
                    <DialogHeader>
                      <DialogTitle>{getDialogTitle()}</DialogTitle>
                    </DialogHeader>
                    {renderForm()}
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {songs.map((song) => (
                  <ContentCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    subtitle={song.artist}
                    meta={`${song.plays || 0} plays`}
                    imageUrl={song.image_url}
                    type="song"
                    onEdit={(id) => handleEdit(id, 'songs')}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Videos Management</h2>
                <Dialog open={isDialogOpen && (activeTab === 'videos' || editingItem?.type === 'videos')} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white w-[95vw] sm:w-full">
                    <DialogHeader>
                      <DialogTitle>{getDialogTitle()}</DialogTitle>
                    </DialogHeader>
                    {renderForm()}
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {videos.map((video) => (
                  <ContentCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    subtitle={video.channel || 'No channel'}
                    meta={`${video.views || '0'} views`}
                    imageUrl={video.thumbnail_url}
                    type="video"
                    onEdit={(id) => handleEdit(id, 'videos')}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold">News Management</h2>
                <Dialog open={isDialogOpen && (activeTab === 'news' || editingItem?.type === 'news')} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Add News
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white max-w-2xl w-[95vw] sm:w-full">
                    <DialogHeader>
                      <DialogTitle>{getDialogTitle()}</DialogTitle>
                    </DialogHeader>
                    {renderForm()}
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid gap-4">
                {news.map((article) => (
                  <ContentCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    subtitle={article.author || 'Unknown author'}
                    meta={article.category || 'Uncategorized'}
                    imageUrl={article.image_url}
                    type="news"
                    onEdit={(id) => handleEdit(id, 'news')}
                  />
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
