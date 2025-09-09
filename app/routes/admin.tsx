import type { Route } from "./+types/admin";
import { AdminDashboard } from "../components/AdminDashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard - Elder Strawberry Garden" },
    {
      name: "description",
      content: "Admin dashboard for managing pets and categories.",
    },
  ];
}

export default function Admin() {
  return <AdminDashboard />;
}
