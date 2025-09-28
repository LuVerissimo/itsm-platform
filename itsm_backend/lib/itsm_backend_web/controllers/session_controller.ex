defmodule ItsmBackendWeb.SessionController do
  use ItsmBackendWeb, :controller
  alias ItsmBackendWeb.Accounts

  def create(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        conn
        |> put_session(:user_id, user.id)
        |> put_resp_header(conn, "content-type", "application/json")
        |> send_resp(
          200,
          Jason.encode!(%{data: %{id: user.id, name: user.name, email: user.email}})
        )

      {:error, :unauthorized} ->
        conn
        |> put_status(401)
        |> json(%{error: %{status: 401, message: "Invalid email or password"}})
    end
  end

  def delete(conn, _params) do
    conn |> clear_session() |> send_resp(204, "")
  end
end
