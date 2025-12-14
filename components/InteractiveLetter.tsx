import React, { useState, useEffect, useRef } from 'react';
import { Template } from '../types';
import { Download, Printer, Copy, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  template: Template;
  onBack: () => void;
}

const InteractiveLetter: React.FC<Props> = ({ template, onBack }) => {
  const [lang, setLang] = useState<'english' | 'hindi'>('english');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const letterRef = useRef<HTMLDivElement>(null);

  // Parse placeholders from text
  useEffect(() => {
    const text = lang === 'english' ? template.englishBody : template.hindiBody;
    // Regex to find [Content]
    const matches = text.match(/\[(.*?)\]/g);
    const uniquePlaceholders: string[] = matches ? Array.from(new Set(matches.map(m => m.replace(/\[|\]/g, '')))) : [];
    setPlaceholders(uniquePlaceholders);
    
    // Reset form values when template or lang changes, but keep matching keys if possible
    setFormValues(prev => {
      const newValues: Record<string, string> = {};
      uniquePlaceholders.forEach(p => {
        newValues[p] = prev[p] || '';
      });
      return newValues;
    });
  }, [template, lang]);

  const handleInputChange = (placeholder: string, value: string) => {
    setFormValues(prev => ({ ...prev, [placeholder]: value }));
  };

  const getFilledText = () => {
    let text = lang === 'english' ? template.englishBody : template.hindiBody;
    placeholders.forEach(p => {
      const val = formValues[p];
      // Highlight empty placeholders in the preview or show value
      const replacement = val ? val : `[${p}]`;
      text = text.replace(new RegExp(`\\[${p}\\]`, 'g'), replacement);
    });
    return text;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;
    
    // Use html2canvas to capture the visual representation (best for Hindi font support)
    try {
      const canvas = await html2canvas(letterRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${template.title.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("PDF Generation failed", err);
      alert("Failed to generate PDF. Please try the Print option.");
    }
  };

  const handleShare = () => {
    const text = getFilledText();
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleSaveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('patralekhan_drafts') || '[]');
    const newDraft = {
      id: Date.now().toString(),
      templateId: template.id,
      title: template.title,
      content: getFilledText(),
      lastModified: Date.now()
    };
    localStorage.setItem('patralekhan_drafts', JSON.stringify([newDraft, ...drafts]));
    alert('Draft saved to "Saved Drafts"!');
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Sidebar - Form */}
      <div className="lg:w-1/3 bg-white p-6 shadow-md rounded-lg overflow-y-auto no-print h-fit">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-blue-600 mb-4">&larr; Back to Categories</button>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{template.title}</h2>
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setLang('english')}
              className={`px-3 py-1 text-sm rounded-full ${lang === 'english' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('hindi')}
              className={`px-3 py-1 text-sm rounded-full ${lang === 'hindi' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700 border-b pb-2">Fill Details</h3>
          {placeholders.length === 0 && <p className="text-sm text-gray-500">No placeholders detected. You can edit the text directly if needed.</p>}
          {placeholders.map(p => (
            <div key={p}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{p}</label>
              <input 
                type="text" 
                value={formValues[p]}
                onChange={(e) => handleInputChange(p, e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Enter ${p}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <button onClick={handleSaveDraft} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition flex items-center justify-center gap-2">
            <Copy size={16} /> Save Draft
          </button>
        </div>

        {/* FAQs */}
        {template.faqs.length > 0 && (
          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {template.faqs.map((faq, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium text-gray-700">Q: {faq.question}</p>
                  <p className="text-gray-600">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Preview Area */}
      <div className="lg:w-2/3 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white p-3 rounded-t-lg shadow-sm border-b flex justify-between items-center no-print">
          <span className="font-semibold text-gray-700">Live Preview</span>
          <div className="flex gap-3">
             <button onClick={handleShare} className="flex items-center gap-1 text-green-600 hover:bg-green-50 px-3 py-1 rounded">
              <Share2 size={16} /> WhatsApp
            </button>
            <button onClick={handlePrint} className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-3 py-1 rounded">
              <Printer size={16} /> Print
            </button>
            <button onClick={handleDownloadPDF} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              <Download size={16} /> Download PDF
            </button>
          </div>
        </div>

        {/* Paper Canvas */}
        <div className="bg-gray-100 p-8 flex-1 overflow-auto rounded-b-lg">
          <div 
            ref={letterRef}
            className={`bg-white shadow-lg mx-auto p-12 min-h-[29.7cm] w-[21cm] text-gray-900 ${lang === 'hindi' ? 'font-hindi' : 'font-sans'}`}
            style={{ whiteSpace: 'pre-wrap', fontSize: '12pt', lineHeight: '1.6' }}
          >
            {getFilledText()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLetter;