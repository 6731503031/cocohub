export default function Register(){
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-coconut-green mb-4">Register</h1>
      <form className="flex flex-col gap-3">
        <input className="p-2 border rounded" placeholder="username" />
        <input className="p-2 border rounded" placeholder="email" />
        <input type="password" className="p-2 border rounded" placeholder="password" />
        <button className="bg-coconut-green text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
