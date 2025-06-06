
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, User, Clock } from "lucide-react";

interface NewsDetailProps {
  article: any;
  isOpen: boolean;
  onClose: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl w-[95vw]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl text-white font-bold">
            {article.title}
          </DialogTitle>
        </DialogHeader>
        
        {article.image_url && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-[300px] object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
          {article.category && (
            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full font-medium">
              {article.category}
            </span>
          )}
          
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{article.author || 'Unknown'}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(article.date || article.created_at).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{article.read_time || '5 min read'}</span>
          </div>
        </div>
        
        {article.excerpt && (
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-300 italic">
              {article.excerpt}
            </p>
          </div>
        )}
        
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }} />
          ) : (
            <p>No content available for this article.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetail;
