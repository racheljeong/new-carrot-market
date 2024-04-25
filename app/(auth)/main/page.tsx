import Link from "next/link";
import { getUser } from "../profile/action";

export default async function Home() {

    const user = await getUser();
    const name = user?.username ? user?.username.toUpperCase() :"Stranger";

    return (
        <div className="flex flex-col items-center justify-between p-3">
        <div className="flex flex-col items-center py-4 gap-4 mb-12 *:font-medium">
            <span className="text-8xl gap-2 py-2 my-2">🥕</span>
            <h1 className="text-4xl ">BRAND NEW CARROT WORLD</h1>
            <h2 className="text-2xl">Welcome! </h2>
            <Link href="/profile">
                <h1 className="text-orange-400 font-sans font-semibold text-4xl">
                    {name}
                </h1>
            </Link>
            <Link href="/products/upload">
            <button className="fixed hover:bg-orange-400 border-0 
                                aspect-square border-transparent transition-colors 
                                cursor-pointer bottom-24 right-5 shadow-xl
                                bg-orange-300 rounded-full w-14 flex items-center 
                                justify-center text-white">
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
                </svg>
            </button>
            </Link>
            </div>
            <div className="flex flex-col items-center gap-1 w-full">
            
            </div>
        </div>
    )
}

