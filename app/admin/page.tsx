import type { Metadata } from "next";
import { AdminDashboard } from "@/components/work-service/admin-dashboard";

export const metadata: Metadata = {
  title: "Panel de Administración",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}