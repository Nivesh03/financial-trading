import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { SignUpSchema } from "../../types/user-schema";
import { useAppForm } from "../hooks/form";
import { useSignUp } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useSignUp();
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
        onError: (err) => {
          console.log(err);
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
            {(field) => <field.TextField type="text" label="Pan-Id" />}
          </form.AppField>
          <form.AppField name="imageId">
            {(field) => <field.TextField type="file" label="Id Image" />}
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
