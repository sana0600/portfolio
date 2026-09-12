import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Printer,
  Send,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import profileAsset from "@/assets/profile.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shaik Attar Sana — Backend & GenAI Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Shaik Attar Sana, a software engineer building scalable backend systems and AI-powered applications.",
      },
      { property: "og:title", content: "Shaik Attar Sana — Software Engineer" },
      {
        property: "og:description",
        content: "Backend engineering, cloud systems, and production-ready GenAI applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const EMAIL = "shaikattarsana@gmail.com";
const PHONE = "+91 8008381656";

const skillGroups = [
  {
    title: "Backend Engineering",
    subtitle: "Systems built for scale",
    icon: Database,
    skills: ["Java", "Spring Boot", "Hibernate", "JPA", "Python", "RESTful APIs", "MySQL", "C#", ".NET"],
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Intelligence in production",
    icon: Bot,
    skills: ["Gen AI", "LLMs", "AI Agents", "RAG", "CNN", "LSTM", "TensorFlow", "Predictive Modelling", "Groq LLM"],
  },
  {
    title: "Web & Full Stack",
    subtitle: "End-to-end experiences",
    icon: Code2,
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Flask"],
  },
  {
    title: "Cloud, DevOps & Tools",
    subtitle: "Reliable delivery",
    icon: Cloud,
    skills: ["GCP", "AWS", "Azure", "Git", "Jenkins", "CI/CD", "Docker", "Postman", "JUnit", "Selenium"],
  },
];

const projects = [
  {
    id: "virtualmate",
    index: "01",
    category: "AI / ML",
    title: "VirtualMate",
    kicker: "Autonomous GenAI Agent",
    description: "A tool-using AI agent that turns natural-language requests into documents, research, emails, and structured output.",
    tags: ["Python", "Groq LLM", "DuckDuckGo", "ReportLab"],
    highlights: [
      "Generates PDF, Word, Excel, and email content from conversational prompts.",
      "Combines Groq-powered reasoning with live DuckDuckGo search.",
      "Uses a modular tool architecture designed for extensibility.",
    ],
    accent: "emerald",
  },
  {
    id: "caption-generator",
    index: "02",
    category: "AI / ML",
    title: "Image Caption Generator",
    kicker: "Deep Learning Pipeline",
    description: "A real-time web application that understands an uploaded image and generates a natural-language caption.",
    tags: ["Python", "Flask", "TensorFlow", "CNN", "LSTM"],
    highlights: [
      "CNN encoder extracts meaningful image features.",
      "RNN/LSTM decoder produces fluent caption sequences.",
      "Deployed as an approachable real-time Flask experience.",
    ],
    accent: "cyan",
  },
  {
    id: "jago-grahak",
    index: "03",
    category: "Backend / Full Stack",
    title: "Jago Grahak",
    kicker: "Complaint Services Platform",
    description: "A role-aware consumer complaint platform with normalized data, status tracking, and operational reporting.",
    tags: ["Java", "Spring Boot", "Hibernate", "MySQL", "Tomcat"],
    highlights: [
      "Role-based authentication protects consumer and administrator workflows.",
      "Normalized MySQL schema supports reliable complaint tracking.",
      "Spring MVC dashboards turn complaint data into actionable reports.",
    ],
    accent: "indigo",
  },
  {
    id: "homely-hub",
    index: "04",
    category: "Backend / Full Stack",
    title: "Homely Hub",
    kicker: "MERN Booking Platform",
    description: "An Airbnb-inspired rental marketplace with live discovery, availability controls, secure access, and payments.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe"],
    highlights: [
      "JWT authentication secures host and guest experiences.",
      "Dynamic search and availability management streamline discovery.",
      "Stripe integration completes the booking flow end to end.",
    ],
    accent: "amber",
  },
] as const;

const experiences = [
  {
    period: "APR 2025 — PRESENT",
    role: "Systems Engineer",
    company: "Tata Consultancy Services (TCS)",
    details: [
      "Developing Java and Spring Boot services for a telecom client, from business logic and REST APIs to end-to-end workflows and AI integration.",
      "Designing scalable components connected to GCP and SQL data infrastructure.",
      "Improving performance, debugging APIs in Postman, and resolving production issues.",
    ],
  },
  {
    period: "AUG 2024 — JAN 2025",
    role: "Associate Software Engineer",
    company: "Accenture",
    details: [
      "Built enterprise backend services with Java, Spring Boot, Hibernate, and JPA alongside frontend components.",
      "Designed clean REST APIs around SOLID principles and maintainable boundaries.",
      "Integrated Git and Jenkins CI/CD pipelines with JUnit-backed testing.",
    ],
  },
];

function Portfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const roles = ["Backend systems.", "AI agents.", "Cloud-native services."];

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 2400);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  const selectedProject = projects.find((project) => project.id === projectId);
  const visibleProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  async function copyValue(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1800);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const sender = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${sender})`)}`;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/25">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.16em]">
            <span className="flex size-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">SA</span>
            <span className="hidden sm:inline">Shaik Attar Sana</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {['About', 'Skills', 'Experience', 'Projects'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item}</a>
            ))}
            <Button asChild size="sm"><a href="#contact">Let's talk <ArrowRight /></a></Button>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border/60 py-3 text-sm text-muted-foreground">{item}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="tech-grid relative flex min-h-[92vh] items-center border-b border-border pt-16">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-primary" /></span>
                Available for ambitious engineering teams
              </div>
              <h1 className="font-display text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-[6.7rem]">
                Shaik Attar <span className="text-muted-foreground">Sana.</span>
              </h1>
              <div className="mt-6 flex min-h-14 items-center gap-3 font-display text-2xl font-medium text-muted-foreground sm:text-4xl">
                I build <span key={roleIndex} className="role-swap text-accent-foreground">{roles[roleIndex]}</span>
              </div>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Software Engineer with 2 years of experience engineering dependable backend platforms and practical GenAI products—from REST APIs and cloud workflows to RAG systems and autonomous agents.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setResumeOpen(true)}><FileText /> View résumé</Button>
                <Button size="lg" variant="outline" asChild><a href="#contact"><Send /> Contact me</a></Button>
              </div>
            </div>
            <aside className="flex flex-col items-center text-center" aria-label="Profile details">
              <ProfilePhoto />
              <div className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Profile / 2026</div>
              <dl className="mt-6 space-y-6 text-sm">
                <div><dt className="mb-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Role</dt><dd className="font-medium">Backend & GenAI Specialist</dd></div>
                <div><dt className="mb-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">Based in</dt><dd className="flex items-center justify-center gap-2 font-medium"><MapPin className="size-4 text-primary" /> Hyderabad, India</dd></div>
              </dl>
              <div className="mt-8 flex gap-2">
                <SocialLink href="https://github.com/shaikattarsana" label="GitHub"><Github /></SocialLink>
                <SocialLink href="https://linkedin.com/in/shaik-attar-sana-96604b215" label="LinkedIn"><Linkedin /></SocialLink>
                <SocialLink href={`mailto:${EMAIL}`} label="Email"><Mail /></SocialLink>
              </div>
              <a href="#about" className="mt-12 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary">Explore work <ArrowDown className="size-4" /></a>
            </aside>
          </div>
        </section>

        <section id="about" className="border-b border-border bg-secondary/30">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[260px_1fr] lg:px-8">
            <SectionLabel number="01" title="About" />
            <div>
              <p className="max-w-4xl font-display text-3xl font-medium leading-tight sm:text-5xl">
                I turn complex requirements into <span className="text-primary">clear systems</span> that perform reliably in the real world.
              </p>
              <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
                <Stat value="2+" label="Years engineering" />
                <Stat value="4" label="Cloud platforms" />
                <Stat value="Java + AI" label="Core focus" />
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <SectionHeading number="02" eyebrow="Technical toolkit" title="Built across the stack." description="A practical toolkit for shipping secure services, intelligent applications, and production-ready experiences." />
            <div className="mt-14 grid border-l border-t border-border md:grid-cols-2">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article key={group.title} className="group border-b border-r border-border p-6 transition-colors hover:bg-secondary/35 sm:p-8">
                    <div className="flex items-start justify-between">
                      <Icon className="size-7 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">0{skillGroups.indexOf(group) + 1}</span>
                    </div>
                    <h3 className="mt-8 font-display text-xl font-semibold">{group.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{group.subtitle}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => <span key={skill} className="rounded border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground">{skill}</span>)}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="experience" className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <SectionHeading number="03" eyebrow="Professional path" title="Experience that compounds." description="Enterprise engineering experience shaped by ownership, reliability, and continuous learning." />
            <ol className="relative mt-16 ml-2 border-l border-border lg:ml-[250px]">
              {experiences.map((item, index) => (
                <li key={item.company} className="relative pb-16 pl-8 last:pb-4 lg:pl-14">
                  <span className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-background bg-primary ring-4 ring-primary/10" />
                  <span className="mb-4 block font-mono text-xs font-semibold tracking-[0.12em] text-primary lg:absolute lg:-left-[250px] lg:top-1 lg:w-[190px]">{item.period}</span>
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{item.company}</p>
                  <ul className="mt-6 grid gap-3 text-sm leading-7 text-muted-foreground">
                    {item.details.map((detail) => <li key={detail} className="flex gap-3"><ChevronRight className="mt-1.5 size-4 shrink-0 text-primary" />{detail}</li>)}
                  </ul>
                </li>
              ))}
              <li className="relative pl-8 lg:pl-14">
                <span className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-background bg-accent-foreground ring-4 ring-accent-foreground/10" />
                <span className="mb-4 block font-mono text-xs font-semibold tracking-[0.12em] text-accent-foreground lg:absolute lg:-left-[250px] lg:top-1 lg:w-[190px]">DEC 2020 — MAY 2024</span>
                <GraduationCap className="mb-5 size-6 text-accent-foreground" />
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">B.Tech, Computer Science & Engineering</h3>
                <p className="mt-1 text-sm text-muted-foreground">G Pulla Reddy Engineering College · Kurnool</p>
                <div className="mt-6 flex flex-wrap gap-2"><Badge>Microsoft Azure DP-900</Badge><Badge>EPAM COE — Java</Badge></div>
              </li>
            </ol>
          </div>
        </section>

        <section id="projects" className="border-b border-border">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading number="04" eyebrow="Selected builds" title="Projects with purpose." description="From autonomous agents to production-minded full-stack platforms." />
              <div className="flex w-fit rounded-md border border-border bg-secondary/40 p-1" role="group" aria-label="Filter projects">
                {["All", "AI / ML", "Backend / Full Stack"].map((category) => (
                  <Button key={category} size="sm" variant={filter === category ? "default" : "ghost"} onClick={() => setFilter(category)} className="px-3 text-xs">{category}</Button>
                ))}
              </div>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {visibleProjects.map((project) => (
                <article key={project.id} className={`project-card project-${project.accent} group flex min-h-[370px] flex-col border border-border bg-card p-6 sm:p-8`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">{project.index} / 04</span>
                    <span className="rounded border border-current/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary">{project.category}</span>
                  </div>
                  <div className="my-10 flex size-14 items-center justify-center rounded-md border border-border bg-secondary/60 text-primary"><Terminal className="size-6" /></div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{project.kicker}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-muted-foreground">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <Button size="icon" variant="ghost" onClick={() => setProjectId(project.id)} aria-label={`View ${project.title}`} className="shrink-0 border border-border"><ArrowRight /></Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="tech-grid border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary"><Sparkles className="size-4" /> Start a conversation</div>
              <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">Have a complex problem worth solving?</h2>
              <p className="mt-6 max-w-lg leading-7 text-muted-foreground">I’m open to software engineering opportunities and thoughtful collaborations in backend, cloud, and applied AI.</p>
              <div className="mt-10 space-y-3">
                <ContactRow icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} copied={copied === "email"} onCopy={() => copyValue("email", EMAIL)} />
                <ContactRow icon={Phone} label="Phone" value={PHONE} href="tel:+918008381656" copied={copied === "phone"} onCopy={() => copyValue("phone", PHONE)} />
              </div>
            </div>
            <form onSubmit={submitContact} className="border border-border bg-card p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm"><span className="font-medium">Your name</span><Input required name="name" placeholder="Jane Smith" className="h-11" /></label>
                <label className="space-y-2 text-sm"><span className="font-medium">Email address</span><Input required type="email" name="email" placeholder="jane@company.com" className="h-11" /></label>
              </div>
              <label className="mt-5 block space-y-2 text-sm"><span className="font-medium">How can I help?</span><Textarea required name="message" placeholder="Tell me about the role, project, or idea…" className="min-h-36 resize-none" /></label>
              <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto"><Send /> Open email draft</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© 2026 Shaik Attar Sana</span><span>Built with care in Hyderabad, India.</span>
      </footer>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setProjectId(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
          {selectedProject && (
            <>
              <div className={`project-${selectedProject.accent} border-b border-border p-7 sm:p-10`}>
                <span className="font-mono text-xs text-primary">PROJECT {selectedProject.index}</span>
                <DialogHeader className="mt-8"><DialogTitle className="font-display text-3xl sm:text-4xl">{selectedProject.title}</DialogTitle><DialogDescription className="text-base">{selectedProject.kicker}</DialogDescription></DialogHeader>
              </div>
              <div className="p-7 sm:p-10">
                <p className="leading-7 text-muted-foreground">{selectedProject.description}</p>
                <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-primary">Key highlights</h4>
                <ul className="mt-4 space-y-3">{selectedProject.highlights.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul>
                <div className="mt-8 flex flex-wrap gap-2">{selectedProject.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
        <DialogContent className="resume-dialog max-h-[92vh] max-w-4xl overflow-y-auto p-0">
          <div className="resume-sheet bg-background p-7 sm:p-12">
            <div className="resume-actions mb-8 flex justify-end"><Button variant="outline" onClick={() => window.print()}><Printer /> Print / Save PDF</Button></div>
            <DialogHeader className="border-b border-border pb-7 text-left">
              <DialogTitle className="font-display text-4xl">Shaik Attar Sana</DialogTitle>
              <DialogDescription className="mt-2 text-base text-foreground">Software Engineer · Backend & GenAI Specialist</DialogDescription>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground"><span>Hyderabad, India</span><span>{EMAIL}</span><span>{PHONE}</span></div>
            </DialogHeader>
            <ResumeSection title="Profile"><p>Software Engineer with 2 years of experience in backend development and AI-powered application development. Experienced in Java, Spring Boot, Python, REST APIs, cloud platforms, and GenAI technologies including RAG and AI agents.</p></ResumeSection>
            <ResumeSection title="Experience">{experiences.map((item) => <div key={item.company} className="mb-6 last:mb-0"><div className="flex flex-wrap justify-between gap-2"><strong>{item.role} · {item.company}</strong><span className="font-mono text-xs text-muted-foreground">{item.period}</span></div><ul className="mt-2 list-disc space-y-1 pl-5">{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>)}</ResumeSection>
            <ResumeSection title="Selected Projects">{projects.map((project) => <p key={project.id} className="mb-3 last:mb-0"><strong>{project.title}:</strong> {project.description} <span className="text-muted-foreground">({project.tags.join(", ")})</span></p>)}</ResumeSection>
            <div className="grid gap-8 sm:grid-cols-2"><ResumeSection title="Education"><p><strong>B.Tech in Computer Science & Engineering</strong><br />G Pulla Reddy Engineering College<br /><span className="text-muted-foreground">Dec 2020 — May 2024</span></p></ResumeSection><ResumeSection title="Certifications"><p>Microsoft Azure Data Fundamentals (DP-900)</p><p>EPAM Center of Excellence — Java</p></ResumeSection></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <Button variant="outline" size="icon" asChild><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}>{children}</a></Button>;
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return <div><span className="font-mono text-xs text-primary">{number} / 05</span><h2 className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</h2></div>;
}

function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return <div className="max-w-3xl"><div className="flex items-center gap-3 font-mono text-xs text-primary"><span>{number} / 05</span><span className="h-px w-8 bg-primary/40" /><span className="uppercase tracking-[0.16em]">{eyebrow}</span></div><h2 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">{title}</h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">{description}</p></div>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div><div className="font-display text-3xl font-semibold text-accent-foreground">{value}</div><div className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</div></div>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded border border-border bg-secondary px-2.5 py-1.5 font-mono text-xs text-muted-foreground">{children}</span>;
}

function ProfilePhoto() {
  return (
    <div className="relative size-44 sm:size-52 lg:size-56">
      <div className="absolute -inset-5 rounded-full bg-primary/25 blur-3xl" aria-hidden />
      <div className="absolute inset-0 rounded-full p-[3px] [background:conic-gradient(from_180deg,var(--primary),oklch(0.68_0.16_285),var(--accent-foreground),var(--primary))]" aria-hidden>
        <div className="size-full rounded-full bg-card" />
      </div>
      <div className="absolute inset-[3px] overflow-hidden rounded-full border border-border/50">
        <img src={profileAsset.url} alt="Portrait of Shaik Attar Sana" className="size-full object-cover object-top" loading="eager" />
      </div>
      <span className="absolute bottom-1 right-1 size-5 rounded-full border-[3px] border-background bg-primary" aria-hidden />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href, copied, onCopy }: { icon: typeof Mail; label: string; value: string; href: string; copied: boolean; onCopy: () => void }) {
  return <div className="flex items-center gap-3 border-b border-border pb-3"><Icon className="size-4 text-primary" /><div className="min-w-0 flex-1"><div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div><a href={href} className="block truncate text-sm font-medium hover:text-primary">{value}</a></div><Button variant="ghost" size="icon" onClick={onCopy} aria-label={`Copy ${label}`} className="shrink-0">{copied ? <Check className="text-primary" /> : <Copy />}</Button></div>;
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-8 text-sm leading-6"><h3 className="mb-3 border-b border-border pb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">{title}</h3>{children}</section>;
}