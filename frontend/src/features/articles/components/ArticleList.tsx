import { useEffect, useState } from "react";
import { Article } from "../types";
import { ArticleForm } from "./ArticleForm";
import { Button } from "../../../components/Button";
import { useArticleStore } from "../../../stores/articleStore";
import { EditArticleModal } from "./EditArticleModal";

export const ArticleList = () => {
     const { articles, fetchArticles, addArticle, deleteArticle } = useArticleStore();
     const [isEditModalOpen, setEditModalOpen] = useState(false);
     const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

     useEffect(() =>{
          fetchArticles()
     },[fetchArticles])

     const handleEditClick = (article: Article) => {
          setSelectedArticle(article)
          setEditModalOpen(true)
     }

     const handleDelete = (articleId: string) => {
          if (window.confirm("Are you sure you want to delete this record?")) {
               deleteArticle(articleId)
          }
     }

     console.log(articles)

     return (
             <div className="p-4 md:p-8">
                 <ArticleForm onAddArticle={addArticle} />
     
                 <h1 className="my-4 text-2xl font-bold text-slate-800">Articles</h1>
     
                 <div className="space-y-4">
                     {articles.length > 0 ? (
                         articles.map((article) => (
                             <div
                                 key={article.id}
                                 className="p-4 bg-white rounded-lg shadow-md"
                             >
                                 <div className="flex items-center justify-between">
                                     <h2 className="font-bold text-slate-900">
                                         {article.title}
                                     </h2>
                                     <div className="flex items-center gap-4">
                                         <div className="flex gap-2">
                                             <Button
                                                 variant="secondary"
                                                 onClick={() =>
                                                     handleEditClick(article)
                                                 }
                                             >
                                                 Edit
                                             </Button>
                                             <Button
                                                 variant="danger"
                                                 onClick={() =>
                                                     handleDelete(article.id)
                                                 }
                                             >
                                                 Delete
                                             </Button>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="mt-4 flex items-center justify-between">
                                     <span className="text-xs font-medium text-slate-500">
                                         Created by:{' '}
                                         {article.user ? article.user.name : 'N/A'}
                                     </span>
                                 </div>
                             </div>
                         ))
                     ) : (
                         <p className="text-slate-500">
                             No articles found. Create one to get started!
                         </p>
                     )}
                 </div>
     
                 <EditArticleModal
                     isOpen={isEditModalOpen}
                     onClose={() => setEditModalOpen(false)}
                     article={selectedArticle}
                 />
             </div>
         );
}