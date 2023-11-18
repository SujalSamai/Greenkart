export default function SelectComponent({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="relative">
      <p className="py-0 px-2 -mt-3 mr-0 mb-0 ml-2 absolute font-medium text-secondary bg-white">
        {label}
      </p>
      <select
        value={value}
        onChange={onChange}
        className="placeholder-gray-400 border focus:outline-none focus:border-black w-full p-4 mr-0 mt-0 ml-0 text-sm lg:text-base block bg-white border-gray-300 rounded-md"
      >
        {options && options.length ? (
          options.map((optionItem) => (
            <option
              id={optionItem.id}
              value={optionItem.id}
              key={optionItem.id}
            >
              {optionItem.label}
            </option>
          ))
        ) : (
          <option id="" value={""}>
            Select
          </option>
        )}
      </select>
    </div>
  );
}
