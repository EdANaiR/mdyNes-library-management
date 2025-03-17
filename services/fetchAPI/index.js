export const postAPI = async (
  url,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    // Get the base URL based on environment
    const baseUrl = getBaseUrl();
    // Create absolute URL
    const fullUrl = url.startsWith("/api")
      ? `${baseUrl}${url}`
      : `${baseUrl}/api${url}`;

    console.log("API isteği gönderiliyor:", fullUrl);

    const response = await fetch(fullUrl, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    // Rest of your function remains the same
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API yanıt hatası: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API isteği başarısız:", err);
    throw new Error(`API request failed: ${err.message}`);
  }
};

export const getAPI = async (
  url,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    // Get the base URL based on environment
    const baseUrl = getBaseUrl();
    // Create absolute URL
    const fullUrl = url.startsWith("/api")
      ? `${baseUrl}${url}`
      : `${baseUrl}/api${url}`;

    console.log("GET isteği gönderiliyor:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    // Rest of your function remains the same
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

// Helper function to get the base URL
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser environment
    return window.location.origin;
  }

  // Server environment
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  // Local development
  return "http://localhost:3000";
}
