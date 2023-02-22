export interface AuthenticationModel {
  email: string
  password: string
}

export interface AuthenticationInterface {
  auth: (authentication: AuthenticationModel) => Promise<string | null>
}
