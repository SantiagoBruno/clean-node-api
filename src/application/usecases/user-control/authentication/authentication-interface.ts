export type AuthenticationParams = {
  email: string
  password: string
}

export interface AuthenticationInterface {
  auth: (authentication: AuthenticationParams) => Promise<string | null>
}
