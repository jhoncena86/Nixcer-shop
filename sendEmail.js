import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ error: 'Only POST allowed' });

  const { name, email, address, cart } = req.body;
  const items = cart.map(p => `- ${p.name} (Rs.${p.price})`).join('\n');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: "New Nixcer Order",
      text: `New order from ${name}\nEmail: ${email}\nAddress: ${address}\nItems:\n${items}`,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Email send failed', details: err.message });
  }
}