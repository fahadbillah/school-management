import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  BottomNavigation,
  BottomNavigationItem,
  NavigationRail,
  Breadcrumb,
  MobileWayfinding,
  AppNavbar,
} from './Navigation';
import {
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  BellIcon,
  LayersIcon,
  SettingsIcon,
} from '../common/Icons';

describe('BottomNavigation Component', () => {
  const items = [
    { id: 'home', label: 'Home', icon: <HomeIcon data-testid="icon-home" /> },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <CalendarIcon data-testid="icon-attendance" />,
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: <BookOpenIcon data-testid="icon-academics" />,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <BellIcon data-testid="icon-messages" />,
      badge: 2,
    },
  ];

  it('renders all navigation items with labels and icons', () => {
    render(<BottomNavigation value="attendance" items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Attendance')).toBeInTheDocument();
    expect(screen.getByText('Academics')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('marks active item with aria-selected="true" and calls onChange on click', () => {
    const handleChange = vi.fn();
    render(
      <BottomNavigation
        value="attendance"
        onChange={handleChange}
        items={items}
      />
    );

    const activeItem = screen.getByTestId('bottom-nav-item-attendance');
    expect(activeItem).toHaveAttribute('aria-selected', 'true');

    const homeItem = screen.getByTestId('bottom-nav-item-home');
    expect(homeItem).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(homeItem);
    expect(handleChange).toHaveBeenCalledWith('home');
  });

  it('supports composable children with BottomNavigationItem', () => {
    const handleClick = vi.fn();
    render(
      <BottomNavigation>
        <BottomNavigationItem
          id="custom"
          label="Custom Tab"
          icon={<HomeIcon />}
          isActive={true}
          onClick={handleClick}
        />
      </BottomNavigation>
    );

    const customTab = screen.getByText('Custom Tab');
    expect(customTab).toBeInTheDocument();
    fireEvent.click(customTab);
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('NavigationRail Component', () => {
  const railItems = [
    { id: 'dashboard', icon: <LayersIcon />, title: 'Dashboard' },
    { id: 'roster', icon: <BookOpenIcon />, title: 'Roster', badge: 5 },
    { id: 'settings', icon: <SettingsIcon />, title: 'Settings' },
  ];

  it('renders rail with brand, items, and dark theme by default', () => {
    render(<NavigationRail brand="CP" value="roster" items={railItems} />);

    expect(screen.getByText('CP')).toBeInTheDocument();
    expect(screen.getByTitle('Dashboard')).toBeInTheDocument();
    expect(screen.getByTitle('Roster')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles item selection and triggers onChange callback', () => {
    const handleChange = vi.fn();
    render(
      <NavigationRail
        theme="light"
        value="dashboard"
        onChange={handleChange}
        items={railItems}
      />
    );

    const rosterButton = screen.getByTitle('Roster');
    fireEvent.click(rosterButton);
    expect(handleChange).toHaveBeenCalledWith('roster');
  });
});

describe('Breadcrumb Component', () => {
  const trail = [
    { id: 'root', label: 'SIS-Root', href: '#/root' },
    { id: 'section', label: 'Section-3', href: '#/section' },
    { id: 'current', label: 'Rollcall Register' },
  ];

  it('renders breadcrumb trail with links, separators, and active leaf item', () => {
    render(<Breadcrumb items={trail} />);

    expect(screen.getByText('SIS-Root')).toBeInTheDocument();
    expect(screen.getByText('Section-3')).toBeInTheDocument();

    const activeNode = screen.getByText('Rollcall Register');
    expect(activeNode).toHaveAttribute('aria-current', 'page');
  });

  it('invokes onClick handler when a link item is clicked', () => {
    const handleRootClick = vi.fn();
    const customItems = [
      { id: 'root', label: 'Home', onClick: handleRootClick },
      { id: 'current', label: 'Details' },
    ];

    render(<Breadcrumb items={customItems} />);
    fireEvent.click(screen.getByText('Home'));
    expect(handleRootClick).toHaveBeenCalled();
  });
});

describe('MobileWayfinding Component', () => {
  const steps = [
    { id: 'root', label: 'All Classes' },
    { id: 'grade', label: 'Grade 10-A' },
    { id: 'period', label: 'Period 3: Rollcall' },
  ];

  it('renders parent back pill and current node trigger button', () => {
    const handleBack = vi.fn();
    render(
      <MobileWayfinding
        parentLabel="Grade 10-A"
        currentLabel="Period 3: Rollcall"
        onBack={handleBack}
        path={steps}
        currentStepIndex={3}
      />
    );

    const backButton = screen.getByLabelText('Go back to Grade 10-A');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(handleBack).toHaveBeenCalledTimes(1);

    expect(screen.getByText('Period 3: Rollcall')).toBeInTheDocument();
  });

  it('toggles contextual hierarchy path popover on click and navigates to step', () => {
    const handleStepClick = vi.fn();
    render(
      <MobileWayfinding
        parentLabel="Grade 10-A"
        currentLabel="Period 3: Rollcall"
        path={steps}
        currentStepIndex={3}
        onStepClick={handleStepClick}
      />
    );

    const trigger = screen.getByRole('button', { name: /period 3: rollcall/i });
    expect(
      screen.queryByText(/Current Hierarchy Path/i)
    ).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(
      screen.getByText(/Current Hierarchy Path \(3 of 3\)/i)
    ).toBeInTheDocument();
    expect(screen.getByText('1. All Classes')).toBeInTheDocument();

    fireEvent.click(screen.getByText('1. All Classes'));
    expect(handleStepClick).toHaveBeenCalledWith(steps[0], 0);
  });
});

describe('AppNavbar Component', () => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    {
      id: 'academic',
      label: 'Academics',
      subItems: [
        { id: 'courses', label: 'Courses & Curriculum' },
        { id: 'grading', label: 'Grading Matrix', badge: 'New' },
      ],
    },
    { id: 'reports', label: 'Reports' },
  ];

  it('renders brand details and desktop menu items', () => {
    render(
      <AppNavbar
        brandLogo={<span>CP</span>}
        brandName="Campus Operations"
        brandSubtitle="Command Hub"
        menuItems={menuItems}
        activeItemId="dashboard"
      />
    );

    expect(screen.getByText('Campus Operations')).toBeInTheDocument();
    expect(screen.getByText('Command Hub')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Academics')).toBeInTheDocument();
  });

  it('toggles dropdown submenu when parent menu item is clicked', () => {
    render(<AppNavbar brandName="Campus Operations" menuItems={menuItems} />);

    expect(screen.queryByText('Courses & Curriculum')).not.toBeInTheDocument();

    const academicsButton = screen.getByRole('button', { name: /academics/i });
    fireEvent.click(academicsButton);

    expect(screen.getByText('Courses & Curriculum')).toBeInTheDocument();
    expect(screen.getByText('Grading Matrix')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});
