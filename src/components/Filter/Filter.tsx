import { FC } from "react"
import { Select } from "antd"

interface Option {
    value: boolean | string;
    label: string;
}

interface FilterProps {
    options: Option[];
    placeholder: string;
    value: boolean | string;
    onChange: (value: boolean | string) => void;
    width: string;
}

const { Option } = Select;

const Filter: FC<FilterProps> = ({ options, placeholder, value, onChange, width }) => {
    return (
        <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            value={value}
            onChange={onChange}
            style={{ width: width }}
        >
            {options.map(option => (
                <Option key={option.label} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    )
}

export default Filter
