import {
  RegisterLink,
  LoginLink
} from '@kinde-oss/kinde-auth-nextjs/components'
import { Button } from '@/app/components/catalyst/button'

const LoginPage = () => {
  return (
    <div className="bg-black w-screen h-screen flex flex-col justify-center items-center text-white">
      <div className="p-4 flex flex-col gap-4">
        <Button color="indigo">
          <LoginLink>sign in</LoginLink>
        </Button>
        {/* <LoginLink className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600">
          sign in
        </LoginLink> */}
        <Button color="indigo">
          <RegisterLink>sign up</RegisterLink>
        </Button>
        {/* <RegisterLink className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600">
          sign up
        </RegisterLink> */}
      </div>
    </div>
  )
}

export default LoginPage
