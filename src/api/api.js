const KEY = import.meta.env.VITE_API_KEY;

const API_ERRORS = {
  "Empty key!": "Не указан ключ доступа к API.",
  "Invalid key client!":
    "Неверный ключ доступа. Проверьте настройки приложения.",
  "Empty number goods!": "Не указан артикул детали.",
  "Request quota exceeded!":
    "Превышен лимит запросов на поиск грузовых запчастей.",
};

export async function fetchParts(params) {
  const queryStr = new URLSearchParams({ key: KEY, ...params });

  const res = await fetch(`/api/?${queryStr}`).catch(() => {
    throw new Error(
      "Не удалось связаться с сервером. Проверьте подключение к сети.",
    );
  });

  const data = await res.json().catch(() => null);

  if (data?.error) {
    const errors = Array.isArray(data.error) ? data.error : [data.error];

    throw new Error(
      errors.map((error) => API_ERRORS[error] || error).join(" "),
    );
  }

  if (!res.ok) {
    throw new Error(`Ошибка сервера: ${res.status} ${res.statusText}`);
  }

  if (!data || !Array.isArray(data.goods)) {
    throw new Error("Сервер вернул некорректный ответ.");
  }

  return (data.goods || []).filter((item) => !!item.brand);
}
