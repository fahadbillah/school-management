import React from 'react';
import { SpinnerIcon, CheckIcon, CloseIcon, UserFallbackIcon } from './Icons';

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const CalendarIcon: React.FC<
  React.SVGProps<SVGSVGElement> & { size?: number | string }
> = ({ size = 16, width, height, ...props }) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const iconMap = {
  None: undefined,
  Plus: <PlusIcon />,
  ArrowRight: <ArrowRightIcon />,
  Search: <SearchIcon />,
  Calendar: <CalendarIcon />,
  Mail: <MailIcon />,
  Lock: <LockIcon />,
  Check: <CheckIcon size={16} />,
  Close: <CloseIcon size={16} />,
  User: <UserFallbackIcon size={16} />,
  Spinner: <SpinnerIcon size={16} />,
};

export const iconOptions = Object.keys(iconMap);

export const avatarMap = {
  None: undefined,
  'Robert Vance (RV)': (
    <span className="w-6 h-6 rounded-full bg-[#3674B5] text-white flex items-center justify-center text-[10px] font-bold">
      RV
    </span>
  ),
  'Elena Thorne (ET)': (
    <span className="w-6 h-6 rounded-full bg-[#3674B5] text-white flex items-center justify-center text-[10px] font-bold">
      ET
    </span>
  ),
  'Sophia Miller (SM)': (
    <span className="w-6 h-6 rounded-full bg-[#578FCA] text-white flex items-center justify-center text-[10px] font-bold">
      SM
    </span>
  ),
  'Alexander Chen (AC)': (
    <span className="w-6 h-6 rounded-full bg-[#115B9B] text-white flex items-center justify-center text-[10px] font-bold">
      AC
    </span>
  ),
};

export const avatarOptions = Object.keys(avatarMap);
