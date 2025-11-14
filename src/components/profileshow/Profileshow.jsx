
import React from 'react';
import './Profileshow.css';
import {
  Code,
  Server,
  Database,
  Terminal,
  Layers,
  Award,
  Github,
  BookOpen,
} from 'lucide-react';

export default function TechCertShowcase() {
  const technologies = [
    { key: 'react', label: 'React', desc: 'UI library (React.js)', icon: Code },
    { key: 'javascript', label: 'JavaScript', desc: 'ES6+, DOM, tooling', icon: Code },
    { key: 'html', label: 'HTML5', desc: 'Semantic markup', icon: BookOpen },
    { key: 'css', label: 'CSS', desc: 'Layout & responsive design', icon: BookOpen },
    { key: 'tailwind', label: 'Tailwind CSS', desc: 'Utility-first CSS framework', icon: Layers },
    { key: 'git', label: 'Git & GitHub', desc: 'Version control & repos', icon: Github },
    { key: 'postman', label: 'Postman', desc: 'API testing', icon: Terminal },
    { key: 'sql', label: 'MySQL / SQL', desc: 'Relational databases', icon: Database },
    { key: 'languages', label: 'C / C++', desc: 'Core programming languages', icon: Code },
  ];

  const certificates = [
    {
      id: 1,
      title: 'React Certification',
      issuer: 'Udemy',
      date: 'Completed',
      badge: 'Udemy',
    },
    {
      id: 2,
      title: 'JavaScript Certification',
      issuer: 'Udemy',
      date: 'Completed',
      badge: 'Udemy',
    },
    {
      id: 2,
      title: 'React Native Certification',
      issuer: 'Udemy',
      date: 'Completed',
      badge: 'Udemy',
    },
    // keep any previously-present certs if you want them retained (example below)
    // { id: 3, title: 'Data Analytics Professional', issuer: 'Coursera', date: '2025-03', badge: 'PRO' },
  ];

  return (
    <section className="tc-container">
      <div className="tc-panel">
        <div className="card" role="region" aria-label="Technologies and tools">
          <div className="header">
            <div className="icon-wrap float" aria-hidden>
              <Code size={20} />
            </div>
            <div>
              <div className="title">Technologies & Tools</div>
              <div className="subtitle">Tools I use day to day. Hover or keyboard-focus for animations.</div>
            </div>
          </div>

          <div className="tech-grid" role="list">
            {technologies.map((t) => {
              const Icon = t.icon;
              return (
                <article
                  key={t.key}
                  className="tech-item"
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${t.label} — ${t.desc}`}
                >
                  <div className="icon-wrap" aria-hidden>
                    <Icon size={20} />
                  </div>
                  <div className="tech-label">{t.label}</div>
                  <div className="tech-desc">{t.desc}</div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="card" role="region" aria-label="Certifications">
          <div className="header">
            <div className="icon-wrap float" aria-hidden>
              <Award size={20} />
            </div>
            <div>
              <div className="title">Certifications</div>
              <div className="subtitle">Verified certificates and courses I've completed.</div>
            </div>
          </div>

          <div className="cert-list">
            {certificates.map((c) => (
              <div key={c.id} className="cert-card">
                <div className="icon-wrap" style={{ width: 48, height: 48 }} aria-hidden>
                  <BookOpen size={22} />
                </div>
                <div className="cert-meta">
                  <div className="cert-title">{c.title}</div>
                  <div className="cert-sub">{c.issuer} • {c.date}</div>
                </div>
                <div className="cert-badge" aria-hidden>{c.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
