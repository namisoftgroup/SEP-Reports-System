import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

// Success Toast Component
export function CustomToastSuccess({ isVisible, onClose }) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="w-full h-screen bg-transparent flex items-center justify-center p-4 absolute top-0 right-0 left-0 bottom-0">
      {isVisible && (
        <div className="animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                {/* Animated rays */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 140 140"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  {/* Outer rays - animated */}
                  <g className="animate-pulse">
                    <line x1="70" y1="15" x2="70" y2="30" />
                    <line x1="70" y1="110" x2="70" y2="125" />
                    <line x1="15" y1="70" x2="30" y2="70" />
                    <line x1="110" y1="70" x2="125" y2="70" />
                  </g>

                  {/* Diagonal rays - staggered animation */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <line x1="28.5" y1="28.5" x2="39.6" y2="39.6" />
                    <line x1="100.4" y1="100.4" x2="111.5" y2="111.5" />
                    <line x1="111.5" y1="28.5" x2="100.4" y2="39.6" />
                    <line x1="39.6" y1="100.4" x2="28.5" y2="111.5" />
                  </g>

                  {/* Inner rays */}
                  <g
                    className="animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <line x1="49" y1="30" x2="58" y2="42" />
                    <line x1="91" y1="98" x2="82" y2="110" />
                    <line x1="30" y1="49" x2="42" y2="58" />
                    <line x1="98" y1="91" x2="110" y2="82" />
                    <line x1="30" y1="91" x2="42" y2="82" />
                    <line x1="110" y1="58" x2="98" y2="49" />
                    <line x1="91" y1="42" x2="82" y2="30" />
                    <line x1="58" y1="98" x2="49" y2="110" />
                  </g>

                  {/* Checkmark */}
                  <polyline
                    points="50,75 65,90 95,50"
                    className="animate-scale"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Saved successfully!
            </h2>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale {
          from {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
            opacity: 0;
          }
          to {
            stroke-dasharray: 50;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-scale {
          animation: scale 0.6s ease-out 0.3s forwards;
        }

        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

// Success Toast Component
export function CustomToastFail({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="w-full h-screen bg-transparent flex items-center justify-center p-4 absolute top-0 right-0 left-0 bottom-0">
      {isVisible && (
        <div className="animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              {/* Animated rays */}
              <Trash2 className="text-red-500 text-center" size={100} />
            </div>

            {/* Text */}
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Are You Sure!!
            </h2>
            <p>you want to delete this Report</p>
            <div className="flex gap-2 py-2">
              <Button onClick={()=> onClose()} className="flex-1" variant="outline">Cancel</Button>
              <Button onClick={()=> onClose()} variant="destructive">sure</Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scale {
          from {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
            opacity: 0;
          }
          to {
            stroke-dasharray: 50;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-scale {
          animation: scale 0.6s ease-out 0.3s forwards;
        }

        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
