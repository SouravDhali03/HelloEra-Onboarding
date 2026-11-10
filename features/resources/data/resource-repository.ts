import { mockResources } from "./mock-resources"
import type { Resource } from "../types"

export interface ResourceRepository {
  list(): Resource[]
  getById(resourceId: string): Resource | undefined
}

export const mockResourceRepository: ResourceRepository = {
  list: () => mockResources,
  getById: (resourceId) =>
    mockResources.find((resource) => resource.id === resourceId),
}
