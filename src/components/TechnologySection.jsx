import React from 'react';
import { Server, Database, Code, Cpu, Wrench } from 'lucide-react';

const TechnologySection = () => {
  const techGroups = [
    {
      title: 'Backend Engineering',
      icon: Server,
      color: '#2563eb',
      bg: '#eff6ff',
      items: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'JWT Authentication']
    },
    {
      title: 'Database & Persistence',
      icon: Database,
      color: '#059669',
      bg: '#dcfce7',
      items: ['MySQL 8 Relational DB', 'Hibernate ORM', 'Schema Migrations', 'Connection Pooling', 'Transactional Control']
    },
    {
      title: 'Frontend UI/UX',
      icon: Code,
      color: '#7c3aed',
      bg: '#f3e8ff',
      items: ['React.js v18', 'Vite Build Tool', 'React Router v6', 'Axios Client', 'Responsive CSS3']
    },
    {
      title: 'AI & Tools',
      icon: Cpu,
      color: '#d97706',
      bg: '#fffbeb',
      items: ['Skill Match Algorithm', 'IntelliJ IDEA', 'Postman API Testing', 'Git & GitHub Versioning']
    }
  ];

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          FULL-STACK PORTFOLIO ARCHITECTURE
        </span>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '0.3rem' }}>
          Built With Modern Technology
        </h2>
      </div>

      <div className="grid-4">
        {techGroups.map((group, idx) => {
          const IconComponent = group.icon;
          return (
            <div key={idx} className="card" style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ width: '48px', height: '48px', background: group.bg, color: group.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <IconComponent size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                {group.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {group.items.map((tech, i) => (
                  <span key={i} className="badge badge-jobtype" style={{ fontSize: '0.75rem', textTransform: 'none', fontWeight: 600 }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechnologySection;
