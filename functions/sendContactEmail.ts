import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        // Parse the request body
        const { name, email, message } = await req.json();
        
        // Validate input
        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }
        
        const base44 = createClientFromRequest(req);
        
        // Send email using service role (no auth required for public contact form)
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: 'Arielshemesh3333@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            body: `
You have received a new message through your portfolio contact form:

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from your portfolio website contact form
            `
        });
        
        return Response.json({ success: true });
    } catch (error) {
        console.error('Error sending contact email:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});