import { json, type LoaderArgs } from '@remix-run/node'
import { inputFromUrl } from 'domain-functions'
import { getPurchases } from '~/domain/purchases.server'

export async function loader({ request }: LoaderArgs) {
  const result = await getPurchases(inputFromUrl(request))
  if (!result.success) return json({ purchases: [] }, { status: 500 })

  return json(result.data)
}
