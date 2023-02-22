export interface Hasher { // Hasher não é reversível
  hash: (value: string) => Promise<string>
}
