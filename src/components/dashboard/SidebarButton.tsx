export const SidebarButton = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center space-x-3 rounded-md p-2 hover:bg-gray-100 ${
      active ? "font-medium text-primary" : "text-black"
    }`}
  >
    <Icon size={24} className={active ? "text-primary" : "text-gray-500"} />
    <span>{label}</span>
  </button>
);
