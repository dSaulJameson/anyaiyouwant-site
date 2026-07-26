import { redirect } from "next/navigation";
import { EditorialSubmitButton } from "@/components/editorial-submit-button";
import { hasEditorialSession } from "@/lib/editorial-auth";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditorialLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await hasEditorialSession()) redirect("/editorial");
  const { error } = await searchParams;
  return (
    <div className="editorial-shell editorial-login">
      <div className="editorial-panel">
        <div className="label-mono">Private workspace</div>
        <h1>Editorial desk</h1>
        <p>
          Review evidence, edit the article, and decide what gets published.
          Nothing here auto-publishes.
        </p>
        {error ? <div className="editorial-alert error">{error}</div> : null}
        <form action={loginAction} className="editorial-form">
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </label>
          <EditorialSubmitButton busy="Checking...">
            Open newsroom
          </EditorialSubmitButton>
        </form>
      </div>
    </div>
  );
}
