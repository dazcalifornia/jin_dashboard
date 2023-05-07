import Link from 'next/link'
import React ,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';


const Menu = () => {
   return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="#">
                <p className="text-white font-bold text-xl">ระบบจัดการ การศึกษา</p>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/homepage">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    หน้าแรก
                  </p>
                </Link>
                <Link href="/student">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    นิสิต
                  </p>
                </Link>
                <Link href="/upload">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    อัพโหลดเกรด 
                  </p>
                </Link>
                <Link href="/stdupload">
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    อัพโหลดรายชื่อนิสิต
                  </p>
                </Link>
               
                <Link href="/">
                  <p 
                    onClick={() => {
                      setAuthEmail("");
                    }}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    ออกจากระบบ
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Menu;
