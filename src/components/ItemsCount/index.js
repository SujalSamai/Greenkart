"use client";

export default function ItemsCount({ count, setCount }) {
  function handleIncrement() {
    setCount((count) => count + 1);
  }
  function handleDecrement() {
    setCount((count) => count - 1);
  }

  return (
    <div className="w-5/12 flex items-center justify-between mx-auto">
      <button
        className="text-lg font-bold border border-gray-400 flex items-center justify-center w-4/12 px-2 py-1"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="text-lg font-bold border border-gray-400 flex items-center justify-center w-4/12 px-2 py-1">
        {count < 1 ? setCount(1) : count}
      </span>
      <button
        className="text-lg font-bold border border-gray-400 flex items-center justify-center w-4/12 px-2 py-1"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
