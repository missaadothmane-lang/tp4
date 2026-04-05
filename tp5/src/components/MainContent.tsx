import { memo } from 'react';
import type { Column } from '../hooks/useProjects';

interface MainContentProps {
  columns: Column[];
}

function MainContent({ columns }: MainContentProps) {
  console.log('MainContent re-render'); // For profiling

  return (
    <main className="main-content">
      <div className="board-header">
        <h1>Tableau de bord</h1>
        <p className="subtitle">Bienvenue sur votre espace de travail</p>
      </div>

      <div className="board-columns">
        {columns.map((col) => (
          <div key={col.id} className="column">
            <h3 className="column-title">{col.title}</h3>
            <div className="task-list">
              {col.tasks.length === 0 ? (
                <div className="empty-task">Aucune tâche</div>
              ) : (
                col.tasks.map((task, idx) => (
                  <div key={idx} className="task-card">
                    {task}
                  </div>
                ))
              )}
            </div>
            <button className="add-task-btn">+ Ajouter une tâche</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default memo(MainContent);
