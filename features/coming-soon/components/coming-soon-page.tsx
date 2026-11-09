import { Badge } from "@/components/ui/badge"

const moduleDetails: Record<string, { description: string }> = {
  marketplace: {
    description:
      "Discover products, services, and opportunities from the Era community.",
  },
  saved: {
    description:
      "Keep your saved posts, resources, products, and opportunities in one place.",
  },
  "my-learning": {
    description:
      "Track your learning goals, lessons, and progress from one focused workspace.",
  },
  "find-tutors": {
    description:
      "Find tutors who match your subjects, goals, schedule, and preferred learning style.",
  },
  "study-groups": {
    description:
      "Meet learners with similar interests and build supportive study groups.",
  },
  preferences: {
    description:
      "Adjust your learning, discovery, and communication preferences when this module is ready.",
  },
  settings: {
    description:
      "Manage your account, privacy, security, and application settings in one place.",
  },
}

function formatModuleName(module: string) {
  return module
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function ComingSoonPage({ module }: { module: string }) {
  const details = moduleDetails[module] ?? {
    description:
      "This part of HelloEra is being prepared for a future release.",
  }

  return (
    <section className="flex min-h-full items-center justify-center bg-muted/20 p-4 sm:p-8">
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          Coming soon
        </Badge>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-semibold">
            {formatModuleName(module)} is on the way
          </h1>
          <p className="max-w-xl text-muted-foreground">
            {details.description}
          </p>
        </div>
      </div>
    </section>
  )
}
