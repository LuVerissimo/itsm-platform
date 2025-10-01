defmodule ItsmBackendWeb.ArticleController do
  use ItsmBackendWeb, :controller

  alias ItsmBackend.KnowledgeBase
  alias ItsmBackend.KnowledgeBase.Article

  action_fallback ItsmBackendWeb.FallbackController

  def index(conn, _params) do
    articles = KnowledgeBase.list_articles()
    render(conn, :index, articles: articles)
  end

  def create(conn, %{"article" => article_params}) do
    with {:ok, %Article{} = article} <- KnowledgeBase.create_article(article_params) do
      preloaded_article = Repo.preload(article, :user)
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/articles/#{article}")
      |> render(:show, article: preloaded_article)
    end
  end

  def show(conn, %{"id" => id}) do
    article = KnowledgeBase.get_article!(id)
    render(conn, :show, article: article)
  end

  def update(conn, %{"id" => id, "article" => article_params}) do
    article = KnowledgeBase.get_article!(id)

    with {:ok, %Article{} = article} <- KnowledgeBase.update_article(article, article_params) do
      render(conn, :show, article: article)
    end
  end

  def delete(conn, %{"id" => id}) do
    article = KnowledgeBase.get_article!(id)

    with {:ok, %Article{}} <- KnowledgeBase.delete_article(article) do
      send_resp(conn, :no_content, "")
    end
  end
end
