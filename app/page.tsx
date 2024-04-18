import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="bg-orange-100">From Practice!</h1>
      If you wanna join with us, please be our Member!<br/>
      <Link href="/create-account">Be a member</Link>
      </div>
  );
}

