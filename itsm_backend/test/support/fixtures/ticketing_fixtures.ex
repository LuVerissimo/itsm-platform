defmodule ItsmBackend.TicketingFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ItsmBackend.Ticketing` context.
  """

  @doc """
  Generate a ticket.
  """
  def ticket_fixture(attrs \\ %{}) do
    {:ok, ticket} =
      attrs
      |> Enum.into(%{
        description: "some description",
        priority: "some priority",
        status: "some status",
        title: "some title"
      })
      |> ItsmBackend.Ticketing.create_ticket()

    ticket
  end
end
