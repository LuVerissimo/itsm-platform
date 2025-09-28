defmodule ItsmBackend.TicketingTest do
  use ItsmBackend.DataCase

  alias ItsmBackend.Ticketing

  describe "tickets" do
    alias ItsmBackend.Ticketing.Ticket

    import ItsmBackend.TicketingFixtures

    @invalid_attrs %{priority: nil, status: nil, description: nil, title: nil}

    test "list_tickets/0 returns all tickets" do
      ticket = ticket_fixture()
      assert Ticketing.list_tickets() == [ticket]
    end

    test "get_ticket!/1 returns the ticket with given id" do
      ticket = ticket_fixture()
      assert Ticketing.get_ticket!(ticket.id) == ticket
    end

    test "create_ticket/1 with valid data creates a ticket" do
      valid_attrs = %{priority: "some priority", status: "some status", description: "some description", title: "some title"}

      assert {:ok, %Ticket{} = ticket} = Ticketing.create_ticket(valid_attrs)
      assert ticket.priority == "some priority"
      assert ticket.status == "some status"
      assert ticket.description == "some description"
      assert ticket.title == "some title"
    end

    test "create_ticket/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Ticketing.create_ticket(@invalid_attrs)
    end

    test "update_ticket/2 with valid data updates the ticket" do
      ticket = ticket_fixture()
      update_attrs = %{priority: "some updated priority", status: "some updated status", description: "some updated description", title: "some updated title"}

      assert {:ok, %Ticket{} = ticket} = Ticketing.update_ticket(ticket, update_attrs)
      assert ticket.priority == "some updated priority"
      assert ticket.status == "some updated status"
      assert ticket.description == "some updated description"
      assert ticket.title == "some updated title"
    end

    test "update_ticket/2 with invalid data returns error changeset" do
      ticket = ticket_fixture()
      assert {:error, %Ecto.Changeset{}} = Ticketing.update_ticket(ticket, @invalid_attrs)
      assert ticket == Ticketing.get_ticket!(ticket.id)
    end

    test "delete_ticket/1 deletes the ticket" do
      ticket = ticket_fixture()
      assert {:ok, %Ticket{}} = Ticketing.delete_ticket(ticket)
      assert_raise Ecto.NoResultsError, fn -> Ticketing.get_ticket!(ticket.id) end
    end

    test "change_ticket/1 returns a ticket changeset" do
      ticket = ticket_fixture()
      assert %Ecto.Changeset{} = Ticketing.change_ticket(ticket)
    end
  end
end
