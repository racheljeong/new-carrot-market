import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
    return(
          <div className="flex flex-col items-center align-middle justify-center">
          <div className="flex flex-col items-center py-4 gap-4 mb-12 *:font-medium">
            <Link href="/">
                <p className="text-center align-middle justify-center text-8xl py-4 my-4">🥕</p>
                <h1 className="text-4xl ">BRAND NEW CARROT WORLD</h1>
            </Link>
              <p className="flex justify-center align-middle items-center p-4 m-4">
                Sorry for Inconvenience, You might lost the way.<br/>
                Please go back to Home and be our member!</p>
          </div>
        </div>
    );
}