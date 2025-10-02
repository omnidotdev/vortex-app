import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '@/lib/graphql-client'
import { toast } from 'sonner'

// GraphQL query strings (will be replaced with generated operations)
const GET_WORKFLOWS = `
  query GetWorkflows($userId: String!) {
    workflows(condition: { userId: $userId }) {
      nodes {
        id
        name
        description
        definition
        isActive
        userId
        createdAt
        updatedAt
      }
    }
  }
`

const CREATE_WORKFLOW = `
  mutation CreateWorkflow($input: CreateWorkflowInput!) {
    createWorkflow(input: $input) {
      workflow {
        id
        name
        description
        definition
        isActive
        userId
        createdAt
      }
    }
  }
`

const UPDATE_WORKFLOW = `
  mutation UpdateWorkflow($input: UpdateWorkflowInput!) {
    updateWorkflow(input: $input) {
      workflow {
        id
        name
        description
        definition
        isActive
        updatedAt
      }
    }
  }
`

const DELETE_WORKFLOW = `
  mutation DeleteWorkflow($input: DeleteWorkflowInput!) {
    deleteWorkflow(input: $input) {
      workflow {
        id
      }
    }
  }
`

// Types (will be replaced with generated types)
interface Workflow {
  id: string
  name: string
  description?: string
  definition: any // JSON workflow definition
  isActive: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

interface CreateWorkflowInput {
  workflow: {
    name: string
    description?: string
    definition: any
    isActive?: boolean
    userId: string
  }
}

interface UpdateWorkflowInput {
  id: string
  patch: {
    name?: string
    description?: string
    definition?: any
    isActive?: boolean
  }
}

// Custom hooks
export const useWorkflows = (userId: string) => {
  return useQuery({
    queryKey: ['workflows', userId],
    queryFn: async () => {
      const data = await request(GET_WORKFLOWS, { userId })
      return data.workflows.nodes as Workflow[]
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateWorkflowInput) => {
      const data = await request(CREATE_WORKFLOW, { input })
      return data.createWorkflow.workflow as Workflow
    },
    onSuccess: (workflow) => {
      // Invalidate and refetch workflows list
      queryClient.invalidateQueries({ queryKey: ['workflows'] })
      toast.success(`Workflow "${workflow.name}" created successfully`)
    },
    onError: (error: any) => {
      toast.error(`Failed to create workflow: ${error.message}`)
    },
  })
}

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: UpdateWorkflowInput) => {
      const data = await request(UPDATE_WORKFLOW, { input })
      return data.updateWorkflow.workflow as Workflow
    },
    onSuccess: (workflow) => {
      // Update the workflow in cache
      queryClient.setQueryData(['workflows'], (oldData: Workflow[] | undefined) => {
        if (!oldData) return oldData
        return oldData.map((w) => (w.id === workflow.id ? workflow : w))
      })
      toast.success(`Workflow "${workflow.name}" updated successfully`)
    },
    onError: (error: any) => {
      toast.error(`Failed to update workflow: ${error.message}`)
    },
  })
}

export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const data = await request(DELETE_WORKFLOW, {
        input: { id }
      })
      return data.deleteWorkflow.workflow.id as string
    },
    onSuccess: (deletedId) => {
      // Remove the workflow from cache
      queryClient.setQueryData(['workflows'], (oldData: Workflow[] | undefined) => {
        if (!oldData) return oldData
        return oldData.filter((w) => w.id !== deletedId)
      })
      toast.success('Workflow deleted successfully')
    },
    onError: (error: any) => {
      toast.error(`Failed to delete workflow: ${error.message}`)
    },
  })
}

// Helper hook for workflow operations
export const useWorkflowOperations = (userId: string) => {
  const workflows = useWorkflows(userId)
  const createWorkflow = useCreateWorkflow()
  const updateWorkflow = useUpdateWorkflow()
  const deleteWorkflow = useDeleteWorkflow()

  return {
    workflows: workflows.data || [],
    isLoading: workflows.isLoading,
    error: workflows.error,
    createWorkflow: createWorkflow.mutate,
    updateWorkflow: updateWorkflow.mutate,
    deleteWorkflow: deleteWorkflow.mutate,
    isCreating: createWorkflow.isPending,
    isUpdating: updateWorkflow.isPending,
    isDeleting: deleteWorkflow.isPending,
  }
}
