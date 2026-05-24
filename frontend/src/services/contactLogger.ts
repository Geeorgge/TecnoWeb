const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function getDevice(): string {
  const ua = navigator.userAgent
  if (/Mobi|Android/i.test(ua)) return 'Móvil'
  if (/Tablet|iPad/i.test(ua)) return 'Tablet'
  return 'Escritorio'
}

export function logContact(tipo: 'WhatsApp' | 'Llamar', pagina: string): void {
  fetch(`${API_URL}/log/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, pagina, dispositivo: getDevice() }),
  }).catch(() => {})
}
