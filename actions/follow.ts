"use server"

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";


export const onFollow = async (id: string) => {
    try {
        // console.log("I am same as an API call.",id);
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser) {
            // console.log(followedUser.following.username)
            revalidatePath(`${followedUser.following.username}`);
        }

        return followedUser;
    }
    catch {
        // console.log("Error");
        throw new Error("Internal Error");
    }
}

export const onUnFollow = async (id: string) => {
    try {
        const unFollowedUser = await unFollowUser(id);
        revalidatePath("/");

        if (unFollowedUser) {
            revalidatePath(`${unFollowedUser.following.username}`);
        }

        return unFollowedUser
        
    } catch (e) {
        throw new Error('Internal error')
    }
}