export const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL && !URL.startsWith("/api")) {
      throw new Error("URL bulunamadı!");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const fullUrl = URL.startsWith("/api") ? URL : `${baseUrl + URL}`;

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
  URL,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    let fullUrl;

    if (typeof window === "undefined") {
      const protocol =
        process.env.NODE_ENV === "development" ? "http" : "https";
      const host = process.env.VERCEL_URL || "localhost:3000";
      fullUrl = `${protocol}://${host}${URL}`;
    } else {
      fullUrl = URL;
    }

    console.log("GET isteği gönderiliyor:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: headers,
      cache: "no-store",
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
