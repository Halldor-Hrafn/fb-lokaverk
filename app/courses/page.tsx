import FixedNavbar from "@/components/FixedNavbar";
import CreateCourse from "@/components/CreateCourse";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const isAdmin = await cookieStore.get("admin")?.value === "true" ? true : false;

  const { data, error } = await supabase
    .from("courses")
    .select();

  const createCourse = async (formData: FormData) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const courseTitle = formData.get("title");
    const courseInitials = formData.get("initials");
    const courseLink = formData.get("link");

    const { data, error } = await supabase
      .from("courses")
      .insert([
        { title: courseTitle, initials: courseInitials, link: courseLink },
      ]);

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <FixedNavbar />
      {data && (
        <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <main className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">Courses</h2>
            <div className="flex flex-col gap-4">
              {data.map((course, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="font-bold text-2xl">{course.title}</h3>
                  <p className="text-lg">{course.initials}</p>
                  <a href={`/courses/${course.initials}`} className="text-lg underline">{course.initials}</a>
                  <a href={course.link} className="text-lg underline">{course.link}</a>
                </div>
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
