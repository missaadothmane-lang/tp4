export default function HomePage() {
  return (
    <div className="hero">
      <h1>Bienvenue sur TaskFlow</h1>
      <p>L'application full-stack Next.js de gestion de projets</p>
      <a href="/dashboard" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1.125rem' }}>
        Aller au Dashboard
      </a>
    </div>
  );
}