import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ACBusSchedule } from "@/models/ACBusSchedule";

export async function GET() {
  try {
    await connectToDatabase();
    const data = await ACBusSchedule.find({});
    
    // Group the data by corridor (e.g., westernCorridorAC, southernCorridorAC)
    const groupedData = data.reduce((acc: any, item: any) => {
      const key = item.corridor;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    return NextResponse.json(groupedData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch AC data" }, { status: 500 });
  }
}