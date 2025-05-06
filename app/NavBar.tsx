'use client';

import React from 'react';
import {ModeToggle} from "@/components/ModeToggle";
import {Skeleton} from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {EnterIcon, ExitIcon} from "@radix-ui/react-icons";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";

const NavBar = () => {
    const {status, data: session} = useSession();

    return (
        <div>
            <div className="">
                {status === 'loading' && <Skeleton className="h-9 w-9 border rounded-full"/>}
                {status === 'authenticated' && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="rounded-full" size="icon">
                                <Avatar className="w-9 h-9 border focus:rounded-full">
                                    <AvatarImage src={session.user!.image!} alt="profile_picture"/>
                                    <AvatarFallback className="text-xs">DP</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="text-muted-foreground">
                                {session?.user!.name}
                            </DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link className="w-full" href="/users/me">
                                    My Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <div onClick={() => signOut()} className="w-full flex items-center gap-2">
                                    Logout <ExitIcon/>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {status === "unauthenticated" &&
                    <Link className="text-sm" href="/api/auth/signin">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div
                                        className="rounded-full flex items-center justify-center border w-9 h-9 hover:bg-muted">
                                        <EnterIcon/>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Sign in</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </Link>
                }
            </div>
        </div>
    );
};

export default NavBar;