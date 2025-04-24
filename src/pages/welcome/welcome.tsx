import { Link } from "react-router";
import NewEmployeeForm from "../../components/NewEmployeeForm";


export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-8 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1 className="text-4xl">Welcome to HRnet Intra</h1>
        </header>
        <Link to="/employees-list" className="rounded-xl border p-3 bg-gray-700 hover:bg-gray-500 border-gray-200 dark:border-gray-400" >View Current Employees</Link>
        <section className="max-w-[400px] space-y-6 px-4">
          <div className="flex flex-col rounded-2xl border border-gray-800 p-6 dark:border-gray-400 space-y-4">
            <p className="leading-6 text-xl text-gray-800 dark:text-white text-center">
              Create Employee
            </p>
            <NewEmployeeForm />
          </div>
        </section>
      </div>
    </main>
  );
}