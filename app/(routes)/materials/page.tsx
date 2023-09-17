import ConversationPage from '@/app/(routes)/materials/components/create-material'
import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { redirect } from 'next/navigation'

const MaterialsPage = async () => {
  const profile = await initialProfile()
  const material = await db.material.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (material) {
    return redirect(`/dashboard`)
  }
  return <ConversationPage />
}

export default MaterialsPage
