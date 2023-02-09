export interface Encrypter { // encrypter é reversível
  encrypt: (value: string) => Promise<string>
}
