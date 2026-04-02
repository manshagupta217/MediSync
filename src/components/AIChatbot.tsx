import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickReplies = [
  'Check patient risk',
  'Find hospital with ICU',
  'I have chest pain',
  'I have headache',
  'Throat infection',
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the MediSync AI Assistant. How can I help you today? 🏥" }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = async (text: string): Promise<string> => {
    const lower = text.toLowerCase();

    try {
      if (lower.includes("hello") || lower.includes("hi")) {
        return "Hello! How can I assist you today 😊";
      }

      if (lower.includes("fever")) {
        return "🌡️ You might have a fever. Stay hydrated and take rest.";
      }

      if (lower.includes("headache")) {
        return "🤕 Headache may be due to stress or dehydration. Take rest and drink water.";
      }

      if (lower.includes("throat") || lower.includes("infection")) {
        return "😷 Throat infection suspected. Drink warm fluids and avoid cold food.";
      }

      if (lower.includes("cough")) {
        return "😷 For cough, drink warm fluids and avoid cold items.";
      }

      if (lower.includes("cold")) {
        return "🤧 Common cold detected. Take rest and stay warm.";
      }

      if (lower.includes("chest pain")) {
        return "🚨 Chest pain can be serious. Please seek immediate medical attention.";
      }

      if (lower.includes("teleconsult")) {
        return "📹 Go to Dashboard → Teleconsultation to start.";
      }

      if (lower.includes("risk") || lower.includes("critical")) {
        const res = await fetch("http://127.0.0.1:8000/predict-risk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            age: 65,
            oxygen: 82,
            heart_rate: 110
          })
        });

        const data = await res.json();

        return `⚠️ Patient Risk Level: ${data.risk}

Please monitor vitals and consider medical consultation.`;
      }

      if (lower.includes("hospital") || lower.includes("icu")) {
        const res = await fetch("http://127.0.0.1:8000/predict-hospital", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            condition: "cardiac",
            severity: "high"
          })
        });

        const data = await res.json();

        return `🏥 Recommended Hospital:
${data.hospital}`;
      }

      return "🤖 I can help with:\n• Symptoms (fever, headache, cough)\n• Patient risk\n• Hospital recommendation\n• Teleconsultation";

    } catch {
      return "⚠️ Server error. Please try again.";
    }
  };

  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await getBotResponse(text);

    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl shadow-2xl w-80 mb-3 overflow-hidden flex flex-col"
            style={{ height: '460px' }}
          >
            <div className="bg-gradient-to-r from-teal-400 to-teal-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">MediSync AI</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/60">
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 text-xs rounded-xl whitespace-pre-line ${m.role === 'user' ? 'bg-teal-500 text-white ml-auto' : 'bg-white/80 text-gray-800'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-gray-500">🧠 Analyzing...</div>}
            </div>

            {messages.length <= 2 && (
              <div className="p-2 flex flex-wrap gap-1">
                {quickReplies.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded-full"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t p-2 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask about symptoms, risk, hospital..."
                className="flex-1 bg-white/60 backdrop-blur-md rounded-xl px-3 py-2 text-xs outline-none"
              />
              <button onClick={() => sendMessage(input)} className="bg-teal-500 text-white px-3 rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.12, y: -2 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 text-white flex items-center justify-center shadow-xl"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}