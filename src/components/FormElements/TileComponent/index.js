export default function TileComponent({ data, selected = [], onClick }) {
  return data && data.length ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map((dataItem) => (
        <label
          className="cursor-pointer"
          key={dataItem.id}
          onClick={() => onClick(dataItem)}
        >
          <span
            className={`rounded-md border border-secondary px-3 sm:px-4 py-2 font-bold ${
              selected &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                ? "text-primary bg-secondary"
                : "text-secondary bg-white"
            }`}
          >
            {dataItem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}
