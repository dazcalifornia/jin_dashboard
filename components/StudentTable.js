export default function StudentTable(){
    return (
        <div className="inline-block rounded-lg border shadow-2xl mx-8">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">รหัสวิชา</th>
                <th className="px-4 py-2">ชื่อวิชา</th>
                <th className="px-4 py-2">หน่วยกิต</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((course) => (
                <tr
                  className="border px-4 hover:bg-slate-200 "
                  key={course.course_id}
                >
                  <td className="border px-4">{course.course_id}</td>
                  <td className="border px-4 text-sm">{course.course_name}</td>
                  <td className="border px-4">{course.credit}</td>
                  <td className="border px-4 ">
                    <button
                      className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-700"
                      onClick={() => {
                        setIsOpen(true);
                        subjectMenu(course.course_id);
                      }}
                      type="button"
                    >
                      รายละเอียด
                    </button>
                    <button
                      className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-700"
                      onClick={() => {
                        setFormData({ origin: course.course_id });
                        setEditOpen({
                          isOpen: true,
                          id: course.course_id,
                        });
                      }}
                      type="button"
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}