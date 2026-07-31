import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // 1. Extraer la ruta base
  // /img-proxy/club-a/image.jpg -> /club-a/image.jpg
  const imagePath = url.pathname.replace(/^\/img-proxy/, "");
  
  if (!imagePath || imagePath === "/") {
    return new Response("Missing image path", { status: 400 });
  }

  // 2. Seguridad: Prevención estricta de SSRF
  // Eliminamos slashes iniciales para evitar que `new URL()` lo interprete como //evil.com
  const cleanPath = imagePath.replace(/^\/+/, "");
  
  let targetUrl: URL;
  try {
    targetUrl = new URL(`/${cleanPath}`, "https://photo.yupoo.com");
  } catch (error) {
    return new Response("Invalid URL", { status: 400 });
  }
  
  // Validación final paranoica
  if (targetUrl.hostname !== "photo.yupoo.com") {
    return new Response("Forbidden target", { status: 403 });
  }

  // 3. Proxying
  try {
    const response = await fetch(targetUrl.href, {
      method: "GET",
      headers: {
        "Referer": "https://x.yupoo.com/",
        "User-Agent": request.headers.get("User-Agent") || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
    });

    if (!response.ok) {
      // Devolvemos 404 para que el frontend (onError) maneje el placeholder gracefully
      return new Response("Image proxy failed", { status: response.status === 403 ? 404 : response.status });
    }

    // 4. Retransmitir el body directamente como stream (zero memory footprint)
    const responseHeaders = new Headers(response.headers);
    
    // 5. Caché agresivo perimetral
    // public: cacheable por el CDN y el navegador
    // s-maxage: caché en los nodos de Netlify por 1 año
    // max-age: caché en el navegador por 1 año
    // immutable: no se requiere revalidación (las URLs de imágenes de Yupoo no mutan)
    responseHeaders.set(
      "Cache-Control", 
      "public, max-age=31536000, s-maxage=31536000, immutable"
    );
    
    // Evitar filtrado de cookies del proveedor
    responseHeaders.delete("set-cookie");
    
    return new Response(response.body, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Img-Proxy Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
