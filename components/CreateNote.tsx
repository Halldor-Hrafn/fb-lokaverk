import React from "react";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface NoteProps {
  initial: string;
}

const CreateNote: React.FC<NoteProps> = ({ initial }) => {
  const createNote = async (formData: FormData) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const noteContent = formData.get("content");
    const noteInitial = initial;
    const userEmail = cookieStore.get("email")?.value;

    const { data, error } = await supabase
      .from("notes")
      .insert([
        { content: noteContent, course_initials: noteInitial, user_email: userEmail },
      ]);

    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <form action={createNote} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
            Note:
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="content" id="content" cols={30} rows={10} />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateNote;
