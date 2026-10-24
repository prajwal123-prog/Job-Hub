import React from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import LatestJobs from '../components/LatestJobs';
import Categories from '../components/Categories';
import AIRecommendation from '../components/AIRecommendation';
import HowItWorks from '../components/HowItWorks';
import RecruiterCTA from '../components/RecruiterCTA';

const Home = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <Hero />
      <StatsSection />
      <LatestJobs />
      <Categories />
      <AIRecommendation />
      <HowItWorks />
      <RecruiterCTA />
    </div>
  );
};

export default Home;
