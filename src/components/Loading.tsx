import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing ...</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  )
}
