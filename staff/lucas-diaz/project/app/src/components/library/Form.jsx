export default function Form({ children, ...props }) {
    return <form className="text-white mt-64 text-base gap-y-3 flex flex-row flex-wrap justify-center basis-full gap-7 z-10" {...props}>
        {children}
    </form>
}