import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Save to database with status "new" - the agent will handle sending the email
        await base44.asServiceRole.entities.ContactMessage.create({
            name,
            email,
            message,
            status: 'new'
        });

        return Response.json({ 
            success: true, 
            message: 'Message saved successfully - agent will send email' 
        });
    } catch (error) {
        console.error('Error saving message:', error);
        return Response.json({ 
            error: error.message || 'Failed to save message',
            details: error.toString()
        }, { status: 500 });
    }
});