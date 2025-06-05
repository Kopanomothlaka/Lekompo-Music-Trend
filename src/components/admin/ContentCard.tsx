
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContentCardProps {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  imageUrl?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  subtitle,
  meta,
  imageUrl,
  onEdit,
  onDelete
}) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"}
            alt={title}
            className="w-16 h-16 rounded object-cover"
          />
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
            {onDelete && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-400 hover:text-red-300"
                onClick={() => onDelete(id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
