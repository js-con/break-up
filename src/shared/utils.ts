import { AES, enc } from 'crypto-js'

export function AESencrypt(message: string) {
  const result = AES.encrypt(message, 'lolicon')
  return result.toString()
}

export function AESdecrypt(encrypted: string) {
  const result = AES.decrypt(encrypted, 'lolicon')
  return result.toString(enc.Utf8)
}
