import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters." })
    .max(50),
  amount: z
    .number({ invalid_type_error: "A number amount is required." })
    .positive()
    .min(0.01)
    .max(10000),
  category: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  addRow: (data: FormData) => void;
}

export default function Form({ addRow }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("Submiting the form:", data);
    addRow(data);
    reset();
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            className="form-control"
            id="description"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        {/* amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="float"
            className="form-control"
            id="amount"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        {/* category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            className="form-select"
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option defaultValue="">Choose...</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <div id="categoryHelp" className="form-text">
            Select a category.
          </div>
        </div>
        <button
          disabled={!isValid || !selectedCategory}
          type="submit"
          className="btn btn-primary mb-5"
        >
          Submit
        </button>
      </form>
    </>
  );
}
