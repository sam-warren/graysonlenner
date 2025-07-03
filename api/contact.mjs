import { Resend } from 'resend'

export const runtime = 'nodejs'

const formatMessage = (message) => {
  return message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" style="color: #007bff; text-decoration: underline;">$1</a>',
    )
    .split('\n')
    .join('<br>')
}

export default async function handler(req, res) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!process.env.RESEND_FROM_EMAIL || !process.env.CONTACT_EMAIL) {
      return res.status(500).json({ error: 'Email configuration missing' })
    }

    // Send email to Clarke Engineering
    const notificationEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `${subject} | ${name}`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #333; max-width: 600px;">
          <div style="white-space: pre-wrap;">
            ${formatMessage(message)}
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            From: ${name} (${email})
          </div>
        </div>
      `,
      replyTo: email,
    })

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: `Thank you for reaching out to Grayson Lenner`,
      html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #333; max-width: 600px;">
          <h2 style="color: #000;">Thank you for reaching out!</h2>
          
          <p>I've received your message and truly appreciate you taking the time to connect. Here's what you sent:</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <strong style="color: #475569;">Subject:</strong>
            <p style="margin-top: 5px;">${subject}</p>
            
            <strong style="color: #475569;">Message:</strong>
            <div style="margin-top: 5px; white-space: pre-wrap;">
              ${formatMessage(message)}
            </div>
          </div>
          
          <p>I'll review your message and get back to you as soon as possible. Whether it's about collaborations, press inquiries, or just to say hello, I always love hearing from listeners and fellow music enthusiasts.</p>
          
          <p><strong>Want to stay connected?</strong><br>
          Follow me on my social media channels or check out my latest music on <a href="https://open.spotify.com/artist/your-artist-id" style="color: #000; text-decoration: underline;">Spotify</a> while you wait for my response!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              Best regards,<br>
              Grayson Lenner<br>
              Victoria, BC
            </p>
          </div>
        </div>
      `,
      replyTo: process.env.CONTACT_EMAIL,
    })

    return res.status(200).json({ 
      success: true, 
      data: {
        notification: notificationEmail,
        confirmation: confirmationEmail
      }
    })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({
      error: 'Error sending email',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    })
  }
}