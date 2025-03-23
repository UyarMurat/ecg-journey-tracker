
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Profile from "@/components/profile/Profile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl mx-auto px-4 pt-24 pb-16">
        <Profile />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
