import { Link } from "react-router";
import { CellValue, DataTable } from "../../plugins/datatables/datatables";
import useEmployeesStore from "../../stores/employeesStore";
// import Employees from "../../mocks/Employees";


function EmployeesPage() {
    const Employees = useEmployeesStore((state) => state.employees) as unknown as Record<string, CellValue>[]

    return (
        <div id="employee-div" className="w-full flex flex-col items-center">
            <h1 className="m-2 text-2xl">Current Employees</h1>
            <DataTable className="" data={Employees}></DataTable>
            <Link to="/" className="m-2 border border-gray-300 p-2 rounded bg-gray-700 hover:bg-gray-500">Home</Link>
        </div>
    )
}

export default EmployeesPage