export const postAPI = async (
  URL,
  body,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const fullUrl = URL.startsWith("/api") ? URL : `/api${URL}`;

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
    const fullUrl = URL.startsWith("/api") ? URL : `/api${URL}`;

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
