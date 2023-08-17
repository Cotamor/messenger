'use client'

import clsx from 'clsx'
import ReactSelect, { Options, StylesConfig, defaultTheme } from 'react-select'

interface SelectProps {
  label: string
  value?: Record<string, any>
  onChange: (value: Record<string, any>) => void
  options: Record<string, any>[]
  disabled?: boolean
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  const customStyles: StylesConfig = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (styles) => {
      return {
        ...styles,
        fontSize: '14px',
      }
    },
    placeholder: (styles) => {
      return {
        ...styles,
        fontSize: '14px',
      }
    }
  }

  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={customStyles}
        />
      </div>
    </div>
  )
}
export default Select
