defmodule ItsmBackend.KnowledgeBase.Article do
  use Ecto.Schema
  import Ecto.Changeset

  schema "articles" do
    field :title, :string
    field :content, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(article, attrs) do
    article
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
  end
end
