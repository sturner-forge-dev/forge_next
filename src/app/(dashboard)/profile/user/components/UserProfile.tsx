'use client'

import { useEffect, useState } from 'react'
import { updateUserAction } from '../../actions'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'

// Components
import PageLayout from '@/app/components/PageLayout'
import { Button } from '@/app/components/catalyst/button'
import { Checkbox, CheckboxField } from '@/app/components/catalyst/checkbox'
import { Divider } from '@/app/components/catalyst/divider'
import { Label } from '@/app/components/catalyst/fieldset'
import { Heading, Subheading } from '@/app/components/catalyst/heading'
import { Input } from '@/app/components/catalyst/input'
import { Text } from '@/app/components/catalyst/text'
import { Textarea } from '@/app/components/catalyst/textarea'
import Messaging from '@/app/components/Messaging'

export default function UserProfileForm({ user }: { user: User }) {
  const router = useRouter()

  const [profileUser, setProfileUser] = useState<User>(user)
  const [phoneError, setPhoneError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 0) return ''
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6)
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`
  }

  const validatePhone = (phone: string) => {
    setPhoneError('')
    const formatted = formatPhoneNumber(phone)

    if (phone && phone.replace(/\D/g, '').length !== 10) {
      setPhoneError('Phone number must be 10 digits')
      return
    }

    if (profileUser) {
      setProfileUser({ ...profileUser, phone: formatted })
    }
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
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      if (!profileUser) {
        throw new Error('Profile user is undefined')
      }

      if (
        !profileUser.firstName ||
        !profileUser.lastName ||
        !profileUser.email
      ) {
        throw new Error('Please fill in all required fields')
      }

      const saveUser = {
        ...user,
        ...profileUser,
        phone: formatPhoneNumber(profileUser?.phone || '')
      }

      const newUser = await updateUserAction(saveUser)

      if (newUser) {
        router.refresh()
        setSuccessMessage('Profile saved successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Error saving profile. Please try again.'
      )
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setProfileUser(user)
  }

  useEffect(() => {
    setProfileUser(user)
  }, [user])

  return (
    <PageLayout>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <Messaging
          successMessage={successMessage}
          errorMessage={errorMessage}
        />

        <Heading>Profile Settings</Heading>
        <Divider className="my-10 mt-6" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>User Name</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Input
              required
              aria-label="First Name"
              name="firstName"
              value={profileUser?.firstName || ''}
              onChange={handleOnChange}
              placeholder="First Name"
            />

            <Input
              required
              className="mt-3"
              aria-label="Last Name"
              name="lastName"
              value={profileUser?.lastName || ''}
              onChange={handleOnChange}
              placeholder="Last Name"
            />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Bio</Subheading>
            <Text>
              Tell us a little bit about yourself. This will be displayed on
              your public profile. Maximum 240 characters.
            </Text>
          </div>
          <div>
            <Textarea
              aria-label="Bio"
              name="bio"
              value={profileUser?.bio || ''}
              onChange={(e) =>
                setProfileUser((prev) => ({ ...prev!, bio: e.target.value }))
              }
              maxLength={240}
              placeholder="Bio"
            />
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Email</Subheading>
            <Text>(We promise not to spam you.)</Text>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              aria-label="Organization Email"
              name="email"
              defaultValue={profileUser?.email || 'info@example.com'}
              onChange={handleOnChange}
            />
            <CheckboxField>
              <Checkbox
                name="publicEmail"
                defaultChecked={profileUser?.publicEmail || false}
                onChange={(checked: boolean) =>
                  setProfileUser((prev) => ({
                    ...prev!,
                    publicEmail: checked
                  }))
                }
              />
              <Label>Show email on public profile</Label>
            </CheckboxField>
          </div>
        </section>

        <Divider className="my-10" soft />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Phone Number</Subheading>
            <Text>
              This is used to login to your account. Nothing more, nothing less
            </Text>
          </div>
          <div>
            <Input
              type="tel"
              aria-label="Phone Number"
              name="phone"
              defaultValue={profileUser?.phone || ''}
              onChange={handleOnChange}
              placeholder="(555) 555-5555"
            />
            {phoneError && (
              <Text className="mt-1 text-red-600 text-sm">{phoneError}</Text>
            )}
          </div>
        </section>

        <Divider className="my-10" soft />

        <div className="flex justify-end gap-4">
          <Button
            type="reset"
            onClick={handleReset}
            disabled={isSubmitting}
            color="dark/zinc"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !!phoneError}
            color="indigo"
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </form>
    </PageLayout>
  )
}
