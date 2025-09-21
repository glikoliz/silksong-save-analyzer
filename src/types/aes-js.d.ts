declare module 'aes-js' {
  export namespace ModeOfOperation {
    class ecb {
      constructor(key: Uint8Array)
      encrypt(data: Uint8Array): Uint8Array
      decrypt(data: Uint8Array): Uint8Array
    }
  }
}
