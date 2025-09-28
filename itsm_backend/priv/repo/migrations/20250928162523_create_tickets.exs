defmodule ItsmBackend.Repo.Migrations.CreateTickets do
  use Ecto.Migration

  def change do
    create table(:tickets) do
      add :title, :string
      add :description, :text
      add :status, Ecto.Enum, values: [:open, :in_progress, :closed], default: :open
      add :priority, Ecto.Enum, values: [:low, :medium, :high], default: :low

      timestamps(type: :utc_datetime)
    end
  end
end
