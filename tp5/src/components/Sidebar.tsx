import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import type { Project } from '../hooks/useProjects';
import { Trash2, Edit2 } from 'lucide-react';

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename: (project: Project) => void;
  onDelete: (id: string) => void;
  onAdd: (name: string, color: string) => void;
}

function Sidebar({ projects, isOpen, onRename, onDelete, onAdd }: SidebarProps) {
  console.log('Sidebar re-render'); // For profiling

  const handleAddProject = () => {
    const name = prompt('Nom du nouveau projet :');
    if (name) {
      // Default color if none provided
      onAdd(name, '#6366f1');
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>TaskFlow</h2>
      </div>
      
      <div className="sidebar-section">
        <div className="section-header">
          <h3>Projets</h3>
          <button className="btn-icon" onClick={handleAddProject} title="Ajouter un projet">
            +
          </button>
        </div>
        
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <NavLink 
                to={`/project/${project.id}`} 
                className={({ isActive }) => `project-link ${isActive ? 'active' : ''}`}
              >
                <span 
                  className="project-color" 
                  style={{ backgroundColor: project.color }}
                ></span>
                <span className="project-name">{project.name}</span>
              </NavLink>
              
              <div className="project-actions">
                <button className="btn-icon-small" onClick={() => onRename(project)}>
                  <Edit2 size={14} />
                </button>
                <button className="btn-icon-small danger" onClick={() => onDelete(project.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
