import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Form from "./components/Form.tsx";
import Table from "./components/Table.tsx";
import { Data } from "./components/types.ts";

function App() {
  const [rows, setRows] = useState<Data[]>([]);

  function addRow(entry: Data) {
    entry.key = crypto.randomUUID();
    setRows((prevRows) => {
      return [...prevRows, entry];
    });
  }

  function deleteRow(key: string) {
    setRows((prevRows) => {
      return prevRows.filter((row) => row.key !== key);
    });
  }

  return (
    <>
      <Form addRow={addRow} />
      <Table rows={rows} deleteRow={deleteRow} />
    </>
  );
}

export default App;
