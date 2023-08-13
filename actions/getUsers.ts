import prisma from '@/libs/prismadb'
import getSession from './getSession'

const getUsers = async () => {
  const session = await getSession()

  // TODO: Why do we need this?
  if(!session?.user?.email) {
    return []
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      // TODO: meaning NOT
      where: {
        NOT : {
          email: session.user.email
        }
      }
    })
    return users
  } catch (error: any) {
    return []
  }
}

export default getUsers