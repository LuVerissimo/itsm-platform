defmodule ItsmBackend.Ticketing.Ticket do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tickets" do
    field :title, :string
    field :description, :string
    field :status, Ecto.Enum, values: [:open, :in_progress, :closed]
    field :priority, Ecto.Enum, values: [:low, :medium, :high]

    belongs_to :user, ItsmBackend.Accounts.User
    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(ticket, attrs) do
    ticket
    |> cast(attrs, [:title, :description, :status, :priority])
    |> validate_required([:title, :description, :status, :priority])
  end
end
