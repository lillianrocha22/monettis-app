import { SignInButton } from "@clerk/nextjs";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

const LoginPage = async() => {
    const { userId } = await auth();
    if (userId) {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex max-w-[550px] flex-col items-center p-6 md:p-8 text-center">
                <Image
                src="/logo.png"
                width={173}
                height={39}
                alt="Monettis"
                className="mb-8"
                />
                <h1 className="mb-3 text-3xl md:text-4xl font-bold">Bem-vindo</h1>
                <p className="mb-8 text-muted-foreground">
                O Monettis é uma plataforma de gestão financeira que utiliza IA para
                monitorar suas movimentações, e oferecer insights personalizados,
                facilitando o controle do seu orçamento.
                </p>
                <SignInButton>
                    <Button variant="outline">
                        <LogInIcon className="mr-2" />
                        Fazer login ou criar conta
                    </Button>
                </SignInButton>
            </div>
        </div>
     );
}
 
export default LoginPage;