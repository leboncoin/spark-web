import { FavoriteOutline } from '@spark-ui/icons/FavoriteOutline'
import { Button } from '@spark-ui/components/button'
import { Icon } from '@spark-ui/components/icon'
import React from 'react'

export const A11yButton = () => (
  <section>
    <div>
      <Button design="outlined">
        Like
        <Icon>
          <FavoriteOutline />
        </Icon>
      </Button>
    </div>

    <div>
      <Button isLoading loadingLabel="Loading...">
        Action
      </Button>
    </div>
  </section>
)
