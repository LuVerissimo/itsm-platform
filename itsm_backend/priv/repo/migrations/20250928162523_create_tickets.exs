defmodule ItsmBackend.Repo.Migrations.CreateTickets do
  use Ecto.Migration

  def change do
    create table(:tickets) do
      add :title, :string
      add :description, :text
      add :status, :string
      add :priority, :string

      timestamps(type: :utc_datetime)
    end
  end
end
