import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/src/json/country_state.json");

export async function GET() {
    const jsonData: any = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    return NextResponse.json(objectData);
}