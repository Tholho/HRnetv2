import Select from "../plugins/select/Select";
export interface FormFieldProps<T> {
    id: string;
    text: string;
    type?: string;
    isSelect?: boolean;
    sortOptions?: boolean;
    data?: T[];
    valueKey?: keyof T;
    labelKey?: keyof T;
}

const FormField= <T,>({ id, text, type = "text", isSelect = false, sortOptions = false, data, valueKey, labelKey }: FormFieldProps<T>) => {
    return (
        <div className="m-5 flex flex-col w-50" key={id}>
            <label htmlFor={id}>{text}</label>
            {
                isSelect && data && valueKey && labelKey ? (
                    <Select id={id} data={data} valueKey={valueKey} labelKey={labelKey} sortOptions={sortOptions}/>
                ) : (
                    <input type={type} name={id} id={id} className="bg-white text-black p-1.5" />
                )
            }
        </div>
    );
};

export default FormField