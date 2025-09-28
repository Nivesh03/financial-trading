import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SignInSchema } from "../types/user-schema";
import { useAppForm } from "../hooks/form";
import { useSignIn } from "@/hooks/use-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md rounded-none">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className="space-y-4">
            <form.AppField name="email">
              {(field) => <field.TextField type="email" label="Email" />}
            </form.AppField>

            <form.AppField name="password">
              {(field) => <field.TextField type="password" label="Password" />}
            </form.AppField>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex mt-3 justify-end w-full">
              <form.AppForm>
                <form.SubscribeButton label="Sign In" />
              </form.AppForm>
            </div>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
