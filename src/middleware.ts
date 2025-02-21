import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/product",
  "/setup-account",
  "/forgot-password",
  "/setup-password",
];
const PROTECTED_PATHS = [
  "/dashboard",
  "/cart",
  "/profile",
  "/search",
  "/change-password",
  "/products",
  "/order-list",
  "/stock-mutation-form",
  "/create-product",
  "/update-product",
  "/warehouse",
];
const ROLE_PATHS = {
  USER: ["/profile", "/cart"],
  WH_ADMIN: ["/profile", "/products", "/order-list", "/dashboard"],
  // Admin can access everything
  SUPER_ADMIN: ["*"],
};

async function getSession() {
  return await auth();
}

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
}

function hasRequiredRole(userRoles: string[], pathname: string) {
  if (userRoles.includes("SUPER_ADMIN")) {
    return true;
  }
  for (const [role, paths] of Object.entries(ROLE_PATHS)) {
    if (
      paths.some((path) => pathname.startsWith(path)) &&
      userRoles.includes(role)
    ) {
      return true;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  if (session) {
    const userRoles = session.user?.roles || [];
    if (
      (pathname === "/login" || pathname === "/register") &&
      (userRoles.includes("SUPER_ADMIN") || userRoles.includes("WH_ADMIN"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!session && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isProtectedPath(pathname)) {
    const userRoles = session.user?.roles || [];
    if (!hasRequiredRole(userRoles, pathname)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}
