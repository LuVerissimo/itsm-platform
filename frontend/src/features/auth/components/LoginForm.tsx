import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button';
import { useUserStore } from '../../../stores/userStore';

type FormData = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const { login } = useUserStore();

    const onSubmit = (data: FormData) => {
        login(data.email, data.password);
    };

    return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <div className="space-y-4">
          <input {...register('email')} placeholder="Email" type="email" className="w-full rounded-md border p-2" />
          <input {...register('password')} placeholder="Password" type="password" className="w-full rounded-md border p-2" />
        </div>
        <Button type="submit" variant="primary" className="mt-6 w-full">Sign In</Button>
      </form>
    </div>
  );
};
