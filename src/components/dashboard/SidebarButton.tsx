import { IconType } from "react-icons";

interface SidebarButtonProps {
  icon: IconType; // Type for React Icons
  label: string;
  active: boolean;
  onClick: () => void;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => (
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
