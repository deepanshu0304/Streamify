"use client";

import {
    Dialog,
    DialogClose,
    DialogTrigger,
    DialogHeader,
    DialogContent,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState, useTransition, useRef,ElementRef } from "react";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null
}
export const BioModal = ({
    initialValue,
}: BioModalProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue || "");
    
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: value }).then(() => {
                toast.success("User bio updated");
                closeRef.current?.click();
                
            }).catch(() => toast.error("Something went wrong"));
            
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="User bio"
                        value={value}
                        onChange={(e) => { setValue(e.target.value)}}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} variant={"primary"}>
                            Save
                        </Button>

                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}