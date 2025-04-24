import { useRef } from "react";
import { employeeFields, addressFields, departmentSelect } from "../data/formResources"
import FormField from "./FormField"
//import Modal from "../plugins/modal/Modal";
import Employee from "../types/Employee";
import useEmployeesStore from "../stores/employeesStore";
import Modal from "react-ref-modal";

const NewEmployeeForm: React.FC = () => {
    const addEmployee = useEmployeesStore((state) => state.addEmployee)
    const openModalRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const createNewEmployeeOnSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (formRef.current) {
            //inputs are not validated as of now
            const formData = new FormData(formRef.current);
            const newEmployee: Employee = {
                firstName: formData.get("first-name") as string,
                lastName: formData.get("last-name") as string,
                dateOfBirth: formData.get("date-of-birth") as string,
                startDate: formData.get("start-date") as string,
                department: formData.get("department") as string,
                street: formData.get("street") as string,
                city: formData.get("city") as string,
                state: formData.get("state") as string,
                zipCode: formData.get("zip-code") as string,
            }
            addEmployee(newEmployee)
        }
    };
    return (
        <>
            <form ref={formRef}>
                {
                    employeeFields.map((fields) => (
                        <FormField key={fields.id} {...fields}></FormField>
                    ))
                }
                <fieldset className="rounded-3xl border border-gray-800 dark:border-gray-400">
                    <legend className="ml-5">Address</legend>
                    {
                        addressFields.map((fields) => (
                            <FormField key={fields.id} valueKey="abbreviation" labelKey="name" {...fields}></FormField>
                        ))
                    }
                </fieldset>
                {
                    departmentSelect.map((fields) => (
                        <FormField key={fields.id} valueKey="key" labelKey="name" {...fields}></FormField>
                    ))
                }
            </form>
            <button ref={openModalRef} className="border mb-0 p-2 rounded self-auto border-gray-300 bg-gray-700 hover:bg-gray-500 active:translate-px" type="submit" onClick={createNewEmployeeOnSubmit}>Save</button>
            <Modal openModalRef={openModalRef} message="Employee created!"></Modal>
        </>
    )
}

export default NewEmployeeForm