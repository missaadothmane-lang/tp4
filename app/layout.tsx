import { Inter } from 'next/font/google'; 
import './globals.css';
  
const inter = Inter({ subsets: ['latin'] }); 
  
export default async function RootLayout({ children }: { children: React.ReactNode }) { 
  return ( 
    <html lang="fr"> 
      <body className={inter.className}> 
        <header className="header">
          <div className="header-title">TaskFlow</div>
          <nav className="header-nav">
            <a href="/" className="header-link">Accueil</a>
            <a href="/dashboard" className="header-link">Dashboard</a>
          </nav>
        </header>
        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>
      </body> 
    </html> 
  ); 
}