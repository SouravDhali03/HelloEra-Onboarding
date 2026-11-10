"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

export function ResourceFeedback({ resourceId }: { resourceId: string }) {
  const [response, setResponse] = useState<"yes" | "no" | null>(null)

  return (
    <section
      data-resource-id={resourceId}
      className="mt-8 flex flex-col gap-3 border-t pt-8"
      aria-labelledby="resource-feedback-heading"
    >
      <div>
        <h2
          id="resource-feedback-heading"
          className="font-heading text-lg font-semibold"
        >
          Was this helpful?
        </h2>
        <p className="text-sm text-muted-foreground">
          Your feedback helps us improve future resources.
        </p>
      </div>
      {response ? (
        <p className="text-sm font-medium text-success">
          Thanks for your feedback.
        </p>
      ) : (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Resource feedback"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setResponse("yes")}
          >
            Yes, it was helpful
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setResponse("no")}
          >
            Not really
          </Button>
        </div>
      )}
    </section>
  )
}
