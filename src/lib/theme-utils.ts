export function setThemeCookie(key: string, value: string | null) {
	if (typeof window === 'undefined') return

	if (!value) {
		document.cookie = `${key}=; path=/; max-age=0; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`
	} else {
		document.cookie = `${key}=${value}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`
	}
}
