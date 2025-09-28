// // app/api/public/contact/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
// import { connectToDatabase } from "@/lib/mongodb";
// import { ContactMessage } from "@/lib/models/Conact";

// // ✅ Zod schema for validation
// const ContactSchema = z.object({
//   name: z.string().min(2, "Name is too short"),
//   email: z.string().email("Invalid email address"),
//   subject: z.string().min(3),
//   message: z.string().min(10, "Message should be more descriptive"),
// });

// // ✅ POST /api/public/contact
// export async function POST(req: NextRequest) {
//   try {
//     await connectToDatabase();

//     // const body = await req.json();
//     const { fullName, email, messageType, subject, message } = await req.json();
//     const parsed = ContactSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { error: "Validation failed", details: parsed.error.format() },
//         { status: 400 }
//       );
//     }

//     const saved = await ContactMessage.create(parsed.data);

//     // (Optional) You could trigger an email notification here
//     // await sendContactNotification(saved)

//     return NextResponse.json(
//       { message: "Message received successfully!", data: saved },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST /contact error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }





















// app/api/public/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
// import { ContactMessage } from "@/lib/models/index";
import { sendEmail } from "@/lib/utils/ses";
import { getContactMessageModel } from "@/lib/models";

// ✅ Zod schema for validation
const ContactSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  messageType: z.string().optional(),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message should be more descriptive"),
});

// ✅ POST /api/public/contact
export async function POST(req: NextRequest) {
  try {
        await connectToDatabase();
    // 🛠 Parse and validate body
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    // 🛠 Save message in DB
    const ContactMessage=getContactMessageModel();
    const saved = await ContactMessage.create(parsed.data);

    // 🛠 Send email to Admin
    await sendEmail({
      to: process.env.CONTACT_RECEIVER_EMAIL as string,
      subject: `📩 New Contact Message: ${parsed.data.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Full Name:</strong> ${parsed.data.fullName}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Message Type:</strong> ${parsed.data.messageType || "General"}</p>
        <p><strong>Subject:</strong> ${parsed.data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${parsed.data.message}</p>
      `,
      text: `
New Contact Message:

Full Name: ${parsed.data.fullName}
Email: ${parsed.data.email}
Message Type: ${parsed.data.messageType || "General"}
Subject: ${parsed.data.subject}

Message:
${parsed.data.message}
      `,
    });

    // 🛠 (Optional) Send confirmation email to user
    await sendEmail({
      to: parsed.data.email,
      subject: "✅ We received your message",
      html: `
        <h3>Hi ${parsed.data.fullName},</h3>
        <p>Thanks for contacting us. We’ve received your message and our team will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote>${parsed.data.message}</blockquote>
        <br/>
        <p>Best Regards,<br/>Support Team</p>
      `,
      text: `
Hi ${parsed.data.fullName},

Thanks for contacting us. We’ve received your message and our team will get back to you shortly.

Your Message:
${parsed.data.message}

Best Regards,
Support Team
      `,
    });

    return NextResponse.json(
      { message: "Message received successfully!", data: saved },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ POST /contact error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
