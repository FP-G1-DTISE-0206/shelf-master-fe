"use client";
import { FC, useCallback, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import Link from "next/link";
import { Dropdown, DropdownItem, TextInput } from "flowbite-react";
import Image from "next/image";
import { useCartQuery } from "@/hooks/cart/useCartQuery";
import CartItemDropdown from "./components/CartItemDropdown";
import { useSearchSortPaginationStore } from "@/store/useSearchSortPaginationStore";
import debounce from "lodash.debounce";

const Header: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();
  const { setSearch } = useSearchSortPaginationStore();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleFilter = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (window.location.pathname !== "/search") {
        router.push("/search?filter=" + e.target.value);
      }
      setSearch(e.target.value);
    }, 500),
    [setSearch]
  );

  useEffect(() => {
    if (searchInputRef.current && filter) {
      searchInputRef.current.value = filter;
      const params = new URLSearchParams(window.location.search);
      params.delete("filter");
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, [filter]);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const handleLogout = async (): Promise<void> => {
    if (!session) {
      alert("You are not logged in.");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        showToast(data.message, "success");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          error.response?.data.message || "Error during logout.",
          "error"
        );
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      await signOut({ redirect: false });
      router.push("/login");
    }
  };

  return (
    <>
      <div className="flex justify-between rounded-xl bg-shelf-white p-4 items-center">
        <Link href="/">
          <img
            src="/images/shelfmaster-medium.jpeg"
            alt="Logo"
            className="w-auto h-10"
          />
        </Link>
        <div className="flex xl:gap-10 max-xl:gap-2 items-center">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
            />
            <TextInput
              ref={searchInputRef}
              onChange={(e) => {
                handleFilter(e);
              }}
              className="pl-10"
              placeholder="Search..."
            />
          </div>
          {!session && (
            <div className="flex gap-5 max-lg:me-2">
              <div className="text-shelf-black hover:cursor-pointer">
                <Link href="/login">Login</Link>
              </div>
              <div className="text-shelf-black  hover:cursor-pointer">
                <Link href="/register">Register</Link>
              </div>
            </div>
          )}
          {session && (
            <>
              {/* <FontAwesomeIcon icon={faUser} /> */}
              <Dropdown
                label={<FontAwesomeIcon icon={faUser} />}
                inline
                arrowIcon={false}
              >
                <DropdownItem>
                  <div className="flex gap-2 items-start justify-start text-start flex-wrap max-lg:me-2">
                    <Image
                      className="rounded-md aspect-square object-cover"
                      src={
                        session.user.imageUrl != ""
                          ? session.user.imageUrl
                          : "/images/default-profile.jpg"
                      }
                      width={45}
                      height={45}
                      alt="User Profile"
                    />
                    <div className="flex flex-col justify-center max-sm:hidden">
                      <div>{session.user.email}</div>
                      <div className="text-slate-gray text-xs">
                        {session.user.roles[0]}
                      </div>
                    </div>
                  </div>
                </DropdownItem>
                <Dropdown.Divider />
                <DropdownItem>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownItem>
                {(session.user.roles.includes("SUPER_ADMIN") ||
                  session.user.roles.includes("WH_ADMIN")) && (
                  <>
                    <DropdownItem>
                      <Link href="/dashboard">Admin Dashboard</Link>
                    </DropdownItem>
                  </>
                )}
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </Dropdown>

              <Dropdown
                label={
                  <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                        {totalItems}
                      </span>
                    )}
                  </div>
                }
                inline
                arrowIcon={false}
              >
                {cartItems.length > 0 ? (
                  cartItems.map((item: CartItem) => (
                    <DropdownItem key={item.id}>
                      <div className="flex gap-3 items-center">
                        <Image
                          src={
                            item.images[0] || "/images/default-placeholder.jpg"
                          }
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-semibold text-left ">
                            {item.name.length > 40
                              ? item.name.substring(0, 40) + "..."
                              : item.name}
                          </p>
                          <p className="text-sm text-gray-600 text-left">
                            {item.quantity} pc(s) - Rp{" "}
                            {item.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem>
                    <p className="text-center text-gray-500">
                      Your cart is empty.
                    </p>
                  </DropdownItem>
                )}

                <Dropdown.Divider />
                <DropdownItem>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    {/* ✅ Use totalAmount from backend instead of local calculation */}
                    <span className="font-semibold">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <Link
                    href="/cart"
                    className="block w-full text-center text-blue-500"
                  >
                    Checkout <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </DropdownItem>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
