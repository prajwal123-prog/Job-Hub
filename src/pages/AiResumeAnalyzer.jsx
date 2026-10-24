import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';

const AiResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState({
    score: 87,
    targetRole: 'Java Developer',
    strengths: [
      'Good technical skills in Java, Spring Boot, MySQL',
      'Relevant backend software engineering experience',
      'Clean structure with clear project summaries'
    ],
    recommendations: [
      'Add Docker and Microservices to expand cloud coverage',
      'Include AWS Cloud certifications if completed',
      'Quantify achievements in project bullet points (e.g. Improved query performance by 40%)'
    ]
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles color="#38bdf8" size={28} /> AI Resume Analyzer
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Upload your resume and get instant AI-powered feedback & ATS match report</p>
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="card-widget" style={{ textAlign: 'center', padding: '3rem 2rem', marginBottom: '2rem', border: '2px dashed #cbd5e1' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
          <Upload size={32} />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Drag & drop your resume here</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.4rem 0 1.5rem' }}>Supports PDF, DOCX (Max size: 5MB)</p>

        <label className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          Choose File
          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>

        {file && (
          <p style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600, marginTop: '1rem' }}>
            ✓ Selected: {file.name}
          </p>
        )}
      </div>

      {/* Analysis Report Section */}
      {analyzing ? (
        <div className="card-widget" style={{ textAlign: 'center', padding: '3rem' }}>
          <Sparkles size={40} className="spin" color="#2563eb" style={{ marginBottom: '1rem' }} />
          <h3>AI Engine Analyzing Resume...</h3>
          <p style={{ color: 'var(--text-muted)' }}>Extracting skills, ATS compliance, and job match percentages...</p>
        </div>
      ) : (
        <div className="card-widget">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Analysis Report</h3>
            <span className="badge" style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.85rem' }}>
              Role: {report.targetRole}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="progress-circle" style={{ width: '120px', height: '120px' }}>
                <div className="progress-circle-inner" style={{ width: '96px', height: '96px', fontSize: '1.75rem' }}>
                  {report.score}%
                </div>
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '1rem' }}>Overall Match Score</h4>
              <p style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>Target: {report.targetRole}</p>
            </div>

            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#059669', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={18} /> Strengths
                </h4>
                <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {report.strengths.map((str, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: '#059669', fontWeight: 800 }}>✓</span> {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#d97706', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertCircle size={18} /> AI Recommendations
                </h4>
                <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {report.recommendations.map((rec, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: '#d97706', fontWeight: 800 }}>+</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiResumeAnalyzer;
