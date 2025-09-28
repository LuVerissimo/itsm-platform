defmodule ItsmBackendWeb.TicketJSON do
  alias ItsmBackend.Ticketing.Ticket

  @doc """
  Renders a list of tickets.
  """
  def index(%{tickets: tickets}) do
    %{data: for(ticket <- tickets, do: data(ticket))}
  end

  @doc """
  Renders a single ticket.
  """
  def show(%{ticket: ticket}) do
    %{data: data(ticket)}
  end

  defp data(%Ticket{} = ticket) do
    %{
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority
    }
  end
end
