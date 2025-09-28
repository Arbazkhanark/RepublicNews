// components/opinion-view-modal.tsx
'use client';

import { X, Calendar, User, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Opinion {
  _id: string;
  title: string;
  imageUrl?: string;
  content: string;
  topic: string;
  tags: string[];
  authorId: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}

interface OpinionViewModalProps {
  opinion: Opinion | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OpinionViewModal = ({ opinion, isOpen, onClose }: OpinionViewModalProps) => {
  if (!opinion) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const readTime = Math.ceil(opinion.content.split(' ').length / 200); // 200 words per minute

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Opinion Details</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge className={getStatusColor(opinion.status)}>
                {opinion.status}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 text-green-600" />
                  <span>{opinion.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4 text-red-600" />
                  <span>{opinion.dislikes}</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-foreground">{opinion.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{opinion.authorId.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(opinion.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Image */}
          {opinion.imageUrl && (
            <img
              src={opinion.imageUrl}
              alt={opinion.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          {/* Topic and Tags */}
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="secondary" className="text-base px-3 py-1">
              {opinion.topic}
            </Badge>
            <div className="flex flex-wrap gap-2">
              {opinion.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {opinion.content}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
              <div>
                <span>Last updated: {new Date(opinion.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>ID: {opinion._id}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};