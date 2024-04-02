import React from "react";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Props {
  index: number;
  questionId: string;
  createdAt: string;
  profileId: string;
  content: string;
  courseInitials: string;
}

const Question: React.FC<Props> = ({ index, questionId, createdAt, profileId, content, courseInitials }) => {
  const fetchAnswers = async (questionId: string) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("answers")
      .select()
      .eq("question_id", questionId);

    return (
      <div className="flex flex-col gap-4">
        {data?.map((answer, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex flex-row gap-4 items-center border rounded px-3">
              <h3 className="font-bold text-2xl">{answer.content}</h3>
              <a href={`/courses/${answer.course_initials}`} className="text-lg underline"></a>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div key={index} className="flex flex-col gap-2">
      <div className="flex flex-row gap-4 items-center border rounded px-3">
        <h3 className="font-bold text-2xl">{content}</h3>
        <a href={`/courses/${courseInitials}`} className="text-lg underline"></a>
        
      </div>
    </div>
  )
}

export default Question;
