import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me().catch(() => null);
        
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Send email using Core integration
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: 'arielshemesh1999@gmail.com',
            subject: `New Contact Form Message from ${name}`,
            from_name: 'Portfolio Contact Form',
            body: `
You have received a new message through your portfolio contact form:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name}
📧 Email: ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Sent: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' })}
🌐 Source: Portfolio Website Contact Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `
        });

        // Save to database
        await base44.asServiceRole.entities.ContactMessage.create({
            name,
            email,
            message,
            status: 'new'
        });

        return Response.json({ 
            success: true, 
            message: 'Email sent successfully' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return Response.json({ 
            error: error.message || 'Failed to send email',
            details: error.toString()
        }, { status: 500 });
    }
});