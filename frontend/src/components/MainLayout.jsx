import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default MainLayout;
