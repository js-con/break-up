import { describe, expect, it } from 'vitest'
import { AESdecrypt, AESencrypt } from '../src/shared/utils'

describe('utils', () => {
  it('has correct crypto func', () => {
    const message = [1, 2, 3, 4, 0, 2, 4, 3, 7, 7].join('')
    const encrypted = AESencrypt(message)
    const decrypted = AESdecrypt(encrypted)
    expect(decrypted).toBe(message)
  })
})
