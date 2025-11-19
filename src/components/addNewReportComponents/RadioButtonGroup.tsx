// Reusable Radio Button Group Component
export function RadioButtonGroup({
  options = [
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' }
  ],
  value,
  onChange,
  name
}) {
  return (
    <div className="flex ">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-6 py-2 rounder font-medium text-sm transition-all ${
            value === option.value
              ? 'bg-[#0d5c87] rounded-sm text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}