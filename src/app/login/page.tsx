import {
  RegisterLink,
  LoginLink,
  LogoutLink
} from '@kinde-oss/kinde-auth-nextjs/components'

const LoginPage = () => {
  return (
    <div className="bg-black w-screen h-screen flex flex-col justify-center items-center text-white">
      <div className="p-4 flex flex-col gap-4">
        <LoginLink className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600">
          sign in
        </LoginLink>
        <RegisterLink className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600">
          sign up
        </RegisterLink>
        <LogoutLink className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600">
          log out
        </LogoutLink>
      </div>
    </div>
  )
}

export default LoginPage
