import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Menubar() {

  const router = useRouter()
  return (
    <nav className="header-nav nav-floating navbar shadow-md bg-emerald-500/70 backdrop-filter backdrop-blur-sm">
      <Link href="" scroll={false}>
        <p className="logo">KU-CS course Management</p>
      </Link>

      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
        </svg>
      </label>
      <div className="menu">
        <ul className=" list bg-transparents">
          <li>
            <Link href="/dashboard" scroll={false}>
              <button className="p-3 bg-transparent rounded-md justify-center text-sm  dark:text-black bg">
                <p className="link-underline link-underline-black">คอร์สทั้งหมด</p>
              </button>
            </Link>
          </li>
          <li>
            <Link href="/students" scroll={false}>
              <button className="p-3 bg-transparent rounded-md justify-center text-sm   dark:text-black">
                <p className="link-underline link-underline-black">นิสิต</p>
              </button>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/dazcalifornia/franx-webpage"
              scroll={false}
            >
              <button 
                className="p-3 bg-transparent rounded-md justify-center text-sm  dark:text-black"
                onClick={()=>{
                  console.log('LogingOut')
                  router.replace("/")
                }}
                >
                <span className="flex content-start item-center link-underline link-underline-black">
                  
                  Logout
                </span>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
