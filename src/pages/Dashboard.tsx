
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-24 pb-16">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
