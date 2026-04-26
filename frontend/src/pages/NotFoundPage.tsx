import { Link } from "react-router-dom";
import { BrowserFrame } from "../components/layout/BrowserFrame";
import { PageHeader } from "../components/layout/PageHeader";
import { Card } from "../components/ui/Card";

export function NotFoundPage() {
  return (
    <BrowserFrame>
      <PageHeader />
      <Card>
        <div className="py-16 text-center">
          <p className="text-lg font-medium text-text">Page not found</p>
          <Link
            to="/"
            className="mt-3 inline-block text-sm text-primary hover:underline"
          >
            Back to all releases
          </Link>
        </div>
      </Card>
    </BrowserFrame>
  );
}
