/* ============================================================
   Poli accounts — local, no backend.
   A kid taps their animal buddy to sign in. Grown-ups can lock
   the parent area with a 4-digit code.
   ============================================================ */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Avatar, User } from '../types'
import { readStore, removeStore, uid, writeStore } from './storage'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'
const PARENT_PIN_KEY = 'parentPin'

type AuthValue = {
  users: User[]
  user: User | null
  parentPin: string | null
  ready: boolean
  createUser: (data: { name: string; avatar: Avatar; pin?: string }) => User
  login: (id: string) => void
  logout: () => void
  updateUser: (id: string, patch: Partial<Omit<User, 'id'>>) => void
  deleteUser: (id: string) => void
  setParentPin: (pin: string | null) => void
  verifyPin: (pin: string) => boolean
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [parentPin, setParentPinState] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUsers(readStore<User[]>(USERS_KEY, []))
    setCurrentId(readStore<string | null>(SESSION_KEY, null))
    setParentPinState(readStore<string | null>(PARENT_PIN_KEY, null))
    setReady(true)
  }, [])

  const persistUsers = useCallback((next: User[]) => {
    setUsers(next)
    writeStore(USERS_KEY, next)
  }, [])

  const createUser = useCallback<AuthValue['createUser']>(
    ({ name, avatar, pin }) => {
      const user: User = {
        id: uid('kid'),
        name: name.trim().slice(0, 16) || 'Friend',
        avatar,
        pin: pin ?? '',
        grade: 1,
        createdAt: Date.now(),
      }
      persistUsers([...readStore<User[]>(USERS_KEY, []), user])
      setCurrentId(user.id)
      writeStore(SESSION_KEY, user.id)
      return user
    },
    [persistUsers],
  )

  const login = useCallback((id: string) => {
    setCurrentId(id)
    writeStore(SESSION_KEY, id)
  }, [])

  const logout = useCallback(() => {
    setCurrentId(null)
    removeStore(SESSION_KEY)
  }, [])

  const updateUser = useCallback<AuthValue['updateUser']>(
    (id, patch) => {
      const next = readStore<User[]>(USERS_KEY, []).map((u) => (u.id === id ? { ...u, ...patch } : u))
      persistUsers(next)
    },
    [persistUsers],
  )

  const deleteUser = useCallback<AuthValue['deleteUser']>(
    (id) => {
      persistUsers(readStore<User[]>(USERS_KEY, []).filter((u) => u.id !== id))
      removeStore(`progress.${id}`)
      removeStore(`settings.${id}`)
      if (currentId === id) {
        setCurrentId(null)
        removeStore(SESSION_KEY)
      }
    },
    [currentId, persistUsers],
  )

  const setParentPin = useCallback((pin: string | null) => {
    setParentPinState(pin)
    if (pin) writeStore(PARENT_PIN_KEY, pin)
    else removeStore(PARENT_PIN_KEY)
  }, [])

  const verifyPin = useCallback((pin: string) => parentPin === pin, [parentPin])

  const user = useMemo(() => users.find((u) => u.id === currentId) ?? null, [users, currentId])

  const value = useMemo<AuthValue>(
    () => ({
      users,
      user,
      parentPin,
      ready,
      createUser,
      login,
      logout,
      updateUser,
      deleteUser,
      setParentPin,
      verifyPin,
    }),
    [
      users,
      user,
      parentPin,
      ready,
      createUser,
      login,
      logout,
      updateUser,
      deleteUser,
      setParentPin,
      verifyPin,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
