import React, { useState } from "react";

const DataTable = ({ data, title }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const truncateText = (text, maxLength) => {
        const words = text.split(' ');
        const truncatedWords = words.slice(0, maxLength);
        return truncatedWords.join(' ');
    };

    const renderCellValue = (key, value) =>
    (typeof value === "boolean"
        ? (value ? "TRUE" : "FALSE")
        : typeof value === "object"
            ? JSON.stringify(value)
            : value.split(" ").slice(0, 5).join(" ") + (value.split(" ").length > 5 ? "..." : ""));

    return (
        <div className="mt-8 overflow-auto border pb-2 border-[#023E8A]">
            <table className="min-w-full">
                <thead>
                    <tr>
                        {data.length !== 0 &&
                            Object.keys(data[0]).map((header) => (
                                <th
                                    key={header}
                                    className="bg-[#023E8A] text-white py-2 px-4 border-b"
                                >
                                    {header}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(row).map((key) => (
                                <td key={key} className="py-2 px-4 border-b whitespace-no-wrap overflow-hidden" style={{ maxWidth: '200px', textOverflow: 'ellipsis' }}>
                                    {renderCellValue(key, row[key])}
                                </td>

                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`mx-1 px-3 py-1 rounded-md ${currentPage === index ? "bg-[#023E8A] text-white" : "bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
            <div className="mt-3 flex justify-center text-lg font-bold text-[#023E8A]">
                Total {data?.length} {title} To Add
            </div>
        </div>
    );
};

export default DataTable;
