// GTM DataLayer utility functions

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !(window as any).dataLayer) {
  (window as any).dataLayer = []
}

// Send custom event to GTM
export const gtmEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

// Specific function for keyboard events
export const trackKeyPress = (key: string, keyType: 'letter' | 'number' | 'special' | 'modifier') => {
  gtmEvent('key_press', {
    key_pressed: key,
    key_type: keyType,
    timestamp: new Date().toISOString(),
  })
}

// Track session statistics
export const trackKeyboardSession = (totalKeys: number, sessionDuration: number) => {
  gtmEvent('keyboard_session', {
    total_keys_pressed: totalKeys,
    session_duration_seconds: sessionDuration,
    keys_per_minute: Math.round((totalKeys / sessionDuration) * 60),
  })
}
