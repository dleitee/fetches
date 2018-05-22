import unfetch from 'unfetch'

if (typeof window === 'object' && !window.fetch && typeof fetch === 'undefined') {
  window.fetch = unfetch
}
