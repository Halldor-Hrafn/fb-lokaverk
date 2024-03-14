import FixedNavbar from "@/components/FixedNavbar";
import CreateCourse from "@/components/CreateCourse";
import Course from "@/components/Course";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const isAdmin = await cookieStore.get("admin")?.value === "true" ? true : false;

  const { data, error } = await supabase
    .from("courses")
    .select();

  return (
    <div className="flex-1 w-full flex flex-col gap-20">
      <FixedNavbar />
      {data && (
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">Courses</h2>
            <div className="flex flex-col gap-4">
              {data.map((course, index) => (
                <Course
                  key={index}
                  index={index}
                  title={course.title}
                  initials={course.initials}
                  link={course.link}
                />
              ))}
            </div>
          </main>
        </div>
      )}
      {isAdmin && (
        <CreateCourse />
      )}
    </div>
  );
}
