import {LoginForm} from "@/features/login/ui/login-form.tsx";

export default function Page() {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="w-10/12 md:w-6/12 lg:w-3/12 xl:w-2/12">
                <LoginForm />
            </div>
        </div>
    )
}