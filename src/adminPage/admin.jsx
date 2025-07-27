import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Upload, MessageCircle, FolderOpen, Lock, User, LogOut } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

// Authentication utility
const auth = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  isAuthenticated: () => !!localStorage.getItem('token')
};

// API utility
const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },
  
  post: async (endpoint, data, isFormData = false) => {
    const headers = {
      'Authorization': `Bearer ${auth.getToken()}`
    };
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },
  
  put: async (endpoint, data, isFormData = false) => {
    const headers = {
      'Authorization': `Bearer ${auth.getToken()}`
    };
    
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      method: 'PUT',
      headers,
      body: isFormData ? data : JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },
  
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  }
};

// Login Component
const AdminLogin = ({ onLogin }) => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Login failed');
      }

      const { token } = await response.json();
      auth.setToken(token);
      onLogin(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center px-4">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-purple-500/30">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-orbitron mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-400">Enter the cosmic control center</p>
        </div>

        {/* Login Form */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Username</label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-12 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <span>🚀 Access Control Center</span>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Tegar Adityansyah Kurniawan - Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400/60 transition-all duration-300">
      <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
        {project.image ? (
          <img src={`${API_BASE_URL}${project.image}`} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl">🚀</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white truncate">{project.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            project.status === 'Deployed' ? 'bg-green-500/20 text-green-400' :
            project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-blue-500/20 text-blue-400'
          }`}>
            {project.status}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>

        {project.tech && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.split(',').filter(t => t.trim()).map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
          >
            <Edit2 size={14} />
            <span className="text-xs">Edit</span>
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="flex items-center justify-center px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Project Form Modal Component
const ProjectFormModal = ({ 
  show, 
  onClose, 
  editingProject, 
  projectForm, 
  setProjectForm, 
  techs, 
  onSubmit, 
  loading 
}) => {
  const handleTechToggle = (techName) => {
    setProjectForm(prev => ({
      ...prev,
      tech: prev.tech.includes(techName)
        ? prev.tech.filter(t => t !== techName)
        : [...prev.tech, techName]
    }));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white font-orbitron">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Project Title *</label>
              <input
                type="text"
                value={projectForm.title}
                onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Status</label>
              <select
                value={projectForm.status}
                onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:border-purple-400/60 focus:outline-none transition-colors"
              >
                <option value="In Development">In Development</option>
                <option value="Beta">Beta</option>
                <option value="Deployed">Deployed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Description *</label>
            <textarea
              value={projectForm.description}
              onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors resize-none"
              placeholder="Describe your project"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Website URL</label>
              <input
                type="url"
                value={projectForm.link_website}
                onChange={(e) => setProjectForm(prev => ({ ...prev, link_website: e.target.value }))}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">GitHub URL</label>
              <input
                type="url"
                value={projectForm.link_github}
                onChange={(e) => setProjectForm(prev => ({ ...prev, link_github: e.target.value }))}
                className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.files[0] }))}
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Technologies</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-4 bg-black/20 rounded-lg border border-purple-500/30">
              {techs.map(tech => (
                <label key={tech.id} className="flex items-center space-x-2 cursor-pointer hover:bg-purple-500/10 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={projectForm.tech.includes(tech.nama_tech)}
                    onChange={() => handleTechToggle(tech.nama_tech)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-white">{tech.nama_tech}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={20} />
              )}
              <span>{editingProject ? 'Update Project' : 'Create Project'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-500/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Message Card Component
const MessageCard = ({ message, onMarkRead }) => {
  return (
    <div
      className={`bg-black/40 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
        message.read
          ? 'border-gray-500/30 hover:border-gray-400/60'
          : 'border-purple-500/30 hover:border-purple-400/60 bg-purple-500/5'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${message.read ? 'bg-gray-500' : 'bg-purple-500 animate-pulse'}`}></div>
          <div>
            <h3 className="text-lg font-semibold text-white">{message.name}</h3>
            <p className="text-sm text-gray-400">{message.email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            {new Date(message.created_at).toLocaleDateString()} {new Date(message.created_at).toLocaleTimeString()}
          </p>
          {!message.read && (
            <button
              onClick={() => onMarkRead(message.id)}
              className="flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300 mt-1"
            >
              <Eye size={12} />
              <span>Mark as read</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-4">
        <p className="text-gray-300 leading-relaxed">{message.message}</p>
      </div>

      <div className="flex space-x-3 mt-4">
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors">
          Reply
        </button>
        <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

// Tech Form Modal Component
const TechFormModal = ({ show, onClose, editingTech, techForm, setTechForm, onSubmit, loading }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white font-orbitron">
            {editingTech ? 'Edit Technology' : 'Add New Technology'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Technology Name *</label>
            <input
              type="text"
              value={techForm.name}
              onChange={(e) => setTechForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400/60 focus:outline-none transition-colors"
              placeholder="Enter technology name"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={20} />
              )}
              <span>{editingTech ? 'Update Technology' : 'Add Technology'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-500/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: null,
    link_website: '',
    link_github: '',
    status: 'In Development',
    tech: []
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await api.get('/portfolio');
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechs = async () => {
    try {
      const data = await api.get('/tech');
      setTechs(data);
    } catch (err) {
      console.error('Failed to load technologies:', err);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      if (projectForm.image) formData.append('image', projectForm.image);
      formData.append('link_website', projectForm.link_website);
      formData.append('link_github', projectForm.link_github);
      formData.append('status', projectForm.status);

      projectForm.tech.forEach((tech) => {
        formData.append('tech[]', tech);
      });

      if (editingProject) {
        await api.put(`/portfolio/${editingProject.id}`, formData, true);
      } else {
        await api.post('/portfolio', formData, true);
      }

      setShowProjectForm(false);
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        image: null,
        link_website: '',
        link_github: '',
        status: 'In Development',
        tech: []
      });
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/portfolio/${id}`);
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      description: project.description || '',
      image: null,
      link_website: project.link_website || '',
      link_github: project.link_github || '',
      status: project.status || 'In Development',
      tech: Array.isArray(project.tech)
        ? project.tech
        : project.tech
          ? project.tech.split(',').filter(t => t.trim())
          : []
    });
    setShowProjectForm(true);
  };

  const handleCloseForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      image: null,
      link_website: '',
      link_github: '',
      status: 'In Development',
      tech: []
    });
  };

  useEffect(() => {
    fetchProjects();
    fetchTechs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white font-orbitron">Project Management</h2>
        <button
          onClick={() => setShowProjectForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      <ProjectFormModal
        show={showProjectForm}
        onClose={handleCloseForm}
        editingProject={editingProject}
        projectForm={projectForm}
        setProjectForm={setProjectForm}
        techs={techs}
        onSubmit={handleProjectSubmit}
        loading={loading}
      />
    </div>
  );
};

// Messages Tab Component
const MessagesTab = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const data = await api.get('/message');
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  const markMessageAsRead = (messageId) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white font-orbitron mb-6">Message Center</h2>

      <div className="space-y-4">
        {messages.map(message => (
          <MessageCard
            key={message.id}
            message={message}
            onMarkRead={markMessageAsRead}
          />
        ))}

        {messages.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Technologies Tab Component
const TechnologiesTab = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTechForm, setShowTechForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [techForm, setTechForm] = useState({ name: '' });

  const fetchTechs = async () => {
    try {
      const data = await api.get('/tech');
      setTechs(data);
    } catch (err) {
      console.error('Failed to load technologies:', err);
    }
  };

  const handleTechSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editingTech) {
        await api.put(`/tech/${editingTech.id}`, techForm);
      } else {
        await api.post('/tech', techForm);
      }

      setShowTechForm(false);
      setEditingTech(null);
      setTechForm({ name: '' });
      fetchTechs();
    } catch (err) {
      console.error('Failed to save technology:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTech = async (id) => {
    if (!confirm('Are you sure you want to delete this technology?')) return;

    try {
      await api.delete(`/tech/${id}`);
      fetchTechs();
    } catch (err) {
      console.error('Failed to delete technology:', err);
    }
  };

  const handleEditTech = (tech) => {
    setEditingTech(tech);
    setTechForm({ name: tech.nama_tech || '' });
    setShowTechForm(true);
  };

  const handleCloseForm = () => {
    setShowTechForm(false);
    setEditingTech(null);
    setTechForm({ name: '' });
  };

  useEffect(() => {
    fetchTechs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white font-orbitron">Technology Management</h2>
        <button
          onClick={() => setShowTechForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
        >
          <Plus size={20} />
          <span>Add Technology</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {techs.map(tech => (
          <div key={tech.id} className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 hover:border-purple-400/60 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">{tech.nama_tech}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTech(tech)}
                  className="p-1 text-blue-400 hover:bg-blue-600/20 rounded"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTech(tech.id)}
                  className="p-1 text-red-400 hover:bg-red-600/20 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TechFormModal
        show={showTechForm}
        onClose={handleCloseForm}
        editingTech={editingTech}
        techForm={techForm}
        setTechForm={setTechForm}
        onSubmit={handleTechSubmit}
        loading={loading}
      />
    </div>
  );
};

// Dashboard Header Component
const DashboardHeader = ({ onLogout }) => {
  return (
    <div className="bg-black/50 backdrop-blur-sm border-b border-purple-500/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-orbitron">
          🚀 Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            Welcome back, Administrator
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab, unreadCount }) => {
  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'technologies', label: 'Technologies', icon: Upload }
  ];

  return (
    <div className="flex space-x-1 mb-8 bg-black/30 backdrop-blur-sm rounded-lg p-1">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-purple-500/20'
            }`}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
            {tab.id === 'messages' && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Notification Component
const Notification = ({ type, message, show }) => {
  if (!show) return null;

  const bgColor = type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-300' : 'bg-green-500/20 border-green-500/30 text-green-300';

  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <div className={`border rounded-lg p-4 ${bgColor}`}>
        {message}
      </div>
    </div>
  );
};

// Main Dashboard Component
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch messages untuk mendapatkan unread count
  const fetchMessages = async () => {
    try {
      const data = await api.get('/message');
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Auto-hide notifications
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
      <DashboardHeader onLogout={onLogout} />

      <Notification type="error" message={error} show={!!error} />
      <Notification type="success" message={success} show={!!success} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          unreadCount={unreadCount}
        />

        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'technologies' && <TechnologiesTab />}
      </div>
    </div>
  );
};

// Main App Component with Auth Check
const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated via token
    const checkAuth = async () => {
      const token = auth.getToken();
      if (token) {
        try {
          // Verify token with a test API call
          await api.get('/message');
          setIsAuthenticated(true);
        } catch (err) {
          // Token is invalid, remove it
          auth.removeToken();
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    auth.removeToken();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminApp;