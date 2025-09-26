defmodule ItsmBackend.Repo do
  use Ecto.Repo,
    otp_app: :itsm_backend,
    adapter: Ecto.Adapters.Postgres
end
