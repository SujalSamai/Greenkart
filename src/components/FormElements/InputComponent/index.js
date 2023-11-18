export default function InputComponent({
  label,
  placeholder,
  type,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <p className="py-0 px-2 absolute -mt-3 mr-0 mb-0 ml-2 text-sm md:text-base font-medium text-secondary bg-white">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        min="0"
        className="placeholder-gray-400 border focus:outline-none focus:border-black w-full p-2 lg:p-4 mr-0 mt-0 ml-0 text-sm lg:text-base block bg-white border-gray-300 rounded-md"
      />
    </div>
  );
}
