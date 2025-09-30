defmodule ItsmBackendWeb.AuthPlug do

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    if get_session(conn, :user_id) do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> Phoenix.Controller.json(%{error: "Authentication required"})
      |> halt()
    end
  end
end
