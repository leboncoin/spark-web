import { Breadcrumb } from '@spark-ui/components/breadcrumb'
import { Icon } from '@spark-ui/components/icon'
import { Tag } from '@spark-ui/components/tag'
import { TextLink } from '@spark-ui/components/text-link'
import { WarningFill } from '@spark-ui/icons/WarningFill'
import {
  aria,
  ARIAProperty,
  ARIARoleDefinition,
  ARIARoleDefinitionKey,
  roleElements,
  roles,
} from 'aria-query'
import { Fragment } from 'react'

import { rolesDescriptions } from './rolesDescriptions'

const AriaPath = ({ name, roleData }: { name: string; roleData: ARIARoleDefinition }) => {
  const superClasses = roleData?.superClass[0]

  if (!roleData) return null

  return (
    superClasses && (
      <Breadcrumb aria-label="Breadcrumb">
        {superClasses.map((superClass, index) => {
          return (
            <Fragment key={index}>
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.w3.org/TR/wai-aria-1.2/#${superClass}`}
                >
                  {superClass}
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
            </Fragment>
          )
        })}
        <Breadcrumb.Item>
          <Breadcrumb.Link
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.w3.org/TR/wai-aria-1.2/#${name}`}
          >
            {name}
          </Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  )
}

const AriaAttribute = ({
  prop,
  type,
}: {
  prop: ARIAProperty
  type: 'required' | 'authorized' | 'forbidden'
}) => {
  const intentsMap = {
    required: 'success',
    authorized: 'info',
    forbidden: 'danger',
  } as const

  return (
    <Tag key={prop} intent={intentsMap[type]} design="tinted" asChild>
      <TextLink
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.w3.org/TR/wai-aria-1.2/#${prop}`}
        underline={false}
      >
        {prop} ({aria.get(prop as ARIAProperty)?.type})
        {type !== 'authorized' && (
          <Icon>
            <WarningFill />
          </Icon>
        )}
      </TextLink>
    </Tag>
  )
}

export const AriaRole = ({ role }: { role: ARIARoleDefinitionKey }) => {
  const roleData = roles.get(role)
  const htmlTags = roleElements.get(role)

  const ariaProps = Object.keys(roleData?.props || {})
  const ariaRequiredProps = Object.keys(roleData?.requiredProps || {})
  const ariaProhibitedProps = roleData?.prohibitedProps || []

  if (!roleData) return null

  return (
    <div className="sb-unstyled bg-surface text-on-surface gap-md relative flex flex-col">
      <div>
        <AriaPath name={role} roleData={roleData} />
        <p className="text-display-2">{role}</p>
        <Tag className="top-md right-md absolute" design="outlined" intent="info">
          WAI-ARIA 2.1
        </Tag>
      </div>

      <p>{rolesDescriptions[role as keyof typeof rolesDescriptions]}</p>

      {htmlTags && (
        <div className="gap-md flex flex-col">
          <p className="text-headline-2">HTML Elements:</p>

          <div className="gap-sm flex flex-wrap">
            {Array.from(htmlTags).map(({ name, attributes }, index) => {
              return (
                <div
                  key={index}
                  className="bg-neutral-container text-on-neutral-container px-md rounded-sm font-bold"
                >
                  {'<'}
                  {name}{' '}
                  {attributes &&
                    attributes.map(({ name, value }) => {
                      return (
                        <Fragment key={name}>
                          <span>
                            {name}="{value}"
                          </span>
                          <span> </span>
                        </Fragment>
                      )
                    })}
                  {' />'}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {ariaRequiredProps.length > 0 && (
        <div className="gap-md flex flex-col">
          <p className="text-headline-2">Required attributes:</p>
          <div className="gap-sm flex flex-wrap">
            {ariaRequiredProps.map(prop => (
              <AriaAttribute key={prop} prop={prop as ARIAProperty} type="required" />
            ))}
          </div>
        </div>
      )}

      {ariaProps.length > 0 && (
        <div className="gap-md flex flex-col">
          <p className="text-headline-2">Authorized attributes:</p>
          <div className="gap-sm flex flex-wrap">
            {ariaProps.map(prop => (
              <AriaAttribute key={prop} prop={prop as ARIAProperty} type="authorized" />
            ))}
          </div>
        </div>
      )}

      {(ariaProhibitedProps as unknown as any[]).length > 0 && (
        <div className="gap-md flex flex-col">
          <p className="text-headline-2">Prohibited attributes:</p>
          <div className="gap-sm flex flex-wrap">
            {(ariaProhibitedProps as unknown as any[]).map(prop => (
              <AriaAttribute key={prop} prop={prop as ARIAProperty} type="forbidden" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
