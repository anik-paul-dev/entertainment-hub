import React, { useState, useEffect } from 'react';

const VisitorTracker = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [currentPageVisits, setCurrentPageVisits] = useState(0);

  useEffect(() => {
    // Initialize visitor tracking
    const trackVisit = () => {
      // Get current page visits from localStorage
      const pageVisits = localStorage.getItem('pageVisits');
      const currentVisits = pageVisits ? parseInt(pageVisits) + 1 : 1;
      localStorage.setItem('pageVisits', currentVisits.toString());
      setCurrentPageVisits(currentVisits);

      // Simulate total visitors (in real app, this would come from a backend)
      const totalVisitors = Math.floor(Math.random() * 10000) + 1000;
      setVisitorCount(totalVisitors);
    };

    trackVisit();

    // Update visitor count every 30 seconds (simulate real-time updates)
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="visitor-counter">
      <div className="d-flex flex-column align-items-center">
        <i className="fas fa-eye mb-1"></i>
        <div className="text-center">
          <small className="d-block">Visitors</small>
          <strong>{visitorCount.toLocaleString()}</strong>
        </div>
        <div className="text-center mt-1">
          <small className="d-block">Your visits</small>
          <strong>{currentPageVisits}</strong>
        </div>
      </div>
    </div>
  );
};

export default VisitorTracker;