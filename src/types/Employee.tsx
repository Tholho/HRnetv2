export default interface Employee {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string;
    startDate: Date | string;
    department: string;
    street: string;
    city: string;
    state: string;
    zipCode: string | number;
}
