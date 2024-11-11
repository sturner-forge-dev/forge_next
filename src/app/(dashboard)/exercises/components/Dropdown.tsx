import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

interface DropdownProps {
  options: { label: string; id: number }[]
  onChange: (value: string) => void
  label: string
  value: string | null
}

export default function Dropdown({
  options,
  onChange,
  label,
  value
}: DropdownProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <Label className="block text-sm/6 font-medium text-gray-900">
        {label}
      </Label>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 sm:max-w-md">
          <span className="block truncate">
            {value ? (
              value
            ) : (
              <span className="text-gray-400">Select {label}</span>
            )}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.label}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {option.label}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
