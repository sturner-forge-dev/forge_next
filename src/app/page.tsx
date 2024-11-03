import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const { getUser } = getKindeServerSession()
const user = await getUser()

const href = user ? '/home' : '/login'

export default function LandingPage() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4 text-blue-500/80">Forge Fitness</h1>
        <p className="text-2xl text-white/80">A serious fitness tracker</p>
        <p className="text-2xl text-white/80 mb-4">With none of the fluff</p>
        <div>
          <Link href={href}>
            <button className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
