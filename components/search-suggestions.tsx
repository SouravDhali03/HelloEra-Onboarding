import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function SearchSuggestions({
  id,
  options,
  onSelect,
}: {
  id?: string
  options: string[]
  onSelect: (value: string) => void
}) {
  return (
    <div id={id} role="listbox" className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-md">
      <Command shouldFilter={false} className="rounded-lg bg-transparent p-0">
        <CommandList className="max-h-72">
          {options.length ? options.map((option) => (
            <CommandItem key={option} value={option} onSelect={() => onSelect(option)}>
              {option}
            </CommandItem>
          )) : <CommandEmpty className="py-2">No matching options</CommandEmpty>}
        </CommandList>
      </Command>
    </div>
  )
}
