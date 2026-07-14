import React, { useEffect, useState } from 'react';

interface CaseStudy {
  id: string | number;
  title: string;
  subtitle?: string;
  description: string;
  category?: string;
  tags?: string[];
}

export default function App() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTag, setActiveTag] = useState<string>('All');

  useEffect(() => {
    fetch('/case_studies.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCaseStudies(data);
        } else if (data && Array.isArray(data.case_studies)) {
          setCaseStudies(data.case_studies);
        } else {
          throw new Error("JSON structure invalid.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load layout data.");
        setLoading(false);
      });
  }, []);

  // Extract all unique tags dynamically for the filter row
  const allTags = ['All', ...new Set(caseStudies.flatMap(study => study.tags || []))];

  // Separate Soft Skills cards from the rest of the portfolio items
  const softSkillsItems = caseStudies.filter(
    item => item.category?.toLowerCase().includes('skill') || item.category?.toLowerCase().includes('soft')
  );

  const starStoriesItems = caseStudies.filter(
    item => !item.category?.toLowerCase().includes('skill') && !item.category?.toLowerCase().includes('soft')
  );

  const filteredStarStories = activeTag === 'All' 
    ? starStoriesItems 
    : starStoriesItems.filter(item => item.tags?.includes(activeTag));

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', padding: '3rem 2rem' }}>
      
      {/* SECTION 1: SOFT SKILLS IN ACTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 4rem auto' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1.5rem' }}>
          Soft Skills in Action
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {softSkillsItems.map((study, idx) => (
            <div 
              key={study.id || `soft-${idx}`} 
              style={{ 
                backgroundColor: '#0f172a', // Matched exactly to the STAR stories card background
                border: '1px solid #1e293b',  // Matched exactly to the STAR stories card border
                borderRadius: '16px', 
                padding: '2rem', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#3b82f6', fontSize: '1.2rem' }}>•</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                  {study.title}
                </h3>
              </div>
              <p style={{ color: '#ffffff', fontSize: '1.05rem', lineHeight: '1.6', fontWeight: '400', margin: 0 }}>
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: STAR STORIES FILTERS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '2rem' }}>
          STAR Stories
        </h2>

        {/* High Contrast Filter Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '2rem' }}>
          {allTags.map((tag, idx) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={idx}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? '#1e40af' : '#111827', 
                  color: 'rgba(255, 255, 255, 1)', // Forced pure, solid white lettering for ALL tags
                  border: isActive ? '2px solid #3b82f6' : '1px solid #475569',
                }}
              >
                {tag === 'All' ? '[ All ]' : `#${tag}`}
              </button>
            );
          })}
        </div>

        {/* STAR Stories Grid Display */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredStarStories.map((study, idx) => (
            <div 
              key={study.id || `star-${idx}`} 
              style={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b', 
                borderRadius: '16px', 
                padding: '2rem' 
              }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.5rem' }}>
                {study.title}
              </h3>
              {study.subtitle && (
                <h4 style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '1rem' }}>
                  {study.subtitle}
                </h4>
              )}
              <p style={{ color: '#ffffff', lineHeight: '#ffffff', fontSize: '1rem' }}>
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}