/**
 * Cloudflare Workers 入口
 */
addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method === "POST") {
    // 如果是 POST 请求，则写入 JSON 数据
    return event.respondWith(WriteJSON(request))
  } else if (request.method === "GET") {
    // 如果是 GET 请求，则读取 JSON 数据
    return event.respondWith(ReadJSON(request))
  }
  else {
    // 如果不是 GET 和 POST 请求，则返回 500
    return fetch("https://http.cat/500");
  }
});

/**
 * 
 * @param {*} response 解析 JSON 数据
 * @returns 
 */
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
}

/**
 * 
 * @param {*} request 请求体
 * @returns 
 */
async function ReadJSON(request) {
  const { pathname } = new URL(request.url);
  // 从 KV 数据库中读取 JSON 数据
  // 此步骤需要在 Cloudflare Workers 中绑定 KV 数据库并设置别名为 JSONBASE
  const value = await JSONBASE.get(pathname)
  if (value === null) {
    // 如果没有找到 JSON 数据，则返回 404
    return fetch("https://http.cat/404");
  }
  return new Response(value)
}

/**
 * 
 * @param {*} request 请求体
 * @returns 
 */
async function WriteJSON(request) {
  const { pathname } = new URL(request.url);
  const Body = await gatherResponse(request)
  // 将 JSON 数据写入 KV 数据库
  await JSONBASE.put(pathname, Body)
  return new Response(JSON.stringify({ Body }), {
    headers: { "Content-Type": "application/json" },
  });
}