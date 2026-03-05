export default function FooterSection() {
    return (
        <section id="footer" className="bg-zinc-700 text-white w-full h-auto pb-4">
            <div className="flex-none flex flex-col justify-end px-4 mx-auto pointer-events-none">
                <div className="flex flex-shrink-0 justify-between items-start text-2xl md:text-4xl font-fun border-t-1 border-grey pt-4 w-full">
                    <span>CAI ZHI TAN</span>
                    <span className="inline-block -rotate-90 md:rotate-0 text-xl md:text-2xl translate-y-3 translate-x-6 md:translate-y-0 md:translate-x-0 text-grey">©26</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between w-full">
                    <p className="text-xs font-bold font-secondary text-grey">Built between kopi breaks</p>
                    <p className="text-xs font-bold font-secondary text-grey">Little Red Dot, Singapore</p>
                </div>
            </div>
        </section>
    )
}