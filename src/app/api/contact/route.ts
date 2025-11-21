// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // Comprobamos que exista la API key
    if (!process.env.RESEND_API_KEY) {
      console.error("Falta RESEND_API_KEY en las variables de entorno");
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    const { name, email, phone, msg, to } = body;

    if (!name || !email || !msg) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const toEmail = to || process.env.CONTACT_TO_EMAIL || "info@conxima.com";

    const result = await resend.emails.send({
      from: "Conxima <no-reply@conxima.com>", // usa un dominio verificado en Resend
      to: toEmail,
      subject: `Nueva consulta desde la web - ${name}`,
      replyTo: email,
      text: `
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || "No especificado"}

Mensaje:
${msg}
      `.trim(),
      html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #0f172a;">
          <h2 style="margin-bottom: 12px;">Nueva consulta desde la web de CONXIMA</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || "No especificado"}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-line;">${msg}</p>
        </div>
      `,
    });

    console.log("Resend result:", result);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje." },
      { status: 500 }
    );
  }
}
