export type AuthenticationInterfaceParams = {
  email: string
  password: string
}

export interface AuthenticationInterface {
  auth: (authentication: AuthenticationInterfaceParams) => Promise<string | null>
}
