import FixedNavbar from "@/components/FixedNavbar";
import CreateNote from "@/components/CreateNote";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm";

import mdStyles from "./markdown.module.css"

export default async function Page({ params }: { params: { initials: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const isAdmin = await cookieStore.get("admin")?.value === "true" ? true : false;

  const { data, error} = await supabase
    .from("notes")
    .select()
    .eq("course_initials", params.initials)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <FixedNavbar />
      <CreateNote initial={params.initials} />
      {data && (
        <div className="bg-inherit shadow rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
          <main>
            <h2 className="text-2xl font-bold mb-4">Notes for class: {decodeURIComponent(params.initials)}</h2>
            <div>
              {data?.map((note, index) => (
                <div key={index} className="border-b border-gray-200 py-4">
                  <Markdown className={mdStyles.markdown} remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
