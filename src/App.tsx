/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  User, 
  Layout, 
  Shield, 
  Brain, 
  Lock, 
  Eye, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle,
  Moon,
  Sun,
  ChevronRight,
  Library as LibraryIcon,
  Info
} from 'lucide-react';

/**
 * PRINCIPIOS DEL HUMANISMO DIGITAL (Prem, 2024):
 * 1. Las tecnologías son maleables: El diseño no es destino.
 * 2. La dignidad humana como medida: El centro es la persona, no el algoritmo.
 * 3. Soberanía digital: El usuario controla su rastro y sus datos.
 * 4. Reflexión crítica sobre la técnica: Romper el automatismo.
 * 5. Transdisciplinariedad: Diálogo entre técnica y humanidades.
 */

// --- Types ---

type Category = 'Privacidad' | 'Soberanía' | 'Monopolio' | 'Ética de la IA';

interface Post {
  id: string;
  content: string;
  category: Category;
  timestamp: number;
  complexityAnalysis: {
    ethicalImpact: number;
    socialRelevance: number;
    technicalAutonomy: number;
  };
}

interface LibraryItem {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
}

// --- Mock Data ---

const INITIAL_LIBRARY: LibraryItem[] = [
  {
    id: '1',
    title: 'La Vía: Para el futuro de la Humanidad',
    author: 'Edgar Morin',
    description: 'Propuesta de una política de civilización para enfrentar las crisis de la modernidad.',
    tags: ['Complejidad', 'Humanismo']
  },
  {
    id: '2',
    title: 'Las Tres Ecologías',
    author: 'Félix Guattari',
    description: 'Articulación entre la ecología ambiental, social y mental.',
    tags: ['Ecosofía', 'Subjetividad']
  },
  {
    id: '3',
    title: 'Digital Humanism',
    author: 'Erich Prem',
    description: 'Marco teórico para asegurar que la tecnología sirva a la humanidad.',
    tags: ['Ética', 'IA']
  },
  {
    id: '4',
    title: 'Historia del Siglo XX',
    author: 'Eric Hobsbawm',
    description: 'Análisis de las transformaciones sociales y políticas que definieron nuestra era.',
    tags: ['Historia', 'Poder']
  }
];

// --- Components ---

