"use client";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import Link from "next/link";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
const Header: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();

  const handleLogout = async () => {
    if (!session) {
      alert("You are not logged in.");
      return;
    }
    // Call your custom logout API
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
        showToast(error.response?.data.message, "error");
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
      {/* <h2 className="text-5xl font-black mt-10 mb-6 text-center">SHOP <span className="text-[#4A69E2]">SMART</span></h2>
      <HeroCard /> */}
      <div className="flex justify-between rounded-xl bg-shelf-white p-4 items-center">
        <Link href="/">
          <h1 className="font-extrabold text-xl">ShelfMaster</h1>
        </Link>
        <div className="flex xl:gap-10 max-xl:gap-2 items-center">
          <FontAwesomeIcon icon={faSearch} />
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
                      className="rounded-md"
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
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </Dropdown>
              <Dropdown
                label={<FontAwesomeIcon icon={faCartShopping} />}
                inline
                arrowIcon={false}
              >
                <DropdownItem>
                  <Link href="/cart">
                    Checkout <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </DropdownItem>
                <Dropdown.Divider />
                <DropdownItem>
                  <div className="flex gap-2 items-start justify-start text-start flex-wrap max-lg:me-2">
                    <Image
                      className="rounded-md"
                      src={
                        session.user.imageUrl != ""
                          ? session.user.imageUrl
                          : "/images/kohceng-senam.jpg"
                      }
                      width={45}
                      height={45}
                      alt="Item Image"
                    />
                    <div className="flex flex-col justify-center max-sm:hidden">
                      <div>ADIDAS 3DFWD X PARLEY RUNNING SHOES</div>
                      <div className="flex justify-between">
                        <div className="text-shelf-black text-xs">1 pc(s)</div>
                        <div className="text-shelf-black text-xs">
                          Rp 10.000,-
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="flex gap-2 items-start justify-start text-start flex-wrap max-lg:me-2">
                    <Image
                      className="rounded-md"
                      src={
                        session.user.imageUrl != ""
                          ? session.user.imageUrl
                          : "/images/kohceng-senam.jpg"
                      }
                      width={45}
                      height={45}
                      alt="Item Image"
                    />
                    <div className="flex flex-col justify-center max-sm:hidden">
                      <div>ADIDAS 3DFWD X PARLEY RUNNING SHOES</div>
                      <div className="flex justify-between">
                        <div className="text-shelf-black text-xs">1 pc(s)</div>
                        <div className="text-shelf-black text-xs">
                          Rp 10.000,-
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownItem>
                <Dropdown.Divider />
                <DropdownItem>
                  <div className="flex justify-between w-full">
                    <div className="text-shelf-black text-lg font-medium">
                      Total
                    </div>
                    <div className="text-shelf-black text-lg font-medium">
                      Rp 20.000,-
                    </div>
                  </div>
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
