defmodule ItsmBackendWeb.TicketController do
  use ItsmBackendWeb, :controller

  alias ItsmBackend.Ticketing
  alias ItsmBackend.Ticketing.Ticket

  action_fallback ItsmBackendWeb.FallbackController

  def index(conn, _params) do
    tickets = Ticketing.list_tickets()
    render(conn, :index, tickets: tickets)
  end

  def create(conn, %{"ticket" => ticket_params}) do
    with {:ok, %Ticket{} = ticket} <- Ticketing.create_ticket(ticket_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/tickets/#{ticket}")
      |> render(:show, ticket: ticket)
    end
  end

  def show(conn, %{"id" => id}) do
    ticket = Ticketing.get_ticket!(id)
    render(conn, :show, ticket: ticket)
  end

  def update(conn, %{"id" => id, "ticket" => ticket_params}) do
    ticket = Ticketing.get_ticket!(id)

    with {:ok, %Ticket{} = ticket} <- Ticketing.update_ticket(ticket, ticket_params) do
      render(conn, :show, ticket: ticket)
    end
  end

  def delete(conn, %{"id" => id}) do
    ticket = Ticketing.get_ticket!(id)

    with {:ok, %Ticket{}} <- Ticketing.delete_ticket(ticket) do
      send_resp(conn, :no_content, "")
    end
  end
end
