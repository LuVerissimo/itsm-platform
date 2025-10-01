import { create } from 'zustand';
import { Article } from '../features/articles/types';
import { ArticleFormData } from '../features/articles/types/articleSchema';

interface ArticleState {
    articles: Article[];
    fetchArticles: () => Promise<void>;
    addArticle: (article: ArticleFormData, userId: string) => Promise<void>;
    updateArticle: (
        articleId: string,
        updatedArticle: ArticleFormData,
        userId: string
    ) => Promise<void>;
    deleteArticle: (articleId: string) => Promise<void>;
}

export const useArticleStore = create<ArticleState>((set, get) => ({
    articles: [],

    fetchArticles: async () => {
        try {
            const response = await fetch('http://localhost:4000/api/articles', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            const { data } = await response.json();
            set({ articles: data });
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        }
    },

    addArticle: async (newArticle, userId) => {
        try {
            const payload = { ...newArticle, user_id: userId };

            const response = await fetch('http://localhost:4000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ article: payload }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Error creating article');
            }
            const { data } = await response.json();
            set((state) => ({ articles: [...state.articles, data] }));
        } catch (error) {
            console.error('Failed to create article: ', error);
        }
    },

    updateArticle: async (articleId, updatedData, userId) => {
        try {
            const payload = { ...updatedData, user_id: userId };

            const response = await fetch(
                `http://localhost:4000/api/articles/${articleId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ article: payload }),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update article');
            }
            const { data: updatedArticle } = await response.json();
            set((state) => ({
                articles: state.articles.map((article) =>
                    article.id === articleId ? updatedArticle : article
                ),
            }));
        } catch (error) {
            console.error('Error updating article');
        }
    },

    deleteArticle: async (articleId) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/articles/${articleId}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete article');
            }
            set((state) => ({
                articles: state.articles.filter(
                    (article) => article.id !== articleId
                ),
            }));
        } catch (error) {
            console.error('Error updating article');
        }
    },
}));
