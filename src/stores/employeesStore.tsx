import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import Employee from '../types/Employee'

type EmployeesStore = {
    employees: Employee[]
    addEmployee: (newEmployee: Employee) => void
}

const useEmployeesStore = create<EmployeesStore>()(
    immer((set) => ({
        employees: [],
        addEmployee: (newEmployee) =>
            set((state) => {
                state.employees.push(newEmployee)
            }),
    }))
)

export default useEmployeesStore