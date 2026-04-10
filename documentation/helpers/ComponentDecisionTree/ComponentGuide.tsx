import { Button } from '@spark-ui/components/button'
import { Card } from '@spark-ui/components/card'
import { TextLink } from '@spark-ui/components/text-link'
import { useState } from 'react'

import { type DecisionTreeNode } from '.'

interface ComponentInfo {
  name: string
  href: string
}

interface Props {
  tree: DecisionTreeNode
  components: ComponentInfo[]
}

export function ComponentGuide({ tree, components }: Props) {
  const [history, setHistory] = useState<DecisionTreeNode[]>([tree])

  const current = history[history.length - 1]!
  const isLeaf = !current.children || current.children.length === 0
  const compInfo =
    isLeaf && current.component ? components.find(c => c.name === current.component) : undefined

  const navigate = (node: DecisionTreeNode) => setHistory(prev => [...prev, node])
  const goBack = () => setHistory(prev => prev.slice(0, -1))
  const reset = () => setHistory([tree])
  const jumpTo = (index: number) => setHistory(prev => prev.slice(0, index + 1))

  return (
    <div className="sb-unstyled gap-xl flex flex-col">
      {/* Breadcrumb trail */}
      {history.length > 1 && (
        <nav
          aria-label="Guide navigation"
          className="gap-xs text-caption text-neutral flex flex-wrap items-center"
        >
          {history.map((node, i) => {
            const label = node.question || node.label || node.component || node.id
            const isCurrent = i === history.length - 1

            return (
              <span key={node.id} className="gap-xs flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="text-neutral-dim">
                    ›
                  </span>
                )}
                {isCurrent ? (
                  <span className="text-on-surface font-medium">{label}</span>
                ) : (
                  <button
                    type="button"
                    className="hover:text-main cursor-pointer transition-colors hover:underline"
                    onClick={() => jumpTo(i)}
                  >
                    {label}
                  </button>
                )}
              </span>
            )
          })}
        </nav>
      )}

      {isLeaf ? (
        /* Result */
        <div className="gap-lg flex flex-col">
          <div className="gap-xs flex flex-col">
            <p className="text-caption text-neutral tracking-wide uppercase">
              Recommended component
            </p>
            <p className="text-display-2 font-bold">{current.label || current.component}</p>
          </div>

          {compInfo && (
            <TextLink href={compInfo.href} className="text-body-1">
              View {current.component} documentation →
            </TextLink>
          )}

          <div className="gap-sm flex">
            <Button design="outlined" size="sm" onClick={goBack}>
              ← Back
            </Button>
            <Button design="ghost" size="sm" onClick={reset}>
              Start over
            </Button>
          </div>
        </div>
      ) : (
        /* Question + choices */
        <div className="gap-lg flex flex-col">
          <p className="text-headline-1">{current.question || current.label}</p>

          <div className="gap-md flex flex-wrap">
            {current.children?.map(child => {
              const childLabel = child.label || child.question || child.component || child.id

              return (
                <Card
                  key={child.id}
                  asChild
                  design="outlined"
                  className="min-w-sz-160 hover:border-main hover:bg-main-container cursor-pointer transition-colors"
                >
                  <button type="button" onClick={() => navigate(child)}>
                    <Card.Content>
                      <p className="text-body-1 text-left font-medium">{childLabel}</p>
                    </Card.Content>
                  </button>
                </Card>
              )
            })}
          </div>

          {history.length > 1 && (
            <div className="gap-sm flex">
              <Button design="ghost" size="sm" onClick={goBack}>
                ← Back
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