const ComplexityBadge = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[10px] uppercase tracking-wider opacity-60">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1 w-full bg-border rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className="h-full bg-accent"
      />
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'muro' | 'biblioteca' | 'perfil'>('muro');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Modal state for the "Immediacy Filter"
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [checklist, setChecklist] = useState({
    dignity: false,
    autonomy: false,
    transparency: false
  });

  // Load data from LocalStorage (Soberanía Digital)
  useEffect(() => {
    const savedPosts = localStorage.getItem('soberana_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    
    const savedTheme = localStorage.getItem('soberana_theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('soberana_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('soberana_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handlePostAttempt = () => {
    if (!newPostContent.trim()) return;
    setIsModalOpen(true);
  };

  const confirmPost = () => {
    if (!selectedCategory || !checklist.dignity || !checklist.autonomy || !checklist.transparency) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content: newPostContent,
      category: selectedCategory,
      timestamp: Date.now(),
      complexityAnalysis: {
        ethicalImpact: Math.floor(Math.random() * 40) + 60,
        socialRelevance: Math.floor(Math.random() * 50) + 50,
        technicalAutonomy: Math.floor(Math.random() * 30) + 70,
      }
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsModalOpen(false);
    setSelectedCategory(null);
    setChecklist({ dignity: false, autonomy: false, transparency: false });
  };

  const reflectionFootprint = useMemo(() => {
    return posts.length * 12.5; // Arbitrary metric for "Huella de Reflexión"
  }, [posts]);

  return (
    <div className="min-h-screen font-sans selection:bg-accent/30">
      {/* Navigation Rail */}
      <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:h-screen md:w-20 bg-card border-t md:border-t-0 md:border-r border-border z-50 flex md:flex-col items-center justify-around md:justify-center gap-8 p-4">
        <div className="hidden md:flex mb-auto">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-accent/20">
            S
          </div>
        </div>
        
        <button 
          onClick={() => setActiveTab('muro')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'muro' ? 'bg-foreground text-background' : 'hover:bg-accent/10 opacity-60'}`}
        >
          <Layout size={24} />
        </button>
        
        <button 
          onClick={() => setActiveTab('biblioteca')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'biblioteca' ? 'bg-foreground text-background' : 'hover:bg-accent/10 opacity-60'}`}
        >
          <LibraryIcon size={24} />
        </button>
        
        <button 
          onClick={() => setActiveTab('perfil')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'perfil' ? 'bg-foreground text-background' : 'hover:bg-accent/10 opacity-60'}`}
        >
          <User size={24} />
        </button>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-xl hover:bg-accent/10 opacity-60 md:mt-auto"
          title={isDarkMode ? "Iluminación" : "Oscuridad"}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="md:ml-20 pb-24 md:pb-0 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          <AnimatePresence mode="wait">
            {activeTab === 'muro' && (
              <motion.div 
                key="muro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <header className="space-y-2">
                  <h1 className="text-4xl font-serif font-bold tracking-tight">El Muro</h1>
                  <p className="text-muted-foreground font-serif italic">Espacio de autonomía deliberativa y análisis de complejidad.</p>
                </header>

                {/* Post Input */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                  <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="¿Qué reflexión crítica deseas aportar hoy?"
                    className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[100px] text-lg"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handlePostAttempt}
                      className="bg-foreground text-background px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      Proponer Reflexión <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Feed */}
                <div className="space-y-8">
                  {posts.length === 0 ? (
                    <div className="text-center py-20 opacity-40 italic font-serif">
                      Aún no hay huellas de reflexión en este espacio.
                    </div>
                  ) : (
                    posts.map((post) => (
                      <motion.article 
                        key={post.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-card border border-border rounded-2xl overflow-hidden"
                      >
                        <div className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent px-2 py-1 bg-accent/10 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs opacity-40 font-mono">
                              {new Date(post.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xl leading-relaxed font-serif">
                            {post.content}
                          </p>
                        </div>
                        <div className="bg-accent/5 border-t border-border p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <ComplexityBadge label="Impacto Ético" value={post.complexityAnalysis.ethicalImpact} />
                          <ComplexityBadge label="Relevancia Social" value={post.complexityAnalysis.socialRelevance} />
                          <ComplexityBadge label="Autonomía Técnica" value={post.complexityAnalysis.technicalAutonomy} />
                        </div>
                      </motion.article>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'biblioteca' && (
              <motion.div 
                key="biblioteca"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <header className="space-y-2">
                  <h1 className="text-4xl font-serif font-bold tracking-tight">Biblioteca</h1>
                  <p className="text-muted-foreground font-serif italic">Repositorio teórico para combatir la ceguera ética.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {INITIAL_LIBRARY.map((item) => (
                    <div key={item.id} className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:border-accent transition-colors group">
                      <div className="space-y-1">
                        <h3 className="text-xl font-serif font-bold group-hover:text-accent transition-colors">{item.title}</h3>
                        <p className="text-sm font-medium opacity-60">{item.author}</p>
                      </div>
                      <p className="text-sm leading-relaxed opacity-80">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider border border-border px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'perfil' && (
              <motion.div 
                key="perfil"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <header className="space-y-2">
                  <h1 className="text-4xl font-serif font-bold tracking-tight">Mi Perfil</h1>
                  <p className="text-muted-foreground font-serif italic">Panel de Soberanía y Gestión de la Identidad Digital.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <section className="bg-card border border-border rounded-2xl p-8 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                          <User size={32} className="text-accent" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-serif font-bold">Doctorando en T.D.</h2>
                          <p className="text-sm opacity-60">Soberanía Digital: Nivel Avanzado</p>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-border space-y-4">
                        <h3 className="text-sm uppercase tracking-widest font-bold opacity-40">Privacidad Radical</h3>
                        <div className="flex items-center justify-between p-4 bg-accent/5 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Lock size={18} />
                            <span className="text-sm">Almacenamiento Local (LocalStorage)</span>
                          </div>
                          <span className="text-[10px] bg-green-500/20 text-green-600 px-2 py-1 rounded font-bold">ACTIVO</span>
                        </div>
                        <p className="text-xs opacity-60 italic">
                          "Los datos residen en tu dispositivo, no en nuestros servidores. Eres el único soberano de tu palabra."
                        </p>
                      </div>
                    </section>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-accent text-white rounded-2xl p-8 space-y-4 shadow-lg shadow-accent/20">
                      <h3 className="text-sm uppercase tracking-widest font-bold opacity-80">Huella de Reflexión</h3>
                      <div className="text-6xl font-serif font-bold">{reflectionFootprint.toFixed(1)}</div>
                      <p className="text-xs opacity-80">
                        Métrica de profundidad intelectual basada en aportes críticos.
                      </p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                      <h3 className="text-sm font-bold flex items-center gap-2">
                        <Shield size={16} /> Manifiesto de Viena
                      </h3>
                      <p className="text-xs opacity-70 leading-relaxed">
                        Compromiso con la dignidad humana y la supervisión de sistemas automatizados.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Immediacy Filter Modal (Intervención de Decisión Humana) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <header className="space-y-2">
                  <div className="flex items-center gap-2 text-accent">
                    <Brain size={24} />
                    <span className="text-xs uppercase tracking-[0.3em] font-bold">Filtro de Inmediatez</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold">Intervención de Decisión Humana</h2>
                  <p className="text-sm opacity-60">
                    La técnica busca la velocidad; el humanismo busca la pausa. Categoriza y valida tu reflexión antes de materializarla.
                  </p>
                </header>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-40">Categoría del Manifiesto de Viena</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Privacidad', 'Soberanía', 'Monopolio', 'Ética de la IA'] as Category[]).map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`p-4 rounded-xl border text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-foreground text-background border-foreground' : 'border-border hover:border-accent'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-40">Checklist de Dignidad Humana</label>
                    <div className="space-y-3">
                      {[
                        { id: 'dignity', label: '¿Este aporte respeta la dignidad intrínseca de la persona?' },
                        { id: 'autonomy', label: '¿Fomenta la autonomía deliberativa del lector?' },
                        { id: 'transparency', label: '¿Es transparente en sus intenciones y fuentes?' }
                      ].map(item => (
                        <button 
                          key={item.id}
                          onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                          className="flex items-center gap-3 w-full text-left group"
                        >
                          <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${checklist[item.id as keyof typeof checklist] ? 'bg-accent border-accent text-white' : 'border-border group-hover:border-accent'}`}>
                            {checklist[item.id as keyof typeof checklist] && <CheckCircle2 size={14} />}
                          </div>
                          <span className="text-sm opacity-80">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <footer className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 rounded-xl border border-border font-medium hover:bg-accent/5 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    disabled={!selectedCategory || !checklist.dignity || !checklist.autonomy || !checklist.transparency}
                    onClick={confirmPost}
                    className="flex-1 px-6 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Confirmar Acción Humana
                  </button>
                </footer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Ethics Info (Prem, 2024) */}
      <div className="fixed bottom-24 right-6 md:bottom-6 z-40">
        <div className="group relative">
          <div className="bg-card border border-border w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-help hover:bg-accent/10 transition-colors">
            <Info size={20} />
          </div>
          <div className="absolute bottom-full right-0 mb-4 w-72 bg-card border border-border p-4 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[10px] leading-relaxed">
            <p className="font-bold mb-2 uppercase tracking-widest">Principios de Prem (2024)</p>
            <ul className="space-y-1 opacity-70">
              <li>• Las tecnologías son maleables.</li>
              <li>• La dignidad humana como medida.</li>
              <li>• Soberanía digital del usuario.</li>
              <li>• Reflexión crítica sobre la técnica.</li>
              <li>• Transdisciplinariedad activa.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
