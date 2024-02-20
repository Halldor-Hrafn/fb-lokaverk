import React from "react";

interface Props {
  index: number;
  title: string;
  initials: string;
  link: string;
}

const Course: React.FC<Props> = ({ index, title, initials, link}) => {
  return (
    <div key={index} className="flex flex-col gap-2">
      <h3 className="font-bold text-2x1">{title}</h3>
      <p className="text-lg">{initials}</p>
      <a href={`/courses/${initials}`} className="text-lg underline">{initials}</a>
    </div>
  )
}

export default Course;