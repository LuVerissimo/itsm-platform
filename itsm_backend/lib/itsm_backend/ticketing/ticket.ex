defmodule ItsmBackend.Ticketing.Ticket do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tickets" do
    field :title, :string
    field :description, :string
    field :status, :string
    field :priority, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, [:title, :description, :status, :priority])
    |> validate_required([:title, :description, :status, :priority])
  end
end
