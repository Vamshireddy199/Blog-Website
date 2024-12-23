import ConnectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


const LoadDB = async () => {
    await ConnectDB();
};


const connectDB = async () => {
    await ConnectDB();
};

export async function POST(request) {
    await connectDB(); 

    const formData = await request.formData();

    const emailData = {
        email: formData.get("email"),
        name: formData.get("name") || "N/A", 
        createdAt: new Date(), 
    };

    try {
        
        const newEmail = await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed", email: newEmail });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Failed to subscribe", error: error.message });
    }
}

export async function GET(request) {
    await connectDB(); 

    try {
        
        const emails = await EmailModel.find({}).select("email name createdAt");
        return NextResponse.json({ emails });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Failed to fetch emails", error: error.message });
    }
}

export async function DELETE(request) {
    await connectDB(); 

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, msg: "No id provided" });
    }

    try {
       
        const deletedEmail = await EmailModel.findByIdAndDelete(id);
        if (!deletedEmail) {
            return NextResponse.json({ success: false, msg: "Email not found" });
        }
        return NextResponse.json({ success: true, msg: "Email Deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Failed to delete email", error: error.message });
    }
}
