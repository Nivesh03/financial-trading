import {
  createFileRoute,
  useNavigate,
  useRouter,
  Link,
} from "@tanstack/react-router";
import { SignUpSchema } from "../../types/user-schema";
import { useAppForm } from "../hooks/form";
import { useSignUp } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate } = useSignUp();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      panId: "",
      imageId: "",
    },
    validators: {
      onBlur: SignUpSchema,
    },
    onSubmit: async ({ value }) => {
      const data = {
        ...value,
        imageId: "this_is_the_image",
      };
      console.log(data);
      mutate(data, {
        onSuccess: async () => {
          await router.invalidate();
          queryClient.invalidateQueries();
          navigate({ to: "/" });
        },
      });
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to get started.</CardDescription>
        </CardHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent className="space-y-4">
            <form.AppField name="name">
              {(field) => <field.TextField type="text" label="Name" />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.TextField type="email" label="Email" />}
            </form.AppField>
            <form.AppField name="password">
              {(field) => <field.TextField type="password" label="Password" />}
            </form.AppField>
            <form.AppField name="panId">
              {(field) => (
                <field.TextField
                  type="text"
                  label="Pan-Id"
                  placeholder="ABCDE1234"
                />
              )}
            </form.AppField>
            <form.AppField name="imageId">
              {(field) => <field.TextField type="file" label="Id Image" />}
            </form.AppField>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex mt-3 justify-end w-full">
              <form.AppForm>
                <form.SubscribeButton label="Sign Up" />
              </form.AppForm>
            </div>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
