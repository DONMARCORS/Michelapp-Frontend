import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Redirect non existent routes to index
export default function Custom404() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/').catch(() => {})
  }, [])
  
  return null
}
