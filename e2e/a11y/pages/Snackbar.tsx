import { Button } from '@spark-ui/components/button'
import { addSnackbar, Snackbar } from '@spark-ui/components/snackbar'
import React from 'react'

export const A11ySnackbar = () => (
  <section>
    <div>
      <Snackbar>
        <Snackbar.Item>
          <Snackbar.ItemClose aria-label="Close" />
        </Snackbar.Item>
      </Snackbar>

      <Button
        onClick={() =>
          addSnackbar({
            message: "You're done!",
            intent: 'success',
          })
        }
      >
        Display snackbar
      </Button>
    </div>
  </section>
)
