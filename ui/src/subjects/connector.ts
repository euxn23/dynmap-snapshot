import { BehaviorSubject } from 'rxjs'
import { useSyncExternalStore } from 'react'

export function useSubject<T>(subject: BehaviorSubject<T>): T {
  return useSyncExternalStore(
    (onStoreChange) => {
      const subscription = subject.subscribe(onStoreChange)
      return () => subscription.unsubscribe()
    },
    () => subject.value,
  )
}
