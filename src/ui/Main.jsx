function Main({ children }) {
    return (
        <div className="container py-7 flex flex-col gap-y-[30px] overflow-x-clip">
            {children}
        </div>
    );
}

export default Main;
