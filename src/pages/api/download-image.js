// pages/api/download-image.js
export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: "Image URL is required" });
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
  
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      // Force download headers
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Disposition", "attachment; filename=generated-image.png");
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: "Download failed", details: error.message });
    }
  }
  