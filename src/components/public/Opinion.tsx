
// 'use client';

// import { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Eye, Users, Tag, FileText, CheckCircle, XCircle, Clock, X, Save, Loader2, Calendar, User, ThumbsUp, ThumbsDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

// interface Author {
//   _id: string;
//   name: string;
//   email: string;
//   profileImage?: string;
//   socialLinks: {
//     twitter?: string;
//     facebook?: string;
//     instagram?: string;
//     linkedin?: string;
//   };
// }

// interface Opinion {
//   _id: string;
//   title: string;
//   imageUrl?: string;
//   content: string;
//   topic: string;
//   tags: string[];
//   authorId: Author | string;
//   status: 'pending' | 'approved' | 'rejected' | 'draft';
//   likes: number;
//   dislikes: number;
//   likedBy: string[];
//   dislikedBy: string[];
//   createdAt: string;
//   updatedAt: string;
//   excerpt?: string;
//   readTime?: number;
// }

// interface ApiResponse {
//   message: string;
//   article?: Opinion;
//   opinion?: Opinion;
//   opinions?: Opinion[];
// }

// const OpinionPage = () => {
//   const router = useRouter();
//   const [opinions, setOpinions] = useState<Opinion[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'draft'>('all');
//   const [authors, setAuthors] = useState<Author[]>([]);
  
//   // Modal states
//   const [createModalOpen, setCreateModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
//   const [formLoading, setFormLoading] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     title: '',
//     imageUrl: '',
//     content: '',
//     topic: '',
//     tags: [] as string[],
//   });
//   const [newTag, setNewTag] = useState('');

//   // Fetch opinions on component mount
//   useEffect(() => {
//     fetchOpinions();
//     fetchAuthors();
//   }, []);

//   const fetchOpinions = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('admin-token');
//       const response = await fetch('/api/public/opinion', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch opinions');
//       }

//       const data: ApiResponse = await response.json();
//       setOpinions(data.opinions || []);
//     } catch (error) {
//       console.error('Error fetching opinions:', error);
//       toast.error('Failed to load opinions');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAuthors = async () => {
//     try {
//       const token = localStorage.getItem('admin-token');
//       const response = await fetch('/api/admin/authors', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAuthors(data.authors || []);
//       }
//     } catch (error) {
//       console.error('Error fetching authors:', error);
//     }
//   };

//   // Modal handlers - FIXED
//   const handleCreateOpen = () => {
//     console.log('Create modal opening...'); // Debug log
//     setFormData({
//       title: '',
//       imageUrl: '',
//       content: '',
//       topic: '',
//       tags: [],
//     });
//     setCreateModalOpen(true);
//   };

//   const handleEditOpen = (opinion: Opinion) => {
//     setSelectedOpinion(opinion);
//     setFormData({
//       title: opinion.title,
//       imageUrl: opinion.imageUrl || '',
//       content: opinion.content,
//       topic: opinion.topic,
//       tags: opinion.tags || [],
//     });
//     setEditModalOpen(true);
//     setCreateModalOpen(false); // Ensure create modal is closed
//   };

//   const handleViewOpen = (opinion: Opinion) => {
//     setSelectedOpinion(opinion);
//     setViewModalOpen(true);
//   };

//   const handleCloseModals = () => {
//     console.log('Closing modals...'); // Debug log
//     setCreateModalOpen(false);
//     setEditModalOpen(false);
//     setViewModalOpen(false);
//     setSelectedOpinion(null);
//     setFormData({
//       title: '',
//       imageUrl: '',
//       content: '',
//       topic: '',
//       tags: [],
//     });
//   };

//   // Form handlers
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       setFormLoading(true);
//       const token = localStorage.getItem('admin-token');
      
//       if (!token) {
//         toast.error('Authentication token not found');
//         return;
//       }

//       const url = editModalOpen 
//         ? `/api/public/opinion/${selectedOpinion?._id}/edit`
//         : '/api/public/opinion';
      
//       const method = editModalOpen ? 'PATCH' : 'POST';

