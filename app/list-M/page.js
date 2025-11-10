export default function AccountMerchant() {
  return (
    <div className="p-6 text-center bg-yellow-500 h-[100vh] w-[100vw] flex justify-center flex-col">
      <h1 className="text-bold text-5xl">LOGIN</h1>
      <div className="flex flex-col ">
        <input
          type="text"
          placeholder="email"
          className="bg-white border-2 rounded"
        ></input>
        <input
          type="text"
          placeholder="username"
          className="bg-white border-2 rounded"
        ></input>
      </div>
    </div>
  );
}
