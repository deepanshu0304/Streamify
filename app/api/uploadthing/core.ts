import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image: {
            maxFileSize:"4MB",
            maxFileCount: 1
        },
        
    },).middleware(async () => {
        console.log("deepanshu2");
        const self = await getSelf();
        return { user: self };
    }).onUploadComplete(async ({ metadata, file }) => {
        try {
        console.log("deepanshu");
        // console.log(file);
        console.log(metadata.user.id);
        await db.stream.update({
            where: {
                userId: metadata.user.id,
            },
            data: {
                thumbnailUrl: file.url,
            }
        });

        } catch (e) {
            console.log("*****************")
            console.log(e);
            console.log("*****************")
            
        }
        return { fileUrl: file.url };
    })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
