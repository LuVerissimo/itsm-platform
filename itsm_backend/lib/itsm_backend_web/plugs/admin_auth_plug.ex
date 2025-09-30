defmodule ItsmBackendWeb.AdminAuthPlug do
  import Plug.Conn
  alias ItsmBackend.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    user_id = get_session(conn, :user_id)
    user = user_id && Accounts.get_user!(user_id)

    if user && user.role == "admin" do
      conn
    else
      conn
      |> put_status(:forbidden)
      |> Phoenix.Controller.json(%{error: "Admin access required"})
      |> halt()
    end
  end
end
