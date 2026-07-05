export const runtime = 'edge'

export async function POST(req) {
  return new Response(JSON.stringify({ status: 'ok', key: process.env.GEMINI_API_KEY ? 'set' : 'not-set' }), {
    headers: { 'content-type': 'application/json' },
  })
}
