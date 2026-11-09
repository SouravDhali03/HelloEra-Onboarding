"use client"

import { useState } from "react"
import Link from "next/link"
import { Bookmark, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ResourceDetailActions() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild>
        <Link href="#resource-reader">
          <FileText data-icon="inline-start" />
          Read now
        </Link>
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => setSaved((current) => !current)}
      >
        <Bookmark
          data-icon="inline-start"
          className={saved ? "fill-current" : undefined}
        />
        {saved ? "Saved" : "Save resource"}
      </Button>
    </div>
  )
}
