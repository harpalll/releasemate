import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2, PlusCircle, Inbox } from "lucide-react";
import { releasesApi } from "../api/releases";
import { BrowserFrame } from "../components/layout/BrowserFrame";
import { PageHeader } from "../components/layout/PageHeader";
import { Breadcrumb } from "../components/layout/Breadcrumb";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { StatusBadge } from "../components/ui/StatusBadge";
import { formatDate, getStatusFromRelease } from "../lib/utils";

export function ReleasesListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: releases = [], isLoading } = useQuery({
    queryKey: ["releases"],
    queryFn: releasesApi.list,
  });

  const deleteMutation = useMutation({
    mutationFn: releasesApi.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["releases"] }),
  });

  function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  }

  return (
    <BrowserFrame>
      <PageHeader />
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <Breadcrumb items={[{ label: "All releases" }]} />
          <Link to="/releases/new">
            <Button icon={<PlusCircle size={16} />}>New release</Button>
          </Link>
        </div>

        {isLoading ? (
          <p className="py-12 text-center text-sm text-text-muted">
            Loading...
          </p>
        ) : releases.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-text-muted">
            <Inbox size={40} strokeWidth={1.5} />
            <p className="text-sm">No releases yet. Create your first one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-text-muted">
                  <th className="pb-3 pr-4 font-medium">Release</th>
                  <th className="pb-3 pr-4 font-medium">Date</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {releases.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-text">
                      {r.name}
                    </td>
                    <td className="py-3 pr-4 text-text-muted">
                      {formatDate(r.date)}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={getStatusFromRelease(r)} />
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => navigate(`/releases/${r.id}`)}
                          className="rounded-lg p-2 text-text-muted hover:bg-gray-100 hover:text-primary transition-colors cursor-pointer"
                          aria-label={`View ${r.name}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id, r.name)}
                          className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Delete ${r.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </BrowserFrame>
  );
}
