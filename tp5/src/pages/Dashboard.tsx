import { useState, useCallback } from 'react';
import useProjects, { type Project } from '../hooks/useProjects';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Header from '../components/Header';

export default function Dashboard() {
  const { projects, columns, loading, error, addProject, renameProject, deleteProject } = useProjects();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // useCallback is essential here to prevent Sidebar from re-rendering
  // when Dashboard re-renders (e.g. sidebarOpen state changes)
  const handleRename = useCallback((project: Project) => {
    renameProject(project);
  }, [renameProject]);

  const handleDelete = useCallback((id: string) => {
    deleteProject(id);
  }, [deleteProject]);

  const handleAdd = useCallback((name: string, color: string) => {
    addProject(name, color);
  }, [addProject]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <div className="loading-container"><div className="loader"></div><p>Chargement en cours...</p></div>;
  }

  if (error) {
    return <div className="error-container"><h2>Erreur</h2><p>{error}</p></div>;
  }

  // Inject a dangerous HTML specifically for Q1 & Q2 testing if needed
  // const dangerousName = '<img src=x onerror=alert("HACK")>';

  return (
    <div className="layout">
      <Sidebar 
        projects={projects} 
        isOpen={sidebarOpen} 
        onRename={handleRename}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      <div className={`content-wrapper ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
        <MainContent columns={columns} />
        
        {/* Testing Q1: JSX Escape Protection */}
        {/* <div className="xss-test">
          <h4>Test XSS:</h4>
          <p>{dangerousName}</p>
        </div> */}
      </div>
    </div>
  );
}
