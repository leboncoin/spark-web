/* eslint-disable max-lines-per-function */
import { Breadcrumb } from '@spark-ui/components/breadcrumb'
import { Button } from '@spark-ui/components/button'
import { Card } from '@spark-ui/components/card'
import { Icon } from '@spark-ui/components/icon'
import { Tag } from '@spark-ui/components/tag'
import { TextLink } from '@spark-ui/components/text-link'
import { ArrowLeft, Check, Close, TrashOutline } from '@spark-ui/icons'
import { Fragment, type ReactNode, useState } from 'react'

import { ComponentDecisionTree, type DecisionTreeNode } from '.'

interface ComponentInfo {
  name: string
  href: string
  thumbnails?: { light?: string }
}

interface Props {
  tree: DecisionTreeNode
  components: ComponentInfo[]
}

export function ComponentDecisionGuide({ tree, components }: Props) {
  const [history, setHistory] = useState<DecisionTreeNode[]>([tree])

  const current = history[history.length - 1]!
  const isLeaf = !current.children || current.children.length === 0
  const compInfo =
    isLeaf && current.component ? components.find(c => c.name === current.component) : undefined

  const activePath = history.map(n => n.id)

  const navigate = (node: DecisionTreeNode) => setHistory(prev => [...prev, node])
  const goBack = () => setHistory(prev => prev.slice(0, -1))
  const reset = () => setHistory([tree])
  const jumpTo = (index: number) => setHistory(prev => prev.slice(0, index + 1))

  return (
    <div className="flex flex-col">
      {/* Breadcrumb trail */}

      <Card design="tinted" intent="neutral">
        <Card.Content className="border-sm border-outline rounded-b-none">
          <Breadcrumb aria-label="Guide navigation">
            {history.map((node, i) => {
              const label = node.question || node.label || node.component || node.id
              const isCurrent = i === history.length - 1

              // Compute the answer tag for past steps
              let answerTag: ReactNode = null
              if (!isCurrent) {
                const nextNode = history[i + 1]
                const childIndex = nextNode
                  ? (node.children?.findIndex(c => c.id === nextNode.id) ?? -1)
                  : -1
                const isPositive = childIndex === 0
                answerTag = (
                  <Tag intent={isPositive ? 'success' : 'danger'} design="outlined">
                    {isPositive ? 'Yes' : 'No'}
                  </Tag>
                )
              }

              return (
                <Fragment key={node.id}>
                  {i > 0 && <Breadcrumb.Separator />}
                  <Breadcrumb.Item>
                    {isCurrent ? (
                      <Breadcrumb.CurrentPage>{label}</Breadcrumb.CurrentPage>
                    ) : (
                      <>
                        <Breadcrumb.Link asChild>
                          <button type="button" onClick={() => jumpTo(i)}>
                            {label}
                          </button>
                        </Breadcrumb.Link>
                        {answerTag}
                      </>
                    )}
                  </Breadcrumb.Item>
                </Fragment>
              )
            })}
          </Breadcrumb>
        </Card.Content>
      </Card>

      <div className="sb-unstyled border-outline flex overflow-hidden rounded-b-xl border border-t-0 md:min-h-[720px]">
        {/* ── Guide panel (left) ── */}
        <div className="border-outline gap-xl p-xl bg-surface flex w-full shrink-0 flex-col overflow-y-auto md:w-[360px] md:border-r">
          {isLeaf ? (
            /* Result */
            <div className="gap-lg flex flex-col">
              {compInfo && (
                <a href={compInfo.href} className="group gap-md flex w-full flex-col">
                  <TextLink underline={false} intent="support" className="text-headline-2">
                    {compInfo.name}
                  </TextLink>
                  <div className="bg-neutral-container aspect-184/100 w-full overflow-hidden rounded-lg transition-transform duration-150 group-hover:scale-105 group-hover:shadow-sm">
                    <img
                      src={compInfo.thumbnails?.light}
                      alt={`${compInfo.name} component thumbnail`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      width="184"
                      height="100"
                    />
                  </div>
                </a>
              )}
            </div>
          ) : (
            /* Question + choices */
            <div className="gap-lg flex flex-col">
              <p className="text-headline-1">{current.question || current.label}</p>
              <div className="gap-md flex flex-row">
                {current.children?.map((child, index) => (
                  <Button
                    key={child.id}
                    design="tinted"
                    intent={index === 0 ? 'success' : 'danger'}
                    className="flex-1"
                    onClick={() => navigate(child)}
                  >
                    {index === 0 && (
                      <Icon>
                        <Check />
                      </Icon>
                    )}
                    {index === 0 ? 'Yes' : 'No'}
                    {index === 1 && (
                      <Icon>
                        <Close />
                      </Icon>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {history.length > 1 && (
            <div className="gap-sm flex justify-between">
              <Button design="ghost" underline intent="neutral" onClick={goBack}>
                <Icon>
                  <ArrowLeft />
                </Icon>
                Previous
              </Button>
              <Button design="ghost" underline intent="neutral" onClick={reset}>
                Start over
                <Icon>
                  <TrashOutline />
                </Icon>
              </Button>
            </div>
          )}
        </div>

        {/* ── Tree panel (right) ── */}
        <div className="hidden min-w-0 flex-1 md:block">
          <ComponentDecisionTree
            tree={tree}
            components={components}
            focusNodeId={current.id}
            activePath={activePath}
            embedded
          />
        </div>
      </div>
    </div>
  )
}
