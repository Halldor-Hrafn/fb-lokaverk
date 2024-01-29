import FixedNavbar from "@/components/FixedNavbar";
import CreateNote from "@/components/CreateNote";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { initials: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const isAdmin = await cookieStore.get("admin")?.value === "true" ? true : false;

  const { data, error} = await supabase
    .from("notes")
    .select()
    .eq("course_initials", params.initials);

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full flex flex-col gap-20 items-center p-4">
      <FixedNavbar />
      <CreateNote initial={params.initials} />
      {data && (
        <div className="bg-white shadow rounded-lg p-6 w-full md:w-3/4 lg:w-1/2">
          <main>
            <h2 className="text-2xl font-bold mb-4">Notes for class: {decodeURIComponent(params.initials)}</h2>
            <div>
              {data?.map((note, index) => (
                <div key={index} className="border-b border-gray-200 py-4">
                  <h3 className="text-xl font-semibold">{note.title}</h3>
                  <p className="text-gray-700">{note.note}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
