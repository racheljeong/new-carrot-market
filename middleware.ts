import { NextRequest } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  
}

export const config = {
  matcher : ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};