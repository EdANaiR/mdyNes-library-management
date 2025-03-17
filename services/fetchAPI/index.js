export const postAPI = async (
  url, // Changed from URL to url
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL && !url.startsWith("/api")) {
      throw new Error("URL bulunamadı!");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const fullUrl = url.startsWith("/api") ? url : `${baseUrl}${url}`;

    console.log("API isteği gönderiliyor:", fullUrl);

    const response = await fetch(fullUrl, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API yanıt hatası: ${response.status} - ${errorText}`);
    }

    if (response.url.includes("/notification") && response.redirected) {
      if (typeof window !== "undefined") {
        window.location.href = response.url;
        return null;
      }
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API isteği başarısız:", err);
    throw new Error(`API request failed: ${err.message}`);
  }
};

export const getAPI = async (
  url, // Changed parameter name from URL to url
  headers = { "Content-Type": "application/json" }
) => {
  try {
    // Fix the URL handling
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

    console.log("GET isteği gönderiliyor:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: headers,
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API yanıt hatası: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API'den dönen veri:", data);
    return data;
  } catch (err) {
    console.error("GET isteği başarısız:", err);
    throw new Error(`API request failed: ${err.message}`);
  }
};
