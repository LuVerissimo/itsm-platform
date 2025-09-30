defmodule ItsmBackend.KnowledgeBaseFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ItsmBackend.KnowledgeBase` context.
  """

  @doc """
  Generate a article.
  """
  def article_fixture(attrs \\ %{}) do
    {:ok, article} =
      attrs
      |> Enum.into(%{
        content: "some content",
        title: "some title"
      })
      |> ItsmBackend.KnowledgeBase.create_article()

    article
  end
end
