"use client";
import Link from "next/link";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  students: number[];
}

interface Student {
  id: number;
  name: string;
  grade: string;
  email: string;
  subject_scores: Record<string, number>;
}

export default async function TeacherDetailsPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {

    const { id } = await params;
    const teacherId = parseInt(id);
  
    try {
      // Fetch teacher details
      const teacherResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teachers`);
      if (!teacherResponse.ok) {
        throw new Error("Failed to fetch teacher details");
      }
      const teachersData: Teacher[] = await teacherResponse.json();
      const teacher = teachersData.find((t) => t.id === teacherId);
  
      if (!teacher) {
        throw new Error("Teacher not found");
      }
  
      // Fetch students for this teacher
      const studentsResponse = await fetch(`/api/teachers/${teacherId}`);
      if (!studentsResponse.ok) {
        throw new Error("Failed to fetch students for this teacher");
      }
      const students: Student[] = await studentsResponse.json();
  
      return (
        <div className="p-6 max-w-lg mx-auto">
          <nav className="mb-4 flex justify-between text-blue-500">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/teachers" className="hover:underline">Back to Teachers</Link>
          </nav>
  
          <div className="bg-white p-4 shadow rounded-lg text-center">
            <h1 className="text-xl font-semibold">{teacher.name}</h1>
            <p className="text-gray-600">{teacher.subject}</p>
            <p className="text-gray-600">{teacher.email}</p>
            <p className="text-gray-600">Students: {teacher.students.length}</p>
          </div>
  
          <h2 className="mt-6 text-lg font-semibold text-center">Students</h2>
          {students.length === 0 ? (
            <p className="text-center text-gray-500">No students assigned</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {students.map((student) => (
                <li key={student.id} className="bg-white p-3 rounded shadow text-center">
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.grade}</p>
                  <Link href={`/students/${student.id}`} className="text-blue-500 text-sm hover:underline">
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    } catch (error) {
        console.error('Error loading teacher:', error);
      return <div className="p-4 text-red-500">Error</div>;
    }
  }
  