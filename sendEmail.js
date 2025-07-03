
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    console.log("Email from:", email, "Name:", name, "Message:", message);
    return res.status(200).json({ success: true });
  }
  res.status(405).end();
}
