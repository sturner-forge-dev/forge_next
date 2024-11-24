import { forwardRef } from 'react'
import { Input } from '@/app/components/catalyst/input'
import clsx from 'clsx'

export const DarkInput = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<typeof Input>
>(function DarkInput(props, ref) {
  return (
    <Input
      {...props}
      ref={ref}
      className={clsx(
        'bg-white border-gray-700 rounded-md',
        'placeholder-gray-500 focus:border-indigo-500',
        '[&>input]:text-gray-900 dark:[&>input]:text-gray-900',
        props.className
      )}
    />
  )
})
