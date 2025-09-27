import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignInSchema } from "../../types/user-schema";
import { useAppForm } from "../hooks/form";
import { useSignIn } from "@/hooks/use-user";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate } = useSignIn();
  const navigate = useNavigate();
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onBlur: SignInSchema,
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      });
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="min-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.AppField name="email">
            {(field) => <field.TextField type="email" label="Email" />}
          </form.AppField>

          <form.AppField name="password">
            {(field) => <field.TextField type="password" label="Password" />}
          </form.AppField>

          <div className="flex justify-end">
            <form.AppForm>
              <form.SubscribeButton label="Submit" />
            </form.AppForm>
          </div>
        </form>
      </div>
    </div>
  );
}
