export default function Login(){
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-coconut-green mb-4">Login</h1>
      <form className="flex flex-col gap-3">
        <input className="p-2 border rounded" placeholder="username" />
        <input type="password" className="p-2 border rounded" placeholder="password" />
        <button className="bg-coconut-green text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
