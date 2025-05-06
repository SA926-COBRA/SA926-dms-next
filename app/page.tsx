import {ModeToggle} from "@/components/ModeToggle";
import React from "react";
import prisma from "@/prisma/client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Command} from "@tauri-apps/api/shell";

export default async function Home() {
    const distribution = await prisma.distribution.findMany();
    const users = await prisma.user.findMany({include: {distribution: true}});

    return (
        <main className="">
            <div className="flex justify-center gap-3 items-center h-screen">
                <Link href="/api/auth/signin">
                    <Button>Login</Button>
                </Link>
                <Link href="/users">
                    <Button>Show users</Button>
                </Link>
                <Link href="/add">
                    <Button>ADD</Button>
                </Link>
                <ModeToggle/>
                <h1 className="text-2xl font-bold">Home</h1>
                <div>
                    {distribution!.map(m => <p key={m.id}>{m.name}</p>)}
                </div>
                <div>
                    {users && users!.map(m => (
                        <div key={m.id}>
                            <p>{m.name}</p>
                            <p className="text-muted-foreground text-xs">{m.distribution!.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

