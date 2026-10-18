"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Bg from "../components/Bg";
import Terminal from "../components/Terminal";

const GH = "https://github.com/harshbrahmbhatt19";
const LI = "https://linkedin.com/in/harsh-brahmbhatt19122005";
const CONNECT = [["Email", "harshbrahmbhatt1231@gmail.com", "https://mail.google.com/mail/?view=cm&to=harshbrahmbhatt1231@gmail.com"], ["LinkedIn", "harsh-brahmbhatt19122005", LI], ["GitHub", "harshbrahmbhatt19", GH], ["Phone", "+91 95741 90978", "tel:+919574190978"]];
const MAIL = "https://mail.google.com/mail/?view=cm&to=harshbrahmbhatt1231@gmail.com";
const CHAPTERS = [["boot", "Boot"], ["problem", "Problem"], ["builds", "Builds"], ["proof", "Proof"], ["toolkit", "Toolkit"], ["notes", "Notes"], ["next", "Next"], ["connect", "Connect"]];
const ROLES = ["AI Engineer", "LLM systems builder", "Full-stack developer"];
const STEPS = [["Allowlist", "Only known components get through."], ["Auto-correct", "Regex repairs common model mistakes."], ["Validate", "JSX is checked before anything renders."], ["Fallback", "A safe error card, never a crash."]];
const PROJECTS = [
  { t: "AI UI Generator", s: "Text-to-UI with LLMs", gh: GH + "/ai-ui-generator-", live: "https://ai-ui-generator-phi.vercel.app",
    d: "Describe an interface in plain words and get working React code. A Planner structures the UI, a Generator writes it, and an Explainer describes the design choices. Follow-ups edit the existing UI, with diff view, undo/redo, and version restore.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Vercel AI SDK", "Groq"] },
  { t: "Datasense AI", s: "AI-powered ETL pipeline", gh: GH + "/ai-powerd-ETL", live: "https://ai-powerd-etl-hlbx3h8nrszgataauoymqy.streamlit.app/",
    d: "Upload a CSV, profile it, score its quality on four dimensions, and clean it with four rules. A local Gemma 3:1b model through Ollama answers questions about the data. Results are saved in SQLite.",
    tags: ["Python", "Pandas", "Streamlit", "SQLite", "Ollama"] },
  { t: "SpendSense", s: "Full-stack finance app", gh: GH + "/Spendsense", live: "https://client-two-pi-26.vercel.app",
    d: "Accounts, transactions, budgets, savings goals, and recurring payments, with spending analytics, an AI finance assistant, and JWT authentication.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Groq", "Vercel"] },
];
const PROOF = [
  ["Data Engineer Intern, NYSA Shipping", "Jul 3 to Jul 17, 2026", "Data validation, reporting, and operational data accuracy. Recognized by the Director for dedication and professionalism."],
  ["Intern, Atal Tinkering Labs", "Jan to Apr 2026", "Supported hands-on technology activities for school students with C and IoT instruments (Mentor India Academy, NITI Aayog)."],
  ["B.E. Computer Engineering", "2023 to 2027", "Vadodara Institute of Engineering (GTU), CGPA 7.35."],
  ["1st rank, robotics competition", "College level", "Built a line-following robot car with Arduino, an IR sensor array, and an L298N motor driver."],
];
const SKILLS = { "AI / ML": ["Groq", "Llama 3.3-70B", "Ollama", "Vercel AI SDK", "Prompt engineering", "Pandas", "NumPy"], Languages: ["Python", "JavaScript", "TypeScript", "C", "SQL"], Frontend: ["React", "Next.js", "Tailwind CSS", "Recharts"], Backend: ["Node.js", "Express.js", "REST APIs", "JWT", "bcrypt"], "Data and cloud": ["MongoDB", "SQLite", "MySQL", "Git", "Vercel", "Streamlit"] };
const NOTES = [
  ["Never trust model output", "A model can return malformed JSX or an unknown component. I treat every response as untrusted: allowlist, repair, validate, then fall back. The model will be wrong sometimes, so the app has to stay calm."],
  ["Plan, generate, explain", "Splitting text-to-UI into three stages made results easier to debug. Each stage has its own prompt, so when something breaks I know which one to fix."],
  ["Local LLMs for data quality", "In Datasense AI the model explains and suggests, while the cleaning rules stay deterministic. Results are repeatable and data never leaves the machine."],
];

