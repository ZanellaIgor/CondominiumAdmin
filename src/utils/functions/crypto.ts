export interface EncryptedPayload {
  data: string;
  iv: string;
  key: string;
  authTag: string;
}

export async function encryptData(data: string): Promise<EncryptedPayload> {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(data)
  );

  const encryptedBytes = new Uint8Array(encryptedBuffer);

  const authTag = encryptedBytes.slice(encryptedBytes.length - 16);
  const ciphertext = encryptedBytes.slice(0, encryptedBytes.length - 16);

  return {
    data: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv),
    key: arrayBufferToBase64(
      new Uint8Array(await crypto.subtle.exportKey('raw', key))
    ),
    authTag: arrayBufferToBase64(authTag),
  };
}

export function arrayBufferToBase64(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer));
}

export async function decryptData({
  encryptedData,
  keyBase64,
  ivBase64,
  authTagBase64,
}: {
  encryptedData: string;
  keyBase64: string;
  ivBase64: string;
  authTagBase64: string;
}) {
  const decoder = new TextDecoder();

  const encryptedDataArray = Uint8Array.from(atob(encryptedData), (c) =>
    c.charCodeAt(0)
  );

  const ivArray = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
  const authTagArray = Uint8Array.from(atob(authTagBase64), (c) =>
    c.charCodeAt(0)
  );
  const keyArray = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));

  const encryptedWithAuthTag = new Uint8Array(
    encryptedDataArray.length + authTagArray.length
  );
  encryptedWithAuthTag.set(encryptedDataArray);
  encryptedWithAuthTag.set(authTagArray, encryptedDataArray.length);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyArray,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivArray,
    },
    cryptoKey,
    encryptedWithAuthTag
  );

  return decoder.decode(decryptedData);
}
