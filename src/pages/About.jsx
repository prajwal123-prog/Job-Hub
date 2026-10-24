import React from 'react';
import AboutHero from '../components/AboutHero';
import MissionSection from '../components/MissionSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import CandidateFeatures from '../components/CandidateFeatures';
import RecruiterFeatures from '../components/RecruiterFeatures';
import AISection from '../components/AISection';
import ApplicationTracking from '../components/ApplicationTracking';
import TechnologySection from '../components/TechnologySection';
import SecuritySection from '../components/SecuritySection';
import ValuesSection from '../components/ValuesSection';
import FutureVision from '../components/FutureVision';
import CTASection from '../components/CTASection';

const About = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <AboutHero />
      <MissionSection />
      <ProblemSection />
      <SolutionSection />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <CandidateFeatures />
        <RecruiterFeatures />
      </div>

      <AISection />
      <ApplicationTracking />
      <TechnologySection />
      <SecuritySection />
      <ValuesSection />
      <FutureVision />
      <CTASection />
    </div>
  );
};

export default About;
