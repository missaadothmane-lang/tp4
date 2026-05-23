import { prisma } from '../../lib/prisma'; 
import AddProjectForm from './AddProjectForm'; 
import { deleteProject } from '../actions/projects'; 
  
export default async function DashboardPage() { 
  const projects = await prisma.project.findMany({ 
    orderBy: { createdAt: 'desc' } 
  }); 
  
  return ( 
    <div> 
      <h1 className="page-title">Dashboard</h1> 
      <p className="page-description">Gérez vos {projects.length} projets en un seul endroit.</p> 
      <AddProjectForm /> 
      <div className="project-grid"> 
        {projects.map(p => ( 
          <div key={p.id} className="card project-card"> 
            <div className="project-card-header">
              <a href={`/projects/${p.id}`} className="project-title-wrapper"> 
                <span className="color-dot" style={{ backgroundColor: p.color }} /> 
                <span className="project-title">{p.name}</span> 
              </a> 
              <form action={deleteProject}> 
                <input type="hidden" name="id" value={p.id} /> 
                <button type="submit" className="btn-icon" title="Supprimer le projet">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button> 
              </form> 
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Créé le {p.createdAt.toLocaleDateString('fr-FR')}
            </div>
          </div> 
        ))} 
      </div> 
    </div> 
  ); 
}
