import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ArticleFormData, articleSchema } from '../types/articleSchema';
import { Button } from '../../../components/Button';
import { useUserStore } from '../../../stores/userStore';

interface ArticleFormProps {
    onAddArticle: (article: ArticleFormData, id: string) => void;
}

export const ArticleForm = ({ onAddArticle }: ArticleFormProps) => {
    const { currentUser } = useUserStore();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
        },
    });
    const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
        if (currentUser) {
            onAddArticle(data, currentUser.id); //?
            reset();
        } else {
            alert('No user is logged in.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 mb-6 bg-white rounded-lg shadow-md space-y-4"
        >
            <h3 className="text-xl font-semibold text-slate-800">
                Create New Article
            </h3>

            <div>
                <label
                    htmlFor="title"
                    className="block mb-1 text-sm font-medium text-slate-700"
                >
                    Title
                </label>
                <input
                    id="title"
                    {...register('title')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
                {errors.title && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="content"
                    className="block mb-1 text-sm font-medium text-slate-700"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    {...register('content')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
                {errors.content && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary">
                    Create Article
                </Button>
            </div>
        </form>
    );
};
