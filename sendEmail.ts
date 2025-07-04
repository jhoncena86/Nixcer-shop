import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, address, cartItems } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_TO,
    subject: "New Order from Website",
    text: `
      Name: ${name}
      Email: ${email}
      Address: ${address}
      Cart Items:
      ${cartItems.map(item => `${item.name} - Quantity: ${item.quantity}`).join("\n")}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response("Failed to send email", { status: 500 });
  }
}
