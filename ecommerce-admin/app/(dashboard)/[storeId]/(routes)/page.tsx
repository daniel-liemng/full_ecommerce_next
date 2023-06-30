interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params: { storeId },
}) => {
  const store = await prisma?.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return <div>ACtive Store: {store?.name}</div>;
};

export default DashboardPage;
