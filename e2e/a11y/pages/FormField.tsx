import { FormField } from '@spark-ui/components/form-field'
import React from 'react'

export const A11yFormField = () => (
  <section>
    <div>
      <FormField name="email">
        <FormField.Label>Email</FormField.Label>

        <FormField.Control>
          {({ id, name, description }) => (
            <input
              type="email"
              id={id}
              name={name}
              aria-describedby={description}
              className="border-md border-neutral p-md rounded-sm outline-none"
            />
          )}
        </FormField.Control>

        <FormField.HelperMessage>We will never share your email</FormField.HelperMessage>
      </FormField>
    </div>

    <div>
      <FormField name="password" isRequired>
        <FormField.Label>Password</FormField.Label>

        <FormField.Control>
          {({ id, name, description, isRequired }) => (
            <input
              type="password"
              id={id}
              name={name}
              aria-describedby={description}
              aria-required={isRequired}
              required={isRequired}
              className="border-md border-neutral p-md rounded-sm outline-none"
            />
          )}
        </FormField.Control>

        <FormField.ErrorMessage>Password is required</FormField.ErrorMessage>
      </FormField>
    </div>
  </section>
)
