import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type SortDirection = 'asc' | 'desc' | null

interface DataTableStore {
    searchTerm: string
    entriesAmount: number
    sortBy: string | null
    sortDirection: SortDirection
    currentPage: number
    setSearchTerm: (value: string) => void
    setEntriesAmount: (value: number) => void
    setSort: (column: string) => void
    setCurrentPage: (page: number) => void
}

export const useDataTableStore = create<DataTableStore>()(
    immer((set) => ({
        searchTerm: '',
        entriesAmount: 10,
        sortBy: null,
        sortDirection: null,
        currentPage: 1,
        setSearchTerm: (value) => set((state) => { state.searchTerm = value }),
        setEntriesAmount: (value) => set((state) => {
            state.entriesAmount = value
            state.currentPage = 1 // reset page on entries change
        }),
        setSort: (key) => set((state) => {
            if (state.sortBy === key) {
                state.sortDirection = state.sortDirection === 'asc' ? 'desc' : state.sortDirection === 'desc' ? null : 'asc'
                if (state.sortDirection === null) state.sortBy = null
            } else {
                state.sortBy = key
                state.sortDirection = 'asc'
            }
        }),
        setCurrentPage: (page) => set((state) => { state.currentPage = page }),
    }))
)