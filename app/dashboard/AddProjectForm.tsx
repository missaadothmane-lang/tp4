'use client';

import { useFormStatus } from 'react-dom';
import { addProject } from '../actions/projects';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? 'Création...' : 'Créer un projet'}
    </button>
  );
}

export default function AddProjectForm() {
  return (
    <form action={addProject} className="form-row">
      <input type="text" name="name" className="input" placeholder="Nom du nouveau projet..." required style={{ flex: 1 }} />
      <input type="color" name="color" className="input input-color" defaultValue="#3b82f6" title="Couleur du projet" />
      <SubmitButton />
    </form>
  );
}