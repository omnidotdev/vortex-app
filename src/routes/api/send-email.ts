import { createFileRoute } from '@tanstack/react-router'
import { getTemporalClient } from '../../temporal/client'

export const Route = createFileRoute('/api/send-email')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { to, subject, content } = await request.json()

          const client = await getTemporalClient()

          const handle = await client.workflow.start('sendEmailWorkflow', {
            args: [to, subject, content],
            taskQueue: 'vortex',
            workflowId: `send-email-${Date.now()}`,
          })

          // Wait for the workflow to complete
          const result = await handle.result()
          return Response.json(result)
        } catch (error: any) {
          console.error('Error executing workflow:', error)
          return Response.json(
            { error: 'Failed to execute workflow', details: error.message },
            { status: 500 }
          )
        }
      }
    }
  }
})