function useIn() {
  const r = useRef(); const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.15 }); o.observe(r.current); return () => o.disconnect(); }, []);
  return [r, v];
}
function R({ children, className = "", style }) { const [r, v] = useIn(); return <div ref={r} style={style} className={`rv ${v ? "in" : ""} ${className}`}>{children}</div>; }
// Messages are delivered to your inbox through EmailJS. Set these 3 env vars (.env.local and Vercel):
// NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
// Without them, the form falls back to opening the visitor's email app with the message filled in.
const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const TO = "harshbrahmbhatt1231@gmail.com";
function MindForm() {
  const [st, setSt] = useState("idle"); // idle | sending | done | error
  const submit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget, d = new FormData(f);
    if (d.get("botcheck")) return; // honeypot: bots tick this hidden box
    const name = String(d.get("name")).trim(), email = String(d.get("email")).trim(), message = String(d.get("message")).trim();
    if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) {
      location.href = `mailto:${TO}?subject=${encodeURIComponent("Portfolio message from " + name)}&body=${encodeURIComponent(message + "\n\n" + name + "\n" + email)}`;
      return;
    }
    setSt("sending");
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { from_name: name, reply_to: email, message }, { publicKey: EJS_KEY });
      setSt("done"); f.reset();
    } catch { setSt("error"); }
  };
  return (
    <R><form className="card cform" onSubmit={submit}>
      <h3>What’s on your mind?</h3>
      <p className="lead">Write to me here and it lands straight in my inbox.</p>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="frow">
        <label>Your name<input name="name" type="text" required maxLength={80} autoComplete="name" /></label>
        <label>Your email<input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
      </div>
      <label>Message<textarea name="message" required rows={5} maxLength={2000} placeholder="A role, an internship, a project idea, or just hello." /></label>
      <div className="cta"><button className="btn" type="submit" disabled={st === "sending"}>{st === "sending" ? "Sending..." : "Send message"}</button></div>
      <p className={"fmsg " + st} role="status" aria-live="polite">
        {st === "done" && "Thanks, your message is on its way. I’ll reply soon."}
        {st === "error" && "Something went wrong. Please email me directly at " + TO + "."}
      </p>
    </form></R>
  );
}

