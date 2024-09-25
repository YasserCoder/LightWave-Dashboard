function MainHeader({ title, children }) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl xs:text-4xl md:text-5xl font-extrabold capitalize">
                {title}
            </h1>
            {children}
        </div>
    );
}

export default MainHeader;
