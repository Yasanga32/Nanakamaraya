"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Sliders } from "lucide-react";

interface SpecsBuilderProps {
  specs: Record<string, string>;
  onChange: (newSpecs: Record<string, string>) => void;
}

interface SpecRow {
  key: string;
  value: string;
}

export const SpecsBuilder: React.FC<SpecsBuilderProps> = ({ specs, onChange }) => {
  const [rows, setRows] = useState<SpecRow[]>([]);

  // Initialize internal rows from parent specs object
  useEffect(() => {
    const formattedRows = Object.entries(specs || {}).map(([key, value]) => ({
      key,
      value: String(value)
    }));

    // If empty, set a default row for quick entry
    if (formattedRows.length === 0) {
      setRows([{ key: "Material", value: "" }]);
    } else {
      setRows(formattedRows);
    }
  }, [specs]);

  const updateParent = (updatedRows: SpecRow[]) => {
    setRows(updatedRows);
    const newSpecs: Record<string, string> = {};
    updatedRows.forEach(r => {
      if (r.key.trim()) {
        newSpecs[r.key.trim()] = r.value;
      }
    });
    onChange(newSpecs);
  };

  const handleRowChange = (index: number, field: "key" | "value", val: string) => {
    const updated = [...rows];
    updated[index][field] = val;
    updateParent(updated);
  };

  const handleAddRow = (defaultKey = "") => {
    const updated = [...rows, { key: defaultKey, value: "" }];
    updateParent(updated);
  };

  const handleRemoveRow = (index: number) => {
    const updated = rows.filter((_, idx) => idx !== index);
    updateParent(updated);
  };

  const PRESETS = ["Material", "Dimensions", "Finish", "Warranty", "Usage", "Features"];

  return (
    <div className="space-y-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-red-600" />
          <span>Product Specifications</span>
        </label>
        
        <button
          type="button"
          onClick={() => handleAddRow()}
          className="text-[11px] font-bold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>Add Spec Row</span>
        </button>
      </div>

      {/* Rows Container */}
      <div className="space-y-2">
        {rows.map((row, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              value={row.key}
              onChange={(e) => handleRowChange(idx, "key", e.target.value)}
              placeholder="e.g. Material / Dimensions"
              className="w-1/3 p-2 bg-white border border-gray-300 rounded-md text-xs font-semibold focus:ring-1 focus:ring-red-600 focus:outline-none"
            />
            <span className="text-gray-400 font-bold">:</span>
            <input
              type="text"
              value={row.value}
              onChange={(e) => handleRowChange(idx, "value", e.target.value)}
              placeholder="e.g. Carbon Steel / 2900mm x 160mm"
              className="flex-1 p-2 bg-white border border-gray-300 rounded-md text-xs font-semibold focus:ring-1 focus:ring-red-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleRemoveRow(idx)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Remove specification"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick Add Preset Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        <span className="text-[10px] text-gray-400 font-medium">Quick add spec:</span>
        {PRESETS.map((preset) => {
          const exists = rows.some(r => r.key.toLowerCase() === preset.toLowerCase());
          if (exists) return null;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => handleAddRow(preset)}
              className="text-[10px] bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 px-2 py-0.5 rounded transition-colors"
            >
              + {preset}
            </button>
          );
        })}
      </div>
    </div>
  );
};
