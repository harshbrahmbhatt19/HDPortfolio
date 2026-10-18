"use client";
import { useEffect, useRef, useState } from "react";
const T = {
  about: "Harsh Brahmbhatt, AI Engineer. I make neural and LLM systems dependable in production, with allowlists, validation, auto-correction, and fallbacks.",
  skills: "AI/ML: Groq, Llama 3.3-70B, Ollama, Vercel AI SDK\nLanguages: Python, JavaScript, TypeScript, C, SQL\nFrontend: React, Next.js, Tailwind CSS\nBackend: Node.js, Express.js, REST APIs\nDatabase: MongoDB, SQLite, MySQL",
  projects: "1. AI UI Generator: text-to-UI with a 3-stage LLM pipeline\n2. Datasense AI: ETL and data quality tool with a local LLM\n3. SpendSense: full-stack personal finance app",
  experience: "Data Engineer Intern, NYSA Shipping (Jul 2026)\nIntern, Atal Tinkering Labs, Mentor India Academy (Jan to Apr 2026)",
  education: "B.E. in Computer Engineering, Vadodara Institute of Engineering (GTU), 2023 to 2027. CGPA 7.35.",
  achievements: "1st rank, college robotics competition: built a line-following robot car with Arduino, IR sensors, and an L298N motor driver.",
  contact: "Email: harshbrahmbhatt1231@gmail.com\nPhone: +91 95741 90978",
};
const TECH = /^(Python|JavaScript|TypeScript|C|SQL|SQLite|MySQL|MongoDB|React|Next\.js|Node\.js|Express\.js|Tailwind|Groq|Llama|Ollama|Vercel|Arduino|REST|APIs|LLM|AI|ETL|SDK|CGPA)$/;
function hl(s) {
  return s.split(/(\s+)/).map((t, i) => {
    if (!t.trim()) return t;
    const m = t.replace(/[,.;)(]+$/, ""); let c = "";
    if (/:$/.test(t)) c = "k"; else if (m.includes("@")) c = "s"; else if (/\d/.test(t)) c = "n";
    else if (/^(Harsh|Brahmbhatt)$/.test(m)) c = "nm"; else if (TECH.test(m)) c = "t";
    return c ? <span key={i} className={c}>{t}</span> : t;
  });
}
export default function Terminal() {
  const [L, setL] = useState([]);
  const q = useRef(Promise.resolve()), box = useRef(), started = useRef(false);
  // types text word by word, 25 ms per word
  const type = (text) => new Promise((res) => {
    const w = text.split(/(\s+)/); let i = 0;
    setL((l) => [...l, ""]);
    const iv = setInterval(() => {
      let add = ""; do { add += w[i++]; } while (i < w.length && !w[i - 1].trim());
      setL((l) => { const n = [...l]; n[n.length - 1] += add; return n; });
      if (i >= w.length) { clearInterval(iv); res(); }
    }, 25);
  });
  const run = (c) => { q.current = q.current.then(async () => {
    if (c === "clear") { setL([]); return; }
    setL((l) => [...l, "> " + c]); await type(T[c]);
  }); };
  useEffect(() => {
    if (started.current) return; started.current = true;
    q.current = q.current.then(() => type("Welcome. I’m Harsh’s portfolio terminal. Tap a command below to learn more about me."));
  }, []);
  useEffect(() => { box.current.scrollTop = box.current.scrollHeight; }, [L]);
  return (
    <div className="term">
      <div className="tbar"><i /><i /><i /><b>harsh@portfolio ~</b></div>
      <div className="tout" ref={box} role="log" aria-live="polite">
        {L.map((l, i) => <div key={i} className={l.startsWith("> ") ? "ln cmd" : "ln"}>{l.startsWith("> ") ? l : hl(l)}</div>)}
      </div>
      <div className="chips">
        {[...Object.keys(T), "clear"].map((c) => <button key={c} type="button" onClick={() => run(c)}>{c}</button>)}
      </div>
    </div>
  );
}
