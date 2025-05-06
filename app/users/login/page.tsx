'use client';

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";
import prisma from "@/prisma/client";

const LoginForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmit() {
        console.log('hey')
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            setIsSubmitting(true);
            toast.success(`${user?.name}: Logged in successfully.`);

            router.push('/');
            router.refresh();
        } catch (error) {
            setIsSubmitting(false);
            toast.error('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="flex justify-center gap-3 items-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={onSubmit} className="w-full">Sign in</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginForm;