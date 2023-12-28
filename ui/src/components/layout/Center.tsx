import { ReactNode } from 'react'
import { Flex } from '@radix-ui/themes'
export function Center({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <Flex className={className} direction="column" align="center" justify="center" width="100%" height="100%" gap="4">
      {children}
    </Flex>
  )
}