function Card({ p }) {
  const mv = (e) => { const b = e.currentTarget.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5; e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`; };
  return (
    <R><article className="card pj" onPointerMove={mv} onPointerLeave={(e) => (e.currentTarget.style.transform = "")}>
      <h3>{p.t}</h3><div className="sub">{p.s}</div><p>{p.d}</p>
      <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      <div className="cta">
        {p.live !== undefined && (p.live ? <a className="btn" href={p.live} target="_blank" rel="noopener">Live demo</a> : <span className="btn dis">Live demo soon</span>)}
        <a className="btn ghost" href={p.gh} target="_blank" rel="noopener">GitHub</a>
      </div>
    </article></R>
  );
}

export default function Page() {
  const [role, setRole] = useState(""), [act, setAct] = useState("boot");
  useEffect(() => { // typewriter that cycles roles
    let i = 0, j = 0, del = false, t;
    const tick = () => { const w = ROLES[i]; j += del ? -1 : 1; setRole(w.slice(0, j));
      if (!del && j === w.length) { del = true; t = setTimeout(tick, 1400); return; }
      if (del && j === 0) { del = false; i = (i + 1) % ROLES.length; }
      t = setTimeout(tick, del ? 35 : 75); };
    tick(); return () => clearTimeout(t);
  }, []);
  useEffect(() => { // scroll progress and active chapter
    const sp = () => document.documentElement.style.setProperty("--p", (scrollY / (document.body.scrollHeight - innerHeight)) * 100 + "%");
    addEventListener("scroll", sp, { passive: true }); sp();
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAct(e.target.id)), { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll(".ch").forEach((s) => o.observe(s));
    return () => { removeEventListener("scroll", sp); o.disconnect(); };
  }, []);
  return (
    <>
      <Bg /><div className="bar" />
      <nav className="rail" aria-label="Chapters">{CHAPTERS.map(([id, n]) => <a key={id} href={"#" + id} className={act === id ? "on" : ""} aria-label={n}><span>{n}</span></a>)}</nav>
      <main>
        <section id="boot" className="ch hero"><div className="wrap grid">
          <div>
            <h1 className="name" aria-label="Harsh Brahmbhatt">{"Harsh Brahmbhatt".split(" ").map((w, wi) => <span key={wi} className="word">{w.split("").map((c, i) => <span key={i} style={{ animationDelay: (wi * 6 + i) * 45 + "ms" }}>{c}</span>)}</span>)}</h1>
            <div className="role">{role}<i className="caret" /></div>
            <p className="lead">I make neural and LLM systems dependable in production. Scroll to read how.</p>
            <div className="cta"><a className="btn" href="#builds">See the builds</a><a className="btn ghost" href="/Harsh_Brahmbhatt_CV.pdf" download>Download CV</a></div>
          </div>
          <Terminal />
        </div></section>

        <section id="problem" className="ch"><div className="wrap">
          <R><h2>Models are brilliant until they aren’t.</h2>
            <p className="lead">One malformed response can crash an app. I got obsessed with making that impossible, so every build of mine runs model output through the same four gates.</p></R>
          <div className="flow">{STEPS.map(([a, b], i) => <R key={a} style={{ transitionDelay: i * 140 + "ms" }} className="step"><b>{a}</b><span>{b}</span></R>)}</div>
        </div></section>

        <section id="builds" className="ch"><div className="wrap">
          <R><h2>Three systems, built to hold up.</h2></R>
          <div className="pjs">{PROJECTS.map((p) => <Card key={p.t} p={p} />)}</div>
        </div></section>

        <section id="proof" className="ch"><div className="wrap">
          <R><h2>Where it’s been tested.</h2></R>
          <div className="tl">{PROOF.map(([a, b, c]) => <R key={a}><article><h3>{a}</h3><div className="meta">{b}</div><p>{c}</p></article></R>)}</div>
        </div></section>

        <section id="toolkit" className="ch"><div className="wrap">
          <R><h2>What I build with.</h2></R>
          <div className="skills">{Object.entries(SKILLS).map(([k, v]) => <R key={k}><div className="card"><h3>{k}</h3><div className="tags">{v.map((s) => <span key={s}>{s}</span>)}</div></div></R>)}</div>
        </div></section>

        <section id="notes" className="ch"><div className="wrap">
          <R><h2>What I’ve learned.</h2></R>
          {NOTES.map(([a, b]) => <R key={a}><details className="card"><summary>{a}</summary><p>{b}</p></details></R>)}
        </div></section>

        <section id="next" className="ch"><div className="wrap">
          <R><h2>Let’s build something that doesn’t break.</h2>
            <p className="lead">Open to AI engineering roles and internships.</p>
            <div className="cta big">
              <a className="btn" href={MAIL} target="_blank" rel="noopener">Email me</a>
              <a className="btn ghost" href="https://linkedin.com/in/harsh-brahmbhatt19122005" target="_blank" rel="noopener">LinkedIn</a>
              <a className="btn ghost" href={GH} target="_blank" rel="noopener">GitHub</a>
              <a className="btn ghost" href="tel:+919574190978">+91 95741 90978</a>
              <a className="btn ghost" href="/Harsh_Brahmbhatt_CV.pdf" download>Download CV</a>
            </div></R>
        </div></section>

        <section id="connect" className="ch connect"><div className="wrap">
          <R><h2>Let’s connect.</h2>
            <p className="lead">Have a role, an internship, or an idea in mind? Reach out through any of these and I’ll get back to you.</p></R>
          <div className="cgrid">{CONNECT.map(([k, v, h], i) => <R key={k} style={{ transitionDelay: i * 100 + "ms" }}><a className="card clink" href={h} {...(h.startsWith("tel:") ? {} : { target: "_blank", rel: "noopener" })}><span className="ck">{k}</span><span className="cv">{v}</span></a></R>)}</div>
          <MindForm />
        </div><footer className="wrap">© 2026 Harsh Brahmbhatt</footer></section>
      </main>
    </>
  );
}
