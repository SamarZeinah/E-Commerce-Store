export default function CategoriesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  console.log("Categories Layout");

  return (
    <>
      {children}
      {modal}
    </>
  );
}