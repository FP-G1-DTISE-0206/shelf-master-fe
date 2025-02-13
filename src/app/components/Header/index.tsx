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
import useCartStore from "@/hooks/useCartStore";
import { CartItem } from "@/types/cartItem";
import cartStore from "@/store/cartStore";

const Header: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { showToast } = useToast();

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
        showToast(error.response?.data.message || "Error during logout.", "error");
      } else {
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    } finally {
      await signOut({ redirect: false });
      router.push("/login");
    }
  };

  const totalItems = useCartStore((state) => state.getTotalItems());
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="flex justify-between rounded-xl bg-shelf-white p-4 items-center">
      {/* Logo */}
      <Link href="/">
        <h1 className="font-extrabold text-xl">ShelfMaster</h1>
      </Link>

      {/* Right-side icons */}
      <div className="flex xl:gap-10 max-xl:gap-2 items-center">
        <FontAwesomeIcon icon={faSearch} />

        {!session ? (
          <div className="flex gap-5 max-lg:me-2">
            <Link href="/login" className="text-shelf-black">
              Login
            </Link>
            <Link href="/register" className="text-shelf-black">
              Register
            </Link>
          </div>
        ) : (
          <>
            {/* User Dropdown */}
            <Dropdown label={<FontAwesomeIcon icon={faUser} />} inline arrowIcon={false}>
              <DropdownItem>
                <div className="flex gap-2 items-start justify-start text-start flex-wrap max-lg:me-2">
                  <Image
                    className="rounded-md aspect-square object-cover"
                    src={session.user.imageUrl || "/images/default-profile.jpg"}
                    width={45}
                    height={45}
                    alt="User Profile"
                  />
                  <div className="flex flex-col justify-center max-sm:hidden">
                    <div>{session.user.email}</div>
                    <div className="text-slate-gray text-xs">{session.user.roles[0]}</div>
                  </div>
                </div>
              </DropdownItem>
              <Dropdown.Divider />
              <DropdownItem>
                <Link href="/profile">Profile Settings</Link>
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </Dropdown>

            {/* Cart Dropdown */}
            <Dropdown
              label={
                <div className="relative">
                  <FontAwesomeIcon icon={faCartShopping} size="lg" />
                  {cartStore.getState().getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                      {cartStore.getState().getTotalItems()}
                    </span>
                  )}
                </div>
              }
              inline
              arrowIcon={false}
            >
              {cartStore.getState().cartItems.length > 0 ? (
                cartStore.getState().cartItems.map((item: CartItem) => (
                  <DropdownItem key={item.id}>
                    <div className="flex gap-3 items-center">
                      <Image
                        src={item.images[0] || "/images/default-placeholder.jpg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-left">{item.name}</p>
                        <p className="text-sm text-gray-600 text-left">
                          {item.quantity} pc(s) - Rp {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem>
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                </DropdownItem>
              )}

              <Dropdown.Divider />
              <DropdownItem>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    Rp{" "}
                    {(cartStore.getState().cartItems as CartItem[]).reduce<number>(
                        (total: number, item: CartItem) => total + item.price * item.quantity,
                        0
                      ).toLocaleString("id-ID")}
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem>
                <Link href="/cart" className="block w-full text-center text-blue-500">
                  Checkout <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </DropdownItem>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;



// "use client";
// import { FC } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowRight,
//   faCartShopping,
//   faSearch,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import { useToast } from "@/providers/ToastProvider";
// import axios from "axios";
// import Link from "next/link";
// import { Dropdown, DropdownItem } from "flowbite-react";
// import Image from "next/image";
// import useCartStore from "@/hooks/useCartStore";
// import { CartItem } from "@/types/cartItem";



// const Header: FC = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const { showToast } = useToast();

//   const handleLogout = async () => {
//     if (!session) {
//       alert("You are not logged in.");
//       return;
//     }
//     // Call your custom logout API
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
//         {
//           accessToken: session.accessToken,
//           refreshToken: session.refreshToken,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${session.accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (data.success) {
//         showToast(data.message, "success");
//       } else {
//         showToast(data.message, "error");
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         showToast(error.response?.data.message, "error");
//       } else {
//         showToast("An unexpected error occurred. Please try again.", "error");
//       }
//     } finally {
//       await signOut({ redirect: false });
//       router.push("/login");
//     }
//   };

//   const totalItems = useCartStore((state) => state.getTotalItems());
//   const cartItems = useCartStore((state) => state.cartItems);

//   return (
//     <>
//       {/* <h2 className="text-5xl font-black mt-10 mb-6 text-center">SHOP <span className="text-[#4A69E2]">SMART</span></h2>
//       <HeroCard /> */}
//       <div className="flex justify-between rounded-xl bg-shelf-white p-4 items-center">
//         <Link href="/">
//           <h1 className="font-extrabold text-xl">ShelfMaster</h1>
//         </Link>
//         <div className="flex xl:gap-10 max-xl:gap-2 items-center">
//           <FontAwesomeIcon icon={faSearch} />
//           {!session && (
//             <div className="flex gap-5 max-lg:me-2">
//               <div className="text-shelf-black hover:cursor-pointer">
//                 <Link href="/login">Login</Link>
//               </div>
//               <div className="text-shelf-black  hover:cursor-pointer">
//                 <Link href="/register">Register</Link>
//               </div>
//             </div>
//           )}
//           {session && (
//             <>
//               {/* <FontAwesomeIcon icon={faUser} /> */}

//               <Dropdown
//                 label={<FontAwesomeIcon icon={faUser} />}
//                 inline
//                 arrowIcon={false}
//               >
//                 <DropdownItem>
//                   <div className="flex gap-2 items-start justify-start text-start flex-wrap max-lg:me-2">
//                     <Image
//                       className="rounded-md aspect-square object-cover"
//                       src={
//                         session.user.imageUrl != ""
//                           ? session.user.imageUrl
//                           : "/images/default-profile.jpg"
//                       }
//                       width={45}
//                       height={45}
//                       alt="User Profile"
//                     />
//                     <div className="flex flex-col justify-center max-sm:hidden">
//                       <div>{session.user.email}</div>
//                       <div className="text-slate-gray text-xs">
//                         {session.user.roles[0]}
//                       </div>
//                     </div>
//                   </div>
//                 </DropdownItem>
//                 <Dropdown.Divider />
//                 <DropdownItem>
//                   <Link href="/profile">Profile Settings</Link>
//                 </DropdownItem>
//                 <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
//               </Dropdown>

//               {/* Cart Dropdown */}
//               <Dropdown
//               label={
//                 <div className="relative">
//                   <FontAwesomeIcon icon={faCartShopping} size="lg" />
//                   {totalItems > 0 && (
//                     <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
//                       {totalItems}
//                     </span>
//                   )}
//                 </div>
//               }
//               inline
//               arrowIcon={false}
//             >
//               {cartItems.length > 0 ? (
//                 cartItems.map((item) => (
//                   <DropdownItem key={item.id}>
//                     <div className="flex gap-3 items-center">
//                       <Image
//                         src={item.images[0] || "/images/default-placeholder.jpg"}
//                         alt={item.name}
//                         width={40}
//                         height={40}
//                         className="rounded-md"
//                       />
//                       <div>
//                         <p className="font-semibold">{item.name}</p>
//                         <p className="text-sm text-gray-600">
//                           {item.quantity} pc(s) - Rp {item.price.toLocaleString("id-ID")}
//                         </p>
//                       </div>
//                     </div>
//                   </DropdownItem>
//                 ))
//               ) : (
//                 <DropdownItem>
//                   <p className="text-center text-gray-500">Your cart is empty.</p>
//                 </DropdownItem>
//               )}

//               <Dropdown.Divider />
//               <DropdownItem>
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold">Total</span>
//                   <span className="font-semibold">
//                     Rp{" "} {cartItems.reduce<number>((total: number, item: CartItem) => total + item.price * item.quantity, 0).toLocaleString("id-ID")}
//                   </span>
//                 </div>
//               </DropdownItem>
//               <DropdownItem>
//                 <Link href="/cart" className="block w-full text-center text-blue-500">
//                   Checkout <FontAwesomeIcon icon={faArrowRight} />
//                 </Link>
//               </DropdownItem>
//             </Dropdown>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
