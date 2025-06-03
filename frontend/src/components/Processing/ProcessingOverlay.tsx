import React from "react";
import "./ProcessingOverlay.css";

interface ProcessingOverlayProps {
  message?: string;
  progress?: number;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  message = "Baixando...",
  progress,
}) => {
  return (
    <div className="processing-overlay">
      <div className="processing-popup">
        <div className="spinner" />
        <p>{message}</p>
        {progress !== undefined && (
          <p className="processing-progress">{progress}% concluído</p>
        )}
      </div>
    </div>
  );
};

export default ProcessingOverlay;