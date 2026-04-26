import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { releasesApi } from "../api/releases";
import { RELEASE_STEPS } from "../lib/constants";
import { BrowserFrame } from "../components/layout/BrowserFrame";
import { PageHeader } from "../components/layout/PageHeader";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";
import { Textarea } from "../components/ui/Textarea";
import { CheckboxField } from "../components/ui/CheckboxField";
import type { Release } from "../types/release";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ReleaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === "new";

  const { data: release, isLoading } = useQuery({
    queryKey: ["release", id],
    queryFn: () => releasesApi.get(id!),
    enabled: !isNew,
  });

  const [steps, setSteps] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", date: "", additionalInfo: "" },
  });

  useEffect(() => {
    if (release) {
      reset({
        name: release.name,
        date: release.date.split("T")[0],
        additionalInfo: release.additionalInfo ?? "",
      });
      setSteps(release.completedSteps);
    }
  }, [release, reset]);

  const createMutation = useMutation({
    mutationFn: releasesApi.create,
    onSuccess: (created: Release) => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
      navigate(`/releases/${created.id}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ data }: { data: Parameters<typeof releasesApi.update>[1] }) =>
      releasesApi.update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
      queryClient.invalidateQueries({ queryKey: ["release", id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: releasesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["releases"] });
      navigate("/");
    },
  });

  function toggleStep(index: number, checked: boolean) {
    const next = checked
      ? [...steps, index]
      : steps.filter((s) => s !== index);
    setSteps(next);
    if (!isNew) {
      updateMutation.mutate({ data: { completedSteps: next } });
    }
  }

  function onSubmit(values: FormValues) {
    if (isNew) {
      createMutation.mutate(values);
    } else {
      updateMutation.mutate({ data: values });
    }
  }

  function handleDelete() {
    if (!confirm("Delete this release? This cannot be undone.")) return;
    deleteMutation.mutate(id!);
  }

  if (!isNew && isLoading) {
    return (
      <BrowserFrame>
        <PageHeader />
        <p className="py-12 text-center text-sm text-text-muted">Loading...</p>
      </BrowserFrame>
    );
  }

  if (!isNew && !release && !isLoading) {
    return (
      <BrowserFrame>
        <PageHeader />
        <Card>
          <p className="py-12 text-center text-sm text-text-muted">
            Release not found.
          </p>
        </Card>
      </BrowserFrame>
    );
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <BrowserFrame>
      <PageHeader />
      <Card>
        <div className="mb-6 flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: "All releases", to: "/" },
              { label: isNew ? "New release" : release!.name },
            ]}
          />
          {!isNew && (
            <Button
              variant="danger"
              icon={<Trash2 size={16} />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              label="Release name"
              placeholder="e.g. Version 1.0.1"
              error={errors.name?.message}
              {...register("name")}
            />
            <TextInput
              label="Date"
              type="date"
              error={errors.date?.message}
              {...register("date")}
            />
          </div>

          {!isNew && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-text">Checklist</h3>
              <div className="rounded-lg border border-border divide-y divide-border/50 px-4">
                {RELEASE_STEPS.map((step, i) => (
                  <CheckboxField
                    key={i}
                    label={step}
                    checked={steps.includes(i)}
                    onChange={(checked) => toggleStep(i, checked)}
                  />
                ))}
              </div>
            </div>
          )}

          <Textarea
            label="Additional remarks / tasks"
            placeholder="Please enter any other important notes for the release"
            {...register("additionalInfo")}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              icon={<Check size={16} />}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Card>
    </BrowserFrame>
  );
}
