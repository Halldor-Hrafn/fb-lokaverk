import React from "react";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const CreateCourse: React.FC = () => {
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
      <form action={createCourse}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="initials">Initials</label>
          <input type="text" name="initials" id="initials" />
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input type="text" name="link" id="link" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateCourse;
