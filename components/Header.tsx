

export default function Header() {

    return (
        <div className="w-full flex bg-orange-400 justify-between align-middle p-2">
           {/* col1 */}
            <div className="flex align-middle">

            </div>
             {/* col2 */}
             <div className="flex align-middle">
                <span className="flex align-middle relative">
                <input className="w-full bg-amber-50 px-2 flex relative z-0 border-2 border-slate-500 rounded-md focus:bg-white" placeholder="Search" />
                </span>
            </div>
        </div>
    );
}