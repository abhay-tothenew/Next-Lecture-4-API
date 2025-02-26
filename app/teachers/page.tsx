"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  students: number[];
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await fetch("/api/teachers");
      const data = await response.json();
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const handlePostTeacher = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTeacher = {
      id: teachers.length + 1,
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
      email: formData.get("email") as string,
      students: [],
    };

    const response = await fetch("/api/teachers", {
      method: "POST",
      body: JSON.stringify(newTeacher),
    });

    if (response.ok) {
      const data = await response.json();
      setTeachers([...teachers, data]);
    } else {
      console.error("Failed to create teacher:", response.status);
    }
  };

  console.log(teachers);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50">
      <nav className="mb-4 flex justify-between text-blue-500 gap-10">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/students" className="hover:underline">
          Back to Students
        </Link>
      </nav>
      <h1 className="text-3xl font-bold text-center mb-8">
        Teachers Directory
      </h1>
      <form onSubmit={handlePostTeacher}>
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border rounded-lg p-2 w-full"
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="border rounded-lg p-2 w-full"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border rounded-lg p-2 w-full"
          />
          <input type="hidden" name="students" value="[]" />
          <label htmlFor="students">Students:</label>
          <textarea
            id="students"
            name="students"
            required
            className="border rounded-lg p-2 w-full"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 mb-4 border rounded-lg p-2 font-bold"
          >
            Add Teacher
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{teacher.name}</h2>
            <p className="text-gray-600">{teacher.subject}</p>
            <p className="text-gray-600">{teacher.email}</p>
            <p className="text-gray-600">Students: {teacher.students.length}</p>
            <Link href={`/teachers/${teacher.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
