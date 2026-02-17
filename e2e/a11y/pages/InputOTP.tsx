import { FormField } from '@spark-ui/components/form-field'
import { InputOTP } from '@spark-ui/components/input-otp'
import React from 'react'

export const A11yInputOTP = () => (
  <section>
    <div>
      <InputOTP name="verification-code" aria-label="Verification code">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>

    <div>
      <InputOTP disabled defaultValue="1234" aria-label="Disabled code">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>

    <div>
      <InputOTP readOnly defaultValue="1234" aria-label="Read-only code">
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP>
    </div>

    <div>
      <FormField name="verification-code">
        <FormField.Label>Verification code</FormField.Label>

        <InputOTP>
          <InputOTP.Group>
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
            <InputOTP.Slot />
          </InputOTP.Group>
        </InputOTP>
      </FormField>
    </div>
  </section>
)
