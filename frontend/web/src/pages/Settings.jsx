export default function Settings() {
  return (
    <div className="p-6 bg-[#f5f6fa] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#111827]">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your PharmaLink account settings
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#111827] mb-5">
          Profile Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Company Name"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#111827] mb-5">
          Security
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="password"
            placeholder="Current Password"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#111827] mb-5">
          Preferences
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
            <div>
              <p className="font-medium text-gray-800">
                Email Notifications
              </p>
              <p className="text-sm text-gray-500">
                Receive updates about orders and requests
              </p>
            </div>

            <button className="w-12 h-6 bg-black rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
            </button>
          </div>

          <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
            <div>
              <p className="font-medium text-gray-800">
                Auto Approvals
              </p>
              <p className="text-sm text-gray-500">
                Automatically approve low stock requests
              </p>
            </div>

            <button className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}