import { useEffect, useMemo, useState } from "react";
import { useDataTableStore } from "./store/datatableStore";
import decamelizeCapitalize from "./utils/decamelize";
import { useDebounce } from "./utils/useDebounce";



interface PageSelectorButtonProps {
    textDisplayed: string
    onClick?: () => void
}

type PageSelectorProps = {
    totalPages: number
}

// Safe typing for cell values
export type CellValue = string | number | boolean | Date | null | undefined;

// Generic props with type inference
export interface DataTableProps<T extends Record<string, CellValue>> {
    data: T[];
    className?: string;
}

const PageSelectorButton: React.FC<PageSelectorButtonProps> = ({ textDisplayed, onClick }) => {
    return (
        <button className="border border-gray-300 p-1 rounded" onClick={onClick}>
            {textDisplayed}
        </button>
    )
}

const PageSelector: React.FC<PageSelectorProps> = ({ totalPages }) => {
    const { currentPage, setCurrentPage } = useDataTableStore()
    const [localPageInput, setLocalPageInput] = useState(String(currentPage))

    useEffect(() => {
        setLocalPageInput(String(currentPage))
    }, [currentPage])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPageInput(e.target.value)
    }

    const handleInputBlur = () => {
        const value = Number(localPageInput)
        if (!isNaN(value) && value >= 1 && value <= totalPages) {
            setCurrentPage(value)
        } else {
            setLocalPageInput(String(currentPage))
        }
    }

    return (
        <div className="flex justify-evenly gap-2">
            <PageSelectorButton textDisplayed="1" onClick={() => setCurrentPage(1)} />
            <PageSelectorButton textDisplayed="Prev" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
            <input className="bg-white text-black text-center w-10" type="number" min={1} max={totalPages} value={localPageInput}
                onChange={handleInputChange} onBlur={handleInputBlur}
            ></input>
            <PageSelectorButton textDisplayed="Next" onClick={() => setCurrentPage(Math.min(totalPages > 0 ? totalPages : totalPages + 1, currentPage + 1))} />
            <PageSelectorButton textDisplayed={String(Math.max(totalPages, 1))} onClick={() => setCurrentPage(Math.min(totalPages > 0 ? totalPages : totalPages + 1))} />
        </div>
    )
}

export function DataTable<T extends Record<string, CellValue>>({
    data,
    className = "border border-gray-300",
}: DataTableProps<T>) {

    const {
        searchTerm,
        entriesAmount,
        sortBy,
        sortDirection,
        currentPage,
        setSearchTerm,
        setEntriesAmount,
        setSort,
        setCurrentPage
    } = useDataTableStore()

    const debouncedSearchTerm = useDebounce(searchTerm, 200)

    const filteredData = useMemo(() => {
        if (!debouncedSearchTerm) return data
        const lowerSearch = debouncedSearchTerm.toLowerCase()
        return data.filter((row) =>
            Object.values(row).some((cell) =>
                String(cell).toLowerCase().includes(lowerSearch)
            )
        )
    }, [data, debouncedSearchTerm])

    const sortedData = useMemo(() => {
        if (!sortBy) return filteredData
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortBy as keyof T]
            const bValue = b[sortBy as keyof T]
            if (aValue === bValue) return 0
            if (sortDirection === 'asc') return aValue! > bValue! ? 1 : -1
            return aValue! < bValue! ? 1 : -1
        })
    }, [filteredData, sortBy, sortDirection])

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * entriesAmount
        const end = start + entriesAmount
        return sortedData.slice(start, end)
    }, [sortedData, currentPage, entriesAmount])

    if (data.length === 0) return <p>No data to display.</p>;

    const columns = Object.keys(data[0]) as (keyof T)[];
    const totalPages = Math.ceil(filteredData.length / entriesAmount)

    return (
        <div className="">
            <div className="flex w-full justify-between mb-2 mt-2">
                <div>
                    Show
                    <select className="ml-1 mr-1" name="entriesAmount" id="entriesAmount" value={entriesAmount} onChange={(e) => setEntriesAmount(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    entries
                </div>
                <div className="flex">
                    <p className="mr-1">Search : </p>
                    <input className="bg-white text-black pl-1 rounded" type="search" value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }
                        } />
                </div>
            </div>
            <table className={className}>
                <thead>
                    <tr className="border border-gray-300">
                        {columns.map((key) => (
                            <th key={String(key)} className="border border-gray-300 p-1" onClick={() => setSort(String(key))}>{decamelizeCapitalize(String(key), ' ')}{sortBy === key ? (
                                <span>
                                    {sortDirection === 'asc'
                                        ? '⭡'
                                        : sortDirection === 'desc'
                                            ? '⭣'
                                            : '⭥'}
                                </span>)
                                : <span>
                                    ⭥
                                </span>
                            }</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((key) => (
                                <td key={String(key)} className="border border-gray-300 p-1">
                                    {formatCell(row[key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex w-full mt-2 justify-between">
                <div>
                    {filteredData.length === 0 ? (
                        <>No corresponding entry</>
                    ) : (
                        <>
                            Showing {(currentPage - 1) * entriesAmount + 1} to{" "}
                            {Math.min(filteredData.length, currentPage * entriesAmount)} of{" "}
                            {filteredData.length} entr
                            {filteredData.length > 1 ? "ies" : "y"}
                        </>
                    )}
                </div>
                <PageSelector totalPages={totalPages} />
            </div>
        </div>
    );
}

// Fonction de rendu simple des cellules
function formatCell(value: CellValue): string {
    if (value instanceof Date) return value.toLocaleDateString();
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value === null || value === undefined) return "";
    return String(value);
}