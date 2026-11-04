import { AuthShell } from "@/components/auth-shell"
import { PasswordField } from "@/components/password-field"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  return (
    <AuthShell>
      <Card className="w-full max-w-[22.5rem] shadow-lg shadow-primary/5">
        <CardHeader className="!gap-0 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to continue to your account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6">
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between gap-4">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <PasswordField autoComplete="current-password" />
              </Field>
            </FieldGroup>

            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>

            <FieldSeparator>or continue with</FieldSeparator>
            <SocialLoginButtons />
          </form>
        </CardContent>

        <CardFooter className="justify-center gap-1 border-t pt-6 text-sm text-muted-foreground">
          <span>Don&apos;t have an account?</span>
          <a href="/sign-up" className="font-medium text-foreground underline-offset-4 hover:underline">
            Create an account
          </a>
        </CardFooter>
      </Card>
    </AuthShell>
  )
}
