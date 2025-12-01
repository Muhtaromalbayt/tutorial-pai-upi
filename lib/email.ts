export async function sendFeedbackEmail(feedback: any, apiKey?: string) {
    if (!apiKey) {
        console.warn("RESEND_API_KEY is not set. Skipping email notification.");
        return;
    }

    const resend = new Resend(apiKey);

    try {
        await resend.emails.send({
            from: 'Tutorial PAI <onboarding@resend.dev>', // Update this with your verified domain
            to: ['tutorialpai.upi@gmail.com'], // Update with admin email
            subject: `[Feedback] ${feedback.category}: ${feedback.subject}`,
            html: `
                <h1>Feedback Baru</h1>
                <p><strong>Kategori:</strong> ${feedback.category}</p>
                <p><strong>Subjek:</strong> ${feedback.subject}</p>
                <p><strong>Pesan:</strong></p>
                <p>${feedback.message}</p>
                <hr />
                <p><strong>Pengirim:</strong> ${feedback.isAnonymous ? 'Anonim' : `${feedback.name} (${feedback.email})`}</p>
                <p><strong>ID:</strong> ${feedback.id}</p>
            `
        });
    } catch (error) {
        console.error("Failed to send email notification:", error);
    }
}
