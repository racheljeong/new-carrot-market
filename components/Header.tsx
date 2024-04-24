import { getUser } from "@/app/profile/action";
import Link from "next/link";


export default async function Header() {
    const user = await getUser();
    const name = user?.username ?? "Stranger";

    return (
        <div className="w-full flex bg-orange-400 justify-between align-middle p-2 rounded-md">
           {/* col1 */}
            <div className="flex align-middle">
            <Link href="/profile">
                <h1 className="text-amber-50 font-sans font-semibold text-xl">
                    Hi, {name}
                </h1>
            </Link>
            
            </div>
            <div className="flex items-center justify-center">
                <span className="text-3xl ml-10">🥕</span>
            </div>
             {/* col2 */}
             <div className="flex align-middle">
                <span className="flex align-middle relative">
                <input className="w-40 bg-amber-50 px-2 flex relative z-0 border-2 border-slate-500 rounded-md focus:bg-white" placeholder="Search" />
                </span>
            </div>
        </div>
    );
}