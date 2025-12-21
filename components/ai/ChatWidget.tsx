"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome-msg",
            role: "assistant",
            content: `Assalamu'alaikum Akang Teteh! 🤖✨

Kenalin aku **Minral**, asisten digital Tutorial PAI UPI.
Ada yang bisa Minral bantu? Misal mau tanya jadwal mentoring, kuliah dhuha, atau info kabinet?

Sok mangga diketik aja pertanyaannya ya...`,
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue.trim(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.content }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.reply || data.error || "Terjadi kesalahan.");
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Punten, Minral lagi pusing euy (Error connecting to server). Coba lagi nanti ya!",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Wireless Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">

                    {/* Header */}
                    <div className="bg-primary-600 p-4 flex items-center justify-between text-white shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-tight">Minral 🤖</span>
                                <span className="text-xs text-primary-100 flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online | Siap Bantu ✨
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Close Chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-neutral-50 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-primary-600 text-white rounded-br-none"
                                            : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-none"
                                        }`}
                                >
                                    {/* Markdown Rendering */}
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0 text-inherit"
                                        components={{
                                            p: ({ node, ...props }) => <p {...props} className="break-words" />,
                                            a: ({ node, ...props }) => <a {...props} className="underline font-semibold text-inherit hover:text-inherit/80" target="_blank" rel="noopener noreferrer" />,
                                            strong: ({ node, ...props }) => <strong {...props} className="font-bold text-inherit" />
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                                    <span className="text-xs text-neutral-500 italic">Minral sedang mengetik...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-neutral-200">
                        <div className="flex items-center gap-2 bg-neutral-50 rounded-full px-4 py-2 border border-neutral-200 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder=" Ketik pertanyaan Akang/Teteh..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-700 placeholder:text-neutral-400"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className={`p-2 rounded-full transition-colors ${isLoading || !inputValue.trim()
                                        ? "text-neutral-300 cursor-not-allowed"
                                        : "text-primary-600 hover:bg-primary-50"
                                    }`}
                                aria-label="Send Message"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-center mt-1">
                            <span className="text-[10px] text-neutral-400">Powered by Gemini AI • Tutorial PAI UPI</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? "bg-neutral-700 rotate-90" : "bg-primary-600 hover:bg-primary-500"
                    }`}
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-white" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="w-7 h-7 text-white" />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-primary-600 animate-pulse"></span>
                    </div>
                )}

                {/* Tooltip */}
                {!isOpen && (
                    <span className="absolute right-16 bg-neutral-800 text-white text-xs font-semibold px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                        Tanya Minral 🤖
                    </span>
                )}
            </button>
        </div>
    );
}
