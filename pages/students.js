import { useEffect, useState } from "react";
import Menubar from "../components/menuBars";

export default function Students(){
    const [data,setData] = useState([])

      useEffect(() => {
        fetch("https://3a88-45-136-254-11.ap.ngrok.io/std")
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.log(error));
      }, []);

    return (
      <div>
        <Menubar />
        <div className="flex min-h-screen ">
          <div className="fade-in text-center pt-20 relative pb-8 sm:mx-auto sm:px-1 ">
            <div className=" pt-4 sm:px-0 ">
              <div className="inline-block rounded-t-xl border shadow-2xl mx-8 bg-white">
              <div className='flex-row mb-4'>
                <table className="table-fixed w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">รหัสนิสิต</th>
                      <th className="px-4 py-2">ชื่อวิชา</th>
                      <th className="px-4 py-2">ภาค</th>
                      <th className="px-4 py-2">เข้าคณะรอบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((std) => (
                      <tr className=" px-4 hover:bg-slate-200 " key={std.id}>
                        <td className=" px-4">{std.Id}</td>
                        <td className=" px-4 text-sm">{std.name}</td>
                        <td className=" px-4">{std.Major}</td>   
                        <td className=" px-4">{std.Tcas}</td>                      
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}