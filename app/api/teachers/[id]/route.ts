import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request:Request, { params }: { params: Promise<{ id: string }> }) {

  const url = new URL(request.url);
  console.log(url.searchParams);
  try {

    const { id } = await params;
    const teacherId = parseInt(id);
    
    if (isNaN(teacherId)) {
      return NextResponse.json(
        { error: 'Invalid teacher ID' },
        { status: 400 }
      );
    }
    
    const teachersFilePath = path.join(process.cwd(), 'public/data/teachersData/teachers.json');
    const teachersData = fs.readFileSync(teachersFilePath, 'utf8');
    const teachers = JSON.parse(teachersData);
    
    interface Teacher {
        id: number;
        students?: number[];
    }

    interface Student {
        id: number;
        name: string;
        grade: string;
        email: string;
        subject_scores: Record<string, number>;
    }

    const teacher: Teacher | undefined = teachers.find((t: Teacher) => t.id === teacherId);
    
    if (!teacher) {
      return NextResponse.json(
        { error: 'Teacher not found' },
        { status: 404 }
      );
    }
    
    const studentIds = teacher.students || [];
    
    const studentsFilePath = path.join(process.cwd(), 'public/data/studentsData/students.json');
    const studentsData = fs.readFileSync(studentsFilePath, 'utf8');
    const allStudents = JSON.parse(studentsData);
    
    const teacherStudents = allStudents.filter((student:Student) => 
      studentIds.includes(student.id)
    );
    
    return NextResponse.json(teacherStudents,{
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
  } catch (error) {
    console.error('Error loading students by teacher:', error);
    return NextResponse.json(
      { error: 'Failed to load students data', details:''  },
      { status: 500 }
    );
  }
}