import { auth } from "@clerk/nextjs/server";
import { BottomNav } from "./bottom-nav";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

export async function BottomNavWrapper() {
  const { userId } = await auth();

  if (!userId) {
    return <BottomNav userCanAddTransaction={false} />;
  }

  const userCanAddTransaction = await canUserAddTransaction();

  return <BottomNav userCanAddTransaction={userCanAddTransaction} />;
}
