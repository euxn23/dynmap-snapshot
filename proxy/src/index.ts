export interface Env {
  R2: R2Bucket
}

const worker: ExportedHandler<Env> = {
  async fetch(request, env): Promise<Response> {
    const prefix = new URL(request.url).searchParams.get('prefix')
    if (!prefix) {
      return new Response('{}', { status: 404, headers: { 'content-type': 'application/json;charset=UTF-8' } })
    }
    const imagesObjects = await env.R2.list({ prefix: prefix })
    const imagesPaths = imagesObjects.objects.map((object) => object.key)
    return new Response(JSON.stringify(imagesPaths), { headers: { 'Access-Control-Allow-Origin': '*' } })
  },
}

export default worker
