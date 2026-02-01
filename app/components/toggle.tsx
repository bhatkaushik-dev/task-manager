const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition ${
      checked ? "bg-[#44af69]" : "bg-[#dbd5b5]"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-5 w-5 border bg-white rounded-full transition-transform ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </button>
);

export default Toggle;
