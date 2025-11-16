import { useState } from "react";

interface ConditionGridProps {
  onGridChange?: (grid: number[][]) => void;
}

export default function ConditionGrid({ onGridChange }: ConditionGridProps) {
  const rows = 5;
  const cols = 5;

  const colors = ["bg-green-400", "bg-yellow-400", "bg-red-400"];
  const labels = ["Good", "Condition", "Poor"];

  const [grid, setGrid] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(0))
  );

  const handleClick = (r: number, c: number) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => [...row]);
      newGrid[r][c] = (newGrid[r][c] + 1) % 3;
      onGridChange?.(newGrid);
      return newGrid;
    });
  };

  return (
    <div className="py-4 sm:py-6 w-full  mx-auto">
      <h3 className="font-bold text-lg mb-4">Assign Condition</h3>

      <div
        className="grid gap-1 sm:gap-2 w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((colorIndex, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => handleClick(rIdx, cIdx)}
              className={`${colors[colorIndex]} cursor-pointer transition-all duration-300 hover:opacity-80 aspect-[4/3]`}
            ></div>
          ))
        )}
      </div>

      <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-4 h-4 rounded-sm ${c}`} />
            <span className="text-gray-700">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
