import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-8xl gap-2 py-2 my-2">🥕</span>
        <h1 className="text-4xl ">BRAND NEW CARROT WORLD</h1>
        <h2 className="text-2xl">Welcome!</h2>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
        <p>Be our Member!</p>
        <Link href="/create-account" className="primary-btn">Be a member</Link>
        <p>Are you already a member?</p>
        <Link href="/login" className="primary-btn">
          Login
        </Link>
      </div>
  </div>
  )
}

