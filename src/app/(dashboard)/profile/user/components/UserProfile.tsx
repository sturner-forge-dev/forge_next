'use client'
import { useEffect, useState } from 'react'
import { updateUserAction } from '../../actions'
import { useRouter } from 'next/navigation'
import { useUser } from '../UserContext'

export default function UserProfileForm() {
  const user = useUser()
  const router = useRouter()

  const [profileUser, setProfileUser] = useState(user)
  const [phoneError, setPhoneError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validatePhone = (phone: string) => {
    setPhoneError('')

    const regex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/
    const numericPhoneValue = numericPhone(phone) || ''

    if (!regex.test(phone) && numericPhoneValue.length !== 10) {
      setPhoneError(
        'Invalid phone number. Acceptable formats: (xxx) xxx-xxxx, xxx-xxx-xxxx, or xxxxxxxxxx'
      )
    }

    if (profileUser) {
      // Add null check
      setProfileUser({ ...profileUser, phone }) // profileUser is guaranteed to have all required fields
    }
  }

  const numericPhone = (phone: string | null) => {
    if (!phone) return null

    return phone.replace(/\D/g, '')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'firstName':
        if (profileUser) {
          setProfileUser({ ...profileUser, firstName: value })
        }
        break
      case 'lastName':
        if (profileUser) {
          setProfileUser({ ...profileUser, lastName: value })
        }
        break
      case 'email':
        if (profileUser) {
          setProfileUser({ ...profileUser, email: value })
        }
        break
      case 'phone':
        validatePhone(value)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!profileUser) {
        throw new Error('Profile user is undefined')
      }

      const saveUser = {
        ...user,
        ...profileUser,
        phone: numericPhone(profileUser?.phone)
      }

      const newUser = await updateUserAction(saveUser)

      if (newUser) {
        router.refresh()
        setSuccessMessage('Profile saved successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      setErrorMessage('Error saving profile. Please try again.')
      console.error(error)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  useEffect(() => {
    setProfileUser(user)
  }, [user])

  return (
    <>
      <form
        action="onSubmit"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col m-auto">
          <div className="flex gap-44">
            <div className="flex flex-col">
              <h1 className="text-xl py-4">First Name</h1>
              <input
                type="text"
                name="firstName"
                value={profileUser?.firstName ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
              />

              <h1 className="text-xl py-4">Last Name</h1>
              <input
                type="text"
                name="lastName"
                value={profileUser?.lastName ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl py-4">Email</h1>
              <input
                type="email"
                name="email"
                value={profileUser?.email ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
                required
              />

              <h1 className="text-xl py-4">Phone</h1>
              <input
                type="phone"
                name="phone"
                value={profileUser?.phone ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
              />
              <small className="text-red-400 mt-1">{phoneError}</small>
            </div>
          </div>

          <div className="flex gap-4 mt-4 justify-end">
            <button
              type="submit"
              className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
          {successMessage && (
            <p className="text-green-500 mt-2 text-right">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-2 text-right">{errorMessage}</p>
          )}
        </div>
      </form>
    </>
  )
}
