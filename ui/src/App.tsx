import { Center } from './components/layout/Center.tsx'
import { Suspense } from 'react'
import { Top } from './pages/Top.tsx'
import { Loading } from './components/atom/Loading.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { Text, Theme } from '@radix-ui/themes'

function App() {
  return (
    <ErrorBoundary
      fallback={
        <Center>
          <Text>error</Text>
        </Center>
      }
    >
      <Suspense
        fallback={
          <Center>
            <Loading />
          </Center>
        }
      >
        <Theme color="blue">
          <Top />
        </Theme>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
