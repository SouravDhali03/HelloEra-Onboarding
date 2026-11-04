"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export function PasswordField({
  autoComplete,
  showRemaining = false,
  id = "password",
  name = "password",
  placeholder = "Enter your password",
  onValueChange,
}: {
  autoComplete: string
  showRemaining?: boolean
  id?: string
  name?: string
  placeholder?: string
  onValueChange?: (value: string) => void
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
        <InputGroupInput
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          minLength={8}
          onChange={(event) => handleChange(event.target.value)}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={showPassword ? "Hide password" : "Show password"}
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
    </div>
  )
}
