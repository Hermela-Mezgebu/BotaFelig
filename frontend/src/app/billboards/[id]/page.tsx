import { notFound } from "next/navigation";

import {
  BILLBOARDS,
  type Billboard,
} from "@/data/billboards";

import BillboardDetailClient from "./BillboardDetailClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BillboardDetailPage({
  params,
}: PageProps) {
  const { id } =
    await params;

  const billboard:
    | Billboard
    | undefined =
    BILLBOARDS.find(
      (item) =>
        item.id === id,
    );

  if (!billboard) {
    notFound();
  }

  return (
    <BillboardDetailClient
      billboard={billboard}
    />
  );
}