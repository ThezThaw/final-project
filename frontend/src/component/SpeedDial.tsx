import React, { useState } from 'react';
import './SpeedDial.css';

interface SpeedDialProps {
    actions: { icon: string; name: string; onClick: () => void };
}

const SpeedDial: React.FC<SpeedDialProps> = ({ actions }) => {

  return (
    <div className="speed-dial">
      <button
        className="btn btn-secondary fab"
        onClick={actions.onClick}
        aria-label="Speed Dial"
      >
        <i className={actions.icon}></i>
      </button>
    </div>
  );
};

export default SpeedDial;