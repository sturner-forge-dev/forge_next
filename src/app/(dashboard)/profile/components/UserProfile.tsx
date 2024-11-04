'use client'

import { type User } from '@/app/types'
import { useState } from 'react'
import { updateUserAction } from '../actions'

interface UserProfileProps {
  user: User
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [phoneError, setPhoneError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validatePhone = (phone: string) => {
    setPhoneError('')

    // Regex to match (xxx) xxx-xxxx, xxx-xxx-xxxx, xxxxxxxxxx, (xxx)-xxx-xxxx
    const regex = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/
    const numericPhoneValue = numericPhone(phone) || ''

    if (!regex.test(phone) && numericPhoneValue.length !== 10) {
      setPhoneError(
        'Invalid phone number. Acceptable formats: (xxx) xxx-xxxx, xxx-xxx-xxxx, or xxxxxxxxxx'
      )
    }

    setPhone(phone)
  }

  const numericPhone = (phone: string | null) => {
    if (!phone) return null

    return phone.replace(/\D/g, '')
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'email':
        setEmail(value)
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
      const saveUser = {
        ...user,
        firstName,
        lastName,
        email,
        phone: numericPhone(phone)
      }

      const newUser = await updateUserAction(saveUser)

      if (newUser) {
        setFirstName(newUser.firstName)
        setLastName(newUser.lastName)
        setEmail(newUser.email)
        setPhone(newUser.phone)
        setSuccessMessage('Profile saved successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      setErrorMessage('Error saving profile. Please try again.')
      console.error(error)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  return (
    <>
      <form
        action="onSubmit"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl py-4">First Name</h1>
              <input
                type="text"
                name="firstName"
                value={firstName ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
              />

              <h1 className="text-xl py-4">Last Name</h1>
              <input
                type="text"
                name="lastName"
                value={lastName ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl py-4">Email</h1>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
                required
              />

              <h1 className="text-xl py-4">Phone</h1>
              <input
                type="text"
                name="phone"
                value={phone ?? ''}
                onChange={handleOnChange}
                className="text-md text-black min-w-60 pl-2 py-1"
              />
              <small className="text-red-400 mt-1">{phoneError}</small>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-400 px-4 py-2 rounded-lg text-xl border border-white/50 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </>
  )
}

export default UserProfile
