import { ModeOfOperation as aes } from 'aes-js'

const cSharpHeader = [0, 1, 0, 0, 0, 255, 255, 255, 255, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0]
const aesKey = stringToBytes('UKu52ePUBwetZ9wNX88o54dnfKRu0T1l')
const ecb = new aes.ecb(aesKey)

// Extend String prototype
declare global {
  interface String {
    reverse(): string
  }
}

String.prototype.reverse = function (): string {
  return this.split("").reverse().join("")
}

export function stringToBytes(string: string): Uint8Array {
  return new TextEncoder().encode(string)
}

export function bytesToString(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes)
}

// Base64 utilities using browser APIs
export function base64Encode(bytes: Uint8Array): Uint8Array {
  const binaryString = Array.from(bytes, byte => String.fromCharCode(byte)).join('')
  const base64String = btoa(binaryString)
  return stringToBytes(base64String)
}

export function base64Decode(bytes: Uint8Array): Uint8Array {
  const base64String = bytesToString(bytes)
  const binaryString = atob(base64String)
  return new Uint8Array(Array.from(binaryString, char => char.charCodeAt(0)))
}

// AES decrypts and removes pkcs7 padding
export function aesDecrypt(bytes: Uint8Array): Uint8Array {
  const data = ecb.decrypt(bytes)
  const paddingLength = data[data.length - 1]
  return data.subarray(0, -paddingLength)
}

// PKCS7 pads and encrypts
export function aesEncrypt(bytes: Uint8Array): Uint8Array {
  const padValue = 16 - bytes.length % 16
  const padded = new Uint8Array(bytes.length + padValue)
  padded.fill(padValue)
  padded.set(bytes)
  return ecb.encrypt(padded)
}

// LengthPrefixedString https://msdn.microsoft.com/en-us/library/cc236844.aspx
export function generateLengthPrefixedString(length: number): number[] {
  let len = Math.min(0x7FFFFFFF, length) // maximum value
  const bytes: number[] = []

  for (let i = 0; i < 4; i++) {
    if (len >> 7 !== 0) {
      bytes.push((len & 0x7F) | 0x80)
      len >>= 7
    } else {
      bytes.push(len & 0x7F)
      len >>= 7
      break
    }
  }

  if (len !== 0) {
    bytes.push(len)
  }

  return bytes
}

export function addHeader(bytes: Uint8Array): Uint8Array {
  const lengthData = generateLengthPrefixedString(bytes.length)
  const newBytes = new Uint8Array(bytes.length + cSharpHeader.length + lengthData.length + 1)

  newBytes.set(cSharpHeader) // fixed header
  newBytes.subarray(cSharpHeader.length).set(lengthData) // variable LengthPrefixedString header
  newBytes.subarray(cSharpHeader.length + lengthData.length).set(bytes) // our data
  newBytes.subarray(cSharpHeader.length + lengthData.length + bytes.length).set([11]) // fixed header (11)

  return newBytes
}

export function removeHeader(bytes: Uint8Array): Uint8Array {
  // Remove fixed csharp header, plus the ending byte 11
  let result = bytes.subarray(cSharpHeader.length, bytes.length - 1)

  // Remove LengthPrefixedString header
  let lengthCount = 0
  for (let i = 0; i < 5; i++) {
    lengthCount++
    if ((result[i] & 0x80) === 0) {
      break
    }
  }

  result = result.subarray(lengthCount)
  return result
}

export function decode(bytes: Uint8Array): string {
  let data = new Uint8Array(bytes)
  data = removeHeader(data)
  data = base64Decode(data)
  data = aesDecrypt(data)
  return bytesToString(data)
}

export function encode(jsonString: string): Uint8Array {
  let bytes = stringToBytes(jsonString)
  bytes = aesEncrypt(bytes)
  bytes = base64Encode(bytes)
  return addHeader(bytes)
}

export function hash(string: string): number {
  return string.split("").reduce((a, b) => {
    return ((a << 5) - a) + b.charCodeAt(0)
  }, 0)
}

function round(value: number, precision: number): number {
  const multi = Math.pow(10, precision)
  return Math.round(value * multi) / multi
}

export function humanTime(date: Date): string {
  const minutes = (new Date().getTime() - date.getTime()) / 1000 / 60
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7
  const months = weeks / 4
  const years = months / 12

  if (minutes < 1) {
    return "now"
  } else if (minutes < 120) {
    return `about ${round(minutes, 0)} minutes ago`
  } else if (hours < 48) {
    return `about ${round(hours, 0)} hours ago`
  } else if (days < 14) {
    return `about ${round(days, 0)} days ago`
  } else if (weeks < 8) {
    return `about ${round(weeks, 0)} weeks ago`
  } else if (months < 24) {
    return `about ${round(months, 1)} months ago`
  }

  return `about ${round(years, 1)} years ago`
}

export function downloadData(data: string | Uint8Array, fileName: string): void {
  const a = document.createElement("a")
  const blob = new Blob([data], { type: "octet/stream" })
  a.setAttribute("href", window.URL.createObjectURL(blob))
  a.setAttribute('download', fileName)
  a.setAttribute('style', 'position: fixed; opacity: 0; left: 0; top: 0;')

  document.body.append(a)
  a.click()
  document.body.removeChild(a)
}