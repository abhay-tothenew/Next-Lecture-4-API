import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";


export async function GET(request: Request) {
    console.log(request);

    const filePath = path.join(process.cwd(), "public/data/teachersData/teachers.json");

    try{
        const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);
    return NextResponse.json(json,{
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
    }catch(error){
        return NextResponse.json({error}, {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    
}


export async function POST(request: Request) {
    const filePath = path.join(process.cwd(), "public/data/teachersData/teachers.json");

    try{

        const data = fs.readFileSync(filePath, "utf8");

        const json = JSON.parse(data);
        const newTeacher = await request.json();
        json.push(newTeacher);
        fs.writeFileSync(filePath, JSON.stringify(json));
        return NextResponse.json(newTeacher,{
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

      
    }catch(error){
        return NextResponse.json({error}, {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
