function Form({ title, handleSubmit, children }) {
    return (
        <form
            className="flex flex-col gap-y-5 items-center w-full"
            onSubmit={handleSubmit}
        >
            <h1 className="text-3xl capitalize font-bold self-start">
                {title}
            </h1>
            {children}
        </form>
    );
}

export default Form;
