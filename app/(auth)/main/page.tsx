import Link from "next/link";
import { getUser } from "../profile/action";
import FloatingBtn from "@/components/FloatingBtn";

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
                <h1 className="text-orange-300 font-sans font-semibold text-4xl
                                hover:text-orange-500 hover:shadow-lg">
                    {name}
                </h1>
            </Link>
            <FloatingBtn />
            </div>
            <div className="flex flex-col items-center gap-1 w-full">
            
            </div>
        </div>
    )
}

