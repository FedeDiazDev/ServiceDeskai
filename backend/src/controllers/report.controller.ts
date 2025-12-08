import nodemailer from 'nodemailer';
import { TicketModel } from '../models/Ticket';
import { Request, Response } from 'express';

export const sendReportEmail = async (req: Request, res: Response) => {
    try {
        const { ticketId, to } = req.body;
        if (!ticketId || !to) {
            return res.status(400).json({ message: 'ticketId and to are required' });
        }
        const ticket = await TicketModel.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        let html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #eee; border-radius:8px; padding:24px;">
                <h2 style="color:#2563eb;">Ticket Report</h2>
                <p><strong>Title:</strong> ${ticket.title}</p>
                <p><strong>Description:</strong> ${ticket.description}</p>
                <p><strong>Priority:</strong> ${ticket.priority}</p>
                <p><strong>Status:</strong> ${ticket.status}</p>
        `;
        let attachments = [];
        if (ticket.attachments && ticket.attachments.length > 0) {
            const img = ticket.attachments[0];
            if (img.startsWith('data:image')) {
                html += `<p><strong>Attachment:</strong></p><img src="cid:ticketimg" alt="attachment" style="max-width:100%;border-radius:6px;"/>`;
                attachments.push({ filename: 'attachment.png', content: img.split(',')[1], encoding: 'base64', cid: 'ticketimg' });
            } else {
                html += `<p><strong>Attachment:</strong></p><img src="${img}" alt="attachment" style="max-width:100%;border-radius:6px;"/>`;
            }
        }
        html += '</div>';

        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject: `Ticket Report: ${ticket.title}`,
            html,
            attachments
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Report email sent successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message || 'Error sending report email' });
    }
};
