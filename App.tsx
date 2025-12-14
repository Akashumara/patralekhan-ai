import React, { useState, useEffect } from 'react';
import { AppView, Template, Draft } from './types';
import { TEMPLATES, CATEGORIES } from './data/applicationData';
import InteractiveLetter from './components/InteractiveLetter';
import AIGenerator from './components/AIGenerator';
import DailyFeed from './components/DailyFeed';
import { Menu, X, FileText, Home, PenTool, Save, HelpCircle, Search, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);

  // Load Drafts
  useEffect(() => {
    const saved = localStorage.getItem('patralekhan_drafts');
    if (saved) setDrafts(JSON.parse(saved));
  }, [currentView]); // Reload when view changes (e.g., coming from editor)

  // Routing Simulation
  const navigateTo = (view: AppView, category?: string) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
    setSelectedTemplate(null);
    window.scrollTo(0, 0);
  };

  const handleTemplateSelect = (t: Template) => {
    setSelectedTemplate(t);
    setCurrentView(AppView.EDITOR);
  };

  const handleDraftSelect = (d: Draft) => {
    // Reconstruct a pseudo-template from the draft
    const original = TEMPLATES.find(t => t.id === d.templateId);
    if (original) {
      setSelectedTemplate({
        ...original,
        englishBody: d.content, // Simplified for demo: assumes saved content overwrites body
        hindiBody: d.content // User has to manually switch lang if they mixed it, or we infer
      });
      setCurrentView(AppView.EDITOR);
    } else {
        // AI Generated draft restoration
        setSelectedTemplate({
            id: d.id,
            title: d.title,
            category: 'General',
            englishBody: d.content,
            hindiBody: d.content,
            tags: [],
            faqs: []
        });
        setCurrentView(AppView.EDITOR);
    }
  };

  const getFilteredTemplates = () => {
    let list = TEMPLATES;
    if (selectedCategory) {
      list = list.filter(t => t.category === selectedCategory);
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(lower) || t.tags.some(tag => tag.includes(lower)));
    }
    return list;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo(AppView.HOME)}>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">P</div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">PatraLekhan<span className="text-blue-600">AI</span></h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigateTo(AppView.HOME)} className={`flex items-center gap-1 hover:text-blue-600 ${currentView === AppView.HOME ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              <Home size={18} /> Home
            </button>
            <button onClick={() => navigateTo(AppView.AI_TOOL)} className={`flex items-center gap-1 hover:text-blue-600 ${currentView === AppView.AI_TOOL ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              <PenTool size={18} /> AI Writer
            </button>
             <button onClick={() => navigateTo(AppView.DRAFTS)} className={`flex items-center gap-1 hover:text-blue-600 ${currentView === AppView.DRAFTS ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              <Save size={18} /> Saved ({drafts.length})
            </button>
            <button onClick={() => navigateTo(AppView.FAQ)} className={`flex items-center gap-1 hover:text-blue-600 ${currentView === AppView.FAQ ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              <HelpCircle size={18} /> FAQs
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t p-4 flex flex-col gap-4">
             <button onClick={() => navigateTo(AppView.HOME)} className="flex items-center gap-2">Home</button>
             <button onClick={() => navigateTo(AppView.AI_TOOL)} className="flex items-center gap-2">AI Writer</button>
             <button onClick={() => navigateTo(AppView.DRAFTS)} className="flex items-center gap-2">Saved Drafts</button>
             <button onClick={() => navigateTo(AppView.FAQ)} className="flex items-center gap-2">FAQ</button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {currentView === AppView.EDITOR && selectedTemplate ? (
          <InteractiveLetter template={selectedTemplate} onBack={() => navigateTo(AppView.HOME)} />
        ) : currentView === AppView.AI_TOOL ? (
          <AIGenerator />
        ) : currentView === AppView.DRAFTS ? (
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Save /> My Saved Applications</h2>
                {drafts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p>No saved drafts yet.</p>
                        <button onClick={() => navigateTo(AppView.HOME)} className="mt-4 text-blue-600 hover:underline">Start writing</button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {drafts.map(d => (
                            <div key={d.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-lg">{d.title}</h3>
                                    <p className="text-xs text-gray-500">Last edited: {new Date(d.lastModified).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => handleDraftSelect(d)} className="text-blue-600 font-medium hover:bg-blue-50 px-3 py-1 rounded">Edit</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ) : (
          /* Home / Category View */
          <div className="max-w-7xl mx-auto">
            {/* Hero & Search (only on Home) */}
            {currentView === AppView.HOME && !selectedCategory && (
              <>
                <div className="bg-indigo-900 rounded-2xl p-8 text-center text-white mb-10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-hindi">PatraLekhan AI</h1>
                        <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            India's smartest application writing assistant. Formal letters for Banking, Police, Schools, and Offices in seconds.
                        </p>
                        <div className="max-w-xl mx-auto relative">
                            <input 
                                type="text" 
                                placeholder="Search 'Cheque book', 'FIR', 'Leave'..." 
                                className="w-full px-6 py-4 rounded-full text-gray-900 shadow-lg outline-none focus:ring-4 focus:ring-blue-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute right-5 top-4 text-gray-400" />
                        </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
                </div>

                <DailyFeed onSelect={handleTemplateSelect} />

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                   {CATEGORIES.map(cat => (
                       <button 
                         key={cat}
                         onClick={() => navigateTo(AppView.CATEGORY, cat)}
                         className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition text-center group"
                       >
                           <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
                               <FileText size={20} />
                           </div>
                           <span className="font-medium text-gray-700">{cat}</span>
                       </button>
                   ))}
                </div>
              </>
            )}

            {/* Category Listing */}
            {(selectedCategory || searchTerm) && (
                 <div className="mb-8">
                     <div className="flex items-center gap-2 mb-6">
                         {selectedCategory && <button onClick={() => navigateTo(AppView.HOME)} className="text-gray-500 hover:text-black">&larr; Back</button>}
                         <h2 className="text-2xl font-bold text-gray-800">
                             {searchTerm ? `Results for "${searchTerm}"` : `${selectedCategory} Templates`}
                         </h2>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {getFilteredTemplates().map(t => (
                             <div key={t.id} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden hover:shadow-lg transition">
                                 <div className="p-5">
                                     <div className="flex justify-between items-start mb-2">
                                         <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{t.category}</span>
                                     </div>
                                     <h3 className="font-bold text-lg text-gray-900 mb-2">{t.title}</h3>
                                     <p className="text-gray-500 text-sm line-clamp-3 mb-4">{t.englishBody}</p>
                                     <button 
                                       onClick={() => handleTemplateSelect(t)}
                                       className="w-full bg-gray-50 hover:bg-gray-100 text-blue-700 font-medium py-2 rounded border border-gray-200 transition"
                                     >
                                         Use Template
                                     </button>
                                 </div>
                             </div>
                         ))}
                         {getFilteredTemplates().length === 0 && (
                             <div className="col-span-full text-center py-12">
                                 <p className="text-gray-500 text-lg">No templates found.</p>
                                 <button onClick={() => navigateTo(AppView.AI_TOOL)} className="mt-2 text-blue-600 font-semibold">Try AI Writer instead &rarr;</button>
                             </div>
                         )}
                     </div>
                 </div>
            )}
            
            {/* FAQ Page View */}
            {currentView === AppView.FAQ && (
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>Is this service free?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Yes, PatraLekhan AI is completely free to use for all Indian citizens.
                            </p>
                        </details>
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>Can I type in Hinglish?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Yes! Our AI Writer understands Hinglish (e.g., "Bank manager ko letter likho").
                            </p>
                        </details>
                         <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                <span>Does the PDF support Hindi?</span>
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                                Yes, we use image-based PDF generation to ensure perfect Hindi font rendering.
                            </p>
                        </details>
                    </div>
                </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12 no-print">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">PatraLekhan AI</h3>
                <p className="text-gray-400 text-sm">Empowering India with the power of automated communication. Made with ❤️ for Bharat.</p>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                    <li className="hover:text-white cursor-pointer" onClick={() => navigateTo(AppView.HOME)}>Home</li>
                    <li className="hover:text-white cursor-pointer" onClick={() => navigateTo(AppView.AI_TOOL)}>AI Writer</li>
                    <li className="hover:text-white cursor-pointer" onClick={() => navigateTo(AppView.FAQ)}>FAQs</li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                    <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-white cursor-pointer">Terms of Service</li>
                </ul>
            </div>
             <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-sm text-gray-400 flex items-center gap-2"><Mail size={14}/> support@patralekhan.ai</p>
            </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-12 pt-8 border-t border-gray-700">
            © {new Date().getFullYear()} PatraLekhan AI Ultimate. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
