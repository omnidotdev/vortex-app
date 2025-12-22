import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  WorkspaceRole,
  useCreateWorkspaceMutation,
  useCreateWorkspaceUserMutation,
  useWorkspacesQuery,
} from "@/generated/graphql";
import useDialogStore, { DialogType } from "@/lib/hooks/store/useDialogStore";
import useForm from "@/lib/hooks/useForm";
import workspacesOptions from "@/lib/options/workspaces.options";
import generateSlug from "@/lib/util/generateSlug";
import getQueryKeyPrefix from "@/lib/util/getQueryKeyPrefix";

const CreateWorkspaceDialog = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);

  const { session } = useRouteContext({ strict: false });

  const { isOpen: isCreateWorkspaceOpen, setIsOpen: setIsCreateWorkspaceOpen } =
    useDialogStore({
      type: DialogType.CreateWorkspace,
    });

  const { mutateAsync: createTeamMember } = useCreateWorkspaceUserMutation();

  const { mutateAsync: createNewWorkspace } = useCreateWorkspaceMutation({
    meta: {
      invalidates: [
        workspacesOptions({ userId: session?.user?.rowId! }).queryKey,
      ],
    },
    onSuccess: async ({ createWorkspace }) => {
      // Create team member as owner
      await createTeamMember({
        input: {
          workspaceUser: {
            userId: session?.user?.rowId!,
            workspaceId: createWorkspace?.workspace?.rowId!,
            role: WorkspaceRole.Owner,
          },
        },
      });

      navigate({
        to: "/workspaces/$workspaceSlug",
        params: { workspaceSlug: createWorkspace?.workspace?.slug! },
      });
    },
  });

  const { data: workspaces } = useQuery({
    ...workspacesOptions({ userId: session?.user?.rowId! }),
    select: (data) => data.workspaces?.nodes,
  });

  const isWorkspaceNameAvailable = async (name: string) => {
    if (!workspaces) return true;

    return !workspaces.some(
      (workspace) => workspace.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        if (value.name.trim().length < 3) {
          return {
            fields: {
              name: "Workspace name must be at least 3 characters long",
            },
          };
        }

        const isAvailable = await isWorkspaceNameAvailable(value.name);

        if (!isAvailable) {
          return {
            fields: {
              name: "This workspace name is already taken",
            },
          };
        }

        return null;
      },
    },
    onSubmit: ({ value, formApi }) => {
      if (!value.name.trim()) return;

      toast.promise(
        createNewWorkspace({
          input: {
            workspace: {
              name: value.name,
              slug: generateSlug(value.name),
            },
          },
        }),
        {
          loading: "Creating Workspace...",
          success: "Workspace created successfully!",
          error: "Something went wrong! Please try again.",
        },
      );

      setIsCreateWorkspaceOpen(false);
      formApi.reset();
    },
  });

  return (
    <DialogRoot
      open={isCreateWorkspaceOpen}
      onOpenChange={({ open }) => {
        setIsCreateWorkspaceOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogCloseTrigger />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="mt-4 flex flex-col gap-2"
          >
            <form.Field name="name">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-foreground" htmlFor="name">
                    Name
                  </label>

                  <Input
                    ref={nameRef}
                    type="text"
                    id="name"
                    autoComplete="off"
                    autoFocus
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Workspace name"
                  />

                  <div className="h-4">
                    {field.state.meta.errors.map((error, index) => (
                      <p key={index} className="text-xs text-destructive">
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>

            <div className="mt-4 flex justify-end gap-2">
              <DialogCloseTrigger asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogCloseTrigger>

              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                  state.isDefaultValue,
                ]}
              >
                {([canSubmit, isSubmitting, isDefaultValue]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || isDefaultValue}
                  >
                    Create
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default CreateWorkspaceDialog;
