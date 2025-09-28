defmodule ItsmBackendWeb.TicketControllerTest do
  use ItsmBackendWeb.ConnCase

  import ItsmBackend.TicketingFixtures
  alias ItsmBackend.Ticketing.Ticket

  @create_attrs %{
    priority: "some priority",
    status: "some status",
    description: "some description",
    title: "some title"
  }
  @update_attrs %{
    priority: "some updated priority",
    status: "some updated status",
    description: "some updated description",
    title: "some updated title"
  }
  @invalid_attrs %{priority: nil, status: nil, description: nil, title: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tickets", %{conn: conn} do
      conn = get(conn, ~p"/api/tickets")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ticket" do
    test "renders ticket when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/tickets", ticket: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/tickets/#{id}")

      assert %{
               "id" => ^id,
               "description" => "some description",
               "priority" => "some priority",
               "status" => "some status",
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/tickets", ticket: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ticket" do
    setup [:create_ticket]

    test "renders ticket when data is valid", %{conn: conn, ticket: %Ticket{id: id} = ticket} do
      conn = put(conn, ~p"/api/tickets/#{ticket}", ticket: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/tickets/#{id}")

      assert %{
               "id" => ^id,
               "description" => "some updated description",
               "priority" => "some updated priority",
               "status" => "some updated status",
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, ticket: ticket} do
      conn = put(conn, ~p"/api/tickets/#{ticket}", ticket: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ticket" do
    setup [:create_ticket]

    test "deletes chosen ticket", %{conn: conn, ticket: ticket} do
      conn = delete(conn, ~p"/api/tickets/#{ticket}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/tickets/#{ticket}")
      end
    end
  end

  defp create_ticket(_) do
    ticket = ticket_fixture()

    %{ticket: ticket}
  end
end
