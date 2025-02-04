export async function GET() {
    console.log("🔍 API_KEY:", process.env.GRIST_API_KEY);
    console.log("🔍 DOC_ID:", process.env.GRIST_DOC_ID);
    console.log("🔍 TABLE_NAME:", process.env.GRIST_TABLE_NAME);
    console.log("🔍 GRIST_URL:", process.env.GRIST_URL);
  
    const API_KEY = process.env.GRIST_API_KEY;
    const DOC_ID = process.env.GRIST_DOC_ID;
    const TABLE_NAME = process.env.GRIST_TABLE_NAME;
    const GRIST_URL = process.env.GRIST_URL;
  
    if (!API_KEY || !DOC_ID || !TABLE_NAME || !GRIST_URL) {
      return new Response(
        JSON.stringify({ error: "🚨 Variables d'environnement manquantes !" }),
        { status: 500 }
      );
    }
  
    const url = `${GRIST_URL}/api/docs/${DOC_ID}/tables/${TABLE_NAME}/records`;
    const headers = { Authorization: `Bearer ${API_KEY}` };
  
    try {
      const res = await fetch(url, { headers });
  
      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }
  
      const data = await res.json();
      return Response.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: "Unknown error" }), { status: 500 });
    }
    
  }
  