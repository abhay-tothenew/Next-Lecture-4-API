import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }>}) {
  const url = new URL(request.url);
  console.log(url.searchParams);
  const { id } = await params;
  const studentId = parseInt(id);
  
  if (isNaN(studentId)) {
    return new Response(JSON.stringify({ error: 'Invalid student ID' }), { status: 400 });
  }
  
  const studentsFilePath = path.join(process.cwd(), 'public/data/studentsData/students.json');
  const studentsData = fs.readFileSync(studentsFilePath, 'utf8');
  const students = JSON.parse(studentsData);
  
  const student = students.find((s:{id:number}) => s.id === studentId);
  
  if (!student) {
    return new Response(JSON.stringify({ error: 'Student not found' }), { status: 404 });
  }
  
  return new Response(JSON.stringify(student), { status: 200, headers: { 'Content-Type': 'application/json' } });
}