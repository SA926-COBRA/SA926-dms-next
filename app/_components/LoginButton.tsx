'use client';

import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Command} from "@tauri-apps/api/shell";

const LoginButton = () => {
    const handleClick = async () => {
        const command = Command.sidecar('bin/server');
        await command.execute();
    }
    return (
        <div>
            <Link href="/api/auth/signin">
                <Button onClick={handleClick}>Login</Button>
            </Link>
        </div>
    );
};

export default LoginButton;