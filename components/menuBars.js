import Link from "next/link";
import { useEffect, useState } from "react";

export default function Menubar() {

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
              <button className="p-3 bg-transparent rounded-md justify-center text-sm  dark:text-black">
                <span className="flex content-start item-center link-underline link-underline-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Source
                </span>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
