export interface EncryptedPayload {
  data: string;
  iv: string;
  key: string;
}

export async function encryptData(data: string): Promise<EncryptedPayload> {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(data)
  );

  // Converta os valores binários para Base64 para enviar
  return {
    data: arrayBufferToBase64(new Uint8Array(encryptedData)),
    iv: arrayBufferToBase64(iv),
    key: arrayBufferToBase64(
      new Uint8Array(await crypto.subtle.exportKey('raw', key))
    ),
  };
}

export function arrayBufferToBase64(buffer: Uint8Array) {
  return btoa(String.fromCharCode(...buffer));
}
