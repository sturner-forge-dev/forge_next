import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

// Create separate interfaces for single and multiple selection
interface BaseDropdownProps {
  options: { label: string; id: number }[]
  label?: string
  name?: string
}

interface SingleDropdownProps extends BaseDropdownProps {
  multiple?: false
  value: string
  onChange: (value: string) => void
}

interface MultipleDropdownProps extends BaseDropdownProps {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

type DropdownProps = SingleDropdownProps | MultipleDropdownProps

export default function Dropdown(props: DropdownProps) {
  const { options, label, name } = props

  // Helper function to display selected values
  const displayValue = () => {
    if (!props.value)
      return <span className="text-gray-400">Select {name}</span>
    if (props.multiple && Array.isArray(props.value)) {
      return props.value.length > 0 ? (
        props.value.join(', ')
      ) : (
        <span className="text-gray-400">Select {name}</span>
      )
    }
    return props.value
  }

  return (
    <Listbox
      value={props.value}
      onChange={props.onChange}
      multiple={props.multiple}
    >
      {label && (
        <Label className="block text-sm/6 font-medium text-gray-900">
          {label}
        </Label>
      )}
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 sm:max-w-md">
          <span className="block truncate">{displayValue()}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm">
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.label}
              className={({ active, selected }) => `
                relative cursor-default select-none py-2 pl-3 pr-9
                ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}
                ${selected ? 'bg-indigo-50' : ''}
              `}
            >
              {({ selected }) => (
                <span
                  className={`block truncate ${
                    selected ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  {option.label}
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
