import type { Posts } from "@/app/page"
import {
  Card as CardBox,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Card({ item }: { item: Posts }) {
  return (
    <CardBox className="mt-10 rounded-sm">
      <CardHeader>
        <CardTitle className="scroll-m-20 text-md font-extrabold tracking-tight lg:text-1xl">
          {item.id}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mt-4 text-muted-foreground md:mb-4 lg:mt-6 truncate">
          {item.content}
        </CardDescription>
      </CardContent>
    </CardBox>
  )
}