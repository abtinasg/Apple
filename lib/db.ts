import { promises as fs } from 'fs'
import path from 'path'

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
  resetToken?: string
  resetTokenExpiry?: number
}

interface DBShape {
  users: User[]
}

const DATA_DIR = path.join(process.cwd(), '.data')
const DB_PATH = path.join(DATA_DIR, 'users.json')

async function readDB(): Promise<DBShape> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(raw) as DBShape
  } catch {
    return { users: [] }
  }
}

async function writeDB(db: DBShape): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await readDB()
  const normalized = email.trim().toLowerCase()
  return db.users.find((u) => u.email === normalized)
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await readDB()
  return db.users.find((u) => u.id === id)
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const db = await readDB()
  const newUser: User = {
    ...user,
    email: user.email.trim().toLowerCase(),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  db.users.push(newUser)
  await writeDB(db)
  return newUser
}

export async function updateUser(id: string, patch: Partial<User>): Promise<User | undefined> {
  const db = await readDB()
  const idx = db.users.findIndex((u) => u.id === id)
  if (idx === -1) return undefined
  db.users[idx] = { ...db.users[idx], ...patch }
  await writeDB(db)
  return db.users[idx]
}
