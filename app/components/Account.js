export default function AccountPage() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      <p className="text-gray-600">Welcome to your account page!</p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          View Profile
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Log Out
        </button>
      </div>
    </div>
  );
}
