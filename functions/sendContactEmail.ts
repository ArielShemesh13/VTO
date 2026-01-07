import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { to, name, email, message } = await req.json();

    await base44.integrations.Core.SendEmail({
      to: to,
      subject: `New Contact Form Inquiry from ${name}`,
      body: `
You have received a new message through your portfolio contact form:

Sender Name: ${name}
Sender Email: ${email}

Message:
${message}

---
Date Received: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
      `
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});