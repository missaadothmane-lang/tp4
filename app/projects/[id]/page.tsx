import { prisma } from '../../../lib/prisma'; 
import { notFound } from 'next/navigation'; 
  
// Pré-générer les pages au build 
export async function generateStaticParams() { 
  const projects = await prisma.project.findMany(); 
  return projects.map(p => ({ id: String(p.id) })); 
} 
  
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) { 
  const { id } = await params; 
  const project = await prisma.project.findUnique({ 
    where: { id: Number(id) } 
  }); 
  
  if (!project) notFound(); 
  
  return ( 
    <div>
      <a href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: '#64748b', fontWeight: 500 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        Retour au Dashboard
      </a>
      <div className="card"> 
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '2rem' }}> 
          <span className="color-dot" style={{ backgroundColor: project.color, width: '1.5rem', height: '1.5rem' }} /> 
          {project.name} 
        </h1> 
        <p style={{ color: '#64748b' }}>Créé le : {project.createdAt.toLocaleDateString('fr-FR')}</p> 
      </div> 
    </div> 
  ); 
}