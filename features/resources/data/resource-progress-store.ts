"use client"

import { useSyncExternalStore } from "react"

import { mockResourceProgress } from "./mock-progress"
import type { ResourceProgress } from "../types"

type Listener = () => void

export interface ResourceProgressStore {
  getAll(): Record<string, ResourceProgress>
  get(resourceId: string): ResourceProgress | undefined
  subscribe(listener: Listener): () => void
  update(progress: ResourceProgress): void
}

let snapshot: Record<string, ResourceProgress> = mockResourceProgress
const listeners = new Set<Listener>()

export const mockResourceProgressStore: ResourceProgressStore = {
  getAll() {
    return snapshot
  },
  get(resourceId: string) {
    return snapshot[resourceId]
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  update(progress: ResourceProgress) {
    snapshot = { ...snapshot, [progress.resourceId]: progress }
    listeners.forEach((listener) => listener())
  },
}

export function useResourceProgressStore(
  store: ResourceProgressStore = mockResourceProgressStore
) {
  return useSyncExternalStore(store.subscribe, store.getAll, store.getAll)
}

export function useMockResourceProgress() {
  return useResourceProgressStore()
}
