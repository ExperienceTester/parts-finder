const KEY = import.meta.env.VITE_API_KEY;

const API_ERRORS = {
  "Empty key!": "Не указан ключ доступа к API.",
  "Invalid key client!":
    "Неверный ключ доступа. Проверьте настройки приложения.",
  "Empty number goods!": "Не указан артикул детали.",
  "Request quota exceeded!":
    "Превышен лимит запросов на поиск грузовых запчастей.",
};

const FATAL_API_ERRORS = [
  "Empty key!",
  "Invalid key client!",
  "Empty number goods!"
];

class ResponseError extends Error {
  constructor(message, retryable = true) {
    super(message);
    this.retryable = retryable;
  }
}

export async function fetchParts(params) {
  const queryStr = new URLSearchParams({ key: KEY, ...params });

  const res = await fetch(`/api/?${queryStr}`).catch(() => {
    throw new ResponseError(
      "Не удалось связаться с сервером. Проверьте подключение к сети."
    );
  });

  const data = await res.json().catch(() => null);

  if (data?.error) {
    const errors = Array.isArray(data.error) ? data.error : [data.error];
    const retryable = !errors.some((error) => FATAL_API_ERRORS.includes(error));

    throw new ResponseError(
      errors.map((error) => API_ERRORS[error] || error).join(" "),
      retryable
    );
  }

  if (!res.ok) {
    const retryable = res.status >= 500 || res.status === 429;
    throw new ResponseError(`Ошибка сервера: ${res.status} ${res.statusText}`, retryable);
  }

  if (!data || !Array.isArray(data.goods)) {
    throw new ResponseError("Сервер вернул некорректный ответ.");
  }

  return (data.goods || []).filter((item) => !!item.brand);
}
