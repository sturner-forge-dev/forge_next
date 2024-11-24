import { forwardRef } from 'react'
import { Textarea } from '@/app/components/catalyst/textarea'
import clsx from 'clsx'

export const DarkTextarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithRef<typeof Textarea>
>(function DarkTextarea(props, ref) {
  return (
    <Textarea
      {...props}
      ref={ref}
      className={clsx(
        'bg-white border-gray-700 rounded-md',
        'placeholder-gray-500 focus:border-indigo-500',
        '[&>textarea]:text-gray-900 dark:[&>textarea]:text-gray-900',
        props.className
      )}
    />
  )
})
