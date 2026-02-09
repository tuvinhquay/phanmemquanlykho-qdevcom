"use client";

import { ChatMessage } from '@/types/index';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatBox() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'ai',
      senderName: 'Gemini AI',
      text: 'Chào bạn! Tôi là trợ lý AI Q-Devcom. Có gì tôi có thể giúp bạn?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Gemini API call - tạm thời mock response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: 'ai',
          senderName: 'Gemini AI',
          text: data.reply || 'Không có phản hồi từ AI.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Try to parse error details from server
        let errText = 'Lỗi máy chủ khi gọi AI.';
        try {
          const err = await response.json();
          if (err?.error) errText = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
          else if (err?.details) errText = String(err.details);
        } catch (e) {
          // fallback to status text
          errText = response.statusText || errText;
        }

        const errorMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          senderId: 'ai',
          senderName: 'Gemini AI',
          text: `Lỗi: ${errText}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'ai',
        senderName: 'Gemini AI',
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col border border-slate-200 z-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg font-bold flex items-center justify-between">
        <div>💬 Chat hỗ trợ AI</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/')}
            className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white"
          >
            Trang chủ
          </button>
          <button
            onClick={() => router.back()}
            className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-white"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.senderId === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-900'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {msg.timestamp instanceof Date
                  ? msg.timestamp.toLocaleTimeString('vi-VN')
                  : ''}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-200 text-slate-900 px-4 py-2 rounded-lg">
              <p className="text-sm">Đang gõ...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Nhập câu hỏi..."
          className="flex-1 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-slate-400 transition text-sm font-medium"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
