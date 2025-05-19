import React from "react";
import "./ProcessingOverlay.css";

interface ProcessingOverlayProps {
  message?: string;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({
  message = "Baixando...",
}) => {
  return (
    <div className="processing-overlay">
      <div className="processing-popup">
        <div className="spinner" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
