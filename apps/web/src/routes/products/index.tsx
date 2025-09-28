import MaxWidthWrapper from "@/components/max-width-wrapper";
import { allProductQueries } from "@/hooks/use-products";
import type { Product } from "@/types/product-schema";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem } from "@tanstack/match-sorter-utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import React from "react";
export const Route = createFileRoute("/products/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const products = await queryClient.ensureQueryData(
      allProductQueries.getAllProductsQuery()
    );
    return { products };
  },
  component: RouteComponent,
});

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function RouteComponent() {
  const { products } = Route.useRouteContext();
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo<ColumnDef<Product, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        filterFn: "fuzzy", //note: normal non-fuzzy filter column - exact match required
      },
      {
        accessorFn: (row) => `${row.name}`,
        id: "name",
        header: "Name",
        cell: (info) => info.getValue(),
        filterFn: "fuzzy",
      },
      {
        accessorKey: "productType",
        header: "Type",
        cell: (info) => info.getValue(),
        filterFn: "equalsString", //note: normal non-fuzzy filter column - case sensitive
      },
      {
        id: "pricePerUnit",
        header: "Price / Unit",
        cell: (info) => info.getValue(),
        accessorFn: (row) => Number(row.pricePerUnit),
        filterFn: "equals",
      },
      {
        accessorKey: "symbol",
        id: "symbol",
        header: "Symbol",
      },
    ],
    []
  );
  const [data, setData] = React.useState<Product[]>(products);
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <MaxWidthWrapper className="p-6 ">
      <div className="bg-slate-50 p-6 rounded-xl border border-[color:var(--border)]">
        <div>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="w-full p-3 bg-white text-[color:var(--foreground)] rounded-lg border border-[color:var(--border)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent outline-none"
            placeholder="Search all columns..."
          />
        </div>
        <div className="h-4" />
        <div className="overflow-x-auto rounded-lg border border-[color:var(--border)]">
          <table className="w-full text-sm text-[color:var(--foreground)]">
            <thead className="bg-[color:var(--secondary)] text-[color:var(--secondary-foreground)]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-4 py-3 text-left border-b border-[color:var(--border)]"
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none hover:text-[color:var(--primary)] transition-colors"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            {header.column.getCanFilter() ? (
                              <div className="mt-2">
                                <Filter column={header.column} />
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className="hover:bg-[color:var(--muted)] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => {
                      {
                        console.log(cell.row.original.id);
                      }
                      return (
                        <td key={cell.id} className="px-4 py-3">
                          <Link
                            to="/products/$id"
                            params={{ id: cell.row.original.id }}
                            className="text-gray-700 hover:underline"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="h-4" />
        <div className="flex flex-wrap items-center gap-2 text-[color:var(--foreground)]">
          <button
            className="px-3 py-1 bg-[color:var(--muted)] rounded-md hover:bg-[color:var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed border border-[color:var(--border)]"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="px-3 py-1 bg-[color:var(--muted)] rounded-md hover:bg-[color:var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed border border-[color:var(--border)]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="px-3 py-1 bg-[color:var(--muted)] rounded-md hover:bg-[color:var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed border border-[color:var(--border)]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="px-3 py-1 bg-[color:var(--muted)] rounded-md hover:bg-[color:var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed border border-[color:var(--border)]"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 px-2 py-1 bg-white rounded-md border border-[color:var(--border)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent outline-none"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="px-2 py-1 bg-white rounded-md border border-[color:var(--border)] focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent outline-none"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 text-[color:var(--muted-foreground)]">
          {table.getPrePaginationRowModel().rows.length} Rows
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => rerender()}
            className="px-4 py-2 bg-[color:var(--primary)] text-[color:var(--primary-foreground)] rounded-md hover:bg-[color:var(--secondary)] hover:text-[color:var(--secondary-foreground)] transition-colors"
          >
            Force Rerender
          </button>
        </div>
        <pre className="mt-4 p-4 bg-white rounded-lg text-[color:var(--muted-foreground)] overflow-auto border border-[color:var(--border)]">
          {JSON.stringify(
            {
              columnFilters: table.getState().columnFilters,
              globalFilter: table.getState().globalFilter,
            },
            null,
            2
          )}
        </pre>
      </div>
    </MaxWidthWrapper>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      className="w-full px-2 py-1 bg-slate-50 text-black rounded-md border border-gray-600 focus:ring-2 focus:ring-[color:var(--primary)] focus:border-transparent outline-none"
    />
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
