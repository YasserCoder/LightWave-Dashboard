function Table({ tHead, obj, children }) {
    return (
        <table className="w-full min-w-max table-auto text-left bg-bkg-main rounded-tl-lg rounded-tr-lg">
            <thead>
                <tr>
                    {tHead.map((heading, index) => (
                        <th
                            key={index}
                            className={`border-b border-content bg-slate-200 dark:bg-slate-800 px-2 sm:px-4 py-4 ${
                                obj[heading] || ""
                            }`}
                        >
                            <p className={`block text-sm font-bold uppercase`}>
                                {heading}
                            </p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}

export default Table;
