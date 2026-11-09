export const getToken = () => localStorage.getItem('token')

// безопасно читаем данные из JWT (только для интерфейса, не для защиты!)
export function getPayload() {
  try {
    const token = getToken()
    if (!token) return null

    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))

    // токен просрочен
    if (payload.exp && payload.exp * 1000 < Date.now()) return null

    return payload
  } catch {
    return null
  }
}

export const getRole = () => getPayload()?.role ?? null
export const isAuthed = () => getPayload() !== null
export const logout = () => localStorage.removeItem('token')
