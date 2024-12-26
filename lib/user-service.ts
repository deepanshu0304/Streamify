import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
  const user = db.user.findUnique({
    where: {
      username,
    }, 
    select: {
      id: true, 
      extrenalUserId:true,
      username: true,
      bio: true,
      imageUrl:true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name:true,         
        }
      },
      _count: {
        select: {
          followedBy: true,
        }
      }
    }
  });
    
    return user;
};
export const getUserById = async (id: string) => {
  const user = db.user.findUnique({
    where: {
      id,
    }, 
    include: {
      stream: true,
    }
  });
    
    return user;
};


