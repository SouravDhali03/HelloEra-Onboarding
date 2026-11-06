"use client"

import { useState } from "react"
import { Eye, EyeOff, LockKeyhole } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { FieldError } from "@/components/ui/field"

export function PasswordField({
  autoComplete,
  showRemaining = false,
  id = "password",
  name = "password",
  placeholder = "Enter your password",
  onValueChange,
  showError = false,
}: {
  autoComplete: string
  showRemaining?: boolean
  id?: string
  name?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  showError?: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const remaining = Math.max(0, 8 - password.length)

  function handleChange(value: string) {
    setPassword(value)
    onValueChange?.(value)
  }

  return (
    <div className="flex flex-col gap-2">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <LockKeyhole aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          name={name}
          value={password}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          minLength={8}
          onChange={(event) => handleChange(event.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            size="icon-sm"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {showRemaining && (
        <p
          aria-live="polite"
          className={
            remaining === 0
              ? "text-xs text-primary"
              : "text-xs text-muted-foreground"
          }
        >
          {remaining === 0
            ? "Minimum length reached"
            : `${remaining} character${remaining === 1 ? "" : "s"} remaining`}
        </p>
      )}
      {showError && password.length < 8 ? <FieldError>Please enter at least 8 characters.</FieldError> : null}
    </div>
  )
}
