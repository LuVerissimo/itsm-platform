import { zodResolver } from '@hookform/resolvers/zod';
import { useArticleStore } from '../../../stores/articleStore';
import { ArticleFormData, articleSchema } from '../types/articleSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Article } from '../types';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../../../components/Button';
import { useUserStore } from '../../../stores/userStore';

interface EditArticleModalProps {
    article: Article | null;
    isOpen: boolean;
    onClose: () => void;
}

export const EditArticleModal = ({
    article,
    isOpen,
    onClose,
}: EditArticleModalProps) => {
    const { updateArticle } = useArticleStore();
    const { currentUser} = useUserStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
    });

    useEffect(() => {
        if (article) {
            reset(article);
        }
    }, [article, reset]);

    const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
        if (article && currentUser) {
            updateArticle(article.id, data, currentUser.id);
            onClose();
        } else {
            alert("No user is logged in.")
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
                    <Dialog.Title className="text-xl font-semibold text-slate-800">
                        Edit Article
                    </Dialog.Title>
                    <Dialog.Content className="mt-1 text-sm text-slate-600">
                        Update the article details below.
                    </Dialog.Content>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="title-edit"
                                className="mb-1 block text-sm font-medium text-slate-700"
                            >
                                Title
                            </label>
                            <input
                                id="title-edit"
                                type="text"
                                {...register('title')}
                                className="w-full rounded-md border border-slate-300 px-3 py-2"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="content-edit"
                                className="mb-1 block text-sm font-medium text-slate-700"
                            >
                                Content
                            </label>
                            <textarea
                                id="content-edit"
                                {...register('content')}
                                className="w-full rounded-md border border-slate-300 px-3 py-2"
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.content.message}
                                </p>
                            )}
                        </div>

   

                        <div className="flex justify-end gap-4 pt-4">
                            <Dialog.Close asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
