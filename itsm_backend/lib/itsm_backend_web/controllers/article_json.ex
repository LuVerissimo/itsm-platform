defmodule ItsmBackendWeb.ArticleJSON do
  alias ItsmBackend.KnowledgeBase.Article

  @doc """
  Renders a list of articles.
  """
  def index(%{articles: articles}) do
    %{data: for(article <- articles, do: data(article))}
  end

  @doc """
  Renders a single article.
  """
  def show(%{article: article}) do
    %{data: data(article)}
  end

  defp data(%Article{} = article) do
    %{
      id: article.id,
      title: article.title,
      content: article.content,
      user: ItsmBackendWeb.UserJSON.user(%{user: article.user})
    }
  end

  defp format_user(nil), do: nil
  defp format_user(user) do
    %{id: user.id, name: user.name, email: user.email}
  end
end
