import useAuthStore from "../store/authStore";

function DashboardPage() {

  const { user } = useAuthStore();

  return (

    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-4">
        Panda Dashboard 🐼
      </h1>

      <p className="text-xl">
        Welcome {user?.username}
      </p>

      <p className="mt-2">
        Bamboo: {user?.bamboo}
      </p>

    </div>
  );
}

export default DashboardPage;