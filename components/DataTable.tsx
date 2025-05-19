import { ReactNode } from "react";
import clsx from "clsx";

export interface Column<T> {
  id?: keyof T;
  label: string;
  bold?: boolean;
  render?: (value: T[keyof T] | undefined, row: T) => ReactNode;
  type?: "actions";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data?: T[] | null;
}

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => (
  <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col, idx) => (
            <th
              key={idx}
              scope="col"
              className={clsx(
                col.bold
                  ? "py-3.5 pr-3 pl-4 sm:pl-6"
                  : col.type === "actions"
                    ? "relative py-3.5 pr-4 pl-3 sm:pr-6"
                    : "px-3 py-3.5",
                "text-left text-sm font-semibold text-gray-900",
              )}
            >
              {col.type === "actions" ? (
                <span className="sr-only">Actions</span>
              ) : (
                col.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data?.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, idx) => {
              if (col.type === "actions" && col.render) {
                return (
                  <td
                    key={idx}
                    className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6"
                  >
                    {col.render(undefined, row)}
                  </td>
                );
              }

              const value = col.id ? row[col.id] : undefined;
              return (
                <td
                  key={idx}
                  className={clsx(
                    col.bold
                      ? "py-4 pr-3 pl-4 font-medium text-gray-900 sm:pl-6"
                      : "px-3 py-4  text-gray-500",
                    "text-sm whitespace-nowrap",
                  )}
                >
                  {col.render ? col.render(value, row) : (value as ReactNode)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
