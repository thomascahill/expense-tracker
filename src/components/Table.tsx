import { Data } from "./types.ts";
import { useState, useEffect } from "react";

interface Props {
  rows: Data[];
  deleteRow: (key: string) => void;
}

export default function Table({ rows, deleteRow }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredRows, setFilteredRows] = useState<Data[]>([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (selectedCategory == "") {
      setFilteredRows(rows);
      setSum(rows.reduce((acc, obj) => acc + obj.amount, 0));
    } else {
      const filtered = rows.filter((row) => row.category == selectedCategory);
      setFilteredRows(filtered);
      setSum(filtered.reduce((acc, obj) => acc + obj.amount, 0));
    }
  }, [selectedCategory, rows]);

  let row = filteredRows.map((data: Data) => {
    const key = data.key || ""; // Ensure that key is defined or set to an empty string if it's undefined.
    return (
      <tr key={key}>
        <td>{data.description}</td>
        <td>{"$" + data.amount}</td>
        <td>{data.category}</td>
        <td>
          <button
            onClick={() => deleteRow(key)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    setSelectedCategory(value);
  }

  return (
    <>
      {/* filter-select category */}

      <div className="mb-3">
        <select
          onChange={handleChange}
          className="form-select"
          id="filter-category"
          value={selectedCategory}
        >
          <option value="">category...</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {/* Table */}

      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
          <thead>
            <tr>
              <th>Total</th>
              <th>{"$" + sum.toFixed(2)}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
      {!rows.length && (
        <div className="d-flex justify-content-center">No data to display.</div>
      )}
    </>
  );
}
