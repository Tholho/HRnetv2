interface SelectProps<T> {
    id: string;
    data: T[];
    sortOptions: boolean;
    valueKey: keyof T;
    labelKey: keyof T;
}

const SelectOption = <T,>({ item, valueKey, labelKey }: { item: T; valueKey: keyof T; labelKey: keyof T }) => {
    return (
        <option key={String(item[valueKey])} value={String(item[valueKey])}>
            {
                String(item[labelKey])
            }
        </option>
    );
};

const Select = <T,>({ id, data, valueKey, labelKey, sortOptions = false }: SelectProps<T>) => {
    if (sortOptions) {
        data.sort((a, b) => {
            if (a[labelKey] < b[labelKey]) return -1;
            if (a[labelKey] > b[labelKey]) return 1;
            return 0;
        })
    }
    return (
        <select className="p-2 bg-white text-black" name={id} id={id}>
            {
                data.map((item) => (
                    <SelectOption key={String(item[valueKey])} item={item} valueKey={valueKey} labelKey={labelKey} />
                ))
            }
        </select>
    );
};

export default Select