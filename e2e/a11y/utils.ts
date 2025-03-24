import type { TestInfo } from '@playwright/test'
import type { AxeResults } from 'axe-core'
import { readFileSync, writeFileSync } from 'fs'

import { type A11yComponentsKey } from './routes/components'

const PUBLIC_A11Y_REPORT_PATH = './public/a11y'

export interface Report {
  timestamp: string
  url: string
  incomplete: AxeResults['incomplete']
  violations: AxeResults['violations']
}

export const buildComponentReport = async ({
  component,
  results,
  testInfo,
}: {
  component: string
  results: AxeResults
  testInfo?: TestInfo
}) => {
  const { timestamp, url, incomplete, violations } = results

  const report: Record<string, Report> = {
    [`@spark-ui/components/${component}`]: {
      timestamp,
      url,
      incomplete,
      violations,
    },
  }

  /**
   * Exposes the report as public JSON file
   */
  writeFileSync(
    `${PUBLIC_A11Y_REPORT_PATH}/a11y-report-${component}.json`,
    JSON.stringify(report, null, 2),
    'utf8'
  )

  /**
   * Attaches the report to Playwright reporter
   */
  await testInfo?.attach(`a11y-report-${component}`, {
    body: JSON.stringify(report, null, 2),
    contentType: 'application/json',
  })
}

export const buildGlobalReport = ({ components }: { components: A11yComponentsKey[] }) => {
  const report = components.reduce(
    (acc, curr) => {
      const local = JSON.parse(
        readFileSync(`${PUBLIC_A11Y_REPORT_PATH}/a11y-report-${curr}.json`, 'utf8')
      )

      return { ...acc, ...local }
    },
    {} as Record<string, Report>
  )

  writeFileSync(
    `${PUBLIC_A11Y_REPORT_PATH}/a11y-report.json`,
    JSON.stringify(report, null, 2),
    'utf8'
  )
}
