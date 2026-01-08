import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Send email directly using Core integration
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: 'arielshemesh1999@gmail.com',
            subject: `הודעה חדשה מאתר הפורטפוליו מ-${name}`,
            from_name: 'Portfolio Website',
            body: `
קיבלת הודעה חדשה מטופס יצירת הקשר באתר הפורטפוליו:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 פרטי השולח
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 שם: ${name}
📧 מייל: ${email}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 תוכן ההודעה
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 נשלח ב: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}
🌐 מקור: אתר הפורטפוליו - טופס יצירת קשר
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `
        });

        // Save to database
        await base44.asServiceRole.entities.ContactMessage.create({
            name,
            email,
            message,
            status: 'processed'
        });

        return Response.json({ 
            success: true, 
            message: 'Email sent and saved successfully' 
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return Response.json({ 
            error: error.message || 'Failed to send email',
            details: error.toString()
        }, { status: 500 });
    }
});