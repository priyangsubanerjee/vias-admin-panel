import React, { useState } from 'react';
import Select from 'react-select';

const ProductDropdown = ({ products, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption);
    };
    const options = products.map((product) => ({
        value: product._id,
        label: product.name,
    }));

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isSearchable
            placeholder="Select a product..."
            styles={
                {
                    control: (provided, state) => ({
                        ...provided,
                        minWidth: '200px',
                        maxWidth: "300px",
                        minHeight: '45px',
                    }),
                }
            }
        />
    );
};

export default ProductDropdown;
