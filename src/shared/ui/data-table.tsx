"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    VisibilityState
} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {Button} from "@/shared/ui/button";
import {ChevronLeft, ChevronRight, Filter, Trash} from "lucide-react";
import {useState} from "react";
import {Input} from "@/shared/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import {Skeleton} from "@/shared/ui/skeleton";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading: boolean,
    // onDelete: (data: TData[]) => void
    onRowClick?: () => void
    setData?: (data: TData) => void,
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             isLoading,
                                             // onDelete,
                                             onRowClick,
                                             setData
                                         }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,

        state: {
            columnFilters,
            columnVisibility,
            rowSelection
        },
    })
    const [filterColumn, setFilterColumn] = useState<string>(table.getAllColumns()[1].id)
    return (
        <div className="max-w-full h-full">
            <div className="flex gap-x-2 items-center py-4">
                <Input
                    placeholder="Search"
                    value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-full md:w-[250px]"
                />
                <div className="flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="border-dashed">
                                <Filter strokeWidth={1.75} className="w-3.5 h-3.5 mr-2"/>
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .map((column) => {
                                    console.log(table.getHeaderGroups())
                                    return (
                                        column.getCanFilter() && (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.id === filterColumn}
                                                onCheckedChange={() => setFilterColumn(column.id)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    );
                                })}

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {table.getFilteredSelectedRowModel().rows.length !== 0 &&
                    // onClick={() => onDelete(table.getFilteredSelectedRowModel().rows.map(item => item.original))}
                    <Button size="sm"
                            ><Trash
                        className="h-4 w-4"/></Button>}
            </div>
            <div className="border rounded-md">
                {isLoading ? <Skeleton className="w-full h-[200px]"/> : (
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="hover:cursor-pointer"
                                        onClick={() => {
                                            if (onRowClick && setData) {
                                                onRowClick()
                                                setData(row.original)
                                            }
                                        }}
                                        // onClick={() => {
                                        //     onRowClick()
                                        //     setCar(row.original)
                                        // }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.75}/> Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next <ChevronRight className="h-4 w-4" strokeWidth={1.75}/>
                </Button>
            </div>
        </div>
    )
}