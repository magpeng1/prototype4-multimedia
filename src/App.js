import React, { useState, useRef } from 'react';
import { Plus, Image, Link, FileText, X, ExternalLink, Download } from 'lucide-react';

function App() {
  const [journalText, setJournalText] = useState('');
  const [mediaItems, setMediaItems] = useState([]);
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Mock function to extract link preview data
  const extractLinkPreview = async (url) => {
    // In a real app, this would fetch the actual page data
    const domain = new URL(url).hostname;
    return {
      title: `Preview for ${domain}`,
      favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      url: url
    };
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem = {
            id: Date.now() + Math.random(),
            type: 'image',
            name: file.name,
            url: e.target.result,
            size: file.size
          };
          setMediaItems(prev => [...prev, newItem]);
          
          // Store in localStorage
          const stored = JSON.parse(localStorage.getItem('journl-media') || '[]');
          stored.push(newItem);
          localStorage.setItem('journl-media', JSON.stringify(stored));
        };
        reader.readAsDataURL(file);
      }
    });
    setShowMediaOptions(false);
  };

  const handleDocumentUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/msword') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem = {
            id: Date.now() + Math.random(),
            type: 'document',
            name: file.name,
            url: e.target.result,
            size: file.size,
            fileType: file.type
          };
          setMediaItems(prev => [...prev, newItem]);
          
          // Store in localStorage
          const stored = JSON.parse(localStorage.getItem('journl-media') || '[]');
          stored.push(newItem);
          localStorage.setItem('journl-media', JSON.stringify(stored));
        };
        reader.readAsDataURL(file);
      }
    });
    setShowMediaOptions(false);
  };

  const handleLinkAdd = async () => {
    if (linkUrl.trim()) {
      try {
        const preview = await extractLinkPreview(linkUrl);
        const newItem = {
          id: Date.now(),
          type: 'link',
          ...preview
        };
        setMediaItems(prev => [...prev, newItem]);
        
        // Store in localStorage
        const stored = JSON.parse(localStorage.getItem('journl-media') || '[]');
        stored.push(newItem);
        localStorage.setItem('journl-media', JSON.stringify(stored));
        
        setLinkUrl('');
        setShowLinkInput(false);
        setShowMediaOptions(false);
      } catch (error) {
        console.error('Error adding link:', error);
      }
    }
  };

  const removeMediaItem = (id) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    
    // Update localStorage
    const stored = JSON.parse(localStorage.getItem('journl-media') || '[]');
    const updated = stored.filter(item => item.id !== id);
    localStorage.setItem('journl-media', JSON.stringify(updated));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return '📄';
    if (fileType?.includes('word')) return '📝';
    return '📄';
  };

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: '#fefdf8'}}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{color: '#5f7a5f'}}>Journl</h1>
          <p className="text-gray-600">Capture your thoughts and memories</p>
        </div>

        {/* Main Journal Entry */}
        <div className="bg-white rounded-2xl p-6 mb-6" style={{boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'}}>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full h-40 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent text-gray-700 placeholder-gray-400"
            style={{'--tw-ring-color': '#a3b5a3'}}
          />
          
          {/* Media Items */}
          {mediaItems.length > 0 && (
            <div className="mt-6 space-y-3">
              {mediaItems.map((item) => (
                <div key={item.id} className="media-card relative group">
                  <button
                    onClick={() => removeMediaItem(item.id)}
                    className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-200"
                  >
                    <X size={16} />
                  </button>
                  
                  {item.type === 'image' && (
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.url} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                      </div>
                    </div>
                  )}
                  
                  {item.type === 'link' && (
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{backgroundColor: '#fdf9f0'}}>
                        {item.favicon ? (
                          <img src={item.favicon} alt="" className="w-8 h-8" />
                        ) : (
                          <ExternalLink size={24} className="text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 truncate">{item.url}</p>
                      </div>
                    </div>
                  )}
                  
                  {item.type === 'document' && (
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl" style={{backgroundColor: '#fdf9f0'}}>
                        {getFileIcon(item.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                      </div>
                      <Download size={16} className="text-gray-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Add Media Button */}
          <div className="mt-6 relative">
            <button
              onClick={() => setShowMediaOptions(!showMediaOptions)}
              className="flex items-center space-x-2 btn-secondary w-full sm:w-auto"
            >
              <Plus size={20} />
              <span>Add media</span>
            </button>
            
            {/* Media Options Dropdown */}
            {showMediaOptions && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl border border-gray-200 p-2 z-10 w-48" style={{boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'}}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <Image size={20} className="text-gray-500" />
                  <span className="text-gray-700">Add Image</span>
                </button>
                
                <button
                  onClick={() => setShowLinkInput(true)}
                  className="flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <Link size={20} className="text-gray-500" />
                  <span className="text-gray-700">Add Link</span>
                </button>
                
                <button
                  onClick={() => documentInputRef.current?.click()}
                  className="flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <FileText size={20} className="text-gray-500" />
                  <span className="text-gray-700">Add Document</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Link Input Modal */}
          {showLinkInput && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Link</h3>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent mb-4"
                  style={{'--tw-ring-color': '#a3b5a3'}}
                  autoFocus
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleLinkAdd}
                    className="btn-primary flex-1"
                  >
                    Add Link
                  </button>
                  <button
                    onClick={() => {
                      setShowLinkInput(false);
                      setLinkUrl('');
                      setShowMediaOptions(false);
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <input
            ref={documentInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleDocumentUpload}
            className="hidden"
          />
        </div>
        
        {/* Save Button */}
        <div className="text-center">
          <button className="btn-primary px-8 py-3 text-lg">
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
