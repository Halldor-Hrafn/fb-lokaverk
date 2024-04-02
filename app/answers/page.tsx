import FixedNavbar from "@/components/FixedNavbar";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const isAdmin = await cookieStore.get("admin")?.value === "true" ? true : false;

  const { data, error } = await supabase
    .from("answers")
    .select();

  return
}
