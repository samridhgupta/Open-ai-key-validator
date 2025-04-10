import { OpenAIApi, Configuration } from 'openai';

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    
    const configuration = new Configuration({
      apiKey: key,
    });
    
    const openai = new OpenAIApi(configuration);
    
    try {
      // Make a simple test request
      await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Test" }],
      });
      
      return new Response(JSON.stringify({ valid: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ 
        valid: false, 
        error: error.response?.data?.error?.message || 'Invalid API key'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}