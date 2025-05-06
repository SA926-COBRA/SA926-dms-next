'use client';

import React from 'react';
import {Button} from "@/components/ui/button";
import prisma from "@/prisma/client";
import {User} from "@prisma/client";

const UserPage = () => {
    const [users, setUsers] = React.useState<User[]>([]);

    const handleClick = async () => {
        const allUsers = await prisma.user.findMany();
        setUsers(allUsers);
    }
    return (
        <div>
            <h1>User Page</h1>
            <p className="text-muted-foreground text-sm">This is the user page.</p>
            <Button onClick={handleClick}>Add user</Button>
            {users && users.map(user => <p key={user.id}>{user.name}</p>)}
        </div>
    );
};

export default UserPage;