import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return []
  }

  try {
    // Not only single chat but alse group chat that we need
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    })

    return conversations
  } catch (error: any) {
    return []
  }
}

export default getConversations
