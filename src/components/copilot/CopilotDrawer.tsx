import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CopilotDrawer: React.FC = () => {
  const { 
    isCopilotOpen, 
    setIsCopilotOpen, 
    copilotMessages, 
    sendCopilotMessage, 
    selectedApplication 
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');

  if (!isCopilotOpen) return null;

  const quickPrompts = [
    `Why is application ${selectedApplication?.id || 'AZL-2026-00124'} delayed?`,
    'Which verification steps are incomplete for Apex Institute?',
    'Summarize the EVC findings.',
    'What is causing the largest workflow bottleneck?',
    'Recommend the next action for this application.',
    'Explain why the EVC task is blocked.',
    'Which compliance obligations are due soon?'
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;
    sendCopilotMessage(inputQuery.trim());
    setInputQuery('');
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-wide">ZeroLoop Copilot</span>
              <span className="text-[10px] bg-teal-400/20 text-teal-300 px-1.5 py-0.5 rounded font-mono font-medium border border-teal-400/30">
                PROTOTYPE AI
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Evidence-Grounded Regulatory Operations Assistant</p>
          </div>
        </div>

        <button
          onClick={() => setIsCopilotOpen(false)}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prototype AI Disclaimer Banner */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-[11px] text-amber-900">
        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>
          <strong>Evaluation Sandbox Mode:</strong> Grounded strictly in active prototype records. Human officials retain final approval authority.
        </span>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {copilotMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-md bg-blue-900 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.references && msg.references.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Grounded In:
                  </span>
                  {msg.references.map((ref, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200"
                    >
                      {ref}
                    </span>
                  ))}
                  {msg.confidence && (
                    <span className="text-[10px] text-emerald-600 font-semibold ml-auto flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {msg.confidence}% Evidence Match
                    </span>
                  )}
                </div>
              )}

              <div className="mt-1 text-[9px] text-right opacity-60">
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-md bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200">
        <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Suggested Questions:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {quickPrompts.slice(0, 4).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendCopilotMessage(prompt)}
              className="text-[11px] bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 rounded-full px-3 py-1 whitespace-nowrap transition-colors shrink-0 text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask about ${selectedApplication?.id || 'regulations'}, bottlenecks, EVC...`}
          className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-slate-800"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-lg text-xs font-semibold flex items-center justify-center transition-all shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
