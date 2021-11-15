import { useMemo } from 'react'

const useFormatter = () =>
  useMemo(() => Intl.NumberFormat('en', { notation: 'compact' }), [])

export default useFormatter
