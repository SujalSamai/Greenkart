export default function InputComponent({
  label,
  placeholder,
  type,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <p className="py-0 px-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-[#295339] bg-white">
        {label}
      </p>
      <input
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        className="placeholder-gray-400 border focus:outline-none focus:border-black w-full p-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
      />
    </div> 
  );
}
