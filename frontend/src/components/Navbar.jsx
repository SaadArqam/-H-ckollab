export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="text-lg font-bold">H@ckollab</div>
        <div className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/explore" className="hover:underline">Explore</a>
          <a href="/post-project" className="hover:underline">Post Project</a>
          <a href="/messages" className="hover:underline">Messages</a>
          <a href="/profile" className="hover:underline">Profile</a>
        </div>
      </div>
    </nav>
  );
}
