import Button from "@/components/Button";
import { getUser, logout } from "./action";
import Input from "@/components/Input";



export default async function Profile() {
    
    const user = await getUser();   //server
    console.log(`profile`,user);
    const formattedDate = new Date(user!.createdAt).toISOString().split("T")[0].replace(/-/g, " ");
    //const formattedDate = new Date(user!.createdAt).toISOString().split['T'][0];
    console.log(formattedDate);
    
    return (
        <div className="flex flex-col items-center justify-center p-2 py-5 m-4 my-5 max-w-screen-sm">
            {/* <h1 className="font-semibold font-sans text-3xl text-orange-600 text-center mb-5">
                Welcome! 🥕{user?.username}
            </h1> */}
            <div className="size-48 bg-slate-50 border-2 border-orange-300 rounded-full p-3 flex justify-center align-middle mb-5">
            <svg className="hover:text-orange-200 justify-center align-middle" data-slot="icon" fill="none" strokeWidth="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
            </svg>
            </div>
            <Input name={user!.username} value={user!.username} type="text" disabled />
            <Input name={user!.email ?? ""} value={user!.email ?? ""} type="email" disabled />
            <Input name={formattedDate} value={formattedDate} type="string" disabled />
            <label htmlFor="picture"
                   className="w-72 primary-btn h-10 mt-7 mb-0"
                > Update Profile
            <input
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
            />
            </label>
            {/* <Button text="Update Profile"></Button> */}
            <form action={logout}>
                <Button text="Logout"></Button>
            </form>
        </div>
        )
}