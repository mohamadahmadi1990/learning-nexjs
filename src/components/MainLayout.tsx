import Navbar from "./Navbar";

type TMainLayout = {
  children: React.ReactNode;
};

function MainLayout({ children }: TMainLayout) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default MainLayout;
