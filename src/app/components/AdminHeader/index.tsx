"use client";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/providers/ToastProvider";
import axios from "axios";
import Link from "next/link";
import { Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";

interface NestedLayoutProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const AdminHeader: FC<NestedLayoutProps> = ({ isOpen, setIsOpen }) => {
  // const { isOpen, setIsOpen } = useSidebarAdminStore();
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
      <div className="fixed top-0 left-0 w-full bg-shelf-white shadow-md z-20 p-4">
        <div className="w-full flex xl:gap-10 max-xl:gap-2 items-center justify-between px-10">
          {!isOpen && (
            <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          )}
          <Link href="/dashboard">
            <h1 className="font-semibold md:text-xl">ShelfMaster</h1>
          </Link>
          {session && (
            <>
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
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
