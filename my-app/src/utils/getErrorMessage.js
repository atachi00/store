// достаёт текст ошибки, который прислал сервер
export const getErrorMessage = (err, fallback = 'Что-то пошло не так') =>
  err?.response?.data?.message || fallback