//       console.log('Submitting form:', { url, method, formData }); // Debug log

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP ${response.status}: ${errorText}`);
//       }

//       const data: ApiResponse = await response.json();
      
//       if (editModalOpen) {
//         setOpinions(prev => prev.map(opinion => 
//           opinion._id === selectedOpinion?._id ? data.opinion! : opinion
//         ));
//         toast.success('Opinion updated successfully');
//       } else {
//         setOpinions(prev => [data.article!, ...prev]);
//         toast.success('Opinion created successfully');
//       }

//       handleCloseModals();
//     } catch (error) {
//       console.error(`Error ${editModalOpen ? 'updating' : 'creating'} opinion:`, error);
//       toast.error(`Failed to ${editModalOpen ? 'update' : 'create'} opinion`);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleAddTag = () => {
//     if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
//       setFormData(prev => ({
//         ...prev,
//         tags: [...prev.tags, newTag.trim()]
//       }));
//       setNewTag('');
//     }
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   const filteredOpinions = opinions.filter(opinion => 
//     filter === 'all' ? true : opinion.status === filter
//   );

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'approved': return 'bg-green-100 text-green-800 border-green-200';
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
//       case 'draft': return 'bg-blue-100 text-blue-800 border-blue-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'approved': return <CheckCircle className="w-4 h-4" />;
//       case 'pending': return <Clock className="w-4 h-4" />;
//       case 'rejected': return <XCircle className="w-4 h-4" />;
//       case 'draft': return <Edit className="w-4 h-4" />;
//       default: return <FileText className="w-4 h-4" />;
//     }
//   };

//   const handleStatusUpdate = async (opinionId: string, newStatus: 'approved' | 'rejected' | 'pending') => {
//     try {
//       const token = localStorage.getItem('admin-token');
//       const response = await fetch(`/api/public/opinion/${opinionId}/status`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update status');
//       }

//       const data: ApiResponse = await response.json();
      
//       setOpinions(prev => prev.map(opinion => 
//         opinion._id === opinionId ? data.opinion! : opinion
//       ));

//       toast.success(`Opinion ${newStatus} successfully`);
//     } catch (error) {
//       console.error('Error updating status:', error);
//       toast.error('Failed to update status');
//     }
//   };

//   const handleDelete = async (opinionId: string) => {
//     if (!confirm('Are you sure you want to delete this opinion?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('admin-token');
//       const response = await fetch(`/api/public/opinion/${opinionId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete opinion');
//       }

//       setOpinions(prev => prev.filter(opinion => opinion._id !== opinionId));
//       toast.success('Opinion deleted successfully');
//     } catch (error) {
//       console.error('Error deleting opinion:', error);
//       toast.error('Failed to delete opinion');
//     }
//   };

//   const getAuthorName = (authorId: Author | string): string => {
//     if (typeof authorId === 'string') {
//       const author = authors.find(a => a._id === authorId);
//       return author?.name || 'Unknown Author';
//     }
//     return authorId.name;
//   };

//   const stats = {
//     total: opinions.length,
//     approved: opinions.filter(o => o.status === 'approved').length,
//     pending: opinions.filter(o => o.status === 'pending').length,
//     rejected: opinions.filter(o => o.status === 'rejected').length,
//     drafts: opinions.filter(o => o.status === 'draft').length,
//     authors: authors.length
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading opinions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Opinion Dashboard</h1>
//             <p className="text-muted-foreground mt-2">Manage your opinion articles and authors</p>
//           </div>
//           <Button 
//             onClick={handleCreateOpen}
//             className="bg-brand-primary hover:bg-brand-dark transition-smooth"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             New Article
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
//           <Card className="border-border shadow-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
//               <FileText className="h-4 w-4 text-brand-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{stats.total}</div>
//             </CardContent>
//           </Card>
          
//           <Card className="border-border shadow-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
//               <CheckCircle className="h-4 w-4 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{stats.approved}</div>
//             </CardContent>
//           </Card>

//           <Card className="border-border shadow-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
//               <Clock className="h-4 w-4 text-yellow-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
//             </CardContent>
//           </Card>

//           <Card className="border-border shadow-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
//               <XCircle className="h-4 w-4 text-red-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{stats.rejected}</div>
//             </CardContent>
//           </Card>

//           <Card className="border-border shadow-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
//               <Edit className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{stats.drafts}</div>
//             </CardContent>
//           </Card>

//           <Card className="border-border shadow-elegant">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Authors</CardTitle>
//               <Users className="h-4 w-4 text-brand-primary" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-foreground">{stats.authors}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {(['all', 'approved', 'pending', 'rejected', 'draft'] as const).map((status) => (
//             <Button
//               key={status}
//               variant={filter === status ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setFilter(status)}
//               className="capitalize transition-smooth"
//             >
//               {status}
//             </Button>
//           ))}
//         </div>

//         {/* Articles List */}
//         <div className="space-y-4">
//           {filteredOpinions.length === 0 ? (
//             <Card className="border-border shadow-elegant">
//               <CardContent className="p-8 text-center">
//                 <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-foreground mb-2">No opinions found</h3>
//                 <p className="text-muted-foreground">
//                   {filter === 'all' 
//                     ? "No opinions have been created yet." 
//                     : `No ${filter} opinions found.`}
//                 </p>
//                 <Button 
//                   onClick={handleCreateOpen}
//                   className="mt-4 bg-brand-primary hover:bg-brand-dark"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   Create First Opinion
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             filteredOpinions.map((opinion) => (
//               <Card key={opinion._id} className="border-border shadow-elegant hover:shadow-brand transition-smooth">
//                 <CardContent className="p-6">
//                   <div className="flex flex-col lg:flex-row gap-4">
//                     {opinion.imageUrl && (
//                       <img 
//                         src={opinion.imageUrl} 
//                         alt={opinion.title}
//                         className="w-full lg:w-48 h-32 object-cover rounded-md"
//                       />
//                     )}
                    
//                     <div className="flex-1 space-y-3">
//                       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
//                         <h3 className="text-xl font-semibold text-foreground line-clamp-2">
//                           {opinion.title}
//                         </h3>
//                         <div className="flex items-center gap-2">
//                           <Badge className={getStatusColor(opinion.status)}>
//                             <span className="flex items-center gap-1">
//                               {getStatusIcon(opinion.status)}
//                               {opinion.status}
//                             </span>
//                           </Badge>
//                         </div>
//                       </div>
                      
//                       <p className="text-muted-foreground line-clamp-2">
//                         {opinion.content.substring(0, 150)}...
//                       </p>
                      
//                       <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
//                         <span>By {getAuthorName(opinion.authorId)}</span>
//                         <span>•</span>
//                         <span>{new Date(opinion.createdAt).toLocaleDateString()}</span>
//                         <span>•</span>
//                         <span className="text-brand-primary">{opinion.topic}</span>
//                         <span>•</span>
//                         <div className="flex items-center gap-2">
//                           <span className="text-green-600">{opinion.likes} likes</span>
//                           <span className="text-red-600">{opinion.dislikes} dislikes</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-wrap gap-2">
//                         {opinion.tags.map((tag) => (
//                           <Badge key={tag} variant="outline" className="text-xs">
//                             <Tag className="w-3 h-3 mr-1" />
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>
                      
//                       <div className="flex flex-wrap gap-2 pt-2">
//                         {/* Status Management Buttons */}
//                         {opinion.status === 'pending' && (
//                           <>
//                             <Button 
//                               variant="outline" 
//                               size="sm"
//                               onClick={() => handleStatusUpdate(opinion._id, 'approved')}
//                               className="text-green-600 border-green-200 hover:bg-green-50 transition-smooth"
//                             >
//                               <CheckCircle className="w-4 h-4 mr-1" />
//                               Approve
//                             </Button>
//                             <Button 
//                               variant="outline" 
//                               size="sm"
//                               onClick={() => handleStatusUpdate(opinion._id, 'rejected')}
//                               className="text-red-600 border-red-200 hover:bg-red-50 transition-smooth"
//                             >
//                               <XCircle className="w-4 h-4 mr-1" />
//                               Reject
//                             </Button>
//                           </>
//                         )}
                        
//                         {opinion.status === 'approved' && (
//                           <Button 
//                             variant="outline" 
//                             size="sm"
//                             onClick={() => handleStatusUpdate(opinion._id, 'pending')}
//                             className="text-yellow-600 border-yellow-200 hover:bg-yellow-50 transition-smooth"
//                           >
//                             <Clock className="w-4 h-4 mr-1" />
//                             Set Pending
//                           </Button>
//                         )}
                        
//                         {opinion.status === 'rejected' && (
//                           <Button 
//                             variant="outline" 
//                             size="sm"
//                             onClick={() => handleStatusUpdate(opinion._id, 'pending')}
//                             className="text-yellow-600 border-yellow-200 hover:bg-yellow-50 transition-smooth"
//                           >
//                             <Clock className="w-4 h-4 mr-1" />
//                             Set Pending
//                           </Button>
//                         )}

//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => handleEditOpen(opinion)}
//                           className="transition-smooth"
//                         >
//                           <Edit className="w-4 h-4 mr-1" />
//                           Edit
//                         </Button>
                        
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => handleViewOpen(opinion)}
//                           className="transition-smooth"
//                         >
//                           <Eye className="w-4 h-4 mr-1" />
//                           View
//                         </Button>
                        
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => handleDelete(opinion._id)}
//                           className="text-destructive hover:text-destructive-foreground hover:bg-destructive transition-smooth"
//                         >
//                           <Trash2 className="w-4 h-4 mr-1" />
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Create Modal - SEPARATE MODAL FOR CREATE */}
//       <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center justify-between">
//               <span>Create New Opinion</span>
//               <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
//                 <X className="w-4 h-4" />
//               </Button>
//             </DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="create-title">Title *</Label>
//                   <Input
//                     id="create-title"
//                     value={formData.title}
//                     onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                     placeholder="Enter opinion title"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="create-imageUrl">Image URL</Label>
//                   <Input
//                     id="create-imageUrl"
//                     value={formData.imageUrl}
//                     onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="create-topic">Topic *</Label>
//                   <Input
//                     id="create-topic"
//                     value={formData.topic}
//                     onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
//                     placeholder="e.g., Environment, Technology"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="create-tags">Tags</Label>
//                   <div className="flex gap-2">
//                     <Input
//                       value={newTag}
//                       onChange={(e) => setNewTag(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="Add a tag"
//                     />
//                     <Button type="button" onClick={handleAddTag} variant="outline">
//                       Add
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {formData.tags.map((tag) => (
//                       <Badge key={tag} variant="secondary" className="flex items-center gap-1">
//                         {tag}
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveTag(tag)}
//                           className="hover:text-destructive"
//                         >
//                           ×
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="create-content">Content *</Label>
//                   <Textarea
//                     id="create-content"
//                     value={formData.content}
//                     onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
//                     placeholder="Write your opinion content here..."
//                     rows={12}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4 border-t">
//               <Button type="submit" disabled={formLoading} className="flex items-center gap-2">
//                 {formLoading ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Save className="w-4 h-4" />
//                 )}
//                 {formLoading ? 'Creating...' : 'Create Opinion'}
//               </Button>
              
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setCreateModalOpen(false)}
//                 disabled={formLoading}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Modal - SEPARATE MODAL FOR EDIT */}
//       <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center justify-between">
//               <span>Edit Opinion</span>
//               <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
//                 <X className="w-4 h-4" />
//               </Button>
//             </DialogTitle>
//           </DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-title">Title *</Label>
//                   <Input
//                     id="edit-title"
//                     value={formData.title}
//                     onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                     placeholder="Enter opinion title"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="edit-imageUrl">Image URL</Label>
//                   <Input
//                     id="edit-imageUrl"
//                     value={formData.imageUrl}
//                     onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="edit-topic">Topic *</Label>
//                   <Input
//                     id="edit-topic"
//                     value={formData.topic}
//                     onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
//                     placeholder="e.g., Environment, Technology"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="edit-tags">Tags</Label>
//                   <div className="flex gap-2">
//                     <Input
//                       value={newTag}
//                       onChange={(e) => setNewTag(e.target.value)}
//                       onKeyPress={handleKeyPress}
//                       placeholder="Add a tag"
//                     />
//                     <Button type="button" onClick={handleAddTag} variant="outline">
//                       Add
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {formData.tags.map((tag) => (
//                       <Badge key={tag} variant="secondary" className="flex items-center gap-1">
//                         {tag}
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveTag(tag)}
//                           className="hover:text-destructive"
//                         >
//                           ×
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-content">Content *</Label>
//                   <Textarea
//                     id="edit-content"
//                     value={formData.content}
//                     onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
//                     placeholder="Write your opinion content here..."
//                     rows={12}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4 border-t">
//               <Button type="submit" disabled={formLoading} className="flex items-center gap-2">
//                 {formLoading ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <Save className="w-4 h-4" />
//                 )}
//                 {formLoading ? 'Updating...' : 'Update Opinion'}
//               </Button>
              
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setEditModalOpen(false)}
//                 disabled={formLoading}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* View Modal */}
//       <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center justify-between">
//               <span>Opinion Details</span>
//               <Button variant="ghost" size="sm" onClick={() => setViewModalOpen(false)}>
//                 <X className="w-4 h-4" />
//               </Button>
//             </DialogTitle>
//           </DialogHeader>

//           {selectedOpinion && (
//             <div className="space-y-6">
//               {/* ... (view modal content remains same) */}
//               <div className="space-y-4">
//                 <div className="flex flex-wrap items-center justify-between gap-2">
//                   <Badge className={getStatusColor(selectedOpinion.status)}>
//                     {selectedOpinion.status}
//                   </Badge>
//                   <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <ThumbsUp className="w-4 h-4 text-green-600" />
//                       <span>{selectedOpinion.likes}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <ThumbsDown className="w-4 h-4 text-red-600" />
//                       <span>{selectedOpinion.dislikes}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <h1 className="text-3xl font-bold text-foreground">{selectedOpinion.title}</h1>

//                 <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
//                   <div className="flex items-center gap-1">
//                     <User className="w-4 h-4" />
//                     <span>{getAuthorName(selectedOpinion.authorId)}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(selectedOpinion.createdAt).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>

//               {selectedOpinion.imageUrl && (
//                 <img
//                   src={selectedOpinion.imageUrl}
//                   alt={selectedOpinion.title}
//                   className="w-full h-64 object-cover rounded-lg"
//                 />
//               )}

//               <div className="flex flex-wrap items-center gap-4">
//                 <Badge variant="secondary" className="text-base px-3 py-1">
//                   {selectedOpinion.topic}
//                 </Badge>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedOpinion.tags.map((tag) => (
//                     <Badge key={tag} variant="outline">
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div className="prose max-w-none">
//                 <div className="whitespace-pre-wrap text-foreground leading-relaxed">
//                   {selectedOpinion.content}
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
//                   <div>
//                     <span>Last updated: {new Date(selectedOpinion.updatedAt).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span>ID: {selectedOpinion._id}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default OpinionPage;




















// app/opinions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Heart, MessageCircle, Share, Clock, User, Search, Filter, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

interface Author {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface Opinion {
  _id: string;
  title: string;
  imageUrl?: string;
  content: string;
  topic: string;
  tags: string[];
  authorId: Author;
  status: 'approved';
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  readTime?: number;
}

export default function OpinionsPage() {
  const router = useRouter();
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [userInteractions, setUserInteractions] = useState<{
    [opinionId: string]: 'liked' | 'disliked' | null;
  }>({});

  // Fetch opinions on component mount
  useEffect(() => {
    fetchOpinions();
    // Load user interactions from localStorage
    const savedInteractions = localStorage.getItem('user-opinion-interactions');
    if (savedInteractions) {
      setUserInteractions(JSON.parse(savedInteractions));
    }
  }, []);

  const fetchOpinions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/public/opinion');

      if (!response.ok) {
        throw new Error('Failed to fetch opinions');
      }

      const data = await response.json();
      // Only show approved opinions to users
      const approvedOpinions = data.opinions?.filter((opinion: Opinion) => 
        opinion.status === 'approved'
      ) || [];
      setOpinions(approvedOpinions);
    } catch (error) {
      console.error('Error fetching opinions:', error);
      toast.error('Failed to load opinions');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (opinionId: string) => {
    try {
      const userId = localStorage.getItem('user-id') || 'anonymous';
      const currentInteraction = userInteractions[opinionId];
      
      // Optimistic update
      setOpinions(prev => prev.map(opinion => {
        if (opinion._id === opinionionId) {
          let newLikes = opinion.likes;
          let newDislikes = opinion.dislikes;
          let newLikedBy = [...opinion.likedBy];
          let newDislikedBy = [...opinion.dislikedBy];

          if (currentInteraction === 'liked') {
            // Remove like
            newLikes = Math.max(0, opinion.likes - 1);
            newLikedBy = newLikedBy.filter(id => id !== userId);
          } else if (currentInteraction === 'disliked') {
            // Switch from dislike to like
            newDislikes = Math.max(0, opinion.dislikes - 1);
            newLikes = opinion.likes + 1;
            newDislikedBy = newDislikedBy.filter(id => id !== userId);
            newLikedBy.push(userId);
          } else {
            // Add new like
            newLikes = opinion.likes + 1;
            newLikedBy.push(userId);
          }

          return {
            ...opinion,
            likes: newLikes,
            dislikes: newDislikes,
            likedBy: newLikedBy,
            dislikedBy: newDislikedBy
          };
        }
        return opinion;
      }));

      // Update user interactions
      const newInteraction = currentInteraction === 'liked' ? null : 'liked';
      const newUserInteractions = {
        ...userInteractions,
        [opinionId]: newInteraction
      };
      setUserInteractions(newUserInteractions);
      localStorage.setItem('user-opinion-interactions', JSON.stringify(newUserInteractions));

      // API call
      const response = await fetch(`/api/public/opinion/${opinionId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId,
          action: currentInteraction === 'liked' ? 'remove' : 'add'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

    } catch (error) {
      console.error('Error liking opinion:', error);
      toast.error('Failed to update reaction');
      // Revert optimistic update
      fetchOpinions();
    }
  };

  const handleDislike = async (opinionId: string) => {
    try {
      const userId = localStorage.getItem('user-id') || 'anonymous';
      const currentInteraction = userInteractions[opinionId];
      
      // Optimistic update
      setOpinions(prev => prev.map(opinion => {
        if (opinion._id === opinionionId) {
          let newLikes = opinion.likes;
          let newDislikes = opinion.dislikes;
          let newLikedBy = [...opinion.likedBy];
          let newDislikedBy = [...opinion.dislikedBy];

          if (currentInteraction === 'disliked') {
            // Remove dislike
            newDislikes = Math.max(0, opinion.dislikes - 1);
            newDislikedBy = newDislikedBy.filter(id => id !== userId);
          } else if (currentInteraction === 'liked') {
            // Switch from like to dislike
            newLikes = Math.max(0, opinion.likes - 1);
            newDislikes = opinion.dislikes + 1;
            newLikedBy = newLikedBy.filter(id => id !== userId);
            newDislikedBy.push(userId);
          } else {
            // Add new dislike
            newDislikes = opinion.dislikes + 1;
            newDislikedBy.push(userId);
          }

          return {
            ...opinion,
            likes: newLikes,
            dislikes: newDislikes,
            likedBy: newLikedBy,
            dislikedBy: newDislikedBy
          };
        }
        return opinion;
      }));

      // Update user interactions
      const newInteraction = currentInteraction === 'disliked' ? null : 'disliked';
      const newUserInteractions = {
        ...userInteractions,
        [opinionId]: newInteraction
      };
      setUserInteractions(newUserInteractions);
      localStorage.setItem('user-opinion-interactions', JSON.stringify(newUserInteractions));

      // API call
      const response = await fetch(`/api/public/opinion/${opinionId}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId,
          action: currentInteraction === 'disliked' ? 'remove' : 'add'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update dislike');
      }

    } catch (error) {
      console.error('Error disliking opinion:', error);
      toast.error('Failed to update reaction');
      // Revert optimistic update
      fetchOpinions();
    }
  };

  // Get unique topics for filter
  const topics = ['all', ...new Set(opinions.map(opinion => opinion.topic))];

  // Filter opinions based on search and topic
  const filteredOpinions = opinions.filter(opinion => {
    const matchesSearch = opinion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opinion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opinion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTopic = selectedTopic === 'all' || opinion.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading opinions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Public Opinions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read, share, and engage with diverse perspectives on various topics
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search opinions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic === 'all' ? 'All Topics' : topic}
                </option>
              ))}
            </select>
            <Button asChild>
              <Link href="/opinion/new">
                <Plus className="w-4 h-4 mr-2" />
                Write Opinion
              </Link>
            </Button>
          </div>
        </div>

        {/* Opinions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpinions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground mb-4">
                No opinions found. Be the first to share your thoughts!
              </div>
              <Button asChild>
                <Link href="/opinion/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Write First Opinion
                </Link>
              </Button>
            </div>
          ) : (
            filteredOpinions.map((opinion) => (
              <Card key={opinion._id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-0">
                  {/* Image */}
                  {opinion.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={opinion.imageUrl}
                        alt={opinion.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          {opinion.topic}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <User className="w-4 h-4" />
                      <span>{opinion.authorId.name}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{getReadTime(opinion.content)} min read</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/opinion/${opinion._id}`}>
                        {opinion.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {opinion.content.substring(0, 150)}...
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {opinion.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {opinion.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{opinion.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(opinion._id);
                          }}
                          className={`flex items-center gap-1 text-sm ${
                            userInteractions[opinion._id] === 'liked' 
                              ? 'text-green-600' 
                              : 'text-muted-foreground hover:text-green-600'
                          } transition-colors`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{opinion.likes}</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDislike(opinion._id);
                          }}
                          className={`flex items-center gap-1 text-sm ${
                            userInteractions[opinion._id] === 'disliked' 
                              ? 'text-red-600' 
                              : 'text-muted-foreground hover:text-red-600'
                          } transition-colors`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{opinion.dislikes}</span>
                        </button>

                        <Link 
                          href={`/opinion/${opinion._id}#comments`}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{opinion.commentCount || 0}</span>
                        </Link>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/opinion/${opinion._id}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}