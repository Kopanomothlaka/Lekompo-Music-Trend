import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContentCardProps {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  imageUrl?: string;
  type: 'song' | 'video' | 'news';
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  subtitle,
  meta,
  imageUrl,
  type,
  onEdit,
  onDelete
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const tableName = type === 'song' ? 'songs' : type === 'video' ? 'videos' : 'news';
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`admin-${type}s`] });
      toast({ title: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!` });
    },
    onError: (error: any) => {
      toast({ 
        title: `Error deleting ${type}`, 
        description: error.message, 
        variant: "destructive" 
      });
    }
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      deleteMutation.mutate();
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
            <img
              src={imageUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"}
              alt={title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-gray-400">{subtitle}</p>
            <p className="text-sm text-gray-500">{meta}</p>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-400 hover:text-red-300"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
