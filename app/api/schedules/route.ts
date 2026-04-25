import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { BusSchedule } from "@/models/BusSchedule";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await BusSchedule.find({});
    
    // Group the data by corridor to match your current frontend structure
    const groupedData = data.reduce((acc: any, item: any) => {
      const key = item.corridor;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    return NextResponse.json(groupedData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}